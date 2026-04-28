import { useEffect, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import type { BlogCategory as _BlogCategory } from '../types'
import { BLOG_CATEGORIES, getCategoryInfo } from '../categories'
import { getPostsByCategory } from '../registry'
import { FULL_TRANSLATION_LANGS } from '../i18n-types'
import { BlogCard } from './BlogCard'
import { BlogCTA } from './BlogCTA'
import { HreflangTagsCategory } from './HreflangTags'

const SITE_URL = 'https://www.ailysagency.ca'

interface BlogCategoryTranslations {
  home?: string; blog?: string; tryFree?: string
  articles?: string; article?: string
  exploreMore?: string; backToBlog?: string
  categories?: Record<string, string>
  categoryDescriptions?: Record<string, string>
  posts?: Record<string, { title?: string; metaDescription?: string }>
}

export function BlogCategoryPage() {
  const { category, lang } = useParams<{ category: string; lang?: string }>()
  const isTranslated = lang && (FULL_TRANSLATION_LANGS as readonly string[]).includes(lang)
  const langPrefix = isTranslated ? `/${lang}` : ''

  const catInfo = category ? getCategoryInfo(category) : undefined
  const isValid = BLOG_CATEGORIES.some((c) => c.id === category)
  const posts = category && isValid ? getPostsByCategory(category) : []

  const [t, setT] = useState<BlogCategoryTranslations>({})
  useEffect(() => {
    if (!isTranslated || !lang) return
    fetch(`/locales/${lang}/blog.json`)
      .then((r) => r.ok ? r.json() : {})
      .then((data) => setT(data))
      .catch(() => {})
  }, [lang, isTranslated])

  const catLabel = (category && t.categories?.[category]) || catInfo?.label
  const catDescription = (category && t.categoryDescriptions?.[category]) || catInfo?.description

  const pageTitle = catInfo
    ? `${catInfo.label}, AiLys Agency Blog`
    : 'Blog, AiLys Agency'
  const pageDescription = catInfo?.description ?? ''
  const canonicalPath = category
    ? `${langPrefix}/blog/category/${category}`
    : `${langPrefix}/blog`

  // Inline category JSON-LD (no PageJsonLd helper on AiLys)
  useEffect(() => {
    if (!category || !catInfo) return
    const categoryLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: pageTitle,
      description: catInfo.description,
      url: `${SITE_URL}${canonicalPath}`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: posts.length,
      },
    }
    document.querySelectorAll('script[data-blog-category-jsonld]').forEach((s) => s.remove())
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.blogCategoryJsonld = 'true'
    script.textContent = JSON.stringify(categoryLd)
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [category, catInfo, pageTitle, canonicalPath, posts.length])

  if (!category || !isValid || !catInfo) {
    return <Navigate to={`${langPrefix}/blog`} replace />
  }

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

      <HreflangTagsCategory category={category} />

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-white/40 mb-8 flex-wrap">
          <Link to="/" className="hover:text-white/70 transition-colors">
            {t.home || 'Home'}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to={`${langPrefix}/blog`} className="hover:text-white/70 transition-colors">
            {t.blog || 'Blog'}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/60">{catLabel}</span>
        </nav>

        {/* Category header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{catInfo.icon}</span>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              {catLabel}
            </h1>
          </div>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl">
            {catDescription}
          </p>
          <p className="text-sm text-white/30 mt-2">
            {posts.length} {posts.length === 1 ? (t.article || 'article') : (t.articles || 'articles')}
          </p>
        </header>

        {/* Article grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              langPrefix={langPrefix}
              translatedTitle={t.posts?.[post.slug]?.title}
              translatedDescription={t.posts?.[post.slug]?.metaDescription}
              translatedCategoryLabel={t.categories?.[post.category]}
              lang={isTranslated ? lang : undefined}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 max-w-3xl mx-auto">
          <BlogCTA />
        </div>

        {/* Other categories (cross-linking) */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-white mb-6">
            {t.exploreMore || 'Explore More Topics'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_CATEGORIES.filter((c) => c.id !== category).map((cat) => (
              <Link
                key={cat.id}
                to={`${langPrefix}/blog/category/${cat.id}`}
                className="flex items-center gap-3 min-h-[44px] rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all group"
              >
                <span className="text-2xl">{cat.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white/80 group-hover:text-cyan-400 transition-colors">
                    {t.categories?.[cat.id] || cat.label}
                  </div>
                  <div className="text-xs text-white/40 truncate">
                    {t.categoryDescriptions?.[cat.id] || cat.description}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-cyan-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Back to blog */}
        <div className="mt-12 text-center">
          <Link
            to={`${langPrefix}/blog`}
            className="text-sm text-white/40 hover:text-cyan-400 transition-colors"
          >
            {'←'} {t.backToBlog || 'Back to all articles'}
          </Link>
        </div>
      </div>
    </div>
  )
}
