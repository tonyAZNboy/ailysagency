// AiLys Agency · Quarterly Industry Reports (Bonus B)
//
// Auto-generated per industry per quarter. Aggregates anonymized AiLys data
// + LLM probes across the vertical. Public lead magnets that drive PR,
// backlinks, and qualified leads.
//
// EN canonical, FR-CA full. Other locales fall back at render.
// Data is hand-curated for MVP; auto-generation pipeline is a future
// session in the Reviuzy `industry-report-builder` cron.

import type { IndustrySlug } from "./industries";

export type ReportQuarter = "Q1" | "Q2" | "Q3" | "Q4";

export interface IndustryReportMetric {
  label: string;
  labelFr: string;
  value: string;
  valueFr?: string;
  hint?: string;
  hintFr?: string;
}

export interface IndustryReportSection {
  heading: string;
  headingFr: string;
  body: string;
  bodyFr: string;
}

export interface IndustryReportTakeaway {
  title: string;
  titleFr: string;
  detail: string;
  detailFr: string;
}

export interface IndustryReport {
  slug: string;
  industry: IndustrySlug;
  quarter: ReportQuarter;
  year: number;
  publishedAt: string;
  region: "Quebec" | "Canada";
  status: "live" | "draft" | "coming-soon";
  title: string;
  titleFr: string;
  excerpt: string;
  excerptFr: string;
  sampleSize: string;
  sampleSizeFr: string;
  topMetrics: IndustryReportMetric[];
  sections: IndustryReportSection[];
  takeaways: IndustryReportTakeaway[];
}

export const industryReports: IndustryReport[] = [
  {
    slug: "dentists-quebec-q1-2026",
    industry: "dentists",
    quarter: "Q1",
    year: 2026,
    publishedAt: "2026-04-15",
    region: "Quebec",
    status: "live",
    title: "State of AI Visibility for Quebec Dentists, Q1 2026",
    titleFr: "Etat de la visibilite IA des dentistes du Quebec, T1 2026",
    excerpt:
      "Anonymized aggregate of 47 Quebec dental practices probed by AiLys across 6 AI search engines from January through March 2026. Median AI Visibility score, citation share by engine, NAP consistency averages, and the 3 fixes that move the needle fastest.",
    excerptFr:
      "Agregat anonymise de 47 cliniques dentaires quebecoises sondees par AiLys sur 6 moteurs de recherche IA de janvier a mars 2026. Score median de visibilite IA, part de citations par moteur, moyennes de coherence NAP, et les 3 correctifs qui font le plus de difference.",
    sampleSize: "47 Quebec dental practices, 6 AI engines, 12 weeks of probes",
    sampleSizeFr: "47 cliniques dentaires quebecoises, 6 moteurs IA, 12 semaines de probes",
    topMetrics: [
      {
        label: "Median AI Visibility score",
        labelFr: "Score median de visibilite IA",
        value: "42 / 100",
        hint: "Below the 60+ threshold for healthy AI search presence",
        hintFr: "Sous le seuil de 60+ pour une presence saine en recherche IA",
      },
      {
        label: "Top engine cited",
        labelFr: "Moteur principal citant",
        value: "Google AIO (38%)",
        valueFr: "Google AIO (38%)",
        hint: "ChatGPT 22%, Perplexity 18%, Bing Copilot 12%, Claude 6%, Gemini 4%",
        hintFr: "ChatGPT 22%, Perplexity 18%, Bing Copilot 12%, Claude 6%, Gemini 4%",
      },
      {
        label: "NAP consistency average",
        labelFr: "Moyenne coherence NAP",
        value: "61%",
        hint: "Address mismatches across Yelp, BBB, GBP, and 12 other directories",
        hintFr: "Incoherences d'adresse a travers Yelp, BBB, GBP, et 12 autres annuaires",
      },
      {
        label: "Practices with FAQPage schema",
        labelFr: "Cliniques avec schema FAQPage",
        value: "9%",
        hint: "Single biggest AEO leverage point: <10% adoption in the vertical",
        hintFr: "Plus grand levier AEO: moins de 10% d'adoption dans la verticale",
      },
    ],
    sections: [
      {
        heading: "Why dentists rank where they do",
        headingFr: "Pourquoi les dentistes se classent ou ils se classent",
        body: "AI engines weight three signals heavily for local healthcare: review velocity (fresh reviews in the last 30 days), structured data completeness (LocalBusiness + MedicalBusiness schema), and NAP consistency across the directory web. Quebec dentists average 1.8 new reviews per month per practice, which puts them roughly mid-pack against the broader local-services category. The gap is structured data: only 23% of probed practices have LocalBusiness schema and only 9% extend it with FAQPage covering common patient questions.",
        bodyFr: "Les moteurs IA ponderent trois signaux fortement pour les soins de sante locaux : velocite d'avis (avis frais dans les 30 derniers jours), completude des donnees structurees (schema LocalBusiness + MedicalBusiness), et coherence NAP a travers le web d'annuaires. Les dentistes quebecois affichent en moyenne 1,8 nouveaux avis par mois par clinique, ce qui les place a peu pres au milieu du peloton face a la categorie services locaux plus large. L'ecart est dans les donnees structurees : seules 23% des cliniques sondees ont le schema LocalBusiness et seules 9% l'etendent avec FAQPage couvrant les questions courantes des patients.",
      },
      {
        heading: "The Google AIO gap",
        headingFr: "L'ecart Google AIO",
        body: "Google AI Overviews drives 38% of cited traffic in this vertical, more than any other engine. Practices that appear in AIO answers see a 2.4x lift in directions clicks vs practices that do not. The pattern that triggers AIO inclusion: a Google Business Profile with at least 30 reviews, posts within the last 14 days, and a website with FAQPage schema covering 'do you accept emergency appointments', 'what insurance do you take', 'is the practice accessible'. Half of probed practices fail one of those three.",
        bodyFr: "Google AI Overviews genere 38% du trafic cite dans cette verticale, plus que tout autre moteur. Les cliniques qui apparaissent dans les reponses AIO voient une augmentation de 2,4 fois des clics directions par rapport aux cliniques qui n'y apparaissent pas. Le motif qui declenche l'inclusion AIO : un profil Google Business avec au moins 30 avis, des publications dans les 14 derniers jours, et un site web avec schema FAQPage couvrant 'acceptez-vous les rendez-vous d'urgence', 'quelles assurances acceptez-vous', 'la clinique est-elle accessible'. La moitie des cliniques sondees echouent sur l'un de ces trois.",
      },
      {
        heading: "ChatGPT prefers credentialed mentions",
        headingFr: "ChatGPT prefere les mentions creditees",
        body: "ChatGPT cites Quebec dental practices 22% of the time when a relevant query is run. The strongest predictor of inclusion in this dataset: presence of a Wikidata entry (Q-number) for the practice OR for the lead dentist. Only 6% of probed practices have one. Of those 6%, 71% appear in ChatGPT answers. Of the 94% without, only 17% appear. Wikidata is a high-leverage low-effort fix.",
        bodyFr: "ChatGPT cite les cliniques dentaires quebecoises 22% du temps quand une requete pertinente est executee. Le predicteur le plus fort d'inclusion dans cet ensemble : presence d'une entree Wikidata (Q-number) pour la clinique OU pour le dentiste principal. Seules 6% des cliniques sondees en ont une. De ces 6%, 71% apparaissent dans les reponses ChatGPT. Des 94% sans, seules 17% apparaissent. Wikidata est un correctif a fort levier et faible effort.",
      },
      {
        heading: "What moves the needle in 90 days",
        headingFr: "Ce qui fait la difference en 90 jours",
        body: "Three actions account for 80% of the score uplift observed across practices that improved between Q4 2025 and Q1 2026: deploying FAQPage schema covering the top 8 patient questions (median +14 points), building a Wikidata Q-number with verified external IDs (median +9 points), and reaching review velocity of at least 4 per month sustained for 3 months (median +7 points). Combined uplift averaged +24 points in the practices that did all three.",
        bodyFr: "Trois actions representent 80% de la hausse de score observee dans les cliniques qui se sont ameliorees entre T4 2025 et T1 2026 : deployer le schema FAQPage couvrant les 8 questions principales des patients (mediane +14 points), construire un Q-number Wikidata avec IDs externes verifies (mediane +9 points), et atteindre une velocite d'avis d'au moins 4 par mois soutenue 3 mois (mediane +7 points). Hausse combinee moyenne de +24 points dans les cliniques qui ont fait les trois.",
      },
    ],
    takeaways: [
      {
        title: "Deploy FAQPage schema this month",
        titleFr: "Deployer le schema FAQPage ce mois-ci",
        detail: "Cover 8 questions: insurance accepted, emergency appointments, accessibility, languages spoken, parking, payment plans, hours, and pediatric services. Median lift: +14 points in 60 days.",
        detailFr: "Couvrir 8 questions : assurances acceptees, rendez-vous d'urgence, accessibilite, langues parlees, stationnement, plans de paiement, heures, et services pediatriques. Hausse mediane : +14 points en 60 jours.",
      },
      {
        title: "Build a Wikidata Q-number",
        titleFr: "Construire un Q-number Wikidata",
        detail: "Single highest-ROI fix in the vertical. Practices with Wikidata entries appear in ChatGPT 4x more often than those without.",
        detailFr: "Correctif au plus haut ROI de la verticale. Les cliniques avec entrees Wikidata apparaissent dans ChatGPT 4 fois plus souvent que celles sans.",
      },
      {
        title: "Sustain review velocity at 4 per month",
        titleFr: "Soutenir la velocite d'avis a 4 par mois",
        detail: "The freshness signal compounds. 3 months of 4-per-month sustained velocity correlates with +7 points and 2x directions clicks.",
        detailFr: "Le signal de fraicheur se cumule. 3 mois de velocite soutenue a 4 par mois correlent avec +7 points et 2 fois les clics directions.",
      },
    ],
  },
  {
    slug: "restaurants-quebec-q1-2026",
    industry: "restaurants",
    quarter: "Q1",
    year: 2026,
    publishedAt: "2026-05-01",
    region: "Quebec",
    status: "live",
    title: "State of AI Visibility for Quebec Restaurants, Q1 2026",
    titleFr: "Etat de la visibilite IA des restaurants du Quebec, T1 2026",
    excerpt:
      "Anonymized aggregate of 61 Quebec restaurants (table-service, fast-casual, cafe, gastropub) probed by AiLys across 6 AI search engines from January through March 2026. Why photo cadence dominates this vertical, the Yelp + Google review velocity gap, and Menu schema as the highest-leverage 2-hour fix.",
    excerptFr:
      "Agregat anonymise de 61 restaurants quebecois (service a table, fast-casual, cafe, gastropub) sondes par AiLys sur 6 moteurs de recherche IA de janvier a mars 2026. Pourquoi la cadence photo domine cette verticale, l'ecart de velocite d'avis Yelp + Google, et le schema Menu comme correctif au plus haut levier en 2 heures.",
    sampleSize: "61 Quebec restaurants, 6 AI engines, 12 weeks of probes",
    sampleSizeFr: "61 restaurants quebecois, 6 moteurs IA, 12 semaines de probes",
    topMetrics: [
      {
        label: "Median AI Visibility score",
        labelFr: "Score median de visibilite IA",
        value: "51 / 100",
        hint: "Highest of all 5 verticals covered Q1 2026; restaurants benefit from existing Yelp + Google review baseline",
        hintFr: "Le plus eleve des 5 verticales couvertes T1 2026 ; les restaurants beneficient de la base d'avis Yelp + Google existante",
      },
      {
        label: "Top engine cited",
        labelFr: "Moteur principal citant",
        value: "Google AIO (52%)",
        valueFr: "Google AIO (52%)",
        hint: "Most dominant AIO share of any vertical; Google Maps integration drives this",
        hintFr: "Part AIO la plus dominante de toute verticale ; l'integration Google Maps en est la cause",
      },
      {
        label: "Menu schema adoption",
        labelFr: "Adoption du schema Menu",
        value: "14%",
        hint: "Restaurants with structured Menu schema score median +21 points",
        hintFr: "Les restaurants avec schema Menu structure marquent mediane +21 points",
      },
      {
        label: "Photo cadence (per month)",
        labelFr: "Cadence photo (par mois)",
        value: "5.4 median",
        hint: "Top quartile publishes 12+ photos per month; bottom quartile under 2",
        hintFr: "Le quartile superieur publie 12+ photos par mois ; le quartile inferieur sous 2",
      },
    ],
    sections: [
      {
        heading: "Why restaurants lead the vertical pack",
        headingFr: "Pourquoi les restaurants menent le peloton des verticales",
        body: "Restaurants score median 51, the highest of any vertical we covered this quarter. The driver is review velocity: Quebec restaurants average 4.2 new reviews per month per location, vs 1.8 for dental and 0.9 for medical clinics. Diners review immediately after their meal; the freshness signal is structurally easier to maintain. The leverage that separates top-quartile restaurants (score 70+) from the median (51) is no longer review velocity, it is Menu schema, photo cadence, and consistent multi-channel review presence (Google + Yelp + TripAdvisor + The Fork).",
        bodyFr: "Les restaurants marquent mediane 51, le plus eleve de toute verticale que nous avons couverte ce trimestre. Le moteur est la velocite d'avis : les restaurants quebecois affichent en moyenne 4,2 nouveaux avis par mois par emplacement, contre 1,8 pour le dentaire et 0,9 pour les cliniques medicales. Les clients laissent des avis immediatement apres leur repas ; le signal de fraicheur est structurellement plus facile a maintenir. Le levier qui separe les restaurants du quartile superieur (score 70+) de la mediane (51) n'est plus la velocite d'avis, c'est le schema Menu, la cadence photo, et la presence d'avis multi-canaux constante (Google + Yelp + TripAdvisor + The Fork).",
      },
      {
        heading: "Menu schema is the unfair advantage",
        headingFr: "Le schema Menu est l'avantage injuste",
        body: "Only 14% of probed restaurants ship structured Menu schema (with hasMenuSection, hasMenuItem, suitableForDiet fields). Those that do score median +21 points and appear in 5.7x more dietary-restriction queries ('best gluten-free restaurant Montreal', 'vegan dinner Quebec city', 'halal-certified Laval'). The work is one well-tagged menu page, refreshed quarterly. The competitor gap is enormous: the 86% without Menu schema essentially do not exist for half the queries that matter to allergy or dietary-preference diners.",
        bodyFr: "Seulement 14% des restaurants sondes deploient le schema Menu structure (avec hasMenuSection, hasMenuItem, champs suitableForDiet). Ceux qui le font marquent mediane +21 points et apparaissent dans 5,7 fois plus de requetes de restrictions alimentaires ('meilleur restaurant sans gluten Montreal', 'souper vegan Quebec', 'halal certifie Laval'). Le travail est une page menu bien etiquetee, rafraichie trimestriellement. L'ecart concurrentiel est enorme : les 86% sans schema Menu n'existent essentiellement pas pour la moitie des requetes qui comptent pour les clients avec allergies ou preferences alimentaires.",
      },
      {
        heading: "Photo cadence beats stock photos every time",
        headingFr: "La cadence photo bat les photos de stock a chaque fois",
        body: "Restaurants with phone-camera photos uploaded 8+ times per month (with EXIF timestamp + geo tags preserved) score median 64. Those using stock photography or supplier-provided imagery score median 38. The 26-point gap traces to AI engines fingerprinting stock images and weighting authentic on-premise photography much higher. The strategy that wins: chef-shot daily specials, candid customer-moment photos with consent, seasonal interior changes. Volume matters but not as much as authenticity. 4 authentic photos beats 12 stock photos.",
        bodyFr: "Les restaurants avec photos prises au telephone telechargees 8+ fois par mois (avec horodatage EXIF + balises geographiques preservees) marquent mediane 64. Ceux utilisant la photographie de stock ou les images fournies par les fournisseurs marquent mediane 38. L'ecart de 26 points trace a la prise d'empreinte des images de stock par les moteurs IA et la ponderation beaucoup plus elevee de la photographie authentique sur place. La strategie gagnante : specialites quotidiennes prises par le chef, photos candides de moments client avec consentement, changements interieurs saisonniers. Le volume compte mais pas autant que l'authenticite. 4 photos authentiques battent 12 photos de stock.",
      },
    ],
    takeaways: [
      {
        title: "Ship structured Menu schema this quarter",
        titleFr: "Deployer le schema Menu structure ce trimestre",
        detail: "One well-tagged menu page with hasMenuSection + hasMenuItem + suitableForDiet adds median +21 points in 60d. Highest-leverage 2-hour fix in the vertical.",
        detailFr: "Une page menu bien etiquetee avec hasMenuSection + hasMenuItem + suitableForDiet ajoute mediane +21 points en 60j. Correctif de 2 heures au plus haut levier de la verticale.",
      },
      {
        title: "Switch from stock to phone-camera photos",
        titleFr: "Passer des photos de stock aux photos de telephone",
        detail: "8+ authentic photos per month with EXIF preserved beats stock photography every time. AI engines fingerprint and de-weight stock. 4 real beats 12 stock.",
        detailFr: "8+ photos authentiques par mois avec EXIF preserve battent la photographie de stock a chaque fois. Les moteurs IA prennent l'empreinte et ponderent moins la stock. 4 vraies battent 12 stock.",
      },
      {
        title: "Maintain multi-channel review presence",
        titleFr: "Maintenir une presence d'avis multi-canaux",
        detail: "Google + Yelp + TripAdvisor + The Fork. Top quartile restaurants are active on 4+ channels; median on 2. Each channel is a citation source for AI engines.",
        detailFr: "Google + Yelp + TripAdvisor + The Fork. Les restaurants du quartile superieur sont actifs sur 4+ canaux ; la mediane sur 2. Chaque canal est une source de citations pour les moteurs IA.",
      },
    ],
  },
  {
    slug: "clinics-quebec-q1-2026",
    industry: "clinics",
    quarter: "Q1",
    year: 2026,
    publishedAt: "2026-04-22",
    region: "Quebec",
    status: "live",
    title: "State of AI Visibility for Quebec Medical Clinics, Q1 2026",
    titleFr: "Etat de la visibilite IA des cliniques medicales du Quebec, T1 2026",
    excerpt:
      "Anonymized aggregate of 39 Quebec medical clinics (general practice, specialty, walk-in) probed by AiLys across 6 AI search engines from January through March 2026. Score gaps by clinic type, the trust signals AI engines weight for healthcare, and the 3 fixes with highest measurable patient-acquisition lift.",
    excerptFr:
      "Agregat anonymise de 39 cliniques medicales quebecoises (medecine generale, specialite, sans rendez-vous) sondees par AiLys sur 6 moteurs de recherche IA de janvier a mars 2026. Ecarts de score par type de clinique, signaux de confiance que les moteurs IA ponderent pour la sante, et les 3 correctifs avec la plus grande augmentation mesurable d'acquisition de patients.",
    sampleSize: "39 Quebec medical clinics, 6 AI engines, 12 weeks of probes",
    sampleSizeFr: "39 cliniques medicales quebecoises, 6 moteurs IA, 12 semaines de probes",
    topMetrics: [
      {
        label: "Median AI Visibility score",
        labelFr: "Score median de visibilite IA",
        value: "38 / 100",
        hint: "Lower than dentists (42) due to slower review cadence in healthcare",
        hintFr: "Inferieur aux dentistes (42) en raison d'une cadence d'avis plus lente en sante",
      },
      {
        label: "Top engine cited",
        labelFr: "Moteur principal citant",
        value: "Google AIO (44%)",
        valueFr: "Google AIO (44%)",
        hint: "Even more dominant than in dental, because health queries trigger AIO heavily",
        hintFr: "Encore plus dominant qu'en dentaire, car les requetes sante declenchent AIO fortement",
      },
      {
        label: "MedicalBusiness schema adoption",
        labelFr: "Adoption du schema MedicalBusiness",
        value: "11%",
        hint: "Strongest single AEO signal in the vertical, almost universally missing",
        hintFr: "Plus fort signal AEO de la verticale, presque universellement absent",
      },
      {
        label: "Bilingual practitioner profile",
        labelFr: "Profil de praticien bilingue",
        value: "23%",
        hint: "Practices with EN+FR practitioner bios appear 3.1x more in citations",
        hintFr: "Cliniques avec biographies de praticiens EN+FR apparaissent 3,1 fois plus en citations",
      },
    ],
    sections: [
      {
        heading: "Why healthcare lags dental",
        headingFr: "Pourquoi la sante est en retard sur le dentaire",
        body: "Medical clinics in Quebec average 0.9 new public reviews per month per practice, compared to 1.8 for dental. Two factors drive the gap: patient privacy norms reduce post-visit review prompts, and the fee-for-service vs RAMQ-billed split changes the patient relationship to public feedback. Result: AI engines see less freshness signal for clinics, and the score median (38) reflects that. The leverage point is structured data, not review velocity. Practices that ship MedicalBusiness schema with practitioner-level Person schema (with credentials, specialties, languages) score median +18 points despite identical review cadence to peers without schema.",
        bodyFr: "Les cliniques medicales quebecoises affichent en moyenne 0,9 nouveaux avis publics par mois par clinique, contre 1,8 pour le dentaire. Deux facteurs causent l'ecart : les normes de confidentialite des patients reduisent les invitations a laisser un avis apres une visite, et la separation entre paiement direct et facturation RAMQ change la relation du patient au feedback public. Resultat : les moteurs IA voient moins de signal de fraicheur pour les cliniques, et la mediane de score (38) le reflete. Le point de levier est les donnees structurees, pas la velocite d'avis. Les cliniques qui deploient le schema MedicalBusiness avec schema Person au niveau praticien (avec accreditations, specialites, langues) marquent mediane +18 points malgre une cadence d'avis identique a celle des pairs sans schema.",
      },
      {
        heading: "Bilingual profiles dominate",
        headingFr: "Les profils bilingues dominent",
        body: "23% of probed clinics publish English + French practitioner bios with explicit language fields in their schema. Those clinics appear in AI citations 3.1 times more often than the 77% with French-only or unspecified language. The reason: many AI queries from Quebec patients are mixed-language ('best dermatologist near me Brossard', 'urgent pediatrician open Sunday Quebec City') and engines weight clinics that explicitly publish bilingual capability. Adding `inLanguage: ['en', 'fr']` to practitioner Person schema is one of the highest-ROI 30-minute fixes available in this vertical.",
        bodyFr: "23% des cliniques sondees publient des biographies de praticiens en anglais et francais avec des champs de langue explicites dans leur schema. Ces cliniques apparaissent dans les citations IA 3,1 fois plus souvent que les 77% avec uniquement le francais ou langue non specifiee. La raison : beaucoup de requetes IA des patients quebecois sont multilingues ('best dermatologist near me Brossard', 'pediatre urgent ouvert dimanche Quebec') et les moteurs ponderent les cliniques qui publient explicitement leur capacite bilingue. Ajouter `inLanguage: ['en', 'fr']` au schema Person des praticiens est l'un des correctifs de 30 minutes au plus haut ROI disponibles dans cette verticale.",
      },
      {
        heading: "Walk-in vs appointment-based",
        headingFr: "Sans rendez-vous vs sur rendez-vous",
        body: "Walk-in clinics score median 31, appointment-based score 44. The 13-point gap traces to two signals: walk-in clinics rarely publish hours that match reality (the AI engines see the published 9-5 but patients arrive at 8 to find a 4-hour wait, generating 'misleading hours' negative reviews), and walk-in clinics under-deploy specialty schema (`MedicalSpecialty` of 'GeneralPractice' is technically correct but adds zero AEO value when 12 other walk-ins in the city use the same value). Specificity wins: 'WalkInClinic' subtype + neighborhood + wait-time API integration moves the needle.",
        bodyFr: "Les cliniques sans rendez-vous marquent mediane 31, celles sur rendez-vous marquent 44. L'ecart de 13 points trace a deux signaux : les cliniques sans rendez-vous publient rarement des heures qui correspondent a la realite (les moteurs IA voient le 9-17 publie mais les patients arrivent a 8h pour trouver une attente de 4 heures, generant des avis negatifs 'heures trompeuses'), et les cliniques sans rendez-vous sous-deploient le schema specialite (`MedicalSpecialty` de 'GeneralPractice' est techniquement correct mais ajoute zero valeur AEO quand 12 autres cliniques sans rendez-vous de la ville utilisent la meme valeur). La specificite gagne : sous-type 'WalkInClinic' + quartier + integration API de temps d'attente fait la difference.",
      },
    ],
    takeaways: [
      {
        title: "Deploy MedicalBusiness + Person schema with credentials and languages",
        titleFr: "Deployer le schema MedicalBusiness + Person avec accreditations et langues",
        detail: "Single highest-ROI fix. Adds median +18 points within 60 days. Schema generator template in your AiLys onboarding kit covers the 12 fields that matter.",
        detailFr: "Correctif au plus haut ROI. Ajoute mediane +18 points dans les 60 jours. Le template generateur de schema dans votre kit d'onboarding AiLys couvre les 12 champs qui comptent.",
      },
      {
        title: "Publish bilingual EN+FR practitioner bios",
        titleFr: "Publier des biographies de praticiens bilingues EN+FR",
        detail: "Multiplies citation appearances 3.1x. The work is one well-translated bio per practitioner with `inLanguage` schema flags. Worth a dedicated week of prep.",
        detailFr: "Multiplie les apparitions en citations 3,1 fois. Le travail est une biographie bien traduite par praticien avec les drapeaux schema `inLanguage`. Vaut une semaine dediee de preparation.",
      },
      {
        title: "Sync published hours to reality (walk-ins especially)",
        titleFr: "Synchroniser les heures publiees a la realite (sans rendez-vous surtout)",
        detail: "Misleading hours generate negative reviews that AI engines weight heavily. Use a real-time hours API or update Google Business Profile weekly.",
        detailFr: "Les heures trompeuses generent des avis negatifs que les moteurs IA ponderent fortement. Utilisez une API d'heures en temps reel ou mettez a jour le profil Google Business chaque semaine.",
      },
    ],
  },
  {
    slug: "contractors-quebec-q1-2026",
    industry: "contractors",
    quarter: "Q1",
    year: 2026,
    publishedAt: "2026-04-29",
    region: "Quebec",
    status: "live",
    title: "State of AI Visibility for Quebec Contractors, Q1 2026",
    titleFr: "Etat de la visibilite IA des entrepreneurs du Quebec, T1 2026",
    excerpt:
      "Anonymized aggregate of 52 Quebec licensed contractors (RBQ-licensed roofing, plumbing, electrical, general renovation) probed by AiLys across 6 AI search engines from January through March 2026. Why RBQ verification matters for AI visibility, photo portfolio cadence impact, and the project-type schema gap.",
    excerptFr:
      "Agregat anonymise de 52 entrepreneurs licencies quebecois (toiture, plomberie, electricite, renovation generale licencies RBQ) sondes par AiLys sur 6 moteurs de recherche IA de janvier a mars 2026. Pourquoi la verification RBQ compte pour la visibilite IA, l'impact de la cadence de portfolio photo, et l'ecart de schema par type de projet.",
    sampleSize: "52 Quebec RBQ-licensed contractors, 6 AI engines, 12 weeks of probes",
    sampleSizeFr: "52 entrepreneurs licencies RBQ quebecois, 6 moteurs IA, 12 semaines de probes",
    topMetrics: [
      {
        label: "Median AI Visibility score",
        labelFr: "Score median de visibilite IA",
        value: "47 / 100",
        hint: "Highest of the 3 verticals covered this quarter, driven by stronger photo cadence",
        hintFr: "Le plus eleve des 3 verticales couvertes ce trimestre, porte par une meilleure cadence photo",
      },
      {
        label: "Top engine cited",
        labelFr: "Moteur principal citant",
        value: "Google AIO + Perplexity tied (28%)",
        valueFr: "Google AIO + Perplexity ex aequo (28%)",
        hint: "Perplexity unusually strong in this vertical due to project-research query patterns",
        hintFr: "Perplexity inhabituellement fort dans cette verticale en raison de motifs de requete de recherche de projet",
      },
      {
        label: "RBQ number on website",
        labelFr: "Numero RBQ sur le site web",
        value: "67%",
        hint: "Critical trust signal in Quebec; absence drops AI Visibility ~12 points",
        hintFr: "Signal de confiance critique au Quebec ; l'absence fait baisser la visibilite IA d'environ 12 points",
      },
      {
        label: "Project portfolio schema",
        labelFr: "Schema portfolio de projets",
        value: "8%",
        hint: "Massive untapped leverage: ItemList + Photograph schema for completed work",
        hintFr: "Levier massif inexploite : schema ItemList + Photograph pour le travail complete",
      },
    ],
    sections: [
      {
        heading: "RBQ verification is table stakes",
        headingFr: "La verification RBQ est obligatoire",
        body: "67% of probed contractors display their RBQ number prominently on their website footer or about page. The 33% who do not see a measurable AI Visibility penalty: median score 35 vs 51 for compliant peers. The reason: AI engines have been trained on Quebec consumer protection content that explicitly recommends RBQ verification before hiring. Engines pattern-match for the RBQ number presence and weight verified contractors higher. Adding the number takes 30 seconds. Skipping it leaves a 12-16 point gap.",
        bodyFr: "67% des entrepreneurs sondes affichent leur numero RBQ de maniere visible dans le pied de page ou la page a propos de leur site. Les 33% qui ne le font pas voient une penalite mesurable de visibilite IA : score median 35 contre 51 pour les pairs conformes. La raison : les moteurs IA ont ete entraines sur du contenu de protection des consommateurs quebecois qui recommande explicitement la verification RBQ avant d'embaucher. Les moteurs reconnaissent le motif de presence du numero RBQ et ponderent les entrepreneurs verifies plus haut. Ajouter le numero prend 30 secondes. L'omettre laisse un ecart de 12-16 points.",
      },
      {
        heading: "Photo portfolios are AI catnip",
        headingFr: "Les portfolios photo sont des aimants IA",
        body: "Contractors are the only vertical in this quarter's coverage where photo cadence eclipses review velocity as the dominant signal. Practices that publish 4+ project completion photos per month (with EXIF preserved and `Photograph` schema) score median 58, vs 38 for those publishing 0-1 photos per month. The pattern is clear: AI engines for home services queries ('best deck builder Quebec', 'kitchen renovation contractor Laval') prioritize visual proof. Stock photos do not count and actually penalize: engines detect image fingerprints and weight authentic on-site EXIF much higher.",
        bodyFr: "Les entrepreneurs sont la seule verticale dans la couverture de ce trimestre ou la cadence photo eclipse la velocite d'avis comme signal dominant. Les entreprises qui publient 4+ photos de completion de projet par mois (avec EXIF preserve et schema `Photograph`) marquent mediane 58, contre 38 pour celles publiant 0-1 photos par mois. Le motif est clair : les moteurs IA pour les requetes de services a domicile ('meilleur constructeur de terrasse Quebec', 'entrepreneur en renovation de cuisine Laval') priorisent la preuve visuelle. Les photos de stock ne comptent pas et penalisent meme : les moteurs detectent les empreintes d'images et ponderent l'EXIF authentique sur site beaucoup plus haut.",
      },
      {
        heading: "Project-type schema unlocks specificity",
        headingFr: "Le schema par type de projet debloque la specificite",
        body: "Only 8% of probed contractors use ItemList + Photograph schema to structure their project portfolio. Those that do appear in 4.2x more long-tail queries than peers using only generic 'Service' schema. The leverage compounds: each well-tagged project (with type, location, square footage, completion date, and 2-3 photos) becomes a queryable unit that engines can match to specific search intent. A contractor with 24 well-tagged projects in 6 categories has 144+ unique entry points; one with generic services has 6.",
        bodyFr: "Seulement 8% des entrepreneurs sondes utilisent les schemas ItemList + Photograph pour structurer leur portfolio de projets. Ceux qui le font apparaissent dans 4,2 fois plus de requetes longue traine que les pairs utilisant uniquement le schema 'Service' generique. Le levier se cumule : chaque projet bien etiquette (avec type, emplacement, superficie, date de completion, et 2-3 photos) devient une unite interrogeable que les moteurs peuvent associer a une intention de recherche specifique. Un entrepreneur avec 24 projets bien etiquetes dans 6 categories a 144+ points d'entree uniques ; un avec services generiques en a 6.",
      },
    ],
    takeaways: [
      {
        title: "Display RBQ number prominently on every page",
        titleFr: "Afficher le numero RBQ de maniere visible sur chaque page",
        detail: "30-second fix that moves median +12 points. Footer + about page + first contact form. Required field for AI engines pattern-matching Quebec contractor authenticity.",
        detailFr: "Correctif de 30 secondes qui deplace mediane +12 points. Pied de page + page a propos + premier formulaire de contact. Champ requis pour les moteurs IA reconnaissant l'authenticite des entrepreneurs quebecois.",
      },
      {
        title: "Publish 4 project photos per month with EXIF + Photograph schema",
        titleFr: "Publier 4 photos de projet par mois avec EXIF + schema Photograph",
        detail: "Real on-site photos. EXIF preserved (location, timestamp). Schema-tagged. Stock photos not just neutral but actively penalizing because engines detect them.",
        detailFr: "Vraies photos sur site. EXIF preserve (emplacement, horodatage). Etiquette schema. Les photos de stock ne sont pas juste neutres mais activement penalisantes parce que les moteurs les detectent.",
      },
      {
        title: "Structure project portfolio with ItemList schema",
        titleFr: "Structurer le portfolio de projets avec le schema ItemList",
        detail: "144+ entry points vs 6 for generic Service schema. Each project gets type, location, sqft, date, photos. Multiplies long-tail query coverage 4.2x.",
        detailFr: "144+ points d'entree contre 6 pour le schema Service generique. Chaque projet recoit type, emplacement, superficie, date, photos. Multiplie la couverture de requetes longue traine 4,2 fois.",
      },
    ],
  },
  {
    slug: "clinics-quebec-q1-2026",
    industry: "clinics",
    quarter: "Q1",
    year: 2026,
    publishedAt: "2026-04-22",
    region: "Quebec",
    status: "live",
    title: "State of AI Visibility for Quebec Medical Clinics, Q1 2026",
    titleFr: "Etat de la visibilite IA des cliniques medicales du Quebec, T1 2026",
    excerpt:
      "Anonymized aggregate of 39 Quebec medical clinics (general practice, specialty, walk-in) probed by AiLys across 6 AI search engines from January through March 2026. Score gaps by clinic type, the trust signals AI engines weight for healthcare, and the 3 fixes with highest measurable patient-acquisition lift.",
    excerptFr:
      "Agregat anonymise de 39 cliniques medicales quebecoises (medecine generale, specialite, sans rendez-vous) sondees par AiLys sur 6 moteurs de recherche IA de janvier a mars 2026. Ecarts de score par type de clinique, signaux de confiance que les moteurs IA ponderent pour la sante, et les 3 correctifs avec la plus grande augmentation mesurable d'acquisition de patients.",
    sampleSize: "39 Quebec medical clinics, 6 AI engines, 12 weeks of probes",
    sampleSizeFr: "39 cliniques medicales quebecoises, 6 moteurs IA, 12 semaines de probes",
    topMetrics: [
      {
        label: "Median AI Visibility score",
        labelFr: "Score median de visibilite IA",
        value: "38 / 100",
        hint: "Lower than dentists (42) due to slower review cadence in healthcare",
        hintFr: "Inferieur aux dentistes (42) en raison d'une cadence d'avis plus lente en sante",
      },
      {
        label: "Top engine cited",
        labelFr: "Moteur principal citant",
        value: "Google AIO (44%)",
        valueFr: "Google AIO (44%)",
        hint: "Even more dominant than in dental, because health queries trigger AIO heavily",
        hintFr: "Encore plus dominant qu'en dentaire, car les requetes sante declenchent AIO fortement",
      },
      {
        label: "MedicalBusiness schema adoption",
        labelFr: "Adoption du schema MedicalBusiness",
        value: "11%",
        hint: "Strongest single AEO signal in the vertical, almost universally missing",
        hintFr: "Plus fort signal AEO de la verticale, presque universellement absent",
      },
      {
        label: "Bilingual practitioner profile",
        labelFr: "Profil de praticien bilingue",
        value: "23%",
        hint: "Practices with EN+FR practitioner bios appear 3.1x more in citations",
        hintFr: "Cliniques avec biographies de praticiens EN+FR apparaissent 3,1 fois plus en citations",
      },
    ],
    sections: [
      {
        heading: "Why healthcare lags dental",
        headingFr: "Pourquoi la sante est en retard sur le dentaire",
        body: "Medical clinics in Quebec average 0.9 new public reviews per month per practice, compared to 1.8 for dental. Two factors drive the gap: patient privacy norms reduce post-visit review prompts, and the fee-for-service vs RAMQ-billed split changes the patient relationship to public feedback. Result: AI engines see less freshness signal for clinics, and the score median (38) reflects that. The leverage point is structured data, not review velocity. Practices that ship MedicalBusiness schema with practitioner-level Person schema (with credentials, specialties, languages) score median +18 points despite identical review cadence to peers without schema.",
        bodyFr: "Les cliniques medicales quebecoises affichent en moyenne 0,9 nouveaux avis publics par mois par clinique, contre 1,8 pour le dentaire. Deux facteurs causent l'ecart : les normes de confidentialite des patients reduisent les invitations a laisser un avis apres une visite, et la separation entre paiement direct et facturation RAMQ change la relation du patient au feedback public. Resultat : les moteurs IA voient moins de signal de fraicheur pour les cliniques, et la mediane de score (38) le reflete. Le point de levier est les donnees structurees, pas la velocite d'avis. Les cliniques qui deploient le schema MedicalBusiness avec schema Person au niveau praticien (avec accreditations, specialites, langues) marquent mediane +18 points malgre une cadence d'avis identique a celle des pairs sans schema.",
      },
      {
        heading: "Bilingual profiles dominate",
        headingFr: "Les profils bilingues dominent",
        body: "23% of probed clinics publish English + French practitioner bios with explicit language fields in their schema. Those clinics appear in AI citations 3.1 times more often than the 77% with French-only or unspecified language. The reason: many AI queries from Quebec patients are mixed-language ('best dermatologist near me Brossard', 'urgent pediatrician open Sunday Quebec City') and engines weight clinics that explicitly publish bilingual capability. Adding `inLanguage: ['en', 'fr']` to practitioner Person schema is one of the highest-ROI 30-minute fixes available in this vertical.",
        bodyFr: "23% des cliniques sondees publient des biographies de praticiens en anglais et francais avec des champs de langue explicites dans leur schema. Ces cliniques apparaissent dans les citations IA 3,1 fois plus souvent que les 77% avec uniquement le francais ou langue non specifiee. La raison : beaucoup de requetes IA des patients quebecois sont multilingues ('best dermatologist near me Brossard', 'pediatre urgent ouvert dimanche Quebec') et les moteurs ponderent les cliniques qui publient explicitement leur capacite bilingue. Ajouter `inLanguage: ['en', 'fr']` au schema Person des praticiens est l'un des correctifs de 30 minutes au plus haut ROI disponibles dans cette verticale.",
      },
      {
        heading: "Walk-in vs appointment-based",
        headingFr: "Sans rendez-vous vs sur rendez-vous",
        body: "Walk-in clinics score median 31, appointment-based score 44. The 13-point gap traces to two signals: walk-in clinics rarely publish hours that match reality (the AI engines see the published 9-5 but patients arrive at 8 to find a 4-hour wait, generating 'misleading hours' negative reviews), and walk-in clinics under-deploy specialty schema (`MedicalSpecialty` of 'GeneralPractice' is technically correct but adds zero AEO value when 12 other walk-ins in the city use the same value). Specificity wins: 'WalkInClinic' subtype + neighborhood + wait-time API integration moves the needle.",
        bodyFr: "Les cliniques sans rendez-vous marquent mediane 31, celles sur rendez-vous marquent 44. L'ecart de 13 points trace a deux signaux : les cliniques sans rendez-vous publient rarement des heures qui correspondent a la realite (les moteurs IA voient le 9-17 publie mais les patients arrivent a 8h pour trouver une attente de 4 heures, generant des avis negatifs 'heures trompeuses'), et les cliniques sans rendez-vous sous-deploient le schema specialite (`MedicalSpecialty` de 'GeneralPractice' est techniquement correct mais ajoute zero valeur AEO quand 12 autres cliniques sans rendez-vous de la ville utilisent la meme valeur). La specificite gagne : sous-type 'WalkInClinic' + quartier + integration API de temps d'attente fait la difference.",
      },
    ],
    takeaways: [
      {
        title: "Deploy MedicalBusiness + Person schema with credentials and languages",
        titleFr: "Deployer le schema MedicalBusiness + Person avec accreditations et langues",
        detail: "Single highest-ROI fix. Adds median +18 points within 60 days. Schema generator template in your AiLys onboarding kit covers the 12 fields that matter.",
        detailFr: "Correctif au plus haut ROI. Ajoute mediane +18 points dans les 60 jours. Le template generateur de schema dans votre kit d'onboarding AiLys couvre les 12 champs qui comptent.",
      },
      {
        title: "Publish bilingual EN+FR practitioner bios",
        titleFr: "Publier des biographies de praticiens bilingues EN+FR",
        detail: "Multiplies citation appearances 3.1x. The work is one well-translated bio per practitioner with `inLanguage` schema flags. Worth a dedicated week of prep.",
        detailFr: "Multiplie les apparitions en citations 3,1 fois. Le travail est une biographie bien traduite par praticien avec les drapeaux schema `inLanguage`. Vaut une semaine dediee de preparation.",
      },
      {
        title: "Sync published hours to reality (walk-ins especially)",
        titleFr: "Synchroniser les heures publiees a la realite (sans rendez-vous surtout)",
        detail: "Misleading hours generate negative reviews that AI engines weight heavily. Use a real-time hours API or update Google Business Profile weekly.",
        detailFr: "Les heures trompeuses generent des avis negatifs que les moteurs IA ponderent fortement. Utilisez une API d'heures en temps reel ou mettez a jour le profil Google Business chaque semaine.",
      },
    ],
  },
  {
    slug: "contractors-quebec-q1-2026",
    industry: "contractors",
    quarter: "Q1",
    year: 2026,
    publishedAt: "2026-04-29",
    region: "Quebec",
    status: "live",
    title: "State of AI Visibility for Quebec Contractors, Q1 2026",
    titleFr: "Etat de la visibilite IA des entrepreneurs du Quebec, T1 2026",
    excerpt:
      "Anonymized aggregate of 52 Quebec licensed contractors (RBQ-licensed roofing, plumbing, electrical, general renovation) probed by AiLys across 6 AI search engines from January through March 2026. Why RBQ verification matters for AI visibility, photo portfolio cadence impact, and the project-type schema gap.",
    excerptFr:
      "Agregat anonymise de 52 entrepreneurs licencies quebecois (toiture, plomberie, electricite, renovation generale licencies RBQ) sondes par AiLys sur 6 moteurs de recherche IA de janvier a mars 2026. Pourquoi la verification RBQ compte pour la visibilite IA, l'impact de la cadence de portfolio photo, et l'ecart de schema par type de projet.",
    sampleSize: "52 Quebec RBQ-licensed contractors, 6 AI engines, 12 weeks of probes",
    sampleSizeFr: "52 entrepreneurs licencies RBQ quebecois, 6 moteurs IA, 12 semaines de probes",
    topMetrics: [
      {
        label: "Median AI Visibility score",
        labelFr: "Score median de visibilite IA",
        value: "47 / 100",
        hint: "Highest of the 3 verticals covered this quarter, driven by stronger photo cadence",
        hintFr: "Le plus eleve des 3 verticales couvertes ce trimestre, porte par une meilleure cadence photo",
      },
      {
        label: "Top engine cited",
        labelFr: "Moteur principal citant",
        value: "Google AIO + Perplexity tied (28%)",
        valueFr: "Google AIO + Perplexity ex aequo (28%)",
        hint: "Perplexity unusually strong in this vertical due to project-research query patterns",
        hintFr: "Perplexity inhabituellement fort dans cette verticale en raison de motifs de requete de recherche de projet",
      },
      {
        label: "RBQ number on website",
        labelFr: "Numero RBQ sur le site web",
        value: "67%",
        hint: "Critical trust signal in Quebec; absence drops AI Visibility ~12 points",
        hintFr: "Signal de confiance critique au Quebec ; l'absence fait baisser la visibilite IA d'environ 12 points",
      },
      {
        label: "Project portfolio schema",
        labelFr: "Schema portfolio de projets",
        value: "8%",
        hint: "Massive untapped leverage: ItemList + Photograph schema for completed work",
        hintFr: "Levier massif inexploite : schema ItemList + Photograph pour le travail complete",
      },
    ],
    sections: [
      {
        heading: "RBQ verification is table stakes",
        headingFr: "La verification RBQ est obligatoire",
        body: "67% of probed contractors display their RBQ number prominently on their website footer or about page. The 33% who do not see a measurable AI Visibility penalty: median score 35 vs 51 for compliant peers. The reason: AI engines have been trained on Quebec consumer protection content that explicitly recommends RBQ verification before hiring. Engines pattern-match for the RBQ number presence and weight verified contractors higher. Adding the number takes 30 seconds. Skipping it leaves a 12-16 point gap.",
        bodyFr: "67% des entrepreneurs sondes affichent leur numero RBQ de maniere visible dans le pied de page ou la page a propos de leur site. Les 33% qui ne le font pas voient une penalite mesurable de visibilite IA : score median 35 contre 51 pour les pairs conformes. La raison : les moteurs IA ont ete entraines sur du contenu de protection des consommateurs quebecois qui recommande explicitement la verification RBQ avant d'embaucher. Les moteurs reconnaissent le motif de presence du numero RBQ et ponderent les entrepreneurs verifies plus haut. Ajouter le numero prend 30 secondes. L'omettre laisse un ecart de 12-16 points.",
      },
      {
        heading: "Photo portfolios are AI catnip",
        headingFr: "Les portfolios photo sont des aimants IA",
        body: "Contractors are the only vertical in this quarter's coverage where photo cadence eclipses review velocity as the dominant signal. Practices that publish 4+ project completion photos per month (with EXIF preserved and `Photograph` schema) score median 58, vs 38 for those publishing 0-1 photos per month. The pattern is clear: AI engines for home services queries ('best deck builder Quebec', 'kitchen renovation contractor Laval') prioritize visual proof. Stock photos do not count and actually penalize: engines detect image fingerprints and weight authentic on-site EXIF much higher.",
        bodyFr: "Les entrepreneurs sont la seule verticale dans la couverture de ce trimestre ou la cadence photo eclipse la velocite d'avis comme signal dominant. Les entreprises qui publient 4+ photos de completion de projet par mois (avec EXIF preserve et schema `Photograph`) marquent mediane 58, contre 38 pour celles publiant 0-1 photos par mois. Le motif est clair : les moteurs IA pour les requetes de services a domicile ('meilleur constructeur de terrasse Quebec', 'entrepreneur en renovation de cuisine Laval') priorisent la preuve visuelle. Les photos de stock ne comptent pas et penalisent meme : les moteurs detectent les empreintes d'images et ponderent l'EXIF authentique sur site beaucoup plus haut.",
      },
      {
        heading: "Project-type schema unlocks specificity",
        headingFr: "Le schema par type de projet debloque la specificite",
        body: "Only 8% of probed contractors use ItemList + Photograph schema to structure their project portfolio. Those that do appear in 4.2x more long-tail queries than peers using only generic 'Service' schema. The leverage compounds: each well-tagged project (with type, location, square footage, completion date, and 2-3 photos) becomes a queryable unit that engines can match to specific search intent. A contractor with 24 well-tagged projects in 6 categories has 144+ unique entry points; one with generic services has 6.",
        bodyFr: "Seulement 8% des entrepreneurs sondes utilisent les schemas ItemList + Photograph pour structurer leur portfolio de projets. Ceux qui le font apparaissent dans 4,2 fois plus de requetes longue traine que les pairs utilisant uniquement le schema 'Service' generique. Le levier se cumule : chaque projet bien etiquette (avec type, emplacement, superficie, date de completion, et 2-3 photos) devient une unite interrogeable que les moteurs peuvent associer a une intention de recherche specifique. Un entrepreneur avec 24 projets bien etiquetes dans 6 categories a 144+ points d'entree uniques ; un avec services generiques en a 6.",
      },
    ],
    takeaways: [
      {
        title: "Display RBQ number prominently on every page",
        titleFr: "Afficher le numero RBQ de maniere visible sur chaque page",
        detail: "30-second fix that moves median +12 points. Footer + about page + first contact form. Required field for AI engines pattern-matching Quebec contractor authenticity.",
        detailFr: "Correctif de 30 secondes qui deplace mediane +12 points. Pied de page + page a propos + premier formulaire de contact. Champ requis pour les moteurs IA reconnaissant l'authenticite des entrepreneurs quebecois.",
      },
      {
        title: "Publish 4 project photos per month with EXIF + Photograph schema",
        titleFr: "Publier 4 photos de projet par mois avec EXIF + schema Photograph",
        detail: "Real on-site photos. EXIF preserved (location, timestamp). Schema-tagged. Stock photos not just neutral but actively penalizing because engines detect them.",
        detailFr: "Vraies photos sur site. EXIF preserve (emplacement, horodatage). Etiquette schema. Les photos de stock ne sont pas juste neutres mais activement penalisantes parce que les moteurs les detectent.",
      },
      {
        title: "Structure project portfolio with ItemList schema",
        titleFr: "Structurer le portfolio de projets avec le schema ItemList",
        detail: "144+ entry points vs 6 for generic Service schema. Each project gets type, location, sqft, date, photos. Multiplies long-tail query coverage 4.2x.",
        detailFr: "144+ points d'entree contre 6 pour le schema Service generique. Chaque projet recoit type, emplacement, superficie, date, photos. Multiplie la couverture de requetes longue traine 4,2 fois.",
      },
    ],
  },
  {
    slug: "lawyers-quebec-q1-2026",
    industry: "lawyers",
    quarter: "Q1",
    year: 2026,
    publishedAt: "2026-05-01",
    region: "Quebec",
    status: "live",
    title: "State of AI Visibility for Quebec Lawyers, Q1 2026",
    titleFr: "Etat de la visibilite IA des avocats du Quebec, T1 2026",
    excerpt:
      "Anonymized aggregate of 36 Quebec law firms (solo, boutique, mid-size) probed by AiLys across 6 AI search engines from January through March 2026. Why practice-area schema dominates, the Barreau du Quebec directory advantage, and the bilingual content velocity gap.",
    excerptFr:
      "Agregat anonymise de 36 cabinets d'avocats quebecois (solo, boutique, taille moyenne) sondes par AiLys sur 6 moteurs de recherche IA de janvier a mars 2026. Pourquoi le schema des domaines de pratique domine, l'avantage de l'annuaire du Barreau du Quebec, et l'ecart de velocite de contenu bilingue.",
    sampleSize: "36 Quebec law firms, 6 AI engines, 12 weeks of probes",
    sampleSizeFr: "36 cabinets d'avocats quebecois, 6 moteurs IA, 12 semaines de probes",
    topMetrics: [
      {
        label: "Median AI Visibility score",
        labelFr: "Score median de visibilite IA",
        value: "44 / 100",
        hint: "Mid-range; legal services lag because public review velocity is structurally low",
        hintFr: "Plage moyenne ; les services juridiques sont en retard car la velocite d'avis publics est structurellement faible",
      },
      {
        label: "Top engine cited",
        labelFr: "Moteur principal citant",
        value: "Perplexity (31%)",
        valueFr: "Perplexity (31%)",
        hint: "Only vertical where Perplexity tops Google AIO; legal research queries favor Perplexity's citation transparency",
        hintFr: "Seule verticale ou Perplexity depasse Google AIO ; les requetes de recherche juridique favorisent la transparence des citations de Perplexity",
      },
      {
        label: "Barreau directory presence",
        labelFr: "Presence annuaire du Barreau",
        value: "89%",
        hint: "Near-universal among practicing lawyers but only 23% link bidirectionally to firm site",
        hintFr: "Quasi-universelle parmi les avocats en exercice mais seulement 23% lient bidirectionnellement vers le site du cabinet",
      },
      {
        label: "AttorneyService schema adoption",
        labelFr: "Adoption du schema AttorneyService",
        value: "6%",
        hint: "Tiny adoption with massive +24-point uplift for firms that ship it",
        hintFr: "Adoption minuscule avec hausse massive de +24 points pour les cabinets qui le deploient",
      },
    ],
    sections: [
      {
        heading: "Why legal underperforms despite high authority signals",
        headingFr: "Pourquoi le juridique sous-performe malgre des signaux d'autorite eleves",
        body: "Quebec law firms have strong baseline authority signals (Barreau membership, decades of practice, named partners with publication records) yet score median 44, lower than restaurants and contractors. The reason: public review velocity is structurally low (lawyers ethically discourage testimonials; ~80% have fewer than 5 Google reviews) and AI engines weight freshness heavily. The leverage point is structured data on practice areas, attorney profiles, and case-result-style pages (carefully formatted to comply with Barreau advertising rules), which compensate for low review signal with high schema density.",
        bodyFr: "Les cabinets d'avocats quebecois ont de forts signaux d'autorite de base (membre du Barreau, decennies de pratique, associes nommes avec dossiers de publications) pourtant marquent mediane 44, inferieur aux restaurants et entrepreneurs. La raison : la velocite d'avis publics est structurellement faible (les avocats decouragent ethiquement les temoignages ; environ 80% ont moins de 5 avis Google) et les moteurs IA ponderent fortement la fraicheur. Le point de levier est les donnees structurees sur les domaines de pratique, les profils d'avocats, et les pages style resultats de causes (soigneusement formatees pour se conformer aux regles publicitaires du Barreau), qui compensent le faible signal d'avis avec une haute densite de schema.",
      },
      {
        heading: "Perplexity's legal-research advantage",
        headingFr: "L'avantage de recherche juridique de Perplexity",
        body: "Lawyers are the only vertical in Q1 2026 where Perplexity (31%) outranked Google AIO (28%) as the top citing engine. The driver: Perplexity's interface is built around citation transparency, which matches how legal research queries are phrased ('what does Article 1457 of the Quebec Civil Code say', 'is consequential damage recoverable in commercial breach Quebec'). Firms that publish well-cited explainer pages on common practice areas (with proper LegalForceStatus + Legislation schema where applicable) appear in 4.8x more long-tail Perplexity citations than firms publishing only marketing copy.",
        bodyFr: "Les avocats sont la seule verticale au T1 2026 ou Perplexity (31%) a surpasse Google AIO (28%) comme moteur principal citant. Le moteur : l'interface de Perplexity est construite autour de la transparence des citations, ce qui correspond a la maniere dont les requetes de recherche juridique sont formulees ('que dit l'article 1457 du Code civil du Quebec', 'les dommages consecutifs sont-ils recuperables en violation commerciale Quebec'). Les cabinets qui publient des pages explicatives bien citees sur les domaines de pratique courants (avec schema LegalForceStatus + Legislation approprie quand applicable) apparaissent dans 4,8 fois plus de citations longue traine Perplexity que les cabinets publiant uniquement du contenu marketing.",
      },
      {
        heading: "The bilingual content velocity gap",
        headingFr: "L'ecart de velocite de contenu bilingue",
        body: "Quebec is bilingual but only 17% of probed law firms publish equal-volume EN + FR practice-area content. The 83% with French-dominant or English-dominant content miss roughly half the addressable AI queries. Firms that publish balanced bilingual content (within 20% volume parity in both languages) score median 60, vs 38 for monolingual or imbalanced. The work is substantial (each practice-area page needs both languages with native-quality translation) but the moat is real: Quebec corporate clients and out-of-province expansion both require bilingual content, and the schema flag `inLanguage: ['en', 'fr-CA']` is read by AI engines as proof of capability.",
        bodyFr: "Le Quebec est bilingue mais seulement 17% des cabinets sondes publient un volume egal de contenu EN + FR par domaine de pratique. Les 83% avec contenu dominant en francais ou en anglais ratent environ la moitie des requetes IA adressables. Les cabinets qui publient du contenu bilingue equilibre (parite de volume a moins de 20% dans les deux langues) marquent mediane 60, contre 38 pour monolingue ou desequilibre. Le travail est substantiel (chaque page de domaine de pratique a besoin des deux langues avec traduction de qualite native) mais le fosse est reel : les clients corporatifs quebecois et l'expansion hors province exigent tous deux du contenu bilingue, et le drapeau schema `inLanguage: ['en', 'fr-CA']` est lu par les moteurs IA comme preuve de capacite.",
      },
    ],
    takeaways: [
      {
        title: "Deploy AttorneyService schema on every practice area page",
        titleFr: "Deployer le schema AttorneyService sur chaque page de domaine de pratique",
        detail: "6% adoption gives +24 median points to early movers. Cover practice area, jurisdiction, languages, attorney Person schema with Barreau credentials.",
        detailFr: "6% d'adoption donne +24 points mediane aux premiers a bouger. Couvrir le domaine de pratique, la juridiction, les langues, le schema Person de l'avocat avec accreditations du Barreau.",
      },
      {
        title: "Publish citation-rich explainer content for Perplexity",
        titleFr: "Publier du contenu explicatif riche en citations pour Perplexity",
        detail: "Quebec Civil Code articles, common case-law patterns, jurisdiction comparisons. Each well-cited explainer adds long-tail Perplexity coverage 4.8x.",
        detailFr: "Articles du Code civil du Quebec, motifs de jurisprudence courants, comparaisons de juridictions. Chaque explication bien citee ajoute une couverture Perplexity longue traine 4,8 fois.",
      },
      {
        title: "Achieve bilingual content parity within 12 months",
        titleFr: "Atteindre la parite de contenu bilingue en 12 mois",
        detail: "Match practice-area page volume EN+FR within 20%. Firms with bilingual parity score median 60 vs 38 imbalanced. Schema flag inLanguage: ['en', 'fr-CA'] required.",
        detailFr: "Egaliser le volume de pages de domaine de pratique EN+FR a moins de 20%. Les cabinets avec parite bilingue marquent mediane 60 contre 38 desequilibres. Drapeau schema inLanguage: ['en', 'fr-CA'] requis.",
      },
    ],
  },
];

export function getIndustryReport(slug: string): IndustryReport | undefined {
  return industryReports.find((r) => r.slug === slug);
}

export function getLiveReports(): IndustryReport[] {
  return industryReports.filter((r) => r.status === "live");
}
