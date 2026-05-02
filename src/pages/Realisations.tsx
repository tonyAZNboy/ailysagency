import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ArrowRight,
  Layers,
  MapPin,
  ExternalLink,
  Filter,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { MoodBackground } from "@/components/backgrounds/MoodBackground";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";
import {
  getMood,
  moodList,
  type MoodId,
} from "@/design-system/moods";
import { portfolioSamples } from "@/data/portfolio-samples";
import { industries, type IndustrySlug } from "@/data/industries";

/**
 * /realisations
 *
 * Web-design portfolio scaffold. Catalog of upcoming demo client
 * sites that will live at <slug>.demo.ailysagency.ca once the
 * ailys-client-sites repo ships (per design-system inventory phase
 * C). Each card shows the mood + vertical + tier + planned launch.
 *
 * For now (May 2026), all demoUrl are null = "Coming soon" badge.
 * Once each sample ships, the card auto-flips to "View live demo".
 *
 * Filters: vertical, mood, tier. Lets prospects find their archetype
 * fast.
 *
 * Mood for this catalog page itself: chaleureux-artisan (warm, suits
 * a "browse our work" feel). The cards inside use their per-sample
 * mood gradient as the visual signature.
 */

type TierFilter = "all" | "starter" | "core" | "growth" | "agency";
type VerticalFilter = "all" | IndustrySlug;
type MoodFilter = "all" | MoodId;

const TIER_LABELS: Record<Exclude<TierFilter, "all">, { en: string; fr: string }> = {
  starter: { en: "Starter (5 pages)", fr: "Starter (5 pages)" },
  core: { en: "Core (10 pages)", fr: "Core (10 pages)" },
  growth: { en: "Growth (20 pages)", fr: "Growth (20 pages)" },
  agency: { en: "Agency (multi-site)", fr: "Agency (multi-site)" },
};

export default function Realisations() {
  const { lang: urlLang } = useParams<{ lang?: string }>();
  const { lang, setLang } = useLang();

  useEffect(() => {
    if (urlLang && SUPPORTED_LANGS.includes(urlLang as SupportedLang)) {
      setLang(urlLang as SupportedLang);
    }
  }, [urlLang, setLang]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-force-dark", "true");
    root.classList.add("dark");
    return () => root.removeAttribute("data-force-dark");
  }, []);

  const isFr = lang === "fr";
  const T = (en: string, fr: string) => (isFr ? fr : en);
  const pageMood = getMood("chaleureux-artisan");

  const [tierFilter, setTierFilter] = useState<TierFilter>("all");
  const [verticalFilter, setVerticalFilter] = useState<VerticalFilter>("all");
  const [moodFilter, setMoodFilter] = useState<MoodFilter>("all");

  const filtered = useMemo(() => {
    return portfolioSamples.filter((s) => {
      if (tierFilter !== "all" && s.tier !== tierFilter) return false;
      if (verticalFilter !== "all" && s.vertical !== verticalFilter) return false;
      if (moodFilter !== "all" && s.mood !== moodFilter) return false;
      return true;
    });
  }, [tierFilter, verticalFilter, moodFilter]);

  const reset = () => {
    setTierFilter("all");
    setVerticalFilter("all");
    setMoodFilter("all");
  };

  return (
    <>
      <Helmet>
        <title>
          {T(
            "Web-design portfolio: Quebec PME demo sites by mood + vertical | AiLys",
            "Portfolio web design: sites demo PME quebecoises par mood + verticale | AiLys",
          )}
        </title>
        <meta
          name="description"
          content={T(
            "AiLys Agency web-design portfolio. Demo client sites by industry vertical, design mood, and tier (5/10/20 pages). Quebec-built, bilingual, AI-search optimized.",
            "Portfolio web design AiLys Agency. Sites client demo par verticale, mood de design et forfait (5/10/20 pages). Bati au Quebec, bilingue, optimise pour la recherche IA.",
          )}
        />
        <link rel="canonical" href="https://www.ailysagency.ca/realisations" />
      </Helmet>

      <MoodBackground mood={pageMood} />

      <div className="min-h-screen overflow-x-hidden">
        <Navbar />

        <main className="pt-28 pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <Link
              to={isFr ? "/fr" : "/"}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/70 hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {T("Home", "Accueil")}
            </Link>

            <header className="mb-12">
              <div className="ailys-section-no mb-6">
                <span>{T("Web design portfolio", "Portfolio web design")}</span>
              </div>
              <div className="flex items-start gap-4 mb-6">
                <div className={`hidden sm:flex flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${pageMood.accentGradient} items-center justify-center shadow-xl`}>
                  <Layers className="w-7 h-7 text-background" />
                </div>
                <div className="flex-1">
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-4">
                    {T("Same system.", "Meme systeme.")}
                    <br />
                    <span className={`italic bg-gradient-to-r ${pageMood.accentGradient} bg-clip-text text-transparent`}>
                      {T("Different personality.", "Personnalite differente.")}
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    {T(
                      "Demo client sites built on the AiLys Design System. 6 visual moods x 9 industry archetypes x 4 tier depths (5, 10, 20 pages, multi-site). Browse by vertical, by mood, or by tier to find what fits your business. Each demo will live at its own subdomain once shipped (planned launch dates below).",
                      "Sites client demo batis sur le AiLys Design System. 6 moods visuels x 9 archetypes industrie x 4 profondeurs de forfait (5, 10, 20 pages, multi-site). Parcourez par verticale, par mood ou par forfait pour trouver ce qui correspond a votre entreprise. Chaque demo vivra a son propre sous-domaine une fois lance (dates de lancement prevues ci-dessous).",
                    )}
                  </p>
                </div>
              </div>
            </header>

            {/* Filters */}
            <div className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md p-5 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-primary" />
                <span className="text-xs font-mono uppercase tracking-[0.18em] text-primary">
                  {T("Filter the catalog", "Filtrer le catalogue")}
                </span>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    {T("Vertical", "Verticale")}
                  </label>
                  <select
                    value={verticalFilter}
                    onChange={(e) => setVerticalFilter(e.target.value as VerticalFilter)}
                    className="w-full text-sm bg-background/60 border border-border/50 rounded-lg px-3 py-2"
                  >
                    <option value="all">{T("All verticals", "Toutes les verticales")}</option>
                    {industries.map((ind) => (
                      <option key={ind.slug} value={ind.slug}>
                        {ind.emoji} {isFr ? ind.nameLong : ind.nameLong}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    {T("Mood", "Mood")}
                  </label>
                  <select
                    value={moodFilter}
                    onChange={(e) => setMoodFilter(e.target.value as MoodFilter)}
                    className="w-full text-sm bg-background/60 border border-border/50 rounded-lg px-3 py-2"
                  >
                    <option value="all">{T("All moods", "Tous les moods")}</option>
                    {moodList.map((m) => (
                      <option key={m.id} value={m.id}>
                        {isFr ? m.labelFr : m.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    {T("Tier", "Forfait")}
                  </label>
                  <select
                    value={tierFilter}
                    onChange={(e) => setTierFilter(e.target.value as TierFilter)}
                    className="w-full text-sm bg-background/60 border border-border/50 rounded-lg px-3 py-2"
                  >
                    <option value="all">{T("All tiers", "Tous les forfaits")}</option>
                    {(Object.keys(TIER_LABELS) as Array<Exclude<TierFilter, "all">>).map((t) => (
                      <option key={t} value={t}>
                        {isFr ? TIER_LABELS[t].fr : TIER_LABELS[t].en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {filtered.length} {T("of", "de")} {portfolioSamples.length}{" "}
                  {T("samples shown", "samples affiches")}
                </span>
                {(tierFilter !== "all" || verticalFilter !== "all" || moodFilter !== "all") && (
                  <button
                    type="button"
                    onClick={reset}
                    className="text-xs text-primary hover:underline"
                  >
                    {T("Reset filters", "Reinitialiser")}
                  </button>
                )}
              </div>
            </div>

            {/* Catalog grid */}
            <section className="mb-16">
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md p-10 text-center">
                  <p className="text-sm text-muted-foreground">
                    {T(
                      "No samples match these filters yet. Reset to see all 9 demos in the pipeline.",
                      "Aucun sample ne correspond a ces filtres pour l'instant. Reinitialisez pour voir les 9 demos en pipeline.",
                    )}
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map((s) => {
                    const sampleMood = getMood(s.mood);
                    const industry = industries.find((i) => i.slug === s.vertical);
                    return (
                      <article
                        key={s.slug}
                        className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md overflow-hidden flex flex-col"
                      >
                        {/* Visual signature header (mood gradient strip) */}
                        <div className={`h-3 bg-gradient-to-r ${sampleMood.accentGradient}`} />

                        <div className="p-5 sm:p-6 flex-1 flex flex-col">
                          {/* Vertical + mood meta */}
                          <div className="flex items-center justify-between mb-3 text-[10px] font-mono uppercase tracking-[0.18em]">
                            <span className="text-muted-foreground/80 flex items-center gap-1.5">
                              <span aria-hidden="true">{industry?.emoji}</span>
                              {industry?.name ?? s.vertical}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${sampleMood.accentGradient} text-background text-[9px] font-bold`}>
                              {isFr ? sampleMood.labelFr : sampleMood.label}
                            </span>
                          </div>

                          {/* Name */}
                          <h3 className="font-display text-xl leading-tight mb-1">
                            {T(s.nameEn, s.nameFr)}
                          </h3>

                          {/* City + tier */}
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {T(s.cityEn, s.cityFr)}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Layers className="w-3 h-3" />
                              {isFr ? TIER_LABELS[s.tier].fr : TIER_LABELS[s.tier].en}
                            </span>
                          </div>

                          {/* Pitch */}
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                            {T(s.pitchEn, s.pitchFr)}
                          </p>

                          {/* Status footer */}
                          <div className="mt-auto pt-4 border-t border-border/30">
                            {s.demoUrl ? (
                              <a
                                href={s.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${sampleMood.accentGradient} bg-clip-text text-transparent hover:underline`}
                              >
                                {T("View live demo", "Voir la demo")}
                                <ExternalLink className="w-3.5 h-3.5 text-primary" />
                              </a>
                            ) : (
                              <div className="flex items-center justify-between text-xs">
                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-200">
                                  <Sparkles className="w-3 h-3" />
                                  {T("Coming soon", "Bientot")}
                                </span>
                                <span className="font-mono uppercase tracking-wider text-muted-foreground/70">
                                  {T("Launch", "Lancement")} {s.plannedLaunch}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Why mood + vertical matter */}
            <section className="mb-16">
              <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-10">
                <h2 className="font-display text-2xl sm:text-3xl mb-4">
                  {T("Why one system, six personalities?", "Pourquoi un seul systeme, six personnalites?")}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  {T(
                    "A dental clinic, a sushi counter, and a luxury hotel should NOT feel like the same website with the colors swapped. They serve different customers, in different mental states, with different expectations of trust. Our design system ships one technical foundation (shared components, tokens, accessibility, performance) and six visual moods that change the feel completely.",
                    "Une clinique dentaire, un comptoir a sushis et un hotel de luxe ne devraient PAS se ressentir comme le meme site avec les couleurs changees. Ils servent des clients differents, dans des etats mentaux differents, avec des attentes de confiance differentes. Notre design system livre une fondation technique (composants partages, tokens, accessibilite, performance) et six moods visuels qui changent completement le ressenti.",
                  )}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {T(
                    "Result for you: production speed of a templated agency (we ship a complete site in 7 to 14 business days) with the visual differentiation of a custom agency (each site has its own personality). Our cost stays low, your site stays distinctive.",
                    "Resultat pour vous: vitesse de production d'une agence templatisee (nous livrons un site complet en 7 a 14 jours ouvrables) avec la differenciation visuelle d'une agence sur mesure (chaque site a sa propre personnalite). Notre cout reste bas, votre site reste distinctif.",
                  )}
                </p>
              </div>
            </section>

            {/* CTA */}
            <section className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 backdrop-blur-md p-6 sm:p-10 text-center">
              <h2 className="font-display text-2xl sm:text-3xl mb-3">
                {T(
                  "Want to see your archetype come to life?",
                  "Vous voulez voir votre archetype prendre vie?",
                )}
              </h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
                {T(
                  "Book a 30-minute strategy call. We'll walk through the demo most relevant to your vertical, mock your home page hero with your real brand colors and content, and quote the build cost based on your tier (5, 10, or 20 pages).",
                  "Reservez un appel strategique de 30 minutes. Nous parcourrons la demo la plus pertinente pour votre verticale, simulerons l'entete de votre page d'accueil avec vos vraies couleurs et votre vrai contenu, et chiffrerons le cout de construction selon votre forfait (5, 10 ou 20 pages).",
                )}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  asChild
                  size="lg"
                  className={`bg-gradient-to-r ${pageMood.accentGradient} text-background hover:opacity-90`}
                >
                  <Link to={isFr ? "/fr/book-call" : "/book-call"}>
                    {T("Book a strategy call", "Reserver un appel strategique")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to={isFr ? "/fr/forfaits-complets" : "/forfaits-complets"}>
                    {T("See pricing", "Voir les prix")}
                  </Link>
                </Button>
              </div>
            </section>
          </div>
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
