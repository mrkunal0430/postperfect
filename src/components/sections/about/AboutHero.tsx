"use client";

import { motion } from "framer-motion";
import { STATS } from "../../../utils/constants";
import { Chars, EASE } from "../../lab/ui";
import { CONTAINER, GUTTER, H1, LEAD } from "../../ui/typography";

/** About opener: who we are, with the studio's numbers underneath. */
const AboutHero = () => (
  <section aria-labelledby="about-title" className={`${GUTTER} pb-20 pt-28 md:pb-28 md:pt-36`}>
    <div className={CONTAINER}>
      <h1 id="about-title" className={`${H1} max-w-[14ch]`}>
        <Chars text="Designers, engineers" delay={0.15} />{" "}
        <span className="text-[#E2E8F4]/45">
          <Chars text="and storytellers under one roof." delay={0.5} />
        </span>
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1 }}
        className="mt-10 grid gap-8 md:grid-cols-[1.25fr_1fr]"
      >
        <span className="hidden md:block" />
        <p className={`max-w-[46ch] ${LEAD}`}>
          Born from an obsession with craft and driven by results. We build websites, apps, brands and campaigns that
          businesses rely on and people enjoy using, and we stay on after launch to keep them growing.
        </p>
      </motion.div>

      <dl className="mt-20 grid grid-cols-2 border-t border-white/10 md:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.1 + i * 0.08 }}
            className={`flex flex-col border-white/10 py-8 md:px-8 md:first:pl-0 ${i % 2 ? "pl-6 md:border-l" : "md:border-l md:first:border-l-0"}`}
          >
            <dt className="order-2 mt-2 text-sm text-[#92AAC0]">{s.label}</dt>
            <dd className="font-heading text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-none tracking-[-0.04em] text-white">
              {s.value}
              <span className="text-[#38BDF8]">{s.suffix}</span>
            </dd>
          </motion.div>
        ))}
      </dl>
    </div>
  </section>
);

export default AboutHero;
