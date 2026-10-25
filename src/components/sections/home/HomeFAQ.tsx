"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "../../lab/ui";
import { HOME_FAQ } from "./data";

const HomeFAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section aria-labelledby="home-faq-title" className="px-4 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <h2
            id="home-faq-title"
            className="font-heading text-[clamp(2.5rem,5.5vw,5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-text-primary"
          >
            Before you ask.
          </h2>
          <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-text-secondary">
            Something else on your mind? Email{" "}
            <a href="mailto:info@postperfect.in" className="text-accent underline underline-offset-4 hover:text-accent-glow">
              info@postperfect.in
            </a>{" "}
            and a specialist will answer.
          </p>
        </div>

        <ul className="surface-panel px-5 md:px-8">
          {HOME_FAQ.map((item, i) => {
            const active = open === i;
            return (
              <li key={item.q} className="border-b border-white/10 last:border-b-0">
                <h3>
                  <button
                    type="button"
                    aria-expanded={active}
                    aria-controls={`home-faq-${i}`}
                    onClick={() => setOpen(active ? null : i)}
                    className="flex w-full items-center gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span
                      className={`flex-1 font-heading text-xl font-medium tracking-[-0.02em] transition-colors md:text-2xl ${
                        active ? "text-text-primary" : "text-text-secondary"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className={`relative h-4 w-4 shrink-0 transition-colors before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-px after:bg-current after:transition-transform after:duration-300 ${
                        active ? "text-accent after:scale-y-0" : "text-text-muted"
                      }`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      id={`home-faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[62ch] pb-7 leading-relaxed text-text-secondary">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default HomeFAQ;
