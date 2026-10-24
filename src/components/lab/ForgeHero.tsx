"use client";

import { useContext, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { SmoothScrollContext } from "../layout/SmoothScroll";
import { buildShapes } from "./shapes";
import { Chars, EASE, Magnetic } from "./ui";

const ParticleForge = dynamic(() => import("./ParticleForge"), { ssr: false });

type Stage = { label: string; num?: string; title: string; body: string; proof?: string };

const STAGES: Stage[] = [
  { label: "Intro", title: "PostPerfect", body: "" },
  {
    label: "Web & Apps",
    num: "01",
    title: "Websites & Apps",
    body: "Websites, mobile apps, e-commerce and custom business platforms, engineered to scale.",
    proof: "Built by us: HRMS · SalesFi · SAWDESI",
  },
  {
    label: "Video",
    num: "02",
    title: "Video & Animation",
    body: "Launch films, motion graphics, 2D and 3D animation that make products move.",
  },
  {
    label: "Branding",
    num: "03",
    title: "Branding",
    body: "Logos and identity systems with rules, so your brand looks right everywhere.",
  },
  {
    label: "Marketing",
    num: "04",
    title: "Marketing",
    body: "SEO, performance ads and content, measured and improved every week.",
  },
  {
    label: "Social",
    num: "05",
    title: "Social Media",
    body: "Strategy, reels and community management, run as a system.",
  },
  { label: "Start", title: "Let's build yours.", body: "" },
];

const LAST = STAGES.length - 1;

// ─── Small pieces ────────────────────────────────────────────────────────────

const Cursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let mx = -100, my = -100, rx = -100, ry = -100, scale = 1, target = 1;
    let frame = 0;
    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      target = (e.target as Element | null)?.closest("a, button") ? 2.2 : 1;
    };
    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      scale += (target - scale) * 0.15;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${scale})`;
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 hidden [@media(pointer:fine)]:block">
      <div ref={dot} className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-[#22D3EE]" />
      <div
        ref={ring}
        className="absolute -left-[18px] -top-[18px] h-9 w-9 rounded-full border border-white/60 mix-blend-difference"
      />
    </div>
  );
};

// ─── Hero ────────────────────────────────────────────────────────────────────

/** The particle hero plus page chrome; later homepage sections render as children. */
const ForgeHero = ({ children }: { children?: ReactNode }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const lenisRef = useContext(SmoothScrollContext);
  const [stage, setStage] = useState(0);
  const [shapes, setShapes] = useState<Float32Array[] | null>(null);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      const family =
        getComputedStyle(document.documentElement).getPropertyValue("--font-space-grotesk").trim() ||
        "Arial, sans-serif";
      const count = window.matchMedia("(max-width: 768px)").matches ? 7000 : 16000;
      setShapes(buildShapes(count, family));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total));
      progressRef.current = p;
      const s = Math.round(p * LAST);
      setStage((prev) => (prev === s ? prev : s));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Stop rendering particles once the hero has scrolled away.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const jumpTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const y = el.offsetTop + ((el.offsetHeight - window.innerHeight) * i) / LAST;
    if (lenisRef?.current) lenisRef.current.scrollTo(y, { duration: 1.6 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const current = STAGES[stage];

  return (
    <main className="bg-[#05070B] text-[#EDF2F7] [@media(pointer:fine)]:cursor-none">
      <Cursor />

      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-4 px-4 py-5 md:px-10">
        <Link href="/" aria-label="PostPerfect home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Postperfect_Logo.png" alt="PostPerfect" className="h-6 w-auto md:h-7" />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-9 text-sm text-[#AEB8C8] md:flex">
          <Link href="/services" className="transition-colors hover:text-white">Services</Link>
          <Link href="/about" className="transition-colors hover:text-white">Studio</Link>
          <Link href="/contact" className="transition-colors hover:text-white">Contact</Link>
        </nav>
        <Magnetic
          href="/contact"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 text-sm font-medium backdrop-blur-md transition-colors hover:bg-white hover:text-[#05070B]"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22D3EE]" />
          Start a project
        </Magnetic>
      </header>

      <section ref={sectionRef} aria-label="What PostPerfect does" style={{ height: `${STAGES.length * 100}vh` }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 50% 45%, #0B1A2A 0%, #05070B 60%)" }}
          />
          <div className="absolute inset-0">
            {shapes && <ParticleForge shapes={shapes} progressRef={progressRef} active={onScreen} />}
          </div>

          <h1 className="sr-only">PostPerfect: design and engineering studio for websites, apps, brands, video and marketing</h1>

          {/* Stage copy */}
          <div className="pointer-events-none absolute inset-0 px-4 md:px-10">
            <AnimatePresence mode="wait">
              {stage === 0 && (
                <motion.div key="intro" className="absolute inset-x-4 bottom-10 flex flex-col gap-8 md:inset-x-10 md:bottom-12 md:flex-row md:items-end md:justify-between" exit={{ opacity: 0, transition: { duration: 0.3 } }}>
                  <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 1.4 }} className="max-w-md">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#22D3EE]">Design &amp; engineering studio</p>
                    <p className="mt-4 text-lg leading-relaxed text-[#AEB8C8] md:text-xl">
                      Websites, apps, brands, films and growth, built by one team in India for clients everywhere.
                    </p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.8 }} className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-[#8A94A6]">
                    <span className="relative h-14 w-px overflow-hidden bg-white/15">
                      <motion.span className="absolute inset-x-0 top-0 h-1/2 bg-[#22D3EE]" animate={{ y: ["-100%", "200%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
                    </span>
                    Scroll to explore
                  </motion.div>
                </motion.div>
              )}

              {stage > 0 && stage < LAST && (
                <motion.div key={current.title} className="absolute inset-x-4 bottom-10 md:inset-x-auto md:bottom-auto md:left-10 md:top-1/2 md:max-w-[46vw] md:-translate-y-1/2">
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="font-mono text-xs tracking-[0.25em] text-[#22D3EE] md:text-sm">
                    {current.num} <span className="text-[#5B6575]">/ 05</span>
                  </motion.p>
                  <h2 className="mt-4 font-heading text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
                    <Chars text={current.title} delay={0.1} />
                  </h2>
                  <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.8, ease: EASE, delay: 0.35 }} className="mt-6 max-w-md text-base leading-relaxed text-[#AEB8C8] md:text-lg">
                    {current.body}
                  </motion.p>
                  {current.proof && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, delay: 0.55 }} className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#D5DCE6] backdrop-blur-md">
                      {current.proof}
                    </motion.p>
                  )}
                </motion.div>
              )}

              {stage === LAST && (
                <motion.div key="outro" className="pointer-events-auto absolute inset-x-4 bottom-12 flex flex-col items-center text-center md:bottom-16" exit={{ opacity: 0, transition: { duration: 0.3 } }}>
                  <h2 className="font-heading text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
                    <Chars text={current.title} />
                  </h2>
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.5 }} className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <Magnetic href="/contact" className="inline-flex min-h-14 items-center rounded-full bg-[#22D3EE] px-8 text-base font-semibold text-[#05070B] transition-colors hover:bg-white">
                      Start a project →
                    </Magnetic>
                    <a href="mailto:info@postperfect.in" className="text-[#AEB8C8] transition-colors hover:text-white">info@postperfect.in</a>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress rail */}
          <nav aria-label="Sections" className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:right-10 md:flex">
            {STAGES.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={s.label}
                aria-current={i === stage ? "step" : undefined}
                className="group flex min-h-6 items-center justify-end gap-3"
              >
                <span className={`font-mono text-[11px] uppercase tracking-[0.2em] transition-opacity duration-500 ${i === stage ? "text-white opacity-100" : "text-[#8A94A6] opacity-0 group-hover:opacity-100"}`}>
                  {s.label}
                </span>
                <span className={`h-px transition-all duration-500 ${i === stage ? "w-10 bg-[#22D3EE]" : "w-5 bg-white/25 group-hover:w-7"}`} />
              </button>
            ))}
          </nav>
        </div>
      </section>

      {children}
    </main>
  );
};

export default ForgeHero;
