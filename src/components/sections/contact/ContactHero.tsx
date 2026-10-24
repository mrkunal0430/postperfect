"use client";

import { motion } from "framer-motion";
import { Chars, EASE } from "../../lab/ui";
import StudioClock from "../../ui/StudioClock";
import { CONTAINER, GUTTER, H1, LEAD } from "../../ui/typography";

/** Contact page opener: the ask on the left, the live studio clock on the right. */
const ContactHero = () => (
  <section aria-labelledby="contact-title" className={`${GUTTER} pb-16 pt-28 md:pb-24 md:pt-36`}>
    <div className={`${CONTAINER} grid gap-14 md:grid-cols-[1.25fr_1fr] md:items-end`}>
      <div>
        <h1 id="contact-title" className={H1}>
          <Chars text="Tell us what" delay={0.15} />
          <br />
          <Chars text="you're building." delay={0.4} />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.8 }}
          className={`mt-8 max-w-[46ch] ${LEAD}`}
        >
          Send a brief and a senior specialist will reply with questions, a rough plan and next steps. The first
          consultation is free and covered by an NDA if you need one.
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
        className="md:justify-self-end"
      >
        <StudioClock />
      </motion.div>
    </div>
  </section>
);

export default ContactHero;
