import type { BlogPostEntry } from './types'

// ── Industry Playbooks ──────────────────────────────────────────────────────
import { meta as quebecRestaurantsMaps2026Meta } from './posts/industry-playbook/what-quebec-restaurants-ask-google-maps-2026'
import { meta as medicalClinicAiVisibilityMeta } from './posts/industry-playbook/medical-clinic-ai-visibility-guide'
import { meta as contractorServiceAreaGbpStrategyMeta } from './posts/industry-playbook/contractor-service-area-gbp-strategy'

// ── AI Visibility ───────────────────────────────────────────────────────────
import { meta as whyChatgptCitesCompetitorMeta } from './posts/ai-visibility/why-chatgpt-cites-your-competitor'
import { meta as perplexity30DayPlaybookMeta } from './posts/ai-visibility/perplexity-citations-30-day-playbook'
import { meta as bingCopilotB2BMeta } from './posts/ai-visibility/bing-copilot-b2b-search-engine'
import { meta as googleAiOverviewsGapMeta } from './posts/ai-visibility/google-ai-overviews-citation-gap-2027'
import { meta as shareOfModelMetricMeta } from './posts/ai-visibility/share-of-model-metric-explained'
import { meta as aiVisibilityAuditChecklistMeta } from './posts/ai-visibility/ai-visibility-audit-checklist-2026'
import { meta as claudeSearchCitationsExplainedMeta } from './posts/ai-visibility/claude-search-citations-explained'
import { meta as geminiLocalResultsRankingMeta } from './posts/ai-visibility/gemini-local-results-ranking'
import { meta as howAiEnginesRefreshCitationsMeta } from './posts/ai-visibility/how-ai-engines-refresh-citations'

// ── Voice Search ────────────────────────────────────────────────────────────
import { meta as voiceSearchDentistsMeta } from './posts/voice-search/voice-search-changed-for-dentists'
import { meta as siriLocalSearchMeta } from './posts/voice-search/siri-local-search-ranking-factors'
import { meta as alexaBusinessHoursFixMeta } from './posts/voice-search/alexa-business-hours-fix'
import { meta as speakableSchemaVoiceRankingMeta } from './posts/voice-search/speakable-schema-voice-ranking'

// ── Industry Playbooks (cont.) ──────────────────────────────────────────────
import { meta as localSeoMontrealDentistsMeta } from './posts/industry-playbook/local-seo-for-montreal-dentists'
import { meta as lawFirmSeoQuebecMeta } from './posts/industry-playbook/law-firm-seo-quebec-playbook'
import { meta as restaurantMarketingMontrealGuideMeta } from './posts/industry-playbook/restaurant-marketing-montreal-guide'
import { meta as hotelOldQuebecAiSearchStrategyMeta } from './posts/industry-playbook/hotel-old-quebec-ai-search-strategy'

// ── Reputation and Reviews ──────────────────────────────────────────────────
import { meta as googleReviewVelocityMeta } from './posts/reputation-reviews/google-review-velocity-playbook'
import { meta as reviuzyReviewAutomationGuideMeta } from './posts/reputation-reviews/reviuzy-review-automation-guide'
import { meta as negativeReviewResponseTemplatesMeta } from './posts/reputation-reviews/negative-review-response-templates'
import { meta as privateFeedbackFunnelGoogleRulesMeta } from './posts/reputation-reviews/private-feedback-funnel-google-rules'
import { meta as bilingualGoogleReviewsQuebecMeta } from './posts/reputation-reviews/bilingual-google-reviews-quebec'

// ── Analytics and Attribution ───────────────────────────────────────────────
import { meta as trackChatgptTrafficGa4Meta } from './posts/analytics-attribution/track-chatgpt-traffic-in-ga4'
import { meta as utmStrategyMultiLocationMeta } from './posts/analytics-attribution/utm-strategy-multi-location-business'
import { meta as callTrackingGoogleMapsBookingsMeta } from './posts/analytics-attribution/call-tracking-google-maps-bookings'
import { meta as serverSideTaggingVercelQuebecMeta } from './posts/analytics-attribution/server-side-tagging-on-vercel-quebec'
import { meta as ga4LocalBusinessBaselineSetupMeta } from './posts/analytics-attribution/ga4-local-business-baseline-setup'

// ── AEO / GEO / E-E-A-T ─────────────────────────────────────────────────────
import { meta as aeoGeoEeatExplainedMeta } from './posts/aeo-geo-eeat/aeo-geo-eeat-explained-for-local-owners'
import { meta as aeoPillarGuideMeta } from './posts/aeo-geo-eeat/answer-engine-optimization-pillar-guide'
import { meta as generativeEngineOptimization2026Meta } from './posts/aeo-geo-eeat/generative-engine-optimization-2026'
import { meta as eeatSignalsForSoloProfessionalsMeta } from './posts/aeo-geo-eeat/eeat-signals-for-solo-professionals'
import { meta as aeoVsSeoStrategicShiftMeta } from './posts/aeo-geo-eeat/aeo-vs-seo-strategic-shift'
import { meta as authorBioSchemaRankingsMeta } from './posts/aeo-geo-eeat/author-bio-schema-rankings'

// ── AiLys Product ───────────────────────────────────────────────────────────
import { meta as ailysVsTraditionalAgencyMeta } from './posts/ailys-product/ailys-vs-traditional-seo-agency'
import { meta as ailysPricingTiersExplainedCadMeta } from './posts/ailys-product/ailys-pricing-tiers-explained-cad'
import { meta as ailysReviuzyAddonDeepDiveMeta } from './posts/ailys-product/ailys-reviuzy-addon-deep-dive'
import { meta as ailysBilingualContentWorkflowMeta } from './posts/ailys-product/ailys-bilingual-content-workflow'
import { meta as ailysOnboardingWalkthroughCadMeta } from './posts/ailys-product/ailys-onboarding-walkthrough-cad'

// ── GBP / Google Maps ───────────────────────────────────────────────────────
import { meta as gbpPostsWeeklyCadenceMeta } from './posts/gbp-google-maps/gbp-posts-strategy-weekly-cadence'
import { meta as gbpPhotoUploadCheatSheetMeta } from './posts/gbp-google-maps/gbp-photo-upload-cheat-sheet'
import { meta as gbpCategoriesBestPrimaryPickMeta } from './posts/gbp-google-maps/gbp-categories-best-primary-pick'
import { meta as gbpQAndAMonitoringPlaybookMeta } from './posts/gbp-google-maps/gbp-q-and-a-monitoring-playbook'
import { meta as gbpAttributesUltimateGuideMeta } from './posts/gbp-google-maps/gbp-attributes-ultimate-guide'

// ── Local SEO ───────────────────────────────────────────────────────────────
import { meta as napConsistencyAuditMeta } from './posts/local-seo/nap-consistency-audit-quebec'
import { meta as wikidataForLocalBusinessesMeta } from './posts/local-seo/wikidata-for-local-businesses'
import { meta as appleBusinessConnectCanadaSetupMeta } from './posts/local-seo/apple-business-connect-canada-setup'
import { meta as yellowPagesCanadaCitationCleanupMeta } from './posts/local-seo/yellow-pages-canada-citation-cleanup'
import { meta as localSchemaMarkupCheatSheetMeta } from './posts/local-seo/local-schema-markup-cheat-sheet'

// ── Registry ────────────────────────────────────────────────────────────────

export const BLOG_POSTS: BlogPostEntry[] = [
  // Industry Playbooks
  {
    ...quebecRestaurantsMaps2026Meta,
    load: () => import('./posts/industry-playbook/what-quebec-restaurants-ask-google-maps-2026'),
  },
  {
    ...medicalClinicAiVisibilityMeta,
    load: () => import('./posts/industry-playbook/medical-clinic-ai-visibility-guide'),
  },

  // AI Visibility
  {
    ...whyChatgptCitesCompetitorMeta,
    load: () => import('./posts/ai-visibility/why-chatgpt-cites-your-competitor'),
  },
  {
    ...perplexity30DayPlaybookMeta,
    load: () => import('./posts/ai-visibility/perplexity-citations-30-day-playbook'),
  },
  {
    ...bingCopilotB2BMeta,
    load: () => import('./posts/ai-visibility/bing-copilot-b2b-search-engine'),
  },
  {
    ...googleAiOverviewsGapMeta,
    load: () => import('./posts/ai-visibility/google-ai-overviews-citation-gap-2027'),
  },
  {
    ...shareOfModelMetricMeta,
    load: () => import('./posts/ai-visibility/share-of-model-metric-explained'),
  },
  {
    ...aiVisibilityAuditChecklistMeta,
    load: () => import('./posts/ai-visibility/ai-visibility-audit-checklist-2026'),
  },
  {
    ...claudeSearchCitationsExplainedMeta,
    load: () => import('./posts/ai-visibility/claude-search-citations-explained'),
  },
  {
    ...geminiLocalResultsRankingMeta,
    load: () => import('./posts/ai-visibility/gemini-local-results-ranking'),
  },

  // Voice Search
  {
    ...voiceSearchDentistsMeta,
    load: () => import('./posts/voice-search/voice-search-changed-for-dentists'),
  },
  {
    ...siriLocalSearchMeta,
    load: () => import('./posts/voice-search/siri-local-search-ranking-factors'),
  },
  {
    ...alexaBusinessHoursFixMeta,
    load: () => import('./posts/voice-search/alexa-business-hours-fix'),
  },
  {
    ...speakableSchemaVoiceRankingMeta,
    load: () => import('./posts/voice-search/speakable-schema-voice-ranking'),
  },

  // Industry Playbooks (cont.)
  {
    ...localSeoMontrealDentistsMeta,
    load: () => import('./posts/industry-playbook/local-seo-for-montreal-dentists'),
  },
  {
    ...lawFirmSeoQuebecMeta,
    load: () => import('./posts/industry-playbook/law-firm-seo-quebec-playbook'),
  },
  {
    ...restaurantMarketingMontrealGuideMeta,
    load: () => import('./posts/industry-playbook/restaurant-marketing-montreal-guide'),
  },
  {
    ...hotelOldQuebecAiSearchStrategyMeta,
    load: () => import('./posts/industry-playbook/hotel-old-quebec-ai-search-strategy'),
  },

  // Reputation and Reviews
  {
    ...googleReviewVelocityMeta,
    load: () => import('./posts/reputation-reviews/google-review-velocity-playbook'),
  },
  {
    ...reviuzyReviewAutomationGuideMeta,
    load: () => import('./posts/reputation-reviews/reviuzy-review-automation-guide'),
  },
  {
    ...negativeReviewResponseTemplatesMeta,
    load: () => import('./posts/reputation-reviews/negative-review-response-templates'),
  },
  {
    ...bilingualGoogleReviewsQuebecMeta,
    load: () => import('./posts/reputation-reviews/bilingual-google-reviews-quebec'),
  },

  // Analytics and Attribution
  {
    ...trackChatgptTrafficGa4Meta,
    load: () => import('./posts/analytics-attribution/track-chatgpt-traffic-in-ga4'),
  },
  {
    ...utmStrategyMultiLocationMeta,
    load: () => import('./posts/analytics-attribution/utm-strategy-multi-location-business'),
  },
  {
    ...callTrackingGoogleMapsBookingsMeta,
    load: () => import('./posts/analytics-attribution/call-tracking-google-maps-bookings'),
  },

  // AEO / GEO / E-E-A-T
  {
    ...aeoGeoEeatExplainedMeta,
    load: () => import('./posts/aeo-geo-eeat/aeo-geo-eeat-explained-for-local-owners'),
  },
  {
    ...aeoPillarGuideMeta,
    load: () => import('./posts/aeo-geo-eeat/answer-engine-optimization-pillar-guide'),
  },
  {
    ...generativeEngineOptimization2026Meta,
    load: () => import('./posts/aeo-geo-eeat/generative-engine-optimization-2026'),
  },
  {
    ...eeatSignalsForSoloProfessionalsMeta,
    load: () => import('./posts/aeo-geo-eeat/eeat-signals-for-solo-professionals'),
  },
  {
    ...aeoVsSeoStrategicShiftMeta,
    load: () => import('./posts/aeo-geo-eeat/aeo-vs-seo-strategic-shift'),
  },
  {
    ...authorBioSchemaRankingsMeta,
    load: () => import('./posts/aeo-geo-eeat/author-bio-schema-rankings'),
  },

  // Local SEO
  {
    ...napConsistencyAuditMeta,
    load: () => import('./posts/local-seo/nap-consistency-audit-quebec'),
  },
  {
    ...wikidataForLocalBusinessesMeta,
    load: () => import('./posts/local-seo/wikidata-for-local-businesses'),
  },

  // AiLys Product
  {
    ...ailysVsTraditionalAgencyMeta,
    load: () => import('./posts/ailys-product/ailys-vs-traditional-seo-agency'),
  },
  {
    ...ailysPricingTiersExplainedCadMeta,
    load: () => import('./posts/ailys-product/ailys-pricing-tiers-explained-cad'),
  },
  {
    ...ailysReviuzyAddonDeepDiveMeta,
    load: () => import('./posts/ailys-product/ailys-reviuzy-addon-deep-dive'),
  },

  // GBP / Google Maps
  {
    ...gbpPostsWeeklyCadenceMeta,
    load: () => import('./posts/gbp-google-maps/gbp-posts-strategy-weekly-cadence'),
  },
  {
    ...gbpPhotoUploadCheatSheetMeta,
    load: () => import('./posts/gbp-google-maps/gbp-photo-upload-cheat-sheet'),
  },
  {
    ...gbpCategoriesBestPrimaryPickMeta,
    load: () => import('./posts/gbp-google-maps/gbp-categories-best-primary-pick'),
  },
  {
    ...gbpQAndAMonitoringPlaybookMeta,
    load: () => import('./posts/gbp-google-maps/gbp-q-and-a-monitoring-playbook'),
  },

  // Local SEO (cont.)
  {
    ...appleBusinessConnectCanadaSetupMeta,
    load: () => import('./posts/local-seo/apple-business-connect-canada-setup'),
  },
  {
    ...yellowPagesCanadaCitationCleanupMeta,
    load: () => import('./posts/local-seo/yellow-pages-canada-citation-cleanup'),
  },
  {
    ...localSchemaMarkupCheatSheetMeta,
    load: () => import('./posts/local-seo/local-schema-markup-cheat-sheet'),
  },

  // GSD Wave 6, Batch E
  {
    ...contractorServiceAreaGbpStrategyMeta,
    load: () => import('./posts/industry-playbook/contractor-service-area-gbp-strategy'),
  },
  {
    ...privateFeedbackFunnelGoogleRulesMeta,
    load: () => import('./posts/reputation-reviews/private-feedback-funnel-google-rules'),
  },

  // GSD Wave 6, Batch F
  {
    ...serverSideTaggingVercelQuebecMeta,
    load: () => import('./posts/analytics-attribution/server-side-tagging-on-vercel-quebec'),
  },
  {
    ...ailysBilingualContentWorkflowMeta,
    load: () => import('./posts/ailys-product/ailys-bilingual-content-workflow'),
  },

  // GSD Wave 7, Batch A
  {
    ...howAiEnginesRefreshCitationsMeta,
    load: () => import('./posts/ai-visibility/how-ai-engines-refresh-citations'),
  },
  {
    ...gbpAttributesUltimateGuideMeta,
    load: () => import('./posts/gbp-google-maps/gbp-attributes-ultimate-guide'),
  },

  // GSD Wave 7, Batch D (manually authored after rate-limit hit)
  {
    ...ga4LocalBusinessBaselineSetupMeta,
    load: () => import('./posts/analytics-attribution/ga4-local-business-baseline-setup'),
  },
  {
    ...ailysOnboardingWalkthroughCadMeta,
    load: () => import('./posts/ailys-product/ailys-onboarding-walkthrough-cad'),
  },
]

/** Look up a single post by slug. */
export function getPostBySlug(slug: string): BlogPostEntry | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

/** All posts in a given category. */
export function getPostsByCategory(category: string): BlogPostEntry[] {
  return BLOG_POSTS.filter((p) => p.category === category)
}

/** All distinct categories that have at least one post. */
export function getCategories(): string[] {
  return [...new Set(BLOG_POSTS.map((p) => p.category))]
}

/** Posts sorted by publishedDate. Default newest first. */
export function getPostsSorted(order: 'newest' | 'oldest' = 'newest'): BlogPostEntry[] {
  return [...BLOG_POSTS].sort((a, b) => {
    const diff = new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    return order === 'newest' ? diff : -diff
  })
}

/**
 * Posts visible at the current moment.
 * Backfilled posts with publishedDate in the future stay hidden until their date arrives.
 */
export function getVisiblePosts(now: Date = new Date()): BlogPostEntry[] {
  return BLOG_POSTS.filter((p) => new Date(p.publishedDate).getTime() <= now.getTime())
}
