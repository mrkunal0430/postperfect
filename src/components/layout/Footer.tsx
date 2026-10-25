"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NAV_LINKS, SERVICES } from "../../utils/constants";
import { SmoothScrollContext } from "./SmoothScroll";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/post_perfect_agency/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/postperfecct/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.25h4V23h-4V8.25zM8.5 8.25h3.83v2.01h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V23h-4v-6.87c0-1.64-.03-3.75-2.29-3.75-2.29 0-2.64 1.79-2.64 3.63V23h-4V8.25z" />
      </svg>
    ),
  },
];

// Live studio time, set after mount so server and client markup match.
const useDelhiTime = () => {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const ColumnTitle = ({ children }: { children: string }) => (
  <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted">{children}</h4>
);

const FooterLink = ({ href, children }: { href: string; children: string }) => (
  <Link
    href={href}
    className="group inline-flex items-center text-sm text-text-secondary transition-colors duration-300 hover:text-text-primary"
  >
    <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
    {children}
  </Link>
);

const Footer = () => {
  const lenisRef = useContext(SmoothScrollContext);
  const delhiTime = useDelhiTime();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (lenisRef?.current) lenisRef.current.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-bg-secondary/85 backdrop-blur-xl">
      {/* Glowing hairline on top edge */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(56,189,248,0.6)_30%,rgba(124,58,237,0.5)_70%,transparent)]"
      />
      {/* Soft glow bleeding down from the hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Contact strip */}
        <div className="flex flex-col gap-8 border-b border-white/[0.06] py-14 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs text-emerald-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Available for new projects
            </span>
            <p className="mt-5 text-sm text-text-muted">Have an idea? Drop us a line.</p>
            <a
              href="mailto:info@postperfect.in"
              className="group mt-2 inline-flex items-center gap-3 font-heading text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-[-0.03em] text-text-primary transition-colors duration-300 hover:text-accent"
            >
              info@postperfect.in
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-lg transition-all duration-300 group-hover:rotate-[-45deg] group-hover:border-accent group-hover:bg-accent group-hover:text-bg-primary md:h-12 md:w-12">
                →
              </span>
            </a>
          </div>

          <div className="flex gap-10 text-sm">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted">Studio time</p>
              <p className="mt-2 font-heading text-2xl text-text-primary tabular-nums">
                {delhiTime ?? "--:--"} <span className="text-sm text-text-muted">IST</span>
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted">Based in</p>
              <p className="mt-2 font-heading text-2xl text-text-primary">Delhi, India</p>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <Link href="/" aria-label="PostPerfect home" className="inline-block">
              <img src="/Postperfect_Logo.png" alt="PostPerfect" className="h-9 w-auto object-contain" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-text-secondary">
              Strategy, design, code and motion under one roof. We build digital experiences people remember,
              for clients across the world.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent hover:shadow-glow-sm"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <ColumnTitle>Services</ColumnTitle>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <FooterLink href={`/services/${s.slug}`}>{s.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <ColumnTitle>Company</ColumnTitle>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <FooterLink href={link.path}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-2">
            <ColumnTitle>Contact</ColumnTitle>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li>
                <a href="tel:+918750075080" className="transition-colors duration-300 hover:text-text-primary">
                  +91 87500 75080
                </a>
              </li>
              <li>
                <a href="mailto:info@postperfect.in" className="transition-colors duration-300 hover:text-text-primary">
                  info@postperfect.in
                </a>
              </li>
              <li className="text-text-muted">Working remotely worldwide</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-6 text-xs text-text-muted sm:flex-row">
          <p>&copy; {currentYear} PostPerfect. All rights reserved.</p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 transition-colors duration-300 hover:text-accent"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-colors duration-300 group-hover:border-accent/60">
              ↑
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
