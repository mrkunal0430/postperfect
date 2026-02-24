import { useParams, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../utils/constants';
import PageWrapper from '../components/layout/PageWrapper';
import SplitText from '../components/ui/SplitText';
import RevealOnScroll from '../components/ui/RevealOnScroll';

// ─── Service icons (inline SVGs keyed by icon id) ───────────────────────────
const SERVICE_ICONS = {
  web: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="8" width="36" height="28" rx="4" />
      <path d="M6 16h36" />
      <circle cx="11" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="21" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <path d="M16 27l6-7 6 7M36 22l-6 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 40h20" strokeLinecap="round" />
    </svg>
  ),
  app: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="13" y="4" width="22" height="40" rx="5" />
      <path d="M21 41h6" strokeLinecap="round" />
      <rect x="18" y="12" width="12" height="8" rx="2" />
      <rect x="18" y="24" width="5" height="5" rx="1" />
      <rect x="25" y="24" width="5" height="5" rx="1" />
      <rect x="18" y="31" width="5" height="5" rx="1" />
      <rect x="25" y="31" width="5" height="5" rx="1" />
    </svg>
  ),
  video: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="12" width="30" height="22" rx="4" />
      <path d="M34 19l10-5v20l-10-5" strokeLinejoin="round" />
      <circle cx="19" cy="23" r="6" />
      <path d="M17.5 20.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
    </svg>
  ),
  marketing: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 40V28M16 40V20M24 40V30M32 40V14M40 40V22" strokeLinecap="round" strokeWidth="2.5" />
      <path d="M8 28l8-8 8 10 8-16 8 8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="28" r="2.5" fill="currentColor" />
      <circle cx="16" cy="20" r="2.5" fill="currentColor" />
      <circle cx="24" cy="30" r="2.5" fill="currentColor" />
      <circle cx="32" cy="14" r="2.5" fill="currentColor" />
      <circle cx="40" cy="22" r="2.5" fill="currentColor" />
    </svg>
  ),
  erp: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="18" y="18" width="12" height="12" rx="3" />
      <rect x="4" y="4" width="10" height="10" rx="2" />
      <rect x="34" y="4" width="10" height="10" rx="2" />
      <rect x="4" y="34" width="10" height="10" rx="2" />
      <rect x="34" y="34" width="10" height="10" rx="2" />
      <path d="M18 24H14M30 24H34M24 18V14M24 30V34" strokeLinecap="round" strokeWidth="2" />
    </svg>
  ),
  software: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 8L4 24l10 16M34 8l10 16-10 16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29 6l-10 36" strokeLinecap="round" />
    </svg>
  ),
};

// ─── Section: Hero ────────────────────────────────────────────────────────────
const ServiceHero = ({ service }) => (
  <section className="relative min-h-[70vh] flex items-center pt-28 pb-20 overflow-hidden">
    {/* Large number watermark */}
    <div
      className="absolute right-0 top-1/2 -translate-y-1/2 text-[18rem] font-heading font-bold leading-none select-none pointer-events-none opacity-[0.025]"
      style={{ color: service.color }}
    >
      {service.number}
    </div>

    {/* Gradient orb */}
    <div
      className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.07] pointer-events-none"
      style={{ backgroundColor: service.color }}
    />

    <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
      {/* Breadcrumb */}
      <RevealOnScroll>
        <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link to="/" className="hover:text-text-secondary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/services" className="hover:text-text-secondary transition-colors">Services</Link>
          <span>/</span>
          <span style={{ color: service.color }}>{service.name}</span>
        </div>
      </RevealOnScroll>

      {/* Service number badge */}
      <RevealOnScroll delay={0.1}>
        <div className="flex items-center gap-3 mb-6">
          <span
            className="text-xs font-heading font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border"
            style={{ color: service.color, borderColor: `${service.color}40`, backgroundColor: `${service.color}10` }}
          >
            Service {service.number}
          </span>
        </div>
      </RevealOnScroll>

      {/* Title */}
      <SplitText
        className="font-heading text-h1 font-bold leading-[0.95] tracking-tight"
        as="h1"
        staggerDelay={0.02}
        delay={0.2}
      >
        {service.name}
      </SplitText>

      {/* Tagline */}
      <RevealOnScroll delay={0.5}>
        <p className="mt-4 text-2xl font-heading font-medium" style={{ color: service.color }}>
          {service.tagline}
        </p>
      </RevealOnScroll>

      {/* Description */}
      <RevealOnScroll delay={0.6}>
        <p className="mt-6 text-text-secondary text-lg max-w-2xl leading-relaxed">
          {service.shortDesc}
        </p>
      </RevealOnScroll>

      {/* CTA row */}
      <RevealOnScroll delay={0.7}>
        <div className="mt-10 flex items-center gap-4 flex-wrap">
          <Link
            to="/contact"
            className="px-8 py-3.5 font-semibold rounded-full transition-colors duration-300 text-bg-primary"
            style={{ backgroundColor: service.color }}
          >
            Start This Project
          </Link>
          <Link
            to="/services"
            className="px-8 py-3.5 border border-white/10 text-text-secondary font-semibold rounded-full hover:border-white/20 hover:text-text-primary transition-all duration-300"
          >
            All Services
          </Link>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

// ─── Section: Metrics ────────────────────────────────────────────────────────
const MetricsBar = ({ service }) => (
  <section className="py-10 border-y border-white/5" style={{ backgroundColor: `${service.color}08` }}>
    <div className="max-w-5xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {service.metrics.map((m, i) => (
          <RevealOnScroll key={i} delay={i * 0.1}>
            <div className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-bold" style={{ color: service.color }}>
                {m.value}
              </div>
              <div className="text-sm text-text-muted mt-1">{m.label}</div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

// ─── Section: Overview ───────────────────────────────────────────────────────
const Overview = ({ service }) => (
  <section className="py-(--spacing-section) bg-bg-primary">
    <div className="max-w-5xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Full description */}
        <RevealOnScroll>
          <div>
            <h2 className="font-heading text-h3 font-bold text-text-primary mb-6">
              What We Deliver
            </h2>
            <p className="text-text-secondary leading-relaxed text-base">
              {service.fullDescription}
            </p>
          </div>
        </RevealOnScroll>

        {/* Offerings list */}
        <RevealOnScroll delay={0.2}>
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-text-muted mb-6">
              What's Included
            </h3>
            <ul className="space-y-3">
              {service.offerings.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3 text-sm text-text-secondary"
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: service.color }}
                  />
                  {item}
                </motion.li>
              ))}
            </ul>

            {/* Tech stack pills */}
            <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-text-muted mt-10 mb-4">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full border"
                  style={{ borderColor: `${service.color}30`, color: service.color, backgroundColor: `${service.color}08` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

// ─── Section: Process ─────────────────────────────────────────────────────────
const ProcessSection = ({ service }) => (
  <section className="py-(--spacing-section) bg-bg-secondary">
    <div className="max-w-5xl mx-auto px-6 lg:px-8">
      <div className="text-center mb-16">
        <RevealOnScroll>
          <h2 className="font-heading text-h2 font-bold text-text-primary">
            How We Work
          </h2>
          <p className="mt-3 text-text-secondary">A clear, proven process — no surprises.</p>
        </RevealOnScroll>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {service.process.map((step, i) => (
          <RevealOnScroll key={i} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative p-8 rounded-2xl bg-surface border border-white/5 hover:border-white/10 transition-all duration-300 group"
            >
              {/* Step number accent */}
              <span
                className="text-7xl font-heading font-bold absolute top-4 right-6 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity select-none"
                style={{ color: service.color }}
              >
                {step.step}
              </span>

              {/* Step badge */}
              <span
                className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-4 inline-block"
                style={{ color: service.color, backgroundColor: `${service.color}12` }}
              >
                Step {step.step}
              </span>

              <h3 className="font-heading text-xl font-semibold text-text-primary mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {step.desc}
              </p>

              {/* Bottom border */}
              <div
                className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: service.color }}
              />
            </motion.div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

// ─── Section: Benefits ────────────────────────────────────────────────────────
const BenefitsSection = ({ service }) => (
  <section className="py-(--spacing-section) bg-bg-primary">
    <div className="max-w-5xl mx-auto px-6 lg:px-8">
      <div className="text-center mb-16">
        <RevealOnScroll>
          <h2 className="font-heading text-h2 font-bold text-text-primary">
            Why It Matters
          </h2>
          <p className="mt-3 text-text-secondary">The tangible advantages our clients experience.</p>
        </RevealOnScroll>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {service.benefits.map((benefit, i) => (
          <RevealOnScroll key={i} delay={i * 0.1}>
            <div className="flex items-start gap-5 p-6 rounded-xl bg-surface border border-white/5 hover:border-white/8 transition-colors duration-300">
              {/* Icon dot */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: `${service.color}15`, border: `1px solid ${service.color}25` }}
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: service.color }} />
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold text-text-primary mb-1.5">
                  {benefit.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

// ─── Section: Industries ─────────────────────────────────────────────────────
const IndustriesSection = ({ service }) => (
  <section className="py-16 bg-bg-secondary border-y border-white/5">
    <div className="max-w-5xl mx-auto px-6 lg:px-8">
      <RevealOnScroll>
        <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-text-muted mb-8 text-center">
          Industries We Serve with {service.name}
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {service.industries.map((ind, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="px-5 py-2.5 text-sm rounded-full border border-white/8 text-text-secondary bg-surface hover:border-white/15 hover:text-text-primary transition-all duration-300"
            >
              {ind}
            </motion.span>
          ))}
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

// ─── Section: FAQ ─────────────────────────────────────────────────────────────
const FaqItem = ({ faq, index, color }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-text-primary font-medium group-hover:text-text-primary transition-colors pr-8">
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 1v10M1 6h10" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-text-secondary leading-relaxed pb-5">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FaqSection = ({ service }) => (
  <section className="py-(--spacing-section) bg-bg-primary">
    <div className="max-w-3xl mx-auto px-6 lg:px-8">
      <div className="text-center mb-12">
        <RevealOnScroll>
          <h2 className="font-heading text-h2 font-bold text-text-primary">
            Common Questions
          </h2>
        </RevealOnScroll>
      </div>
      <RevealOnScroll>
        <div className="border-t border-white/5">
          {service.faq.map((item, i) => (
            <FaqItem key={i} faq={item} index={i} color={service.color} />
          ))}
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

// ─── Section: Related Services ───────────────────────────────────────────────
const RelatedServices = ({ service }) => {
  const related = service.relatedServices
    .map((id) => SERVICES.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <section className="py-(--spacing-section) bg-bg-secondary">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="font-heading text-h3 font-bold text-text-primary mb-10">
            Related Services
          </h2>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {related.map((rel, i) => (
            <RevealOnScroll key={rel.id} delay={i * 0.1}>
              <Link
                to={`/services/${rel.slug}`}
                className="group block p-6 rounded-xl bg-surface border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300"
                  style={{ color: rel.color, backgroundColor: `${rel.color}12`, border: `1px solid ${rel.color}20` }}
                >
                  <div className="scale-75">{SERVICE_ICONS[rel.icon]}</div>
                </div>
                <h3 className="font-heading text-base font-semibold text-text-primary mb-1">
                  {rel.name}
                </h3>
                <p className="text-xs text-text-muted mb-4">{rel.tagline}</p>
                <span
                  className="text-xs font-semibold flex items-center gap-1.5 transition-colors duration-300"
                  style={{ color: rel.color }}
                >
                  Learn More
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Section: CTA ─────────────────────────────────────────────────────────────
const ServiceCTA = ({ service }) => (
  <section className="py-(--spacing-section) relative overflow-hidden" style={{ backgroundColor: `${service.color}08` }}>
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: `radial-gradient(circle, ${service.color} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}
    />
    <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
      <RevealOnScroll>
        <h2 className="font-heading text-h2 font-bold text-text-primary">
          Ready to get started with{' '}
          <span style={{ color: service.color }}>{service.name}?</span>
        </h2>
        <p className="mt-5 text-text-secondary text-lg max-w-xl mx-auto">
          Let's discuss your project. No commitment required — just a conversation about what you're trying to achieve.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/contact"
            className="px-8 py-3.5 font-semibold rounded-full text-white transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: service.color }}
          >
            Book a Free Consultation
          </Link>
          <Link
            to="/services"
            className="px-8 py-3.5 border border-white/10 text-text-secondary font-semibold rounded-full hover:border-white/20 hover:text-text-primary transition-all duration-300"
          >
            View All Services
          </Link>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

// ─── Main ServicePage Component ───────────────────────────────────────────────
const ServicePage = () => {
  const { serviceId } = useParams();
  const service = SERVICES.find((s) => s.slug === serviceId);

  if (!service) return <Navigate to="/services" replace />;

  return (
    <PageWrapper>
      <ServiceHero service={service} />
      <MetricsBar service={service} />
      <Overview service={service} />
      <ProcessSection service={service} />
      <BenefitsSection service={service} />
      <IndustriesSection service={service} />
      <FaqSection service={service} />
      <RelatedServices service={service} />
      <ServiceCTA service={service} />
    </PageWrapper>
  );
};

export default ServicePage;
