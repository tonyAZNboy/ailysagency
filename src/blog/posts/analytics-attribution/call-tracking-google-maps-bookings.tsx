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
  slug: 'call-tracking-google-maps-bookings',
  title: 'Call tracking for Google Maps bookings, the GBP and GA4 setup',
  metaDescription:
    'Can you track phone calls that started on a Google Maps listing? Yes. Here is the GBP Insights, GA4 server-side and dynamic number setup with Quebec Loi 25 consent baked in.',
  tldr: 'Phone calls that start on a Google Maps listing are trackable. Google Business Profile already exposes call events in the Insights API and pushes them to GA4 when the property is linked correctly. For deeper attribution, swap in a UTM-decorated phone number through CallRail or Twilio Studio so the source channel survives into the booking system. In Quebec, the entire chain has to clear the Loi 25 consent bar before any call recording or PII enrichment runs.',
  category: 'analytics-attribution',
  tags: ['call tracking', 'google maps', 'gbp', 'ga4', 'attribution', 'quebec', 'loi 25'],
  publishedDate: '2026-03-23',
  updatedDate: '2026-03-23',
  author: AUTHORS.research,
  readTimeMinutes: 10,
  images: {
    hero: '/blog-images/call-tracking-google-maps-bookings/hero.webp',
    mid: '/blog-images/call-tracking-google-maps-bookings/mid.webp',
    end: '/blog-images/call-tracking-google-maps-bookings/end.webp',
  },
  faqItems: [
    {
      question: 'Can I track phone calls that started from a Google Maps listing?',
      answer:
        'Yes. Google Business Profile exposes call events in its Insights API, and a properly linked GA4 property captures the same event as a Google Organic phone-call conversion. For deeper attribution into the booking system, swap in a dynamic phone number through CallRail or Twilio Studio so the source survives the call. In Quebec, every layer has to honor Loi 25 consent before recording or enriching the call.',
    },
    {
      question: 'What is the difference between GBP call insights and a real call tracking tool?',
      answer:
        'GBP call insights count the click on the call button on Google Maps and the GBP listing. A call tracking tool replaces the displayed phone number with a forwarding number tied to the source channel and records the destination, the call duration, the caller area code and (with consent) the recording. The two layers complement each other: GBP gives you the funnel top, the call tracker gives you the booking outcome.',
    },
    {
      question: 'Will swapping the GBP phone number for a tracking number hurt local pack ranking?',
      answer:
        'Not when done right. Google specifically allows a tracked number on the GBP listing as long as the primary phone number remains the business main line and the listing stays NAP-consistent across citations. The safest pattern is to put the call tracking number as the secondary phone on the GBP and keep the main line as the primary, which preserves the citation graph while still capturing the source-tagged calls.',
    },
    {
      question: 'How do I send a phone-call event from a phone system into GA4?',
      answer:
        'Use the GA4 Measurement Protocol from a server-side endpoint. CallRail, Twilio Studio and most managed call trackers expose a webhook that fires after the call completes. Forward the payload to a small endpoint on your stack that maps the source, medium and campaign tags into the GA4 phone_call event. Keep the user identifier consistent (a hashed caller ID or a session-derived client ID) so the call lands on the same user record as the website session.',
    },
    {
      question: 'Does Quebec Loi 25 apply to call tracking on a Google Maps listing?',
      answer:
        'Yes. Loi 25 applies to any personal information collected from a Quebec resident, and a phone number plus the call metadata qualifies. The compliance bar requires explicit consent before recording, a clearly published privacy notice on the website, a documented retention period and a contact for access or deletion requests. Most managed call trackers ship Loi 25 disclosures, but the obligation lives with the business, so review the disclosure and consent flow before shipping.',
    },
  ],
  relatedSlugs: ['track-chatgpt-traffic-in-ga4', 'utm-strategy-multi-location-business'],
  headings: [
    { id: 'what-google-maps-actually-exposes', text: 'What Google Maps actually exposes for phone calls' },
    { id: 'gbp-insights-and-the-ga4-link', text: 'GBP Insights, the GA4 link, and what each layer measures' },
    { id: 'dynamic-numbers-callrail-and-twilio', text: 'Dynamic numbers with CallRail and Twilio Studio' },
    { id: 'utm-decorated-phone-numbers', text: 'UTM-decorated phone numbers, the operator pattern' },
    { id: 'server-side-event-ingestion-ga4', text: 'Server-side event ingestion into GA4' },
    { id: 'quebec-loi-25-consent-checklist', text: 'Quebec Loi 25 consent checklist for call recording' },
    { id: 'a-30-day-rollout-plan', text: 'A 30 day rollout plan from zero to attributed bookings' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        Phone calls that start on a Google Maps listing are trackable end to end. Google Business Profile already counts the call-button click in the Insights API and sends a phone-call conversion to GA4 when the two properties are linked. For deeper attribution into the booking system, a dynamic phone number through CallRail or Twilio Studio captures the source channel, the campaign tag and the call duration. Quebec listings layer one more requirement on top: Loi 25 consent before any recording or PII enrichment runs. This guide walks the full stack from the GBP listing to the booking row in the database.
      </p>

      <StatHighlight
        stats={[
          { value: 'Yes', label: 'Phone calls from Google Maps are trackable today' },
          { value: '3 layers', label: 'GBP Insights, GA4 link, dynamic call tracker' },
          { value: 'Loi 25', label: 'Quebec consent bar that gates recording and enrichment' },
        ]}
      />

      <SectionDivider />

      <h2 id="what-google-maps-actually-exposes">What Google Maps actually exposes for phone calls</h2>
      <p>
        Google Business Profile counts every click on the call button on the listing page and on the Maps card. The event is named CALLS in the legacy Insights API and is exposed as a phone-call performance metric in the newer Performance API. The count is the click, not the connected call, which means a caller who hangs up before the line picks up still registers as one call event. That gap is small in practice but it matters when reconciling with the phone system.
      </p>
      <p>
        The Insights API also breaks out the queries that triggered the listing impressions, which lets you correlate phone calls with categories of intent (branded, category, near-me). This is the attribution layer that GBP gives for free, and it is enough for many local businesses to size the channel before investing in a dedicated call tracker. The data lands inside the Insights dashboard and is also pulled into GA4 when the GBP property is linked through the same Google account.
      </p>
      <p>
        What GBP does not expose is the call destination, the call duration, the caller area code or the recording. For those, you need a layer above the listing. That is where CallRail, Twilio Studio or a managed call tracker enters the stack. The two layers do not compete: they answer different questions. GBP tells you how many calls the listing produced. The call tracker tells you what happened on the call.
      </p>

      <CalloutBox type="info">
        <p>The GBP Insights API has a documented quota and a 540 day data retention. Pull the call data into your own warehouse on a weekly cadence so the historical trend survives even if a listing changes ownership or the API access lapses. See <InternalLink to="/glossary/ai-traffic" title="AI Traffic glossary entry" description="Source taxonomy that includes Google Maps, AI engines and direct" /> for how Google Maps fits in the broader source taxonomy.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Run the free audit to see how many calls your listing produced last quarter and where the GBP data is leaking out of GA4." />

      <SectionDivider />

      <h2 id="gbp-insights-and-the-ga4-link">GBP Insights, the GA4 link, and what each layer measures</h2>
      <p>
        The GBP and GA4 link is set inside the GBP Performance dashboard. Once the link is active, GA4 starts receiving a Google Organic phone-call conversion as a session event. The event is attributed to the Google Organic channel, not to a Google Maps source by default. To split out Maps from regular Organic, you have to layer in a UTM-decorated link on the listing or use a tracking number that fires its own GA4 event with a Maps-specific source value.
      </p>
      <p>
        GA4 will count the call event as a session conversion when it is configured as a key event in the property settings. That makes phone calls show up in the standard reports next to form fills, bookings and ecommerce events. The catch is that the session attached to the phone-call event is the Google Organic session that landed on the GBP, not necessarily a session on the website. For owners who care about the website attribution, the dynamic number layer is the next step.
      </p>
      <p>
        For multi-location businesses, the GBP and GA4 link only solves the parent property. Each location needs its own GA4 audience or its own filtered view to see per-location phone calls. The cleaner pattern at scale is a single GA4 property with a location dimension passed on the event, which keeps the analysis surface unified. For the per-location UTM strategy, see the <InternalLink to="/blog/utm-strategy-multi-location-business" title="UTM strategy for multi-location businesses" description="Naming convention that survives across GBP, paid and AI Visibility channels" />.
      </p>

      <SectionDivider />

      <h2 id="dynamic-numbers-callrail-and-twilio">Dynamic numbers with CallRail and Twilio Studio</h2>
      <p>
        A dynamic phone number is a forwarding number tied to a specific source channel. CallRail is the managed product most local businesses use, and Twilio Studio is the build-it-yourself option for teams that already run on Twilio. Both work the same way at the listing level: replace the displayed phone number on the GBP secondary phone field, keep the main line as the primary, and configure the forwarding to ring the same business line.
      </p>
      <p>
        CallRail ships with the Google integrations pre-built. The number on the GBP becomes a CallRail number, the call rings the destination, and CallRail fires a webhook with the source, the campaign, the duration and the recording (when consent is captured). The free tier covers a few hundred minutes a month, which is enough for most single-location businesses. Twilio Studio costs less per minute at scale but requires the integration work to wire the webhook into GA4 and the booking system.
      </p>
      <p>
        The risk to manage is NAP consistency. Google explicitly allows a tracking number on the GBP listing, but only when the primary line stays the business main line and the citations across the web stay aligned with that primary. The audit move is to run a citation scan after every number swap and confirm that no third-party listing was changed by accident. For the citation discipline, see <InternalLink to="/glossary/ai-traffic" title="NAP consistency basics" description="How phone numbers, addresses and names align across the citation graph" />.
      </p>

      <CalloutBox type="tip">
        <p>Put the tracking number on the GBP secondary phone slot and keep the main line as the primary. This preserves NAP consistency across the existing citation graph while still routing the call through the source-tagged number. The GBP listing displays the secondary number on Maps in most surfaces, which is the placement you want for tracking.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="utm-decorated-phone-numbers">UTM-decorated phone numbers, the operator pattern</h2>
      <p>
        A UTM-decorated phone number is the pattern where the call tracker assigns one number per source-medium-campaign combination. The number on the GBP listing is one number. The number on a Google Ads call extension is a second number. The number on a paid Meta campaign is a third. Each number rings the same business line, but the source tag on the call event matches the channel that produced the click. This is the cleanest way to separate Google Maps calls from Google Ads calls from organic search calls in a single dashboard.
      </p>
      <p>
        The naming convention for the UTM tags should match the website convention. Source for the GBP listing call is google, medium is organic, campaign is gbp-listing. Source for the Google Ads call is google, medium is cpc, campaign is the actual campaign name. Keeping the convention consistent across the website and the call layer means a single source dimension can drive both reports.
      </p>
      <p>
        For multi-location businesses, the campaign tag carries the location. campaign is gbp-listing-laval for the Laval listing, gbp-listing-quebec for the Quebec City listing, and so on. The location dimension can also be passed as a separate custom dimension if the business already carries a location field on every other event. The right answer depends on the GA4 schema already in place. For owners building from scratch, the single-property schema with a location custom dimension scales better.
      </p>

      <QuickQuiz
        question="A Quebec dentist has a GBP listing in Laval, a Google Ads call extension and a website with a click-to-call button. The owner wants to know which channel produced the bookings last month. What is the minimum stack to answer that?"
        options={[
          'GBP Insights API alone',
          'GA4 with the GBP link enabled',
          'Three dynamic phone numbers (one per channel) feeding GA4 plus the booking system, with Loi 25 consent on every leg',
          'A single tracking number on the GBP listing',
        ]}
        correctIndex={2}
        explanation="GBP Insights and the GA4 link give you the call count by channel at the top of the funnel, but not the booking outcome. Three dynamic numbers, one per channel, plus the GA4 server-side event and the booking system reconciliation are the minimum stack to answer which channel produced the bookings. Loi 25 consent runs on every leg before any recording or enrichment."
      />

      <SectionDivider />

      <h2 id="server-side-event-ingestion-ga4">Server-side event ingestion into GA4</h2>
      <p>
        The call tracker fires a webhook when the call completes. The webhook payload includes the source, the medium, the campaign, the duration and (with consent) the recording URL. The webhook lands on a small endpoint on your stack that maps the payload into a GA4 phone_call event using the GA4 Measurement Protocol. The endpoint runs server-side, which means it survives ad blockers, cookie clearing and the third-party cookie deprecation that already broke client-side tracking on Safari and Firefox.
      </p>
      <p>
        The user identifier on the GA4 event matters more than most owners realize. If the call tracker passes a hashed caller ID, GA4 can stitch the call to a website session when the same identifier appeared on a previous form view or a click-to-call event. If the call tracker does not pass an identifier, the call lands as a separate user, which inflates the user count and breaks the conversion funnel. The right pattern is to derive a stable identifier from the session client ID when the call originated from the website, and from a hashed phone number when the call originated from the GBP listing.
      </p>
      <p>
        The endpoint should also forward the same event to the booking system. Most booking systems accept a webhook with the call metadata attached to the customer record. That joins the call to the booking on the back end, so a query against the booking table can split bookings by source the same way the website analytics splits sessions by source. This is the layer that turns call tracking into a closed-loop attribution system rather than a top-of-funnel counter.
      </p>

      <CalloutBox type="warning">
        <p>Do not pass the raw caller phone number into GA4. The Measurement Protocol explicitly forbids personal identifiers, and a raw phone number plus the timestamp can re-identify the caller. Always hash the phone number before sending, and document the hashing function in the privacy notice for Loi 25 audit purposes.</p>
      </CalloutBox>

      <img
        src={meta.images.mid}
        alt="Sequence diagram showing the call tracker webhook firing into a server-side endpoint that forwards a phone_call event to GA4 and a customer record to the booking system"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <InlineCTA variant="pricing" text="Want a managed phone-call attribution stack with the GBP, GA4 and booking integration handled? See the AiLys plans." />

      <SectionDivider />

      <h2 id="quebec-loi-25-consent-checklist">Quebec Loi 25 consent checklist for call recording</h2>
      <p>
        Loi 25 is the Quebec privacy regulation that took effect in 2023 and tightened in 2024. The law applies to any personal information collected from a Quebec resident, and a phone number plus the call metadata qualifies. The compliance bar has five layers for call tracking, and every layer needs a documented owner before the system goes live.
      </p>
      <ol>
        <li>Explicit consent before recording. The recorded greeting on the call says the call may be recorded and gives the caller a way to opt out before the recording starts.</li>
        <li>Privacy notice on the website. The notice lists the call tracker as a sub-processor, describes the data collected, the retention period and the rights of the caller.</li>
        <li>Retention period. Most local businesses set 12 months for the call recording and 36 months for the call metadata, with a documented purge job.</li>
        <li>Access and deletion contact. A named contact at the business who handles access and deletion requests inside the legal response window.</li>
        <li>Sub-processor agreements. The call tracker contract carries the Loi 25 obligations through to CallRail, Twilio or whoever processes the data.</li>
      </ol>
      <p>
        Most managed call trackers ship Loi 25 disclosures and consent prompts as a feature flag, but the obligation lives with the business. Review the disclosure language with a privacy advisor before shipping. The cost of a Loi 25 violation runs from a written warning to a fine in the millions for repeat offenders, so the upfront review is cheap insurance.
      </p>

      <SectionDivider />

      <h2 id="a-30-day-rollout-plan">A 30 day rollout plan from zero to attributed bookings</h2>
      <p>
        Days 1 to 5, link the GBP property to the GA4 property and verify the phone-call conversion is firing in GA4. Pull the last 90 days of GBP Insights call data into a warehouse view so the historical baseline is preserved. Confirm the GBP listing has the correct primary phone and matches the citation graph.
      </p>
      <p>
        Days 6 to 15, configure the call tracker. Pick CallRail for a managed setup or Twilio Studio for a custom build. Provision the dynamic numbers (one for the GBP listing, one for the website, one for any paid ad extension). Update the GBP secondary phone to the tracking number. Run the citation scan after the swap and confirm no third-party listing changed by accident.
      </p>
      <p>
        Days 16 to 25, build the server-side endpoint. The endpoint receives the call tracker webhook, maps the payload to the GA4 phone_call event, hashes the caller phone number and forwards a customer record to the booking system. Validate the chain end to end with a test call from each source. Confirm the GA4 event lands with the right source-medium-campaign and the booking system shows the call metadata on the customer record.
      </p>
      <p>
        Days 26 to 30, ship the Loi 25 layer. Update the privacy notice on the website with the call tracker sub-processor disclosure. Configure the recorded greeting on the call tracker to capture consent before recording starts. Document the retention periods and the access and deletion contact. Run the first end-to-end test with the consent flow active. For the broader audit pattern that includes Loi 25 verification, see <InternalLink to="/audit" title="Free 24-hour AI Visibility and attribution audit" description="Includes a phone-call attribution review and a Loi 25 readiness check" />.
      </p>

      <InlineCTA variant="book" text="Want a 60-minute walk-through of the call tracking stack on your GBP listings? Book a strategy call, no pitch, the stack diagram is sent regardless." />

      <SectionDivider />

      <KeyTakeaway
        points={[
          'Phone calls from Google Maps are trackable today through GBP Insights, the GA4 link, and a dynamic phone number on the listing.',
          'Put the tracking number on the GBP secondary phone slot and keep the main line as the primary to preserve NAP consistency.',
          'Use the GA4 Measurement Protocol from a server-side endpoint so the phone-call event survives ad blockers and cookie deprecation.',
          'Hash the caller phone number before sending it to GA4 and document the hashing function in the privacy notice.',
          'Quebec Loi 25 requires explicit consent before recording, a published privacy notice, a retention period and a deletion contact.',
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
        alt="Owner reviewing a phone-call attribution dashboard with Google Maps as a distinct source next to Organic, Paid and AI engines"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
