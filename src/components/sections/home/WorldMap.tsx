"use client";

import { useEffect, useRef } from "react";
import { CITY_POINTS, MAP_ROWS, MAP_W } from "./worldMapData";

const ROW_STEP = Math.sqrt(3) / 2;
const ORIGIN = "Delhi";

// Destinations, with their IANA zones for the live clocks. `side` keeps
// neighbouring labels apart (Dubai sits just west of Delhi).
const CITIES: { name: string; tz: string; side: "left" | "right" }[] = [
  { name: "London", tz: "Europe/London", side: "left" },
  { name: "New York", tz: "America/New_York", side: "left" },
  { name: "Dubai", tz: "Asia/Dubai", side: "right" },
  { name: "Singapore", tz: "Asia/Singapore", side: "left" },
  { name: "Sydney", tz: "Australia/Sydney", side: "left" },
];

const REVEAL_MS = 1600; // dots ripple outward from Delhi
const ARC_PERIOD = 5200; // one light pulse per city per period
const ARC_STAGGER = 900;

type Pt = [number, number];

const decodeDots = (): Pt[] =>
  MAP_ROWS.split(";").flatMap((line) => {
    const [head, body] = line.split(":");
    const y = parseInt(head, 10) * ROW_STEP;
    const half = head.endsWith("h") ? 0.5 : 0;
    return body.split(",").flatMap((tok) => {
      const [start, run = "1"] = tok.split("+");
      return Array.from({ length: +run }, (_, i): Pt => [+start + i + half, y]);
    });
  });

/**
 * Map units → CSS px. Phones zoom into Europe–Australia and keep the map in the
 * top part of the screen, above the copy; wider screens show the world with
 * Delhi right of centre.
 */
const viewFor = (w: number, h: number) => {
  if (w < 768) {
    const x0 = 58;
    const s = Math.min(w / (128 - x0), (h * 0.42 - 84) / 42);
    return { s, ox: (w - 70 * s) / 2 - x0 * s, oy: 84 - 18 * s };
  }
  const s = (w * 1.08) / MAP_W;
  const [dx, dy] = CITY_POINTS[ORIGIN];
  return { s, ox: w * 0.6 - dx * s, oy: h * 0.4 - dy * s };
};

const bezier = (a: Pt, c: Pt, b: Pt, t: number): Pt => {
  const u = 1 - t;
  return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
};

const timeIn = (tz: string) =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(new Date());

const WorldMap = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const font = getComputedStyle(document.body).fontFamily;
    const dots = decodeDots();
    const layer = document.createElement("canvas"); // static dots, drawn once per resize
    const lctx = layer.getContext("2d")!;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let view = viewFor(1, 1);
    let times: Record<string, string> = {};
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const toPx = ([x, y]: Pt): Pt => [x * view.s + view.ox, y * view.s + view.oy];

    const refreshTimes = () => {
      times = Object.fromEntries([[ORIGIN, timeIn("Asia/Kolkata")], ...CITIES.map((c) => [c.name, timeIn(c.tz)])]);
    };

    const paintDots = () => {
      layer.width = w * dpr;
      layer.height = h * dpr;
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const r = Math.max(1.2, view.s * 0.23);
      const [ox, oy] = CITY_POINTS[ORIGIN];
      for (const d of dots) {
        const near = Math.exp(-((d[0] - ox) ** 2 + (d[1] - oy) ** 2) / 90);
        const [x, y] = toPx(d);
        if (x < -10 || x > w + 10 || y < -10 || y > h + 10) continue;
        lctx.fillStyle = `rgba(${Math.round(150 - 94 * near)},${Math.round(176 + 13 * near)},${Math.round(204 + 44 * near)},${0.36 + 0.44 * near})`;
        lctx.beginPath();
        lctx.arc(x, y, r, 0, Math.PI * 2);
        lctx.fill();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      view = viewFor(w, h);
      paintDots();
    };

    const label = (x: number, y: number, name: string, time: string, align: "left" | "right", strong = false) => {
      ctx.textAlign = align;
      ctx.textBaseline = "middle";
      const dx = align === "left" ? 12 : -12;
      ctx.font = `${strong ? 600 : 500} ${strong ? 14 : 12.5}px ${font}`;
      ctx.fillStyle = strong ? "#F0F9FF" : "rgba(226,232,244,0.92)";
      ctx.fillText(name, x + dx, y - 7);
      ctx.font = `400 11.5px ${font}`;
      ctx.fillStyle = strong ? "rgba(186,230,253,0.95)" : "rgba(146,170,192,0.95)";
      ctx.fillText(time, x + dx, y + 8);
    };

    const draw = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      ctx.translate(pointer.x, pointer.y);

      const origin = toPx(CITY_POINTS[ORIGIN]);
      const reveal = reduced ? 1 : Math.min(now / REVEAL_MS, 1);

      // Dots ripple outward from Delhi on load
      ctx.save();
      if (reveal < 1) {
        ctx.beginPath();
        ctx.arc(origin[0], origin[1], Math.hypot(w, h) * (1 - (1 - reveal) ** 3), 0, Math.PI * 2);
        ctx.clip();
      }
      ctx.drawImage(layer, 0, 0, w, h);
      ctx.restore();

      const arcsOn = reduced ? 1 : Math.min(Math.max((now - REVEAL_MS * 0.6) / 600, 0), 1);

      CITIES.forEach((city, i) => {
        const dest = toPx(CITY_POINTS[city.name]);
        const dist = Math.hypot(dest[0] - origin[0], dest[1] - origin[1]);
        const ctrl: Pt = [(origin[0] + dest[0]) / 2, (origin[1] + dest[1]) / 2 - dist * 0.32];

        // Resting route
        ctx.beginPath();
        ctx.moveTo(origin[0], origin[1]);
        ctx.quadraticCurveTo(ctrl[0], ctrl[1], dest[0], dest[1]);
        ctx.strokeStyle = `rgba(56,189,248,${0.4 * arcsOn})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 5]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Travelling light with a fading tail
        const local = reduced ? 1.2 : (now - REVEAL_MS - i * ARC_STAGGER) / ARC_PERIOD;
        const p = local < 0 ? -1 : (local % 1) * 1.45;
        if (!reduced && p >= 0 && p <= 1.12) {
          const head = Math.min(p, 1);
          const tail = Math.max(0, p - 0.3);
          const steps = 18;
          for (let k = 0; k < steps; k++) {
            const a = bezier(origin, ctrl, dest, tail + ((head - tail) * k) / steps);
            const b = bezier(origin, ctrl, dest, tail + ((head - tail) * (k + 1)) / steps);
            ctx.beginPath();
            ctx.moveTo(a[0], a[1]);
            ctx.lineTo(b[0], b[1]);
            ctx.strokeStyle = `rgba(125,211,252,${((k + 1) / steps) * 0.95})`;
            ctx.lineWidth = 1.8;
            ctx.stroke();
          }
          if (p < 1) {
            const [hx, hy] = bezier(origin, ctrl, dest, head);
            ctx.fillStyle = "#F0F9FF";
            ctx.shadowColor = "#38BDF8";
            ctx.shadowBlur = 14;
            ctx.beginPath();
            ctx.arc(hx, hy, 2.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }

        // Arrival ring
        const ring = reduced ? 0 : p - 1;
        if (ring > 0 && ring < 0.45) {
          ctx.beginPath();
          ctx.arc(dest[0], dest[1], 4 + ring * 50, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(56,189,248,${0.7 * (1 - ring / 0.45)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        if (arcsOn <= 0) return;
        ctx.globalAlpha = arcsOn;
        const onScreen = dest[0] > 8 && dest[0] < w - 8;
        if (onScreen) {
          ctx.fillStyle = "#BAE6FD";
          ctx.beginPath();
          ctx.arc(dest[0], dest[1], 3, 0, Math.PI * 2);
          ctx.fill();
          const side = dest[0] > w - 110 ? "right" : dest[0] < 110 ? "left" : city.side;
          label(dest[0], dest[1], city.name, times[city.name] ?? "", side);
        } else {
          // Off-screen on phones: pin the label to the nearest edge
          const left = dest[0] <= 8;
          const y = Math.min(Math.max(dest[1] + 22, 90), h - 40);
          label(left ? 4 : w - 4, y, `${left ? "← " : ""}${city.name}${left ? "" : " →"}`, times[city.name] ?? "", left ? "left" : "right");
        }
        ctx.globalAlpha = 1;
      });

      // The studio
      const pulse = reduced ? 0 : (now % 2400) / 2400;
      ctx.beginPath();
      ctx.arc(origin[0], origin[1], 6 + pulse * 26, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(56,189,248,${0.55 * (1 - pulse)})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.fillStyle = "#F0F9FF";
      ctx.shadowColor = "#38BDF8";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(origin[0], origin[1], 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      label(origin[0], origin[1], "Delhi", `Studio · ${times[ORIGIN] ?? ""}`, "left", true);
    };

    let raf = 0;
    let start = 0;
    let visible = true;
    const loop = (t: number) => {
      if (!start) start = t;
      draw(t - start);
      if (!reduced && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    };

    refreshTimes();
    resize();
    kick();

    const clock = setInterval(() => {
      refreshTimes();
      if (reduced) kick();
    }, 20_000);
    const ro = new ResizeObserver(() => {
      resize();
      kick();
    });
    ro.observe(canvas);
    // Stop drawing once the hero scrolls away
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(canvas);
    const onVisibility = () => !document.hidden && kick();
    document.addEventListener("visibilitychange", onVisibility);
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * -14;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * -10;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(clock);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
};

export default WorldMap;
