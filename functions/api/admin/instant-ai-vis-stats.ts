// Cloudflare Pages Function · /api/admin/instant-ai-vis-stats
//
// Phase E.3: read-only observability for /api/audit-ai-visibility-instant.
// Mirrors B.4.4 audit-pdf-stats pattern. Service-to-service HMAC auth
// (no public access). Reviuzy admin proxy reads this endpoint and surfaces
// data in their admin UI per cross-repo option (b) backend isolation.
//
// Returns:
//   - feature_enabled: boolean (kill switch state, INSTANT_AI_VIS_ENABLED)
//   - recent_invocations: AuditLogEntry[] (last 50 by timestamp desc)
//   - daily_count: today's invocation count (UTC)
//   - weekly_count: 7-day rolling count
//   - cache_hit_rate_24h: % of last 24h that were cache hits
//   - estimated_cost_cad_today: today's count * Anthropic Haiku unit cost
//   - generated_at: ISO timestamp
//
// Threat model: identical to audit-pdf-stats (HMAC, GET only, no PII, fail-closed).

import { verifyServiceRequest } from '../../lib/serviceAuth';

interface Env {
  AILYS_SERVICE_SHARED_SECRET?: string;
  AUDIT_PDF_RATE_LIMIT?: KVNamespace;
  INSTANT_AI_VIS_ENABLED?: string;
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
  ipHash: string;
  status: number;
  cacheKey?: string;
  score?: number;
  lang?: string;
  reason?: string;
  cached?: boolean;
}

// Anthropic Claude Haiku 4.5 ~$0.0008 USD per audit (output tokens dominate).
// Approximately $0.0011 CAD. Round to $0.0015 CAD for headroom.
const COST_PER_INVOCATION_CAD = 0.0015;
const RECENT_LIMIT = 50;
const KV_LIST_LIMIT = 1000;
const RING_BUFFER_PREFIX = 'instant_ai_vis_log:';

interface StatsResponse {
  feature_enabled: boolean;
  recent_invocations: AuditLogEntry[];
  daily_count: number;
  weekly_count: number;
  cache_hit_rate_24h: number;
  estimated_cost_cad_today: number;
  generated_at: string;
  notes?: string;
}

function jsonResponse(body: unknown, status: number, extraHeaders?: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extraHeaders },
  });
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
  if ((env.INSTANT_AI_VIS_ENABLED ?? '').toLowerCase() !== 'true') return false;
  if (!env.AUDIT_PDF_RATE_LIMIT) return true;
  const flag = await env.AUDIT_PDF_RATE_LIMIT.get('instant_ai_vis_killed');
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
  let cacheHits24h = 0;
  let totalIn24h = 0;
  for (const k of recentKeys) {
    const raw = await env.AUDIT_PDF_RATE_LIMIT.get(k.name);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw) as AuditLogEntry;
      if (typeof parsed === 'object' && parsed && typeof parsed.ts === 'string' && typeof parsed.action === 'string') {
        recentInvocations.push(parsed);
        if (nowMs - k.ts <= oneDayMs) {
          totalIn24h++;
          if (parsed.cached === true) cacheHits24h++;
        }
      }
    } catch { /* skip */ }
  }

  const featureEnabled = await readKillSwitch(env);
  // Cost only counts non-cached renders (cache hits = $0)
  const renderedToday = recentInvocations.filter((e) => {
    const t = new Date(e.ts).getTime();
    return nowMs - t <= oneDayMs && e.action === 'rendered' && e.cached === false;
  }).length;
  const estimatedCostCadToday = Number((renderedToday * COST_PER_INVOCATION_CAD).toFixed(4));
  const cacheHitRate24h = totalIn24h > 0 ? Number((cacheHits24h / totalIn24h * 100).toFixed(1)) : 0;

  const payload: StatsResponse = {
    feature_enabled: featureEnabled,
    recent_invocations: recentInvocations,
    daily_count: dailyCount,
    weekly_count: weeklyCount,
    cache_hit_rate_24h: cacheHitRate24h,
    estimated_cost_cad_today: estimatedCostCadToday,
    generated_at: new Date().toISOString(),
    notes: list.keys.length >= KV_LIST_LIMIT
      ? 'hit kv list cap; older entries truncated.'
      : undefined,
  };

  return jsonResponse(payload, 200);
};
