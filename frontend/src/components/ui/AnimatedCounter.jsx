import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

const AnimatedCounter = ({ value, suffix = '', duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplayValue(Math.round(v)),
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
