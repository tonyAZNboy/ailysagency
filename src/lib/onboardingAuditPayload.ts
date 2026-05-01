// Day-1 onboarding audit payload synthesizer.
//
// When a brand-new client lands in our system via Stripe + provision-ailys-
// tenant, we want them to receive a branded baseline PDF in <2 minutes,
// not week 2-3. We do not yet have a real audit run for them (those run
// on the next scheduled probe per their tier). So this module synthesizes
// a Day-1 placeholder payload that:
//
//   - Renders correctly through the existing PDF pipeline (no changes to
//     pdf-lib code required)
//   - Carries real business data (name, location, vertical) so the cover
//     and metadata pages are accurate
//   - Marks the citation matrix with "first scan pending" rows so the
//     client knows the matrix is provisional
//   - Surfaces vertical-tuned action items based on the typical first-month
//     wins for that vertical (taken from existing playbooks)
//
// Exits as a fully-validated AuditPdfRequest, ready to feed renderAuditPdf.

import type {
  AuditPdfRequest,
  AuditPdfPayload,
  AuditPdfCitationCell,
  AuditPdfSignal,
  AuditPdfActionItem,
  AuditPdfCompetitor,
} from './pdfRequestSchema';

export interface OnboardingInput {
  email: string;
  lang: AuditPdfRequest['lang'];
  businessName: string;
  location: string | null;
  vertical: string;
  websiteUrl: string | null;
  gbpUrl: string | null;
}

const PLACEHOLDER_QUERIES_BY_VERTICAL: Record<string, string[]> = {
  dentist: [
    'best dentist near me',
    'emergency dentist',
    'family dentist accepting new patients',
  ],
  lawyer: [
    'best lawyer near me',
    'family law attorney consultation',
    'small business lawyer',
  ],
  restaurant: [
    'best restaurant near me',
    'restaurant open now',
    'family-friendly restaurant',
  ],
  contractor: [
    'general contractor near me',
    'kitchen renovation contractor',
    'licensed contractor reviews',
  ],
  clinic: [
    'medical clinic near me',
    'walk-in clinic open now',
    'family doctor accepting patients',
  ],
  real_estate: [
    'real estate agent near me',
    'top real estate broker',
    'first-time home buyer agent',
  ],
  hotel: [
    'best hotel near me',
    'pet-friendly hotel',
    'business hotel downtown',
  ],
  other: [
    'best [vertical] near me',
    '[vertical] open now',
    'top-rated [vertical]',
  ],
};

const VERTICAL_ACTION_ITEMS: Record<string, Array<Omit<AuditPdfActionItem, 'priority'>>> = {
  dentist: [
    { title: 'Verify Apple Maps Connect listing for the Siri voice channel', effort: 'low', impact: 'high', signal: 'apple_maps_verified' },
    { title: 'Set monthly review prompts asking patients to mention specific services', effort: 'low', impact: 'high', signal: 'reviews_recency' },
    { title: 'Deploy LocalBusiness + FAQPage schema on the home page', effort: 'medium', impact: 'high', signal: 'schema_density' },
    { title: 'Confirm NAP consistency across Yelp, BBB, and YellowPages CA', effort: 'low', impact: 'high', signal: 'nap_consistency' },
    { title: 'Schedule monthly photo upload routine, 4 photos minimum', effort: 'low', impact: 'medium', signal: 'photo_recency' },
  ],
  lawyer: [
    { title: 'Claim and verify your Barreau du Quebec directory listing', effort: 'low', impact: 'high', signal: 'jurisdiction_directory' },
    { title: 'Add LegalService schema with practice areas listed', effort: 'medium', impact: 'high', signal: 'schema_density' },
    { title: 'Confirm NAP across Lexology, JuriBistro, GBP', effort: 'low', impact: 'high', signal: 'nap_consistency' },
    { title: 'Set quarterly review prompts focused on case-type specifics', effort: 'low', impact: 'medium', signal: 'reviews_recency' },
    { title: 'Author a Quebec-jurisdiction FAQ page', effort: 'medium', impact: 'medium', signal: 'content_authority' },
  ],
  restaurant: [
    { title: 'Set weekly photo upload cadence, dish photos plus interior', effort: 'low', impact: 'high', signal: 'photo_recency' },
    { title: 'Deploy Restaurant + Menu schema with current dishes', effort: 'medium', impact: 'high', signal: 'schema_density' },
    { title: 'Verify all GBP attributes including dietary tags', effort: 'low', impact: 'high', signal: 'gbp_attributes' },
    { title: 'Resume GBP posts at 1 per week, daily-special focus', effort: 'low', impact: 'high', signal: 'post_cadence' },
    { title: 'Confirm NAP across Yelp, OpenTable, GBP, Google reservations', effort: 'low', impact: 'medium', signal: 'nap_consistency' },
  ],
};

function fallbackActionItems(): Array<Omit<AuditPdfActionItem, 'priority'>> {
  return [
    { title: 'Confirm NAP consistency across the top 10 directories', effort: 'low', impact: 'high', signal: 'nap_consistency' },
    { title: 'Deploy LocalBusiness schema on your home page', effort: 'medium', impact: 'high', signal: 'schema_density' },
    { title: 'Set monthly review prompt routine, target 4 to 6 fresh reviews', effort: 'low', impact: 'high', signal: 'reviews_recency' },
    { title: 'Set monthly photo upload routine, 4 photos minimum', effort: 'low', impact: 'medium', signal: 'photo_recency' },
    { title: 'Verify GBP categories and attributes are fully filled', effort: 'low', impact: 'high', signal: 'gbp_attributes' },
  ];
}

/**
 * Build an `AuditPdfRequest` for a brand-new client.
 *
 * The score band is locked to 'developing' with score=50 because we have
 * not run a real probe yet. The cover + summary pages explicitly call
 * this out as a baseline. The first real scheduled scan replaces this
 * within 24-72 hours depending on tier.
 */
export function buildOnboardingPdfRequest(input: OnboardingInput): AuditPdfRequest {
  const queries = PLACEHOLDER_QUERIES_BY_VERTICAL[input.vertical] ?? PLACEHOLDER_QUERIES_BY_VERTICAL.other;

  // 6 engines x N queries = "first scan pending" cells
  const citationMatrix: AuditPdfCitationCell[] = [];
  const engines: AuditPdfCitationCell['engine'][] = ['chatgpt', 'perplexity', 'claude', 'gemini', 'aio', 'copilot'];
  for (const engine of engines) {
    for (const query of queries) {
      citationMatrix.push({ engine, query, cited: false, rank: null });
    }
  }

  // GBP signals: all 'partial' status with "first scan pending" observation
  const gbpSignals: AuditPdfSignal[] = [
    { key: 'reviews_recency', label: 'Recent reviews', weight: 0.18, status: 'partial', observation: 'First scan pending. Real measurement after first scheduled probe.' },
    { key: 'photo_recency', label: 'Photo recency', weight: 0.10, status: 'partial', observation: 'First scan pending. We will measure photo upload cadence after activation.' },
    { key: 'nap_consistency', label: 'NAP consistency', weight: 0.10, status: 'partial', observation: 'First scan pending. We will audit your top 20 directories within 72 hours.' },
    { key: 'schema_density', label: 'Schema density', weight: 0.10, status: 'partial', observation: 'First scan pending. We will analyze your home page schema within 24 hours.' },
    { key: 'gbp_attributes', label: 'GBP attributes', weight: 0.08, status: 'partial', observation: 'First scan pending. Full attribute audit within 48 hours.' },
    { key: 'review_count', label: 'Total reviews', weight: 0.12, status: 'partial', observation: 'First scan pending.' },
  ];

  // Single placeholder competitor row so the Day-1 PDF still renders the
  // competitor comparison page (10-page promise). Replaced with real data
  // after the first Places probe runs.
  const competitors: AuditPdfCompetitor[] = [
    {
      name: 'First scan pending',
      rating: null,
      reviewCount: null,
      primaryCategory: 'We will pull your top 5 competitors after the first probe.',
      distanceMeters: null,
    },
  ];

  const actionTemplate = VERTICAL_ACTION_ITEMS[input.vertical] ?? fallbackActionItems();
  const actionItems: AuditPdfActionItem[] = actionTemplate.map((item, idx) => ({
    ...item,
    priority: (idx + 1) as AuditPdfActionItem['priority'],
  }));

  const payload: AuditPdfPayload = {
    scoreBand: 'developing',
    scoreNumeric: 50,
    citationMatrix,
    gbpSignals,
    competitors,
    actionItems,
    auditRunId: `onb_${Date.now()}`,
  };

  return {
    email: input.email,
    lang: input.lang,
    businessName: input.businessName,
    location: input.location,
    vertical: input.vertical,
    websiteUrl: input.websiteUrl,
    gbpUrl: input.gbpUrl,
    payload,
  };
}
