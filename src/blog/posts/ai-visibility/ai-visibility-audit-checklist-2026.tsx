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
  slug: 'ai-visibility-audit-checklist-2026',
  title: 'AI Visibility audit checklist for local businesses in 2026',
  metaDescription:
    'A full AI Visibility audit checklist for 2026. Score your business across ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot in 24 hours.',
  tldr:
    'Run a full AI Visibility audit by scoring your brand across six AI engines, mapping share-of-model versus your top three competitors, then fixing schema gaps, citation deserts, and GBP attribute holes. The AiLys engine returns a 24-hour scorecard. Most local businesses start at 0 of 6 cited and reach 4 of 6 inside 90 days.',
  category: 'ai-visibility',
  tags: ['ai-visibility', 'audit', 'checklist', 'share-of-model', 'aeo', 'geo'],
  publishedDate: '2026-02-01',
  updatedDate: '2026-02-01',
  author: AUTHORS.research,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/ai-visibility-audit-checklist-2026/hero.webp',
    mid: '/blog-images/ai-visibility-audit-checklist-2026/mid.webp',
    end: '/blog-images/ai-visibility-audit-checklist-2026/end.webp',
  },
  faqItems: [
    {
      question: 'How do I run a full AI Visibility audit on my business?',
      answer:
        'Pick a fixed prompt set (10 to 15 buyer questions), run each prompt across ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot, and record whether your brand surfaces in the answer or the source list. Then compare against your top three local competitors. The AiLys AI Visibility audit automates this and returns a scorecard inside 24 hours, including share-of-model and the top three fixes.',
    },
    {
      question: 'What is share-of-model and why does it matter for local SEO?',
      answer:
        'Share-of-model is the percentage of buyer-intent prompts where an AI engine names your brand. If five of ten relevant prompts surface your business inside ChatGPT, your share-of-model on ChatGPT is 50 percent. It matters because the AI answer is increasingly the only result a buyer reads. A high local pack ranking that loses share-of-model still loses the booking.',
    },
    {
      question: 'How often should I re-run the AI Visibility audit?',
      answer:
        'Monthly at a minimum. AI engines re-train and re-index on different cadences, so a January score is not a March score. Local owners on the AiLys Core tier and up get monthly re-audits and a delta report. If you only audit twice a year, you will miss the 60-day window where a competitor publishes a citation-bait piece and steals your share-of-model on Perplexity.',
    },
    {
      question: 'Which AI engines should a Quebec local business audit first?',
      answer:
        'Audit ChatGPT, Perplexity, and Google AIO first. ChatGPT drives the largest absolute volume of buyer-intent prompts. Perplexity is the easiest to crack because it weighs recency and source diversity over raw domain authority. Google AIO ships inside the same SERP your customers already use. Once those three are stable, add Claude, Gemini, and Bing Copilot for full coverage.',
    },
    {
      question: 'Can I run an AI Visibility audit myself without paid tools?',
      answer:
        'Yes, the manual version takes about six hours per audit. Build a 12-prompt buyer set, run each prompt by hand on the six engines, log whether your brand appears, and compare against three competitors. The cost is your time. The AiLys engine compresses that to a 24-hour automated scorecard for $300 per month at the Starter tier, with monthly re-runs and competitor deltas baked in.',
    },
  ],
  relatedSlugs: [],
  headings: [
    { id: 'why-ai-visibility-audits-replaced-rank-tracking', text: 'Why AI Visibility audits replaced rank tracking' },
    { id: 'the-six-engines-that-actually-matter-in-2026', text: 'The six engines that actually matter in 2026' },
    { id: 'build-the-prompt-set-the-audit-stands-on', text: 'Build the prompt set the audit stands on' },
    { id: 'score-share-of-model-against-three-competitors', text: 'Score share-of-model against three competitors' },
    { id: 'find-the-schema-citation-and-gbp-gaps', text: 'Find the schema, citation, and GBP gaps' },
    { id: 'fix-the-top-three-leaks-first', text: 'Fix the top three leaks first' },
    { id: 'set-the-monthly-re-audit-cadence', text: 'Set the monthly re-audit cadence' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        To run a full AI Visibility audit on your business, build a 12-prompt buyer set, run each prompt across ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot, log whether your brand appears, and compare the result against your top three local competitors. The AiLys AI Visibility audit automates the run and returns a scorecard with share-of-model, schema gaps, and the top three fixes inside 24 hours.
      </p>

      <StatHighlight
        stats={[
          { value: '6 engines', label: 'ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot' },
          { value: '24 hours', label: 'AiLys audit turnaround' },
          { value: '$300/mo', label: 'Starter tier with monthly re-audit' },
        ]}
      />

      <SectionDivider />

      <h2 id="why-ai-visibility-audits-replaced-rank-tracking">Why AI Visibility audits replaced rank tracking</h2>
      <p>
        Rank tracking measured a thing that mattered for two decades. The blue link list. A buyer typed a query, scanned ten organic results plus a local pack, and clicked. Position three was a real prize. AI engines broke that surface. Inside ChatGPT, Perplexity, and Google AIO, the answer is the page. There are no ten blue links. There is one answer with three or four named sources, and the buyer often acts before clicking through.
      </p>
      <p>
        That is why AI Visibility audits exist. The metric you need is not "where do I rank for ramen near me." It is "when a buyer asks ChatGPT for the best ramen in Plateau, does the answer name my restaurant." The first metric is solved with classic SEO and a GBP. The second is solved with structured data, citation diversity, and a measurable share-of-model across all six engines.
      </p>
      <p>
        See the <InternalLink to="/glossary/share-of-model" title="Share-of-model glossary entry" /> for the full definition. The short version: share-of-model is the percentage of buyer-intent prompts where an engine names your brand. It is the new map pack ranking.
      </p>

      <h2 id="the-six-engines-that-actually-matter-in-2026">The six engines that actually matter in 2026</h2>
      <p>
        A complete audit covers six engines. ChatGPT and Google AIO drive the largest buyer volume. Perplexity drives the cleanest citations because it weighs source diversity and recency. Claude and Gemini cover the smaller-but-growing assistant market. Bing Copilot covers B2B and Microsoft-ecosystem buyers who never leave Edge or Outlook.
      </p>
      <ol>
        <li><strong>ChatGPT</strong>. Highest volume, weights domain authority and historical content depth.</li>
        <li><strong>Perplexity</strong>. Most attainable, weights recency, source diversity, structured data.</li>
        <li><strong>Google AIO</strong>. Same SERP as classic search, weights GBP completeness and FAQ schema.</li>
        <li><strong>Claude</strong>. Smaller volume, weights long-form expertise and explicit citations.</li>
        <li><strong>Gemini</strong>. Tied to Google account context, weights local pack signals heavily.</li>
        <li><strong>Bing Copilot</strong>. B2B-leaning, weights LinkedIn presence and structured data on the source page.</li>
      </ol>
      <p>
        Skipping any one of the six creates a blind spot. The most common failure we see is a client who tracks ChatGPT only, then loses three months of buyers to a competitor who landed Perplexity citations.
      </p>

      <SectionDivider />

      <CalloutBox type="tip">
        <p>The fastest engine to crack is Perplexity. Most local businesses can earn their first Perplexity citation inside 30 days with clean schema, a fresh "current state" article, and three diverse third-party references. Start there if you only have one month of audit budget.</p>
      </CalloutBox>

      <h2 id="build-the-prompt-set-the-audit-stands-on">Build the prompt set the audit stands on</h2>
      <p>
        The audit is only as good as the prompts. Most owners draft prompts that look like keywords, "best dentist Montreal," and miss the way buyers actually phrase questions to AI engines. AI prompts are conversational, longer, and contain context the buyer never typed into Google.
      </p>
      <p>
        Build twelve prompts across three categories. Four discovery prompts ("who are the best X in Y for Z," where Z is a constraint like "open Sundays" or "accepts Medicare"). Four comparison prompts ("compare A vs B for someone who needs C"). Four trust prompts ("is X reliable for Y," "what do customers say about X"). Run each prompt fresh in each engine, never logged in to your own brand accounts, ideally from a clean browser profile.
      </p>
      <p>
        Record three things per prompt: did the brand appear in the answer text, did it appear in the source list, and did the answer name a competitor instead. The competitor field is the one most owners forget, and it is the one that drives the fix list.
      </p>

      <CalloutBox type="info">
        <p>An AI prompt is not a keyword. A prompt is a conversational question with embedded constraints. "Best dentist Montreal" is a keyword. "Who is a good family dentist in NDG that takes RAMQ and is open Saturdays" is a prompt. The audit only works when your set sounds like the second example, not the first.</p>
      </CalloutBox>

      <QuickQuiz
        question="Which engine is usually the fastest for a local Quebec business to crack first?"
        options={[
          'ChatGPT, because of raw volume',
          'Perplexity, because it weights recency and source diversity',
          'Bing Copilot, because of LinkedIn signal',
          'Gemini, because of Google account context',
        ]}
        correctIndex={1}
        explanation="Perplexity weights recency and source diversity over raw domain authority, so a clean schema deploy plus three diverse third-party citations can land a first citation inside 30 days. ChatGPT has higher volume but takes longer to crack because it leans on historical authority."
      />

      <SectionDivider />

      <h2 id="score-share-of-model-against-three-competitors">Score share-of-model against three competitors</h2>
      <p>
        Pick three local competitors. Not national giants. Local. The clinic two blocks over, the law firm in the same complex, the resto that took your Friday night reservations last quarter. Run the same twelve prompts for each competitor brand and log the same three fields. You now have four scorecards.
      </p>
      <p>
        Calculate share-of-model per engine. If your brand is named in five of twelve ChatGPT answers, your ChatGPT share-of-model is 42 percent. If competitor A is named in eight of twelve, A is at 67 percent. The gap, 25 points, is the budget for the next 90 days. Repeat per engine. The total picture across all six engines is your AI Visibility score.
      </p>
      <p>
        The AiLys audit produces this scorecard automatically. If you prefer the manual route, the spreadsheet template inside our <InternalLink to="/audit" title="Run a free AI Visibility audit" /> page walks through the math.
      </p>

      <CalloutBox type="warning">
        <p>Do not score on raw mention count. Score on share-of-model. A competitor mentioned in 8 of 12 answers has 67 percent share-of-model. A competitor mentioned in 8 of 30 answers has 27 percent. Same absolute count, very different reality.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" />

      <SectionDivider />

      <h2 id="find-the-schema-citation-and-gbp-gaps">Find the schema, citation, and GBP gaps</h2>
      <p>
        Once you know the gap, you need to know why. Three diagnostic checks cover most of it. First, schema. Run your top five buyer-intent pages through Schema.org validators. Confirm LocalBusiness, FAQPage, Service, and Review schema all parse cleanly. Missing schema is the most common reason ChatGPT and Perplexity skip a brand entirely.
      </p>
      <p>
        Second, citations. Pull your NAP citation count and compare with the competitors. If your top competitor has 80 directory citations and you have 22, the engines see a quieter signal for your brand and weight it lower. The fix is monthly citation building, which AiLys ships at two per month at Starter, four at Core, six at Growth, eight at Agency (max per domain).
      </p>
      <p>
        Third, GBP. Most "missing from AI answers" diagnoses trace back to a GBP attribute that was never filled. Categories, dietary tags, payment methods, accessibility, hours of operation. Google AIO and Gemini both pull from this layer. See our <InternalLink to="/audit/gbp" title="GBP audit deep dive" description="Full GBP attribute checklist for Quebec local businesses" /> for the full attribute checklist.
      </p>

      <SectionDivider />

      <h2 id="fix-the-top-three-leaks-first">Fix the top three leaks first</h2>
      <p>
        Pick the three highest-impact gaps and ship them in the first 30 days. The audit will identify more than three. Resist the urge to fix all of them. The pattern that works is concentrate, ship, measure, then expand. A typical 30-day fix pack looks like this. Deploy LocalBusiness plus FAQPage schema across the top five pages. Earn three Perplexity-grade citations from diverse sources, ideally a city-level subreddit, a regional industry directory, and a press mention. Fill every relevant GBP attribute, including the dietary, accessibility, and payment subsets.
      </p>
      <p>
        At day 30, re-run the prompt set. Most clients move from 1 of 6 engines cited to 3 of 6 inside the first month. From there, the second 30 days addresses Claude and Gemini, the third 30 days handles Bing Copilot and the long tail of secondary prompts.
      </p>

      <InlineCTA variant="audit" />

      <InternalLink to="/glossary/aeo" title="AEO definition" description="Answer Engine Optimization, the discipline behind every AI Visibility audit" />

      <SectionDivider />

      <h2 id="set-the-monthly-re-audit-cadence">Set the monthly re-audit cadence</h2>
      <p>
        AI engines re-index on different schedules and your competitors keep moving. A January score does not survive March without maintenance. Set a monthly re-audit cadence with a fixed prompt set so the deltas are real, not artifacts of new prompts. The AiLys Core tier ships this re-audit on the first of every month, with a delta report and the next three fixes.
      </p>
      <p>
        Owners who skip the monthly cadence usually lose ground inside 90 days, not because they regressed, but because a competitor noticed the same thing and shipped two citation-bait articles. Share-of-model is competitive. The audit is a habit, not a one-time exercise.
      </p>

      <KeyTakeaway
        points={[
          'Score across six engines: ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot.',
          'Use a fixed 12-prompt buyer set, never logged in to your own brand accounts.',
          'Calculate share-of-model per engine, then compare against three local competitors.',
          'Diagnose with three checks: schema validation, citation count delta, GBP attribute completeness.',
          'Fix the top three leaks first, then re-audit monthly with the same prompt set.',
        ]}
      />

      <SectionDivider />

      <h2 id="faq">Frequently Asked Questions</h2>
      <p>
        For the bilingual FR-CA version of this guide, see the same audit checklist on our <InternalLink to="/fr/blog/ai-visibility-audit-checklist-2026" title="Liste de vérification de l'audit AI Visibility pour 2026" /> page. Ready to run the actual audit on your business? The free version returns inside 24 hours.
      </p>
      <InlineCTA variant="book" />
    </article>
  )
}
