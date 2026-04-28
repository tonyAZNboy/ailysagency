/**
 * Hreflang tag components for AiLys Agency blog pages.
 *
 * AiLys ships in 16 locales. EN is served at the bare path; every other locale
 * is served at /<lang>/..., except `fr` which uses the Quebec French hreflang
 * value `fr-CA` (the route prefix is still `/fr/...`).
 *
 * The component appends <link rel="alternate" hreflang="..."> tags into
 * document.head for the current page and removes them on unmount, so SPA
 * route changes do not stack stale tags.
 */

import { useEffect } from 'react'

const SITE_URL = 'https://www.ailysagency.ca'

/** Route prefix per locale code. EN uses no prefix. */
const ROUTE_PREFIX: Record<string, string> = {
  en: '',
  fr: '/fr',
  es: '/es',
  zh: '/zh',
  ar: '/ar',
  ru: '/ru',
  de: '/de',
  it: '/it',
  pt: '/pt',
  nl: '/nl',
  pl: '/pl',
  ja: '/ja',
  ko: '/ko',
  tr: '/tr',
  vi: '/vi',
  hi: '/hi',
}

/**
 * Hreflang attribute value per locale code. Quebec French uses fr-CA so AI
 * search engines and Google know the regional target. All others use the bare
 * ISO 639-1 code, matching how each locale is served.
 */
const HREFLANG_VALUE: Record<string, string> = {
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

const LOCALE_CODES = Object.keys(ROUTE_PREFIX)

/** Append <link rel="alternate" hreflang="..."> tags for `path` onto document.head. */
function applyHreflangTags(path: string): () => void {
  const links: HTMLLinkElement[] = []

  // Per-locale alternates.
  for (const code of LOCALE_CODES) {
    const link = document.createElement('link')
    link.setAttribute('rel', 'alternate')
    link.setAttribute('hreflang', HREFLANG_VALUE[code])
    link.setAttribute('href', `${SITE_URL}${ROUTE_PREFIX[code]}${path}`)
    link.dataset.ailysHreflang = '1'
    document.head.appendChild(link)
    links.push(link)
  }

  // x-default points to the EN version.
  const xDefault = document.createElement('link')
  xDefault.setAttribute('rel', 'alternate')
  xDefault.setAttribute('hreflang', 'x-default')
  xDefault.setAttribute('href', `${SITE_URL}${path}`)
  xDefault.dataset.ailysHreflang = '1'
  document.head.appendChild(xDefault)
  links.push(xDefault)

  return () => {
    links.forEach((l) => l.remove())
  }
}

function useHreflang(path: string) {
  useEffect(() => {
    const cleanup = applyHreflangTags(path)
    return cleanup
  }, [path])
}

export function HreflangTags({ slug }: { slug: string }) {
  useHreflang(`/blog/${slug}`)
  return null
}

export function HreflangTagsCategory({ category }: { category: string }) {
  useHreflang(`/blog/category/${category}`)
  return null
}

export function HreflangTagsIndex() {
  useHreflang('/blog')
  return null
}
