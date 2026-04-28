/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { AUTHORS } from '../../authors'
import { CalloutBox, InlineCTA, StatHighlight, KeyTakeaway, InternalLink, SectionDivider, QuickQuiz } from '../../components/shared'

export const meta: BlogPostMeta = {
  slug: 'speakable-schema-voice-ranking',
  title: 'Does Speakable schema actually help voice ranking?',
  metaDescription:
    'An honest take on Speakable schema in 2026. Where it helps voice ranking, where the impact is debated, and how local owners should ship it without overclaiming.',
  tldr: 'Speakable schema is a Schema.org markup that flags spans of a page as suitable for voice answer assistants to read aloud. Google recommended it for news content and voice surfaces. The honest read in 2026 is that Speakable helps in news and editorial contexts where voice assistants pull a paragraph to read, but the ranking impact for local business pages is debated and small. Ship it because it costs nothing, but do not expect it to move the needle alone.',
  category: 'voice-search',
  tags: ['speakable', 'schema', 'voice search', 'voice ranking', 'voice-search'],
  publishedDate: '2026-04-04',
  updatedDate: '2026-04-04',
  author: AUTHORS.research,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/speakable-schema-voice-ranking/hero.webp',
    mid: '/blog-images/speakable-schema-voice-ranking/mid.webp',
    end: '/blog-images/speakable-schema-voice-ranking/end.webp',
  },
  faqItems: [
    {
      question: 'Does Speakable schema actually help voice ranking?',
      answer:
        'Partially. Speakable schema is a Schema.org markup that flags spans of a page as suitable for voice assistants to read aloud. Google recommends it for news content, where the impact is real and measurable. For local business pages, the ranking impact is debated and modest. Voice surfaces lean more on overall content quality, FAQPage schema, and brand entity attributes than on Speakable alone. Ship it because it is cheap, but do not expect it to be a primary lever.',
    },
    {
      question: 'What is Speakable schema in plain language?',
      answer:
        'Speakable schema is a Schema.org property called SpeakableSpecification that tells voice assistants which parts of a page are good candidates to read aloud. The markup uses CSS selectors or XPath expressions to point at specific elements, typically the H1 and the first paragraph. The voice assistant can then synthesize speech from that span when answering a query. Google supports it primarily for news pages and voice answer surfaces.',
    },
    {
      question: 'Should local businesses use Speakable schema?',
      answer:
        'Yes, with realistic expectations. Speakable schema is cheap to add and does not break anything. The honest answer is that for a dentist, lawyer, or restaurant page, the voice ranking impact is small compared to FAQPage schema, Google Business Profile completeness, and review velocity. Ship Speakable on the homepage and the top FAQ pages as a foundation move, then put the bigger optimization budget elsewhere.',
    },
    {
      question: 'How is Speakable different from FAQPage schema for voice?',
      answer:
        'FAQPage schema structures questions and answers so voice assistants and answer engines can match a query to a clean Q-A pair. Speakable schema flags spans of any page as suitable for read-aloud. The two are complementary. FAQPage drives the match, Speakable can guide what gets read aloud. For voice answer surfaces in 2026, FAQPage moves the needle more on local pages, but Speakable adds a cheap layer on top.',
    },
    {
      question: 'Where does Speakable schema work best?',
      answer:
        'News and editorial content. Google launched Speakable as a beta for news publishers and the documentation still leans that way. For news pages, voice assistants like Google Assistant pull the marked spans and read them. For local business pages, the impact is real but smaller because voice surfaces for local queries lean on Google Business Profile signals (hours, address, reviews) rather than read-aloud spans. The pattern matters when picking where to put it.',
    },
    {
      question: 'Does AiLys ship Speakable schema?',
      answer:
        'Yes, on every tier. Speakable is part of the schema stack we ship by default alongside Article, FAQPage, BreadcrumbList, and Organization. The cost to add it is essentially zero once the schema infrastructure is in place. We do not market Speakable as a primary voice lever because the honest evidence does not support that claim. We ship it because it is cheap, it is recommended for voice surfaces, and it does not hurt.',
    },
  ],
  relatedSlugs: ['voice-search-changed-for-dentists', 'siri-local-search-ranking-factors', 'alexa-business-hours-fix'],
  headings: [
    { id: 'what-speakable-schema-is', text: 'What Speakable schema is' },
    { id: 'the-honest-evidence-on-voice-ranking', text: 'The honest evidence on voice ranking' },
    { id: 'where-speakable-actually-works', text: 'Where Speakable actually works' },
    { id: 'how-to-write-the-markup', text: 'How to write the markup' },
    { id: 'speakable-vs-faqpage-for-voice', text: 'Speakable vs FAQPage for voice' },
    { id: 'what-moves-voice-ranking-more', text: 'What moves voice ranking more' },
    { id: 'a-realistic-rollout-plan', text: 'A realistic rollout plan' },
    { id: 'where-ailys-ships-it', text: 'Where AiLys ships it' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        Speakable schema is a Schema.org markup that flags spans of a page as suitable for voice assistants to read aloud. Google recommends it for news content and voice answer surfaces. The honest take in 2026 is that Speakable helps in news and editorial contexts where the assistant pulls a paragraph to read, but the ranking impact for local business pages is debated and modest. Ship it because it costs nothing, but do not expect it to move the needle alone. The bigger voice levers sit elsewhere.
      </p>

      <StatHighlight
        stats={[
          { value: 'Schema.org', label: 'SpeakableSpecification is a standard property' },
          { value: 'News-first', label: 'Google launched it as a beta for news publishers' },
          { value: 'Cheap to ship', label: 'Adds 10 lines of JSON-LD per page' },
        ]}
      />

      <SectionDivider />

      <h2 id="what-speakable-schema-is">What Speakable schema is</h2>
      <p>
        Speakable schema is a Schema.org property called SpeakableSpecification that tells voice assistants which parts of a page are good candidates to read aloud. The markup uses CSS selectors or XPath expressions to point at specific elements, typically the H1 and the first paragraph or the meta description. The voice assistant can then synthesize speech from that span when answering a query. The property attaches to the Article or WebPage object inside the page JSON-LD.
      </p>
      <p>
        Google launched Speakable as a beta for news publishers in 2018 and has kept it documented since. The Schema.org page lists it as a property with the cssSelector and xpath sub-properties. The format is stable, the syntax is simple, and the implementation cost is essentially zero once the page already ships JSON-LD. The honest debate is not about how to write it. The debate is about whether it moves voice ranking for non-news pages.
      </p>

      <CalloutBox type="info">
        <p>For the underlying definitions and how voice fits into the larger AEO and GEO picture, see <InternalLink to="/glossary/aeo" title="AEO definition" description="Answer Engine Optimization, plain language" />, the practical playbook on <InternalLink to="/blog/voice-search-changed-for-dentists" title="How voice search changed for dentists" description="What actually moves voice ranking for local clinics" />, and the live <InternalLink to="/audit" title="Free 24-hour AI Visibility audit" description="Probes voice and AI surfaces together" />.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Want to know if your voice surfaces are ranking? Run the free 24-hour AI Visibility audit, which probes voice and AI surfaces together." />

      <SectionDivider />

      <h2 id="the-honest-evidence-on-voice-ranking">The honest evidence on voice ranking</h2>
      <p>
        Three patterns show up across years of testing. First, Speakable schema works on news pages where the voice assistant has a clear use case (read me the top story). Second, the ranking impact for local business pages is small and inconsistent. The voice surfaces for "find a dentist near me" pull from Google Business Profile and the local pack, not from Speakable spans on a clinic homepage. Third, when the impact does show up on a local page, it is usually downstream of better content quality, not Speakable specifically.
      </p>
      <p>
        That third point matters. A page that ships Speakable usually also ships FAQPage, Article, and Organization schema, plus a clean H1 and first paragraph that answer the query directly. When voice ranking lifts, attributing the lift to Speakable alone is hard because the rest of the stack moved at the same time. The honest read is that Speakable is one of many small layers, not a standalone lever.
      </p>

      <CalloutBox type="warning">
        <p>Be careful with vendors who pitch Speakable schema as the primary fix for voice ranking. The Schema.org documentation is clear: it is a hint to voice assistants about which spans to read, not a ranking signal Google has confirmed for non-news content. Anyone selling Speakable as a silver bullet is overclaiming.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="where-speakable-actually-works">Where Speakable actually works</h2>
      <p>
        News and editorial content is where Speakable was designed to work, and it does. A news page that ships Speakable on the lede paragraph gets pulled into Google Assistant briefings, Alexa Flash Briefings (where supported), and similar voice-first surfaces. Publishers with daily content cycles see real lift from the markup because the assistant has a clear job to do (read me the news) and the markup tells it which span to read.
      </p>
      <p>
        Local business pages benefit less because the voice surface for local queries is different. When a user asks Siri or Google Assistant "find a dentist open now near me", the assistant queries the local pack, reads the business name, address, and hours from GBP, and rarely if ever reads a paragraph from the clinic website. The Speakable markup on that clinic homepage is technically correct but hits a surface that does not consume it. That is the gap between recommended and impactful.
      </p>

      <SectionDivider />

      <h2 id="how-to-write-the-markup">How to write the markup</h2>
      <p>
        The markup is short. Inside the page Article or WebPage JSON-LD, add a speakable property that points at the H1 and the first paragraph using CSS selectors. The example below shows the canonical pattern. Most of the AiLys posts ship this exact selector pair on every page.
      </p>

      <h3>Canonical Speakable pattern</h3>
      <ul>
        <li>Property: speakable</li>
        <li>Type: SpeakableSpecification</li>
        <li>cssSelector: an array, typically [".prose-blog h2", ".prose-blog p:first-of-type"]</li>
        <li>Alternative: xpath, an array of XPath expressions for non-HTML cases</li>
        <li>Placement: inside the Article or WebPage JSON-LD object, alongside headline, datePublished, and author</li>
      </ul>

      <p>
        The implementation cost is one extra property per page. If the site already ships JSON-LD through a layout component, adding Speakable is a one-time edit. If the site does not ship JSON-LD yet, that is the bigger lift, and Speakable should ride along with the larger schema rollout rather than be its own project.
      </p>

      <QuickQuiz
        question="Where does Speakable schema have the strongest ranking impact?"
        options={[
          'On local business homepages for map pack queries',
          'On news and editorial content pulled by voice assistants',
          'On product pages for voice commerce queries',
          'On every page equally, regardless of content type',
        ]}
        correctIndex={1}
        explanation="Google launched Speakable as a beta for news publishers, and that is where the impact is clearest. Voice assistants pull marked spans from news pages to read aloud in briefings. For local business pages, the impact is small because voice surfaces for local queries lean on Google Business Profile signals, not read-aloud spans."
      />

      <SectionDivider />

      <h2 id="speakable-vs-faqpage-for-voice">Speakable vs FAQPage for voice</h2>
      <p>
        FAQPage schema is the higher-impact move for voice on most local pages. The reason is matching. Voice queries are usually questions in natural language, and FAQPage structures the page as Q-A pairs that the answer engine can match directly. Speakable describes which span to read, but if the engine never matched the page in the first place, the read-aloud markup is moot.
      </p>
      <p>
        The two are complementary, not competing. FAQPage drives the match. Speakable can guide the read-aloud. For a local clinic page, ship FAQPage on the top five questions (hours, location, insurance, services, parking) and add Speakable on the H1 and first paragraph as a foundation layer. That stack is cheap, fast, and aligned with the honest evidence.
      </p>

      <img
        src={meta.images.mid}
        alt="Comparison diagram showing FAQPage schema driving the match and Speakable schema guiding the read-aloud span on a voice query"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="what-moves-voice-ranking-more">What moves voice ranking more</h2>
      <p>
        Three levers move voice ranking for local businesses more than Speakable. First, Google Business Profile completeness (hours, photos, services, attributes, posts). Voice assistants pull these directly when answering local queries. Second, FAQPage schema on the top-question pages, because voice queries are questions and the engine wants Q-A structure. Third, review velocity and rating, because voice surfaces lean on review signals when ranking local results.
      </p>
      <p>
        Beyond those three, NAP consistency across citations feeds the entity attributes that voice assistants use to verify the business is real and current. Wikidata entries and structured Person or Organization schema reinforce the entity. None of that is Speakable. The honest plan ships Speakable as a cheap layer and puts the bigger budget on GBP, FAQPage, reviews, and NAP work.
      </p>

      <InlineCTA variant="pricing" text="See the AiLys tiers built for voice and AI Visibility, from Starter at 300 dollars CAD to Agency at 2,499 dollars CAD." />

      <SectionDivider />

      <h2 id="a-realistic-rollout-plan">A realistic rollout plan</h2>
      <p>
        For a local owner with no schema yet, sequence the work this way. Week one, ship Article and Organization schema sitewide. Week two, ship FAQPage schema on the homepage and top five service pages. Week three, ship Speakable on those same pages as a foundation layer. Week four, ship BreadcrumbList and LocalBusiness. After that, the schema infrastructure is mature and the ongoing work is content quality and entity reinforcement.
      </p>
      <p>
        For an owner with mature schema but no Speakable, adding it is a single deploy. Pair it with a quick audit of the H1 and first paragraph on every page to confirm the spans the markup points at are actually answers to the headline question. Speakable that points at a vague intro paragraph is technically valid and practically useless.
      </p>

      <CalloutBox type="tip">
        <p>The simplest QA check after shipping Speakable is to view the page source, find the JSON-LD block, and confirm the speakable property appears with cssSelector pointing at the H1 and the first paragraph. Then run the page through the Schema.org validator. If both pass, the markup is correct. The effect on voice ranking is a separate question that takes 60 to 90 days to read.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="where-ailys-ships-it">Where AiLys ships it</h2>
      <p>
        Every AiLys tier ships Speakable schema as part of the default stack. Starter at 300 dollars CAD includes the foundation schema (Article, FAQPage, Speakable, Organization) on the homepage and the top service pages. Core at 799 dollars extends it to the full site. Growth at 1,499 dollars adds Wikidata entries and original photography for entity reinforcement. Agency at 2,499 dollars adds white-label deliverables and dedicated strategist time for multi-location voice rollouts.
      </p>
      <p>
        AiLys does not market Speakable as a primary voice lever because the honest evidence does not support that claim. The platform ships it because it is cheap, it is recommended, and it does not hurt. The bigger voice work happens on GBP, FAQPage, reviews, and NAP cleanup, all of which AiLys ships in the same plan. To see where voice ranking sits today, run the <InternalLink to="/audit" title="Free 24-hour AI Visibility audit" description="Probes voice and AI surfaces together" />.
      </p>

      <InlineCTA variant="book" text="Want a 60-minute strategy call to map your voice and AI Visibility roadmap, no pitch, strategy doc sent regardless?" />

      <SectionDivider />

      <KeyTakeaway
        points={[
          'Speakable schema flags spans of a page as suitable for voice assistants to read aloud, using CSS selectors or XPath.',
          'Impact is real on news pages, debated and modest on local business pages.',
          'Ship it because it costs nothing, not because it is a silver bullet for voice ranking.',
          'FAQPage schema, GBP completeness, and review velocity move voice ranking more than Speakable alone.',
          'AiLys ships Speakable on every tier as part of the default schema stack, no upcharge.',
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
        alt="Decision matrix showing where Speakable schema fits in a voice ranking strategy alongside FAQPage, GBP, and review work"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
