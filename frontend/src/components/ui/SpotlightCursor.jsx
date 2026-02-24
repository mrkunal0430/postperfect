import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const SpotlightCursor = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-interactive]');
      setIsHovering(!!isInteractive);
    };

    const handleClick = (e) => {
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      {/* Main spotlight */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 250 : 180,
            height: isHovering ? 250 : 180,
            opacity: isHovering ? 0.2 : 0.12,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="rounded-full"
          style={{
            background: isHovering
              ? 'radial-gradient(circle, rgba(245,158,11,0.6) 0%, rgba(245,158,11,0.1) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(167,139,250,0.5) 0%, rgba(124,58,237,0.15) 35%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Click ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed pointer-events-none z-[9998] rounded-full border border-accent-light/30"
          style={{
            left: ripple.x,
            top: ripple.y,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      ))}
    </>
  );
};

export default SpotlightCursor;
