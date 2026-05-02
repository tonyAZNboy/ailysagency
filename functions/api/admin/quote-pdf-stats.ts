// Cloudflare Pages Function · /api/admin/quote-pdf-stats
//
// Phase E.3: read-only observability for /api/quote-pdf.
// Mirrors B.4.4 audit-pdf-stats pattern. Service-to-service HMAC.
//
// Returns:
//   - feature_enabled: boolean (kill switch state, QUOTE_PDF_ENABLED)
//   - recent_invocations: AuditLogEntry[] (last 50 by timestamp desc)
//   - daily_count: today's invocation count (UTC)
//   - weekly_count: 7-day rolling
//   - tier_breakdown: { starter, core, growth, agency } counts last 7d
//   - engagement_breakdown: { monthly, annual, biennial } counts last 7d
//   - estimated_cost_cad_today: ~$0 (pdf-lib in-process) but tracks Resend at ~$0.0001/email
//   - generated_at: ISO timestamp

import { verifyServiceRequest } from '../../lib/serviceAuth';
import { jsonResponse } from '../../lib/jsonResponse';

interface Env {
  AILYS_SERVICE_SHARED_SECRET?: string;
  AUDIT_PDF_RATE_LIMIT?: KVNamespace;
  QUOTE_PDF_ENABLED?: string;
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
  emailHash: string;
  status: number;
  tier?: string;
  engagement?: string;
  bytes?: number;
  emailed?: boolean;
  reason?: string;
}

// Resend ~$0.0001 USD per email = ~$0.00014 CAD. PDF render is in-process zero cost.
const COST_PER_INVOCATION_CAD = 0.00014;
const RECENT_LIMIT = 50;
const KV_LIST_LIMIT = 1000;
const RING_BUFFER_PREFIX = 'quote_pdf_log:';

interface StatsResponse {
  feature_enabled: boolean;
  recent_invocations: AuditLogEntry[];
  daily_count: number;
  weekly_count: number;
  tier_breakdown: Record<string, number>;
  engagement_breakdown: Record<string, number>;
  estimated_cost_cad_today: number;
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
  if ((env.QUOTE_PDF_ENABLED ?? '').toLowerCase() !== 'true') return false;
  if (!env.AUDIT_PDF_RATE_LIMIT) return true;
  const flag = await env.AUDIT_PDF_RATE_LIMIT.get('quote_pdf_killed');
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
  const tierBreakdown: Record<string, number> = { starter: 0, core: 0, growth: 0, agency: 0 };
  const engagementBreakdown: Record<string, number> = { monthly: 0, annual: 0, biennial: 0 };

  for (const k of recentKeys) {
    const raw = await env.AUDIT_PDF_RATE_LIMIT.get(k.name);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw) as AuditLogEntry;
      if (typeof parsed === 'object' && parsed && typeof parsed.ts === 'string' && typeof parsed.action === 'string') {
        recentInvocations.push(parsed);
        if (nowMs - k.ts <= sevenDaysMs && parsed.action === 'rendered') {
          if (parsed.tier && parsed.tier in tierBreakdown) tierBreakdown[parsed.tier]++;
          if (parsed.engagement && parsed.engagement in engagementBreakdown) engagementBreakdown[parsed.engagement]++;
        }
      }
    } catch { /* skip */ }
  }

  const featureEnabled = await readKillSwitch(env);
  const renderedToday = recentInvocations.filter((e) => {
    const t = new Date(e.ts).getTime();
    return nowMs - t <= oneDayMs && e.action === 'rendered' && e.emailed === true;
  }).length;
  const estimatedCostCadToday = Number((renderedToday * COST_PER_INVOCATION_CAD).toFixed(5));

  const payload: StatsResponse = {
    feature_enabled: featureEnabled,
    recent_invocations: recentInvocations,
    daily_count: dailyCount,
    weekly_count: weeklyCount,
    tier_breakdown: tierBreakdown,
    engagement_breakdown: engagementBreakdown,
    estimated_cost_cad_today: estimatedCostCadToday,
    generated_at: new Date().toISOString(),
    notes: list.keys.length >= KV_LIST_LIMIT
      ? 'hit kv list cap; older entries truncated.'
      : undefined,
  };

  return jsonResponse(payload, 200);
};
