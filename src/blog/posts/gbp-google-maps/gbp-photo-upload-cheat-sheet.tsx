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
  slug: 'gbp-photo-upload-cheat-sheet',
  title: 'GBP photo upload cheat sheet, how often and what to post',
  metaDescription:
    'A GBP photo upload cheat sheet for local owners. How often to post, what subjects to shoot, file specs, and the cadence we run for clients.',
  tldr:
    'Add new GBP photos every week at minimum. AiLys ships 4, 8, or 12 fresh photos per month at the Starter, Core or Growth, and Agency tiers. Lead with exterior, interior, team, product, and behind-the-scenes shots in that order. Geotag every photo, write descriptive alt-style filenames, and keep file size under 1 MB.',
  category: 'gbp-google-maps',
  tags: ['gbp', 'photos', 'cheat sheet', 'google business profile', 'local seo'],
  publishedDate: '2026-02-03',
  updatedDate: '2026-02-03',
  author: AUTHORS.strategy,
  readTimeMinutes: 8,
  images: {
    hero: '/blog-images/gbp-photo-upload-cheat-sheet/hero.webp',
    mid: '/blog-images/gbp-photo-upload-cheat-sheet/mid.webp',
    end: '/blog-images/gbp-photo-upload-cheat-sheet/end.webp',
  },
  faqItems: [
    {
      question: 'How often should I add new photos to my Google Business Profile?',
      answer:
        'Every week at the absolute minimum, ideally two to three times per week. Google Business Profile rewards recency and signal freshness, so a profile with steady weekly photo uploads ranks higher in the local pack than a profile with the same total photo count uploaded all at once. AiLys ships 4 photos per month at Starter, 6 at Core, 8 at Growth, and 12 per domain at Agency.',
    },
    {
      question: 'What types of photos should I upload to GBP?',
      answer:
        'Lead with five categories. Exterior shots at the storefront in good light. Interior shots showing the space your customer will actually see. Team shots that humanize the business. Product or service shots that show what they will buy. Behind-the-scenes shots that show process and craft. Rotate the categories so a viewer scrolling your profile gets a varied feel, not five identical lobby photos.',
    },
    {
      question: 'What are the GBP photo file specs that work best?',
      answer:
        'Aim for 1080 by 1080 pixels at minimum, JPG or PNG, file size under 1 MB. Google compresses anything above that, which kills colour and detail. Keep aspect ratio close to square for the photo grid, and always include a 1200 by 900 horizontal version for the cover slot. Avoid heavy filters. Real, unfiltered photos outperform retouched ones in customer trust signals.',
    },
    {
      question: 'Does geotagging GBP photos still help in 2026?',
      answer:
        'Yes. Geotagged photos stay tied to the specific location entity Google associates with your business address. The signal is small per photo, but compounds across a year of weekly uploads. Most modern phones geotag automatically when location services are on. If you upload from desktop, use a small EXIF tool to add coordinates before posting. The two-minute habit pays off in the local pack.',
    },
    {
      question: 'Should I respond to user-uploaded photos on my GBP?',
      answer:
        'Yes, every time. User-uploaded photos affect your profile whether you engage or not, but a public response from the owner adds a freshness signal Google reads as active management. Thank the customer briefly, never mention pricing or promotions in the response, and flag any photo that misrepresents your business through the report tool. The response itself counts as activity for ranking purposes.',
    },
  ],
  relatedSlugs: [],
  headings: [
    { id: 'why-gbp-photo-cadence-matters-more-than-volume', text: 'Why GBP photo cadence matters more than volume' },
    { id: 'the-five-photo-categories-that-do-real-work', text: 'The five photo categories that do real work' },
    { id: 'file-specs-and-naming-the-quick-version', text: 'File specs and naming, the quick version' },
    { id: 'the-monthly-cadence-we-ship-for-clients', text: 'The monthly cadence we ship for clients' },
    { id: 'common-mistakes-that-kill-the-photo-signal', text: 'Common mistakes that kill the photo signal' },
    { id: 'how-to-respond-to-user-uploaded-photos', text: 'How to respond to user-uploaded photos' },
    { id: 'measuring-whether-your-photos-actually-rank', text: 'Measuring whether your photos actually rank' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        Add new photos to your Google Business Profile every week at the absolute minimum. Two to three uploads per week is better. GBP rewards signal freshness, so a profile with steady weekly photo uploads ranks higher in the local pack than the same profile with all photos uploaded in one batch. The five priority categories are exterior, interior, team, product or service, and behind-the-scenes.
      </p>

      <StatHighlight
        stats={[
          { value: '4 / 8 / 12', label: 'Photos per month at Starter, Core or Growth, and Agency' },
          { value: '< 1 MB', label: 'File size sweet spot before Google compresses' },
          { value: '1080 px', label: 'Minimum dimension on either side for a clean upload' },
        ]}
      />

      <SectionDivider />

      <h2 id="why-gbp-photo-cadence-matters-more-than-volume">Why GBP photo cadence matters more than volume</h2>
      <p>
        Two profiles can have the same total photo count and rank very differently. The reason is recency. Google Business Profile reads photo cadence as a proxy for whether the business is actively managed. A clinic with 60 photos uploaded in one frantic afternoon last August looks abandoned by November. A clinic with 60 photos uploaded at three per week for five months looks alive. Both have 60 photos. Only one ranks.
      </p>
      <p>
        That is the whole reason we shifted client work toward steady cadence rather than batch dumps. A photo uploaded today is worth more than the same photo uploaded six months ago, because the freshness signal lifts the entire profile in ranking calculations. The photo itself stays in the gallery indefinitely, but its ranking weight decays. Replenishing weekly is how you keep the weight stable.
      </p>
      <p>
        For the full GBP attribute audit that pairs with photo cadence, see our <InternalLink to="/audit/gbp" title="GBP audit deep dive" description="Full attribute checklist that pairs with the photo cadence" />.
      </p>

      <SectionDivider />

      <h2 id="the-five-photo-categories-that-do-real-work">The five photo categories that do real work</h2>
      <p>
        Not all photos pull the same weight. After running cadence for hundreds of local clients, five categories consistently move the needle. Lead with these and you will rarely run dry of subjects.
      </p>
      <ol>
        <li><strong>Exterior</strong>. The storefront in good light, at multiple times of day. Buyers use these to confirm they are at the right place when they arrive.</li>
        <li><strong>Interior</strong>. The actual space the customer will see. Lobbies, dining rooms, treatment rooms, retail floors. Interiors are the highest-clicked category for restaurants and clinics.</li>
        <li><strong>Team</strong>. Real people, names in the captions where allowed. Team photos build trust, especially for service businesses where the buyer is hiring a person, not a logo.</li>
        <li><strong>Product or service</strong>. The thing the buyer will pay for. Plates of food, dental work in progress, the project the contractor finished, the haircut the stylist did.</li>
        <li><strong>Behind-the-scenes</strong>. Process, craft, the kitchen, the lab, the workshop. These photos surface in AI Overviews more often because they show expertise, which feeds the E-E-A-T signal.</li>
      </ol>
      <p>
        Rotate the categories. A profile of all interior shots looks like stock content. A profile mixing all five categories looks like an active operation.
      </p>

      <CalloutBox type="tip">
        <p>The behind-the-scenes category is the most under-shipped. Most owners feel awkward photographing their own kitchen or lab. Push through it. Behind-the-scenes content earns disproportionate trust signal because it reveals expertise that polished marketing shots cannot fake.</p>
      </CalloutBox>

      <QuickQuiz
        question="Why does a profile with 60 photos uploaded weekly outrank a profile with 60 photos uploaded all at once?"
        options={[
          'The newer profile has different photos',
          'GBP reads cadence as a freshness signal for active management',
          'Google ignores any upload older than three months',
          'Bulk uploads are penalized as spam',
        ]}
        correctIndex={1}
        explanation="GBP weights ranking calculations on cadence, not just volume. A weekly drip signals active management and lifts the entire profile, while a one-time batch signals an abandoned profile within a few months even with the same photo count."
      />

      <SectionDivider />

      <h2 id="file-specs-and-naming-the-quick-version">File specs and naming, the quick version</h2>
      <p>
        Three rules cover most of the file-spec question. Dimension, size, and naming. For dimension, aim for at least 1080 pixels on the shorter side. Google rejects anything below 720, and anything above 1920 gets compressed without giving you visual benefit. Square at 1080 by 1080 is the safest default. Cover photos need a 1200 by 900 horizontal version.
      </p>
      <p>
        For file size, keep it under 1 MB. JPG at 80 percent quality usually lands inside this. PNG works but inflates fast. WebP is supported but skip it for cover photos because some Maps surfaces still convert. For naming, use descriptive lowercase filenames with hyphens, like exterior-storefront-evening-montreal.jpg, not IMG_3947.jpg. The filename does not appear publicly, but it informs the alt-text Google generates internally for the photo, which feeds image search.
      </p>

      <CalloutBox type="info">
        <p>EXIF metadata is the small chunk of data your camera attaches to a photo: date taken, GPS coordinates, camera model, lens, exposure. Google reads this metadata and uses GPS coordinates to confirm a photo was taken at the listed business address. Strip the EXIF (which most desktop export tools do by default) and the geotag signal disappears.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" />

      <SectionDivider />

      <h2 id="the-monthly-cadence-we-ship-for-clients">The monthly cadence we ship for clients</h2>
      <p>
        The AiLys cadence per tier is structured so the freshness signal stays steady all month, not bunched at the start. Starter ships 4 photos per month, roughly one per week. Core ships 6. Growth ships 8. Agency ships 12 per domain with extra resolution and editorial-grade subject prep. The total photo count over a year matters less than the consistency.
      </p>
      <p>
        The simplest in-house cadence for owners not on a plan is a Sunday photo session. Block 30 minutes, shoot 12 to 16 photos covering the five categories, and queue them through the rest of the week. Most modern photo apps support scheduled posting. Set the schedule once and the cadence runs itself.
      </p>
      <p>
        See our <InternalLink to="/industries/restaurants" title="Restaurant GBP playbook" description="GBP cadence variant tuned for Quebec restaurants" /> for the cadence variant tuned for restos, and <InternalLink to="/industries/dentists" title="Dentist GBP playbook" description="GBP cadence variant tuned for medical clinics" /> for the variant tuned for clinics.
      </p>

      <SectionDivider />

      <CalloutBox type="warning">
        <p>Do not upload all 12 monthly photos on the first of the month. Google Business Profile reads bulk uploads as inactive automation, not as fresh activity. Spread them evenly. Two photos every Tuesday and Friday is a stronger signal than 12 photos every first.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="common-mistakes-that-kill-the-photo-signal">Common mistakes that kill the photo signal</h2>
      <p>
        Three mistakes account for most failed photo programs. First, heavy filters or AI-generated images. Google has gotten better at detecting both, and AI-generated content lowers profile trust. Real, unfiltered photos win every time. Second, identical reposts. Uploading the same shot twice in a quarter does nothing for ranking and looks lazy to viewers who scroll the gallery. Third, missing geotags on desktop uploads. If your camera roll has location services on, the photos carry GPS metadata. If you export from desktop without GPS, you lose half the local signal.
      </p>
      <p>
        A fourth mistake worth flagging: ignoring user-uploaded photos. Customers and visitors can post photos to your profile that you did not approve. The right move is to engage with the legitimate ones (a brief thank-you response counts as profile activity) and report the misrepresenting ones through the GBP report tool. Ignored user photos still rank, and they shape the impression of your business in ways the owner never sees.
      </p>

      <InlineCTA variant="audit" />

      <InternalLink to="/glossary/gbp" title="Google Business Profile glossary entry" description="Definition and ranking factors for GBP in 2026" />

      <SectionDivider />

      <h2 id="how-to-respond-to-user-uploaded-photos">How to respond to user-uploaded photos</h2>
      <p>
        Owner responses on user photos add a freshness signal Google reads as active management. Keep responses short, three sentences at most. Thank the customer by first name when visible, mention what the photo shows, and avoid pricing or promotional language. A response of "Thanks for posting, Marc. Glad you enjoyed the lemon tart" outperforms a generic "thanks for the photo" because the specifics signal real engagement to both the customer and the algorithm.
      </p>
      <p>
        For photos that misrepresent your business, the GBP report tool lives one tap away. Report misleading photos within 48 hours. Do not respond publicly to a misrepresenting photo with a complaint, that backfires and lowers trust. Report it, and let the resolution happen privately.
      </p>

      <SectionDivider />

      <h2 id="measuring-whether-your-photos-actually-rank">Measuring whether your photos actually rank</h2>
      <p>
        The GBP Insights dashboard reports photo views per week. Watch the trend, not the absolute number. A weekly cadence should produce a steadily rising photo views chart over 90 days. If the chart flattens or dips, the cadence broke or the categories went stale (often too many interior shots, not enough team or behind-the-scenes).
      </p>
      <p>
        Pair the photo view trend with the local pack ranking trend on your top three buyer-intent queries. The cleanest correlation is a steady photo view rise paired with a one-to-three-position lift in local pack ranking inside 60 days. If photos rise but ranking stays flat, the gap is usually outside the photo program (citations, reviews, or schema). Run an <InternalLink to="/audit" title="AI Visibility audit" /> to find the actual leak.
      </p>

      <KeyTakeaway
        points={[
          'Cadence beats volume. A weekly drip outranks a single batch upload of the same photos.',
          'Lead with five categories: exterior, interior, team, product, behind-the-scenes.',
          'Keep file size under 1 MB and dimension at 1080 pixels minimum on the shorter side.',
          'Geotag every photo. The signal is small per upload but compounds over a year.',
          'Respond to user-uploaded photos. Owner responses count as freshness activity.',
        ]}
      />

      <SectionDivider />

      <h2 id="faq">Frequently Asked Questions</h2>
      <p>
        Want a tuned photo cadence on your GBP? The AiLys Core tier ships eight photos a month, two per week, with subject prompts and the geotag work handled. Run a free audit first to see if photos are even your bottleneck.
      </p>
      <InlineCTA variant="pricing" />
    </article>
  )
}
