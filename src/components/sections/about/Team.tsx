"use client";

import { motion } from "framer-motion";
import { TEAM } from "../../../utils/constants";
import { EASE } from "../../lab/ui";
import { CONTAINER, GUTTER, H2, LEAD } from "../../ui/typography";

// Monogram backgrounds drawn from the site palette, picked per person by name.
const HUES = ["#38BDF8", "#7C3AED", "#3B82F6", "#10B981", "#EC4899", "#F59E0B"];
const hueFor = (name: string) => HUES[[...name].reduce((n, c) => n + c.charCodeAt(0), 0) % HUES.length];
const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("");

/** The people clients work with. Shows a monogram until a member has a photo. */
const Team = () => (
  <section aria-labelledby="team-title" className={`${GUTTER} pb-28 md:pb-40`}>
    <div className={CONTAINER}>
      <div className="grid gap-6 md:grid-cols-2 md:items-end">
        <h2 id="team-title" className={H2}>
          The people on your project
        </h2>
        <p className={`max-w-[46ch] md:justify-self-end ${LEAD}`}>
          Senior specialists lead every engagement from the first call to launch. You won&apos;t be handed off.
        </p>
      </div>

      <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-5">
        {TEAM.map((member, i) => {
          const hue = hueFor(member.name);
          return (
            <motion.li
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.08 }}
              className="group"
            >
              <div
                className="relative flex aspect-[4/5] items-end overflow-hidden rounded-2xl border border-white/10 p-5"
                style={{ background: `linear-gradient(160deg, ${hue}33 0%, rgba(13,26,46,0.85) 70%)` }}
              >
                {member.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <span
                    aria-hidden
                    className="font-heading text-[clamp(2.75rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.06em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2"
                    style={{ color: hue }}
                  >
                    {initials(member.name)}
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-white md:text-xl">{member.name}</h3>
              <p className="text-sm text-[#92AAC0]">{member.role}</p>
            </motion.li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default Team;
