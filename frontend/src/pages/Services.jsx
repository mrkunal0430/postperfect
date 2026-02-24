import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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

// ─── SERVICE ICONS ─────────────────────────────────────────────────────────────
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
      <circle cx="6" cy="18" r="1.8" fill="currentColor" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      <circle cx="18" cy="20" r="1.8" fill="currentColor" />
      <circle cx="24" cy="8" r="1.8" fill="currentColor" />
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

// ─── ANIMATED COUNTER ──────────────────────────────────────────────────────────
const AnimatedNumber = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const num = parseInt(value) || 0;

  return (
    <span ref={ref}>
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {value}
        </motion.span>
      ) : (
        "0"
      )}
    </span>
  );
};

// ─── HERO SECTION ──────────────────────────────────────────────────────────────
const ServicesHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background elements */}
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

      {/* Floating service badges */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">
        {SERVICES.map((service, i) => {
          const positions = [
            { top: "18%", left: "8%" },
            { top: "25%", right: "6%" },
            { bottom: "30%", left: "5%" },
            { top: "15%", right: "20%" },
            { bottom: "25%", right: "10%" },
          ];
          const pos = positions[i] || {};
          return (
            <motion.div
              key={service.id}
              className="absolute px-4 py-2 rounded-full border text-xs font-medium"
              style={{
                ...pos,
                color: service.color,
                borderColor: `${service.color}30`,
                backgroundColor: `${service.color}08`,
              }}
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.6,
              }}
            >
              {service.name}
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
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
          Everything Your Business Needs — Under One Roof
        </SplitText>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          From development to design, from marketing to management — we deliver
          premium digital solutions that build trust and drive results.
        </motion.p>

        {/* Quick service pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-10 flex items-center justify-center gap-3 flex-wrap"
        >
          {SERVICES.map((service, i) => (
            <a
              key={service.id}
              href={`#service-${service.id}`}
              className="px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 hover:-translate-y-0.5"
              style={{
                color: service.color,
                borderColor: `${service.color}30`,
                backgroundColor: `${service.color}08`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${service.color}60`;
                e.currentTarget.style.backgroundColor = `${service.color}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${service.color}30`;
                e.currentTarget.style.backgroundColor = `${service.color}08`;
              }}
            >
              {service.number}. {service.name}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs text-text-muted tracking-widest uppercase">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-8 bg-gradient-to-b from-accent to-transparent"
        />
      </div>
    </section>
  );
};

// ─── TRUST STATS BAR ───────────────────────────────────────────────────────────
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

// ─── PORTFOLIO CARD ────────────────────────────────────────────────────────────
const PortfolioCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl overflow-hidden bg-surface border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
    >
      {/* Project image placeholder - gradient */}
      <div
        className="relative h-48 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${item.color}15 0%, ${item.color}05 50%, transparent 100%)`,
        }}
      >
        {/* Category badge */}
        <span
          className="absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full"
          style={{
            color: item.color,
            backgroundColor: `${item.color}20`,
            border: `1px solid ${item.color}30`,
          }}
        >
          {item.category}
        </span>

        {/* Abstract decoration */}
        <div
          className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-[80px] opacity-20"
          style={{ backgroundColor: item.color }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full opacity-10"
          style={{ backgroundColor: item.color }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h4 className="font-heading text-lg font-semibold text-text-primary mb-2">
          {item.title}
        </h4>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          {item.desc}
        </p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-2">
          {item.metrics.map((metric, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-text-muted border border-white/[0.05]"
            >
              {metric}
            </span>
          ))}
        </div>
      </div>

      {/* Hover glow */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          boxShadow: `0 0 60px ${item.color}10, inset 0 0 0 1px ${item.color}15`,
        }}
      />
    </motion.div>
  );
};

// ─── SERVICE SECTION (Full showcase block per service) ─────────────────────────
const ServiceShowcase = ({ service, index }) => {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const isEven = index % 2 === 0;

  return (
    <section
      id={`service-${service.id}`}
      className="py-(--spacing-section) relative scroll-mt-20"
      style={{
        backgroundColor: index % 2 === 0 ? "transparent" : "rgba(5,11,21,0.3)",
      }}
    >
      {/* Service number watermark */}
      <div
        className="absolute top-20 right-8 text-[15rem] font-heading font-bold leading-none select-none pointer-events-none opacity-[0.02]"
        style={{ color: service.color }}
      >
        {service.number}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs font-heading font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border"
                style={{
                  color: service.color,
                  borderColor: `${service.color}40`,
                  backgroundColor: `${service.color}10`,
                }}
              >
                Service {service.number}
              </span>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <SplitText
                className="font-heading text-h1 font-bold leading-[0.95] tracking-tight text-text-primary"
                as="h2"
                staggerDelay={0.02}
              >
                {service.name}
              </SplitText>
              <RevealOnScroll delay={0.3}>
                <p
                  className="mt-3 text-xl font-heading font-medium"
                  style={{ color: service.color }}
                >
                  {service.tagline}
                </p>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.4}>
              <p className="text-text-secondary text-lg leading-relaxed">
                {service.shortDesc}
              </p>
            </RevealOnScroll>
          </div>
        </div>

        {/* Metrics bar */}
        <RevealOnScroll>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl border border-white/5 mb-16"
            style={{ backgroundColor: `${service.color}06` }}
          >
            {service.metrics.map((m, i) => (
              <div key={i} className="text-center">
                <div
                  className="font-heading text-2xl md:text-3xl font-bold"
                  style={{ color: service.color }}
                >
                  {m.value}
                </div>
                <div className="text-xs text-text-muted mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Industries tabs (for web-app-development) */}
        {service.industries && (
          <div className="mb-16">
            <RevealOnScroll>
              <h3 className="font-heading text-h3 font-bold text-text-primary mb-2">
                Industries We Serve
              </h3>
              <p className="text-text-secondary mb-8">
                Deep expertise across every major industry. Click to explore.
              </p>
            </RevealOnScroll>

            {/* Industry tabs */}
            <RevealOnScroll delay={0.1}>
              <div className="flex flex-wrap gap-2 mb-8">
                {service.industries.map((ind, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndustry(i)}
                    className="px-4 py-2.5 text-sm rounded-full border transition-all duration-300 font-medium"
                    style={{
                      color:
                        activeIndustry === i
                          ? service.color
                          : "var(--color-text-secondary)",
                      borderColor:
                        activeIndustry === i
                          ? `${service.color}50`
                          : "rgba(255,255,255,0.08)",
                      backgroundColor:
                        activeIndustry === i
                          ? `${service.color}12`
                          : "transparent",
                    }}
                  >
                    <span className="mr-1.5">{ind.icon}</span>
                    {ind.name}
                  </button>
                ))}
              </div>
            </RevealOnScroll>

            {/* Active industry detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 rounded-2xl bg-surface border border-white/[0.06]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">
                        {service.industries[activeIndustry].icon}
                      </span>
                      <h4 className="font-heading text-xl font-semibold text-text-primary">
                        {service.industries[activeIndustry].name}
                      </h4>
                    </div>
                    <p className="text-text-secondary leading-relaxed text-base">
                      {service.industries[activeIndustry].desc}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
                      Technologies
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {service.industries[activeIndustry].techStack.map(
                        (tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 text-xs rounded-full border"
                            style={{
                              borderColor: `${service.color}30`,
                              color: service.color,
                              backgroundColor: `${service.color}08`,
                            }}
                          >
                            {tech}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Sub-services (for video editing) */}
        {service.subServices && (
          <div className="mb-16">
            <RevealOnScroll>
              <h3 className="font-heading text-h3 font-bold text-text-primary mb-2">
                What We Create
              </h3>
              <p className="text-text-secondary mb-8">
                Every type of video and animation — expertly crafted.
              </p>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.subServices.map((sub, i) => (
                <RevealOnScroll key={i} delay={i * 0.08}>
                  <motion.div
                    whileHover={{
                      y: -4,
                      transition: { duration: 0.2 },
                    }}
                    className="p-6 rounded-xl bg-surface border border-white/5 hover:border-white/10 transition-all duration-300 group h-full"
                  >
                    <span className="text-3xl mb-3 block">{sub.icon}</span>
                    <h4 className="font-heading text-base font-semibold text-text-primary mb-2">
                      {sub.name}
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {sub.desc}
                    </p>
                  </motion.div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        )}

        {/* What's Included */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <RevealOnScroll>
            <div>
              <h3 className="font-heading text-h3 font-bold text-text-primary mb-6">
                What's Included
              </h3>
              <ul className="space-y-3">
                {service.offerings.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="flex items-start gap-3 text-sm text-text-secondary"
                  >
                    <span
                      className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: service.color }}
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>

              {/* Tech stack */}
              <h4 className="text-xs font-semibold uppercase tracking-widest text-text-muted mt-8 mb-3">
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-xs rounded-full border"
                    style={{
                      borderColor: `${service.color}25`,
                      color: service.color,
                      backgroundColor: `${service.color}06`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Benefits */}
          <RevealOnScroll delay={0.2}>
            <div>
              <h3 className="font-heading text-h3 font-bold text-text-primary mb-6">
                Why It Matters
              </h3>
              <div className="space-y-4">
                {service.benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4 p-5 rounded-xl bg-surface/60 border border-white/5 hover:border-white/8 transition-colors duration-300"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        backgroundColor: `${service.color}12`,
                        border: `1px solid ${service.color}20`,
                      }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: service.color }}
                      />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-semibold text-text-primary mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Portfolio / Past Work */}
        {service.portfolio && service.portfolio.length > 0 && (
          <div className="mb-12">
            <RevealOnScroll>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-heading text-h3 font-bold text-text-primary">
                    Our Work
                  </h3>
                  <p className="text-text-secondary mt-1">
                    Real projects. Real results. See what we've delivered.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full border transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    color: service.color,
                    borderColor: `${service.color}40`,
                    backgroundColor: `${service.color}08`,
                  }}
                >
                  Start Your Project
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M2 6h8M6.5 2.5L10 6l-3.5 3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.portfolio.map((item, i) => (
                <PortfolioCard key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* CTA for this service */}
        <RevealOnScroll>
          <div
            className="p-8 md:p-10 rounded-2xl border border-white/[0.06] text-center"
            style={{ backgroundColor: `${service.color}06` }}
          >
            <h3 className="font-heading text-h3 font-bold text-text-primary mb-3">
              Ready to Get Started with{" "}
              <span style={{ color: service.color }}>{service.name}</span>?
            </h3>
            <p className="text-text-secondary mb-6 max-w-xl mx-auto">
              Let's discuss your project. No commitment — just a conversation
              about what you're trying to achieve.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                to="/contact"
                className="px-8 py-3.5 font-semibold rounded-full text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                style={{ backgroundColor: service.color }}
              >
                Book a Free Consultation
              </Link>
              <Link
                to={`/services/${service.slug}`}
                className="px-8 py-3.5 border border-white/10 text-text-secondary font-semibold rounded-full hover:border-white/20 hover:text-text-primary transition-all duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

// ─── HOW WE WORK (PROCESS) ────────────────────────────────────────────────────
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
              {/* Number */}
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

              {/* Connector line (not on last) */}
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

// ─── WHY CHOOSE US ─────────────────────────────────────────────────────────────
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

// ─── TECH MARQUEE ──────────────────────────────────────────────────────────────
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

// ─── FINAL CTA ─────────────────────────────────────────────────────────────────
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

      {/* Trust signals */}
      <RevealOnScroll delay={0.6}>
        <div className="mt-16 flex items-center justify-center gap-8 flex-wrap text-text-muted text-xs">
          <div className="flex items-center gap-2">
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
            Free Consultation
          </div>
          <div className="flex items-center gap-2">
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
            No Hidden Costs
          </div>
          <div className="flex items-center gap-2">
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
            NDA Protection
          </div>
          <div className="flex items-center gap-2">
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
            150+ Projects Delivered
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

// ─── MAIN SERVICES PAGE ────────────────────────────────────────────────────────
const Services = () => {
  return (
    <PageWrapper>
      <ServicesHero />
      <TrustStats />

      {/* Each service gets its own full showcase section */}
      {SERVICES.map((service, i) => (
        <ServiceShowcase key={service.id} service={service} index={i} />
      ))}

      <ProcessSection />
      <WhyUsSection />
      <TechMarquee />
      <FinalCTA />
    </PageWrapper>
  );
};

export default Services;
