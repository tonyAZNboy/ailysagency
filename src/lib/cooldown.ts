/**
 * localStorage-backed cooldown helpers.
 *
 * Phase E.21 simplify follow-up: ExitIntentModal and LandingChatWidget
 * both implemented the identical "store dismissedAt timestamp, refuse
 * to re-show within N hours" pattern inline. Extracted here so future
 * popups (newsletter, audit reminder, upsell) can opt into the same
 * cooldown semantics without re-writing the math.
 *
 * SSR-safe: every helper guards `typeof window` so server-side
 * rendering does not throw on missing localStorage.
 */

/**
 * Record that the user dismissed the surface keyed by `key` right now.
 * Subsequent `isOnCooldown(key, hours)` calls within the cooldown
 * window will return true.
 */
export function recordDismissal(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, String(Date.now()));
  } catch {
    /* Quota / private mode / disabled storage — silently ignore. The
       worst case is the surface re-shows on next mount, not a crash. */
  }
}

/**
 * True when the surface keyed by `key` was dismissed less than
 * `hours` hours ago. False when no dismissal recorded, when storage
 * is unavailable, or when the cooldown window has expired.
 */
export function isOnCooldown(key: string, hours: number): boolean {
  if (typeof window === "undefined") return false;
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    return false;
  }
  if (!raw) return false;
  const ts = Number.parseInt(raw, 10);
  if (!Number.isFinite(ts)) return false;
  const hoursSince = (Date.now() - ts) / (1000 * 60 * 60);
  return hoursSince < hours;
}
