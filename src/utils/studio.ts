// Studio contact details and opening hours, shared by the contact and about pages.

export const STUDIO = {
  location: "Delhi, India",
  remote: "Working remotely with clients worldwide",
  email: "info@postperfect.in",
  phone: "+91 87500 75080",
  phoneHref: "tel:+918750075080",
  whatsappHref: "https://wa.me/918750075080",
  socials: [
    { name: "LinkedIn", href: "https://www.linkedin.com/company/postperfecct/" },
    { name: "Instagram", href: "https://www.instagram.com/post_perfect_agency/" },
  ],
  replyTime: "within 2 hours",
};

/** Opening hours in IST, keyed by day of week (0 = Sunday). Hours are 24h. */
export const STUDIO_HOURS: Record<number, { open: number; close: number } | null> = {
  0: null,
  1: { open: 10, close: 19 },
  2: { open: 10, close: 19 },
  3: { open: 10, close: 19 },
  4: { open: 10, close: 19 },
  5: { open: 10, close: 19 },
  6: { open: 10, close: 16 },
};

export const HOURS_TABLE = [
  { days: "Monday – Friday", time: "10:00 – 19:00" },
  { days: "Saturday", time: "10:00 – 16:00" },
  { days: "Sunday", time: "Closed" },
];

// IST is UTC+5:30 all year (no daylight saving), so plain offset math is exact.
const IST_OFFSET_MS = 330 * 60_000;
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Today's date in studio time as a local calendar date, plus the current studio hour (fractional). */
export const studioToday = (now = new Date()) => {
  const ist = new Date(now.getTime() + IST_OFFSET_MS);
  return {
    date: new Date(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate()),
    hour: ist.getUTCHours() + ist.getUTCMinutes() / 60,
  };
};

export type StudioStatus = {
  /** Current studio time, "HH:MM". */
  time: string;
  open: boolean;
  /** When the studio next opens (or closes, if open now), as a real instant. */
  next: Date;
  /** "today", "tomorrow" or a weekday name, relative to studio time. */
  nextDay: string;
  /** `next` in studio time, "HH:MM". */
  nextTime: string;
};

const hhmm = (h: number) => `${String(Math.floor(h)).padStart(2, "0")}:${String(Math.round((h % 1) * 60)).padStart(2, "0")}`;

export const studioStatus = (now: Date): StudioStatus => {
  const ist = new Date(now.getTime() + IST_OFFSET_MS);
  const day = ist.getUTCDay();
  const hour = ist.getUTCHours() + ist.getUTCMinutes() / 60;
  const time = `${String(ist.getUTCHours()).padStart(2, "0")}:${String(ist.getUTCMinutes()).padStart(2, "0")}`;

  // Midnight of today in studio time, expressed as a real instant.
  const midnight = Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate()) - IST_OFFSET_MS;
  const at = (offsetDays: number, h: number) => new Date(midnight + offsetDays * 86_400_000 + h * 3_600_000);

  const today = STUDIO_HOURS[day];
  if (today && hour >= today.open && hour < today.close) {
    return { time, open: true, next: at(0, today.close), nextDay: "today", nextTime: hhmm(today.close) };
  }
  for (let i = 0; i <= 7; i++) {
    const hours = STUDIO_HOURS[(day + i) % 7];
    if (hours && (i > 0 || hour < hours.open)) {
      const nextDay = i === 0 ? "today" : i === 1 ? "tomorrow" : DAY_NAMES[(day + i) % 7];
      return { time, open: false, next: at(i, hours.open), nextDay, nextTime: hhmm(hours.open) };
    }
  }
  return { time, open: false, next: now, nextDay: "today", nextTime: time };
};
