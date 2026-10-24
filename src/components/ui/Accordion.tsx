"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "../lab/ui";

type Item = { q: string; a: string };

/** Question list where each answer opens in place. Pass a new `key` to reset it when items change. */
const Accordion = ({ items, color = "#38BDF8" }: { items: Item[]; color?: string }) => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-white/10">
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.q} className="border-b border-white/10">
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-heading text-lg font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:text-xl"
              >
                {item.q}
                <motion.span
                  aria-hidden
                  animate={{ rotate: expanded ? 45 : 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-lg leading-none"
                  style={expanded ? { borderColor: color, color } : undefined}
                >
                  +
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[64ch] pb-6 leading-relaxed text-[#B8CCDD]">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
