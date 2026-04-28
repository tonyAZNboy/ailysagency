/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../../../src/blog/types'
import { AUTHORS } from '../../../../src/blog/authors'
import {
  CalloutBox,
  InlineCTA,
  StatHighlight,
  KeyTakeaway,
  QuickQuiz,
  InternalLink,
  SectionDivider,
} from '../../../../src/blog/components/shared'

export const meta: BlogPostMeta = {
  slug: 'TODO-slug-here',
  title: 'TODO: 50-65 char title with primary keyword + value word',
  metaDescription: 'TODO: 140-160 char meta description with primary + secondary keyword.',
  tldr: 'TODO: 30-50 word featured-snippet candidate that answers the headline question directly.',
  category: 'ai-visibility',
  tags: ['ai-visibility', 'TODO'],
  publishedDate: 'YYYY-MM-DD',
  updatedDate: 'YYYY-MM-DD',
  author: AUTHORS.research,
  readTimeMinutes: 7,
  images: {
    hero: '/blog-images/TODO-slug/hero.webp',
    mid: '/blog-images/TODO-slug/mid.webp',
    end: '/blog-images/TODO-slug/end.webp',
  },
  faqItems: [
    { question: 'TODO long-tail question 1', answer: 'TODO 40-90 word answer' },
    { question: 'TODO long-tail question 2', answer: 'TODO 40-90 word answer' },
    { question: 'TODO long-tail question 3', answer: 'TODO 40-90 word answer' },
    { question: 'TODO long-tail question 4', answer: 'TODO 40-90 word answer' },
    { question: 'TODO long-tail question 5', answer: 'TODO 40-90 word answer' },
  ],
  relatedSlugs: [],
  headings: [
    { id: 'h1', text: 'TODO H2 #1' },
    { id: 'h2', text: 'TODO H2 #2' },
    { id: 'h3', text: 'TODO H2 #3' },
    { id: 'h4', text: 'TODO H2 #4' },
    { id: 'h5', text: 'TODO H2 #5' },
    { id: 'h6', text: 'TODO H2 #6' },
    { id: 'h7', text: 'TODO H2 #7' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      {/* 1. HERO IMAGE */}
      {/* <img src={meta.images.hero} alt="TODO descriptive alt with primary keyword" width={1200} height={630} loading="eager" /> */}

      {/* 2. OPENING ANSWER PARAGRAPH (40-60 words, contains primary keyword + 2 secondary terms in the first 100 words). This is the LLM extractive snippet target. */}
      {/* <p>TODO opening paragraph that answers the headline question directly.</p> */}

      {/* 3. STAT HIGHLIGHT near the top to anchor the value proposition */}
      {/* <StatHighlight value="TODO" label="TODO" source="TODO link" /> */}

      {/* 4. H2 #1 (id matches meta.headings[0].id). Start with a question or definitional statement. */}
      {/* <h2 id="h1">TODO H2 #1</h2> */}
      {/* <p>TODO body, lists and tables are LLM-friendly.</p> */}

      {/* 5. CALLOUT BOX (every ~400 words, alternate Callout / Stat / CTA / KeyTakeaway for visual rhythm) */}
      {/* <CalloutBox tone="info" title="TODO">TODO</CalloutBox> */}

      {/* 6. H2 #2 with internal link */}
      {/* <h2 id="h2">TODO H2 #2</h2> */}
      {/* <p>See <InternalLink to="/services/ai-visibility">our AI Visibility audit</InternalLink> for the full diagnostic.</p> */}

      {/* 7. MID HERO IMAGE around the midpoint */}
      {/* <img src={meta.images.mid} alt="TODO" width={1200} height={630} loading="lazy" /> */}

      {/* 8. INLINE CTA */}
      {/* <InlineCTA href="/audit" label="Run a free AI Visibility audit" /> */}

      {/* 9. H2 #3, #4, #5: tactical body. Use lists, ordered steps, and tables. */}

      {/* 10. KEY TAKEAWAY block summarizing the post */}
      {/* <KeyTakeaway>TODO 1-2 sentence takeaway</KeyTakeaway> */}

      {/* 11. QUICK QUIZ (optional, useful for engagement and dwell time) */}
      {/* <QuickQuiz question="TODO" choices={["TODO", "TODO", "TODO"]} answerIndex={0} explanation="TODO" /> */}

      {/* 12. SECTION DIVIDER before FAQ */}
      {/* <SectionDivider /> */}

      {/* 13. FAQ section (id="faq"). The faqItems in meta drive the JSON-LD FAQPage schema; render them visibly here too. */}
      {/* <h2 id="faq">Frequently Asked Questions</h2> */}
      {/* {meta.faqItems.map((f, i) => ( <details key={i}><summary>{f.question}</summary><p>{f.answer}</p></details> ))} */}

      {/* 14. END HERO IMAGE (optional, can boost time-on-page) */}
      {/* <img src={meta.images.end} alt="TODO" width={1200} height={630} loading="lazy" /> */}
    </article>
  )
}