import { useMemo, useState } from "react";
import type { CategoryId, Product } from "../data/products";
import {
  CATEGORIES,
  CATEGORY_LABEL,
  PRODUCTS,
  ROAST_LABEL,
  usd,
} from "../data/products";
import { useReveal } from "../hooks";
import { BeanIcon, CloseIcon, PlusIcon, SearchIcon, SmartImg } from "./icons";

type SortId = "featured" | "price-asc" | "price-desc" | "roast-asc";

const SORTS: { id: SortId; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price · low → high" },
  { id: "price-desc", label: "Price · high → low" },
  { id: "roast-asc", label: "Lightest roast first" },
];

function RoastDots({ roast }: { roast: number }) {
  return (
    <span className="flex items-center gap-1" title={`Roast: ${ROAST_LABEL[roast - 1]}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full transition-colors ${
            i <= roast ? "bg-caramel-400" : "bg-espresso-600"
          }`}
        />
      ))}
    </span>
  );
}

function ProductCard({
  product,
  index,
  onOpen,
  onQuickAdd,
}: {
  product: Product;
  index: number;
  onOpen: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
}) {
  return (
    <article
      className="reveal group relative flex flex-col overflow-hidden rounded-lg border border-espresso-700/70 bg-espresso-900/70 transition-all duration-300 hover:-translate-y-1.5 hover:border-caramel-500/50 hover:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.9)]"
      style={{ transitionDelay: `${(index % 3) * 70}ms` }}
    >
      <button
        onClick={() => onOpen(product)}
        className="relative block aspect-[4/5] w-full cursor-pointer overflow-hidden text-left"
        aria-label={`View details for ${product.origin} ${product.name}`}
      >
        <SmartImg
          src={product.image}
          alt={`${product.origin} ${product.name} coffee bag`}
          className="h-full w-full"
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(80% 60% at 50% 100%, ${product.glow}26, transparent)`,
          }}
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-sm bg-oat-100 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-espresso-900">
            {product.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-oat-100/20 bg-espresso-950/60 font-mono text-[10px] font-bold text-oat-200 backdrop-blur-sm">
          {product.roast}R
        </span>
        <span className="absolute bottom-3 right-3 hidden translate-y-2 items-center gap-1.5 rounded-full bg-espresso-950/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-caramel-300 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
          View details
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-oat-400">
            {product.origin} · {CATEGORY_LABEL[product.category]}
          </p>
          <RoastDots roast={product.roast} />
        </div>

        <button
          onClick={() => onOpen(product)}
          className="mt-2.5 cursor-pointer text-left"
          aria-label={`View details for ${product.name}`}
        >
          <h3 className="font-display text-2xl font-semibold leading-tight text-oat-50 transition-colors group-hover:text-caramel-300">
            {product.name}
          </h3>
        </button>

        <p className="mt-1.5 text-sm italic leading-snug text-oat-300">
          {product.notes.join(" · ")}
        </p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <div>
            <p className="font-display text-xl font-semibold text-oat-50">
              {usd(product.price)}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-oat-500">
              250 g bag
            </p>
          </div>
          <button
            onClick={() => onQuickAdd(product)}
            className="group/btn flex items-center gap-2 rounded-full border border-caramel-500/50 bg-caramel-500/10 py-2.5 pl-3.5 pr-4 text-sm font-semibold text-caramel-300 transition-all duration-300 hover:bg-caramel-500 hover:text-espresso-950 active:scale-95"
            aria-label={`Add ${product.name} to cart`}
          >
            <PlusIcon className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-90" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

export function Shop({
  category,
  onCategory,
  onOpen,
  onQuickAdd,
}: {
  category: CategoryId | "all";
  onCategory: (c: CategoryId | "all") => void;
  onOpen: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("featured");
  const gridRef = useReveal<HTMLDivElement>([category, sort, query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const inCategory = category === "all" || p.category === category;
      if (!inCategory) return false;
      if (!q) return true;
      const haystack = [
        p.name,
        p.origin,
        p.region,
        p.tagline,
        ROAST_LABEL[p.roast - 1],
        ...p.notes,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "roast-asc":
        list = [...list].sort((a, b) => a.roast - b.roast);
        break;
    }
    return list;
  }, [category, query, sort]);

  return (
    <section id="shop" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[12px] uppercase tracking-[0.28em] text-caramel-400">
            The bench
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-oat-50 sm:text-5xl">
            Six roasts, <em className="font-light italic text-caramel-400">zero</em> filler.
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-oat-400">
          Everything below was on the drum within the last seven days. When a
          lot sells out, it's gone until next season.
        </p>
      </div>

      {/* toolbar */}
      <div className="sticky top-[68px] z-30 -mx-4 mt-10 border-y border-espresso-700/60 bg-espresso-950/90 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xs">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-oat-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search origin, notes, roast…"
              className="w-full rounded-full border border-espresso-600 bg-espresso-800/80 py-2.5 pl-10 pr-9 text-sm text-oat-100 placeholder:text-oat-500 outline-none transition-all focus:border-caramel-500/70 focus:ring-2 focus:ring-caramel-500/20"
              aria-label="Search products"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-oat-400 transition-colors hover:text-caramel-300"
                aria-label="Clear search"
              >
                <CloseIcon className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((c) => {
              const active = category === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => onCategory(c.id)}
                  className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-300 ${
                    active
                      ? "border-caramel-500 bg-caramel-500 text-espresso-950 shadow-[0_6px_20px_-6px_rgba(217,142,50,0.6)]"
                      : "border-espresso-600 text-oat-300 hover:border-caramel-500/50 hover:text-caramel-300"
                  }`}
                  aria-pressed={active}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="font-mono text-[10px] uppercase tracking-[0.18em] text-oat-400">
              Sort
            </label>
            <div className="relative">
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortId)}
                className="cursor-pointer rounded-full border border-espresso-600 bg-espresso-800/80 py-2 pl-4 pr-9 text-sm text-oat-100 outline-none transition-all hover:border-caramel-500/50 focus:border-caramel-500/70"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-oat-400"
                fill="none"
              >
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-oat-500" role="status">
        {filtered.length} {filtered.length === 1 ? "roast" : "roasts"}
        {query && (
          <>
            {" "}matching “<span className="text-caramel-300">{query}</span>”
          </>
        )}
      </p>

      {/* grid */}
      {filtered.length > 0 ? (
        <div
          ref={gridRef}
          key={`${category}-${sort}-${query}`}
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onOpen={onOpen} onQuickAdd={onQuickAdd} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center rounded-lg border border-dashed border-espresso-600 py-20 text-center">
          <BeanIcon className="h-10 w-10 text-espresso-500" />
          <h3 className="mt-5 font-display text-2xl font-semibold text-oat-100">
            No roasts match that grind.
          </h3>
          <p className="mt-2 max-w-sm text-sm text-oat-400">
            Try a tasting note like “chocolate”, an origin like “Kenya”, or clear
            your filters to see the full bench.
          </p>
          <button
            onClick={() => {
              setQuery("");
              onCategory("all");
            }}
            className="mt-6 rounded-full border border-caramel-500/60 px-6 py-2.5 text-sm font-semibold text-caramel-300 transition-all hover:bg-caramel-500 hover:text-espresso-950"
          >
            Clear search & filters
          </button>
        </div>
      )}
    </section>
  );
}
