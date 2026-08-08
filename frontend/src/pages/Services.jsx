import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import {
  SERVICES,
  STATS,
  WHY_CHOOSE_US,
  PROCESS_STEPS,
  TECH_STACK,
} from "../utils/constants";
import SplitText from "../components/ui/SplitText";
import RevealOnScroll from "../components/ui/RevealOnScroll";

// ─── SERVICE ICONS (inline SVGs keyed by icon id) ────────────────────────────
const serviceIcons = {
  web: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="4" y="6" width="24" height="17" rx="2.5" />
      <path d="M4 11h24" />
      <circle cx="7.5" cy="8.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="10" cy="8.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="12.5" cy="8.5" r="0.8" fill="currentColor" stroke="none" />
      <path
        d="M12 18l3-4 3 4M22 16l-3 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 27h12" strokeLinecap="round" />
    </svg>
  ),
  video: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="3" y="8" width="19" height="14" rx="2.5" />
      <path d="M22 12l7-3.5v15l-7-3.5" strokeLinejoin="round" />
      <circle cx="12.5" cy="15" r="3.5" />
      <path d="M11.5 13.5l3 1.5-3 1.5z" fill="currentColor" stroke="none" />
    </svg>
  ),
  branding: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M16 3l4 8h8l-6.5 5 2.5 8L16 19l-8 5 2.5-8L4 11h8z"
        strokeLinejoin="round"
      />
    </svg>
  ),
  marketing: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M6 26V18M12 26V12M18 26V20M24 26V8"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <path
        d="M6 18l6-6 6 8 6-12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  social: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="16" cy="16" r="12" />
      <path d="M16 4c-6 4-6 20 0 24M16 4c6 4 6 20 0 24" />
      <path d="M4 16h24M6 10h20M6 22h20" />
    </svg>
  ),
};

// ─── SERVICE CONSOLE (Right side of hero) ────────────────────────────────────
const ServiceConsole = () => {
  const [activeRow, setActiveRow] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRow((prev) => (prev + 1) % SERVICES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Glow ring */}
      <div
        className="absolute -inset-3 rounded-2xl opacity-40 blur-xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${SERVICES[activeRow]?.color || "#38BDF8"}20, transparent 70%)`,
          transition: "background 1s ease",
        }}
      />

      <div className="relative rounded-2xl border border-white/10 bg-[#0A1628]/90 backdrop-blur-md overflow-hidden shadow-2xl">
        {/* Console header */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <span className="ml-3 text-[10px] font-mono text-text-muted tracking-wide">
            postperfect — service dashboard
          </span>
        </div>

        {/* Service status rows */}
        <div className="p-5 space-y-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors duration-500"
              style={{
                backgroundColor:
                  i === activeRow ? `${service.color}10` : "transparent",
                border: `1px solid ${i === activeRow ? `${service.color}25` : "transparent"}`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: service.color,
                  boxShadow:
                    i === activeRow ? `0 0 8px ${service.color}80` : "none",
                  transition: "box-shadow 0.5s ease",
                }}
              />
              <span className="text-xs font-medium text-text-primary flex-1">
                {service.name}
              </span>
              {/* Progress bar */}
              <div className="w-20 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: service.color }}
                  initial={{ width: "0%" }}
                  animate={{
                    width: i === activeRow ? "100%" : `${40 + i * 12}%`,
                  }}
                  transition={{
                    duration: i === activeRow ? 2.5 : 0.6,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <span className="text-[10px] text-text-muted font-mono w-8 text-right">
                {i === activeRow ? "LIVE" : service.number}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom metrics */}
        <div className="px-5 pb-4 pt-1 border-t border-white/5">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Projects", value: "150+" },
              { label: "Clients", value: "50+" },
              { label: "Satisfaction", value: "99%" },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-2">
                <div className="text-sm font-heading font-bold text-text-primary">
                  {stat.value}
                </div>
                <div className="text-[9px] text-text-muted uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── HERO SECTION ────────────────────────────────────────────────────────────
const ServicesHero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-16">
      {/* Background gradient blob */}
      <div
        className="absolute top-1/4 right-0 w-[700px] h-[700px] rounded-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-block px-5 py-2 text-xs font-medium tracking-widest uppercase text-accent border border-accent/30 rounded-full bg-accent/5">
                Our Services
              </span>
            </motion.div>

            <SplitText
              className="font-heading text-display font-bold leading-[0.95] tracking-tight text-text-primary"
              delay={0.3}
              staggerDelay={0.025}
            >
              Everything Your Business Needs
            </SplitText>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-text-secondary text-lg max-w-lg leading-relaxed"
            >
              From development to design, marketing to management — premium
              digital solutions that build trust and drive results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="mt-8 flex items-center gap-4 flex-wrap"
            >
              <Link
                to="/contact"
                className="px-8 py-3.5 bg-accent text-white font-semibold rounded-full hover:bg-accent-light transition-colors duration-300 shadow-glow-sm"
              >
                Start a Project
              </Link>
              <a
                href="#services-showcase"
                className="px-8 py-3.5 border border-white/15 text-text-primary font-semibold rounded-full hover:border-accent/40 hover:text-accent transition-all duration-300"
              >
                Explore Services
              </a>
            </motion.div>
          </div>

          {/* Right: Service Console */}
          <div className="hidden lg:block">
            <ServiceConsole />
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── TRUST STATS BAR ────────────────────────────────────────────────────────
const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);
  return <span ref={ref}>{value}</span>;
};

const TrustStats = () => (
  <section className="py-14 border-y border-white/5 bg-bg-secondary/50">
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((stat, i) => (
          <RevealOnScroll key={i} delay={i * 0.1}>
            <div className="text-center">
              <div className="font-heading text-4xl md:text-5xl font-bold text-accent-light">
                <AnimatedNumber value={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-sm text-text-muted mt-2">{stat.label}</div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

// ─── STICKY SCROLL SERVICE CARD ─────────────────────────────────────────────
const StickyServiceCard = ({ service, index, totalCards }) => {
  const isVideo = service.icon === "video";

  // Key highlights for each service (short bullet points)
  const highlights = {
    "web-app-development": [
      "React, Next.js, Flutter",
      "E-Commerce & SaaS",
      "Custom ERP Systems",
      "Full-Stack Development",
    ],
    "video-editing-animation": [
      "YouTube & Reels Content",
      "3D Animation & VFX",
      "Product Showcases",
      "Corporate Films",
    ],
    branding: [
      "Logo & Identity Design",
      "Brand Guidelines",
      "Packaging & Print",
      "Brand Strategy",
    ],
    marketing: [
      "SEO & Content Strategy",
      "Google & Meta Ads",
      "Email Campaigns",
      "Analytics & CRO",
    ],
    "social-media-management": [
      "Content Calendar",
      "Community Management",
      "Influencer Partnerships",
      "Growth Strategy",
    ],
  };

  return (
    <div
      className="sticky"
      style={{
        top: `${100 + index * 40}px`,
        zIndex: index + 1,
        paddingBottom: `${(totalCards - index - 1) * 40}px`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link to={`/services/${service.slug}`} className="block group">
          <div
            className="relative rounded-2xl border overflow-hidden transition-all duration-500 group-hover:shadow-2xl"
            style={{
              borderColor: `${service.color}15`,
              backgroundColor: "#080C16",
            }}
          >
            {/* Opaque base layer to prevent stacked cards bleeding through */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background: isVideo
                  ? `linear-gradient(135deg, #0A0A0F 0%, ${service.color}08 50%, #0A0A0F 100%)`
                  : `linear-gradient(135deg, ${service.color}05 0%, #0C1424 40%, ${service.color}03 100%)`,
              }}
            />

            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
              style={{
                boxShadow: `inset 0 0 80px ${service.color}08, 0 0 60px ${service.color}06`,
              }}
            />

            <div
              className={`relative p-8 md:p-10 ${isVideo ? "" : "grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center"}`}
            >
              {isVideo ? (
                /* ─── VIDEO EDITING: Special filmstrip layout ─── */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${service.color}15`,
                          border: `1px solid ${service.color}25`,
                        }}
                      >
                        <div style={{ color: service.color }}>
                          {serviceIcons[service.icon]}
                        </div>
                      </div>
                      <span className="text-xs font-mono text-text-muted">
                        Service {service.number}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-3 group-hover:text-white transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-md">
                      {service.tagline}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {(highlights[service.id] || []).map((h, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 text-xs rounded-full border"
                          style={{
                            borderColor: `${service.color}25`,
                            color: service.color,
                            backgroundColor: `${service.color}08`,
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <span
                      className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300"
                      style={{ color: service.color }}
                    >
                      Explore Service
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>

                  {/* Filmstrip visual */}
                  <div className="hidden lg:block relative">
                    <div className="relative">
                      {/* Film sprocket holes */}
                      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-4 w-6">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="w-3 h-3 rounded-sm border border-white/10 bg-white/5"
                          />
                        ))}
                      </div>
                      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between py-4 w-6 items-end">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="w-3 h-3 rounded-sm border border-white/10 bg-white/5"
                          />
                        ))}
                      </div>

                      {/* Film frames */}
                      <div className="mx-8 space-y-2">
                        {[
                          { label: "Corporate Film", dur: "02:30" },
                          { label: "Product Ad", dur: "00:45" },
                          { label: "YouTube Edit", dur: "12:08" },
                          { label: "Motion Graphics", dur: "01:15" },
                        ].map((frame, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02]"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                          >
                            <div
                              className="w-14 h-10 rounded bg-gradient-to-br flex items-center justify-center flex-shrink-0"
                              style={{
                                background: `linear-gradient(135deg, ${service.color}20, ${service.color}05)`,
                              }}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill={service.color}
                                opacity="0.7"
                              >
                                <path d="M3 2l9 5-9 5z" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-medium text-text-primary truncate">
                                {frame.label}
                              </div>
                              <div className="text-[10px] text-text-muted font-mono">
                                {frame.dur}
                              </div>
                            </div>
                            <div className="w-16 h-1 rounded-full bg-white/5 overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: service.color }}
                                initial={{ width: "0%" }}
                                whileInView={{ width: `${60 + i * 12}%` }}
                                viewport={{ once: true }}
                                transition={{
                                  delay: 0.5 + i * 0.15,
                                  duration: 0.8,
                                }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Play button overlay */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center border-2"
                          style={{
                            borderColor: `${service.color}40`,
                            backgroundColor: `${service.color}10`,
                            boxShadow: `0 0 30px ${service.color}15`,
                            animation: "pulse-glow 2s ease-in-out infinite",
                          }}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill={service.color}
                          >
                            <path d="M5 3l12 7-12 7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* ─── STANDARD SERVICE CARD ─── */
                <>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${service.color}15`,
                          border: `1px solid ${service.color}25`,
                        }}
                      >
                        <div style={{ color: service.color }}>
                          {serviceIcons[service.icon]}
                        </div>
                      </div>
                      <span className="text-xs font-mono text-text-muted">
                        Service {service.number}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-3 group-hover:text-white transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-lg">
                      {service.tagline}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {(highlights[service.id] || []).map((h, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 text-xs rounded-full border"
                          style={{
                            borderColor: `${service.color}25`,
                            color: service.color,
                            backgroundColor: `${service.color}08`,
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <span
                      className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300"
                      style={{ color: service.color }}
                    >
                      Explore Service
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>

                  {/* Right side: large service number watermark */}
                  <div className="hidden lg:flex items-center justify-center">
                    <span
                      className="text-[10rem] font-heading font-bold leading-none select-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500"
                      style={{ color: service.color }}
                    >
                      {service.number}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Bottom accent strip */}
            <div
              className="h-[2px] w-0 group-hover:w-full transition-all duration-500"
              style={{ backgroundColor: service.color }}
            />
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

// ─── STICKY SCROLL SERVICES SECTION ─────────────────────────────────────────
const StickyScrollServices = () => {
  return (
    <section id="services-showcase" className="py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <RevealOnScroll>
            <span className="text-xs font-medium tracking-widest uppercase text-accent-light">
              What We Do
            </span>
          </RevealOnScroll>
          <SplitText
            className="font-heading text-h2 font-bold text-text-primary mt-3"
            as="h2"
          >
            Our Services
          </SplitText>
          <RevealOnScroll delay={0.2}>
            <p className="mt-4 text-text-secondary text-lg max-w-xl mx-auto">
              Five specialized services, one relentless pursuit of perfection.
              Click any card to dive deeper.
            </p>
          </RevealOnScroll>
        </div>

        {/* Sticky scroll stack */}
        <div className="space-y-6">
          {SERVICES.map((service, i) => (
            <StickyServiceCard
              key={service.id}
              service={service}
              index={i}
              totalCards={SERVICES.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── HOW WE WORK (PROCESS) ──────────────────────────────────────────────────
const ProcessSection = () => (
  <section className="py-(--spacing-section) bg-bg-secondary/50">
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      <div className="text-center mb-16">
        <RevealOnScroll>
          <span className="text-xs font-medium tracking-widest uppercase text-accent-light">
            Our Process
          </span>
        </RevealOnScroll>
        <SplitText
          className="font-heading text-h2 font-bold text-text-primary mt-3"
          as="h2"
        >
          How We Work
        </SplitText>
        <RevealOnScroll delay={0.2}>
          <p className="mt-4 text-text-secondary text-lg max-w-xl mx-auto">
            A proven, disciplined process — no surprises, no missed deadlines.
          </p>
        </RevealOnScroll>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROCESS_STEPS.map((step, i) => (
          <RevealOnScroll key={i} delay={i * 0.12}>
            <motion.div
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="relative p-7 rounded-2xl bg-surface border border-white/5 hover:border-accent/15 transition-all duration-300 group text-center h-full"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-accent/20 transition-colors duration-300">
                <span className="text-sm font-heading font-bold text-accent-light">
                  {step.number}
                </span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {step.desc}
              </p>
              {i < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-3 w-6 h-[1px] bg-accent/20" />
              )}
            </motion.div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

// ─── WHY CHOOSE US ──────────────────────────────────────────────────────────
const WhyUsSection = () => {
  const whyIcons = [
    <svg
      key="0"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="2" y="2" width="9" height="9" rx="2" />
      <rect x="13" y="2" width="9" height="9" rx="2" />
      <rect x="2" y="13" width="9" height="9" rx="2" />
      <rect x="13" y="13" width="9" height="9" rx="2" />
    </svg>,
    <svg
      key="1"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
    </svg>,
    <svg
      key="2"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>,
    <svg
      key="3"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M4 20V14M9 20V10M14 20V16M19 20V8"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>,
    <svg
      key="4"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2c-4 4-4 16 0 20M12 2c4 4 4 16 0 20" />
    </svg>,
    <svg
      key="5"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M12 2L9 8H3l5 4-2 7 6-4 6 4-2-7 5-4h-6z"
        strokeLinejoin="round"
      />
    </svg>,
  ];

  return (
    <section className="py-(--spacing-section) relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/[0.02] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <RevealOnScroll>
            <span className="text-xs font-medium tracking-widest uppercase text-accent-light">
              Why PostPerfect
            </span>
          </RevealOnScroll>
          <SplitText
            className="font-heading text-h2 font-bold text-text-primary mt-3"
            as="h2"
          >
            The PostPerfect Difference
          </SplitText>
          <RevealOnScroll delay={0.2}>
            <p className="mt-4 text-text-secondary text-lg max-w-xl mx-auto">
              Dozens of agencies can build a website. Few can deliver what we
              deliver.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_CHOOSE_US.map((item, i) => (
            <RevealOnScroll key={i} delay={i * 0.09}>
              <motion.div
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className="p-7 rounded-xl bg-surface border border-white/5 hover:border-accent/15 transition-all duration-300 group h-full"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/15 flex items-center justify-center mb-5 text-accent-light group-hover:bg-accent/15 transition-colors duration-300">
                  {whyIcons[i]}
                </div>
                <h3 className="font-heading text-base font-semibold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── TECH MARQUEE ───────────────────────────────────────────────────────────
const MarqueeRow = ({ items, reverse = false, speed = 40 }) => {
  const duplicated = [...items, ...items];
  return (
    <div className="overflow-hidden py-3">
      <div
        className="flex gap-6 whitespace-nowrap"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {duplicated.map((tech, i) => (
          <span
            key={i}
            className="inline-flex items-center px-5 py-2.5 rounded-full border border-white/5 bg-surface/50 text-sm text-text-secondary hover:text-text-primary hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 cursor-default select-none"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

const TechMarquee = () => {
  const half = Math.ceil(TECH_STACK.length / 2);
  const row1 = TECH_STACK.slice(0, half);
  const row2 = TECH_STACK.slice(half);

  return (
    <section className="py-16 overflow-hidden bg-bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
        <RevealOnScroll>
          <h2 className="font-heading text-sm font-medium tracking-widest uppercase text-accent-light text-center">
            Technologies We Work With
          </h2>
        </RevealOnScroll>
      </div>
      <div className="space-y-2">
        <MarqueeRow items={row1} speed={35} />
        <MarqueeRow items={row2} reverse speed={40} />
      </div>
    </section>
  );
};

// ─── FINAL CTA ──────────────────────────────────────────────────────────────
const FinalCTA = () => (
  <section className="py-(--spacing-section) relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

    <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
      <SplitText
        className="font-heading text-h2 font-bold text-text-primary"
        as="h2"
      >
        Ready to Build Something Exceptional?
      </SplitText>

      <RevealOnScroll delay={0.2}>
        <p className="mt-6 text-text-secondary text-lg max-w-xl mx-auto">
          Whether you need a website, an app, a brand identity, a marketing
          strategy, or social media management — we've got you covered.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.4}>
        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/contact"
            className="px-8 py-3.5 bg-accent text-white font-semibold rounded-full hover:bg-accent-light transition-colors duration-300 hover:-translate-y-0.5 transform"
          >
            Get a Free Quote
          </Link>
          <Link
            to="/about"
            className="px-8 py-3.5 border border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-white transition-all duration-300"
          >
            Learn About Us
          </Link>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.6}>
        <div className="mt-16 flex items-center justify-center gap-8 flex-wrap text-text-muted text-xs">
          {[
            "Free Consultation",
            "No Hidden Costs",
            "NDA Protection",
            "150+ Projects Delivered",
          ].map((text) => (
            <div key={text} className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M3.5 8l3 3 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {text}
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

// ─── MAIN SERVICES PAGE ─────────────────────────────────────────────────────
const Services = () => {
  return (
    <PageWrapper>
      <ServicesHero />
      <TrustStats />
      <StickyScrollServices />
      <ProcessSection />
      <WhyUsSection />
      <TechMarquee />
      <FinalCTA />
    </PageWrapper>
  );
};

export default Services;
