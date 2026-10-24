"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES, STATS } from "../../../utils/constants";
import { Chars, EASE } from "../../lab/ui";
import { SHORT_NAME, offeringsOf, tint } from "./data";

const projects = STATS.find((s) => s.label === "Projects Delivered");
const clients = STATS.find((s) => s.label === "Global Clients");

/**
 * Hero: one band per discipline. The open band widens (desktop) or grows
 * (mobile) to show what the service covers; the rest fold into slivers.
 */
const Spectrum = () => {
  const [open, setOpen] = useState(0);

  return (
    <section aria-labelledby="services-title" className="relative px-4 pb-20 pt-28 md:px-10 md:pt-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <h1
            id="services-title"
            className="font-heading text-[clamp(2.75rem,7.5vw,7.25rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-[#E2E8F4]"
          >
            <Chars text="Five disciplines." delay={0.15} />
            <br />
            <span className="text-[#E2E8F4]/45">
              <Chars text="One studio." delay={0.5} />
            </span>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
            className="max-w-md"
          >
            <p className="text-lg leading-relaxed text-[#B8CCDD]">
              Design, engineering, film, growth and community, run by one team so your website, brand and campaigns
              never drift apart. {projects?.value}
              {projects?.suffix} projects shipped for {clients?.value}
              {clients?.suffix} clients.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#planner"
                className="rounded-full bg-[#38BDF8] px-6 py-3 font-semibold text-[#05070B] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Plan your project
              </a>
              <Link
                href="/contact"
                className="rounded-full border border-white/20 px-6 py-3 font-semibold text-[#E2E8F4] transition-colors hover:border-[#38BDF8] hover:text-[#38BDF8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#38BDF8]"
              >
                Book a free call
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col gap-2 md:h-[clamp(520px,78vh,800px)] md:flex-row">
          {SERVICES.map((service, i) => {
            const active = open === i;
            const offerings = offeringsOf(service).slice(0, 5);
            return (
              <motion.article
                key={service.id}
                aria-label={service.name}
                initial={{ clipPath: "inset(100% 0% 0% 0% round 18px)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0% round 18px)" }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.35 + i * 0.09 }}
                onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
                onFocusCapture={() => setOpen(i)}
                className={`relative overflow-hidden rounded-[18px] border transition-[flex-grow,background-color,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:min-w-[68px] md:basis-0 ${
                  active ? "md:grow-[7]" : "md:grow"
                }`}
                style={{
                  borderColor: tint(service.color, active ? 0.5 : 0.18),
                  background: `linear-gradient(170deg, ${tint(service.color, active ? 0.32 : 0.16)} 0%, ${tint(
                    service.color,
                    active ? 0.08 : 0.04,
                  )} 55%, rgba(8,16,30,0.6) 100%)`,
                }}
              >
                {/* Light streak that sits on the open band's top edge */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px transition-opacity duration-700"
                  style={{
                    opacity: active ? 1 : 0,
                    background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
                  }}
                />

                {/* Folded state: a tap target with the name set vertically on desktop */}
                <button
                  type="button"
                  aria-expanded={active}
                  onClick={() => setOpen(i)}
                  className={`flex w-full items-center gap-3 px-5 py-5 text-left focus-visible:outline-none md:absolute md:inset-0 md:flex-col md:items-center md:justify-center md:px-0 md:py-6 ${
                    active ? "md:pointer-events-none md:opacity-0" : "md:opacity-100"
                  } transition-opacity duration-300`}
                >
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 shrink-0 rounded-full md:hidden"
                    style={{ backgroundColor: service.color }}
                  />
                  <span className="font-heading text-xl font-semibold tracking-[-0.02em] text-[#E2E8F4] md:mx-auto md:rotate-180 md:text-3xl md:[writing-mode:vertical-rl]">
                    {SHORT_NAME[service.id]}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      key="open"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.35 } }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      className="px-5 pb-6 md:absolute md:inset-0 md:flex md:items-center md:px-8 md:py-10 lg:px-12"
                    >
                      {/* Width of the fully opened band (7 of 11 shares of the row) minus its padding, fixed so copy doesn't reflow while the band widens */}
                      <div
                        className="md:w-(--open-w) md:shrink-0"
                        style={{ "--open-w": "min(900px, calc((min(100vw - 80px, 1440px) - 32px) * 0.63 - 96px))" } as CSSProperties}
                      >
                        <h2 className="hidden font-heading text-[clamp(2.5rem,min(5.2vw,9vh),6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white md:block">
                          {service.name}
                        </h2>
                        <p className="max-w-[48ch] text-lg leading-relaxed text-[#E2E8F4]/80 md:mt-[2.4vh] md:text-[clamp(1.125rem,min(1.5vw,2.7vh),1.625rem)] md:leading-[1.5]">
                          {service.shortDesc}
                        </p>

                        <ul className="mt-8 flex flex-wrap gap-2.5 md:mt-[3.2vh]">
                          {offerings.map((o) => (
                            <li
                              key={o}
                              className="rounded-full border px-4 py-2 text-sm text-[#E2E8F4] md:text-[clamp(0.875rem,min(1.05vw,2vh),1.125rem)]"
                              style={{ borderColor: tint(service.color, 0.4), backgroundColor: tint(service.color, 0.1) }}
                            >
                              {o}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-base font-semibold md:mt-[3.2vh] md:text-[clamp(1rem,min(1.1vw,2.1vh),1.125rem)]">
                          <a
                            href={`#${service.slug}`}
                            className="rounded-full px-6 py-3 text-[#05070B] lg:px-7 lg:py-3.5 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                            style={{ backgroundColor: service.color }}
                          >
                            See how we work
                          </a>
                          <Link
                            href={`/services/${service.slug}`}
                            className="text-[#E2E8F4] underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                          >
                            Full service details
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Spectrum;
