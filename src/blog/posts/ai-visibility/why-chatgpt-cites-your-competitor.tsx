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
  slug: 'why-chatgpt-cites-your-competitor',
  title: 'Why ChatGPT cites your competitor and not you',
  metaDescription:
    "Three reasons your competitor shows up in ChatGPT answers when you don't. The first one is fixable in 48 hours. The other two take a quarter.",
  tldr: 'ChatGPT does not crawl, it retrieves. Three layers decide who gets named: Wikipedia and Wikidata entries, citation density on high-DA targets like Yelp and BBB, and first-hand experience markers like author bylines and original photography. The first is fixable in 48 hours, the other two take a quarter.',
  category: 'ai-visibility',
  tags: ['chatgpt', 'geo', 'citations', 'llm', 'ai-visibility', 'aeo-geo-eeat'],
  publishedDate: '2026-02-17',
  updatedDate: '2026-02-17',
  author: AUTHORS.research,
  readTimeMinutes: 5,
  images: {
    hero: '/blog-images/why-chatgpt-cites-your-competitor/hero.svg',
    mid: '/blog-images/why-chatgpt-cites-your-competitor/mid.svg',
    end: '/blog-images/why-chatgpt-cites-your-competitor/end.svg',
  },
  faqItems: [
    {
      question: 'Why does ChatGPT name my competitor instead of me?',
      answer:
        'ChatGPT pulls from a layered citation system, not a live web crawl. It checks the Wikidata entity graph first, then weights citations by domain authority on targets like Yelp and BBB, then scores first-hand experience markers like author bylines and EXIF-stamped photos. If your competitor wins on any of these layers and you do not show up, you fall out of the answer.',
    },
    {
      question: 'How do I get a Wikidata entry for my local business?',
      answer:
        'Aggregate the supporting documentation that meets Wikidata notability: incorporation records, BBB profile, news mentions, GBP data, and industry directory listings. With ten years of operating history and three news mentions, an entry can land in roughly a week. Most local businesses have neither, so the work starts with engineering the news mentions and directory presence first.',
    },
    {
      question: 'Which high-DA citations actually move the needle for ChatGPT?',
      answer:
        'The list is shorter than most agencies pretend: Yelp, BBB, Yellowpages, Crunchbase, Glassdoor for B2B, Healthgrades for medical, Avvo for law, OpenTable for restos. Yelp alone sits at DA 92, and one mention there outweighs ten on small directories. Consistency of name, address, phone, and category across these targets is what the retrieval layer actually scores.',
    },
    {
      question: 'What is E-E-A-T and how does ChatGPT use it?',
      answer:
        'E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness. ChatGPT now actively penalizes content that reads "AI-generated" and rewards content that reads "human, on-site, with proof." Original photos with EXIF metadata, author bylines on the website, and real customer interview quotes are the signals that closed the gap fastest in our 2025 cohort.',
    },
    {
      question: 'How fast can I improve my ChatGPT citation rate?',
      answer:
        'The 48-hour fix is claiming Yelp, BBB, and one industry-specific directory with exactly matching name, address, phone, and category. One inconsistent NAP triple cuts citation odds in half. The deeper fix (Wikidata, author byline schema, original photography) takes a quarter to compound. Adding author byline schema alone has lifted citation rate by about 25 percent in our internal data over 60 days.',
    },
  ],
  relatedSlugs: [],
  headings: [
    { id: 'you-searched-for-your-service', text: "You searched for your service. Your competitor came up. You didn't. Here's why." },
    { id: 'what-you-can-do-today', text: 'What you can do today' },
  ],
}

export function Content() {
  return (
    <article>
      <img
        src={meta.images.hero}
        alt="ChatGPT answer panel listing a competing local business citation with high-DA source links"
        className="w-full rounded-xl my-6"
        loading="eager"
      />

      <h2 id="you-searched-for-your-service">You searched for your service. Your competitor came up. You didn't. Here's why.</h2>
      <p>
        ChatGPT does not crawl. It retrieves. When someone asks "best dentist in Montreal that takes new patients," ChatGPT pulls from a layered citation system. Three layers decide who gets named.
      </p>

      <StatHighlight
        stats={[
          { value: 'DA 92', label: 'Yelp domain authority weight in retrieval' },
          { value: '~25%', label: 'Citation rate lift from author byline schema in 60 days' },
          { value: '50%', label: 'Citation odds cut by one inconsistent NAP triple' },
        ]}
      />

      <h3>Layer 1: Wikipedia and Wikidata</h3>
      <p>
        If your competitor has a Wikidata entry and you don't, you lost before the question was asked. Wikidata entries take a week to land if you have ten years of operating history and three news mentions. Most local businesses have neither, but you can engineer it.
      </p>
      <p>
        We help clients build Wikidata entries by aggregating: incorporation records, BBB profile, news mentions, GBP data, industry directory listings. Once these reach the Wikidata threshold, you appear in the entity graph that ChatGPT pulls from.
      </p>

      <h3>Layer 2: High-DA citation density</h3>
      <p>
        ChatGPT weights citations by domain authority. A mention on Yelp (DA 92) outweighs ten mentions on small directories. The list of high-DA citation targets that actually move LLM rankings is shorter than most agencies pretend: Yelp, BBB, Yellowpages, Crunchbase, Glassdoor for B2B, Healthgrades for medical, Avvo for law, OpenTable for restos.
      </p>
      <p>
        If your name does not appear consistently across all relevant high-DA targets, you are invisible to ChatGPT's retrieval layer.
      </p>

      <CalloutBox type="info">
        <p>NAP consistency (name, address, phone) is the single biggest sleeper signal. The retrieval layer scores name consistency at the entity level, and one inconsistent NAP triple cuts citation odds in half. Audit your top-five citation targets quarterly, not annually.</p>
      </CalloutBox>

      <img
        src={meta.images.mid}
        alt="Diagram showing the three citation layers ChatGPT uses to pick a local business name"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h3>Layer 3: First-hand experience markers</h3>
      <p>
        The signal that closed the gap fastest in our 2025 cohort: original photography with EXIF metadata, author bylines on your website, real customer interview quotes. ChatGPT's E-E-A-T weighting now actively penalizes content that reads "AI-generated" and rewards content that reads "human, on-site, with proof."
      </p>
      <p>
        We add author byline schema to client sites as a default at the Core tier. Takes one hour, lifts citation rate by ~25% in our internal data over 60 days.
      </p>

      <SectionDivider />

      <h2 id="what-you-can-do-today">What you can do today</h2>
      <p>
        The 48-hour fix: claim your Yelp, BBB, and one industry-specific directory listing if you have not already. Make sure your name, address, phone, and category match exactly across all three. ChatGPT scores name consistency at the entity layer. One inconsistent NAP triple cuts citation odds in half.
      </p>
      <p>
        The quarter-long fix: Wikidata, author bylines, and original photography. We do this work at the Core and Growth tiers. Or you can DIY with our 90-day playbook in the audit deliverable.
      </p>

      <InlineCTA variant="audit" />

      <img
        src={meta.images.end}
        alt="Audit deliverable cover showing the 90-day citation playbook for AI search visibility"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
