import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Loader2, Share2, Copy, Check } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { SEOHead } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollReveal, MagneticWrapper } from "@/components/animation";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";

interface ScoreResult {
  url: string;
  city: string;
  total: number;
  dimensions: {
    technical: { score: number; finding: string };
    gbp: { score: number; finding: string };
    schema: { score: number; finding: string };
    citations: { score: number; finding: string };
    llmCitations: { score: number; finding: string };
  };
  topRecommendation: string;
  isLive: boolean;
}

const DIMENSION_LABELS = {
  technical: { en: "Technical foundation", fr: "Fondation technique" },
  gbp: { en: "Google Business Profile", fr: "Profil d'entreprise Google" },
  schema: { en: "Schema deployment", fr: "Déploiement schema" },
  citations: { en: "Citation density", fr: "Densité de citations" },
  llmCitations: { en: "LLM citation presence", fr: "Présence dans les citations LLM" },
};

function scoreBand(n: number): { label: { en: string; fr: string }; color: string } {
  if (n >= 80) return { label: { en: "Excellent", fr: "Excellent" }, color: "emerald" };
  if (n >= 60) return { label: { en: "Good", fr: "Bon" }, color: "primary" };
  if (n >= 40) return { label: { en: "Weak", fr: "Faible" }, color: "amber" };
  return { label: { en: "Critical", fr: "Critique" }, color: "rose" };
}

export default function AiVisibilityScoreTool() {
  const { lang: urlLang } = useParams<{ lang?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { lang, setLang } = useLang();

  const [url, setUrl] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (urlLang && SUPPORTED_LANGS.includes(urlLang as SupportedLang)) {
      setLang(urlLang as SupportedLang);
    }
  }, [urlLang, setLang]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-force-dark", "true");
    root.classList.add("dark");
    return () => {
      root.removeAttribute("data-force-dark");
      const stored = localStorage.getItem("theme");
      if (stored === "light") root.classList.remove("dark");
    };
  }, []);

  const isFr = lang === "fr";
  const T = (en: string, fr: string) => (isFr ? fr : en);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !city.trim()) {
      toast({
        title: T("Two fields needed", "Deux champs requis"),
        description: T(
          "Business website URL and city.",
          "URL du site web et ville.",
        ),
        variant: "destructive",
      });
      return;
    }
    setLoading(true);

    // Static sample used in two cases:
    //   1. The Cloudflare Pages Function is not running (Vite dev)
    //   2. The function ran but ANTHROPIC_API_KEY is not set (returns is_live: false)
    // Always tell the user when they're seeing a sample (the result panel shows a notice).
    const buildSample = (): ScoreResult => ({
      url: url.trim(),
      city: city.trim(),
      total: 47,
      dimensions: {
        technical: { score: 70, finding: T(
          "HTTPS in place. Mobile-first signals need verification.",
          "HTTPS en place. Signaux mobile-first à vérifier.",
        ) },
        gbp: { score: 45, finding: T(
          "Google Business Profile likely incomplete (categories, attributes, photos).",
          "Profil d'entreprise Google probablement incomplet (catégories, attributs, photos).",
        ) },
        schema: { score: 30, finding: T(
          "No FAQ or LocalBusiness schema detected. Major AEO gap.",
          "Aucun schema FAQ ou LocalBusiness détecté. Trou AEO majeur.",
        ) },
        citations: { score: 50, finding: T(
          "Some directory presence but NAP consistency not verified.",
          "Présence de quelques annuaires mais cohérence NAP non vérifiée.",
        ) },
        llmCitations: { score: 40, finding: T(
          "Currently underrepresented in AI search answers.",
          "Actuellement sous-représenté dans les réponses de recherche IA.",
        ) },
      },
      topRecommendation: T(
        "Deploy LocalBusiness + FAQ schema as the highest-ROI single move. AiLys Core tier handles this in week 1.",
        "Déployez le schema LocalBusiness + FAQ comme l'action unique au plus fort retour. Le forfait AiLys Core gère ça en semaine 1.",
      ),
      generatedAt: new Date().toISOString(),
      isLive: false,
    });

    try {
      const res = await fetch("/api/ai-visibility-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), city: city.trim() }),
      });
      if (!res.ok) {
        // 404 / 405 / 500 etc. — function not available in this environment.
        // Fall back to sample so the user still sees value.
        setResult(buildSample());
      } else {
        const data = (await res.json()) as ScoreResult;
        setResult(data);
      }
      setTimeout(() => {
        document
          .getElementById("score-result")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch {
      // Network error (fetch threw) — also fall back to sample
      setResult(buildSample());
      setTimeout(() => {
        document
          .getElementById("score-result")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    const url = window.location.href;
    const text = T(
      `My AI Visibility Score is ${result.total}/100. Test yours: ${url}`,
      `Mon score de visibilité IA est ${result.total}/100. Testez le vôtre : ${url}`,
    );
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const baseUrl = "https://www.ailysagency.ca";
  const canonical =
    lang === "en"
      ? `${baseUrl}/tools/ai-visibility-score`
      : `${baseUrl}/${lang}/tools/ai-visibility-score`;
  const alternates = SUPPORTED_LANGS.map((l) => ({
    hrefLang: l,
    href:
      l === "en"
        ? `${baseUrl}/tools/ai-visibility-score`
        : `${baseUrl}/${l}/tools/ai-visibility-score`,
  }));

  return (
    <>
      <SEOHead
        title={
          isFr
            ? "Score de visibilité IA gratuit · Testez votre commerce sur 6 moteurs IA · AiLys"
            : "Free AI Visibility Score · Test Your Business Across 6 AI Engines · AiLys"
        }
        description={
          isFr
            ? "Outil gratuit. Entrez votre URL et ville, recevez un score 0-100 sur 5 dimensions (technique, GBP, schema, citations, présence LLM). Aucune carte requise. Résultats en 30 secondes."
            : "Free tool. Enter your business URL and city, get a 0-100 score across 5 dimensions (technical, GBP, schema, citations, LLM presence). No card needed. 30-second results."
        }
        canonicalUrl={canonical}
        keywords={[
          "AI visibility score",
          "free AI SEO check",
          "ChatGPT visibility test",
          "AI search audit free",
          "test business in AI engines",
        ]}
        alternateLocales={alternates}
      />
      <NetworkBackground
        backgroundColor="#050505"
        nodeColor="#22D3EE"
        lineColor="#A78BFA"
        nodeCount={28}
        mobileNodeCount={16}
        connectionDistance={140}
        mouseInfluenceRadius={200}
        mouseInfluenceStrength={0.16}
      />

      <div className="min-h-screen overflow-x-clip">
        <Navbar />

        <main className="pt-24 pb-20 px-4">
          {/* Hero */}
          <section className="relative pb-12">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal variant="fade-up" delay={50} duration={650}>
                <div className="ailys-section-no mb-6">
                  <span>{T("Free tool", "Outil gratuit")}</span>
                </div>
                <h1
                  className="font-display tracking-tight leading-[0.95] mb-6 break-words"
                  style={{ fontSize: "clamp(2.25rem, 7vw, 4.5rem)" }}
                >
                  {T("Score your AI visibility", "Évaluez votre visibilité IA")}{" "}
                  <span className="italic bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
                    {T("in 30 seconds.", "en 30 secondes.")}
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10">
                  {T(
                    "Enter your business website and city. We score how visible you are inside ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot answers. No credit card. No email until you want the full report.",
                    "Entrez votre site web et votre ville. On évalue à quel point vous êtes visible dans les réponses de ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot. Aucune carte. Aucun courriel jusqu'à ce que vous vouliez le rapport complet.",
                  )}
                </p>
              </ScrollReveal>

              {/* Form */}
              <ScrollReveal variant="fade-up" delay={150} duration={700}>
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.06] via-secondary/[0.04] to-accent/[0.06] backdrop-blur-md p-6 sm:p-8"
                >
                  <div className="grid sm:grid-cols-[1fr_200px] gap-3 mb-3">
                    <Input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder={T(
                        "your-business.ca",
                        "votre-commerce.ca",
                      )}
                      className="h-12 text-base"
                      required
                      aria-label={T("Business URL", "URL du commerce")}
                    />
                    <Input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={T("Montreal", "Montréal")}
                      className="h-12 text-base"
                      required
                      aria-label={T("City", "Ville")}
                    />
                  </div>
                  <MagneticWrapper strength={0.1}>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="w-full h-12 rounded-full font-semibold group"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                        boxShadow: "0 0 24px -8px hsl(var(--primary) / 0.5)",
                      }}
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4 mr-2" />
                      )}
                      {loading
                        ? T("Scoring...", "Calcul...")
                        : T("Score my visibility", "Évaluer ma visibilité")}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </MagneticWrapper>
                  <p className="mt-4 text-xs text-muted-foreground text-center">
                    {T(
                      "No credit card. No email at this step. Results in under 10 seconds.",
                      "Aucune carte. Aucun courriel à cette étape. Résultats en moins de 10 secondes.",
                    )}
                  </p>
                </form>
              </ScrollReveal>
            </div>
          </section>

          {/* Result */}
          {result && (
            <section id="score-result" className="relative py-12">
              <div className="max-w-4xl mx-auto">
                <ScrollReveal variant="fade-up" delay={50} duration={700}>
                  <div className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md p-6 sm:p-10 mb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-2">
                          {T("Your AI Visibility Score", "Votre score de visibilité IA")}
                        </div>
                        <div className="font-mono text-xs text-muted-foreground/60">
                          {result.url} · {result.city}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 hover:border-primary/40 text-sm transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            {T("Copied", "Copié")}
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3.5 h-3.5" />
                            {T("Share score", "Partager")}
                          </>
                        )}
                      </button>
                    </div>

                    {/* Big total score */}
                    <div className="flex items-baseline gap-3 mb-2">
                      <span
                        className="font-display tabular-nums leading-none bg-gradient-to-br from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent"
                        style={{ fontSize: "clamp(4rem, 16vw, 9rem)" }}
                      >
                        {result.total}
                      </span>
                      <span className="font-mono text-xl text-muted-foreground/60">
                        / 100
                      </span>
                    </div>
                    <div className="font-mono text-xs uppercase tracking-[0.22em] text-primary mb-8">
                      {scoreBand(result.total).label[isFr ? "fr" : "en"]}
                    </div>

                    {/* Dimension breakdown */}
                    <div className="grid sm:grid-cols-2 gap-3 mb-8">
                      {Object.entries(result.dimensions).map(([key, dim]) => {
                        const label =
                          DIMENSION_LABELS[key as keyof typeof DIMENSION_LABELS];
                        const band = scoreBand(dim.score);
                        return (
                          <div
                            key={key}
                            className="rounded-xl border border-border/30 bg-background/30 p-4"
                          >
                            <div className="flex items-baseline justify-between gap-2 mb-2">
                              <span className="text-sm font-medium text-foreground/85">
                                {isFr ? label.fr : label.en}
                              </span>
                              <span className="font-display text-2xl tabular-nums">
                                {dim.score}
                              </span>
                            </div>
                            {/* Progress bar */}
                            <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden mb-2">
                              <div
                                className={`h-full rounded-full transition-all duration-700 ${
                                  band.color === "emerald"
                                    ? "bg-emerald-400"
                                    : band.color === "primary"
                                      ? "bg-primary"
                                      : band.color === "amber"
                                        ? "bg-amber-400"
                                        : "bg-rose-400"
                                }`}
                                style={{ width: `${dim.score}%` }}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground leading-snug">
                              {dim.finding}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Top recommendation */}
                    <div className="rounded-xl border border-primary/30 bg-primary/[0.04] p-5 mb-6">
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary mb-2">
                        {T("Top recommendation", "Recommandation principale")}
                      </div>
                      <p className="text-base leading-relaxed">
                        {result.topRecommendation}
                      </p>
                    </div>

                    {!result.isLive && (
                      <p className="text-xs text-amber-400/80 italic">
                        {T(
                          "Note: this score is a sample because the AI engine is not configured in this environment. The deployed version uses live Anthropic-powered scoring.",
                          "Note : ce score est un échantillon parce que le moteur IA n'est pas configuré dans cet environnement. La version déployée utilise un calcul en direct via Anthropic.",
                        )}
                      </p>
                    )}
                  </div>

                  {/* Upgrade CTA */}
                  <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.08] via-secondary/[0.05] to-accent/[0.08] backdrop-blur-md p-7">
                    <h2 className="font-display text-2xl sm:text-3xl mb-3 leading-tight">
                      {T(
                        "Want the full 90-day plan?",
                        "Voulez-vous le plan 90 jours complet?",
                      )}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {T(
                        "The free score above is the surface. Run the full AI Visibility Audit to get a complete report: schema gaps, citation targets, GBP optimization tasks, content priorities, weekly tracking setup. Free, 24-hour turnaround, by email.",
                        "Le score gratuit ci-dessus est la surface. Lancez l'audit complet de visibilité IA pour obtenir un rapport complet : trous de schema, cibles de citations, tâches GBP, priorités de contenu, configuration de suivi hebdomadaire. Gratuit, livré en 24 heures, par courriel.",
                      )}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={() =>
                          navigate("/audit", { state: { url: result.url, city: result.city } })
                        }
                        className="rounded-full font-semibold"
                        style={{
                          background:
                            "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                        }}
                      >
                        {T("Run full audit", "Lancer l'audit complet")}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate("/book-call")}
                        className="rounded-full"
                      >
                        {T("Book strategy call", "Réserver un appel")}
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </section>
          )}

          {/* What we score */}
          <section className="relative py-12">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal variant="fade-up" delay={50} duration={600}>
                <h2 className="font-display text-3xl sm:text-4xl leading-tight mb-8">
                  {T("What we measure", "Ce qu'on mesure")}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.entries(DIMENSION_LABELS).map(([key, label]) => {
                    const description: Record<string, { en: string; fr: string }> = {
                      technical: {
                        en: "HTTPS, mobile-first rendering, page speed signals, crawlability.",
                        fr: "HTTPS, rendu mobile en premier, vitesse de page, crawlabilité.",
                      },
                      gbp: {
                        en: "Google Business Profile completeness: categories, attributes, photos, posts.",
                        fr: "Complétude du Profil d'entreprise Google : catégories, attributs, photos, publications.",
                      },
                      schema: {
                        en: "FAQ, LocalBusiness, Service, Review, and HowTo schema markup deployment.",
                        fr: "Déploiement du balisage schema FAQ, LocalBusiness, Service, Review, HowTo.",
                      },
                      citations: {
                        en: "Presence and NAP consistency across 20+ high-DA directories.",
                        fr: "Présence et cohérence NAP sur 20+ annuaires à forte autorité.",
                      },
                      llmCitations: {
                        en: "How often AI engines (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot) currently cite your business.",
                        fr: "À quelle fréquence les moteurs IA (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot) citent actuellement votre entreprise.",
                      },
                    };
                    return (
                      <div
                        key={key}
                        className="rounded-xl border border-border/30 bg-card/30 backdrop-blur-md p-5"
                      >
                        <h3 className="font-display text-xl mb-2 leading-tight">
                          {isFr ? label.fr : label.en}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {isFr ? description[key].fr : description[key].en}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* sr-only SEO */}
          <div className="sr-only" aria-hidden="false">
            {T(
              "AiLys Free AI Visibility Score Tool. Enter your business website and city, receive a 0-100 score across 5 dimensions: technical foundation (HTTPS, mobile, page speed), Google Business Profile completeness, schema deployment (FAQ, LocalBusiness, Service, Review, HowTo), citation density across 20+ high-DA directories, and current LLM citation presence in ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot. No credit card. No email at this step. Results in under 10 seconds. Powered by Anthropic Claude API. Cached 24 hours per URL+city for cost efficiency. Run the full AI Visibility Audit for a complete 90-day plan.",
              "Outil gratuit AiLys de score de visibilité IA. Entrez votre site web et votre ville, recevez un score 0-100 sur 5 dimensions : fondation technique (HTTPS, mobile, vitesse), complétude du Profil d'entreprise Google, déploiement schema (FAQ, LocalBusiness, Service, Review, HowTo), densité de citations sur 20+ annuaires à forte autorité, et présence actuelle dans les citations LLM sur ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot. Aucune carte de crédit. Aucun courriel à cette étape. Résultats en moins de 10 secondes. Alimenté par l'API Anthropic Claude. Mis en cache 24 heures par URL+ville pour efficacité de coût. Lancez l'audit complet pour un plan 90 jours.",
            )}
          </div>
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
