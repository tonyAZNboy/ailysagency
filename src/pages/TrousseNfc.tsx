import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Smartphone,
  Package,
  CreditCard,
  Coffee,
  Building2,
  CheckCircle2,
  Star,
  ArrowRight,
  Truck,
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
 * /trousse-nfc
 *
 * Landing page for the AiLys NFC Welcome Kit. Physical onboarding
 * artefact that ships with every Reviuzy add-on activation. Bundles:
 *  - 5 NFC business cards (tap-to-review, branded with client logo)
 *  - 2 NFC table tents (taller surface, hostess station / counter)
 *  - 1 quick-start card (FR + EN setup instructions)
 *  - 1 thank-you note (handwritten by Anthony, signature touch)
 *
 * Marketing angle: physical mail in 2026 is rare = emotionally
 * powerful. No competitor (Wix, BrightLocal, Yext) ships physical
 * onboarding. Cost ~$20/client, FedEx tracked, arrives in 5-7
 * business days.
 *
 * Mood: chaleureux-artisan (warm cream + terracotta, the personal
 * mailed-package feel).
 */

export default function TrousseNfc() {
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

  const kit = [
    {
      icon: CreditCard,
      countEn: "5",
      countFr: "5",
      titleEn: "NFC business cards",
      titleFr: "Cartes d'affaires NFC",
      descEn: "Premium 30mil PVC, branded with your logo + a discreet \"Tap to review\" prompt. Customers tap with their phone, the Google review form opens pre-filled in their language. Distribute one per staff member or keep at the counter.",
      descFr: "PVC premium 30mil, marquees avec votre logo + une invitation discrete « Tapez pour evaluer ». Les clients tapent avec leur telephone, le formulaire d'avis Google s'ouvre pre-rempli dans leur langue. Distribuez-en une par employe ou gardez-les au comptoir.",
    },
    {
      icon: Coffee,
      countEn: "2",
      countFr: "2",
      titleEn: "NFC table tents",
      titleFr: "Tents de table NFC",
      descEn: "Acrylic stand 4x6 inches, double-sided. Place at hostess station, on tables, or at the front counter. Larger surface than the cards, easier for customers to spot at a glance.",
      descFr: "Support acrylique 4x6 pouces, recto-verso. Placez a la reception, sur les tables ou au comptoir. Plus grande surface que les cartes, plus facile a reperer en un coup d'oeil.",
    },
    {
      icon: Package,
      countEn: "1",
      countFr: "1",
      titleEn: "Quick-start card",
      titleFr: "Carte de demarrage rapide",
      descEn: "Bilingual EN+FR setup instructions: how the NFC tap works, how to invite customers to tap, how to read your weekly review report in Reviuzy, what to do if a customer's phone doesn't tap (95% of phones support NFC by 2026, but the rare exception happens).",
      descFr: "Instructions bilingues EN+FR: comment fonctionne le tap NFC, comment inviter les clients a taper, comment lire votre rapport d'avis hebdomadaire dans Reviuzy, quoi faire si le telephone d'un client ne tape pas (95 % des telephones supportent NFC en 2026, mais l'exception rare arrive).",
    },
    {
      icon: Smartphone,
      countEn: "1",
      countFr: "1",
      titleEn: "Handwritten thank-you note",
      titleFr: "Mot de remerciement ecrit a la main",
      descEn: "Signed by Anthony (founder). Small, but it's the part most clients mention months later. Real ink on paper, mailed from Quebec.",
      descFr: "Signe par Anthony (fondateur). Petit, mais c'est la partie que la plupart des clients mentionnent des mois plus tard. Vraie encre sur papier, postee du Quebec.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {T(
            "AiLys NFC Welcome Kit: physical onboarding for Reviuzy add-on | AiLys",
            "Trousse NFC AiLys: onboarding physique pour l'add-on Reviuzy | AiLys",
          )}
        </title>
        <meta
          name="description"
          content={T(
            "Physical onboarding kit shipped to every Reviuzy add-on client. 5 NFC business cards + 2 NFC table tents + quick-start card + handwritten note. FedEx-tracked, 5-7 days.",
            "Trousse d'onboarding physique expediee a chaque client Reviuzy. 5 cartes d'affaires NFC + 2 tents de table NFC + carte de demarrage + mot ecrit a la main. FedEx suivi, 5-7 jours.",
          )}
        />
        <link rel="canonical" href="https://www.ailysagency.ca/trousse-nfc" />
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
                <span>{T("Onboarding kit", "Trousse d'onboarding")}</span>
              </div>
              <div className="flex items-start gap-4 mb-6">
                <div className={`hidden sm:flex flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${mood.accentGradient} items-center justify-center shadow-xl`}>
                  <Package className="w-7 h-7 text-background" />
                </div>
                <div className="flex-1">
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-4">
                    {T("A real package.", "Un vrai colis.")}
                    <br />
                    <span className={`italic bg-gradient-to-r ${mood.accentGradient} bg-clip-text text-transparent`}>
                      {T("In 2026.", "En 2026.")}
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    {T(
                      "When you activate the Reviuzy add-on, we mail you a physical welcome kit. Premium NFC business cards, table tents, a quick-start guide, and a handwritten thank-you note. Arrives in 5-7 business days. FedEx-tracked. Bundled at no extra cost with every Reviuzy add-on or Agency tier subscription.",
                      "Quand vous activez l'add-on Reviuzy, nous vous postons une trousse de bienvenue physique. Cartes d'affaires NFC premium, tents de table, guide de demarrage rapide et mot de remerciement ecrit a la main. Arrive en 5-7 jours ouvrables. Suivi FedEx. Inclus sans cout additionnel avec chaque add-on Reviuzy ou abonnement Agency.",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs font-mono uppercase tracking-wider text-muted-foreground/80">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/40 bg-card/40">
                  <Truck className="w-3 h-3" />
                  {T("FedEx tracked", "Suivi FedEx")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/40 bg-card/40">
                  <Star className="w-3 h-3" />
                  {T("Bundled at no extra cost", "Inclus sans cout additionnel")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/40 bg-card/40">
                  <Smartphone className="w-3 h-3" />
                  {T("Works on iPhone + Android", "Fonctionne iPhone + Android")}
                </span>
              </div>
            </header>

            {/* What's in the box */}
            <section className="mb-16">
              <h2 className="font-display text-2xl sm:text-3xl mb-8">
                {T("What's in the box.", "Ce qu'il y a dans la boite.")}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {kit.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md p-6"
                    >
                      <div className="flex items-start gap-4 mb-3">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${mood.accentGradient} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-background" />
                        </div>
                        <div className="flex-1">
                          <div className={`font-display text-3xl bg-gradient-to-br ${mood.accentGradient} bg-clip-text text-transparent leading-none mb-1`}>
                            x{T(item.countEn, item.countFr)}
                          </div>
                          <h3 className="font-display text-lg sm:text-xl leading-tight">
                            {T(item.titleEn, item.titleFr)}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {T(item.descEn, item.descFr)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* How NFC tap-to-review works */}
            <section className="mb-16">
              <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-10">
                <h2 className="font-display text-2xl sm:text-3xl mb-6">
                  {T("How tap-to-review works.", "Comment fonctionne le tap-to-review.")}
                </h2>
                <ol className="space-y-4">
                  {[
                    {
                      en: "Customer finishes their service (manicure done, sushi paid, dental cleaning complete).",
                      fr: "Le client termine son service (manucure faite, sushi paye, nettoyage dentaire complete).",
                    },
                    {
                      en: "Staff invites them: \"If you enjoyed it, tap your phone here.\" (Script provided in EN + FR.)",
                      fr: "Le personnel l'invite: « Si vous avez aime, tapez votre telephone ici. » (Script fourni EN + FR.)",
                    },
                    {
                      en: "Customer's phone reads the NFC chip. Google review form opens immediately, pre-filled with the business name and the customer's preferred language.",
                      fr: "Le telephone du client lit la puce NFC. Le formulaire d'avis Google s'ouvre immediatement, pre-rempli avec le nom de l'entreprise et la langue preferee du client.",
                    },
                    {
                      en: "Customer rates 1-5 stars and (optionally) writes a short review. Submit takes 30 seconds total.",
                      fr: "Le client note 1-5 etoiles et (optionnellement) ecrit un court avis. La soumission prend 30 secondes au total.",
                    },
                    {
                      en: "Reviuzy receives the review, AI-generates a contextual reply in the customer's language, queues it for your approval (or auto-replies if you turned that on).",
                      fr: "Reviuzy recoit l'avis, l'IA genere une reponse contextuelle dans la langue du client, la met en file pour votre approbation (ou repond automatiquement si vous l'avez active).",
                    },
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${mood.accentGradient} text-background text-sm font-bold flex items-center justify-center shadow-md`}>
                        {i + 1}
                      </span>
                      <p className="text-sm sm:text-base text-foreground/90 leading-relaxed pt-0.5">
                        {T(step.en, step.fr)}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* Why physical mail */}
            <section className="mb-16">
              <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 backdrop-blur-md p-6 sm:p-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${mood.accentGradient} flex items-center justify-center shadow-lg`}>
                    <Building2 className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.18em] text-primary mb-1">
                      {T("Why physical mail", "Pourquoi du courrier physique")}
                    </div>
                    <h2 className="font-display text-xl sm:text-2xl">
                      {T(
                        "No competitor mails anything. We do.",
                        "Aucun concurrent ne poste rien. Nous, oui.",
                      )}
                    </h2>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  {T(
                    "Wix activates with an email. BrightLocal sends a PDF. Yext gives you a dashboard URL. They're all digital-only because mailing physical stuff costs money. We mail it because the package is the part of onboarding clients remember 6 months later. \"Hey, that handwritten note was a nice touch\" closes more renewals than any feature pitch.",
                    "Wix s'active par courriel. BrightLocal envoie un PDF. Yext donne une URL de tableau de bord. Ils sont tous numeriques seulement parce qu'envoyer du materiel physique coute. Nous l'envoyons parce que le colis est la partie de l'onboarding dont les clients se souviennent 6 mois plus tard. « Ah, le mot ecrit a la main, c'etait une belle attention » ferme plus de renouvellements que n'importe quelle presentation de fonctionnalite.",
                  )}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {T(
                    "Cost to us: ~$20 per client (cards, tents, FedEx). Worth it.",
                    "Cout pour nous: ~20 $ par client (cartes, tents, FedEx). Ca vaut la peine.",
                  )}
                </p>
              </div>
            </section>

            {/* When you get it + reorder */}
            <section className="mb-16 grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md p-6">
                <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2">
                  {T("When you get it", "Quand vous le recevez")}
                </div>
                <h3 className="font-display text-lg mb-3">
                  {T("Day 1 of activation.", "Jour 1 d'activation.")}
                </h3>
                <ul className="space-y-2 text-sm text-foreground/85">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{T("Reviuzy add-on activated: kit ships within 24h.", "Add-on Reviuzy active: la trousse expedie dans les 24 h.")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{T("Agency tier: kit shipped at signup as part of welcome bundle.", "Forfait Agency: trousse expediee au signup dans la trousse de bienvenue.")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{T("Tracked link emailed once it's in transit.", "Lien de suivi envoye par courriel une fois en transit.")}</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md p-6">
                <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2">
                  {T("Reorders", "Recommandes")}
                </div>
                <h3 className="font-display text-lg mb-3">
                  {T("Cards lost or restaffing?", "Cartes perdues ou nouvel embauche?")}
                </h3>
                <p className="text-sm text-foreground/85 leading-relaxed">
                  {T(
                    "First reorder per year is free. Subsequent reorders: $25 for 5 cards or 2 tents. Order via the Reviuzy admin (Settings → Welcome Kit). Ships within 48h.",
                    "Le premier recommande par annee est gratuit. Recommandes suivants: 25 $ pour 5 cartes ou 2 tents. Commandez via l'admin Reviuzy (Parametres → Trousse de bienvenue). Expedie dans les 48 h.",
                  )}
                </p>
              </div>
            </section>

            {/* CTA */}
            <section className="text-center">
              <h2 className="font-display text-2xl sm:text-3xl mb-4">
                {T(
                  "Ready to receive yours?",
                  "Pret a recevoir la votre?",
                )}
              </h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
                {T(
                  "Activate the Reviuzy add-on on Starter / Core / Growth ($100/mo) or upgrade to Agency tier (kit included). Kit ships within 24-48 hours of activation.",
                  "Activez l'add-on Reviuzy sur Starter / Core / Growth (100 $/mois) ou passez au forfait Agency (trousse incluse). La trousse expedie dans les 24-48 heures suivant l'activation.",
                )}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  asChild
                  size="lg"
                  className={`bg-gradient-to-r ${mood.accentGradient} text-background hover:opacity-90`}
                >
                  <Link to={isFr ? "/fr/forfaits-complets" : "/forfaits-complets"}>
                    {T("See plans + add-ons", "Voir forfaits + add-ons")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to={isFr ? "/fr/book-call" : "/book-call"}>
                    {T("Talk to a strategist", "Parler a un strategiste")}
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
