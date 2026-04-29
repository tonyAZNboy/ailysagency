# Phase B.4 — Audit PDF Export

**Spec author:** Claude (autopilot, GSD methodology)
**Spec date:** 2026-04-28
**Effort:** ~10h, sliced into 5 verified sub-phases (B.4.1 → B.4.5), one git commit per sub-phase
**Path decision:** `@react-pdf/renderer` in Cloudflare Pages Function (NOT Browser Rendering API). Rationale below.
**Rollback strategy:** feature flag `pdf_export_enabled` in KV namespace `AUDIT_PDF_RATE_LIMIT`. Set to `"false"` to instantly disable the endpoint with zero deploy needed.

---

## 0. Path decision: `@react-pdf/renderer` vs Cloudflare Browser Rendering API

| Dimension | `@react-pdf/renderer` | Browser Rendering API |
|---|---|---|
| Runtime | Pure JS, runs in Pages Functions natively | Spins up Chromium per request, requires bindings |
| Cost | CPU time only (~10ms-300ms render) | $0.09 per browser session, paid per second after free tier |
| Pixel fidelity | Limited CSS subset, no flexbox until v4, charts must be SVG | Pixel-perfect HTML+CSS+SVG |
| Reliability | Deterministic, no network dependency | Adds external service + per-region availability risk |
| Local dev | `npm run dev` works | Requires Wrangler + Browser Rendering binding emulation |
| Hard rule #9 (gov-grade) | Predictable cost, no third-party billing surprise, easier rate-limit | Adds cost-per-call attack surface; one prompt-injected URL spins up Chromium |
| Rollback | Revert commit, no infra cleanup | Must also unbind Browser Rendering binding from Pages project |

**Decision:** `@react-pdf/renderer` v4.x. The "less visually rich" downside is mitigated by careful brand tokenization (header gradient, sans-serif body, accent colors). For a 10-page B2B audit PDF, polish-by-design beats pixel-fidelity-by-engine.

---

## 1. Sub-phase B.4.1 — Foundation (~1.5h)

### Goal
Install dependency, scaffold endpoint with security primitives, no PDF rendering yet. Endpoint returns `501 Not Implemented` but enforces full validation + rate-limit + audit-log shape.

### Files to create
- `functions/api/audit-pdf.ts` — Pages Function, POST only
- `src/lib/pdfRateLimiter.ts` — KV-backed token bucket (5 PDFs / IP / hour, 50 / email-hash / day)
- `src/lib/pdfAuditLog.ts` — emit structured log (tenant_id, actor_hash, action, ts, payload_hash, no PII in clear)
- `src/lib/pdfRequestSchema.ts` — zod schema for the audit payload (mirror of `AutoAuditEngine` output) + email
- `src/pdf/types.ts` — TypeScript types for PDF data shape

### Files to modify
- `package.json` — add `@react-pdf/renderer` ^4.0.0
- `wrangler.toml` (or Cloudflare Pages Functions config) — declare KV binding `AUDIT_PDF_RATE_LIMIT`, R2 binding `AUDIT_PDFS`

### Security review
- Server-side input validation (zod) at the endpoint boundary, reject non-JSON, reject payload >256KB
- Rate limit: 5 PDFs / IP / hour, 50 / email-hash / day, both keys enforced before rendering
- Output encoding: `Content-Type: application/pdf`, `Content-Disposition: attachment; filename=audit.pdf`, `X-Content-Type-Options: nosniff`
- Secrets: `AUDIT_PDF_HMAC_SECRET` via env (never inline)
- Audit log: write to console.log structured JSON, picked up by Cloudflare Logpush. Entry format: `{ts, action, actor_hash, ip_hash, status, payload_hash, latency_ms}`. No email in clear, only SHA-256(email).

### Test plan
1. `npx tsc --noEmit` clean
2. `npx wrangler pages dev` locally, POST `{}` → 400 (validation error)
3. POST valid payload 6 times in a row from same IP → 6th returns 429
4. Verify audit log line shows up in `console.log` with all required fields

### Commit
`feat(audit): B.4.1 PDF export endpoint scaffold + rate-limit + audit-log`

### User actions required
- **Create R2 bucket** `ailysagency-audit-pdfs` in Cloudflare dashboard (24h object lifecycle policy)
- **Create KV namespace** `AUDIT_PDF_RATE_LIMIT` in Cloudflare dashboard
- **Bind both** in Pages project → Settings → Functions → Bindings
- **Set env var** `AUDIT_PDF_HMAC_SECRET` (64-byte random, generate with `openssl rand -hex 64`)

---

## 2. Sub-phase B.4.2 — PDF template (~3h)

### Goal
Build the 10-page React-PDF document. Renders fully in-browser with mock data via a hidden `/dev/pdf-preview` route (vite dev only, removed at build).

### Files to create
- `src/pdf/AuditReport.tsx` — top-level `<Document>` component
- `src/pdf/pages/01-CoverPage.tsx` — brand header, business name, audit date, score badge
- `src/pdf/pages/02-ExecutiveSummary.tsx` — overall score, top 3 wins, top 3 gaps
- `src/pdf/pages/03-CitationMatrix.tsx` — 6 engines × 3 queries grid
- `src/pdf/pages/04-GbpDeepDive.tsx` — GBP signals breakdown (10 weighted signals)
- `src/pdf/pages/05-CompetitorComparison.tsx` — top 3 competitors, rating + review count gap
- `src/pdf/pages/06-ActionPlan.tsx` — prioritized top 5 fixes with effort + impact
- `src/pdf/pages/07-SchemaSnippets.tsx` — copy-paste JSON-LD blocks
- `src/pdf/pages/08-Glossary.tsx` — AEO, GEO, E-E-A-T, share-of-model, etc.
- `src/pdf/pages/09-NextSteps.tsx` — book-call CTA, free-tier vs paid-tier comparison
- `src/pdf/pages/10-Appendix.tsx` — methodology, raw signals, audit hash, disclaimer
- `src/pdf/components/Header.tsx` — page header with logo + page number
- `src/pdf/components/Footer.tsx` — page footer with brand line + URL
- `src/pdf/components/Score.tsx` — score badge component
- `src/pdf/components/Bar.tsx` — horizontal bar chart (SVG-based)
- `src/pdf/components/Cell.tsx` — table cell
- `src/pdf/components/Bullet.tsx` — bullet list item
- `src/pdf/styles.ts` — StyleSheet.create with brand tokens (colors, fonts, spacing)
- `src/pdf/fonts.ts` — register Inter font from local `/public/fonts/` (PDF fonts must be served same-origin to comply with CSP)

### Files to modify
- `public/fonts/Inter-Regular.ttf`, `Inter-Bold.ttf`, `Inter-SemiBold.ttf` — bundle the Inter font files (pulled from rsms.me/inter, OFL licensed)

### Security review
- No external font URLs (CSP-safe, served from same origin)
- All user-supplied strings (business name, query text) escaped via React-PDF `<Text>` (it escapes by default; verify by including `<script>` in test data and confirming the literal text renders, no execution)
- Total page count locked to 10 (no user control over page count = no DoS via 10K-page request)

### Test plan
1. `npx tsc --noEmit` clean
2. Vitest unit test: render each page component with mock data, assert 0 React-PDF warnings
3. Manual: open `/dev/pdf-preview` in browser, eyeball each page, verify font rendering
4. Inject `<script>alert(1)</script>` into business name field, confirm it renders as literal text in the PDF
5. Confirm PDF file size < 500KB for typical audit (10 pages, no images embedded)

### Commit
`feat(audit): B.4.2 PDF template with 10 branded pages + brand tokens`

---

## 3. Sub-phase B.4.3 — Email gate + R2 delivery (~2h)

### Goal
Wire the endpoint to actually generate the PDF, store in R2 with a random object ID, email the user a one-time signed download link (24h TTL).

### Files to create
- `src/components/AuditPdfDownload.tsx` — modal triggered from `/audit` results page, captures email, posts to `/api/audit-pdf`
- `src/lib/pdfDownloadSigner.ts` — HMAC-SHA256 signed URL generator (Web Crypto API)
- `functions/api/audit-pdf-download/[id].ts` — verifies HMAC, fetches from R2, returns PDF stream

### Files to modify
- `functions/api/audit-pdf.ts` — replace `501` stub with: validate → rate-limit → render PDF (`renderToStream` from `@react-pdf/renderer`) → upload to R2 with random ID → generate signed URL (24h TTL) → email via Resend → return `{ status: "queued" }`
- `src/pages/AuditResultsPage.tsx` — add "Download branded PDF" CTA above existing "Share" buttons
- `src/i18n/translations/en.ts` + 15 locales — add 6 new keys (`audit.pdf.title`, `.cta`, `.modal.email_label`, `.modal.consent`, `.modal.submit`, `.success.title`, `.success.body`)

### Security review
- Email validation: zod email + reject disposable domains (reuse list from `functions/api/founding-clients-apply.ts`)
- Honeypot field on the modal form
- Origin allowlist on the endpoint (only `ailysagency.ca` + `ailysagency.pages.dev` + localhost)
- One-time signed link: HMAC over `{object_id, expires_at}`, signed with `AUDIT_PDF_HMAC_SECRET`, expires_at 24h
- R2 object lifecycle: 24h auto-delete (set in bucket config)
- Resend email: from `noreply@ailysagency.ca`, plain-text body with link, no embedded PDF (avoids 25MB email size limit + reduces phishing surface)
- Audit log: every email send + every download click

### Test plan
1. `npx tsc --noEmit` clean
2. Submit form with valid email → confirm email arrives at inbox within 60s
3. Click email link → confirm PDF downloads, opens in Acrobat / Preview / Chrome PDF viewer
4. Click email link 24h+1m later → confirm 410 Gone (expired signature)
5. Tamper with object_id in URL → confirm 401 (HMAC mismatch)
6. Submit form with disposable email → confirm 400 with friendly error
7. Submit form 6 times → confirm 6th returns 429
8. Audit log shows: email_submit, pdf_generated, email_sent, download_requested, download_succeeded events

### Commit
`feat(audit): B.4.3 email gate + R2 storage + signed download link`

### User actions required
- **Resend domain auth** for `noreply@ailysagency.ca` (SPF/DKIM/DMARC) if not already done
- **Verify** the R2 bucket `ailysagency-audit-pdfs` has 24h lifecycle policy active

---

## 4. Sub-phase B.4.4 — Admin center panel (~1.5h)

### Goal
Per hard rule #11, every new feature gets an admin surface for enable/disable, recent invocations, cost telemetry, per-tier gating.

### Files to create
- `src/pages/admin/PdfExportPanel.tsx` — admin UI (mounted at `/admin/pdf-export`)
  - Enable/disable toggle (writes `pdf_export_enabled` to KV)
  - Recent invocations table (last 50 from audit log, paginated)
  - Cost telemetry: PDFs per day for last 30d, $/day estimate (assume Resend free tier 3K/mo, R2 storage <0.01/mo)
  - Per-tier gating: free (5/mo), Starter (unlimited), Core+ (white-label PDF)
- `functions/api/admin-pdf-stats.ts` — admin endpoint, returns invocation log + telemetry, requires super_admin role
- `src/lib/pdfTierGate.ts` — checks tier from session, returns allowed quota

### Files to modify
- `src/components/AdminLayout.tsx` (or equivalent) — add "PDF Export" nav entry
- `functions/api/audit-pdf.ts` — read `pdf_export_enabled` flag at top of handler, return 503 if disabled

### Security review
- Admin endpoint behind super_admin role check (re-use existing pattern from `admin-pricing` endpoint)
- Tier gate enforced server-side, never trust client claim
- Audit log entries from B.4.1 are queried by aggregating `console.log` lines via Cloudflare Logpush → R2 (or for v1, just show last-50-in-memory ring buffer in KV)

### Test plan
1. `npx tsc --noEmit` clean
2. Open `/admin/pdf-export` as super_admin → see telemetry
3. Open as non-super_admin → 403
4. Toggle disable → POST to `/api/audit-pdf` returns 503
5. Toggle re-enable → POST works again
6. Free-tier user submits 6 PDFs in a month → 6th returns 402 (Payment Required), upgrade CTA shown

### Commit
`feat(audit): B.4.4 admin panel for PDF export + tier gating + telemetry`

---

## 5. Sub-phase B.4.5 — Help articles + i18n + final verification (~2h)

### Goal
Per hard rule #10, ship the help center article in EN + FR-CA before the marketing UI surface goes live. No proprietary AI provider disclosure.

### Files to create
- `src/data/help-articles/audit-pdf-export.ts` — EN + FR-CA hand-authored, then 14 locales fall back to EN per project convention
  - Sections: "What is the audit PDF", "How to download yours", "What's inside the 10 pages", "Email & privacy", "When you'd use this with a client"
  - Phrases like "our AI engine" and "our proprietary score." NEVER "Claude", "Anthropic", "Gemini", model names, or prompt details

### Files to modify
- `src/data/help-articles/registry.ts` — wire the new article
- `src/i18n/translations/en.ts` + 15 locales — finalize all 6 PDF-related keys translated to all 6 majors (EN, FR-CA, ES, ZH, AR, RU)
- `STATE.md` — log the milestone
- `docs/audit-engine-roadmap.md` — move Phase B.4 from "Deferred" to "Shipped"

### Security review
- Help article content reviewed for proprietary disclosure (grep for `Claude`, `Anthropic`, `Opus`, `Haiku`, `GPT`, `Gemini`, `OpenAI` — must all return 0)

### Test plan (this is the FINAL gate, ship-or-no-ship)
1. `npx tsc --noEmit` exit 0
2. `node scripts/audit-translations-deep.mjs` exit 0
3. `node scripts/audit-blog-translations.mjs` exit 0
4. `grep -rn "—" src/i18n/translations/ src/blog/posts/` returns 0 lines
5. `grep -rniE "claude|anthropic|opus|haiku|gpt|gemini|openai" src/data/help-articles/audit-pdf-export.ts` returns 0 lines
6. Open `/audit` results page on mobile viewport (375x812) → "Download PDF" CTA visible, modal fits viewport, form usable
7. Open in Safari iOS, Chrome Android → submit form, receive email, download PDF
8. Open `/help/audit-pdf-export` in EN + FR-CA, verify content renders, no AI provider names visible
9. Switch UI to ES, ZH, AR, RU → CTA + modal copy translated
10. Cloudflare deploy preview green; production deploy green

### Commit
`feat(audit): B.4.5 help articles + i18n + STATE.md milestone log`

### Tag
After all 5 sub-phases land on main: `git tag v0.5.0-pdf-export && git push --tags`

---

## Dependency map

```
B.4.1 Foundation ─┬─> B.4.2 Template ─┬─> B.4.3 Email gate ─┬─> B.4.4 Admin
                  │                    │                     │
                  └────────────────────┴─────────────────────┴─> B.4.5 Help + verify
```

Strict serial. No parallelism (one developer, autopilot mode, hard-rule #1 demands per-phase verification).

---

## User actions blocking autopilot progress

Per CLAUDE.md prohibited-actions list, I CANNOT:
- Create the R2 bucket (requires Cloudflare account access)
- Create the KV namespace (same)
- Set the `AUDIT_PDF_HMAC_SECRET` env var (same)
- Configure Resend domain auth (requires DNS + Resend dashboard)

**Therefore:** I will execute B.4.1 + B.4.2 + parts of B.4.3 + B.4.4 + B.4.5 that don't depend on the bindings. The endpoint will return 503 with a clear error message until the bindings are configured. Once you complete the user actions list, the endpoint flips to live with no code change.

---

## Open questions for the product owner (decisions needed before B.4.3)

1. **Tier gating threshold:** I propose free tier = 5 PDFs/month, Starter = unlimited, Core+ = unlimited + white-label (logo replacement). Confirm or override.
2. **Email branding:** PDF email will say "Your AiLys audit report is ready." sender `noreply@ailysagency.ca`. Confirm.
3. **PDF retention:** propose 24h R2 lifecycle. Once expired, user must re-run audit. Acceptable?
4. **Logo asset:** PDF cover page needs the AiLys logo. Confirm `public/logo-ailys-stacked.svg` (or whichever) is the canonical mark.

If no answer arrives, I will use the proposed defaults and flag in the commit message.
