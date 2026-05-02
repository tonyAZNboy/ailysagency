#!/usr/bin/env node
/**
 * Smoke test for functions/lib/stringClip.ts
 *
 * Tests both clip (trimmed, returns null on empty) and clipUntrimmed
 * (raw slice, returns "" on "") that consolidate 8 inline copies
 * across edge fns. Verifies type guard, length cap, trim semantics,
 * and the deliberate variant difference.
 *
 * Run: npx tsx scripts/smoke-string-clip.mjs
 * Exits 0 if all assertions pass, 1 otherwise.
 */
import { clip, clipUntrimmed } from "../functions/lib/stringClip.ts";

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const bold = "\x1b[1m";

const cases = [];
function assert(name, ok, hint = "") {
  cases.push({ name, ok, hint });
}

// === clip (trimmed) ===

// 1. Plain string under cap returned untouched
assert("clip 'hello' max 100 -> 'hello'", clip("hello", 100) === "hello");

// 2. Truncated at cap
assert("clip long string truncated", clip("hello world", 5) === "hello");

// 3. Trimmed leading + trailing whitespace
assert("clip '  hello  ' -> 'hello'", clip("  hello  ", 100) === "hello");

// 4. Empty after trim -> null
assert("clip '   ' (whitespace only) -> null", clip("   ", 100) === null);
assert("clip '' -> null", clip("", 100) === null);

// 5. Non-string -> null
assert("clip null -> null", clip(null, 100) === null);
assert("clip undefined -> null", clip(undefined, 100) === null);
assert("clip 42 -> null", clip(42, 100) === null);
assert("clip {} -> null", clip({}, 100) === null);
assert("clip [] -> null", clip([], 100) === null);
assert("clip true -> null", clip(true, 100) === null);

// 6. Trim happens BEFORE truncation (so 'aaaa  ' max 4 -> 'aaaa', not 'aaaa  '.slice(0,4))
assert(
  "clip trim then truncate (whitespace stripped first)",
  clip("aaaa  ", 4) === "aaaa",
);

// 7. Truncation happens after trim (long input with surrounding ws)
assert(
  "clip '  abcdefgh  ' max 4 -> 'abcd'",
  clip("  abcdefgh  ", 4) === "abcd",
);

// 8. Unicode preserved
assert("clip 'Ça va' max 100 -> 'Ça va'", clip("Ça va", 100) === "Ça va");
// Note: slice(0, 4) on 'Ça va' yields 'Ça v' (4 UTF-16 units; Ç is 1 unit)
assert("clip 'Ça va' max 4 -> 'Ça v'", clip("Ça va", 4) === "Ça v");

// === clipUntrimmed (raw) ===

// 9. Plain string preserved
assert(
  "clipUntrimmed 'hello' max 100 -> 'hello'",
  clipUntrimmed("hello", 100) === "hello",
);

// 10. Truncated at cap (no trim)
assert(
  "clipUntrimmed '  hello world  ' max 8 -> '  hello '",
  clipUntrimmed("  hello world  ", 8) === "  hello ",
);

// 11. Empty string -> "" (NOT null, this is the variant difference)
assert("clipUntrimmed '' -> ''", clipUntrimmed("", 100) === "");

// 12. Whitespace-only preserved untouched
assert(
  "clipUntrimmed '   ' max 100 -> '   ' (no trim)",
  clipUntrimmed("   ", 100) === "   ",
);

// 13. Non-string -> null (same as clip)
assert("clipUntrimmed null -> null", clipUntrimmed(null, 100) === null);
assert("clipUntrimmed undefined -> null", clipUntrimmed(undefined, 100) === null);
assert("clipUntrimmed 42 -> null", clipUntrimmed(42, 100) === null);

// 14. Variant difference asserted explicitly
{
  const ws = "   ";
  const a = clip(ws, 100);
  const b = clipUntrimmed(ws, 100);
  assert(
    "clip and clipUntrimmed differ on whitespace-only input",
    a !== b && a === null && b === "   ",
  );
}

// 15. max=0: empty-check is BEFORE slice, so 'hello' (non-empty)
//     passes the check, then slices to '' (post-slice empty allowed).
assert(
  "clip 'hello' max 0 -> '' (slice produces empty after passing trim check)",
  clip("hello", 0) === "",
);

// 16. Long input bounded
{
  const long = "x".repeat(10_000);
  const out = clip(long, 100);
  assert("clip 10000-char input bounded to 100", out !== null && out.length === 100);
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
