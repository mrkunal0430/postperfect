import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "../../../utils/constants";
import RevealOnScroll from "../../ui/RevealOnScroll";

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const testimonial = TESTIMONIALS[current];

  return (
    <section className="py-(--spacing-section) relative overflow-hidden">
      {/* Giant quotation mark */}
      <div className="absolute top-12 left-8 lg:left-20 text-[20rem] font-heading font-bold leading-none text-accent/[0.03] pointer-events-none select-none">
        &ldquo;
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <h2 className="font-heading text-sm font-medium tracking-widest uppercase text-accent-light mb-12 text-center">
            What Our Clients Say
          </h2>
        </RevealOnScroll>

        <div className="min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="font-heading text-h3 font-medium text-text-primary leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-8">
                <p className="font-semibold text-text-primary">
                  {testimonial.author}
                </p>
                <p className="text-sm text-text-secondary">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-accent"
                  : "bg-text-muted/30 hover:bg-text-muted/50"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
