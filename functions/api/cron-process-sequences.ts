// Cloudflare Pages Function · /api/cron-process-sequences
//
// External cron (cron-job.org / Upstash QStash / GitHub Actions schedule) calls
// this endpoint every 5 minutes with HMAC service auth. We:
//   1. Query email_sequence_enrollments WHERE status='active' AND next_send_at<=NOW()
//   2. For each, load the linked sequence's steps[current_step]
//   3. Render via emailTemplate, send via Resend, log to email_sends
//   4. Advance current_step + recompute next_send_at (or mark completed)
//
// Hard cap: 25 enrollments per run to stay under CF Workers CPU/time budget.
// Auto-pause after 3 consecutive sends with zero opens (engagement scoring).
// Audit log every action with email hash + sequence slug, no PII in clear.

import { renderEmail, EmailLang } from '../lib/emailTemplate';
import { sendAndLog } from '../lib/emailLog';
import { signUnsubscribeToken } from '../lib/unsubscribeToken';
import { verifyServiceRequest } from '../lib/serviceAuth';

interface Env {
  RESEND_API_KEY?: string;
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  NEWSLETTER_UNSUB_SECRET?: string;
  AILYS_SERVICE_SHARED_SECRET?: string;
  CRON_PROCESS_SEQUENCES_KILL_SWITCH?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
  waitUntil: (promise: Promise<unknown>) => void;
}

const SITE_BASE_URL = 'https://www.ailysagency.ca';
const MAX_PER_RUN = 25;
const PAUSE_AFTER_NO_OPENS = 3; // pause enrollments with 3+ consecutive sends and 0 opens

interface SequenceStep {
  delay_days: number;
  subject: string;
  preheader?: string;
  body: string;
  cta_label?: string;
  cta_url?: string;
}

interface Enrollment {
  id: string;
  email: string;
  sequence_id: string;
  current_step: number;
  status: string;
  metadata?: Record<string, unknown>;
}

interface Sequence {
  id: string;
  slug: string;
  status: string;
  steps: SequenceStep[];
}

interface RunSummary {
  processed: number;
  sent: number;
  completed: number;
  paused: number;
  errors: number;
  reasons: Record<string, number>;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function logAudit(component: string, fields: Record<string, unknown>): void {
  console.log(JSON.stringify({ component, ...fields }));
}

async function fetchDueEnrollments(env: Env): Promise<Enrollment[]> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return [];
  const url = `${env.SUPABASE_URL}/rest/v1/email_sequence_enrollments?status=eq.active&next_send_at=lte.${encodeURIComponent(new Date().toISOString())}&select=id,email,sequence_id,current_step,status,metadata&limit=${MAX_PER_RUN}&order=next_send_at.asc`;
  const resp = await fetch(url, {
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
  });
  if (!resp.ok) return [];
  return (await resp.json().catch(() => [])) as Enrollment[];
}

async function fetchSequence(env: Env, sequenceId: string): Promise<Sequence | null> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return null;
  const resp = await fetch(
    `${env.SUPABASE_URL}/rest/v1/email_sequences?id=eq.${encodeURIComponent(sequenceId)}&select=id,slug,status,steps&limit=1`,
    {
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    },
  );
  if (!resp.ok) return null;
  const rows = (await resp.json().catch(() => [])) as Sequence[];
  return rows[0] ?? null;
}

async function patchEnrollment(
  env: Env,
  id: string,
  patch: Record<string, unknown>,
): Promise<void> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return;
  await fetch(`${env.SUPABASE_URL}/rest/v1/email_sequence_enrollments?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(patch),
  }).catch(() => {});
}

async function recentOpenRate(env: Env, email: string, sequenceSlug: string): Promise<number> {
  // Returns the number of opened sends among the last 3 sends for this (email, sequence_slug)
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return 0;
  const url = `${env.SUPABASE_URL}/rest/v1/email_sends?email=eq.${encodeURIComponent(email)}&sequence_slug=eq.${encodeURIComponent(sequenceSlug)}&select=opened_at&order=sent_at.desc.nullslast&limit=${PAUSE_AFTER_NO_OPENS}`;
  const resp = await fetch(url, {
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
  });
  if (!resp.ok) return 0;
  const rows = (await resp.json().catch(() => [])) as Array<{ opened_at: string | null }>;
  return rows.filter((r) => r.opened_at !== null).length;
}

async function processOne(
  env: Env,
  enrollment: Enrollment,
  summary: RunSummary,
): Promise<void> {
  summary.processed++;
  const seq = await fetchSequence(env, enrollment.sequence_id);
  if (!seq || seq.status !== 'active') {
    summary.errors++;
    summary.reasons.sequence_inactive = (summary.reasons.sequence_inactive ?? 0) + 1;
    await patchEnrollment(env, enrollment.id, { status: 'paused' });
    return;
  }

  const stepIndex = enrollment.current_step;
  if (stepIndex >= seq.steps.length) {
    summary.completed++;
    await patchEnrollment(env, enrollment.id, { status: 'completed', next_send_at: null });
    return;
  }
  const step = seq.steps[stepIndex];

  // Engagement gate: pause after N sends with zero opens (newsletter slug only;
  // transactional sequences should not be paused for low engagement)
  if (seq.slug === 'newsletter_welcome' && stepIndex >= PAUSE_AFTER_NO_OPENS) {
    const opens = await recentOpenRate(env, enrollment.email, seq.slug);
    if (opens === 0) {
      summary.paused++;
      summary.reasons.no_engagement = (summary.reasons.no_engagement ?? 0) + 1;
      await patchEnrollment(env, enrollment.id, {
        status: 'paused',
        metadata: { ...(enrollment.metadata ?? {}), paused_reason: 'no_engagement', paused_at: new Date().toISOString() },
      });
      return;
    }
  }

  // Sign unsubscribe token for footer
  let unsubscribeUrl: string | undefined;
  if (env.NEWSLETTER_UNSUB_SECRET) {
    try {
      const token = await signUnsubscribeToken({ email: enrollment.email, secret: env.NEWSLETTER_UNSUB_SECRET });
      unsubscribeUrl = `${SITE_BASE_URL}/api/newsletter-unsubscribe?token=${encodeURIComponent(token)}&email=${encodeURIComponent(enrollment.email)}`;
    } catch { /* skip token */ }
  }

  // Render via shared template
  const lang: EmailLang = 'en'; // newsletter_welcome content is currently EN-only; lifecycle expansion lands in Phase 3
  const rendered = renderEmail({
    lang,
    preheader: step.preheader ?? step.subject,
    title: step.subject,
    body: step.body.split('\n\n').filter((s) => s.trim().length > 0),
    cta: step.cta_url && step.cta_label ? { label: step.cta_label, url: step.cta_url } : undefined,
    unsubscribeUrl,
  });

  const extraHeaders: Record<string, string> = {};
  if (unsubscribeUrl) {
    extraHeaders['List-Unsubscribe'] = `<${unsubscribeUrl}>, <mailto:hello@ailysagency.ca?subject=Unsubscribe>`;
    extraHeaders['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click';
  }

  const result = await sendAndLog(env, {
    from: 'AiLys Agency <hello@ailysagency.ca>',
    to: enrollment.email,
    subject: step.subject,
    html: rendered.html,
    text: rendered.text,
    headers: extraHeaders,
  }, {
    email: enrollment.email,
    sequence_slug: seq.slug,
    step: stepIndex + 1, // step 0 is the synchronous welcome confirm; cron sends start at step 1
    subject: step.subject,
  });

  if (result.error) {
    summary.errors++;
    summary.reasons.send_failed = (summary.reasons.send_failed ?? 0) + 1;
    return;
  }

  summary.sent++;

  // Advance the enrollment
  const nextStepIndex = stepIndex + 1;
  if (nextStepIndex >= seq.steps.length) {
    await patchEnrollment(env, enrollment.id, {
      current_step: nextStepIndex,
      last_send_at: new Date().toISOString(),
      next_send_at: null,
      status: 'completed',
    });
    summary.completed++;
  } else {
    const nextStep = seq.steps[nextStepIndex];
    const nextSend = new Date(Date.now() + nextStep.delay_days * 24 * 60 * 60 * 1000).toISOString();
    await patchEnrollment(env, enrollment.id, {
      current_step: nextStepIndex,
      last_send_at: new Date().toISOString(),
      next_send_at: nextSend,
    });
  }
}

export const onRequest = async (ctx: PagesContext): Promise<Response> => {
  const start = Date.now();
  const { request, env } = ctx;

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405);
  }

  if ((env.CRON_PROCESS_SEQUENCES_KILL_SWITCH ?? '').toLowerCase() === 'true') {
    return jsonResponse({ ok: true, skipped: 'kill_switch' }, 200);
  }

  // HMAC service auth (caller must be allowlisted in serviceAuth.ts)
  const rawBody = await request.text();
  const verify = await verifyServiceRequest(env.AILYS_SERVICE_SHARED_SECRET, request, rawBody);
  if (!verify.ok) {
    logAudit('cron-process-sequences', {
      action: 'auth_failed',
      reason: verify.reason,
      latencyMs: Date.now() - start,
    });
    return jsonResponse({ error: 'unauthorized' }, 401);
  }

  // Optional DRY_RUN flag in request body for safe rollout
  let dryRun = false;
  try {
    const parsed = rawBody ? JSON.parse(rawBody) : {};
    if (parsed && typeof parsed === 'object' && parsed.dry_run === true) dryRun = true;
  } catch { /* default to false */ }

  const enrollments = await fetchDueEnrollments(env);
  const summary: RunSummary = {
    processed: 0,
    sent: 0,
    completed: 0,
    paused: 0,
    errors: 0,
    reasons: {},
  };

  if (dryRun) {
    summary.processed = enrollments.length;
    summary.reasons.dry_run = enrollments.length;
    logAudit('cron-process-sequences', {
      action: 'dry_run',
      due: enrollments.length,
      latencyMs: Date.now() - start,
    });
    return jsonResponse({ ok: true, dry_run: true, ...summary }, 200);
  }

  for (const enr of enrollments) {
    try {
      await processOne(env, enr, summary);
    } catch (err) {
      summary.errors++;
      const reason = `unhandled: ${(err as Error).message.slice(0, 80)}`;
      summary.reasons[reason] = (summary.reasons[reason] ?? 0) + 1;
      logAudit('cron-process-sequences', {
        action: 'process_threw',
        emailHash: await sha256Hex(enr.email).catch(() => ''),
        sequence_id: enr.sequence_id,
        reason,
      });
    }
  }

  logAudit('cron-process-sequences', {
    action: 'run_complete',
    ...summary,
    latencyMs: Date.now() - start,
  });

  return jsonResponse({ ok: true, ...summary }, 200);
};
