"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { EASE } from "../../lab/ui";
import { CONTAINER, GUTTER, H2 } from "../../ui/typography";
import { MILESTONES } from "./data";

/** One digit of the year, rolling vertically to its value like an odometer. */
const Digit = ({ value }: { value: number }) => (
  <span className="relative inline-block h-[1em] overflow-hidden align-top">
    <motion.span
      className="flex flex-col"
      animate={{ y: `${-value}em` }}
      transition={{ type: "spring", stiffness: 140, damping: 22 }}
    >
      {Array.from({ length: 10 }, (_, d) => (
        <span key={d} className="block h-[1em] leading-none">
          {d}
        </span>
      ))}
    </motion.span>
  </span>
);

/** The studio's story: scroll moves through the years while the page holds still. */
const Journey = () => {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(MILESTONES.length - 1, Math.max(0, Math.floor(p * MILESTONES.length)));
    if (i !== active) setActive(i);
  });

  const m = MILESTONES[active];

  return (
    <section
      ref={ref}
      aria-labelledby="journey-title"
      className="relative"
      style={{ height: `${MILESTONES.length * 65 + 35}vh` }}
    >
      <div className={`sticky top-0 flex h-screen flex-col justify-center ${GUTTER}`}>
        <div className={`${CONTAINER} w-full`}>
          <h2 id="journey-title" className={H2}>
            How we got here
          </h2>

          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[1.25fr_1fr] md:items-end">
            <p
              aria-hidden
              className="font-heading text-[clamp(6rem,21vw,19rem)] font-semibold leading-none tracking-[-0.06em] text-white tabular-nums"
            >
              {m.year.split("").map((d, i) => (
                <Digit key={i} value={Number(d)} />
              ))}
            </p>

            <div aria-hidden className="min-h-[9rem] md:pb-[0.08em]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <h3 className="font-heading text-3xl font-semibold tracking-[-0.03em] text-[#38BDF8] md:text-4xl">
                    {m.title}
                  </h3>
                  <p className="mt-3 max-w-[40ch] text-lg leading-relaxed text-[#B8CCDD]">{m.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Year rail with a fill that tracks scroll */}
          <div aria-hidden className="mt-12 md:mt-16">
            <div className="relative h-px bg-white/15">
              <motion.div className="absolute inset-y-0 left-0 w-full bg-[#38BDF8]" style={{ scaleX: scrollYProgress, originX: 0 }} />
            </div>
            <div className="mt-3 flex justify-between font-mono text-xs">
              {MILESTONES.map((ms, i) => (
                <span key={ms.year} className={`transition-colors duration-300 ${i <= active ? "text-white" : "text-[#92AAC0]"}`}>
                  {ms.year}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full list for screen readers, since the visual only shows one year at a time */}
      <ol className="sr-only">
        {MILESTONES.map((ms) => (
          <li key={ms.year}>
            {ms.year}: {ms.title}. {ms.description}
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Journey;
