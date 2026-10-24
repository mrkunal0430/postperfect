"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SERVICES } from "../../../utils/constants";
import { SHORT_NAME } from "../services/data";
import { EASE, Magnetic } from "../../lab/ui";
import WorldMap from "./WorldMap";

/** Delhi to the world: the studio's place on the map, with routes to client cities. */
const Hero = () => (
  <section className="relative min-h-[100svh] overflow-hidden">
    <WorldMap className="absolute inset-0 h-full w-full" />

    {/* Darkens the corner where the copy sits so it reads over the map */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 70% 55% at 12% 100%, rgba(5,11,21,0.92) 0%, rgba(5,11,21,0.6) 45%, transparent 75%), linear-gradient(to top, rgba(5,11,21,0.75), transparent 45%)",
      }}
    />

    <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-4 pb-8 pt-32 md:px-10 md:pb-12">
      <div className="mx-auto w-full max-w-[1440px]">
        <h1 className="font-heading text-[clamp(3rem,7.4vw,7.25rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-text-primary">
          {["Built in Delhi.", "Launched worldwide."].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: EASE, delay: 0.5 + i * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
          className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end"
        >
          <p className="max-w-[46ch] text-lg leading-relaxed text-text-secondary">
            Websites, apps, video, branding and marketing for companies everywhere, from one senior team. Written scope,
            fixed quote, and a live preview link you can open from any time zone.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Magnetic
              href="/contact"
              className="inline-flex h-14 items-center rounded-full bg-accent px-8 font-semibold text-bg-secondary transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Start a project
            </Magnetic>
            <Link
              href="#work"
              className="inline-flex h-14 items-center rounded-full border border-white/15 bg-bg-secondary/40 px-7 font-medium text-text-primary backdrop-blur-md transition-colors hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              See our work
            </Link>
          </div>
        </motion.div>

        <motion.nav
          aria-label="Services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 hidden flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-5 md:flex"
        >
          {SERVICES.map((s) => (
            <Link
              key={s.id}
              href={`/services/${s.slug}`}
              className="group flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              <span className="h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-150" style={{ background: s.color }} />
              {SHORT_NAME[s.id] ?? s.name}
            </Link>
          ))}
        </motion.nav>
      </div>
    </div>
  </section>
);

export default Hero;
