import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { SERVICES } from "../../../utils/constants";

// ── Icons ─────────────────────────────────────────────────────────────────────
const serviceIcons = {
  web: (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="6" width="24" height="18" rx="2" />
      <path d="M4 11h24" />
      <circle cx="8" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="11" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <path d="M12 18l3-4 3 4M22 15l-3 4" />
    </svg>
  ),
  video: (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="8" width="18" height="16" rx="2" />
      <path d="M22 13l6-3v12l-6-3" />
    </svg>
  ),
  branding: (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 3l4 8h8l-6.5 5 2.5 8L16 19l-8 5 2.5-8L4 11h8z" strokeLinejoin="round" />
    </svg>
  ),
  marketing: (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 26V14M12 26V10M18 26V16M24 26V8" strokeLinecap="round" />
      <path d="M6 14l6-4 6 6 6-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  social: (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="16" cy="16" r="12" />
      <path d="M16 4c-6 4-6 20 0 24M16 4c6 4 6 20 0 24" />
      <path d="M4 16h24M6 10h20M6 22h20" />
    </svg>
  ),
};

// "#RRGGBB" → "R,G,B"
const rgb = (hex) => {
  const h = hex.replace("#", "");
  return `${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)}`;
};

// Pull capability strings regardless of which key the service uses
const getCaps = (service) => {
  const raw = service.offerings ?? service.subServices ?? service.industries ?? [];
  return raw.slice(0, 5).map((item) =>
    typeof item === "string" ? item : item.name
  );
};

// ── Card component ────────────────────────────────────────────────────────────
const ServiceCard = ({ service, index, isActive }) => {
  const r = rgb(service.color);
  const caps = getCaps(service);

  return (
    /*
      Each slide occupies exactly 100 vw so the scroll math stays simple.
      The visible card is centred inside with padding, giving the viewer
      a glimpse of the next card's edge on the right.
    */
    <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-6 sm:px-12 lg:px-20">
      <motion.div
        animate={{ scale: isActive ? 1 : 0.97, opacity: isActive ? 1 : 0.65 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: 1080,
          height: "clamp(440px, 64vh, 660px)",
          borderRadius: 24,
          background: `
            radial-gradient(ellipse 60% 70% at 80% 20%, rgba(${r},0.10) 0%, transparent 60%),
            linear-gradient(145deg, #0B1726 0%, #0D1A2E 100%)
          `,
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: `
            0 32px 80px rgba(0,0,0,0.60),
            0 0 0 1px rgba(255,255,255,0.04),
            0 0 60px rgba(${r},0.07)
          `,
        }}
      >
        {/* Top gradient accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: `linear-gradient(to right, ${service.color} 0%, rgba(${r},0.3) 55%, transparent 100%)`,
          }}
        />

        {/* Subtle dot-grid texture */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* ── Two-column body ── */}
        <div className="relative h-full flex">

          {/* ── LEFT: primary content ── */}
          <div className="flex flex-col justify-center px-10 lg:px-14 py-10 flex-1 min-w-0">

            {/* Step counter */}
            <div className="flex items-center gap-3 mb-7">
              <span
                className="text-[11px] font-mono tracking-[0.32em] uppercase font-semibold"
                style={{ color: service.color }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div
                className="h-px w-8 rounded-full"
                style={{ backgroundColor: `rgba(${r},0.35)` }}
              />
              <span className="text-[11px] font-mono tracking-[0.32em] uppercase text-text-muted/35">
                {String(SERVICES.length).padStart(2, "0")}
              </span>
            </div>

            {/* Icon */}
            <div
              className="w-[52px] h-[52px] rounded-xl flex items-center justify-center mb-6 flex-shrink-0"
              style={{
                backgroundColor: `rgba(${r},0.12)`,
                color: service.color,
                boxShadow: `0 0 0 1px rgba(${r},0.18), inset 0 1px 0 rgba(255,255,255,0.07)`,
              }}
            >
              {serviceIcons[service.icon]}
            </div>

            {/* Service name */}
            <h3
              className="font-heading font-black text-text-primary leading-[0.92] tracking-tight mb-4"
              style={{ fontSize: "clamp(1.75rem, 3.2vw, 3rem)" }}
            >
              {service.name}
            </h3>

            {/* Colour rule */}
            <div
              className="h-[2px] w-10 mb-5 rounded-full"
              style={{ backgroundColor: service.color }}
            />

            {/* Tagline */}
            <p className="text-text-secondary text-[0.9rem] leading-relaxed mb-9 max-w-[280px]">
              {service.tagline}
            </p>

            {/* CTA */}
            <Link
              to={`/services/${service.id}`}
              className="group w-fit inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-[13px] font-semibold transition-all duration-300 hover:gap-4"
              style={{
                backgroundColor: `rgba(${r},0.10)`,
                border: `1px solid rgba(${r},0.25)`,
                color: service.color,
              }}
            >
              Explore Service
              <svg
                className="group-hover:translate-x-0.5 transition-transform duration-300"
                width="13" height="13" viewBox="0 0 14 14"
                fill="none" stroke="currentColor" strokeWidth="2.5"
              >
                <path d="M1 7h12M8 3l5 4-5 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* ── Vertical divider ── */}
          <div
            className="flex-shrink-0 w-px self-stretch my-10"
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
          />

          {/* ── RIGHT: decorative + capabilities ── */}
          <div
            className="flex-shrink-0 flex flex-col justify-between py-10 px-8 lg:px-12 relative overflow-hidden"
            style={{ width: "clamp(200px, 36%, 360px)" }}
          >
            {/* Watermark number — top right */}
            <div
              aria-hidden
              className="absolute -top-6 -right-3 pointer-events-none select-none font-heading font-black leading-none"
              style={{
                fontSize: "clamp(7rem, 13vw, 11rem)",
                color: "transparent",
                WebkitTextStroke: `1px rgba(${r},0.13)`,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Spacer */}
            <div />

            {/* Capabilities */}
            <div className="relative z-10">
              <p
                className="text-[9px] font-mono tracking-[0.35em] uppercase mb-4"
                style={{ color: `rgba(${r},0.55)` }}
              >
                Capabilities
              </p>
              <ul className="space-y-3">
                {caps.map((cap, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-[5px] h-[5px] rounded-full flex-shrink-0 mt-[5px]"
                      style={{ backgroundColor: service.color, opacity: 0.6 }}
                    />
                    <span className="text-[12px] text-text-secondary leading-snug">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ── Main section ──────────────────────────────────────────────────────────────
const ServicesPreview = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(SERVICES.length - 1) * 100}vw`]
  );

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(Math.min(Math.floor(v * SERVICES.length), SERVICES.length - 1));
  });

  const activeColor = SERVICES[activeIndex].color;

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${SERVICES.length * 100}vh` }}
    >
      {/* ── Sticky viewport ── */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: "rgba(5,11,21,0.94)" }}
      >
        {/* Very subtle bg texture behind the cards */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* ── Section label (top-left) ── */}
        <div className="absolute top-8 left-8 lg:left-14 z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-5 h-px bg-accent" />
              <span className="text-[10px] font-mono text-accent tracking-[0.28em] uppercase">
                What We Do
              </span>
            </div>
            <h2
              className="font-heading font-black text-text-primary leading-none"
              style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)" }}
            >
              Five Services.{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #38BDF8 0%, #7C3AED 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                One Mission.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* ── Scroll hint (top-right) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="absolute top-9 right-8 lg:right-14 z-20 hidden lg:flex items-center gap-3 pointer-events-none"
        >
          <span className="text-[10px] font-mono text-text-muted tracking-[0.2em] uppercase">
            Scroll to explore
          </span>
          <svg
            width="28" height="10" viewBox="0 0 28 10"
            fill="none" stroke="currentColor" strokeWidth="1"
            className="text-accent"
          >
            <path d="M0 5h26M20 1.5l6 3.5-6 3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* ── Horizontal cards track ── */}
        <motion.div
          className="absolute top-0 left-0 flex h-full will-change-transform"
          style={{ x }}
        >
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isActive={activeIndex === index}
            />
          ))}
        </motion.div>

        {/* ── Bottom progress bar ── */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 flex items-center gap-4 px-8 lg:px-14 pb-6 pt-12"
          style={{
            background: "linear-gradient(to top, rgba(5,11,21,0.9) 0%, transparent 100%)",
          }}
        >
          {/* Pill dots */}
          <div className="flex items-center gap-2">
            {SERVICES.map((svc, i) => (
              <div
                key={i}
                className="h-[3px] rounded-full transition-all duration-500"
                style={{
                  width: activeIndex === i ? 28 : 10,
                  backgroundColor:
                    activeIndex === i ? activeColor : "rgba(255,255,255,0.14)",
                }}
              />
            ))}
          </div>

          {/* Thin track */}
          <div className="flex-1 h-px bg-white/[0.07] relative overflow-hidden rounded-full">
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{ width: progressWidth, backgroundColor: activeColor, opacity: 0.65 }}
            />
          </div>

          {/* Counter */}
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase tabular-nums text-text-muted shrink-0">
            <span className="text-text-primary font-medium">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            {" / "}
            {String(SERVICES.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServicesPreview;
