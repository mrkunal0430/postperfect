"use client";

import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES } from "../../../utils/constants";
import { STUDIO, STUDIO_HOURS, studioToday } from "../../../utils/studio";
import { EASE } from "../../lab/ui";
import { BUTTON_GHOST, BUTTON_PRIMARY } from "../../ui/typography";
import { SHORT_NAME, tint } from "../services/data";

// ─── Options ─────────────────────────────────────────────────────────────────

const STEPS = ["About you", "The project", "Budget & timing", "Book a call"];

const DESIGN_OPTIONS = ["Yes, ready to go", "Partially", "No, need help"];

const BUDGETS = [
  { label: "Under ₹50,000", value: "under-50k" },
  { label: "₹50,000 – ₹2,00,000", value: "50k-2l" },
  { label: "₹2,00,000 – ₹5,00,000", value: "2l-5l" },
  { label: "₹5,00,000 – ₹15,00,000", value: "5l-15l" },
  { label: "₹15,00,000+", value: "15l-plus" },
  { label: "Not sure yet", value: "discuss" },
];

const TIMELINES = [
  { label: "As soon as possible", value: "asap" },
  { label: "1–2 weeks", value: "1-2w" },
  { label: "1 month", value: "1m" },
  { label: "2–3 months", value: "2-3m" },
  { label: "3–6 months", value: "3-6m" },
  { label: "No fixed date", value: "no-rush" },
];

const MEETINGS = [
  { label: "Discovery call", duration: "15 min", desc: "A quick intro so we understand what you need." },
  { label: "Project deep-dive", duration: "30 min", desc: "Goals, scope and constraints in detail." },
  { label: "Strategy session", duration: "60 min", desc: "Planning across channels, with a specialist from each." },
];

const CONTACT_METHODS = [
  { label: "Email", value: "email" },
  { label: "WhatsApp", value: "whatsapp" },
  { label: "Phone call", value: "phone" },
  { label: "Google Meet", value: "gmeet" },
];

type BriefData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  projectDesc: string;
  hasDesign: string;
  budget: string;
  timeline: string;
  meetingType: string;
  meetingDate: Date | null;
  meetingTime: string;
  preferredContact: string;
};

type Errors = Partial<Record<keyof BriefData, string>>;

/**
 * Sends the brief. There is no backend yet, so this only simulates a request.
 * Replace the body with a call to a route handler or server action.
 */
const submitBrief = (brief: BriefData) =>
  new Promise<void>((resolve) => {
    void brief;
    setTimeout(resolve, 1200);
  });

// ─── Small building blocks ───────────────────────────────────────────────────

const Field = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  error,
  autoComplete,
}: {
  label: string;
  name: keyof BriefData;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  autoComplete?: string;
}) => (
  <div>
    <label htmlFor={`brief-${name}`} className="text-sm text-[#B8CCDD]">
      {label}
      {required ? <span className="text-[#38BDF8]"> *</span> : <span className="text-[#92AAC0]"> (optional)</span>}
    </label>
    <input
      id={`brief-${name}`}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `brief-${name}-error` : undefined}
      className={`mt-2 w-full rounded-xl border bg-white/[0.04] px-4 py-3.5 text-[#E2E8F4] outline-none transition-colors placeholder:text-[#92AAC0]/60 hover:border-white/25 focus:border-[#38BDF8] ${
        error ? "border-[#F87171]" : "border-white/10"
      }`}
    />
    {error && (
      <p id={`brief-${name}-error`} className="mt-2 text-sm text-[#FCA5A5]">
        {error}
      </p>
    )}
  </div>
);

/** A radio styled as a pill. */
const Choice = ({
  name,
  value,
  checked,
  onChange,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}) => (
  <label className="cursor-pointer">
    <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
    <span className="block rounded-full border border-white/15 px-4 py-2.5 text-sm text-[#E2E8F4] transition-colors hover:border-white/40 peer-checked:border-[#38BDF8] peer-checked:bg-[#38BDF8] peer-checked:font-semibold peer-checked:text-[#05070B] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white">
      {children}
    </span>
  </label>
);

const Group = ({ legend, hint, error, children }: { legend: string; hint?: string; error?: string; children: ReactNode }) => (
  <fieldset>
    <legend className="font-heading text-lg font-semibold text-white">{legend}</legend>
    {hint && <p className="mt-1 text-sm text-[#92AAC0]">{hint}</p>}
    <div className="mt-4 flex flex-wrap gap-2.5">{children}</div>
    {error && <p className="mt-3 text-sm text-[#FCA5A5]">{error}</p>}
  </fieldset>
);

// ─── Call scheduling ─────────────────────────────────────────────────────────

const sameDay = (a: Date | null, b: Date) => a?.toDateString() === b.toDateString();

/**
 * Half-hour slots inside studio hours for a day. Dates are studio (IST) calendar
 * days; on today, slots less than an hour away are left out.
 */
const slotsFor = (date: Date | null) => {
  const hours = date ? STUDIO_HOURS[date.getDay()] : null;
  if (!date || !hours) return [];
  const now = studioToday();
  const earliest = sameDay(now.date, date) ? now.hour + 1 : 0;
  const slots: string[] = [];
  for (let h = hours.open; h < hours.close; h += 0.5) {
    if (h >= earliest) slots.push(`${String(Math.floor(h)).padStart(2, "0")}:${h % 1 ? "30" : "00"}`);
  }
  return slots;
};

const Calendar = ({ value, onChange }: { value: Date | null; onChange: (d: Date) => void }) => {
  // "Today" is the studio's date, since call times are in IST.
  const today = studioToday().date;
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const lead = month.getDay();
  const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const isCurrentMonth = month.getFullYear() === today.getFullYear() && month.getMonth() === today.getMonth();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          disabled={isCurrentMonth}
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#B8CCDD] transition-colors hover:bg-white/10 disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-white"
        >
          ‹
        </button>
        <p className="font-heading font-semibold text-white">
          {month.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
        </p>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#B8CCDD] transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
        >
          ›
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-[#92AAC0]">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span key={d} className="py-1">
            {d}
          </span>
        ))}
        {Array.from({ length: lead }, (_, i) => (
          <span key={`lead-${i}`} />
        ))}
        {Array.from({ length: count }, (_, i) => {
          const date = new Date(month.getFullYear(), month.getMonth(), i + 1);
          const disabled = date < today || slotsFor(date).length === 0;
          const selected = sameDay(value, date);
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              aria-pressed={selected}
              aria-label={date.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
              onClick={() => onChange(date)}
              className={`aspect-square rounded-lg text-sm transition-colors focus-visible:outline-2 focus-visible:outline-white ${
                selected
                  ? "bg-[#38BDF8] font-semibold text-[#05070B]"
                  : disabled
                    ? "cursor-not-allowed text-white/20"
                    : "text-[#E2E8F4] hover:bg-white/10"
              } ${sameDay(today, date) && !selected ? "ring-1 ring-[#38BDF8]/60" : ""}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ─── Form ────────────────────────────────────────────────────────────────────

const BriefForm = ({ initialServices = [] }: { initialServices?: string[] }) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<BriefData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    services: initialServices,
    projectDesc: "",
    hasDesign: "",
    budget: "",
    timeline: "",
    meetingType: "",
    meetingDate: null,
    meetingTime: "",
    preferredContact: "email",
  });

  // When a new step's heading mounts after a move, focus it so keyboard and screen reader users follow along.
  const moved = useRef(false);
  const heading = (el: HTMLHeadingElement | null) => {
    if (el && moved.current) {
      moved.current = false;
      el.focus();
    }
  };

  const set = <K extends keyof BriefData>(key: K, value: BriefData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };
  const onInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    set(e.target.name as keyof BriefData, e.target.value as never);

  const validate = () => {
    const next: Errors = {};
    if (step === 0) {
      if (!form.name.trim()) next.name = "Enter your name so we know who to reply to.";
      if (!form.email.trim()) next.email = "Enter your email so we can send our reply.";
      else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Check the email address. It should look like name@company.com.";
    }
    if (step === 1 && form.services.length === 0) next.services = "Choose at least one service.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const go = (to: number) => {
    moved.current = true;
    setDirection(to > step ? 1 : -1);
    setStep(to);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) {
      if (validate()) go(step + 1);
      return;
    }
    setSending(true);
    await submitBrief(form);
    setSending(false);
    moved.current = true;
    setSent(true);
  };

  const toggleService = (id: string) =>
    set("services", form.services.includes(id) ? form.services.filter((s) => s !== id) : [...form.services, id]);

  if (sent) {
    const call =
      form.meetingDate && form.meetingTime
        ? `You asked for a ${form.meetingType ? form.meetingType.toLowerCase() : "call"} on ${form.meetingDate.toLocaleDateString(
            "en-IN",
            { weekday: "long", day: "numeric", month: "long" },
          )} at ${form.meetingTime} IST. We'll confirm the time by ${
            CONTACT_METHODS.find((m) => m.value === form.preferredContact)?.label.toLowerCase() ?? "email"
          }.`
        : `We usually reply ${STUDIO.replyTime} during studio hours.`;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="py-10"
      >
        <svg viewBox="0 0 48 48" className="h-14 w-14" aria-hidden>
          <motion.circle cx="24" cy="24" r="22" fill="none" stroke="#22C55E" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: EASE }} />
          <motion.path d="M15 25l6 6 12-14" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6, ease: EASE }} />
        </svg>
        <h3 ref={heading} tabIndex={-1} className="mt-8 font-heading text-4xl font-semibold tracking-[-0.03em] text-white outline-none">
          Thanks, {form.name.split(" ")[0]}. Your brief is in.
        </h3>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-[#B8CCDD]">{call}</p>
        <p className="mt-6 text-sm text-[#92AAC0]">
          Need to add something? Email{" "}
          <a href={`mailto:${STUDIO.email}`} className="text-[#38BDF8] underline underline-offset-4">
            {STUDIO.email}
          </a>
          .
        </p>
      </motion.div>
    );
  }

  const slots = slotsFor(form.meetingDate);

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* Step rail: completed steps can be revisited */}
      <ol className="grid grid-cols-4 gap-2">
        {STEPS.map((label, i) => (
          <li key={label}>
            <button
              type="button"
              disabled={i >= step}
              onClick={() => go(i)}
              aria-current={i === step ? "step" : undefined}
              className="block w-full text-left disabled:cursor-default focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span className="block h-1 overflow-hidden rounded-full bg-white/10">
                <motion.span
                  className="block h-full bg-[#38BDF8]"
                  style={{ originX: 0 }}
                  animate={{ scaleX: i <= step ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              </span>
              <span className={`mt-2 hidden text-xs sm:block ${i === step ? "text-white" : "text-[#92AAC0]"}`}>{label}</span>
            </button>
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={step}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="mt-10 space-y-8"
        >
          <div>
            <p className="text-sm text-[#92AAC0]">
              Step {step + 1} of {STEPS.length}
            </p>
            <h3 ref={heading} tabIndex={-1} className="mt-1 font-heading text-3xl font-semibold tracking-[-0.03em] text-white outline-none">
              {["Who are we talking to?", "What do you need?", "Budget and timing", "Want to talk it through?"][step]}
            </h3>
          </div>

          {step === 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" value={form.name} onChange={onInput} required error={errors.name} autoComplete="name" />
              <Field label="Email" name="email" type="email" value={form.email} onChange={onInput} required error={errors.email} autoComplete="email" />
              <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={onInput} autoComplete="tel" />
              <Field label="Company" name="company" value={form.company} onChange={onInput} autoComplete="organization" />
            </div>
          )}

          {step === 1 && (
            <>
              <fieldset>
                <legend className="font-heading text-lg font-semibold text-white">
                  Services <span className="text-[#38BDF8]">*</span>
                </legend>
                <p className="mt-1 text-sm text-[#92AAC0]">Pick everything that applies.</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {SERVICES.map((s) => {
                    const on = form.services.includes(s.id);
                    return (
                      <label key={s.id} className="cursor-pointer">
                        <input type="checkbox" checked={on} onChange={() => toggleService(s.id)} className="peer sr-only" />
                        <span
                          className="flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white"
                          style={
                            on
                              ? { backgroundColor: s.color, borderColor: s.color, color: "#05070B", fontWeight: 600 }
                              : { borderColor: tint(s.color, 0.4), backgroundColor: tint(s.color, 0.06), color: "#E2E8F4" }
                          }
                        >
                          <span aria-hidden className="h-2 w-2 rounded-full" style={{ backgroundColor: on ? "#05070B" : s.color }} />
                          {SHORT_NAME[s.id]}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.services && <p className="mt-3 text-sm text-[#FCA5A5]">{errors.services}</p>}
              </fieldset>

              <div>
                <label htmlFor="brief-projectDesc" className="font-heading text-lg font-semibold text-white">
                  Tell us about the project <span className="text-sm font-normal text-[#92AAC0]">(optional)</span>
                </label>
                <textarea
                  id="brief-projectDesc"
                  name="projectDesc"
                  rows={5}
                  value={form.projectDesc}
                  onChange={onInput}
                  placeholder="What are you building, who is it for, and what would success look like?"
                  className="mt-3 w-full resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[#E2E8F4] outline-none transition-colors placeholder:text-[#92AAC0]/70 hover:border-white/25 focus:border-[#38BDF8]"
                />
              </div>

              <Group legend="Do you have designs or wireframes?">
                {DESIGN_OPTIONS.map((o) => (
                  <Choice key={o} name="hasDesign" value={o} checked={form.hasDesign === o} onChange={() => set("hasDesign", o)}>
                    {o}
                  </Choice>
                ))}
              </Group>
            </>
          )}

          {step === 2 && (
            <>
              <Group legend="Budget" hint="A rough range helps us suggest the right scope.">
                {BUDGETS.map((b) => (
                  <Choice key={b.value} name="budget" value={b.value} checked={form.budget === b.value} onChange={() => set("budget", b.value)}>
                    {b.label}
                  </Choice>
                ))}
              </Group>
              <Group legend="When do you need it?">
                {TIMELINES.map((t) => (
                  <Choice key={t.value} name="timeline" value={t.value} checked={form.timeline === t.value} onChange={() => set("timeline", t.value)}>
                    {t.label}
                  </Choice>
                ))}
              </Group>
            </>
          )}

          {step === 3 && (
            <>
              <p className="-mt-4 max-w-[52ch] text-[#B8CCDD]">
                Optional. Pick a slot and we&apos;ll confirm it, or skip this and we&apos;ll reply to your brief first.
              </p>
              <fieldset>
                <legend className="font-heading text-lg font-semibold text-white">Type of call</legend>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {MEETINGS.map((m) => (
                    <label key={m.label} className="cursor-pointer">
                      <input
                        type="radio"
                        name="meetingType"
                        value={m.label}
                        checked={form.meetingType === m.label}
                        onChange={() => set("meetingType", m.label)}
                        className="peer sr-only"
                      />
                      <span className="block h-full rounded-2xl border border-white/10 p-4 transition-colors hover:border-white/30 peer-checked:border-[#38BDF8] peer-checked:bg-[#38BDF8]/10 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white">
                        <span className="block font-semibold text-white">{m.label}</span>
                        <span className="block text-sm text-[#38BDF8]">{m.duration}</span>
                        <span className="mt-2 block text-sm leading-snug text-[#B8CCDD]">{m.desc}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                <div>
                  <p className="mb-3 font-heading text-lg font-semibold text-white">Day</p>
                  <Calendar
                    value={form.meetingDate}
                    onChange={(d) => {
                      set("meetingDate", d);
                      if (!slotsFor(d).includes(form.meetingTime)) set("meetingTime", "");
                    }}
                  />
                </div>
                <Group legend="Time (IST)" hint={form.meetingDate ? undefined : "Choose a day first."}>
                  {slots.map((t) => (
                    <Choice key={t} name="meetingTime" value={t} checked={form.meetingTime === t} onChange={() => set("meetingTime", t)}>
                      {t}
                    </Choice>
                  ))}
                </Group>
              </div>

              <Group legend="How should we reach you?">
                {CONTACT_METHODS.map((m) => (
                  <Choice
                    key={m.value}
                    name="preferredContact"
                    value={m.value}
                    checked={form.preferredContact === m.value}
                    onChange={() => set("preferredContact", m.value)}
                  >
                    {m.label}
                  </Choice>
                ))}
              </Group>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
        {step > 0 ? (
          <button type="button" onClick={() => go(step - 1)} className={BUTTON_GHOST}>
            Back
          </button>
        ) : (
          <span className="text-sm text-[#92AAC0]">Takes about two minutes.</span>
        )}
        <button type="submit" disabled={sending} className={BUTTON_PRIMARY}>
          {step < STEPS.length - 1 ? "Continue" : sending ? "Sending brief…" : "Send brief"}
        </button>
      </div>
    </form>
  );
};

export default BriefForm;
