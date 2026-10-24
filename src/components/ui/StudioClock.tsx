"use client";

import { useSyncExternalStore } from "react";
import { STUDIO, studioStatus } from "../../utils/studio";

const TICK_MS = 10_000;

const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, TICK_MS);
  return () => clearInterval(id);
};
// The tick number changes every TICK_MS; null on the server, so the clock renders only in the browser.
const getTick = () => Math.floor(Date.now() / TICK_MS);
const getServerTick = () => null;

/** Live studio time in Delhi, whether the team is in, and the next window in the visitor's own time. */
const StudioClock = ({ size = "lg" }: { size?: "lg" | "md" }) => {
  const tick = useSyncExternalStore(subscribe, getTick, getServerTick);
  const status = tick === null ? null : studioStatus(new Date());
  // Only show the visitor's own time when it differs from studio time (IST is UTC+5:30).
  const local =
    status && new Date().getTimezoneOffset() !== -330
      ? status.next.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
      : null;
  const [hh, mm] = status?.time.split(":") ?? ["--", "--"];

  return (
    <div>
      <p className="text-sm text-[#B8CCDD]">Studio time in Delhi</p>
      <p
        className={`mt-2 font-heading font-semibold leading-[0.85] tracking-[-0.06em] text-white tabular-nums ${
          size === "lg" ? "text-[clamp(4.5rem,11vw,10rem)]" : "text-[clamp(3.5rem,7vw,6rem)]"
        }`}
      >
        {hh}
        <span className="animate-pulse text-[#38BDF8] motion-reduce:animate-none">:</span>
        {mm}
        <span className="ml-3 align-top text-[0.18em] tracking-normal text-[#92AAC0]">IST</span>
      </p>
      <p aria-live="polite" className="mt-5 flex items-start gap-2.5 text-[#E2E8F4]">
        <span
          aria-hidden
          className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${status?.open ? "bg-[#22C55E] shadow-[0_0_12px_#22C55E]" : "bg-[#F0B429]"}`}
        />
        <span>
          {!status
            ? "Checking studio hours"
            : status.open
              ? `In the studio now. We usually reply ${STUDIO.replyTime}.`
              : `Out of hours. We're back ${status.nextDay} at ${status.nextTime} IST${local ? `, ${local} your time` : ""}.`}
        </span>
      </p>
    </div>
  );
};

export default StudioClock;
