import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "../../../utils/constants";
import RevealOnScroll from "../../ui/RevealOnScroll";

const budgetOptions = [
  "Under $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000+",
  "Not sure yet",
];

const FloatingInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  error,
}) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value;

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full bg-transparent border-b border-white/10 focus:border-accent py-3 pr-4 text-text-primary outline-none transition-colors duration-300 peer"
        placeholder=" "
      />
      <label
        htmlFor={name}
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          isActive
            ? "text-xs -top-2 text-accent-light"
            : "text-sm top-3 text-text-muted"
        }`}
      >
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </label>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400 mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

const FloatingSelect = ({
  label,
  name,
  options,
  value,
  onChange,
  required,
}) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value;

  return (
    <div className="relative">
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full bg-transparent border-b border-white/10 focus:border-accent py-3 pr-4 text-text-primary outline-none transition-colors duration-300 appearance-none cursor-pointer"
      >
        <option value="" className="bg-surface text-text-muted">
          Select...
        </option>
        {options.map((opt) => (
          <option
            key={opt}
            value={opt}
            className="bg-surface text-text-primary"
          >
            {opt}
          </option>
        ))}
      </select>
      <label
        htmlFor={name}
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          isActive
            ? "text-xs -top-2 text-accent-light"
            : "text-sm top-3 text-text-muted"
        }`}
      >
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </label>
      {/* Dropdown arrow */}
      <svg
        className="absolute right-2 top-3.5 w-4 h-4 text-text-muted pointer-events-none"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Please enter a valid email";
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <RevealOnScroll>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center py-16"
          >
            {/* Success checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
              >
                <path
                  d="M8 16l6 6 10-12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <h3 className="font-heading text-2xl font-bold text-text-primary mb-2">
              Message Sent!
            </h3>
            <p className="text-text-secondary">
              Thank you! We'll get back to you within 24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FloatingInput
                label="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                error={errors.name}
              />
              <FloatingInput
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                error={errors.email}
              />
            </div>

            <FloatingInput
              label="Company"
              name="company"
              value={form.company}
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FloatingSelect
                label="Service of Interest"
                name="service"
                options={SERVICES.map((s) => s.name)}
                value={form.service}
                onChange={handleChange}
              />
              <FloatingSelect
                label="Budget Range"
                name="budget"
                options={budgetOptions}
                value={form.budget}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <textarea
                name="message"
                id="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                required
                placeholder=" "
                className="w-full bg-transparent border-b border-white/10 focus:border-accent py-3 pr-4 text-text-primary outline-none transition-colors duration-300 resize-none peer"
              />
              <label
                htmlFor="message"
                className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  form.message
                    ? "text-xs -top-2 text-accent-light"
                    : "text-sm top-3 text-text-muted"
                }`}
              >
                Your Message <span className="text-accent ml-0.5">*</span>
              </label>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-400 mt-1"
                >
                  {errors.message}
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-light transition-colors duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.15,
                        repeat: Infinity,
                      }}
                      className="w-1.5 h-1.5 rounded-full bg-white"
                    />
                  ))}
                </div>
              ) : (
                "Send Message"
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </RevealOnScroll>
  );
};

export default ContactForm;
