// HMAC-SHA256 signer/verifier for the audit PDF download links.
//
// The /api/audit-pdf endpoint generates a one-time URL of the form
//   /api/audit-pdf-download/{objectId}?exp={unixSeconds}&sig={hex}
// where sig = HMAC-SHA256(secret, `${objectId}|${exp}`).
//
// On verification, /api/audit-pdf-download/[id] re-computes the HMAC and
// compares in constant time. If the timestamp is in the past or the HMAC
// mismatches, the request is rejected.
//
// Web Crypto API is available globally in Cloudflare Workers; no polyfills.

const ALG = { name: 'HMAC', hash: 'SHA-256' } as const;

/**
 * Convert a hex string to Uint8Array. Throws on invalid input.
 */
function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) throw new Error('hex string must have even length');
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    const byte = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    if (Number.isNaN(byte)) throw new Error('invalid hex');
    out[i] = byte;
  }
  return out;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Constant-time comparison of two equal-length byte arrays.
 */
function ctEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function importHmacKey(secretHex: string): Promise<CryptoKey> {
  const keyBytes = hexToBytes(secretHex);
  // The key import expects an ArrayBuffer with no SharedArrayBuffer typing
  // mismatch, so we slice to a fresh buffer view.
  return crypto.subtle.importKey('raw', keyBytes, ALG, false, ['sign', 'verify']);
}

export interface SignedDownload {
  objectId: string;
  expUnixSeconds: number;
  sig: string; // hex
}

/**
 * Sign an object id + expiry. Returns the hex signature; the caller assembles
 * the URL.
 */
export async function signDownload(
  secretHex: string,
  objectId: string,
  expUnixSeconds: number,
): Promise<string> {
  if (!/^[A-Za-z0-9_-]{8,128}$/.test(objectId)) throw new Error('objectId must be url-safe 8-128 chars');
  if (expUnixSeconds <= 0) throw new Error('exp must be positive');
  const key = await importHmacKey(secretHex);
  const message = new TextEncoder().encode(`${objectId}|${expUnixSeconds}`);
  const sig = await crypto.subtle.sign(ALG, key, message);
  return bytesToHex(new Uint8Array(sig));
}

export type VerifyResult =
  | { ok: true }
  | { ok: false; reason: 'expired' | 'sig_mismatch' | 'malformed' };

export async function verifyDownload(
  secretHex: string,
  objectId: string,
  expUnixSeconds: number,
  providedSigHex: string,
  nowUnixSeconds: number = Math.floor(Date.now() / 1000),
): Promise<VerifyResult> {
  try {
    if (nowUnixSeconds > expUnixSeconds) return { ok: false, reason: 'expired' };
    const expected = await signDownload(secretHex, objectId, expUnixSeconds);
    const a = hexToBytes(expected);
    const b = hexToBytes(providedSigHex);
    return ctEqual(a, b) ? { ok: true } : { ok: false, reason: 'sig_mismatch' };
  } catch {
    return { ok: false, reason: 'malformed' };
  }
}

/**
 * Generate a URL-safe random object id (24 chars, ~144 bits of entropy).
 * Uses crypto.getRandomValues() which is available in all Worker runtimes.
 */
export function newObjectId(): string {
  const bytes = new Uint8Array(18);
  crypto.getRandomValues(bytes);
  // base64url
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  // Workers don't have Buffer; use atob/btoa
  const b64 = btoa(bin);
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
