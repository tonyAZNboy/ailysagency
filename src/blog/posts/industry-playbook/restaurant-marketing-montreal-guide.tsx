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
  QuickQuiz,
} from '../../components/shared'

export const meta: BlogPostMeta = {
  slug: 'restaurant-marketing-montreal-guide',
  title: 'Restaurant marketing in Montreal, the 2026 move and grow guide',
  metaDescription:
    'A practical 2026 marketing guide for a Montreal restaurant. Move-day GBP edits, citation cleanup priority list, Apple Maps timing, bilingual Street View signage, and review velocity.',
  tldr:
    'Restaurant marketing in Montreal in 2026 wins on five layers stacked in the right order. Edit the existing Google Business Profile listing on the move day instead of deleting and rebuilding, request reverification, push the new NAP to the top six citations inside seven days, watch Apple Maps Connect for the slower update window, confirm bilingual signage on Street View, and run a bilingual review cadence that delivers four to six fresh reviews each month. Restaurants that follow this sequence usually recover map pack visibility inside 30 days after a move and outpace neighborhood competitors who rebuild from scratch.',
  category: 'industry-playbook',
  tags: ['restaurant', 'montreal', 'gbp', 'move', 'industry-playbook'],
  publishedDate: '2026-03-19',
  updatedDate: '2026-03-19',
  author: AUTHORS.strategy,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/restaurant-marketing-montreal-guide/hero.webp',
    mid: '/blog-images/restaurant-marketing-montreal-guide/mid.webp',
    end: '/blog-images/restaurant-marketing-montreal-guide/end.webp',
  },
  faqItems: [
    {
      question: 'Why is my restaurant invisible on Google Maps after moving?',
      answer:
        'Most invisibility after a restaurant move comes from one of three mistakes. The first and most common is deleting the old Google Business Profile listing and creating a new one, which strips review history, photos, and category authority. The right move is editing the existing listing with the new address, requesting reverification, and waiting through the review window. The second is leaving stale NAP citations across Pages Jaunes, Yelp, and reservation platforms for weeks, which signals an inconsistent entity to retrieval engines. The third is forgetting Apple Maps Connect, which updates on a slower cycle and quietly hides the restaurant from Siri queries until refreshed.',
    },
    {
      question: 'Should I delete my old GBP listing and create a new one when I move my restaurant?',
      answer:
        'No. Deleting the old listing wipes review history, photo authority, category trust, and the Maps anchor that took years to build. Edit the existing listing instead. Update the address, request reverification by postcard or live video, then wait through the review window before pushing citation updates everywhere else. The edit-and-reverify path keeps every signal that already ranks the restaurant. The delete-and-rebuild path forces the restaurant to start from zero in retrieval scores, which can take a full quarter to recover even with strong review velocity.',
    },
    {
      question: 'How long does Apple Maps take to update after a restaurant move?',
      answer:
        'Apple Maps Connect typically takes ten to twenty business days to reflect a verified address change, while Google Business Profile usually shows the new address within three to seven days after reverification. The gap creates a window where Siri queries still send patrons to the old address, even though Google is sending them correctly. Submit the Apple Maps update on the same day as the GBP edit, then audit Siri queries weekly for two weeks until the new address shows. Restaurants that ignore Apple Maps lose roughly fifteen to twenty percent of voice-driven walk-in traffic during the gap.',
    },
    {
      question: 'How fast should I update citations after a restaurant move in Montreal?',
      answer:
        'Within seven days. The priority list is short. Pages Jaunes Canada, 411.ca, Yelp Montreal, the reservation platform you use most (OpenTable, Resy, or Tock), the food delivery platforms (Uber Eats, DoorDash, SkipTheDishes), and the reservation widget on the restaurant website. Updating these six surfaces in the same week prevents the retrieval engines from reading the entity as inconsistent. Beyond seven days, the inconsistency drops trust scores and the local pack temporarily favors competitors with cleaner profiles.',
    },
    {
      question: 'Does bilingual signage on Street View actually affect ranking for a Montreal restaurant?',
      answer:
        'Yes, indirectly. Google reads Street View imagery as a confirmation signal for the business name and address. A Montreal restaurant whose new storefront shows bilingual signage on the latest Street View pass reads as a coherent local entity that serves both halves of the city. After a move, request a Street View capture refresh through the Local Guides program or wait for the next car pass, but in the meantime upload high-quality exterior photos from the street angle so the new signage anchors fast. Bilingual signage on the storefront is also a regulatory requirement in Quebec under the Charter of the French Language.',
    },
    {
      question: 'What is the right review velocity for a Montreal restaurant after a move?',
      answer:
        'Four to six fresh Google reviews per month, with a bilingual mix that mirrors your patron split. A bistro in the Plateau that runs roughly seventy percent French patrons and thirty percent English should aim for three to four French reviews and one to two English reviews per month. After a move, ask returning patrons in person or through a follow-up email to mention the new address in their review, which gives the retrieval engines an additional confirmation signal. Avoid one-time review bursts. Steady cadence reads cleaner than spikes in every Quebec data set we have audited.',
    },
  ],
  relatedSlugs: [
    'what-quebec-restaurants-ask-google-maps-2026',
    'nap-consistency-audit-quebec',
    'gbp-photo-upload-cheat-sheet',
  ],
  headings: [
    { id: 'why-a-move-breaks-restaurant-visibility', text: 'Why a move breaks restaurant visibility on Maps' },
    { id: 'gbp-edit-do-not-delete', text: 'GBP, edit do not delete the old listing' },
    { id: 'reverification-and-the-review-window', text: 'Reverification and the review window' },
    { id: 'citation-cleanup-priority-list', text: 'Citation cleanup priority list for Montreal restaurants' },
    { id: 'apple-maps-connect-the-slow-cycle', text: 'Apple Maps Connect, the slow update cycle' },
    { id: 'bilingual-signage-on-street-view', text: 'Bilingual signage on Street View' },
    { id: 'review-velocity-after-the-move', text: 'Review velocity after the move' },
    { id: 'thirty-day-recovery-plan', text: 'A 30-day visibility recovery plan after a Montreal restaurant move' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        Restaurant marketing in Montreal in 2026 changes the day the restaurant moves. The fastest way to disappear from Google Maps after a move is to delete the old Google Business Profile and rebuild a new one. The right move is to edit the existing listing in place, request reverification, push the new NAP to the top six citations within seven days, file the Apple Maps Connect update the same day, refresh exterior photos that show bilingual signage, and run a bilingual review cadence that lands four to six fresh reviews each month. Restaurants that follow this sequence usually recover map pack visibility within 30 days. Those that delete and rebuild typically lose a full quarter to retrieval recovery.
      </p>

      <StatHighlight
        stats={[
          { value: '7 days', label: 'Window to push the new NAP across the top six citations' },
          { value: '10-20', label: 'Business days for Apple Maps to reflect the change' },
          { value: '4-6', label: 'Fresh bilingual reviews per month after the move' },
        ]}
      />

      <SectionDivider />

      <h2 id="why-a-move-breaks-restaurant-visibility">Why a move breaks restaurant visibility on Maps</h2>
      <p>
        A restaurant move triggers two simultaneous problems for retrieval engines. The first is an entity inconsistency event. Google, Apple, Pages Jaunes, Yelp, the reservation platforms, the delivery apps, and the restaurant website all carry the address of the business. When one surface holds the new address and another still shows the old one, the retrieval models read the entity as ambiguous and downgrade the trust score on every surface until the conflict resolves. The second is a Street View staleness gap. The exterior photo and the panoramic capture both need to refresh before the local pack treats the restaurant as anchored to its new physical address.
      </p>
      <p>
        Most owners react by panicking and deleting the old Google Business Profile to start clean. That single decision is what costs the most ground. The old listing carries every review, every photo, every Q and A entry, every booking attribution, and every category authority signal accumulated over the years. Wiping it forces the restaurant to start from a cold profile in a competitive Montreal neighborhood, which rarely recovers inside a single quarter even with aggressive review velocity.
      </p>
      <p>
        The recovery is straightforward when sequenced. Edit the existing listing, request reverification, push the new NAP to citations within seven days, file the Apple Maps Connect change the same day, refresh exterior photos with bilingual signage, and run a bilingual review cadence. Five layers, executed in the same fortnight, return the restaurant to map pack visibility inside 30 days in most cases.
      </p>

      <CalloutBox type="info">
        <p>The bilingual review cadence is not a soft signal. Google reads a French and English review mix on a Montreal restaurant as proof that both halves of the local market are served. After a move, the bilingual mix carries even more weight because it confirms the entity is the same restaurant under a new address. See the long-form audit on <InternalLink to="/glossary/nap" title="NAP consistency glossary" description="The six citation surfaces a Montreal restaurant must keep in sync after a move" /> for the full checklist.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Want to see what your restaurant looks like inside Google Maps and AI search after the move? Run the free 24-hour audit." />

      <SectionDivider />

      <h2 id="gbp-edit-do-not-delete">GBP, edit do not delete the old listing</h2>
      <p>
        Open the existing Google Business Profile, click edit, change the address to the new street, and save. Do not delete the listing. Do not create a new one. The edit path triggers a Google review window that takes three to seven days. During that window, Google decides whether the new address is consistent with other signals (Street View photos, citation database, business website footer) and reverifies the listing through the option you select.
      </p>
      <p>
        Choose the reverification method that matches your situation. Postcard takes five to fourteen business days. Live video call with a Google representative takes one to three business days but requires walking the camera around the new physical premises showing the signage, the kitchen, the dining room, and the address number. For a Montreal restaurant move, live video is the faster path and the one most owners pick when the new space is ready before the cutover weekend.
      </p>
      <p>
        While Google reviews the change, do not flood the listing with new posts or photos. Two updates that signal the move are enough. A featured photo of the new exterior at street angle and a single Google Post that announces the new address in both English and French. More activity during the review window reads as suspicious to Google trust models and can extend the verification timeline.
      </p>

      <CalloutBox type="warning">
        <p>Avoid the most common move-day mistake. If a Google representative tells you to mark the old listing closed permanently and create a new one, push back. That guidance is sometimes given by support agents who do not specialize in Maps. The correct path for a relocation is the edit and reverify flow, which preserves the listing history. Closed permanently plus a new listing burns review history and category authority for nothing.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="reverification-and-the-review-window">Reverification and the review window</h2>
      <p>
        The Google review window after an address edit usually closes within seven business days. During those days, three things must be true on the website and the citation surfaces. The new address shows in the website footer and the contact page. The structured data on the homepage uses LocalBusiness schema with the new address. The reservation widget points to the new address. If any of those three contradicts the GBP edit, Google extends the review window or rolls back the edit until the conflict resolves.
      </p>
      <p>
        While reverification runs, set up a 301 redirect on any location-specific URLs that mention the old neighborhood or street. A Plateau bistro that moves to Mile End should redirect any URL slug that contains the old neighborhood name to the new neighborhood version, with the same content updated to reference the new street. Search engines treat the redirect plus content match as a clean entity continuity signal, which speeds the local pack recovery.
      </p>
      <p>
        Once Google confirms the edit, the listing returns to the map pack at its new address. The first signal that the reverification cleared is usually a small bounce in impressions on the Google Business Profile insights dashboard. If impressions stay flat for ten days after the edit, log a help case and request a manual review. Most cases clear in another three to five business days when the supporting NAP citations show consistent.
      </p>

      <InlineCTA variant="pricing" text="Need a managed move-day GBP cleanup with citation pushes and Apple Maps Connect handled in parallel? See the AiLys tiers from Starter at 300 dollars CAD." />

      <SectionDivider />

      <h2 id="citation-cleanup-priority-list">Citation cleanup priority list for Montreal restaurants</h2>
      <p>
        The priority citation list for a Montreal restaurant move is short and weighted by retrieval impact, not by directory size. Six surfaces matter most in the first seven days after the move.
      </p>

      <ol>
        <li>Google Business Profile, edit and reverify (the foundation, everything else mirrors this).</li>
        <li>Pages Jaunes Canada, the highest-authority French-Canadian directory.</li>
        <li>Yelp Montreal, weighted heavily by Apple Maps and reservation platforms.</li>
        <li>The reservation platform in active use (OpenTable, Resy, or Tock).</li>
        <li>The food delivery platforms in active use (Uber Eats, DoorDash, SkipTheDishes).</li>
        <li>411.ca, secondary but weighted on bilingual queries in the local pack.</li>
      </ol>

      <p>
        Each surface uses a different update flow. Pages Jaunes accepts an online change form with a 24 to 72 hour processing window. Yelp requires a business owner login to push the change and sometimes asks for a utility bill at the new address as proof. Reservation platforms usually let the operator update the address directly in the dashboard, but the change does not propagate to embedded widgets on partner sites for several days. Delivery platforms have the slowest internal cycle and may require a chat support ticket to refresh the kitchen address used for driver routing.
      </p>
      <p>
        The full audit list lives at <InternalLink to="/audit/gbp" title="Free GBP and citation audit in 24 hours" description="Move-day audit covering GBP, Apple Maps, Pages Jaunes, Yelp, reservation, and delivery platforms" /> and the per-industry version sits on <InternalLink to="/industries/restaurants" title="Restaurant industry playbook" description="The full move sequence with timelines and per-platform owner instructions" />.
      </p>

      <QuickQuiz
        question="A bistro in Montreal moves three streets over. The owner wants the new address live on Maps fastest while keeping every Google review. Which sequence is the right one?"
        options={[
          'Delete the old GBP listing, create a new one, then submit citations',
          'Edit the existing GBP listing, request live video reverification, push citations within seven days, file Apple Maps the same day',
          'Wait two weeks for the move to settle, then update GBP and citations together',
          'Update only the website footer and let Google find the change automatically',
        ]}
        correctIndex={1}
        explanation="The edit-reverify-push sequence preserves review history and category authority while resolving the entity conflict across surfaces inside seven days. Deleting and rebuilding wipes the listing equity. Waiting two weeks lets the citation conflict harden. Relying on Google to find the change passively can take months."
      />

      <SectionDivider />

      <h2 id="apple-maps-connect-the-slow-cycle">Apple Maps Connect, the slow update cycle</h2>
      <p>
        Apple Maps Connect runs on a cycle that is two to three times slower than Google Business Profile. A verified address change typically takes ten to twenty business days to reflect on Apple Maps, which means Siri queries still send patrons to the old address well after Google has cleaned up. The mistake most Montreal restaurants make is filing the Apple Maps update a week or two after Google. Filing both on the same day shrinks the gap to the minimum and protects the voice-search walk-in traffic that Apple still drives at high volume in Montreal.
      </p>
      <p>
        Open Apple Business Connect, locate the existing listing, submit the address change with the same supporting documents used for Google. Apple often validates with a phone call to the published number, so make sure the new line is active before submitting. While waiting, run a weekly Siri query test from a clean iPhone in three Montreal arrondissements to confirm the change is propagating. The first sign that Apple has updated is usually that Siri stops directing the user to the old street and starts naming the new neighborhood.
      </p>
      <p>
        Apple Maps Connect also feeds Apple Pay reservation data, the Yelp partnership integration, and the Apple Watch local recommendations. A Montreal restaurant with a stale Apple Maps listing loses ground on all four surfaces simultaneously. The fix is the same submission, but the propagation lag means restaurants that file Apple Maps last lose roughly fifteen to twenty percent of voice walk-in traffic during the gap.
      </p>

      <img
        src={meta.images.mid}
        alt="Side-by-side timeline comparing Google Business Profile and Apple Maps Connect update windows after a Montreal restaurant move"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <h2 id="bilingual-signage-on-street-view">Bilingual signage on Street View</h2>
      <p>
        Bilingual signage on Street View matters for two reasons in Montreal. The first is regulatory. Quebec law under the Charter of the French Language requires public commercial signage to be primarily in French, with French at least twice as prominent as any other language. A restaurant that opens with English-only signage triggers a regulatory complaint risk and a soft local pack penalty when Google detects the inconsistency between the storefront photos and the bilingual market expectation.
      </p>
      <p>
        The second is retrieval. Google reads Street View imagery as a confirmation layer for the business name and address. When the latest Street View pass shows the new signage clearly, the local pack treats the restaurant as anchored to its physical location. Until that pass happens (which can take six to nine months), the workaround is uploading high-quality exterior photos from the street angle directly to Google Business Profile and Apple Maps. Photos with EXIF metadata intact carry more weight than stock images, because they read as a first-hand experience of the new address.
      </p>
      <p>
        Three exterior shots cover the bases. A wide street-angle photo showing the storefront in context, a tighter shot of the signage with the address number visible, and an interior entrance shot through the open door. Upload all three within the first two weeks after the move, and ask the next ten Local Guides who visit to add their own photos through the Maps app. The combined freshness signals shorten the time the restaurant looks unsettled to retrieval models.
      </p>

      <CalloutBox type="tip">
        <p>If the new signage is not installed on the move day, schedule the install for week two and plan the Local Guide outreach for week three. A restaurant that opens with paper signage in the window for two weeks reads to retrieval as an unsettled entity. Permanent bilingual signage in place by the second weekend is the floor for Montreal restaurant moves that hold map pack position cleanly.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="review-velocity-after-the-move">Review velocity after the move</h2>
      <p>
        Review velocity is the operational signal that holds the local pack position once the move is technically resolved. Aim for four to six fresh Google reviews per month with a bilingual mix that mirrors the patron split. A bistro on Saint-Laurent that runs roughly seventy percent French patrons and thirty percent English should aim for three to four French reviews and one to two English reviews per month. The bilingual mix is what tells Google that the restaurant continues to serve both halves of the local market after the move.
      </p>
      <p>
        Ask returning patrons to mention the new address in the review. A line as simple as "We are glad they stayed in the Plateau just two blocks east on Boulevard Saint-Joseph" gives the retrieval engines an additional confirmation signal that the entity at the new address is the same restaurant. The first month after the move is the highest-impact moment to seed those address-mentioning reviews, because the listing is still resolving the address change in the entity graph.
      </p>
      <p>
        Run the review request at 24 hours after the meal, by email or text, in the patron preferred language. Avoid bulk requests that violate the Google review terms. Steady cadence reads cleaner than spikes in every Quebec data set we have audited. For the platform that automates the bilingual cadence and routes the request to the right surface, see <InternalLink to="/blog/reviuzy-review-automation-guide" title="Reviuzy review automation guide" description="The 24-hour follow-up flow that lands four to six fresh bilingual reviews per month" />.
      </p>

      <InlineCTA variant="book" text="Want a 60-minute strategy call to map the post-move recovery sequence on your restaurant, no pitch, strategy doc sent regardless?" />

      <SectionDivider />

      <h2 id="thirty-day-recovery-plan">A 30-day visibility recovery plan after a Montreal restaurant move</h2>
      <p>
        Day one through three, edit the existing Google Business Profile listing, file Apple Maps Connect on the same day, update the website footer and LocalBusiness schema, and submit reverification by live video call if available. Day four through seven, push the new address to Pages Jaunes Canada, Yelp Montreal, the active reservation platform, the food delivery platforms, and 411.ca. Confirm each citation reflects the new NAP before moving on.
      </p>
      <p>
        Day eight through fourteen, upload three exterior photos with EXIF metadata intact, post a single Google Post in English and French announcing the move, and run a Siri query test from three Montreal arrondissements to confirm Apple Maps progress. Day fifteen through twenty-one, kick off the bilingual review cadence with a 24-hour follow-up to recent patrons asking them to mention the new address. Day twenty-two through thirty, audit the local pack position for the primary cuisine plus neighborhood query, and log any remaining Apple Maps lag for week five follow-up.
      </p>
      <p>
        Restaurants in Montreal that follow this 30-day plan typically recover their pre-move local pack position within the first month and exceed it within the second month. The lift comes from the combined freshness signal of the new Street View photos, the citation consistency, and the bilingual review cadence layered on top of the preserved listing history. The restaurants that miss the plan almost always missed one of the citation surfaces or filed Apple Maps too late. Both gaps are recoverable, but cost an extra month of partial visibility.
      </p>

      <KeyTakeaway
        points={[
          'Edit the existing GBP listing, do not delete and rebuild. The listing history carries every review, photo, and category signal that ranks the restaurant.',
          'Push the new NAP to the top six citation surfaces within seven days. Google, Pages Jaunes, Yelp, reservation, delivery, and 411.ca.',
          'File Apple Maps Connect the same day as Google. The Apple cycle is two to three times slower and quietly hides the restaurant from Siri until refreshed.',
          'Confirm bilingual signage on the storefront and upload three exterior photos with EXIF intact while waiting for the next Street View pass.',
          'Run a bilingual review cadence at four to six fresh reviews per month, asking returning patrons to mention the new address.',
          'Restaurants that follow this 30-day sequence typically recover their pre-move local pack position within the first month after the move.',
        ]}
      />

      <h2 id="faq">Frequently Asked Questions</h2>
      {meta.faqItems.map((f, i) => (
        <details key={i} className="my-3 rounded-lg border border-white/10 bg-white/[0.02] p-4">
          <summary className="cursor-pointer font-semibold text-white/90">{f.question}</summary>
          <p className="mt-3 text-white/70 text-[0.95rem]">{f.answer}</p>
        </details>
      ))}

      <img
        src={meta.images.end}
        alt="Montreal restaurant team celebrating the local pack recovery after the 30-day move sequence"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
