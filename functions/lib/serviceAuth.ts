// Service-to-service HMAC auth.
//
// Used by AiLys endpoints that other AiLys-stack services (Reviuzy edge fns
// today, future internal services tomorrow) call directly without a user
// session. The caller signs the HMAC of `${timestamp}|${bodyHash}` with the
// shared secret and sends three headers:
//
//   X-AiLys-Service-Token       : hex HMAC-SHA256
//   X-AiLys-Service-Timestamp   : unix seconds (UTC)
//   X-AiLys-Service-Caller      : short identifier (e.g. "reviuzy-provision-tenant")
//
// We verify by:
//   1. Both headers present + caller is on the allowlist
//   2. Timestamp within +/- 300 seconds of server clock (replay window)
//   3. Recompute HMAC over `${timestamp}|${sha256(body)}`
//   4. Constant-time compare to provided token
//
// `AILYS_SERVICE_SHARED_SECRET` must be set in Pages env. If missing,
// every request is rejected with 503 (fail-closed).
//
// Threat model:
// - Replay attack: 5-min window + caller-side single-use stipulated
// - Tampered body: HMAC includes body hash
// - Tampered headers: HMAC includes timestamp; can't forge without secret
// - Constant-time compare: prevents timing oracle
// - Caller allowlist: prevents misuse if secret leaks (though secret leak
//   would still be game-over; the allowlist is defense in depth)

const ALG = { name: 'HMAC', hash: 'SHA-256' } as const;
const REPLAY_WINDOW_SECONDS = 300; // +/- 5 minutes

/** Allowlist of caller identifiers. Update as new internal services come online. */
const ALLOWED_CALLERS = new Set([
  'reviuzy-provision-tenant',
  'reviuzy-monthly-report-batch',
  'reviuzy-anomaly-remediation',
  'reviuzy-admin-audit-pdf-stats', // B.4.4: Reviuzy admin reads AiLys audit-pdf observability
  'reviuzy-admin-instant-ai-vis-stats', // E.3: Reviuzy admin reads AiLys instant AI vis observability
  'reviuzy-admin-quote-pdf-stats', // E.3: Reviuzy admin reads AiLys quote-pdf observability
  'reviuzy-admin-client-error-stats', // E.12: Reviuzy admin reads AiLys client-error observability
  'ailys-cron-day1-retry', // self-call from AiLys cron worker
  'ailys-cron-process-sequences', // external cron that drains email_sequence_enrollments
]);

function hexToBytes(hex: string): Uint8Array {
  if (typeof hex !== 'string' || hex.length % 2 !== 0) throw new Error('invalid hex');
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    const byte = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    if (Number.isNaN(byte)) throw new Error('invalid hex');
    out[i] = byte;
  }
  return out;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function ctEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function importHmacKey(secretHex: string): Promise<CryptoKey> {
  const keyBytes = hexToBytes(secretHex);
  return crypto.subtle.importKey('raw', keyBytes, ALG, false, ['sign', 'verify']);
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return bytesToHex(new Uint8Array(buf));
}

/**
 * Sign a request body for service-to-service auth. Used by tests and by
 * internal callers that compose requests in JS. External callers (Reviuzy
 * edge fn) implement the same logic in their own runtime.
 */
export async function signServiceRequest(
  secretHex: string,
  bodyText: string,
  timestampUnixSeconds: number,
): Promise<string> {
  const key = await importHmacKey(secretHex);
  const bodyHash = await sha256Hex(bodyText);
  const message = new TextEncoder().encode(`${timestampUnixSeconds}|${bodyHash}`);
  const sig = await crypto.subtle.sign(ALG, key, message);
  return bytesToHex(new Uint8Array(sig));
}

export type VerifyResult =
  | { ok: true; caller: string }
  | { ok: false; reason: 'no_secret' | 'missing_headers' | 'caller_not_allowed' | 'timestamp_invalid' | 'timestamp_skewed' | 'sig_mismatch' | 'malformed' };

/**
 * Verify a request's service auth headers. Pass the raw body text as well
 * (not the parsed JSON) because we hash the bytes the caller signed, not
 * a re-serialization which could differ in whitespace/key order.
 */
export async function verifyServiceRequest(
  secretHex: string | undefined,
  request: Request,
  bodyText: string,
  nowUnixSeconds: number = Math.floor(Date.now() / 1000),
): Promise<VerifyResult> {
  if (!secretHex) return { ok: false, reason: 'no_secret' };

  const token = request.headers.get('X-AiLys-Service-Token');
  const tsHeader = request.headers.get('X-AiLys-Service-Timestamp');
  const caller = request.headers.get('X-AiLys-Service-Caller');

  if (!token || !tsHeader || !caller) return { ok: false, reason: 'missing_headers' };
  if (!ALLOWED_CALLERS.has(caller)) return { ok: false, reason: 'caller_not_allowed' };

  const ts = parseInt(tsHeader, 10);
  if (!Number.isFinite(ts) || ts <= 0) return { ok: false, reason: 'timestamp_invalid' };
  if (Math.abs(nowUnixSeconds - ts) > REPLAY_WINDOW_SECONDS) {
    return { ok: false, reason: 'timestamp_skewed' };
  }

  try {
    const expected = await signServiceRequest(secretHex, bodyText, ts);
    const a = hexToBytes(expected);
    const b = hexToBytes(token);
    return ctEqual(a, b) ? { ok: true, caller } : { ok: false, reason: 'sig_mismatch' };
  } catch {
    return { ok: false, reason: 'malformed' };
  }
}

export const SERVICE_AUTH_REPLAY_WINDOW_SECONDS = REPLAY_WINDOW_SECONDS;
export const SERVICE_AUTH_ALLOWED_CALLERS = ALLOWED_CALLERS;
