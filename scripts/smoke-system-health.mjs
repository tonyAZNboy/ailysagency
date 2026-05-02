#!/usr/bin/env node
/**
 * Smoke test for /api/system-health endpoint shape contract.
 *
 * The handler is tested via direct invocation (Cloudflare Workers
 * runtime is not spun up here). Asserts the response shape, status
 * codes, header policies, and that ZERO secret values leak into the
 * response body.
 *
 * Run: npx tsx scripts/smoke-system-health.mjs
 * Exits 0 if all assertions pass, 1 otherwise.
 */
import { onRequestGet, onRequestPost, onRequestOptions } from "../functions/api/system-health.ts";

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const bold = "\x1b[1m";

const cases = [];
function assert(name, ok, hint = "") {
  cases.push({ name, ok, hint });
}

function makeKV() {
  return { get: async () => null, put: async () => undefined };
}

function makeReq(method = "GET") {
  return new Request("https://www.ailysagency.ca/api/system-health", { method });
}

async function callGet(env) {
  return onRequestGet({ request: makeReq("GET"), env });
}

// 1. Empty env returns 200 + ok:true (no secrets set, all unset reported)
{
  const r = await callGet({});
  assert("empty env -> 200", r.status === 200);
  const json = await r.json();
  assert("empty env -> ok=true", json.ok === true);
  assert("empty env -> all secrets reported as unset", Object.values(json.secrets).every((v) => v === "unset"));
  assert("empty env -> all kvBindings reported as unbound", Object.values(json.kvBindings).every((v) => v === "unbound"));
}

// 2. Set secrets reported as set, never with values
{
  const env = {
    RESEND_API_KEY: "re_secret_123",
    SUPABASE_URL: "https://example.supabase.co",
    OPERATOR_NOTIFY_EMAIL: "operator@example.com",
  };
  const r = await callGet(env);
  const json = await r.json();
  const text = JSON.stringify(json);
  assert("RESEND_API_KEY reported set", json.secrets.RESEND_API_KEY === "set");
  assert("SUPABASE_URL reported set", json.secrets.SUPABASE_URL === "set");
  assert("OPERATOR_NOTIFY_EMAIL reported set", json.secrets.OPERATOR_NOTIFY_EMAIL === "set");
  assert("response body NEVER contains secret value re_secret_123", !text.includes("re_secret_123"));
  assert("response body NEVER contains secret value example.supabase.co", !text.includes("example.supabase.co"));
  assert("response body NEVER contains operator email value", !text.includes("operator@example.com"));
}

// 3. Bound KV reported as bound
{
  const env = {
    PARTNER_APPLICATIONS_RATE_LIMIT: makeKV(),
    NEWSLETTER_RATE_LIMIT: makeKV(),
  };
  const r = await callGet(env);
  const json = await r.json();
  assert("PARTNER_APPLICATIONS_RATE_LIMIT bound", json.kvBindings.PARTNER_APPLICATIONS_RATE_LIMIT === "bound");
  assert("NEWSLETTER_RATE_LIMIT bound", json.kvBindings.NEWSLETTER_RATE_LIMIT === "bound");
  assert("FOUNDING_CLIENTS_RATE_LIMIT unbound (not set)", json.kvBindings.FOUNDING_CLIENTS_RATE_LIMIT === "unbound");
}

// 4. Kill switches: PARTNER_APPLICATIONS defaults off
{
  const env = {};
  const r = await callGet(env);
  const json = await r.json();
  assert("partner_applications kill defaults off (fail-closed)", json.features.partner_applications.killSwitch === "off");
  assert("partner_applications.defaultOn === false", json.features.partner_applications.defaultOn === false);
}

// 5. Kill switch flipped on
{
  const env = { PARTNER_APPLICATIONS_KILL_SWITCH: "true" };
  const r = await callGet(env);
  const json = await r.json();
  assert("partner_applications kill on when env=true", json.features.partner_applications.killSwitch === "on");
}

// 6. Kill switch case-insensitive
{
  const env = { PARTNER_APPLICATIONS_KILL_SWITCH: "TRUE" };
  const r = await callGet(env);
  const json = await r.json();
  assert("kill switch case-insensitive (TRUE)", json.features.partner_applications.killSwitch === "on");
}

// 7. Kill switch with non-true value reports off
{
  const env = { PARTNER_APPLICATIONS_KILL_SWITCH: "false" };
  const r = await callGet(env);
  const json = await r.json();
  assert("non-true env value -> kill off", json.features.partner_applications.killSwitch === "off");
}

// 8. Build version present
{
  const r = await callGet({});
  const json = await r.json();
  assert("build.version present", typeof json.build?.version === "string" && json.build.version.length > 0);
  assert("build.commit defaults unknown when env unset", json.build.commit === "unknown");
}

// 9. CF_PAGES_COMMIT_SHA reflected when set
{
  const env = { CF_PAGES_COMMIT_SHA: "abc123def" };
  const r = await callGet(env);
  const json = await r.json();
  assert("CF_PAGES_COMMIT_SHA reflected in build.commit", json.build.commit === "abc123def");
}

// 10. timestamp is valid ISO-8601
{
  const r = await callGet({});
  const json = await r.json();
  assert("timestamp parseable as Date", !Number.isNaN(new Date(json.timestamp).getTime()));
}

// 11. Cache-Control no-store
{
  const r = await callGet({});
  const cc = r.headers.get("Cache-Control");
  assert("Cache-Control no-store", cc?.includes("no-store"));
}

// 12. CORS open (public ops surface)
{
  const r = await callGet({});
  assert("CORS Allow-Origin: *", r.headers.get("Access-Control-Allow-Origin") === "*");
}

// 13. POST returns 405
{
  const r = await onRequestPost({ request: makeReq("POST"), env: {} });
  assert("POST -> 405", r.status === 405);
}

// 14. OPTIONS preflight returns 204
{
  const r = await onRequestOptions({ request: makeReq("OPTIONS"), env: {} });
  assert("OPTIONS -> 204", r.status === 204);
  assert("OPTIONS Allow-Methods", r.headers.get("Access-Control-Allow-Methods")?.includes("GET"));
}

// 15. Response is valid JSON (no parse error)
{
  const r = await callGet({});
  let parsed = null;
  try { parsed = await r.json(); } catch {}
  assert("response is valid JSON", parsed !== null);
}

// 16. All required fields present
{
  const r = await callGet({});
  const json = await r.json();
  const required = ["ok", "timestamp", "build", "features", "secrets", "kvBindings", "cronHeartbeats"];
  for (const k of required) {
    assert(`required field "${k}" present`, json[k] !== undefined);
  }
}

// 17. cronHeartbeats null when KV unbound (legitimate fresh-deploy state)
{
  const r = await callGet({});
  const json = await r.json();
  assert("cronHeartbeats.process-sequences null when KV unbound", json.cronHeartbeats["process-sequences"] === null);
  assert("cronHeartbeats.day1-retry null when KV unbound", json.cronHeartbeats["day1-retry"] === null);
}

// 18. cronHeartbeats reports heartbeat shape when KV bound + record exists
{
  const heartbeat = {
    last_run_at: "2026-05-02T15:00:00.000Z",
    last_success_at: "2026-05-02T15:00:00.000Z",
    last_duration_ms: 1234,
    last_items_processed: 5,
    last_successes: 5,
    last_failures: 0,
  };
  const kv = {
    async get(key) {
      if (key === "cron:process-sequences:heartbeat") return JSON.stringify(heartbeat);
      return null;
    },
    async put() {},
  };
  const r = await callGet({ AUDIT_PDF_RATE_LIMIT: kv });
  const json = await r.json();
  assert(
    "cronHeartbeats.process-sequences populated from KV record",
    json.cronHeartbeats["process-sequences"]?.last_success_at === "2026-05-02T15:00:00.000Z",
  );
  assert(
    "cronHeartbeats.day1-retry null (no record)",
    json.cronHeartbeats["day1-retry"] === null,
  );
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
