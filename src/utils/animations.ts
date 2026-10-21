// Reusable Framer Motion variants
import type { Variants } from 'framer-motion';

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 30, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(4px)',
    transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] },
  },
};
