import { BLOG_POSTS, getLocalizedMeta } from '../registry'
import type { BlogPostEntry } from '../types'
import { BlogCard } from './BlogCard'

interface RelatedPostsProps {
  relatedSlugs: string[]
  /** Optional language prefix like "/fr" for translated blog links */
  langPrefix?: string
  /** Translated heading for "You Might Also Like" */
  translatedHeading?: string
  /** Translated category labels keyed by category id */
  translatedCategories?: Record<string, string>
  /** Translated post titles/descriptions keyed by slug */
  translatedPosts?: Record<string, { title?: string; metaDescription?: string }>
  /** Language code for date formatting */
  lang?: string
}

export function RelatedPosts({ relatedSlugs, langPrefix = '', translatedHeading, translatedCategories, translatedPosts, lang }: RelatedPostsProps) {
  const registry = (BLOG_POSTS as BlogPostEntry[] | undefined) ?? []
  const related = relatedSlugs
    .map((slug) => registry.find((p) => p.slug === slug))
    .filter(Boolean) as BlogPostEntry[]

  if (related.length === 0) return null

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-white mb-6">
        {translatedHeading || 'You Might Also Like'}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.slice(0, 4).map((post) => {
          // Pull FR-CA hand-authored title/description from the sister file
          // when lang='fr' so related cards on a FR post page show the
          // localized meta. Falls back to EN canonical for other locales.
          const localized = lang ? getLocalizedMeta(post, lang) : post
          const fallbackTitle = localized !== post ? localized.title : undefined
          const fallbackDescription = localized !== post ? localized.metaDescription : undefined
          return (
            <BlogCard
              key={post.slug}
              post={post}
              langPrefix={langPrefix}
              translatedTitle={translatedPosts?.[post.slug]?.title ?? fallbackTitle}
              translatedDescription={translatedPosts?.[post.slug]?.metaDescription ?? fallbackDescription}
              translatedCategoryLabel={translatedCategories?.[post.category]}
              lang={lang}
            />
          )
        })}
      </div>
    </section>
  )
}
