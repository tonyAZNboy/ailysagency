import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/i18n/LangContext";

interface NewsletterSignupProps {
  /** Where this component is placed: "footer" | "exit-intent" | "blog-end" | "audit-result" | etc. */
  source: string;
  /** Visual variant */
  variant?: "compact" | "card";
  /** Optional override headline (defaults to standard pitch) */
  headline?: string;
  className?: string;
}

/**
 * Newsletter signup with double-opt-in confirmation handled server-side.
 *
 * Security:
 *  - Honeypot field traps bots
 *  - Disposable-email blocked server-side
 *  - Rate-limited via Cloudflare WAF
 *  - CSRF-light: origin check on the server function
 *
 * Long-term plan: track source attribution for cohort analysis (which channel
 * drives the most engaged subscribers). Source is passed straight to the API.
 */
export function NewsletterSignup({
  source,
  variant = "card",
  headline,
  className = "",
}: NewsletterSignupProps) {
  const { lang } = useLang();
  const { toast } = useToast();
  const isFr = lang === "fr";
  const T = (en: string, fr: string) => (isFr ? fr : en);

  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState(""); // bot trap
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          honeypot,
          source,
          lang,
        }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error ?? "Subscription failed");
      }
      setDone(true);
    } catch (err) {
      toast({
        title: T("Subscription failed", "Échec de l'inscription"),
        description:
          err instanceof Error
            ? err.message
            : T(
                "Try again or email us directly.",
                "Réessayez ou écrivez-nous directement.",
              ),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div
        className={`rounded-xl border border-emerald-500/30 bg-emerald-500/[0.04] p-5 ${className}`}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-display text-lg leading-tight mb-1">
              {T("You're subscribed.", "Vous êtes inscrit.")}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {T(
                "Check your inbox for a confirmation email. First weekly digest arrives Monday.",
                "Vérifiez votre boîte de réception pour le courriel de confirmation. Le premier résumé hebdomadaire arrive lundi.",
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={`space-y-2 ${className}`}>
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
        <div className="flex gap-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={T("you@business.ca", "vous@commerce.ca")}
            className="h-10 text-sm flex-1"
            required
            aria-label="Email"
          />
          <Button
            type="submit"
            size="sm"
            disabled={loading}
            className="rounded-full font-semibold"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
            }}
          >
            {loading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5" />
            )}
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground/70">
          {T(
            "No spam. One email per week. Unsubscribe in 1 click.",
            "Pas de spam. Un courriel par semaine. Désabonnement en 1 clic.",
          )}
        </p>
      </form>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.06] via-secondary/[0.04] to-accent/[0.06] backdrop-blur-md p-6 sm:p-7 ${className}`}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary mb-3">
        {T("Weekly newsletter", "Infolettre hebdomadaire")}
      </div>
      <h3 className="font-display text-2xl sm:text-3xl mb-3 leading-tight">
        {headline ??
          T(
            "3 brands cited in ChatGPT this week. Every Monday.",
            "3 marques citées par ChatGPT cette semaine. Chaque lundi.",
          )}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
        {T(
          "Each Monday we share 3 local businesses that got named inside AI search answers, the exact signals that earned the citation, and one tactical move you can copy. No fluff.",
          "Chaque lundi on partage 3 commerces locaux qui ont été nommés dans les réponses IA, les signaux exacts qui ont mérité la citation, et une action tactique à copier. Pas de remplissage.",
        )}
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Honeypot — invisible to humans, bots fill it */}
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          name="company"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={T("you@business.ca", "vous@commerce.ca")}
            className="h-11 text-base flex-1"
            required
            aria-label="Email"
          />
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="rounded-full font-semibold group"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
            }}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            {T("Subscribe", "S'abonner")}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground/70">
          {T(
            "No spam. One email per week. Unsubscribe in 1 click. We never sell or share your email.",
            "Pas de spam. Un courriel par semaine. Désabonnement en 1 clic. Nous ne vendons ni ne partageons jamais votre courriel.",
          )}
        </p>
      </form>
    </div>
  );
}
