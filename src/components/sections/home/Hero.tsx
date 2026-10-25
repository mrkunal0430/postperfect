"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SERVICES } from "../../../utils/constants";
import { SHORT_NAME } from "../services/data";
import { EASE, Magnetic } from "../../lab/ui";

type Tile = { tag: string; word: string; bg: string; fg: string; height: number };

const INK = "#050B15"; // --color-bg-secondary, used as text on the bright tiles
const serviceColor = (id: string) => SERVICES.find((s) => s.id === id)?.color ?? "#38BDF8";

/** One tile per kind of thing we make, coloured by its service. Heights are desktop px. */
const TILES: Tile[] = [
  { tag: "Website", word: "Hello.", bg: serviceColor("web-app-development"), fg: INK, height: 290 },
  { tag: "Film", word: "Roll.", bg: serviceColor("video-editing-animation"), fg: INK, height: 260 },
  { tag: "Identity", word: "Aa", bg: "#E2E8F4", fg: INK, height: 210 },
  { tag: "Campaign", word: "Grow.", bg: serviceColor("marketing"), fg: INK, height: 250 },
  { tag: "Social", word: "Post.", bg: serviceColor("social-media-management"), fg: INK, height: 220 },
  { tag: "App", word: "Tap.", bg: "#38BDF8", fg: INK, height: 230 },
  { tag: "Brand", word: "Bold.", bg: serviceColor("branding"), fg: INK, height: 220 },
  { tag: "Motion", word: "Move.", bg: "#122038", fg: "#7DD3FC", height: 260 },
  { tag: "Launch", word: "Live.", bg: "#0D1A2E", fg: "#E2E8F4", height: 230 },
  { tag: "Reel", word: "Share.", bg: "#A78BFA", fg: INK, height: 240 },
];

/** Six tiles per column, stepping through the list so neighbouring columns differ. */
const COLUMNS = [
  { start: 0, duration: 34, reverse: false },
  { start: 1, duration: 28, reverse: true },
  { start: 2, duration: 38, reverse: false },
  { start: 4, duration: 30, reverse: true },
  { start: 5, duration: 36, reverse: false },
  { start: 7, duration: 27, reverse: true },
  { start: 8, duration: 33, reverse: false },
].map(({ start, duration, reverse }) => ({
  duration,
  reverse,
  tiles: Array.from({ length: 6 }, (_, i) => TILES[(start + i * 3) % TILES.length]),
}));

/** A tilted wall of work tiles drifting behind the headline. Purely decorative. */
const WorkWall = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute left-[-210px] top-[-150px] flex h-[160%] origin-[50%_40%] gap-3 [--u:0.8px] [transform:rotateX(24deg)_rotateZ(-16deg)] md:left-[33%] md:top-[-30%] md:gap-4 md:[--u:1px] md:[transform:rotateX(22deg)_rotateZ(-16deg)]"
  >
    {COLUMNS.map((col, c) => (
      <div
        key={c}
        className="wall-column flex w-[150px] shrink-0 flex-col gap-3 md:w-[196px] md:gap-4"
        style={{
          ["--wall-duration" as string]: `${col.duration}s`,
          animationDirection: col.reverse ? "reverse" : "normal",
        }}
      >
        {[...col.tiles, ...col.tiles].map((tile, i) => (
          <div
            key={i}
            className="flex shrink-0 flex-col justify-between rounded-2xl p-3.5 md:rounded-[20px] md:p-[18px]"
            style={{ height: `calc(${tile.height} * var(--u))`, background: tile.bg, color: tile.fg }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] md:text-[11px]">{tile.tag}</span>
            <span className="font-heading text-[38px] font-bold leading-[0.9] tracking-[-0.06em] md:text-[52px]">
              {tile.word}
            </span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

const Hero = () => (
  <section className="relative min-h-[100svh] overflow-hidden bg-bg-primary">
    <WorkWall />

    {/* Phone: the wall fades out under the copy. Desktop: it fades in from the left. */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,30,0.55)_0%,rgba(8,16,30,0)_18%,rgba(8,16,30,0)_32%,rgba(8,16,30,0.92)_54%,#08101E_64%)] md:bg-[linear-gradient(90deg,#08101E_0%,#08101E_34%,rgba(8,16,30,0.75)_46%,rgba(8,16,30,0)_64%)]"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-52 bg-gradient-to-t from-bg-primary to-transparent md:block"
    />

    <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-9 pt-32 md:px-10 md:pb-16">
      <div className="mx-auto w-full max-w-[1440px]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent md:text-xs"
        >
          Design · Build · Launch
        </motion.p>

        <h1 className="mt-4 font-heading text-[clamp(3.25rem,9vw,8rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-text-primary md:mt-6">
          {["Made to stop", "the scroll."].map((line, i) => (
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
        >
          <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-text-secondary md:mt-7 md:text-lg">
            Websites, apps, films, brands and campaigns from one team that cares how every frame looks.
          </p>

          <div className="mt-7 flex flex-col gap-2 md:mt-9 md:flex-row md:items-center md:gap-3">
            {/* Full-width under the thumb on phones; magnetic pill on desktop */}
            <Link
              href="/contact"
              className="flex h-14 items-center justify-center rounded-full bg-accent font-semibold text-bg-secondary transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:hidden"
            >
              Start a project
            </Link>
            <span className="hidden md:inline-block">
              <Magnetic
                href="/contact"
                className="inline-flex h-14 items-center rounded-full bg-accent px-8 font-semibold text-bg-secondary transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Start a project
              </Magnetic>
            </span>
            <Link
              href="#work"
              className="flex h-12 items-center justify-center rounded-full font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:h-14 md:border md:border-white/15 md:bg-bg-secondary/40 md:px-7 md:text-text-primary md:backdrop-blur-md md:hover:border-white/40"
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
          className="mt-12 hidden max-w-[640px] flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-5 md:flex"
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
