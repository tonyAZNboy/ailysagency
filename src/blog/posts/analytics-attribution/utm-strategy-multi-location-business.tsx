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
  slug: 'utm-strategy-multi-location-business',
  title: 'UTM strategy for a multi-location business, the working convention',
  metaDescription:
    'The UTM convention for multi-location local businesses. utm_source for the AI engine, utm_medium for the surface, utm_campaign for the location id.',
  tldr: 'A multi-location business needs a UTM convention that survives location swaps and AI engine traffic. The working pattern is utm_source=ai (or chatgpt, perplexity, claude, gemini, googleaio, bingcopilot), utm_medium=chat or search or aio, and utm_campaign equal to the location id. Document it once, apply it to every link you publish, and the GA4 dashboard reads location performance and AI Traffic in the same view.',
  category: 'analytics-attribution',
  tags: ['utm', 'multi-location', 'analytics', 'attribution', 'ai-traffic', 'ga4'],
  publishedDate: '2026-03-07',
  updatedDate: '2026-03-07',
  author: AUTHORS.research,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/utm-strategy-multi-location-business/hero.webp',
    mid: '/blog-images/utm-strategy-multi-location-business/mid.webp',
    end: '/blog-images/utm-strategy-multi-location-business/end.webp',
  },
  faqItems: [
    {
      question: 'What UTM convention works best for a multi-location business?',
      answer:
        'Use utm_source for the traffic origin (ai, chatgpt, perplexity, claude, gemini, googleaio, bingcopilot, or the channel name for non-AI sources), utm_medium for the surface (chat, search, aio, social, email), and utm_campaign for the location id (montreal-downtown, laval, quebec-city). This convention survives location swaps because the campaign field stays stable per location, and it lines up with the AI Traffic channel group that GA4 needs to separate AI clicks from Direct.',
    },
    {
      question: 'Why does utm_campaign hold the location id and not the campaign name?',
      answer:
        'Because location is the dimension that changes the conversion math, not the campaign name. A multi-location business needs to know which store earned the click, the call, and the booking. Putting the location id in utm_campaign lets GA4 group every click to a specific store across every channel and every AI engine. The classic campaign name belongs in utm_content or a custom parameter, where the volume is lower and the segmentation is secondary.',
    },
    {
      question: 'Should I use a different utm_source for each AI engine or one shared value?',
      answer:
        'Both. Use a shared utm_source=ai for high-level reports that compare AI Traffic to all other channels, then add granular utm_source values per engine for the deep-dive view. Most owners run one stable source per engine: utm_source=chatgpt, utm_source=perplexity, utm_source=claude, utm_source=gemini, utm_source=googleaio, utm_source=bingcopilot. The aggregate ai bucket is a derived channel, not a separate UTM convention.',
    },
    {
      question: 'How do I tag links inside ChatGPT or Perplexity citations?',
      answer:
        'You cannot tag links you do not control directly. The way to capture AI engine traffic is to UTM-tag links inside content that AI engines cite, so when an engine surfaces your page or your citation, the click that arrives carries your tags. Pair that with the GA4 channel group that catches the AI engine hosts as a referral fallback. The combination captures both the tagged-and-preserved clicks and the untagged-but-referrer-readable clicks.',
    },
    {
      question: 'How do I roll out a UTM convention across 10 locations without breaking anything?',
      answer:
        'Document the convention in a single spreadsheet, share it with the team in the same week, build a UTM library with the pre-tagged links per location, and put a redirect tag on every short link so case mismatches do not fragment the data. Audit the GA4 source and medium dimensions one week after rollout to confirm the values are clean. Most multi-location rollouts take one afternoon for setup and one week for validation.',
    },
    {
      question: 'Does Google Tag Manager interfere with UTM passing for AI traffic?',
      answer:
        'Not when configured correctly. GTM does not strip UTMs by default. The interference comes from custom redirect tags or third-party scripts that rewrite the URL before GA4 ingests the hit. Audit the GTM container for any redirect or rewrite tag, document the order of execution, and make sure UTMs flow through to the page_view event. The classic mistake is a redirect tag that fires before the analytics tag and drops the parameters.',
    },
  ],
  relatedSlugs: ['track-chatgpt-traffic-in-ga4', 'why-chatgpt-cites-your-competitor'],
  headings: [
    { id: 'why-multi-location-needs-its-own-utm-frame', text: 'Why multi-location needs its own UTM frame' },
    { id: 'the-three-field-convention', text: 'The three field convention, source, medium, campaign' },
    { id: 'utm-source-the-ai-engine-and-the-channel', text: 'utm_source, the AI engine and the channel' },
    { id: 'utm-medium-the-surface-not-the-format', text: 'utm_medium, the surface and not the format' },
    { id: 'utm-campaign-the-location-id', text: 'utm_campaign, the location id and why it never changes' },
    { id: 'rolling-out-the-convention-across-locations', text: 'Rolling out the convention across locations' },
    { id: 'common-mistakes-and-how-to-avoid-them', text: 'Common mistakes and how to avoid them' },
    { id: 'reading-the-ga4-report-after-rollout', text: 'Reading the GA4 report after rollout' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        A multi-location business has a UTM problem most single-location operators never hit. The campaign-name-as-utm convention that works for a one-store shop falls apart when ten locations run the same campaign with different stores converting at different rates. The fix is a working UTM convention built around three fields: utm_source for the AI engine or channel origin, utm_medium for the surface (chat, search, aio), and utm_campaign for the location id. Document it once, apply it to every link, and the GA4 dashboard reads location performance and AI Traffic in the same view.
      </p>

      <StatHighlight
        stats={[
          { value: '3 fields', label: 'Source, medium, campaign for the convention' },
          { value: '1 afternoon', label: 'Typical rollout time across locations' },
          { value: '1 week', label: 'Validation window in GA4 after launch' },
        ]}
      />

      <SectionDivider />

      <h2 id="why-multi-location-needs-its-own-utm-frame">Why multi-location needs its own UTM frame</h2>
      <p>
        A single-location business uses UTM to attribute the campaign that drove the conversion. The classic pattern looks like utm_source=facebook, utm_medium=cpc, utm_campaign=spring-sale. For one location, that is enough. The data lands in GA4, the campaign report shows the spring sale, the operator decides whether to renew the spend.
      </p>
      <p>
        A multi-location business breaks that pattern in week one. Ten locations run the same spring sale, but only three of them convert at the rate that justifies the spend. The owner needs to see which store earned the click, the call, and the booking, not just which campaign generated traffic. The campaign name does not carry that information, and forcing it to do double duty (utm_campaign=spring-sale-laval) makes the data noisy and hard to aggregate.
      </p>
      <p>
        The cleaner pattern is to flip the assignment. Put the location id in utm_campaign as the primary segmentation. Put the campaign name in utm_content where it lives without polluting the headline dimension. Put the channel and surface in utm_source and utm_medium where they always belong. The result is a GA4 view that shows location performance directly, and a campaign report that aggregates correctly across stores.
      </p>

      <CalloutBox type="info">
        <p>The location id should be a stable string, not a label that might change. Use a slug pattern like montreal-downtown, laval-centre, quebec-city-saint-roch. Stable strings survive rebrands, store renumbering, and typo cleanup. Labels that look like display names break analytics every time the marketing team rewords the site.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Want a UTM audit on your current multi-location setup? The free 24-hour AI Visibility audit now includes a UTM and channel group readiness check." />

      <SectionDivider />

      <h2 id="the-three-field-convention">The three field convention, source, medium, campaign</h2>
      <p>
        The convention has three fields that hold three answers. utm_source answers where the click came from. utm_medium answers what kind of surface the click came from. utm_campaign answers which location is the destination. The fourth and fifth UTM fields, utm_content and utm_term, hold the campaign name and the keyword variant when those matter, but they are not part of the headline convention.
      </p>
      <p>
        For AI Traffic, the convention adapts cleanly. utm_source carries the AI engine name, utm_medium carries the surface (chat for ChatGPT, search for Perplexity, aio for Google AIO), and utm_campaign still carries the location id. The aggregate ai bucket is a derived channel in GA4, computed from a regex on utm_source values, not a separate UTM convention.
      </p>

      <h3>The convention in one table</h3>
      <ul>
        <li>utm_source values: ai, chatgpt, perplexity, claude, gemini, googleaio, bingcopilot, google, facebook, instagram, email, partner</li>
        <li>utm_medium values: chat, search, aio, organic, cpc, social, email, referral, qr</li>
        <li>utm_campaign values: location ids only (montreal-downtown, laval, quebec-city, sherbrooke, gatineau)</li>
        <li>utm_content values: optional campaign name (spring-sale, summer-promo, holiday-2026)</li>
        <li>utm_term values: optional keyword variant (free-consultation, same-day-booking)</li>
      </ul>

      <SectionDivider />

      <h2 id="utm-source-the-ai-engine-and-the-channel">utm_source, the AI engine and the channel</h2>
      <p>
        utm_source carries the origin of the click. For non-AI traffic, the values are the standard channel names: google, facebook, instagram, email, partner, referral. For AI Traffic, the values are the AI engine names: chatgpt, perplexity, claude, gemini, googleaio, bingcopilot. The values stay lowercase, hyphen-free, and consistent across the team.
      </p>
      <p>
        The aggregate ai bucket is built on top, not in place of, the engine-specific values. In GA4, define a custom channel group rule that maps utm_source matching the regex chatgpt|perplexity|claude|gemini|googleaio|bingcopilot to the AI Engines channel. Keep the engine-specific values in the source dimension for the deep dive, and use the custom channel for the rollup view.
      </p>
      <p>
        Operators sometimes ask whether to use utm_source=ai as the only value, dropping the per-engine granularity. The answer is no. The per-engine slice is the difference between knowing AI Traffic exists and knowing which engine moves the needle. Without that slice, the UTM strategy answers half the question.
      </p>

      <CalloutBox type="warning">
        <p>Case sensitivity is a hidden trap. utm_source=ChatGPT and utm_source=chatgpt are two different values in GA4, and they fragment the report unless you normalize. The fix is a tag in Google Tag Manager that lowercases every UTM before the analytics hit fires. Do this in week one or the dataset will need cleanup forever.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="utm-medium-the-surface-not-the-format">utm_medium, the surface and not the format</h2>
      <p>
        utm_medium describes the surface of the click. For AI Traffic, the working values are chat (ChatGPT, Claude, Gemini chat surface), search (Perplexity, AI search results), and aio (Google AI Overviews, Bing Copilot inline answers). For non-AI Traffic, the values follow the GA4 default channel definitions: organic, cpc, social, email, referral, qr.
      </p>
      <p>
        The medium field is where most multi-location teams overload. The temptation is to put the format in medium (banner, post, story, ad), which fragments the data and breaks the GA4 default channel grouping rules. The format belongs in utm_content. The medium stays the surface category that the channel grouping reads.
      </p>
      <p>
        For AI Traffic specifically, the medium value lets the channel group separate chat surfaces (where the conversion intent is conversational and the visit is short) from AI Overview surfaces (where the conversion intent is research and the visit is longer). The two surfaces convert differently, and the medium dimension is what surfaces the difference in the report.
      </p>

      <QuickQuiz
        question="What value should hold the location id in a multi-location UTM convention?"
        options={[
          'utm_source, because location is the source of the conversion',
          'utm_medium, because medium is the segmentation field',
          'utm_campaign, because campaign is the headline dimension and location is the primary segmentation',
          'utm_content, because content is where descriptive values go',
        ]}
        correctIndex={2}
        explanation="utm_campaign is the headline dimension in GA4 reports, and for a multi-location business the headline answer is which store earned the click. Putting the location id in utm_campaign keeps the GA4 view location-first across every channel and every AI engine, with the campaign name moving to utm_content where it lives without polluting the headline."
      />

      <SectionDivider />

      <h2 id="utm-campaign-the-location-id">utm_campaign, the location id and why it never changes</h2>
      <p>
        utm_campaign carries the location id. The string is stable, lowercase, hyphen-cased, and never reused for a different location. A clinic chain with five locations might use utm_campaign values like saint-jean, brossard, longueuil, repentigny, terrebonne. A franchise with twenty stores adds the city prefix where collisions happen: montreal-plateau, montreal-rosemont, laval, gatineau, sherbrooke.
      </p>
      <p>
        The location id never changes once the convention ships. Renames break the report, because GA4 cannot retroactively merge the old value and the new value into one segment without a custom dimension rebuild. The discipline is to pick a stable string, document it in the UTM library, and never edit it again. If a location closes or moves, document the change as a note next to the value, do not edit the value.
      </p>
      <p>
        The campaign name belongs in utm_content. A spring sale running across all locations might tag links with utm_campaign=montreal-downtown and utm_content=spring-sale-2026. The GA4 view then shows the spring sale by location in one report, and the per-location funnel performance in another, without fragmenting the campaign data.
      </p>

      <img
        src={meta.images.mid}
        alt="UTM convention table showing utm_source for AI engines, utm_medium for chat search aio, and utm_campaign as the location id"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="rolling-out-the-convention-across-locations">Rolling out the convention across locations</h2>
      <p>
        The rollout has four steps and takes one afternoon for setup. First, document the convention in a single spreadsheet with the values for every UTM field and the location id list. Share that document with the team and freeze edits except for additions when a new location opens.
      </p>
      <p>
        Second, build a UTM link library that pre-tags every public destination per location. The library lives in a shared sheet or in a UTM builder tool that the team uses for new content. The pre-tagged links cover the homepage, the location pages, the booking flow, the contact page, and the campaign landing pages.
      </p>
      <p>
        Third, install a normalization tag in Google Tag Manager that lowercases every UTM value before the analytics hit fires. This tag prevents case fragmentation forever. Put it above every other tag in the GTM order so it runs first.
      </p>
      <p>
        Fourth, audit the GA4 source and medium dimensions one week after rollout. Confirm the values are clean, no stray uppercase, no typos, no orphan strings that came from a copy-paste error. Most multi-location rollouts take one afternoon for setup and one week for validation. After validation, the report stays clean indefinitely as long as the convention holds.
      </p>

      <CalloutBox type="tip">
        <p>The fastest way to validate after rollout is to run a small test campaign with a known link and watch the GA4 realtime view. The link should appear in the source, medium, campaign dimensions exactly as documented. If the values render different from the source link, there is a redirect or rewrite somewhere in the path that needs fixing before scaling the rollout.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="common-mistakes-and-how-to-avoid-them">Common mistakes and how to avoid them</h2>
      <p>
        Mistake one is overloading utm_medium with format values (banner, post, ad) that should live in utm_content. The fix is to keep medium as the surface category and let GA4 default channel grouping consume it cleanly. Mistake two is changing the location id over time. The fix is to freeze the id at launch and document any rename as a side note, never an edit.
      </p>
      <p>
        Mistake three is missing the case normalization tag. The fix is the GTM lowercase tag installed in week one. Mistake four is letting the campaign name leak into utm_campaign across all locations. The fix is to keep the discipline that utm_campaign equals the location id, full stop. Mistake five is forgetting to define the AI Engines channel group in GA4. The fix is to build the channel group on day one of the rollout, with the regex that catches all six AI engine sources.
      </p>
      <p>
        For the GA4 channel group setup itself, the working pattern is documented in the <InternalLink to="/blog/track-chatgpt-traffic-in-ga4" title="Track ChatGPT traffic in GA4" description="The channel group rule and the referral host list" /> companion post. The two posts read together cover the full attribution stack for a multi-location business serving Quebec or Canada-wide markets. For the underlying definition of AI Traffic that this convention captures, see <InternalLink to="/glossary/ai-traffic" title="AI Traffic glossary entry" description="The definition AiLys uses for AI engine click attribution" />, and run a baseline with the free <InternalLink to="/audit" title="AI Visibility audit" description="The 24-hour readiness check that includes UTM and channel group review" />.
      </p>

      <InlineCTA variant="pricing" text="Need the UTM library, the GA4 channel group, and the multi-location attribution audit shipped for you? See AiLys plans for local businesses." />

      <SectionDivider />

      <h2 id="reading-the-ga4-report-after-rollout">Reading the GA4 report after rollout</h2>
      <p>
        After rollout, the GA4 view answers three questions in one page. Which location earned the click, by reading utm_campaign as the headline dimension. Which channel drove the click, by reading the custom channel group built on top of utm_source. Which surface generated the conversion, by reading utm_medium as the secondary dimension.
      </p>
      <p>
        For AI Traffic specifically, the report shows the AI Engines channel total, then the per-engine breakdown (chatgpt, perplexity, claude, gemini, googleaio, bingcopilot), then the per-location attribution from utm_campaign. A multi-location business with ten stores can see in one panel that ChatGPT drove 14 percent of last month's bookings, that the Laval and Sherbrooke locations earned the largest share, and that the chat surface converted at 3.2 percent versus 2.1 percent for the AI Overview surface.
      </p>
      <p>
        The same convention feeds the Looker Studio dashboard, the conversion path report, and the cohort analysis. A clean UTM convention is the foundation for every downstream analytics question. The reverse is also true: a noisy UTM convention forces every analytics question into a clean-up step that wastes hours and erodes trust in the data.
      </p>

      <InlineCTA variant="book" text="Want a 60-minute walkthrough of your multi-location UTM and GA4 setup? Strategy doc sent regardless." />

      <SectionDivider />

      <KeyTakeaway
        points={[
          'utm_source carries the AI engine name or the channel origin, lowercase and consistent.',
          'utm_medium carries the surface (chat, search, aio, social, email), not the format.',
          'utm_campaign carries the location id, frozen at launch and never edited.',
          'utm_content carries the campaign name when it matters, keeping the headline dimension clean.',
          'Install a GTM lowercase tag in week one to prevent case fragmentation forever.',
          'Pair the UTM convention with a GA4 AI Engines channel group to capture both tagged and referrer-based AI Traffic.',
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
        alt="Multi-location UTM convention summary card showing the three field rule and the AI Engines channel group setup"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
