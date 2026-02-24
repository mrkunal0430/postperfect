import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SERVICES } from "../../../utils/constants";
import SplitText from "../../ui/SplitText";
import RevealOnScroll from "../../ui/RevealOnScroll";

const serviceIcons = {
  web: (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="5" y="7" width="30" height="22" rx="3" />
      <path d="M5 13h30" />
      <circle cx="9" cy="10" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="13" cy="10" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="17" cy="10" r="1.2" fill="currentColor" stroke="none" />
      <path
        d="M14 21l4-5 4 5M28 18l-4 5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 33h16" strokeLinecap="round" />
    </svg>
  ),
  app: (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="11" y="4" width="18" height="32" rx="4" />
      <path d="M17 33h6" strokeLinecap="round" />
      <rect x="15" y="10" width="10" height="6" rx="1" />
      <rect x="15" y="19" width="4" height="4" rx="1" />
      <rect x="21" y="19" width="4" height="4" rx="1" />
      <rect x="15" y="25" width="4" height="4" rx="1" />
      <rect x="21" y="25" width="4" height="4" rx="1" />
    </svg>
  ),
  video: (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="4" y="9" width="24" height="18" rx="3" />
      <path d="M28 15l8-4v18l-8-4" strokeLinejoin="round" />
      <path d="M9 32h22" strokeLinecap="round" />
      <circle cx="16" cy="18" r="4" />
      <path d="M15 16l3 2-3 2z" fill="currentColor" stroke="none" />
    </svg>
  ),
  marketing: (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M7 33V20M14 33V14M21 33V22M28 33V10M35 33V16"
        strokeLinecap="round"
        strokeWidth="3"
      />
      <path
        d="M7 20l7-6 7 8 7-12 7 6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <circle cx="7" cy="20" r="2" fill="currentColor" />
      <circle cx="14" cy="14" r="2" fill="currentColor" />
      <circle cx="21" cy="22" r="2" fill="currentColor" />
      <circle cx="28" cy="10" r="2" fill="currentColor" />
      <circle cx="35" cy="16" r="2" fill="currentColor" />
    </svg>
  ),
  erp: (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="14" y="14" width="12" height="12" rx="2" />
      <rect x="3" y="3" width="10" height="10" rx="2" />
      <rect x="27" y="3" width="10" height="10" rx="2" />
      <rect x="3" y="27" width="10" height="10" rx="2" />
      <rect x="27" y="27" width="10" height="10" rx="2" />
      <path
        d="M13 8h4M23 8h4M8 13v4M32 13v4M8 23v4M32 23v4M13 32h4M23 32h4"
        strokeLinecap="round"
      />
    </svg>
  ),
  software: (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M12 8L4 20l8 12M28 8l8 12-8 12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M23 6l-6 28" strokeLinecap="round" />
    </svg>
  ),
};

const ServiceCard = ({ service, index, className = "" }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    setTilt({
      rotateX: -percentY * 12,
      rotateY: percentX * 12,
    });
    setGlarePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        style={{ perspective: 1000, transformStyle: "preserve-3d" }}
        className="relative h-full rounded-2xl overflow-hidden bg-surface border border-white/[0.06] group"
      >
        {/* Holographic shine overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.12 : 0,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%,
              rgba(255,255,255,0.4) 0%,
              rgba(167,139,250,0.2) 25%,
              rgba(192,132,252,0.1) 50%,
              transparent 70%)`,
          }}
        />

        {/* Glow border on hover */}
        <div
          className="absolute inset-0 z-0 rounded-2xl transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            boxShadow: `inset 0 0 0 1px ${service.color}30, 0 0 40px ${service.color}15`,
          }}
        />

        {/* Content */}
        <div className="relative z-20 p-6 md:p-8 h-full flex flex-col">
          {/* Number watermark */}
          <span className="absolute top-4 right-4 text-6xl md:text-7xl font-heading font-bold text-white/[0.04] group-hover:text-white/[0.08] transition-colors duration-500 select-none">
            {service.number}
          </span>

          {/* Icon */}
          <motion.div
            animate={
              isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
            style={{
              color: service.color,
              backgroundColor: `${service.color}12`,
              border: `1px solid ${service.color}20`,
            }}
          >
            {serviceIcons[service.icon]}
          </motion.div>

          {/* Title */}
          <h3 className="font-heading text-xl md:text-2xl font-bold text-text-primary mb-2">
            {service.name}
          </h3>

          {/* Tagline */}
          <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-4">
            {service.tagline}
          </p>

          {/* Offerings - revealed on hover */}
          <motion.div
            initial={false}
            animate={
              isHovered
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden mt-auto"
          >
            <div className="pt-4 border-t border-white/5">
              <ul className="space-y-2">
                {service.offerings.map((offering, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                    className="text-sm text-text-secondary flex items-center gap-2"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: service.color }}
                    />
                    {offering}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* View Details link — always visible at bottom */}
          <Link
            to={`/services/${service.slug}`}
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold group/link transition-all duration-300"
            style={{ color: service.color }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="group-hover/link:underline">View Full Details</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-200 group-hover/link:translate-x-0.5"
            >
              <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          {/* Accent strip at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full origin-left"
              style={{ backgroundColor: service.color }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServiceGrid = () => {
  return (
    <section className="py-(--spacing-section) relative">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <RevealOnScroll>
            <span className="text-xs font-medium tracking-widest uppercase text-accent-light">
              Our Services
            </span>
          </RevealOnScroll>
          <SplitText
            className="font-heading text-h2 font-bold text-text-primary mt-3"
            as="h2"
          >
            Everything You Need
          </SplitText>
          <RevealOnScroll delay={0.2}>
            <p className="mt-4 text-text-secondary text-lg max-w-xl mx-auto">
              A comprehensive suite of digital services, each crafted with
              precision.
            </p>
          </RevealOnScroll>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(280px,auto)] gap-5">
          {/* Web Dev - 2 cols, 2 rows */}
          <ServiceCard
            service={SERVICES[0]}
            index={0}
            className="md:col-span-2 md:row-span-2"
          />

          {/* App Dev - 1 col, 1 row */}
          <ServiceCard
            service={SERVICES[1]}
            index={1}
            className="md:col-span-1"
          />

          {/* Video Editing - 1 col, 1 row */}
          <ServiceCard
            service={SERVICES[2]}
            index={2}
            className="md:col-span-1"
          />

          {/* Marketing - 1 col, 1 row */}
          <ServiceCard
            service={SERVICES[3]}
            index={3}
            className="md:col-span-1"
          />

          {/* ERP - 1 col, 1 row */}
          <ServiceCard
            service={SERVICES[4]}
            index={4}
            className="md:col-span-1"
          />

          {/* Custom Software - 2 cols, 1 row */}
          <ServiceCard
            service={SERVICES[5]}
            index={5}
            className="md:col-span-2"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
