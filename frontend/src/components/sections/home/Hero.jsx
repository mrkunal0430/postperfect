import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

const MARQUEE_ITEMS = [
  "Web Development", "Video Editing", "Brand Identity",
  "Digital Marketing", "Social Media", "ERP Systems",
  "Motion Graphics", "UI/UX Design", "Custom Software",
];

const HEADLINES = [
  { text: "WE BUILD", align: "left",  style: "fill" },
  { text: "DIGITAL",  align: "right", style: "outline" },
  { text: "WORLDS",   align: "left",  style: "gradient" },
];

const STATS = [
  { value: "150+", label: "Projects" },
  { value: "50+",  label: "Clients" },
  { value: "99%",  label: "Satisfaction" },
];

// Colour accent per headline line
const LINE_RGB = ["56,189,248", "124,58,237", "80,160,248"];

// ── Glass-bubble wrapper for each headline line ──────────────────────────────
const BubbleLine = ({ line, index }) => {
  const [hovered, setHovered] = useState(false);
  const rgb = LINE_RGB[index];

  return (
    <div className={`flex ${line.align === "right" ? "justify-end" : "justify-start"}`}>
      {/*
        w-fit shrinks the container to text width so the bubble
        hugs the word tightly, like a real bubble around an object.
      */}
      <div
        className="relative w-fit"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Glass bubble ──────────────────────────── */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={`bubble-${index}`}
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{   scale: 0.94,  opacity: 0 }}
              transition={{
                scale:   { type: "spring", stiffness: 260, damping: 22, mass: 0.55 },
                opacity: { duration: 0.22 },
              }}
              aria-hidden
              className="absolute pointer-events-none rounded-[22px]"
              style={{
                /*
                  Negative inset extends the bubble 10 px above/below and
                  22 px left/right of the text bounding box.
                */
                inset: "-10px -22px",
                /* Iridescent glass: bright top → tinted mid → dark bottom */
                background: `linear-gradient(
                  158deg,
                  rgba(255,255,255,0.13)  0%,
                  rgba(${rgb},0.10)       30%,
                  rgba(${rgb},0.05)       60%,
                  rgba(255,255,255,0.04)  100%
                )`,
                /* Bright top rim, faint bottom rim */
                border:       "1px solid rgba(255,255,255,0.09)",
                borderTop:    "1px solid rgba(255,255,255,0.30)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                backdropFilter:       "blur(14px) saturate(1.4)",
                WebkitBackdropFilter: "blur(14px) saturate(1.4)",
                boxShadow: `
                  inset 0  1px 0   rgba(255,255,255,0.28),
                  inset 0 -1px 0   rgba(255,255,255,0.04),
                  0  6px 28px rgba(${rgb},0.14),
                  0  2px  8px rgba(0,0,0,0.30)
                `,
                zIndex: 0,
              }}
            >
              {/* Specular oval highlight — the classic "soap bubble" reflection */}
              <div
                aria-hidden
                className="absolute rounded-full"
                style={{
                  top:    "6px",
                  left:   "22px",
                  width:  "28%",
                  height: "5px",
                  background: "rgba(255,255,255,0.45)",
                  filter: "blur(3px)",
                }}
              />

              {/* Secondary smaller highlight spot */}
              <div
                aria-hidden
                className="absolute rounded-full"
                style={{
                  top:    "8px",
                  left:   "22px",
                  width:  "10%",
                  height: "3px",
                  background: "rgba(255,255,255,0.65)",
                  filter: "blur(1.5px)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Text (overflow-hidden clips entrance slide-up) ── */}
        <div className="overflow-hidden pt-2 -mt-2 relative" style={{ zIndex: 1 }}>
          <motion.span
            initial={{ y: "105%", skewY: 3 }}
            animate={{ y: "0%",   skewY: 0 }}
            whileHover={{
              y: -5,
              transition: { type: "spring", stiffness: 230, damping: 15, mass: 0.7 },
            }}
            transition={{
              delay:    0.35 + index * 0.15,
              duration: 0.9,
              ease:     [0.16, 1, 0.3, 1],
            }}
            className="block select-none cursor-default font-heading font-black leading-[0.9] tracking-[-0.025em]"
            style={{
              fontSize: "clamp(3.2rem, 10.5vw, 9.5rem)",
              ...(line.style === "fill" && {
                color: "#E2E8F4",
              }),
              ...(line.style === "outline" && {
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(56,189,248,0.52)",
              }),
              ...(line.style === "gradient" && {
                background:
                  "linear-gradient(135deg, #E2E8F4 0%, #38BDF8 50%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }),
            }}
          >
            {line.text}
          </motion.span>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
const Hero = () => {
  const cursorX = useMotionValue(-400);
  const cursorY = useMotionValue(-400);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 150, mass: 0.5 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 150, mass: 0.5 });
  const [hasMouse, setHasMouse] = useState(false);

  useEffect(() => {
    const move = (e) => {
      if (!hasMouse) setHasMouse(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [hasMouse, cursorX, cursorY]);

  return (
    <section className="relative h-screen flex flex-col justify-center overflow-hidden">

      {/* Global magnetic cursor orb */}
      {hasMouse && (
        <motion.div
          className="pointer-events-none fixed z-30 mix-blend-screen"
          style={{ left: springX, top: springY, x: "-50%", y: "-50%" }}
          aria-hidden
        >
          <div
            className="w-80 h-80 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(56,189,248,0.16) 0%, rgba(56,189,248,0.05) 45%, transparent 72%)",
            }}
          />
        </motion.div>
      )}

      {/* Left vertical identity strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-4"
        aria-hidden
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-accent/30" />
        <span
          className="text-[9px] font-mono text-text-muted tracking-[0.35em] uppercase select-none"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          PostPerfect Studio — 2024
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-accent/30 to-transparent" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 pl-14 lg:pl-20 pr-8 lg:pr-52">

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-7"
        >
          <div className="w-7 h-px bg-accent" />
          <span className="text-[11px] font-mono text-accent tracking-[0.25em] uppercase">
            Digital Agency
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent"
            style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
          />
        </motion.div>

        {/* Kinetic headlines with glass-bubble hover */}
        {HEADLINES.map((line, i) => (
          <BubbleLine key={line.text} line={line} index={i} />
        ))}

        {/* Divider + tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.8 }}
          className="mt-7 flex items-center gap-5 max-w-2xl"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.05, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to right, rgba(56,189,248,0.5), rgba(124,58,237,0.3), transparent)",
              transformOrigin: "left",
            }}
          />
          <p className="text-text-secondary text-sm leading-relaxed text-right shrink-0">
            Web · Apps · Video
            <br />
            Marketing · ERP · Branding
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex items-center gap-4 flex-wrap"
        >
          <a
            href="/services"
            className="group flex items-center gap-2 px-7 py-3.5 bg-accent text-[#08101E] font-bold text-sm rounded-full hover:bg-accent-light transition-colors duration-300 shadow-glow-sm"
          >
            Explore Work
            <svg
              className="group-hover:translate-x-1 transition-transform duration-300"
              width="14" height="14" viewBox="0 0 14 14"
              fill="none" stroke="currentColor" strokeWidth="2.5"
            >
              <path d="M1 7h12M8 3l5 4-5 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="/contact"
            className="px-7 py-3.5 border border-white/10 text-text-secondary text-sm font-medium rounded-full hover:border-accent/40 hover:text-text-primary transition-all duration-300"
          >
            Let's Talk
          </a>
        </motion.div>
      </div>

      {/* Right stats column */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-10 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-end gap-5"
      >
        {STATS.map((stat, i) => (
          <div key={stat.label} className="text-right">
            <div className="font-heading font-bold text-2xl text-text-primary">{stat.value}</div>
            <div className="text-[9px] font-mono text-text-muted tracking-[0.25em] uppercase mt-0.5">
              {stat.label}
            </div>
            {i < STATS.length - 1 && (
              <div className="w-px h-6 bg-white/[0.07] ml-auto mt-3" />
            )}
          </div>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1 }}
        className="absolute bottom-14 left-20 z-10 flex items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-accent/50 to-transparent"
        />
        <span className="text-[10px] font-mono text-text-muted tracking-[0.3em] uppercase">
          Scroll
        </span>
      </motion.div>

      {/* Bottom marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 border-t border-white/[0.05] py-2.5 overflow-hidden z-10"
      >
        <div className="marquee-hero flex w-max">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(
            (item, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-[10px] font-mono text-text-muted tracking-[0.22em] uppercase flex items-center"
              >
                {item}
                <span className="mx-5 text-accent/30">✦</span>
              </span>
            )
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
