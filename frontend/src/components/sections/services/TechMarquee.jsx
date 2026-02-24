import { TECH_STACK } from "../../../utils/constants";
import RevealOnScroll from "../../ui/RevealOnScroll";

const MarqueeRow = ({ items, reverse = false, speed = 40 }) => {
  const duplicated = [...items, ...items];

  return (
    <div className="overflow-hidden py-3">
      <div
        className="flex gap-6 whitespace-nowrap"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {duplicated.map((tech, i) => (
          <span
            key={i}
            className="inline-flex items-center px-5 py-2.5 rounded-full border border-white/5 bg-surface/50 text-sm text-text-secondary hover:text-text-primary hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 cursor-default select-none"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

const TechMarquee = () => {
  const half = Math.ceil(TECH_STACK.length / 2);
  const row1 = TECH_STACK.slice(0, half);
  const row2 = TECH_STACK.slice(half);

  return (
    <section className="py-(--spacing-section) overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
        <RevealOnScroll>
          <h2 className="font-heading text-sm font-medium tracking-widest uppercase text-accent-light text-center">
            Technologies We Work With
          </h2>
        </RevealOnScroll>
      </div>

      <div className="space-y-2">
        <MarqueeRow items={row1} speed={35} />
        <MarqueeRow items={row2} reverse speed={40} />
      </div>
    </section>
  );
};

export default TechMarquee;
