import { motion } from 'framer-motion';
import { WHY_CHOOSE_US } from '../../../utils/constants';
import SplitText from '../../ui/SplitText';
import RevealOnScroll from '../../ui/RevealOnScroll';

const whyIcons = [
  // Full-service
  <svg key="0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="9" height="9" rx="2" />
    <rect x="13" y="2" width="9" height="9" rx="2" />
    <rect x="2" y="13" width="9" height="9" rx="2" />
    <rect x="13" y="13" width="9" height="9" rx="2" />
  </svg>,
  // Senior-led
  <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
    <path d="M19 3l1.5 1.5L23 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Transparent
  <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  // Results
  <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 20V14M9 20V10M14 20V16M19 20V8M24 5l-5 5-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Global standards
  <svg key="4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2c-4 4-4 16 0 20M12 2c4 4 4 16 0 20" />
  </svg>,
  // Long-term
  <svg key="5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L9 8H3l5 4-2 7 6-4 6 4-2-7 5-4h-6z" strokeLinejoin="round" />
  </svg>,
];

const WhyChooseUs = () => {
  return (
    <section className="py-(--spacing-section) bg-bg-primary relative overflow-hidden">
      {/* Subtle accent orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/[0.03] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <RevealOnScroll>
            <span className="text-xs font-medium tracking-widest uppercase text-accent-light">
              Why PostPerfect
            </span>
          </RevealOnScroll>
          <SplitText
            className="font-heading text-h2 font-bold text-text-primary mt-4"
            as="h2"
          >
            The PostPerfect Difference
          </SplitText>
          <RevealOnScroll delay={0.2}>
            <p className="mt-4 text-text-secondary text-lg max-w-xl mx-auto">
              Dozens of agencies can build a website. Few can deliver what we deliver.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_CHOOSE_US.map((item, i) => (
            <RevealOnScroll key={i} delay={i * 0.09}>
              <motion.div
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className="p-7 rounded-xl bg-surface border border-white/5 hover:border-accent/15 transition-all duration-300 group h-full"
              >
                {/* Icon */}
                <div className="w-11 h-11 rounded-lg bg-accent/10 border border-accent/15 flex items-center justify-center mb-5 text-accent-light group-hover:bg-accent/15 transition-colors duration-300">
                  {whyIcons[i]}
                </div>

                <h3 className="font-heading text-base font-semibold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
