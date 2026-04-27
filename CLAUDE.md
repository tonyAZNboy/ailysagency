# AiLys Agency — Claude operating rules

## Hard rules (non-negotiable)

1. **Always test what you deliver, every time.** Typecheck is not testing. Open the actual feature in the browser, click the actual button, verify the actual output. Before claiming a task is done, you must have demonstrated it working — not just compiled.
2. **No em-dashes (—) anywhere.** Use periods, commas, colons, parentheses, or "and" / "et" instead.
3. **No AI-text fingerprints.** Avoid "It's not just X, it's Y", "Whether you're X or Y", "leverage", "robust", "delve", excessive triadic listings ("X, Y, and Z").
4. **Brand names stay in English (or original Latin script) across all locales:** AiLys, ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot, Yelp, BBB, Wikidata, Wikipedia, Schema.org, Reviuzy, GBP, AEO, GEO, E-E-A-T, NAP, SEO, FAQ, NFC.
5. **Long-term solutions only. No band-aids.** If a fix needs server-side validation, write it. If a feature needs i18n, wire it from day one. Don't ship hardcoded English strings expecting "we'll translate later" — it's never later.
6. **Security-first by default.** Server-side input validation everywhere, no raw SQL, rate-limiting on every public API endpoint, CSP headers, no PII without consent, double-opt-in for newsletter, audit-trail consent IDs without PII.
7. **Verify agent output 100%.** When dispatching agents (general-purpose, Explore, Plan), do NOT trust their summaries. Always verify with `grep`, `tsc`, browser tests, and explicit assertions before claiming success.
8. **Translation completeness is binary.** A page is not "shipped" until all 6 majors render in the user's selected language: EN, FR-CA, ES, ZH, AR, RU.

## Project posture

- **Site:** AiLys Agency (https://www.ailysagency.ca, deployed at ailysagency.pages.dev)
- **Stack:** Vite + React + TypeScript + Tailwind + shadcn/ui, deployed on Cloudflare Pages
- **Sister product:** Reviuzy SaaS (https://www.reviuzy.com)
- **Home market:** Quebec, bilingual EN/FR-CA in-house
- **Pricing:** $300 / $600 / $1,200 / $1,299 CAD per month, 4 tiers, month-to-month, 30-day satisfaction guarantee

## i18n discipline

- EN is canonical schema. FR-CA is full coverage. ES/ZH/AR/RU should be full coverage but secondary.
- Type system enforces `Record<SupportedLang, typeof en>` but `strict: false` in tsconfig means missing keys silently fall through. **Always grep for the key to verify it exists in every locale, don't trust typecheck alone.**
- Hardcoded strings in components are forbidden after phase 1 i18n was completed. Any new component must use `useLang()` from day one.
- Translation queue tracked at `docs/i18n-translation-queue.md`.

## Deployment

- Cloudflare Pages auto-deploys from main branch. Manual deploys via `wrangler pages deploy dist --project-name=ailysagency`.
- All `/api/*` routes are Cloudflare Pages Functions in `functions/api/`.
- ENV vars to set in Cloudflare Pages dashboard: `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `VITE_GTM_ID`, `VITE_META_PIXEL_ID`, `VITE_LINKEDIN_PARTNER_ID`, optional KV bindings `CITATION_CACHE`, `AI_VIS_CACHE`.
- After every deploy, verify the live site at /, /fr, /es, /zh, /ar, /ru. If any section is in the wrong language, redeploy.

## Test cadence

Before declaring any task complete:
1. Run `npx tsc --noEmit` (typecheck)
2. Open the affected page(s) in the browser preview
3. Click the affected control / submit the affected form / verify the affected output
4. Switch the language to a non-EN locale and verify translation works
5. Test on mobile viewport (375x812) for any UI changes
6. Document the result before claiming done
