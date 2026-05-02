import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Newspaper,
  Calendar,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Search,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { MoodBackground } from "@/components/backgrounds/MoodBackground";
import { NewsletterSignup } from "@/components/landing/NewsletterSignup";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";
import { getMood } from "@/design-system/moods";

/**
 * /pouls-local
 *
 * Landing page for AiLys's weekly Quebec PME newsletter "Le Pouls Local".
 *
 * Why: Long-term distribution channel. Weekly newsletter to 5000+
 * Quebec PME owners over 18 months becomes a free distribution lever
 * worth more than any paid ad spend. Recycles existing
 * NewsletterSignup component + /api/newsletter-subscribe edge fn
 * (double-opt-in, honeypot, rate-limit, source attribution).
 *
 * Pattern: Hero + value prop + 3 sample editions teaser + signup +
 * FAQ. Mood: chaleureux-artisan (warm cream, hand-crafted feel,
 * suits the editorial newsletter content).
 */

export default function PoulsLocal() {
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
  const mood = getMood("chaleureux-artisan");

  const benefits = [
    {
      icon: TrendingUp,
      titleEn: "Weekly trends, not noise",
      titleFr: "Tendances hebdomadaires, pas du bruit",
      descEn: "One issue per Tuesday morning, 4-minute read. What changed in AI search, GBP, local SEO, and Quebec law that week.",
      descFr: "Un numero par mardi matin, lecture de 4 minutes. Ce qui a change dans la recherche IA, GBP, SEO local et la loi quebecoise cette semaine.",
    },
    {
      icon: MapPin,
      titleEn: "Quebec-only context",
      titleFr: "Contexte 100% Quebec",
      descEn: "We don't recycle US blog posts. Every article is filtered through the lens of a Quebec PME: Loi 25, Loi 96, OQLF, REQ, GBP categories that work in Montreal vs Saguenay.",
      descFr: "On ne recycle pas les articles de blogues americains. Chaque article est filtre par le prisme d'une PME quebecoise: Loi 25, Loi 96, OQLF, REQ, categories GBP qui marchent a Montreal vs au Saguenay.",
    },
    {
      icon: Search,
      titleEn: "Tactical, not theoretical",
      titleFr: "Tactique, pas theorique",
      descEn: "Each issue ends with one tactical move you can run this week. Real screenshots, real GBP categories, real prompts to try with ChatGPT and Perplexity.",
      descFr: "Chaque numero se termine par une action tactique a faire cette semaine. Vraies captures d'ecran, vraies categories GBP, vraies invites a essayer avec ChatGPT et Perplexity.",
    },
  ];

  const sampleIssues = [
    {
      dateEn: "April 28, 2026",
      dateFr: "28 avril 2026",
      titleEn: "Why your dental clinic disappeared from ChatGPT in February",
      titleFr: "Pourquoi votre clinique dentaire a disparu de ChatGPT en fevrier",
      excerptEn: "OpenAI changed how it weights Yelp vs Google reviews this winter. The dental practices that lost visibility all share one common GBP gap.",
      excerptFr: "OpenAI a change la facon dont il pondere les avis Yelp vs Google cet hiver. Les cliniques dentaires qui ont perdu en visibilite partagent toutes une lacune GBP commune.",
    },
    {
      dateEn: "April 21, 2026",
      dateFr: "21 avril 2026",
      titleEn: "The 11 GBP attributes Quebec restos forget (and lose lunch traffic)",
      titleFr: "Les 11 attributs GBP que les restos quebecois oublient (et perdent le trafic du midi)",
      excerptEn: "We audited 240 Montreal restos. Three attributes were missing on >70% of profiles. All three matter for the AI Overview answer Google gives at lunch.",
      excerptFr: "On a audite 240 restos montrealais. Trois attributs manquaient sur >70 % des fiches. Les trois comptent pour la reponse Apercu IA que Google donne le midi.",
    },
    {
      dateEn: "April 14, 2026",
      dateFr: "14 avril 2026",
      titleEn: "Loi 25 inspector contacted a client. Here's what they asked for.",
      titleFr: "Un inspecteur Loi 25 a contacte un client. Voici ce qu'il a demande.",
      excerptEn: "A real CAI complaint, with the timeline, the documents requested, the response template that closed the file in 11 days. Anonymized.",
      excerptFr: "Une vraie plainte CAI, avec la chronologie, les documents demandes, le modele de reponse qui a ferme le dossier en 11 jours. Anonymise.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {T(
            "Le Pouls Local: weekly Quebec PME marketing newsletter | AiLys",
            "Le Pouls Local: infolettre marketing PME quebecoise hebdomadaire | AiLys",
          )}
        </title>
        <meta
          name="description"
          content={T(
            "Free weekly newsletter for Quebec PME owners. AI search, GBP, local SEO, Loi 25/96 updates. Tactical, 4-minute read. Tuesday mornings. Bilingual EN/FR.",
            "Infolettre hebdomadaire gratuite pour proprietaires de PME quebecoises. Recherche IA, GBP, SEO local, mises a jour Loi 25/96. Tactique, lecture de 4 minutes. Mardi matin. Bilingue EN/FR.",
          )}
        />
        <link rel="canonical" href="https://www.ailysagency.ca/pouls-local" />
      </Helmet>

      <MoodBackground mood={mood} />

      <div className="min-h-screen overflow-x-hidden">
        <Navbar />

        <main className="pt-28 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              to={isFr ? "/fr" : "/"}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/70 hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {T("Home", "Accueil")}
            </Link>

            <header className="mb-16">
              <div className="ailys-section-no mb-6">
                <span>{T("Free newsletter", "Infolettre gratuite")}</span>
              </div>
              <div className="flex items-start gap-4 mb-6">
                <div className={`hidden sm:flex flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${mood.accentGradient} items-center justify-center shadow-xl`}>
                  <Newspaper className="w-7 h-7 text-background" />
                </div>
                <div className="flex-1">
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-4">
                    {T("Le Pouls Local.", "Le Pouls Local.")}
                    <br />
                    <span className={`italic bg-gradient-to-r ${mood.accentGradient} bg-clip-text text-transparent`}>
                      {T("Tuesday mornings.", "Mardi matin.")}
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    {T(
                      "The weekly newsletter for Quebec PME owners who want to stay sharp without spending Sunday night reading 14 marketing blogs. AI search, Google Business Profile, local SEO, Loi 25 and Loi 96 updates. Filtered through the lens of someone who actually runs a Quebec agency. 4-minute read. Free. Bilingual.",
                      "L'infolettre hebdomadaire pour proprietaires de PME quebecoises qui veulent rester affutes sans passer leur dimanche soir a lire 14 blogues marketing. Recherche IA, fiche Google Business, SEO local, mises a jour Loi 25 et Loi 96. Filtree par le prisme de quelqu'un qui opere vraiment une agence quebecoise. Lecture de 4 minutes. Gratuit. Bilingue.",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs font-mono uppercase tracking-wider text-muted-foreground/80">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/40 bg-card/40">
                  <Calendar className="w-3 h-3" />
                  {T("Every Tuesday 7am ET", "Chaque mardi 7h HE")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/40 bg-card/40">
                  <Sparkles className="w-3 h-3" />
                  {T("4-minute read", "Lecture de 4 minutes")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/40 bg-card/40">
                  <CheckCircle2 className="w-3 h-3" />
                  {T("Unsubscribe in 1 click", "Desabonnement en 1 clic")}
                </span>
              </div>
            </header>

            {/* Signup form (uses existing NewsletterSignup component + edge fn) */}
            <div className="mb-16">
              <NewsletterSignup source="pouls-local-landing" variant="card" />
            </div>

            {/* 3 benefits */}
            <section className="mb-16">
              <h2 className="font-display text-2xl sm:text-3xl mb-8">
                {T("What you get every Tuesday.", "Ce que vous recevez chaque mardi.")}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {benefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={i}
                      className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md p-5"
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mood.accentGradient} flex items-center justify-center shadow-lg mb-4`}>
                        <Icon className="w-5 h-5 text-background" />
                      </div>
                      <h3 className="font-display text-lg mb-2 leading-tight">
                        {T(b.titleEn, b.titleFr)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {T(b.descEn, b.descFr)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Sample previous issues */}
            <section className="mb-16">
              <h2 className="font-display text-2xl sm:text-3xl mb-2">
                {T("3 recent issues.", "3 numeros recents.")}
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                {T(
                  "Real headlines from the past month. To see the full archive, subscribe.",
                  "Vrais titres du mois dernier. Pour voir les archives completes, abonnez-vous.",
                )}
              </p>
              <div className="space-y-3">
                {sampleIssues.map((issue, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md p-5 sm:p-6"
                  >
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-primary mb-2">
                      {T(issue.dateEn, issue.dateFr)}
                    </div>
                    <h3 className="font-display text-lg sm:text-xl mb-2 leading-tight">
                      {T(issue.titleEn, issue.titleFr)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {T(issue.excerptEn, issue.excerptFr)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ-style trust block */}
            <section className="mb-12">
              <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-10">
                <h2 className="font-display text-xl sm:text-2xl mb-6">
                  {T("Quick answers.", "Reponses rapides.")}
                </h2>
                <dl className="space-y-5 text-sm">
                  <div>
                    <dt className="font-semibold text-foreground mb-1">
                      {T("Is it really free?", "Est-ce vraiment gratuit?")}
                    </dt>
                    <dd className="text-muted-foreground leading-relaxed">
                      {T(
                        "Yes. No paywall, no upgrade prompt mid-issue. We use the newsletter to introduce some readers to AiLys's paid services over time, but the newsletter itself stays free.",
                        "Oui. Aucun mur payant, aucune invitation a ameliorer en plein numero. Nous utilisons l'infolettre pour faire decouvrir les services payants d'AiLys a certains lecteurs au fil du temps, mais l'infolettre elle-meme reste gratuite.",
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground mb-1">
                      {T("Will you sell my email?", "Allez-vous vendre mon courriel?")}
                    </dt>
                    <dd className="text-muted-foreground leading-relaxed">
                      {T(
                        "No. Loi 25-grade consent + double-opt-in. We don't sell, rent, or share subscriber lists. Unsubscribe in one click and we permanently delete your email within 30 days.",
                        "Non. Consentement de niveau Loi 25 + double opt-in. Nous ne vendons, ne louons ni ne partageons les listes d'abonnes. Desabonnement en un clic et nous supprimons definitivement votre courriel dans les 30 jours.",
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground mb-1">
                      {T("Bilingual or pick one?", "Bilingue ou un seul choix?")}
                    </dt>
                    <dd className="text-muted-foreground leading-relaxed">
                      {T(
                        "Pick one when you subscribe. Most readers pick FR-CA. The full content is available in both. You can switch language anytime by clicking the link at the bottom of any issue.",
                        "Choisissez une langue a l'abonnement. La plupart des lecteurs choisissent FR-CA. Le contenu complet est disponible dans les deux. Vous pouvez changer de langue en tout temps via le lien au bas de chaque numero.",
                      )}
                    </dd>
                  </div>
                </dl>
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
