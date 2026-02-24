import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ScrollWordmark = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  const renderWord = (word, baseDelay) =>
    word.split("").map((char, i) => (
      <div key={i} style={{ overflow: "hidden", display: "inline-block" }}>
        <motion.span
          initial={{ y: "105%", opacity: 0 }}
          animate={isInView ? { y: "0%", opacity: 1 } : {}}
          transition={{
            delay: baseDelay + i * 0.055,
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: "block" }}
        >
          {char}
        </motion.span>
      </div>
    ));

  return (
    <div
      ref={ref}
      className="relative select-none pointer-events-none py-10 md:py-14"
      aria-hidden="true"
    >
      {/* Top gradient divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 inset-x-0 h-px origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(56,189,248,0.35) 30%, rgba(124,58,237,0.25) 70%, transparent)",
        }}
      />

      {/* POST */}
      <div className="flex justify-center items-end leading-none">
        <span
          className="font-heading font-black leading-none flex"
          style={{ fontSize: "clamp(4.5rem, 18vw, 19rem)" }}
        >
          {renderWord("POST", 0)}
        </span>
      </div>

      {/* PERFECT */}
      <div className="flex justify-center items-start leading-none">
        <span
          className="font-heading font-black leading-none flex"
          style={{ fontSize: "clamp(4.5rem, 18vw, 19rem)" }}
        >
          {renderWord("PERFECT", 0.20)}
        </span>
      </div>

      {/* Stroke overlay — appears after letters land */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute inset-0 flex flex-col justify-center pointer-events-none"
        style={{ mixBlendMode: "overlay" }}
      >
        <div
          className="font-heading font-black leading-none text-center"
          style={{
            fontSize: "clamp(4.5rem, 18vw, 19rem)",
            WebkitTextStroke: "1.5px rgba(56, 189, 248, 0.55)",
            color: "transparent",
            lineHeight: 0.9,
          }}
        >
          POST
          <br />
          PERFECT
        </div>
      </motion.div>

      {/* Central ambient glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.0, duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 50%, rgba(56,189,248,0.06) 0%, rgba(124,58,237,0.03) 50%, transparent 75%)",
        }}
      />

      {/* Bottom gradient divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 inset-x-0 h-px origin-right"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 30%, rgba(56,189,248,0.35) 70%, transparent)",
        }}
      />
    </div>
  );
};

export default ScrollWordmark;
