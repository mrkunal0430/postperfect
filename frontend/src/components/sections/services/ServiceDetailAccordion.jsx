import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { SERVICES } from "../../../utils/constants";
import RevealOnScroll from "../../ui/RevealOnScroll";
import SplitText from "../../ui/SplitText";

const AccordionItem = ({ service, isOpen, onClick }) => {
  return (
    <motion.div
      layout
      className={`border-b border-white/5 transition-colors duration-300 ${
        isOpen ? "bg-surface/50" : ""
      }`}
    >
      {/* Header */}
      <button
        onClick={onClick}
        className="w-full flex items-center gap-6 py-6 md:py-8 px-6 md:px-8 text-left group"
      >
        {/* Service number */}
        <span
          className="text-sm font-heading font-bold transition-colors duration-300"
          style={{ color: isOpen ? service.color : "var(--color-text-muted)" }}
        >
          {service.number}
        </span>

        {/* Left accent border when open */}
        <motion.div
          animate={{ height: isOpen ? "100%" : "0%" }}
          transition={{ duration: 0.4 }}
          className="absolute left-0 top-0 w-[3px] rounded-full"
          style={{ backgroundColor: service.color }}
        />

        {/* Name */}
        <h3 className="font-heading text-xl md:text-2xl font-semibold text-text-primary flex-1">
          {service.name}
        </h3>

        {/* Tagline (desktop) */}
        <span className="hidden lg:block text-sm text-text-muted max-w-xs">
          {service.tagline}
        </span>

        {/* Expand icon */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-accent/30 transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M7 2v10M2 7h10" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-8 md:pb-10 pl-16 md:pl-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Description */}
                <div>
                  <p className="text-text-secondary leading-relaxed">
                    {service.shortDesc}
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 mt-6 text-sm font-semibold transition-colors duration-300 hover:opacity-80"
                    style={{ color: service.color }}
                  >
                    Discuss This Service
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M2 7h10M8 3l4 4-4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>

                {/* Offerings & Tech */}
                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
                    What We Deliver
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {service.offerings.map((offering, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
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

                  <h4 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                        className="px-3 py-1 text-xs rounded-full border"
                        style={{
                          borderColor: `${service.color}30`,
                          color: service.color,
                          backgroundColor: `${service.color}08`,
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ServiceDetailAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-(--spacing-section)">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <SplitText
            className="font-heading text-h2 font-bold text-text-primary"
            as="h2"
          >
            Deep Dive
          </SplitText>
          <RevealOnScroll delay={0.2}>
            <p className="mt-4 text-text-secondary text-lg">
              Explore each service in detail.
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll>
          <div className="border-t border-white/5 relative">
            {SERVICES.map((service, i) => (
              <AccordionItem
                key={service.id}
                service={service}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ServiceDetailAccordion;
