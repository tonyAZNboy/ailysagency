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
} from '../../components/shared'

export const meta: BlogPostMeta = {
  slug: 'share-of-model-metric-explained',
  title: 'Share of Model explained, the metric for AI search visibility',
  metaDescription:
    'Share of Model is the citation share metric for AI search. Here is the precise definition, the measurement method, and how AiLys reports it across six AI engines.',
  tldr: 'Share of Model is the percentage of AI engine answers that name your business for a defined query set over a defined period. AiLys measures it by running probes across six named AI engines, counting citations per engine, dividing total citations by total probes for the period, and reporting per-engine and aggregate scores.',
  category: 'ai-visibility',
  tags: ['share of model', 'ai visibility', 'measurement', 'metric', 'ai-visibility'],
  publishedDate: '2026-02-21',
  updatedDate: '2026-02-21',
  author: AUTHORS.research,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/share-of-model-metric-explained/hero.svg',
    mid: '/blog-images/share-of-model-metric-explained/mid.svg',
    end: '/blog-images/share-of-model-metric-explained/end.svg',
  },
  faqItems: [
    {
      question: 'What is share of model and how do I measure it?',
      answer:
        'Share of Model is the percentage of AI engine answers that cite your business for a defined query set over a defined period. The AiLys AI Visibility engine runs probes against six named AI engines (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot), counts citations per engine for your query set, divides total citations by total probes, and reports both per-engine and aggregate scores. Most local businesses start near zero and lift to 5 to 15 percent over a quarter.',
    },
    {
      question: 'How is Share of Model different from share of voice or share of search?',
      answer:
        'Share of voice measures media mentions across press and social. Share of search measures the volume of branded searches against the category baseline on classic search engines. Share of Model measures named citations inside generative AI answers. The three metrics correlate over time but track different surfaces. AI engines retrieve from a citation graph that is partly built from share of voice and share of search inputs, but the output metric is different.',
    },
    {
      question: 'How many probes are needed for a stable Share of Model number?',
      answer:
        'For a 30-day reporting window, AiLys runs at least 30 probes per engine per query set, so a five-query set against six engines is 900 probes a month minimum. Smaller probe counts produce noisy numbers that move from 0 percent to 20 percent based on temperature variance in the underlying engines. The 30-probe-per-engine floor is what stabilizes the rolling average inside two reporting points of variance.',
    },
    {
      question: 'Which AI engines are included in the Share of Model calculation?',
      answer:
        'AiLys reports Share of Model across six named engines: ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot. The aggregate is a simple average across the six per-engine scores, not a weighted average, because traffic share between engines varies by industry and weighting introduces a layer of debate that the simple average avoids. Per-engine scores are also reported so the operator can see which engine is leading or lagging.',
    },
    {
      question: 'How fast can I lift my Share of Model from zero?',
      answer:
        'A clean stack lift typically shows two waves. Wave one is around week 4 from GBP and NAP cleanup, lifting Share of Model by roughly 3 to 5 percentage points. Wave two is around week 10 from schema, FAQ, and original photography, lifting another 5 to 10 percentage points. By the end of a 90-day plan, most local businesses sit between 8 and 18 percent Share of Model on their core query set. The category leader sits at 30 percent or higher.',
    },
  ],
  relatedSlugs: ['why-chatgpt-cites-your-competitor', 'aeo-geo-eeat-explained-for-local-owners', 'medical-clinic-ai-visibility-guide'],
  headings: [
    { id: 'what-share-of-model-actually-measures', text: 'What Share of Model actually measures' },
    { id: 'how-the-ailys-engine-calculates-it', text: 'How the AiLys engine calculates it' },
    { id: 'the-formula-step-by-step', text: 'The formula, step by step' },
    { id: 'how-many-probes-do-you-need', text: 'How many probes do you need' },
    { id: 'reading-per-engine-vs-aggregate', text: 'Reading per-engine vs aggregate scores' },
    { id: 'share-of-model-vs-share-of-voice-vs-share-of-search', text: 'Share of Model vs share of voice vs share of search' },
    { id: 'how-to-lift-share-of-model-from-zero', text: 'How to lift Share of Model from zero' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <img
        src={meta.images.hero}
        alt="AiLys dashboard showing Share of Model scores across six AI engines for a Quebec local business"
        className="w-full rounded-xl my-6"
        loading="eager"
      />

      <p>
        Share of Model is the metric AiLys uses to quantify whether AI engines name your business in their answers. It is the percentage of AI engine probes that cite your business for a defined query set over a defined period. Most local businesses start near zero. The category leader sits at 30 percent or higher. Lifting Share of Model is the central job of the AI Visibility engine, and the metric is what makes that job measurable instead of qualitative.
      </p>

      <StatHighlight
        stats={[
          { value: '6 engines', label: 'AI engines probed for Share of Model' },
          { value: '900+ probes', label: 'Minimum monthly probe volume on the AiLys engine' },
          { value: '30%+', label: 'Share of Model held by the category leader' },
        ]}
      />

      <h2 id="what-share-of-model-actually-measures">What Share of Model actually measures</h2>
      <p>
        Share of Model is a citation-share metric. The numerator is the count of AI engine answers that name your business across a probe set. The denominator is the total count of probes in that set. Both numerator and denominator are bounded to a defined period, usually 30 days for the rolling Share of Model and 90 days for the trend report.
      </p>
      <p>
        The probe set is the list of queries you care about. For a Quebec dental clinic, the probe set might include "best dentist near me", "dentist accepting new patients in Laval", "emergency dentist open Saturday Montreal", and "pediatric dentist Quebec City". The probe set is locked for the reporting period so that period-over-period comparison is meaningful. Adding or dropping queries mid-period invalidates the comparison.
      </p>
      <p>
        A Share of Model of 12 percent on the locked probe set means that across all probes run against all engines for the period, 12 percent of answers named your business. The remaining 88 percent named a competitor, named no specific business, or returned a generic answer.
      </p>

      <CalloutBox type="info">
        <p>Share of Model is not a ranking position. AI engines do not rank in the classic sense, they retrieve a short list of named entities and present them. A business is either named or not named in any given answer. Share of Model is the rate at which your business is named, which is the right unit of measure for a retrieval-based answer system.</p>
      </CalloutBox>

      <h2 id="how-the-ailys-engine-calculates-it">How the AiLys engine calculates it</h2>
      <p>
        The AiLys AI Visibility engine runs probes on a fixed schedule. For each business in the engine, the operator defines a probe set of 5 to 20 queries. The engine runs each query against six named AI engines: ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot. The probe is designed to mimic the way a real user phrases the question, including the location qualifier when relevant.
      </p>
      <p>
        Each probe response is parsed for named businesses. The parser identifies entity names, normalizes them against the GBP entity list, and increments the citation counter for each business named. Multiple mentions in a single answer count as one citation, because the metric is per-probe, not per-mention.
      </p>
      <p>
        At the end of the reporting period, the engine divides total citations by total probes for each engine. The per-engine scores are reported individually, and the aggregate Share of Model is a simple average across the six per-engine scores. Per-engine reporting matters because traffic share between engines varies by industry, and an operator may need to weigh the lift on Bing Copilot more than the lift on Claude depending on the industry.
      </p>

      <h2 id="the-formula-step-by-step">The formula, step by step</h2>
      <p>
        Share of Model for a single engine is straightforward.
      </p>

      <ol>
        <li>Define the probe set: a list of 5 to 20 queries the operator cares about.</li>
        <li>Lock the period: a rolling 30-day window for the headline metric, a 90-day window for trend.</li>
        <li>Run probes: at least 30 probes per query per engine across the period, so a 5-query set is 150 probes per engine per period.</li>
        <li>Parse responses: identify and normalize named businesses in each answer.</li>
        <li>Count citations: tally probes where your business is named, regardless of position.</li>
        <li>Divide: total citations divided by total probes equals the per-engine Share of Model as a percentage.</li>
        <li>Aggregate: simple average across the six per-engine scores produces the headline Share of Model.</li>
      </ol>

      <p>
        The formula is intentionally simple. AiLys does not weight engines by traffic share, does not adjust for citation position within the answer, and does not penalize partial mentions. Each layer of weighting introduces debate (which traffic share survey, which position weight curve), and the simple average is what makes the number defensible across operators and industries.
      </p>

      <img
        src={meta.images.mid}
        alt="Worked example showing a 5-query probe set scored across six AI engines with per-engine and aggregate Share of Model"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="how-many-probes-do-you-need">How many probes do you need</h2>
      <p>
        Probe count is what controls noise. AI engines have temperature variance in their answers, which means the same probe run twice can return different named businesses. With ten probes per engine, the variance can move Share of Model by 10 percentage points run to run. With thirty probes per engine, variance compresses to roughly 2 percentage points run to run. With one hundred probes, variance is below 1 percentage point.
      </p>
      <p>
        AiLys ships a 30-probe-per-engine floor as the default, which produces a 30-day Share of Model with about 2 points of variance. For high-stakes reporting (board decks, agency renewals), the engine can be configured for 100 probes per engine, which compresses variance below 1 point at the cost of higher engine usage on the AiLys side.
      </p>
      <p>
        The probe budget is the operational constraint. A 5-query probe set against six engines at 30 probes each is 900 probes a month. A 20-query set at 100 probes each is 12,000 probes a month. The Core tier ships the 5-query at 30 probes default. Growth and Agency tiers expand the probe set and probe density as needed.
      </p>

      <CalloutBox type="tip">
        <p>For a first-time Share of Model report, start with a 5-query probe set that covers the highest-intent searches in your category. Once the baseline Share of Model is established, expand the probe set to 10 to 15 queries for the second reporting period. Expanding too fast in the first period creates a noisy baseline that complicates the trend analysis.</p>
      </CalloutBox>

      <h2 id="reading-per-engine-vs-aggregate-scores">Reading per-engine vs aggregate scores</h2>
      <p>
        The aggregate Share of Model is the headline number. The per-engine scores tell the operator where the work needs to focus. A common pattern in early-stage AI Visibility work is a Perplexity score in the high teens with a ChatGPT score in the low single digits. That gap usually points to citation graph weakness, because Perplexity weights direct GBP and review signals while ChatGPT weights Wikidata and high-DA citations. The gap tells the team to ship Wikidata work next, not GBP work.
      </p>
      <p>
        Reading the per-engine scores requires knowing what each engine weights most. Perplexity leans on GBP and Yelp. ChatGPT leans on Wikidata and high-DA citations. Claude leans on first-hand experience markers and author bylines. Gemini leans on Google ecosystem signals and structured data. Google AIO leans on the same signals as classic Google plus FAQ schema. Bing Copilot leans on LinkedIn, Bing Places, and Microsoft ecosystem signals. The per-engine score names the weakness, the aggregate Share of Model names the headline result.
      </p>

      <InlineCTA variant="audit" />

      <h2 id="share-of-model-vs-share-of-voice-vs-share-of-search">Share of Model vs share of voice vs share of search</h2>
      <p>
        Share of voice is the percentage of media mentions in your category that name your business across press and social. Share of search is the percentage of branded searches against the category baseline on classic search engines like Google and Bing. Share of Model is the percentage of AI engine answers that name your business.
      </p>
      <p>
        The three metrics correlate over time. A business that lifts share of voice through PR campaigns and earned media will eventually lift Share of Model, because AI engines retrieve partly from press citations and entity-graph inputs that share of voice feeds. A business that lifts share of search through brand campaigns will eventually lift Share of Model, because branded search volume is a Wikidata notability signal and Wikidata is a citation graph input. The lag from share of voice to Share of Model is roughly 90 days. The lag from share of search to Share of Model is roughly 60 days.
      </p>
      <p>
        Share of Model is the leading indicator that matters most for AI Visibility, because it measures the actual output surface that operators care about: am I named in the answer or not. Share of voice and share of search are upstream inputs.
      </p>

      <h2 id="how-to-lift-share-of-model-from-zero">How to lift Share of Model from zero</h2>
      <p>
        A clean 90-day plan typically lifts Share of Model in two waves. Wave one ships in weeks 1 to 4: GBP optimization, NAP cleanup across the top citation targets, and category corrections. The lift from wave one is roughly 3 to 5 percentage points on aggregate Share of Model, weighted toward Perplexity and Google AIO because those engines weight GBP signals heavily.
      </p>
      <p>
        Wave two ships in weeks 5 to 12: schema build (FAQPage, Service, Person with credentials), original photography with EXIF, and FAQ page production for the top 30 patient or customer questions. The lift from wave two is roughly 5 to 10 percentage points on aggregate, weighted toward ChatGPT and Claude because those engines weight schema and experience markers heavily. By week 12, most local businesses sit at 8 to 18 percent Share of Model on their core probe set.
      </p>
      <p>
        AiLys reports Share of Model on every paid plan and on the free <InternalLink to="/audit" title="Free 24-hour AI Visibility audit" description="Includes the baseline Share of Model probe across six engines" /> deliverable. The full definition lives on the <InternalLink to="/glossary/share-of-model" title="Share of Model glossary entry" description="Canonical definition, formula, and reporting cadence" /> page, and the methodology page details the probe schedule and reporting cadence.
      </p>

      <KeyTakeaway
        points={[
          'Share of Model is the percentage of AI engine answers that cite your business for a defined query set over a defined period.',
          'AiLys probes six named AI engines: ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot.',
          'Minimum 30 probes per query per engine per period to keep variance below 2 percentage points.',
          'Per-engine scores name the weakness, aggregate Share of Model names the headline result.',
          'A clean 90-day plan typically lifts Share of Model from near zero to 8 to 18 percent on the core probe set.',
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
        alt="Share of Model trend chart showing the two-wave lift pattern across a 90-day local SEO plan"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
