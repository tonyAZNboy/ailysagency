import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Star,
  Clock,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { MoodBackground } from "@/components/backgrounds/MoodBackground";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";
import { getMood } from "@/design-system/moods";

/**
 * /garantie
 *
 * Performance Guarantee positioning page. Risk-reversed conversion
 * tool. Each guarantee is conditional on (a) being a metric AiLys
 * controls (GBP optimization, AI Visibility) NOT a metric Google
 * controls (organic ranking), and (b) the client cooperating during
 * onboarding.
 *
 * Why this exists per session strategy: doubles tunnel conversion by
 * removing the "what if it doesn't work?" objection. Safe for AiLys
 * because conditions guarantee we never owe a refund unless we
 * underperformed AND client cooperated.
 *
 * Mood: clean-medical (precision, trust, contractual feel).
 */

export default function Garantie() {
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
  const mood = getMood("clean-medical");

  const guarantees = [
    {
      titleEn: "GBP optimization, perfect score in 30 days",
      titleFr: "Optimisation GBP, score parfait en 30 jours",
      promiseEn: "Your Google Business Profile reaches the published optimization checklist (categories, attributes, photos, posts, Q&A, NAP) within 30 days. If we don't deliver, your second month is free.",
      promiseFr: "Votre fiche Google Business Profile atteint la liste d'optimisation publiee (categories, attributs, photos, publications, Q&R, NAP) dans les 30 jours. Si nous ne livrons pas, votre deuxieme mois est gratuit.",
      whyEn: "We control 100% of GBP optimization (categories, attributes, posts, Q&A). The only blocker is client cooperation on photo upload and verification.",
      whyFr: "Nous controlons 100 % de l'optimisation GBP (categories, attributs, publications, Q&R). Le seul blocage est la cooperation client sur le televersement de photos et la verification.",
      conditions: [
        { en: "Client provides verified GBP access in week 1", fr: "Client fournit l'acces verifie GBP en semaine 1" },
        { en: "Client uploads at least 12 original photos in month 1 (we provide the upload form via Reviuzy)", fr: "Client televerse au moins 12 photos originales au mois 1 (nous fournissons le formulaire via Reviuzy)" },
        { en: "Client responds to clarification questions within 5 business days", fr: "Client repond aux questions de clarification dans les 5 jours ouvrables" },
      ],
      tier: "Starter, Core, Growth, Agency",
    },
    {
      titleEn: "AI Visibility +20% in 90 days",
      titleFr: "Visibilite IA +20 % en 90 jours",
      promiseEn: "Your AI Visibility score (citations across ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot for your tracked queries) increases by 20% or more within 90 days. If not, month 4 is free.",
      promiseFr: "Votre score Visibilite IA (citations sur ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot pour vos requetes suivies) augmente de 20 % ou plus dans les 90 jours. Sinon, le mois 4 est gratuit.",
      whyEn: "AI Visibility responds directly to GBP completeness + review velocity + citation density + schema correctness. We control all four. Three months is enough for AI engines to re-crawl and re-weight your structured data.",
      whyFr: "La Visibilite IA repond directement a la completude GBP + velocite des avis + densite des citations + exactitude du schema. Nous controlons les quatre. Trois mois suffisent pour que les moteurs IA re-crawlent et re-ponderent vos donnees structurees.",
      conditions: [
        { en: "Client provides initial AI Visibility baseline within week 1", fr: "Client fournit la base de Visibilite IA initiale en semaine 1" },
        { en: "Client uploads photos as required (Starter 4/mo, Core 6/mo, Growth 8/mo, Agency 12/mo)", fr: "Client televerse les photos requises (Starter 4/mo, Core 6/mo, Growth 8/mo, Agency 12/mo)" },
        { en: "Client maintains active GBP (does not pause posts mid-engagement)", fr: "Client maintient son GBP actif (ne met pas en pause les publications en cours d'engagement)" },
      ],
      tier: "Core, Growth, Agency",
    },
    {
      titleEn: "10 authentic reviews in 90 days",
      titleFr: "10 avis authentiques en 90 jours",
      promiseEn: "You receive 10 or more authentic Google reviews within 90 days when you use the NFC tap-to-review flow at the point of service. If not, month 4 is free.",
      promiseFr: "Vous recevez 10 avis Google authentiques ou plus dans les 90 jours lorsque vous utilisez le flux NFC tap-to-review au point de service. Sinon, le mois 4 est gratuit.",
      whyEn: "Reviuzy NFC achieves a 35-50% capture rate on customers who tap. With 25-40 weekly customers, 10 reviews per 90 days is conservative. The only blocker is whether the NFC card is actually used.",
      whyFr: "Reviuzy NFC atteint un taux de capture de 35-50 % sur les clients qui tapent. Avec 25-40 clients hebdomadaires, 10 avis par 90 jours est conservateur. Le seul blocage est l'utilisation reelle de la carte NFC.",
      conditions: [
        { en: "Reviuzy NFC card placed at point of service in week 1", fr: "Carte NFC Reviuzy placee au point de service en semaine 1" },
        { en: "Front-desk staff trained to invite the tap (we provide the script in EN+FR)", fr: "Personnel de reception forme a inviter le tap (script fourni EN+FR)" },
        { en: "Business serves at least 25 customers per week (lower volume waivers available)", fr: "Entreprise sert au moins 25 clients par semaine (derogations possibles pour volume inferieur)" },
      ],
      tier: "Reviuzy add-on or Agency",
    },
  ];

  const notGuaranteed = [
    {
      en: "Top 3 organic ranking on specific Google keywords",
      fr: "Top 3 classement organique sur mots-cles Google specifiques",
      whyEn: "Google's organic algorithm is a black box. We influence it through correct schema and content, but we don't control it. No Quebec agency that promises specific rankings is being honest with you.",
      whyFr: "L'algorithme organique de Google est une boite noire. Nous l'influencons via schema et contenu corrects, mais nous ne le controlons pas. Aucune agence quebecoise qui promet des classements specifiques n'est honnete avec vous.",
    },
    {
      en: "Number of new customers, leads, or revenue increase",
      fr: "Nombre de nouveaux clients, prospects ou augmentation de revenus",
      whyEn: "We control your discoverability. We do NOT control your conversion (your offer, pricing, sales process, customer service, store hours). Outcomes depend on factors outside marketing.",
      whyFr: "Nous controlons votre decouvrabilite. Nous NE controlons PAS votre conversion (votre offre, vos prix, votre processus de vente, votre service client, vos heures d'ouverture). Les resultats dependent de facteurs hors marketing.",
    },
    {
      en: "Outcomes if you cancel before the guarantee window closes",
      fr: "Resultats si vous annulez avant la fermeture de la fenetre de garantie",
      whyEn: "Each guarantee runs over a defined window (30 or 90 days). Cancelling before the window closes voids the guarantee for that period. You're free to leave (no contract), but you can't claim a free month you didn't earn.",
      whyFr: "Chaque garantie s'execute sur une fenetre definie (30 ou 90 jours). Annuler avant la fermeture de la fenetre annule la garantie pour cette periode. Vous etes libre de partir (aucun contrat), mais vous ne pouvez pas reclamer un mois gratuit non gagne.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {T(
            "Performance Guarantee: GBP perfect, AI Visibility +20%, 10 reviews | AiLys",
            "Garantie de performance: GBP parfait, Visibilite IA +20 %, 10 avis | AiLys",
          )}
        </title>
        <meta
          name="description"
          content={T(
            "AiLys's 3 performance guarantees: GBP perfect score in 30 days, AI Visibility +20% in 90 days, 10 authentic reviews in 90 days. Conditional, honest, free month if missed.",
            "Les 3 garanties de performance d'AiLys: GBP score parfait en 30 jours, Visibilite IA +20 % en 90 jours, 10 avis authentiques en 90 jours. Conditionnelles, honnetes, mois gratuit si manquees.",
          )}
        />
        <link rel="canonical" href="https://www.ailysagency.ca/garantie" />
      </Helmet>

      <MoodBackground mood={mood} />

      <div className="min-h-screen overflow-x-hidden">
        <Navbar />

        <main className="pt-28 pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <Link
              to={isFr ? "/fr" : "/"}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/70 hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {T("Home", "Accueil")}
            </Link>

            <header className="mb-16">
              <div className="ailys-section-no mb-6">
                <span>{T("Performance guarantee", "Garantie de performance")}</span>
              </div>
              <div className="flex items-start gap-4 mb-6">
                <div className={`hidden sm:flex flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${mood.accentGradient} items-center justify-center shadow-xl`}>
                  <ShieldCheck className="w-7 h-7 text-background" />
                </div>
                <div className="flex-1">
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-4">
                    {T("Three guarantees.", "Trois garanties.")}
                    <br />
                    <span className={`italic bg-gradient-to-r ${mood.accentGradient} bg-clip-text text-transparent`}>
                      {T("Free month if we miss.", "Mois gratuit si on manque.")}
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    {T(
                      "Risk-reversed engagement. Each guarantee covers a metric we control (GBP optimization, AI Visibility, review velocity). Each guarantee is conditional on you cooperating during onboarding. Honest scope, honest conditions, honest refund.",
                      "Engagement avec risque renverse. Chaque garantie couvre une metrique que nous controlons (optimisation GBP, Visibilite IA, velocite des avis). Chaque garantie est conditionnelle a votre cooperation durant l'onboarding. Portee honnete, conditions honnetes, remboursement honnete.",
                    )}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 backdrop-blur-md p-4 sm:p-5 flex items-start gap-3 max-w-3xl">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/85 leading-relaxed">
                  {T(
                    "We do NOT guarantee organic Google ranking, lead volume, or revenue. Anyone who promises those is being dishonest. We guarantee what we actually control.",
                    "Nous NE garantissons PAS le classement organique Google, le volume de prospects ou les revenus. Quiconque promet ca est malhonnete. Nous garantissons ce que nous controlons reellement.",
                  )}
                </p>
              </div>
            </header>

            {/* 3 guarantees */}
            <section className="mb-16 space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl mb-6">
                {T("What we guarantee.", "Ce que nous garantissons.")}
              </h2>
              {guarantees.map((g, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-8"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${mood.accentGradient} flex items-center justify-center shadow-lg`}>
                      <CheckCircle2 className="w-6 h-6 text-background" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-mono uppercase tracking-[0.18em] text-primary mb-1">
                        {T("Guarantee", "Garantie")} {i + 1}
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl leading-tight">
                        {T(g.titleEn, g.titleFr)}
                      </h3>
                    </div>
                  </div>

                  <p className="text-base text-foreground/90 leading-relaxed mb-4">
                    {T(g.promiseEn, g.promiseFr)}
                  </p>

                  <div className="rounded-xl bg-background/30 border border-border/30 p-4 mb-4">
                    <div className="text-xs font-mono uppercase tracking-wider text-primary mb-1">
                      {T("Why we can promise this", "Pourquoi nous pouvons promettre ca")}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {T(g.whyEn, g.whyFr)}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2">
                      {T("Conditions", "Conditions")}
                    </div>
                    <ul className="space-y-2 text-sm text-foreground/85">
                      {g.conditions.map((c, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <Star className="w-3.5 h-3.5 text-primary/70 flex-shrink-0 mt-0.5" />
                          <span>{T(c.en, c.fr)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/30 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-mono uppercase tracking-wider">
                      {T("Available on", "Disponible sur")}: {g.tier}
                    </span>
                  </div>
                </div>
              ))}
            </section>

            {/* What we don't guarantee */}
            <section className="mb-16">
              <h2 className="font-display text-2xl sm:text-3xl mb-6">
                {T("What we don't guarantee (and why).", "Ce que nous ne garantissons pas (et pourquoi).")}
              </h2>
              <div className="space-y-3">
                {notGuaranteed.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md p-5"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                      <h3 className="font-semibold text-foreground leading-snug">
                        {T(item.en, item.fr)}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-8">
                      {T(item.whyEn, item.whyFr)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* How to claim */}
            <section className="mb-16">
              <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-10">
                <h2 className="font-display text-xl sm:text-2xl mb-4">
                  {T("How to claim a free month.", "Comment reclamer un mois gratuit.")}
                </h2>
                <ol className="space-y-3 text-sm text-foreground/85">
                  <li className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${mood.accentGradient} text-background text-xs font-bold flex items-center justify-center`}>
                      1
                    </span>
                    <span>
                      {T(
                        "Email anthonyng135@gmail.com (or use the Reviuzy admin) within 7 days of the guarantee window closing.",
                        "Envoyez un courriel a anthonyng135@gmail.com (ou utilisez l'admin Reviuzy) dans les 7 jours suivant la fermeture de la fenetre de garantie.",
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${mood.accentGradient} text-background text-xs font-bold flex items-center justify-center`}>
                      2
                    </span>
                    <span>
                      {T(
                        "We pull the audit log (GBP score history, AI Visibility report, review log) and verify whether the guarantee triggered.",
                        "Nous tirons le journal d'audit (historique du score GBP, rapport Visibilite IA, journal des avis) et verifions si la garantie s'est declenchee.",
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${mood.accentGradient} text-background text-xs font-bold flex items-center justify-center`}>
                      3
                    </span>
                    <span>
                      {T(
                        "If yes, the next month's invoice is automatically credited. If conditions weren't met, we explain which condition failed and offer a 60-day extension to retry.",
                        "Si oui, la facture du mois suivant est automatiquement creditee. Si les conditions n'ont pas ete remplies, nous expliquons laquelle a echoue et offrons une prolongation de 60 jours pour reessayer.",
                      )}
                    </span>
                  </li>
                </ol>
              </div>
            </section>

            {/* CTA */}
            <section className="text-center">
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  asChild
                  size="lg"
                  className={`bg-gradient-to-r ${mood.accentGradient} text-background hover:opacity-90`}
                >
                  <Link to={isFr ? "/fr/book-call" : "/book-call"}>
                    {T("Book a strategy call", "Reserver un appel strategique")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to={isFr ? "/fr/forfaits-complets" : "/forfaits-complets"}>
                    {T("See all plans", "Voir tous les forfaits")}
                  </Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground/70 mt-6 max-w-2xl mx-auto">
                {T(
                  "Guarantees apply to month-to-month engagements signed after May 1, 2026. Annual prepay engagements have separate terms (see your contract). The guarantee text in this page is the canonical reference; if your contract uses different language, the more favorable text applies.",
                  "Les garanties s'appliquent aux engagements mois-a-mois signes apres le 1 mai 2026. Les engagements annuels prepayes ont des conditions distinctes (voir votre contrat). Le texte de garantie sur cette page est la reference canonique; si votre contrat utilise un libelle different, c'est le texte le plus favorable qui s'applique.",
                )}
              </p>
            </section>
          </div>
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
