import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { CartLine } from "../data/products";
import {
  FLAT_SHIPPING,
  FREE_SHIPPING_AT,
  productById,
  unitPrice,
  usd,
} from "../data/products";
import { useEsc, useLockBody } from "../hooks";
import { ArrowIcon, CheckIcon, CloseIcon, CupSteam } from "./icons";

type Step = "shipping" | "payment" | "review" | "processing" | "done";

const PROCESSING_MSGS = [
  "Contacting the roastery…",
  "Reserving your bags…",
  "Printing the roast-date label…",
  "Confirming your order…",
];

interface ShippingInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
}
interface PaymentInfo {
  card: string;
  expiry: string;
  cvc: string;
}

const inputCls =
  "w-full rounded-md border border-espresso-600 bg-espresso-800/80 px-4 py-3 text-sm text-oat-100 placeholder:text-oat-500 outline-none transition-all focus:border-caramel-500/70 focus:ring-2 focus:ring-caramel-500/20";
const labelCls =
  "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-oat-400";
const errCls = "mt-1.5 text-xs font-medium text-ember-300";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
      {error && <p className={errCls}>{error}</p>}
    </div>
  );
}

export function CheckoutModal({
  open,
  lines,
  onClose,
  onComplete,
}: {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState<Step>("shipping");
  const [shipping, setShipping] = useState<ShippingInfo>({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });
  const [payment, setPayment] = useState<PaymentInfo>({ card: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [msgIndex, setMsgIndex] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [placedTotal, setPlacedTotal] = useState(0);
  const clearedRef = useRef(false);

  useLockBody(open);
  useEsc(open && step !== "processing", onClose);

  useEffect(() => {
    if (open) {
      setStep("shipping");
      setErrors({});
      setMsgIndex(0);
      clearedRef.current = false;
    }
  }, [open]);

  useEffect(() => {
    if (step !== "processing") return;
    const interval = window.setInterval(
      () => setMsgIndex((i) => (i + 1) % PROCESSING_MSGS.length),
      620
    );
    const timeout = window.setTimeout(() => {
      setOrderId(`EO-${Date.now().toString(36).toUpperCase().slice(-6)}`);
      setStep("done");
      if (!clearedRef.current) {
        clearedRef.current = true;
        onComplete();
      }
    }, 2600);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [step, onComplete]);

  if (!open) return null;

  const subtotal = lines.reduce(
    (s, l) => s + unitPrice(productById(l.productId), l.size) * l.qty,
    0
  );
  const shippingCost = subtotal >= FREE_SHIPPING_AT ? 0 : FLAT_SHIPPING;
  const total = subtotal + shippingCost;

  const validateShipping = () => {
    const e: Record<string, string> = {};
    if (shipping.name.trim().length < 2) e.name = "We need a name for the label.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) e.email = "That email doesn't look right.";
    if (shipping.address.trim().length < 5) e.address = "Add a street address.";
    if (!shipping.city.trim()) e.city = "City, please.";
    if (!/^\d{4,6}$/.test(shipping.zip.trim())) e.zip = "4–6 digit postal code.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Record<string, string> = {};
    if (payment.card.replace(/\s/g, "").length !== 16) e.card = "Card number needs 16 digits.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(payment.expiry)) e.expiry = "Use MM/YY.";
    if (!/^\d{3,4}$/.test(payment.cvc)) e.cvc = "3–4 digits.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const steps: Step[] = ["shipping", "payment", "review"];
  const activeIdx =
    step === "processing" || step === "done"
      ? steps.length
      : steps.indexOf(step as (typeof steps)[number]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Checkout">
      <button
        className="absolute inset-0 w-full cursor-default bg-espresso-950/85 backdrop-blur-sm"
        onClick={step === "processing" ? undefined : onClose}
        aria-label="Close checkout"
      />

      <div className="relative z-10 flex max-h-[94vh] w-full max-w-lg animate-fade-up flex-col overflow-hidden rounded-t-xl border border-espresso-700 bg-espresso-900 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.95)] sm:rounded-lg">
        {/* header */}
        {step !== "done" && (
          <header className="flex items-center justify-between border-b border-espresso-700/70 px-6 py-4">
            <div className="flex items-center gap-4">
              <h2 className="font-display text-xl font-semibold text-oat-50">Checkout</h2>
              <div className="hidden items-center gap-1.5 sm:flex">
                {steps.map((s, i) => (
                  <span
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i <= activeIdx ? "w-7 bg-caramel-500" : "w-4 bg-espresso-600"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-oat-400">
              {step === "shipping" && "1 · Delivery"}
              {step === "payment" && "2 · Payment"}
              {step === "review" && "3 · Confirm"}
              {step === "processing" && "Brewing…"}
            </p>
            {step !== "processing" && (
              <button
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full border border-espresso-600 text-oat-300 transition-all hover:rotate-90 hover:border-caramel-500/60 hover:text-caramel-300"
                aria-label="Close checkout"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            )}
          </header>
        )}

        <div className="overflow-y-auto">
          {/* ---------- SHIPPING ---------- */}
          {step === "shipping" && (
            <form
              className="space-y-4 px-6 py-6"
              onSubmit={(e) => {
                e.preventDefault();
                if (validateShipping()) setStep("payment");
              }}
              noValidate
            >
              <Field label="Full name" error={errors.name}>
                <input
                  className={inputCls}
                  value={shipping.name}
                  onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                  placeholder="Ada Bloom"
                  autoFocus
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  className={inputCls}
                  type="email"
                  value={shipping.email}
                  onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                  placeholder="ada@morningritual.com"
                />
              </Field>
              <Field label="Street address" error={errors.address}>
                <input
                  className={inputCls}
                  value={shipping.address}
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                  placeholder="14 Copper Lane, Apt 3"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="City" error={errors.city}>
                  <input
                    className={inputCls}
                    value={shipping.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    placeholder="Portland"
                  />
                </Field>
                <Field label="Postal code" error={errors.zip}>
                  <input
                    className={inputCls}
                    value={shipping.zip}
                    onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                    placeholder="97209"
                    inputMode="numeric"
                  />
                </Field>
              </div>
              <button
                type="submit"
                className="group mt-2 flex w-full items-center justify-center gap-2.5 rounded-full bg-caramel-500 py-4 text-sm font-bold text-espresso-950 transition-all hover:bg-caramel-400 active:scale-[0.98]"
              >
                Continue to payment
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}

          {/* ---------- PAYMENT ---------- */}
          {step === "payment" && (
            <form
              className="space-y-4 px-6 py-6"
              onSubmit={(e) => {
                e.preventDefault();
                if (validatePayment()) setStep("review");
              }}
              noValidate
            >
              <div className="flex items-center justify-between rounded-md border border-caramel-500/30 bg-caramel-500/10 px-4 py-3">
                <p className="text-xs text-caramel-200">
                  Demo checkout — nothing is charged, no data leaves your browser.
                </p>
              </div>
              <Field label="Card number" error={errors.card}>
                <input
                  className={`${inputCls} font-mono tracking-wider`}
                  value={payment.card}
                  onChange={(e) => setPayment({ ...payment, card: formatCard(e.target.value) })}
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                  autoFocus
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry" error={errors.expiry}>
                  <input
                    className={`${inputCls} font-mono`}
                    value={payment.expiry}
                    onChange={(e) => setPayment({ ...payment, expiry: formatExpiry(e.target.value) })}
                    placeholder="08/27"
                    inputMode="numeric"
                  />
                </Field>
                <Field label="CVC" error={errors.cvc}>
                  <input
                    className={`${inputCls} font-mono`}
                    value={payment.cvc}
                    onChange={(e) =>
                      setPayment({ ...payment, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })
                    }
                    placeholder="123"
                    inputMode="numeric"
                  />
                </Field>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep("shipping")}
                  className="rounded-full border border-espresso-600 px-6 py-3.5 text-sm font-semibold text-oat-300 transition-all hover:border-caramel-500/50 hover:text-caramel-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="group flex flex-1 items-center justify-center gap-2.5 rounded-full bg-caramel-500 py-3.5 text-sm font-bold text-espresso-950 transition-all hover:bg-caramel-400 active:scale-[0.98]"
                >
                  Review order
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          )}

          {/* ---------- REVIEW (receipt) ---------- */}
          {step === "review" && (
            <div className="px-6 py-6">
              <div className="mx-auto max-w-sm rounded-sm bg-oat-100 px-6 pb-8 pt-6 text-espresso-900 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]">
                <p className="text-center font-mono text-sm font-bold tracking-[0.3em]">
                  EMBER &amp; OAK
                </p>
                <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-espresso-900/60">
                  Small-batch roastery · est. 2016
                </p>
                <div className="dashed-rule my-4 text-espresso-900/30" />
                <ul className="space-y-2 font-mono text-xs">
                  {lines.map((l) => {
                    const p = productById(l.productId);
                    return (
                      <li key={l.key} className="flex justify-between gap-3">
                        <span className="flex-1">
                          {l.qty} × {p.name}
                          <span className="block text-[10px] text-espresso-900/55">
                            {l.size} · {l.grind}
                          </span>
                        </span>
                        <span className="shrink-0 font-bold">
                          {usd(unitPrice(p, l.size) * l.qty)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="dashed-rule my-4 text-espresso-900/30" />
                <div className="space-y-1 font-mono text-xs">
                  <p className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{usd(subtotal)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? "FREE" : usd(shippingCost)}</span>
                  </p>
                  <p className="flex justify-between pt-1 text-sm font-bold">
                    <span>TOTAL</span>
                    <span>{usd(total)}</span>
                  </p>
                </div>
                <div className="dashed-rule my-4 text-espresso-900/30" />
                <p className="font-mono text-[10px] leading-relaxed text-espresso-900/60">
                  SHIP TO: {shipping.name.toUpperCase()}
                  <br />
                  {shipping.address.toUpperCase()}, {shipping.city.toUpperCase()} {shipping.zip}
                  <br />
                  CARD: •••• {payment.card.replace(/\s/g, "").slice(-4)}
                </p>
                <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-espresso-900/45">
                  thank you · drink well
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setStep("payment")}
                  className="rounded-full border border-espresso-600 px-6 py-3.5 text-sm font-semibold text-oat-300 transition-all hover:border-caramel-500/50 hover:text-caramel-300"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    setPlacedTotal(total);
                    setStep("processing");
                  }}
                  className="group flex flex-1 items-center justify-center gap-2.5 rounded-full bg-caramel-500 py-3.5 text-sm font-bold text-espresso-950 shadow-[0_10px_28px_-8px_rgba(217,142,50,0.55)] transition-all hover:bg-caramel-400 active:scale-[0.98]"
                >
                  Place order · {usd(total)}
                </button>
              </div>
            </div>
          )}

          {/* ---------- PROCESSING ---------- */}
          {step === "processing" && (
            <div className="flex flex-col items-center px-6 py-16">
              <CupSteam className="h-20 w-20 text-caramel-400" />
              <p
                key={msgIndex}
                className="mt-8 animate-fade-up font-display text-xl font-medium italic text-oat-100"
                style={{ animationDuration: "0.4s" }}
              >
                {PROCESSING_MSGS[msgIndex]}
              </p>
              <div className="mt-6 flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-2 w-2 animate-pulse-dot rounded-full bg-caramel-500"
                    style={{ animationDelay: `${i * 0.25}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ---------- DONE ---------- */}
          {step === "done" && (
            <div className="flex flex-col items-center px-6 py-12 text-center">
              <div className="relative">
                <span className="grid h-20 w-20 animate-pop place-items-center rounded-full border-2 border-moss-400 bg-moss-400/15 text-moss-300">
                  <CheckIcon className="h-9 w-9" />
                </span>
                <span className="absolute -right-6 -top-3 animate-stamp rounded-sm border-2 border-caramel-500 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-caramel-400">
                  Paid
                </span>
              </div>
              <h2 className="mt-7 font-display text-3xl font-semibold text-oat-50">
                Order <span className="text-caramel-400">{orderId}</span> is in.
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-oat-300">
                Your beans hit the drum on Tuesday and ship within 48 hours.
                A confirmation is on its way to{" "}
                <span className="font-semibold text-oat-100">{shipping.email}</span>.
              </p>
              <div className="mt-6 w-full max-w-xs rounded-md border border-espresso-700 bg-espresso-850 px-5 py-4 text-left">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-oat-500">
                  Total paid
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-caramel-300">{usd(placedTotal)}</p>
              </div>
              <button
                onClick={onClose}
                className="group mt-8 flex items-center gap-2.5 rounded-full bg-caramel-500 px-8 py-3.5 text-sm font-bold text-espresso-950 transition-all hover:bg-caramel-400 active:scale-[0.98]"
              >
                Back to the bench
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
