/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { AUTHORS } from '../../authors'
import { CalloutBox, InlineCTA, StatHighlight } from '../../components/shared'

export const meta: BlogPostMeta = {
  slug: 'aeo-geo-eeat-explained-for-local-owners',
  title: 'AEO vs GEO vs E-E-A-T explained for local business owners',
  metaDescription:
    'Three acronyms that decide your AI search future. Here is the plain-English version with what to do for each one in the next 90 days.',
  tldr:
    "AEO is the work of structuring your site so an AI engine can pull a clean, direct answer. GEO is the work of getting your brand cited inside generative AI responses. E-E-A-T is the rubric AI engines now use to decide who deserves both. You need all three, with a 90-day plan for each.",
  category: 'aeo-geo-eeat',
  tags: ['aeo', 'geo', 'eeat', 'fundamentals'],
  publishedDate: '2026-04-09',
  updatedDate: '2026-04-09',
  author: AUTHORS.research,
  readTimeMinutes: 6,
  images: {
    hero: '/blog-images/aeo-geo-eeat-explained-for-local-owners/hero.svg',
    mid: '/blog-images/aeo-geo-eeat-explained-for-local-owners/mid.svg',
    end: '/blog-images/aeo-geo-eeat-explained-for-local-owners/end.svg',
  },
  faqItems: [
    {
      question: 'Is AEO the same as classic SEO?',
      answer:
        "No. Classic SEO optimizes for ranking inside a list of blue links. AEO optimizes for being the answer pulled into an AI engine response. The work overlaps in places (clean schema, fast pages, real authorship), but the deliverables are different. AEO leans heavily on FAQ schema, scannable sub-300-word blocks under H2 headings, and entity-rich LocalBusiness markup that lets an LLM extract a single direct answer.",
    },
    {
      question: 'Can I do GEO without third-party press mentions?',
      answer:
        "Partly, but not fully. GEO depends on third-party validation. The minimum baseline you can DIY is high-DA citation density (Yelp, BBB, Crunchbase, industry directories), Wikidata setup, and an original data piece other sites can cite. To unlock the upper tier of GEO outcomes you need at least one authoritative third-party mention. Industry podcasts and trade publications are the most attainable entry points if mainstream press is out of reach.",
    },
    {
      question: 'Why is E-E-A-T the highest-impact signal in 2026?',
      answer:
        "Google rebuilt its quality rater guidelines around E-E-A-T in 2024. Every LLM that uses Google's index inherits the weighting. That means E-E-A-T compounds across Google AI Overviews, Gemini, and any third-party LLM that pulls from Google's data, which is most of them. A site that scores high on Experience, Expertise, Authoritativeness, and Trust gets cited more across the entire AI search stack, not just one surface.",
    },
    {
      question: "What is the minimum schema set a local business needs?",
      answer:
        "Four schema types form the baseline: LocalBusiness fully filled out with address, hours, payment methods, and service area. FAQPage covering every common customer question. Review with aggregateRating plus at least three individual reviews marked up. Service with one entity per service you offer, linked back to the LocalBusiness entity. Without these four shipped cleanly, AEO and GEO work both stall regardless of content quality.",
    },
    {
      question: 'How do AEO, GEO, and E-E-A-T fit together in a 90-day plan?',
      answer:
        "Sequence them. Days 1 to 30: AEO foundation, ship the four core schemas and 15 FAQ entries per service. Days 31 to 60: GEO push, claim and complete your top 10 high-DA citation targets and earn one third-party mention. Days 61 to 90: E-E-A-T polish, add author bylines everywhere, ship one piece of original research, claim awards and credentials in schema, and fix technical trust signals. The three layers reinforce each other rather than competing for time.",
    },
  ],
  relatedSlugs: [],
  headings: [
    { id: 'three-acronyms-plain-english-what-to-do', text: 'Three acronyms. Plain English. What to do.' },
    { id: 'how-they-fit-together', text: 'How they fit together' },
  ],
  schemaType: 'BlogPosting',
  speakable: true,
}

export function Content() {
  return (
    <>
      <img
        src={meta.images.hero}
        alt="AEO GEO E-E-A-T explained hero"
        loading="eager"
        className="w-full rounded-2xl border border-white/10"
      />

      <h2 id="three-acronyms-plain-english-what-to-do">
        Three acronyms. Plain English. What to do.
      </h2>
      <p>
        Every AI search agency throws AEO, GEO, and E-E-A-T at you within the first call. Most owners nod and pretend to follow. Here is the version we wish someone had given us.
      </p>

      <StatHighlight
        stats={[
          { value: '4', label: 'Core schema types per local business' },
          { value: '15', label: 'FAQ entries per service' },
          { value: '90 days', label: 'To run the full plan' },
        ]}
      />

      <h3>AEO: Answer Engine Optimization</h3>
      <p>AEO is the work of structuring your website so an AI engine can pull a clean, direct answer from your content.</p>
      <p>The core moves:</p>
      <ul>
        <li>FAQ schema on your service pages (every question your customers ask)</li>
        <li>Review schema with aggregateRating</li>
        <li>LocalBusiness schema fully filled out</li>
        <li>HowTo schema for any process you teach</li>
        <li>Scannable, sub-300-word blocks under H2 headings</li>
      </ul>
      <p>
        If a buyer asks "how much does a root canal cost in Montreal," AEO is what makes ChatGPT pull "$800 to $1,500" from your dental clinic site instead of summarizing five competitors.
      </p>
      <p>
        <strong>90-day play</strong>: ship the four schema types above, write 15 FAQ entries per service.
      </p>

      <CalloutBox type="tip" title="Sub-300-word block test">
        <p>
          Every H2 section on a service page should answer one question in under 300 words. If a section runs longer, split it. AI engines extract single, scannable blocks, not long mixed paragraphs. The 300-word ceiling is the practical extraction window we see in citation logs.
        </p>
      </CalloutBox>

      <h3>GEO: Generative Engine Optimization</h3>
      <p>
        GEO is the work of getting your brand cited inside generative AI responses (ChatGPT, Perplexity, Claude, Gemini).
      </p>
      <p>
        This is not the same as ranking. ChatGPT can give a great answer about your industry without ever naming you. GEO is the work of being named.
      </p>
      <p>The core moves:</p>
      <ul>
        <li>Wikipedia and Wikidata footprint</li>
        <li>High-DA citation density (Yelp, BBB, Crunchbase, industry directories)</li>
        <li>Authoritative third-party content mentioning your name</li>
        <li>Original data or research that other sites cite back to you</li>
      </ul>
      <p>
        GEO is harder than AEO because it depends on third-party validation. You cannot DIY it overnight.
      </p>
      <p>
        <strong>90-day play</strong>: claim and complete your top 10 high-DA citation targets, earn one third-party mention, set up Wikidata.
      </p>

      <InlineCTA variant="audit" />

      <h3>E-E-A-T: Experience, Expertise, Authoritativeness, Trust</h3>
      <p>
        E-E-A-T is Google's rubric for evaluating content quality. AI engines now use the same rubric for picking what to cite.
      </p>
      <p>The four pillars:</p>
      <ul>
        <li><strong>Experience</strong>: first-hand evidence. Original photos with EXIF data, real customer interviews, on-site videos.</li>
        <li><strong>Expertise</strong>: credentials. Author bios with real qualifications, specialized vocabulary used correctly.</li>
        <li><strong>Authoritativeness</strong>: third-party validation. Press mentions, peer recognition, awards, industry citations.</li>
        <li><strong>Trust</strong>: technical and business honesty. SSL, no broken links, transparent pricing, real reviews not fake.</li>
      </ul>
      <p>
        E-E-A-T is the highest-impact AI search signal in 2026. Google rebuilt its quality rater guidelines around it in 2024. Every LLM that uses Google's index inherits the weighting.
      </p>
      <p>
        <strong>90-day play</strong>: add author bylines to all blog content, ship one piece of original research, claim awards and credentials in schema, fix any technical trust signals (SSL, broken links).
      </p>

      <CalloutBox type="info" title="The Experience pillar is the easiest win">
        <p>
          Most local sites skip the Experience pillar. Add three things: original photos with EXIF data preserved, one short customer interview transcribed on a service page, and at least one on-site video per location. These three moves alone routinely lift E-E-A-T scoring on quality rater audits we run for clients.
        </p>
      </CalloutBox>

      <h2 id="how-they-fit-together">How they fit together</h2>
      <p>
        AEO makes you the answer. GEO gets you cited. E-E-A-T decides who deserves both.
      </p>
      <p>
        You need all three. Most agencies sell one and call it complete. We do all three at the Core tier.
      </p>
      <p>
        If you want to see which of the three you are strongest and weakest at, run the AI Visibility Audit. We score each separately so you know exactly what to fix first.
      </p>
    </>
  )
}
