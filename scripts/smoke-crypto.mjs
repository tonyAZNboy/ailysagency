#!/usr/bin/env node
/**
 * Smoke test for functions/lib/crypto.ts
 *
 * Tests the canonical sha256Hex + bytesToHex helpers that consolidate
 * 10 inline copies. Verifies known-good vectors against published
 * SHA-256 reference outputs, plus the bytesToHex contract.
 *
 * Run: npx tsx scripts/smoke-crypto.mjs
 * Exits 0 if all assertions pass, 1 otherwise.
 */
import { sha256Hex, bytesToHex } from "../functions/lib/crypto.ts";

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const bold = "\x1b[1m";

const cases = [];
function assert(name, ok, hint = "") {
  cases.push({ name, ok, hint });
}

// 1. Empty string. Reference: NIST FIPS 180-4 test vector.
assert(
  "sha256Hex('') = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  (await sha256Hex("")) ===
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
);

// 2. 'abc'. Reference: NIST FIPS 180-4 test vector.
assert(
  "sha256Hex('abc') = ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
  (await sha256Hex("abc")) ===
    "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
);

// 3. UTF-8 multi-byte ('Ça va?')
{
  const out = await sha256Hex("Ça va?");
  assert("sha256Hex UTF-8 produces 64-char hex", out.length === 64);
  assert("sha256Hex UTF-8 is lowercase hex", /^[0-9a-f]{64}$/.test(out));
}

// 4. Determinism: same input -> same output across calls
{
  const a = await sha256Hex("partner-app:test@example.com");
  const b = await sha256Hex("partner-app:test@example.com");
  assert("sha256Hex deterministic", a === b);
}

// 5. Different input -> different output
{
  const a = await sha256Hex("a");
  const b = await sha256Hex("b");
  assert("sha256Hex different input -> different hash", a !== b);
}

// 6. 64-character hex output for any input
{
  const samples = ["", "x", "x".repeat(1000), "🦊", "  ", "\n\t"];
  for (const s of samples) {
    const out = await sha256Hex(s);
    assert(
      `sha256Hex 64-char hex for ${JSON.stringify(s).slice(0, 20)}`,
      out.length === 64 && /^[0-9a-f]{64}$/.test(out),
    );
  }
}

// 7. Long input handled
{
  const long = "x".repeat(100_000);
  const out = await sha256Hex(long);
  assert("sha256Hex long input length 64", out.length === 64);
}

// 8. bytesToHex empty array
assert("bytesToHex empty array = ''", bytesToHex(new Uint8Array(0)) === "");

// 9. bytesToHex single byte
assert("bytesToHex [0x00] = '00'", bytesToHex(new Uint8Array([0])) === "00");
assert("bytesToHex [0xff] = 'ff'", bytesToHex(new Uint8Array([255])) === "ff");

// 10. bytesToHex pads to 2 hex chars per byte
assert(
  "bytesToHex [0x01, 0x0a, 0xff] = '010aff'",
  bytesToHex(new Uint8Array([0x01, 0x0a, 0xff])) === "010aff",
);

// 11. bytesToHex matches sha256Hex output (32 bytes = 64 hex chars)
{
  const data = new TextEncoder().encode("abc");
  const buf = await crypto.subtle.digest("SHA-256", data);
  const viaHelper = bytesToHex(new Uint8Array(buf));
  assert(
    "bytesToHex of SHA-256 digest matches sha256Hex",
    viaHelper === (await sha256Hex("abc")),
  );
}

// 12. bytesToHex is all-lowercase
{
  const out = bytesToHex(new Uint8Array([0xab, 0xcd, 0xef]));
  assert("bytesToHex output is lowercase hex", out === "abcdef");
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
