// Cloudflare Pages Function · /api/admin/client-error-stats
//
// Phase E.12: read-only observability for /api/client-error.
// Mirrors B.4.4 audit-pdf-stats + E.3 instant-ai-vis-stats / quote-pdf-stats
// pattern. Service-to-service HMAC. Reviuzy admin proxy reads this and
// surfaces in their admin UI.
//
// Returns:
//   - feature_enabled: kill switch state (CLIENT_ERROR_ENABLED)
//   - recent_invocations: last 50 ring buffer entries
//   - daily_count, weekly_count: rolling counts
//   - type_breakdown: { error, unhandledrejection, manual } counts last 7d
//   - generated_at: ISO timestamp
//
// Threat model: identical to audit-pdf-stats.

import { verifyServiceRequest } from '../../lib/serviceAuth';
import { jsonResponse } from '../../lib/jsonResponse';

interface Env {
  AILYS_SERVICE_SHARED_SECRET?: string;
  AUDIT_PDF_RATE_LIMIT?: KVNamespace;
  CLIENT_ERROR_ENABLED?: string;
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
  type: string;
  status: string;
  ipHash: string;
  urlHash: string;
  messageHash: string;
  hasStack: boolean;
}

const RECENT_LIMIT = 50;
const KV_LIST_LIMIT = 1000;
const RING_BUFFER_PREFIX = 'client_error_log:';

interface StatsResponse {
  feature_enabled: boolean;
  recent_invocations: AuditLogEntry[];
  daily_count: number;
  weekly_count: number;
  type_breakdown: Record<string, number>;
  generated_at: string;
  notes?: string;
}

function reasonToStatus(reason: string): number {
  switch (reason) {
    case 'no_secret': return 503;
    case 'caller_not_allowed': return 403;
    case 'missing_headers':
    case 'timestamp_invalid':
    case 'timestamp_skewed':
    case 'sig_mismatch':
    case 'malformed':
    default: return 401;
  }
}

function tsMsFromKey(name: string): number {
  const tail = name.slice(RING_BUFFER_PREFIX.length);
  const n = Number.parseInt(tail, 10);
  return Number.isFinite(n) ? n : 0;
}

async function readKillSwitch(env: Env): Promise<boolean> {
  if ((env.CLIENT_ERROR_ENABLED ?? '').toLowerCase() !== 'true') return false;
  if (!env.AUDIT_PDF_RATE_LIMIT) return true;
  const flag = await env.AUDIT_PDF_RATE_LIMIT.get('client_error_killed');
  return flag !== 'true';
}

export const onRequest: (ctx: PagesContext) => Promise<Response> = async (ctx) => {
  const { request, env } = ctx;

  if (request.method !== 'GET') {
    return jsonResponse({ error: 'method_not_allowed' }, 405);
  }

  const verify = await verifyServiceRequest(env.AILYS_SERVICE_SHARED_SECRET, request, '');
  if (!verify.ok) {
    return jsonResponse({ error: verify.reason }, reasonToStatus(verify.reason));
  }

  if (!env.AUDIT_PDF_RATE_LIMIT) {
    return jsonResponse({ error: 'kv_unavailable' }, 503);
  }

  const list = await env.AUDIT_PDF_RATE_LIMIT.list({ prefix: RING_BUFFER_PREFIX, limit: KV_LIST_LIMIT });
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

  const recentKeys = sortedKeys.slice(0, RECENT_LIMIT);
  const recentInvocations: AuditLogEntry[] = [];
  const typeBreakdown: Record<string, number> = { error: 0, unhandledrejection: 0, manual: 0 };

  for (const k of recentKeys) {
    const raw = await env.AUDIT_PDF_RATE_LIMIT.get(k.name);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw) as AuditLogEntry;
      if (typeof parsed === 'object' && parsed && typeof parsed.ts === 'string' && typeof parsed.type === 'string') {
        recentInvocations.push(parsed);
        if (nowMs - k.ts <= sevenDaysMs && parsed.type in typeBreakdown) {
          typeBreakdown[parsed.type]++;
        }
      }
    } catch { /* skip */ }
  }

  const featureEnabled = await readKillSwitch(env);

  const payload: StatsResponse = {
    feature_enabled: featureEnabled,
    recent_invocations: recentInvocations,
    daily_count: dailyCount,
    weekly_count: weeklyCount,
    type_breakdown: typeBreakdown,
    generated_at: new Date().toISOString(),
    notes: list.keys.length >= KV_LIST_LIMIT
      ? 'hit kv list cap; older entries truncated.'
      : undefined,
  };

  return jsonResponse(payload, 200);
};
