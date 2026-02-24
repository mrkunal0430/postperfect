import { motion } from "framer-motion";
import SplitText from "../../ui/SplitText";

const ServicesHero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Accent glows */}
      <div
        className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(181,138,93,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(91,155,245,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-accent border border-accent/30 rounded-full bg-accent/5">
            Our Services
          </span>
        </motion.div>

        <SplitText
          className="font-heading text-display font-bold leading-[0.95] tracking-tight text-text-primary"
          delay={0.3}
          staggerDelay={0.025}
        >
          Six Pillars of Digital Excellence
        </SplitText>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-text-secondary text-lg max-w-2xl mx-auto"
        >
          From concept to deployment, we deliver end-to-end digital solutions
          that drive growth and exceed expectations.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs text-text-muted tracking-widest uppercase">
          Explore
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
};

export default ServicesHero;
