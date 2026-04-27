// AiLys Agency · Analytics loader
//
// Lazy-loads tracking pixels ONLY after consent is granted.
// Supports: Google Tag Manager (preferred orchestrator), Meta Pixel, LinkedIn Insight Tag.
//
// Long-term plan:
//   - Switch to server-side GTM (Cloudflare Workers proxy) when traffic justifies
//   - Add UTM-based campaign tracking
//   - Custom events for: audit_form_submitted, score_calculated, founding_apply, etc.
//
// Configuration via environment variables (set in Cloudflare Pages):
//   VITE_GTM_ID (required for analytics)
//   VITE_META_PIXEL_ID (required for marketing)
//   VITE_LINKEDIN_PARTNER_ID (required for marketing)

import { onConsentChange, hasConsent } from "./consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _linkedin_data_partner_ids?: string[];
    _linkedin_partner_id?: string;
    lintrk?: (...args: unknown[]) => void;
  }
}

let initialized = {
  gtm: false,
  meta: false,
  linkedin: false,
};

const GTM_ID = import.meta.env.VITE_GTM_ID;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
const LINKEDIN_PARTNER_ID = import.meta.env.VITE_LINKEDIN_PARTNER_ID;

function injectScript(src: string, attrs: Record<string, string> = {}): void {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  for (const [k, v] of Object.entries(attrs)) {
    s.setAttribute(k, v);
  }
  document.head.appendChild(s);
}

function loadGTM(): void {
  if (initialized.gtm || !GTM_ID) return;
  initialized.gtm = true;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    "gtm.start": Date.now(),
    event: "gtm.js",
  });
  injectScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);
}

function loadMetaPixel(): void {
  if (initialized.meta || !META_PIXEL_ID) return;
  initialized.meta = true;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  // Standard Meta Pixel base code, IIFE form
  ((f: any, b: any, e: any, v: any) => {
    if (f.fbq) return;
    const n: any = function (...args: unknown[]) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement(e);
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
    f.fbq = n;
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable @typescript-eslint/no-explicit-any */

  window.fbq?.("init", META_PIXEL_ID);
  window.fbq?.("track", "PageView");
}

function loadLinkedIn(): void {
  if (initialized.linkedin || !LINKEDIN_PARTNER_ID) return;
  initialized.linkedin = true;

  window._linkedin_partner_id = LINKEDIN_PARTNER_ID;
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids ?? [];
  window._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID);
  injectScript("https://snap.licdn.com/li.lms-analytics/insight.min.js");
}

/**
 * Initialize analytics based on current consent.
 * Call this on app mount AND after consent changes.
 */
export function initAnalytics(): void {
  if (typeof window === "undefined") return;

  if (hasConsent("analytics")) {
    loadGTM();
  }
  if (hasConsent("marketing")) {
    loadMetaPixel();
    loadLinkedIn();
  }
}

/**
 * React-friendly hook: subscribes to consent changes and re-runs init.
 * Call once in App.tsx (top level).
 */
export function setupAnalyticsLoader(): () => void {
  if (typeof window === "undefined") return () => {};

  // Initial load based on current state
  initAnalytics();

  // Re-initialize on consent change
  return onConsentChange(() => {
    initAnalytics();
  });
}

/**
 * Track a custom event. Routes through GTM if available, otherwise no-op.
 * Examples:
 *   trackEvent("audit_form_submitted", { tier: "core" })
 *   trackEvent("score_calculated", { total: 47 })
 *   trackEvent("founding_apply_clicked", { source: "landing" })
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  if (!hasConsent("analytics")) return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...params });
}
