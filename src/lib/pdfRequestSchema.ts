// Shared schema for the audit PDF export endpoint.
// Imported by both the browser modal (`AuditPdfDownload.tsx`) for client-side
// pre-validation, and the Cloudflare Pages Function (`functions/api/audit-pdf.ts`)
// for server-side authoritative validation.
//
// Per CLAUDE.md hard rule #9, server-side validation is the security boundary;
// client-side pre-validation is UX only. Always re-validate on the server.

export const PDF_REQUEST_MAX_PAYLOAD_BYTES = 256 * 1024; // 256KB hard cap
export const PDF_REQUEST_MAX_BUSINESS_NAME = 200;
export const PDF_REQUEST_MAX_LOCATION = 200;
export const PDF_REQUEST_MAX_QUERY = 200;
export const PDF_REQUEST_MAX_QUERIES = 6;
export const PDF_REQUEST_MAX_COMPETITORS = 5;
export const PDF_REQUEST_MAX_SIGNALS = 12;
export const PDF_REQUEST_MAX_ACTION_ITEMS = 8;

export type AuditScoreBand = 'critical' | 'weak' | 'developing' | 'strong' | 'leader';

export interface AuditPdfRequest {
  email: string;
  lang: 'en' | 'fr' | 'es' | 'zh' | 'ar' | 'ru';
  businessName: string;
  location: string | null;
  vertical: string;
  websiteUrl: string | null;
  gbpUrl: string | null;
  honeypot?: string; // must be empty
  payload: AuditPdfPayload;
}

export interface AuditPdfPayload {
  // Overall score band derived from GbpPulseEngine.score()
  scoreBand: AuditScoreBand;
  scoreNumeric: number; // 0-100 inclusive
  // Citation matrix: 6 engines × up to 6 queries
  citationMatrix: AuditPdfCitationCell[];
  // GBP deep-dive signals from the pulse engine
  gbpSignals: AuditPdfSignal[];
  // Competitor comparison (top N, max 5)
  competitors: AuditPdfCompetitor[];
  // Prioritized action items
  actionItems: AuditPdfActionItem[];
  // Optional: raw audit run id for traceability (no PII)
  auditRunId?: string;
}

export interface AuditPdfCitationCell {
  engine: 'chatgpt' | 'perplexity' | 'claude' | 'gemini' | 'aio' | 'copilot';
  query: string;
  cited: boolean;
  rank: number | null; // 1-based; null if not cited
}

export interface AuditPdfSignal {
  key: string; // e.g. 'reviews_recency'
  label: string;
  weight: number; // 0-1
  status: 'pass' | 'partial' | 'fail';
  observation: string;
}

export interface AuditPdfCompetitor {
  name: string;
  rating: number | null; // 0-5
  reviewCount: number | null;
  primaryCategory: string | null;
  distanceMeters: number | null;
}

export interface AuditPdfActionItem {
  priority: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  title: string;
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  signal: string; // which gbp signal this maps to
}

export interface AuditPdfValidationResult {
  ok: boolean;
  errors: string[];
  data?: AuditPdfRequest;
}

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  'guerrillamail.com',
  'throwawaymail.com',
  'yopmail.com',
  '10minutemail.com',
  'trashmail.com',
  'fakeinbox.com',
  'getnada.com',
]);

const ALLOWED_LANGS = new Set(['en', 'fr', 'es', 'zh', 'ar', 'ru']);
const ALLOWED_ENGINES = new Set(['chatgpt', 'perplexity', 'claude', 'gemini', 'aio', 'copilot']);
const ALLOWED_BANDS = new Set(['critical', 'weak', 'developing', 'strong', 'leader']);
const ALLOWED_STATUSES = new Set(['pass', 'partial', 'fail']);
const ALLOWED_LEVELS = new Set(['low', 'medium', 'high']);

export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return false;
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain || DISPOSABLE_DOMAINS.has(domain)) return false;
  return true;
}

function clipString(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  return trimmed.slice(0, max);
}

function clampNumber(value: unknown, min: number, max: number): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  return Math.max(min, Math.min(max, value));
}

export function validateAuditPdfRequest(input: unknown): AuditPdfValidationResult {
  const errors: string[] = [];
  if (!input || typeof input !== 'object') {
    return { ok: false, errors: ['request body must be a JSON object'] };
  }
  const body = input as Record<string, unknown>;

  // Honeypot first (cheap reject)
  const honeypot = typeof body.honeypot === 'string' ? body.honeypot : '';
  if (honeypot.length > 0) {
    return { ok: false, errors: ['spam_check_failed'] };
  }

  const email = clipString(body.email, 254);
  if (!email) errors.push('email is required');
  else if (!isValidEmail(email)) errors.push('email is invalid');

  const lang = clipString(body.lang, 5) ?? 'en';
  if (!ALLOWED_LANGS.has(lang)) errors.push('lang invalid');

  const businessName = clipString(body.businessName, PDF_REQUEST_MAX_BUSINESS_NAME);
  if (!businessName) errors.push('businessName is required');

  const location = clipString(body.location, PDF_REQUEST_MAX_LOCATION);
  const websiteUrl = clipString(body.websiteUrl, 500);
  const gbpUrl = clipString(body.gbpUrl, 500);
  if (websiteUrl && !/^https?:\/\//i.test(websiteUrl)) errors.push('websiteUrl must be a full URL');
  if (gbpUrl && !/^https?:\/\//i.test(gbpUrl)) errors.push('gbpUrl must be a full URL');

  const vertical = clipString(body.vertical, 50) ?? 'other';

  // Payload
  const payloadRaw = body.payload;
  if (!payloadRaw || typeof payloadRaw !== 'object') {
    errors.push('payload is required');
  }
  const payloadInput = (payloadRaw as Record<string, unknown> | undefined) ?? {};

  const scoreBandRaw = clipString(payloadInput.scoreBand, 30) ?? '';
  if (!ALLOWED_BANDS.has(scoreBandRaw)) errors.push('payload.scoreBand invalid');
  const scoreNumeric = clampNumber(payloadInput.scoreNumeric, 0, 100);
  if (scoreNumeric === null) errors.push('payload.scoreNumeric must be 0-100');

  const citationMatrixRaw = Array.isArray(payloadInput.citationMatrix) ? payloadInput.citationMatrix : [];
  if (citationMatrixRaw.length > 6 * PDF_REQUEST_MAX_QUERIES) {
    errors.push(`payload.citationMatrix exceeds ${6 * PDF_REQUEST_MAX_QUERIES} cells`);
  }
  const citationMatrix: AuditPdfCitationCell[] = [];
  for (const cell of citationMatrixRaw) {
    if (!cell || typeof cell !== 'object') continue;
    const c = cell as Record<string, unknown>;
    const engine = clipString(c.engine, 30) ?? '';
    const query = clipString(c.query, PDF_REQUEST_MAX_QUERY);
    if (!ALLOWED_ENGINES.has(engine) || !query) continue;
    citationMatrix.push({
      engine: engine as AuditPdfCitationCell['engine'],
      query,
      cited: c.cited === true,
      rank: typeof c.rank === 'number' && c.rank >= 1 && c.rank <= 100 ? c.rank : null,
    });
  }

  const signalsRaw = Array.isArray(payloadInput.gbpSignals) ? payloadInput.gbpSignals : [];
  if (signalsRaw.length > PDF_REQUEST_MAX_SIGNALS) {
    errors.push(`payload.gbpSignals exceeds ${PDF_REQUEST_MAX_SIGNALS} entries`);
  }
  const gbpSignals: AuditPdfSignal[] = [];
  for (const sig of signalsRaw) {
    if (!sig || typeof sig !== 'object') continue;
    const s = sig as Record<string, unknown>;
    const key = clipString(s.key, 80);
    const label = clipString(s.label, 200);
    const weight = clampNumber(s.weight, 0, 1);
    const status = clipString(s.status, 20) ?? '';
    const observation = clipString(s.observation, 800) ?? '';
    if (!key || !label || weight === null || !ALLOWED_STATUSES.has(status)) continue;
    gbpSignals.push({
      key,
      label,
      weight,
      status: status as AuditPdfSignal['status'],
      observation,
    });
  }

  const competitorsRaw = Array.isArray(payloadInput.competitors) ? payloadInput.competitors : [];
  if (competitorsRaw.length > PDF_REQUEST_MAX_COMPETITORS) {
    errors.push(`payload.competitors exceeds ${PDF_REQUEST_MAX_COMPETITORS} entries`);
  }
  const competitors: AuditPdfCompetitor[] = [];
  for (const co of competitorsRaw) {
    if (!co || typeof co !== 'object') continue;
    const c = co as Record<string, unknown>;
    const name = clipString(c.name, 200);
    if (!name) continue;
    competitors.push({
      name,
      rating: clampNumber(c.rating, 0, 5),
      reviewCount: clampNumber(c.reviewCount, 0, 1_000_000),
      primaryCategory: clipString(c.primaryCategory, 100),
      distanceMeters: clampNumber(c.distanceMeters, 0, 100_000),
    });
  }

  const actionsRaw = Array.isArray(payloadInput.actionItems) ? payloadInput.actionItems : [];
  if (actionsRaw.length > PDF_REQUEST_MAX_ACTION_ITEMS) {
    errors.push(`payload.actionItems exceeds ${PDF_REQUEST_MAX_ACTION_ITEMS} entries`);
  }
  const actionItems: AuditPdfActionItem[] = [];
  for (const ai of actionsRaw) {
    if (!ai || typeof ai !== 'object') continue;
    const a = ai as Record<string, unknown>;
    const title = clipString(a.title, 200);
    const priority = clampNumber(a.priority, 1, PDF_REQUEST_MAX_ACTION_ITEMS);
    const effort = clipString(a.effort, 20) ?? '';
    const impact = clipString(a.impact, 20) ?? '';
    const signal = clipString(a.signal, 80) ?? '';
    if (!title || priority === null || !ALLOWED_LEVELS.has(effort) || !ALLOWED_LEVELS.has(impact)) continue;
    actionItems.push({
      title,
      priority: priority as AuditPdfActionItem['priority'],
      effort: effort as AuditPdfActionItem['effort'],
      impact: impact as AuditPdfActionItem['impact'],
      signal,
    });
  }

  const auditRunId = clipString(payloadInput.auditRunId, 100) ?? undefined;

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    errors: [],
    data: {
      email: email!,
      lang: lang as AuditPdfRequest['lang'],
      businessName: businessName!,
      location,
      vertical,
      websiteUrl,
      gbpUrl,
      payload: {
        scoreBand: scoreBandRaw as AuditScoreBand,
        scoreNumeric: scoreNumeric!,
        citationMatrix,
        gbpSignals,
        competitors,
        actionItems,
        auditRunId,
      },
    },
  };
}
