/**
 * Pillar layout for AiLys long-form hub posts that link out to many spokes.
 *
 * Pillars are used for "AI Visibility Pillar", "Local SEO Pillar", and "GBP
 * Pillar" topic clusters. The component:
 *   1. Wraps the post body (children) so authors can keep writing in TSX.
 *   2. Renders an extra Table of Contents at the top, separate from the
 *      sidebar ToC, so pillar readers can skim sections fast.
 *   3. Injects an Article JSON-LD with `articleSection: 'Pillar'` so search
 *      and AI engines treat the page as a hub rather than a regular post.
 *   4. Surfaces an introductory section with key points and links to related
 *      categories, mirroring the Truvizy pillar shape but with AiLys topics.
 *
 * Translations are hand-authored. This component never calls a translation
 * API. Pillar copy stays generic so per-locale post modules can override the
 * intro by passing `intro` and `keyPoints` as props instead of relying on the
 * baked-in defaults.
 */

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Shield, ArrowRight, ListTree } from 'lucide-react'
import type { BlogCategory } from '../types'

const SITE_URL = 'https://www.ailysagency.ca'

interface PillarTocItem {
  id: string
  text: string
}

interface RelatedCategory {
  id: BlogCategory
  label: string
}

interface PillarDefaults {
  intro: React.ReactNode
  keyPoints: string[]
  relatedCategories: RelatedCategory[]
}

/** Default pillar copy for AiLys hub posts. Override via props per post. */
const DEFAULTS: Record<string, PillarDefaults> = {
  'ai-visibility': {
    intro: (
      <>
        <p>
          AI Visibility is the practice of getting your local business cited inside
          the major AI answer engines. When 1.2 billion people now run searches
          through LLM answer boxes every month, ranking on page one is no longer
          enough. You need to be named in the answer itself.
        </p>
        <p>
          This pillar gathers every AiLys Agency guide on how that pipeline works:
          which signals trigger LLM citations, how Answer Engine Optimization (AEO)
          and Generative Engine Optimization (GEO) differ from classical SEO, and
          how E-E-A-T translates into AI search trust.
        </p>
      </>
    ),
    keyPoints: [
      'Understand how the major AI answer engines pick which brands to name.',
      'Build the on-site and off-site signals that make your business citation-worthy.',
      'Translate classical SEO authority into AEO, GEO, and E-E-A-T trust.',
      'Track which AI engines are sending real traffic and bookings.',
    ],
    relatedCategories: [
      { id: 'aeo-geo-eeat', label: 'AEO, GEO, E-E-A-T' },
      { id: 'local-seo', label: 'Local SEO' },
      { id: 'analytics-attribution', label: 'Analytics and Attribution' },
    ],
  },

  'local-seo': {
    intro: (
      <>
        <p>
          Local SEO is the foundation that AI Visibility sits on. Before any LLM
          will cite your local business it needs a clean trail of canonical
          signals: consistent NAP, structured citations, valid schema, and a
          well-formed Wikidata entity.
        </p>
        <p>
          This pillar collects every AiLys Agency guide on the technical layer
          of local search, from NAP audits and citation cleanup to schema markup
          and entity authority work.
        </p>
      </>
    ),
    keyPoints: [
      'Run a NAP consistency audit and fix the discrepancies that hurt local rankings.',
      'Build authoritative citations across the directories AI engines actually read.',
      'Add LocalBusiness, Service, and FAQ schema that grounds your Knowledge Graph entity.',
      'Use Wikidata and Wikipedia signals to anchor your brand for LLMs.',
    ],
    relatedCategories: [
      { id: 'ai-visibility', label: 'AI Visibility' },
      { id: 'gbp-google-maps', label: 'Google Business Profile' },
      { id: 'aeo-geo-eeat', label: 'AEO, GEO, E-E-A-T' },
    ],
  },

  'gbp-google-maps': {
    intro: (
      <>
        <p>
          Google Business Profile (GBP) is the single highest-impact asset a
          local business owns. It powers the local pack, Google Maps, voice
          search, and increasingly the answers Google AIO returns when users
          ask for businesses near them.
        </p>
        <p>
          This pillar collects every AiLys Agency guide on GBP, from photo and
          attribute optimization to Q and A monitoring, posts, review velocity,
          and the operator workflow that keeps your profile fresh.
        </p>
      </>
    ),
    keyPoints: [
      'Optimize the GBP fields that actually move local pack and Maps rankings.',
      'Run a photo, attribute, and Q and A audit you can act on in one afternoon.',
      'Set up a posting and review cadence that keeps your profile fresh.',
      'Connect GBP signals to the AI Visibility pipeline so LLMs cite you next.',
    ],
    relatedCategories: [
      { id: 'local-seo', label: 'Local SEO' },
      { id: 'reputation-reviews', label: 'Reputation and Reviews' },
      { id: 'voice-search', label: 'Voice Search' },
    ],
  },
}

interface PillarContentProps {
  /** Slug of the pillar post (used in JSON-LD canonical). */
  slug: string
  /** Pillar key, e.g. `ai-visibility`. Falls back to a minimal layout when unknown. */
  pillarKey?: string
  /** Pillar title shown in the layout heading and JSON-LD. */
  title: string
  /** Optional intro override (per post / per locale). */
  intro?: React.ReactNode
  /** Optional key points override (per post / per locale). */
  keyPoints?: string[]
  /** Optional related categories override. */
  relatedCategories?: RelatedCategory[]
  /** Inline ToC items, one per spoke section in the pillar body. */
  toc?: PillarTocItem[]
  /** The pillar body itself. Authors keep writing in TSX. */
  children: React.ReactNode
  /** Locale-prefixed link helper. Caller controls the `/lang` prefix. */
  langPrefix?: string
}

export function PillarContent({
  slug,
  pillarKey,
  title,
  intro,
  keyPoints,
  relatedCategories,
  toc,
  children,
  langPrefix = '',
}: PillarContentProps) {
  const fallback = pillarKey ? DEFAULTS[pillarKey] : undefined
  const finalIntro = intro ?? fallback?.intro ?? null
  const finalKeyPoints = keyPoints ?? fallback?.keyPoints ?? []
  const finalRelated = relatedCategories ?? fallback?.relatedCategories ?? []

  // Inject an additional Article JSON-LD that flags this page as a Pillar.
  // This sits alongside the standard BlogJsonLd already emitted by the post
  // page and gives AI engines an explicit `articleSection` hint.
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      name: title,
      headline: title,
      articleSection: 'Pillar',
      isPartOf: {
        '@type': 'WebSite',
        name: 'AiLys Agency',
        url: SITE_URL,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_URL}${langPrefix}/blog/${slug}`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'AiLys Agency',
        url: SITE_URL,
      },
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    script.dataset.pillarJsonld = slug
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [slug, title, langPrefix])

  return (
    <div className="mb-12">
      {/* Pillar introduction */}
      {finalIntro && <div className="prose-blog max-w-3xl mb-8">{finalIntro}</div>}

      {/* Inline pillar ToC. Sits above the body so pillar readers can jump
          straight to a spoke section. The sidebar ToC still renders separately
          for desktop reading. */}
      {toc && toc.length > 0 && (
        <div className="max-w-3xl mb-8 rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center gap-2 mb-3">
            <ListTree className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-bold uppercase tracking-wider text-cyan-400">
              In this pillar
            </span>
          </div>
          <ul className="space-y-2">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-[0.95rem] text-white/70 hover:text-cyan-400 transition-colors"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Key points */}
      {finalKeyPoints.length > 0 && (
        <div className="max-w-3xl mb-8 rounded-2xl border border-cyan-500/20 bg-white/[0.02] backdrop-blur-sm p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-cyan-400" />
            What this pillar covers
          </h3>
          <ul className="space-y-3">
            {finalKeyPoints.map((point, i) => (
              <li key={i} className="flex gap-3 text-[0.95rem] text-white/70">
                <span className="text-cyan-400 font-bold shrink-0">{`${i + 1}.`}</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Related categories (cross-linking for SEO) */}
      {finalRelated.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-10">
          <span className="text-sm text-white/40 py-2">Also explore:</span>
          {finalRelated.map((cat) => (
            <Link
              key={cat.id}
              to={`${langPrefix}/blog/category/${cat.id}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/60 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
            >
              {cat.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      )}

      {/* Pillar body. The actual TSX written by the post author. */}
      <div className="prose-blog max-w-3xl">{children}</div>

      {/* CTA card at the foot of the pillar */}
      <div className="mt-12 max-w-3xl rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="text-white font-semibold">
              Ready to act on this pillar?
            </p>
            <p className="text-white/50 text-sm mt-1">
              Run the free 24-hour AiLys Agency AI Visibility audit.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              to={`${langPrefix}/audit`}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-bold text-black hover:bg-cyan-400 transition-colors"
            >
              {'Run Free Audit '}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to={`${langPrefix}/#pricing-builder`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 transition-colors"
            >
              See Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
