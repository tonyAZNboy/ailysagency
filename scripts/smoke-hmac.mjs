#!/usr/bin/env node
/**
 * Smoke test for functions/lib/hmac.ts
 *
 * Tests hexToBytes, importHmacKey, constantTimeEqualBytes that
 * consolidate 7 inline copies across 5 files. Auth-critical: any
 * subtle bug in these primitives compromises HMAC signature
 * verification across audit-pdf downloads, service-to-service auth,
 * unsubscribe tokens, and Resend webhooks.
 *
 * Run: npx tsx scripts/smoke-hmac.mjs
 * Exits 0 if all assertions pass, 1 otherwise.
 */
import {
  hexToBytes,
  importHmacKey,
  constantTimeEqualBytes,
} from "../functions/lib/hmac.ts";

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const bold = "\x1b[1m";

const cases = [];
function assert(name, ok, hint = "") {
  cases.push({ name, ok, hint });
}

// === hexToBytes ===

// 1. Empty string
{
  const b = hexToBytes("");
  assert("hexToBytes('') -> Uint8Array(0)", b instanceof Uint8Array && b.length === 0);
}

// 2. Single byte
{
  const b = hexToBytes("ff");
  assert("hexToBytes('ff') -> [255]", b.length === 1 && b[0] === 0xff);
}

// 3. Multi byte
{
  const b = hexToBytes("00010aff");
  assert(
    "hexToBytes('00010aff') -> [0,1,10,255]",
    b.length === 4 && b[0] === 0 && b[1] === 1 && b[2] === 10 && b[3] === 255,
  );
}

// 4. Uppercase hex tolerated (parseInt handles both)
{
  const b = hexToBytes("AB");
  assert("hexToBytes uppercase 'AB' -> [171]", b[0] === 0xab);
}

// 5. Throws on odd length
{
  let threw = false;
  try {
    hexToBytes("abc");
  } catch {
    threw = true;
  }
  assert("hexToBytes throws on odd length", threw);
}

// 6. Throws on non-hex character
{
  let threw = false;
  try {
    hexToBytes("zz");
  } catch {
    threw = true;
  }
  assert("hexToBytes throws on non-hex 'zz'", threw);
}

// 7. Throws on non-string input
{
  let threw = false;
  try {
    hexToBytes(123);
  } catch {
    threw = true;
  }
  assert("hexToBytes throws on number input", threw);
}

// === importHmacKey ===

// 8. Returns a CryptoKey
{
  const secret = "deadbeef".repeat(8); // 32 bytes (HMAC-SHA256 std key length)
  const key = await importHmacKey(secret);
  assert("importHmacKey returns object", typeof key === "object" && key !== null);
  assert("importHmacKey result has type 'secret'", key.type === "secret");
  assert(
    "importHmacKey result has algorithm HMAC",
    key.algorithm?.name === "HMAC",
  );
}

// 9. Key supports sign + verify
{
  const secret = "deadbeef".repeat(8);
  const key = await importHmacKey(secret);
  const usages = new Set(key.usages);
  assert("key supports sign", usages.has("sign"));
  assert("key supports verify", usages.has("verify"));
}

// 10. Round-trip: sign with key, verify byte-equal
{
  const secret = "deadbeef".repeat(8);
  const key = await importHmacKey(secret);
  const message = new TextEncoder().encode("hello world");
  const sig1 = await crypto.subtle.sign({ name: "HMAC", hash: "SHA-256" }, key, message);
  const sig2 = await crypto.subtle.sign({ name: "HMAC", hash: "SHA-256" }, key, message);
  assert(
    "deterministic signing (same input + same key)",
    constantTimeEqualBytes(new Uint8Array(sig1), new Uint8Array(sig2)),
  );
}

// 11. Throws on invalid hex secret
{
  let threw = false;
  try {
    await importHmacKey("notvalidhex!");
  } catch {
    threw = true;
  }
  assert("importHmacKey throws on invalid hex", threw);
}

// === constantTimeEqualBytes ===

// 12. Equal arrays
{
  const a = new Uint8Array([1, 2, 3, 4]);
  const b = new Uint8Array([1, 2, 3, 4]);
  assert("equal arrays -> true", constantTimeEqualBytes(a, b));
}

// 13. Different last byte
{
  const a = new Uint8Array([1, 2, 3, 4]);
  const b = new Uint8Array([1, 2, 3, 5]);
  assert("differ on last byte -> false", !constantTimeEqualBytes(a, b));
}

// 14. Different first byte
{
  const a = new Uint8Array([1, 2, 3, 4]);
  const b = new Uint8Array([0, 2, 3, 4]);
  assert("differ on first byte -> false", !constantTimeEqualBytes(a, b));
}

// 15. Different lengths
{
  const a = new Uint8Array([1, 2, 3]);
  const b = new Uint8Array([1, 2, 3, 0]);
  assert("different lengths -> false", !constantTimeEqualBytes(a, b));
}

// 16. Empty arrays
{
  assert(
    "two empty arrays -> true",
    constantTimeEqualBytes(new Uint8Array(0), new Uint8Array(0)),
  );
}

// 17. 32-byte digest comparison (typical HMAC use case)
{
  const a = new Uint8Array(32).fill(0x42);
  const b = new Uint8Array(32).fill(0x42);
  const c = new Uint8Array(32).fill(0x42);
  c[31] = 0x43; // single byte difference
  assert("32-byte equal digests -> true", constantTimeEqualBytes(a, b));
  assert(
    "32-byte digests differ on last byte -> false",
    !constantTimeEqualBytes(a, c),
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
