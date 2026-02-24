const GradientText = ({
  children,
  className = '',
  from = '#7C3AED',
  via = '#2563EB',
  to = '#06B6D4',
}) => {
  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${from} 0%, ${via} 50%, ${to} 100%)`,
      }}
    >
      {children}
    </span>
  );
};

export default GradientText;
