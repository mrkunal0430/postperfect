# PostPerfect

Agency website built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion and React Three Fiber.

## Scripts

```bash
pnpm install
pnpm dev         # http://localhost:3000
pnpm build       # production build (pages are pre-rendered)
pnpm start       # serve the production build
pnpm lint
pnpm typecheck
```

Copy `.env.example` to `.env.local` and fill in the values.

## Structure

```
src/
  app/                  routes — each folder is a URL, page.tsx renders it
    layout.tsx          <html>, fonts, site-wide metadata, SiteShell
    services/[serviceId]/page.tsx   one pre-rendered page per service
  views/                page bodies (client components) rendered by app/*/page.tsx
  components/           layout, sections, ui, three
  utils/constants.ts    site content + types inferred from it
```

`src/views` is not called `pages` on purpose: Next.js reserves `src/pages` for its legacy Pages Router.

## Adding backend features

Server code lives in the same app:

- `src/app/api/<name>/route.ts` for HTTP endpoints (e.g. `POST /api/contact`)
- Server Actions (`"use server"`) for form submissions
- `src/server/` for database clients, models and other server-only modules

Secrets go in `.env.local` without the `NEXT_PUBLIC_` prefix so they never reach the browser.
