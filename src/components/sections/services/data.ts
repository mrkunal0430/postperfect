import { SERVICES, type Service } from "../../../utils/constants";

/** "#RRGGBB" + alpha (0–1) → rgba() */
export const tint = (hex: string, alpha: number) => {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export const offeringsOf = (service: Service): string[] =>
  (service as Service & { offerings?: string[] }).offerings ?? [];

/** Short labels used where the full service name is too long (vertical band titles, tabs). */
export const SHORT_NAME: Record<string, string> = {
  "web-app-development": "Web & Apps",
  "video-editing-animation": "Video & Motion",
  branding: "Branding",
  marketing: "Marketing",
  "social-media-management": "Social Media",
};

/**
 * How each service is usually scoped. Timings come from the service FAQs in
 * constants.ts. Keep them in sync if those answers change.
 */
export const PLANNING: Record<string, { kind: "project" | "ongoing"; timing: string }> = {
  "web-app-development": { kind: "project", timing: "4–6 weeks for a marketing site, 8–16 weeks for a web or mobile app" },
  "video-editing-animation": { kind: "project", timing: "Priced per video, 3 revision rounds included, 48-hour rush available" },
  branding: { kind: "project", timing: "4–8 weeks for a full identity, 2–3 weeks for a logo" },
  marketing: { kind: "ongoing", timing: "Paid ads show results in 2–4 weeks, SEO in 3–6 months" },
  "social-media-management": { kind: "ongoing", timing: "15–25 posts a month with daily community management" },
};

export const ENGAGEMENT_ROWS = ["Best for", "How it's billed", "Commitment", "You get"] as const;

export const ENGAGEMENT_MODELS = [
  {
    name: "Fixed-scope project",
    cells: [
      "A website, app, brand identity or video with a clear finish line",
      "Fixed quote, paid in milestones",
      "Ends at launch, followed by a post-launch support window",
      "A written scope, a live preview link and weekly check-ins",
    ],
  },
  {
    name: "Monthly retainer",
    cells: [
      "Marketing, social media and continuous improvements",
      "One monthly fee for an agreed workload",
      "Month to month after an initial term",
      "A live dashboard, monthly report and a standing strategy call",
    ],
  },
  {
    name: "Dedicated team",
    cells: [
      "Product companies that need extra design and engineering capacity",
      "Monthly, per specialist",
      "Quarterly, scaled up or down as your roadmap changes",
      "Senior specialists working inside your tools and sprints",
    ],
  },
];

/** Live projects with public URLs, pulled from the web service portfolio. */
export const LIVE_WORK = (
  (SERVICES[0] as Service & { portfolio?: { title: string; category: string; desc: string; url?: string | null }[] })
    .portfolio ?? []
).filter((p): p is { title: string; category: string; desc: string; url: string } => Boolean(p.url));
