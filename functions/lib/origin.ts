// Shared origin allowlist check for Cloudflare Pages Functions.
//
// Replaces 5 functionally-identical inline copies:
//   - functions/api/cofounders-apply.ts
//   - functions/api/founding-clients-apply.ts
//   - functions/api/newsletter-subscribe.ts
//   - functions/api/audit-pdf.ts
//   - functions/api/partner-application.ts
//
// All 5 had the same logic:
//   1. If no Origin header (server-to-server, no-cors curl), allow.
//   2. Otherwise read env.ALLOWED_ORIGINS (comma-separated), with a
//      fallback to the canonical AiLys domains.
//   3. Allow if origin is in the list OR starts with http://localhost
//      (dev shells with various ports).
//
// The fallback string is now defined ONCE here so adding a new
// canonical domain (e.g. a custom-domain rebrand) is a single-file
// change instead of five.

export interface OriginEnv {
  /** Comma-separated allowlist. Optional; falls back to AiLys canonicals. */
  ALLOWED_ORIGINS?: string;
}

/** Default allowlist when env.ALLOWED_ORIGINS is unset. */
export const DEFAULT_ALLOWED_ORIGINS =
  "https://www.ailysagency.ca,https://ailysagency.ca,https://ailysagency.pages.dev";

/**
 * Check whether the request's Origin header is on the allowlist.
 *
 * Returns `true` if:
 *   - No Origin header (server-to-server, no-cors fetch, curl)
 *   - Origin matches an entry in env.ALLOWED_ORIGINS (or the default)
 *   - Origin starts with `http://localhost` (any port; dev shells)
 *
 * Returns `false` otherwise.
 */
export function isAllowedOrigin(request: Request, env: OriginEnv): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const allowed = (env.ALLOWED_ORIGINS ?? DEFAULT_ALLOWED_ORIGINS)
    .split(",")
    .map((s) => s.trim());
  return allowed.includes(origin) || origin.startsWith("http://localhost");
}
