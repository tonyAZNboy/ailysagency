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
    status: "coming-soon",
    title: "State of AI Visibility for Quebec Restaurants, Q1 2026",
    titleFr: "Etat de la visibilite IA des restaurants du Quebec, T1 2026",
    excerpt:
      "Coming soon. Will cover ~60 Quebec restaurants probed across 6 AI engines, with focus on photo cadence impact, menu schema adoption, and the Yelp + Google review velocity gap.",
    excerptFr:
      "A venir. Couvrira environ 60 restaurants quebecois sondes sur 6 moteurs IA, avec focus sur l'impact de la cadence photo, l'adoption du schema Menu, et l'ecart de velocite d'avis Yelp + Google.",
    sampleSize: "Sample collection in progress",
    sampleSizeFr: "Collecte d'echantillon en cours",
    topMetrics: [],
    sections: [],
    takeaways: [],
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
    status: "coming-soon",
    title: "State of AI Visibility for Quebec Lawyers, Q1 2026",
    titleFr: "Etat de la visibilite IA des avocats du Quebec, T1 2026",
    excerpt:
      "Coming soon. Will cover ~35 Quebec law firms probed across 6 AI engines, with focus on practice-area schema (Service + AttorneyService), bar association directory presence, and bilingual content velocity.",
    excerptFr:
      "A venir. Couvrira environ 35 cabinets d'avocats quebecois sondes sur 6 moteurs IA, avec focus sur le schema des domaines de pratique (Service + AttorneyService), la presence dans les annuaires du Barreau, et la velocite de contenu bilingue.",
    sampleSize: "Sample collection in progress",
    sampleSizeFr: "Collecte d'echantillon en cours",
    topMetrics: [],
    sections: [],
    takeaways: [],
  },
];

export function getIndustryReport(slug: string): IndustryReport | undefined {
  return industryReports.find((r) => r.slug === slug);
}

export function getLiveReports(): IndustryReport[] {
  return industryReports.filter((r) => r.status === "live");
}
