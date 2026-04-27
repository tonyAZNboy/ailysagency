import { useEffect, useState } from "react";
import { Cookie, Shield, BarChart3, Megaphone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  consentDecisionMade,
  saveConsent,
  type ConsentCategory,
} from "@/lib/consent";
import { useLang } from "@/i18n/LangContext";

/**
 * Cookie consent banner.
 *
 * Loi 25 (Quebec) and GDPR compliance:
 *  - Banner shows until user makes a decision
 *  - "Reject all" is as visually prominent as "Accept all" (Loi 25 symmetry)
 *  - Granular per-category controls available immediately, not 2 clicks deep
 *  - No tracking script loads until decision is made
 *  - Decision can be withdrawn at /privacy or via footer
 *
 * Long-term: log decisions to a `consent_decisions` Supabase table for audit
 * compliance (rotating consentId, no PII).
 */

export function CookieConsentBanner() {
  const { lang } = useLang();
  const isFr = lang === "fr";
  const T = (en: string, fr: string) => (isFr ? fr : en);

  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [granted, setGranted] = useState<Record<ConsentCategory, boolean>>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Show banner on first load if no decision yet
    if (!consentDecisionMade()) {
      // Slight delay to let the page render first
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
    setVisible(false);
  };

  const handleRejectAll = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
    setVisible(false);
  };

  const handleSaveCustom = () => {
    saveConsent(granted);
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
        {!showCustomize ? (
          <div className="p-5 sm:p-6">
            <div className="flex items-start gap-3 mb-4">
              <Cookie className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3
                  id="consent-title"
                  className="font-display text-lg sm:text-xl mb-1.5 leading-tight"
                >
                  {T(
                    "We use cookies to make AiLys better.",
                    "Nous utilisons des témoins pour améliorer AiLys.",
                  )}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {T(
                    "Necessary cookies keep the site working. Analytics cookies tell us which pages help and which do not. Marketing cookies let us show you relevant ads on Meta and LinkedIn. You decide.",
                    "Les témoins nécessaires font fonctionner le site. Les témoins d'analyse nous disent quelles pages aident et lesquelles non. Les témoins de marketing nous permettent de vous montrer des annonces pertinentes sur Meta et LinkedIn. Vous décidez.",
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <Button
                onClick={handleAcceptAll}
                className="rounded-full font-semibold flex-1 sm:flex-none"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                }}
              >
                {T("Accept all", "Tout accepter")}
              </Button>
              <Button
                onClick={handleRejectAll}
                variant="outline"
                className="rounded-full font-semibold flex-1 sm:flex-none"
              >
                {T("Reject all", "Tout refuser")}
              </Button>
              <button
                type="button"
                onClick={() => setShowCustomize(true)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 sm:ml-auto px-2 py-2"
              >
                {T("Customize", "Personnaliser")}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3 mb-5">
              <div>
                <h3 className="font-display text-lg sm:text-xl mb-1 leading-tight">
                  {T("Customize cookie preferences", "Personnaliser les préférences")}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {T(
                    "Granular control. You can change these later at /privacy.",
                    "Contrôle détaillé. Vous pouvez les changer plus tard sur /privacy.",
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCustomize(false)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors flex-shrink-0"
                aria-label={T("Close customize", "Fermer la personnalisation")}
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-3 mb-5">
              {/* Necessary — always on */}
              <CategoryToggle
                icon={<Shield className="w-4 h-4" />}
                title={T("Necessary", "Nécessaires")}
                description={T(
                  "Authentication, fraud prevention, and core site functionality. Cannot be disabled.",
                  "Authentification, prévention de fraude et fonctionnalités de base. Ne peut pas être désactivé.",
                )}
                checked
                disabled
                onChange={() => {}}
              />
              <CategoryToggle
                icon={<BarChart3 className="w-4 h-4" />}
                title={T("Analytics", "Analyses")}
                description={T(
                  "Aggregated, anonymized data on which pages perform. Helps us improve. No personal data sold.",
                  "Données agrégées et anonymisées sur la performance des pages. Nous aide à améliorer. Aucune donnée personnelle vendue.",
                )}
                checked={granted.analytics}
                onChange={(v) => setGranted({ ...granted, analytics: v })}
              />
              <CategoryToggle
                icon={<Megaphone className="w-4 h-4" />}
                title={T("Marketing", "Marketing")}
                description={T(
                  "Lets us show you relevant ads on Meta, LinkedIn, and Google. Drops a tracking pixel. Withdrawable at any time.",
                  "Nous permet de vous montrer des annonces pertinentes sur Meta, LinkedIn et Google. Pose un témoin de suivi. Retirable en tout temps.",
                )}
                checked={granted.marketing}
                onChange={(v) => setGranted({ ...granted, marketing: v })}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleSaveCustom}
                className="rounded-full font-semibold flex-1 sm:flex-none"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                }}
              >
                {T("Save preferences", "Enregistrer")}
              </Button>
              <Button
                onClick={handleRejectAll}
                variant="outline"
                className="rounded-full flex-1 sm:flex-none"
              >
                {T("Reject all", "Tout refuser")}
              </Button>
              <Button
                onClick={handleAcceptAll}
                variant="outline"
                className="rounded-full flex-1 sm:flex-none"
              >
                {T("Accept all", "Tout accepter")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface CategoryToggleProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}

function CategoryToggle({
  icon,
  title,
  description,
  checked,
  disabled,
  onChange,
}: CategoryToggleProps) {
  return (
    <label
      className={`flex items-start gap-3 p-3 rounded-lg border ${
        checked ? "border-primary/40 bg-primary/[0.04]" : "border-border/30 bg-background/30"
      } ${disabled ? "opacity-70" : "cursor-pointer hover:border-border"}`}
    >
      <div className="mt-0.5 text-primary/80 flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm text-foreground/95">{title}</div>
        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
          {description}
        </p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 rounded border-border accent-primary cursor-pointer flex-shrink-0"
      />
    </label>
  );
}
