"use client";

import { useContext, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { SmoothScrollContext } from "../layout/SmoothScroll";
import { sampleLogo, type LogoCloud } from "./logoCloud";
import type { FlyTarget } from "./IntroParticles";

const IntroParticles = dynamic(() => import("./IntroParticles"), { ssr: false });

// Whether to play is decided before paint by INTRO_SCRIPT (see introScript.ts).

const MIN_MS = 2600;

type Phase = "loading" | "flying" | "fading" | "gone";

const IntroLoader = () => {
  const lenisRef = useContext(SmoothScrollContext);
  const [phase, setPhase] = useState<Phase>("loading");
  const [logo, setLogo] = useState<LogoCloud | null>(null);
  const [flyTo, setFlyTo] = useState<FlyTarget | null>(null);
  const [pct, setPct] = useState(0);
  const logoEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (document.documentElement.dataset.intro !== "play") return;
    window.scrollTo(0, 0);
    lenisRef?.current?.stop();

    let cancelled = false;
    let frame = 0;
    const count = window.matchMedia("(max-width: 768px)").matches ? 6000 : 12000;
    sampleLogo("/Postperfect_Logo.png", count)
      .then((cloud) => !cancelled && setLogo(cloud))
      .catch(() => {
        // No logo to animate: release the page immediately.
        document.documentElement.dataset.intro = "done";
        lenisRef?.current?.start();
        if (!cancelled) setPhase("gone");
      });

    let ready = false;
    const loaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    Promise.all([document.fonts.ready, loaded, new Promise((r) => setTimeout(r, MIN_MS))]).then(() => {
      ready = true;
    });

    // Counter eases toward 96% on its own and only reaches 100 once ready.
    const t0 = performance.now();
    const tick = () => {
      if (cancelled) return;
      const k = Math.min(1, (performance.now() - t0) / MIN_MS);
      const value = ready ? 100 : Math.min(96, Math.round(100 * (1 - Math.pow(1 - k, 3))));
      setPct(value);
      if (value < 100) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const el = document.querySelector<HTMLElement>("[data-intro-logo]");
      logoEl.current = el;
      const rect = el?.getBoundingClientRect();
      // Fall back to the usual top-left logo spot if the navbar logo isn't measurable.
      setFlyTo(el && rect && rect.width > 0 ? el : new DOMRect(24, 22, 161, 36));
      setPhase("flying");
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [lenisRef]);

  // Uncover the real navbar logo left → right, just behind the landing particles.
  function reveal(amount: number) {
    const el = logoEl.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.opacity = "1";
    el.style.clipPath = `inset(-20% ${(1 - amount) * 100}% -20% 0)`;
  }

  function finish() {
    const el = logoEl.current;
    if (el) {
      el.style.removeProperty("transition");
      el.style.removeProperty("opacity");
      el.style.removeProperty("clip-path");
    }
    document.documentElement.dataset.intro = "done";
    try {
      sessionStorage.setItem("pp-intro", "1");
    } catch {
      // Storage blocked: the intro will simply play again next visit.
    }
    lenisRef?.current?.start();
    setPhase("fading");
    setTimeout(() => setPhase("gone"), 700);
  }

  if (phase === "gone") return null;

  return (
    <div
      className="intro-overlay fixed inset-0 z-[200]"
      style={{ pointerEvents: phase === "loading" ? "auto" : "none" }}
      aria-hidden={phase !== "loading"}
    >
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-out"
        style={{
          opacity: phase === "loading" ? 1 : 0,
          background: "radial-gradient(ellipse at 50% 45%, #0B1A2A 0%, #05070B 65%)",
        }}
      />

      <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: phase === "fading" ? 0 : 1 }}>
        {logo && <IntroParticles logo={logo} flyTo={flyTo} onReveal={reveal} onLanded={finish} />}
      </div>

      <div
        role="status"
        aria-live="polite"
        className="absolute inset-x-6 bottom-8 flex items-end justify-between gap-6 font-mono text-xs uppercase tracking-[0.25em] text-[#8A94A6] transition-opacity duration-500 md:inset-x-10 md:bottom-10"
        style={{ opacity: phase === "loading" ? 1 : 0 }}
      >
        <span>Crafting your experience</span>
        <span className="tabular-nums text-[#EDF2F7]">{String(pct).padStart(3, "0")}%</span>
      </div>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-[#22D3EE] transition-opacity duration-500"
        style={{ transform: `scaleX(${pct / 100})`, opacity: phase === "loading" ? 1 : 0 }}
      />
    </div>
  );
};

export default IntroLoader;
