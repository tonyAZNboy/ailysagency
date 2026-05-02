// Cloudflare Pages Function · /api/resend-webhook
//
// Receives Resend webhook events (email.sent, email.delivered, email.opened,
// email.clicked, email.bounced, email.complained, email.delivery_delayed,
// email.failed) and persists them to Supabase `email_webhook_events`.
//
// Security:
//  - Svix HMAC verification on every request (RESEND_WEBHOOK_SECRET).
//  - Idempotency via svix-id (UNIQUE constraint on table).
//  - Kill switch: env var RESEND_WEBHOOK_KILL_SWITCH=true silently 200s.
//  - Audit log emitted with event-id hash, no recipient email in logs.
//  - Always returns 200 on signature pass to avoid Resend retry storms; failures
//    are logged + audited but do not surface as 5xx to Resend.

import { verifySvixSignature } from '../lib/svixHmac';
import { updateEmailSendByProviderId } from '../lib/emailLog';
import { sha256Hex } from '../lib/crypto';
import { jsonResponse } from '../lib/jsonResponse';

interface Env {
  RESEND_WEBHOOK_SECRET?: string;
  RESEND_WEBHOOK_KILL_SWITCH?: string;
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
  waitUntil: (promise: Promise<unknown>) => void;
}

const ALLOWED_EVENT_TYPES = new Set([
  'email.sent',
  'email.delivered',
  'email.delivery_delayed',
  'email.opened',
  'email.clicked',
  'email.bounced',
  'email.complained',
  'email.failed',
]);

interface ResendEvent {
  type?: string;
  created_at?: string;
  data?: {
    email_id?: string;
    from?: string;
    to?: string[] | string;
    subject?: string;
    bounce?: { type?: string; message?: string } | null;
    click?: { link?: string } | null;
    [key: string]: unknown;
  };
}

interface AuditEntry {
  ts: string;
  action: string;
  svixIdHash: string;
  eventType: string;
  status: number;
  reason?: string;
  latencyMs: number;
}

function emitAudit(entry: AuditEntry): void {
  console.log(JSON.stringify({ component: 'resend-webhook', ...entry }));
}

function isKillSwitchActive(env: Env): boolean {
  return (env.RESEND_WEBHOOK_KILL_SWITCH ?? '').toLowerCase() === 'true';
}

async function persistEvent(
  env: Env,
  svixId: string,
  event: ResendEvent,
  rawPayload: unknown,
): Promise<{ ok: boolean; error?: string; duplicate?: boolean }> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return { ok: false, error: 'supabase_not_configured' };
  }

  const recipient = Array.isArray(event.data?.to) ? event.data?.to?.[0] : event.data?.to;
  const occurredAt = event.created_at ?? new Date().toISOString();

  const row = {
    svix_msg_id: svixId,
    resend_email_id: event.data?.email_id ?? null,
    event_type: event.type,
    recipient_email: recipient ?? null,
    from_address: event.data?.from ?? null,
    subject: event.data?.subject ?? null,
    bounce_type: event.data?.bounce?.type ?? null,
    click_url: event.data?.click?.link ?? null,
    occurred_at: occurredAt,
    raw_payload: rawPayload,
  };

  const url = `${env.SUPABASE_URL}/rest/v1/email_webhook_events`;
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
    });
    if (resp.ok) return { ok: true };
    const text = await resp.text().catch(() => '');
    if (resp.status === 409 || text.includes('duplicate key') || text.includes('email_webhook_events_svix_msg_id_key')) {
      return { ok: true, duplicate: true };
    }
    return { ok: false, error: `supabase_${resp.status}: ${text.slice(0, 200)}` };
  } catch (err) {
    return { ok: false, error: (err as Error).message.slice(0, 200) };
  }
}

export const onRequest = async (ctx: PagesContext): Promise<Response> => {
  const start = Date.now();
  const { request, env } = ctx;

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405);
  }

  const svixId = request.headers.get('svix-id');
  const svixTs = request.headers.get('svix-timestamp');
  const svixSig = request.headers.get('svix-signature');
  const svixIdHash = await sha256Hex(svixId ?? 'no-id');

  const rawBody = await request.text();

  const verify = await verifySvixSignature(env.RESEND_WEBHOOK_SECRET, svixId, svixTs, svixSig, rawBody);
  if (!verify.ok) {
    emitAudit({
      ts: new Date().toISOString(),
      action: 'verify_failed',
      svixIdHash,
      eventType: 'unknown',
      status: 401,
      reason: verify.reason,
      latencyMs: Date.now() - start,
    });
    return jsonResponse({ error: 'unauthorized' }, 401);
  }

  if (isKillSwitchActive(env)) {
    emitAudit({
      ts: new Date().toISOString(),
      action: 'kill_switch_active',
      svixIdHash,
      eventType: 'unknown',
      status: 200,
      latencyMs: Date.now() - start,
    });
    return jsonResponse({ ok: true, skipped: 'kill_switch' }, 200);
  }

  let event: ResendEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    emitAudit({
      ts: new Date().toISOString(),
      action: 'parse_failed',
      svixIdHash,
      eventType: 'unknown',
      status: 400,
      reason: 'invalid_json',
      latencyMs: Date.now() - start,
    });
    return jsonResponse({ error: 'invalid_json' }, 400);
  }

  const eventType = event.type ?? 'unknown';
  if (!ALLOWED_EVENT_TYPES.has(eventType)) {
    emitAudit({
      ts: new Date().toISOString(),
      action: 'unknown_event_type',
      svixIdHash,
      eventType,
      status: 200,
      latencyMs: Date.now() - start,
    });
    return jsonResponse({ ok: true, skipped: 'unknown_event_type' }, 200);
  }

  const persist = await persistEvent(env, svixId as string, event, event);

  // Update email_sends row by Resend message_id for opens/clicks/bounces tracking
  const resendEmailId = event.data?.email_id;
  if (resendEmailId && !persist.duplicate) {
    const patch: { status?: 'sent' | 'delivered' | 'bounced' | 'failed' | 'opened' | 'clicked'; opened_at?: string; clicked_at?: string; error?: string } = {};
    const occurredAt = event.created_at ?? new Date().toISOString();
    switch (eventType) {
      case 'email.delivered': patch.status = 'delivered'; break;
      case 'email.opened': patch.status = 'opened'; patch.opened_at = occurredAt; break;
      case 'email.clicked': patch.status = 'clicked'; patch.clicked_at = occurredAt; break;
      case 'email.bounced': patch.status = 'bounced'; patch.error = event.data?.bounce?.message ?? 'bounced'; break;
      case 'email.failed': patch.status = 'failed'; patch.error = 'failed'; break;
      case 'email.complained': patch.status = 'failed'; patch.error = 'complaint'; break;
      default: break;
    }
    if (Object.keys(patch).length > 0) {
      await updateEmailSendByProviderId(env, resendEmailId, patch).catch(() => {});
    }
  }

  emitAudit({
    ts: new Date().toISOString(),
    action: persist.duplicate ? 'duplicate' : persist.ok ? 'stored' : 'persist_failed',
    svixIdHash,
    eventType,
    status: 200,
    reason: persist.error,
    latencyMs: Date.now() - start,
  });

  return jsonResponse({ ok: true, duplicate: !!persist.duplicate }, 200);
};
