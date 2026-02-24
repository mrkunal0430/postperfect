import { motion } from 'framer-motion';

const SplitText = ({
  children,
  className = '',
  staggerDelay = 0.03,
  delay = 0,
  as: Tag = 'div',
}) => {
  if (typeof children !== 'string') return <Tag className={className}>{children}</Tag>;

  const words = children.split(' ');

  return (
    <Tag className={className}>
      <motion.span
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: staggerDelay, delayChildren: delay }}
        className="inline"
        aria-label={children}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={{
                  initial: { y: 60, opacity: 0 },
                  animate: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};

export default SplitText;
