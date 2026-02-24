import { motion } from "framer-motion";
import { VALUES } from "../../../utils/constants";
import SplitText from "../../ui/SplitText";
import RevealOnScroll from "../../ui/RevealOnScroll";

const valueColors = ["#7C3AED", "#3B82F6", "#F59E0B", "#10B981"];

const ValueCard = ({ value, index }) => {
  const color = valueColors[index];

  return (
    <RevealOnScroll delay={index * 0.15}>
      <motion.div
        whileHover={{ y: -6, transition: { duration: 0.3 } }}
        className="relative p-8 rounded-xl bg-surface border border-white/5 hover:border-accent/20 transition-all duration-300 group h-full"
      >
        {/* Number */}
        <span
          className="text-6xl font-heading font-bold opacity-10 group-hover:opacity-20 transition-opacity duration-300 absolute top-4 right-6"
          style={{ color }}
        >
          {value.number}
        </span>

        {/* Geometric shape */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 rounded-lg mb-6 flex items-center justify-center"
          style={{
            backgroundColor: `${color}12`,
            border: `1px solid ${color}25`,
          }}
        >
          <div
            className="w-5 h-5 rounded-sm"
            style={{
              backgroundColor: `${color}40`,
              transform: `rotate(${index * 15}deg)`,
            }}
          />
        </motion.div>

        {/* Content */}
        <h3 className="font-heading text-2xl font-bold mb-3" style={{ color }}>
          {value.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed">
          {value.description}
        </p>
      </motion.div>
    </RevealOnScroll>
  );
};

const Values = () => {
  return (
    <section className="py-(--spacing-section)">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <SplitText
            className="font-heading text-h2 font-bold text-text-primary"
            as="h2"
          >
            Our Values
          </SplitText>
          <RevealOnScroll delay={0.2}>
            <p className="mt-4 text-text-secondary text-lg max-w-xl mx-auto">
              The principles that guide every decision, every pixel, every line
              of code.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((value, i) => (
            <ValueCard key={i} value={value} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
