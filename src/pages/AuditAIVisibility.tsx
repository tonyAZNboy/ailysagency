import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/i18n/LangContext";
import { SEOHead } from "@/components/seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowRight,
  Bot,
  Search,
  ShieldCheck,
  Sparkles,
  MessageSquareQuote,
  Star,
  Globe,
  Brain,
} from "lucide-react";

/**
 * STUB — AI Visibility Audit page.
 *
 * This is the new primary audit. Full audit engine will:
 *   1. Take business name + city + service vertical
 *   2. Query ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot
 *      for "best [service] in [city]" type prompts
 *   3. Score AEO / GEO / E-E-A-T signals from public data:
 *      - Schema markup (FAQ, Review, LocalBusiness, HowTo)
 *      - GBP completeness + recency
 *      - Citation density (Yelp, BBB, industry directories)
 *      - Author bylines, real photos, first-hand experience markers
 *      - Entity authority (Wikipedia, Wikidata, knowledge graph)
 *   4. Return a 0-100 score per dimension + 90-day action plan
 *
 * For beta: capture lead, send manual audit within 24h.
 * Cross-sell to GBP audit at completion.
 *
 * TODO(audit-engine): replace mock submit with real audit pipeline.
 */
export default function AuditAIVisibility() {
  const { t } = useLang();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [businessName, setBusinessName] = useState("");
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !city || !email) {
      toast({
        title: "Missing info",
        description: "We need at least business name, city, and email.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      // TODO: wire to Supabase audit_requests table + n8n workflow
      await new Promise((r) => setTimeout(r, 1200));
      setSubmitted(true);
      toast({
        title: "Audit queued",
        description: "We'll send your AI Visibility Score within 24 hours.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SEOHead
        title="AI Visibility Audit — AEO, GEO & E-E-A-T Score | Reviuzy"
        description="Free audit: see if ChatGPT, Perplexity, Claude, Gemini, and Google AIO cite your local business. Get your AEO / GEO / E-E-A-T score and a 90-day action plan."
      />
      <NetworkBackground />
      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-20">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              AI Visibility Audit
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Are you cited by{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ChatGPT, Perplexity & Google AIO?
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            We run your business through 6 AI search engines, score your AEO /
            GEO / E-E-A-T signals, and send you a 90-day action plan. Free.
          </p>
        </div>

        {/* What we check */}
        <div className="grid sm:grid-cols-3 gap-3 mb-10 max-w-4xl mx-auto">
          <CheckCard
            icon={<Bot className="w-4 h-4" />}
            label="LLM Citations"
            desc="ChatGPT · Perplexity · Claude · Gemini · Google AIO · Bing Copilot"
          />
          <CheckCard
            icon={<MessageSquareQuote className="w-4 h-4" />}
            label="AEO + GEO Signals"
            desc="Schema markup · entity authority · structured Q&A · citation density"
          />
          <CheckCard
            icon={<ShieldCheck className="w-4 h-4" />}
            label="E-E-A-T Score"
            desc="First-hand experience · expertise · authority · trust signals"
          />
        </div>

        {/* Form / success state */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField label="Business name *">
                <Input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Clinique Dentaire Plateau"
                  required
                />
              </FormField>
              <FormField label="City *">
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Montréal"
                  required
                />
              </FormField>
              <FormField label="Primary service">
                <Input
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder="Dentist accepting new patients"
                />
              </FormField>
              <FormField label="Email *">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.ca"
                  required
                />
              </FormField>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full text-base font-semibold py-6 rounded-full"
              style={{
                boxShadow:
                  "0 0 24px hsl(var(--primary) / 0.35), 0 0 48px hsl(var(--primary) / 0.18)",
                background:
                  "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
              }}
            >
              <Search className="w-5 h-5 mr-2" />
              {submitting ? "Queuing your audit…" : "Run my AI Visibility Audit"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-xs text-center text-muted-foreground/60">
              Free · No credit card · Score delivered within 24 hours
            </p>
          </form>
        ) : (
          <div className="max-w-2xl mx-auto rounded-2xl border border-primary/30 bg-card/60 backdrop-blur-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 mb-4">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Audit queued.</h2>
            <p className="text-muted-foreground mb-6">
              We will query 6 AI search engines, score your signals, and email
              you a full report. Usually within 24 hours.
            </p>

            {/* Cross-sell to GBP Pulse + strategy call */}
            <div className="grid sm:grid-cols-2 gap-3 text-left">
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/90 mb-1.5">
                  Want a faster snapshot?
                </div>
                <h3 className="font-display text-lg mb-1.5 leading-tight">
                  GBP Pulse, 90 seconds.
                </h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  Score your Google Business Profile across 10 signals. Instant,
                  no email.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/audit/gbp")}
                  className="rounded-full border-primary/40 hover:bg-primary/10 text-xs"
                >
                  <Star className="w-3.5 h-3.5 mr-1.5" />
                  Run the GBP Pulse
                </Button>
              </div>
              <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-secondary/90 mb-1.5">
                  Want a human walkthrough?
                </div>
                <h3 className="font-display text-lg mb-1.5 leading-tight">
                  Strategy call, 60 minutes.
                </h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  Bilingual EN, FR-CA, ES, ZH, AR, RU, UK, SR. Free, no pitch.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/book-call")}
                  className="rounded-full border-secondary/40 hover:bg-secondary/10 text-xs"
                >
                  <Globe className="w-3.5 h-3.5 mr-1.5" />
                  Book a call
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Below the fold — what's included */}
        <div className="mt-14 max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-5 text-center">
            What's in your audit
          </h2>
          <div className="grid gap-3">
            <DetailRow
              label="LLM citation map"
              desc="Side-by-side test of ChatGPT, Perplexity, Claude, Gemini, Google AIO and Bing Copilot for 5 high-intent prompts in your service + city."
            />
            <DetailRow
              label="AEO score (0-100)"
              desc="Answer Engine Optimization: schema markup completeness, structured Q&A, scannable formatting, entity disambiguation."
            />
            <DetailRow
              label="GEO score (0-100)"
              desc="Generative Engine Optimization: authoritative publications, Wikipedia/Wikidata presence, forum signals, digital PR footprint."
            />
            <DetailRow
              label="E-E-A-T audit"
              desc="Experience, Expertise, Authoritativeness, Trust — verified by author bylines, first-hand photos, original data, credential signals."
            />
            <DetailRow
              label="90-day action plan"
              desc="Prioritized list of fixes, content gaps, schema additions and citation targets — with effort estimates and expected lift."
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */

function CheckCard({
  icon,
  label,
  desc,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm p-4">
      <div className="flex items-center gap-2 mb-2 text-primary">
        {icon}
        <span className="text-xs font-mono uppercase tracking-wider font-semibold">
          {label}
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground mb-1.5 block">
        {label}
      </span>
      {children}
    </label>
  );
}

function DetailRow({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="rounded-xl border border-border/40 bg-muted/10 backdrop-blur-sm p-4">
      <h3 className="text-sm font-semibold mb-1">{label}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
