// Cron primitives for AiLys-side scheduled jobs.
//
// Three concerns every cron handler shares:
//   1. Kill switch: KV key `cron:<id>:enabled` set to "false" disables
//      the cron without redeploy. Env var override too.
//   2. Concurrency lock: at most 1 instance of any cron running at a
//      time. Uses KV with TTL > expected job duration to prevent
//      stuck locks.
//   3. Audit log: every cron run emits structured JSON line covering
//      cron_id, started_at, finished_at, duration_ms, items_processed,
//      successes, failures, kill-switch-state, lock-acquired.
//
// This module wraps a cron handler with `withCronGuard()` which handles
// all three concerns. Handlers just return a CronRunSummary; the wrapper
// emits the audit log + manages the lock.
//
// Usage:
//
//   export const onRequest = (ctx) => withCronGuard(
//     ctx.env,
//     'day1-retry-sweep',
//     async (ctx) => {
//       const items = await readDlq(...);
//       // ...
//       return { items_processed: items.length, successes, failures };
//     },
//   )(ctx);

import { jsonResponse } from './jsonResponse';

interface CronEnv {
  AUDIT_PDF_RATE_LIMIT?: KVNamespace;
}

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
}

export interface CronRunSummary {
  items_processed: number;
  successes: number;
  failures: number;
  notes?: string;
}

export interface CronGuardResult {
  status: 'ran' | 'killed' | 'locked' | 'errored';
  summary?: CronRunSummary;
  error?: string;
  duration_ms: number;
  cron_id: string;
}

const DEFAULT_LOCK_TTL_SECONDS = 300; // 5 minutes; bump for slower jobs

/**
 * Check if the kill switch is active for a given cron id.
 */
export async function isCronKilled(env: CronEnv, cronId: string): Promise<boolean> {
  if (!env.AUDIT_PDF_RATE_LIMIT) return false;
  const flag = await env.AUDIT_PDF_RATE_LIMIT.get(`cron:${cronId}:enabled`);
  return flag === 'false';
}

/**
 * Try to acquire a concurrency lock. Returns true if acquired, false if
 * another instance holds it.
 */
export async function tryAcquireCronLock(
  env: CronEnv,
  cronId: string,
  ttlSeconds: number = DEFAULT_LOCK_TTL_SECONDS,
): Promise<boolean> {
  if (!env.AUDIT_PDF_RATE_LIMIT) return true; // fail-open in dev
  const key = `cron:${cronId}:lock`;
  const existing = await env.AUDIT_PDF_RATE_LIMIT.get(key);
  if (existing) return false;
  const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  await env.AUDIT_PDF_RATE_LIMIT.put(key, token, { expirationTtl: ttlSeconds });
  // Re-read to confirm we won the race. KV is eventually consistent
  // across regions but read-after-write is consistent within a region,
  // so this catches most concurrent acquires.
  const after = await env.AUDIT_PDF_RATE_LIMIT.get(key);
  return after === token;
}

/**
 * Release a previously-held cron lock. Safe to call even if not held.
 */
export async function releaseCronLock(env: CronEnv, cronId: string): Promise<void> {
  if (!env.AUDIT_PDF_RATE_LIMIT) return;
  await env.AUDIT_PDF_RATE_LIMIT.delete(`cron:${cronId}:lock`);
}

interface AuditEntry {
  ts: string;
  cron_id: string;
  status: CronGuardResult['status'];
  duration_ms: number;
  items_processed?: number;
  successes?: number;
  failures?: number;
  notes?: string;
  error?: string;
}

function emitAudit(entry: AuditEntry): void {
  console.log(JSON.stringify({ component: 'cron', ...entry }));
}

export type CronHandler<Ctx> = (ctx: Ctx) => Promise<CronRunSummary>;

/**
 * Wrap a cron handler with kill-switch + concurrency-lock + audit-log.
 * Returns a function that takes the original Pages context and returns
 * a Response containing the cron result.
 */
export function withCronGuard<Ctx extends { env: CronEnv }>(
  cronId: string,
  handler: CronHandler<Ctx>,
  options: { lockTtlSeconds?: number } = {},
): (ctx: Ctx) => Promise<Response> {
  const lockTtl = options.lockTtlSeconds ?? DEFAULT_LOCK_TTL_SECONDS;

  return async (ctx: Ctx) => {
    const startedAt = Date.now();
    const ts = new Date().toISOString();

    if (await isCronKilled(ctx.env, cronId)) {
      const result: CronGuardResult = { status: 'killed', duration_ms: 0, cron_id: cronId };
      emitAudit({ ts, cron_id: cronId, status: 'killed', duration_ms: 0 });
      return jsonResponse(result, 200);
    }

    const acquired = await tryAcquireCronLock(ctx.env, cronId, lockTtl);
    if (!acquired) {
      const result: CronGuardResult = { status: 'locked', duration_ms: 0, cron_id: cronId };
      emitAudit({ ts, cron_id: cronId, status: 'locked', duration_ms: 0 });
      return jsonResponse(result, 200);
    }

    try {
      const summary = await handler(ctx);
      const duration_ms = Date.now() - startedAt;
      emitAudit({
        ts,
        cron_id: cronId,
        status: 'ran',
        duration_ms,
        items_processed: summary.items_processed,
        successes: summary.successes,
        failures: summary.failures,
        notes: summary.notes,
      });
      // Heartbeat: write last-run + last-success timestamps to KV so the
      // /api/system-health endpoint can surface "when did each cron last
      // succeed?" for ops dashboards. Best-effort: skip silently if KV
      // missing or write fails (cron success path must not depend on KV
      // heartbeat write succeeding).
      await writeCronHeartbeat(ctx.env, cronId, {
        last_run_at: new Date().toISOString(),
        last_success_at: new Date().toISOString(),
        last_duration_ms: duration_ms,
        last_items_processed: summary.items_processed,
        last_successes: summary.successes,
        last_failures: summary.failures,
      });
      const result: CronGuardResult = { status: 'ran', summary, duration_ms, cron_id: cronId };
      return jsonResponse(result, 200);
    } catch (err) {
      const duration_ms = Date.now() - startedAt;
      const error = err instanceof Error ? err.message.slice(0, 200) : 'unknown';
      emitAudit({ ts, cron_id: cronId, status: 'errored', duration_ms, error });
      // Heartbeat the failure so ops can see "last attempted" even when
      // the run errored. last_success_at is intentionally NOT updated.
      await writeCronHeartbeat(ctx.env, cronId, {
        last_run_at: new Date().toISOString(),
        last_error: error,
        last_duration_ms: duration_ms,
      });
      const result: CronGuardResult = { status: 'errored', error, duration_ms, cron_id: cronId };
      return jsonResponse(result, 500);
    } finally {
      await releaseCronLock(ctx.env, cronId);
    }
  };
}

/** Heartbeat record persisted per cron run for ops visibility. */
export interface CronHeartbeat {
  last_run_at: string;          // ISO timestamp of most recent run attempt
  last_success_at?: string;     // ISO timestamp of most recent SUCCESSFUL run
  last_duration_ms?: number;
  last_items_processed?: number;
  last_successes?: number;
  last_failures?: number;
  last_error?: string;          // populated only when most recent run errored
}

/**
 * Write/merge a heartbeat record for a cron job. Best-effort. Reads the
 * previous record so last_success_at is preserved across error runs.
 *
 * KV key: `cron:<id>:heartbeat`. TTL: 30 days. The 30-day window is long
 * enough to detect stuck cron crons (cron-job.org outages, etc.) without
 * cluttering KV with infinite history.
 */
async function writeCronHeartbeat(
  env: CronEnv,
  cronId: string,
  partial: CronHeartbeat,
): Promise<void> {
  if (!env.AUDIT_PDF_RATE_LIMIT) return;
  const key = `cron:${cronId}:heartbeat`;
  try {
    const prevRaw = await env.AUDIT_PDF_RATE_LIMIT.get(key);
    const prev: Partial<CronHeartbeat> = prevRaw ? JSON.parse(prevRaw) : {};
    const merged: CronHeartbeat = {
      last_run_at: partial.last_run_at,
      last_success_at: partial.last_success_at ?? prev.last_success_at,
      last_duration_ms: partial.last_duration_ms ?? prev.last_duration_ms,
      last_items_processed: partial.last_items_processed ?? prev.last_items_processed,
      last_successes: partial.last_successes ?? prev.last_successes,
      last_failures: partial.last_failures ?? prev.last_failures,
      last_error: partial.last_error,
    };
    await env.AUDIT_PDF_RATE_LIMIT.put(key, JSON.stringify(merged), {
      expirationTtl: 60 * 60 * 24 * 30,
    });
  } catch {
    // Best-effort. Cron success must not depend on heartbeat KV write.
  }
}

/**
 * Read the heartbeat for a cron. Returns null when KV unbound, no record
 * exists yet, or read fails. Used by /api/system-health to surface
 * cron freshness in ops dashboards.
 */
export async function readCronHeartbeat(
  env: CronEnv,
  cronId: string,
): Promise<CronHeartbeat | null> {
  if (!env.AUDIT_PDF_RATE_LIMIT) return null;
  try {
    const raw = await env.AUDIT_PDF_RATE_LIMIT.get(`cron:${cronId}:heartbeat`);
    if (!raw) return null;
    return JSON.parse(raw) as CronHeartbeat;
  } catch {
    return null;
  }
}
