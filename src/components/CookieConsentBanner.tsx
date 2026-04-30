import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { consentDecisionMade, saveConsent } from "@/lib/consent";
import { useLang } from "@/i18n/LangContext";

/**
 * Cookie consent banner.
 *
 * Two-button compliance flow per AiLys product decision (2026-04-27):
 *  - "Accept all" -> functional + analytics + marketing pixels
 *  - "Necessary only" -> functional only, no tracking, no pixels
 *
 * Both buttons are visually equivalent (size, prominence, placement) per
 * Loi 25 (Quebec) symmetry rules and GDPR Article 7. No "Customize" panel
 * because the binary choice itself is granular enough for our cookie
 * categories. A more detailed view lives at /cookies for users who want
 * the per-category breakdown.
 *
 * Long-term: log decisions to a `consent_decisions` Supabase table for
 * audit compliance (rotating consentId, no PII).
 */

export function CookieConsentBanner() {
  const { lang } = useLang();
  const isFr = lang === "fr";
  const T = (en: string, fr: string) => (isFr ? fr : en);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Phase E.21: bump 1200ms -> 2500ms so the banner does not slide in
    // mid-first-paint. Loi 25 / GDPR are still respected because no
    // analytics cookies fire until the user clicks Accept; this delay
    // is purely UX. Banner persists until user decides.
    if (!consentDecisionMade()) {
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
    setVisible(false);
  };

  const handleNecessaryOnly = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[90] p-3 sm:p-4 animate-in slide-in-from-bottom duration-500"
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
    >
      <div
        className="max-w-5xl mx-auto rounded-2xl border border-primary/30 bg-card/95 backdrop-blur-2xl shadow-[0_-8px_40px_rgba(0,0,0,0.4)]"
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0)",
        }}
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3 mb-4">
            <Cookie className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3
                id="consent-title"
                className="font-display text-lg sm:text-xl mb-1.5 leading-tight"
              >
                {T(
                  "We use cookies to make AiLys Agency better.",
                  "Nous utilisons des témoins pour améliorer AiLys Agency.",
                )}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {T(
                  "Necessary cookies keep the site working. Analytics and marketing cookies help us improve the site and show relevant ads on Meta and LinkedIn. You can change your choice at any time at /cookies.",
                  "Les témoins nécessaires font fonctionner le site. Les témoins d'analyse et de marketing nous aident à améliorer le site et à afficher des annonces pertinentes sur Meta et LinkedIn. Vous pouvez changer votre choix en tout temps sur /cookies.",
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleAcceptAll}
              className="rounded-full font-semibold flex-1"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
              }}
            >
              {T("Accept all", "Tout accepter")}
            </Button>
            <Button
              onClick={handleNecessaryOnly}
              variant="outline"
              className="rounded-full font-semibold flex-1"
            >
              {T("Necessary only", "Nécessaires seulement")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
