"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Eyebrow } from "./ui";

// Words wrapped in *asterisks* light up cyan instead of white.
const TEXT =
  "We don't build websites that look like websites. We build *digital* *experiences* people remember, share and come back to. Strategy, design, code and motion, crafted by *one* *team* that obsesses over every detail.";

const Word = ({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) => {
  const accent = word.startsWith("*");
  const clean = word.replaceAll("*", "");
  // Unlit words stay legible (no blur) so the sentence reads before it lights up.
  // Function form on purpose: the range form of opacity gets handed to a native
  // ScrollTimeline, which ignores the section offsets and fades lit words back out.
  const opacity = useTransform(progress, (p) => {
    const t = Math.min(1, Math.max(0, (p - range[0]) / (range[1] - range[0])));
    return 0.22 + t * 0.78;
  });
  return (
    <motion.span style={{ opacity }} className={`mr-[0.25em] inline-block ${accent ? "text-[#38BDF8]" : ""}`}>
      {clean}
    </motion.span>
  );
};

const Manifesto = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = TEXT.split(" ");

  return (
    <section ref={ref} aria-label="Manifesto" className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center px-4 md:px-10">
        {/* Dark wash behind the copy so it holds contrast over the fluted-glass background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 70% at 30% 50%, rgba(5,8,20,0.82) 0%, rgba(5,8,20,0.55) 45%, transparent 80%)",
          }}
        />
        <div className="relative">
          <Eyebrow>Manifesto</Eyebrow>
          <p className="mt-8 max-w-[32ch] font-heading text-[clamp(1.75rem,3.8vw,3.75rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[#E2E8F4]">
            {words.map((w, i) => {
              const start = (i / words.length) * 0.85;
              return <Word key={i} word={w} progress={scrollYProgress} range={[start, start + 0.85 / words.length + 0.04]} />;
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
