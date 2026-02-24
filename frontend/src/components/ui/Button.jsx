import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MagneticWrapper from "./MagneticWrapper";

const Button = ({
  children,
  variant = "primary",
  to,
  href,
  onClick,
  className = "",
  ...props
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center font-semibold text-sm tracking-wide rounded-full overflow-hidden transition-all duration-300";

  const variants = {
    primary: "px-7 py-3.5 bg-accent text-white hover:shadow-glow-md",
    outline:
      "px-7 py-3.5 border border-accent text-accent-light hover:bg-accent hover:text-white",
    ghost: "px-5 py-2.5 text-text-secondary hover:text-text-primary",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  const MotionComponent = motion.create(to ? Link : href ? "a" : "button");

  return (
    <MagneticWrapper>
      <MotionComponent
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        to={to}
        href={href}
        onClick={onClick}
        className={combinedClassName}
        {...props}
      >
        {children}
      </MotionComponent>
    </MagneticWrapper>
  );
};

export default Button;
