// Cloudflare Pages Function · /api/audit-pdf-download/{id}
//
// One-time signed download for an audit PDF stored in R2.
//
// URL shape:
//   /api/audit-pdf-download/{objectId}?exp={unixSeconds}&sig={hex}
//
// On request:
//   1. Parse + sanity-check `id`, `exp`, `sig`
//   2. Verify HMAC against AUDIT_PDF_HMAC_SECRET
//   3. Reject if expired
//   4. Fetch the R2 object; if missing return 410 Gone
//   5. Stream PDF back with download headers
//   6. Audit-log every attempt (success and failure)

import { verifyDownload } from '../../lib/pdfHmac';
import { sha256Hex } from '../../lib/crypto';
import { makeEmit } from '../../lib/structuredLog';

interface Env {
  AUDIT_PDFS?: R2Bucket;
  AUDIT_PDF_HMAC_SECRET?: string;
}

interface R2Bucket {
  get(key: string): Promise<R2Object | null>;
}
interface R2Object {
  body: ReadableStream;
  size: number;
}

interface PagesContext {
  request: Request;
  env: Env;
  params: { id?: string };
}

const emit = makeEmit('audit-pdf-download');

export const onRequest: (ctx: PagesContext) => Promise<Response> = async (ctx) => {
  const start = Date.now();
  const { request, env, params } = ctx;
  const id = params.id ?? '';
  const url = new URL(request.url);
  const exp = parseInt(url.searchParams.get('exp') ?? '', 10);
  const sig = url.searchParams.get('sig') ?? '';
  const ip = (request.headers.get('cf-connecting-ip') ?? '').split(',')[0]!.trim();
  const ipHash = await sha256Hex(ip || 'unknown');

  if (request.method !== 'GET') {
    return new Response('method_not_allowed', { status: 405 });
  }

  if (!id || !Number.isFinite(exp) || !sig) {
    emit({ ts: new Date().toISOString(), action: 'reject_malformed', ipHash, status: 400, latencyMs: Date.now() - start });
    return new Response('bad_request', { status: 400 });
  }

  if (!env.AUDIT_PDF_HMAC_SECRET) {
    emit({ ts: new Date().toISOString(), action: 'reject_no_secret', ipHash, status: 503, latencyMs: Date.now() - start });
    return new Response('service_unavailable', { status: 503 });
  }

  const verify = await verifyDownload(env.AUDIT_PDF_HMAC_SECRET, id, exp, sig);
  if (!verify.ok) {
    const status = verify.reason === 'expired' ? 410 : 401;
    emit({
      ts: new Date().toISOString(),
      action: 'reject_signature',
      ipHash,
      status,
      reason: verify.reason,
      latencyMs: Date.now() - start,
    });
    return new Response(verify.reason === 'expired' ? 'gone' : 'unauthorized', { status });
  }

  if (!env.AUDIT_PDFS) {
    emit({ ts: new Date().toISOString(), action: 'reject_no_r2', ipHash, status: 503, latencyMs: Date.now() - start });
    return new Response('service_unavailable', { status: 503 });
  }

  const obj = await env.AUDIT_PDFS.get(id);
  if (!obj) {
    emit({ ts: new Date().toISOString(), action: 'reject_object_missing', ipHash, status: 410, latencyMs: Date.now() - start });
    return new Response('gone', { status: 410 });
  }

  emit({
    ts: new Date().toISOString(),
    action: 'download_succeeded',
    ipHash,
    status: 200,
    reason: `bytes=${obj.size}`,
    latencyMs: Date.now() - start,
  });
  return new Response(obj.body, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="ailys-audit.pdf"`,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-store',
    },
  });
};
