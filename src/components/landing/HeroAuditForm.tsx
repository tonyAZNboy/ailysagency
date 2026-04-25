import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

/**
 * Inline audit form sitting where the hero CTAs used to be.
 * Three fields, one submit. Reduces friction vs. clicking through to /audit.
 */
export function HeroAuditForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [businessName, setBusinessName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !city || !email) {
      toast({
        title: "One small thing",
        description: "We need a business name, a city, and an email to run the audit.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      // TODO(audit-engine): wire to Supabase audit_requests table + n8n workflow
      await new Promise((r) => setTimeout(r, 900));
      toast({
        title: "Audit queued",
        description: "We will send your AI Visibility Score within 24 hours. Check your inbox.",
      });
      // Forward to /audit page where they can read more about what we do
      navigate("/audit", {
        state: { businessName, city, email, prefilled: true },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-primary/30 bg-card/50 backdrop-blur-xl p-4 sm:p-5 shadow-[0_0_40px_-12px_hsl(var(--primary)/0.35)]"
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/90 mb-3">
        Free AI Visibility Audit · 24-hour turnaround
      </div>
      <div className="grid sm:grid-cols-3 gap-2 mb-3">
        <Input
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="Business name"
          className="bg-background/60 border-border/60 focus-visible:ring-primary/50"
          required
          aria-label="Business name"
        />
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="bg-background/60 border-border/60 focus-visible:ring-primary/50"
          required
          aria-label="City"
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@business.ca"
          className="bg-background/60 border-border/60 focus-visible:ring-primary/50"
          required
          aria-label="Email"
        />
      </div>
      <Button
        type="submit"
        disabled={submitting}
        size="lg"
        className="w-full rounded-full font-semibold text-sm sm:text-base group"
        style={{
          boxShadow:
            "0 0 24px hsl(var(--primary) / 0.4), 0 0 48px hsl(var(--secondary) / 0.2)",
          background:
            "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
        }}
      >
        {submitting ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
        ) : (
          <Search className="w-4 h-4 mr-2" aria-hidden="true" />
        )}
        {submitting ? "Queueing your audit..." : "Run my AI Visibility Audit"}
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
      <p className="mt-2.5 text-[11px] text-muted-foreground/70 text-center font-mono uppercase tracking-[0.18em]">
        No credit card. Results in 24 hours. We hate spam too.
      </p>
    </form>
  );
}
