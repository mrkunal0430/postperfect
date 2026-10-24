"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "../../../utils/constants";
import { CYAN, EASE } from "../../lab/ui";

const WEEKS = 12;

// Where each process step sits on a typical 12-week web app build (in weeks).
const SPANS = [
  { from: 0, to: 2 },
  { from: 1.5, to: 4 },
  { from: 3.5, to: 10 },
  { from: 9.5, to: 12, ongoing: true },
];

const MILESTONES = [
  { at: 2, label: "Scope signed off" },
  { at: 4, label: "Prototype approved" },
  { at: 10, label: "Launch" },
];

const pct = (weeks: number) => `${(weeks / WEEKS) * 100}%`;

/** The process as a schedule, so clients can see what happens in which week. */
const Timeline = () => (
  <section aria-labelledby="timeline-title" className="px-4 py-28 md:px-10 md:py-36">
    <div className="mx-auto max-w-[1440px]">
      <div className="grid gap-6 md:grid-cols-2 md:items-end">
        <h2
          id="timeline-title"
          className="font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white"
        >
          What happens, week by week
        </h2>
        <p className="max-w-[48ch] text-lg leading-relaxed text-[#B8CCDD] md:justify-self-end">
          A typical 12-week web app. Marketing sites run in 4–6 weeks. You get your own schedule after the discovery
          call, and a live preview link from the first build sprint.
        </p>
      </div>

      <div className="mt-16">
        {/* Week ruler */}
        <div className="grid md:grid-cols-[280px_1fr] md:gap-10">
          <span className="hidden md:block" />
          <div className="relative flex h-8 border-b border-white/15 font-mono text-[11px] text-[#92AAC0]">
            {Array.from({ length: WEEKS }, (_, i) => (
              <span key={i} className="flex-1 border-l border-white/10 pl-1.5">
                <span className={i % 2 ? "hidden sm:inline" : ""}>W{i + 1}</span>
              </span>
            ))}
          </div>
        </div>

        <ol>
          {PROCESS_STEPS.map((step, i) => {
            const span = SPANS[i];
            return (
              <li key={step.number} className="grid gap-3 border-b border-white/[0.07] py-6 md:grid-cols-[280px_1fr] md:items-center md:gap-10">
                <div>
                  <p className="font-heading text-xl font-semibold text-white">
                    <span className="mr-3 font-mono text-sm text-[#38BDF8]">{step.number}</span>
                    {step.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#B8CCDD]">{step.desc}</p>
                </div>
                <div
                  className="relative h-10"
                  style={{
                    backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                    backgroundSize: `${100 / WEEKS}% 100%`,
                  }}
                >
                  <motion.span
                    className="absolute inset-y-1.5 rounded-full"
                    style={{
                      left: pct(span.from),
                      width: pct(span.to - span.from),
                      originX: 0,
                      background: span.ongoing
                        ? `linear-gradient(90deg, ${CYAN}, rgba(56,189,248,0))`
                        : `linear-gradient(90deg, rgba(56,189,248,0.55), ${CYAN})`,
                      boxShadow: span.ongoing ? "none" : "0 0 24px rgba(56,189,248,0.35)",
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 1, ease: EASE, delay: 0.15 + i * 0.18 }}
                  />
                  {span.ongoing && (
                    <span className="absolute inset-y-0 right-0 flex items-center text-xs text-[#E2E8F4]">ongoing</span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {/* Milestones on the same week scale */}
        <div className="grid md:grid-cols-[280px_1fr] md:gap-10">
          <p className="hidden pt-5 text-sm text-[#92AAC0] md:block">Sign-off points</p>
          <ul className="relative h-20">
            {MILESTONES.map((m) => (
              <li
                key={m.label}
                className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-2 text-center"
                style={{ left: pct(m.at) }}
              >
                <span aria-hidden className="h-3 w-3 rotate-45 border-2 border-[#38BDF8] bg-[#08101E]" />
                <span className="w-20 text-xs leading-tight text-[#E2E8F4] sm:w-28">{m.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Timeline;
