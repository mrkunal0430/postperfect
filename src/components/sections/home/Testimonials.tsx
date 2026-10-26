"use client";

import { useRef, useState, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { TESTIMONIALS } from "../../../utils/constants";
import { EASE } from "../../lab/ui";

/** Card looks, cycled in order: light, accent-tinted, dark surface. Text colours keep at least 7:1 contrast. */
const CARD_THEMES = [
  { bg: "#E2E8F4", text: "#050B15", muted: "#3B4A5E", badge: "#C9D4E5", tilt: -2 },
  { bg: "#BAE6FD", text: "#050B15", muted: "#24445C", badge: "#7DD3FC", tilt: 0 },
  { bg: "#0D1A2E", text: "#E2E8F4", muted: "#92AAC0", badge: "#122038", tilt: 1.5 },
] as const;

/** "Sarah Chen" → "SC", "UrbanFlow" → "UF", "Acme" → "AC" */
const initials = (name: string) => {
  const words = name.split(/\s+/).filter((w) => /^[A-Za-z]/.test(w));
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
  const word = words[0] ?? "";
  const caps = word.match(/[A-Z]/g);
  return (caps && caps.length > 1 ? caps.slice(0, 2).join("") : word.slice(0, 2)).toUpperCase();
};

const Arrow = ({ dir }: { dir: "left" | "right" }) => (
  <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={dir === "left" ? "M11 4 6 9l5 5" : "M7 4l5 5-5 5"} />
  </svg>
);

/** Client quotes as a row of tilted cards you can swipe, drag or step through. */
const Testimonials = () => {
  const track = useRef<HTMLUListElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [cursorOn, setCursorOn] = useState(false);

  // Drag-hint cursor that follows the pointer over the cards (mouse only)
  const cx = useSpring(useMotionValue(0), { stiffness: 500, damping: 40 });
  const cy = useSpring(useMotionValue(0), { stiffness: 500, damping: 40 });

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 24), behavior: "smooth" });
  };

  const onPointerMove = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    cx.set(e.clientX - r.left);
    cy.set(e.clientY - r.top);
    if (drag.current) e.currentTarget.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };

  return (
    <section aria-labelledby="testimonials-title" className="overflow-hidden px-4 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">What they say</p>
            <h2
              id="testimonials-title"
              className="mt-4 font-heading text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase leading-none tracking-[-0.03em] text-text-primary"
            >
              Testi<span className="text-accent">monials</span>
            </h2>
            <div aria-hidden className="mt-6 flex flex-col gap-1.5">
              <span className="h-[3px] w-28 rounded-full bg-accent" />
              <span className="h-[3px] w-16 rounded-full bg-accent/50" />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => step(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-surface text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-14 md:w-14"
            >
              <Arrow dir="left" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => step(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-bg-secondary transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-14 md:w-14"
            >
              <Arrow dir="right" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards rise in together when the row scrolls into view, so the ones peeking in from the side show too */}
      <motion.div
        className="relative mx-auto mt-14 max-w-[1440px] md:mt-20"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.2 }}
      >
        <ul
          ref={track}
          aria-label="Client testimonials"
          onPointerEnter={(e) => e.pointerType === "mouse" && setCursorOn(true)}
          onPointerLeave={() => {
            setCursorOn(false);
            drag.current = null;
          }}
          onPointerMove={onPointerMove}
          onPointerDown={(e) => {
            if (e.pointerType === "mouse") drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft };
          }}
          onPointerUp={() => (drag.current = null)}
          className="-mx-4 flex snap-x snap-mandatory gap-6 md:snap-none overflow-x-auto px-4 py-8 [scrollbar-width:none] md:-mx-10 md:cursor-none md:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS.map((t, i) => {
            const theme = CARD_THEMES[i % CARD_THEMES.length];
            return (
              <motion.li
                key={t.author}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: i * 0.08 } },
                }}
                className="w-[78%] max-w-[420px] shrink-0 snap-center select-none sm:w-[380px]"
              >
                <figure
                  className="flex h-full min-h-[420px] flex-col rounded-[28px] p-7 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:rotate-0 md:p-9"
                  style={{
                    background: theme.bg,
                    color: theme.text,
                    transform: `rotate(${theme.tilt}deg)`,
                    border: theme.bg === "#0D1A2E" ? "1px solid rgba(255,255,255,0.1)" : undefined,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-heading text-base font-bold"
                      style={{ background: theme.badge }}
                    >
                      {initials(t.company)}
                    </span>
                    <p className="font-heading text-xl font-bold leading-tight tracking-[-0.02em] md:text-2xl">{t.company}</p>
                  </div>

                  <blockquote className="mt-8 flex-1 text-lg leading-relaxed md:text-xl">&ldquo;{t.quote}&rdquo;</blockquote>

                  <figcaption className="mt-8 flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                      style={{ background: theme.badge }}
                    >
                      {initials(t.author)}
                    </span>
                    <span>
                      <span className="block font-semibold">{t.author}</span>
                      <span className="block text-sm" style={{ color: theme.muted }}>
                        {t.role}, {t.company}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </motion.li>
            );
          })}
        </ul>

        {/* Drag hint that follows the mouse over the cards */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 hidden h-20 w-20 items-center justify-center gap-1 rounded-full border-2 border-accent bg-bg-secondary text-accent shadow-[0_0_30px_rgba(56,189,248,0.45)] md:flex"
          style={{ x: cx, y: cy, translateX: "-50%", translateY: "-50%" }}
          initial={false}
          animate={{ opacity: cursorOn ? 1 : 0, scale: cursorOn ? 1 : 0.5 }}
          transition={{ duration: 0.25 }}
        >
          <Arrow dir="left" />
          <Arrow dir="right" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
