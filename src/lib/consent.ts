// AiLys Agency · Consent management
//
// Long-term, dependency-free consent layer that complies with:
//   - GDPR (EU)
//   - PIPEDA (Canada federal)
//   - Loi 25 (Quebec, in force since 2024)
//   - CCPA (California)
//
// Core principles:
//   1. NO tracking script loads until consent is granted (or implicit-allow expires)
//   2. Granular categories (necessary, analytics, marketing)
//   3. Clear one-click "reject all" option (Loi 25 requires symmetry between accept and reject)
//   4. Withdrawable at any time via /privacy or footer link
//   5. Consent decision stored client-side only (no server pixel without consent)
//   6. Logged for audit trail (with rotating ID, no PII)
//
// Storage: localStorage 'ailys_consent_v1' = JSON of ConsentState

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export interface ConsentState {
  /** Decision per category. Necessary is always true. */
  granted: Record<ConsentCategory, boolean>;
  /** ISO timestamp of decision */
  decidedAt: string;
  /** Schema version (bump if categories change) */
  v: number;
  /** Rotating consent ID for audit logs without PII */
  consentId: string;
}

const STORAGE_KEY = "ailys_consent_v1";
const CURRENT_VERSION = 1;

// Helpers
function generateConsentId(): string {
  // Crypto-strong random ID, ~22 chars, no PII
  const bytes = new Uint8Array(16);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return btoa(String.fromCharCode(...bytes)).replace(/[+/=]/g, "").slice(0, 22);
}

export function loadConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.v !== CURRENT_VERSION) {
      // Schema changed, treat as no decision yet
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(granted: Record<ConsentCategory, boolean>): ConsentState {
  const state: ConsentState = {
    granted: { ...granted, necessary: true }, // necessary is always granted
    decidedAt: new Date().toISOString(),
    v: CURRENT_VERSION,
    consentId: generateConsentId(),
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Dispatch event so listeners (analytics loader) can react
    window.dispatchEvent(new CustomEvent("ailys:consent-changed", { detail: state }));
  }
  return state;
}

export function withdrawConsent(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("ailys:consent-changed", { detail: null }));
}

export function hasConsent(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  const state = loadConsent();
  return Boolean(state?.granted[category]);
}

export function consentDecisionMade(): boolean {
  return loadConsent() !== null;
}

/**
 * Subscribe to consent changes. Returns an unsubscribe function.
 * Use in analytics loader to gate script injection.
 */
export function onConsentChange(
  callback: (state: ConsentState | null) => void,
): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (e: Event) => {
    callback((e as CustomEvent<ConsentState | null>).detail);
  };
  window.addEventListener("ailys:consent-changed", handler);
  return () => window.removeEventListener("ailys:consent-changed", handler);
}
