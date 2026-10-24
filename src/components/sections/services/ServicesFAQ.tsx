"use client";

import { useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { SERVICES } from "../../../utils/constants";
import { EASE } from "../../lab/ui";
import { SHORT_NAME } from "./data";
import Accordion from "../../ui/Accordion";

/** Questions grouped by service: tabs pick the service, each answer opens in place. */
const ServicesFAQ = () => {
  const [tab, setTab] = useState(0);
  const service = SERVICES[tab];

  const select = (i: number) => {
    setTab(i);
    document.getElementById(`faq-tab-${i}`)?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") select((tab + 1) % SERVICES.length);
    if (e.key === "ArrowLeft") select((tab - 1 + SERVICES.length) % SERVICES.length);
  };

  return (
    <section aria-labelledby="faq-title" className="px-4 py-28 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <h2
            id="faq-title"
            className="font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white"
          >
            Questions clients ask first
          </h2>
          <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-[#B8CCDD]">
            Can't find yours? Email{" "}
            <a href="mailto:info@postperfect.in" className="text-[#38BDF8] underline underline-offset-4">
              info@postperfect.in
            </a>{" "}
            and a specialist will answer it.
          </p>
        </div>

        <div>
          <div role="tablist" aria-label="Service" onKeyDown={onKey} className="flex flex-wrap gap-2">
            {SERVICES.map((s, i) => {
              const active = i === tab;
              return (
                <button
                  key={s.id}
                  id={`faq-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls="faq-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => select(i)}
                  className="relative rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  style={{ color: active ? "#05070B" : "#B8CCDD" }}
                >
                  {active && (
                    <motion.span
                      layoutId="faq-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: s.color }}
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  )}
                  <span className="relative">{SHORT_NAME[s.id]}</span>
                </button>
              );
            })}
          </div>

          <div id="faq-panel" role="tabpanel" aria-labelledby={`faq-tab-${tab}`} className="mt-8">
            <Accordion key={service.id} items={service.faq ?? []} color={service.color} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesFAQ;
