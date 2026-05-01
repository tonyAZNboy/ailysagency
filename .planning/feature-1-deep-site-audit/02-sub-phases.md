# Feature 1 sub-phase breakdown

## F1.1 — DB schema + RLS + smoke

**Repo:** Reviuzy
**Time-box:** 1 session (~6h)

- Migration `0010_audit_web_runs_findings.sql`:
  - `audit_web_runs` (id, tenant_id FK, run_id FK audit_runs nullable, root_url, status enum, started_at, completed_at nullable, score numeric nullable, pages_crawled int default 0, error_count int default 0)
  - `audit_web_findings` (id, run_id FK CASCADE, category enum, severity enum, page_url text, finding_key text, finding_value jsonb, recommendation text, fix_effort_hours numeric)
  - RLS: SELECT WHERE tenant_id = current_tenant_id(), INSERT/UPDATE service_role only
  - Down migration: `DROP TABLE` for both (test via roundtrip)
- Smoke test `smoke-deep-audit-rls.mjs`: 8 cases (tenant A cannot read tenant B, anon cannot insert, service role can write, RLS active on findings via run_id join, etc.)

## F1.2 — `crawl-website` edge fn

**Repo:** Reviuzy
**Time-box:** 1 session (~5h)

- Input: `{ run_id, root_url }` (zod)
- Sitemap-first: fetch /sitemap.xml, fall back to BFS from root_url
- Constraints: max 50 pages, max 3s per page, parallel batch of 5, robots.txt respected via `robots.txt parser`
- Output: `{ pages: [{ url, status, html_size, schema_present, errors }] }` written to `audit_web_runs.pages_crawled` + per-page `audit_web_findings`
- Smoke `smoke-crawl-website.mjs`: 10 cases (valid sitemap, no sitemap fallback, robots.txt deny, 404 pages, redirect chains, parallel cap, 50-page hard cap, 3s timeout, malformed URL, off-domain link skip)

## F1.3 — `analyze-page` + `score-audit` edge fns

**Repo:** Reviuzy
**Time-box:** 1 session (~5h)

- `analyze-page`: input `{ url }`, runs PageSpeed Insights API call + custom checks (title length, meta desc, H1 count, alt coverage, canonical, hreflang, Schema.org JSON-LD shape lint). Writes findings.
- `score-audit`: aggregates findings, computes 6-layer composite (perf, seo, schema, security, accessibility, ai-readiness) weighted, ranks top-20 by `severity_score / fix_effort_hours`
- Smoke `smoke-analyze-page.mjs` (12 cases) + `smoke-score-audit.mjs` (8 cases)

## F1.4 — `generate-deep-audit-pdf` edge fn (EN + FR)

**Repo:** Reviuzy
**Time-box:** 1 session (~6h)

- 12-page PDF mirroring existing audit-pdf pattern: cover, exec summary, perf, SEO on-page, schema, AI-readiness, security, accessibility, top-20 actions, glossary, next steps, appendix
- EN + FR copy gated on `req.lang`; user-provided strings pass through `sanitize.ts` ASCII fold (per existing audit-pdf pattern); page numbering recompute on data-driven page skips
- Smoke `smoke-deep-audit-pdf-render.mjs` (10 cases including EN+FR parity, sparse data, all-perfect site, action plan empty fallback)
- HMAC signed download URL or Resend attachment fallback (mirror audit-pdf pattern)

## F1.5 — Admin panel + cron + AiLys help articles

**Repo:** Reviuzy + AiLys
**Time-box:** 1 session (~6h)

- Reviuzy `/admin/clients/[tenantId]/deep-audit`: trigger run button, run history table, findings drill-down by category/severity, "mark fixed" with audit log
- Public client widget on existing dashboard: composite score card with sparkline + top-3 actions
- Cron registration with `pg_cron` per tier (weekly Growth+, monthly Core, quarterly Starter); honors DRY_RUN
- AiLys help articles EN+FR-CA in `src/data/help-articles/`:
  - `deep-site-audit-explained`
  - `reading-the-deep-audit-score`
  - `prioritizing-deep-audit-fixes`
- AiLys cross-repo proxy `deep-audit-stats-proxy` (mirror audit-pdf-stats-proxy)
- STATE.md update + tag `v0.13.0-deep-site-audit-complete`

## Dependencies between sub-phases

F1.1 → F1.2 → F1.3 → F1.4 → F1.5 (strict serial; each depends on prior sub-phase shipping production-clean)

## Definition of Done (Section 13)

- [ ] All 5 sub-phases shipped + tagged
- [ ] Tier A client (Growth+) sees Deep Audit score in their dashboard within 7 days of activation
- [ ] PDF generates in EN + FR, byte-identical structure, only copy differs
- [ ] Cost telemetry shows <$5/mo total at 50 active tenants
- [ ] Help center articles live before UI surface
- [ ] Admin panel live with run trigger + drill-down + mark-fixed
- [ ] Smoke tests in CI workflow `.github/workflows/deploy.yml`
