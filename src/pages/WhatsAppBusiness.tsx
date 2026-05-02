import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  MessageCircle,
  Globe,
  Star,
  CheckCircle2,
  ArrowRight,
  Users,
  Clock,
  Inbox,
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
 * /whatsapp-business
 *
 * WhatsApp Business integration add-on landing.
 *
 * Why this matters in Quebec: WhatsApp is the dominant messaging
 * channel for several large communities in Greater Montreal:
 *  - Latino (Mexican, Colombian, Salvadoran, Peruvian, etc.)
 *  - Maghrebi (Moroccan, Algerian, Tunisian)
 *  - Portuguese
 *  - Indian + Pakistani
 *  - Lebanese + Syrian
 *  - Vietnamese (smaller WhatsApp share, more Zalo/Viber)
 *
 * Local commerces serving these neighborhoods (Cote-des-Neiges,
 * Plateau, Brossard, St-Michel, Park-Extension, Pierrefonds) lose
 * 15-30% of would-be inquiries because they only offer Google Forms
 * or phone, not WhatsApp.
 *
 * Add-on: $80/month. Bundled in Agency tier.
 *
 * Mood: friendly-local (warm pastel + coral, suits the personal
 * messaging context).
 */

export default function WhatsAppBusiness() {
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
  const mood = getMood("friendly-local");

  const features = [
    {
      icon: MessageCircle,
      titleEn: "WhatsApp Business API connected to your number",
      titleFr: "API WhatsApp Business connectee a votre numero",
      descEn: "Verified business profile (green checkmark eligible). Customers can message your existing business number on WhatsApp the same way they message friends. Replies go through your team or AI assistant.",
      descFr: "Profil d'entreprise verifie (eligible au crochet vert). Les clients peuvent envoyer un message a votre numero d'affaires existant sur WhatsApp comme ils ecrivent a des amis. Les reponses passent par votre equipe ou par l'assistant IA.",
    },
    {
      icon: Globe,
      titleEn: "Multi-language auto-replies",
      titleFr: "Reponses automatiques multilingues",
      descEn: "Detects the language of the incoming message (FR, EN, ES, AR, PT, ZH, VI, etc.) and replies in that language. Templates pre-built per industry: appointment booking, quote request, after-hours auto-reply, common FAQ.",
      descFr: "Detecte la langue du message entrant (FR, EN, ES, AR, PT, ZH, VI, etc.) et repond dans cette langue. Modeles preconstuits par industrie: prise de rendez-vous, demande de soumission, reponse automatique apres heures, FAQ courantes.",
    },
    {
      icon: Inbox,
      titleEn: "Unified inbox across SMS + WhatsApp + Messenger + Instagram DM",
      titleFr: "Boite de reception unifiee pour SMS + WhatsApp + Messenger + Instagram DM",
      descEn: "All inbound messages from every channel land in a single Reviuzy inbox. Your team replies once, the response goes back through the channel the customer used. No more juggling 4 apps.",
      descFr: "Tous les messages entrants de chaque canal arrivent dans une seule boite Reviuzy. Votre equipe repond une fois, la reponse retourne par le canal qu'a utilise le client. Plus besoin de jongler entre 4 applications.",
    },
    {
      icon: Users,
      titleEn: "Group broadcasts (compliant with WhatsApp policy)",
      titleFr: "Diffusion de groupe (conforme a la politique WhatsApp)",
      descEn: "Send appointment reminders, monthly promos, or community updates to opted-in customers in batches. WhatsApp's Business API is strict about consent (Loi 25 grade by default); we ensure templates are pre-approved by Meta and audit-logged per send.",
      descFr: "Envoyez des rappels de rendez-vous, des promotions mensuelles ou des mises a jour communautaires aux clients consentants par lots. L'API WhatsApp Business est stricte sur le consentement (niveau Loi 25 par defaut); nous nous assurons que les modeles sont pre-approuves par Meta et journalises par envoi.",
    },
    {
      icon: Clock,
      titleEn: "Business-hours awareness",
      titleFr: "Conscience des heures d'ouverture",
      descEn: "After-hours messages get an automatic \"we'll get back to you tomorrow at 9am\" response in the customer's language. During business hours, urgent keywords (cancellation, emergency) get prioritized in the inbox.",
      descFr: "Les messages apres heures recoivent une reponse automatique « nous reviendrons vers vous demain a 9 h » dans la langue du client. Durant les heures d'ouverture, les mots-cles urgents (annulation, urgence) sont priorises dans la boite de reception.",
    },
    {
      icon: Star,
      titleEn: "Review request after positive WhatsApp interaction",
      titleFr: "Demande d'avis apres une interaction WhatsApp positive",
      descEn: "When a WhatsApp conversation closes positively (booking confirmed, question answered, problem resolved), the system optionally sends a Google review link 24 hours later. Captures reviews from customers who don't tap the NFC at the counter.",
      descFr: "Quand une conversation WhatsApp se termine positivement (reservation confirmee, question repondue, probleme regle), le systeme envoie optionnellement un lien d'avis Google 24 heures plus tard. Capture les avis des clients qui ne tapent pas le NFC au comptoir.",
    },
  ];

  const verticals = [
    { en: "Latino restos in Cote-des-Neiges", fr: "Restos latinos a Cote-des-Neiges" },
    { en: "Maghrebi grocery + halal butchers in St-Michel", fr: "Epiceries maghrebines + boucheries halal a St-Michel" },
    { en: "Portuguese bakeries in the Plateau", fr: "Boulangeries portugaises au Plateau" },
    { en: "Indian + Pakistani salons in Pierrefonds", fr: "Salons indiens + pakistanais a Pierrefonds" },
    { en: "Lebanese + Syrian restos in Park-Extension", fr: "Restos libanais + syriens a Park-Extension" },
    { en: "Brossard sushi counters with Mandarin clientele", fr: "Comptoirs sushi a Brossard avec clientele mandarine" },
  ];

  return (
    <>
      <Helmet>
        <title>
          {T(
            "WhatsApp Business integration for multilingual neighborhoods | AiLys",
            "Integration WhatsApp Business pour quartiers multilingues | AiLys",
          )}
        </title>
        <meta
          name="description"
          content={T(
            "WhatsApp Business add-on for Quebec PMEs serving Latino, Maghrebi, Portuguese, Indian, Lebanese clientele. Multi-language auto-replies, unified inbox, Loi 25 compliant. $80/mo or bundled in Agency.",
            "Add-on WhatsApp Business pour PME quebecoises servant clientele latino, maghrebine, portugaise, indienne, libanaise. Reponses auto multilingues, boite unifiee, conforme Loi 25. 80 $/mois ou inclus dans Agency.",
          )}
        />
        <link rel="canonical" href="https://www.ailysagency.ca/whatsapp-business" />
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
                <span>{T("Add-on", "Add-on")} · $80/mo</span>
              </div>
              <div className="flex items-start gap-4 mb-6">
                <div className={`hidden sm:flex flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${mood.accentGradient} items-center justify-center shadow-xl`}>
                  <MessageCircle className="w-7 h-7 text-background" />
                </div>
                <div className="flex-1">
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-4">
                    {T("WhatsApp Business.", "WhatsApp Business.")}
                    <br />
                    <span className={`italic bg-gradient-to-r ${mood.accentGradient} bg-clip-text text-transparent`}>
                      {T("For your real customers.", "Pour vos vrais clients.")}
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    {T(
                      "WhatsApp is the dominant messaging channel for several large Greater Montreal communities (Latino, Maghrebi, Portuguese, Indian, Pakistani, Lebanese). Commerces serving these neighborhoods lose 15 to 30 percent of would-be inquiries because they only offer Google Forms or phone, not WhatsApp. This add-on connects your business number to the WhatsApp Business API with multi-language auto-replies, a unified inbox, and Loi 25 compliant consent flows.",
                      "WhatsApp est le canal de messagerie dominant pour plusieurs grandes communautes du Grand Montreal (latino, maghrebine, portugaise, indienne, pakistanaise, libanaise). Les commerces servant ces quartiers perdent 15 a 30 % des demandes potentielles parce qu'ils n'offrent que des formulaires Google ou le telephone, pas WhatsApp. Cet add-on connecte votre numero d'affaires a l'API WhatsApp Business avec reponses automatiques multilingues, boite de reception unifiee et flux de consentement conformes Loi 25.",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs font-mono uppercase tracking-wider text-muted-foreground/80">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/40 bg-card/40">
                  <Globe className="w-3 h-3" />
                  {T("12+ languages auto-detect", "12+ langues auto-detectees")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/40 bg-card/40">
                  <Inbox className="w-3 h-3" />
                  {T("Unified inbox SMS+WA+FB+IG", "Boite unifiee SMS+WA+FB+IG")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/40 bg-card/40">
                  <CheckCircle2 className="w-3 h-3" />
                  {T("Loi 25 + Meta compliant", "Conforme Loi 25 + Meta")}
                </span>
              </div>
            </header>

            {/* 6 features */}
            <section className="mb-16">
              <h2 className="font-display text-2xl sm:text-3xl mb-8">
                {T("What's included.", "Ce qui est inclus.")}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={i}
                      className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md p-6"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${mood.accentGradient} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-5 h-5 text-background" />
                        </div>
                        <h3 className="font-display text-lg leading-tight pt-1.5">
                          {T(f.titleEn, f.titleFr)}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {T(f.descEn, f.descFr)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Who benefits most */}
            <section className="mb-16">
              <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-10">
                <h2 className="font-display text-2xl sm:text-3xl mb-3">
                  {T("Who benefits most.", "Qui en beneficie le plus.")}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                  {T(
                    "Quebec PMEs whose customer base includes communities where WhatsApp is the default messaging app. If a meaningful share of your walk-ins speak Spanish, Arabic, Portuguese, Hindi, Urdu, or another WhatsApp-dominant language at home, this add-on pays for itself fast.",
                    "PME quebecoises dont la clientele inclut des communautes ou WhatsApp est l'application de messagerie par defaut. Si une part significative de vos clients parlent espagnol, arabe, portugais, hindi, ourdou ou une autre langue dominee par WhatsApp a la maison, cet add-on se rentabilise rapidement.",
                  )}
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {verticals.map((v, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                      <Star className="w-3.5 h-3.5 text-primary/70 flex-shrink-0 mt-1" />
                      <span>{T(v.en, v.fr)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Loi 25 + Meta compliance note */}
            <section className="mb-16">
              <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 backdrop-blur-md p-6 sm:p-8">
                <h2 className="font-display text-xl sm:text-2xl mb-4">
                  {T("Compliance baked in.", "Conformite integree.")}
                </h2>
                <ul className="space-y-3 text-sm text-foreground/85">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{T("Customer-initiated conversations are always free; broadcast/marketing messages require explicit Loi 25 consent recorded in the audit log.", "Les conversations initiees par le client sont toujours gratuites; les messages de diffusion/marketing exigent un consentement explicite Loi 25 journalise.")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{T("Meta-approved message templates only (we handle the submission). Avoids account suspension that hits 30 percent of self-managed WhatsApp Business accounts in year 1.", "Modeles de message approuves par Meta uniquement (nous gerons la soumission). Evite la suspension de compte qui touche 30 % des comptes WhatsApp Business autogeres en annee 1.")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{T("STOP keyword in any language unsubscribes the customer + permanently removes their number within 7 days (Loi 25 right to be forgotten).", "Mot-cle ARRET dans n'importe quelle langue desabonne le client + retire definitivement son numero dans les 7 jours (droit a l'oubli Loi 25).")}</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* CTA */}
            <section className="text-center">
              <h2 className="font-display text-2xl sm:text-3xl mb-3">
                {T(
                  "Plug it into your existing number.",
                  "Connectez-le a votre numero existant.",
                )}
              </h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
                {T(
                  "$80/month add-on. Setup in 7 to 14 business days (Meta verification timeline). 30-day satisfaction guarantee. Bundled at no extra cost in the Agency tier.",
                  "80 $/mois en add-on. Configuration en 7 a 14 jours ouvrables (delai de verification Meta). Garantie de satisfaction 30 jours. Inclus sans cout additionnel dans le forfait Agency.",
                )}
              </p>
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
                    {T("See all add-ons", "Voir tous les add-ons")}
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
