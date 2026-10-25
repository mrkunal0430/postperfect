"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { INDUSTRIES, SERVICES } from "../../../utils/constants";
import { SHORT_NAME, offeringsOf, tint } from "../services/data";
import { EASE } from "../../lab/ui";

/** All five services as one index. Hover (or tap) a row to open it. */
const ServicesIndex = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" aria-labelledby="services-title" className="px-4 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-14 md:grid-cols-[0.7fr_1.3fr] lg:gap-24">
        <div className="md:sticky md:top-28 md:self-start">
          <h2
            id="services-title"
            className="font-heading text-[clamp(2.5rem,5.5vw,5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-text-primary"
          >
            Five services.
            <br />
            One team.
          </h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-text-secondary">
            Most clients start with one and add the rest as they grow. Strategy, design, engineering and growth stay in
            the same hands, so nothing gets lost between agencies.
          </p>
          <Link
            href="/services"
            className="mt-8 inline-flex border-b border-accent pb-1 font-medium text-text-primary transition-colors hover:text-accent"
          >
            Compare all services
          </Link>

          <div className="mt-14 hidden md:block">
            <h3 className="text-sm text-text-muted">Industries we build for</h3>
            <p className="mt-3 max-w-[44ch] leading-relaxed text-text-secondary">
              {INDUSTRIES.map((i) => i.name).join(", ")}.
            </p>
          </div>
        </div>

        <ul className="surface-panel overflow-hidden">
          {SERVICES.map((s, i) => {
            const active = open === i;
            const offerings = offeringsOf(s).slice(0, 6);
            return (
              <li
                key={s.id}
                className="relative border-b border-white/10 last:border-b-0"
                onMouseEnter={() => {
                  if (window.matchMedia("(hover: hover)").matches) setOpen(i);
                }}
              >
                {/* Service colour washes in behind the open row */}
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  initial={false}
                  animate={{ opacity: active ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ background: `linear-gradient(90deg, ${tint(s.color, 0.12)}, transparent 70%)` }}
                />
                <motion.span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[3px] origin-top"
                  initial={false}
                  animate={{ scaleY: active ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ background: s.color }}
                />

                <h3>
                  <button
                    type="button"
                    aria-expanded={active}
                    aria-controls={`svc-${s.id}`}
                    onClick={() => setOpen(active ? -1 : i)}
                    className="relative flex w-full items-baseline gap-5 py-7 pl-5 pr-2 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white md:py-9 md:pl-8"
                  >
                    <span className="w-6 shrink-0 text-sm tabular-nums text-text-muted">{s.number}</span>
                    <motion.span
                      animate={{ x: active ? 10 : 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className={`font-heading text-[clamp(1.75rem,3.8vw,3.4rem)] font-semibold leading-none tracking-[-0.035em] transition-colors ${
                        active ? "text-white" : "text-text-secondary"
                      }`}
                    >
                      {SHORT_NAME[s.id] ?? s.name}
                    </motion.span>
                    <span
                      aria-hidden
                      className="ml-auto text-2xl leading-none text-text-muted transition-transform duration-500"
                      style={{ transform: active ? "rotate(45deg)" : "none", color: active ? s.color : undefined }}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      id={`svc-${s.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE }}
                      className="relative overflow-hidden"
                    >
                      <div className="grid gap-6 pb-9 pl-16 pr-4 md:grid-cols-[1fr_1fr] md:pl-[4.75rem]">
                        <div>
                          <p className="text-lg leading-relaxed text-text-primary">{s.tagline}</p>
                          <Link
                            href={`/services/${s.slug}`}
                            className="mt-5 inline-flex rounded-full border px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:text-bg-secondary"
                            style={{ borderColor: tint(s.color, 0.6) }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = s.color)}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            Explore {SHORT_NAME[s.id] ?? s.name}
                          </Link>
                        </div>
                        <ul className="grid gap-x-6 gap-y-2 text-sm text-text-secondary sm:grid-cols-2">
                          {offerings.map((o, k) => (
                            <motion.li
                              key={o}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, ease: EASE, delay: 0.1 + k * 0.04 }}
                              className="flex gap-2"
                            >
                              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: s.color }} />
                              {o}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
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

export default ServicesIndex;
