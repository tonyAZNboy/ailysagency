# Phase E.1 : Test matrix per sub-phase

| Sub-phase | Unit tests | Smoke cases | Manual gates |
|---|---|---|---|
| E.1.0 GSD planning | n/a | n/a | tsc no-op, STATE.md update lives in handoff doc only |
| E.1.1 Reviuzy scrub | n/a | grep `Reviuzy` in `src/i18n/translations/*.ts` + `src/components/landing/*` + `src/pages/Index.tsx` + `public/sitemap*.xml` returns 0 (allowlist: blog post URLs that contain `reviuzy` slug only if renamed) | tsc, i18n parity audit, em-dash sweep, build, browser preview at `/`, `/fr`, `/pricing` 375x812 + 768x1024 verify replacement strings render coherently |
| E.1.2 Neon -50% | n/a | n/a | tsc, build, browser preview before/after screenshots at 375x812 + 768x1024 + 1280x800 to confirm visual softening (no text contrast lost) |
| E.1.3 Landing condensed + engagement toggle | n/a | i18n parity audit (16 locales) for ~12 new keys | tsc, i18n audit, em-dash sweep, build, manual click each engagement option (mensuel/annuel/biennal), verify Starter+Core biennial disabled with tooltip, verify FR-CA strings render, mobile + tablet viewport |
| E.1.4 /forfaits-complets sticky grid | n/a | i18n parity audit (~80 keys) | tsc, i18n audit, em-dash sweep, build, scroll page on 375x812 + 768x1024 + 1280x800 + 1920x1080 verify sticky header + shadow on scroll, swipe horizontal mobile, click each "Choisir" CTA, click category collapse/expand, verify Core "POPULAIRE" badge, verify FR-CA + EN, verify direct URL + #anchors work |
| E.1.5 Website construction grid + cancellation calculator | n/a | i18n parity (~30 keys) | tsc, i18n, em-dash, build, slider 0-7 months recomputes fee correctly per cards (Vitrine 800, PME 1500, Commerce 3000), tier-minimum badges visible, "Ce qui n'est PAS inclus" section renders, mobile + tablet |
| E.1.6 Tax-incl toggle + 90-day guarantee | n/a | i18n parity (~15 keys) | tsc, i18n, em-dash, build, toggle TPS+TVQ recomputes all visible prices correctly (×1.14975), localStorage persistence verified across reload, 90-day guarantee clause text + eligibility badges on Core/Growth/Agency, FR-CA + EN |
| E.1.7 Show differences toggle | n/a | n/a | tsc, build, click toggle hides ~30 of 60 rows where all 4 values identical, click again shows all rows, mobile + tablet |
| E.1.8 Live AI Visibility instant audit | n/a (smoke covers) | new smoke `scripts/smoke-instant-ai-vis.mjs` 12 cases: (1) valid input → 200 + score JSON, (2) missing business name → 400, (3) invalid URL → 400, (4) prompt injection regex reject → 400, (5) SSRF attempt URL → 400 reject, (6) kill switch off → 503, (7) rate limit exceeded → 429, (8) cache hit returns same payload, (9) cache miss after 24h, (10) Anthropic error → fallback message, (11) malformed Anthropic response → fallback, (12) audit log entry written | tsc, all i18n + em-dash + build, live curl 4 cases (happy + 3 fail), browser submit form on `/forfaits-complets`, FR-CA + EN result rendering, admin panel new "Instant Audits" tab visible with last 50 + cost telemetry + kill switch toggle, help article live |
| E.1.9 Quote PDF | n/a | new smoke `scripts/smoke-quote-pdf.mjs` 10 cases: (1) Starter monthly → correct PDF struct, (2) Core annual -15% → correct total, (3) Growth biennial -20% → correct total, (4) Agency tier → correct, (5) tax-incl total = base × 1.14975, (6) build cost line item present when website tier eligible, (7) HMAC-signed download URL works, (8) URL expires after 5 min, (9) URL is single-use, (10) fail-closed without `QUOTE_PDF_ENABLED=true` → 503 | tsc, i18n, em-dash, build, live curl quote endpoint (happy + 3 fail), browser flow generate-and-download from `/forfaits-complets`, FR-CA + EN, admin shows quote PDF generation count, help article live |
| E.1.10 Help articles | n/a (existing blog audit covers) | existing `scripts/audit-blog-translations.mjs` validates EN→FR-CA parity + meta + headings + em-dash + AI fingerprints + brand preservation + AI provider leak | 3 articles render correctly EN + FR-CA at `/help/...` URLs, sitemap regenerated, mobile + tablet |
| E.1.11 Final tag + handoff | n/a | n/a | manual: PHASE-E1-HANDOFF.md updated with all commit hashes, smoke pass counts, env vars required, locale parity report, no STATE.md edit (parallel session owns) |

## CI gates added by Phase E.1

| Gate # | Sub-phase | Script | Mandatory? |
|---|---|---|---|
| 11 (assuming next available) | E.1.8 | `npx tsx scripts/smoke-instant-ai-vis.mjs` | mandatory |
| 12 | E.1.9 | `npx tsx scripts/smoke-quote-pdf.mjs` | mandatory |

⚠️ **Coordination required:** parallel session may also add gates 11-13. Check `.github/workflows/deploy.yml` before adding to avoid number collision. Use next-available number at merge time.

## Browser viewports gates (per CLAUDE.md hard rule #13 mobile-first)

Every UI sub-phase must be verified at:
- 375 × 812 (iPhone SE / 14)
- 390 × 844 (iPhone 15)
- 412 × 915 (Pixel 8)
- 768 × 1024 (iPad portrait)
- 1280 × 800 (laptop)
- 1920 × 1080 (desktop)

For E.1.4 sticky grid specifically: also test 360 × 740 (Android low-end) to ensure horizontal swipe + sticky tier nav pill works.

## i18n parity gates

After each sub-phase that adds keys: run `node scripts/audit-translations-deep.mjs` and confirm exit 0. The script validates that all 16 locale files contain every key. New keys are placeholder EN value in 14 secondaries with `// TODO i18n` per CLAUDE.md hard rule #4 + #8.

## Em-dash gate

After each sub-phase: `grep -rn ":" src/i18n/translations/ src/blog/posts/ functions/ | wc -l` must return 0. CLAUDE.md hard rule #2.

## Reviuzy mention gate (Phase E.1 specific, NOT in skill defaults)

After E.1.1: `grep -rin "reviuzy" src/i18n/translations/ src/components/ src/pages/Index.tsx public/sitemap*.xml | wc -l` must return 0. Allowlist: blog post legacy URLs IF redirected with 301, but recommended to fully rename.
