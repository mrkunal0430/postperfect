"use client";

import { MotionConfig } from "framer-motion";
import PageWrapper from "../components/layout/PageWrapper";
import ContactHero from "../components/sections/contact/ContactHero";
import BriefForm from "../components/sections/contact/BriefForm";
import DirectLines from "../components/sections/contact/DirectLines";
import Accordion from "../components/ui/Accordion";
import { CONTAINER, GUTTER, H2, LEAD } from "../components/ui/typography";
import { HOURS_TABLE, STUDIO } from "../utils/studio";
import { CONTACT_FAQ } from "../components/sections/contact/faq";

const Contact = ({ initialServices }: { initialServices?: string[] }) => (
  <MotionConfig reducedMotion="user">
    <PageWrapper>
      <ContactHero />

      <section aria-labelledby="brief-title" className={`${GUTTER} pb-28 md:pb-36`}>
        {/* Mobile order: heading, form, details. Desktop: heading and details left, form right. */}
        <div className={`${CONTAINER} grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-x-20 lg:gap-y-12`}>
          <div className="lg:col-start-1 lg:row-start-1">
            <h2 id="brief-title" className={H2}>
              Send a brief
            </h2>
            <p className={`mt-5 max-w-[42ch] ${LEAD}`}>
              Four short steps. Only your name, email and the services you need are required.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-surface p-6 md:p-10 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
            <BriefForm initialServices={initialServices} />
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <h3 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-white">Prefer to talk first?</h3>
            <p className="mt-2 text-[#B8CCDD]">Any of these reach the same team.</p>
            <div className="mt-6">
              <DirectLines />
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-heading text-lg font-semibold text-white">Studio hours (IST)</h3>
                <dl className="mt-3 space-y-1.5 text-sm">
                  {HOURS_TABLE.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4">
                      <dt className="text-[#B8CCDD]">{h.days}</dt>
                      <dd className="tabular-nums text-[#E2E8F4]">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-white">Where we are</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#B8CCDD]">
                  {STUDIO.location}
                  <br />
                  {STUDIO.remote}
                </p>
                <p className="mt-3 flex gap-4 text-sm">
                  {STUDIO.socials.map((s) => (
                    <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="text-[#E2E8F4] underline decoration-white/30 underline-offset-4 hover:text-[#38BDF8]">
                      {s.name}
                    </a>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-faq-title" className={`${GUTTER} pb-28 md:pb-40`}>
        <div className={`${CONTAINER} grid gap-12 md:grid-cols-[0.8fr_1.2fr] lg:gap-24`}>
          <h2 id="contact-faq-title" className={H2}>
            Before you write
          </h2>
          <Accordion items={CONTACT_FAQ} />
        </div>
      </section>
    </PageWrapper>
  </MotionConfig>
);

export default Contact;
