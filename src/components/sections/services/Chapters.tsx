"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { SERVICES, type Service } from "../../../utils/constants";
import { EASE } from "../../lab/ui";
import { SHORT_NAME, offeringsOf, tint } from "./data";
import { BrandSpecimen, MarketingSpecimen, SocialSpecimen, VideoSpecimen, WebSpecimen } from "./Specimens";

const Specimen = ({ service }: { service: Service }) => {
  const c = service.color;
  switch (service.icon) {
    case "web":
      return <WebSpecimen color={c} />;
    case "video":
      return <VideoSpecimen color={c} />;
    case "branding":
      return <BrandSpecimen color={c} />;
    case "marketing":
      return <MarketingSpecimen color={c} roas={service.metrics?.[0]?.value ?? ""} />;
    default:
      return <SocialSpecimen color={c} />;
  }
};

type ChapterProps = {
  service: Service;
  index: number;
  planned: boolean;
  onToggle: (id: string) => void;
  onActive: (i: number) => void;
};

/** True below the md breakpoint, where each chapter shows its own demo inline. */
const useSmallScreen = () => {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return small;
};

const Chapter = ({ service, index, planned, onToggle, onActive }: ChapterProps) => {
  const ref = useRef<HTMLElement>(null);
  const small = useSmallScreen();
  const near = useInView(ref, { margin: "300px 0px" });
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  const offerings = offeringsOf(service);

  return (
    <article
      ref={ref}
      id={service.slug}
      aria-labelledby={`${service.slug}-title`}
      className="scroll-mt-28 border-t border-white/10 py-16 md:min-h-[88vh] md:py-24"
    >
      {small && <div className="aspect-[4/3]">{near && <Specimen service={service} />}</div>}

      <h3
        id={`${service.slug}-title`}
        className="mt-10 font-heading text-[clamp(2.25rem,4.4vw,4rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white md:mt-0"
      >
        {service.name}
      </h3>
      <p className="mt-3 text-lg" style={{ color: service.color }}>
        {service.tagline}
      </p>
      <p className="mt-6 max-w-[62ch] leading-relaxed text-[#B8CCDD]">{service.fullDescription}</p>

      <h4 className="mt-10 font-heading text-lg font-semibold text-white">What's included</h4>
      <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
        {offerings.map((o) => (
          <li key={o} className="flex items-start gap-3 border-b border-white/[0.07] py-3 text-[#E2E8F4]">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: service.color }} />
            {o}
          </li>
        ))}
      </ul>

      {service.metrics && (
        <dl className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {service.metrics.map((m) => (
            <div key={m.label} className="flex flex-col">
              <dt className="order-2 text-sm text-[#92AAC0]">{m.label}</dt>
              <dd className="font-heading text-3xl font-semibold tracking-[-0.03em] text-white">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <p className="mt-10 text-sm text-[#92AAC0]">
        <span className="text-[#B8CCDD]">Tools we use: </span>
        {service.techStack?.join(", ")}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          aria-pressed={planned}
          onClick={() => onToggle(service.id)}
          className="rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          style={
            planned
              ? { backgroundColor: service.color, borderColor: service.color, color: "#05070B" }
              : { borderColor: tint(service.color, 0.5), color: "#E2E8F4" }
          }
        >
          {planned ? "Added to your plan" : "Add to my plan"}
        </button>
        <Link
          href={`/services/${service.slug}`}
          className="text-sm font-semibold text-[#E2E8F4] underline decoration-white/30 underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Industries, process and FAQs for {SHORT_NAME[service.id]}
        </Link>
      </div>
    </article>
  );
};

const Chapters = ({ plan, onToggle }: { plan: string[]; onToggle: (id: string) => void }) => {
  const [active, setActive] = useState(0);
  const service = SERVICES[active];

  return (
    <section aria-labelledby="chapters-title" className="px-4 md:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-3xl pb-6 pt-10">
          <h2
            id="chapters-title"
            className="font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white"
          >
            What each discipline covers
          </h2>
          <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-[#B8CCDD]">
            Every service is run by senior specialists and shares one project lead, so you brief us once.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
          {/* Sticky demo for whichever chapter is in the middle of the screen */}
          <div className="hidden md:block">
            <div className="sticky top-28 flex h-[calc(100vh-9rem)] flex-col justify-center gap-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <Specimen service={service} />
                </motion.div>
              </AnimatePresence>

              <nav aria-label="Jump to a service" className="flex gap-1.5">
                {SERVICES.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.slug}`}
                    aria-current={i === active ? "true" : undefined}
                    className="group flex-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    <span
                      className="block h-1 rounded-full transition-all duration-500"
                      style={{ backgroundColor: i === active ? s.color : "rgba(255,255,255,0.12)" }}
                    />
                    <span
                      className={`mt-2 block truncate text-xs transition-colors ${
                        i === active ? "text-white" : "text-[#92AAC0] group-hover:text-white"
                      }`}
                    >
                      {SHORT_NAME[s.id]}
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div>
            {SERVICES.map((s, i) => (
              <Chapter
                key={s.id}
                service={s}
                index={i}
                planned={plan.includes(s.id)}
                onToggle={onToggle}
                onActive={setActive}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chapters;
