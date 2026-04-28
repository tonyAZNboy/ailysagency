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
  slug: 'claude-search-citations-explained',
  title: 'How Claude search picks citations, the local owner playbook',
  metaDescription:
    'How Claude search reads the open web and picks citations. What earns a citation: structured FAQ schema, named author bylines, recent dates, NAP consistency. Local owner steps.',
  tldr: 'Claude search reads the open web with a structured-data-first bias. It cites pages that ship clean FAQ schema, a citation-friendly H2 and H3 hierarchy, original primary research, recent published or updated dates, named author bylines with credentials, and consistent NAP for local entities. The fastest path for a local owner is to fix the schema layer, add real authorship, refresh dates on evergreen pages, and align the NAP across the citation graph.',
  category: 'ai-visibility',
  tags: ['claude', 'ai search', 'citations', 'ai-visibility', 'schema', 'authorship'],
  publishedDate: '2026-03-11',
  updatedDate: '2026-03-11',
  author: AUTHORS.research,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/claude-search-citations-explained/hero.webp',
    mid: '/blog-images/claude-search-citations-explained/mid.webp',
    end: '/blog-images/claude-search-citations-explained/end.webp',
  },
  faqItems: [
    {
      question: 'How do I earn citations inside Claude search results?',
      answer:
        'Claude search cites pages with structured FAQ schema, a clear H2 and H3 hierarchy, original primary research, recent published or updated dates, named author bylines with credentials, and consistent NAP for local entities. The practical path is to ship FAQ and HowTo schema on the page, add a real author byline with a link to a bio, refresh the updated date when content changes, and make sure the business name, address, and phone match across the citation graph.',
    },
    {
      question: 'Does Claude search prefer recent content or evergreen content?',
      answer:
        'Both, but the date signal carries weight. A page with a clear publishedDate and a maintained dateModified beats a page with no dates at all, even when the underlying content is similar. For evergreen pages, the practical move is to ship a real updated date when the content is reviewed, not a fake bump. Claude search reads the schema and the visible date, and inconsistencies between the two reduce trust.',
    },
    {
      question: 'How important is FAQ schema for Claude search citations?',
      answer:
        'Very important. Structured FAQ schema gives Claude search clean question-answer pairs that it can extract directly. The questions should be real long-tail searches and the answers should be self-contained 40-90 word paragraphs that read well outside the page. Pages without FAQ schema can still earn citations, but the rate at which they do drops noticeably compared to pages that ship the schema correctly.',
    },
    {
      question: 'Does the author byline matter for Claude search?',
      answer:
        'Yes. A named author with a real bio, credentials, and a link from the byline back to a bio page earns more citations than a generic "Admin" or no byline. The author signal compounds with topical consistency, so a single author writing many pages on the same domain in one topic tends to rank better than a rotating cast of contributors with no topical anchor. This mirrors the E-E-A-T signal in classic search.',
    },
    {
      question: 'What role does NAP consistency play for local Claude search citations?',
      answer:
        'For local queries, Claude search cross-references the brand name, address, and phone across the citation graph. When the NAP matches across Google Business Profile, the website, the schema, Wikidata, and the top citation directories, the entity is easier to disambiguate and the citation rate climbs. When the NAP drifts (different phone numbers, address abbreviations, suite versus unit), citations drop because the engine cannot confidently merge the records.',
    },
    {
      question: 'Where can I read Anthropic\'s public guidance on Claude and the web?',
      answer:
        'Anthropic publishes public guidance and product updates on its news blog. The page covers product launches, web reading behavior, and policy updates. The blog is the canonical source for any operator who wants the official position on what Claude does with the open web rather than third-party guesses.',
    },
  ],
  relatedSlugs: ['why-chatgpt-cites-your-competitor', 'perplexity-citations-30-day-playbook'],
  headings: [
    { id: 'what-claude-search-actually-reads', text: 'What Claude search actually reads' },
    { id: 'structured-faq-schema-the-fastest-lever', text: 'Structured FAQ schema, the fastest lever' },
    { id: 'h2-and-h3-hierarchy-for-citation-extraction', text: 'H2 and H3 hierarchy for citation extraction' },
    { id: 'original-primary-research-and-dates', text: 'Original primary research and dates' },
    { id: 'named-author-bylines-and-credentials', text: 'Named author bylines and credentials' },
    { id: 'nap-consistency-for-local-entities', text: 'NAP consistency for local entities' },
    { id: 'a-30-day-citation-plan-for-claude-search', text: 'A 30-day citation plan for Claude search' },
    { id: 'common-mistakes-that-cost-citations', text: 'Common mistakes that cost citations' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        Claude search reads the open web with a structured-data-first bias and pulls citations from pages that make extraction easy. Local owners ask the same question every week. How do I earn citations inside Claude search results? The honest answer has six layers: structured FAQ schema, a citation-friendly H2 and H3 hierarchy, original primary research, recent published or updated dates, named author bylines, and NAP consistency for local entities. This page walks each layer with the practical steps a local owner can ship in a month.
      </p>

      <StatHighlight
        stats={[
          { value: '6 layers', label: 'Signals Claude search weighs for citations' },
          { value: '40 to 90 words', label: 'Ideal FAQ answer length for extraction' },
          { value: 'Named author', label: 'Required for E-E-A-T signal alignment' },
        ]}
      />

      <SectionDivider />

      <h2 id="what-claude-search-actually-reads">What Claude search actually reads</h2>
      <p>
        Claude is a public AI product from Anthropic, and Claude search is the family of features that retrieves information from the open web to answer user questions. When Claude pulls a citation, it weighs the page for clarity of structure (schema), authority of source (author and publisher), recency (dates), and entity disambiguation (NAP for local queries). The engine prefers pages that already shipped the data it needs in machine-readable form rather than pages it has to interpret blind.
      </p>
      <p>
        Anthropic publishes public guidance about how Claude reads the web on its company news blog. The honest read is that Claude follows the same broad principles as the other AI engines (ChatGPT, Perplexity, Gemini, Google AIO, Bing Copilot) with its own weighting on author trust and structured data. For any operator who wants the official position, the canonical source is the Anthropic news page at <a href="https://anthropic.com/news/" rel="noopener" target="_blank">anthropic.com/news</a>. For the cross-engine view, see the <InternalLink to="/blog/why-chatgpt-cites-your-competitor" title="Why ChatGPT cites your competitor" description="The cross-engine citation lens" /> playbook.
      </p>

      <CalloutBox type="info">
        <p>This page is about Claude as a public product that local owners want to be cited inside. It is not a technical disclosure of which engines power the AiLys platform. The AiLys AI Visibility engine probes Claude search the same way it probes ChatGPT, Perplexity, Gemini, Google AIO, and Bing Copilot, and reports citation share back to the dashboard.</p>
      </CalloutBox>

      <InlineCTA variant="audit" />

      <SectionDivider />

      <h2 id="structured-faq-schema-the-fastest-lever">Structured FAQ schema, the fastest lever</h2>
      <p>
        FAQ schema is the single fastest lever a local owner can ship to start earning citations in Claude search. The mechanism is simple. Claude reads JSON-LD FAQPage schema and extracts the question and answer pairs cleanly, which means a page with five well-written FAQ entries can earn five different citation surfaces for five different long-tail queries.
      </p>
      <p>
        The questions inside the schema should be real long-tail searches that operators or patients ask, not invented marketing copy. The answers should be self-contained 40 to 90 word paragraphs that read well outside the page, because the AI engine often quotes the answer verbatim. Pad the answer with adjectives or marketing language and the citation rate drops. Write it like a knowledgeable colleague answering a colleague.
      </p>

      <h3>FAQ entry quality checklist</h3>
      <ul>
        <li>Real long-tail question that maps to a search query, not a slogan</li>
        <li>Answer of 40 to 90 words that reads as a complete unit</li>
        <li>Brand name spelled in Latin script, NAP consistent with the site</li>
        <li>Internal link from the answer to a deeper page when relevant</li>
        <li>JSON-LD validated through the Schema.org Rich Results Test</li>
      </ul>

      <SectionDivider />

      <h2 id="h2-and-h3-hierarchy-for-citation-extraction">H2 and H3 hierarchy for citation extraction</h2>
      <p>
        Claude search uses the H2 and H3 hierarchy as a navigational map of the page. A page with seven well-named H2 sections and a few H3 sub-sections under each is more likely to earn a citation than a wall of text with no anchor structure. The reason is mechanical: when the engine extracts a snippet, it grabs the section near the matching H2 header and lifts the lead paragraph from that section.
      </p>
      <p>
        The practical move is to write each H2 as a question or a definitional statement, then have the first paragraph of that section answer the question in 40 to 60 words. That structure mirrors how Claude search wants to extract content, and it is exactly the structure that already wins featured snippets in classic Google search. The two rankings reinforce each other.
      </p>

      <CalloutBox type="tip">
        <p>If you have a page that ranks well in Google but never earns AI citations, audit the H2 hierarchy first. Pages with three H2s and 800 words of dense prose under each rarely earn citations even when they rank position one. Break the prose under each H2 into a lead 40-60 word answer paragraph, then supporting paragraphs, then a closing paragraph. The same content, restructured, often unlocks AI citations within weeks.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" text="See the AiLys tier matrix to find the plan that includes AEO schema and weekly LLM citation tracking." />

      <SectionDivider />

      <h2 id="original-primary-research-and-dates">Original primary research and dates</h2>
      <p>
        Claude search prefers original primary research over restated industry consensus. A clinic that publishes its own intake survey results, a law office that publishes its own win-rate methodology, or a restaurant that publishes its own seasonal menu sourcing is more citable than one that paraphrases industry studies. The reason is that the engine detects originality through phrase rarity and citation graph reach, and original work surfaces both.
      </p>
      <p>
        Dates carry weight too. A page with a visible published date and a maintained updated date beats a page with no dates at all, even when the content is similar. The updated date should be honest. If the content was reviewed and re-stamped without changes, the engine eventually catches the pattern and discounts the signal. Local owners win on dates by reviewing each evergreen page once per quarter and shipping a real change when something has shifted (price, team, scope, regulation).
      </p>

      <QuickQuiz
        question="Which of these signals does Claude search weigh most heavily for evergreen content?"
        options={[
          'Word count above 3,000 words',
          'A maintained updated date with real content changes',
          'Number of internal links pointing into the page',
          'Inclusion of stock images near the headline',
        ]}
        correctIndex={1}
        explanation="A maintained updated date with real content changes is the strongest single signal for evergreen content. Claude search reads the visible date and the schema dateModified together. When both are honest and recent, the page outranks longer, link-rich, or image-rich pages that have not been touched in a year."
      />

      <h2 id="named-author-bylines-and-credentials">Named author bylines and credentials</h2>
      <p>
        Named author bylines compound the citation signal. A page authored by Dr. Marie Tremblay (Family Physician, College Number 12345) with a link to a real bio page is more citable than a page authored by "Admin" or with no byline. The mechanism is the same E-E-A-T signal that classic search uses, and Claude search reads it the same way: experience, expertise, authoritativeness, trust.
      </p>
      <p>
        The structural move on the website is to ship a Person schema for the author, link the byline to a bio page that lists credentials and prior writing, and keep the topical scope of any one author tight. A single author writing twenty pages on the same topic on the same domain compounds authority faster than twenty different authors writing one page each on twenty topics. This is true in classic SEO and it is doubly true in AI search.
      </p>

      <CalloutBox type="warning">
        <p>Generic "Editorial Team" or "Admin" bylines are a common mistake on agency-built sites. They cost citation share. The fix is one of two paths: name the real human who wrote each page (preferred), or attribute the post to a defined editorial team with its own published bio page that lists the human members and their credentials. The second path is acceptable when the brand is institutional, but the first path always wins on AI citations.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="nap-consistency-for-local-entities">NAP consistency for local entities</h2>
      <p>
        For local queries, Claude search cross-references the brand name, address, and phone across the open web. When the NAP matches across Google Business Profile, the website, the schema, Wikidata, and the top citation directories, the entity is easy to merge into a single record. When the NAP drifts (different phone numbers, suite versus unit, abbreviated city names), the engine cannot confidently disambiguate and citations drop.
      </p>
      <p>
        The fix is a NAP audit across the citation graph. The top sources to align are GBP, the website footer and contact page, the LocalBusiness or MedicalBusiness schema, Wikidata, and the top ten directories for the local market. AiLys ships this audit at every paid tier, with the citation cleanup escalating in volume from Starter to Growth. See the <InternalLink to="/blog/nap-consistency-audit-quebec" title="NAP consistency audit for Quebec" description="Step-by-step audit across the local citation graph" /> playbook for the practical steps.
      </p>

      <SectionDivider />

      <h2 id="a-30-day-citation-plan-for-claude-search">A 30-day citation plan for Claude search</h2>
      <p>
        A local owner can ship a meaningful Claude search citation lift in 30 days by sequencing the work right. Week one, audit the FAQ schema and ship FAQPage JSON-LD on the top five pages. Week two, restructure the H2 and H3 hierarchy on those same pages and write a 40 to 60 word lead paragraph under each H2. Week three, ship a real author byline with a Person schema and a bio page. Week four, run the NAP audit across the citation graph and fix the drift on the top ten sources.
      </p>
      <p>
        This sequence covers all six signals Claude search weighs. The first lift typically lands inside two to four weeks for a single-location operator with a clean technical baseline. For multi-location or for sites with deep technical debt, the timeline stretches to two or three months. The free <InternalLink to="/audit" title="Free 24-hour AI Visibility audit" description="Citation share baseline across the major AI engines" /> reports the baseline before the work starts.
      </p>

      <InlineCTA variant="book" text="Want a 30-minute call to map the 30-day Claude search citation plan to your top pages, no pitch?" />

      <SectionDivider />

      <h2 id="common-mistakes-that-cost-citations">Common mistakes that cost citations</h2>
      <p>
        Three patterns cost citations more than any other. First, copying FAQ entries from a competitor or from a generic template. Claude search detects duplicate language across the citation graph and discounts both copies. The fix is to write FAQ entries from real client questions, not templates.
      </p>
      <p>
        Second, fake updated dates. Bumping the dateModified without changing the content is a short-term win that the engine eventually penalizes. The fix is to review each evergreen page once per quarter and ship a real change when something has shifted. Third, generic bylines. "Admin" and "Editorial Team" without a published team bio cost real citation share. The fix is a named human author with a real bio.
      </p>

      <SectionDivider />

      <KeyTakeaway
        points={[
          'Claude search weighs six layers: FAQ schema, H2/H3 hierarchy, original research, dates, named author, and NAP consistency.',
          'FAQ schema is the single fastest lever. Real long-tail questions, 40 to 90 word self-contained answers.',
          'Each H2 should be a question or definitional statement, with a 40 to 60 word lead answer paragraph.',
          'Original primary research and honest updated dates beat paraphrased industry consensus and stale evergreen pages.',
          'For local queries, align NAP across GBP, website, schema, Wikidata, and the top citation directories.',
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
        alt="30-day citation plan timeline showing FAQ schema, H2 hierarchy, author byline, and NAP audit phases for Claude search"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
