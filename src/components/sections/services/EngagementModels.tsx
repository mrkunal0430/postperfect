import { ENGAGEMENT_MODELS, ENGAGEMENT_ROWS } from "./data";

/** Ways to work with us, compared row by row (a table on desktop, stacked lists on mobile). */
const EngagementModels = () => (
  <section aria-labelledby="models-title" className="px-4 py-28 md:px-10 md:py-36">
    <div className="mx-auto max-w-[1440px]">
      <h2
        id="models-title"
        className="max-w-3xl font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white"
      >
        Three ways to work with us
      </h2>
      <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-[#B8CCDD]">
        Every engagement is covered by an NDA and a written scope. Pricing depends on scope, so you get a fixed quote
        after a free consultation.
      </p>

      <table className="mt-14 hidden w-full table-fixed border-collapse text-left md:table">
        <thead>
          <tr>
            <td className="w-[18%]" />
            {ENGAGEMENT_MODELS.map((m) => (
              <th key={m.name} scope="col" className="border-b border-white/15 px-6 pb-6 align-bottom">
                <span className="font-heading text-2xl font-semibold tracking-[-0.02em] text-white">{m.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ENGAGEMENT_ROWS.map((row, r) => (
            <tr key={row} className="transition-colors hover:bg-white/[0.03]">
              <th scope="row" className="border-b border-white/[0.07] py-6 pr-6 align-top text-sm font-normal text-[#92AAC0]">
                {row}
              </th>
              {ENGAGEMENT_MODELS.map((m) => (
                <td key={m.name} className="border-b border-white/[0.07] px-6 py-6 align-top leading-relaxed text-[#E2E8F4]">
                  {m.cells[r]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-12 space-y-10 md:hidden">
        {ENGAGEMENT_MODELS.map((m) => (
          <div key={m.name} className="border-t border-white/15 pt-6">
            <h3 className="font-heading text-2xl font-semibold text-white">{m.name}</h3>
            <dl className="mt-4 space-y-4">
              {ENGAGEMENT_ROWS.map((row, r) => (
                <div key={row}>
                  <dt className="text-sm text-[#92AAC0]">{row}</dt>
                  <dd className="mt-1 text-[#E2E8F4]">{m.cells[r]}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default EngagementModels;
