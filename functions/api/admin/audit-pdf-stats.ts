// Cloudflare Pages Function · /api/admin/audit-pdf-stats
//
// Phase B.4.4: read-only observability surface for the audit-pdf endpoint.
// Service-to-service HMAC auth (no public access). Called by Reviuzy admin
// edge fn `audit-pdf-stats-proxy` which surfaces results in the Reviuzy
// admin panel. Cross-repo architecture per Phase B.4.4 option A.
//
// Returns:
//   - feature_enabled: boolean (kill switch state)
//   - recent_invocations: AuditLogEntry[] (last 50 by timestamp desc)
//   - daily_count: today's invocation count (UTC)
//   - weekly_count: 7-day rolling invocation count
//   - estimated_cost_cad: today's count * unit cost in CAD
//   - generated_at: ISO timestamp of this response
//
// Threat model:
//   - HMAC required (no anonymous access)
//   - GET only (405 on other methods)
//   - No PII: ring buffer entries only carry SHA-256 hashes (per AuditLogEntry contract)
//   - Replay window 5 min, constant-time compare (reused from serviceAuth.ts)
//   - Fail-closed: missing secret → 503; missing kv → 503

import { verifyServiceRequest } from '../../lib/serviceAuth';
import { jsonResponse } from '../../lib/jsonResponse';

interface Env {
  AILYS_SERVICE_SHARED_SECRET?: string;
  AUDIT_PDF_RATE_LIMIT?: KVNamespace;
  PDF_EXPORT_KILL_SWITCH?: string;
}

interface KVNamespace {
  get(key: string, options?: { type?: 'text' | 'json' }): Promise<string | null>;
  list(options?: { prefix?: string; limit?: number }): Promise<{ keys: Array<{ name: string }> }>;
}

interface PagesContext {
  request: Request;
  env: Env;
  waitUntil: (promise: Promise<unknown>) => void;
}

interface AuditLogEntry {
  ts: string;
  action: string;
  actorHash: string;
  ipHash: string;
  status: number;
  payloadHash?: string;
  reason?: string;
  latencyMs: number;
}

// Approximate marginal cost per audit-pdf invocation, in CAD.
// Components (worst case for a successful render + email):
//   - Resend send: ~$0.0001 USD
//   - R2 write (50KB PDF): ~$0.000018 USD
//   - KV write (rate-limit + ring buffer + email throttle): ~$0.000010 USD
//   - Workers CPU: included in Pages Functions free tier
// Total ~ $0.00013 USD ≈ $0.00018 CAD per invocation.
// Round up to $0.0003 CAD for headroom and reporting clarity.
const COST_PER_INVOCATION_CAD = 0.0003;
const RECENT_LIMIT = 50;
const KV_LIST_LIMIT = 1000; // hard cap to avoid unbounded scans
const RING_BUFFER_PREFIX = 'audit_pdf_log:';

interface StatsResponse {
  feature_enabled: boolean;
  recent_invocations: AuditLogEntry[];
  daily_count: number;
  weekly_count: number;
  estimated_cost_cad: number;
  generated_at: string;
  notes?: string;
}

function reasonToStatus(reason: string): number {
  switch (reason) {
    case 'no_secret':
      return 503;
    case 'caller_not_allowed':
      return 403;
    case 'missing_headers':
    case 'timestamp_invalid':
    case 'timestamp_skewed':
    case 'sig_mismatch':
    case 'malformed':
    default:
      return 401;
  }
}

function tsMsFromKey(name: string): number {
  const tail = name.slice(RING_BUFFER_PREFIX.length);
  const n = Number.parseInt(tail, 10);
  return Number.isFinite(n) ? n : 0;
}

async function readKillSwitch(env: Env): Promise<boolean> {
  if ((env.PDF_EXPORT_KILL_SWITCH ?? '').toLowerCase() === 'true') return false;
  if (!env.AUDIT_PDF_RATE_LIMIT) return false;
  const flag = await env.AUDIT_PDF_RATE_LIMIT.get('pdf_export_enabled');
  // Treat anything other than the literal string 'false' as enabled.
  return flag !== 'false';
}

export const onRequest: (ctx: PagesContext) => Promise<Response> = async (ctx) => {
  const { request, env } = ctx;

  if (request.method !== 'GET') {
    return jsonResponse({ error: 'method_not_allowed' }, 405);
  }

  // GET has no body; HMAC is computed over empty string per signServiceRequest contract.
  const verify = await verifyServiceRequest(env.AILYS_SERVICE_SHARED_SECRET, request, '');
  if (!verify.ok) {
    return jsonResponse({ error: verify.reason }, reasonToStatus(verify.reason));
  }

  if (!env.AUDIT_PDF_RATE_LIMIT) {
    return jsonResponse({ error: 'kv_unavailable' }, 503);
  }

  // List ring-buffer keys. Keys are `audit_pdf_log:<ts_ms>`. Cloudflare KV `list()`
  // returns lexicographic order; since ts_ms is left-padded by Date.now() growth
  // the lex order for monotonic timestamps is also chronological. We sort
  // numerically anyway for safety.
  const list = await env.AUDIT_PDF_RATE_LIMIT.list({
    prefix: RING_BUFFER_PREFIX,
    limit: KV_LIST_LIMIT,
  });

  const sortedKeys = list.keys
    .map((k) => ({ name: k.name, ts: tsMsFromKey(k.name) }))
    .filter((k) => k.ts > 0)
    .sort((a, b) => b.ts - a.ts);

  const nowMs = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;
  const sevenDaysMs = 7 * oneDayMs;

  let dailyCount = 0;
  let weeklyCount = 0;
  for (const k of sortedKeys) {
    if (nowMs - k.ts <= oneDayMs) dailyCount++;
    if (nowMs - k.ts <= sevenDaysMs) weeklyCount++;
  }

  // Fetch up to RECENT_LIMIT entries for the table.
  const recentKeys = sortedKeys.slice(0, RECENT_LIMIT);
  const recentInvocations: AuditLogEntry[] = [];
  for (const k of recentKeys) {
    const raw = await env.AUDIT_PDF_RATE_LIMIT.get(k.name);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw) as AuditLogEntry;
      // Defensive: re-validate shape minimally so corrupt entries don't poison the response.
      if (typeof parsed === 'object' && parsed && typeof parsed.ts === 'string' && typeof parsed.action === 'string') {
        recentInvocations.push(parsed);
      }
    } catch {
      // skip malformed entry
    }
  }

  const featureEnabled = await readKillSwitch(env);
  const estimatedCostCad = Number((dailyCount * COST_PER_INVOCATION_CAD).toFixed(4));

  const payload: StatsResponse = {
    feature_enabled: featureEnabled,
    recent_invocations: recentInvocations,
    daily_count: dailyCount,
    weekly_count: weeklyCount,
    estimated_cost_cad: estimatedCostCad,
    generated_at: new Date().toISOString(),
    notes:
      list.keys.length >= KV_LIST_LIMIT
        ? 'hit kv list cap; older entries truncated. extend KV_LIST_LIMIT if needed.'
        : undefined,
  };

  return jsonResponse(payload, 200);
};
