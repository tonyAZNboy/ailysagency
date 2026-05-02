// Shared crypto helpers for Cloudflare Pages Functions.
//
// Single source of truth for SHA-256 hex hashing. Replaces 10 byte-
// equivalent inline copies that were spread across:
//   - functions/lib/rateLimit.ts (now re-exports from here)
//   - functions/lib/unsubscribeToken.ts
//   - functions/lib/serviceAuth.ts
//   - functions/api/audit-pdf.ts
//   - functions/api/audit-pdf-onboarding.ts
//   - functions/api/audit-pdf-download/[id].ts
//   - functions/api/audit-ai-visibility-instant.ts
//   - functions/api/cron-process-sequences.ts
//   - functions/api/visibility-report-pdf.ts
//   - functions/api/client-error.ts
//   - functions/api/newsletter-unsubscribe.ts
//   - functions/api/quote-pdf.ts
//   - functions/api/resend-webhook.ts
//   - functions/api/partner-application.ts (had BOTH a local copy and
//     an import-as-rename from rateLimit; the local copy is removed)
//
// All call sites used different code styles ([...new Uint8Array]
// spread vs Array.from, single vs double quotes) but produced byte-
// identical output (SHA-256 is deterministic). The shared helper
// uses the canonical Array.from form.

/**
 * Compute the lowercase hex SHA-256 digest of a UTF-8 string.
 *
 * Used across the surface for PII hashing (email + IP daily-rotated
 * salt for audit_log), payload integrity hashing for idempotency,
 * KV cache key derivation, and HMAC-adjacent flows.
 *
 * Returns a 64-char lowercase hex string. Never throws on valid input.
 */
export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Convert a Uint8Array of arbitrary length to a lowercase hex string.
 * Useful when the caller already has digest bytes (e.g., HMAC-SHA256
 * output from crypto.subtle.sign).
 */
export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
