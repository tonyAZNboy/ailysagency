#!/usr/bin/env node
/**
 * Smoke test for /api/partner-application validator + hash helpers.
 *
 * F3.0 sub-phase 1. Tests the pure functions exported from
 * functions/api/partner-application.ts. The edge fn end-to-end is
 * tested via live curl post-deploy (Gate M1 in 03-test-matrix.md).
 *
 * Run: npx tsx scripts/smoke-partner-application.mjs
 * Exits 0 if all assertions pass, 1 otherwise.
 */
import { validate, payloadHash, ipHash } from "../functions/api/partner-application.ts";

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const bold = "\x1b[1m";

const cases = [];
function assert(name, ok, hint = "") {
  cases.push({ name, ok, hint });
}

function validBody() {
  return {
    agencyName: "Smoke Agency Inc",
    contactName: "Smoke Tester",
    contactEmail: "smoke@example.com",
    city: "Montreal",
    language: "en",
    currentClientCount: 8,
    expectedReferralsPerYear: 12,
    pitch: "We want to white-label AiLys for our 8 existing clients in Quebec.",
  };
}

// 1. Happy path passes
{
  const r = validate(validBody());
  assert("happy path passes", r.ok && r.errors.length === 0, JSON.stringify(r.errors));
}

// 2. Honeypot triggered
{
  const b = validBody();
  b.websiteUrlAlt = "http://spam.example";
  const r = validate(b);
  assert("honeypot triggered", r.honeypotTriggered === true);
}

// 3. Missing agencyName rejects
{
  const b = validBody();
  delete b.agencyName;
  const r = validate(b);
  assert("missing agencyName rejects", !r.ok && r.errors.includes("agencyName is required"));
}

// 4. Missing contactEmail rejects
{
  const b = validBody();
  delete b.contactEmail;
  const r = validate(b);
  assert("missing contactEmail rejects", !r.ok && r.errors.includes("contactEmail is required"));
}

// 5. Malformed email rejects
{
  const b = validBody();
  b.contactEmail = "not-an-email";
  const r = validate(b);
  assert("malformed email rejects", !r.ok && r.errors.includes("contactEmail is invalid"));
}

// 6. Disposable email rejects
{
  const b = validBody();
  b.contactEmail = "user@mailinator.com";
  const r = validate(b);
  assert(
    "disposable email rejects",
    !r.ok && r.errors.includes("contactEmail is invalid"),
    JSON.stringify(r.errors),
  );
}

// 7. Pitch over 2000 chars rejects
{
  const b = validBody();
  b.pitch = "x".repeat(2001);
  const r = validate(b);
  assert("pitch over 2000 chars rejects", !r.ok && r.errors.some((e) => e.includes("pitch")));
}

// 8. agencyName over 200 chars truncates (clip behavior)
{
  const b = validBody();
  b.agencyName = "x".repeat(300);
  const r = validate(b);
  assert(
    "agencyName over 200 truncates to 200",
    r.ok && r.data.agency_name.length === 200,
    `actual=${r.data.agency_name.length}`,
  );
}

// 9. Non-integer currentClientCount rejects
{
  const b = validBody();
  b.currentClientCount = "abc";
  const r = validate(b);
  assert(
    "non-integer currentClientCount rejects",
    !r.ok && r.errors.some((e) => e.includes("currentClientCount")),
  );
}

// 10. Negative expectedReferralsPerYear rejects (out of range)
{
  const b = validBody();
  b.expectedReferralsPerYear = -1;
  const r = validate(b);
  assert(
    "negative expectedReferralsPerYear rejects",
    !r.ok && r.errors.some((e) => e.includes("expectedReferralsPerYear")),
  );
}

// 11. Optional fields can be empty
{
  const b = validBody();
  delete b.city;
  delete b.currentClientCount;
  delete b.expectedReferralsPerYear;
  delete b.pitch;
  const r = validate(b);
  assert("optional fields can be omitted", r.ok && r.errors.length === 0);
}

// 12. Language defaults to "en" when invalid
{
  const b = validBody();
  b.language = "xx";
  const r = validate(b);
  assert("invalid language defaults to en", r.ok && r.data.language === "en");
}

// 13. payloadHash is deterministic
{
  const r1 = validate(validBody());
  const r2 = validate(validBody());
  const h1 = await payloadHash(r1.data);
  const h2 = await payloadHash(r2.data);
  assert("payloadHash is deterministic", h1 === h2 && h1.length === 64);
}

// 14. ipHash returns null for null input
{
  const h = await ipHash(null);
  assert("ipHash null for null IP", h === null);
}

// 15. ipHash returns 64-char hex for IP
{
  const h = await ipHash("192.0.2.1");
  assert("ipHash 64-char hex for IP", h !== null && h.length === 64 && /^[0-9a-f]+$/.test(h));
}

// 16. payloadHash differs for different agency names
{
  const r1 = validate(validBody());
  const b2 = validBody();
  b2.agencyName = "Different Agency Name";
  const r2 = validate(b2);
  const h1 = await payloadHash(r1.data);
  const h2 = await payloadHash(r2.data);
  assert("payloadHash differs across agency names", h1 !== h2);
}

// Summary
let pass = 0;
let fail = 0;
for (const c of cases) {
  const tag = c.ok ? `${green}PASS${reset}` : `${red}FAIL${reset}`;
  console.log(`${tag}  ${c.name}${c.hint ? `  (${c.hint})` : ""}`);
  if (c.ok) pass++;
  else fail++;
}
console.log(`\n${bold}${pass}/${cases.length} cases pass${reset}`);
if (fail) {
  console.error(`${red}${bold}${fail} cases failed${reset}`);
  process.exit(1);
}
