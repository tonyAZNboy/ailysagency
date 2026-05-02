#!/usr/bin/env node
/**
 * Smoke test for functions/lib/serverError.ts
 *
 * Tests captureServerError + the internal buildRow helper. Verifies
 * the row shape contract, severity-based alert gating, message/stack
 * truncation, PII-safety (no plaintext IP, no unhashed payload), and
 * fail-soft behavior when SUPABASE/Resend are unavailable.
 *
 * Run: npx tsx scripts/smoke-server-error.mjs
 * Exits 0 if all assertions pass, 1 otherwise.
 */
import { captureServerError, _internalBuildRow } from "../functions/lib/serverError.ts";

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const bold = "\x1b[1m";

const cases = [];
function assert(name, ok, hint = "") {
  cases.push({ name, ok, hint });
}

// Suppress console.error noise from intentional captures
const originalConsoleError = console.error;
console.error = () => {};

// 1. buildRow with Error instance extracts message + stack
{
  const err = new Error("boom");
  const row = _internalBuildRow({ endpoint: "test", severity: "error", err }, {});
  assert("Error message captured", row.message === "boom");
  assert("Error stack captured", typeof row.stack === "string" && row.stack.includes("boom"));
  assert("severity preserved", row.severity === "error");
  assert("endpoint preserved", row.endpoint === "test");
}

// 2. buildRow with string err
{
  const row = _internalBuildRow({ endpoint: "test", severity: "warn", err: "oops" }, {});
  assert("string err captured as message", row.message === "oops");
  assert("string err -> null stack", row.stack === null);
}

// 3. buildRow with non-serializable err
{
  const circular = {};
  circular.self = circular;
  const row = _internalBuildRow({ endpoint: "test", severity: "warn", err: circular }, {});
  assert(
    "non-serializable err -> safe fallback message",
    row.message === "non-serializable error value",
  );
}

// 4. buildRow truncates long messages to 500 chars
{
  const longMsg = "x".repeat(2000);
  const row = _internalBuildRow({ endpoint: "test", severity: "warn", err: new Error(longMsg) }, {});
  assert("message truncated to 500", row.message.length === 500);
}

// 5. buildRow truncates long stacks to 2000 chars
{
  const err = new Error("e");
  err.stack = "a".repeat(5000);
  const row = _internalBuildRow({ endpoint: "test", severity: "error", err }, {});
  assert("stack truncated to 2000", row.stack.length === 2000);
}

// 6. buildRow includes optional fields when provided
{
  const row = _internalBuildRow(
    {
      endpoint: "test",
      severity: "error",
      err: new Error("e"),
      requestId: "req_123",
      userIpHash: "ip_hash_abc",
      payloadHash: "payload_hash_xyz",
      context: { tenant: "t1" },
    },
    {},
  );
  assert("requestId in row", row.request_id === "req_123");
  assert("userIpHash in row", row.user_ip_hash === "ip_hash_abc");
  assert("payloadHash in row", row.payload_hash === "payload_hash_xyz");
  assert("context preserved", row.context?.tenant === "t1");
}

// 7. buildRow build_commit from env
{
  const row = _internalBuildRow(
    { endpoint: "t", severity: "warn", err: "e" },
    { CF_PAGES_COMMIT_SHA: "abc1234" },
  );
  assert("build_commit from CF_PAGES_COMMIT_SHA", row.build_commit === "abc1234");
}

// 8. buildRow ts is valid ISO timestamp
{
  const row = _internalBuildRow({ endpoint: "t", severity: "warn", err: "e" }, {});
  assert("ts is valid ISO", !Number.isNaN(new Date(row.ts).getTime()));
}

// 9. captureServerError ALWAYS logs (even with no env)
{
  const r = await captureServerError({}, { endpoint: "t", severity: "error", err: new Error("e") });
  assert("captureServerError always logs", r.logged === true);
  assert("captureServerError reports persisted=false when SUPABASE unset", r.persisted === false);
  assert("captureServerError reports alerted=false when Resend unset", r.alerted === false);
}

// 10. captureServerError NEVER throws even with malformed inputs
{
  let threw = false;
  try {
    await captureServerError({}, { endpoint: "t", severity: "error", err: undefined });
  } catch {
    threw = true;
  }
  assert("captureServerError does not throw on undefined err", !threw);
}

// 11. WARN severity does NOT alert even with Resend configured
{
  let resendCalled = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (typeof url === "string" && url.includes("resend.com")) {
      resendCalled = true;
    }
    return new Response("{}", { status: 200 });
  };
  await captureServerError(
    { RESEND_API_KEY: "x", OPERATOR_NOTIFY_EMAIL: "ops@example.com" },
    { endpoint: "t", severity: "warn", err: "minor issue" },
  );
  globalThis.fetch = originalFetch;
  assert("WARN severity does not alert", !resendCalled);
}

// 12. ERROR severity DOES alert when Resend configured
{
  let resendCalled = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (typeof url === "string" && url.includes("resend.com")) {
      resendCalled = true;
    }
    return new Response("{}", { status: 200 });
  };
  const r = await captureServerError(
    { RESEND_API_KEY: "x", OPERATOR_NOTIFY_EMAIL: "ops@example.com" },
    { endpoint: "t", severity: "error", err: new Error("real bug") },
  );
  globalThis.fetch = originalFetch;
  assert("ERROR severity does alert when Resend configured", resendCalled);
  assert("captureServerError reports alerted=true on success", r.alerted === true);
}

// 13. FATAL severity also alerts
{
  let resendCalled = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (typeof url === "string" && url.includes("resend.com")) {
      resendCalled = true;
    }
    return new Response("{}", { status: 200 });
  };
  await captureServerError(
    { RESEND_API_KEY: "x", OPERATOR_NOTIFY_EMAIL: "ops@example.com" },
    { endpoint: "t", severity: "fatal", err: new Error("everything is on fire") },
  );
  globalThis.fetch = originalFetch;
  assert("FATAL severity does alert", resendCalled);
}

// 14. captureServerError persists to Supabase when configured
{
  let supabaseCalled = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (typeof url === "string" && url.includes("supabase.co")) {
      supabaseCalled = true;
      return new Response("{}", { status: 201 });
    }
    return new Response("{}", { status: 200 });
  };
  const r = await captureServerError(
    { SUPABASE_URL: "https://x.supabase.co", SUPABASE_SERVICE_ROLE_KEY: "x" },
    { endpoint: "t", severity: "error", err: new Error("e") },
  );
  globalThis.fetch = originalFetch;
  assert("Supabase persist called when configured", supabaseCalled);
  assert("captureServerError reports persisted=true on success", r.persisted === true);
}

// 15. Supabase 5xx response treated as failure (persisted=false)
{
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("server error", { status: 500 });
  const r = await captureServerError(
    { SUPABASE_URL: "https://x.supabase.co", SUPABASE_SERVICE_ROLE_KEY: "x" },
    { endpoint: "t", severity: "error", err: new Error("e") },
  );
  globalThis.fetch = originalFetch;
  assert("persisted=false on Supabase 5xx", r.persisted === false);
}

// 16. PII safety: payload sent to Supabase contains hashes only, no plaintext
{
  let supabaseBody = null;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_url, init) => {
    if (init?.body) supabaseBody = init.body;
    return new Response("{}", { status: 201 });
  };
  await captureServerError(
    { SUPABASE_URL: "https://x.supabase.co", SUPABASE_SERVICE_ROLE_KEY: "key_secret_123" },
    {
      endpoint: "t",
      severity: "error",
      err: new Error("oops"),
      userIpHash: "hashed_ip",
      payloadHash: "hashed_payload",
    },
  );
  globalThis.fetch = originalFetch;
  assert("Supabase body contains user_ip_hash", supabaseBody?.includes("hashed_ip"));
  assert("Supabase body NEVER contains the SUPABASE_SERVICE_ROLE_KEY", !supabaseBody?.includes("key_secret_123"));
}

// 17. Resend alert subject includes severity uppercase + endpoint
{
  let resendBody = null;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    if (typeof url === "string" && url.includes("resend.com") && init?.body) {
      resendBody = JSON.parse(init.body);
    }
    return new Response("{}", { status: 200 });
  };
  await captureServerError(
    { RESEND_API_KEY: "x", OPERATOR_NOTIFY_EMAIL: "ops@example.com" },
    { endpoint: "my-endpoint", severity: "fatal", err: new Error("explode") },
  );
  globalThis.fetch = originalFetch;
  assert("alert subject contains severity uppercase", resendBody?.subject?.includes("FATAL"));
  assert("alert subject contains endpoint name", resendBody?.subject?.includes("my-endpoint"));
}

// 18. Caller's response path is unaffected when Supabase + Resend both fail
{
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("network down");
  };
  let captureThrew = false;
  try {
    const r = await captureServerError(
      { SUPABASE_URL: "x", SUPABASE_SERVICE_ROLE_KEY: "x", RESEND_API_KEY: "x", OPERATOR_NOTIFY_EMAIL: "x" },
      { endpoint: "t", severity: "error", err: new Error("e") },
    );
    assert("returns even when both channels fail", r.logged === true);
    assert("persisted=false on network failure", r.persisted === false);
    assert("alerted=false on network failure", r.alerted === false);
  } catch {
    captureThrew = true;
  }
  globalThis.fetch = originalFetch;
  assert("captureServerError NEVER throws on network failure", !captureThrew);
}

console.error = originalConsoleError;

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
