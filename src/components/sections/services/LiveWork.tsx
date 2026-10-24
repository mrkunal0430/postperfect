"use client";

import { LIVE_WORK } from "./data";

const domainOf = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/** Shipped projects that anyone can open and check for themselves. */
const LiveWork = () => (
  <section aria-labelledby="work-title" className="px-4 py-28 md:px-10 md:py-40">
    <div className="mx-auto max-w-[1440px]">
      <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
        <h2
          id="work-title"
          className="font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white"
        >
          Live, in production, used every day
        </h2>
        <p className="max-w-[48ch] text-lg leading-relaxed text-[#B8CCDD] md:justify-self-end">
          Stores, fintech platforms and business tools we designed and built. Every one is public, so open them and
          judge the work yourself.
        </p>
      </div>

      <ul className="mt-14 border-t border-white/10">
        {LIVE_WORK.map((p) => (
          <li key={p.url}>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group relative grid gap-2 overflow-hidden border-b border-white/10 py-7 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_12rem] md:items-center md:gap-10"
            >
              {/* Fill that wipes in from the left on hover */}
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#38BDF8]/[0.14] to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
              <span className="relative font-heading text-[clamp(1.75rem,3.2vw,3rem)] font-semibold leading-none tracking-[-0.04em] text-white transition-transform duration-500 group-hover:translate-x-3">
                {p.title}
              </span>
              <span className="relative max-w-[60ch] text-[#B8CCDD]">
                <span className="text-[#E2E8F4]">{p.category}.</span> {p.desc}
              </span>
              <span className="relative flex items-center gap-2 text-sm font-semibold text-[#38BDF8] md:justify-end">
                {domainOf(p.url)}
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  <path d="M5 11L11 5M6 5h5v5" />
                </svg>
                <span className="sr-only">(opens in a new tab)</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default LiveWork;
