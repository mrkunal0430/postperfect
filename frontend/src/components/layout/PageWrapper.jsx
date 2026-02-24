import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';

const PageWrapper = ({ children }) => {
  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.main>
  );
};

export default PageWrapper;
