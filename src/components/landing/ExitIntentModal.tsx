import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LangContext";
import { NewsletterSignup } from "./NewsletterSignup";

/**
 * Exit-intent modal.
 *
 * Triggers:
 *  - Desktop: pointer leaves the viewport at the top (typical "going to close tab" gesture)
 *  - Mobile: scroll-up after 50% scroll depth (proxy for back-button intent)
 *
 * Suppression rules:
 *  - Never show twice in same session (sessionStorage)
 *  - Never show within 24h of last dismissal (localStorage timestamp)
 *  - Never show on /audit, /book-call, /admin, or /auth routes (already in funnel)
 *  - Never show in first 8 seconds (give the page a chance)
 *
 * Long-term: A/B test variants (newsletter vs full audit CTA vs founding-clients).
 */

const SUPPRESS_KEY = "ailys_exit_intent_dismissed_at";
const SESSION_SHOWN_KEY = "ailys_exit_intent_session_shown";
const SUPPRESS_HOURS = 24;
const MIN_DELAY_MS = 8000;
const SUPPRESSED_ROUTES = ["/audit", "/book-call", "/admin", "/auth"];

function isSuppressedRoute(): boolean {
  const path = window.location.pathname;
  return SUPPRESSED_ROUTES.some((r) => path.startsWith(r));
}

function isCurrentlySuppressed(): boolean {
  if (sessionStorage.getItem(SESSION_SHOWN_KEY)) return true;
  const last = localStorage.getItem(SUPPRESS_KEY);
  if (!last) return false;
  const hoursSince = (Date.now() - parseInt(last, 10)) / (1000 * 60 * 60);
  return hoursSince < SUPPRESS_HOURS;
}

export function ExitIntentModal() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const isFr = lang === "fr";
  const T = (en: string, fr: string) => (isFr ? fr : en);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isSuppressedRoute() || isCurrentlySuppressed()) return;

    let armed = false;
    const armTimer = setTimeout(() => {
      armed = true;
    }, MIN_DELAY_MS);

    // Desktop trigger: pointer leaves the top of the viewport
    const handlePointerLeave = (e: PointerEvent) => {
      if (!armed) return;
      if (e.clientY <= 0) {
        setOpen(true);
        sessionStorage.setItem(SESSION_SHOWN_KEY, "1");
      }
    };

    // Mobile trigger: scroll up past a threshold (back-button proxy)
    let lastScroll = window.scrollY;
    let scrollUpAccumulator = 0;
    const handleScroll = () => {
      if (!armed) return;
      if (window.scrollY > lastScroll) {
        scrollUpAccumulator = 0;
      } else {
        scrollUpAccumulator += lastScroll - window.scrollY;
      }
      lastScroll = window.scrollY;
      // If they scroll up 600px after being deep in the page, fire
      const scrollDepth = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollUpAccumulator > 600 && scrollDepth < 0.4 && scrollDepth > 0.05) {
        setOpen(true);
        sessionStorage.setItem(SESSION_SHOWN_KEY, "1");
        window.removeEventListener("scroll", handleScroll);
      }
    };

    document.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(armTimer);
      document.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem(SUPPRESS_KEY, String(Date.now()));
  };

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl border border-primary/30 bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6),0_0_40px_-8px_hsl(var(--primary)/0.4)] p-6 sm:p-8 animate-in slide-in-from-bottom-5 sm:zoom-in-95 duration-300">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
          aria-label={T("Close", "Fermer")}
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary mb-3 inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          {T("Before you go", "Avant de partir")}
        </div>
        <h2
          id="exit-intent-title"
          className="font-display text-3xl sm:text-4xl leading-tight tracking-tight mb-3"
        >
          {T(
            "1-page report on how AI engines see your business.",
            "Rapport 1 page sur comment les moteurs IA voient votre commerce.",
          )}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {T(
            "Free. No credit card. No discovery call. We pull your business through ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot, and email a 1-page summary within 24 hours.",
            "Gratuit. Aucune carte. Aucun appel de découverte. On pousse votre commerce dans ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot, et on envoie un résumé 1 page par courriel en 24 heures.",
          )}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <Button
            onClick={() => {
              navigate("/audit");
              handleClose();
            }}
            className="flex-1 rounded-full font-semibold group"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
            }}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {T("Run free audit", "Lancer l'audit gratuit")}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Button>
          <Button
            variant="outline"
            onClick={handleClose}
            className="rounded-full"
          >
            {T("No thanks", "Non merci")}
          </Button>
        </div>

        <div className="border-t border-border/40 pt-5">
          <p className="text-xs text-muted-foreground mb-3">
            {T(
              "Or just get the weekly newsletter:",
              "Ou recevez seulement l'infolettre hebdomadaire :",
            )}
          </p>
          <NewsletterSignup source="exit-intent" variant="compact" />
        </div>
      </div>
    </div>
  );
}
