# Phase E.1 : Rollback plan

## Per-sub-phase rollback

### E.1.1 Reviuzy scrub

- **Disable:** N/A (text replacement, no runtime feature)
- **Revert:** `git revert <commit-sha>` of E.1.1 commit. All Reviuzy references restored.
- **Side effect:** sitemap regen needed if blog post slug renamed. `npm run regen-sitemaps` after revert.

### E.1.2 Neon -50%

- **Disable:** N/A (CSS class change, no runtime feature)
- **Revert:** `git revert <commit-sha>`. Original neon opacity restored.

### E.1.3 Pricing landing condensed + engagement toggle

- **Disable:** N/A (UI condensation, no runtime feature)
- **Revert:** `git revert <commit-sha>`. Long-form pricing restored.
- **Side effect:** new i18n keys orphaned in 16 locale files but no breakage.

### E.1.4 /forfaits-complets sticky grid

- **Disable runtime:** N/A (static page route, no kill switch)
- **Soft hide:** comment out the route in `src/App.tsx` (or wherever routes registered) → 404 at `/forfaits-complets`. CTA on landing also hidden via i18n key flip.
- **Revert:** `git revert <commit-sha>`. Page entirely removed.

### E.1.5 Website construction grid + cancellation calculator

- **Disable:** edit `tier-comparison.ts` data file to set `websiteEligibility: 'hidden'` flag (proposed feature flag pattern)
- **Revert:** `git revert <commit-sha>`

### E.1.6 Tax-incl toggle + 90-day guarantee clause

- **Disable tax toggle:** UI flag in i18n key `showTaxToggle: false` removes the toggle (prices default tax-exclusive)
- **Disable guarantee clause:** UI flag in i18n key `showGuarantee90d: false` removes section
- **Revert:** `git revert <commit-sha>`
- **Important:** if guarantee was advertised to a client, removing it may breach implicit promise. Coordinate with operator (Anthony) before disabling.

### E.1.7 Show differences toggle

- **Disable:** N/A (pure client-side state)
- **Revert:** `git revert <commit-sha>`. Toggle removed, full table always shown.

### E.1.8 Live AI Visibility instant audit endpoint

- **Disable runtime (PRIMARY rollback path):** set Cloudflare Pages env var `INSTANT_AI_VIS_ENABLED=false` → endpoint returns 503 fail-closed within 30s of env propagation. UI form continues to render but submit returns "service temporarily unavailable" message.
- **KV cleanup:** `wrangler kv:key delete --binding=AI_VIS_INSTANT_CACHE --all` to purge cached audit results (safe, regenerates on demand).
- **Rate limiter:** ephemeral KV entries expire 15 min, no manual cleanup needed.
- **Audit log:** ring buffer entries expire 7 days, no manual cleanup.
- **Revert code:** `git revert <commit-sha>` of E.1.8 + delete `functions/api/audit-ai-visibility-instant.ts` + remove smoke gate from `deploy.yml`.

### E.1.9 Quote PDF

- **Disable runtime:** set `QUOTE_PDF_ENABLED=false` → endpoint returns 503 for `payload_type: 'quote_pdf'` requests. Existing audit PDF endpoint behavior unchanged.
- **R2 cleanup:** quote PDFs are ephemeral (5-min expiry, single-use). After 5 min auto-delete, no manual cleanup needed. If immediate purge required: `wrangler r2 object delete --bucket=AUDIT_PDFS --prefix=quote/`.
- **Signed URLs:** invalid HMAC after 5 min expiry, no action needed.
- **Revert code:** `git revert <commit-sha>` removes the quote payload type. Audit PDF synthesis path untouched.

### E.1.10 Help articles

- **Disable:** N/A (static content)
- **Revert:** `git revert <commit-sha>` removes 3 articles + sitemap entry.

## Migration rollback

**Phase E.1 ships ZERO database migrations.** No tables, no RLS changes, no Supabase functions. Section 12 (migration reversibility) is satisfied trivially.

## Env var rollback table

| Env var | Default | Rollback action | Scope |
|---|---|---|---|
| `INSTANT_AI_VIS_ENABLED` | unset/false (fail-closed) | flip to `false` in Cloudflare Pages dashboard, env propagates ~30s | AiLys Pages |
| `QUOTE_PDF_ENABLED` | unset/false (fail-closed) | flip to `false` | AiLys Pages |
| `ANTHROPIC_API_KEY` | (existing, untouched) | rotation does not affect E.1 functionality beyond instant audit (which fails-closed) | AiLys Pages |
| `AUDIT_PDF_HMAC_SECRET` | (existing, untouched) | rotation invalidates active quote URLs (5-min window only) | AiLys Pages |

## Tag rollback

- Phase E.1 will NOT tag in this session (parallel session owns tags).
- Coordinate with parallel session before tagging Phase E.1 milestone.
- Suggested tag at full Phase E.1 completion: `v0.7.0-pricing-godmode-v1`.

## STATE.md rollback

- Phase E.1 will NOT edit STATE.md in this session.
- Phase E.1 progress is documented in `PHASE-E1-HANDOFF.md` (separate file).
- When parallel session completes its work, the operator (Anthony) merges PHASE-E1-HANDOFF.md content into STATE.md as a regular state sync commit.

## Total blast radius

| Sub-phase | Public-facing impact if rolled back | Internal-only impact |
|---|---|---|
| E.1.1 Reviuzy scrub | brand consistency lost | i18n drift |
| E.1.2 Neon -50% | none (cosmetic) | none |
| E.1.3 Landing condensed | UI verbose returns | none |
| E.1.4 /forfaits-complets | new page 404 | route registry |
| E.1.5 Website grid | website CTA missing | none |
| E.1.6 Tax + guarantee | guarantee promise breach risk if advertised | localStorage stale |
| E.1.7 Diff toggle | none (cosmetic) | none |
| E.1.8 Instant audit | prospects see 503 on form | KV cache purge |
| E.1.9 Quote PDF | prospects can't download personalized quote | R2 cleanup |
| E.1.10 Help articles | help center missing 3 articles | sitemap stale |

**Critical sub-phase to monitor on rollback:** E.1.6 (90-day guarantee). If the guarantee is publicly advertised and a client signs up under that promise, removing the clause could be challenged. Operator (Anthony) must explicitly approve before rollback if any client signed up after the guarantee went live.

## Coordinated rollback procedure

If a Phase E.1 commit causes production breakage:

1. **Immediate:** flip relevant env var to `false` (instant audit + quote PDF can be killed in 30s).
2. **Within 5 min:** if breakage is in static UI (pricing page broken), revert the offending commit on a hotfix branch and push to `main` via PR (or directly if operator approves).
3. **Within 1 hour:** post-mortem in `PHASE-E1-HANDOFF.md`. Document what broke, why, what gate missed it, and the fix.
4. **Update CI gates:** if a new gate would have caught the issue, add it before re-enabling.
