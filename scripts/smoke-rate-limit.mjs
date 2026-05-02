#!/usr/bin/env node
/**
 * Smoke test for the shared rate-limit lib at functions/lib/rateLimit.ts.
 *
 * Tests checkRateLimit + sha256Hex + constantTimeEq with an in-memory KV
 * mock. Verifies the IP hourly bucket, identity daily bucket, fail-open
 * on missing KV, and TTL key naming.
 *
 * Run: npx tsx scripts/smoke-rate-limit.mjs
 * Exits 0 if all assertions pass, 1 otherwise.
 */
import { checkRateLimit, sha256Hex, constantTimeEq } from "../functions/lib/rateLimit.ts";

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const bold = "\x1b[1m";

const cases = [];
function assert(name, ok, hint = "") {
  cases.push({ name, ok, hint });
}

function makeKV() {
  const store = new Map();
  return {
    async get(key) {
      return store.has(key) ? store.get(key) : null;
    },
    async put(key, value, _opts) {
      store.set(key, value);
    },
    _store: store,
  };
}

const baseConfig = {
  ipHash: "ip_aaa",
  identityHash: "id_bbb",
  ipPerHour: 3,
  identityPerDay: 5,
  keyPrefix: "rl:test",
};

// 1. Fail-open when KV is undefined
{
  const r = await checkRateLimit(undefined, baseConfig);
  assert("KV unbound -> allowed with reason kv_unavailable_open", r.allowed && r.reason === "kv_unavailable_open");
}

// 2. First request allowed, counters increment
{
  const kv = makeKV();
  const r = await checkRateLimit(kv, baseConfig);
  assert("first request allowed", r.allowed && r.reason === "ok");
  assert("ipCount = 1 after first request", r.ipCount === 1);
  assert("identityCount = 1 after first request", r.identityCount === 1);
}

// 3. IP bucket caps at ipPerHour
{
  const kv = makeKV();
  const cfg = { ...baseConfig, ipPerHour: 2 };
  await checkRateLimit(kv, cfg); // 1
  await checkRateLimit(kv, cfg); // 2
  const r = await checkRateLimit(kv, cfg); // 3 - over cap
  assert("IP bucket caps at ipPerHour=2", !r.allowed && r.reason === "ip_per_hour");
}

// 4. Identity bucket caps at identityPerDay (with high IP cap)
{
  const kv = makeKV();
  const cfg = { ...baseConfig, ipPerHour: 100, identityPerDay: 2 };
  await checkRateLimit(kv, cfg);
  await checkRateLimit(kv, cfg);
  const r = await checkRateLimit(kv, cfg);
  assert("identity bucket caps at identityPerDay=2", !r.allowed && r.reason === "identity_per_day");
}

// 5. Different IP same identity does NOT bypass identity bucket
{
  const kv = makeKV();
  const cfg = { ...baseConfig, ipPerHour: 100, identityPerDay: 2 };
  await checkRateLimit(kv, { ...cfg, ipHash: "ip_111" });
  await checkRateLimit(kv, { ...cfg, ipHash: "ip_222" });
  const r = await checkRateLimit(kv, { ...cfg, ipHash: "ip_333" });
  assert("rotating IP cannot bypass identity bucket", !r.allowed && r.reason === "identity_per_day");
}

// 6. Different identity same IP does NOT bypass IP bucket
{
  const kv = makeKV();
  const cfg = { ...baseConfig, ipPerHour: 2, identityPerDay: 100 };
  await checkRateLimit(kv, { ...cfg, identityHash: "id_111" });
  await checkRateLimit(kv, { ...cfg, identityHash: "id_222" });
  const r = await checkRateLimit(kv, { ...cfg, identityHash: "id_333" });
  assert("rotating identity cannot bypass IP bucket", !r.allowed && r.reason === "ip_per_hour");
}

// 7. identityHash null -> only IP bucket checked
{
  const kv = makeKV();
  const cfg = { ...baseConfig, identityHash: null, ipPerHour: 100 };
  const r = await checkRateLimit(kv, cfg);
  assert("identityHash null -> identityKey is null", r.allowed && r.identityKey === null);
}

// 8. Key prefix is honored
{
  const kv = makeKV();
  const cfg = { ...baseConfig, keyPrefix: "rl:my-endpoint" };
  const r = await checkRateLimit(kv, cfg);
  assert("ipKey starts with keyPrefix:ip:", r.ipKey.startsWith("rl:my-endpoint:ip:"));
  assert("identityKey starts with keyPrefix:id:", r.identityKey?.startsWith("rl:my-endpoint:id:"));
}

// 9. sha256Hex is deterministic 64-char hex
{
  const a = await sha256Hex("test");
  const b = await sha256Hex("test");
  assert("sha256Hex deterministic", a === b);
  assert("sha256Hex is 64 chars hex", a.length === 64 && /^[0-9a-f]+$/.test(a));
}

// 10. sha256Hex differs for different inputs
{
  const a = await sha256Hex("apple");
  const b = await sha256Hex("orange");
  assert("sha256Hex differs across inputs", a !== b);
}

// 11. constantTimeEq matches on equal strings
{
  assert("constantTimeEq equal", constantTimeEq("abc", "abc"));
}

// 12. constantTimeEq rejects different strings
{
  assert("constantTimeEq diff strings", !constantTimeEq("abc", "abd"));
}

// 13. constantTimeEq rejects different lengths
{
  assert("constantTimeEq diff lengths", !constantTimeEq("abc", "abcd"));
}

// 14. After cap is hit, subsequent requests do NOT inflate the counter
{
  const kv = makeKV();
  const cfg = { ...baseConfig, ipPerHour: 2 };
  await checkRateLimit(kv, cfg);
  await checkRateLimit(kv, cfg);
  await checkRateLimit(kv, cfg); // capped
  await checkRateLimit(kv, cfg); // capped
  // Inspect the KV directly: counter should be at exactly 2 (not 4)
  const ipKey = [...kv._store.keys()].find((k) => k.startsWith("rl:test:ip:"));
  const value = kv._store.get(ipKey);
  assert("capped requests do not inflate counter", value === "2", `actual=${value}`);
}

// Summary
let pass = 0, fail = 0;
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
