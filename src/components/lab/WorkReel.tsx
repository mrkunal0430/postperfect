"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Eyebrow } from "./ui";

// ─── Building blocks ─────────────────────────────────────────────────────────

/** Moves with scroll at a speed set by depth, so stacked layers drift apart. */
const Layer = ({
  progress,
  depth,
  className,
  children,
}: {
  progress: MotionValue<number>;
  depth: number;
  className: string;
  children: ReactNode;
}) => {
  const y = useTransform(progress, [0, 1], [70 * depth, -70 * depth]);
  return (
    <motion.div style={{ y }} className={`absolute ${className}`}>
      {children}
    </motion.div>
  );
};

/** Tilts its contents in 3D toward the cursor. */
const Tilt = ({ children, className }: { children: ReactNode; className: string }) => {
  const rx = useSpring(0, { stiffness: 120, damping: 16 });
  const ry = useSpring(0, { stiffness: 120, damping: 16 });
  return (
    <motion.div
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1400 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

const Window = ({
  url,
  light = false,
  className = "",
  children,
}: {
  url: string;
  light?: boolean;
  className?: string;
  children: ReactNode;
}) => (
  <div
    className={`overflow-hidden rounded-xl border shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ${
      light ? "border-black/10 bg-[#FBF8F4] text-[#1F1A16]" : "border-white/10 bg-[#0D1117] text-[#E6EDF3]"
    } ${className}`}
  >
    <div className={`flex items-center gap-1.5 border-b px-3 py-2 ${light ? "border-black/10" : "border-white/10"}`}>
      <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
      <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
      <span className="h-2 w-2 rounded-full bg-[#28C840]" />
      <span className={`mx-auto rounded px-3 py-0.5 font-mono text-[10px] ${light ? "bg-black/5 text-black/60" : "bg-white/5 text-white/50"}`}>
        {url}
      </span>
    </div>
    {children}
  </div>
);

const Float = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-white/10 bg-[#111821]/90 p-3 text-[#E6EDF3] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md ${className}`}>
    {children}
  </div>
);

const Check = () => (
  <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <path d="M5 12l5 5 9-10" />
  </svg>
);

// ─── Project visuals (recreations of the real products) ──────────────────────

const HrmsVisual = ({ progress }: { progress: MotionValue<number> }) => (
  <>
    <Layer progress={progress} depth={0.4} className="inset-x-[6%] top-[12%]">
      <Window url="hr.intakesense.com">
        <div className="flex aspect-[16/10] text-[11px]">
          <div className="hidden w-[22%] flex-col gap-1 border-r border-white/10 p-3 sm:flex">
            <div className="mb-2 flex items-center gap-2 font-semibold">
              <span className="h-4 w-4 rounded bg-[#38BDF8]" />HRMS
            </div>
            {["Dashboard", "Employees", "Attendance", "Expenses", "Workflows", "HR Buddy"].map((l) => (
              <span key={l} className={`rounded px-2 py-1 ${l === "Attendance" ? "bg-white/10 text-white" : "text-white/50"}`}>
                {l}
              </span>
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-2 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Attendance</span>
              <span className="rounded bg-[#38BDF8] px-2 py-0.5 text-[10px] font-semibold text-[#05070B]">Check in</span>
            </div>
            <div
              className="relative flex-1 overflow-hidden rounded-lg border border-white/10"
              style={{
                backgroundColor: "#0F161E",
                backgroundImage:
                  "linear-gradient(#1A2430 1px, transparent 1px), linear-gradient(90deg, #1A2430 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            >
              <div className="absolute inset-x-0 top-[48%] h-2 bg-[#1C2733]" />
              <div className="absolute inset-y-0 left-[32%] w-2 bg-[#1C2733]" />
              <span className="absolute left-[38%] top-[18%] h-[64%] aspect-square animate-pulse rounded-full border-2 border-dashed border-[#38BDF8] bg-[#38BDF8]/10" />
              <span className="absolute left-[52%] top-[44%] h-3 w-3 rounded-full border-2 border-white bg-[#38BDF8]" />
              <span className="absolute left-[44%] top-[30%] h-2.5 w-2.5 rounded-full border-2 border-white bg-[#22C55E]" />
              <span className="absolute left-[60%] top-[58%] h-2.5 w-2.5 rounded-full border-2 border-white bg-[#22C55E]" />
            </div>
          </div>
        </div>
      </Window>
    </Layer>
    <Layer progress={progress} depth={1.4} className="right-[2%] top-[4%] w-[44%] min-w-[180px]">
      <Float>
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold">
          <span className="h-4 w-4 rounded-full bg-[#38BDF8]" />HR Buddy
        </div>
        <p className="ml-auto w-fit max-w-[85%] rounded-lg rounded-br-sm bg-[#38BDF8] px-2.5 py-1.5 text-[11px] text-[#05070B]">
          What is the travel expense policy?
        </p>
        <p className="mt-2 max-w-[90%] rounded-lg rounded-bl-sm bg-white/10 px-2.5 py-1.5 text-[11px] leading-snug">
          Travel claims need a receipt and manager approval. Shall I start one?
        </p>
      </Float>
    </Layer>
    <Layer progress={progress} depth={2} className="bottom-[6%] left-[2%]">
      <Float className="flex items-center gap-3">
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#22C55E]/15 text-[#22C55E]">
          <Check />
        </span>
        <span className="text-xs">
          <b className="block font-semibold">Checked in · Head Office</b>
          <span className="text-white/50">Inside geofence</span>
        </span>
      </Float>
    </Layer>
  </>
);

const STAGES = ["Submitted", "Documents", "Verification", "Credit review", "Sanctioned"];

const SalesfiVisual = ({ progress }: { progress: MotionValue<number> }) => (
  <>
    <Layer progress={progress} depth={0.4} className="inset-x-[6%] top-[12%]">
      <Window url="salesfi.in">
        <div className="flex aspect-[16/10] flex-col gap-3 p-4 text-[11px]">
          <div className="flex items-center justify-between">
            <span>
              <span className="block text-white/50">APP-2041 · Purchase order financing</span>
              <span className="text-base font-semibold">Kiran Traders Pvt. Ltd.</span>
            </span>
            <span className="rounded-full bg-[#3B82F6]/20 px-2 py-0.5 font-semibold text-[#7DB2FF]">In verification</span>
          </div>
          <div className="relative mt-1 flex justify-between">
            <div className="absolute inset-x-[6%] top-[9px] h-0.5 bg-white/10" />
            <motion.div
              className="absolute left-[6%] top-[9px] h-0.5 bg-[#3B82F6]"
              animate={{ width: ["0%", "44%", "44%"] }}
              transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.5, 1], ease: "easeInOut" }}
            />
            {STAGES.map((s, i) => (
              <div key={s} className="relative flex w-1/5 flex-col items-center gap-1.5">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold ${
                    i < 2 ? "bg-[#3B82F6] text-white" : i === 2 ? "border-2 border-[#3B82F6] bg-[#0D1117] text-[#7DB2FF]" : "bg-white/10 text-white/50"
                  }`}
                >
                  {i < 2 ? <Check /> : i + 1}
                </span>
                <span className={`text-center text-[9px] ${i <= 2 ? "text-white" : "text-white/40"}`}>{s}</span>
              </div>
            ))}
          </div>
          <div className="flex-1 rounded-lg border border-white/10 p-3">
            <p className="mb-2 font-semibold">Document verification</p>
            {[
              ["GST certificate", "Verified", "text-[#22C55E] bg-[#22C55E]/15"],
              ["Purchase order", "Verified", "text-[#22C55E] bg-[#22C55E]/15"],
              ["Bank statements", "In review", "text-[#F59E0B] bg-[#F59E0B]/15"],
              ["Director KYC", "Pending", "text-white/50 bg-white/10"],
            ].map(([n, s, c]) => (
              <div key={n} className="flex items-center justify-between border-t border-white/5 py-1.5 first:border-0">
                <span>{n}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${c}`}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </Window>
    </Layer>
    <Layer progress={progress} depth={1.6} className="right-[2%] top-[6%]">
      <Float className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#22C55E]/15 text-[#22C55E]">
          <Check />
        </span>
        <span className="text-xs">
          <b className="block font-semibold">Purchase order verified</b>
          <span className="text-white/50">APP-2041</span>
        </span>
      </Float>
    </Layer>
    <Layer progress={progress} depth={2.2} className="bottom-[8%] left-[2%]">
      <Float className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3B82F6]/20 text-[#7DB2FF]">→</span>
        <span className="text-xs">
          <b className="block font-semibold">Moved to Credit review</b>
          <span className="text-white/50">Automated workflow</span>
        </span>
      </Float>
    </Layer>
  </>
);

const Bottle = ({ h, w, cap = "#3B2F27", body = "#F7F1EA" }: { h: string; w: string; cap?: string; body?: string }) => (
  <span className="flex flex-col items-center">
    <span className="h-[10%] w-[40%] min-h-2 rounded-t" style={{ background: cap }} />
    <span className="flex items-center justify-center rounded-xl shadow-lg" style={{ height: h, width: w, background: body }}>
      <span className="font-serif text-[8px] tracking-[0.2em] text-[#1F1A16]">SAWDESI</span>
    </span>
  </span>
);

const SawdesiVisual = ({ progress }: { progress: MotionValue<number> }) => (
  <>
    <Layer progress={progress} depth={0.4} className="inset-x-[6%] top-[12%]">
      <Window url="sawdesi.in" light>
        <div className="flex aspect-[16/10] flex-col text-[11px]">
          <div className="flex items-center justify-between px-4 py-2.5 text-black/50">
            <span>Shop · Face · Body</span>
            <span className="font-serif text-base tracking-[0.25em] text-[#1F1A16]">SAWDESI</span>
            <span className="rounded-full bg-[#1F1A16] px-2 py-0.5 text-[10px] text-white">Bag · 2</span>
          </div>
          <div className="flex flex-1 gap-3 px-4 pb-4">
            <div className="flex flex-1 flex-col justify-end gap-2 rounded-lg bg-[#F1EAE1] p-4">
              <span className="text-[9px] uppercase tracking-[0.2em] text-black/50">The daily ritual</span>
              <span className="font-serif text-2xl leading-tight">
                Skincare,
                <br />
                made simple.
              </span>
              <span className="w-fit rounded-full bg-[#1F1A16] px-3 py-1 text-[10px] text-white">Shop now</span>
            </div>
            <div className="relative flex flex-1 items-end justify-center gap-3 overflow-hidden rounded-lg bg-[#E9DDD0] pb-6">
              <span className="absolute left-1/2 top-[14%] h-[58%] aspect-square -translate-x-1/2 rounded-full bg-[#F3C9A1]" />
              <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative">
                <Bottle h="5.5rem" w="2.6rem" />
              </motion.span>
              <motion.span animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} className="relative">
                <Bottle h="3rem" w="3.6rem" body="#EAD9C6" />
              </motion.span>
            </div>
          </div>
        </div>
      </Window>
    </Layer>
    <Layer progress={progress} depth={1.8} className="right-[3%] top-[2%] w-[26%] min-w-[120px]">
      <div className="overflow-hidden rounded-[22px] border-4 border-[#1F1A16] bg-[#FBF8F4] p-2 text-[#1F1A16] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
        <div className="flex aspect-[9/16] flex-col gap-2">
          <div className="flex flex-1 items-center justify-center rounded-xl bg-[#EDE3D8]">
            <Bottle h="3.5rem" w="1.8rem" />
          </div>
          <span className="text-[10px] font-semibold">Face Serum</span>
          <span className="rounded-full bg-[#1F1A16] py-1 text-center text-[9px] text-white">Add to bag</span>
        </div>
      </div>
    </Layer>
    <Layer progress={progress} depth={2.2} className="bottom-[6%] left-[2%]">
      <Float className="text-xs">
        <b className="block font-semibold">Admin · New order</b>
        <span className="text-white/50">Packed · ready to ship</span>
      </Float>
    </Layer>
  </>
);

const SITES = [
  { url: "captonvisapoint.com", tint: "#A78BFA" },
  { url: "360kavach.com", tint: "#38BDF8" },
  { url: "b77life.com", tint: "#F59E0B" },
];

const SitesVisual = ({ progress }: { progress: MotionValue<number> }) => (
  <>
    {SITES.map((s, i) => (
      <Layer
        key={s.url}
        progress={progress}
        depth={0.5 + i * 0.7}
        className={["left-[4%] top-[8%] w-[62%]", "left-[20%] top-[24%] w-[62%]", "left-[34%] top-[40%] w-[62%]"][i]}
      >
        <a href={`https://${s.url}`} target="_blank" rel="noreferrer" className="block transition-transform duration-500 hover:-translate-y-3">
          <Window url={s.url}>
            <div className="flex aspect-[16/9] flex-col gap-2 p-4">
              <span className="h-2 w-16 rounded" style={{ background: s.tint }} />
              <span className="h-4 w-3/4 rounded bg-white/15" />
              <span className="h-2 w-1/2 rounded bg-white/10" />
              <div className="mt-auto flex gap-2">
                <span className="h-10 flex-1 rounded" style={{ background: `${s.tint}33` }} />
                <span className="h-10 flex-1 rounded bg-white/5" />
                <span className="h-10 flex-1 rounded bg-white/5" />
              </div>
            </div>
          </Window>
        </a>
      </Layer>
    ))}
  </>
);

// ─── Reel ────────────────────────────────────────────────────────────────────

type Project = {
  num: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  link?: { href: string; label: string };
  glow: string;
  Visual: (p: { progress: MotionValue<number> }) => ReactNode;
};

const PROJECTS: Project[] = [
  {
    num: "01",
    name: "HRMS",
    category: "HR software",
    description:
      "An HR platform for companies: employee management, HR workflows, expense tracking, geofenced attendance and an AI assistant called HR Buddy.",
    tags: ["Geofencing", "AI assistant", "Workflows"],
    link: { href: "https://hr.intakesense.com", label: "hr.intakesense.com" },
    glow: "#38BDF8",
    Visual: HrmsVisual,
  },
  {
    num: "02",
    name: "SalesFi",
    category: "Finance platform",
    description:
      "Loan workflows end to end, including purchase-order financing, application stages and document verification.",
    tags: ["Loan pipeline", "Document verification", "Dashboards"],
    link: { href: "https://salesfi.in", label: "salesfi.in" },
    glow: "#3B82F6",
    Visual: SalesfiVisual,
  },
  {
    num: "03",
    name: "SAWDESI",
    category: "E-commerce",
    description:
      "A complete e-commerce platform for a skincare brand, with the customer storefront and an admin dashboard for products and orders.",
    tags: ["Storefront", "Admin dashboard", "Mobile-first"],
    link: { href: "https://sawdesi.in", label: "sawdesi.in" },
    glow: "#F3C9A1",
    Visual: SawdesiVisual,
  },
  {
    num: "04",
    name: "Client websites",
    category: "Business websites",
    description: "Fast, responsive websites for businesses across industries, built to earn trust at first glance.",
    tags: ["Responsive", "SEO-ready", "Fast"],
    glow: "#A78BFA",
    Visual: SitesVisual,
  },
];

const Panel = ({ project, progress }: { project: Project; progress: MotionValue<number> }) => {
  const { Visual } = project;
  return (
    <article className="grid h-[78vh] w-[88vw] shrink-0 grid-rows-[auto_1fr] gap-6 md:w-[80vw] md:grid-cols-[minmax(280px,0.8fr)_1.4fr] md:grid-rows-1 md:gap-12">
      <div className="flex flex-col justify-end gap-4 md:pb-8">
        <span className="font-heading text-[clamp(4rem,10vw,9rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.07]">
          {project.num}
        </span>
        <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: project.glow }}>
          {project.category}
        </p>
        <h3 className="font-heading text-[clamp(2.25rem,4.4vw,4.25rem)] font-semibold leading-none tracking-[-0.04em]">{project.name}</h3>
        <p className="hidden max-w-md leading-relaxed text-[#B8CCDD] md:block">{project.description}</p>
        <div className="hidden flex-wrap gap-2 md:flex">
          {project.tags.map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-[#E2E8F4]">
              {t}
            </span>
          ))}
        </div>
        {project.link && (
          <a href={project.link.href} target="_blank" rel="noreferrer" className="w-fit border-b pb-1 text-sm" style={{ borderColor: project.glow }}>
            Visit {project.link.label} ↗
          </a>
        )}
      </div>
      <Tilt className="relative min-h-0 overflow-hidden rounded-[28px] border border-white/10">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 60% 40%, ${project.glow}33 0%, rgba(8,16,30,0.55) 62%)` }}
        />
        <Visual progress={progress} />
      </Tilt>
    </article>
  );
};

const WorkReel = () => {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section ref={ref} id="work" aria-label="Selected work" style={{ height: `${(PROJECTS.length + 1) * 100}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex items-center gap-[8vw] px-4 md:px-10">
          <div className="flex w-[80vw] shrink-0 flex-col gap-6 md:w-[44vw]">
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="font-heading text-[clamp(3rem,8vw,8rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
              Real products.
              <br />
              <span className="text-[#38BDF8]">Live today.</span>
            </h2>
            <p className="max-w-sm text-lg text-[#B8CCDD]">Keep scrolling. Every project here is built and running.</p>
          </div>
          {PROJECTS.map((p) => (
            <Panel key={p.num} project={p} progress={scrollYProgress} />
          ))}
        </motion.div>
        <div aria-hidden className="absolute inset-x-4 bottom-8 h-px bg-white/10 md:inset-x-10">
          <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-[#38BDF8]" />
        </div>
      </div>
    </section>
  );
};

export default WorkReel;
