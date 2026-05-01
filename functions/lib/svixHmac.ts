/**
 * Svix-style webhook signature verification (used by Resend).
 *
 * Resend sends three headers on every webhook delivery:
 *   svix-id       :unique message ID (use as idempotency key)
 *   svix-timestamp:unix seconds when Resend signed the payload
 *   svix-signature:space-separated list of "v1,<base64>" entries
 *
 * The signed message is `${svixId}.${svixTimestamp}.${rawBody}`.
 * The HMAC key is base64-decode of secret after stripping the `whsec_` prefix.
 *
 * Spec: https://docs.svix.com/receiving/verifying-payloads/how-manual
 */

const TOLERANCE_SECONDS = 5 * 60;

export type VerifyResult =
  | { ok: true }
  | { ok: false; reason: 'missing_headers' | 'malformed_secret' | 'malformed_signature' | 'timestamp_outside_tolerance' | 'sig_mismatch' };

function base64Decode(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function bytesToBase64(bytes: Uint8Array): string {
  let s = '';
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function verifySvixSignature(
  secret: string | undefined,
  svixId: string | null,
  svixTimestamp: string | null,
  svixSignature: string | null,
  rawBody: string,
  nowUnixSeconds: number = Math.floor(Date.now() / 1000),
): Promise<VerifyResult> {
  if (!secret || !svixId || !svixTimestamp || !svixSignature) {
    return { ok: false, reason: 'missing_headers' };
  }

  if (!secret.startsWith('whsec_')) {
    return { ok: false, reason: 'malformed_secret' };
  }
  let keyBytes: Uint8Array;
  try {
    keyBytes = base64Decode(secret.slice('whsec_'.length));
  } catch {
    return { ok: false, reason: 'malformed_secret' };
  }

  const ts = parseInt(svixTimestamp, 10);
  if (!Number.isFinite(ts)) {
    return { ok: false, reason: 'timestamp_outside_tolerance' };
  }
  if (Math.abs(nowUnixSeconds - ts) > TOLERANCE_SECONDS) {
    return { ok: false, reason: 'timestamp_outside_tolerance' };
  }

  // Parse "v1,sig1 v1,sig2 ..."
  const candidates = svixSignature
    .split(' ')
    .map((s) => s.split(','))
    .filter(([ver, sig]) => ver === 'v1' && sig)
    .map(([, sig]) => sig);

  if (candidates.length === 0) {
    return { ok: false, reason: 'malformed_signature' };
  }

  const message = new TextEncoder().encode(`${svixId}.${svixTimestamp}.${rawBody}`);
  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const expected = bytesToBase64(new Uint8Array(await crypto.subtle.sign('HMAC', key, message)));

  for (const cand of candidates) {
    if (constantTimeEqual(cand, expected)) {
      return { ok: true };
    }
  }
  return { ok: false, reason: 'sig_mismatch' };
}
