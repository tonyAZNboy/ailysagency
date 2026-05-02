// Portfolio samples shown on /realisations.
//
// Each sample is a placeholder for an actual demo client site that
// will live at <slug>.demo.ailysagency.ca once the ailys-client-sites
// repo ships (per design system inventory phase C). For now, the
// landing page renders the catalog with "Coming soon" badges so
// prospects can see the planned mood / vertical coverage.
//
// Once each site is built, set demoUrl to the live subdomain. The
// portfolio card auto-flips from "Coming soon" to "View live demo".

import type { IndustrySlug } from "./industries";
import type { MoodId } from "@/design-system/moods";

export interface PortfolioSample {
  slug: string;
  // Display name (fictional, but plausible Quebec business)
  nameEn: string;
  nameFr: string;
  // Industry archetype
  vertical: IndustrySlug;
  // Visual mood applied to the demo site
  mood: MoodId;
  // Tier the demo demonstrates (5/10/20 pages)
  tier: "starter" | "core" | "growth" | "agency";
  // Plausible Quebec city for the fictional business
  cityEn: string;
  cityFr: string;
  // Short positioning description (1 sentence)
  pitchEn: string;
  pitchFr: string;
  // Live demo URL (set once the sample ships, null = coming soon)
  demoUrl: string | null;
  // Anticipated launch month YYYY-MM
  plannedLaunch: string;
}

export const portfolioSamples: PortfolioSample[] = [
  {
    slug: "clinique-lavoie",
    nameEn: "Clinique Dentaire Lavoie",
    nameFr: "Clinique Dentaire Lavoie",
    vertical: "dentists",
    mood: "clean-medical",
    tier: "core",
    cityEn: "Sherbrooke",
    cityFr: "Sherbrooke",
    pitchEn: "Family dental practice serving Sherbrooke for 18 years. RAMQ-friendly intake + modern cosmetic procedures.",
    pitchFr: "Cabinet dentaire familial servant Sherbrooke depuis 18 ans. Accueil convivial RAMQ + procedures cosmetiques modernes.",
    demoUrl: null,
    plannedLaunch: "2026-06",
  },
  {
    slug: "moreau-droit",
    nameEn: "Moreau & Associes Droit Familial",
    nameFr: "Moreau & Associes Droit Familial",
    vertical: "lawyers",
    mood: "premium-dark",
    tier: "growth",
    cityEn: "Montreal",
    cityFr: "Montreal",
    pitchEn: "Boutique family-law firm. Mediation, custody, divorce. Bilingual EN/FR, 22 years on the Plateau.",
    pitchFr: "Cabinet boutique en droit familial. Mediation, garde, divorce. Bilingue EN/FR, 22 ans sur le Plateau.",
    demoUrl: null,
    plannedLaunch: "2026-06",
  },
  {
    slug: "tanaka-sushi",
    nameEn: "Tanaka Sushi Comptoir",
    nameFr: "Tanaka Sushi Comptoir",
    vertical: "sushi-counters",
    mood: "friendly-local",
    tier: "starter",
    cityEn: "Cote-des-Neiges, Montreal",
    cityFr: "Cote-des-Neiges, Montreal",
    pitchEn: "Lunch-combo sushi counter near UdeM. Take-out + delivery, 18 years serving the student crowd.",
    pitchFr: "Comptoir a sushis combos midi pres de l'UdeM. A emporter + livraison, 18 ans a servir la clientele etudiante.",
    demoUrl: null,
    plannedLaunch: "2026-06",
  },
  {
    slug: "salon-orchidee",
    nameEn: "Salon Orchidee Nail Bar",
    nameFr: "Salon Orchidee Bar a Ongles",
    vertical: "nail-salons",
    mood: "friendly-local",
    tier: "core",
    cityEn: "Brossard",
    cityFr: "Brossard",
    pitchEn: "Trilingual nail salon (Vietnamese, English, French). Gel-X specialist, walk-ins welcome.",
    pitchFr: "Onglerie trilingue (vietnamien, anglais, francais). Specialiste gel-X, sans rendez-vous bienvenus.",
    demoUrl: null,
    plannedLaunch: "2026-07",
  },
  {
    slug: "chef-bernard",
    nameEn: "Chez Chef Bernard",
    nameFr: "Chez Chef Bernard",
    vertical: "restaurants",
    mood: "chaleureux-artisan",
    tier: "growth",
    cityEn: "Quebec City",
    cityFr: "Ville de Quebec",
    pitchEn: "Quebec-cuisine bistro in Vieux-Quebec. 26 seats, locally-sourced menu changing weekly.",
    pitchFr: "Bistro de cuisine quebecoise dans le Vieux-Quebec. 26 places, menu local change hebdomadairement.",
    demoUrl: null,
    plannedLaunch: "2026-07",
  },
  {
    slug: "auberge-cap",
    nameEn: "Auberge du Cap-Tourmente",
    nameFr: "Auberge du Cap-Tourmente",
    vertical: "hotels",
    mood: "luxe-editorial",
    tier: "agency",
    cityEn: "Saint-Joachim, Capitale-Nationale",
    cityFr: "Saint-Joachim, Capitale-Nationale",
    pitchEn: "12-room boutique inn near Cap-Tourmente bird sanctuary. Multi-locale (EN/FR/JA/ZH/DE) for international guests.",
    pitchFr: "Auberge boutique 12 chambres pres du sanctuaire d'oiseaux du Cap-Tourmente. Multilangue (EN/FR/JA/ZH/DE) pour visiteurs internationaux.",
    demoUrl: null,
    plannedLaunch: "2026-08",
  },
  {
    slug: "plomberie-lemay",
    nameEn: "Plomberie Lemay 24/7",
    nameFr: "Plomberie Lemay 24/7",
    vertical: "contractors",
    mood: "chaleureux-artisan",
    tier: "growth",
    cityEn: "Laval, Mirabel, Boisbriand area",
    cityFr: "Laval, Mirabel, Boisbriand",
    pitchEn: "Family plumbing business, RBQ + APCHQ certified. Emergency 24/7 + scheduled installs. 40+ city/service pages for SEO.",
    pitchFr: "Entreprise familiale de plomberie, certifiee RBQ + APCHQ. Urgence 24/7 + installations planifiees. 40+ pages ville/service pour le SEO.",
    demoUrl: null,
    plannedLaunch: "2026-08",
  },
  {
    slug: "courtier-tremblay",
    nameEn: "Tremblay Courtier Immobilier",
    nameFr: "Tremblay Courtier Immobilier",
    vertical: "real-estate",
    mood: "luxe-editorial",
    tier: "growth",
    cityEn: "Tremblant + surrounding villages",
    cityFr: "Tremblant + villages environnants",
    pitchEn: "OACIQ-licensed broker, luxury chalets + condos. Bilingual EN/FR, video tours, neighborhood polygons.",
    pitchFr: "Courtier OACIQ, chalets + condos de luxe. Bilingue EN/FR, visites video, polygones de quartier.",
    demoUrl: null,
    plannedLaunch: "2026-09",
  },
  {
    slug: "physio-mobile-lavallee",
    nameEn: "Physio Mobile Lavallee",
    nameFr: "Physio Mobile Lavallee",
    vertical: "clinics",
    mood: "clean-medical",
    tier: "core",
    cityEn: "Trois-Rivieres + Mauricie",
    cityFr: "Trois-Rivieres + Mauricie",
    pitchEn: "Mobile physiotherapy at home. RAMQ + private insurance billing. Online appointment booking + secure portal.",
    pitchFr: "Physiotherapie mobile a domicile. Facturation RAMQ + assurance privee. Reservation en ligne + portail securise.",
    demoUrl: null,
    plannedLaunch: "2026-09",
  },

  /* Variants showing multi-template-per-vertical flexibility.
     Same vertical (lawyers, restaurants, dentists) but different mood
     + different sub-segment positioning. Demonstrates that a single
     vertical can decline into multiple visual personalities depending
     on the sub-segment (luxury vs accessible vs B2B-tech), which is the
     underlying premise of the future Scenario A (variants per vertical
     with route-level support). For now these live as separate samples
     in the portfolio so prospects can see the flexibility at /realisations.
     Future Scenario A will turn this into actual route variants:
       /industries/lawyers/[variant-slug]
     Tracked in STATE.md as queued for after Tuesday 13:00. */

  {
    slug: "tannenbaum-litige-corpo",
    nameEn: "Tannenbaum & Co Corporate Litigation",
    nameFr: "Tannenbaum & Co Litige Corporatif",
    vertical: "lawyers",
    mood: "tech-corporate",
    tier: "agency",
    cityEn: "Downtown Montreal",
    cityFr: "Centre-ville Montreal",
    pitchEn: "B2B-focused corporate litigation boutique, 14 lawyers, multi-jurisdiction. Variant of the lawyers vertical with tech-corporate mood for B2B clientele.",
    pitchFr: "Boutique de litige corporatif B2B, 14 avocats, multi-juridictions. Variante de la verticale avocats avec mood tech-corporate pour clientele B2B.",
    demoUrl: null,
    plannedLaunch: "2026-10",
  },
  {
    slug: "clinique-juridique-mile-end",
    nameEn: "Clinique Juridique Mile End",
    nameFr: "Clinique Juridique Mile End",
    vertical: "lawyers",
    mood: "friendly-local",
    tier: "starter",
    cityEn: "Mile End, Montreal",
    cityFr: "Mile End, Montreal",
    pitchEn: "Accessible community-law clinic. Family law + tenant rights + small claims. Variant of the lawyers vertical with friendly-local mood for accessibility-first positioning.",
    pitchFr: "Clinique juridique communautaire accessible. Droit familial + droits des locataires + petites creances. Variante de la verticale avocats avec mood friendly-local pour positionnement accessibilite.",
    demoUrl: null,
    plannedLaunch: "2026-10",
  },
  {
    slug: "table-quebecoise-lac-st-jean",
    nameEn: "La Table Quebecoise du Lac-St-Jean",
    nameFr: "La Table Quebecoise du Lac-St-Jean",
    vertical: "restaurants",
    mood: "luxe-editorial",
    tier: "growth",
    cityEn: "Lac-Saint-Jean",
    cityFr: "Lac-Saint-Jean",
    pitchEn: "Fine-dining destination resto with 90-min tasting menu. Multi-locale for international foodie tourism. Variant of the restaurants vertical with luxe-editorial mood for fine-dining positioning.",
    pitchFr: "Resto destination fine-dining avec menu degustation 90 min. Multilangue pour tourisme gastronomique international. Variante de la verticale restaurants avec mood luxe-editorial.",
    demoUrl: null,
    plannedLaunch: "2026-11",
  },
  {
    slug: "casse-croute-frites-laval",
    nameEn: "Casse-Croute Bistro de Laval",
    nameFr: "Casse-Croute Bistro de Laval",
    vertical: "restaurants",
    mood: "chaleureux-artisan",
    tier: "starter",
    cityEn: "Laval",
    cityFr: "Laval",
    pitchEn: "Family casse-croute, 32-year history, poutine + smoked-meat + fish-and-chips. Variant of the restaurants vertical with chaleureux-artisan mood for casual-Quebec positioning.",
    pitchFr: "Casse-croute familial, 32 ans d'histoire, poutine + smoked-meat + fish-and-chips. Variante de la verticale restaurants avec mood chaleureux-artisan pour positionnement casual-Quebec.",
    demoUrl: null,
    plannedLaunch: "2026-11",
  },
  {
    slug: "centre-pediatrique-laval",
    nameEn: "Centre Pediatrique Laval",
    nameFr: "Centre Pediatrique Laval",
    vertical: "dentists",
    mood: "friendly-local",
    tier: "growth",
    cityEn: "Laval",
    cityFr: "Laval",
    pitchEn: "Pediatric-only dental practice. Sedation dentistry + kid-anxiety specialty. Variant of the dentists vertical with friendly-local mood for child-friendly positioning.",
    pitchFr: "Pratique dentaire pediatrique exclusive. Dentisterie de sedation + specialite anxiete enfants. Variante de la verticale dentistes avec mood friendly-local pour positionnement enfants.",
    demoUrl: null,
    plannedLaunch: "2026-12",
  },
  {
    slug: "cpe-arc-en-ciel-brossard",
    nameEn: "CPE Arc-en-Ciel Brossard",
    nameFr: "CPE Arc-en-Ciel Brossard",
    vertical: "daycares",
    mood: "friendly-local",
    tier: "core",
    cityEn: "Brossard",
    cityFr: "Brossard",
    pitchEn: "Trilingual subsidized daycare (FR/EN/ZH), Reggio approach, 80-place CPE. Sample for the new daycares vertical demonstrating multilingual + program-orientation schema.",
    pitchFr: "CPE subventionne trilingue (FR/EN/ZH), approche Reggio, 80 places. Sample pour la nouvelle verticale daycares demontrant schema multilingue + orientation programme.",
    demoUrl: null,
    plannedLaunch: "2026-12",
  },
];

export function getPortfolioSample(slug: string): PortfolioSample | undefined {
  return portfolioSamples.find((s) => s.slug === slug);
}
