/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { AUTHORS } from '../../authors'
import { CalloutBox, InlineCTA, StatHighlight } from '../../components/shared'

export const meta: BlogPostMeta = {
  slug: 'google-ai-overviews-citation-gap-2027',
  title: 'Google AI Overviews: the citation gap closing in 2027',
  metaDescription:
    "Google's AI Overviews now answer 14% of queries without a click. By 2027 that number passes 30%. What that means if your local business depends on Google.",
  tldr:
    "Google AI Overviews currently answer about 14% of all queries with zero clicks, and internal projections from Google partners put that figure above 30% by mid-2027. Local businesses that do not appear in AIO citation lists lose a third of their discovery traffic. Citation density, schema completeness, and review velocity decide who gets cited.",
  category: 'ai-visibility',
  tags: ['google', 'ai overviews', 'future'],
  publishedDate: '2026-04-28',
  updatedDate: '2026-04-28',
  author: AUTHORS.research,
  readTimeMinutes: 5,
  images: {
    hero: '/blog-images/google-ai-overviews-citation-gap-2027/hero.svg',
    mid: '/blog-images/google-ai-overviews-citation-gap-2027/mid.svg',
    end: '/blog-images/google-ai-overviews-citation-gap-2027/end.svg',
  },
  faqItems: [
    {
      question: "What does 'zero-click query' actually mean for my local business?",
      answer:
        "A zero-click query is a search where Google answers inside its own interface and the user never clicks through to a source site. AI Overviews currently account for about 14% of all queries answered this way. For a local business, that means a third of your future discovery traffic depends on whether you appear in the AI Overview citation list, not on whether you rank in the blue links below it.",
    },
    {
      question: "How do I get cited inside a Google AI Overview?",
      answer:
        "Three signals dominate. Citation density across high-DA sources, with extra weight on Google's own properties (YouTube, Maps reviews, Knowledge Graph entries). Schema completeness, because AIO needs structured data to extract a clean answer. And review velocity, where businesses adding 5+ reviews monthly outperform older businesses with more total reviews. The combined deployment is what gets you in the citation slot.",
    },
    {
      question: "Why does review velocity matter more than total review count?",
      answer:
        "Google interprets review velocity as a freshness signal. A business adding 5 reviews this month reads as 'active business with current information,' while a business with 500 lifetime reviews and nothing in the last 90 days reads as stale. AIO favors freshness because the user is asking about now. Set up a monthly review contest or in-store request flow that keeps velocity above 5 per location per month.",
    },
    {
      question: "Will the local pack and AI Overviews really merge?",
      answer:
        "Yes, that is the trajectory. The current separation between 10 blue links, the Map pack, and AI Overviews is a transitional layout. Internal Google partner roadmaps point to a unified AI-first interface where AIO surfaces local results inline with citations. Businesses that already ship the four core schemas with full entity relationships are positioned for the merge. Businesses that have not are not.",
    },
    {
      question: 'What should I do this quarter to prepare for 2027?',
      answer:
        "Four moves. Ship the four core schemas (LocalBusiness, FAQ, Review, Service) with full entity relationships connecting them. Run a monthly review contest to keep velocity above 5 reviews per location per month. Build out Wikidata presence so you appear in Google's Knowledge Graph. Publish quarterly 'current state' content that AIO can cite as recent. Done together, these compound and lift your AIO citation odds inside 90 days.",
    },
  ],
  relatedSlugs: [],
  headings: [
    { id: 'the-zero-click-query-is-here-most-local-businesses-are-unprepared', text: 'The zero-click query is here. Most local businesses are unprepared.' },
  ],
  schemaType: 'BlogPosting',
  speakable: true,
}

export function Content() {
  return (
    <>
      <img
        src={meta.images.hero}
        alt="Google AI Overviews citation gap 2027 hero"
        loading="eager"
        className="w-full rounded-2xl border border-white/10"
      />

      <h2 id="the-zero-click-query-is-here-most-local-businesses-are-unprepared">
        The zero-click query is here. Most local businesses are unprepared.
      </h2>
      <p>
        Google AI Overviews currently answer about 14% of all queries without sending a click to any source site. Internal projections we have seen from Google partners put that number at 30%+ by mid-2027.
      </p>
      <p>
        If 30% of "dentist near me Montreal" queries get answered inside Google's interface without a click, the local business that does not appear in the AI Overview citation list has lost a third of its discovery traffic.
      </p>

      <StatHighlight
        stats={[
          { value: '14%', label: 'Queries answered with zero clicks today' },
          { value: '30%+', label: 'Projected zero-click share by mid-2027' },
          { value: '5/mo', label: 'Reviews velocity threshold per location' },
        ]}
      />

      <h3>Who gets cited inside AI Overviews</h3>
      <p>Google's AIO citation logic differs from classic search ranking. Three weighted signals dominate:</p>
      <p>
        <strong>Citation density across high-DA sources</strong>: similar to ChatGPT, but Google weights its own properties (YouTube, Maps reviews, Knowledge Graph entries) more heavily.
      </p>
      <p>
        <strong>Schema completeness</strong>: AIO needs to extract structured answers. If your site does not give it clean Schema.org markup, Google synthesizes from a competitor that does.
      </p>
      <p>
        <strong>Review velocity</strong>: this is the surprise signal. Businesses adding 5+ reviews monthly outperform older businesses with more total reviews. Google interprets review velocity as "active business with current information."
      </p>

      <CalloutBox type="info" title="Velocity beats volume">
        <p>
          We see this every week in citation logs. A business with 60 reviews and 5 added this month consistently outranks a business with 400 reviews and nothing in the last 90 days. AIO is reading freshness, not raw count. Build a monthly cadence that keeps velocity above the threshold.
        </p>
      </CalloutBox>

      <h3>What changes between now and 2027</h3>
      <p>Three things to expect:</p>
      <ul>
        <li>AIO citation list expands from 3-5 sources to 8-10. More slots equal more opportunities, but only for prepared businesses.</li>
        <li>Local pack and AIO merge. The current separation between "10 blue links plus Map pack plus AIO" collapses into a unified AI-first interface.</li>
        <li>Schema gets stricter. Google deprecates loose markup and requires more relations between entities (Service to LocalBusiness to Review).</li>
      </ul>

      <InlineCTA variant="audit" />

      <h3>The work that future-proofs you</h3>
      <p>We are advising every Core and Growth tier client to:</p>
      <ul>
        <li>Ship the four core schemas (LocalBusiness, FAQ, Review, Service) with full entity relationships</li>
        <li>Run a monthly review contest to keep velocity above 5 reviews per location per month</li>
        <li>Build out Wikidata presence so you appear in Google's Knowledge Graph</li>
        <li>Publish quarterly "current state" content that AIO can cite as recent</li>
      </ul>
      <p>
        This is exactly what the Agency tier delivers as a done-for-you bundle. Reviuzy SaaS handles the review velocity. Our team handles the schema and Wikidata work.
      </p>

      <CalloutBox type="tip" title="Quarterly cadence sets the rhythm">
        <p>
          Publish one "current state" article per quarter on your top service in your top city. Title it with the year and the change angle ("[Service] in [city] in [year]: what changed"). AIO weighs the publish date heavily, so a quarterly drop keeps a fresh article in the index window at all times.
        </p>
      </CalloutBox>

      <p>
        If you want to see your current AIO readiness score, run the audit.
      </p>
    </>
  )
}
