import { motion } from "framer-motion";
import { STATS } from "../../../utils/constants";
import AnimatedCounter from "../../ui/AnimatedCounter";
import RevealOnScroll from "../../ui/RevealOnScroll";

const StatsBar = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-accent/10 via-accent/5 to-accent-glow/10 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-heading text-h2 font-bold text-text-primary">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default StatsBar;
