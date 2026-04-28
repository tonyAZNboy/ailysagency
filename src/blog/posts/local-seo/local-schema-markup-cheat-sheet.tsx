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
  slug: 'local-schema-markup-cheat-sheet',
  title: 'Local schema markup cheat sheet, the 2026 reference for Quebec',
  metaDescription:
    'A practical schema cheat sheet for Quebec local businesses. LocalBusiness, Attorney, MedicalBusiness, Restaurant, AutoRepair, Plumber, Electrician, plus order credentials.',
  tldr:
    'Pick the narrowest schema subtype that fits your business, fill the eight required fields, then layer Person schema on every named professional with their Quebec order credentials inside the member property. A law firm uses Attorney with member pointing to the Barreau du Quebec entry. A clinic uses MedicalBusiness with member pointing to each doctor on the Ordre des medecins page. Restaurants use Restaurant with servesCuisine. Trades use Plumber, Electrician, or AutoRepair. Quebec adds one extra rule: every credential link must be the deep public registry URL, never the order homepage, or AI engines will not resolve the proof.',
  category: 'local-seo',
  tags: ['schema', 'local seo', 'json-ld', 'structured data', 'quebec', 'local-seo'],
  publishedDate: '2026-04-18',
  updatedDate: '2026-04-18',
  author: AUTHORS.research,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/local-schema-markup-cheat-sheet/hero.webp',
    mid: '/blog-images/local-schema-markup-cheat-sheet/mid.webp',
    end: '/blog-images/local-schema-markup-cheat-sheet/end.webp',
  },
  faqItems: [
    {
      question: 'What schema type should a law firm use locally?',
      answer:
        'A Quebec law firm should use Attorney as the primary schema type, not the generic LocalBusiness, and not LegalService alone. Attorney is the narrow Schema.org subtype that signals a licensed practitioner to Google and AI engines. Layer Person schema on every named lawyer with the member property pointing to the deep Tableau de l Ordre entry on the Barreau du Quebec site. Add areaServed for each city the firm covers, knowsAbout for the practice areas, and openingHoursSpecification for office hours. The combination resolves cleanly inside ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot citations.',
    },
    {
      question: 'Do I really need both LocalBusiness and a more specific subtype?',
      answer:
        'No. Pick the narrowest subtype that fits and stop there. Schema.org subtypes already inherit from LocalBusiness, so adding both is redundant and sometimes triggers parser warnings. A dental clinic uses Dentist or MedicalBusiness, not Dentist plus LocalBusiness. A restaurant uses Restaurant. A plumber uses Plumber. The narrow subtype tells AI engines exactly what kind of entity they are reading. The generic LocalBusiness tells them less and competes with thousands of weaker matches in the same answer set.',
    },
    {
      question: 'How do I encode Quebec professional order credentials in schema?',
      answer:
        'Use the member property on the LocalBusiness or its subtype, with each member as a Person object that carries jobTitle, identifier (the order registration number), and a memberOf object that points to the Quebec professional order with a sameAs deep link to the public registry entry. The deep link is the load-bearing piece. ChatGPT and Perplexity can confirm a license is active by reading the registry page, but only when the URL points to the practitioner page itself, not the order homepage. A doctor without that deep link is treated as an unverified claim by every major AI engine.',
    },
    {
      question: 'What are the eight required fields for LocalBusiness schema?',
      answer:
        'Name, address (as a PostalAddress object with streetAddress, addressLocality, addressRegion, postalCode, addressCountry), telephone, url, image, priceRange, openingHoursSpecification, and geo (as a GeoCoordinates object with latitude and longitude). Google rejects the rich result if any of those fields are missing on a local business. Quebec businesses should also add areaServed, even though it is technically optional, because the local pack ranking algorithm reads it as a service-area signal. Skip currenciesAccepted unless you are a multi-currency operation. It adds noise without lift.',
    },
    {
      question: 'Should I add aggregateRating to my schema or wait until I have more reviews?',
      answer:
        'Add it only if you genuinely have reviews on Google or another platform that you can point to with a reviewCount and a ratingValue. Google now rejects aggregateRating that does not match a public review source, and Search Console flags the page. If your practice is new and has under five reviews, leave aggregateRating out and add it once you cross ten reviews. The temporary absence does not hurt rankings. The fake or inflated rating triggers a manual action that can take six weeks to recover from.',
    },
    {
      question: 'How do I validate my schema before shipping it to production?',
      answer:
        'Run three checks in order. First, paste the JSON-LD into the Google Rich Results Test and confirm zero errors and the right rich result type. Second, run it through the Schema.org validator at validator.schema.org for type-correctness across all the nested objects. Third, after deploy, watch Google Search Console for the next two weeks under the Enhancements panel for the schema type you shipped. If the page count climbs and the error count stays at zero, the schema is healthy. If errors appear, fix them inside seven days before the cumulative weight starts to soften the rankings.',
    },
    {
      question: 'Can I use schema markup in both English and French on the same page?',
      answer:
        'Yes, and you should for any Quebec page that ships in both languages. Each language version is a separate URL with its own JSON-LD block. The name, description, knowsAbout, and any human-readable string fields should reflect the page language. Structured fields like address, telephone, geo, and openingHoursSpecification stay identical across languages. Add inLanguage to the LocalBusiness object with the value en-CA or fr-CA so AI engines pick the right language version when citing the entity in answers.',
    },
  ],
  relatedSlugs: [
    'eeat-signals-for-solo-professionals',
    'nap-consistency-audit-quebec',
    'wikidata-for-local-businesses',
  ],
  headings: [
    { id: 'pick-the-narrowest-subtype-that-fits', text: 'Pick the narrowest subtype that fits' },
    { id: 'the-eight-required-fields-for-localbusiness', text: 'The eight required fields for LocalBusiness' },
    { id: 'attorney-and-legal-services', text: 'Attorney and legal services' },
    { id: 'medicalbusiness-dentist-physician-and-clinic', text: 'MedicalBusiness, Dentist, Physician, and clinic' },
    { id: 'restaurant-foodestablishment-and-cuisine', text: 'Restaurant, FoodEstablishment, and servesCuisine' },
    { id: 'autorepair-plumber-electrician-and-trades', text: 'AutoRepair, Plumber, Electrician, and trades' },
    { id: 'quebec-order-credentials-inside-the-member-property', text: 'Quebec order credentials inside the member property' },
    { id: 'validate-and-monitor-after-deploy', text: 'Validate and monitor after deploy' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        Schema markup is the cheapest local SEO win that still moves the needle in 2026. The wrong subtype, an empty required field, or a missing professional order link will keep a Quebec local business invisible inside ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot citations even when every other signal is healthy. This cheat sheet ships the right subtype for the most common Quebec verticals, the eight required fields no LocalBusiness should ship without, and the Quebec-specific rule for encoding professional order credentials so AI engines can resolve the proof. No invented stats, no theory, no cargo-cult markup. Real subtypes, real fields, real registry links.
      </p>

      <StatHighlight
        stats={[
          { value: '8 fields', label: 'Required on every LocalBusiness JSON-LD block' },
          { value: '20+ subtypes', label: 'Narrow LocalBusiness subtypes covering Quebec verticals' },
          { value: 'Deep link', label: 'Required on every Quebec order credential' },
        ]}
      />

      <SectionDivider />

      <h2 id="pick-the-narrowest-subtype-that-fits">Pick the narrowest subtype that fits</h2>
      <p>
        Every Quebec local business should encode the narrowest Schema.org subtype that still describes the operation. The narrow subtype tells AI engines what kind of entity they are reading. The generic LocalBusiness tells them less and forces the engine to guess from the rest of the page. Guessing produces softer citations and weaker local pack signals.
      </p>
      <p>
        The mapping is simple once the catalog is laid out. A law firm is Attorney. A solo lawyer is Attorney plus a Person sub-entity. A dental clinic is Dentist (a subtype of MedicalBusiness). A general practitioner is Physician. A restaurant is Restaurant, with the optional FastFoodRestaurant or BarOrPub subtype if it fits. A plumber is Plumber. An electrician is Electrician. An auto repair shop is AutoRepair. A real estate office is RealEstateAgent. A hair salon is HairSalon. A spa is DaySpa. A gym is ExerciseGym. None of these inherit from each other. Each is a sibling at the same Schema.org level, and each carries a different ranking lift inside the local pack and AI engine answers.
      </p>

      <CalloutBox type="info">
        <p>The full LocalBusiness subtype tree lives at schema.org/LocalBusiness. Bookmark it. The catalog updates two or three times a year as Schema.org adds new subtypes for emerging categories. New subtypes that hit the catalog in 2025 and 2026 include Plumber being formally split from HomeAndConstructionBusiness, and a handful of new Restaurant subtypes for niche cuisines.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Not sure which subtype fits your practice? Run the free 24-hour AiLys audit. The schema check is part of the deliverable, with the right subtype recommendation per page." />

      <SectionDivider />

      <h2 id="the-eight-required-fields-for-localbusiness">The eight required fields for LocalBusiness</h2>
      <p>
        Google rejects the LocalBusiness rich result if any of these eight fields is missing or malformed. The fields apply to every subtype because every subtype inherits from LocalBusiness. Ship them on every page that carries the markup, including the homepage, the about page, and any service detail page that represents the same physical location.
      </p>

      <h3>The eight fields</h3>
      <ol>
        <li>name, the official business name as registered. No abbreviations.</li>
        <li>address as a PostalAddress object with streetAddress, addressLocality, addressRegion, postalCode, and addressCountry. For Quebec, addressRegion is QC and addressCountry is CA.</li>
        <li>telephone in international format with the country code. The plus sign is required, and the format reads as plus 1 514 555 0100 with the dashes optional but consistent across pages.</li>
        <li>url, the canonical homepage URL. https with the trailing slash matching what is in the sitemap.</li>
        <li>image, an absolute URL to a 1200 by 630 photo of the storefront, the team, or the service. Logo-only images get penalized in 2026 because Google now wants real-world imagery.</li>
        <li>priceRange as a string of dollar signs from one to four, or a literal range like 25 to 75. Empty priceRange triggers a warning.</li>
        <li>openingHoursSpecification as an array of OpeningHoursSpecification objects, one per weekday block. Skip if hours vary too widely, but most local businesses ship this.</li>
        <li>geo as a GeoCoordinates object with latitude and longitude. Use the rooftop coordinates from the GBP listing, not a generic city center.</li>
      </ol>

      <p>
        Two optional fields punch above their weight in Quebec. areaServed encoded as an array of City or AdministrativeArea objects helps the local pack on service-area queries. inLanguage with en-CA or fr-CA tells AI engines which language version of the page they are reading and prevents accidental cross-language citation in answer sets.
      </p>

      <CalloutBox type="warning">
        <p>The priceRange field is the most-skipped required field on Quebec pages. Operators leave it blank because the price varies by service. Do not. Ship a representative range or a dollar-sign band. An empty priceRange disqualifies the rich result and kills the visual lift in the SERP. A best guess is better than a blank.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="attorney-and-legal-services">Attorney and legal services</h2>
      <p>
        A Quebec law firm uses Attorney as the primary schema type. Attorney is a Schema.org subtype that explicitly signals a licensed legal practitioner. The generic LegalService is too broad and is meant for paralegal services and notary offices, not licensed lawyers. Use Attorney when the named professionals are members of the Barreau du Quebec or the Chambre des notaires du Quebec.
      </p>
      <p>
        Layer Person schema on every named lawyer in the firm. Each Person object should carry name, jobTitle (Lawyer or Notary), identifier (the Barreau registration number), and a memberOf object pointing to the Barreau du Quebec with a sameAs property linking to the deep public Tableau de l Ordre entry. Add knowsAbout to list practice areas (family law, real estate law, criminal defense, immigration). The combination resolves cleanly across every major AI engine and is what gives a small Quebec firm citation parity with national chains.
      </p>

      <h3>Practical example structure</h3>
      <ul>
        <li>@type: Attorney for the firm</li>
        <li>name: the full registered firm name</li>
        <li>member: array of Person objects, one per practicing lawyer</li>
        <li>each member has identifier (Barreau number), memberOf (the order with the deep registry URL in sameAs), and knowsAbout (practice areas)</li>
        <li>areaServed: City objects for every city the firm represents clients in</li>
        <li>knowsLanguage: an array of en-CA and fr-CA strings, since bilingual capacity is a ranking signal in Quebec legal search</li>
      </ul>

      <QuickQuiz
        question="What is the right primary schema subtype for a Quebec law firm with three named lawyers?"
        options={[
          'LocalBusiness with a description that mentions law',
          'LegalService for the firm and Person for each lawyer',
          'Attorney for the firm with member array of Person objects pointing to the Barreau du Quebec deep registry URLs',
          'ProfessionalService with knowsAbout listing the practice areas',
        ]}
        correctIndex={2}
        explanation="Attorney is the narrow Schema.org subtype for licensed lawyers. Layering Person objects in the member array with deep links to the Barreau du Quebec public registry gives AI engines a clean entity tree they can resolve and cite. LegalService is reserved for paralegals and notary offices in the broader sense. ProfessionalService and LocalBusiness are too generic to outperform the narrow Attorney subtype in 2026 SERPs and AI answers."
      />

      <h2 id="medicalbusiness-dentist-physician-and-clinic">MedicalBusiness, Dentist, Physician, and clinic</h2>
      <p>
        Healthcare in Quebec maps to MedicalBusiness and its subtypes. A dental clinic uses Dentist. A general practice uses Physician for the named doctor and MedicalClinic for the practice if multiple specialties operate from the same building. A physiotherapist clinic uses MedicalBusiness with knowsAbout listing the modality, since Schema.org has no narrower Physiotherapy subtype yet. Same for chiropractors, who use MedicalBusiness with the appropriate knowsAbout values.
      </p>
      <p>
        The credential layer is mandatory in healthcare. Every named doctor needs a Person sub-entity with member or memberOf pointing to the Quebec college that licenses them. The Ordre des dentistes du Quebec for dentists, the Ordre des medecins du Quebec for physicians, the Ordre professionnel de la physiotherapie du Quebec for physiotherapists, the Ordre des chiropraticiens du Quebec for chiropractors. The deep registry link to the practitioner page is what makes the credential machine-readable.
      </p>

      <img
        src={meta.images.mid}
        alt="JSON-LD schema example for a Quebec dental clinic with dentist Person entities pointing to the Ordre des dentistes registry"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <p>
        For a deeper read on how AI engines resolve a solo professional entity through Person schema and Wikidata, see <InternalLink to="/glossary/e-e-a-t" title="E-E-A-T glossary entry" description="The four E-E-A-T anchors for solo professionals and clinics" />. For the ranking impact of those signals across the Quebec professional orders, see <InternalLink to="/blog/eeat-signals-for-solo-professionals" title="E-E-A-T signals for solo professionals" description="The 2026 proof checklist for solo lawyers, dentists, accountants" />.
      </p>

      <SectionDivider />

      <h2 id="restaurant-foodestablishment-and-cuisine">Restaurant, FoodEstablishment, and servesCuisine</h2>
      <p>
        Restaurants in Quebec use Restaurant as the primary subtype. Sub-subtypes exist for narrower fits. FastFoodRestaurant for counter-service. CafeOrCoffeeShop for cafes. BarOrPub for bars. Bakery for boulangeries and patisseries. The narrow subtype affects which Google rich results show. A coffee shop tagged as Restaurant misses the cafe-specific filters in Google Maps.
      </p>
      <p>
        Two Restaurant-specific fields move the needle. servesCuisine is an array of cuisine strings (Italian, Lebanese, Quebec, Asian fusion). It directly affects which dishes-near-me queries the restaurant surfaces on. menu is a URL pointing to the menu page or PDF. Skip menuItem and Menu objects. They are heavy to maintain and Google does not weight them more than the menu URL in 2026.
      </p>

      <h3>Quebec restaurant specifics</h3>
      <ul>
        <li>servesCuisine should include "Quebec" as a literal string for restaurants serving regional cuisine. Google AIO recognizes this string and surfaces the restaurant on Quebec cuisine queries.</li>
        <li>acceptsReservations is a boolean. Set it true if the restaurant takes reservations through any platform, even if not OpenTable specifically.</li>
        <li>hasMenu is the modern preferred property over menu. Both work, but Schema.org has been deprecating menu since 2024.</li>
      </ul>

      <CalloutBox type="tip">
        <p>If a restaurant has a Quebec French menu and an English menu on separate URLs, ship two JSON-LD blocks (one per language version of the page) with hasMenu pointing to the matching language menu URL. AI engines that cite the restaurant in a French answer want the French menu URL, not the English one. The cross-language ship is what produces clean bilingual citations.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="autorepair-plumber-electrician-and-trades">AutoRepair, Plumber, Electrician, and trades</h2>
      <p>
        Trades in Quebec are well covered by narrow Schema.org subtypes. AutoRepair for garages. Plumber for plumbing services. Electrician for electrical contractors. HVACBusiness for HVAC. RoofingContractor for roofers. HousePainter for painters. GeneralContractor for construction generalists. LocksmithService for locksmiths. MovingCompany for movers.
      </p>
      <p>
        Two fields matter most for trades. areaServed is an array of GeoCircle or City objects describing the service radius. Google reads this as the formal service-area declaration and uses it to rank the trade on service-area queries even when the trade has no rooftop in the searched city. The second is paymentAccepted, a string list of accepted payment methods (Cash, Credit Card, Interac e-Transfer). Quebec consumers search on Interac specifically and the paymentAccepted field surfaces the trade in those answer sets.
      </p>

      <p>
        For the contractor playbook on how service-area declarations interact with GBP, see <InternalLink to="/industries" title="AiLys industry playbooks" description="Industry-specific local SEO playbooks for Quebec" />. For a deeper read on how the audit deliverable identifies missing schema fields, see <InternalLink to="/audit" title="Free 24-hour AI Visibility audit" description="Schema, NAP, GBP, and citation gaps mapped in one report" />.
      </p>

      <InlineCTA variant="pricing" text="See AiLys plans that include the schema build and the Quebec professional order credential mapping, from Core at 799 dollars CAD a month." />

      <SectionDivider />

      <h2 id="quebec-order-credentials-inside-the-member-property">Quebec order credentials inside the member property</h2>
      <p>
        The Quebec-specific rule that breaks most schema implementations from outside the province: every credential link must be the deep public registry URL for the practitioner, never the order homepage. AI engines confirm a license is active by reading the registry page. The homepage URL points to a marketing page that does not contain the practitioner record. The engine cannot confirm the credential and treats the claim as unverified.
      </p>
      <p>
        The right encoding is a member property on the LocalBusiness or its subtype, with each member as a Person object. The Person carries jobTitle (the practiced role), identifier (the order registration number), and a memberOf object that points to the Quebec professional order with a sameAs property carrying the deep registry URL.
      </p>

      <h3>Where to find the deep registry URL per order</h3>
      <ul>
        <li>Barreau du Quebec, Tableau de l Ordre, individual lawyer entry pages with the Barreau number in the URL</li>
        <li>Chambre des notaires du Quebec, public registry, individual notary entries</li>
        <li>Ordre des medecins du Quebec, Bottin des medecins, individual physician entries</li>
        <li>Ordre des dentistes du Quebec, repertoire public, individual dentist entries</li>
        <li>Ordre des pharmaciens du Quebec, repertoire des pharmaciens, individual pharmacist entries</li>
        <li>CPA Quebec, member directory, individual accountant entries</li>
        <li>OPPQ, repertoire des physiotherapeutes, individual physio entries</li>
        <li>Ordre des chiropraticiens du Quebec, public registry, individual chiropractor entries</li>
      </ul>

      <p>
        The deep URL on each of those orders changes format every few years as the orders modernize their public registries. Verify the URL pattern once a year and update the schema if it shifts. A broken sameAs link on a Person object reads as worse than no link at all, because AI engines crawl it, fail to resolve, and tag the entity as unverified for the next several months.
      </p>

      <CalloutBox type="danger">
        <p>Do not invent registration numbers or guess at the deep URL pattern. AI engines verify both. A Person object with a fake identifier or a broken sameAs degrades the entire LocalBusiness entity in citation share for one to two quarters before the engine re-evaluates. The time cost of a careful schema build is days. The time cost of recovering from a bad credential ship is months.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="validate-and-monitor-after-deploy">Validate and monitor after deploy</h2>
      <p>
        Three checks confirm the schema is healthy after deploy. The Google Rich Results Test catches most parser errors and confirms which rich result types Google detects. The Schema.org validator catches type-correctness issues that Google ignores but other engines (especially Bing) penalize. Google Search Console under the Enhancements panel monitors the long tail and surfaces any field-level errors that creep in over time.
      </p>
      <p>
        A schema that ships with zero errors should keep zero errors. If errors appear weeks later, it usually means a CMS update changed how a field renders, an automated translation routine corrupted a string field with smart quotes, or a deploy stripped the JSON-LD from the page entirely. Fix inside seven days. Cumulative errors past two weeks start to soften the rich result coverage and the AI engine citation share.
      </p>

      <InlineCTA variant="book" text="Want a 60-minute review of your current schema and credential layer? No pitch, the audit doc and recommended subtype matrix sent regardless." />

      <SectionDivider />

      <KeyTakeaway
        points={[
          'Pick the narrowest Schema.org subtype that fits. Attorney for law firms, Dentist for dental clinics, Restaurant for restos, Plumber for plumbing trades.',
          'Ship all eight required fields on every LocalBusiness block. Empty priceRange or missing geo disqualifies the rich result.',
          'Layer Person schema on every named professional with the order credential inside the member property.',
          'Quebec credentials require the deep public registry URL. The order homepage is not enough for AI engine resolution.',
          'Add inLanguage and ship a separate JSON-LD block per language URL for clean bilingual EN and FR-CA citations.',
          'Validate with the Rich Results Test, the Schema.org validator, and Search Console. Fix any new errors inside seven days.',
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
        alt="Quick reference card mapping Quebec verticals to Schema.org LocalBusiness subtypes and required fields"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
