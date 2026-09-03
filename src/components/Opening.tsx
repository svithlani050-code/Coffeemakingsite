import { HERO_IMAGE } from "../data/products";
import { ArrowIcon, CupSteam, StarIcon } from "./icons";

function RotatingStamp() {
  return (
    <div className="absolute -left-8 top-8 z-20 hidden h-28 w-28 sm:block lg:-left-12">
      <svg viewBox="0 0 120 120" className="h-full w-full animate-spin-slow text-caramel-400">
        <defs>
          <path id="stamp-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" fill="none" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#1b120b" stroke="#d98e32" strokeOpacity="0.45" />
        <text fontSize="11.5" fontFamily="Space Mono, monospace" letterSpacing="3.2" fill="currentColor">
          <textPath href="#stamp-circle">ROASTED FRESH • SMALL BATCH • EST. 2016 •</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <CupSteam className="h-9 w-9 text-ember-300" />
      </div>
    </div>
  );
}

export function Opening() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-32 left-[-10%] h-[34rem] w-[34rem] animate-drift rounded-full bg-caramel-600/12 blur-[110px]" />
      <div className="pointer-events-none absolute right-[-12%] top-40 h-[30rem] w-[30rem] rounded-full bg-ember-500/10 blur-[110px]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-16">
        {/* ---- left: statement ---- */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="animate-fade-up flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.28em] text-caramel-400">
            <span className="inline-block h-2 w-2 animate-pulse-dot rounded-full bg-caramel-500" />
            Roast week 08 — Batch №142
          </p>

          <h1
            className="mt-6 animate-fade-up font-display text-[2.7rem] font-semibold leading-[1.02] tracking-tight text-oat-50 sm:text-6xl lg:text-[4.6rem]"
            style={{ animationDelay: "0.1s" }}
          >
            Small-batch coffee,
            <br />
            roasted the{" "}
            <em className="font-light italic text-caramel-400">morning</em>
            <br />
            it ships.
          </h1>

          <p
            className="mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-oat-300"
            style={{ animationDelay: "0.2s" }}
          >
            Six seasonal roasts on the bench right now — sourced from growers we
            visit, profiled by hand on a 12-kilo drum, and out the door within
            48 hours of the drop. No warehouses. No stale bags. Ever.
          </p>

          <div className="mt-9 flex animate-fade-up flex-wrap items-center gap-4" style={{ animationDelay: "0.3s" }}>
            <a
              href="#shop"
              className="group inline-flex items-center gap-3 rounded-full bg-caramel-500 px-7 py-3.5 font-semibold text-espresso-950 shadow-[0_10px_30px_-10px_rgba(217,142,50,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-caramel-400 hover:shadow-[0_16px_38px_-10px_rgba(217,142,50,0.75)]"
            >
              Browse the roasts
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#craft"
              className="inline-flex items-center gap-2 rounded-full border border-espresso-600 px-7 py-3.5 font-medium text-oat-200 transition-all duration-300 hover:border-caramel-500/60 hover:text-caramel-300"
            >
              How we roast
            </a>
          </div>

          <dl
            className="mt-12 grid max-w-xl animate-fade-up grid-cols-3 gap-4 border-t border-espresso-700/70 pt-7"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              ["48 h", "roaster → courier"],
              ["27", "origin lots this year"],
              ["4.9 ★", "from 2,318 brewers"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-2xl font-semibold text-oat-50 sm:text-3xl">
                  {value.includes("★") ? (
                    <span className="inline-flex items-center gap-1.5">
                      {value.replace(" ★", "")}
                      <StarIcon className="h-4 w-4 text-caramel-400" />
                    </span>
                  ) : (
                    value
                  )}
                </dd>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-oat-400">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---- right: bench photo ---- */}
        <div className="relative lg:col-span-5">
          <RotatingStamp />
          <div className="relative ml-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-lg border border-espresso-700/70 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)] lg:max-w-none">
            <img
              src={HERO_IMAGE}
              alt="Pour-over coffee brewing on a walnut bench, steam rising"
              className="h-full w-full animate-kenburns object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/70 via-transparent to-espresso-950/20" />

            {/* now roasting chip */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-md border border-espresso-600/70 bg-espresso-900/85 px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember-400 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ember-400" />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-oat-400">
                    Now roasting
                  </p>
                  <p className="font-display text-base font-medium text-oat-50">
                    Ethiopia · Idido
                  </p>
                </div>
              </div>
              <p className="shrink-0 text-right font-mono text-[11px] leading-tight text-caramel-300">
                211 °C
                <span className="block text-oat-400">first crack 8:42</span>
              </p>
            </div>
          </div>

          {/* roast date tag */}
          <div className="absolute -bottom-5 right-6 z-20 rounded-sm bg-oat-100 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-espresso-900 shadow-lg">
            Roast date · Tue, week 08
          </div>
        </div>
      </div>
    </section>
  );
}
