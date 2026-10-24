"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Eyebrow } from "./ui";

// The line runs edge to edge and passes through one node above each step
// column (12.5%, 37.5%, 62.5%, 87.5% of the width).
const PATH =
  "M 0 80 C 60 80 70 120 125 120 S 310 40 375 40 S 560 120 625 120 S 810 40 875 40 S 960 80 1000 80";

const STEPS = [
  { x: 125, y: 120, num: "01", title: "Discover", body: "Goals, users and competitors mapped into a written scope." },
  { x: 375, y: 40, num: "02", title: "Design", body: "Clickable prototypes with motion, approved before code." },
  { x: 625, y: 120, num: "03", title: "Build", body: "Sprints with a live preview link you can follow." },
  { x: 875, y: 40, num: "04", title: "Launch & grow", body: "Go live, then marketing and support keep it climbing." },
];

type StepData = (typeof STEPS)[number];

// 0 → 1 as the head of the line arrives at this step's node.
const useLit = (step: StepData, headX: MotionValue<number>) =>
  useTransform(headX, [step.x - 60, step.x], [0, 1]);

const Node = ({ step, headX }: { step: StepData; headX: MotionValue<number> }) => {
  const lit = useLit(step, headX);
  const ring = useTransform(lit, [0, 1], [0.25, 1]);
  const halo = useTransform(lit, [0, 1], [0, 0.25]);
  return (
    <g transform={`translate(${step.x} ${step.y})`}>
      <motion.circle r="18" fill="#38BDF8" style={{ opacity: halo }} />
      <circle r="8" fill="#08101E" />
      <motion.circle r="8" fill="none" stroke="#38BDF8" strokeWidth="2" style={{ opacity: ring }} />
      <motion.circle r="3.5" fill="#38BDF8" style={{ opacity: lit }} />
    </g>
  );
};

const Card = ({ step, headX }: { step: StepData; headX: MotionValue<number> }) => {
  const lit = useLit(step, headX);
  const opacity = useTransform(lit, [0, 1], [0.45, 1]);
  const y = useTransform(lit, [0, 1], [14, 0]);
  const border = useTransform(lit, [0, 1], ["rgba(56,189,248,0.08)", "rgba(56,189,248,0.35)"]);
  return (
    <div className="px-1.5 md:px-2">
      <motion.div
        style={{ opacity, y, borderColor: border }}
        className="h-full rounded-2xl border bg-[#0B1424]/70 p-5 backdrop-blur-md md:p-6"
      >
        <p className="font-mono text-sm text-[#38BDF8]">{step.num}</p>
        <h3 className="mt-3 font-heading text-xl font-semibold tracking-[-0.02em] md:text-2xl">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#B8CCDD] md:text-base">{step.body}</p>
      </motion.div>
    </div>
  );
};

const ProcessPath = () => {
  const ref = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGGElement>(null);
  const headX = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const draw = useTransform(scrollYProgress, [0.05, 0.9], [0, 1]);

  // Keep the glowing head on the tip of the drawn line, and light steps by
  // where the head actually is.
  useMotionValueEvent(draw, "change", (v) => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;
    const p = path.getPointAtLength(path.getTotalLength() * v);
    dot.setAttribute("transform", `translate(${p.x} ${p.y})`);
    headX.set(p.x);
  });

  return (
    <section ref={ref} aria-label="Process" className="relative h-[280vh]">
      <div className="sticky top-0 flex h-screen items-center px-4 pt-20 md:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:gap-8">
          <div>
            <Eyebrow>Process</Eyebrow>
            <h2 className="mt-5 font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              From first call
              <br />
              <span className="text-[#38BDF8]">to launch day.</span>
            </h2>
          </div>

          <svg viewBox="0 0 1000 160" aria-hidden className="w-full overflow-visible">
            <defs>
              <filter id="pp-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path d={PATH} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeDasharray="4 8" />
            <motion.path
              ref={pathRef}
              d={PATH}
              fill="none"
              stroke="#38BDF8"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#pp-glow)"
              style={{ pathLength: draw }}
            />
            {STEPS.map((s) => (
              <Node key={s.num} step={s} headX={headX} />
            ))}
            <g ref={dotRef} transform="translate(0 80)">
              <circle r="16" fill="#38BDF8" opacity="0.15" />
              <circle r="6" fill="#F0FDFF" filter="url(#pp-glow)" />
            </g>
          </svg>

          <div className="-mx-1.5 grid grid-cols-2 gap-y-3 md:-mx-2 md:grid-cols-4">
            {STEPS.map((s) => (
              <Card key={s.num} step={s} headX={headX} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessPath;
