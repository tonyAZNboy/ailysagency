import type { ComponentType } from 'react'

export type BlogCategory =
  | 'ai-visibility'
  | 'gbp-google-maps'
  | 'local-seo'
  | 'aeo-geo-eeat'
  | 'voice-search'
  | 'industry-playbook'
  | 'reputation-reviews'
  | 'analytics-attribution'
  | 'ailys-product'
  | 'competitor-comparisons'

export interface BlogAuthor {
  name: string
  role: string
  avatarInitials: string
  bio: string
}

export interface BlogFAQItem {
  question: string
  answer: string
}

export interface BlogHeading {
  id: string
  text: string
}

export interface BlogImages {
  hero: string
  mid: string
  end: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  metaDescription: string
  tldr: string
  category: BlogCategory
  tags: string[]
  publishedDate: string
  updatedDate?: string
  author: BlogAuthor
  readTimeMinutes: number
  images: BlogImages
  faqItems: BlogFAQItem[]
  relatedSlugs: string[]
  headings: BlogHeading[]
  schemaType?: string
  speakable?: boolean
}

export interface BlogPostEntry extends BlogPostMeta {
  load: () => Promise<{ Content: ComponentType }>
}

export interface CategoryInfo {
  id: BlogCategory
  label: string
  description: string
  color: string
  icon: string
}
