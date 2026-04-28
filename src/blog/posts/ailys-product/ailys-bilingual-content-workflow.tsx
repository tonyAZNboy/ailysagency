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
  slug: 'ailys-bilingual-content-workflow',
  title: 'AiLys bilingual content workflow, EN canonical and FR-CA in-house',
  metaDescription:
    'How AiLys handles French-Canadian content alongside English. EN canonical first, FR-CA hand-authored second by an in-house bilingual writer, no translation API. Quebec idioms and regional spellings preserved.',
  tldr: 'Yes, AiLys handles French-Canadian content as well as English, because every post and every deliverable runs through a bilingual workflow with two human writers. The English version is the canonical first draft, written for the broader Canadian and North American search index. The French-Canadian version is the hand-authored second pass, written by an in-house bilingual writer who keeps Quebec idioms (courriel, magasiner, fin de semaine), regional spellings, and the brand discipline that machine translation breaks. No translation API at any step.',
  category: 'ailys-product',
  tags: ['bilingual', 'french-canadian', 'quebec', 'workflow', 'content', 'ailys-product'],
  publishedDate: '2026-04-12',
  updatedDate: '2026-04-12',
  author: AUTHORS.product,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/ailys-bilingual-content-workflow/hero.webp',
    mid: '/blog-images/ailys-bilingual-content-workflow/mid.webp',
    end: '/blog-images/ailys-bilingual-content-workflow/end.webp',
  },
  faqItems: [
    {
      question: 'Does AiLys handle French-Canadian content as well as English?',
      answer:
        'Yes. Every blog post, GBP post, citation rewrite, and audit deliverable ships in English and Quebec French inside the same week. The team is bilingual in-house, the English version is the canonical first draft, and the French-Canadian version is hand-authored by an in-house bilingual writer with Quebec idioms and regional spellings preserved. AiLys does not use translation APIs at any step in the workflow.',
    },
    {
      question: 'Why does AiLys not use a translation API for French-Canadian content?',
      answer:
        'Three reasons. First, Quebec French has regional spellings (courriel instead of email, magasiner instead of shopping, fin de semaine instead of weekend) that translation APIs default to France French. Second, brand names need Latin script consistency (AiLys, Reviuzy, ChatGPT, Perplexity) that translation APIs sometimes localize incorrectly. Third, sentence rhythm in hand-authored Quebec French reads as native to local owners and search engines, while machine output reads as foreign and erodes ranking signals over time.',
    },
    {
      question: 'How long does the bilingual workflow take per post?',
      answer:
        'A standard 1,500 to 2,000 word post takes one workday end to end. The English canonical draft takes about three hours including research, outline, and revision. The French-Canadian pass takes about two hours because the structure is shared and the bilingual writer adapts the prose rather than rebuilding the post. The two versions ship in the same commit, with hreflang alternates wired in the meta. For shorter posts (GBP posts, FAQ updates, citation rewrites), the workflow takes 30 to 60 minutes total.',
    },
    {
      question: 'What gets adapted versus translated in the French-Canadian pass?',
      answer:
        'Headings, examples, calls to action, and idiomatic phrases get adapted. Technical vocabulary (UTM, GA4, GBP, Loi 25, AI Visibility) stays consistent across the two versions, with the French-Canadian phrasing applied to the connecting prose. Currency stays in CAD with the dollar sign on the right in French (300 dollars CAD) and on the left in English ($300 CAD). The price points, the timelines, and the technical claims stay identical to keep the audit posture consistent across locales.',
    },
    {
      question: 'Can AiLys ship a French-Canadian-first workflow if the audience is mostly Quebec?',
      answer:
        'Yes. For Quebec-first clients, the workflow flips: French-Canadian is the canonical first draft, and the English version is the hand-authored second pass for the rest of Canada. The team is bilingual in either direction and the quality bar is the same. The default is English-first because the broader search index serves a wider audience, but the Quebec-first inversion is a one-line preference change in the client onboarding doc.',
    },
    {
      question: 'How does AiLys verify the French-Canadian quality before publishing?',
      answer:
        'Three checks before publish. First, an automated scrub for em-dashes, AI fingerprint phrases, and France French spellings (the lint catches email instead of courriel, weekend instead of fin de semaine, shopping instead of magasiner). Second, a human review by the second bilingual writer who reads for sentence rhythm and brand voice. Third, a final scan for hreflang alternates and meta tags. The three-step gate runs in under 20 minutes per post and ships zero translation-API output to the live site.',
    },
  ],
  relatedSlugs: ['ailys-vs-traditional-seo-agency', 'ailys-pricing-tiers-explained-cad'],
  headings: [
    { id: 'why-bilingual-workflow-is-the-quebec-default', text: 'Why a bilingual workflow is the Quebec default' },
    { id: 'the-en-canonical-fr-ca-second-pattern', text: 'The EN canonical, FR-CA second pattern' },
    { id: 'the-quebec-idiom-rule', text: 'The Quebec idiom rule, courriel and magasiner' },
    { id: 'no-translation-api-the-strict-rule', text: 'No translation API, the strict rule and why' },
    { id: 'what-gets-adapted-versus-translated', text: 'What gets adapted versus translated in the FR-CA pass' },
    { id: 'the-quality-gate-before-publish', text: 'The quality gate before publish' },
    { id: 'how-the-workflow-fits-the-truvizy-cadence', text: 'How the workflow fits the Truvizy cadence' },
    { id: 'when-to-flip-to-fr-ca-first', text: 'When to flip to FR-CA first for a Quebec-only client' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        Quebec local owners ask the same question on the first sales call. Does AiLys handle French-Canadian content as well as English? The honest answer is yes, because every post and every deliverable runs through a bilingual workflow with two human writers. The English version is the canonical first draft, written for the broader Canadian and North American search index. The French-Canadian version is the hand-authored second pass, written by an in-house bilingual writer who keeps Quebec idioms, regional spellings, and the brand discipline that machine translation breaks. No translation API at any step.
      </p>

      <StatHighlight
        stats={[
          { value: '2 writers', label: 'Bilingual in-house team for every post' },
          { value: '1 workday', label: 'End-to-end time for a 1,500 to 2,000 word post in two languages' },
          { value: '0 APIs', label: 'No translation API at any step in the workflow' },
        ]}
      />

      <SectionDivider />

      <h2 id="why-bilingual-workflow-is-the-quebec-default">Why a bilingual workflow is the Quebec default</h2>
      <p>
        Quebec is a bilingual market with French as the primary language for most local search queries and English as the secondary language for cross-border and Canadian Anglophone audiences. A local business that ships content in only one language loses half the search index, and a business that ships machine-translated French loses the trust of every Quebec reader who notices the foreign rhythm in the first paragraph.
      </p>
      <p>
        AiLys ships every deliverable bilingually because the cost of skipping the second language compounds over a year of content production. The blog post that earns a citation in ChatGPT in English needs the French-Canadian pair to earn the matching citation in the French AI engines. The GBP post that drives bookings in English needs the French-Canadian pair for the same conversion lift on the French side of Google Maps.
      </p>
      <p>
        The workflow at AiLys is built around two human writers, both bilingual, with a clear handoff between the canonical draft and the second-language pass. The structure is repeatable across blog posts, GBP posts, citation rewrites, FAQ pages, audit deliverables, and the platform UI itself. The result is one quality bar in two languages, with no translation API and no France French slipping into Quebec content.
      </p>

      <CalloutBox type="info">
        <p>The full breakdown of how AiLys compares to traditional agencies on this dimension is covered in the <InternalLink to="/blog/ailys-vs-traditional-seo-agency" title="AiLys vs traditional SEO agency" description="The Quebec comparison on pricing, audit speed, and bilingual scope" /> companion post. The two read together cover the AiLys content stack end to end.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Want a free audit that includes a French-Canadian content review? The 24-hour AI Visibility audit ships with a bilingual readiness check at no extra cost." />

      <SectionDivider />

      <h2 id="the-en-canonical-fr-ca-second-pattern">The EN canonical, FR-CA second pattern</h2>
      <p>
        The default at AiLys is English-first canonical, French-Canadian second pass. The English writer drafts the post for the broader Canadian and North American search index, including all the structural elements: H2 outline, FAQ items, internal links, calls to action, and meta description. The French-Canadian writer takes the canonical draft, adapts the prose for Quebec idioms and brand voice, and ships the FR-CA version in the same commit.
      </p>
      <p>
        The handoff happens at the structural level, not the sentence level. The French-Canadian writer reads the entire English post, internalizes the argument and the calls to action, and writes the French-Canadian version as a parallel native draft. The structure stays shared across the two languages, but the prose is hand-authored in each language with the rhythm of a native speaker.
      </p>
      <p>
        The two versions ship in the same commit, with hreflang alternates wired in the meta and registered in the blog system. The reader who lands on the English version sees the FR-CA alternate in the language switcher, and vice versa. The search engines on each side see two parallel canonical pages, which is the cleanest hreflang posture for a bilingual local business.
      </p>

      <h3>The two-pass pattern in one table</h3>
      <ul>
        <li>EN canonical: research, outline, full draft, FAQ, calls to action, meta description, internal links</li>
        <li>FR-CA second pass: parallel native draft adapted for Quebec idioms, regional spellings, brand voice</li>
        <li>Shared structure: H2 outline, FAQ count, internal link targets, image alt text intent</li>
        <li>Adapted elements: idioms, examples, calls to action phrasing, currency placement</li>
        <li>Translated elements: technical vocabulary held consistent across both versions for audit posture</li>
      </ul>

      <SectionDivider />

      <h2 id="the-quebec-idiom-rule">The Quebec idiom rule, courriel and magasiner</h2>
      <p>
        Quebec French uses regional spellings and idioms that France French does not. The classic markers are courriel instead of email, magasiner instead of shopping, fin de semaine instead of weekend, dépanneur for convenience store, stationnement for parking. The list is longer than the markers most operators check for, and the discipline is to internalize the regional habit rather than maintain a hand-edit list.
      </p>
      <p>
        Translation APIs default to France French because the training data is dominated by Hexagonal sources. The output reads as foreign to a Quebec reader inside the first paragraph, which erodes trust and ranking signals on the Quebec side of the search index. The fix is not a post-processing pass on the API output. The fix is to write Quebec French natively, with the idioms baked into the first draft.
      </p>
      <p>
        AiLys runs an automated lint that catches the most common France French markers (email, weekend, shopping, voiture in the wrong context, smartphone instead of téléphone intelligent in formal copy) before publish. The lint is a safety net, not the primary discipline. The primary discipline is hiring bilingual writers who write Quebec French as their default.
      </p>

      <CalloutBox type="warning">
        <p>The most common machine translation tell in Quebec French is the verb-noun rhythm of France French. A native Quebec writer says On vous rappelle dans la journée. A translation API says Nous vous rappellerons dans la journée. The first reads as native, the second reads as a translated business memo. Five seconds of reading tells you which one shipped, and Quebec readers notice every time.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="no-translation-api-the-strict-rule">No translation API, the strict rule and why</h2>
      <p>
        The strict rule at AiLys is no translation API at any step in the workflow. Not Anthropic, not Google Translate, not DeepL, not OpenAI, not any other machine translation service. The rule covers blog posts, GBP posts, citation rewrites, audit deliverables, FAQ pages, and the platform UI itself. The rule is enforced at the workflow level and at the lint level, with a pre-publish check that runs on every commit.
      </p>
      <p>
        The reason for the strict rule is the cumulative cost of machine translation in a local business context. A single France French phrase in a Quebec post costs nothing in isolation. A year of content production with a 5 percent machine-translation rate accumulates into a content library that reads as foreign to local readers and ranks below hand-authored competitors on the Quebec side of the search index. The reverse is also true on the English side, where a translated Quebec post reads as awkward to a Toronto or Vancouver reader.
      </p>
      <p>
        The rule is one of the load-bearing differentiators for AiLys versus traditional agencies that subcontract French copy. The bilingual in-house team is the cost center that lets the rule hold across hundreds of deliverables per quarter without breaking the production schedule. To see the full bilingual posture in action across an actual deliverable, run the <InternalLink to="/audit" title="Free 24-hour AI Visibility audit" description="Includes a French-Canadian content sample to show the rhythm and the regional spelling discipline" /> and review the FR-CA section of the report alongside the EN section.
      </p>

      <QuickQuiz
        question="What is the default content workflow direction at AiLys for a Quebec local client?"
        options={[
          'French-Canadian canonical first, English second pass',
          'English canonical first, French-Canadian hand-authored second pass with no translation API',
          'A single bilingual writer drafts both versions in one pass',
          'Machine translation on the FR-CA side with a human cleanup pass',
        ]}
        correctIndex={1}
        explanation="The default is English canonical first because the broader Canadian and North American search index serves a wider audience, with the French-Canadian version hand-authored as a second pass by an in-house bilingual writer. No translation API at any step. For Quebec-first clients, the direction can flip on request, but the two-human-writer rule and the no-API rule hold either way."
      />

      <SectionDivider />

      <h2 id="what-gets-adapted-versus-translated">What gets adapted versus translated in the FR-CA pass</h2>
      <p>
        The French-Canadian pass adapts more than it translates. Headings get rewritten in native French rhythm, not converted word for word. Examples get localized when the English version uses a Toronto or Vancouver landmark and the French version reads better with a Montreal or Quebec City reference. Calls to action get rephrased with Quebec verb-noun rhythm. Idioms get swapped wholesale.
      </p>
      <p>
        Technical vocabulary stays consistent across the two versions. UTM, GA4, GBP, Loi 25, AI Visibility, Measurement Protocol, JSON-LD, and similar terms keep the same form in both languages. Brand names stay in Latin script everywhere. The price points, the timelines, and the technical claims stay identical to keep the audit posture consistent across locales. A reader who compares the two versions sees parallel meaning with native rhythm in each language, not a translation pair.
      </p>
      <p>
        Currency placement is one of the small details that signals native authoring. In English, the dollar sign goes on the left ($300 CAD). In French, the dollar sign or the word goes on the right (300 dollars CAD or 300 $ CAD). The convention is small, but a reader notices when it is wrong, and a search engine reads the consistency as a signal of regional authenticity over time.
      </p>

      <img
        src={meta.images.mid}
        alt="Adapted versus translated table showing which elements stay consistent across EN and FR-CA at AiLys, including currency placement and idiom rules"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="the-quality-gate-before-publish">The quality gate before publish</h2>
      <p>
        Three checks gate every bilingual post before publish. First, an automated lint scans both versions for em-dashes, AI fingerprint phrases, and France French spellings on the FR-CA side. The lint catches email instead of courriel, weekend instead of fin de semaine, shopping instead of magasiner, and the most common machine translation tells. The lint runs in under 30 seconds and blocks the commit if any flag triggers.
      </p>
      <p>
        Second, the second bilingual writer reads the FR-CA version for sentence rhythm and brand voice. The review is short (about 10 minutes for a 1,500 word post) and catches the things automated lint misses: awkward verb-noun rhythm, brand voice drift, callout structure that does not parallel the EN version. The reviewer signs off with a single comment in the commit message.
      </p>
      <p>
        Third, a final scan checks the hreflang alternates, the meta description length, the FAQ schema parity, and the internal link targets. The scan runs as a pre-commit hook and confirms that both versions are wired correctly into the blog system before the commit lands. The three-step gate runs in under 20 minutes per post and ships zero translation-API output to the live site.
      </p>

      <CalloutBox type="tip">
        <p>The fastest way to verify a French-Canadian post passes the AiLys quality bar is to read the first three paragraphs out loud. If the rhythm sounds like a Montreal cafe conversation, it shipped right. If it sounds like a translated business memo, the post needs another pass. The read-aloud test is what every AiLys writer runs before submitting the FR-CA draft for review.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="how-the-workflow-fits-the-truvizy-cadence">How the workflow fits the Truvizy cadence</h2>
      <p>
        The bilingual workflow ships at the Truvizy cadence of one post every two days, with both languages in the same commit. The cadence is sustainable because the structural work (research, outline, FAQ design) happens once for both languages, and the second-pass writer focuses on prose adaptation rather than building a parallel post from scratch. A 1,500 to 2,000 word post takes one workday end to end across the two writers.
      </p>
      <p>
        For shorter assets (GBP posts, FAQ updates, citation rewrites), the workflow compresses to 30 to 60 minutes total. The English writer drafts the short asset, the French-Canadian writer adapts it in 15 minutes, and the lint plus quality gate takes another 10 minutes. The compressed workflow is what lets AiLys ship weekly GBP posts in two languages at scale across hundreds of clients per quarter.
      </p>
      <p>
        For longer pillar posts (2,500 to 4,000 words), the workflow extends to two workdays across the two writers, with an additional review pass for the FR-CA version. The cost of the extra review is the cost of getting the long-form Quebec French rhythm right at scale. Pillar posts that read native in both languages earn more citations in both AI engine ecosystems, which is the metric that justifies the time investment.
      </p>

      <SectionDivider />

      <h2 id="when-to-flip-to-fr-ca-first">When to flip to FR-CA first for a Quebec-only client</h2>
      <p>
        For clients whose audience is 90 percent Quebec or higher, the workflow direction flips. French-Canadian becomes the canonical first draft, and the English version is the hand-authored second pass for the rest of Canada and cross-border audiences. The flip is a one-line preference in the client onboarding doc, and the team is bilingual in either direction.
      </p>
      <p>
        The flip matters for two reasons. First, the canonical draft sets the tone, the examples, and the calls to action for the post. A Quebec-first canonical draft uses Montreal and Quebec City landmarks, Quebec idioms, and CAD pricing in the native French rhythm. The English second pass adapts those elements for the broader audience without losing the Quebec posture. Second, the hreflang and the canonical URL on the Quebec side carry the SEO weight first, which matches the audience distribution.
      </p>
      <p>
        For most AiLys clients, the audience is bilingual with a Quebec majority but a meaningful English share, so the EN canonical default holds. For Quebec-only clients (a clinic in Sherbrooke, a restaurant in Quebec City, a contractor in Saguenay-Lac-Saint-Jean), the FR-CA canonical inversion is the better fit. The choice is documented in the onboarding doc and audited quarterly. To compare scope and pricing across the AiLys tiers that include the bilingual workflow, see the <InternalLink to="/blog/ailys-pricing-tiers-explained-cad" title="AiLys pricing tiers explained" description="The four tiers from Starter to Agency, in CAD" /> companion post and run the free <InternalLink to="/audit" title="Free 24-hour AI Visibility audit" description="Includes bilingual content readiness review" /> for a baseline.
      </p>

      <InlineCTA variant="pricing" text="See the four AiLys tiers, all of which include the bilingual content workflow at no extra cost. Starter at 300 dollars CAD up to Agency at 2,500 dollars CAD." />

      <SectionDivider />

      <p>
        The bilingual workflow is the operational backbone of AiLys content production. The two-writer pattern, the no-API rule, the Quebec idiom discipline, and the three-step quality gate together produce a content library that reads native in both languages and earns citations in both AI engine ecosystems. The cost is bounded by the in-house team size, and the quality bar holds across hundreds of deliverables per quarter without machine translation slipping through.
      </p>

      <InlineCTA variant="book" text="Want a 60-minute call to walk through the bilingual workflow on your specific business and audience mix? Strategy doc sent regardless." />

      <SectionDivider />

      <KeyTakeaway
        points={[
          'AiLys handles French-Canadian content as well as English, with two human writers and no translation API.',
          'The default workflow is English canonical first, French-Canadian hand-authored second pass.',
          'Quebec idioms (courriel, magasiner, fin de semaine) and regional spellings are preserved, with an automated lint as a safety net.',
          'Technical vocabulary, prices, and timelines stay consistent across both versions for audit posture.',
          'The three-step quality gate (lint, human review, hreflang scan) runs in under 20 minutes per post and ships zero machine-translated content to the live site.',
          'For Quebec-only clients, the workflow flips to FR-CA first and EN second on a one-line preference change.',
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
        alt="Summary card showing the AiLys bilingual content workflow with the two-pass pattern, the no-API rule, and the three-step quality gate"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
