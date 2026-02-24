import { motion } from 'framer-motion';
import { INDUSTRIES } from '../../../utils/constants';
import SplitText from '../../ui/SplitText';
import RevealOnScroll from '../../ui/RevealOnScroll';

const IndustriesSection = () => {
  return (
    <section className="py-20 bg-bg-secondary border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <RevealOnScroll>
            <span className="text-xs font-medium tracking-widest uppercase text-accent-light">
              Industries
            </span>
          </RevealOnScroll>
          <SplitText
            className="font-heading text-h3 font-bold text-text-primary mt-3"
            as="h2"
          >
            We Serve Every Sector
          </SplitText>
          <RevealOnScroll delay={0.2}>
            <p className="mt-3 text-text-secondary max-w-lg mx-auto">
              From fast-moving startups to established enterprises across all major industries.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INDUSTRIES.map((industry, i) => (
            <RevealOnScroll key={i} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
                className="p-5 rounded-xl bg-surface border border-white/5 hover:border-accent/15 transition-all duration-300 text-center group"
              >
                <span className="text-3xl mb-3 block">{industry.icon}</span>
                <p className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                  {industry.name}
                </p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
