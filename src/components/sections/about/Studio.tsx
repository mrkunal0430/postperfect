"use client";

import { INDUSTRIES } from "../../../utils/constants";
import { HOURS_TABLE, STUDIO } from "../../../utils/studio";
import StudioClock from "../../ui/StudioClock";
import { CONTAINER, GUTTER, H2, LEAD } from "../../ui/typography";

/** Where the team is, when it works, and who it works for. */
const Studio = () => (
  <section aria-labelledby="studio-title" className={`${GUTTER} pb-28 md:pb-40`}>
    <div className={`${CONTAINER} rounded-[28px] border border-white/10 bg-[#0D1A2E]/70 p-6 backdrop-blur-md md:p-12 lg:p-16`}>
      <div className="grid gap-14 md:grid-cols-2">
        <div>
          <h2 id="studio-title" className={H2}>
            Based in Delhi, working worldwide
          </h2>
          <p className={`mt-5 max-w-[44ch] ${LEAD}`}>
            Our studio runs on Indian Standard Time and our clients are spread across time zones, so we schedule
            calls to suit your working hours.
          </p>

          <h3 className="mt-10 font-heading text-lg font-semibold text-white">Industries we know well</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {INDUSTRIES.map((ind) => (
              <li key={ind.name} className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-[#E2E8F4]">
                {ind.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-12">
          <StudioClock size="md" />
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-heading text-lg font-semibold text-white">Studio hours (IST)</h3>
              <dl className="mt-3 space-y-1.5 text-sm">
                {HOURS_TABLE.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4">
                    <dt className="text-[#B8CCDD]">{h.days}</dt>
                    <dd className="tabular-nums text-[#E2E8F4]">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-white">Reach us</h3>
              <p className="mt-3 space-y-1 text-sm">
                <a href={`mailto:${STUDIO.email}`} className="block text-[#E2E8F4] hover:text-[#38BDF8]">
                  {STUDIO.email}
                </a>
                <a href={STUDIO.phoneHref} className="block text-[#E2E8F4] hover:text-[#38BDF8]">
                  {STUDIO.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Studio;
