#!/usr/bin/env node
/**
 * Smoke test for functions/lib/structuredLog.ts
 *
 * Tests the makeEmit factory that consolidates 6 inline copies.
 * Verifies the JSON shape contract that Cloudflare Workers Logpush
 * + the system-health admin surface depend on (component field FIRST,
 * extra fields preserved, console.log called exactly once per emit).
 *
 * Run: npx tsx scripts/smoke-structured-log.mjs
 * Exits 0 if all assertions pass, 1 otherwise.
 */
import { makeEmit } from "../functions/lib/structuredLog.ts";

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const bold = "\x1b[1m";

const cases = [];
function assert(name, ok, hint = "") {
  cases.push({ name, ok, hint });
}

// Capture console.log calls instead of emitting noise to stdout.
const originalLog = console.log;
let captured = [];
console.log = (...args) => {
  captured.push(args);
};

function lastLine() {
  return captured.at(-1)?.[0];
}

function reset_capture() {
  captured = [];
}

// 1. emit produces one console.log call per invocation
{
  reset_capture();
  const emit = makeEmit("test");
  emit({ action: "x" });
  assert("emit fires console.log exactly once", captured.length === 1);
}

// 2. Output is valid JSON
{
  reset_capture();
  const emit = makeEmit("test");
  emit({ action: "x" });
  let parsed;
  try {
    parsed = JSON.parse(lastLine());
  } catch {
    /* parsed stays undefined */
  }
  assert("output is valid JSON", typeof parsed === "object" && parsed !== null);
}

// 3. component field present + matches the bound name
{
  reset_capture();
  const emit = makeEmit("audit-pdf");
  emit({ action: "render_ok" });
  const parsed = JSON.parse(lastLine());
  assert("component field present", parsed.component === "audit-pdf");
}

// 4. component field is FIRST in the serialized output
//    (matters for grep / Logpush prefix matching)
{
  reset_capture();
  const emit = makeEmit("client-error");
  emit({ ts: 123, action: "x" });
  const raw = lastLine();
  assert(
    "component is first key in serialized JSON",
    raw.startsWith('{"component":"client-error"'),
  );
}

// 5. Extra fields from line preserved
{
  reset_capture();
  const emit = makeEmit("quote-pdf");
  emit({ ts: 1714639200000, action: "render_ok", size: 17500 });
  const parsed = JSON.parse(lastLine());
  assert("extra ts preserved", parsed.ts === 1714639200000);
  assert("extra action preserved", parsed.action === "render_ok");
  assert("extra size preserved", parsed.size === 17500);
}

// 6. Caller cannot override component via line (component is set first
//    and spread comes after, so caller-supplied component WOULD win;
//    document this behavior so it's not relied on for security)
{
  reset_capture();
  const emit = makeEmit("a");
  emit({ component: "b", action: "x" });
  const parsed = JSON.parse(lastLine());
  // Spread of {component:"b"} happens AFTER {component:"a"}, so "b" wins.
  // This is the behavior the inline copies had too. Documented here so
  // refactoring this surface in future doesn't surprise anyone.
  assert(
    "caller-supplied component overrides bound (documented behavior)",
    parsed.component === "b",
  );
}

// 7. Empty line object emits just {component:...}
{
  reset_capture();
  const emit = makeEmit("test");
  emit({});
  const parsed = JSON.parse(lastLine());
  assert(
    "empty line emits component-only object",
    Object.keys(parsed).length === 1 && parsed.component === "test",
  );
}

// 8. Two separate emitters don't interfere
{
  reset_capture();
  const a = makeEmit("a");
  const b = makeEmit("b");
  a({ x: 1 });
  b({ x: 2 });
  assert("two emitters fire 2 lines total", captured.length === 2);
  const first = JSON.parse(captured[0][0]);
  const second = JSON.parse(captured[1][0]);
  assert("first emitter tagged a", first.component === "a");
  assert("second emitter tagged b", second.component === "b");
}

// 9. Nested objects preserved
{
  reset_capture();
  const emit = makeEmit("test");
  emit({ payload: { kind: "lead", domain: "x.example" } });
  const parsed = JSON.parse(lastLine());
  assert(
    "nested object preserved",
    parsed.payload?.kind === "lead" && parsed.payload?.domain === "x.example",
  );
}

// 10. Numeric and boolean values preserved
{
  reset_capture();
  const emit = makeEmit("test");
  emit({ count: 0, success: false, ratio: 0.5 });
  const parsed = JSON.parse(lastLine());
  assert("zero number preserved", parsed.count === 0);
  assert("false bool preserved", parsed.success === false);
  assert("float preserved", parsed.ratio === 0.5);
}

// 11. Null + undefined fields handled
{
  reset_capture();
  const emit = makeEmit("test");
  emit({ a: null, b: undefined, c: "ok" });
  const parsed = JSON.parse(lastLine());
  assert("null preserved", parsed.a === null);
  // JSON.stringify drops undefined keys, so b should not appear
  assert("undefined dropped per JSON spec", !("b" in parsed));
  assert("trailing key c preserved", parsed.c === "ok");
}

// 12. makeEmit returns a function (type contract)
{
  const emit = makeEmit("test");
  assert("makeEmit returns a function", typeof emit === "function");
}

// Restore stdout
console.log = originalLog;

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
