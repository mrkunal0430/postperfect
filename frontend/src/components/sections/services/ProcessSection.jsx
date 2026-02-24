import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../../../utils/constants';
import SplitText from '../../ui/SplitText';
import RevealOnScroll from '../../ui/RevealOnScroll';

const stepIcons = {
  discover: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="13" cy="13" r="8" />
      <path d="M19 19l5 5" strokeLinecap="round" />
      <path d="M10 13h6M13 10v6" strokeLinecap="round" />
    </svg>
  ),
  strategy: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 4v6M14 18v6M4 14h6M18 14h6" strokeLinecap="round" />
      <circle cx="14" cy="14" r="5" />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  execute: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 6h8M14 14h8M6 22h16" strokeLinecap="round" />
      <path d="M6 18l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  deliver: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 14l7 7 11-11" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  ),
};

const ProcessSection = () => {
  return (
    <section className="py-(--spacing-section) bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: heading */}
          <div>
            <RevealOnScroll>
              <span className="text-xs font-medium tracking-widest uppercase text-accent-light">
                Our Process
              </span>
            </RevealOnScroll>
            <SplitText
              className="font-heading text-h2 font-bold text-text-primary mt-4"
              as="h2"
              staggerDelay={0.025}
            >
              How We Work
            </SplitText>
            <RevealOnScroll delay={0.2}>
              <p className="mt-5 text-text-secondary text-lg leading-relaxed">
                Every engagement follows the same disciplined process — because predictable execution
                leads to exceptional outcomes. No surprises. No missed deadlines.
              </p>
            </RevealOnScroll>

            {/* Stat row */}
            <RevealOnScroll delay={0.3}>
              <div className="mt-10 flex items-center gap-6 flex-wrap">
                <div>
                  <span className="font-heading text-3xl font-bold text-accent-light">150+</span>
                  <p className="text-xs text-text-muted mt-1">Projects shipped</p>
                </div>
                <div className="w-[1px] h-10 bg-white/5" />
                <div>
                  <span className="font-heading text-3xl font-bold text-accent-light">99%</span>
                  <p className="text-xs text-text-muted mt-1">On-time delivery</p>
                </div>
                <div className="w-[1px] h-10 bg-white/5" />
                <div>
                  <span className="font-heading text-3xl font-bold text-accent-light">0</span>
                  <p className="text-xs text-text-muted mt-1">Failed projects</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: steps */}
          <div className="space-y-4">
            {PROCESS_STEPS.map((step, i) => (
              <RevealOnScroll key={i} delay={i * 0.12} direction="right">
                <motion.div
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className="flex items-start gap-5 p-6 rounded-xl bg-surface border border-white/5 hover:border-white/10 transition-all duration-300 group"
                >
                  {/* Number */}
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                    <span className="text-xs font-heading font-bold text-accent-light">{step.number}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-text-primary font-heading font-semibold">
                        {step.title}
                      </span>
                      <span className="text-accent-light/40 group-hover:text-accent-light/60 transition-colors">
                        {stepIcons[step.icon]}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    animate={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    className="text-text-muted/30 group-hover:text-accent/50 transition-colors flex-shrink-0 mt-1"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
