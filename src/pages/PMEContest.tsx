import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Trophy,
  MapPin,
  Calendar,
  Star,
  Gift,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { MoodBackground } from "@/components/backgrounds/MoodBackground";
import { NewsletterSignup } from "@/components/landing/NewsletterSignup";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";
import { getMood } from "@/design-system/moods";

/**
 * /concours-pme
 *
 * Annual contest landing: "Meilleure PME locale du Quebec".
 *
 * Strategy: nominations open in early September, public voting through
 * mid-October, regional + sectoral winners announced in November,
 * gala media coverage. Winners get cash prize + 1 year free of Growth
 * tier + media kit. Backbone of long-term lead generation:
 *  - Each nomination = 1 lead (PME owner, contact info, vertical)
 *  - Each finalist amplifies on their own networks
 *  - Local press picks up regional winners
 *  - Backlinks to ailysagency.ca from every coverage piece
 *  - Brand authority compounding year-over-year
 *
 * Pre-launch landing (this page): announce, capture interest waitlist
 * via NewsletterSignup with source attribution. Real nomination form
 * goes live in late August.
 *
 * Mood: luxe-editorial (burgundy + gold-leaf, AuroraBackground).
 * Suits the prestige/award positioning.
 */

export default function PMEContest() {
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
  const mood = getMood("luxe-editorial");

  const regions = [
    { en: "Greater Montreal", fr: "Grand Montreal" },
    { en: "Quebec City + Capitale-Nationale", fr: "Quebec et Capitale-Nationale" },
    { en: "Estrie + Eastern Townships", fr: "Estrie et Cantons-de-l'Est" },
    { en: "Saguenay-Lac-Saint-Jean", fr: "Saguenay-Lac-Saint-Jean" },
    { en: "Mauricie + Centre-du-Quebec", fr: "Mauricie et Centre-du-Quebec" },
    { en: "Outaouais", fr: "Outaouais" },
    { en: "Bas-Saint-Laurent + Gaspesie", fr: "Bas-Saint-Laurent et Gaspesie" },
    { en: "Cote-Nord + Northern regions", fr: "Cote-Nord et regions nordiques" },
  ];

  const categories = [
    { en: "Restaurant + Hospitality", fr: "Restauration et hospitalite" },
    { en: "Health + Wellness clinic", fr: "Clinique sante et bien-etre" },
    { en: "Retail + Boutique", fr: "Detaillant et boutique" },
    { en: "Trades + Services", fr: "Metiers et services" },
    { en: "Beauty + Personal care", fr: "Beaute et soins personnels" },
    { en: "Professional services", fr: "Services professionnels" },
    { en: "Hotel + Lodging", fr: "Hotel et hebergement" },
    { en: "Real estate + Property", fr: "Immobilier" },
  ];

  const prizes = [
    {
      titleEn: "Grand prize: Quebec PME of the year",
      titleFr: "Grand prix: PME quebecoise de l'annee",
      itemsEn: [
        "$5,000 CAD cash prize",
        "12 months Growth tier ($14,400 value) for free",
        "Professional media kit + press release in EN + FR",
        "Feature on ailysagency.ca homepage for 90 days",
        "Award trophy + certificate presented at the November gala",
      ],
      itemsFr: [
        "Prix en argent de 5 000 $ CAD",
        "12 mois du forfait Growth (valeur 14 400 $) gratuits",
        "Trousse media professionnelle + communique en EN + FR",
        "Mise en vedette sur la page d'accueil ailysagency.ca pendant 90 jours",
        "Trophee d'honneur + certificat presentes au gala de novembre",
      ],
      featured: true,
    },
    {
      titleEn: "Regional winners (8 regions)",
      titleFr: "Gagnants regionaux (8 regions)",
      itemsEn: [
        "$1,000 CAD cash prize per region",
        "6 months Core tier ($3,600 value) for free",
        "Regional media kit + local press release",
        "Feature on regional landing page for 60 days",
      ],
      itemsFr: [
        "Prix en argent de 1 000 $ CAD par region",
        "6 mois du forfait Core (valeur 3 600 $) gratuits",
        "Trousse media regionale + communique de presse local",
        "Mise en vedette sur la page d'atterrissage regionale pendant 60 jours",
      ],
    },
    {
      titleEn: "Sectoral winners (8 categories)",
      titleFr: "Gagnants sectoriels (8 categories)",
      itemsEn: [
        "$500 CAD cash prize per category",
        "3 months Starter tier ($900 value) for free",
        "Industry-specific feature on ailysagency.ca/industries",
      ],
      itemsFr: [
        "Prix en argent de 500 $ CAD par categorie",
        "3 mois du forfait Starter (valeur 900 $) gratuits",
        "Mise en vedette specifique a l'industrie sur ailysagency.ca/industries",
      ],
    },
  ];

  const timeline = [
    {
      stepEn: "September 1",
      stepFr: "1 septembre",
      eventEn: "Nominations open",
      eventFr: "Ouverture des nominations",
    },
    {
      stepEn: "October 5",
      stepFr: "5 octobre",
      eventEn: "Public voting opens (8-week phase)",
      eventFr: "Ouverture du vote public (phase de 8 semaines)",
    },
    {
      stepEn: "November 30",
      stepFr: "30 novembre",
      eventEn: "Voting closes, jury deliberation",
      eventFr: "Fermeture du vote, deliberation du jury",
    },
    {
      stepEn: "December 12",
      stepFr: "12 decembre",
      eventEn: "Winners announced + gala in Montreal",
      eventFr: "Annonce des gagnants + gala a Montreal",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {T(
            "Quebec PME Awards: nominate your favourite local business | AiLys",
            "Concours PME Quebec: nominez votre commerce local favori | AiLys",
          )}
        </title>
        <meta
          name="description"
          content={T(
            "Annual awards for the best Quebec PME by region and industry. $5K grand prize, 17 regional and sectoral winners. Nominations open September. Free public voting.",
            "Concours annuel pour la meilleure PME quebecoise par region et industrie. Grand prix de 5 000 $, 17 gagnants regionaux et sectoriels. Nominations en septembre. Vote public gratuit.",
          )}
        />
        <link rel="canonical" href="https://www.ailysagency.ca/concours-pme" />
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
                <span>{T("Annual contest", "Concours annuel")}</span>
              </div>
              <div className="flex items-start gap-4 mb-6">
                <div className={`hidden sm:flex flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${mood.accentGradient} items-center justify-center shadow-2xl`}>
                  <Trophy className="w-8 h-8 text-background" />
                </div>
                <div className="flex-1">
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-4">
                    {T("Quebec PME Awards", "Concours PME Quebec")}
                    <br />
                    <span className={`italic bg-gradient-to-r ${mood.accentGradient} bg-clip-text text-transparent`}>
                      {T("2026 edition.", "edition 2026.")}
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    {T(
                      "Honour the best Quebec PME of the year by region and by industry. Nominations open September 1. Public voting opens October 5. Winners announced at a Montreal gala on December 12. $5,000 grand prize, 17 regional and sectoral winners, free for everyone to nominate and vote.",
                      "Honorez la meilleure PME quebecoise de l'annee par region et par industrie. Ouverture des nominations le 1 septembre. Ouverture du vote public le 5 octobre. Annonce des gagnants au gala de Montreal le 12 decembre. Grand prix de 5 000 $, 17 gagnants regionaux et sectoriels, nomination et vote gratuits pour tous.",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs font-mono uppercase tracking-wider text-muted-foreground/80">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/40 bg-card/40">
                  <Calendar className="w-3 h-3" />
                  {T("Nominations open Sept 1", "Nominations 1 sept")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/40 bg-card/40">
                  <Users className="w-3 h-3" />
                  {T("Public voting", "Vote public")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/40 bg-card/40">
                  <Trophy className="w-3 h-3" />
                  {T("$5K grand prize + 17 winners", "Grand prix 5K $ + 17 gagnants")}
                </span>
              </div>
            </header>

            {/* Waitlist signup */}
            <section className="mb-16">
              <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 backdrop-blur-md p-6 sm:p-10 text-center">
                <Sparkles className={`w-12 h-12 mx-auto mb-4 text-primary`} />
                <h2 className="font-display text-2xl sm:text-3xl mb-3">
                  {T(
                    "Get notified when nominations open.",
                    "Soyez avise a l'ouverture des nominations.",
                  )}
                </h2>
                <p className="text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
                  {T(
                    "Subscribe to Le Pouls Local to be notified the morning nominations open. We'll send the rules, the form link, and 1 reminder before voting closes. Nothing more.",
                    "Abonnez-vous au Pouls Local pour etre avise le matin de l'ouverture des nominations. Nous enverrons les regles, le lien du formulaire et 1 rappel avant la fermeture du vote. Rien de plus.",
                  )}
                </p>
                <NewsletterSignup source="pme-contest-waitlist" variant="card" />
              </div>
            </section>

            {/* Timeline */}
            <section className="mb-16">
              <h2 className="font-display text-2xl sm:text-3xl mb-8">
                {T("Timeline.", "Echeancier.")}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {timeline.map((t, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md p-5"
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${mood.accentGradient} flex items-center justify-center font-mono text-xs font-bold text-background mb-3`}>
                      {i + 1}
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-primary mb-1">
                      {T(t.stepEn, t.stepFr)}
                    </div>
                    <div className="text-sm font-medium leading-snug">
                      {T(t.eventEn, t.eventFr)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Categories + Regions */}
            <section className="mb-16 grid lg:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mood.accentGradient} flex items-center justify-center shadow-lg`}>
                    <MapPin className="w-5 h-5 text-background" />
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl">
                    {T("8 regions", "8 regions")}
                  </h2>
                </div>
                <ul className="space-y-2 text-sm text-foreground/85">
                  {regions.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Star className="w-3.5 h-3.5 text-primary/60 flex-shrink-0 mt-0.5" />
                      <span>{T(r.en, r.fr)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mood.accentGradient} flex items-center justify-center shadow-lg`}>
                    <Star className="w-5 h-5 text-background" />
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl">
                    {T("8 categories", "8 categories")}
                  </h2>
                </div>
                <ul className="space-y-2 text-sm text-foreground/85">
                  {categories.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Star className="w-3.5 h-3.5 text-primary/60 flex-shrink-0 mt-0.5" />
                      <span>{T(c.en, c.fr)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Prizes */}
            <section className="mb-16">
              <h2 className="font-display text-2xl sm:text-3xl mb-8">
                {T("Prizes.", "Prix.")}
              </h2>
              <div className="space-y-4">
                {prizes.map((p, i) => (
                  <div
                    key={i}
                    className={`rounded-3xl border ${
                      p.featured
                        ? "border-primary/40 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"
                        : "border-border/40 bg-card/40"
                    } backdrop-blur-md p-6 sm:p-8`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${mood.accentGradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                        {p.featured ? (
                          <Trophy className="w-6 h-6 text-background" />
                        ) : (
                          <Gift className="w-6 h-6 text-background" />
                        )}
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl flex-1">
                        {T(p.titleEn, p.titleFr)}
                      </h3>
                    </div>
                    <ul className="space-y-2 text-sm sm:text-base text-foreground/85 ml-0 sm:ml-16">
                      {(isFr ? p.itemsFr : p.itemsEn).map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <Star className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Eligibility */}
            <section className="mb-12">
              <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-10">
                <h2 className="font-display text-xl sm:text-2xl mb-4">
                  {T("Eligibility.", "Eligibilite.")}
                </h2>
                <ul className="space-y-3 text-sm text-foreground/85">
                  <li className="flex items-start gap-2.5">
                    <Star className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      {T(
                        "Quebec-incorporated PME (registered with REQ) operating at least 12 months as of September 1, 2026.",
                        "PME incorporee au Quebec (enregistree au REQ) operant depuis au moins 12 mois en date du 1 septembre 2026.",
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Star className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      {T(
                        "Annual revenue under $10M CAD. The contest celebrates small and mid-sized PMEs, not large enterprises.",
                        "Chiffre d'affaires annuel sous 10 M$ CAD. Le concours celebre les petites et moyennes entreprises, pas les grandes.",
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Star className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      {T(
                        "Loi 25 + Loi 96 compliant. Failure-to-comply complaints in the past 12 months disqualify the nomination.",
                        "Conforme Loi 25 + Loi 96. Une plainte de non-conformite dans les 12 derniers mois disqualifie la nomination.",
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Star className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      {T(
                        "Existing AiLys clients are eligible but jurors are blinded to client status during deliberation.",
                        "Les clients AiLys existants sont eligibles, mais le statut client est cache aux jures durant la deliberation.",
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Star className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      {T(
                        "Anyone (customers, employees, family, the business owner themselves) can submit a nomination. Limit one nomination per business.",
                        "N'importe qui (clients, employes, famille, proprietaire lui-meme) peut soumettre une nomination. Limite d'une nomination par entreprise.",
                      )}
                    </span>
                  </li>
                </ul>
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
                  <Link to={isFr ? "/fr/pouls-local" : "/pouls-local"}>
                    {T("Subscribe to be notified", "S'abonner pour etre avise")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to={isFr ? "/fr/book-call" : "/book-call"}>
                    {T("Talk about sponsorship", "Discuter de commandite")}
                  </Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground/70 mt-6 max-w-2xl mx-auto">
                {T(
                  "Sponsorship inquiries: regional + sectoral category sponsors get logo placement on regional landing pages, mention in winner press releases, and seat at the gala. Limited to 16 sponsors total. Reach out via the strategy call link above.",
                  "Demandes de commandite: les commanditaires de categorie regionale + sectorielle obtiennent un logo sur les pages d'atterrissage regionales, une mention dans les communiques des gagnants et une place au gala. Limite a 16 commanditaires au total. Contactez via le lien d'appel strategique ci-dessus.",
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
