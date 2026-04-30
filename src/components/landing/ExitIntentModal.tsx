import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LangContext";
import { NewsletterSignup } from "./NewsletterSignup";

/**
 * Exit-intent modal.
 *
 * Phase E.21 sensitivity tuning (operator complaint: "trop sensible, agacant"):
 *  - Desktop trigger now requires fast upward velocity (>= 200 px/s) AND
 *    user has scrolled past 25% of page (engagement signal). Position-only
 *    `clientY <= 0` was firing on routine cursor moves to URL bar / browser
 *    tabs / dev tools, which happens dozens of times per session.
 *  - Mobile scroll-up trigger REMOVED. Reading back up the page is not
 *    exit intent. Mobile users close tab via the gesture, which never
 *    fires `pointerleave` anyway, so the scroll heuristic produced
 *    almost only false positives.
 *  - MIN_DELAY_MS bumped 8s -> 60s. Pages take longer than 8s to read.
 *  - SUPPRESS_HOURS bumped 24h -> 7 days. Once dismissed, leave them alone.
 *  - SUPPRESSED_ROUTES expanded to include every conversion / pricing
 *    page where the visitor is already engaged.
 *
 * Suppression rules (post-tuning):
 *  - Never show twice in same session (sessionStorage)
 *  - Never show within 7 days of last dismissal (localStorage timestamp)
 *  - Never show on funnel / pricing / contact / admin / auth routes
 *  - Never show in first 60 seconds (give the page real reading time)
 *
 * Long-term: A/B test variants (newsletter vs full audit CTA vs founding-clients).
 */

const SUPPRESS_KEY = "ailys_exit_intent_dismissed_at";
const SESSION_SHOWN_KEY = "ailys_exit_intent_session_shown";
const SUPPRESS_HOURS = 24 * 7; // 7 days
const MIN_DELAY_MS = 60_000; // 60 seconds
const MIN_SCROLL_DEPTH = 0.25; // user must have engaged 25% of the page
const MIN_EXIT_VELOCITY_PX_PER_SEC = 200; // require fast upward gesture
const SUPPRESSED_ROUTES = [
  "/audit",
  "/book-call",
  "/admin",
  "/auth",
  // Phase E.21: visitors already in pricing / contact / founding-clients
  // funnel are engaged; exit intent here would be pure noise.
  "/contact",
  "/contacte",
  "/lien-he",
  "/pricing-details",
  "/forfaits-complets",
  "/founding-clients",
  "/quote",
];

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

    // Track upward velocity so we only fire on a fast, decisive gesture
    // toward the browser chrome (URL bar / close button), not on routine
    // cursor moves to the top of the viewport.
    let lastY = -1;
    let lastT = 0;

    function getScrollDepth(): number {
      const denom = document.body.scrollHeight - window.innerHeight;
      if (denom <= 0) return 0;
      return window.scrollY / denom;
    }

    const handlePointerMove = (e: PointerEvent) => {
      lastY = e.clientY;
      lastT = performance.now();
    };

    const handlePointerLeave = (e: PointerEvent) => {
      if (!armed) return;
      // Must leave through the top edge.
      if (e.clientY > 0) return;
      // Engagement gate: user must have scrolled at least 25% of the page.
      // A user who hasn't scrolled is bouncing, and an exit-intent modal
      // shown to a bouncer is interpreted as a popup ad, not a save attempt.
      if (getScrollDepth() < MIN_SCROLL_DEPTH) return;
      // Velocity gate: must be a fast upward gesture (>= 200 px/s).
      if (lastY > 0 && lastT > 0) {
        const dy = lastY - e.clientY; // positive = moving up
        const dt = (performance.now() - lastT) / 1000;
        const velocity = dt > 0 ? dy / dt : 0;
        if (velocity < MIN_EXIT_VELOCITY_PX_PER_SEC) return;
      } else {
        // No prior pointermove sample (e.g. cursor never on page) -> do
        // not fire. Better to miss a real exit than false-positive.
        return;
      }
      setOpen(true);
      sessionStorage.setItem(SESSION_SHOWN_KEY, "1");
    };

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);

    // Mobile scroll-up trigger removed in Phase E.21. Reading back up the
    // page is not exit intent; closing a tab on mobile does not fire
    // `pointerleave`. The previous heuristic produced almost only false
    // positives. If we reintroduce a mobile trigger, it should be tied
    // to the visibility-change API on tab hide, not scroll direction.

    return () => {
      clearTimeout(armTimer);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
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
