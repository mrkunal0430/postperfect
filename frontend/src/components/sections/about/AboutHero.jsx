import { motion } from "framer-motion";
import SplitText from "../../ui/SplitText";

const AboutHero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Accent glow */}
      <div
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(181,138,93,0.06) 0%, transparent 60%)",
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
            About Us
          </span>
        </motion.div>

        <SplitText
          className="font-heading text-display font-bold leading-[0.95] tracking-tight text-text-primary"
          delay={0.3}
          staggerDelay={0.025}
        >
          We Are PostPerfect
        </SplitText>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-text-secondary text-lg max-w-2xl mx-auto"
        >
          Born from an obsession with craft. Driven by results. We build digital
          experiences that businesses rely on and users love.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutHero;
