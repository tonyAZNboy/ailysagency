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
