"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "../../lab/ui";

// Studio hours, Monday to Friday (same as the contact page).
const STUDIO_TZ = "Asia/Kolkata";
const STUDIO_START = 10;
const STUDIO_HOURS = 9;
// A typical client working day, in the client's own time
const DAY_START = 9;
const DAY_END = 18;

const CITIES = [
  { name: "New York", tz: "America/New_York" },
  { name: "London", tz: "Europe/London" },
  { name: "Dubai", tz: "Asia/Dubai" },
  { name: "Singapore", tz: "Asia/Singapore" },
  { name: "Sydney", tz: "Australia/Sydney" },
];

const COMMITMENTS = [
  { title: "NDA from the first conversation", body: "Every engagement is covered by an NDA, so you can share the real idea." },
  { title: "Fixed quote, paid in milestones", body: "A written scope after a free consultation. No hourly surprises." },
  { title: "A live preview link", body: "Open the work in progress whenever it suits your time zone, plus weekly check-ins." },
  { title: "Support after launch", body: "A post-launch support window, then optional monthly maintenance." },
];

/** Minutes the zone is ahead of UTC at this instant (handles daylight saving). */
const offsetMinutes = (tz: string, at: number) => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
      .formatToParts(at)
      .map((p) => [p.type, p.value]),
  );
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute);
  return Math.round((asUtc - at) / 60000);
};

type Span = [number, number]; // hours within 0..24

/** Split a window that may wrap past midnight into spans inside 0..24. */
const wrapSpan = (start: number, length: number): Span[] => {
  const s = ((start % 24) + 24) % 24;
  const e = s + length;
  return e <= 24 ? [[s, e]] : [[s, 24], [0, e - 24]];
};

const intersect = (a: Span[], b: Span): Span[] =>
  a
    .map(([s, e]): Span => [Math.max(s, b[0]), Math.min(e, b[1])])
    .filter(([s, e]) => e > s);

type Row = { name: string; local: string; now: number; studio: Span[]; overlap: Span[]; hours: number; you?: boolean };

const buildRows = (at: number): Row[] => {
  const studioOff = offsetMinutes(STUDIO_TZ, at);
  const own = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const cities = [...CITIES];
  if (own && own !== STUDIO_TZ && !cities.some((c) => c.tz === own)) {
    cities.unshift({ name: own.split("/").pop()!.replaceAll("_", " "), tz: own });
  }

  return cities.map((c) => {
    const off = offsetMinutes(c.tz, at);
    const studio = wrapSpan(STUDIO_START + (off - studioOff) / 60, STUDIO_HOURS);
    const overlap = intersect(studio, [DAY_START, DAY_END]);
    const localMin = (((Math.floor(at / 60000) + off) % 1440) + 1440) % 1440;
    return {
      name: c.name,
      local: `${String(Math.floor(localMin / 60)).padStart(2, "0")}:${String(localMin % 60).padStart(2, "0")}`,
      now: localMin / 60,
      studio,
      overlap,
      hours: overlap.reduce((sum, [s, e]) => sum + e - s, 0),
      you: c.tz === own,
    };
  });
};

const pct = (h: number) => `${(h / 24) * 100}%`;

const Bar = ({ row, index }: { row: Row; index: number }) => (
  <div className="relative h-8 overflow-hidden rounded-full bg-white/[0.04] md:h-9">
    {/* Your usual working day */}
    <span
      className="absolute inset-y-0 border-x border-white/15 bg-white/[0.05]"
      style={{ left: pct(DAY_START), width: pct(DAY_END - DAY_START) }}
    />
    {row.studio.map(([s, e]) => (
      <motion.span
        key={`s${s}`}
        className="absolute inset-y-1.5 origin-left rounded-full bg-accent/25"
        style={{ left: pct(s), width: pct(e - s) }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 + index * 0.08 }}
      />
    ))}
    {row.overlap.map(([s, e]) => (
      <motion.span
        key={`o${s}`}
        className="absolute inset-y-1.5 origin-left rounded-full bg-accent shadow-[0_0_18px_rgba(56,189,248,0.55)]"
        style={{ left: pct(s), width: pct(e - s) }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.5 + index * 0.08 }}
      />
    ))}
    {/* Now */}
    <span className="absolute inset-y-0 w-px bg-white" style={{ left: pct(row.now) }} />
  </div>
);

const AcrossBorders = () => {
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    const update = () => setRows(buildRows(Date.now()));
    const first = setTimeout(update, 0);
    const id = setInterval(update, 60_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return (
    <section aria-labelledby="borders-title" className="px-4 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <h2
          id="borders-title"
          className="max-w-[16ch] font-heading text-[clamp(2.5rem,5.5vw,5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-text-primary"
        >
          Your working day, next to ours.
        </h2>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-text-secondary">
          Our studio runs 10:00 to 19:00 IST, Monday to Friday. Here&apos;s how that lines up with your day, right now.
        </p>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
          <div>
            <div className="mb-3 grid grid-cols-[6.5rem_1fr_3.5rem] gap-4 text-xs text-text-muted md:grid-cols-[8rem_1fr_5rem]">
              <span />
              <span className="relative flex justify-between tabular-nums">
                <span>00</span>
                <span>06</span>
                <span>12</span>
                <span>18</span>
                <span>24</span>
              </span>
              <span className="text-right">Overlap</span>
            </div>

            <ul className="space-y-4">
              {(rows ?? CITIES.map((c) => ({ name: c.name }) as Partial<Row>)).map((row, i) => (
                <li
                  key={row.name}
                  className="grid grid-cols-[6.5rem_1fr_3.5rem] items-center gap-4 md:grid-cols-[8rem_1fr_5rem]"
                >
                  <span className="min-w-0">
                    <span className={`block truncate font-medium ${row.you ? "text-accent-glow" : "text-text-primary"}`}>
                      {row.you ? "You" : row.name}
                    </span>
                    <span className="block truncate text-xs tabular-nums text-text-muted">
                      {row.you ? `${row.name}, ${row.local}` : (row.local ?? "--:--")}
                    </span>
                  </span>
                  {row.studio ? <Bar row={row as Row} index={i} /> : <div className="h-8 rounded-full bg-white/[0.04] md:h-9" />}
                  <span className="text-right font-heading text-lg tabular-nums text-text-primary">
                    {row.hours === undefined ? "" : `${Number.isInteger(row.hours) ? row.hours : row.hours.toFixed(1)}h`}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-text-muted">
              <span className="flex items-center gap-2">
                <span className="h-2 w-5 rounded-full bg-accent/25" />
                Our studio hours
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-5 rounded-full bg-accent" />
                Overlap with 09:00–18:00 your time
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-px bg-white" />
                Now
              </span>
            </div>
          </div>

          <ul className="divide-y divide-white/10 border-y border-white/10">
            {COMMITMENTS.map((c) => (
              <li key={c.title} className="py-6">
                <h3 className="font-heading text-xl font-semibold tracking-[-0.02em] text-text-primary">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-text-secondary">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AcrossBorders;
