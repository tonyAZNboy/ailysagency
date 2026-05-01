# AiLys Agency email addresses

Single source of truth for every `@ailysagency.ca` address used by the site, the codebase, and operations.

## Sending (Resend)

Domain `ailysagency.ca` is verified in Resend (DKIM + SPF + DMARC + Return-Path). Any sub-address sends correctly without further config.

| Address | Used in | Purpose |
|---|---|---|
| `hello@ailysagency.ca` | `functions/api/newsletter-subscribe.ts`, `functions/api/founding-clients-apply.ts` (FROM), `src/components/landing/BookCallSection.tsx`, `src/config/app.ts`, `index.html` (schema.org), `public/llms.txt`, help center | Public contact, newsletter sender, founding-client ops, BookCall mailto |
| `noreply@ailysagency.ca` | `functions/api/audit-pdf.ts`, `audit-pdf-onboarding.ts`, `cron-day1-retry.ts`, `quote-pdf.ts`, `visibility-report-pdf.ts` | Transactional PDF delivery, white-label sender |
| `privacy@ailysagency.ca` | Help center articles (Loi 25 / RGPD) | Legal compliance, data deletion requests |

## Receiving (Cloudflare Email Routing)

Forward destination (current): personal Gmail. Will migrate to Google Workspace `@ailysagency.ca` in Q3 2026.

| Address | Route |
|---|---|
| `hello@ailysagency.ca` | Forward → Gmail |
| `support@ailysagency.ca` | Forward → Gmail |
| `privacy@ailysagency.ca` | Forward → Gmail (legal, mandatory) |
| `anthonyng@ailysagency.ca` | Forward → Gmail |
| `noreply@ailysagency.ca` | Drop |
| Catch-all | Forward → Gmail |

## DNS coexistence

Resend SPF and Cloudflare Email Routing SPF must merge into a single TXT record at the apex:

```
v=spf1 include:_spf.mx.cloudflare.net include:amazonses.com ~all
```

Two separate `v=spf1` records is invalid (RFC 7208). Always merge.

DMARC record (already set by Resend during domain verification): `v=DMARC1; p=none; rua=mailto:...` — leave as is for now. When migrating to Workspace, tighten to `p=quarantine`.

## Operator env vars (Cloudflare Pages)

| Variable | Required | Value |
|---|---|---|
| `RESEND_API_KEY` | Yes | Resend API key (sending scope only) |
| `FOUNDING_NOTIFY_EMAIL` | Yes for founding-client alerts | `anthonyng@ailysagency.ca` (after CF Email Routing live) |
| `RESEND_WEBHOOK_SECRET` | Yes for opens/clicks tracking | `whsec_...` from Resend dashboard > Webhooks |
| `RESEND_WEBHOOK_KILL_SWITCH` | Optional | Set to `true` to silently 200 every webhook (incident response) |

If `FOUNDING_NOTIFY_EMAIL` is not set, founding-client applications still write to Supabase but no email alert is sent (graceful skip, not an error).

## Webhook tracking (opens / clicks / bounces)

Endpoint: `POST /api/resend-webhook` ([functions/api/resend-webhook.ts](../functions/api/resend-webhook.ts))

Setup (operator, one-time):
1. Resend dashboard > Webhooks > Create endpoint
2. URL: `https://www.ailysagency.ca/api/resend-webhook`
3. Subscribe to events: `email.sent`, `email.delivered`, `email.delivery_delayed`, `email.opened`, `email.clicked`, `email.bounced`, `email.complained`, `email.failed`
4. Copy the signing secret (starts with `whsec_`) and set `RESEND_WEBHOOK_SECRET` in Cloudflare Pages env vars (Production + Preview)
5. Redeploy

Verification:
- Svix signature on every request (HMAC-SHA256, 5min timestamp tolerance)
- Idempotency via `svix-id` (UNIQUE on `email_webhook_events.svix_msg_id`)
- Audit log emitted with `svix-id` SHA-256 hash, no recipient PII in logs

Storage: Supabase table `email_webhook_events` (migration [0003](../supabase/migrations/0003_email_webhook_events.sql)). RLS: only `service_role` writes, only `admin_users` row holders read.
