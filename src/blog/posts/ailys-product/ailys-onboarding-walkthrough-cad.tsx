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
  slug: 'ailys-onboarding-walkthrough-cad',
  title: 'AiLys onboarding, the week-by-week walkthrough for Quebec owners',
  metaDescription:
    'A clear week-by-week breakdown of AiLys onboarding for a Quebec local business. The audit, the GBP work, the citations, the AI Visibility baseline, and the first weekly report.',
  tldr: 'AiLys onboarding for a Quebec local business runs four weeks. Week 1 ships the free audit + the GBP optimization pass + the consent layer. Week 2 ships the first 5 to 15 citations and the AEO schema. Week 3 ships the AI Visibility baseline and the first content brief. Week 4 ships the first executive report and aligns the cadence. After week 4, the work moves to a steady rhythm matched to the tier.',
  category: 'ailys-product',
  tags: ['ailys', 'onboarding', 'quebec', 'workflow', 'ailys-product'],
  publishedDate: '2026-04-28',
  updatedDate: '2026-04-28',
  author: AUTHORS.product,
  readTimeMinutes: 8,
  images: {
    hero: '/blog-images/ailys-onboarding-walkthrough-cad/hero.webp',
    mid: '/blog-images/ailys-onboarding-walkthrough-cad/mid.webp',
    end: '/blog-images/ailys-onboarding-walkthrough-cad/end.webp',
  },
  faqItems: [
    {
      question: 'How long does the AiLys onboarding actually take?',
      answer:
        'Four weeks from contract signature to a steady cadence. Week 1 closes the audit and the GBP pass. Week 2 ships the citations and the schema. Week 3 ships AI Visibility and the first content brief. Week 4 ships the first executive report. Most clients see local pack movement during week 2 and AI Visibility surface during week 3, although timing varies by starting state.',
    },
    {
      question: 'Do I need to provide anything before the first week?',
      answer:
        'Three things. Access to your Google Business Profile (we add a manager, you stay primary). The list of physical locations you operate (one for Starter, multiple for Agency tier). A short written description of your services in your voice. We do not need analytics access until week 1 audit; the audit step requests it on the first call.',
    },
    {
      question: 'What does the free audit actually cover?',
      answer:
        'Five layers, all delivered inside 24 hours of submission. Technical SEO baseline (speed, crawlability, indexation), GBP completeness against the category attribute set, NAP consistency across the top citation directories for your vertical, schema audit on the homepage and primary service pages, and an AI Visibility probe across six AI engines for your top three branded queries. The deliverable is a PDF with named gaps, not a sales pitch.',
    },
    {
      question: 'Is the onboarding bilingual EN and FR-CA from the start?',
      answer:
        'Yes. AiLys ships every deliverable in EN and FR-CA in-house from the first day. The audit is delivered in your preferred language. The GBP optimization carries bilingual hours and bilingual primary description. The schema includes alternateName entries in both languages. The first content brief includes both English and Quebec French versions. No translation API touches the work.',
    },
    {
      question: 'What happens after week 4?',
      answer:
        'The work shifts to a steady cadence matched to your tier. Starter sees one GBP post per month plus weekly LLM citation tracking. Core sees four GBP posts per month, five citations per month, and weekly bilingual content. Growth adds Wikipedia and Wikidata work, eight posts per month, and competitive monitoring. Agency adds dedicated strategist hours, multi-location dashboard, twelve posts per month, and quarterly executive deck presented in person.',
    },
  ],
  relatedSlugs: [
    'ailys-pricing-tiers-explained-cad',
    'ailys-vs-traditional-seo-agency',
    'ailys-bilingual-content-workflow',
    'ai-visibility-audit-checklist-2026',
  ],
  headings: [
    { id: 'why-four-weeks', text: 'Why four weeks, not two and not eight' },
    { id: 'week-one-audit-and-gbp', text: 'Week 1: audit and GBP pass' },
    { id: 'week-two-citations-and-schema', text: 'Week 2: citations and AEO schema' },
    { id: 'week-three-ai-visibility', text: 'Week 3: AI Visibility baseline and first content brief' },
    { id: 'week-four-first-report', text: 'Week 4: first executive report and cadence alignment' },
    { id: 'what-changes-by-tier', text: 'What changes between Starter, Core, Growth, Agency' },
    { id: 'common-onboarding-blockers', text: 'Common onboarding blockers and how we clear them' },
    { id: 'after-the-first-month', text: 'After the first month: the steady cadence' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        AiLys onboarding takes four weeks from contract signature to a steady
        rhythm. Week 1 closes the audit and the GBP pass. Week 2 ships the
        first 5 to 15 citations and the schema. Week 3 ships the AI
        Visibility baseline and the first content brief. Week 4 ships the
        first executive report and aligns the cadence with your tier.
      </p>

      <StatHighlight
        stats={[
          { value: '4 weeks', label: 'from signature to steady cadence' },
          { value: '24 hours', label: 'audit turnaround on day one' },
          { value: '30 days', label: 'satisfaction guarantee on every plan' },
        ]}
      />

      <p>
        This walkthrough is honest about timing and scope. AiLys does not
        promise local pack rank in week one. It promises a clean audit, a
        completed GBP, the first citations live, and a measurement baseline
        you can read by week 4. Local pack movement and AI Visibility lift
        follow that work, often during weeks 2 and 3, although every
        starting state is different.
      </p>

      <SectionDivider />

      <h2 id="why-four-weeks">Why four weeks, not two and not eight</h2>
      <p>
        Two-week onboarding rushes the audit and skips the schema. Eight-week
        onboarding pads the timeline with discovery meetings that the
        platform can do automatically. Four weeks is the honest middle: long
        enough to ship a complete first pass across all five layers (technical
        baseline, GBP, citations, schema, AI Visibility), short enough that
        the team feels traction by month one.
      </p>

      <CalloutBox type="info">
        The audit step is automated. The platform runs the probes, scores the
        gaps, and generates the deliverable in under 24 hours. The strategist
        adds judgment in week 1 to prioritize the gaps that matter for your
        vertical and city. That is why the audit is free and arrives fast.
      </CalloutBox>

      <SectionDivider />

      <h2 id="week-one-audit-and-gbp">Week 1: audit and GBP pass</h2>
      <p>
        Day 1 is the kickoff call (45 minutes). The strategist confirms your
        services, your locations, and your goal vertical. The platform
        triggers the audit probe. The deliverable lands in your inbox inside
        24 hours, in your preferred language.
      </p>
      <p>
        Days 2 to 5 are the GBP pass. The team adds itself as a manager,
        completes every category attribute, sets bilingual hours, fills the
        primary description in EN and FR-CA, uploads the first 4 photos
        sourced by you (Starter quota; Core 8, Growth 12, Agency up to 12 per
        domain), and opens the first weekly post.
      </p>

      <InternalLink
        to="/audit"
        title="Run the free 24-hour AI Visibility audit"
        description="The same probe AiLys runs on day 1 of onboarding. No card, no pitch, deliverable by email."
      />

      <p>
        The week 1 deliverable is the audit PDF, the completed GBP, the
        first GBP post, and the consent layer template wired into your
        site. By Friday of week 1, the consent banner is live and your GBP
        is at 100% completeness. The team flags any technical SEO blockers
        for week 2 work.
      </p>

      <CalloutBox type="tip">
        Photos sourced by the client carry real EXIF metadata, which the AI
        engines weight as authentic. Stock photos and AI-generated images
        get downweighted. Per the Reviuzy app workflow, you upload photos
        from your phone; AiLys does not source them.
      </CalloutBox>

      <SectionDivider />

      <h2 id="week-two-citations-and-schema">Week 2: citations and AEO schema</h2>
      <p>
        Citations land based on your tier. Starter sees the technical
        baseline plus monthly tracking. Core ships 5 citations to the
        directories that matter for your vertical (Yelp, BBB, Pages Jaunes,
        plus 2 vertical-specific). Growth ships 10. Agency ships 15 with
        deeper geographic spread.
      </p>
      <p>
        AEO schema deploys on the homepage and the top three service pages.
        LocalBusiness or vertical subtype (Attorney, Dentist, Restaurant,
        AutoRepair, etc.), FAQPage on the FAQ section, Service for each
        service offering, BreadcrumbList for navigation. Person schema for
        the business owner if E-E-A-T signals are part of the strategy.
      </p>

      <InternalLink
        to="/blog/local-schema-markup-cheat-sheet"
        title="Local schema markup cheat sheet"
        description="The exact schema types AiLys deploys per vertical, with example payloads"
      />

      <SectionDivider />

      <h2 id="week-three-ai-visibility">Week 3: AI Visibility baseline and first content brief</h2>
      <p>
        Week 3 establishes the AI Visibility baseline. The platform runs
        probes across six AI engines for your top three branded queries
        and your top three vertical queries. The output is a Share of Model
        score per engine plus a sentiment classification per citation. The
        baseline becomes the comparison point for every weekly probe after.
      </p>

      <QuickQuiz
        question="What does the AI Visibility baseline measure during onboarding week 3?"
        options={[
          'Backlink count to your homepage',
          'Citation share inside answers from six named AI engines',
          'GBP impressions for the past 30 days',
          'Domain authority score from a third-party SEO tool',
        ]}
        correctIndex={1}
        explanation="The AiLys AI Visibility engine probes six named AI engines (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot) for your branded and vertical queries, counts citations, and reports a per-engine and aggregate Share of Model. The other items measure adjacent things (backlinks, GBP impressions, domain authority) but none of them is the AI Visibility baseline itself."
      />

      <p>
        The first content brief lands at the end of week 3. It names the
        three queries with the largest gap between current Share of Model
        and what is winnable in 90 days. For each query, the brief includes
        the target answer length, the schema layer to add, and the citation
        anchors to seek.
      </p>

      <InlineCTA
        variant="audit"
        text="Curious where your business stands inside AI search before signing up? Run the free AI Visibility audit, same probe AiLys uses on day 1 of onboarding."
      />

      <SectionDivider />

      <h2 id="week-four-first-report">Week 4: first executive report and cadence alignment</h2>
      <p>
        The first executive report ships at the end of week 4. Six tiles:
        Share of Model %, AI traffic visits, conversions, citations
        verified, photos published, questions answered. White-label
        branding for Agency tier; Starter, Core, and Growth see the
        AiLys-branded version. The report is a PDF generated client-side
        in your browser; nothing leaves your account database during the
        export step.
      </p>

      <CalloutBox type="warning">
        The week 4 report is the first time the team sees the conversion
        rate row. If the site is not wired with the four custom events
        (click_call, click_directions, click_book, form_submit), the row
        is empty. The week 1 GBP pass includes the consent layer, but the
        events are wired during the technical SEO step in week 2. By week
        4 the wiring is live and the row populates.
      </CalloutBox>

      <p>
        Week 4 also locks the cadence for the rest of the engagement. The
        strategist confirms which day of the week the GBP posts go out,
        which day the executive report ships, and which day the citation
        check runs. From week 5 forward, the rhythm is steady.
      </p>

      <SectionDivider />

      <h2 id="what-changes-by-tier">What changes between Starter, Core, Growth, Agency</h2>
      <p>
        The four-week shape stays the same across tiers. The depth and
        cadence change.
      </p>
      <ul>
        <li><strong>Starter ($300 CAD/mo):</strong> audit, GBP pass, NAP consistency, weekly LLM citation tracking, 1 GBP post/mo, 4 photos/mo</li>
        <li><strong>Core ($600):</strong> all of Starter plus AEO schema, 5 monthly citations, bilingual content, 4 GBP posts/mo (1/week), 8 photos/mo</li>
        <li><strong>Growth ($1,200):</strong> all of Core plus GEO entity authority, Wikipedia and Wikidata, 8 GBP posts/mo (2/week), 12 photos/mo, weekly bilingual content, competitive monitoring</li>
        <li><strong>Agency ($2,499):</strong> all of Growth plus multi-location dashboard, white-label PDF, Slack SLA under 4 hours, API access, custom integrations, 12 GBP posts/mo (3/week), up to 12 photos/mo per domain, dedicated senior strategist, quarterly executive deck presented in person</li>
      </ul>

      <InternalLink
        to="/blog/ailys-pricing-tiers-explained-cad"
        title="AiLys pricing tiers explained in CAD"
        description="The full tier-by-tier breakdown with what is included at each price point"
      />

      <SectionDivider />

      <h2 id="common-onboarding-blockers">Common onboarding blockers and how we clear them</h2>
      <ul>
        <li><strong>GBP suspended or unverified:</strong> we walk through the reinstatement form on the kickoff call and submit verification documents the same week</li>
        <li><strong>NAP mismatch across 30+ directories:</strong> we publish the canonical NAP block, lock it in your records, and run a consistency pass during week 2</li>
        <li><strong>Site speed under 200 ms TTFB but failing Core Web Vitals:</strong> we add Domain Speed Boost ($35/mo add-on) for week 2 and rerun the audit at the end of week 4</li>
        <li><strong>No bilingual content yet:</strong> we ship the first FR-CA pass during week 3 in-house; no translation API used</li>
        <li><strong>Owner not on GBP:</strong> we request ownership transfer on day 1 and follow Google's standard 7-day review window</li>
      </ul>

      <CalloutBox type="danger">
        The single most common blocker is a GBP that the owner does not
        actually own. Verify ownership status before week 1 if possible.
        The fix is straightforward but adds 7 days to the timeline.
      </CalloutBox>

      <SectionDivider />

      <h2 id="after-the-first-month">After the first month: the steady cadence</h2>
      <p>
        From week 5 forward, the work moves to a steady weekly rhythm. The
        strategist runs the citation check, the AI Visibility probe, the
        GBP post review, the photo upload review (your photos via the
        Reviuzy app), and the content brief drafting. Monthly, the
        executive report ships on the first business day. Quarterly,
        Agency clients receive an in-person executive deck presented by
        the dedicated strategist.
      </p>

      <KeyTakeaway
        points={[
          'Four-week onboarding is the honest middle between rushed two-week setups and padded eight-week timelines',
          'Week 1 ships audit + GBP. Week 2 ships citations + schema. Week 3 ships AI Visibility + first content brief. Week 4 ships first executive report + locks cadence.',
          'Bilingual EN and FR-CA in-house from day 1. No translation API touches the work.',
          'Photos are client-sourced (real EXIF) via the Reviuzy app. AiLys does not source photos.',
          'After week 4, the rhythm is steady and matched to your tier (Starter through Agency).',
        ]}
      />

      <InlineCTA
        variant="pricing"
        text="Ready to see the four tiers and pick the one that fits? Plans start at $300 CAD/mo, all with a 30-day satisfaction guarantee."
      />

      <img
        src={meta.images.end}
        alt="A strategist and a Quebec local business owner shaking hands at a glass meeting table after the first executive report review"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <InlineCTA
        variant="book"
        text="Want a 60-minute strategy call before signing up? No pitch, strategy doc sent regardless of whether you sign."
      />

      <h2 id="faq">Frequently Asked Questions</h2>
      {meta.faqItems.map((f, i) => (
        <details key={i} className="my-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <summary className="font-semibold text-white/90 cursor-pointer">{f.question}</summary>
          <p className="mt-3 text-white/70 text-[0.95rem] leading-relaxed">{f.answer}</p>
        </details>
      ))}
    </article>
  )
}
