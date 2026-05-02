#!/usr/bin/env node
/**
 * Smoke test for functions/lib/origin.ts
 *
 * Tests the canonical isAllowedOrigin contract that consolidates 5
 * inline copies across endpoints. Verifies:
 *   - No Origin header allows (server-to-server, no-cors)
 *   - Default allowlist (when ALLOWED_ORIGINS env var unset)
 *   - Custom allowlist via env
 *   - Localhost wildcard regardless of port
 *   - Subdomain rejection (no implicit subdomain trust)
 *   - Trailing whitespace tolerated in env list
 *
 * Run: npx tsx scripts/smoke-origin.mjs
 * Exits 0 if all assertions pass, 1 otherwise.
 */
import { isAllowedOrigin, DEFAULT_ALLOWED_ORIGINS } from "../functions/lib/origin.ts";

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const bold = "\x1b[1m";

const cases = [];
function assert(name, ok, hint = "") {
  cases.push({ name, ok, hint });
}

function makeRequest(origin) {
  const headers = new Headers();
  if (origin !== undefined) headers.set("origin", origin);
  return new Request("https://example.com/", { method: "POST", headers });
}

// 1. No Origin header -> allowed
assert(
  "no Origin header allowed (server-to-server)",
  isAllowedOrigin(makeRequest(undefined), {}),
);

// 2. Empty Origin header -> allowed (no header set, falsy)
assert(
  "empty origin treated as no header",
  isAllowedOrigin(new Request("https://example.com/", { method: "POST" }), {}),
);

// 3. Default allowlist: www.ailysagency.ca
assert(
  "default allowlist permits www.ailysagency.ca",
  isAllowedOrigin(makeRequest("https://www.ailysagency.ca"), {}),
);

// 4. Default allowlist: ailysagency.ca (apex)
assert(
  "default allowlist permits ailysagency.ca",
  isAllowedOrigin(makeRequest("https://ailysagency.ca"), {}),
);

// 5. Default allowlist: ailysagency.pages.dev
assert(
  "default allowlist permits ailysagency.pages.dev",
  isAllowedOrigin(makeRequest("https://ailysagency.pages.dev"), {}),
);

// 6. Default allowlist DOES NOT permit attacker subdomain
assert(
  "default allowlist rejects attacker subdomain",
  !isAllowedOrigin(makeRequest("https://evil.ailysagency.ca"), {}),
);

// 7. Default allowlist rejects unrelated origin
assert(
  "default allowlist rejects unrelated origin",
  !isAllowedOrigin(makeRequest("https://attacker.com"), {}),
);

// 8. Default allowlist rejects http:// variant of canonical (only https allowed)
assert(
  "default allowlist rejects http:// variant",
  !isAllowedOrigin(makeRequest("http://www.ailysagency.ca"), {}),
);

// 9. Localhost any port allowed (dev shell)
assert(
  "localhost:5173 allowed (vite dev)",
  isAllowedOrigin(makeRequest("http://localhost:5173"), {}),
);
assert(
  "localhost:8788 allowed (wrangler dev)",
  isAllowedOrigin(makeRequest("http://localhost:8788"), {}),
);
assert(
  "localhost no port allowed",
  isAllowedOrigin(makeRequest("http://localhost"), {}),
);

// 10. Localhost over https not in default list, but starts-with does NOT match
assert(
  "https://localhost rejected (only http://localhost prefix matches)",
  !isAllowedOrigin(makeRequest("https://localhost:5173"), {}),
);

// 11. Custom allowlist via env
{
  const env = { ALLOWED_ORIGINS: "https://staging.ailys.example,https://qa.ailys.example" };
  assert(
    "custom allowlist permits configured origin",
    isAllowedOrigin(makeRequest("https://staging.ailys.example"), env),
  );
  assert(
    "custom allowlist rejects default canonical when overridden",
    !isAllowedOrigin(makeRequest("https://www.ailysagency.ca"), env),
  );
}

// 12. Trailing whitespace in env entries tolerated
{
  const env = { ALLOWED_ORIGINS: "  https://a.example  ,   https://b.example  " };
  assert(
    "trailing whitespace trimmed (a)",
    isAllowedOrigin(makeRequest("https://a.example"), env),
  );
  assert(
    "trailing whitespace trimmed (b)",
    isAllowedOrigin(makeRequest("https://b.example"), env),
  );
}

// 13. Single-entry allowlist works
{
  const env = { ALLOWED_ORIGINS: "https://only.example" };
  assert(
    "single-entry allowlist permits the entry",
    isAllowedOrigin(makeRequest("https://only.example"), env),
  );
  assert(
    "single-entry allowlist rejects other",
    !isAllowedOrigin(makeRequest("https://other.example"), env),
  );
}

// 14. DEFAULT_ALLOWED_ORIGINS export is the expected string
assert(
  "DEFAULT_ALLOWED_ORIGINS contains the 3 canonicals",
  DEFAULT_ALLOWED_ORIGINS.includes("www.ailysagency.ca") &&
    DEFAULT_ALLOWED_ORIGINS.includes("ailysagency.ca") &&
    DEFAULT_ALLOWED_ORIGINS.includes("ailysagency.pages.dev"),
);

// 15. Empty ALLOWED_ORIGINS string falls back to NOT allowing canonical
//     (caller has explicitly emptied the list, so block everything except
//     no-Origin and localhost)
{
  const env = { ALLOWED_ORIGINS: "" };
  // Empty string is truthy-falsy: "" ?? default = "" (?? only catches null/undef).
  // So an empty string yields a single empty-string entry [""]. That entry will
  // never match any origin, so all non-empty origins reject. localhost still works.
  assert(
    "empty ALLOWED_ORIGINS rejects canonical",
    !isAllowedOrigin(makeRequest("https://www.ailysagency.ca"), env),
  );
  assert(
    "empty ALLOWED_ORIGINS still permits localhost",
    isAllowedOrigin(makeRequest("http://localhost:5173"), env),
  );
}

let pass = 0;
let fail = 0;
for (const c of cases) {
  const tag = c.ok ? `${green}PASS${reset}` : `${red}FAIL${reset}`;
  console.log(`${tag}  ${c.name}${c.hint ? `  (${c.hint})` : ""}`);
  c.ok ? pass++ : fail++;
}
console.log(`\n${bold}${pass}/${cases.length} cases pass${reset}`);
if (fail) {
  console.error(`${red}${bold}${fail} cases failed${reset}`);
  process.exit(1);
}
