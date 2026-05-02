// Public surface of the AiLys mood theme system.
//
// Usage:
//   import { moods, getMood, getDefaultMoodForVertical } from "@/design-system/moods";
//   const mood = getMood("premium-dark");
//   const defaultMood = getDefaultMoodForVertical("lawyers"); // → "premium-dark"

export type { Mood, MoodId, MoodPalette, MoodTypography, MoodBackgroundId, MoodMotionPersonality } from "./types";
export { VERTICAL_DEFAULT_MOOD, getDefaultMoodForVertical } from "./vertical-defaults";

import { premiumDark } from "./premium-dark";
import { cleanMedical } from "./clean-medical";
import { chaleureuxArtisan } from "./chaleureux-artisan";
import { techCorporate } from "./tech-corporate";
import { luxeEditorial } from "./luxe-editorial";
import { friendlyLocal } from "./friendly-local";
import type { Mood, MoodId } from "./types";

export const moods: Record<MoodId, Mood> = {
  "premium-dark": premiumDark,
  "clean-medical": cleanMedical,
  "chaleureux-artisan": chaleureuxArtisan,
  "tech-corporate": techCorporate,
  "luxe-editorial": luxeEditorial,
  "friendly-local": friendlyLocal,
};

export const moodList: Mood[] = Object.values(moods);

export function getMood(id: MoodId): Mood {
  return moods[id];
}

// Convenience for the /realisations filter UI
export const moodIds: MoodId[] = [
  "premium-dark",
  "clean-medical",
  "chaleureux-artisan",
  "tech-corporate",
  "luxe-editorial",
  "friendly-local",
];
