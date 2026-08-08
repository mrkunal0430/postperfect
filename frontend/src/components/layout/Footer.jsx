import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { NAV_LINKS } from "../../utils/constants";
import RevealOnScroll from "../ui/RevealOnScroll";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#38BDF8]/8">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-(--spacing-section) pb-16">
        <RevealOnScroll>
          <h2 className="font-heading text-h2 font-bold text-text-primary max-w-3xl">
            Let's work <span className="text-accent">together.</span>
          </h2>
          <p className="mt-4 text-text-secondary text-body-lg max-w-xl">
            Ready to start your next project? We'd love to hear from you.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-8 px-8 py-3.5 bg-accent text-[#08101E] font-semibold rounded-full hover:bg-accent-light transition-colors duration-300"
          >
            Get in Touch
          </Link>
        </RevealOnScroll>
      </div>

      {/* Links & Info */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 border-t border-[#38BDF8]/8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="font-heading text-xl font-bold text-text-primary">
              POSTPERFECT
            </span>
            <p className="mt-3 text-text-secondary text-sm max-w-sm">
              Crafting digital experiences that defy convention. Web, apps,
              video, marketing, ERP, and custom software — all under one roof.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-text-secondary hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <a
                  href="mailto:info@postperfect.in"
                  className="hover:text-accent transition-colors duration-300"
                >
                  info@postperfect.in
                </a>
              </li>
              <li>
                <a
                  href="tel:+918750075080"
                  className="hover:text-accent transition-colors duration-300"
                >
                  +91 87500 75080
                </a>
              </li>
              <li>Global — Remote First</li>
            </ul>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://www.instagram.com/post_perfect_agency/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-text-secondary hover:text-accent transition-colors duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/postperfecct/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-text-secondary hover:text-accent transition-colors duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.25h4V23h-4V8.25zM8.5 8.25h3.83v2.01h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V23h-4v-6.87c0-1.64-.03-3.75-2.29-3.75-2.29 0-2.64 1.79-2.64 3.63V23h-4V8.25z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 border-t border-[#38BDF8]/8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text-muted">
          &copy; {currentYear} PostPerfect. All rights reserved.
        </p>
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="text-xs text-text-muted hover:text-accent transition-colors duration-300 flex items-center gap-1"
        >
          Back to top
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="rotate-180"
          >
            <path
              d="M6 2L6 10M6 10L2 6M6 10L10 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
