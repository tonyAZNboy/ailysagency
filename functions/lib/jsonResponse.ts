// Shared JSON Response builder for Cloudflare Pages Functions.
//
// Replaces 9 inline copies of jsonResponse with 4 distinct flavors:
//   A. cronGuard, audit-pdf-onboarding: 3 secure headers
//   B. audit-pdf: 3 secure headers + extraHeaders param
//   C. 4 admin endpoints: 2 lowercase headers + extraHeaders, no nosniff
//   D. cron-process-sequences, resend-webhook: only Content-Type
//
// The canonical export uses the most-secure superset:
//   - Content-Type: application/json; charset=utf-8
//   - X-Content-Type-Options: nosniff
//   - Cache-Control: no-store
//   - extraHeaders spread last so callers can override or add
//
// Adopting at all 9 sites is strictly net-positive:
//   - Flavors A, B: no behavior change.
//   - Flavor C admin: gains nosniff header. JSON should never be
//     content-sniffed; this is a strict security upgrade. Mixed-case
//     vs lowercase header keys are HTTP-equivalent (RFC 9110 § 5.1).
//   - Flavor D cron + webhook: gains nosniff + Cache-Control:no-store.
//     Internal endpoints; no caller depends on cache headers being
//     absent.
//
// Used by 9 callers across functions/lib + functions/api + functions/
// api/admin.

/**
 * Build a JSON Response with secure defaults.
 *
 * Defaults:
 *   - Content-Type: application/json; charset=utf-8
 *   - X-Content-Type-Options: nosniff (defense vs MIME-type sniffing
 *     attacks, JSON should never be sniffed as anything else)
 *   - Cache-Control: no-store (response bodies often contain user-
 *     specific or auth-gated data; never cache by default)
 *
 * Pass `extraHeaders` to override or add. Examples:
 *   - { 'X-Idempotency-Key': v }   add a custom header
 *   - { 'Cache-Control': 'public, max-age=60' }   override caching
 */
export function jsonResponse(
  body: unknown,
  status: number,
  extraHeaders?: Record<string, string>,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}
