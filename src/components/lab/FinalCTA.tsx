"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow, Magnetic } from "./ui";

/** Closing call to action. Pass withContact where there is no site footer below it. */
const FinalCTA = ({ withContact = false }: { withContact?: boolean }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordY = useTransform(scrollYProgress, [0.3, 1], ["60%", "0%"]);
  const wordOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);

  return (
    <section
      ref={ref}
      aria-label="Start a project"
      className="relative overflow-hidden border-t border-white/10 px-4 pt-32 md:px-10 md:pt-44"
      style={{ background: "radial-gradient(600px circle at var(--x, 50%) var(--y, 30%), rgba(56,189,248,0.12), transparent 60%)" }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
    >
      <div className="flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>Your turn</Eyebrow>
          <h2 className="mt-6 max-w-[14ch] font-heading text-[clamp(3rem,8vw,8rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
            Let&apos;s make people <span className="text-[#38BDF8]">look twice.</span>
          </h2>
        </div>
        <div className="flex flex-col items-start gap-5">
          <Magnetic
            href="/contact"
            strength={0.4}
            className="flex h-40 w-40 items-center justify-center rounded-full bg-[#38BDF8] text-center text-lg font-semibold leading-tight text-[#05070B] transition-colors hover:bg-white md:h-48 md:w-48"
          >
            Start a<br />project →
          </Magnetic>
        </div>
      </div>

      {withContact && (
        <div className="mt-24 grid gap-8 border-t border-white/10 pt-10 text-sm text-[#B8CCDD] sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#92AAC0]">Email</span>
            <a href="mailto:info@postperfect.in" className="text-base text-[#E2E8F4] hover:text-[#38BDF8]">info@postperfect.in</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#92AAC0]">Phone</span>
            <a href="tel:+918750075080" className="text-base text-[#E2E8F4] hover:text-[#38BDF8]">+91 87500 75080</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#92AAC0]">Social</span>
            <span className="flex gap-4 text-base">
              <a href="https://www.linkedin.com/company/postperfecct/" target="_blank" rel="noreferrer" className="text-[#E2E8F4] hover:text-[#38BDF8]">LinkedIn</a>
              <a href="https://www.instagram.com/post_perfect_agency" target="_blank" rel="noreferrer" className="text-[#E2E8F4] hover:text-[#38BDF8]">Instagram</a>
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#92AAC0]">Explore</span>
            <span className="flex gap-4 text-base">
              <Link href="/services" className="text-[#E2E8F4] hover:text-[#38BDF8]">Services</Link>
              <Link href="/about" className="text-[#E2E8F4] hover:text-[#38BDF8]">Studio</Link>
            </span>
          </div>
        </div>
      )}

      <div aria-hidden className="mt-16 overflow-hidden">
        <motion.p
          style={{ y: wordY, opacity: wordOpacity }}
          className="select-none bg-gradient-to-b from-[#E2E8F4] to-[#E2E8F4]/0 bg-clip-text text-center font-heading text-[16.5vw] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent"
        >
          PostPerfect
        </motion.p>
      </div>
      {withContact && (
        <p className="py-6 text-center font-mono text-xs uppercase tracking-[0.25em] text-[#92AAC0]">© 2026 PostPerfect · Made in India</p>
      )}
    </section>
  );
};

export default FinalCTA;
