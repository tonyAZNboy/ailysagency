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
  slug: 'bilingual-google-reviews-quebec',
  title: 'Bilingual Google reviews in Quebec, the EN and FR playbook',
  metaDescription:
    'How to get bilingual EN and FR Google reviews from the same Quebec customers. NFC card prompts, language matching, reply discipline, and the regional split between Montreal and the regions.',
  tldr: 'Quebec local businesses get bilingual reviews by asking each customer in the language they were served in, using NFC review cards with bilingual prompts, and replying in the same language as the review. The mix is roughly 50/50 EN and FR in mixed Montreal neighborhoods, and tilts heavily French outside Montreal. Bilingual review velocity is a direct local pack ranking input and a strong AI citation signal in 2026.',
  category: 'reputation-reviews',
  tags: ['google reviews', 'bilingual', 'quebec', 'review velocity', 'reputation-reviews'],
  publishedDate: '2026-04-24',
  updatedDate: '2026-04-24',
  author: AUTHORS.strategy,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/bilingual-google-reviews-quebec/hero.webp',
    mid: '/blog-images/bilingual-google-reviews-quebec/mid.webp',
    end: '/blog-images/bilingual-google-reviews-quebec/end.webp',
  },
  faqItems: [
    {
      question: 'How do I get bilingual EN and FR reviews from the same customers?',
      answer:
        'Ask each customer in the language you served them in. If the visit happened in French, the prompt and the review request should be in French. If the visit was in English, the prompt should be in English. Use a routing tool that signs the request with the staff name and the language of service. Place a bilingual NFC card at the counter so the customer chooses their language without friction. Reply in the same language as the review, every time.',
    },
    {
      question: 'What is the typical EN to FR review split in Quebec local businesses?',
      answer:
        'In mixed Montreal neighborhoods (Plateau, Mile End, Notre-Dame-de-Grace, downtown), the split runs close to 50/50 EN and FR. In Old Montreal and the West Island, English skews higher, often 60/40 EN. Outside Montreal (Quebec City, Trois-Rivieres, Sherbrooke, Saguenay), the mix tilts heavily French, often 80/20 FR. The local cluster sets the realistic target. Audit the top five competitors before setting your own monthly bilingual goal.',
    },
    {
      question: 'Do bilingual Google reviews actually help local pack ranking?',
      answer:
        'Yes. Google reads review language as a relevance signal for bilingual queries. A clinic in Quebec City with reviews in both English and French ranks for both english speaking dentist Quebec City and dentiste Quebec, while a clinic with reviews in only one language ranks for one of those queries at most. The bilingual review signal also feeds AI engines like Google AIO and Perplexity, which now cite review text in their bilingual answers about local businesses.',
    },
    {
      question: 'Should I always reply to a French review in French?',
      answer:
        'Yes. Reply in the same language as the review, always. A French review answered in English reads as careless and erodes trust with the next French-speaking customer reading the profile. A bilingual reply (FR followed by EN translation) is acceptable for high-stakes complaints, but the default is single-language match. The reply text is also a citation surface for AI engines, so the language match strengthens the bilingual signal across the listing.',
    },
    {
      question: 'What is the best way to ask for a bilingual review at the counter?',
      answer:
        'A printed bilingual NFC card with two QR codes labeled FR and EN, placed at the counter or handed at checkout. The customer taps or scans, lands on the Google review page in their language, and the keyboard auto-detects accordingly. The cost is under 50 dollars CAD for a pack of cards and the cards last for years. Avoid telling staff to ask in a single language by default, that is what produces lopsided review profiles in mixed Quebec markets.',
    },
  ],
  relatedSlugs: ['google-review-velocity-playbook', 'negative-review-response-templates'],
  headings: [
    { id: 'why-bilingual-reviews-matter-in-quebec', text: 'Why bilingual reviews matter in Quebec' },
    { id: 'the-language-of-service-rule', text: 'The language of service rule' },
    { id: 'nfc-cards-and-counter-prompts', text: 'NFC cards and counter prompts' },
    { id: 'reply-discipline-same-language-every-time', text: 'Reply discipline, same language every time' },
    { id: 'regional-split-montreal-vs-regions', text: 'Regional split, Montreal versus the regions' },
    { id: 'how-bilingual-reviews-feed-ai-citations', text: 'How bilingual reviews feed AI citations' },
    { id: 'a-30-day-bilingual-review-build', text: 'A 30 day bilingual review build' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        Quebec local businesses ask the same question every quarter. How do I get bilingual google reviews quebec customers actually leave, in both English and French, from the same shop? The answer is a discipline, not a tool. Ask each customer in the language you served them in. Use a bilingual NFC card with two QR codes at the counter. Reply in the same language as the review. The mix lands close to 50/50 in mixed Montreal neighborhoods and tilts heavily French outside Montreal, and that bilingual signal feeds local pack ranking and AI citations directly in 2026.
      </p>

      <StatHighlight
        stats={[
          { value: '50/50', label: 'EN/FR split in mixed Montreal neighborhoods' },
          { value: '80/20 FR', label: 'Typical mix outside Montreal' },
          { value: '24 hours', label: 'Window to send the bilingual review request' },
        ]}
      />

      <SectionDivider />

      <h2 id="why-bilingual-reviews-matter-in-quebec">Why bilingual reviews matter in Quebec</h2>
      <p>
        Quebec is a bilingual market with French as the primary language for most local search queries and English as the second language across mixed neighborhoods, downtown, and the tourist corridors. A local business that earns reviews in only one language ranks for queries in that language and softens for the other. Google reads the review language mix as a relevance signal for bilingual queries, which matters because the same physical clinic, restaurant, or shop serves both communities every day.
      </p>
      <p>
        The math is concrete. A dental clinic in Quebec City with 80 lifetime reviews split 30 EN and 50 FR ranks for both english speaking dentist Quebec City and dentiste Quebec. A clinic with 80 reviews all in French ranks well for the French query and softens for the English one. The same physical reality, two different ranking outcomes, decided by review language balance.
      </p>
      <p>
        Past the local pack, bilingual reviews feed AI engines. Google AIO, Perplexity, and ChatGPT pull review text into their bilingual answers about local businesses. A clinic with French reviews mentioning detartrage and English reviews mentioning cleaning surfaces for both queries. The bilingual review velocity is one of the cheapest compounding signals a Quebec local business can build.
      </p>

      <CalloutBox type="info">
        <p>The local cluster sets the realistic bilingual target, not an absolute rule. Audit the top five local pack competitors. Count how many English and how many French reviews each has on the last 90 day window. Match the cluster mix and beat the cluster average by 25 percent on monthly velocity. That is the working baseline for any Quebec category.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Curious how your bilingual review profile compares to the top five local pack competitors in your category? Run the free 24 hour AI Visibility audit, includes a review language balance check." />

      <SectionDivider />

      <h2 id="the-language-of-service-rule">The language of service rule</h2>
      <p>
        The single rule that produces a healthy bilingual review profile is to ask each customer in the language you served them in. If the visit happened in French, the prompt and the review request should be in French. If the visit was in English, the prompt should be in English. The customer is not switching languages just because the review request showed up. They are matching the language of the visit, which is the language they remember.
      </p>
      <p>
        Operationally, this means the routing tool needs a language tag on every customer record. Most appointment systems already capture the language preference for confirmation emails. Pipe that field into the review request, sign the request with the staff name, and the prompt lands in the right language with no extra effort. If the language is not captured at booking, the front desk should ask once at intake and tag the record.
      </p>
      <p>
        Avoid the trap of asking everyone in French by default and assuming English speakers will translate themselves. They will not. They will skip the review entirely. The same trap runs the other way in English-only routing: French speakers leave fewer reviews because the prompt feels foreign. The bilingual mix collapses, the local pack ranking softens, and the operator wonders why the reviews stalled.
      </p>

      <CalloutBox type="warning">
        <p>Do not auto-translate review requests. A French request that reads like a translation from English (no Quebec spellings, awkward sentence rhythm, France French defaults like fin de semaine missing) signals to the customer that the business does not really operate in French. Hand-author the French prompt once, store it, reuse it. The five minutes saves a year of soft trust.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="nfc-cards-and-counter-prompts">NFC cards and counter prompts</h2>
      <p>
        The highest impact physical tool for bilingual reviews is a printed bilingual NFC card with two QR codes, one labeled FR and one labeled EN. Place the card at the counter, on the cafe table, or at the checkout. The customer taps or scans, lands on the Google review page in their language, and the mobile keyboard auto-detects accordingly. The card cost is under 50 dollars CAD for a pack and the cards last for years.
      </p>
      <p>
        The label discipline matters. The FR label and the EN label should be equal in size, equal in placement, and equal in color treatment. A card that puts FR in 18 point and EN in 10 point in the corner reads as French-first and pushes English speakers away. A card that does the reverse reads as English-first in a French market, which pushes French speakers away. Symmetric design, symmetric outcomes.
      </p>

      <h3>What goes on a bilingual NFC review card</h3>
      <ul>
        <li>Business name in Latin script, exactly as it appears on the Google Business Profile</li>
        <li>Two QR codes labeled FR and EN, equal size, side by side or stacked</li>
        <li>One short prompt per language, hand-authored, regional French spellings respected</li>
        <li>Optional: a thank-you line in both languages, no incentive language</li>
        <li>Back of card: the staff name or initials, makes the prompt feel personal</li>
      </ul>

      <p>
        The full vocabulary on review velocity work, including the cluster benchmark and the 90 day build plan, lives in the <InternalLink to="/blog/google-review-velocity-playbook" title="Google review velocity playbook" description="Monthly targets, recency weighting, and the ratios that move local pack ranking" /> reference post. The bilingual layer sits on top of that velocity baseline.
      </p>

      <QuickQuiz
        question="A customer was served in French at a Quebec City clinic. The review request goes out in English by default. What happens to the review rate?"
        options={[
          'Higher review rate, English requests are more polished',
          'Same rate, language does not matter for review prompts',
          'Lower review rate, the customer skips because the prompt language does not match the visit',
          'Higher rate, the customer translates and writes in English to be polite',
        ]}
        correctIndex={2}
        explanation="Customers respond to prompts that match the language of service. A French visit followed by an English request reads as foreign and most customers skip the review entirely. The rule is simple: ask in the language you served them in, every time."
      />

      <SectionDivider />

      <h2 id="reply-discipline-same-language-every-time">Reply discipline, same language every time</h2>
      <p>
        The reply rule is single-language match. A French review answered in French. An English review answered in English. Always. A French review answered in English reads as careless and erodes trust with the next French-speaking customer reading the profile. The reverse is true for English reviews answered in French.
      </p>
      <p>
        Build a bilingual template stack. Four templates per language, mapped to four scenarios: positive review with a service mention, positive review with a generic comment, negative review with a fact-correctable claim, negative review with an opinion. Each template stays under 100 words and ends with a personalized close that names the staff member. The templates are starting points, not scripts. Adjust the personal close every time, keep the body consistent.
      </p>
      <p>
        Reply window: within 24 hours for negative reviews, within 72 hours for positive ones. The reply text becomes part of the page's citation surface for AI engines like Google AIO and Perplexity, which now lift response patterns into their summaries about the business. Bilingual reply velocity reads as a quality signal that the business actually operates in both languages, not just claims to.
      </p>

      <img
        src={meta.images.mid}
        alt="Side by side reply templates in English and French for a Quebec local business with the same staff signature"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <p>
        The full reply scenario set, with response templates for the negative review patterns, is covered in the <InternalLink to="/blog/negative-review-response-templates" title="Negative review response templates" description="Bilingual templates for the four negative review scenarios" /> reference. The bilingual layer drops on top of those templates without changing the structure.
      </p>

      <InlineCTA variant="pricing" text="Want a managed program that handles bilingual prompts, NFC card design, and the bilingual reply template stack on a fixed monthly tier? See AiLys plans for Quebec local businesses." />

      <SectionDivider />

      <h2 id="regional-split-montreal-vs-regions">Regional split, Montreal versus the regions</h2>
      <p>
        The bilingual mix shifts by geography inside Quebec, and the operator needs to set the target accordingly. In mixed Montreal neighborhoods (Plateau, Mile End, Notre-Dame-de-Grace, downtown, parts of the South Shore), the split runs close to 50/50 EN and FR for most local categories. In Old Montreal and the West Island, English skews higher, often 60/40 EN, driven by tourism and the local English-speaking base.
      </p>
      <p>
        Outside Montreal, the tilt is sharply French. In Quebec City, the split runs around 80/20 FR for residential categories (clinics, repair shops, neighborhood restaurants), and softens to 65/35 FR in the tourist corridors of the historic district. In Trois-Rivieres, Sherbrooke, and Saguenay, the mix is often 85/15 FR or stronger. In the Gaspesie and the North Shore, French is closer to 95/5.
      </p>
      <p>
        Set the target to the local cluster, not to a national average. A clinic in Sherbrooke that sets a 50/50 target will spend a year chasing English reviews that the local market does not actually produce. A shop in Mile End that sets a 90/10 FR target will cap itself out of the English-speaking customer base it serves daily. The honest math is to match the cluster mix and beat the cluster average on monthly velocity by 25 percent.
      </p>

      <CalloutBox type="tip">
        <p>For multi-location businesses, set the bilingual target per location, never a chain-wide average. A coffee chain with locations in the Plateau, the West Island, and Quebec City should run three different bilingual review programs, each calibrated to the local cluster. Forcing a single chain-wide ratio softens ranking everywhere.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="how-bilingual-reviews-feed-ai-citations">How bilingual reviews feed AI citations</h2>
      <p>
        Review text is no longer just a star rating. AI engines mine the words inside reviews to answer service-specific queries. When the reviews exist in both languages, the same business surfaces for both bilingual query sets at the same time. A clinic with French reviews mentioning detartrage and English reviews mentioning cleaning shows up for both queries on Google AIO, Perplexity, and ChatGPT.
      </p>
      <p>
        Engineer the keyword variety in both languages. After a French-language appointment, the prompt should suggest the customer mention the service by its French name. After an English-language appointment, the prompt should suggest the service by its English name. Both forms feed the AI engines, both forms compound across the year. The work is the same effort whether the prompt language is French or English, and the payoff is double.
      </p>
      <p>
        For voice search specifically, bilingual reviews are the strongest signal. Siri, Google Assistant, and Amazon Alexa pull review text into their voice answers, and the bilingual review profile lets the same business surface for voice queries in both languages. A bilingual customer asking dis Siri trouve un dentiste pres de moi gets a different surface than asking Hey Siri find a dentist near me, and the businesses with bilingual reviews surface in both.
      </p>

      <InlineCTA variant="book" text="Want a 60 minute strategy call to design the bilingual review program around your specific Quebec cluster, with NFC card sample and template stack? No pitch, deliverable sent regardless." />

      <SectionDivider />

      <h2 id="a-30-day-bilingual-review-build">A 30 day bilingual review build</h2>
      <p>
        Day 1 to 7, audit the cluster. Pull the EN and FR review counts on the top five local pack competitors. Document the language split, the monthly velocity per language, and the reply rate per language. Set your bilingual target as the cluster average plus 25 percent on monthly velocity, with the language split matching the cluster mix.
      </p>
      <p>
        Day 8 to 14, ship the bilingual prompt. Hand-author the French and English review request prompts, store them in the routing tool, tag every customer record with the language of service. Print the bilingual NFC cards and place them at every counter or checkout point.
      </p>
      <p>
        Day 15 to 21, build the bilingual reply template stack. Four scenarios per language, each under 100 words, with a personalized close that names the staff member. Assign the daily reply window to a named owner. Reply within 24 hours on negatives, 72 hours on positives.
      </p>
      <p>
        Day 22 to 30, audit the language balance. Pull the last 30 days of reviews and check the EN/FR mix against the target. Adjust the prompt rotation if the mix is off. Most stalled bilingual programs move into balance inside this 30 day window if the rule (ask in the language of service, reply in the same language) is enforced every day.
      </p>

      <KeyTakeaway
        points={[
          'Ask each customer in the language you served them in, every time, no defaults.',
          'Bilingual NFC cards with two QR codes labeled FR and EN are the highest impact counter tool.',
          'Reply in the same language as the review, every time. The reply text feeds AI citations.',
          'The local cluster sets the bilingual target, not a national average. Match the cluster mix.',
          'Bilingual review velocity feeds local pack ranking, AI citations, and voice search at the same time.',
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
        alt="Bilingual review dashboard for a Quebec local business showing EN and FR review velocity across a quarter"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
