// Shared string-clip helpers for Cloudflare Pages Functions.
//
// Replaces 8 inline copies of a `clip(value, max)` helper. 7 of the
// 8 used the same trim + empty-check + slice variant; client-error.ts
// used a no-trim variant that allows empty results.
//
// Two exports keep the semantic distinction explicit:
//   - `clip` (default, majority case): trims, returns null on empty
//   - `clipUntrimmed` (client-error): no trim, returns "" if input is ""
//
// Both reject non-string input with `null` (preserving the prior
// runtime contract; callers never had to typeof-check first).
//
// Used by:
//   - functions/api/audit-pdf-onboarding.ts (clip)
//   - functions/api/audit-ai-visibility-instant.ts (clip)
//   - functions/api/cofounders-apply.ts (clip)
//   - functions/api/founding-clients-apply.ts (clip)
//   - functions/api/partner-application.ts (clip)
//   - functions/api/quote-pdf.ts (clip)
//   - functions/api/visibility-report-pdf.ts (clip)
//   - functions/api/client-error.ts (clipUntrimmed)

/**
 * Trim, length-cap, and reject empty strings.
 *
 * Returns:
 *   - `null` if input is not a string, or trims to empty
 *   - first `max` characters of the trimmed input otherwise
 *
 * The standard form-validation helper at every public POST endpoint.
 * Trimming is correct here: form whitespace from copy-paste accidents
 * should not propagate into Supabase rows.
 */
export function clip(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  return trimmed.slice(0, max);
}

/**
 * Length-cap WITHOUT trimming. Preserves leading/trailing whitespace.
 * Used by /api/client-error where the captured browser error message
 * may have intentional leading whitespace (e.g., stack frame
 * indentation) that we want to preserve up to the truncation cap.
 *
 * Returns:
 *   - `null` if input is not a string
 *   - first `max` characters of the input otherwise (including ""
 *     if input is "")
 */
export function clipUntrimmed(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  return value.slice(0, max);
}
