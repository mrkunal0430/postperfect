import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import SplitText from "../../ui/SplitText";

const statusItems = [
  { label: "System Status", value: "Operational", color: "#10B981" },
  { label: "Avg Response", value: "< 2 hours", color: "#38BDF8" },
  { label: "Availability", value: "24/7 Support", color: "#A78BFA" },
];

const ContactHero = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "postperfect.connect()";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-32 pb-12 relative overflow-hidden">
      {/* Floating grid dots */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div
        className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative"
        style={{ zIndex: 1 }}
      >
        {/* Terminal-style code badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8 inline-flex items-center gap-3"
        >
          <div className="px-5 py-2.5 rounded-lg bg-surface/80 border border-white/10 backdrop-blur-sm font-mono text-sm">
            <span className="text-accent-light mr-2">$</span>
            <span className="text-text-primary">{typedText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-accent ml-0.5"
            >
              |
            </motion.span>
          </div>
        </motion.div>

        <SplitText
          className="font-heading text-h1 font-bold leading-[0.95] tracking-tight"
          delay={0.3}
          staggerDelay={0.025}
        >
          Let's Build Something Extraordinary
        </SplitText>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-text-secondary text-lg max-w-2xl mx-auto"
        >
          Choose your preferred way to connect. Whether it's a quick chat or a
          detailed project brief — we're ready when you are.
        </motion.p>

        {/* Live status bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-6"
        >
          {statusItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface/60 border border-white/5 backdrop-blur-sm"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 0 8px ${item.color}60`,
                  animation: "pulse-glow 2s ease-in-out infinite",
                }}
              />
              <span className="text-xs text-text-muted">{item.label}:</span>
              <span className="text-xs font-medium text-text-primary">
                {item.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;
