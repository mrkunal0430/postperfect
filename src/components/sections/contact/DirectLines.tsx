"use client";

import { isLiveChatConfigured, openLiveChat } from "../../../utils/liveChat";
import { STUDIO } from "../../../utils/studio";

type Line = { label: string; value: string; note: string; href: string; external?: boolean; onClick?: () => void };

const LINES: Line[] = [
  { label: "WhatsApp", value: STUDIO.phone, note: "Fastest for quick questions", href: STUDIO.whatsappHref, external: true },
  { label: "Email", value: STUDIO.email, note: `Replies ${STUDIO.replyTime} in studio hours`, href: `mailto:${STUDIO.email}` },
  { label: "Phone", value: STUDIO.phone, note: "During studio hours", href: STUDIO.phoneHref },
  // Without Tawk configured, live chat falls back to WhatsApp, so it would only repeat the first row.
  ...(isLiveChatConfigured
    ? [{ label: "Live chat", value: "Open a chat", note: "Talk to the team on this page", href: "#live-chat", onClick: openLiveChat }]
    : []),
];

/** Ways to reach the team without filling in the form. */
const DirectLines = () => (
  <ul className="surface-panel px-5 md:px-8">
    {LINES.map((l) => (
      <li key={l.label}>
        <a
          href={l.href}
          target={l.external ? "_blank" : undefined}
          rel={l.external ? "noreferrer" : undefined}
          onClick={
            l.onClick
              ? (e) => {
                  e.preventDefault();
                  l.onClick?.();
                }
              : undefined
          }
          className="group flex items-baseline justify-between gap-4 border-b border-white/10 py-5 [li:last-child>&]:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
        >
          <span>
            <span className="block text-sm text-[#92AAC0]">{l.label}</span>
            <span className="mt-1 block font-heading text-xl font-semibold tracking-[-0.02em] text-white transition-colors group-hover:text-[#38BDF8] md:text-2xl">
              {l.value}
            </span>
          </span>
          <span className="max-w-[16ch] text-right text-sm text-[#B8CCDD]">{l.note}</span>
        </a>
      </li>
    ))}
  </ul>
);

export default DirectLines;
