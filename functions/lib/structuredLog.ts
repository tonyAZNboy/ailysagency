// Shared structured logging helper for Cloudflare Pages Functions.
//
// Replaces 6 byte-equivalent inline copies of:
//   function emit(line: Record<string, unknown>): void {
//     console.log(JSON.stringify({ component: '<name>', ...line }));
//   }
//
// In:
//   - functions/api/audit-pdf-onboarding.ts
//   - functions/api/audit-ai-visibility-instant.ts
//   - functions/api/client-error.ts
//   - functions/api/audit-pdf-download/[id].ts
//   - functions/api/quote-pdf.ts
//   - functions/api/visibility-report-pdf.ts
//
// All 6 copies followed the same pattern: each endpoint hardcodes its
// own `component` string at file scope, then logs structured JSON
// lines tagged with that component name. Cloudflare Workers Logpush
// + the system-health admin surface depend on the `component` field
// being present and consistent across endpoints. The shared factory
// preserves that contract while removing the boilerplate.
//
// Why a factory (vs. a single logEvent(component, line) export)
// -------------------------------------------------------------
// Existing call sites already write `emit({ action: '...', ip: ... })`
// hundreds of times. Threading the component string through every
// call site would balloon the diff and add noise. The factory keeps
// each call site identical to its prior shape; only the top-of-file
// definition changes.

/** A bound structured logger. Calls produce one JSON line on stdout. */
export type Emit = (line: Record<string, unknown>) => void;

/**
 * Build a structured-log emitter bound to a component name. The
 * returned function shadows the inline `emit` helpers that were
 * previously declared in each endpoint, so call sites keep their
 * `emit({...})` shape unchanged.
 *
 * Example:
 *   const emit = makeEmit('quote-pdf');
 *   emit({ ts: Date.now(), action: 'render_ok', size: 17500 });
 *   // -> {"component":"quote-pdf","ts":1714639200000,"action":"render_ok","size":17500}
 *
 * The component field is always FIRST in the output object, which
 * matters for grep / Logpush downstream consumers that key off the
 * leading characters of each line.
 */
export function makeEmit(component: string): Emit {
  return (line: Record<string, unknown>) => {
    console.log(JSON.stringify({ component, ...line }));
  };
}
