import { useEffect, useState } from "react";
import type { Grind, Product, Size } from "../data/products";
import {
  CATEGORY_LABEL,
  GRINDS,
  ROAST_LABEL,
  SIZES,
  unitPrice,
  usd,
} from "../data/products";
import { useEsc, useLockBody } from "../hooks";
import { BasketIcon, CheckIcon, CloseIcon, MinusIcon, PlusIcon, SmartImg } from "./icons";

export function ProductModal({
  product,
  onClose,
  onAdd,
}: {
  product: Product | null;
  onClose: () => void;
  onAdd: (product: Product, size: Size, grind: Grind, qty: number) => void;
}) {
  const [size, setSize] = useState<Size>("250g");
  const [grind, setGrind] = useState<Grind>("Whole bean");
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useLockBody(product !== null);
  useEsc(product !== null, onClose);

  useEffect(() => {
    if (product) {
      setSize("250g");
      setGrind("Whole bean");
      setQty(1);
      setJustAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const price = unitPrice(product, size);

  const handleAdd = () => {
    onAdd(product, size, grind, qty);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.origin} ${product.name} details`}
    >
      <button
        className="absolute inset-0 cursor-default bg-espresso-950/80 backdrop-blur-sm animate-fade-up"
        style={{ animationDuration: "0.3s" }}
        onClick={onClose}
        aria-label="Close product details"
      />

      <div className="relative z-10 grid max-h-[92vh] w-full max-w-4xl animate-fade-up overflow-y-auto rounded-t-xl border border-espresso-700 bg-espresso-900 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.95)] sm:rounded-lg lg:grid-cols-2">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full border border-espresso-600 bg-espresso-900/90 text-oat-300 transition-all hover:rotate-90 hover:border-caramel-500/60 hover:text-caramel-300"
          aria-label="Close"
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        {/* image */}
        <div className="relative h-64 overflow-hidden sm:h-80 lg:h-auto">
          <SmartImg
            src={product.image}
            alt={`${product.origin} ${product.name} coffee bag`}
            className="h-full w-full"
            imgClassName="animate-kenburns"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: `linear-gradient(to top, ${product.glow}1f, transparent 45%)` }}
          />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-sm bg-oat-100 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-espresso-900">
              {product.badge}
            </span>
          )}
        </div>

        {/* details */}
        <div className="flex flex-col p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-caramel-400">
            {product.origin} · {CATEGORY_LABEL[product.category]} · SKU {product.sku}
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-oat-50">
            {product.name}
          </h2>
          <p className="mt-2 font-display text-lg italic text-oat-300">{product.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-oat-300">{product.description}</p>

          {/* tasting notes */}
          <div className="mt-5 flex flex-wrap gap-2">
            {product.notes.map((n) => (
              <span
                key={n}
                className="rounded-full border border-caramel-500/35 bg-caramel-500/10 px-3.5 py-1.5 text-xs font-medium text-caramel-200"
              >
                {n}
              </span>
            ))}
          </div>

          {/* spec sheet */}
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-espresso-700/70 py-5">
            {[
              ["Region", product.region],
              ["Process", product.process],
              ["Altitude", product.altitude],
              ["Varietal", product.varietal],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-oat-500">{k}</dt>
                <dd className="mt-1 text-sm font-medium text-oat-100">{v}</dd>
              </div>
            ))}
            <div className="col-span-2">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-oat-500">
                Roast — {ROAST_LABEL[product.roast - 1]}
              </dt>
              <dd className="mt-2 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className={`h-2 flex-1 rounded-full transition-all ${
                      i <= product.roast ? "bg-caramel-400" : "bg-espresso-700"
                    }`}
                  />
                ))}
              </dd>
            </div>
          </dl>

          {/* options */}
          <div className="mt-6 space-y-4">
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-oat-400">Size</p>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`flex-1 rounded-md border px-4 py-2.5 text-sm font-semibold transition-all duration-200 sm:flex-none sm:px-6 ${
                      size === s
                        ? "border-caramel-500 bg-caramel-500/15 text-caramel-300"
                        : "border-espresso-600 text-oat-300 hover:border-caramel-500/50"
                    }`}
                    aria-pressed={size === s}
                  >
                    {s}
                    <span className="ml-2 font-mono text-[11px] font-normal text-oat-400">
                      {usd(unitPrice(product, s))}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-oat-400">
                Grind — ground to order
              </p>
              <div className="flex gap-2">
                {GRINDS.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrind(g)}
                    className={`flex-1 rounded-md border px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                      grind === g
                        ? "border-caramel-500 bg-caramel-500/15 text-caramel-300"
                        : "border-espresso-600 text-oat-300 hover:border-caramel-500/50"
                    }`}
                    aria-pressed={grind === g}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* qty + add */}
          <div className="mt-7 flex items-center gap-3">
            <div className="flex items-center rounded-full border border-espresso-600">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                className="grid h-11 w-11 place-items-center rounded-full text-oat-300 transition-colors hover:text-caramel-300 disabled:opacity-30"
                aria-label="Decrease quantity"
              >
                <MinusIcon />
              </button>
              <span className="w-8 text-center font-mono text-sm font-bold text-oat-50">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(12, q + 1))}
                disabled={qty >= 12}
                className="grid h-11 w-11 place-items-center rounded-full text-oat-300 transition-colors hover:text-caramel-300 disabled:opacity-30"
                aria-label="Increase quantity"
              >
                <PlusIcon />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className={`flex flex-1 items-center justify-center gap-2.5 rounded-full py-3.5 text-sm font-bold transition-all duration-300 active:scale-[0.97] ${
                justAdded
                  ? "bg-moss-400 text-espresso-950"
                  : "bg-caramel-500 text-espresso-950 shadow-[0_10px_28px_-8px_rgba(217,142,50,0.55)] hover:bg-caramel-400"
              }`}
            >
              {justAdded ? (
                <>
                  <CheckIcon className="h-4.5 w-4.5" /> Added to cart
                </>
              ) : (
                <>
                  <BasketIcon className="h-4.5 w-4.5" />
                  Add {qty > 1 ? `${qty} bags` : "to cart"} · {usd(price * qty)}
                </>
              )}
            </button>
          </div>

          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-oat-500">
            Roasted Tue · ships within 48 h · free shipping over {usd(40)}
          </p>
        </div>
      </div>
    </div>
  );
}
