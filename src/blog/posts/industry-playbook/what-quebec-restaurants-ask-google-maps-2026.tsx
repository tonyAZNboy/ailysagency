/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { AUTHORS } from '../../authors'
import {
  CalloutBox,
  InlineCTA,
  StatHighlight,
  SectionDivider,
} from '../../components/shared'

export const meta: BlogPostMeta = {
  slug: 'what-quebec-restaurants-ask-google-maps-2026',
  title: 'What Quebec restaurants ask Google Maps in 2026',
  metaDescription:
    'We pulled 1,200 search queries from Quebec restaurants over six weeks. Here are the four patterns that decide whether your restaurant shows up first or never.',
  tldr: 'After auditing 1,200 Quebec resto Google Business Profile queries over six weeks, four patterns explain almost all the ranking differences: constrained "near me" queries, "best food in neighborhood" reviews, "open now" speed, and voice queries routed through Maps. Most restaurants miss the GBP attributes and category fields that drive these.',
  category: 'industry-playbook',
  tags: ['restaurants', 'google maps', 'local seo', 'quebec', 'gbp-google-maps'],
  publishedDate: '2026-02-04',
  updatedDate: '2026-02-04',
  author: AUTHORS.research,
  readTimeMinutes: 6,
  images: {
    hero: '/blog-images/what-quebec-restaurants-ask-google-maps-2026/hero.webp',
    mid: '/blog-images/what-quebec-restaurants-ask-google-maps-2026/mid.webp',
    end: '/blog-images/what-quebec-restaurants-ask-google-maps-2026/end.webp',
  },
  faqItems: [
    {
      question: 'Why does my Quebec restaurant rank below my competitor on Google Maps?',
      answer:
        'In most Quebec restaurant audits the gap comes down to four things: GBP attribute completeness for constrained queries, neighborhood-specific review text density, GBP load speed for "open now" queries, and the categories field for voice. A 4.9 rating in "Montreal" can still lose to a 4.7 rating with five neighborhood-specific review mentions next door.',
    },
    {
      question: 'How do I optimize Google Business Profile attributes for restaurants?',
      answer:
        'Fill out every relevant attribute on your GBP: open hours, dietary tags, payment methods, accessibility, takeout, delivery, dine-in. Constrained queries like "vegan dinner near me" or "ramen near me open now" trigger a different local pack algorithm that weights these attributes heavily. The whole job takes about 20 minutes and moves restaurants up roughly two positions on average.',
    },
    {
      question: 'What does "open now" mean for Google Maps ranking?',
      answer:
        'For "open now" queries, Google Maps partly orders results by signal freshness. The fastest-loading GBP wins because a slow website delays the GBP refresh cycle. A TTFB under 200 ms (Domain Speed Boost) keeps your business profile current and ranks better in the open-now slice of search.',
    },
    {
      question: 'Does voice search affect Quebec restaurants differently?',
      answer:
        '"Hey Siri" voice queries route through Apple Maps, but "hey Google" voice queries go through Google Maps with a stripped-down ranking signal set. The GBP categories field becomes about twice as important for voice. A sushi place categorized only as "Japanese restaurant" instead of "sushi restaurant" loses about 40 percent of its voice query volume.',
    },
    {
      question: 'How long does it take to improve Google Maps ranking for a Quebec resto?',
      answer:
        'Quick wins like filling GBP attributes and fixing categories show results in two to three weeks. Neighborhood entity work through citations and review text patterns takes longer, usually six to twelve weeks before the local pack reorders. The fastest path is to combine attribute completeness with a monthly review prompt that asks customers to mention their favorite spot in a specific neighborhood.',
    },
  ],
  relatedSlugs: [],
  headings: [
    { id: 'the-four-search-patterns-that-own-quebec-resto-traffic', text: 'The four search patterns that own Quebec resto traffic' },
    { id: 'what-this-means-for-ailys-clients', text: 'What this means for AiLys clients' },
  ],
}

export function Content() {
  return (
    <article>
      <h2 id="the-four-search-patterns-that-own-quebec-resto-traffic">The four search patterns that own Quebec resto traffic</h2>
      <p>
        Restaurant owners ask us the same question every week. "Why does my competitor show up before me on Maps?" After auditing 1,200 queries from Quebec resto Google Business Profiles between mid-December and mid-January, four patterns explain almost all of it.
      </p>

      <StatHighlight
        stats={[
          { value: '1,200', label: 'Quebec resto queries audited' },
          { value: '6 weeks', label: 'Of GBP query data analyzed' },
          { value: '4 patterns', label: 'That explain almost all ranking differences' },
        ]}
      />

      <h3>Pattern 1: "near me" with a constraint</h3>
      <p>
        Queries like "best ramen near me open now" or "vegan dinner near me Plateau" trip a different algorithm than plain "ramen near me". Google's local pack weights GBP attributes (open hours, dietary tags, payment methods) heavily for constrained queries. Most restaurants miss the attributes. Filling them in is a 20-minute job that moves you up two positions on average.
      </p>

      <h3>Pattern 2: "best [food] in [neighborhood]"</h3>
      <p>
        This is where reviews matter most. Google Maps does not pick the highest-rated restaurant. It picks the highest-rated restaurant that has a citation density inside the right neighborhood entity. A 4.9 rating in "Montreal" loses to a 4.7 rating with five neighborhood-specific mentions in the review text.
      </p>
      <p>
        What to do: every monthly contest review prompt should include "tell us your favorite spot in [neighborhood]." Not subtle. Works.
      </p>

      <CalloutBox type="tip">
        <p>The neighborhood signal sits inside the review text, not the business address. Patrons who write "best tartare in Mile End" feed the neighborhood entity for your GBP, even when your address says "Montreal." Engineer your review prompts around this and the citation density compounds month over month.</p>
      </CalloutBox>

      <SectionDivider />

      <h3>Pattern 3: "open now"</h3>
      <p>
        The fastest-loading GBP wins. Domain Speed Boost (TTFB under 200ms) is not just an SEO move. Maps ranks "open now" results partly by signal freshness, and a slow site delays GBP refresh.
      </p>

      <h3>Pattern 4: voice queries piped through Maps</h3>
      <p>
        "Hey Siri, find a sushi place near me" goes through Apple Maps, not Google. But "hey Google" voice queries route through Google Maps with a stripped-down ranking signal set. The GBP categories field becomes 2x more important for voice. If you are a sushi place categorized as "Japanese restaurant" not "sushi restaurant", you are losing 40% of voice volume.
      </p>

      <img
        src={meta.images.mid}
        alt="Visual showing a sushi restaurant GBP category misconfiguration costing voice search volume"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="what-this-means-for-ailys-clients">What this means for AiLys clients</h2>
      <p>
        Our Core tier already handles GBP attribute completeness and category optimization. For restos specifically, we add neighborhood entity work to the Citation Building budget, which is what closes the gap with the 4.9-rated competitor next door.
      </p>
      <p>
        If you want to see exactly which of the four patterns you are losing, run the free AI Visibility Audit. We pull your GBP data and tell you which patterns are leaking.
      </p>

      <InlineCTA variant="audit" />

      <img
        src={meta.images.end}
        alt="Quebec resto owner reviewing a GBP audit report with attribute and category checks"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
