/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { AUTHORS } from '../../authors'
import {
  CalloutBox,
  InlineCTA,
  StatHighlight,
  KeyTakeaway,
  InternalLink,
  SectionDivider,
  QuickQuiz,
} from '../../components/shared'

export const meta: BlogPostMeta = {
  slug: 'wikidata-for-local-businesses',
  title: 'Wikidata for local businesses, the honest 2026 playbook',
  metaDescription:
    'Is Wikidata worth the effort for a single-location business? An honest playbook on Q-numbers, external IDs, schema linkage, and when AiLys does it for you.',
  tldr: 'Wikidata is a structured knowledge graph that AI engines and Google read to disambiguate brands. For a single-location local business, the ROI is real but modest, a few percent of citation lift in ChatGPT and Perplexity over six months. AiLys handles Wikidata as part of the Growth and Agency tiers using the MediaWiki API, with external IDs (GBP CID, OpenCorporates, schema.org sameAs) wired in. We do not edit Wikipedia.',
  category: 'local-seo',
  tags: ['wikidata', 'knowledge graph', 'schema', 'local-seo', 'sameAs'],
  publishedDate: '2026-02-25',
  updatedDate: '2026-02-25',
  author: AUTHORS.research,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/wikidata-for-local-businesses/hero.webp',
    mid: '/blog-images/wikidata-for-local-businesses/mid.webp',
    end: '/blog-images/wikidata-for-local-businesses/end.webp',
  },
  faqItems: [
    {
      question: 'Is Wikidata worth the effort for a single-location business?',
      answer:
        'Honest answer: it is modestly worth it. A single-location dentist or restaurant in Quebec will see a small lift in ChatGPT and Perplexity citation rates over six months once a Q-number is created with proper external IDs. The lift is not transformational like a GBP rebuild, but it is real and durable. The effort is roughly 90 minutes for a competent operator the first time.',
    },
    {
      question: 'What is a Wikidata Q-number?',
      answer:
        'A Q-number is the unique identifier assigned to every Wikidata item, written like Q12345. Your business gets a Q-number when an entry is created. The Q-number is what AI engines and the Google Knowledge Graph use to disambiguate your brand from similarly named businesses anywhere in the world. Without a Q-number, you are a string. With a Q-number, you are an entity.',
    },
    {
      question: 'Does Wikidata require a Wikipedia article first?',
      answer:
        'No. Wikidata is a separate project with looser notability rules. A local business can have a Q-number without a Wikipedia article, as long as the entry has reliable external sources cited (your GBP listing, OpenCorporates registration, schema.org markup on your site). AiLys never edits Wikipedia, that is out of scope. We work only on Wikidata, which is the layer AI engines actually read.',
    },
    {
      question: 'What external IDs should I link from my Wikidata entry?',
      answer:
        'At minimum: Google Business Profile CID (the long numeric ID from your GBP URL), OpenCorporates registration if you are incorporated in Quebec or federally, and your website with a sameAs back-link in schema.org markup. Optional but useful: Yelp, Facebook page, LinkedIn company page, and any local business directory the operator already uses. The more sourced external IDs, the stronger the entity disambiguation.',
    },
    {
      question: 'Does AiLys do Wikidata work as part of a paid plan?',
      answer:
        'Yes, on the Growth tier at 1,499 dollars CAD a month and the Agency tier at 2,500 dollars CAD a month. Starter and Core tiers do not include Wikidata work because the ROI is too thin for the entry pricing. We use the MediaWiki API to draft and submit edits semi-automatically, then a human reviews each edit before it ships. Quebec operators get the same treatment as English-Canada operators.',
    },
    {
      question: 'Can a Wikidata entry be deleted by another editor?',
      answer:
        'Yes, this is the real risk. Wikidata entries can be flagged for deletion if notability is challenged, especially for tiny businesses with no press coverage. The defense is to cite real external sources at creation time (GBP, OpenCorporates, a local newspaper article if any exists) and to avoid promotional language. AiLys uses neutral encyclopedic phrasing that survives deletion review more often than not.',
    },
  ],
  relatedSlugs: ['nap-consistency-audit-quebec', 'aeo-geo-eeat-explained-for-local-owners'],
  headings: [
    { id: 'what-wikidata-actually-is', text: 'What Wikidata actually is' },
    { id: 'why-ai-engines-read-it', text: 'Why AI engines read Wikidata' },
    { id: 'q-numbers-and-external-ids', text: 'Q-numbers and external IDs explained' },
    { id: 'creating-a-wikidata-entry-step-by-step', text: 'Creating a Wikidata entry, step by step' },
    { id: 'schema-org-sameas-wiring', text: 'Wiring schema.org sameAs back to Wikidata' },
    { id: 'the-honest-roi-for-single-location', text: 'The honest ROI for a single-location business' },
    { id: 'when-ailys-does-it-for-you', text: 'When AiLys does Wikidata for you' },
    { id: 'common-mistakes-and-deletion-risk', text: 'Common mistakes and the deletion risk' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        Wikidata is the structured knowledge graph that ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot read to disambiguate brand names. For a single-location local business in Quebec, getting a Wikidata Q-number is a modest but durable AI Visibility lift, a few percent of citation rate growth over six months. The work is roughly 90 minutes the first time, then 15 minutes a quarter to maintain. This playbook covers what Wikidata is, how to create an entry, how to wire it into your schema.org markup, and when AiLys does the work for you on the Growth or Agency tier.
      </p>

      <StatHighlight
        stats={[
          { value: '$1,499 to $2,500', label: 'AiLys tiers that include Wikidata work' },
          { value: '24 hours', label: 'AiLys free audit turnaround' },
          { value: '5 to 15', label: 'Citations per month at the Core to Agency tiers' },
        ]}
      />

      <SectionDivider />

      <h2 id="what-wikidata-actually-is">What Wikidata actually is</h2>
      <p>
        Wikidata is a free, collaborative knowledge base run by the Wikimedia Foundation. It stores structured data about almost every notable entity on earth: people, places, businesses, books, movies, concepts. Each entity has a unique Q-number identifier, a set of properties (P-numbers), and links to external IDs on other databases. The whole thing is queryable through SPARQL and the MediaWiki API.
      </p>
      <p>
        For a local business, Wikidata is not a marketing channel. Nobody reads Wikidata directly. The value is downstream: AI engines and the Google Knowledge Graph use Wikidata as a disambiguation source. When ChatGPT or Perplexity needs to decide which "Boulangerie Laurent" you are out of three businesses with similar names in different cities, Wikidata is one of the layers it consults.
      </p>

      <CalloutBox type="info">
        <p>Wikidata is separate from Wikipedia. A business can have a Wikidata entry without ever appearing in Wikipedia. The notability bar is much lower on Wikidata, and the editing process is more structured. AiLys works only on Wikidata. Wikipedia editing is out of scope per our internal policy because the conflict-of-interest rules around paid Wikipedia editing are strict and the value is lower than people assume.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="why-ai-engines-read-it">Why AI engines read Wikidata</h2>
      <p>
        Three reasons. First, Wikidata is structured by design, every claim is a triple of subject, predicate, object, which is exactly the format that LLM training pipelines and retrieval systems prefer. Second, Wikidata is open-licensed under CC0, so AI engines can ingest the full dump without licensing friction. Third, Wikidata is multilingual at the entity level, the same Q-number serves English, French, Spanish, Arabic, and Chinese queries at once.
      </p>
      <p>
        For a Quebec local business, the multilingual aspect is the most underrated benefit. A single Wikidata entry with French and English labels lifts citation share in both languages without duplicating any work. The AiLys AI Visibility engine has measured citation rate improvements that show up first in Perplexity (which queries Wikidata directly), then in ChatGPT and Gemini over the following weeks as their training data refreshes.
      </p>

      <InlineCTA variant="audit" text="Want to see if your business already has a Wikidata Q-number? The free 24-hour AI Visibility audit checks." />

      <SectionDivider />

      <h2 id="q-numbers-and-external-ids">Q-numbers and external IDs explained</h2>
      <p>
        Every Wikidata item gets a Q-number at creation, written Q followed by digits, like Q12345. The Q-number never changes. Once your business has a Q-number, that number becomes the canonical reference across every system that reads Wikidata, including the Google Knowledge Graph, schema.org sameAs links, and AI engine training data.
      </p>
      <p>
        External IDs are the second key concept. Wikidata stores a long list of properties whose value is an ID on another database. For a local business, the useful ones are:
      </p>
      <ul>
        <li>P3749 (Google Business Profile CID): the long numeric ID at the end of your GBP URL</li>
        <li>P1320 (OpenCorporates ID): your federal or Quebec corporate registration number</li>
        <li>P856 (official website): your canonical domain</li>
        <li>P2002 (X username), P2013 (Facebook username), P4264 (LinkedIn company ID): social presence</li>
        <li>P1448 (official name in source language) and P1813 (short name): for the Quebec French label</li>
      </ul>

      <CalloutBox type="tip">
        <p>The strongest signal you can give a Wikidata entry is a dense external ID block with at least three IDs that resolve. AI engines use the count and resolvability of external IDs as a proxy for entity confidence. A new entry with only a website link is fragile. A new entry with GBP CID, OpenCorporates registration, and a Facebook page is much harder to challenge in deletion review and is cited at higher rates by AI engines.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="creating-a-wikidata-entry-step-by-step">Creating a Wikidata entry, step by step</h2>
      <p>
        The honest workflow for a competent operator the first time:
      </p>
      <ol>
        <li>Create a Wikidata account at wikidata.org. Use a real name, the account history is public.</li>
        <li>Search Wikidata for your business name first. If a Q-number already exists, claim it and improve it instead of creating a duplicate.</li>
        <li>If no entry exists, click Create a new item. Add the English label, the French label (with Quebec spelling if applicable), and a short description like "dental clinic in Montreal" in both languages.</li>
        <li>Add an instance of (P31) statement. For most local businesses this is Q4830453 (business) or a more specific subclass like Q1763631 (dental clinic) or Q11707 (restaurant).</li>
        <li>Add a country (P17), located in the administrative territorial entity (P131), and street address (P6375) statements.</li>
        <li>Add the external ID block: GBP CID, OpenCorporates, official website, social IDs.</li>
        <li>Save. The entry is live immediately, but expect a deletion review within 7 to 30 days for tiny businesses with no press coverage.</li>
      </ol>

      <img
        src={meta.images.mid}
        alt="Step-by-step Wikidata entry creation workflow for a Quebec local business with external IDs"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="schema-org-sameas-wiring">Wiring schema.org sameAs back to Wikidata</h2>
      <p>
        The Wikidata entry alone is half the work. The other half is the sameAs back-link from your website schema.org markup. This closes the loop and tells Google and AI engines that the Wikidata Q-number and your website are the same entity.
      </p>
      <p>
        In your LocalBusiness JSON-LD on the homepage and contact page, add a sameAs array containing the Wikidata URL, the GBP URL, and any social URLs. The Wikidata URL format is https://www.wikidata.org/wiki/Q12345. AI engines that crawl your site will follow that URL, confirm the entity match, and weight the citation accordingly.
      </p>

      <QuickQuiz
        question="What is the most important external ID to add to a Quebec local business Wikidata entry?"
        options={[
          'The X (Twitter) username',
          'The Google Business Profile CID',
          'The Wikipedia article link',
          'The LinkedIn personal profile of the owner',
        ]}
        correctIndex={1}
        explanation="The Google Business Profile CID is the strongest external ID for a local business because it ties the Wikidata entry to the verified Google entity, which is the layer most AI engines and the Google Knowledge Graph cross-reference for local queries. Wikipedia is rare for small businesses, X is weak, and personal LinkedIn is irrelevant to the business entity."
      />

      <SectionDivider />

      <h2 id="the-honest-roi-for-single-location">The honest ROI for a single-location business</h2>
      <p>
        Time to be direct. For a single-location dentist, restaurant, law firm, or clinic in Quebec, Wikidata is worth doing but it is not transformational. The lift in AI engine citation rates is real, typically a few percent over six months, with Perplexity moving first because it queries Wikidata directly. Compare that to a proper GBP rebuild, which can lift map pack visibility by 20 percent or more in the same period.
      </p>
      <p>
        The honest sequencing for a local owner: do GBP first, NAP citations second, schema markup third, and Wikidata fourth. Skipping ahead to Wikidata before fixing GBP is a category error. Once the foundations are clean, Wikidata is the next layer that compounds nicely with everything below it.
      </p>

      <InternalLink to="/audit" title="Free 24-hour AI Visibility audit" description="See whether you already have a Q-number and where the gaps are" />

      <InternalLink to="/glossary/nap" title="NAP consistency, the foundation under Wikidata" description="Fix this before any Q-number work" />

      <InternalLink to="/audit/gbp" title="Free GBP audit" description="Foundations first, GBP before any Wikidata work" />

      <InlineCTA variant="book" text="Want a 60-minute Wikidata strategy call, no pitch, strategy doc sent regardless?" />

      <SectionDivider />

      <h2 id="when-ailys-does-it-for-you">When AiLys does Wikidata for you</h2>
      <p>
        AiLys handles Wikidata work as part of the Growth tier at 1,499 dollars CAD a month and the Agency tier at 2,500 dollars CAD a month. We use the MediaWiki API to draft and submit edits semi-automatically, then a human on our bilingual team reviews each edit before it ships. Quebec French labels are hand-authored, with regional spellings and proper accents.
      </p>
      <p>
        The Starter tier at 300 dollars and the Core tier at 799 dollars do not include Wikidata work. The reason is honest: at those tiers, the time investment for Wikidata edits would crowd out higher-ROI work like GBP optimization and citation cleanup. We would rather ship the higher-ROI work first and add Wikidata when the operator is ready to upgrade to Growth.
      </p>

      <CalloutBox type="warning">
        <p>Be wary of agencies that promise Wikidata as a checkbox without explaining the deletion risk. A poorly sourced entry created without notability evidence can be deleted within 30 days, and the deletion review history attaches to your Q-number namespace permanently. AiLys writes entries with real sources cited and neutral encyclopedic phrasing that survives review. We have had only one entry deleted across hundreds shipped, and it was for a business that closed before the review concluded.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" text="See the four AiLys tiers, from Starter at 300 dollars CAD to Agency at 2,500 dollars CAD with Wikidata included." />

      <SectionDivider />

      <h2 id="common-mistakes-and-deletion-risk">Common mistakes and the deletion risk</h2>
      <p>
        Five mistakes account for almost every deleted entry we have observed:
      </p>
      <ol>
        <li>Promotional language in the description field. Wikidata is encyclopedic, not marketing. "Best dentist in Montreal" gets flagged. "Dental clinic in Montreal, Quebec, Canada" survives.</li>
        <li>No external sources at creation time. An entry with only a website link looks like spam. Add GBP CID and OpenCorporates from the start.</li>
        <li>Duplicate entry. Search before you create. Claiming and improving an existing Q-number is always better than creating a competing one.</li>
        <li>Missing instance of (P31) statement. Without it, Wikidata cannot classify your entity, and the entry is fragile.</li>
        <li>Editing from an account that obviously belongs to the business owner. Conflict-of-interest is fine if disclosed, but it raises the deletion risk if combined with promotional language.</li>
      </ol>

      <KeyTakeaway
        points={[
          'Wikidata is the structured knowledge graph that AI engines read for entity disambiguation.',
          'A Q-number plus three or more resolved external IDs (GBP CID, OpenCorporates, website) is the minimum durable entry.',
          'Wire schema.org sameAs from your website JSON-LD back to the Wikidata URL to close the loop.',
          'For a single-location business, expect a few percent citation lift over six months, not a transformational gain.',
          'AiLys handles Wikidata on the Growth (1,499) and Agency (2,500) tiers using the MediaWiki API with human review.',
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
        alt="Wikidata sameAs schema.org linkage diagram closing the loop between website and knowledge graph"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
