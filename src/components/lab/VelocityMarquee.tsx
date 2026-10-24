"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** One row that drifts on its own and speeds up / skews with scroll velocity. */
const Row = ({ items, baseSpeed, outline }: { items: string[]; baseSpeed: number; outline?: boolean }) => {
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-2500, 0, 2500], [-5, 0, 5], { clamp: false });
  const skew = useTransform(velocity, [-2500, 2500], [12, -12]);
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    const b = boost.get();
    if (b < 0) direction.current = -1;
    else if (b > 0) direction.current = 1;
    base.set(base.get() + direction.current * baseSpeed * (delta / 1000) * (1 + Math.abs(b)));
  });

  const content = items.map((item) => (
    <span key={item} className="flex items-center gap-[0.35em] pr-[0.35em]">
      {item}
      <span aria-hidden className="text-[0.5em] text-[#38BDF8]">✦</span>
    </span>
  ));

  return (
    <div className="overflow-hidden">
      <motion.div
        style={{ x, skewX: skew }}
        className={`flex w-max whitespace-nowrap font-heading font-semibold uppercase leading-[1.05] tracking-[-0.04em] ${
          outline ? "text-transparent [-webkit-text-stroke:1.5px_rgba(237,242,247,0.45)]" : "text-[#E2E8F4]"
        }`}
      >
        <div className="flex">{content}</div>
        <div className="flex" aria-hidden>
          {content}
        </div>
      </motion.div>
    </div>
  );
};

const VelocityMarquee = () => (
  <section aria-label="Capabilities" className="flex flex-col gap-2 border-y border-white/10 py-16 text-[clamp(3rem,9vw,8.5rem)] md:py-24">
    <Row items={["Websites", "Mobile apps", "Custom software", "E-commerce"]} baseSpeed={-2} />
    <Row items={["Branding", "Video & animation", "Marketing", "Social media"]} baseSpeed={2} outline />
    <p className="mt-8 px-4 text-center font-mono text-xs uppercase tracking-[0.3em] text-[#92AAC0] md:px-10">
      React · Next.js · Node.js · Flutter · React Native · Python · PostgreSQL · AWS · Three.js
    </p>
  </section>
);

export default VelocityMarquee;
