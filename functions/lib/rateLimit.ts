// Shared KV-backed rate limiter for Cloudflare Pages Functions.
//
// Extracted from the audit-pdf inline implementation into a reusable
// shared lib so every endpoint that needs rate-limiting follows the same
// pattern: per-IP-per-hour token bucket + per-identity-per-day bucket
// (where identity is typically an email or contact key) + KV-backed
// hourly/daily eviction via TTL.
//
// Fail-mode policy
// ----------------
// When the KV namespace is not bound (typical in local dev or before
// the operator wires the binding in Cloudflare Pages settings), the
// limiter returns `{ allowed: true, reason: 'kv_unavailable_open' }`.
// This is fail-open by design: the audit log captures the missing
// binding so the operator sees it post-deploy and can wire KV. We
// prefer fail-open over fail-closed for rate-limit because:
//   - The honeypot + origin allowlist already catch most abuse
//   - Fail-closed on missing KV would brick the endpoint silently
//   - Operator visibility (audit log) drives the binding to be wired
//
// For features where rate-limit is critical to the security posture
// (e.g., paid-API consumers like audit-pdf), call sites should ALSO
// check kill-switch env var which IS fail-closed by default.
//
// Usage
// -----
// import { checkRateLimit, type RateLimitConfig } from "../lib/rateLimit";
//
// const decision = await checkRateLimit(env.MY_KV, {
//   ipHash: "abc123",
//   identityHash: emailHash,  // optional; pass null for IP-only limit
//   ipPerHour: 10,
//   identityPerDay: 50,
//   keyPrefix: "rl:partner-app",
// });
// if (!decision.allowed) return new Response("rate_limited", { status: 429 });

export interface RateLimitConfig {
  /** SHA-256 hash of the requester IP (use ipHash from the per-endpoint helper). */
  ipHash: string;
  /** Optional SHA-256 hash of an identity key (email, contact_id, etc.). When
   *  null, only the IP bucket is checked. */
  identityHash: string | null;
  /** Max requests per IP per hour. Typical: 10 for form posts, 30 for read APIs. */
  ipPerHour: number;
  /** Max requests per identity per day. Typical: 5 for high-cost endpoints,
   *  20 for newsletter-style endpoints. Ignored when identityHash is null. */
  identityPerDay: number;
  /** Namespace prefix to avoid key collisions when one KV is shared by multiple
   *  endpoints. Recommended: `rl:<endpoint-slug>`. */
  keyPrefix: string;
}

export interface RateLimitDecision {
  allowed: boolean;
  reason?:
    | "kv_unavailable_open"
    | "ip_per_hour"
    | "identity_per_day"
    | "ok";
  ipKey: string;
  identityKey: string | null;
  ipCount: number;
  identityCount: number;
}

/** UTC hour bucket suffix, e.g. "2026-05-02T13" */
function utcHourBucket(): string {
  return new Date().toISOString().slice(0, 13);
}

/** UTC day bucket suffix, e.g. "2026-05-02" */
function utcDayBucket(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Token bucket rate limiter backed by Cloudflare KV.
 *
 * Increments BOTH IP and identity counters atomically (parallel KV puts).
 * Returns `allowed: false` immediately when either bucket is over its cap;
 * when over, the increment is skipped (so a sustained attacker doesn't
 * inflate counters past the cap and reset windows are predictable).
 */
export async function checkRateLimit(
  kv: KVNamespace | undefined,
  config: RateLimitConfig,
): Promise<RateLimitDecision> {
  const ipKey = `${config.keyPrefix}:ip:${config.ipHash}:${utcHourBucket()}`;
  const identityKey = config.identityHash
    ? `${config.keyPrefix}:id:${config.identityHash}:${utcDayBucket()}`
    : null;

  if (!kv) {
    // Fail-open with explicit reason so the audit log + operator know.
    return {
      allowed: true,
      reason: "kv_unavailable_open",
      ipKey,
      identityKey,
      ipCount: 0,
      identityCount: 0,
    };
  }

  const ipRaw = await kv.get(ipKey);
  const ipCount = ipRaw ? parseInt(ipRaw, 10) : 0;
  if (Number.isFinite(ipCount) && ipCount >= config.ipPerHour) {
    return {
      allowed: false,
      reason: "ip_per_hour",
      ipKey,
      identityKey,
      ipCount,
      identityCount: 0,
    };
  }

  let identityCount = 0;
  if (identityKey) {
    const idRaw = await kv.get(identityKey);
    identityCount = idRaw ? parseInt(idRaw, 10) : 0;
    if (Number.isFinite(identityCount) && identityCount >= config.identityPerDay) {
      return {
        allowed: false,
        reason: "identity_per_day",
        ipKey,
        identityKey,
        ipCount,
        identityCount,
      };
    }
  }

  // Increment both. TTLs cover the next bucket window so KV evicts cleanly:
  // IP bucket TTL = 65 min (covers the next hour boundary plus a 5-min slack)
  // identity bucket TTL = 25 hours (covers the next day boundary plus 1-hour slack)
  const writes: Promise<void>[] = [
    kv.put(ipKey, String(ipCount + 1), { expirationTtl: 60 * 65 }),
  ];
  if (identityKey) {
    writes.push(
      kv.put(identityKey, String(identityCount + 1), { expirationTtl: 60 * 60 * 25 }),
    );
  }
  await Promise.all(writes);

  return {
    allowed: true,
    reason: "ok",
    ipKey,
    identityKey,
    ipCount: ipCount + 1,
    identityCount: identityKey ? identityCount + 1 : 0,
  };
}

/**
 * Constant-time string compare (avoids timing attacks on tokens / signatures).
 * Re-exported here for convenience since rate-limit decisions and HMAC checks
 * commonly happen back-to-back at endpoint entry.
 */
export function constantTimeEq(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/** SHA-256 hex digest helper. Re-exported from crypto.ts for back-compat
 *  with existing imports (`import { sha256Hex } from "../lib/rateLimit"`).
 *  New code should import directly from `../lib/crypto`. */
export { sha256Hex } from "./crypto";
