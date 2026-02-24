import { motion } from "framer-motion";
import SplitText from "../../ui/SplitText";

const ContactHero = () => {
  return (
    <section className="pt-32 pb-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-accent-light border border-accent/30 rounded-full bg-accent/5">
            Get in Touch
          </span>
        </motion.div>

        <SplitText
          className="font-heading text-h1 font-bold leading-[0.95] tracking-tight"
          delay={0.3}
          staggerDelay={0.025}
        >
          Let's Create Something Extraordinary
        </SplitText>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-text-secondary text-lg max-w-2xl mx-auto"
        >
          Whether it's a website, an app, or an entire digital ecosystem — we're
          ready to bring your vision to life.
        </motion.p>
      </div>
    </section>
  );
};

export default ContactHero;
