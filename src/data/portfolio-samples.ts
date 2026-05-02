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
];

export function getPortfolioSample(slug: string): PortfolioSample | undefined {
  return portfolioSamples.find((s) => s.slug === slug);
}
