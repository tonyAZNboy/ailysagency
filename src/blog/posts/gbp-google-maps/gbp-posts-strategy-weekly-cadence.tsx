/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { AUTHORS } from '../../authors'
import {
  CalloutBox,
  InlineCTA,
  StatHighlight,
  KeyTakeaway,
  QuickQuiz,
  InternalLink,
  SectionDivider,
} from '../../components/shared'

export const meta: BlogPostMeta = {
  slug: 'gbp-posts-strategy-weekly-cadence',
  title: 'GBP posts strategy, the weekly cadence that moves the local pack',
  metaDescription:
    'GBP posts strategy: how often to post, what to post, and the weekly cadence that lifts local pack ranking. Includes the AiLys per-tier cadence chart.',
  tldr: 'A weekly Google Business Profile posting cadence is the floor for local pack movement. AiLys ships at four cadence tiers: Starter at four posts a month, Core at six, Growth at eight, Agency at twelve. The post type matters as much as frequency: Offers, Updates, and Events each move different ranking signals.',
  category: 'gbp-google-maps',
  tags: ['gbp posts strategy', 'google business profile', 'local pack', 'cadence', 'gbp-google-maps'],
  publishedDate: '2026-02-23',
  updatedDate: '2026-02-23',
  author: AUTHORS.strategy,
  readTimeMinutes: 8,
  images: {
    hero: '/blog-images/gbp-posts-strategy-weekly-cadence/hero.webp',
    mid: '/blog-images/gbp-posts-strategy-weekly-cadence/mid.webp',
    end: '/blog-images/gbp-posts-strategy-weekly-cadence/end.webp',
  },
  faqItems: [
    {
      question: 'How often should I post to my Google Business Profile?',
      answer:
        'A weekly cadence is the floor for local pack movement. One post per week keeps the GBP fresh enough to feed the recency signal that Google weights for "open now" and constrained queries. AiLys ships four tiers: Starter at four posts a month, Core at six, Growth at eight, Agency at twelve. Above three a week, returns flatten on most categories.',
    },
    {
      question: 'Do GBP posts actually affect local pack ranking?',
      answer:
        'Yes, but indirectly. GBP posts feed the recency and engagement signals that Google weights heavily for "open now" and constrained queries like "best ramen near me open now". A profile with no posts in 90 days is treated as stale and falls out of the freshness boost. Posts also drive direct conversions through the booking and offer buttons, which Google measures and feeds back into the local ranking algorithm.',
    },
    {
      question: 'What is the right mix of GBP post types?',
      answer:
        'A balanced cadence rotates four post types. Updates (around 50 percent of posts) cover news, hours changes, and behind-the-scenes content. Offers (around 25 percent) carry CTA buttons and drive direct conversions. Events (around 15 percent) tie to dated activities like seasonal hours or community events. Products (around 10 percent) showcase a specific service or item with a learn-more link. The 50-25-15-10 split holds across most local categories.',
    },
    {
      question: 'How long should each GBP post be?',
      answer:
        'GBP posts cap at 1,500 characters but the sweet spot is 150 to 300 characters with a clear CTA. Longer posts truncate in the local pack preview, and the truncation hurts click-through. The first 80 characters carry the headline weight: lead with the offer, the news, or the value proposition, not with a hook. End with a one-line CTA that maps to one of the GBP buttons (Book, Order, Call, Learn More).',
    },
    {
      question: 'Can I automate GBP posts safely?',
      answer:
        'Partial automation is safe and recommended. Schedule the four monthly posts in advance with a content calendar, but write each one by hand. Full automation that auto-generates copy from templates triggers the GBP spam classifier, which suspends the listing. AiLys uses scheduled human-written posts at every tier and never ships auto-generated text. Scheduling tools like the GBP API or third-party schedulers are fine, automated copy generation is not.',
    },
  ],
  relatedSlugs: ['what-quebec-restaurants-ask-google-maps-2026', 'why-chatgpt-cites-your-competitor'],
  headings: [
    { id: 'why-cadence-beats-volume', text: 'Why cadence beats volume' },
    { id: 'the-ailys-cadence-by-tier', text: 'The AiLys cadence by tier' },
    { id: 'the-four-post-types-and-the-50-25-15-10-mix', text: 'The four post types and the 50-25-15-10 mix' },
    { id: 'post-length-and-cta-discipline', text: 'Post length and CTA discipline' },
    { id: 'what-to-write-each-week', text: 'What to write each week' },
    { id: 'measuring-the-impact-on-local-pack', text: 'Measuring the impact on local pack' },
    { id: 'common-cadence-mistakes', text: 'Common cadence mistakes that suspend listings' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        A weekly Google Business Profile posting cadence is the floor for local pack movement. Most local owners post once a quarter and wonder why the local pack ranking does not move. Google weights GBP recency heavily for "open now" and constrained queries, and a profile with no posts in 90 days falls out of the freshness boost. The fix is a written cadence with the right post type mix, the right length, and the right CTA discipline.
      </p>

      <StatHighlight
        stats={[
          { value: '1/wk', label: 'Floor cadence for local pack movement (Core tier)' },
          { value: '50-25-15-10', label: 'Mix of Updates, Offers, Events, Products' },
          { value: '150-300', label: 'Character sweet spot per GBP post' },
        ]}
      />

      <SectionDivider />

      <h2 id="why-cadence-beats-volume">Why cadence beats volume</h2>
      <p>
        Volume matters less than rhythm. A profile that posts five times in one week and zero times for the next three weeks performs worse than a profile that posts once a week, every week, for a quarter. Google weights consistency. The freshness signal is built on a rolling 30-day window, so a steady weekly cadence keeps the profile inside the freshness boost continuously, while a burst-and-silence pattern drops out of the boost in the silence weeks.
      </p>
      <p>
        For most local categories, the marginal return on a fourth post per week is small. Three posts per week is the practical ceiling in our cohort data. Above three, the local pack does not move further, and the time cost compounds. The honest cadence map is one to three posts a week, depending on how much the operator can sustain without burning out.
      </p>

      <InlineCTA variant="audit" text="Want to see how your current GBP cadence compares to the local pack leader? Run the free 24-hour AI Visibility audit." />

      <SectionDivider />

      <h2 id="the-ailys-cadence-by-tier">The AiLys cadence by tier</h2>
      <p>
        AiLys ships GBP posts at four cadence tiers, mapped to the monthly subscription tiers. Each tier is a published cadence the operator can count on without negotiation.
      </p>

      <h3>Cadence by AiLys tier</h3>
      <ul>
        <li>Starter (300 dollars CAD a month): 4 GBP posts a month, written by hand, scheduled in advance.</li>
        <li>Core (600 dollars CAD a month): 6 GBP posts a month, mixed across post types</li>
        <li>Growth (1,200 dollars CAD a month): 8 GBP posts a month, with monthly photo refresh</li>
        <li>Agency (2,500 dollars CAD a month): 12 GBP posts a month, with multi-location coordination</li>
      </ul>

      <p>
        The Core tier is the floor for local pack movement. The Starter tier keeps the profile from going stale but does not move the local pack on its own. The Growth tier is the right fit for operators who run weekly offers and need the conversion volume from offer posts. The Agency tier serves multi-location operators where each location needs its own cadence.
      </p>

      <CalloutBox type="info">
        <p>The cadence applies to each location, not to the parent business. A multi-location operator on the Agency tier gets twelve posts per location per month, not twelve posts split across locations. Multi-location coordination at the Agency tier ensures each location's posts feel local and not templated.</p>
      </CalloutBox>

      <QuickQuiz
        question="What is the practical ceiling on weekly GBP post cadence before returns flatten?"
        options={[
          'One post per week, anything more is spam',
          'Three posts per week, beyond that the local pack does not move further',
          'Seven posts per week, one per day',
          'There is no ceiling, more is always better',
        ]}
        correctIndex={1}
        explanation="In cohort data three posts per week is the practical ceiling. Above three, the local pack does not move further and the time cost compounds. One to three posts a week is the honest cadence map, sized to what the operator can sustain without burning out."
      />

      <SectionDivider />

      <h2 id="the-four-post-types-and-the-50-25-15-10-mix">The four post types and the 50-25-15-10 mix</h2>
      <p>
        GBP supports four post types: Updates, Offers, Events, and Products. Each type carries different ranking signals and conversion behaviors. A balanced cadence rotates the four types in a 50-25-15-10 mix that holds across most local categories.
      </p>

      <h3>Update posts (around 50 percent)</h3>
      <p>
        Updates are the workhorse. News, hours changes, behind-the-scenes content, staff introductions, customer wins, before-and-after photos. Updates do not carry CTA buttons and they do not drive direct conversions, but they feed the recency signal that Google weights for "open now" queries. Aim for half of the cadence in Updates because they are the easiest to sustain and they keep the profile fresh.
      </p>

      <h3>Offer posts (around 25 percent)</h3>
      <p>
        Offers carry a CTA button and a redemption window. They drive the most direct conversions of any post type. The honest read is that offers also lift local pack ranking through the conversion feedback loop: customers who book or buy through the offer button signal to Google that the profile is healthy and active. Offers are higher friction to write than Updates because they require a real promotion, but the conversion lift justifies the effort.
      </p>

      <h3>Event posts (around 15 percent)</h3>
      <p>
        Events are dated. Seasonal hours, community events, anniversary specials, holiday closures. Events surface in the local pack with a date stamp, which lifts click-through on time-sensitive queries. Aim for one or two Events a month, not more, because the date stamp loses value when every post is an Event.
      </p>

      <h3>Product posts (around 10 percent)</h3>
      <p>
        Products showcase a specific service or item with a learn-more link to a service page on your site. They feed Service schema cross-references and they pull traffic to deep service pages. Use Product posts sparingly, around one a month, because the format is heavier to write and the conversion behavior overlaps with Offer posts.
      </p>

      <img
        src={meta.images.mid}
        alt="Pie chart showing the 50-25-15-10 GBP post type mix across Updates, Offers, Events, Products"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="post-length-and-cta-discipline">Post length and CTA discipline</h2>
      <p>
        GBP posts cap at 1,500 characters, but the local pack preview truncates around 80 characters of headline and 150 characters of body. The sweet spot is 150 to 300 characters total: enough to communicate the value, short enough to fit the preview without truncation. Longer posts perform worse on click-through because the truncation cuts the CTA mid-sentence.
      </p>
      <p>
        Lead with the offer, the news, or the value proposition. Do not lead with a hook or a question. The first 80 characters carry the headline weight, and a question lead wastes that real estate. End with a one-line CTA that maps to one of the GBP buttons: Book, Order, Call, Learn More. The CTA must match the button, otherwise the post reads as confused and click-through drops.
      </p>

      <CalloutBox type="tip">
        <p>For French posts on a Quebec GBP, use Quebec spellings (courriel, magasiner, fin de semaine where relevant). The local algorithm reads regional spelling consistency and weights it. France French on a Quebec profile creates a small but measurable softness in the freshness boost.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="what-to-write-each-week">What to write each week</h2>
      <p>
        A simple monthly content map for a Core tier four-post cadence:
      </p>

      <ol>
        <li>Week 1 Update: a behind-the-scenes photo with two-line caption about a recent customer win, staff milestone, or a process improvement</li>
        <li>Week 2 Offer: a real promotion with a redemption window and a Book or Order CTA button</li>
        <li>Week 3 Update: a hours or seasonal news post, or a customer testimonial with first name and photo when consent is given</li>
        <li>Week 4 Event or Product: a dated event for the coming month, or a Product post linking to a deep service page</li>
      </ol>

      <p>
        Write the four posts in advance at the start of each month. Schedule them through the GBP API or a third-party scheduler. Do not auto-generate the copy. The GBP spam classifier flags repetitive auto-generated copy and suspensions follow. <InternalLink to="/services/gbp-optimization" title="GBP optimization service" description="Includes the weekly cadence and the multi-location coordination work" /> handles the cadence end-to-end on every paid tier. For pillar context on how cadence feeds the citation graph, see <InternalLink to="/blog/share-of-model-metric-explained" title="Share of Model explained" description="The citation share metric for AI search visibility" />.
      </p>

      <InlineCTA variant="pricing" text="See AiLys cadence tiers, from four posts a month at Starter to twelve a month per location at Agency." />

      <SectionDivider />

      <h2 id="measuring-the-impact-on-local-pack">Measuring the impact on local pack</h2>
      <p>
        The right local pack measurement is share of voice on a locked grid of queries, not raw position. Pick five high-intent queries, run them weekly with a location-anchored grid tool, and track how often your profile appears in the top three. A clean weekly cadence typically lifts local pack share of voice by 8 to 15 percentage points over the first quarter, with most of the lift landing in weeks 6 to 10. Pair this with the free <InternalLink to="/audit" title="Free 24-hour AI Visibility audit" description="Includes baseline GBP cadence and freshness signal analysis" /> to capture the starting line before the cadence shift.
      </p>
      <p>
        Pair the local pack measurement with the GBP Insights export. Track post views, post engagement, button clicks, and direction requests. The post engagement rate is the leading indicator: rising engagement at week 4 predicts the local pack lift at week 8. Falling engagement at week 4 means the post mix is wrong (usually too many Updates and not enough Offers) and the cadence needs a rebalance.
      </p>

      <CalloutBox type="warning">
        <p>Avoid stuffing every post with the same primary keyword. The GBP spam classifier weights keyword density across recent posts, and a profile that repeats the same anchor phrase weekly gets soft-flagged within a quarter. Vary the lead phrase across Updates, Offers, Events, and Products even when the underlying service is identical.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="common-cadence-mistakes">Common cadence mistakes that suspend listings</h2>
      <p>
        Three patterns trigger GBP suspensions and reset the freshness clock to zero.
      </p>

      <ol>
        <li>Auto-generated copy from a template, where the same sentence structure repeats across posts. The classifier flags this within a quarter.</li>
        <li>Offer posts with stacked promo codes that violate the GBP offer guidelines. One stacked promo per quarter is fine, weekly stacked promos read as spam.</li>
        <li>Event posts with dates in the past. Posting an Event after the date has passed marks the profile as inactive and the event signal flips negative.</li>
      </ol>

      <p>
        The fix is human-written copy with a content calendar and a quarterly audit of the offer guidelines and event posting dates. Most operators avoid all three with a one-hour monthly content session and a scheduling tool. AiLys runs this monthly session as part of the Core tier deliverable and ships the four posts on a fixed weekly schedule.
      </p>

      <InlineCTA variant="book" text="Want a 60-minute walk-through of your GBP cadence and post mix? Book a no-pitch session, strategy doc sent regardless." />

      <KeyTakeaway
        points={[
          'Weekly cadence is the floor for local pack movement. Three posts a week is the practical ceiling.',
          'AiLys cadence: Starter 1 post a month, Core 4 a month, Growth 8 a month, Agency 12 a month per location.',
          'Mix the four post types in a 50-25-15-10 ratio: Updates, Offers, Events, Products.',
          'Sweet spot is 150 to 300 characters with a clear CTA that matches the GBP button.',
          'Do not auto-generate copy. The spam classifier flags repetition and suspensions follow.',
        ]}
      />

      <SectionDivider />

      <h2 id="faq">Frequently Asked Questions</h2>
      {meta.faqItems.map((f, i) => (
        <details key={i} className="my-3 rounded-lg border border-white/10 bg-white/[0.02] p-4">
          <summary className="cursor-pointer font-semibold text-white/90">{f.question}</summary>
          <p className="mt-3 text-white/70 text-[0.95rem]">{f.answer}</p>
        </details>
      ))}

      <img
        src={meta.images.end}
        alt="GBP weekly cadence content map with four scheduled post types for a local Quebec business"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
