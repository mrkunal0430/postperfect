import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SERVICES } from "../../../utils/constants";
import SplitText from "../../ui/SplitText";
import RevealOnScroll from "../../ui/RevealOnScroll";

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
      <rect x="4" y="6" width="24" height="18" rx="2" />
      <path d="M4 11h24" />
      <circle cx="8" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="11" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <path d="M12 18l3-4 3 4M22 15l-3 4" />
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
      <rect x="4" y="8" width="18" height="16" rx="2" />
      <path d="M22 13l6-3v12l-6-3" />
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
      <path d="M6 26V14M12 26V10M18 26V16M24 26V8" strokeLinecap="round" />
      <path
        d="M6 14l6-4 6 6 6-8"
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

const ServiceCard = ({ service, index }) => {
  return (
    <RevealOnScroll delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        className="group relative p-6 rounded-xl bg-surface border border-white/5 hover:border-accent/20 transition-all duration-300 hover:shadow-glow-sm h-full"
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300"
          style={{
            color: service.color,
            backgroundColor: `${service.color}15`,
          }}
        >
          {serviceIcons[service.icon]}
        </div>

        {/* Number */}
        <span className="absolute top-5 right-5 text-4xl font-heading font-bold text-white/[0.04] group-hover:text-white/[0.08] transition-colors duration-300">
          {service.number}
        </span>

        {/* Content */}
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
          {service.name}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {service.tagline}
        </p>

        {/* Accent strip */}
        <div
          className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: service.color }}
        />
      </motion.div>
    </RevealOnScroll>
  );
};

const ServicesPreview = () => {
  return (
    <section className="py-(--spacing-section)">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <SplitText
            className="font-heading text-h2 font-bold text-text-primary"
            as="h2"
          >
            What We Do
          </SplitText>
          <RevealOnScroll delay={0.2}>
            <p className="mt-4 text-text-secondary text-lg max-w-xl mx-auto">
              Five specialized services, one relentless pursuit of perfection.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <RevealOnScroll className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-white transition-all duration-300"
          >
            Explore All Services
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
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ServicesPreview;
