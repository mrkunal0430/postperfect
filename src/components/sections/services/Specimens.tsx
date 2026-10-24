"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { EASE } from "../../lab/ui";
import { tint } from "./data";

/**
 * Steps through a demo's stages, holding each for its duration in ms, then
 * starts over. Reduced motion pins it to the finished state.
 */
const useLoop = (durations: number[]) => {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const last = durations.length - 1;
  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(() => setStep((s) => (s + 1) % durations.length), durations[step]);
    return () => clearTimeout(id);
  }, [reduce, step, durations]);
  return reduce ? last : step;
};

const Frame = ({ color, label, children }: { color: string; label: string; children: ReactNode }) => (
  <figure
    aria-label={label}
    className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border bg-[#070E1A]/85 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md"
    style={{ borderColor: tint(color, 0.28) }}
  >
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ background: `radial-gradient(circle at 80% 0%, ${tint(color, 0.18)}, transparent 55%)` }}
    />
    <div className="relative h-full">{children}</div>
  </figure>
);

// ─── Web: a page assembling block by block, then a speed score ───────────────

const WEB_BLOCKS = ["col-span-6", "col-span-4", "col-span-2", "col-span-2", "col-span-2", "col-span-2", "col-span-6"];
const WEB_TIMING = [...WEB_BLOCKS.map(() => 550), 600, 600, 2600];

export const WebSpecimen = ({ color }: { color: string }) => {
  const step = useLoop(WEB_TIMING);
  return (
    <Frame color={color} label="A web page being assembled section by section">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="mx-auto rounded bg-white/5 px-3 py-0.5 font-mono text-[10px] text-white/50">yourbrand.com</span>
      </div>
      <div className="grid h-[calc(100%-37px)] grid-cols-6 grid-rows-[1fr_4fr_2.6fr_1.2fr] gap-2 p-4">
        {WEB_BLOCKS.map((cls, i) => {
          const built = step > i;
          return (
            <motion.div
              key={i}
              className={`${cls} rounded-md border`}
              animate={{
                opacity: built ? 1 : 0.25,
                borderColor: built ? tint(color, 0.55) : "rgba(255,255,255,0.12)",
                backgroundColor: built ? tint(color, i === 1 ? 0.28 : 0.12) : "rgba(255,255,255,0)",
              }}
              style={{ borderStyle: built ? "solid" : "dashed" }}
              transition={{ duration: 0.45, ease: EASE }}
            />
          );
        })}
      </div>
      <motion.div
        className="absolute bottom-4 right-4 flex items-center gap-3 rounded-xl border border-white/10 bg-[#0D1A2E]/95 px-4 py-3"
        animate={{ opacity: step >= WEB_BLOCKS.length ? 1 : 0, y: step >= WEB_BLOCKS.length ? 0 : 12 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <svg viewBox="0 0 36 36" className="h-10 w-10 -rotate-90" aria-hidden>
          <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
          <motion.circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="#22C55E"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ pathLength: step >= WEB_BLOCKS.length ? 0.98 : 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          />
        </svg>
        <span className="text-xs leading-tight text-[#B8CCDD]">
          <b className="block font-heading text-lg text-white">98</b>
          PageSpeed
        </span>
      </motion.div>
    </Frame>
  );
};

// ─── Video: an edit timeline with a running playhead and timecode ────────────

const CLIPS = [
  { track: 0, from: 0, to: 22 },
  { track: 0, from: 23, to: 51 },
  { track: 0, from: 52, to: 78 },
  { track: 0, from: 79, to: 100 },
  { track: 1, from: 8, to: 30 },
  { track: 1, from: 60, to: 88 },
];
const WAVE = Array.from({ length: 64 }, (_, i) => 0.25 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.45)) * 0.75);
const LENGTH_SECONDS = 45;

export const VideoSpecimen = ({ color }: { color: string }) => {
  const reduce = useReducedMotion();
  const progress = useMotionValue(reduce ? 0.62 : 0);
  const left = useTransform(progress, (p) => `${p * 100}%`);
  const timecode = useRef<HTMLSpanElement>(null);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const controls = animate(progress, [0, 1], { duration: 9, ease: "linear", repeat: Infinity });
    return () => controls.stop();
  }, [progress, reduce]);

  useMotionValueEvent(progress, "change", (p) => {
    const t = p * LENGTH_SECONDS;
    const frames = Math.floor((t % 1) * 25);
    if (timecode.current) {
      timecode.current.textContent = `00:00:${String(Math.floor(t)).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
    }
    const s = CLIPS.findIndex((c) => c.track === 0 && p * 100 >= c.from && p * 100 <= c.to);
    if (s !== -1 && s !== scene) setScene(s);
  });

  return (
    <Frame color={color} label="A video edit timeline playing back">
      <div className="flex h-full flex-col gap-3 p-4">
        <div className="relative flex-1 overflow-hidden rounded-lg border border-white/10">
          <motion.div
            key={scene}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              background: [
                `linear-gradient(135deg, ${tint(color, 0.55)}, #120A1C 70%)`,
                `radial-gradient(circle at 30% 60%, ${tint(color, 0.5)}, #0A0F1C 65%)`,
                `linear-gradient(200deg, #1B1030, ${tint(color, 0.45)} 80%)`,
                `radial-gradient(circle at 75% 30%, ${tint(color, 0.6)}, #0B0912 60%)`,
              ][scene],
            }}
          />
          <span className="absolute left-3 top-3 rounded bg-black/50 px-2 py-0.5 font-mono text-[10px] text-white/80">
            Scene {scene + 1}
          </span>
          <span
            ref={timecode}
            className="absolute bottom-3 right-3 rounded bg-black/50 px-2 py-0.5 font-mono text-xs tabular-nums text-white"
          >
            00:00:00:00
          </span>
        </div>

        <div className="relative space-y-1.5 rounded-lg border border-white/10 bg-black/30 p-2">
          {[0, 1].map((track) => (
            <div key={track} className="relative h-6">
              {CLIPS.filter((c) => c.track === track).map((c) => (
                <span
                  key={c.from}
                  className="absolute inset-y-0 rounded-[4px] border"
                  style={{
                    left: `${c.from}%`,
                    width: `${c.to - c.from}%`,
                    borderColor: tint(color, track === 0 ? 0.7 : 0.4),
                    backgroundColor: tint(color, track === 0 ? 0.35 : 0.15),
                  }}
                />
              ))}
            </div>
          ))}
          <div className="flex h-7 items-center gap-[2px]">
            {WAVE.map((h, i) => (
              <span key={i} className="flex-1 rounded-full bg-white/25" style={{ height: `${h * 100}%` }} />
            ))}
          </div>
          <motion.span aria-hidden className="absolute inset-y-0 w-px bg-white" style={{ left }}>
            <span className="absolute -left-1 -top-1 h-2 w-2 rotate-45 bg-white" />
          </motion.span>
        </div>
      </div>
    </Frame>
  );
};

// ─── Branding: a mark drawn on its construction grid, then the system ───────

const BRAND_TIMING = [500, 1000, 1200, 900, 3200];

export const BrandSpecimen = ({ color }: { color: string }) => {
  const step = useLoop(BRAND_TIMING);
  const draw = (at: number) => ({ pathLength: step >= at ? 1 : 0, opacity: step >= at ? 1 : 0 });
  return (
    <Frame color={color} label="A logo mark drawn on its construction grid">
      <div className="grid h-full grid-cols-[1.3fr_1fr] gap-4 p-5">
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
          {[40, 80, 120, 160].map((v) => (
            <g key={v} stroke="rgba(255,255,255,0.07)">
              <line x1={v} y1="0" x2={v} y2="200" />
              <line x1="0" y1={v} x2="200" y2={v} />
            </g>
          ))}
          <motion.circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeDasharray="3 4"
            animate={draw(1)}
            transition={{ duration: 0.9, ease: EASE }}
          />
          <motion.circle
            cx="112"
            cy="82"
            r="34"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeDasharray="3 4"
            animate={draw(1)}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          />
          <motion.path
            d="M 78 160 L 78 48 L 112 48 A 34 34 0 0 1 112 116 L 78 116"
            fill="none"
            stroke={color}
            strokeWidth="14"
            strokeLinejoin="round"
            animate={draw(2)}
            transition={{ duration: 1, ease: EASE }}
          />
          <motion.circle
            cx="146"
            cy="150"
            r="9"
            fill={color}
            animate={{ scale: step >= 3 ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
          />
        </svg>

        <div className="flex flex-col justify-between">
          <div className="space-y-2">
            {[1, 0.6, 0.25].map((a, i) => (
              <motion.div
                key={a}
                className="h-10 rounded-lg"
                style={{ backgroundColor: i === 2 ? "#E2E8F4" : tint(color, a) }}
                animate={{ scaleX: step >= 3 ? 1 : 0 }}
                initial={false}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              />
            ))}
          </div>
          <motion.div animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 10 }} transition={{ duration: 0.5, ease: EASE }}>
            <p className="font-heading text-5xl font-semibold leading-none tracking-[-0.04em] text-white">Aa</p>
            <p className="mt-2 text-xs text-[#B8CCDD]">Primary typeface, logo, palette and usage rules in one guide</p>
          </motion.div>
        </div>
      </div>
    </Frame>
  );
};

// ─── Marketing: a campaign curve drawing with channel split ─────────────────

const CURVE = "M 0 150 C 40 145 60 130 90 128 S 140 100 170 92 S 230 70 260 46 S 300 22 320 14";

const MARKETING_TIMING = [400, 1300, 900, 3400];

export const MarketingSpecimen = ({ color, roas }: { color: string; roas: string }) => {
  const step = useLoop(MARKETING_TIMING);
  const shown = step >= 1;
  return (
    <Frame color={color} label="A campaign performance chart rising over time">
      <div className="flex h-full flex-col p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-[#B8CCDD]">Return on ad spend</p>
            <motion.p
              className="font-heading text-4xl font-semibold tracking-[-0.03em] text-white"
              animate={{ opacity: shown ? 1 : 0.2 }}
            >
              {roas}
            </motion.p>
          </div>
          <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ color, backgroundColor: tint(color, 0.15) }}>
            Last 90 days
          </span>
        </div>

        <svg viewBox="0 0 320 170" className="mt-3 min-h-0 w-full flex-1 overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="mk-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[40, 80, 120].map((y) => (
            <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" />
          ))}
          <motion.path
            d={`${CURVE} L 320 170 L 0 170 Z`}
            fill="url(#mk-fill)"
            animate={{ opacity: step >= 2 ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.path
            d={CURVE}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ pathLength: shown ? 1 : 0 }}
            transition={{ duration: 1.2, ease: EASE }}
          />
        </svg>

        <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-[#B8CCDD]">
          {[
            ["Search", 0.82],
            ["Social", 0.64],
            ["Email", 0.41],
          ].map(([label, v], i) => (
            <div key={label as string}>
              <p>{label}</p>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: color, originX: 0 }}
                  animate={{ scaleX: step >= 3 ? (v as number) : 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
};

// ─── Social: a feed scrolling past with live reactions ───────────────────────

const POSTS = ["Launch reel", "Behind the scenes", "Customer story", "Product drop", "Team takeover", "Weekly tip"];

const SOCIAL_TIMING = POSTS.map(() => 1600);

export const SocialSpecimen = ({ color }: { color: string }) => {
  const step = useLoop(SOCIAL_TIMING);
  return (
    <Frame color={color} label="A social media feed with posts and reactions">
      <div className="flex h-full items-center justify-center gap-6 p-5">
        <div className="relative h-full w-[46%] max-w-[210px] overflow-hidden rounded-[22px] border border-white/15 bg-black/40 p-2">
          <motion.div
            className="flex flex-col gap-2"
            animate={{ y: `-${(step * 100) / (POSTS.length * 2)}%` }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {[...POSTS, ...POSTS].map((p, i) => (
              <div key={i} className="shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                <div
                  className="aspect-square"
                  style={{
                    background: `linear-gradient(${120 + i * 40}deg, ${tint(color, 0.55)}, ${tint(color, 0.08)})`,
                  }}
                />
                <p className="px-2 py-1.5 text-[10px] text-white/70">{p}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex flex-1 flex-col gap-3">
          {[
            ["Likes", 1240 + step * 187],
            ["Comments", 86 + step * 14],
            ["Shares", 212 + step * 31],
          ].map(([label, n]) => (
            <div key={label as string} className="rounded-xl border border-white/10 bg-[#0D1A2E]/80 px-4 py-3">
              <p className="text-xs text-[#B8CCDD]">{label}</p>
              <motion.p
                key={n as number}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-heading text-2xl font-semibold tabular-nums text-white"
              >
                {(n as number).toLocaleString("en-IN")}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
};
