/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { AUTHORS } from '../../authors'
import { CalloutBox, InlineCTA, StatHighlight, KeyTakeaway, InternalLink, SectionDivider, QuickQuiz } from '../../components/shared'

export const meta: BlogPostMeta = {
  slug: 'how-ai-engines-refresh-citations',
  title: 'How often do AI engines refresh their citations, the honest answer',
  metaDescription:
    'How often ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot refresh the citations they show. Refresh windows, retrieval cycles, and what this means for your AI Visibility plan.',
  tldr: 'Citation refresh windows vary by engine. Perplexity refreshes within hours to days for time-sensitive queries because it retrieves live. Bing Copilot pulls from the Bing index in near real time. Google AI Overviews refresh weekly to monthly along with the underlying Google index. ChatGPT browse mode is live, but baked-in model knowledge updates only when a new model ships, usually every six to twelve months. Claude with web search is similar. The plan is to ship updates first to live retrievers and treat baked-in knowledge as a slower compounding surface.',
  category: 'ai-visibility',
  tags: ['ai visibility', 'citations', 'refresh cycles', 'retrieval', 'ai-visibility'],
  publishedDate: '2026-04-14',
  updatedDate: '2026-04-14',
  author: AUTHORS.research,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/how-ai-engines-refresh-citations/hero.webp',
    mid: '/blog-images/how-ai-engines-refresh-citations/mid.webp',
    end: '/blog-images/how-ai-engines-refresh-citations/end.webp',
  },
  faqItems: [
    {
      question: 'How often do AI engines refresh their citations?',
      answer:
        'It depends on the engine and the query. Perplexity refreshes within hours to a few days because it retrieves live for most queries. Bing Copilot is tied to the Bing index and reflects fresh pages in near real time. Google AI Overviews refresh weekly to monthly along with the Google index. ChatGPT browse mode is live, but the baked-in model knowledge only updates when a new model ships (every six to twelve months). Claude with web search behaves like ChatGPT. Plan refreshes per engine, not as a single pipeline.',
    },
    {
      question: 'When I publish a new page, how fast can it appear in ChatGPT or Perplexity citations?',
      answer:
        'On Perplexity, a new page can be cited within hours if it is indexed by the underlying search providers and matches a high-intent query. On ChatGPT browse mode, the same page can show up the same day. On baked-in ChatGPT (no browse), the page only enters the model after the next training cut and shipped model release, typically six to twelve months. On Google AI Overviews, the new page typically shows up one to four weeks after the Google index has crawled, indexed, and weighted it.',
    },
    {
      question: 'Why does ChatGPT cite outdated information about my business?',
      answer:
        'Two reasons. First, baked-in model knowledge has a training cut date that can be twelve to twenty-four months old, so old facts (former hours, former address, former owner) persist until the next model release. Second, even with browse mode, the engine often retrieves from high-DA citations (Wikipedia, Wikidata, news pages, directory pages) instead of your own GBP, and those citations may also be stale. The fix is to update the upstream sources (Wikidata, top citations, GBP) so the next refresh pulls correct facts.',
    },
    {
      question: 'Does Bing Copilot really update faster than Google AI Overviews?',
      answer:
        'Yes for time-sensitive queries. Bing Copilot is wired tightly to the Bing index, and a fresh page indexed by Bing can be cited in Copilot within minutes. Google AI Overviews are slower because the AIO retrieval layer weights signals beyond the raw index (E-E-A-T, FAQ schema, citation graph) and the freshness signal compresses to a weekly to monthly cycle for most local queries. For breaking news or live events, Google AIO can refresh same-day, but the baseline for evergreen local queries is much slower.',
    },
    {
      question: 'Should I push refreshes to all six AI engines at once?',
      answer:
        'No. Refresh the surface that retrieves live first (your GBP, your top three citations, Wikidata if applicable, your own site), then let each engine pull at its own cadence. The order that matters is: GBP and NAP first (Perplexity, Bing Copilot, Google AIO read these), schema and FAQ second (ChatGPT, Claude, Gemini weight these), original photography and bylines third (E-E-A-T uplift across all six). Pushing to all six engines simultaneously is not a thing operators can do directly. They publish upstream, and the engines pull on their own schedule.',
    },
  ],
  relatedSlugs: ['share-of-model-metric-explained', 'why-chatgpt-cites-your-competitor', 'ai-visibility-audit-checklist-2026'],
  headings: [
    { id: 'why-refresh-cadence-varies-by-engine', text: 'Why refresh cadence varies by engine' },
    { id: 'perplexity-hours-to-days-live-retrieval', text: 'Perplexity, hours to days, live retrieval' },
    { id: 'bing-copilot-tied-to-the-bing-index', text: 'Bing Copilot, tied to the Bing index' },
    { id: 'google-ai-overviews-weekly-to-monthly', text: 'Google AI Overviews, weekly to monthly' },
    { id: 'chatgpt-browse-mode-vs-baked-in-knowledge', text: 'ChatGPT, browse mode vs baked-in knowledge' },
    { id: 'claude-and-gemini-similar-pattern', text: 'Claude and Gemini, similar pattern' },
    { id: 'how-to-time-your-publish-cadence', text: 'How to time your publish cadence' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        How often do AI engines refresh their citations is the question every operator asks once they start watching their Share of Model. The honest answer is that no single refresh cadence applies to all six engines. Perplexity retrieves live for most queries and refreshes in hours. Bing Copilot pulls from a near real-time index. Google AI Overviews compress to a weekly to monthly cycle. ChatGPT and Claude with web search are live, but their baked-in model knowledge only updates with a new model release every six to twelve months. This guide walks each engine and the publish cadence that fits the way each one pulls.
      </p>

      <StatHighlight
        stats={[
          { value: 'Hours to days', label: 'Perplexity citation refresh window' },
          { value: 'Weekly to monthly', label: 'Google AI Overviews refresh cycle for evergreen local queries' },
          { value: '6 to 12 months', label: 'ChatGPT baked-in model knowledge update cadence' },
        ]}
      />

      <SectionDivider />

      <h2 id="why-refresh-cadence-varies-by-engine">Why refresh cadence varies by engine</h2>
      <p>
        AI engines do not share one citation pipeline. Each engine combines a base model (the parameters trained on a frozen corpus) with a retrieval layer (live or semi-live access to a search index). The mix is different for each engine. Perplexity is mostly retrieval, so it is fast. ChatGPT is mostly base model with optional browse, so it is slow on baked-in knowledge and fast on browse queries. Google AIO is a base model wrapped around the Google index with extra signals layered on top, so it is medium speed. The refresh cadence you see is a function of which mix the engine uses for the specific query you asked.
      </p>
      <p>
        For an operator the practical effect is that publishing a new page does not refresh all six engines at the same time. The page must first be picked up by the underlying search index (Bing, Google, or Perplexity sources), then weighted, then surfaced. Each engine has its own pickup, weighting, and surfacing cycle.
      </p>

      <CalloutBox type="info">
        <p>The AiLys AI Visibility engine reports per-engine Share of Model precisely because each engine refreshes on its own cycle. Aggregate Share of Model is the headline number, but the per-engine breakdown tells the operator which engine is leading and which is lagging on the freshness curve. See the <InternalLink to="/glossary/share-of-model" title="Share of Model glossary entry" description="Canonical definition and per-engine reporting" /> for the full definition.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Want to see how the six engines currently cite your business and how stale the data is? Run the free 24-hour AI Visibility audit." />

      <SectionDivider />

      <h2 id="perplexity-hours-to-days-live-retrieval">Perplexity, hours to days, live retrieval</h2>
      <p>
        Perplexity is the fastest engine in the citation set. It retrieves live for most queries, weighting fresh search results from its source providers, and the citation panel below each answer reflects pages that were indexed within hours. For time-sensitive queries (today's hours, this week's event, a recent review), Perplexity can cite a page that was published the same morning. For evergreen queries, Perplexity still pulls fresh, but the high-authority pages tend to dominate, so a new page on a low-authority site may take a week or two to surface despite being indexed quickly.
      </p>
      <p>
        The practical implication is that Perplexity is the first engine to reflect fresh GBP edits, fresh review responses, and fresh blog posts. If you ship a correction to your hours or a response to a Q&A item, Perplexity is usually the first to cite the corrected version. The lag is measured in hours, not weeks.
      </p>

      <h2 id="bing-copilot-tied-to-the-bing-index">Bing Copilot, tied to the Bing index</h2>
      <p>
        Bing Copilot is wired tightly to the Bing index. A page that Bing crawls and indexes can be cited in Copilot within minutes for the right query, especially when the page matches a high-intent local search. Bing indexes the open web at a different cadence than Google: faster for some sites, slower for others. The AiLys research team has seen new directory pages cited in Copilot within an hour of indexing, and we have also seen older pages persist in Copilot answers for weeks despite being updated on the source site.
      </p>
      <p>
        For a Quebec local owner, the practical move is to verify the business on Bing Places and submit the sitemap to Bing Webmaster Tools. Without those two steps, Bing crawls slower and Copilot citations stay stale. With them, Copilot reflects updates within days.
      </p>

      <CalloutBox type="tip">
        <p>If you only have time for one Bing-side action, claim the listing on Bing Places. Copilot weights Bing Places verification when picking which business to name in a local query, and the verification step takes about ten minutes. Without it, Copilot tends to cite Yelp or directory pages instead of your own site.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="google-ai-overviews-weekly-to-monthly">Google AI Overviews, weekly to monthly</h2>
      <p>
        Google AI Overviews refresh on the same cycle as the underlying Google index for most evergreen local queries. The headline cadence is weekly to monthly. A new page that Google has crawled, indexed, and weighted can show up in AIO answers within seven to ten days for high-intent queries, and within four to six weeks for lower-volume queries. For breaking news or live events, AIO can refresh same-day, but the baseline for "best dentist near me" or "lawyer in Quebec City" is the slower weekly to monthly cycle.
      </p>
      <p>
        The slower cadence is a feature, not a bug, of the AIO retrieval design. AIO weights E-E-A-T, FAQ schema, and citation graph signals on top of the raw index, and those signals stabilize over weeks rather than hours. A page that ranks well today may not be cited in AIO for two more weeks because the citation graph weight has not caught up. Conversely, a page that AIO cites today may keep citing for two more weeks even after you have updated the page, because the weight does not drop instantly.
      </p>

      <QuickQuiz
        question="Which AI engine refreshes its citations the fastest for time-sensitive local queries?"
        options={[
          'ChatGPT baked-in mode (no browse)',
          'Perplexity, because it retrieves live from search providers in hours',
          'Google AI Overviews on the standard weekly cycle',
          'Claude with web search for niche local queries',
        ]}
        correctIndex={1}
        explanation="Perplexity retrieves live for most queries. A page indexed within the hour can be cited the same hour for the right query. ChatGPT baked-in mode is the slowest, with refresh cadence tied to model release every six to twelve months. Google AIO runs on a weekly to monthly cycle for evergreen local queries. Claude with web search behaves like ChatGPT browse mode, fast for the live retrieval part and slow for the baked-in part."
      />

      <SectionDivider />

      <h2 id="chatgpt-browse-mode-vs-baked-in-knowledge">ChatGPT, browse mode vs baked-in knowledge</h2>
      <p>
        ChatGPT has two retrieval modes that refresh on completely different timescales. Browse mode is live retrieval, similar to Perplexity, and a fresh page can be cited within hours. Baked-in knowledge is the model's training corpus, frozen at a training cut date, and only refreshed when a new model ships. The cadence between model releases for the major providers is six to twelve months, and the training cut is typically three to nine months before the release date. So a fact about your business that persists in ChatGPT's baked-in knowledge could be twelve to twenty-four months old.
      </p>
      <p>
        The practical implication is that a single ChatGPT answer may mix fresh browse-retrieved facts with stale baked-in facts. Operators see this as ChatGPT citing your current website (browse) while quoting your old hours (baked-in) in the same response. The fix is to keep the upstream citation graph fresh (Wikidata, GBP, top citations) so the next training pass picks up the corrected facts, and to make sure your site is structured for browse retrieval (clear FAQ, schema, fresh updates).
      </p>

      <img
        src={meta.images.mid}
        alt="Timeline comparing live retrieval refresh cycles versus baked-in model knowledge update windows"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <CalloutBox type="warning">
        <p>If a baked-in fact is wrong (former hours, former address, former owner name), the only way to fix it is to update the upstream sources (Wikidata, GBP, top three citations) and wait for the next model release. There is no API to ask ChatGPT or Claude to forget a fact. The lag is real, and the only honest plan is to update the sources and wait.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="claude-and-gemini-similar-pattern">Claude and Gemini, similar pattern</h2>
      <p>
        Claude with web search behaves much like ChatGPT browse mode for the live retrieval part. A fresh page can be cited within hours when Claude pulls from web search. The baked-in knowledge updates with each model release, on a similar six to twelve month cadence. Claude tends to weight first-hand experience markers (author bylines, methodology pages, original photography) more heavily than the other engines, so freshness of those signals matters as much as freshness of the page itself.
      </p>
      <p>
        Gemini is tied to the Google ecosystem and tends to refresh on a cadence that mirrors Google AIO for retrieval, with baked-in knowledge updating with each Gemini release. For local queries, Gemini's freshness profile sits between Perplexity (very fast) and ChatGPT baked-in (very slow), closer to the Google AIO end of the spectrum.
      </p>

      <InlineCTA variant="pricing" text="The AiLys AI Visibility engine probes all six engines on a 30-day rolling window, so per-engine refresh windows are visible in the report. See the four AiLys tiers from 300 dollars CAD a month." />

      <SectionDivider />

      <h2 id="how-to-time-your-publish-cadence">How to time your publish cadence</h2>
      <p>
        Knowing the per-engine refresh windows changes how an operator times publish work. The order that matches the way the engines pull is:
      </p>

      <ol>
        <li>Update GBP first. Hours, address, attributes, photos. Perplexity, Google AIO, and Bing Copilot read GBP heavily, and the refresh shows up within days.</li>
        <li>Update top three citations second. Yelp, Yellow Pages Canada, industry-specific directories. These feed Wikidata weight and the citation graph, which lifts the slower engines (ChatGPT, Claude) over the next training cycle.</li>
        <li>Ship FAQ and schema third. FAQPage, Service, Person with credentials. ChatGPT and Claude weight schema heavily for browse-mode retrieval, so updates show up within a few weeks.</li>
        <li>Ship original photography and bylines fourth. These are E-E-A-T signals that Google AIO and Claude weight over months. The lift is slow and compounds.</li>
      </ol>

      <p>
        The mistake is treating publish work as a one-time push. The right model is rolling refreshes per engine. GBP gets a quarterly check, citations get a monthly audit, schema gets reviewed when site structure changes, and original photography ships in batches throughout the year. The <InternalLink to="/audit" title="Free 24-hour AI Visibility audit" description="Per-engine baseline and refresh cadence" /> deliverable shows where each engine currently sits and how stale each one is, so the operator can prioritize the next refresh by engine, not by guess.
      </p>
      <p>
        For the deeper definition of the metric used to measure these refreshes, the <InternalLink to="/blog/share-of-model-metric-explained" title="Share of Model metric, explained" description="The citation share metric for AI search" /> guide walks the formula and the per-engine reporting cadence.
      </p>

      <InlineCTA variant="book" text="Want a 60-minute walkthrough of how each of the six engines currently cites your business, and which refresh to push first? No pitch, strategy doc sent regardless." />

      <SectionDivider />

      <KeyTakeaway
        points={[
          'Perplexity refreshes citations within hours to days because it retrieves live from search providers.',
          'Bing Copilot is tied to the Bing index and reflects fresh pages in near real time once Bing has crawled them.',
          'Google AI Overviews refresh on a weekly to monthly cycle for evergreen local queries, faster for breaking news.',
          'ChatGPT browse mode is live, but baked-in model knowledge only updates with each new model release, on a six to twelve month cadence.',
          'The right plan is rolling refreshes per engine, starting with GBP and top citations, then schema, then original photography.',
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
        alt="Refresh cadence summary showing per-engine windows from hours to twelve months on a single timeline"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
