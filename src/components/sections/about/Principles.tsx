import { VALUES, WHY_CHOOSE_US } from "../../../utils/constants";
import { CONTAINER, GUTTER, H2, LEAD } from "../../ui/typography";

/** What we believe (values) and what that means for clients day to day. */
const Principles = () => (
  <>
    <section aria-labelledby="values-title" className={`${GUTTER} py-28 md:py-40`}>
      <div className={CONTAINER}>
        <h2 id="values-title" className={`${H2} max-w-3xl`}>
          What we hold ourselves to
        </h2>
        <ul className="mt-14 border-t border-white/10">
          {VALUES.map((v) => (
            <li
              key={v.title}
              className="grid gap-3 border-b border-white/10 py-8 md:grid-cols-[1fr_1fr] md:items-baseline md:gap-10 md:py-10"
            >
              <h3 className="font-heading text-[clamp(2.25rem,5.5vw,5rem)] font-semibold leading-none tracking-[-0.05em] text-white">
                {v.title}
              </h3>
              <p className="max-w-[46ch] text-lg leading-relaxed text-[#B8CCDD]">{v.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section aria-labelledby="working-title" className={`${GUTTER} pb-28 md:pb-40`}>
      <div className={`${CONTAINER} grid gap-12 md:grid-cols-[0.8fr_1.2fr] lg:gap-24`}>
        <div>
          <h2 id="working-title" className={H2}>
            What working with us is like
          </h2>
          <p className={`mt-5 max-w-[40ch] ${LEAD}`}>How a project with us runs, from the first call to long after launch.</p>
        </div>
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {WHY_CHOOSE_US.map((w) => (
            <li key={w.title} className="border-t border-white/10 py-7">
              <h3 className="font-heading text-xl font-semibold text-white">{w.title}</h3>
              <p className="mt-2 leading-relaxed text-[#B8CCDD]">{w.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </>
);

export default Principles;
