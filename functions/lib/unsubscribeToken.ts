/**
 * HMAC-signed unsubscribe tokens for newsletter.
 *
 * Token format (URL-safe base64): `${emailHashLow}.${expUnix}.${sigHex}`
 * - emailHashLow: first 16 hex chars of SHA-256(email + secret) : opaque ID,
 *   doesn't expose the email but is deterministic so we can rebuild it server-side
 * - expUnix: token expiry (seconds since epoch). Default 1 year.
 * - sigHex: HMAC-SHA256(`${emailHashLow}.${expUnix}`, secret)
 *
 * The email itself is passed alongside the token in the URL (?email=...) so the
 * unsubscribe handler can verify it matches and update the right row. This
 * double-binding prevents token reuse for a different email.
 */

const TOKEN_TTL_SECONDS = 365 * 24 * 60 * 60; // 1 year

async function importHmacKey(secretHex: string): Promise<CryptoKey> {
  const bytes = new Uint8Array(secretHex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(secretHex.slice(i * 2, i * 2 + 2), 16);
  }
  return crypto.subtle.importKey(
    'raw',
    bytes,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
}

async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export interface SignOptions {
  email: string;
  /** 64-char hex secret (32 random bytes). */
  secret: string;
  /** Optional override for testing. Defaults to now + 1 year. */
  expUnixSeconds?: number;
}

/**
 * Sign an unsubscribe token. Returns the token string.
 */
export async function signUnsubscribeToken(opts: SignOptions): Promise<string> {
  const exp = opts.expUnixSeconds ?? Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS;
  const emailHashLow = (await sha256Hex(opts.email + opts.secret)).slice(0, 16);
  const message = `${emailHashLow}.${exp}`;
  const key = await importHmacKey(opts.secret);
  const sigBytes = new Uint8Array(
    await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message)),
  );
  const sigHex = bytesToHex(sigBytes);
  return `${emailHashLow}.${exp}.${sigHex}`;
}

export type VerifyResult =
  | { ok: true }
  | { ok: false; reason: 'malformed' | 'expired' | 'sig_mismatch' | 'email_mismatch' };

/**
 * Verify an unsubscribe token against the supplied email.
 * Constant-time comparison; returns structured reason on failure.
 */
export async function verifyUnsubscribeToken(
  token: string,
  email: string,
  secret: string,
  nowUnixSeconds: number = Math.floor(Date.now() / 1000),
): Promise<VerifyResult> {
  if (!token || !email || !secret) return { ok: false, reason: 'malformed' };

  const parts = token.split('.');
  if (parts.length !== 3) return { ok: false, reason: 'malformed' };
  const [emailHashLow, expStr, providedSigHex] = parts;
  if (!/^[a-f0-9]{16}$/.test(emailHashLow)) return { ok: false, reason: 'malformed' };
  if (!/^[a-f0-9]{64}$/.test(providedSigHex)) return { ok: false, reason: 'malformed' };

  const exp = parseInt(expStr, 10);
  if (!Number.isFinite(exp)) return { ok: false, reason: 'malformed' };
  if (exp < nowUnixSeconds) return { ok: false, reason: 'expired' };

  // Verify the email matches (token is bound to the email)
  const expectedHashLow = (await sha256Hex(email + secret)).slice(0, 16);
  if (!constantTimeEqual(emailHashLow, expectedHashLow)) {
    return { ok: false, reason: 'email_mismatch' };
  }

  // Verify HMAC
  const message = `${emailHashLow}.${exp}`;
  const key = await importHmacKey(secret);
  const expectedSigBytes = new Uint8Array(
    await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message)),
  );
  const expectedSigHex = bytesToHex(expectedSigBytes);
  if (!constantTimeEqual(providedSigHex, expectedSigHex)) {
    return { ok: false, reason: 'sig_mismatch' };
  }

  return { ok: true };
}
