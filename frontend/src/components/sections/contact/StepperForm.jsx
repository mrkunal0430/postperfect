import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "../../../utils/constants";
import RevealOnScroll from "../../ui/RevealOnScroll";

/* ───────────── Step Configuration ───────────── */
const STEPS = [
  {
    id: 1,
    label: "Project Info",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          d="M12 2L2 7l10 5 10-5-10-5z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 17l10 5 10-5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12l10 5 10-5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 2,
    label: "Requirements",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 3,
    label: "Budget & Timeline",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 4,
    label: "Schedule Meeting",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path
          d="M16 2v4M8 2v4M3 10h18"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

const budgetOptions = [
  { label: "Under ₹50,000", value: "under-50k" },
  { label: "₹50,000 – ₹2,00,000", value: "50k-2l" },
  { label: "₹2,00,000 – ₹5,00,000", value: "2l-5l" },
  { label: "₹5,00,000 – ₹15,00,000", value: "5l-15l" },
  { label: "₹15,00,000+", value: "15l-plus" },
  { label: "Let's Discuss", value: "discuss" },
];

const timelineOptions = [
  { label: "ASAP", value: "asap" },
  { label: "1 – 2 Weeks", value: "1-2w" },
  { label: "1 Month", value: "1m" },
  { label: "2 – 3 Months", value: "2-3m" },
  { label: "3 – 6 Months", value: "3-6m" },
  { label: "No Rush", value: "no-rush" },
];

const meetingTypes = [
  {
    label: "Quick Discovery Call",
    duration: "15 min",
    desc: "Quick intro call to understand your needs.",
    icon: "⚡",
  },
  {
    label: "Project Deep-Dive",
    duration: "30 min",
    desc: "Detailed discussion about your project goals.",
    icon: "🔍",
  },
  {
    label: "Strategy Session",
    duration: "60 min",
    desc: "Comprehensive planning and strategy meeting.",
    icon: "🎯",
  },
];

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
];

/* ───────────── Floating Input ───────────── */
const FloatingInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  error,
}) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value;

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        id={`stepper-${name}`}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full bg-white/[0.03] border border-white/10 focus:border-accent rounded-lg px-4 py-3.5 text-text-primary outline-none transition-all duration-300 hover:border-white/20"
        placeholder=" "
      />
      <label
        htmlFor={`stepper-${name}`}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isActive
            ? "text-[10px] -top-2.5 px-1 bg-surface text-accent-light"
            : "text-sm top-3.5 text-text-muted"
        }`}
      >
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </label>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400 mt-1.5 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

/* ───────────── Calendar Component ───────────── */
const MiniCalendar = ({ selectedDate, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfWeek = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  ).getDay();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthLabel = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const days = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d));
  }

  const isPastDay = (date) => {
    if (!date) return false;
    return date < today;
  };

  const isWeekend = (date) => {
    if (!date) return false;
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isToday = (date) => {
    if (!date) return false;
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M10 4l-4 4 4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="font-heading text-sm font-semibold text-text-primary">
          {monthLabel}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M6 4l4 4-4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-medium text-text-muted uppercase tracking-wider py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;
          const past = isPastDay(date);
          const weekend = isWeekend(date);
          const selected = isSelected(date);
          const todayDay = isToday(date);
          const disabled = past || weekend;

          return (
            <motion.button
              key={date.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelectDate(date)}
              whileHover={!disabled ? { scale: 1.1 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
              className={`
                relative w-full aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-all duration-200
                ${disabled ? "text-text-muted/30 cursor-not-allowed" : "cursor-pointer hover:bg-accent/10 text-text-primary"}
                ${selected ? "!bg-accent !text-white shadow-[0_0_20px_rgba(56,189,248,0.3)]" : ""}
                ${todayDay && !selected ? "border border-accent/40 text-accent" : ""}
              `}
            >
              {date.getDate()}
              {todayDay && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

/* ───────────── Main Stepper Form ───────────── */
const StepperForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    // Step 1
    name: "",
    email: "",
    phone: "",
    company: "",
    // Step 2
    services: [],
    projectDesc: "",
    hasDesign: "",
    // Step 3
    budget: "",
    timeline: "",
    // Step 4
    meetingType: "",
    meetingDate: null,
    meetingTime: "",
    preferredContact: "email",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleService = (serviceId) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId],
    }));
    if (errors.services) setErrors((prev) => ({ ...prev, services: "" }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!form.name.trim()) newErrors.name = "Name is required";
      if (!form.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(form.email))
        newErrors.email = "Enter a valid email";
    }
    if (currentStep === 2) {
      if (form.services.length === 0)
        newErrors.services = "Select at least one service";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  // Compute progress
  const progress = useMemo(() => {
    let filled = 0;
    let total = 10;
    if (form.name) filled++;
    if (form.email) filled++;
    if (form.phone) filled++;
    if (form.company) filled++;
    if (form.services.length) filled++;
    if (form.projectDesc) filled++;
    if (form.budget) filled++;
    if (form.timeline) filled++;
    if (form.meetingDate) filled++;
    if (form.meetingTime) filled++;
    return Math.round((filled / total) * 100);
  }, [form]);

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction > 0 ? -80 : 80, opacity: 0 }),
  };

  const [direction, setDirection] = useState(1);

  const goNext = () => {
    setDirection(1);
    nextStep();
  };
  const goPrev = () => {
    setDirection(-1);
    prevStep();
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center py-20"
      >
        {/* Success animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="w-24 h-24 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8"
          style={{ boxShadow: "0 0 40px rgba(16,185,129,0.15)" }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            stroke="#10B981"
            strokeWidth="2.5"
          >
            <path
              d="M10 20l8 8 12-16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h3 className="font-heading text-3xl font-bold text-text-primary mb-3">
            Request Submitted! 🚀
          </h3>
          <p className="text-text-secondary max-w-md mx-auto mb-2">
            Thank you,{" "}
            <span className="text-accent font-medium">{form.name}</span>! We've
            received your project details.
          </p>
          <p className="text-text-muted text-sm">
            {form.meetingDate && form.meetingTime
              ? `Your meeting is scheduled for ${form.meetingDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at ${form.meetingTime}.`
              : "Our team will reach out within 2 hours."}
          </p>
        </motion.div>

        {/* Confirmation card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 max-w-sm mx-auto p-5 rounded-xl bg-surface/80 border border-white/5 text-left"
        >
          <p className="text-[10px] uppercase tracking-widest text-text-muted mb-3">
            Confirmation Summary
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Services</span>
              <span className="text-text-primary font-medium">
                {form.services.length} selected
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Budget</span>
              <span className="text-text-primary font-medium">
                {budgetOptions.find((b) => b.value === form.budget)?.label ||
                  "—"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Timeline</span>
              <span className="text-text-primary font-medium">
                {timelineOptions.find((t) => t.value === form.timeline)
                  ?.label || "—"}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <RevealOnScroll>
      <div className="relative">
        {/* Progress bar */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-medium uppercase tracking-widest text-text-muted">
            Progress
          </span>
          <span className="text-[10px] font-mono text-accent">{progress}%</span>
        </div>
        <div className="h-0.5 bg-white/5 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-violet rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Stepper indicators */}
        <div className="flex items-center justify-between mb-10 relative">
          {/* Connector line */}
          <div
            className="absolute top-5 left-0 right-0 h-[1px] bg-white/5"
            style={{ zIndex: 0 }}
          />
          <div
            className="absolute top-5 left-0 h-[1px] bg-accent/50 transition-all duration-700"
            style={{
              width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
              zIndex: 0,
            }}
          />

          {STEPS.map((step) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center relative"
                style={{ zIndex: 1 }}
              >
                <motion.button
                  type="button"
                  onClick={() => {
                    if (isCompleted) {
                      setDirection(step.id < currentStep ? -1 : 1);
                      setCurrentStep(step.id);
                    }
                  }}
                  whileHover={isCompleted ? { scale: 1.1 } : {}}
                  className={`
                    w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500
                    ${isCompleted ? "bg-accent/20 text-accent border border-accent/30 cursor-pointer" : ""}
                    ${isCurrent ? "bg-accent text-white border border-accent shadow-[0_0_25px_rgba(56,189,248,0.3)]" : ""}
                    ${!isCompleted && !isCurrent ? "bg-surface border border-white/10 text-text-muted" : ""}
                  `}
                >
                  {isCompleted ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M3 8l4 4 6-7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    step.icon
                  )}
                </motion.button>
                <span
                  className={`mt-2 text-[10px] font-medium tracking-wide hidden sm:block ${
                    isCurrent
                      ? "text-accent"
                      : isCompleted
                        ? "text-text-secondary"
                        : "text-text-muted"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait" custom={direction}>
            {/* ─── STEP 1: Project Info ─── */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                <div className="mb-6">
                  <h3 className="font-heading text-xl font-semibold text-text-primary">
                    Tell us about yourself
                  </h3>
                  <p className="text-sm text-text-muted mt-1">
                    Basic details to get started.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FloatingInput
                    label="Full Name"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FloatingInput
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    label="Company / Organization"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                  />
                </div>
              </motion.div>
            )}

            {/* ─── STEP 2: Requirements ─── */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="mb-6">
                  <h3 className="font-heading text-xl font-semibold text-text-primary">
                    What do you need?
                  </h3>
                  <p className="text-sm text-text-muted mt-1">
                    Select the services you're interested in.
                  </p>
                </div>

                {/* Service selection chips */}
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICES.map((service) => {
                      const selected = form.services.includes(service.id);
                      return (
                        <motion.button
                          key={service.id}
                          type="button"
                          onClick={() => toggleService(service.id)}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          className={`
                            relative p-4 rounded-xl border text-left transition-all duration-300
                            ${
                              selected
                                ? "border-accent/40 bg-accent/5"
                                : "border-white/10 bg-white/[0.02] hover:border-white/20"
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-3 h-3 rounded-full border-2 flex items-center justify-center transition-colors"
                              style={{
                                borderColor: selected
                                  ? service.color
                                  : "rgba(255,255,255,0.2)",
                                backgroundColor: selected
                                  ? service.color
                                  : "transparent",
                              }}
                            >
                              {selected && (
                                <svg
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                  stroke="white"
                                  strokeWidth="1.5"
                                >
                                  <path
                                    d="M1.5 4l2 2 3-3.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-text-primary">
                                {service.name}
                              </p>
                              <p className="text-xs text-text-muted mt-0.5 line-clamp-1">
                                {service.tagline}
                              </p>
                            </div>
                          </div>
                          {/* Color accent line */}
                          {selected && (
                            <motion.div
                              layoutId={`service-accent-${service.id}`}
                              className="absolute top-0 left-0 w-full h-[2px] rounded-t-xl"
                              style={{ backgroundColor: service.color }}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                  {errors.services && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 mt-2 ml-1"
                    >
                      {errors.services}
                    </motion.p>
                  )}
                </div>

                {/* Project description */}
                <div className="relative">
                  <textarea
                    name="projectDesc"
                    value={form.projectDesc}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your project, goals, and any specific requirements..."
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-accent rounded-xl px-4 py-3.5 text-text-primary outline-none transition-all duration-300 resize-none hover:border-white/20 text-sm"
                  />
                </div>

                {/* Has design? */}
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-3">
                    Do you have an existing design/wireframe?
                  </p>
                  <div className="flex gap-3">
                    {["Yes, ready to go", "Partially", "No, need help"].map(
                      (opt) => (
                        <motion.button
                          key={opt}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({ ...prev, hasDesign: opt }))
                          }
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`
                          px-4 py-2 rounded-full text-xs font-medium border transition-all duration-300
                          ${
                            form.hasDesign === opt
                              ? "border-accent/40 bg-accent/10 text-accent"
                              : "border-white/10 text-text-secondary hover:border-white/20"
                          }
                        `}
                        >
                          {opt}
                        </motion.button>
                      ),
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── STEP 3: Budget & Timeline ─── */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <div className="mb-6">
                  <h3 className="font-heading text-xl font-semibold text-text-primary">
                    Budget & Timeline
                  </h3>
                  <p className="text-sm text-text-muted mt-1">
                    Help us understand your scope and expectations.
                  </p>
                </div>

                {/* Budget selection */}
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-3">
                    Estimated Budget
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {budgetOptions.map((opt) => (
                      <motion.button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({ ...prev, budget: opt.value }))
                        }
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          px-4 py-3 rounded-xl text-xs font-medium border transition-all duration-300 text-center
                          ${
                            form.budget === opt.value
                              ? "border-accent/40 bg-accent/10 text-accent shadow-[0_0_15px_rgba(56,189,248,0.1)]"
                              : "border-white/10 bg-white/[0.02] text-text-secondary hover:border-white/20"
                          }
                        `}
                      >
                        {opt.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Timeline selection */}
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-3">
                    Expected Timeline
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {timelineOptions.map((opt) => (
                      <motion.button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({ ...prev, timeline: opt.value }))
                        }
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          px-4 py-3 rounded-xl text-xs font-medium border transition-all duration-300 text-center
                          ${
                            form.timeline === opt.value
                              ? "border-violet/40 bg-violet/10 text-violet-light shadow-[0_0_15px_rgba(124,58,237,0.1)]"
                              : "border-white/10 bg-white/[0.02] text-text-secondary hover:border-white/20"
                          }
                        `}
                      >
                        {opt.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── STEP 4: Meeting Scheduler ─── */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="mb-6">
                  <h3 className="font-heading text-xl font-semibold text-text-primary">
                    Schedule a Meeting
                  </h3>
                  <p className="text-sm text-text-muted mt-1">
                    Pick a time that works best for you — or skip to submit
                    directly.
                  </p>
                </div>

                {/* Meeting type selection */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {meetingTypes.map((mt) => (
                    <motion.button
                      key={mt.label}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, meetingType: mt.label }))
                      }
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        p-4 rounded-xl border text-left transition-all duration-300
                        ${
                          form.meetingType === mt.label
                            ? "border-accent/40 bg-accent/5 shadow-[0_0_20px_rgba(56,189,248,0.08)]"
                            : "border-white/10 bg-white/[0.02] hover:border-white/20"
                        }
                      `}
                    >
                      <span className="text-xl mb-2 block">{mt.icon}</span>
                      <p className="text-sm font-medium text-text-primary">
                        {mt.label}
                      </p>
                      <p className="text-[10px] text-accent mt-0.5 font-medium">
                        {mt.duration}
                      </p>
                      <p className="text-xs text-text-muted mt-1">{mt.desc}</p>
                    </motion.button>
                  ))}
                </div>

                {/* Calendar + Time slots */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-5">
                  <MiniCalendar
                    selectedDate={form.meetingDate}
                    onSelectDate={(date) =>
                      setForm((prev) => ({ ...prev, meetingDate: date }))
                    }
                  />

                  {/* Time slots */}
                  <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-3">
                      {form.meetingDate
                        ? form.meetingDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                          })
                        : "Select a date first"}
                    </p>
                    <div className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
                      {timeSlots.map((slot) => (
                        <motion.button
                          key={slot}
                          type="button"
                          disabled={!form.meetingDate}
                          onClick={() =>
                            setForm((prev) => ({ ...prev, meetingTime: slot }))
                          }
                          whileHover={form.meetingDate ? { scale: 1.03 } : {}}
                          whileTap={form.meetingDate ? { scale: 0.97 } : {}}
                          className={`
                            px-3 py-2.5 rounded-lg text-xs font-medium font-mono transition-all duration-300
                            ${!form.meetingDate ? "opacity-30 cursor-not-allowed border border-white/5 text-text-muted" : ""}
                            ${
                              form.meetingTime === slot && form.meetingDate
                                ? "bg-accent text-white border border-accent shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                                : form.meetingDate
                                  ? "border border-white/10 text-text-secondary hover:border-accent/30 hover:text-accent"
                                  : ""
                            }
                          `}
                        >
                          {slot}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Preferred contact method */}
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-3">
                    Preferred Contact Method
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: "Email", value: "email", icon: "✉️" },
                      { label: "WhatsApp", value: "whatsapp", icon: "💬" },
                      { label: "Phone Call", value: "phone", icon: "📞" },
                      { label: "Google Meet", value: "gmeet", icon: "📹" },
                    ].map((opt) => (
                      <motion.button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            preferredContact: opt.value,
                          }))
                        }
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`
                          flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium border transition-all duration-300
                          ${
                            form.preferredContact === opt.value
                              ? "border-accent/40 bg-accent/10 text-accent"
                              : "border-white/10 text-text-secondary hover:border-white/20"
                          }
                        `}
                      >
                        <span>{opt.icon}</span>
                        {opt.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
            <motion.button
              type="button"
              onClick={goPrev}
              whileHover={{ x: -3 }}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                currentStep === 1
                  ? "text-text-muted/30 cursor-not-allowed"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M10 4l-4 4 4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back
            </motion.button>

            {currentStep < 4 ? (
              <motion.button
                type="button"
                onClick={goNext}
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-light transition-colors duration-300"
              >
                Continue
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M6 4l4 4-4 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-accent to-violet text-white text-sm font-semibold rounded-full hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all duration-300 disabled:opacity-60"
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
                  <>
                    Submit Request
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M2 8h10M8 4l4 4-4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </RevealOnScroll>
  );
};

export default StepperForm;
