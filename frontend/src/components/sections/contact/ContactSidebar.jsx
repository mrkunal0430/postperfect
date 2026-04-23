import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealOnScroll from "../../ui/RevealOnScroll";

/* ───────────── Office Card ───────────── */
const offices = [
  {
    city: "Mumbai",
    country: "India",
    address: "WeWork BKC, Bandra Kurla Complex",
    timezone: "IST (UTC+5:30)",
    flag: "🇮🇳",
  },
  {
    city: "Remote",
    country: "Global",
    address: "We work with clients worldwide",
    timezone: "All Time Zones",
    flag: "🌍",
  },
];

const contactMethods = [
  {
    label: "Email",
    value: "hello@postperfect.com",
    href: "mailto:hello@postperfect.com",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <rect x="1" y="3" width="14" height="10" rx="1.5" />
        <path d="M1 5l7 4 7-4" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+91 12345 67890",
    href: "tel:+911234567890",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M2.67 3.33a1 1 0 011-1h1.88a.67.67 0 01.64.46l.54 1.63a.67.67 0 01-.18.69l-.89.89a6.67 6.67 0 003 3l.89-.89a.67.67 0 01.69-.18l1.63.54a.67.67 0 01.46.64v1.88a1 1 0 01-1 1A9.67 9.67 0 012.67 3.33z" />
      </svg>
    ),
  },
];

/* ───────────── FAQ Data ───────────── */
const faqs = [
  {
    q: "What's the typical project timeline?",
    a: "Timelines vary by scope. A marketing website takes 4–6 weeks. Web apps take 8–16 weeks. We provide a precise estimate after our discovery call.",
  },
  {
    q: "Do you work with startups?",
    a: "Absolutely! We love working with startups. We offer flexible engagement models and can help you prioritize features for your MVP.",
  },
  {
    q: "What happens after I submit the form?",
    a: "Our team reviews your submission within 2 hours. You'll receive a confirmation email with next steps and, if requested, a calendar invite for your meeting.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes. We offer monthly retainer packages for maintenance, feature updates, and priority support after project launch.",
  },
  {
    q: "Can I see your portfolio first?",
    a: "Of course! Check out our Services page for detailed case studies, or schedule a call and we'll walk you through relevant examples.",
  },
];

/* ───────────── FAQ Accordion Item ───────────── */
const FaqItem = ({ faq, isOpen, onToggle, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05, duration: 0.4 }}
    className="border-b border-white/5 last:border-b-0"
  >
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between py-4 text-left group"
    >
      <span
        className={`text-sm font-medium transition-colors duration-300 pr-4 ${isOpen ? "text-accent" : "text-text-primary group-hover:text-accent-light"}`}
      >
        {faq.q}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
          isOpen ? "bg-accent/20 text-accent" : "bg-white/5 text-text-muted"
        }`}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M6 2v8M2 6h8" strokeLinecap="round" />
        </svg>
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="text-sm text-text-secondary pb-4 leading-relaxed pl-1">
            {faq.a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

/* ───────────── Main Sidebar Component ───────────── */
const ContactSidebar = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <RevealOnScroll direction="right" delay={0.2}>
      <div className="space-y-8">
        {/* Contact methods */}
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-widest text-text-muted font-medium">
            Direct Contact
          </p>
          {contactMethods.map((method) => (
            <a
              key={method.label}
              href={method.href}
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light group-hover:bg-accent/20 transition-colors">
                {method.icon}
              </div>
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">
                  {method.label}
                </p>
                <p className="text-sm text-text-primary font-medium group-hover:text-accent transition-colors">
                  {method.value}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Social links */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-text-muted font-medium mb-3">
            Follow Us
          </p>
          <div className="flex gap-2">
            {[
              { name: "LinkedIn", href: "#" },
              { name: "Twitter", href: "#" },
              { name: "Instagram", href: "#" },
              { name: "YouTube", href: "#" },
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                whileHover={{ y: -2 }}
                className="px-3.5 py-1.5 text-xs rounded-full border border-white/10 text-text-secondary hover:text-accent hover:border-accent/30 transition-all duration-300"
              >
                {social.name}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Offices */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-text-muted font-medium mb-3">
            Our Offices
          </p>
          <div className="space-y-3">
            {offices.map((office) => (
              <div
                key={office.city}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">{office.flag}</span>
                  <span className="text-sm font-medium text-text-primary">
                    {office.city}
                  </span>
                  <span className="text-xs text-text-muted">
                    • {office.country}
                  </span>
                </div>
                <p className="text-xs text-text-muted">{office.address}</p>
                <p className="text-[10px] text-accent/60 mt-1 font-mono">
                  {office.timezone}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Office Hours */}
        <div className="p-5 rounded-xl bg-surface/80 border border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-2 h-2 rounded-full bg-emerald-500"
              style={{
                boxShadow: "0 0 8px rgba(16,185,129,0.5)",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
            <h4 className="text-xs uppercase tracking-widest text-text-muted font-medium">
              Office Hours (IST)
            </h4>
          </div>
          <div className="space-y-2">
            {[
              { day: "Monday – Friday", time: "10:00 AM – 7:00 PM" },
              { day: "Saturday", time: "10:00 AM – 4:00 PM" },
              { day: "Sunday", time: "Closed" },
            ].map((schedule) => (
              <div
                key={schedule.day}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-text-muted text-xs">{schedule.day}</span>
                <span
                  className={`text-xs font-medium font-mono ${schedule.time === "Closed" ? "text-red-400/70" : "text-text-primary"}`}
                >
                  {schedule.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Response time guarantee */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-accent/5 to-violet/5 border border-accent/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.5"
              >
                <circle cx="9" cy="9" r="7.5" />
                <path
                  d="M9 5v4l2.5 1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-primary">
                2-Hour Response Guarantee
              </h4>
              <p className="text-xs text-text-muted">During business hours</p>
            </div>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Every inquiry gets a personal response from our team — not a bot. We
            value your time.
          </p>
        </div>

        {/* FAQ Section */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-text-muted font-medium mb-4">
            Frequently Asked Questions
          </p>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
};

export default ContactSidebar;
