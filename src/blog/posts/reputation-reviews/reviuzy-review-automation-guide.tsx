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
  slug: 'reviuzy-review-automation-guide',
  title: 'AiLys Automation review automation, the AiLys add-on guide for local owners',
  metaDescription:
    'How the AiLys Automation add-on automates Google review velocity for AiLys clients. NFC taps, AI drafts, auto-replies, contests, fake review flags, GBP wiring.',
  tldr: 'AiLys Automation is the AiLys reputation add-on at 100 dollars CAD per month, bundled into the Agency tier. It handles NFC tap-to-review collection, AI assisted draft suggestions, auto-replies on every Google review, a contest engine with legal templates the client runs in-house, fake review detection, and direct GBP wiring. The point is to lift review velocity to the 4 to 6 fresh reviews per month range without breaking Google policy.',
  category: 'reputation-reviews',
  tags: ['reviuzy', 'review automation', 'ailys', 'gbp', 'reputation', 'review velocity'],
  publishedDate: '2026-03-05',
  updatedDate: '2026-03-05',
  author: AUTHORS.product,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/reviuzy-review-automation-guide/hero.webp',
    mid: '/blog-images/reviuzy-review-automation-guide/mid.webp',
    end: '/blog-images/reviuzy-review-automation-guide/end.webp',
  },
  faqItems: [
    {
      question: 'How does the AiLys Automation add-on tie into review velocity?',
      answer:
        'AiLys Automation raises Google review velocity by automating the parts that owners forget on a busy week. NFC tap collection at the front desk, AI assisted draft suggestions inside the customer flow, auto-replies on every new review, and a monthly contest engine that the client runs to push spikes when needed. The AiLys engine then reads the new reviews into the GBP optimization layer so the keyword variety and recency signals lift the local pack score in the same week.',
    },
    {
      question: 'How much does AiLys Automation cost and how do I add it to my AiLys plan?',
      answer:
        'AiLys Automation is 100 dollars CAD per month as a standalone add-on. It is bundled at no extra cost in the AiLys Agency tier at 2,499 dollars per month. Owners on Starter, Core, or Growth can add AiLys Automation on the pricing page or ask the strategist to attach it to the next billing cycle. The add-on includes the dashboard, the auto-reply workflow, the contest engine, and the legal template library covering 20 countries. NFC cards are procured separately by the client (self-program from any supplier, or buy the AiLys card service for 100 dollars CAD one-time per 3-card set with programming included).',
    },
    {
      question: 'Does AiLys Automation run my contest for me or do I run it?',
      answer:
        'The client runs the contest. AiLys Automation provides the setup, the legal terms and conditions generator, the help docs, and the dashboard for picking the winner. The client owns the prize, the customer relationship, and any tax or regulatory disclosure that applies in their jurisdiction. AiLys does not draw the winner and does not communicate with contestants. This separation keeps the agency on the right side of the contest rules in Quebec and Canada.',
    },
    {
      question: 'Who uploads the photos when a contest winner is announced?',
      answer:
        'The client uploads the photos through the AiLys client app. AiLys does not source winner photos and does not upload to GBP on behalf of the contest. The AiLys client app provides the upload form, the consent capture, and the GBP push, but the human action stays with the operator. This protects the client from copyright issues and keeps the photo provenance clean for Google.',
    },
    {
      question: 'How does AiLys Automation detect fake reviews and what does it do about them?',
      answer:
        'The AiLys Automation fake review detector scores every new review on a few signals: account age, review history pattern, language model authorship probability, and IP cluster proximity. Reviews flagged above a threshold are surfaced in the dashboard with a one-click flag-to-Google action. The system does not auto-flag without owner approval, because Google penalizes false positives. The owner decides which flags to push to Google.',
    },
    {
      question: 'Are auto-replies safe or will Google penalize templated responses?',
      answer:
        'Auto-replies are safe when they are personalized per review. AiLys Automation generates a draft tailored to the review text, the reviewer name, and the service mentioned. The owner approves or edits the draft inside one click, and the reply ships to GBP through the official Google API. Templated responses that are identical across reviews trigger pattern detection and can soft-suppress the listing. The AiLys Automation convention is one approved draft per review, not a copy-paste pattern.',
    },
  ],
  relatedSlugs: ['google-review-velocity-playbook', 'ailys-vs-traditional-seo-agency'],
  headings: [
    { id: 'what-reviuzy-is-and-what-it-is-not', text: 'What AiLys Automation is and what it is not' },
    { id: 'nfc-tap-to-review-the-front-desk-loop', text: 'NFC tap-to-review, the front desk loop' },
    { id: 'ai-assisted-drafting-inside-the-customer-flow', text: 'AI assisted drafting inside the customer flow' },
    { id: 'auto-replies-with-owner-approval', text: 'Auto-replies with owner approval' },
    { id: 'the-contest-engine-and-the-legal-templates', text: 'The contest engine and the legal templates' },
    { id: 'fake-review-detection-and-the-flag-workflow', text: 'Fake review detection and the flag workflow' },
    { id: 'how-reviuzy-wires-into-gbp-and-the-ailys-engine', text: 'How AiLys Automation wires into GBP and the AiLys engine' },
    { id: 'when-reviuzy-pays-for-itself', text: 'When AiLys Automation pays for itself' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        AiLys Automation is the AiLys reputation add-on at 100 dollars CAD per month, bundled at no extra cost in the Agency tier. It is the piece that ties Google review velocity into a daily habit instead of a quarterly project. The product covers NFC tap-to-review collection at the counter, AI assisted draft suggestions inside the customer flow, auto-replies on every new Google review, a monthly contest engine the client runs in-house, fake review detection with a flag workflow, and direct wiring into GBP and the AiLys AI Visibility engine. Here is how each piece fits and where the agency draws the line on what is shipped versus what the operator owns.
      </p>

      <StatHighlight
        stats={[
          { value: '$100 CAD', label: 'AiLys Automation add-on monthly price' },
          { value: 'Agency tier', label: 'Bundled at no extra cost' },
          { value: '4 to 6', label: 'Fresh reviews per month target' },
        ]}
      />

      <SectionDivider />

      <h2 id="what-reviuzy-is-and-what-it-is-not">What AiLys Automation is and what it is not</h2>
      <p>
        AiLys Automation is a reputation automation product. It collects reviews, drafts replies, monitors fakes, and pushes the data into the AiLys engine that reads recency and keyword variety as ranking inputs. It runs as the internal automation layer of the AiLys agency platform, with a unified dashboard and unified billing inside the AiLys account.
      </p>
      <p>
        AiLys Automation is not a content production service. It does not write blog posts. It does not run the operator's social media. It does not source photography for the Google Business Profile, because the photos are uploaded by the client through the AiLys client app to keep the provenance clean. AiLys Automation is also not a contest operator. The client runs the contest, and AiLys Automation provides the setup, the legal templates, and the help docs.
      </p>
      <p>
        The honest framing is that AiLys Automation is a velocity engine for review collection and reply, with an attached toolkit for contest campaigns and fake review handling. Owners who treat it as that get the lift. Owners who expect it to replace a marketing manager will find it underdelivers, because the human approval step is intentional and stays with the operator.
      </p>

      <CalloutBox type="info">
        <p>The 100 dollar monthly price covers the full software toolkit: dashboard access, AI draft suggestions, auto-reply workflow, contest engine, legal template library covering 20 countries, and fake review detection. NFC cards are procured separately (self-program from any supplier or buy the AiLys card service for 100 dollars CAD one-time per 3-card set with programming included). There is no per-review surcharge and no per-location surcharge for single-location businesses. Multi-location pricing is calculated on the AiLys pricing page based on the location count.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" text="See the AiLys plans and where AiLys Automation is bundled or added on top, from Starter at 300 dollars to Agency at 2,499 dollars CAD." />

      <SectionDivider />

      <h2 id="nfc-tap-to-review-the-front-desk-loop">NFC tap-to-review, the front desk loop</h2>
      <p>
        The NFC tap-to-review card sits on the counter or the receipt holder. The customer taps a phone, the device opens a AiLys Automation landing page, the page surfaces the direct Google review link with a one-tap flow into the GBP review form. The whole experience runs under five seconds from tap to review composition. The cards are procured by the client through one of two paths: self-procurement from any NFC supplier with the URL programmed via a free phone NFC writer, or the AiLys Automation card service at 100 dollars CAD one-time which ships three pre-programmed cards.
      </p>
      <p>
        The reason the NFC loop works is that it removes the two friction points that kill review velocity. First, the customer does not have to find the GBP listing on Google, because the AiLys Automation landing page jumps straight to the review form. Second, the customer does not have to remember to leave the review later, because the prompt happens at the moment of satisfaction. Operators commonly report review-velocity lifts in the industry-typical 40 to 70 percent range over the first 60 to 90 days of NFC deployment, with the spread driven by counter placement, staff prompting, and ambient foot traffic.
      </p>
      <p>
        The AiLys Automation landing page also gates a quick service question that adapts the experience without violating Google review policy. The honest version routes every customer to the Google review link, and uses the gate only to decide which review template to suggest, not to filter out unhappy customers. Filtering by satisfaction breaks Google policy and can soft-suppress the listing.
      </p>

      <h3>What the NFC card path includes</h3>
      <ul>
        <li>Self-procurement: blank NFC cards from any supplier (Amazon, NFC.direct, etc.) plus a free phone NFC writer to program the AiLys Automation landing URL</li>
        <li>AiLys card service: 100 dollars CAD one-time, delivers three pre-programmed cards keyed to the client landing URL</li>
        <li>The AiLys Automation landing page configured with the GBP review link</li>
        <li>The dashboard view that tracks tap count, conversion to review, and source per card</li>
      </ul>

      <SectionDivider />

      <h2 id="ai-assisted-drafting-inside-the-customer-flow">AI assisted drafting inside the customer flow</h2>
      <p>
        Customers often want to leave a review but freeze on the empty text box. The AiLys Automation AI draft suggestion shows a starter sentence based on the service the customer received, the staff name they interacted with, and the visit context. The customer sees three suggested sentences and can pick one as a starting point or write the review from scratch. The AI never writes the full review and never submits without the customer typing.
      </p>
      <p>
        The reason this matters for AI Visibility is that review text is now a citation surface for AI engines. ChatGPT, Perplexity, Gemini, and Google AIO all parse review text when summarizing a local business. Reviews that mention specific services and staff names feed those summaries with concrete language. Reviews that say only "great service" feed nothing.
      </p>
      <p>
        The AI draft is configurable per business category. A dental clinic gets suggestions about hygienist visits and emergency appointments. A restaurant gets suggestions about the dishes on the current menu. A contractor gets suggestions about the project type and the response speed. The category configuration ships during onboarding and updates automatically when the GBP categories change.
      </p>

      <CalloutBox type="warning">
        <p>The AI draft is a starting point, not a script. If the customer copies the suggestion verbatim and submits, the review reads as templated and Google can pattern-detect it. The AiLys Automation UI nudges the customer to personalize the suggestion before submitting, with a small visual cue when the draft has not been edited. This nudge improves review quality and protects the listing.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="auto-replies-with-owner-approval">Auto-replies with owner approval</h2>
      <p>
        Every new Google review triggers a AiLys Automation draft reply. The draft is tailored to the review text, the reviewer name, and the service mentioned. The owner sees the draft inside the dashboard and inside an optional email or SMS notification. One click approves and ships the reply to GBP through the official Google API. The whole loop closes inside two minutes when the owner is on the dashboard.
      </p>
      <p>
        Auto-replies are safe when each reply is personalized. AiLys Automation never ships an identical reply twice, because the draft model varies the structure, the wording, and the service mention based on the review content. Templated responses that are identical across reviews trigger Google pattern detection and can soft-suppress the listing.
      </p>
      <p>
        The owner approval gate is intentional. Auto-shipped replies without owner review carry compliance risk: a reply that misnames the service, misgenders the reviewer, or contradicts a recent operational change can damage the relationship. The two-minute approval is the cost of avoiding that risk.
      </p>

      <QuickQuiz
        question="What is the right convention for AiLys Automation auto-replies on Google reviews?"
        options={[
          'Auto-ship every reply without owner review to maximize speed',
          'Use the same templated reply on every review for consistency',
          'Generate a personalized draft per review and ship after one-click owner approval',
          'Reply only to negative reviews, ignore positives',
        ]}
        correctIndex={2}
        explanation="Personalized drafts with one-click owner approval is the convention. It keeps reply speed near auto-ship pace, avoids the pattern detection that hits identical templated replies, and keeps the owner in the loop on tone and accuracy. Identical replies and silent positives are both ranking risks."
      />

      <SectionDivider />

      <h2 id="the-contest-engine-and-the-legal-templates">The contest engine and the legal templates</h2>
      <p>
        The AiLys Automation contest engine is the lever for review velocity spikes. A contest invites customers to leave a review, with a prize drawn from the entries. The dashboard surfaces the entry count, the eligibility rules, the prize description, and the draw mechanic. The setup takes under 30 minutes during the first contest and under 5 minutes for repeat contests. Contest cadence is set per AiLys tier: Starter clients run 2 contests per month, Core clients run 4 contests per month, and Growth and Agency clients run contests on a per-domain basis (multi-location aware).
      </p>
      <p>
        The hard line is that the client runs the contest. AiLys provides the setup, the legal terms and conditions generator, and the help docs. The client owns the prize, the customer relationship, the draw, the winner notification, and any tax or regulatory disclosure that applies. The agency does not draw the winner and does not communicate with contestants. This separation keeps everyone on the right side of contest rules in Quebec and Canada.
      </p>

      <h3>What the legal template library covers</h3>
      <ul>
        <li>Quebec contest disclosure (Régie des alcools, des courses et des jeux notice when prize value exceeds the threshold)</li>
        <li>Skill-testing question template (mandatory for cash or large-value prizes in Canada)</li>
        <li>Eligibility, entry mechanic, draw method, and prize description</li>
        <li>Privacy notice on entry data handling and review consent</li>
        <li>French and English versions, hand-authored, with regional spellings</li>
      </ul>

      <p>
        Photo handling for contest winners follows the same separation. The client uploads the winner photo through the AiLys client app, the app captures consent, and the photo pushes to GBP through the official API. AiLys does not source winner photos and does not upload on behalf of the contest. This protects the client from copyright issues and keeps the photo provenance clean for Google.
      </p>

      <CalloutBox type="tip">
        <p>The contest spike is most effective when it is paired with the steady NFC velocity, not as a substitute. A business that runs a contest and stops collecting reviews the rest of the month sees a velocity dip that erases the spike inside 60 days. The pattern that holds ranking is steady NFC plus one quarterly contest, not contests-only.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="fake-review-detection-and-the-flag-workflow">Fake review detection and the flag workflow</h2>
      <p>
        Every new review runs through the AiLys Automation fake detection scorer on arrival. The scorer reads a few signals: account age, review history pattern, language model authorship probability, IP cluster proximity, and timing patterns relative to the business operating hours. Reviews above the flag threshold are surfaced in the dashboard with a one-click flag-to-Google action.
      </p>
      <p>
        The system does not auto-flag without owner approval, because false positives carry a penalty. Google has tightened the review reporting rules and now soft-suppresses listings that flag legitimate reviews repeatedly. The AiLys Automation convention is one human decision per flag, with the AI providing the score and the suggested rationale text.
      </p>
      <p>
        The dashboard tracks flag outcomes over time so the owner can see which signals lead to successful Google removals and which do not. Most legitimate flags come from clusters of new accounts posting in the same hour, language patterns that match a known generation model, and reviews that reference services the business does not offer. Most rejected flags come from regular customers who happen to use very brief language.
      </p>

      <SectionDivider />

      <h2 id="how-reviuzy-wires-into-gbp-and-the-ailys-engine">How AiLys Automation wires into GBP and the AiLys engine</h2>
      <p>
        AiLys Automation connects to Google Business Profile through the official Google API with read and write scopes for reviews, replies, and (with owner consent) photo uploads. The connection is OAuth-based, the token is stored encrypted, and the operator can revoke access at any time from the dashboard. No credentials live outside the AiLys Automation vault.
      </p>
      <p>
        On the AiLys side, every review and reply feeds the AI Visibility engine that scores the listing each week. The engine reads the keyword variety inside review text, the recency window, the response rate, and the reviewer language balance. The score updates in the AiLys dashboard the same week. Strategist input cadence varies by tier: Starter and Core clients receive async-only support (no scheduled calls), while Growth and Agency clients get one monthly strategist call to walk the trend and recommend the next operational lever (NFC card placement, contest cadence, reply tone tweaks). Written reports follow the same monthly cadence on Growth and Agency.
      </p>
      <p>
        For owners who want the full data picture, the <InternalLink to="/audit" title="Free 24-hour AI Visibility audit" description="See where review signals land in the AI Visibility score" /> ships a baseline that includes the review velocity slice. Pair that with the <InternalLink to="/blog/google-review-velocity-playbook" title="Google review velocity playbook" description="The numbers that move the local pack ranking" /> for the operator-level deep dive on monthly targets, and the <InternalLink to="/blog/ailys-vs-traditional-seo-agency" title="AiLys vs traditional SEO agency" description="Where the AiLys Automation add-on fits in the broader plan" /> for the comparison frame.
      </p>

      <img
        src={meta.images.mid}
        alt="AiLys Automation data flow diagram showing NFC tap, AI draft, owner approval, GBP API push, and AI Visibility engine scoring loop"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <InlineCTA variant="audit" />

      <SectionDivider />

      <h2 id="when-reviuzy-pays-for-itself">When AiLys Automation pays for itself</h2>
      <p>
        The 100 dollar monthly price pays for itself when the velocity lift drives one extra customer per month. For a dental clinic with a 1,200 dollar lifetime value per patient, that is a 12 to 1 return inside the first quarter. For a restaurant with a 60 dollar average ticket and a 30 percent return rate, the math is closer to 2 to 1, which is still a defensible spend.
      </p>
      <p>
        The owners who get the most lift are the ones who treat AiLys Automation as a daily habit. The dashboard becomes the morning email check and the post-lunch reply pass. The strategist on the AiLys side tracks the velocity in the weekly report and adjusts the GBP optimization layer when the review keyword mix shifts. The combined effect is a local pack score that climbs steadily across one quarter.
      </p>
      <p>
        The owners who get the least lift are the ones who buy AiLys Automation and forget about it. The dashboard goes unread, the auto-replies stack up unsent, and the contest engine never launches. In that case the spend is wasted, and the honest recommendation is to cancel the add-on and revisit it after the operator has the bandwidth to give it five minutes a day.
      </p>

      <CalloutBox type="danger">
        <p>The five most common AiLys Automation misuses we see: auto-shipping templated replies, gating reviews by satisfaction (a Google policy violation), running contests without legal terms, flagging legitimate reviews as fake, and uploading stock photos of winners. Each one carries a soft-suppression risk on the GBP listing. The product guards against all five, but only when the operator follows the prompts.</p>
      </CalloutBox>

      <InlineCTA variant="book" text="Want a 60-minute walkthrough of the AiLys Automation dashboard against your current GBP listing? Strategy doc sent regardless." />

      <SectionDivider />

      <KeyTakeaway
        points={[
          'AiLys Automation is 100 dollars CAD per month, bundled in the AiLys Agency tier.',
          'NFC tap collection plus AI assisted drafts plus auto-replies plus contests are the four levers.',
          'The client runs the contest. AiLys provides setup, legal templates, and help docs only.',
          'Photos are uploaded by the client through the AiLys client app. AiLys does not source winner photos.',
          'Auto-replies ship after one-click owner approval. Identical templated replies are a soft-suppression risk.',
          'Fake review flags are owner-approved, never auto-filed, to avoid Google false positive penalties.',
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
        alt="AiLys Automation add-on summary card with the four levers and the GBP wiring for a Quebec local business"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
