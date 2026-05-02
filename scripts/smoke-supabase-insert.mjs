#!/usr/bin/env node
/**
 * Smoke test for functions/lib/supabaseInsert.ts
 *
 * Tests insertSupabaseRow + the internal redact / bound helpers. Verifies:
 *   - fail-open on missing env vars
 *   - 200/201 ok path
 *   - 409 ignore-duplicates option
 *   - 4xx / 5xx return ok:false with bounded error
 *   - network throw returns ok:false with bounded error
 *   - SERVICE_ROLE_KEY redacted from any echoed body
 *   - Prefer header values match expectations
 *   - row argument NOT mutated
 *
 * Run: npx tsx scripts/smoke-supabase-insert.mjs
 * Exits 0 if all assertions pass, 1 otherwise.
 */
import {
  insertSupabaseRow,
  _internalRedact,
  _internalBound,
} from "../functions/lib/supabaseInsert.ts";

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const bold = "\x1b[1m";

const cases = [];
function assert(name, ok, hint = "") {
  cases.push({ name, ok, hint });
}

// Suppress noisy warnings/log from the lib's intentional fail paths.
const originalConsoleWarn = console.warn;
const originalConsoleLog = console.log;
console.warn = () => {};
console.log = () => {};

const FAKE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fakefakefakefakefakefakefakefakefakefakefake.signaturesignaturesignaturesignature";
const FAKE_URL = "https://fake-project.supabase.co";

function makeFetchStub(handler) {
  const calls = [];
  const stub = async (url, init) => {
    calls.push({ url, init });
    return handler(url, init);
  };
  return { stub, calls };
}

// C1: missing SUPABASE_URL -> ok:true, fetch not called
{
  let fetched = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    fetched = true;
    return new Response("", { status: 200 });
  };
  const r = await insertSupabaseRow(
    { SUPABASE_SERVICE_ROLE_KEY: FAKE_KEY },
    "t",
    { a: 1 },
  );
  globalThis.fetch = originalFetch;
  assert("C1 missing SUPABASE_URL fail-open ok:true", r.ok === true);
  assert("C1 missing SUPABASE_URL fetch not called", !fetched);
}

// C2: missing SERVICE_ROLE_KEY -> ok:true, fetch not called
{
  let fetched = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    fetched = true;
    return new Response("", { status: 200 });
  };
  const r = await insertSupabaseRow(
    { SUPABASE_URL: FAKE_URL },
    "t",
    { a: 1 },
  );
  globalThis.fetch = originalFetch;
  assert("C2 missing SERVICE_ROLE_KEY fail-open ok:true", r.ok === true);
  assert("C2 missing SERVICE_ROLE_KEY fetch not called", !fetched);
}

// C3: 200 OK -> ok:true
{
  const originalFetch = globalThis.fetch;
  const { stub } = makeFetchStub(() => new Response("", { status: 200 }));
  globalThis.fetch = stub;
  const r = await insertSupabaseRow(
    { SUPABASE_URL: FAKE_URL, SUPABASE_SERVICE_ROLE_KEY: FAKE_KEY },
    "t",
    { a: 1 },
  );
  globalThis.fetch = originalFetch;
  assert("C3 200 OK -> ok:true", r.ok === true);
  assert("C3 status surfaced", r.status === 200);
}

// C4: 201 Created -> ok:true
{
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("", { status: 201 });
  const r = await insertSupabaseRow(
    { SUPABASE_URL: FAKE_URL, SUPABASE_SERVICE_ROLE_KEY: FAKE_KEY },
    "t",
    { a: 1 },
  );
  globalThis.fetch = originalFetch;
  assert("C4 201 -> ok:true", r.ok === true);
}

// C5: 409 + ignoreDuplicates true -> ok:true
{
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response("duplicate key value", { status: 409 });
  const r = await insertSupabaseRow(
    { SUPABASE_URL: FAKE_URL, SUPABASE_SERVICE_ROLE_KEY: FAKE_KEY },
    "t",
    { a: 1 },
    { ignoreDuplicates: true },
  );
  globalThis.fetch = originalFetch;
  assert("C5 409 + ignoreDuplicates -> ok:true", r.ok === true);
}

// C6: 409 + ignoreDuplicates false -> ok:false
{
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response("duplicate key value", { status: 409 });
  const r = await insertSupabaseRow(
    { SUPABASE_URL: FAKE_URL, SUPABASE_SERVICE_ROLE_KEY: FAKE_KEY },
    "t",
    { a: 1 },
  );
  globalThis.fetch = originalFetch;
  assert("C6 409 default -> ok:false", r.ok === false);
  assert(
    "C6 409 default -> error mentions Supabase 409",
    typeof r.error === "string" && r.error.includes("409"),
  );
}

// C7: 400 Bad Request -> ok:false, error mentions 400
{
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response("bad payload", { status: 400 });
  const r = await insertSupabaseRow(
    { SUPABASE_URL: FAKE_URL, SUPABASE_SERVICE_ROLE_KEY: FAKE_KEY },
    "t",
    { a: 1 },
  );
  globalThis.fetch = originalFetch;
  assert("C7 400 -> ok:false", r.ok === false);
  assert(
    "C7 400 error string contains Supabase 400",
    typeof r.error === "string" && r.error.includes("Supabase 400"),
  );
}

// C8: 401 Unauthorized -> ok:false
{
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response("unauthorized", { status: 401 });
  const r = await insertSupabaseRow(
    { SUPABASE_URL: FAKE_URL, SUPABASE_SERVICE_ROLE_KEY: FAKE_KEY },
    "t",
    { a: 1 },
  );
  globalThis.fetch = originalFetch;
  assert("C8 401 -> ok:false", r.ok === false);
  assert(
    "C8 401 error string contains Supabase 401",
    typeof r.error === "string" && r.error.includes("Supabase 401"),
  );
}

// C9: 500 -> ok:false
{
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response("server error", { status: 500 });
  const r = await insertSupabaseRow(
    { SUPABASE_URL: FAKE_URL, SUPABASE_SERVICE_ROLE_KEY: FAKE_KEY },
    "t",
    { a: 1 },
  );
  globalThis.fetch = originalFetch;
  assert("C9 500 -> ok:false", r.ok === false);
  assert(
    "C9 500 error contains Supabase 500",
    typeof r.error === "string" && r.error.includes("Supabase 500"),
  );
}

// C10: fetch throws (network) -> ok:false, never throws to caller
{
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("ENOTFOUND fake-project.supabase.co");
  };
  let threw = false;
  let r;
  try {
    r = await insertSupabaseRow(
      { SUPABASE_URL: FAKE_URL, SUPABASE_SERVICE_ROLE_KEY: FAKE_KEY },
      "t",
      { a: 1 },
    );
  } catch {
    threw = true;
  }
  globalThis.fetch = originalFetch;
  assert("C10 network throw does not propagate", !threw);
  assert("C10 network throw -> ok:false", r && r.ok === false);
  assert(
    "C10 error bounded ≤ 256",
    typeof r.error === "string" && r.error.length <= 256,
  );
}

// C11: response body leaks SERVICE_ROLE_KEY -> redacted in lib output
{
  const originalFetch = globalThis.fetch;
  const echo = `bad apikey: ${FAKE_KEY} please rotate`;
  globalThis.fetch = async () => new Response(echo, { status: 400 });
  const r = await insertSupabaseRow(
    { SUPABASE_URL: FAKE_URL, SUPABASE_SERVICE_ROLE_KEY: FAKE_KEY },
    "t",
    { a: 1 },
  );
  globalThis.fetch = originalFetch;
  assert("C11 ok:false on 400", r.ok === false);
  assert(
    "C11 error does NOT contain raw SERVICE_ROLE_KEY",
    typeof r.error === "string" && !r.error.includes(FAKE_KEY),
  );
  assert(
    "C11 error does NOT contain JWT prefix",
    typeof r.error === "string" && !r.error.includes(FAKE_KEY.slice(0, 16)),
  );
  assert(
    "C11 error does contain [REDACTED] marker",
    typeof r.error === "string" && r.error.includes("[REDACTED]"),
  );
}

// C12: error message bounded to ≤ 256 chars
{
  const originalFetch = globalThis.fetch;
  const longBody = "X".repeat(5000);
  globalThis.fetch = async () => new Response(longBody, { status: 422 });
  const r = await insertSupabaseRow(
    { SUPABASE_URL: FAKE_URL, SUPABASE_SERVICE_ROLE_KEY: FAKE_KEY },
    "t",
    { a: 1 },
  );
  globalThis.fetch = originalFetch;
  assert(
    "C12 error message length ≤ 256",
    typeof r.error === "string" && r.error.length <= 256,
  );
}

// C13: created_at preserved (lib doesn't override caller fields)
{
  const originalFetch = globalThis.fetch;
  let receivedBody;
  globalThis.fetch = async (_url, init) => {
    receivedBody = init && init.body ? JSON.parse(init.body) : null;
    return new Response("", { status: 200 });
  };
  const ts = "2024-01-15T12:00:00.000Z";
  await insertSupabaseRow(
    { SUPABASE_URL: FAKE_URL, SUPABASE_SERVICE_ROLE_KEY: FAKE_KEY },
    "t",
    { a: 1, created_at: ts },
  );
  globalThis.fetch = originalFetch;
  assert(
    "C13 created_at preserved untouched",
    receivedBody && receivedBody.created_at === ts,
  );
  assert("C13 row a:1 preserved", receivedBody && receivedBody.a === 1);
}

// C14: row arg NOT mutated by the lib
{
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("", { status: 200 });
  const row = { a: 1, b: "two", nested: { x: 9 } };
  const snapshot = JSON.stringify(row);
  await insertSupabaseRow(
    { SUPABASE_URL: FAKE_URL, SUPABASE_SERVICE_ROLE_KEY: FAKE_KEY },
    "t",
    row,
  );
  globalThis.fetch = originalFetch;
  assert("C14 row not mutated by lib", JSON.stringify(row) === snapshot);
}

// C15: Prefer header. Baseline + ignoreDuplicates variant.
{
  const originalFetch = globalThis.fetch;
  let preferBaseline = "";
  let preferDup = "";
  globalThis.fetch = async (_url, init) => {
    const h = init && init.headers ? init.headers : {};
    if (preferBaseline === "") preferBaseline = h.Prefer ?? "";
    else preferDup = h.Prefer ?? "";
    return new Response("", { status: 200 });
  };
  await insertSupabaseRow(
    { SUPABASE_URL: FAKE_URL, SUPABASE_SERVICE_ROLE_KEY: FAKE_KEY },
    "t",
    { a: 1 },
  );
  await insertSupabaseRow(
    { SUPABASE_URL: FAKE_URL, SUPABASE_SERVICE_ROLE_KEY: FAKE_KEY },
    "t",
    { a: 1 },
    { ignoreDuplicates: true },
  );
  globalThis.fetch = originalFetch;
  assert("C15 baseline Prefer = return=minimal", preferBaseline === "return=minimal");
  assert(
    "C15 ignoreDuplicates Prefer includes resolution=ignore-duplicates",
    preferDup.includes("return=minimal") && preferDup.includes("resolution=ignore-duplicates"),
  );
}

// C16 (extra): URL is correctly built with table arg
{
  const originalFetch = globalThis.fetch;
  let calledUrl = "";
  globalThis.fetch = async (url) => {
    calledUrl = String(url);
    return new Response("", { status: 200 });
  };
  await insertSupabaseRow(
    { SUPABASE_URL: FAKE_URL, SUPABASE_SERVICE_ROLE_KEY: FAKE_KEY },
    "partner_applications",
    { a: 1 },
  );
  globalThis.fetch = originalFetch;
  assert(
    "C16 URL built correctly",
    calledUrl === `${FAKE_URL}/rest/v1/partner_applications`,
  );
}

// C17 (extra): Authorization header includes Bearer prefix
{
  const originalFetch = globalThis.fetch;
  let auth = "";
  let apikey = "";
  globalThis.fetch = async (_url, init) => {
    const h = init && init.headers ? init.headers : {};
    auth = h.Authorization ?? "";
    apikey = h.apikey ?? "";
    return new Response("", { status: 200 });
  };
  await insertSupabaseRow(
    { SUPABASE_URL: FAKE_URL, SUPABASE_SERVICE_ROLE_KEY: FAKE_KEY },
    "t",
    { a: 1 },
  );
  globalThis.fetch = originalFetch;
  assert("C17 Authorization Bearer prefix", auth === `Bearer ${FAKE_KEY}`);
  assert("C17 apikey header set", apikey === FAKE_KEY);
}

// C18 (internal): _internalRedact replaces direct match
{
  const out = _internalRedact(`prefix ${FAKE_KEY} suffix`, FAKE_KEY);
  assert("C18 redact removes full key", !out.includes(FAKE_KEY));
  assert("C18 redact replaces with marker", out.includes("[REDACTED]"));
}

// C19 (internal): _internalRedact handles empty / short secret
{
  assert("C19 redact empty input -> empty", _internalRedact("", FAKE_KEY) === "");
  assert(
    "C19 redact short secret -> input unchanged",
    _internalRedact("abc def", "xy") === "abc def",
  );
  assert(
    "C19 redact undefined secret -> input unchanged",
    _internalRedact("abc def", undefined) === "abc def",
  );
}

// C20 (internal): _internalBound truncates at 256 with ellipsis
{
  const long = "Z".repeat(500);
  const out = _internalBound(long);
  assert("C20 bound length 256", out.length === 256);
  assert("C20 bound ends with ...", out.endsWith("..."));
}
{
  const short = "short";
  assert("C20 bound short string unchanged", _internalBound(short) === short);
}

// Restore console for output
console.warn = originalConsoleWarn;
console.log = originalConsoleLog;

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
