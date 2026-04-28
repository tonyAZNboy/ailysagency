import type { BlogPostEntry } from './types'

// ── Industry Playbooks ──────────────────────────────────────────────────────
import { meta as quebecRestaurantsMaps2026Meta } from './posts/industry-playbook/what-quebec-restaurants-ask-google-maps-2026'
import { meta as medicalClinicAiVisibilityMeta } from './posts/industry-playbook/medical-clinic-ai-visibility-guide'

// ── AI Visibility ───────────────────────────────────────────────────────────
import { meta as whyChatgptCitesCompetitorMeta } from './posts/ai-visibility/why-chatgpt-cites-your-competitor'
import { meta as perplexity30DayPlaybookMeta } from './posts/ai-visibility/perplexity-citations-30-day-playbook'
import { meta as bingCopilotB2BMeta } from './posts/ai-visibility/bing-copilot-b2b-search-engine'
import { meta as googleAiOverviewsGapMeta } from './posts/ai-visibility/google-ai-overviews-citation-gap-2027'
import { meta as shareOfModelMetricMeta } from './posts/ai-visibility/share-of-model-metric-explained'
import { meta as aiVisibilityAuditChecklistMeta } from './posts/ai-visibility/ai-visibility-audit-checklist-2026'

// ── Voice Search ────────────────────────────────────────────────────────────
import { meta as voiceSearchDentistsMeta } from './posts/voice-search/voice-search-changed-for-dentists'
import { meta as siriLocalSearchMeta } from './posts/voice-search/siri-local-search-ranking-factors'

// ── Industry Playbooks (cont.) ──────────────────────────────────────────────
import { meta as localSeoMontrealDentistsMeta } from './posts/industry-playbook/local-seo-for-montreal-dentists'

// ── Reputation and Reviews ──────────────────────────────────────────────────
import { meta as googleReviewVelocityMeta } from './posts/reputation-reviews/google-review-velocity-playbook'

// ── Analytics and Attribution ───────────────────────────────────────────────
import { meta as trackChatgptTrafficGa4Meta } from './posts/analytics-attribution/track-chatgpt-traffic-in-ga4'

// ── AEO / GEO / E-E-A-T ─────────────────────────────────────────────────────
import { meta as aeoGeoEeatExplainedMeta } from './posts/aeo-geo-eeat/aeo-geo-eeat-explained-for-local-owners'
import { meta as aeoPillarGuideMeta } from './posts/aeo-geo-eeat/answer-engine-optimization-pillar-guide'

// ── AiLys Product ───────────────────────────────────────────────────────────
import { meta as ailysVsTraditionalAgencyMeta } from './posts/ailys-product/ailys-vs-traditional-seo-agency'

// ── GBP / Google Maps ───────────────────────────────────────────────────────
import { meta as gbpPostsWeeklyCadenceMeta } from './posts/gbp-google-maps/gbp-posts-strategy-weekly-cadence'
import { meta as gbpPhotoUploadCheatSheetMeta } from './posts/gbp-google-maps/gbp-photo-upload-cheat-sheet'

// ── Local SEO ───────────────────────────────────────────────────────────────
import { meta as napConsistencyAuditMeta } from './posts/local-seo/nap-consistency-audit-quebec'

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

  // Voice Search
  {
    ...voiceSearchDentistsMeta,
    load: () => import('./posts/voice-search/voice-search-changed-for-dentists'),
  },
  {
    ...siriLocalSearchMeta,
    load: () => import('./posts/voice-search/siri-local-search-ranking-factors'),
  },

  // Industry Playbooks (cont.)
  {
    ...localSeoMontrealDentistsMeta,
    load: () => import('./posts/industry-playbook/local-seo-for-montreal-dentists'),
  },

  // Reputation and Reviews
  {
    ...googleReviewVelocityMeta,
    load: () => import('./posts/reputation-reviews/google-review-velocity-playbook'),
  },

  // Analytics and Attribution
  {
    ...trackChatgptTrafficGa4Meta,
    load: () => import('./posts/analytics-attribution/track-chatgpt-traffic-in-ga4'),
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

  // Local SEO
  {
    ...napConsistencyAuditMeta,
    load: () => import('./posts/local-seo/nap-consistency-audit-quebec'),
  },

  // AiLys Product
  {
    ...ailysVsTraditionalAgencyMeta,
    load: () => import('./posts/ailys-product/ailys-vs-traditional-seo-agency'),
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
