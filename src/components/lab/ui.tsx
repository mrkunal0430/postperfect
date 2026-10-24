"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useSpring } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1] as const;
export const CYAN = "#38BDF8";

/** Text that rises in letter by letter (and out again when removed). Lines only wrap between words. */
export const Chars = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  let n = 0;
  return (
    <span aria-label={text} className="inline-block">
      {text.split(" ").map((word, w) => (
        <span key={w} aria-hidden>
          {w > 0 && " "}
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((ch) => {
              const i = n++;
              return (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-110%", transition: { duration: 0.35, ease: EASE, delay: i * 0.008 } }}
                    transition={{ duration: 0.8, ease: EASE, delay: delay + i * 0.022 }}
                  >
                    {ch}
                  </motion.span>
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </span>
  );
};

/** A link that leans toward the cursor and springs back. */
export const Magnetic = ({
  href,
  className,
  children,
  strength = 0.35,
}: {
  href: string;
  className: string;
  children: ReactNode;
  strength?: number;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 14 });
  const y = useSpring(0, { stiffness: 220, damping: 14 });
  return (
    <motion.span style={{ x, y }} className="inline-block">
      <Link
        ref={ref}
        href={href}
        className={className}
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          x.set((e.clientX - (r.left + r.width / 2)) * strength);
          y.set((e.clientY - (r.top + r.height / 2)) * strength);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        {children}
      </Link>
    </motion.span>
  );
};

/** Small mono eyebrow label used above section titles. */
export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#38BDF8]">{children}</p>
);
