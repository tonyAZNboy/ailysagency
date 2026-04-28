/**
 * Types for translated blog content stored as hand-authored data.
 * Used by the universal renderer to display blog posts in any AiLys locale.
 *
 * IMPORTANT: All translations are hand-authored in repo files. No translation
 * APIs are called at runtime or build time (project rule confirmed 2026-04-28).
 */

export interface TranslatedPostMeta {
  slug: string
  lang: string
  title: string
  metaDescription: string
  tldr: string
  faqItems: { question: string; answer: string }[]
  headings: { id: string; text: string }[]
}

export type TranslatedSection =
  | { type: 'paragraph'; html: string }
  | { type: 'heading'; level: 2 | 3; id: string; text: string }
  | { type: 'image'; src: string; alt: string; loading?: 'eager' | 'lazy' }
  | { type: 'stat'; stats: { value: string; label: string }[] }
  | { type: 'callout'; variant: 'warning' | 'tip' | 'info' | 'danger'; title?: string; html: string }
  | { type: 'cta'; variant: 'audit' | 'pricing' | 'book'; text?: string }
  | { type: 'takeaway'; title?: string; points: string[] }
  | { type: 'quiz'; question: string; options: string[]; correctIndex: number; explanation: string }
  | { type: 'internalLink'; to: string; title: string; description?: string }
  | { type: 'divider' }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'blockquote'; html: string }

export interface TranslatedPost extends TranslatedPostMeta {
  sections: TranslatedSection[]
}

/**
 * The 6 major locales AiLys ships full body translations for.
 * Hard rule 8: a post is fully shipped only when all 6 render.
 * Cadence: EN canonical, FR-CA in-house, then ES, ZH, AR, RU as follow-up commits.
 */
export const FULL_TRANSLATION_LANGS = [
  'en', 'fr', 'es', 'zh', 'ar', 'ru',
] as const

export type FullTranslationLang = typeof FULL_TRANSLATION_LANGS[number]

/**
 * All 16 supported locales (for metadata translations and language selector).
 * Body content for the 10 secondaries (de, it, pt, nl, pl, ja, ko, tr, vi, hi)
 * is tracked in docs/i18n-translation-queue.md and ships when capacity allows.
 */
export const ALL_LANGS = [
  'en', 'fr', 'es', 'zh', 'ar', 'ru',
  'de', 'it', 'pt', 'nl', 'pl', 'ja', 'ko', 'tr', 'vi', 'hi',
] as const

export type AllLang = typeof ALL_LANGS[number]

/** Language display names (in their native script). */
export const LANG_NAMES: Record<string, string> = {
  en: 'English',
  fr: 'Français (Québec)',
  es: 'Español',
  zh: '简体中文',
  ar: 'العربية',
  ru: 'Русский',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  nl: 'Nederlands',
  pl: 'Polski',
  ja: '日本語',
  ko: '한국어',
  tr: 'Türkçe',
  vi: 'Tiếng Việt',
  hi: 'हिन्दी',
}

/** Hreflang tag values per locale (ISO 639 + region for fr and zh). */
export const HREFLANG_TAGS: Record<string, string> = {
  en: 'en',
  fr: 'fr-CA',
  es: 'es',
  zh: 'zh-CN',
  ar: 'ar',
  ru: 'ru',
  de: 'de',
  it: 'it',
  pt: 'pt',
  nl: 'nl',
  pl: 'pl',
  ja: 'ja',
  ko: 'ko',
  tr: 'tr',
  vi: 'vi',
  hi: 'hi',
}
