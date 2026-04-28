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
  slug: 'eeat-signals-for-solo-professionals',
  title: 'E-E-A-T signals for solo professionals, the 2026 proof checklist',
  metaDescription:
    'How a solo lawyer, dentist, accountant, or physiotherapist proves E-E-A-T to Google and AI engines in 2026. Quebec professional order anchors and the schema that ships in a week.',
  tldr:
    'Solo professionals prove E-E-A-T with four anchored signals. Experience as case-study language and explicit year counts on the byline. Expertise as degrees and certifications written next to the name. Authoritativeness as a Wikidata Q-number plus a deep link to the relevant Quebec professional order page. Trustworthiness as NAP consistency across the top six citations, fresh client reviews every month, and clean LocalBusiness plus Person schema. Solo practices that ship those four signals in the same week tend to climb two positions in the local pack and double their AI engine citation share inside one quarter.',
  category: 'aeo-geo-eeat',
  tags: ['eeat', 'solo professional', 'authority', 'wikidata', 'quebec'],
  publishedDate: '2026-03-17',
  updatedDate: '2026-03-17',
  author: AUTHORS.research,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/eeat-signals-for-solo-professionals/hero.webp',
    mid: '/blog-images/eeat-signals-for-solo-professionals/mid.webp',
    end: '/blog-images/eeat-signals-for-solo-professionals/end.webp',
  },
  faqItems: [
    {
      question: 'How do I prove E-E-A-T as a solo professional?',
      answer:
        'Anchor four signals in the same week. Experience is shown as explicit year counts on every author byline plus three case-study paragraphs that name the client situation, the action, and the result. Expertise is your degree, your certification, and your professional order number written next to your name on the homepage and the about page. Authoritativeness is a Wikidata Q-number that links the practice to the relevant Quebec order. Trustworthiness is NAP consistency across the top six citations, monthly client reviews, and clean LocalBusiness plus Person schema. Solo practices that ship the four signals together tend to double their AI engine citation share inside a quarter.',
    },
    {
      question: 'Does Google really weight a solo professional differently from a clinic with twenty staff?',
      answer:
        'Yes, but not the way most owners assume. Google reads a solo practice as a single Person entity layered on top of a LocalBusiness entity, while a clinic is a LocalBusiness entity with multiple Person entities linked under it. The solo practice can outrank a larger clinic on E-E-A-T when the Person entity is fully built. That means the byline year count, the Wikidata Q-number, the professional order page link, and the case-study language all reinforce one named person. A clinic that does not assign each service to a named professional often loses the AI engine citation race to a well-built solo practice next door.',
    },
    {
      question: 'What is a Wikidata Q-number and why does a solo lawyer or dentist need one?',
      answer:
        'A Wikidata Q-number is the unique identifier that the open knowledge graph assigns to a real-world entity. Once you have a Q-number for the solo professional and one for the practice, every AI engine that queries Wikidata can resolve the entity cleanly instead of guessing. ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot all use Wikidata as a citation anchor. A solo professional without a Q-number is invisible to that anchor layer. Building one takes a single afternoon plus a one-week patrol period for the Wikidata community to confirm the entity is notable and well sourced.',
    },
    {
      question: 'Which Quebec professional order page should I link from my site?',
      answer:
        'Link the order that licenses your practice and link the deep page for your specific entry, not the homepage of the order. A Quebec lawyer links the Tableau de l\'Ordre entry on the Barreau du Quebec site. A dentist links the personal entry on the Ordre des dentistes du Quebec public registry. An accountant links the CPA Quebec member directory entry. A physiotherapist links the OPPQ public roll entry. The deep link is what AI engines use to confirm the practice is licensed and in good standing. The homepage link does not carry the same proof weight.',
    },
    {
      question: 'How fast does an E-E-A-T cleanup move the local pack and AI citation share?',
      answer:
        'A solo practice that ships the four E-E-A-T anchors in the same week tends to see two kinds of movement. Local pack position climbs one to two spots inside 60 to 90 days, driven mostly by the NAP consistency and review velocity work that compounds with the new authority signals. AI engine citation share usually doubles inside the same quarter, because the Wikidata Q-number plus the professional order deep link give engines a clean entity to resolve on. The pattern is consistent across solo lawyers, dentists, accountants, and physiotherapists in our Quebec data set.',
    },
    {
      question: 'Do I need to publish under my own name to prove Experience?',
      answer:
        'Yes. Author bylines are the cheapest Experience signal a solo practice can ship. Every blog post, every long-form FAQ entry, every case-study page should carry the named professional with a year-count phrase and a deep link to the about page. The about page itself should carry the professional order number, the year of admission, and the certifications stack. Generic copy under the practice name reads as low-experience to AI engines and Google quality raters in the same way. Solo professionals who switch from a brand byline to a personal byline often see citation share lift in the next monthly probe.',
    },
  ],
  relatedSlugs: [
    'aeo-geo-eeat-explained-for-local-owners',
    'wikidata-for-local-businesses',
    'nap-consistency-audit-quebec',
  ],
  headings: [
    { id: 'why-solo-professionals-need-eeat-differently', text: 'Why solo professionals need E-E-A-T differently from clinics' },
    { id: 'experience-the-byline-and-year-count-anchor', text: 'Experience, the byline and year-count anchor' },
    { id: 'expertise-degrees-certifications-and-orders', text: 'Expertise, degrees, certifications, and the Quebec orders' },
    { id: 'authoritativeness-wikidata-and-the-order-deep-link', text: 'Authoritativeness, Wikidata and the order deep link' },
    { id: 'trustworthiness-nap-reviews-and-schema', text: 'Trustworthiness, NAP, reviews, and schema' },
    { id: 'the-solo-professional-eeat-cleanup-week', text: 'The solo professional E-E-A-T cleanup week' },
    { id: 'how-ai-engines-actually-resolve-a-solo-professional-entity', text: 'How AI engines actually resolve a solo professional entity' },
    { id: 'measuring-eeat-lift-after-the-cleanup', text: 'Measuring E-E-A-T lift after the cleanup' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        Solo lawyers, dentists, accountants, and physiotherapists prove E-E-A-T to Google and AI engines through four anchored signals shipped in the same week. Experience is the byline year count plus three case-study paragraphs. Expertise is the degree, the certification, and the Quebec professional order number written next to the name. Authoritativeness is a Wikidata Q-number plus a deep link to the order entry, not the order homepage. Trustworthiness is NAP consistency on the top six citations, fresh client reviews every month, and a clean LocalBusiness plus Person schema stack. Solo practices that ship the four anchors in the same week tend to climb one to two local pack positions inside 90 days and double their AI engine citation share inside one quarter.
      </p>

      <StatHighlight
        stats={[
          { value: '4 anchors', label: 'Experience, Expertise, Authoritativeness, Trust' },
          { value: '90 days', label: 'Typical local pack movement after the cleanup' },
          { value: '1 week', label: 'Time to ship all four signals at solo scale' },
        ]}
      />

      <SectionDivider />

      <h2 id="why-solo-professionals-need-eeat-differently">Why solo professionals need E-E-A-T differently from clinics</h2>
      <p>
        A solo practice is read by Google and AI engines as a single Person entity layered on top of a LocalBusiness entity. A clinic is a LocalBusiness entity with multiple Person entities linked under it. That structural difference matters because the solo practice can outrank a larger clinic on E-E-A-T when the single Person entity is fully built. The byline year count, the Wikidata Q-number, the professional order page link, and the case-study language all reinforce one named person. A clinic that has not assigned each service to a named professional often loses the AI engine citation race to a well-built solo practice next door.
      </p>
      <p>
        Quebec adds a second layer. Every regulated profession in the province is licensed by an order. The Barreau du Quebec for lawyers, the Ordre des dentistes du Quebec for dentists, CPA Quebec for accountants, the Ordre professionnel de la physiotherapie du Quebec for physiotherapists. Each order maintains a public roll with a deep page per member. That deep page is the cheapest Authoritativeness signal a Quebec solo professional can buy. It already exists. The job is to link to it correctly and to make the AI engines resolve it.
      </p>
      <p>
        The four E-E-A-T pillars cost more for a clinic to ship because each named professional needs a separate build. They cost less for a solo practice because one Person entity carries the full weight. That is why solo practices in our data set who run the cleanup week see faster movement than clinic chains that run the same checklist across ten staff bios.
      </p>

      <CalloutBox type="info">
        <p>The four E-E-A-T pillars are defined in Google's Quality Rater Guidelines and are now inherited by every AI engine that pulls from Google's index. See the plain-English version on <InternalLink to="/glossary/e-e-a-t" title="E-E-A-T glossary entry" description="What Experience, Expertise, Authoritativeness, and Trustworthiness mean for local owners" /> and the long-form breakdown on <InternalLink to="/blog/aeo-geo-eeat-explained-for-local-owners" title="AEO, GEO, and E-E-A-T explained" description="The 90-day plan that sequences the three layers" />.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Want to see which E-E-A-T anchor is missing on your solo practice site? Run the free 24-hour AI Visibility audit." />

      <SectionDivider />

      <h2 id="experience-the-byline-and-year-count-anchor">Experience, the byline and year-count anchor</h2>
      <p>
        Experience is the cheapest of the four pillars to ship and the one most solo practices skip. The work has two pieces. First, every blog post, every FAQ page, every case-study page must carry a named author byline that includes a year-count phrase. A lawyer with sixteen years of family law practice writes that on the byline. A dentist with eleven years in pediatric dentistry writes that. A CPA with eight years of audit experience writes that. The number is concrete, the role is concrete, and AI engines lift it directly into citations.
      </p>
      <p>
        Second, the about page must carry three case-study paragraphs. Each paragraph names the client situation in plain language, names the action the professional took, and names the result. No fabricated metrics, no vague language. A real account of a divorce file that closed in nine months, a real account of a complex root canal salvage, a real account of an audit defense that recovered a tax credit. Three honest case studies on the about page beat thirty generic service paragraphs every time, because LLM extractive snippets prefer concrete narratives over marketing copy.
      </p>

      <CalloutBox type="tip">
        <p>Write the year-count phrase the same way on every page. A dentist with eleven years writes "Eleven years of pediatric dentistry in Montreal" on the homepage, the about page, the byline, the GBP description, and the LinkedIn headline. Repetition across surfaces is what AI engines use to confirm the experience claim is real and not just a marketing line.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="expertise-degrees-certifications-and-orders">Expertise, degrees, certifications, and the Quebec orders</h2>
      <p>
        Expertise is the formal credentialing layer. Degrees, certifications, and the Quebec professional order entry. The about page should list the degree with the institution and the year. McGill Faculty of Law 2009 reads cleaner than "Law degree from a Canadian university." Universite de Montreal Faculty of Dentistry 2014. HEC Montreal MSc in Accounting 2017. The institution name and year give an AI engine an entity to resolve against Wikidata and the alumni rolls.
      </p>
      <p>
        The professional order number is the most important Expertise anchor in Quebec. A lawyer publishes the Barreau membership number. A dentist publishes the Ordre des dentistes member number. A CPA publishes the CPA permit number. A physiotherapist publishes the OPPQ permit number. The number anchors the practice to a regulated authority, and AI engines use that anchor to confirm the practice is licensed and in good standing. Hiding the number behind a fine-print footer costs citation share for no reason.
      </p>
      <p>
        Certifications stack on top. A lawyer who is also a notaire writes that. A dentist with an Invisalign Diamond certification writes that. A CPA who is also a CFA charter holder writes that. Every certification is one more entity that AI engines can resolve and one more reason to cite the practice over a thinner profile next door.
      </p>

      <SectionDivider />

      <h2 id="authoritativeness-wikidata-and-the-order-deep-link">Authoritativeness, Wikidata and the order deep link</h2>
      <p>
        Authoritativeness is the layer most solo professionals never reach because they confuse it with Expertise. Authoritativeness is what other reputable sources say about the practice, not what the practice says about itself. The two cheapest moves at solo scale are a Wikidata Q-number for the named professional and a deep link to the Quebec professional order entry.
      </p>
      <p>
        Wikidata is the open knowledge graph that AI engines use as a citation anchor. A Q-number is the unique identifier that the graph assigns to a real-world entity. Building a Q-number for the solo professional and a second one for the practice takes a single afternoon plus a one-week patrol period for the Wikidata community to confirm the entity is notable and well sourced. The notability bar is real but reasonable. A solo professional with five years of practice, a real address, a real order entry, and at least one third-party citation usually clears it. See the long-form playbook on <InternalLink to="/blog/wikidata-for-local-businesses" title="Wikidata for local businesses" description="The submission, sourcing, and patrol strategy that gets a Q-number live" />.
      </p>
      <p>
        The order deep link is the second move. A Quebec lawyer links the Tableau de l'Ordre entry on the Barreau site. A dentist links the personal entry on the Ordre des dentistes public registry. A CPA links the CPA Quebec member directory entry. A physiotherapist links the OPPQ public roll entry. Link the deep page for the specific entry, not the homepage of the order. The deep link is what AI engines use to confirm the practice is licensed. The homepage link does not carry the same proof weight.
      </p>

      <QuickQuiz
        question="A solo dentist in Montreal wants to lift Authoritativeness for AI engines in one week. Which combination delivers the most weight per hour of work?"
        options={[
          'Buy ten low-quality directory listings on offshore citation networks',
          'Publish a Wikidata Q-number plus a deep link to the Ordre des dentistes registry entry',
          'Run a paid Google Ads campaign for the brand name',
          'Add a press logos strip with no actual press coverage behind the logos',
        ]}
        correctIndex={1}
        explanation="The Wikidata Q-number plus the deep link to the Ordre des dentistes public registry entry give AI engines two clean authority anchors that resolve to real third-party sources. The other options either add no citation weight or actively hurt trust scores."
      />

      <InlineCTA variant="pricing" text="Need a managed E-E-A-T cleanup that ships Wikidata, the order deep link, and the schema stack in the same week? See the AiLys tiers from Starter at 300 dollars CAD." />

      <SectionDivider />

      <h2 id="trustworthiness-nap-reviews-and-schema">Trustworthiness, NAP, reviews, and schema</h2>
      <p>
        Trustworthiness is the operational layer. Three signals carry most of the weight at solo scale. NAP consistency on the top six citations, monthly client review velocity, and a clean schema stack with LocalBusiness and Person types linked together. Each signal is cheap on its own. The trust lift comes from shipping all three at the same time so the AI engines see a coherent profile in one crawl.
      </p>
      <p>
        NAP stands for name, address, phone. Consistency across Google Business Profile, Apple Maps Connect, Pages Jaunes Canada, the Quebec professional order entry, the LinkedIn page, and the practice website is the floor. Drift on any one of those six surfaces drops trust scores in retrieval models that compare entity tuples across crawl sources. The full audit checklist lives at <InternalLink to="/glossary/nap" title="NAP consistency glossary" description="The six citation surfaces a Quebec solo practice must keep in sync" />.
      </p>
      <p>
        Reviews are the second trust signal. Aim for two to four fresh reviews per month with bilingual variety. Solo practices in Quebec who pull three French reviews and two English reviews per month outrank solo practices who pull seven reviews in one language only. The bilingual mix reads to AI engines as proof that both halves of the local market are served.
      </p>

      <CalloutBox type="warning">
        <p>Do not chase a one-time burst of fifty reviews in a week. AI engines and Google both flag the velocity spike as suspicious and the trust score can drop instead of rising. Steady three-to-five reviews per month for six months beats a fifty-review spike followed by silence in every Quebec data set we have audited.</p>
      </CalloutBox>

      <p>
        Schema is the third trust signal. The minimum stack for a solo practice is a LocalBusiness entity with hours, address, phone, and service area, a Person entity for the named professional with sameAs links to Wikidata and the order deep link, a FAQPage entity with five to seven questions, and a Review aggregateRating that mirrors the Google review count. Without those four schema types shipped cleanly, the rest of the E-E-A-T work loses lift because AI engines cannot resolve the entities into a single coherent profile.
      </p>

      <SectionDivider />

      <h2 id="the-solo-professional-eeat-cleanup-week">The solo professional E-E-A-T cleanup week</h2>
      <p>
        The four anchors ship in one week if the work is sequenced. Day one and two, rebuild the about page with the year-count phrase, the degree with institution and year, the Quebec order number, and three honest case-study paragraphs. Day three, build the Wikidata Q-number for the named professional and submit it for patrol. Day four, audit the NAP across the top six citations and fix any drift. Day five, write the deep link to the order entry into the homepage, the about page, and the footer.
      </p>
      <p>
        Day six, ship the schema stack. LocalBusiness, Person, FAQPage, and Review aggregateRating. Day seven, kick off the monthly review cadence with a 24-hour follow-up message that asks the client for a bilingual review naming the specific service received. The week ends with all four E-E-A-T anchors live and a measurable AI Visibility probe scheduled for day thirty.
      </p>
      <p>
        Solo practices that try to ship the anchors over a quarter instead of a week tend to see slower movement, because AI engines crawl the surfaces on different schedules and a partial profile is read as a partial signal. Shipping the four anchors in the same week is what makes the next crawl read the practice as a coherent E-E-A-T profile. See the industry playbooks at <InternalLink to="/industries" title="AiLys industry playbooks" description="Sequenced E-E-A-T checklists by profession" /> for the per-profession variant.
      </p>

      <img
        src={meta.images.mid}
        alt="Seven-day E-E-A-T cleanup timeline for a solo Quebec professional showing about page, Wikidata, NAP audit, order deep link, schema, and review cadence"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <h2 id="how-ai-engines-actually-resolve-a-solo-professional-entity">How AI engines actually resolve a solo professional entity</h2>
      <p>
        ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot resolve a solo professional entity through three layers. First, the structured data on the practice site (LocalBusiness plus Person schema). Second, the third-party anchors (Wikidata Q-number, the Quebec professional order entry, high-authority directories). Third, the unstructured signals (reviews, byline year counts, case-study language, bilingual coverage). The engines weight the three layers differently, but a strong profile looks consistent across all three.
      </p>
      <p>
        The failure mode that costs solo practices the most citation share is contradiction across layers. The schema says one address. Google Business Profile says another. The Quebec order entry says a third. The Wikidata Q-number is missing. In that scenario every AI engine downgrades the entity confidence and cites a competitor with a thinner profile but cleaner consistency. Fixing the contradictions is more important than expanding the surface area. A coherent four-anchor profile beats a sprawling but contradictory ten-anchor profile every time.
      </p>

      <CalloutBox type="tip">
        <p>Run the AI Visibility probe before the cleanup week and again on day thirty. The before-and-after delta is the clearest evidence the four-anchor work moved citation share. Solo practices in our data set typically see citation share double inside the first probe cycle after the cleanup.</p>
      </CalloutBox>

      <InlineCTA variant="book" text="Want a 60-minute strategy call to map the four E-E-A-T anchors against your solo practice, no pitch, strategy doc sent regardless?" />

      <SectionDivider />

      <h2 id="measuring-eeat-lift-after-the-cleanup">Measuring E-E-A-T lift after the cleanup</h2>
      <p>
        Three measurements track the lift after the cleanup week. AI engine citation share on the practice category query in the city, local pack position for the primary service plus city query, and review velocity over the trailing 60 days. The AiLys AI Visibility engine runs the citation share probe across ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot once a month and ties the result back to the named professional and the practice entity.
      </p>
      <p>
        The expected pattern after a clean E-E-A-T cleanup week is a one-to-two-position climb in the local pack inside 60 to 90 days, citation share doubling on the AI engine probe inside one quarter, and review velocity stabilizing at three to five fresh reviews per month. Solo practices that miss the pattern almost always missed one of the four anchors. The most common gap is the Wikidata Q-number, because it requires a one-week patrol period that owners forget to schedule. The second most common gap is the professional order deep link, because owners link the order homepage instead of the personal entry page.
      </p>
      <p>
        For a managed run of the cleanup week with the schema stack built and the Wikidata patrol handled, see the <InternalLink to="/audit" title="Free 24-hour AI Visibility audit" description="See the citation gaps before signing anything" /> deliverable, then book the strategy call for the per-profession variant.
      </p>

      <KeyTakeaway
        points={[
          'E-E-A-T for a solo professional is four anchors, shipped in the same week. Skipping one breaks the coherence of the profile.',
          'Experience is the byline year count plus three case-study paragraphs on the about page. Concrete narratives beat generic copy.',
          'Authoritativeness is a Wikidata Q-number plus a deep link to the Quebec professional order entry, not the order homepage.',
          'Trustworthiness is NAP consistency on the top six citations, monthly bilingual reviews, and a clean LocalBusiness plus Person schema stack.',
          'Solo practices that ship the four anchors together typically climb one to two local pack positions in 90 days and double AI citation share in a quarter.',
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
        alt="Solo Quebec professional reviewing AI Visibility citation share lift on a dashboard after the four-anchor E-E-A-T cleanup week"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
