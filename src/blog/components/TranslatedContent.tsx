/**
 * Universal renderer for hand-authored, locale-specific blog content stored as
 * structured section data (e.g. exports of `ContentFr`, `ContentEs` from a post
 * module, or sister `<slug>.<lang>.tsx` files).
 *
 * AiLys translations are 100% hand-authored. This component never calls a
 * translation API at runtime or build time. If a locale is missing, the caller
 * is responsible for falling back to EN; this renderer just renders whatever
 * sections it is given.
 */

import { useMemo } from 'react'
import {
  CalloutBox,
  InlineCTA,
  StatHighlight,
  KeyTakeaway,
  QuickQuiz,
  InternalLink,
  SectionDivider,
} from './shared'

// ---- Section types ---------------------------------------------------------
// These mirror the data shape used by hand-authored translated post modules.
// Keep them local to the blog module so they ship without external coupling.

export interface TranslatedHeading {
  id: string
  text: string
  level: number
}

export type TranslatedSection =
  | { type: 'paragraph'; html: string }
  | { type: 'heading'; level: 2 | 3; id: string; text: string }
  | {
      type: 'image'
      src: string
      alt: string
      loading?: 'eager' | 'lazy'
    }
  | { type: 'stat'; stats: Array<{ value: string; label: string }> }
  | {
      type: 'callout'
      variant: 'warning' | 'tip' | 'info' | 'danger'
      title?: string
      html: string
    }
  | {
      type: 'cta'
      variant: 'audit' | 'pricing' | 'book'
      text?: string
    }
  | { type: 'takeaway'; points: string[] }
  | {
      type: 'quiz'
      question: string
      options: string[]
      correctIndex: number
      explanation: string
    }
  | {
      type: 'internalLink'
      to: string
      title: string
      description?: string
    }
  | { type: 'divider' }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'blockquote'; html: string }

export interface TranslatedPost {
  title: string
  metaDescription: string
  tldr: string
  faqItems: Array<{ question: string; answer: string }>
  headings: TranslatedHeading[]
  sections: TranslatedSection[]
}

/** Translated labels for interactive card titles. */
export interface CardLabels {
  warning?: string
  tip?: string
  info?: string
  danger?: string
  keyTakeaways?: string
  quickQuiz?: string
  correct?: string
  notQuite?: string
}

// ---- HTML sanitization -----------------------------------------------------
// Lightweight sanitizer for hand-authored HTML strings inside translated
// sections. Hand-authored content is already trusted, but we still strip the
// usual high-risk vectors (script tags, event handlers, javascript: hrefs)
// as defense-in-depth.

const SCRIPT_TAG = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
const EVENT_HANDLER = / on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi
const JS_HREF = /\b(href|src)\s*=\s*(?:"\s*javascript:[^"]*"|'\s*javascript:[^']*')/gi

function sanitizeHtml(html: string): string {
  return html
    .replace(SCRIPT_TAG, '')
    .replace(EVENT_HANDLER, '')
    .replace(JS_HREF, '$1="#"')
}

// ---- Renderer --------------------------------------------------------------

function RenderSection({
  section,
  lang,
  cardLabels,
}: {
  section: TranslatedSection
  lang: string
  cardLabels?: CardLabels
}) {
  switch (section.type) {
    case 'paragraph':
      return <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.html) }} />

    case 'heading':
      return section.level === 2 ? (
        <h2 id={section.id}>{section.text}</h2>
      ) : (
        <h3 id={section.id}>{section.text}</h3>
      )

    case 'image':
      return (
        <img
          src={section.src}
          alt={section.alt}
          className="w-full rounded-xl my-6"
          loading={section.loading || 'lazy'}
          width={1200}
          height={675}
          style={{ aspectRatio: '16/9' }}
          decoding="async"
        />
      )

    case 'stat':
      return <StatHighlight stats={section.stats} />

    case 'callout':
      return (
        <CalloutBox
          type={section.variant}
          title={section.title}
          translatedLabel={cardLabels?.[section.variant]}
        >
          <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.html) }} />
        </CalloutBox>
      )

    case 'cta':
      return <InlineCTA variant={section.variant} text={section.text} />

    case 'takeaway':
      return <KeyTakeaway points={section.points} translatedLabel={cardLabels?.keyTakeaways} />

    case 'quiz':
      return (
        <QuickQuiz
          question={section.question}
          options={section.options}
          correctIndex={section.correctIndex}
          explanation={section.explanation}
          translatedLabel={cardLabels?.quickQuiz}
          translatedCorrect={cardLabels?.correct}
          translatedNotQuite={cardLabels?.notQuite}
        />
      )

    case 'internalLink': {
      // Prefix internal blog links with the active locale so users stay in
      // their language when clicking through.
      const to =
        lang !== 'en' && section.to.startsWith('/blog/')
          ? `/${lang}${section.to}`
          : section.to
      return <InternalLink to={to} title={section.title} description={section.description} />
    }

    case 'divider':
      return <SectionDivider />

    case 'list': {
      const Tag = section.ordered ? 'ol' : 'ul'
      return (
        <Tag>
          {section.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: sanitizeHtml(item) }} />
          ))}
        </Tag>
      )
    }

    case 'blockquote':
      return <blockquote dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.html) }} />

    default:
      return null
  }
}

interface TranslatedContentRendererProps {
  post: TranslatedPost
  lang: string
  /** Translated labels for interactive cards (callout, takeaway, quiz). */
  cardLabels?: CardLabels
}

export function TranslatedContentRenderer({
  post,
  lang,
  cardLabels,
}: TranslatedContentRendererProps) {
  const sections = useMemo(() => post.sections, [post.sections])
  return (
    <article>
      {sections.map((section, i) => (
        <RenderSection key={i} section={section} lang={lang} cardLabels={cardLabels} />
      ))}
    </article>
  )
}
