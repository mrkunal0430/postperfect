import { motion } from "framer-motion";
import SplitText from "../../ui/SplitText";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Top-left accent glow */}
      <div
        className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(181,138,93,0.08) 0%, rgba(181,138,93,0.02) 40%, transparent 70%)",
        }}
      />

      {/* Bottom-right accent glow */}
      <div
        className="absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(91,155,245,0.06) 0%, rgba(91,155,245,0.01) 40%, transparent 70%)",
        }}
      />

      {/* Decorative corner brackets — top left */}
      <div className="absolute top-24 left-12 z-[2] pointer-events-none opacity-20">
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          stroke="#B58A5D"
          strokeWidth="1.5"
        >
          <path d="M0 20 L0 0 L20 0" />
        </svg>
      </div>

      {/* Decorative corner brackets — bottom right */}
      <div className="absolute bottom-24 right-12 z-[2] pointer-events-none opacity-20">
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          stroke="#B58A5D"
          strokeWidth="1.5"
        >
          <path d="M60 40 L60 60 L40 60" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-accent border border-accent/30 rounded-full bg-accent/5">
            Digital Agency
          </span>
        </motion.div>

        <SplitText
          className="font-heading text-display font-bold leading-[0.95] tracking-tight text-text-primary"
          delay={0.4}
          staggerDelay={0.02}
        >
          We Craft Digital Experiences That Defy Convention
        </SplitText>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-text-secondary text-lg max-w-2xl mx-auto"
        >
          Web &middot; Apps &middot; Video &middot; Marketing &middot; ERP
          &middot; Custom Software
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="/services"
            className="px-8 py-3.5 bg-accent text-white font-semibold rounded-full hover:bg-accent-light transition-colors duration-300 shadow-glow-sm"
          >
            Explore Services
          </a>
          <a
            href="/contact"
            className="px-8 py-3.5 border border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-white transition-all duration-300"
          >
            Start a Project
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs text-text-muted tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
