import { motion } from "framer-motion";
import RevealOnScroll from "../../ui/RevealOnScroll";

const contactDetails = [
  {
    label: "Email",
    value: "info@postperfect.in",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="4" width="16" height="12" rx="2" />
        <path d="M2 6l8 5 8-5" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+91 87500 75080",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 4.5C3 3.67 3.67 3 4.5 3h2.83a1 1 0 01.95.68l.82 2.46a1 1 0 01-.27 1.03l-1.34 1.34a10 10 0 004.5 4.5l1.34-1.34a1 1 0 011.03-.27l2.46.82a1 1 0 01.68.95v2.83a1.5 1.5 0 01-1.5 1.5A14.5 14.5 0 013 4.5z" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Global — Remote First",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M10 17s-6-5.69-6-9a6 6 0 0112 0c0 3.31-6 9-6 9z" />
        <circle cx="10" cy="8" r="2" />
      </svg>
    ),
  },
];

const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/postperfecct/" },
  { name: "Instagram", href: "https://www.instagram.com/post_perfect_agency/" },
];

const ContactInfo = () => {
  return (
    <RevealOnScroll direction="right" delay={0.2}>
      <div className="space-y-10">
        {/* Contact details */}
        <div className="space-y-6">
          {contactDetails.map((detail, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light flex-shrink-0">
                {detail.icon}
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                  {detail.label}
                </p>
                <p className="text-text-primary font-medium">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wider mb-4">
            Follow Us
          </p>
          <div className="flex flex-wrap gap-2">
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="px-4 py-2 text-sm rounded-full border border-white/10 text-text-secondary hover:text-accent hover:border-accent/30 transition-all duration-300"
              >
                {social.name}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Schedule call CTA */}
        <div className="p-6 rounded-xl bg-surface border border-white/5">
          <h4 className="font-heading text-lg font-semibold text-text-primary mb-2">
            Prefer a call?
          </h4>
          <p className="text-sm text-text-secondary mb-4">
            Schedule a free 30-minute consultation to discuss your project.
          </p>
          <button className="px-6 py-2.5 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-light transition-colors duration-300">
            Schedule a Call
          </button>
        </div>
      </div>
    </RevealOnScroll>
  );
};

export default ContactInfo;
