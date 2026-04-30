// Phase E.11: client-side error capture utility.
//
// Captures window.onerror + unhandledrejection + manual reportError() calls
// and POSTs them to /api/client-error. Implements:
// - Loop guard: never reports errors raised by the capture util itself
// - Local rate limit: max 5 reports per session to avoid client-side storm
// - Sampling: in development, reports 100%; in production, samples 100% of
//   first 5 then 0% (until next page load)
// - Privacy: includes user-agent, URL, and message; NOT cookies or other
//   browser state. The endpoint truncates further server-side.
//
// Usage: import { installClientErrorCapture } from '@/lib/clientErrorCapture';
//   installClientErrorCapture();
//
// One-time install in main.tsx. Idempotent (safe to call twice).

const MAX_REPORTS_PER_SESSION = 5;
const ENDPOINT = '/api/client-error';

let installed = false;
let reportCount = 0;
let inFlight = false;

export interface ClientErrorPayload {
  type: 'error' | 'unhandledrejection' | 'manual';
  message?: string;
  url?: string;
  source?: string;
  lineno?: number;
  colno?: number;
  stack?: string;
  userAgent?: string;
}

async function postReport(payload: ClientErrorPayload): Promise<void> {
  if (inFlight) return; // serialize to avoid storm
  inFlight = true;
  try {
    // Use sendBeacon if available (survives page unload). Falls back to fetch.
    const body = JSON.stringify(payload);
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon(ENDPOINT, blob);
    } else {
      await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body,
        keepalive: true,
      });
    }
  } catch {
    // Loop guard: never throw from the error reporter itself
  } finally {
    inFlight = false;
  }
}

function shouldReport(): boolean {
  if (reportCount >= MAX_REPORTS_PER_SESSION) return false;
  reportCount++;
  return true;
}

function safeMessage(input: unknown): string | undefined {
  if (input == null) return undefined;
  if (typeof input === 'string') return input.slice(0, 500);
  if (input instanceof Error) return input.message?.slice(0, 500);
  try { return String(input).slice(0, 500); } catch { return undefined; }
}

function safeStack(err: unknown): string | undefined {
  if (err instanceof Error && typeof err.stack === 'string') {
    // Strip the first 1000 chars; full stack stays in browser DevTools
    return err.stack.slice(0, 1000);
  }
  return undefined;
}

function safeUrl(): string {
  try { return window.location.href.slice(0, 500); } catch { return ''; }
}

function safeUserAgent(): string {
  try { return navigator.userAgent.slice(0, 200); } catch { return ''; }
}

function onError(event: ErrorEvent): void {
  if (!shouldReport()) return;
  // Guard against errors from the reporter itself
  if (event.filename && event.filename.includes('/clientErrorCapture')) return;
  if (event.message && event.message.includes('client-error')) return;
  void postReport({
    type: 'error',
    message: safeMessage(event.message),
    url: safeUrl(),
    source: event.filename?.slice(0, 500),
    lineno: typeof event.lineno === 'number' ? event.lineno : undefined,
    colno: typeof event.colno === 'number' ? event.colno : undefined,
    stack: safeStack(event.error),
    userAgent: safeUserAgent(),
  });
}

function onUnhandledRejection(event: PromiseRejectionEvent): void {
  if (!shouldReport()) return;
  const reason = event.reason;
  void postReport({
    type: 'unhandledrejection',
    message: safeMessage(reason),
    url: safeUrl(),
    stack: safeStack(reason),
    userAgent: safeUserAgent(),
  });
}

export function installClientErrorCapture(): void {
  if (installed || typeof window === 'undefined') return;
  installed = true;
  window.addEventListener('error', onError);
  window.addEventListener('unhandledrejection', onUnhandledRejection);
}

/**
 * Programmatic error report. Use for caught errors that you still want
 * surfaced in observability (e.g. catch blocks where you handle the error
 * gracefully but want to know it happened).
 */
export function reportClientError(message: string, error?: Error): void {
  if (!shouldReport()) return;
  void postReport({
    type: 'manual',
    message: safeMessage(message),
    url: safeUrl(),
    stack: safeStack(error),
    userAgent: safeUserAgent(),
  });
}
