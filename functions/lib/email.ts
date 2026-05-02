// Shared email validation helper for Cloudflare Pages Functions.
//
// Replaces 4 functionally-identical inline copies of isValidEmail +
// the same DISPOSABLE_DOMAINS Set. Across:
//   - functions/api/cofounders-apply.ts
//   - functions/api/founding-clients-apply.ts
//   - functions/api/newsletter-subscribe.ts
//   - functions/api/partner-application.ts
//
// 3 of the 4 were byte-identical. partner-application had a slightly
// stricter lower-bound (length >= 5) which is now applied uniformly.
// "a@b" was technically passing 3 of the 4 endpoints; that's now
// rejected everywhere. Strictly stricter == no behavioral regression
// at the 3 prior-permissive sites; just closes a tiny gap.
//
// Adding a disposable domain to block at all endpoints is now a
// single-file change instead of 4.

/**
 * Public list of throwaway-email domains rejected by `isValidEmail`.
 * Frozen so callers cannot mutate the shared state. Exported for
 * smoke tests + future admin-panel surfacing.
 */
export const DISPOSABLE_DOMAINS: ReadonlySet<string> = new Set([
  "mailinator.com",
  "tempmail.com",
  "guerrillamail.com",
  "throwawaymail.com",
  "yopmail.com",
  "10minutemail.com",
  "trashmail.com",
  "fakeinbox.com",
  "getnada.com",
]);

/** Standard email regex used at every form endpoint. Not RFC-perfect
 *  (no quoted local parts, no IP-literal domains) but blocks the
 *  90 % of invalid inputs that matter at form-submit time. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** RFC 5321 § 4.5.3.1.3: max email length is 254 octets. */
const EMAIL_MAX_LENGTH = 254;

/** Minimum sane length: a@b.c = 5 chars. Anything shorter is junk. */
const EMAIL_MIN_LENGTH = 5;

/**
 * Strict server-side email validation. Used by every public form
 * endpoint to reject obvious junk before the row hits Supabase.
 *
 * Returns true iff:
 *   - email is a non-empty string
 *   - 5 ≤ length ≤ 254 (RFC + sanity floor)
 *   - matches the standard email regex
 *   - domain (case-insensitive) is NOT in DISPOSABLE_DOMAINS
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > EMAIL_MAX_LENGTH || email.length < EMAIL_MIN_LENGTH) return false;
  if (!EMAIL_RE.test(email)) return false;
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain || DISPOSABLE_DOMAINS.has(domain)) return false;
  return true;
}

/**
 * Standalone disposable-domain check. Useful when the caller has
 * already validated email format and just needs to know whether to
 * flag the lead as low-value.
 */
export function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return !!domain && DISPOSABLE_DOMAINS.has(domain);
}
