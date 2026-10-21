import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

const directionMap = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
};

type RevealOnScrollProps = {
  children: ReactNode;
  direction?: keyof typeof directionMap;
  delay?: number;
  duration?: number;
  className?: string;
};

const RevealOnScroll = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className = '',
}: RevealOnScrollProps) => {
  const offset = directionMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;
