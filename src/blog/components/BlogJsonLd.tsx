import { useEffect } from 'react'
import type { BlogPostMeta } from '../types'
import { getCategoryInfo } from '../categories'

const BASE_URL = 'https://www.ailysagency.ca'

interface BlogJsonLdProps {
  post: BlogPostMeta
  /** Language code for translated posts (omit for English) */
  lang?: string
  /** Translated UI strings for schema */
  uiStrings?: {
    home?: string
    blog?: string
    orgDescription?: string
    researchTeam?: string
    categories?: Record<string, string>
  }
}

export function BlogJsonLd({ post, lang, uiStrings }: BlogJsonLdProps) {
  useEffect(() => {
    const category = getCategoryInfo(post.category)
    const prefix = lang ? `/${lang}` : ''
    const postUrl = `${BASE_URL}${prefix}/blog/${post.slug}`
    const blogUrl = `${BASE_URL}${prefix}/blog`

    // Article schema (enhanced with EEAT signals)
    const articleLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      name: post.title,
      headline: post.title,
      description: post.metaDescription,
      image: post.images.hero,
      datePublished: post.publishedDate,
      dateModified: post.updatedDate || post.publishedDate,
      ...(lang ? { inLanguage: lang } : { inLanguage: 'en' }),
      author: {
        '@type': 'Person',
        name: post.author.name,
        jobTitle: post.author.role,
        worksFor: {
          '@type': 'Organization',
          name: 'AiLys Agency',
          url: BASE_URL,
        },
      },
      publisher: {
        '@type': 'Organization',
        name: 'AiLys Agency',
        url: BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/ailys-logo.svg`,
        },
        sameAs: [
          'https://www.linkedin.com/company/ailysagency',
        ],
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': postUrl,
      },
      // AEO: speakable for voice assistants
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.prose-blog h2', '.prose-blog p:first-of-type'],
      },
      // GEO: isAccessibleForFree for AI crawlers
      isAccessibleForFree: true,
      // EEAT: editorial review
      reviewedBy: {
        '@type': 'Organization',
        name: uiStrings?.researchTeam || 'AiLys Research Team',
      },
    }

    // Breadcrumb schema
    const breadcrumbLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: uiStrings?.home || 'Home',
          item: BASE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: uiStrings?.blog || 'Blog',
          item: blogUrl,
        },
        ...(category
          ? [
              {
                '@type': 'ListItem',
                position: 3,
                name: uiStrings?.categories?.[post.category] || category.label,
                item: `${blogUrl}/category/${post.category}`,
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: post.title,
                item: postUrl,
              },
            ]
          : [
              {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: postUrl,
              },
            ]),
      ],
    }

    // Organization schema (EEAT: establishes authority)
    const orgLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AiLys Agency',
      url: BASE_URL,
      logo: `${BASE_URL}/ailys-logo.svg`,
      description: uiStrings?.orgDescription || 'AI Visibility and Local SEO agency for local businesses. Bilingual EN and FR-CA in-house. Made in Quebec.',
      foundingDate: '2025',
      sameAs: [
        'https://www.linkedin.com/company/ailysagency',
      ],
      knowsAbout: [
        'AI Visibility',
        'Answer Engine Optimization',
        'Generative Engine Optimization',
        'E-E-A-T',
        'Google Business Profile',
        'Local SEO',
        'NAP Consistency',
        'Schema.org',
        'Wikidata',
        'Citation Building',
      ],
    }

    // Remove any pre-existing blog JSON-LD to prevent duplicates
    document.querySelectorAll('script[data-blog-jsonld]').forEach((s) => s.remove())

    const scripts: HTMLScriptElement[] = []
    for (const [key, data] of Object.entries({
      article: articleLd,
      breadcrumb: breadcrumbLd,
      organization: orgLd,
    })) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(data)
      script.dataset.blogJsonld = key
      document.head.appendChild(script)
      scripts.push(script)
    }

    return () => {
      scripts.forEach((s) => s.remove())
    }
  }, [post, lang, uiStrings?.home, uiStrings?.blog, uiStrings?.orgDescription, uiStrings?.researchTeam, uiStrings?.categories])

  return null
}
