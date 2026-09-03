import { useState } from "react";
import type { FormEvent } from "react";
import type { CategoryId } from "../data/products";
import { CATEGORIES } from "../data/products";
import { useReveal } from "../hooks";
import { ArrowIcon, BeanIcon, CheckIcon, LeafIcon } from "./icons";

/* ------------------------------------------------ craft + roast curve */

export function CraftSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="craft" className="relative border-y border-espresso-800 bg-espresso-900/50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div ref={ref} className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="reveal font-mono text-[12px] uppercase tracking-[0.28em] text-caramel-400">
              The craft
            </p>
            <h2 className="reveal mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-oat-50 sm:text-5xl">
              Every bag has a{" "}
              <em className="font-light italic text-caramel-400">curve</em>.
            </h2>
            <p className="reveal mt-6 max-w-md text-base leading-relaxed text-oat-300">
              We roast by hand on a 12-kilo Probat, logging temperature every
              half-second. The curve on the right is this week's Ethiopia —
              charge to drop in just over eleven minutes, first crack at 8:42.
            </p>

            <div className="reveal mt-10 space-y-8">
              {[
                {
                  n: "01",
                  t: "Source",
                  d: "Direct relationships with 14 farming families. We pay 2–3× commodity price and visit every harvest.",
                  icon: <LeafIcon className="h-5 w-5" />,
                },
                {
                  n: "02",
                  t: "Roast",
                  d: "Small 12 kg batches, profiled by hand. Light roasts for filter, developed roasts for espresso.",
                  icon: <BeanIcon className="h-5 w-5" />,
                },
                {
                  n: "03",
                  t: "Rest & ship",
                  d: "Beans rest 24 hours, then ship within 48 — roast date printed on every bag, never a best-by guess.",
                  icon: <ArrowIcon className="h-5 w-5" />,
                },
              ].map((s, i) => (
                <div
                  key={s.n}
                  className="reveal group flex gap-5"
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <span className="font-display text-4xl font-light italic text-espresso-500 transition-colors duration-300 group-hover:text-caramel-400 sm:text-5xl">
                    {s.n}
                  </span>
                  <div className="border-l border-espresso-700 pl-5 transition-colors duration-300 group-hover:border-caramel-500/50">
                    <h3 className="flex items-center gap-2.5 font-display text-xl font-semibold text-oat-50">
                      <span className="text-caramel-400">{s.icon}</span>
                      {s.t}
                    </h3>
                    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-oat-400">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* roast curve panel */}
          <div className="lg:col-span-7">
            <div className="reveal relative overflow-hidden rounded-lg border border-espresso-700 bg-espresso-950 p-6 sm:p-8" style={{ transitionDelay: "150ms" }}>
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-oat-400">
                  Roast log · Ethiopia Idido · batch №142
                </p>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-caramel-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-caramel-400" /> Light roast
                </span>
              </div>

              <svg viewBox="0 0 600 300" className="mt-6 w-full" role="img" aria-label="Roast temperature curve from charge to drop">
                <defs>
                  <linearGradient id="curve-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#d98e32" />
                    <stop offset="100%" stopColor="#c05f31" />
                  </linearGradient>
                </defs>
                {/* grid */}
                {[60, 120, 180, 240].map((y) => (
                  <line key={y} x1="30" y1={y} x2="585" y2={y} stroke="#3b291b" strokeWidth="1" strokeDasharray="3 6" />
                ))}
                {/* axis labels */}
                {[
                  ["220°", 60],
                  ["170°", 120],
                  ["120°", 180],
                  ["70°", 240],
                ].map(([t, y]) => (
                  <text key={t as string} x="585" y={(y as number) - 6} textAnchor="end" fontSize="10" fontFamily="Space Mono, monospace" fill="#97784f">
                    {t}
                  </text>
                ))}
                {["0:00", "3:00", "6:00", "9:00", "12:00"].map((t, i) => (
                  <text key={t} x={30 + i * 138} y="275" fontSize="10" fontFamily="Space Mono, monospace" fill="#97784f">
                    {t}
                  </text>
                ))}
                {/* the curve */}
                <path
                  d="M30 88 C 95 205, 150 238, 215 230 C 310 216, 430 138, 570 52"
                  fill="none"
                  stroke="url(#curve-grad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  pathLength={1}
                  className="curve-draw"
                />
                {/* markers */}
                {[
                  { x: 30, y: 88, label: "CHARGE 200°", lx: 42, ly: 76, anchor: "start" },
                  { x: 215, y: 230, label: "TURN 96° · 1:32", lx: 215, ly: 254, anchor: "middle" },
                  { x: 408, y: 150, label: "FIRST CRACK 196° · 8:42", lx: 408, ly: 128, anchor: "middle" },
                  { x: 570, y: 52, label: "DROP 211° · 11:05", lx: 558, ly: 40, anchor: "end" },
                ].map((m, i) => (
                  <g key={m.label} className="curve-dot" style={{ transitionDelay: `${0.6 + i * 0.5}s` }}>
                    <circle cx={m.x} cy={m.y} r="10" fill="#d98e32" opacity="0.18" />
                    <circle cx={m.x} cy={m.y} r="4.5" fill="#d98e32" stroke="#140d08" strokeWidth="2" />
                    <text x={m.lx} y={m.ly} textAnchor={m.anchor as "start" | "middle" | "end"} fontSize="10.5" fontFamily="Space Mono, monospace" fill="#f0bd70" letterSpacing="1">
                      {m.label}
                    </text>
                  </g>
                ))}
              </svg>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-espresso-800 pt-5">
                {[
                  ["11:05", "total roast time"],
                  ["19.4 %", "weight loss"],
                  ["Agtron 78", "colour reading"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <p className="font-display text-lg font-semibold text-oat-50 sm:text-xl">{v}</p>
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-oat-500">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ roast club */

export function ClubBand() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");
  const ref = useReveal<HTMLDivElement>();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("done");
  };

  return (
    <section id="club" className="relative overflow-hidden bg-caramel-500">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border-[28px] border-caramel-600/40" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full border-[22px] border-caramel-400/50" />

      <div ref={ref} className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
        <div>
          <p className="reveal font-mono text-[12px] uppercase tracking-[0.28em] text-espresso-800">
            Roast club
          </p>
          <h2 className="reveal mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-espresso-950 sm:text-5xl">
            First crack, <em className="font-light italic">first dibs.</em>
          </h2>
          <ul className="reveal mt-7 space-y-3">
            {[
              "15% off every bag, every order",
              "48-hour early access to limited lots",
              "Brew guides from our head roaster, monthly",
            ].map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-base font-medium text-espresso-900">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-espresso-950 text-caramel-300">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal" style={{ transitionDelay: "150ms" }}>
          {status === "done" ? (
            <div className="rounded-lg border-2 border-espresso-950 bg-caramel-400 p-8 text-center shadow-[8px_8px_0_rgba(20,13,8,0.9)]">
              <p className="font-display text-2xl font-semibold text-espresso-950">
                You're on the list.
              </p>
              <p className="mt-2 text-sm font-medium text-espresso-900">
                Watch <span className="font-bold">{email}</span> on Tuesday — the
                week-09 menu drops at 7 a.m.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="rounded-lg border-2 border-espresso-950 bg-espresso-950 p-6 shadow-[8px_8px_0_rgba(20,13,8,0.55)] sm:p-8" noValidate>
              <label htmlFor="club-email" className="font-mono text-[11px] uppercase tracking-[0.22em] text-caramel-300">
                Join 4,200 subscribers
              </label>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  id="club-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="you@morningritual.com"
                  className="flex-1 rounded-full border border-espresso-600 bg-espresso-800 px-5 py-3.5 text-sm text-oat-100 placeholder:text-oat-500 outline-none transition-all focus:border-caramel-400 focus:ring-2 focus:ring-caramel-400/25"
                />
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 rounded-full bg-oat-100 px-7 py-3.5 text-sm font-bold text-espresso-950 transition-all hover:bg-oat-50 active:scale-[0.97]"
                >
                  Sign up
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              <p className={`mt-3 text-xs font-medium ${status === "error" ? "text-ember-300" : "text-oat-500"}`}>
                {status === "error"
                  ? "That email doesn't look right — try again?"
                  : "One email a week. Unsubscribe whenever the pot runs dry."}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ footer */

export function Footer({
  onCategory,
}: {
  onCategory: (c: CategoryId | "all") => void;
}) {
  return (
    <footer className="border-t border-espresso-800 bg-espresso-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-display text-5xl font-semibold leading-none tracking-tight text-oat-50 sm:text-6xl">
              Drink <em className="font-light italic text-caramel-400">better</em> coffee.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-oat-400">
              Ember &amp; Oak Roasting Co. — a two-drum roastery on Copper Lane,
              Portland. Roasting since 2016, arguing about grind size since forever.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-oat-500">Shop</p>
              <ul className="mt-4 space-y-2.5">
                {CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => {
                        onCategory(c.id);
                        document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-sm text-oat-300 transition-colors hover:text-caramel-300"
                    >
                      {c.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-oat-500">Explore</p>
              <ul className="mt-4 space-y-2.5">
                {[
                  ["The craft", "#craft"],
                  ["Roast club", "#club"],
                  ["Back to top", "#top"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <a href={href} className="text-sm text-oat-300 transition-colors hover:text-caramel-300">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-oat-500">Say hi</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a href="mailto:hello@emberandoak.coffee" className="text-sm text-oat-300 transition-colors hover:text-caramel-300">
                    hello@emberandoak.coffee
                  </a>
                </li>
                <li>
                  <a href="tel:+15035550142" className="text-sm text-oat-300 transition-colors hover:text-caramel-300">
                    (503) 555-0142
                  </a>
                </li>
                <li className="text-sm text-oat-500">14 Copper Lane, Portland OR</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-espresso-800 pt-7 sm:flex-row">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-oat-500">
            <BeanIcon className="h-4 w-4 text-caramel-500" />
            © 2026 Ember &amp; Oak Roasting Co.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oat-500">
            Demo storefront — no real orders, brewed with care
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------ toasts */

export interface Toast {
  id: number;
  msg: string;
}

export function ToastHost({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-[70] flex flex-col gap-2.5" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex animate-toast-in items-center gap-3 rounded-md border border-caramel-500/40 bg-espresso-850/95 py-3 pl-3.5 pr-5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-sm"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-moss-400/20 text-moss-300">
            <CheckIcon className="h-3.5 w-3.5" />
          </span>
          <p className="text-sm font-medium text-oat-100">{t.msg}</p>
        </div>
      ))}
    </div>
  );
}
