"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES } from "../../../utils/constants";
import { EASE } from "../../lab/ui";
import { PLANNING, SHORT_NAME, tint } from "./data";

const shapeOf = (ids: string[]) => {
  const kinds = new Set(ids.map((id) => PLANNING[id]?.kind));
  if (kinds.has("project") && kinds.has("ongoing"))
    return "Build first, then grow: a fixed-scope project that rolls into a monthly retainer, with the same team throughout.";
  if (kinds.has("ongoing")) return "A monthly retainer with a live dashboard and a strategy call every month.";
  return "A fixed-scope project with a written plan, milestone billing and one point of contact.";
};

/** Pick services and see how the engagement would be shaped, then carry the picks into the brief form. */
const Planner = ({ plan, onToggle }: { plan: string[]; onToggle: (id: string) => void }) => {
  const picked = SERVICES.filter((s) => plan.includes(s.id));
  const href = `/contact?services=${picked.map((s) => s.id).join(",")}`;

  return (
    <section id="planner" aria-labelledby="planner-title" className="scroll-mt-24 px-4 py-28 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-12 rounded-[28px] border border-white/10 bg-surface p-6 md:grid-cols-2 md:p-12 lg:p-16">
        <div>
          <h2
            id="planner-title"
            className="font-heading text-[clamp(2.25rem,4.6vw,4rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white"
          >
            Plan your project
          </h2>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-[#B8CCDD]">
            Choose what you need. We'll show how we'd usually run it, then carry your choices into the brief so you
            don't have to repeat yourself.
          </p>

          <fieldset className="mt-10">
            <legend className="sr-only">Services</legend>
            <div className="flex flex-wrap gap-3">
              {SERVICES.map((s) => {
                const on = plan.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => onToggle(s.id)}
                    className="flex items-center gap-2.5 rounded-full border px-5 py-3 font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    style={
                      on
                        ? { backgroundColor: s.color, borderColor: s.color, color: "#05070B" }
                        : { borderColor: tint(s.color, 0.35), color: "#E2E8F4", backgroundColor: tint(s.color, 0.06) }
                    }
                  >
                    <span
                      aria-hidden
                      className="flex h-4 w-4 items-center justify-center rounded-full border"
                      style={{ borderColor: on ? "#05070B" : s.color }}
                    >
                      {on && <span className="h-2 w-2 rounded-full bg-[#05070B]" />}
                    </span>
                    {SHORT_NAME[s.id]}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div aria-live="polite" className="flex flex-col rounded-2xl border border-white/10 bg-[#08101E]/80 p-6 md:p-8">
          {picked.length === 0 ? (
            <p className="m-auto max-w-[32ch] text-center text-[#92AAC0]">
              Pick one or more services to see how we'd shape the work.
            </p>
          ) : (
            <>
              <h3 className="font-heading text-xl font-semibold text-white">How we'd run it</h3>
              <ul className="mt-5 flex-1">
                <AnimatePresence initial={false}>
                  {picked.map((s) => (
                    <motion.li
                      key={s.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="flex gap-4 border-b border-white/[0.07] py-4">
                        <span aria-hidden className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                        <div>
                          <p className="font-semibold text-white">{s.name}</p>
                          <p className="mt-1 text-sm text-[#B8CCDD]">{PLANNING[s.id]?.timing}</p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <motion.p layout className="mt-6 leading-relaxed text-[#E2E8F4]">
                {shapeOf(plan)}
              </motion.p>
              <motion.div layout className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href={href}
                  className="rounded-full bg-[#38BDF8] px-6 py-3 font-semibold text-[#05070B] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Continue to the brief
                </Link>
                <span className="text-sm text-[#92AAC0]">Free consultation. We usually reply within 2 hours.</span>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Planner;
