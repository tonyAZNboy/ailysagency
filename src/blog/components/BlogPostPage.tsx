import { useEffect, useState, Suspense } from 'react'
import { Link, useParams, Navigate, useLocation } from 'react-router-dom'
import { ChevronRight, Clock, Calendar, ArrowLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { getCategoryInfo } from '../categories'
import { BLOG_POSTS } from '../registry'
import type { BlogPostEntry } from '../types'
import { ReadingProgress } from './ReadingProgress'
import { BlogJsonLd } from './BlogJsonLd'
import { BlogFAQ } from './BlogFAQ'
import { BlogCTA } from './BlogCTA'
import { AuthorBio } from './AuthorBio'
import { RelatedPosts } from './RelatedPosts'
import { ShareButtons } from './ShareButtons'
import { TableOfContents } from './TableOfContents'
import { HreflangTags } from './HreflangTags'

const SITE_URL = 'https://www.ailysagency.ca'

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  return <BlogPostContent post={post} />
}

function BlogPostContent({ post }: { post: BlogPostEntry }) {
  const [Content, setContent] = useState<React.ComponentType | null>(null)
  const category = getCategoryInfo(post.category)

  const formattedDate = new Date(post.publishedDate).toLocaleDateString(
    'en-US',
    { month: 'long', day: 'numeric', year: 'numeric' },
  )

  const ogImageUrl = `${SITE_URL}/blog-images/og/${post.slug}.png`
  const postUrl = `${SITE_URL}/blog/${post.slug}`

  // Article-specific OG meta tags (set imperatively because Helmet only handles
  // a single set, and we layer additional E-E-A-T tags here).
  useEffect(() => {
    const ogType = document.querySelector('meta[property="og:type"]')
    const prevOgType = ogType?.getAttribute('content') ?? 'website'
    if (ogType) ogType.setAttribute('content', 'article')

    const articleMetas: HTMLMetaElement[] = []
    const addArticleMeta = (prop: string, content: string) => {
      const meta = document.createElement('meta')
      meta.setAttribute('property', prop)
      meta.content = content
      document.head.appendChild(meta)
      articleMetas.push(meta)
    }
    addArticleMeta('article:published_time', `${post.publishedDate}T00:00:00Z`)
    if (post.updatedDate) {
      addArticleMeta('article:modified_time', `${post.updatedDate}T00:00:00Z`)
    }
    addArticleMeta('article:author', SITE_URL)
    addArticleMeta('article:section', category?.label || 'AI Visibility')

    return () => {
      if (ogType) ogType.setAttribute('content', prevOgType)
      articleMetas.forEach((m) => m.remove())
    }
  }, [post.publishedDate, post.updatedDate, category?.label])

  // Lazy-load content
  useEffect(() => {
    let cancelled = false
    post.load().then((mod) => {
      if (!cancelled) setContent(() => mod.Content)
    })
    return () => {
      cancelled = true
    }
  }, [post])

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={postUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>

      <ReadingProgress />
      <BlogJsonLd post={post} />
      <HreflangTags slug={post.slug} />

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-white/40 mb-8 flex-wrap">
          <Link to="/" className="hover:text-white/70 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/blog" className="hover:text-white/70 transition-colors">
            Blog
          </Link>
          {category && (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link
                to={`/blog/category/${post.category}`}
                className="hover:text-white/70 transition-colors"
              >
                {category.label}
              </Link>
            </>
          )}
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/60 line-clamp-1">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="max-w-3xl">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl leading-tight">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-4 flex-wrap">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-magenta-500 text-sm font-bold text-white">
                {post.author.avatarInitials}
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {post.author.name}
                </p>
                <p className="text-xs text-white/40">{post.author.role}</p>
              </div>
            </div>

            <span className="h-5 w-px bg-white/10" />

            {/* Date */}
            <span className="inline-flex items-center gap-1.5 text-sm text-white/50">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={post.publishedDate}>{formattedDate}</time>
            </span>

            {/* Read time */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
              <Clock className="h-3 w-3" />
              {post.readTimeMinutes} min read
            </span>

            {/* Share */}
            <div className="ml-auto">
              <ShareButtons url={postUrl} title={post.title} />
            </div>
          </div>
        </header>

        {/* TL;DR */}
        <div className="mt-8 max-w-3xl rounded-2xl border border-white/10 border-l-4 border-l-cyan-500 bg-white/[0.02] backdrop-blur-sm p-5">
          <p className="text-sm font-semibold text-cyan-400 mb-1">TL;DR</p>
          <p className="text-white/70 italic leading-relaxed">{post.tldr}</p>
        </div>

        {/* Hero image */}
        <div className="mt-8 max-w-3xl overflow-hidden rounded-2xl">
          <img
            src={post.images.hero}
            alt={post.title}
            className="w-full object-cover"
            loading="eager"
            decoding="async"
            width={1200}
            height={675}
            style={{ aspectRatio: '16/9' }}
            fetchPriority="high"
          />
        </div>

        {/* Body and ToC layout */}
        <div className="mt-10 flex gap-8">
          {/* Article body */}
          <article className="prose-blog min-w-0 max-w-3xl flex-1">
            {Content ? (
              <Suspense
                fallback={
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 w-3/4 rounded bg-white/10" />
                    <div className="h-4 w-full rounded bg-white/10" />
                    <div className="h-4 w-5/6 rounded bg-white/10" />
                  </div>
                }
              >
                <Content />
              </Suspense>
            ) : (
              <div className="animate-pulse space-y-4">
                <div className="h-4 w-3/4 rounded bg-white/10" />
                <div className="h-4 w-full rounded bg-white/10" />
                <div className="h-4 w-5/6 rounded bg-white/10" />
              </div>
            )}
          </article>

          {/* ToC sidebar */}
          {post.headings.length > 0 && (
            <aside className="hidden lg:block w-64 shrink-0">
              <TableOfContents headings={post.headings} />
            </aside>
          )}
        </div>

        {/* Mobile ToC (floating) */}
        {post.headings.length > 0 && (
          <div className="lg:hidden">
            <TableOfContents headings={post.headings} />
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 max-w-3xl">
          <BlogCTA />
        </div>

        {/* FAQ */}
        {post.faqItems.length > 0 && (
          <div className="max-w-3xl">
            <BlogFAQ items={post.faqItems} />
          </div>
        )}

        {/* Author bio */}
        <div className="max-w-3xl">
          <AuthorBio author={post.author} />
        </div>

        {/* Related posts */}
        {post.relatedSlugs.length > 0 && (
          <RelatedPosts relatedSlugs={post.relatedSlugs} />
        )}
      </div>

      {/* Floating "back to blog" button. Visible on every viewport so the
          reader can return to the index from any scroll position. Bottom-left
          to avoid the right-side reading-progress bar; safe-area-bottom
          padding keeps it clear of the iOS home indicator. */}
      <FloatingBackToBlog />
    </div>
  )
}

function FloatingBackToBlog() {
  const { pathname } = useLocation()
  /* Slug-first lang detection so a French reader on /fr/blog/<slug> sees
     "Retour au journal" without depending on the global LangContext having
     already resolved. */
  const lang = pathname.startsWith('/fr')
    ? 'fr'
    : pathname.startsWith('/vi')
    ? 'vi'
    : pathname.startsWith('/es')
    ? 'es'
    : pathname.startsWith('/zh')
    ? 'zh'
    : pathname.startsWith('/ar')
    ? 'ar'
    : pathname.startsWith('/ru')
    ? 'ru'
    : 'en'
  const labels: Record<string, string> = {
    en: 'Back to blog',
    fr: 'Retour au journal',
    es: 'Volver al blog',
    zh: '返回博客',
    ar: 'العودة إلى المدونة',
    ru: 'Назад к блогу',
    vi: 'Quay lại blog',
  }
  const label = labels[lang] || labels.en
  const blogHref = lang === 'en' ? '/blog' : `/${lang}/blog`
  return (
    <Link
      to={blogHref}
      aria-label={label}
      className="group fixed left-4 z-30 flex items-center gap-2 rounded-full border border-white/15 bg-[#0a0e1a]/70 px-4 py-3 text-sm font-semibold text-white/90 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] hover:border-cyan-400/50 hover:text-cyan-300 transition-colors min-h-[48px]"
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
      <span>{label}</span>
    </Link>
  )
}

