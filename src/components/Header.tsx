import { useEffect, useState } from "react";
import { BasketIcon, BeanIcon, FlameIcon } from "./icons";

const TICKER_ITEMS = [
  "Roast week 08 · batch №142",
  "Free shipping over $40",
  "Roasted every Tuesday, shipped within 48 h",
  "New crop: Ethiopia Idido has landed",
  "2,318 brewers rate us 4.9 ★",
  "Six roasts on the bench this season",
];

export function Ticker() {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {TICKER_ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap px-5 font-mono text-[11px] uppercase tracking-[0.22em] text-caramel-300">
            {item}
          </span>
          <FlameIcon className="h-3 w-3 shrink-0 text-ember-400" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative z-40 overflow-hidden border-b border-espresso-700/60 bg-espresso-900/95 py-2">
      <div className="flex w-max animate-marquee will-change-transform">{[row("a"), row("b")]}</div>
    </div>
  );
}

export function Header({
  cartCount,
  onCartOpen,
}: {
  cartCount: number;
  onCartOpen: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? "border-espresso-700/70 bg-espresso-950/85 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.8)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-caramel-500/40 bg-espresso-800 text-caramel-400 transition-transform duration-300 group-hover:rotate-12">
            <BeanIcon className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-xl font-semibold tracking-tight text-oat-50">
              Ember <span className="text-caramel-400">&amp;</span> Oak
            </span>
            <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.3em] text-oat-400">
              Small-batch roastery
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {[
            ["Shop", "#shop"],
            ["The craft", "#craft"],
            ["Roast club", "#club"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="group relative font-mono text-[12px] uppercase tracking-[0.18em] text-oat-300 transition-colors hover:text-caramel-300"
            >
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-caramel-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <button
          onClick={onCartOpen}
          className="group relative flex items-center gap-2.5 rounded-full border border-espresso-600 bg-espresso-800/80 py-2 pl-4 pr-5 text-sm font-medium text-oat-100 transition-all duration-300 hover:border-caramel-500/60 hover:bg-espresso-700"
          aria-label={`Open cart, ${cartCount} items`}
        >
          <BasketIcon className="h-4.5 w-4.5 text-caramel-400 transition-transform duration-300 group-hover:-rotate-6" />
          <span className="hidden sm:inline">Cart</span>
          <span
            key={cartCount}
            className={`grid h-5.5 min-w-5.5 animate-pop place-items-center rounded-full px-1 font-mono text-[11px] font-bold ${
              cartCount > 0 ? "bg-caramel-500 text-espresso-950" : "bg-espresso-600 text-oat-300"
            }`}
          >
            {cartCount}
          </span>
        </button>
      </div>
    </header>
  );
}
