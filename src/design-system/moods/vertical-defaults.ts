// Default mood per industry vertical.
//
// This mapping is the single source of truth for "which mood does
// the dentist page default to" decisions. Override per-tenant via
// admin (deferred until ailys-client-sites repo).
//
// When a new industry is added to src/data/industries.ts, add its
// default mood here. TypeScript will enforce completeness via the
// IndustrySlug type.

import type { IndustrySlug } from "@/data/industries";
import type { MoodId } from "./types";

export const VERTICAL_DEFAULT_MOOD: Record<IndustrySlug, MoodId> = {
  dentists: "clean-medical",
  lawyers: "premium-dark",
  restaurants: "chaleureux-artisan",
  contractors: "chaleureux-artisan",
  clinics: "clean-medical",
  "real-estate": "luxe-editorial",
  hotels: "luxe-editorial",
  "nail-salons": "friendly-local",
  "sushi-counters": "friendly-local",
  "hair-salons": "premium-dark",
  "gyms-studios": "tech-corporate",
  "vet-clinics": "clean-medical",
};

export function getDefaultMoodForVertical(slug: IndustrySlug): MoodId {
  return VERTICAL_DEFAULT_MOOD[slug];
}
