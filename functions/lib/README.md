# `functions/lib/` - Shared backend helpers

Canonical helpers used across Cloudflare Pages Functions. Every entry
below replaces what used to be inline copies spread across edge fns.
**Always import from here. Never inline.** A CI gate
(`scripts/smoke-no-inline-duplicates.mjs`, Gate 35) enforces this.

## Quick reference (import paths)

```ts
// HTTP / response shape
import { jsonResponse } from "../lib/jsonResponse";
import { isAllowedOrigin } from "../lib/origin";

// Logging + observability
import { makeEmit } from "../lib/structuredLog";
import { captureServerError } from "../lib/serverError";

// Crypto / HMAC primitives (auth-critical)
import { sha256Hex, bytesToHex } from "../lib/crypto";
import { hexToBytes, importHmacKey, constantTimeEqualBytes } from "../lib/hmac";
import { constantTimeEq } from "../lib/rateLimit"; // string variant

// Form input validation
import { isValidEmail, isDisposableEmail } from "../lib/email";
import { clip, clipUntrimmed } from "../lib/stringClip";

// HTML / templating safety
import { escapeHtml } from "../lib/htmlEscape";

// Rate limiting + KV
import { checkRateLimit } from "../lib/rateLimit";

// Supabase REST
import { insertSupabaseRow } from "../lib/supabaseInsert";

// Cron orchestration
import { withCronGuard } from "../lib/cronGuard";

// Service-to-service HMAC auth
import { verifyServiceRequest, signServiceRequest } from "../lib/serviceAuth";

// Webhook signature verification
import { verifySvixSignature } from "../lib/svixHmac";

// Unsubscribe token signing/verification
import { signUnsubscribeToken, verifyUnsubscribeToken } from "../lib/unsubscribeToken";

// Audit PDF download URL signing
import { signDownload, verifyDownload, newObjectId } from "../lib/pdfHmac";

// Branded email rendering + delivery logging
import { renderEmail } from "../lib/emailTemplate";
import { sendAndLog, updateEmailSendByProviderId } from "../lib/emailLog";

// PDF rendering
import { renderAuditPdf } from "../lib/pdf/AuditReport";
import { renderQuotePdf, computeQuote } from "../lib/pdf/Quote";
import { renderVisibilityReportPdf } from "../lib/pdf/VisibilityReport";
```

## Lib catalogue

### `crypto.ts` - SHA-256 hex hashing
- `sha256Hex(input: string): Promise<string>` - 64-char lowercase hex digest
- `bytesToHex(bytes: Uint8Array): string` - hex encode any byte array
- Smoke: Gate 28 (`smoke-crypto.mjs`, 19 cases including NIST FIPS 180-4 reference vectors)

### `email.ts` - Form-submit email validation
- `isValidEmail(email: string): boolean` - regex + length 5..254 + disposable domain reject
- `isDisposableEmail(email: string): boolean` - standalone disposable check
- `DISPOSABLE_DOMAINS: ReadonlySet<string>` - 9 entries
- Smoke: Gate 30 (`smoke-email.mjs`, 37 cases)

### `hmac.ts` - Auth-critical HMAC primitives
- `hexToBytes(hex: string): Uint8Array` - strict hex parsing
- `importHmacKey(secretHex: string): Promise<CryptoKey>` - HMAC-SHA256 key with sign+verify usages
- `constantTimeEqualBytes(a: Uint8Array, b: Uint8Array): boolean` - byte compare
- Smoke: Gate 34 (`smoke-hmac.mjs`, 21 cases)

### `htmlEscape.ts` - HTML entity escape
- `escapeHtml(value: unknown): string` - 5-char entity escape (`& < > " '`); null/undefined tolerated
- Smoke: Gate 27 (`smoke-html-escape.mjs`, 20 cases)

### `jsonResponse.ts` - Secure-default JSON Response builder
- `jsonResponse(body: unknown, status: number, extraHeaders?: Record<string, string>): Response`
- Defaults: `Content-Type: application/json; charset=utf-8`, `X-Content-Type-Options: nosniff`, `Cache-Control: no-store`
- Smoke: Gate 33 (`smoke-json-response.mjs`, 26 cases)

### `origin.ts` - CORS allowlist check
- `isAllowedOrigin(request: Request, env: { ALLOWED_ORIGINS?: string }): boolean` - falls back to canonical AiLys domains
- `DEFAULT_ALLOWED_ORIGINS: string` - 3 canonicals (www, apex, pages.dev)
- Smoke: Gate 29 (`smoke-origin.mjs`, 21 cases)

### `rateLimit.ts` - KV-backed token bucket + crypto helpers
- `checkRateLimit(env, config, identityHash): Promise<RateLimitDecision>`
- `constantTimeEq(a: string, b: string): boolean` - string-variant constant-time compare
- `sha256Hex` - re-exported from `./crypto` for back-compat
- Smoke: Gate 23 (`smoke-rate-limit.mjs`, 18 cases)

### `serverError.ts` - Sentry-lite error capture
- `captureServerError(env, payload): Promise<{ logged, persisted, alerted }>` - dual-channel: Supabase audit_log persist + Resend operator alert on ERROR/FATAL
- Severity gating: `warn` never alerts; `error`/`fatal` always do
- Smoke: Gate 25 (`smoke-server-error.mjs`, 34 cases)

### `stringClip.ts` - String trim + length cap
- `clip(value, max): string | null` - trims, returns null on empty (default)
- `clipUntrimmed(value, max): string | null` - preserves whitespace
- Smoke: Gate 32 (`smoke-string-clip.mjs`, 25 cases)

### `structuredLog.ts` - JSON Logpush emitter factory
- `makeEmit(component: string): (line: Record<string, unknown>) => void`
- Component field is FIRST in serialized output (matters for grep/Logpush prefix)
- Smoke: Gate 31 (`smoke-structured-log.mjs`, 20 cases)

### `supabaseInsert.ts` - Hardened Supabase REST POST
- `insertSupabaseRow(env, table, row, options?): Promise<InsertResult>`
- SERVICE_ROLE_KEY redaction in error paths (defense vs Supabase 4xx echoing apikey)
- Error message bounded to ≤ 256 chars
- `options.ignoreDuplicates` for `Prefer: resolution=ignore-duplicates`
- Smoke: Gate 26 (`smoke-supabase-insert.mjs`, 40 cases)

## Domain-specific libs (not consolidated, single-purpose)

| Lib | Purpose |
|---|---|
| `cronGuard.ts` | `withCronGuard()` wrapper: kill switch + concurrency lock + audit log + heartbeat |
| `emailLog.ts` | Delivery logging to Supabase `email_sends` table |
| `emailTemplate.ts` | Branded Resend email renderer (HTML + text multipart) |
| `pdfHmac.ts` | One-time signed download URLs for audit PDFs in R2 |
| `serviceAuth.ts` | Service-to-service HMAC (Reviuzy ↔ AiLys) with replay window + caller allowlist |
| `svixHmac.ts` | Resend webhook signature verification (Svix v1 spec) |
| `unsubscribeToken.ts` | HMAC-signed unsubscribe tokens for newsletter |
| `pdf/AuditReport.ts` | Audit PDF rendering (pdf-lib) |
| `pdf/Quote.ts` | Quote PDF rendering + price computation |
| `pdf/VisibilityReport.ts` | AI Visibility report PDF rendering |

## How to add a new shared helper

1. Identify duplication in `functions/api/*.ts` or `functions/lib/*.ts`. Rule of thumb: **3+ inline copies** justifies extraction (per CLAUDE.md "Three similar lines is better than a premature abstraction").
2. Create `functions/lib/<name>.ts` with the canonical implementation. Document the contract in JSDoc - what it does, edge cases, why a shared lib (1-paragraph rationale).
3. Replace inline copies with imports. Verify behavioral parity at the integration smoke level (e.g., `smoke-audit-pdf-hmac` covers `pdfHmac` + `hmac` integration).
4. Add `scripts/smoke-<name>.mjs` with at least 10 cases (happy + edge + error paths). Wire as next sequential Gate in `.github/workflows/deploy.yml`.
5. Add the entry to the `FORBIDDEN` list in `scripts/smoke-no-inline-duplicates.mjs` so future sessions can't re-introduce inline copies.
6. Update this README with the new lib (Quick reference + Lib catalogue).

## CI gate summary

Every shared lib has its own dedicated smoke gate. See
`.github/workflows/deploy.yml` for the full list (Gates 1-35 as of 2026-05-02).
