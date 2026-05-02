#!/usr/bin/env node
/**
 * Smoke test for functions/lib/jsonResponse.ts
 *
 * Tests jsonResponse() that consolidates 9 inline copies. Verifies:
 * - default secure headers (Content-Type, X-Content-Type-Options, Cache-Control)
 * - JSON serialization of body
 * - status code preserved
 * - extraHeaders spread last (caller can override defaults)
 * - returns a Response instance
 *
 * Run: npx tsx scripts/smoke-json-response.mjs
 * Exits 0 if all assertions pass, 1 otherwise.
 */
import { jsonResponse } from "../functions/lib/jsonResponse.ts";

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const bold = "\x1b[1m";

const cases = [];
function assert(name, ok, hint = "") {
  cases.push({ name, ok, hint });
}

// 1. Returns a Response
{
  const r = jsonResponse({ ok: true }, 200);
  assert("returns Response instance", r instanceof Response);
}

// 2. Status preserved
{
  for (const code of [200, 201, 400, 401, 403, 404, 500, 503]) {
    const r = jsonResponse({}, code);
    assert(`status ${code} preserved`, r.status === code);
  }
}

// 3. Body is JSON-serialized
{
  const r = jsonResponse({ ok: true, count: 42 }, 200);
  const text = await r.text();
  const parsed = JSON.parse(text);
  assert("body parsed back to original object", parsed.ok === true && parsed.count === 42);
}

// 4. Default headers present
{
  const r = jsonResponse({}, 200);
  assert(
    "Content-Type default",
    r.headers.get("Content-Type") === "application/json; charset=utf-8",
  );
  assert(
    "X-Content-Type-Options default nosniff",
    r.headers.get("X-Content-Type-Options") === "nosniff",
  );
  assert(
    "Cache-Control default no-store",
    r.headers.get("Cache-Control") === "no-store",
  );
}

// 5. extraHeaders ADD a custom header
{
  const r = jsonResponse({}, 200, { "X-Idempotency-Key": "abc123" });
  assert(
    "extraHeaders adds X-Idempotency-Key",
    r.headers.get("X-Idempotency-Key") === "abc123",
  );
  // Defaults still present
  assert(
    "defaults preserved when extraHeaders adds",
    r.headers.get("X-Content-Type-Options") === "nosniff",
  );
}

// 6. extraHeaders OVERRIDE a default
{
  const r = jsonResponse({}, 200, { "Cache-Control": "public, max-age=60" });
  assert(
    "extraHeaders overrides Cache-Control default",
    r.headers.get("Cache-Control") === "public, max-age=60",
  );
}

// 7. Empty body works
{
  const r = jsonResponse({}, 200);
  const text = await r.text();
  assert("empty object body serializes to {}", text === "{}");
}

// 8. Array body works
{
  const r = jsonResponse([1, 2, 3], 200);
  const text = await r.text();
  assert("array body serializes correctly", text === "[1,2,3]");
}

// 9. Null body works
{
  const r = jsonResponse(null, 200);
  const text = await r.text();
  assert("null body serializes to null", text === "null");
}

// 10. Error-shape body
{
  const r = jsonResponse({ error: "method_not_allowed" }, 405);
  const parsed = JSON.parse(await r.text());
  assert("error body preserved", parsed.error === "method_not_allowed");
  assert("405 status preserved", r.status === 405);
}

// 11. Default behaviors hold across multiple invocations
{
  const a = jsonResponse({ a: 1 }, 200);
  const b = jsonResponse({ b: 2 }, 500);
  assert("a Content-Type", a.headers.get("Content-Type")?.startsWith("application/json"));
  assert("b Content-Type", b.headers.get("Content-Type")?.startsWith("application/json"));
  assert("a status 200", a.status === 200);
  assert("b status 500", b.status === 500);
}

// 12. extraHeaders does not leak between calls (stateless)
{
  jsonResponse({}, 200, { "X-Test": "v1" });
  const r2 = jsonResponse({}, 200);
  assert(
    "no leak: r2 has no X-Test header",
    r2.headers.get("X-Test") === null,
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
