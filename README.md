# AiLys Agency

LLM Visibility & Optimization agency for local businesses. AEO, GEO, E-E-A-T services. Made in Québec.

Sister product: [Reviuzy](https://www.reviuzy.com) (self-serve review collection SaaS).

## Stack

- Vite + React + TypeScript
- Tailwind + shadcn/ui
- i18n (16 languages, EN/FR-CA primary)
- Supabase edge functions for chat backend (deploy separately, see `supabase/functions/README.md`)
- Cloudflare Workers + static assets for hosting

## Local dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Push to `main`. Cloudflare Pages picks up the build automatically once the project is wired.

