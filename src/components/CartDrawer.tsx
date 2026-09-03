import type { CartLine } from "../data/products";
import {
  FREE_SHIPPING_AT,
  productById,
  unitPrice,
  usd,
} from "../data/products";
import { useEsc, useLockBody } from "../hooks";
import {
  ArrowIcon,
  CloseIcon,
  CupSteam,
  MinusIcon,
  PlusIcon,
  SmartImg,
  TruckIcon,
} from "./icons";

export function CartDrawer({
  open,
  lines,
  onClose,
  onSetQty,
  onRemove,
  onCheckout,
}: {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onSetQty: (key: string, qty: number) => void;
  onRemove: (key: string) => void;
  onCheckout: () => void;
}) {
  useLockBody(open);
  useEsc(open, onClose);

  const subtotal = lines.reduce(
    (sum, l) => sum + unitPrice(productById(l.productId), l.size) * l.qty,
    0
  );
  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* backdrop */}
      <button
        onClick={onClose}
        aria-label="Close cart"
        className={`absolute inset-0 w-full cursor-default bg-espresso-950/75 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* panel */}
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-espresso-700 bg-espresso-900 shadow-[-30px_0_80px_-20px_rgba(0,0,0,0.8)] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <header className="flex items-center justify-between border-b border-espresso-700/70 px-6 py-5">
          <div>
            <h2 className="font-display text-2xl font-semibold text-oat-50">Your bag</h2>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-oat-400">
              {lines.length === 0
                ? "Nothing brewing yet"
                : `${lines.reduce((s, l) => s + l.qty, 0)} bags · ground to order`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-espresso-600 text-oat-300 transition-all hover:rotate-90 hover:border-caramel-500/60 hover:text-caramel-300"
            aria-label="Close cart"
          >
            <CloseIcon className="h-4.5 w-4.5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <CupSteam className="h-16 w-16 text-espresso-500" />
            <h3 className="mt-6 font-display text-2xl font-semibold text-oat-100">
              The pot is empty.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-oat-400">
              Pick a roast off the bench and it'll show up here — whole bean or
              ground exactly how you brew.
            </p>
            <button
              onClick={onClose}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-caramel-500 px-6 py-3 text-sm font-bold text-espresso-950 transition-all hover:bg-caramel-400"
            >
              Back to the bench <ArrowIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            {/* free shipping meter */}
            <div className="border-b border-espresso-700/70 px-6 py-4">
              <div className="flex items-center justify-between gap-2">
                <p className="flex items-center gap-2 text-xs font-medium text-oat-300">
                  <TruckIcon className="h-4 w-4 text-caramel-400" />
                  {remaining > 0 ? (
                    <>
                      <span className="text-caramel-300">{usd(remaining)}</span> away from
                      free shipping
                    </>
                  ) : (
                    <span className="text-moss-300">Free shipping unlocked ✓</span>
                  )}
                </p>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-oat-500">
                  {usd(FREE_SHIPPING_AT)}
                </span>
              </div>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-espresso-700">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    remaining > 0
                      ? "bg-gradient-to-r from-caramel-600 to-caramel-400"
                      : "bg-moss-400"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* lines */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="space-y-5">
                {lines.map((line) => {
                  const p = productById(line.productId);
                  const unit = unitPrice(p, line.size);
                  return (
                    <li key={line.key} className="group flex gap-4">
                      <div className="h-20 w-16 shrink-0 overflow-hidden rounded-md border border-espresso-700">
                        <SmartImg src={p.image} alt={p.name} className="h-full w-full" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-display text-base font-semibold leading-tight text-oat-50">
                              {p.origin} · {p.name}
                            </p>
                            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-oat-400">
                              {line.size} · {line.grind}
                            </p>
                          </div>
                          <button
                            onClick={() => onRemove(line.key)}
                            className="rounded-full p-1.5 text-oat-500 transition-colors hover:bg-espresso-800 hover:text-ember-300"
                            aria-label={`Remove ${p.name} from cart`}
                          >
                            <CloseIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center rounded-full border border-espresso-600">
                            <button
                              onClick={() => onSetQty(line.key, line.qty - 1)}
                              className="grid h-8 w-8 place-items-center rounded-full text-oat-300 transition-colors hover:text-caramel-300"
                              aria-label="Decrease quantity"
                            >
                              <MinusIcon className="h-3.5 w-3.5" />
                            </button>
                            <span
                              key={line.qty}
                              className="w-7 animate-pop text-center font-mono text-xs font-bold text-oat-50"
                            >
                              {line.qty}
                            </span>
                            <button
                              onClick={() => onSetQty(line.key, line.qty + 1)}
                              disabled={line.qty >= 12}
                              className="grid h-8 w-8 place-items-center rounded-full text-oat-300 transition-colors hover:text-caramel-300 disabled:opacity-30"
                              aria-label="Increase quantity"
                            >
                              <PlusIcon className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="font-display text-base font-semibold text-caramel-300">
                            {usd(unit * line.qty)}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* summary */}
            <footer className="border-t border-espresso-700/70 bg-espresso-850 px-6 py-5">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-oat-300">
                  <span>Subtotal</span>
                  <span className="font-mono">{usd(subtotal)}</span>
                </div>
                <div className="flex justify-between text-oat-300">
                  <span>Shipping</span>
                  <span className={`font-mono ${remaining === 0 ? "text-moss-300" : ""}`}>
                    {remaining === 0 ? "Free" : usd(6)}
                  </span>
                </div>
                <div className="dashed-rule my-3 text-espresso-600" />
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-lg font-semibold text-oat-50">Total</span>
                  <span className="font-display text-2xl font-bold text-caramel-300">
                    {usd(subtotal + (remaining === 0 ? 0 : 6))}
                  </span>
                </div>
              </div>
              <button
                onClick={onCheckout}
                className="group mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-caramel-500 py-4 text-sm font-bold text-espresso-950 shadow-[0_10px_28px_-8px_rgba(217,142,50,0.55)] transition-all duration-300 hover:bg-caramel-400 active:scale-[0.98]"
              >
                Checkout
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-oat-500">
                Demo checkout — no card required
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
