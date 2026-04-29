#!/usr/bin/env node
/**
 * Smoke test for Phase C.2: cron primitives (kill switch + concurrency
 * lock + audit-log emission).
 *
 * Tests the pure functions in `functions/lib/cronGuard.ts` against a
 * fake KV namespace so we exercise the primitive logic without needing
 * a real Cloudflare environment.
 *
 * Run: `npx tsx scripts/smoke-cron-guard.mjs`
 * Exits 0 on success.
 */

import {
  isCronKilled,
  tryAcquireCronLock,
  releaseCronLock,
  withCronGuard,
} from '../functions/lib/cronGuard.ts';

const reset = '\x1b[0m', red = '\x1b[31m', green = '\x1b[32m', bold = '\x1b[1m';
const cases = [];
function assert(name, cond, hint = '') { cases.push({ name, ok: cond, hint }); }

/** Build a minimal fake KV namespace for tests. */
function makeFakeKV() {
  const store = new Map();
  return {
    async get(key) { return store.get(key) ?? null; },
    async put(key, value, _options) { store.set(key, value); },
    async delete(key) { store.delete(key); },
    async list({ prefix = '', limit = 1000 } = {}) {
      const keys = [];
      for (const k of store.keys()) {
        if (k.startsWith(prefix)) keys.push({ name: k });
        if (keys.length >= limit) break;
      }
      return { keys };
    },
    _store: store,
  };
}

// Capture console.log lines emitted by the audit logger
const logLines = [];
const origLog = console.log;
console.log = (...args) => logLines.push(args.join(' '));

try {
  // 1. isCronKilled returns false when no env or no KV
  {
    const result = await isCronKilled({}, 'test-cron');
    assert('no KV => not killed', result === false);
  }

  // 2. isCronKilled returns false when flag absent
  {
    const env = { AUDIT_PDF_RATE_LIMIT: makeFakeKV() };
    const result = await isCronKilled(env, 'test-cron');
    assert('flag absent => not killed', result === false);
  }

  // 3. isCronKilled returns true when flag = "false"
  {
    const kv = makeFakeKV();
    await kv.put('cron:test-cron:enabled', 'false');
    const env = { AUDIT_PDF_RATE_LIMIT: kv };
    const result = await isCronKilled(env, 'test-cron');
    assert('flag = "false" => killed', result === true);
  }

  // 4. tryAcquireCronLock succeeds when no prior lock
  {
    const env = { AUDIT_PDF_RATE_LIMIT: makeFakeKV() };
    const result = await tryAcquireCronLock(env, 'fresh-cron');
    assert('first acquire succeeds', result === true);
  }

  // 5. tryAcquireCronLock fails on second concurrent attempt
  {
    const kv = makeFakeKV();
    const env = { AUDIT_PDF_RATE_LIMIT: kv };
    const a = await tryAcquireCronLock(env, 'busy-cron');
    const b = await tryAcquireCronLock(env, 'busy-cron');
    assert('second concurrent acquire fails', a === true && b === false);
  }

  // 6. releaseCronLock allows re-acquire
  {
    const env = { AUDIT_PDF_RATE_LIMIT: makeFakeKV() };
    await tryAcquireCronLock(env, 'reacquire-cron');
    await releaseCronLock(env, 'reacquire-cron');
    const after = await tryAcquireCronLock(env, 'reacquire-cron');
    assert('release allows re-acquire', after === true);
  }

  // 7. withCronGuard returns 'killed' when flag set
  {
    const kv = makeFakeKV();
    await kv.put('cron:guarded-killed:enabled', 'false');
    const env = { AUDIT_PDF_RATE_LIMIT: kv };
    const handler = withCronGuard('guarded-killed', async () => ({ items_processed: 99, successes: 99, failures: 0 }));
    const resp = await handler({ env });
    const body = await resp.json();
    assert('withCronGuard returns killed status', body.status === 'killed');
  }

  // 8. withCronGuard returns 'locked' when lock held by another instance
  {
    const env = { AUDIT_PDF_RATE_LIMIT: makeFakeKV() };
    // Pre-acquire to simulate another instance holding the lock
    await tryAcquireCronLock(env, 'guarded-busy');
    const handler = withCronGuard('guarded-busy', async () => ({ items_processed: 1, successes: 1, failures: 0 }));
    const resp = await handler({ env });
    const body = await resp.json();
    assert('withCronGuard returns locked status', body.status === 'locked');
  }

  // 9. withCronGuard runs handler when free, summary present
  {
    const env = { AUDIT_PDF_RATE_LIMIT: makeFakeKV() };
    const handler = withCronGuard('guarded-runs', async () => ({ items_processed: 7, successes: 5, failures: 2 }));
    const resp = await handler({ env });
    const body = await resp.json();
    assert('withCronGuard runs and summarizes', body.status === 'ran' && body.summary?.items_processed === 7 && body.summary?.successes === 5);
  }

  // 10. withCronGuard releases lock after run (next invocation succeeds)
  {
    const env = { AUDIT_PDF_RATE_LIMIT: makeFakeKV() };
    const handler = withCronGuard('lock-released', async () => ({ items_processed: 0, successes: 0, failures: 0 }));
    const r1 = await (await handler({ env })).json();
    const r2 = await (await handler({ env })).json();
    assert('lock released between runs', r1.status === 'ran' && r2.status === 'ran');
  }

  // 11. withCronGuard catches handler errors and emits 'errored' status
  {
    const env = { AUDIT_PDF_RATE_LIMIT: makeFakeKV() };
    const handler = withCronGuard('error-cron', async () => { throw new Error('boom'); });
    const resp = await handler({ env });
    const body = await resp.json();
    assert('error caught and reported', body.status === 'errored' && body.error?.includes('boom'));
  }

  // 12. withCronGuard emits structured audit log for ran path
  {
    const env = { AUDIT_PDF_RATE_LIMIT: makeFakeKV() };
    logLines.length = 0;
    const handler = withCronGuard('audit-log-test', async () => ({ items_processed: 3, successes: 3, failures: 0 }));
    await handler({ env });
    const auditLine = logLines.find((l) => l.includes('"cron_id":"audit-log-test"'));
    assert('audit log line present with cron_id', !!auditLine);
    let parsed = null;
    try { parsed = JSON.parse(auditLine); } catch {}
    assert('audit log valid JSON with required fields', parsed && parsed.status === 'ran' && parsed.items_processed === 3 && parsed.component === 'cron');
  }
} finally {
  console.log = origLog;
}

console.log(`${bold}cron guard smoke test${reset}`);
let failures = 0;
for (const c of cases) {
  if (c.ok) console.log(`  ${green}✓${reset} ${c.name}`);
  else { failures++; console.log(`  ${red}✗${reset} ${c.name}${c.hint ? `\n      hint: ${c.hint}` : ''}`); }
}
console.log('');
if (failures === 0) {
  console.log(`${green}${bold}${cases.length}/${cases.length} pass${reset}`);
  process.exit(0);
} else {
  console.log(`${red}${bold}${failures}/${cases.length} fail${reset}`);
  process.exit(1);
}
