// Shared HMAC primitives for Cloudflare Pages Functions.
//
// Replaces 7 duplicate inline copies across 5 files:
//   - functions/lib/pdfHmac.ts: hexToBytes + importHmacKey + ctEqual
//   - functions/lib/serviceAuth.ts: hexToBytes + importHmacKey + ctEqual
//   - functions/lib/unsubscribeToken.ts: importHmacKey
//   - functions/lib/svixHmac.ts: (string constantTimeEqual via rateLimit)
//   - functions/api/cron-process-sequences.ts: (string constantTimeEqual via rateLimit)
//
// Why a dedicated hmac module
// ---------------------------
// All four primitives below are auth-critical: a subtle bug (e.g.,
// non-constant-time compare, hex-parse error) compromises HMAC
// signature verification. One canonical implementation + one smoke
// test means a single source of truth for security-sensitive logic.
//
// Existing string-variant `constantTimeEq` already lives in
// functions/lib/rateLimit.ts (re-imported here as part of refactor;
// no behavior change). We add `constantTimeEqualBytes` for byte-array
// compares (used by HMAC verification on Uint8Array digests).
//
// Why this dep
// ------------
// NO new dep. Uses native crypto.subtle (Workers + Node ≥ 22).

/**
 * Parse a hex string to a Uint8Array.
 * Throws "invalid hex" if input is not a valid even-length hex string.
 *
 * Used by importHmacKey to convert a HMAC secret stored as hex into
 * the raw bytes required by crypto.subtle.importKey.
 */
export function hexToBytes(hex: string): Uint8Array {
  if (typeof hex !== "string" || hex.length % 2 !== 0) throw new Error("invalid hex");
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    const byte = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    if (Number.isNaN(byte)) throw new Error("invalid hex");
    out[i] = byte;
  }
  return out;
}

/**
 * Build a HMAC-SHA256 CryptoKey from a hex-encoded secret. The
 * resulting key is suitable for both `sign` and `verify` operations.
 *
 * Throws "invalid hex" if the secret cannot be parsed.
 */
export async function importHmacKey(secretHex: string): Promise<CryptoKey> {
  const keyBytes = hexToBytes(secretHex);
  return crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

/**
 * Constant-time equality for Uint8Array digests. Used to compare
 * HMAC signatures without leaking timing information.
 *
 * Returns false immediately if lengths differ; otherwise XORs every
 * byte and ORs the results, yielding 0 only when all bytes match.
 */
export function constantTimeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}
