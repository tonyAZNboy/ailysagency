import { Loader2, Brain, Sparkles, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LangContext";

/**
 * Full-screen processing modal displayed while the audit is running.
 *
 * Why: when the user submits from the homepage hero, navigates to /audit,
 * and an auto-run kicks in from useEffect, there is a 5-10 second window
 * during which the only loading signal is a small spinner inside the
 * submit button. Users perceive that as "nothing happening" and bounce.
 *
 * This modal:
 *  - blocks interaction (backdrop)
 *  - centers a clear "Analyse en cours" card
 *  - rotates 3 status messages so the user perceives progress
 *  - only renders when `open === true` (loading state from AutoAuditEngine)
 */
interface Props {
  open: boolean;
}

export function AuditProcessingModal({ open }: Props) {
  const { t, lang } = useLang();
  const [step, setStep] = useState(0);

  const isFr = lang === "fr";
  const labels = isFr
    ? {
        title: "Analyse en cours",
        subtitle: "Scan de 6 moteurs IA. 30 a 60 secondes typiquement.",
        steps: [
          { icon: Brain, text: "Verification ChatGPT et Perplexity..." },
          { icon: BarChart3, text: "Mesure des signaux AEO et GEO..." },
          { icon: Sparkles, text: "Projection face aux concurrents..." },
        ],
        warning: "Ne ferme pas cette fenetre. Le rapport apparait quand l'analyse est terminee.",
      }
    : {
        title: "Analysis in progress",
        subtitle: "Scanning 6 AI engines. Typically 30 to 60 seconds.",
        steps: [
          { icon: Brain, text: "Probing ChatGPT and Perplexity..." },
          { icon: BarChart3, text: "Measuring AEO and GEO signals..." },
          { icon: Sparkles, text: "Projecting position vs competitors..." },
        ],
        warning: "Keep this window open. The report appears once the analysis completes.",
      };

  useEffect(() => {
    if (!open) {
      setStep(0);
      return;
    }
    const id = setInterval(() => {
      setStep((s) => (s + 1) % labels.steps.length);
    }, 2500);
    return () => clearInterval(id);
  }, [open, labels.steps.length]);

  if (!open) return null;

  const ActiveIcon = labels.steps[step].icon;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="audit-processing-title"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 bg-background/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-primary/30 bg-card/95 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_60px_-15px_hsl(var(--primary)/0.6)]"
      >
        {/* Brand gradient accent bar */}
        <div
          className="absolute inset-x-0 top-0 h-1 rounded-t-2xl"
          style={{ background: "linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--primary)))" }}
          aria-hidden="true"
        />

        <div className="flex justify-center mb-5">
          <div className="relative">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <ActiveIcon className="w-5 h-5 text-secondary" />
            </div>
          </div>
        </div>

        <h2
          id="audit-processing-title"
          className="font-display text-2xl sm:text-3xl text-center tracking-tight mb-2 leading-tight"
        >
          {labels.title}
        </h2>
        <p className="text-sm text-muted-foreground text-center leading-relaxed mb-5">
          {labels.subtitle}
        </p>

        <div className="rounded-xl border border-border/40 bg-background/40 p-4 space-y-2 mb-5">
          {labels.steps.map((s, i) => {
            const Icon = s.icon;
            const active = i === step;
            const done = i < step;
            return (
              <div
                key={i}
                className={`flex items-center gap-3 text-xs transition-colors ${
                  active
                    ? "text-foreground"
                    : done
                    ? "text-muted-foreground/60 line-through"
                    : "text-muted-foreground/40"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 flex-shrink-0 ${
                    active ? "text-secondary animate-pulse" : ""
                  }`}
                />
                <span className="leading-snug">{s.text}</span>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-center text-muted-foreground/70 font-mono uppercase tracking-[0.18em]">
          {labels.warning}
        </p>

        {/* Aria live region for screen readers */}
        <div className="sr-only" aria-live="polite">
          {labels.steps[step].text}
        </div>
      </div>
    </div>
  );
}
