/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { AUTHORS } from '../../authors'
import { CalloutBox, InlineCTA, StatHighlight } from '../../components/shared'

export const meta: BlogPostMeta = {
  slug: 'perplexity-citations-30-day-playbook',
  title: 'Perplexity citations: the 30-day playbook',
  metaDescription:
    "Perplexity grew 2x year over year. It cites differently than ChatGPT. Here is the exact 30-day plan we run for clients to land their first citation.",
  tldr:
    "Perplexity prioritizes recency, source diversity, and structured data over raw domain authority, which makes it the most attainable LLM for local businesses. Run a 30-day sequence: audit schema, publish a current-state article, earn three diverse citations, then fix your Wikipedia footprint.",
  category: 'ai-visibility',
  tags: ['perplexity', 'geo', 'citations', '30-day plan'],
  publishedDate: '2026-03-14',
  updatedDate: '2026-03-14',
  author: AUTHORS.strategy,
  readTimeMinutes: 7,
  images: {
    hero: '/blog-images/perplexity-citations-30-day-playbook/hero.webp',
    mid: '/blog-images/perplexity-citations-30-day-playbook/mid.webp',
    end: '/blog-images/perplexity-citations-30-day-playbook/end.webp',
  },
  faqItems: [
    {
      question: 'How long until my business shows up as a Perplexity citation?',
      answer:
        'Most clients running this 30-day playbook see their first cited mention between days 25 and 45. The signal compounds because Perplexity weighs recency and source diversity, so each new schema deployment, content drop, and third-party reference adds up. If your structured data is already clean, the first citation can land closer to day 14.',
    },
    {
      question: 'Which schema types matter most for Perplexity citations?',
      answer:
        'Four schema types carry the load for local businesses: LocalBusiness with full address, hours, and payment methods. FAQPage answering every common question. Review with aggregateRating and at least three individual reviews marked up. Service with one entity per service you offer. Without these four shipped cleanly, additional content rarely earns citations on its own.',
    },
    {
      question: 'Does Perplexity really weight Reddit signals heavily?',
      answer:
        'Yes. Reddit is one of the highest-impact citation sources Perplexity surfaces, especially for local queries. Submitting a substantive post or comment to a city-level subreddit (no promotional language, real expertise on display) routinely shows up inside Perplexity answers within days. The signal Perplexity wants is "this entity exists in real conversations across the open web."',
    },
    {
      question: 'Do I need a Wikipedia article to be cited by Perplexity?',
      answer:
        'No. Most local businesses do not qualify for a standalone Wikipedia article and never will. What you can do is be referenced inside existing Wikipedia articles when relevant: city pages, "list of" pages, and industry overviews. Propose the addition with a verifiable third-party source. Wikipedia mentions take two to four weeks to settle and become a long-term Perplexity ranking signal.',
    },
    {
      question: 'How is Perplexity different from ChatGPT for citations?',
      answer:
        'ChatGPT leans heavily on raw domain authority and historical content depth. Perplexity weighs recency, source diversity, and structured data more aggressively. That is why a fresh "current state" post on a mid-DA local site can outrank a five-year-old article on a higher-authority national site inside Perplexity answers. The ranking floor is lower, which is why we treat Perplexity as the easiest LLM to crack first.',
    },
  ],
  relatedSlugs: [],
  headings: [
    { id: 'perplexitys-citation-algorithm-is-different-here-is-what-works', text: "Perplexity's citation algorithm is different. Here is what works." },
    { id: 'what-first-citation-looks-like', text: 'What "first citation" looks like' },
  ],
  schemaType: 'BlogPosting',
  speakable: true,
}

export function Content() {
  return (
    <>
      <h2 id="perplexitys-citation-algorithm-is-different-here-is-what-works">
        Perplexity's citation algorithm is different. Here is what works.
      </h2>
      <p>
        Perplexity prioritizes recency, source diversity, and structured data over raw domain authority. That makes it the most attainable LLM for local businesses, but only if you know what to optimize.
      </p>

      <StatHighlight
        stats={[
          { value: '2x', label: 'Year-over-year Perplexity growth' },
          { value: '4', label: 'Schema types that move the needle' },
          { value: '30 days', label: 'From audit to first citation' },
        ]}
      />

      <h3>Day 1 to 7: Audit your structured data</h3>
      <p>Perplexity heavily favors sites with clean schema markup. The four schema types that matter for local:</p>
      <ul>
        <li>LocalBusiness (with full address, hours, payment methods)</li>
        <li>FAQPage (every common question answered with concrete schema)</li>
        <li>Review (aggregateRating plus at least 3 individual reviews marked up)</li>
        <li>Service (one Service entity per service you offer)</li>
      </ul>
      <p>
        If you don't have these four shipped, no amount of content will help. We deploy this as a one-time workflow at the Core tier. DIY is possible but tedious. Two hours per page on average.
      </p>

      <CalloutBox type="tip" title="Where to validate">
        <p>
          Run every page through Google's Rich Results test and Schema.org validator before you ship. A single missing required field kills the entire schema block from the Perplexity index, even when the rest is correct.
        </p>
      </CalloutBox>

      <h3>Day 8 to 14: Publish a "current state" article</h3>
      <p>
        Perplexity prioritizes recency. A blog post titled "[Your service] in [your city] in 2026: what changed" with a publish date in the last 30 days gets weighted higher than older content even if your DA is lower.
      </p>
      <p>The structure that works:</p>
      <ul>
        <li>Open with one specific stat about your industry in your city</li>
        <li>Three bullet sections: what changed, who it affects, what to do</li>
        <li>Close with a clear "we [do this thing]" sentence with location</li>
      </ul>
      <p>
        Publish this on your domain. Submit it to Reddit's local subreddit (where applicable). Perplexity weighs Reddit signals heavily.
      </p>

      <InlineCTA variant="audit" />

      <h3>Day 15 to 21: Earn three diverse citations</h3>
      <p>
        Source diversity matters more than quantity. Three different domains beats ten links from the same site. Targets we use:
      </p>
      <ul>
        <li>Local newspaper (one quote, even on an unrelated story)</li>
        <li>Industry directory (claim and complete profile)</li>
        <li>Niche forum or subreddit (substantive answer, not promo)</li>
      </ul>
      <p>
        If you cannot earn a newspaper quote, an industry podcast guest spot works. The signal Perplexity wants is "this entity is referenced across the web's source diversity."
      </p>

      <h3>Day 22 to 30: Fix your Wikipedia footprint</h3>
      <p>
        You probably do not qualify for a Wikipedia article. Most local businesses don't. But you can be referenced in existing Wikipedia articles when relevant.
      </p>
      <p>
        Find Wikipedia articles about your city or your industry. Look for "list of [things]" or "[city] [industry]" pages. If your business is genuinely notable enough to be in those lists, propose the addition with a verifiable third-party source. Wikipedia mentions take 2-4 weeks to settle and become a long-term Perplexity ranking signal.
      </p>

      <CalloutBox type="info" title="Set up the weekly check">
        <p>
          Run a Perplexity query for "best [your service] in [your city]" every Monday. Log whether you appear, which sources are cited, and how recent each cited URL is. The weekly cadence catches drift before it becomes a ranking problem.
        </p>
      </CalloutBox>

      <h2 id="what-first-citation-looks-like">What "first citation" looks like</h2>
      <p>
        Run a Perplexity query for "best [your service] in [your city]" weekly. Most clients see their first cited mention between days 25 and 45. The work compounds.
      </p>
      <p>
        We run this exact playbook for Core and Growth tier clients. Audits are free. Tell us your service and city, we tell you which of the 30 days you are missing.
      </p>
    </>
  )
}
