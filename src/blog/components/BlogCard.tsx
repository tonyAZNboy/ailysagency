import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getCategoryInfo } from '../categories'
import type { BlogPostMeta } from '../types'

const colorMap: Record<string, string> = {
  cyan: 'bg-cyan-500/20 text-cyan-400',
  magenta: 'bg-pink-500/20 text-pink-400',
  amber: 'bg-amber-500/20 text-amber-400',
  red: 'bg-red-500/20 text-red-400',
  pink: 'bg-pink-500/20 text-pink-400',
  purple: 'bg-purple-500/20 text-purple-400',
  green: 'bg-green-500/20 text-green-400',
  emerald: 'bg-emerald-500/20 text-emerald-400',
  orange: 'bg-orange-500/20 text-orange-400',
  blue: 'bg-blue-500/20 text-blue-400',
}

interface BlogCardProps {
  post: BlogPostMeta
  className?: string
  /** Optional language prefix like "/fr" for translated blog links */
  langPrefix?: string
  /** Translated title */
  translatedTitle?: string
  /** Translated description */
  translatedDescription?: string
  /** Translated category label */
  translatedCategoryLabel?: string
  /** Language code for date formatting */
  lang?: string
}

export function BlogCard({ post, className, langPrefix = '', translatedTitle, translatedDescription, translatedCategoryLabel, lang }: BlogCardProps) {
  const category = getCategoryInfo(post.category)
  const pillColor = category ? colorMap[category.color] || colorMap.cyan : colorMap.cyan
  const displayTitle = translatedTitle || post.title
  const displayDescription = translatedDescription || post.metaDescription
  const displayCategoryLabel = translatedCategoryLabel || category?.label
  const dateLocale = lang === 'zh-CN' ? 'zh-Hans' : lang === 'zh-TW' ? 'zh-Hant' : lang || 'en-US'
  const formattedDate = new Date(post.publishedDate).toLocaleDateString(dateLocale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Link
      to={`${langPrefix}/blog/${post.slug}`}
      className={cn(
        'group block rounded-2xl border border-white/10 bg-white/5 overflow-hidden',
        'transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5',
        className,
      )}
    >
      {/* Thumbnail */}
      <div className="aspect-video w-full overflow-hidden bg-white/5">
        <img
          src={post.images.hero}
          alt={displayTitle}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          width={600}
          height={338}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category badge */}
        {category && (
          <span className={cn('inline-block rounded-full px-2.5 py-0.5 text-xs font-medium mb-3', pillColor)}>
            {displayCategoryLabel}
          </span>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-cyan-400 transition-colors">
          {displayTitle}
        </h3>

        {/* Summary */}
        <p className="mt-2 text-sm text-white/50 line-clamp-2">
          {displayDescription}
        </p>

        {/* Footer */}
        <div className="mt-4 flex items-center gap-3 text-xs text-white/40">
          <time dateTime={post.publishedDate}>{formattedDate}</time>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readTimeMinutes} min
          </span>
        </div>
      </div>
    </Link>
  )
}
