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
  slug: 'ailys-reviuzy-addon-deep-dive',
  title: 'AiLys Automation add-on deep dive, what 100 dollars a month gets you',
  metaDescription:
    'A complete tour of the AiLys Automation add-on at 100 dollars CAD a month. NFC review collection, AI replies, the contest engine, legal generator, fake review detection, GBP automation.',
  tldr: 'The AiLys Automation add-on bolts onto any AiLys monthly tier for 100 dollars CAD a month, and it ships bundled inside the Agency tier. The scope covers NFC review collection cards, AI review and reply generation, a contest engine with video winner picker, a jurisdiction-aware legal terms generator, fake review detection, and the full GBP automation suite (photo upload, Q and A monitor, attribute manager). Clients run their own contests using the AiLys client app, and AiLys ships only the setup, the legal documents, and the help docs.',
  category: 'ailys-product',
  tags: ['reviuzy', 'reputation', 'pricing', 'add-on', 'gbp automation', 'ailys-product'],
  publishedDate: '2026-03-25',
  updatedDate: '2026-03-25',
  author: AUTHORS.product,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/ailys-reviuzy-addon-deep-dive/hero.webp',
    mid: '/blog-images/ailys-reviuzy-addon-deep-dive/mid.webp',
    end: '/blog-images/ailys-reviuzy-addon-deep-dive/end.webp',
  },
  faqItems: [
    {
      question: 'What does the AiLys Automation add-on cost and include?',
      answer:
        'The AiLys Automation add-on is 100 dollars CAD a month on top of any AiLys tier, and it is bundled inside the Agency tier at 2,499 dollars a month. The scope covers NFC review collection cards, AI review and reply generation, a contest engine with video winner picker, a jurisdiction-aware legal terms generator, fake review detection, and the full GBP automation suite that includes photo upload, Q and A monitoring, and attribute management.',
    },
    {
      question: 'Does AiLys run the AiLys Automation contest for the client?',
      answer:
        'No. The client runs the contest using the AiLys client app on their phone. AiLys ships the contest setup inside the dashboard, the legal terms and conditions document tailored to the client jurisdiction, and the help docs that walk through the video winner picker. The client owns the entry list, the prize, and the draw moment. This separation is a hard rule of the AiLys product.',
    },
    {
      question: 'Who sources the photos for GBP automation?',
      answer:
        'The client sources the photos through the AiLys client app. AiLys does not source photos for the client. The AiLys client app on the phone captures the photo, runs the EXIF and quality checks, and pushes the file into the GBP automation queue. The agency layer applies the schema, the geo tagging, and the upload cadence, but the raw photo always comes from the client device.',
    },
    {
      question: 'How does the fake review detection work?',
      answer:
        'AiLys Automation scans incoming reviews against signals that map to the Google fake review playbook. The signals include reviewer history depth, posting cadence, geographic coherence with the business location, language patterns that match generated text, and timing clusters. Flagged reviews go into a queue inside the dashboard, and the client can dispute them through the Google Business Profile flag flow with the evidence pre-packaged.',
    },
    {
      question: 'Is the legal terms generator a real lawyer?',
      answer:
        'No. The generator produces a draft set of contest terms and conditions tailored to the client jurisdiction (Quebec, Ontario, the rest of Canada, or the United States), drawing on the requirements of the Loi sur les loteries publicitaires for Quebec, the Competition Act for Canada, and the relevant state rules for the United States. It is a starting draft, not legal advice. We recommend a final review by the client lawyer for high-value contests.',
    },
  ],
  relatedSlugs: ['reviuzy-review-automation-guide', 'ailys-pricing-tiers-explained-cad', 'google-review-velocity-playbook'],
  headings: [
    { id: 'what-the-reviuzy-add-on-actually-is', text: 'What the AiLys Automation add-on actually is' },
    { id: 'pricing-and-bundling', text: 'Pricing and how Agency bundles it' },
    { id: 'nfc-review-collection-cards', text: 'NFC review collection cards on the counter' },
    { id: 'ai-review-and-reply-generation', text: 'AI review and reply generation' },
    { id: 'contest-engine-and-video-winner', text: 'Contest engine and video winner picker' },
    { id: 'legal-terms-generator', text: 'Jurisdiction-aware legal terms generator' },
    { id: 'fake-review-detection', text: 'Fake review detection and dispute prep' },
    { id: 'gbp-automation-suite', text: 'GBP automation suite (photos, Q and A, attributes)' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        The AiLys Automation reputation add-on is the reputation and review automation layer that bolts onto any AiLys tier for 100 dollars CAD a month, and it is bundled inside the Agency tier. The scope is wider than a review collection tool. It covers NFC cards on the counter, AI review and reply generation, a contest engine with a video winner picker, a jurisdiction-aware legal terms generator, fake review detection, and the full GBP automation suite that ships photo uploads, Q and A monitoring, and attribute management. This page walks through every module, what it does, and where the line sits between the agency layer and the client workflow.
      </p>

      <StatHighlight
        stats={[
          { value: '$100 CAD', label: 'AiLys Automation add-on monthly price' },
          { value: 'Bundled', label: 'Inside the Agency tier at 2,499 dollars' },
          { value: '8 modules', label: 'NFC, AI replies, contests, legal, fakes, photos, Q and A, attributes' },
        ]}
      />

      <SectionDivider />

      <h2 id="what-the-reviuzy-add-on-actually-is">What the AiLys Automation reputation add-on actually is</h2>
      <p>
        AiLys Automation is the AiLys SaaS for reputation. It runs alongside the AI Visibility engine and the GBP work (see the <InternalLink to="/glossary/gbp" title="GBP glossary entry" description="Google Business Profile and the ranking signals it carries" /> for the underlying surface), and it is the only AiLys module that ships its own mobile app. The app is on the client phone for two reasons. First, NFC card taps and contest entries land on the client device, not the agency. Second, photos come from the client camera with real EXIF data, which the GBP photo upload module needs to score the freshness signal correctly.
      </p>
      <p>
        The dashboard lives at the agency layer. It runs the queue for AI review replies, the fake review detection pipeline, the contest entry list, the legal documents, and the GBP automation cadence. Owners log in to approve replies and trigger the contest draw. Strategists log in to review the queue and ship corrections. The split is intentional, and it reflects two principles inside the AiLys product. The client owns the customer relationship. AiLys ships the tooling and the legal cover.
      </p>

      <CalloutBox type="info">
        <p>The AiLys Automation reputation add-on is not the same product as the standalone AiLys client app on the App Store and Google Play. The standalone app is a free version with manual review collection only. The AiLys Automation reputation add-on at 100 dollars a month unlocks the full automation pipeline and the GBP integration. See <InternalLink to="/blog/reviuzy-review-automation-guide" title="AiLys Automation review automation guide" description="The longer playbook on the standalone app and the add-on" /> for the line-by-line difference.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" text="See where the AiLys Automation add-on slots into the four AiLys tiers, from Starter at 300 dollars to Agency at 2,499 dollars." />

      <SectionDivider />

      <h2 id="pricing-and-bundling">Pricing and how Agency bundles it</h2>
      <p>
        The AiLys Automation reputation add-on is 100 dollars CAD a month flat. It bolts onto Starter (300 dollars), Core (600 dollars), or Growth (1,200 dollars), bringing those tiers to 400, 700, or 1,300 dollars a month respectively. At the Agency tier (2,499 dollars), AiLys Automation is bundled, so the operator does not pay extra. The bundling decision reflects how the Agency tier is positioned: it is the multi-location, white label tier where reputation work is the default expectation, not an upsell.
      </p>
      <p>
        Annual billing applies a small discount, and adding AiLys Automation at sign-up is the cleanest path because the NFC cards ship inside the welcome kit. Adding it later means a separate fulfillment trip for the cards, which delays the first counter taps by a week. The dashboard side activates the same day the add-on is enabled, so the AI reply queue and the GBP automation start running immediately even if the cards are still in transit.
      </p>

      <h3>What each tier looks like with AiLys Automation</h3>
      <ul>
        <li>Starter plus AiLys Automation at 400 dollars: GBP optimization, monthly AI Visibility report, NAP audit on the top five citations, plus the full AiLys Automation suite</li>
        <li>Core plus AiLys Automation at 899 dollars: weekly GBP posts, citation cleanup on twenty targets, FAQ schema, plus AiLys Automation</li>
        <li>Growth plus AiLys Automation at 1,599 dollars: original photography, monthly content production, two AI Visibility audits a quarter, plus AiLys Automation</li>
        <li>Agency at 2,499 dollars: AiLys Automation is bundled, multi-location and white label included, dedicated strategist, weekly reporting</li>
      </ul>

      <SectionDivider />

      <h2 id="nfc-review-collection-cards">NFC review collection cards on the counter</h2>
      <p>
        The NFC cards are the physical surface of the add-on. They sit on the counter, the pin pad, the reception desk, or the take-out bag. A customer taps the card with their phone, the phone opens a AiLys Automation landing page, and the page routes the customer to the Google Business Profile review form for the right location. No app install. No QR scan. Just a tap.
      </p>
      <p>
        The NFC tap rate beats QR codes by a wide margin in retail and clinical settings, because the gesture is closer to a contactless payment, which most customers already do without thinking. The cards are pre-printed with the client logo, branded for the location, and shipped with the welcome kit. Multi-location accounts at the Agency tier get one card stack per location, with location-specific routing baked into the NFC tag itself.
      </p>

      <CalloutBox type="tip">
        <p>Place the NFC card within reach of where the customer pays. Beside the pin pad is the strongest position for retail and restaurants. On the reception clipboard is the strongest position for clinics and dental offices. Avoid placing the card near the exit, because once the customer is walking out, the moment is gone. The tap-to-review flow needs to land while the customer is still standing still.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="ai-review-and-reply-generation">AI review and reply generation</h2>
      <p>
        The reply generation module pulls every new review from the connected Google Business Profile, ranks them by sentiment and visibility, and drafts a reply in the brand voice. The client sees the draft inside the dashboard, edits if needed, and approves with a single tap. Negative reviews trigger a different draft path: the engine produces a measured, non-defensive reply that acknowledges the issue, names the resolution path, and signs off with the manager name. The owner is never auto-replying to a one-star.
      </p>
      <p>
        The review generation side helps customers who tap the NFC card but freeze at the blank review form. The AiLys Automation landing page offers two opt-in prompts. The first asks the customer what they liked, in their own words. The second drafts a polished version of that snippet and shows it back, so the customer can copy, paste, and submit. This is opt-in, the customer always edits, and the final review is in their own writing.
      </p>

      <QuickQuiz
        question="At which AiLys tier is the AiLys Automation add-on bundled at no extra cost?"
        options={[
          'Starter at 300 dollars CAD a month',
          'Core at 600 dollars CAD a month',
          'Growth at 1,200 dollars CAD a month',
          'Agency at 2,499 dollars CAD a month',
        ]}
        correctIndex={3}
        explanation="AiLys Automation is bundled inside the Agency tier. At Starter, Core, and Growth, the add-on is 100 dollars CAD a month on top of the tier price. At Agency, it is included by default because reputation automation is the standard scope at the multi-location and white label level."
      />

      <SectionDivider />

      <h2 id="contest-engine-and-video-winner">Contest engine and video winner picker</h2>
      <p>
        The contest engine is the strongest module for review velocity. The owner sets up a draw inside the dashboard, defines the prize, the duration, and the entry rules, and the engine wires up the entry capture. Customers enter the contest by tapping the NFC card, optionally leaving a Google review, and confirming the entry on the AiLys client app. The entry list is held inside the client account, not the agency account.
      </p>
      <p>
        The winner picker runs as a video. The owner triggers the draw in front of staff or on a Facebook Live stream, and the dashboard shows a randomized animation that lands on the winner. The video file is downloadable, watermark-free, and shareable, which is the artifact the owner posts to social and to the GBP timeline. This is the moment that converts the contest into ongoing review velocity, because the next batch of customers see the draw happen and trust the next contest.
      </p>

      <CalloutBox type="warning">
        <p>The client runs the contest. AiLys ships the setup, the legal terms, and the help docs, but the draw moment, the prize fulfillment, and the winner notification belong to the client. This boundary is a hard rule inside the AiLys product, and it exists because the contest is a regulated activity in most jurisdictions, and the regulator wants the operator of record to be the business, not the marketing agency.</p>
      </CalloutBox>

      <img
        src={meta.images.mid}
        alt="AiLys Automation contest engine dashboard with video winner picker animation and entry list export"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="legal-terms-generator">Jurisdiction-aware legal terms generator</h2>
      <p>
        Every contest needs terms and conditions. In Quebec, the Loi sur les loteries publicitaires applies, and the Régie des alcools, des courses et des jeux requires registration above a prize threshold. In the rest of Canada, the Competition Act applies, with the no-purchase-necessary requirement and the skill-testing question. In the United States, state-level rules apply, with California, New York, and Florida being the most regulated. The legal generator produces a draft set of terms and conditions tailored to the client jurisdiction, with the right registration steps and the right disclosure language.
      </p>
      <p>
        The generator is a starting draft, not legal advice. For high-value contests above 2,000 dollars in prize value, we recommend a final review by the client lawyer. For low-value contests (gift card draws under 500 dollars), the generated draft is typically the only document the operator needs. The generator outputs a PDF, a plain text version for the website, and a short summary for the contest landing page.
      </p>

      <InlineCTA variant="audit" />

      <SectionDivider />

      <h2 id="fake-review-detection">Fake review detection and dispute prep</h2>
      <p>
        Fake reviews are the quiet tax on local reputation. A competitor or a frustrated former employee can post a one-star with no recourse, and the review sits on the profile for years if no one disputes it. The AiLys Automation fake detection module scans incoming reviews against signals that map to the Google fake review playbook. The signals include reviewer history depth (a brand-new account that posts one negative and disappears), posting cadence (clusters of reviews from accounts with no other activity), geographic coherence with the business location, language patterns that match generated text, and timing clusters that suggest coordination.
      </p>
      <p>
        Flagged reviews go into a queue inside the dashboard. The owner reviews each flag, confirms or dismisses it, and the system pre-packages the dispute submission for the GBP flag flow. The dispute includes the evidence (account history screenshot, location data, language analysis), which improves the success rate of the Google review removal compared to a bare flag with no context. We do not promise removal, because the final decision is Google's, but the prep work moves the odds.
      </p>

      <SectionDivider />

      <h2 id="gbp-automation-suite">GBP automation suite (photos, Q and A, attributes)</h2>
      <p>
        The GBP automation suite is the back-office side of the add-on, and it is the module that generates the most ongoing visibility lift. See the <InternalLink to="/glossary/gbp" title="GBP glossary entry" description="The full definition of Google Business Profile and the ranking signals it carries" /> for the underlying ranking model. The suite has three sub-modules, and each one runs on a weekly cadence.
      </p>
      <p>
        Photo upload pulls fresh photos from the AiLys client app on the client phone, runs EXIF and quality checks, geo-tags the file with the business address, and pushes it to GBP through the official API. The cadence is two photos a week minimum, and the engine prioritizes interior, food, team, and storefront variety over duplicates. Q and A monitoring scans the public questions on the GBP profile, drafts replies in the brand voice, and queues them for owner approval. Attribute management audits the boolean toggles on the profile (wheelchair accessible, free Wi-Fi, has a patio, accepts reservations), and surfaces the gaps inside the dashboard with one-tap fix flows.
      </p>

      <CalloutBox type="info">
        <p>The photo source is always the client. AiLys does not source photos for the client. The AiLys client app on the client phone captures the photo, runs the freshness checks, and feeds the upload queue. This is a hard rule, and it is what makes the EXIF data real. Stock photos and stolen photos are detectable by Google and they erode rather than build the local ranking signal.</p>
      </CalloutBox>

      <InlineCTA variant="book" text="Want a 60-minute walkthrough of the AiLys Automation add-on with screen share, no pitch, recording sent regardless?" />

      <SectionDivider />

      <KeyTakeaway
        points={[
          'The AiLys Automation add-on is 100 dollars CAD a month on top of any AiLys tier, and it is bundled inside the Agency tier at 2,499 dollars a month.',
          'NFC cards on the counter beat QR codes for review collection because the gesture matches contactless payment.',
          'The contest engine is run by the client. AiLys ships only the setup, the legal terms, and the help docs.',
          'Photos for GBP automation always come from the client through the AiLys client app, which preserves real EXIF data.',
          'The legal terms generator is a starting draft for the client jurisdiction, not legal advice. High-value contests need lawyer review.',
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
        alt="AiLys Automation add-on full module map with NFC, AI replies, contest engine, legal generator, fake detection, and GBP automation"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
