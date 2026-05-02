#!/usr/bin/env node
/**
 * Smoke test for functions/lib/htmlEscape.ts
 *
 * Tests escapeHtml() contract: 5 chars escaped, idempotency NOT
 * guaranteed (double-escapes by design), null/undefined tolerated,
 * non-string coerced to string.
 *
 * Run: npx tsx scripts/smoke-html-escape.mjs
 * Exits 0 if all assertions pass, 1 otherwise.
 */
import { escapeHtml } from "../functions/lib/htmlEscape.ts";

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const bold = "\x1b[1m";

const cases = [];
function assert(name, ok, hint = "") {
  cases.push({ name, ok, hint });
}

// 1. ampersand
assert("& -> &amp;", escapeHtml("a & b") === "a &amp; b");

// 2. less-than
assert("< -> &lt;", escapeHtml("<script>") === "&lt;script&gt;");

// 3. greater-than. Already covered above; standalone case:
assert("> -> &gt; (alone)", escapeHtml("a > b") === "a &gt; b");

// 4. double quote
assert("\" -> &quot;", escapeHtml('say "hi"') === "say &quot;hi&quot;");

// 5. single quote
assert("' -> &#39;", escapeHtml("it's me") === "it&#39;s me");

// 6. all five together
assert(
  "all 5 chars escape together",
  escapeHtml(`<a href="x?a=1&b=2">it's</a>`) ===
    "&lt;a href=&quot;x?a=1&amp;b=2&quot;&gt;it&#39;s&lt;/a&gt;",
);

// 7. ordering matters: ampersand FIRST so we don't double-escape entities
//    that we just added. Verify by escaping a string that contains &amp;
//    literal: it should become &amp;amp; (correct, idempotent semantics
//    explicitly NOT guaranteed per the lib contract).
assert(
  "& escaped first (entity preserved literal)",
  escapeHtml("&amp;") === "&amp;amp;",
);

// 8. empty string
assert("empty string -> empty", escapeHtml("") === "");

// 9. plain text untouched
assert(
  "plain text untouched",
  escapeHtml("Hello, world! 123") === "Hello, world! 123",
);

// 10. unicode untouched (non-ASCII is fine in HTML body when UTF-8)
assert(
  "unicode untouched",
  escapeHtml("Ça va? — 日本語 — مرحبا") === "Ça va? — 日本語 — مرحبا",
);

// 11. null -> ""
assert("null -> empty string", escapeHtml(null) === "");

// 12. undefined -> ""
assert("undefined -> empty string", escapeHtml(undefined) === "");

// 13. number coerced to string
assert("number coerced to string", escapeHtml(42) === "42");

// 14. boolean coerced
assert("boolean coerced to string", escapeHtml(true) === "true");

// 15. injection attempt with mixed payload
assert(
  "XSS payload neutralized",
  escapeHtml('<img src=x onerror="alert(1)">') ===
    "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;",
);

// 16. double-escape behavior (NOT idempotent — documented in lib)
{
  const once = escapeHtml("<>");
  const twice = escapeHtml(once);
  assert("double-escape produces different output", once !== twice);
  assert(
    "double-escape produces &amp;lt;&amp;gt;",
    twice === "&amp;lt;&amp;gt;",
  );
}

// 17. very long input passes through linearly
{
  const long = "<".repeat(10_000);
  const out = escapeHtml(long);
  assert("long input length preserved (4 * input)", out.length === 4 * long.length);
  assert("long input all escaped", out === "&lt;".repeat(10_000));
}

// 18. mixed string + number + null sequence (template-like)
{
  const name = "O'Brien";
  const count = 5;
  const optional = null;
  const html = `<div>${escapeHtml(name)} (${escapeHtml(count)}) ${escapeHtml(optional)}</div>`;
  assert(
    "template interpolation safe",
    html === "<div>O&#39;Brien (5) </div>",
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
