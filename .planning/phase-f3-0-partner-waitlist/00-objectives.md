# F3.0 — Partner Program waitlist (validating MVP before full white-label)

## Why this sub-phase exists (vs original F3.1)

The 2026-05-02 fidelity audit (per ISO-GSD Section 3) caught that
F3.1 as originally planned assumed AiLys is multi-tenant SaaS with a
`tenants` table. Reality: AiLys is the marketing site + operator
admin; Reviuzy is the multi-tenant SaaS. Migrating AiLys into a
meta-SaaS is 8 sessions of speculative architecture without a
single partner agency commitment.

F3.0 is a 1-session MVP that opens the partner-program channel,
validates demand, and produces real signal (waitlist signups,
application quality) before committing 8 sessions. Once 3+ partner
agencies apply with serious intent, F3.1+ kicks in to build the
real white-label.

## Business goal

Open the partner-agency channel publicly. Collect intent. Gate the
full white-label build on validated demand.

## Hours saved + revenue uplift

- **Direct revenue uplift:** zero in MVP. This is a demand-validation
  surface.
- **Indirect:** filters the 8-session F3 white-label build behind
  validated demand. If 0 partners apply in 90 days, the F3 full
  build is scrapped and the 8 sessions invest elsewhere. Net: 8
  sessions of speculative architecture potentially saved.
- **Strategist hours saved:** zero in MVP. F3 full build claims
  ~20h/mo per partner; this MVP just gates that future return.

## Who benefits

- **AiLys operator:** sees real partner application volume + quality
  before committing engineering time
- **Prospective partner agencies:** a clear "we are open to partner
  applications" signal + simple application form
- **Future F3 builders:** validated demand or validated absence of
  demand

## Deliverable scope (this sub-phase only)

**AiLys side (this repo, single session):**

1. **Landing page** `/agencies/partner-program` + `/fr/agencies/partner-program`
   (and 14 secondary locales falling back to EN per i18n queue
   convention). Page sections:
   - Hero with proposition (white-label SaaS, rev share, your brand)
   - Who it is for (Quebec/Canadian agencies)
   - What partners get (concrete deliverables list)
   - Application CTA (form below)
   - FAQ (4-5 Q+A)
   - Application form (agency name, contact name, contact email,
     city, current client count, expected referrals/year, brief
     pitch)

2. **Edge function** `functions/api/partner-application.ts`:
   - POST validates input (zod or hand-written validators in same
     style as existing `audit-request.ts` and `newsletter-subscribe.ts`)
   - Honeypot field
   - Rate limit (KV token bucket; reuse existing pattern from
     `audit-request.ts`)
   - Inserts into `partner_applications` table (new migration 0005)
   - Sends Resend confirmation email to applicant + Resend internal
     alert to operator
   - Returns 202 + tracking ID on success

3. **Migration 0005** `supabase/migrations/0005_partner_applications.sql`:
   - `partner_applications` table: id, agency_name, contact_name,
     contact_email, city, language, current_client_count,
     expected_referrals_per_year, pitch, source, status enum
     (new/contacted/qualified/converted/declined), created_at,
     contacted_at, notes, visitor_session_id
   - Index on status + created_at desc
   - RLS: anon insert allowed via service role on edge fn; admin read
     via existing operator profile policy

4. **Admin surface** extend `src/pages/admin/AdminLeads.tsx` (or new
   `AdminPartnerApplications.tsx` if cleaner) to:
   - List applications most-recent first
   - Status update inline
   - Notes field
   - CSV export

5. **Help articles EN + FR-CA** in `src/data/help-articles.ts`:
   - `partner-program-overview`
   - `how-to-apply-as-a-partner-agency`
   - Per hard rule #10: do NOT name Anthropic, Stripe Connect details,
     Cloudflare specifics, internal scoring, white-label build status

6. **i18n** new keys (Section 8 enforcement): all 16 locales updated.
   EN canonical + FR-CA full + 14 EN-placeholder.

7. **Sitemap + llms.txt** entries for the new pages.

## Cost estimate per invocation

- **Resend confirmation + internal alert:** ~$0.0002/application
  (free tier covers 3,000/mo)
- **KV rate-limit reads/writes:** ~$0/application (free tier)
- **Edge fn invocation:** Cloudflare Pages Functions free tier
- **Total:** marginal cost per application $0.0002

Not an admin-panel cost-telemetry case; the cost is too small to
warrant a $/day counter. Volume guardrail: hard cap 50 applications/day
via rate-limit middleware (above that, return 429).

## Why this dep (Section 10)

**Net new deps: ZERO.** Reuses:
- Existing Resend SDK (already in functions/lib/email.ts pattern)
- Existing rate-limit primitive (functions/api/audit-request.ts)
- Existing zod-style validators (functions/api/newsletter-subscribe.ts)
- Existing Supabase migrations pattern
- Existing AdminLeads UI components

## ISO gates required (per CLAUDE.md hard rule #14)

- [ ] Server-side input validation (zod or hand-validators)
- [ ] Rate-limit (KV token bucket, hard cap 50/day)
- [ ] Audit log entry (tenant_id n/a since pre-account; visitor_session_id
      + ip_hash + payload_hash; ZERO PII in clear in audit logs)
- [ ] CORS lockdown (no `*` origin)
- [ ] Honeypot field on form (existing pattern)
- [ ] RLS policy on `partner_applications`
- [ ] Migration `down` script
- [ ] Multi-tenant isolation N/A (no tenant_id on this table; admin-only)
- [ ] DRY_RUN env support on edge fn
- [ ] Help articles EN + FR-CA before public launch (hard rule #10)
- [ ] Admin surface live (hard rule #11): list + status + notes
- [ ] All 16 locales updated (Section 8)
- [ ] STATE.md updated same commit
- [ ] Smoke script `smoke-partner-application.mjs` (~15 cases:
      validation, rate-limit, honeypot, happy path, missing fields,
      malformed email, oversized pitch, etc.) wired in deploy.yml as
      Gate 22
- [ ] Live curl: 1 happy path + 3 failure modes (validation, method,
      honeypot)
- [ ] Mobile-first 375x812 + 768x1024 (hard rule #13)
- [ ] FR-CA locale switch verified

## Time-box estimate

**~4 hours focused work** (one session). 2× escape hatch = 8 hours.
If exceeded: stop, return diff, re-spec with user.

## Out of scope (deferred to F3.1 if validated)

- Multi-tenant `agency_partners` table (the actual partner records,
  not just applications)
- Custom domain via Cloudflare for SaaS
- Stripe Connect billing integration
- Branded PDF generator
- `/partner-portal` dashboard (sub-clients view)
- Cross-repo Reviuzy `agency_partner_id` column
- Partner-admin RBAC role
- Sub-client invitation flow

These all require validated demand first.
