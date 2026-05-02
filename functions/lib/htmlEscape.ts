// Shared HTML-escape helper for Cloudflare Pages Functions.
//
// Replaces 6 byte-identical copies that were inlined in:
//   - functions/api/partner-application.ts
//   - functions/api/founding-clients-apply.ts
//   - functions/api/audit-pdf.ts
//   - functions/api/audit-pdf-onboarding.ts
//   - functions/lib/emailTemplate.ts
//   - functions/lib/serverError.ts
//
// Why a shared helper
// -------------------
// Every Resend operator-alert email and every audit-PDF render that
// interpolates user-provided strings into HTML must escape them or
// risk an HTML-injection vector. Six identical copies mean six places
// that could drift if someone edits one without the others. One
// hardened helper with one smoke test asserts the contract for all
// callers.
//
// Contract
// --------
//   - Replaces &, <, >, ", ' with their named entities
//   - Idempotent ONLY for non-entity-containing input. ESCAPING TWICE
//     PRODUCES DOUBLE-ENCODED OUTPUT BY DESIGN. Callers must escape
//     exactly once at the boundary where untrusted text becomes HTML.
//   - Tolerates undefined/null by returning empty string. This avoids
//     `escapeHtml(maybeNullable as string)` runtime crashes on the
//     happy path of optional fields.
//   - Returns the original primitive coerced to string for non-string
//     inputs (numbers, booleans). Useful for `escapeHtml(count)` in
//     email templates without forcing every caller to String() first.

/**
 * Escape a string for safe interpolation into HTML body content.
 * NOT safe for HTML attribute values without quoting; the standard
 * pattern at all call sites is `<tag attr="${escapeHtml(x)}">` which
 * relies on the surrounding double-quotes plus the &quot; escape.
 *
 * Returns "" for null/undefined input.
 */
export function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return "";
  const s = typeof value === "string" ? value : String(value);
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
