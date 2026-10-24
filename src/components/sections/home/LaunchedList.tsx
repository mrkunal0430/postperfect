import { LIVE_WORK } from "../services/data";

/** Products we've shipped, set as a line of names. Hovering one quiets the rest. */
const LaunchedList = () => (
  <section aria-labelledby="launched-title" className="px-4 py-20 md:px-10 md:py-28">
    <div className="mx-auto max-w-[1440px]">
      <h2 id="launched-title" className="text-base text-text-secondary">
        Products and sites we&apos;ve built, live today
      </h2>
      <ul className="group/list mt-8 flex flex-wrap items-baseline gap-x-[0.55em] gap-y-3 font-heading text-[clamp(1.9rem,4.6vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
        {LIVE_WORK.map((p) => (
          <li key={p.url}>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group/item relative text-text-primary transition-[color,opacity] duration-300 hover:text-accent-glow focus-visible:text-accent-glow focus-visible:outline-none group-hover/list:opacity-30 hover:!opacity-100"
            >
              {p.title}
              <span className="absolute left-0 top-full mt-1 whitespace-nowrap font-body text-sm font-normal tracking-normal text-text-muted opacity-0 transition-opacity group-hover/item:opacity-100 group-focus-visible/item:opacity-100">
                {p.category}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default LaunchedList;
