import { useState, useMemo, useCallback, useEffect } from 'react'
import { useSearchParams, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { cn } from '@/lib/utils'
import { BLOG_CATEGORIES } from '../categories'
import { BLOG_POSTS, getLocalizedMeta } from '../registry'
import { FULL_TRANSLATION_LANGS } from '../i18n-types'
import type { BlogCategory } from '../types'
import { BlogCard } from './BlogCard'
import { HreflangTagsIndex } from './HreflangTags'

const SITE_URL = 'https://www.ailysagency.ca'

interface BlogIndexPageProps {
  /** Pre-selected category (from BlogCategoryPage) */
  initialCategory?: BlogCategory
}

type SortOrder = 'latest' | 'oldest'

const POSTS_PER_PAGE = 12

interface BlogTranslations {
  title?: string; subtitle?: string; searchPlaceholder?: string
  sortLatest?: string; sortOldest?: string; allCategories?: string
  noResults?: string; noResultsHint?: string; prev?: string; next?: string
  backToBlog?: string; home?: string; blog?: string
  tryFree?: string; min?: string
  categories?: Record<string, string>
  cta?: { heading?: string; subtitle?: string; button?: string; altButton?: string }
  posts?: Record<string, { title?: string; metaDescription?: string }>
}

export function BlogIndexPage({ initialCategory }: BlogIndexPageProps = {}) {
  const { lang } = useParams<{ lang?: string }>()
  const isTranslated = lang && (FULL_TRANSLATION_LANGS as readonly string[]).includes(lang)
  const langPrefix = isTranslated ? `/${lang}` : ''
  const [t, setT] = useState<BlogTranslations>({})

  // Load translations for non-English
  useEffect(() => {
    if (!isTranslated || !lang) return
    fetch(`/locales/${lang}/blog.json`)
      .then((r) => r.ok ? r.json() : {})
      .then((data) => setT(data))
      .catch(() => {})
  }, [lang, isTranslated])

  const posts = BLOG_POSTS
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'all'>(
    initialCategory || 'all',
  )
  const [sort, setSort] = useState<SortOrder>('latest')

  const currentPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1)

  const setPage = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        if (page <= 1) {
          next.delete('page')
        } else {
          next.set('page', String(page))
        }
        return next
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [setSearchParams],
  )

  const activeLabel =
    activeCategory === 'all'
      ? undefined
      : BLOG_CATEGORIES.find((c) => c.id === activeCategory)?.label

  const pageTitle = activeLabel
    ? `${activeLabel} Articles`
    : 'AI Visibility and Local SEO Knowledge Center'
  const pageDescription =
    'Field notes on AI Visibility, Local SEO, Google Business Profile, and how local businesses get cited inside ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot. By the AiLys Research Team.'
  const canonicalPath =
    activeCategory === 'all'
      ? `${langPrefix}/blog`
      : `${langPrefix}/blog/category/${activeCategory}`

  const filtered = useMemo(() => {
    let result = posts

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((p) => {
        const tTitle = t.posts?.[p.slug]?.title?.toLowerCase() || ''
        const tDesc = t.posts?.[p.slug]?.metaDescription?.toLowerCase() || ''
        return (
          p.title.toLowerCase().includes(q) ||
          p.metaDescription.toLowerCase().includes(q) ||
          tTitle.includes(q) ||
          tDesc.includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q))
        )
      })
    }

    result = [...result].sort((a, b) => {
      const da = new Date(a.publishedDate).getTime()
      const db = new Date(b.publishedDate).getTime()
      return sort === 'latest' ? db - da : da - db
    })

    return result
  }, [posts, activeCategory, search, sort, t])

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedPosts = filtered.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE,
  )

  // Inline ItemList JSON-LD for the blog index (no PageJsonLd helper on AiLys)
  useEffect(() => {
    const itemListLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: pageTitle,
      description: pageDescription,
      url: `${SITE_URL}${canonicalPath}`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: posts.length,
      },
    }
    document.querySelectorAll('script[data-blog-index-jsonld]').forEach((s) => s.remove())
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.blogIndexJsonld = 'true'
    script.textContent = JSON.stringify(itemListLd)
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [pageTitle, pageDescription, canonicalPath, posts.length])

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`${SITE_URL}${canonicalPath}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`${SITE_URL}${canonicalPath}`} />
      </Helmet>

      <HreflangTagsIndex />

      {/* Hero */}
      <section className="border-b border-white/10 py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-4xl font-extrabold sm:text-5xl text-cyan-400 pb-2">
            {t.title || 'AI Visibility and Local SEO Knowledge Center'}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/60">
            {t.subtitle ||
              'Expert guides on AI Visibility, Google Business Profile, and how to get cited inside ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot, by the AiLys Research Team.'}
          </p>
        </div>
      </section>

      {/* Sticky filters: compact on mobile (search + sort + category dropdown
          in one row, ~64px), pills on sm+ (full layout). Translucent bg so
          article cards stay visible behind. */}
      <div className="sticky top-[53px] z-40 border-b border-white/10 bg-[#0a0e1a]/40 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0a0e1a]/30">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:py-4">
          {/* Mobile compact bar (single row) */}
          <div className="flex sm:hidden items-center gap-2">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40 pointer-events-none" />
              <input
                type="text"
                placeholder={t.searchPlaceholder || 'Search articles...'}
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="w-full min-h-[44px] rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-base text-white placeholder:text-white/30 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
              />
            </div>
            <select
              value={activeCategory}
              onChange={(e) => { setActiveCategory(e.target.value as BlogCategory | 'all'); setPage(1) }}
              className="shrink-0 min-h-[44px] max-w-[42vw] rounded-xl border border-white/10 bg-white/5 px-2.5 text-sm text-white focus:border-cyan-500/50 focus:outline-none truncate"
              aria-label={t.allCategories || 'Category'}
            >
              <option value="all">{t.allCategories || 'All'}</option>
              {BLOG_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>{t.categories?.[cat.id] || cat.label}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value as SortOrder); setPage(1) }}
              className="shrink-0 min-h-[44px] max-w-[34vw] rounded-xl border border-white/10 bg-white/5 px-2.5 text-sm text-white focus:border-cyan-500/50 focus:outline-none truncate"
              aria-label={sort === 'latest' ? (t.sortLatest || 'Latest first') : (t.sortOldest || 'Oldest first')}
            >
              <option value="latest">{t.sortLatest || 'Latest First'}</option>
              <option value="oldest">{t.sortOldest || 'Oldest First'}</option>
            </select>
          </div>

          {/* Desktop / tablet full layout (sm and up) */}
          <div className="hidden sm:flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder={t.searchPlaceholder || 'Search articles...'}
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="w-full min-h-[44px] rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-white/40" />
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value as SortOrder); setPage(1) }}
                className="min-h-[44px] rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-cyan-500/50 focus:outline-none"
              >
                <option value="latest">{t.sortLatest || 'Latest First'}</option>
                <option value="oldest">{t.sortOldest || 'Oldest First'}</option>
              </select>
            </div>
          </div>

          {/* Category pills (sm and up only). Mobile uses the dropdown above. */}
          <div className="hidden sm:flex mt-3 gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => { setActiveCategory('all'); setPage(1) }}
              className={cn(
                'shrink-0 min-h-[44px] rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                activeCategory === 'all'
                  ? 'bg-cyan-500 text-black'
                  : 'border border-white/10 text-white/60 hover:bg-white/5',
              )}
            >
              {t.allCategories || 'All'}
            </button>
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setPage(1) }}
                className={cn(
                  'shrink-0 min-h-[44px] rounded-full px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap',
                  activeCategory === cat.id
                    ? 'bg-cyan-500 text-black'
                    : 'border border-white/10 text-white/60 hover:bg-white/5',
                )}
              >
                {t.categories?.[cat.id] || cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Post grid */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {filtered.length > 0 ? (
          <>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post) => {
                /* For locales with hand-authored sister files (FR-CA today),
                   pull the localized meta so card titles, excerpts and dates
                   render in the user's language. For other locales, fall back
                   to any t.posts[slug] override or to the EN canonical. */
                const localized = getLocalizedMeta(post, lang || 'en')
                const tOverride = t.posts?.[post.slug]
                return (
                  <BlogCard
                    key={post.slug}
                    post={post}
                    langPrefix={langPrefix}
                    translatedTitle={tOverride?.title ?? (localized !== post ? localized.title : undefined)}
                    translatedDescription={tOverride?.metaDescription ?? (localized !== post ? localized.metaDescription : undefined)}
                    translatedCategoryLabel={t.categories?.[post.category]}
                    lang={lang}
                  />
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-4">
                <button
                  onClick={() => setPage(safePage - 1)}
                  disabled={safePage <= 1}
                  className="flex items-center gap-1.5 min-h-[44px] rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 transition-colors hover:text-cyan-400 disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                  {t.prev || 'Prev'}
                </button>
                <span className="text-sm text-white/50">
                  Page {safePage} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(safePage + 1)}
                  disabled={safePage >= totalPages}
                  className="flex items-center gap-1.5 min-h-[44px] rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 transition-colors hover:text-cyan-400 disabled:pointer-events-none disabled:opacity-30"
                >
                  {t.next || 'Next'}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-16 text-center text-white/40">
            <p className="text-base sm:text-lg">{t.noResults || 'No articles found.'}</p>
            <p className="mt-1 text-sm">{t.noResultsHint || 'Try a different search or category.'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
