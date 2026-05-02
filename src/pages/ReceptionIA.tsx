import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Phone,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Star,
  ArrowRight,
  Mic,
  PhoneIncoming,
  PhoneForwarded,
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
 * /reception-ia
 *
 * Voice AI receptionist add-on landing. Answers calls 24/7 in
 * Quebec French + English, takes appointments, redirects emergencies,
 * captures lead info. Powered by AI voice infrastructure (Vapi/Retell
 * style, vendor-neutral per CLAUDE.md hard rule #10).
 *
 * Add-on: $200/month. Bundled in Agency tier.
 *
 * Why this matters: local commerces lose 30-40% of after-hours and
 * lunch-break calls. Even a 10% capture rate at $50 average
 * transaction = $1500-3000/month additional revenue per location.
 *
 * Mood: tech-corporate (precision, B2B-confident, suits the
 * voice-AI infrastructure positioning).
 */

export default function ReceptionIA() {
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
  const mood = getMood("tech-corporate");

  const capabilities = [
    {
      icon: PhoneIncoming,
      titleEn: "Answers in Quebec French + English",
      titleFr: "Repond en francais quebecois + anglais",
      descEn: "Native Quebec French intonation (not Parisian, not generic Canadian-English-French). Detects caller language in 2 seconds, speaks their language for the rest of the call. Switches mid-call if caller switches.",
      descFr: "Intonation francaise quebecoise native (pas parisienne, pas franco-canadienne generique). Detecte la langue de l'appelant en 2 secondes, parle dans sa langue pour le reste de l'appel. Change en cours d'appel si l'appelant change.",
    },
    {
      icon: Calendar,
      titleEn: "Books appointments directly into your calendar",
      titleFr: "Prend des rendez-vous directement dans votre calendrier",
      descEn: "Synced with Google Calendar, Outlook, Calendly, or your industry-specific booking tool (Dentrix, ClinicSense, Phorest for salons, etc.). Confirms in real time, sends SMS confirmation to caller, blocks the slot in your calendar.",
      descFr: "Synchronise avec Google Agenda, Outlook, Calendly ou votre outil de reservation specifique (Dentrix, ClinicSense, Phorest pour salons, etc.). Confirme en temps reel, envoie un SMS de confirmation a l'appelant, bloque le creneau dans votre agenda.",
    },
    {
      icon: AlertTriangle,
      titleEn: "Detects emergencies and routes correctly",
      titleFr: "Detecte les urgences et redirige correctement",
      descEn: "Trained on your industry's emergency keywords (\"chest pain\" + \"can't breathe\" for clinics; \"flooding\" + \"no heat\" for plumbers/HVAC; \"locked out\" + \"car accident\" for trades). Routes to your on-call line, your manager's cell, or 911 per the protocol you set.",
      descFr: "Entraine aux mots-cles d'urgence de votre industrie (« douleur thoracique » + « ne respire pas » pour cliniques; « inondation » + « pas de chaleur » pour plombiers/CVC; « accident d'auto » + « barre dehors » pour metiers). Redirige vers votre ligne de garde, le cellulaire du gerant ou le 911 selon le protocole que vous etablissez.",
    },
    {
      icon: PhoneForwarded,
      titleEn: "Captures lead info when you can't take the call",
      titleFr: "Capture les infos de prospect quand vous ne pouvez pas prendre l'appel",
      descEn: "If the caller is asking for a quote and you're with a customer, the receptionist takes their name, phone, the service they need, when they're free for a callback, and writes it to your CRM. You call them back when you're free instead of losing the lead.",
      descFr: "Si l'appelant demande une soumission et que vous etes avec un client, la receptionniste prend son nom, son telephone, le service qu'il veut, quand il est libre pour un rappel, et l'ecrit dans votre CRM. Vous le rappelez quand vous etes libre au lieu de perdre le prospect.",
    },
    {
      icon: Clock,
      titleEn: "24/7 coverage including holidays",
      titleFr: "Couverture 24/7 incluant les jours feries",
      descEn: "Calls at 11pm, Sunday morning, December 25 are all answered. The receptionist knows your business hours and tells the caller \"we open Tuesday at 9am, can I take your callback info?\" instead of letting the call go to voicemail (which 60% of callers hang up on).",
      descFr: "Les appels a 23 h, le dimanche matin, le 25 decembre sont tous repondus. La receptionniste connait vos heures d'ouverture et dit a l'appelant « on ouvre mardi a 9 h, puis-je prendre vos coordonnees pour rappel? » au lieu de laisser l'appel aller a la boite vocale (que 60 % des appelants raccrochent).",
    },
    {
      icon: Mic,
      titleEn: "Records + transcribes every call",
      titleFr: "Enregistre + transcrit chaque appel",
      descEn: "Audio recording + full text transcript stored in Reviuzy. Searchable by date, caller phone, keyword. Loi 25 compliant: caller is informed at the start of the call that recording is in progress and consents implicitly by continuing.",
      descFr: "Enregistrement audio + transcription textuelle integrale stockes dans Reviuzy. Recherchable par date, telephone de l'appelant, mot-cle. Conforme Loi 25: l'appelant est informe au debut de l'appel que l'enregistrement est en cours et consent implicitement en poursuivant.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {T(
            "AI Receptionist (Quebec FR+EN voice, 24/7) | AiLys",
            "Receptionniste IA (voix FR+EN quebecoise, 24/7) | AiLys",
          )}
        </title>
        <meta
          name="description"
          content={T(
            "AI receptionist add-on. Answers calls 24/7 in Quebec French + English, books appointments, detects emergencies, captures leads. $200/mo or bundled in Agency tier.",
            "Add-on de receptionniste IA. Repond aux appels 24/7 en francais quebecois + anglais, prend les rendez-vous, detecte les urgences, capture les prospects. 200 $/mois ou inclus dans Agency.",
          )}
        />
        <link rel="canonical" href="https://www.ailysagency.ca/reception-ia" />
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
                <span>{T("Add-on", "Add-on")} · $200/mo</span>
              </div>
              <div className="flex items-start gap-4 mb-6">
                <div className={`hidden sm:flex flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${mood.accentGradient} items-center justify-center shadow-xl`}>
                  <Phone className="w-7 h-7 text-background" />
                </div>
                <div className="flex-1">
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-4">
                    {T("AI Receptionist.", "Receptionniste IA.")}
                    <br />
                    <span className={`italic bg-gradient-to-r ${mood.accentGradient} bg-clip-text text-transparent`}>
                      {T("Never miss a call again.", "Ne ratez plus jamais un appel.")}
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    {T(
                      "A voice AI receptionist that answers your phone 24/7 in Quebec French + English. Books appointments, captures leads, detects emergencies, transcribes every call. Local commerces lose 30 to 40 percent of after-hours and lunch-break calls. Even a 10 percent capture rate at $50 average transaction is $1500 to $3000 per month per location, recovered.",
                      "Une receptionniste IA vocale qui repond a votre telephone 24/7 en francais quebecois + anglais. Prend les rendez-vous, capture les prospects, detecte les urgences, transcrit chaque appel. Les commerces locaux perdent 30 a 40 % des appels apres les heures et durant l'heure du diner. Meme un taux de capture de 10 % a 50 $ par transaction moyenne, c'est 1500 a 3000 $ par mois par emplacement, recuperes.",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs font-mono uppercase tracking-wider text-muted-foreground/80">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/40 bg-card/40">
                  <Clock className="w-3 h-3" />
                  {T("24/7 incl. holidays", "24/7 jours feries inclus")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/40 bg-card/40">
                  <Mic className="w-3 h-3" />
                  {T("Quebec FR + EN voice", "Voix quebecoise FR + EN")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/40 bg-card/40">
                  <Calendar className="w-3 h-3" />
                  {T("Calendar synced", "Synchronise au calendrier")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/40 bg-card/40">
                  <Star className="w-3 h-3" />
                  {T("Loi 25 compliant", "Conforme Loi 25")}
                </span>
              </div>
            </header>

            {/* 6 capabilities */}
            <section className="mb-16">
              <h2 className="font-display text-2xl sm:text-3xl mb-8">
                {T("What it does.", "Ce qu'elle fait.")}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {capabilities.map((c, i) => {
                  const Icon = c.icon;
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
                          {T(c.titleEn, c.titleFr)}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {T(c.descEn, c.descFr)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Use cases by vertical */}
            <section className="mb-16">
              <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-10">
                <h2 className="font-display text-2xl sm:text-3xl mb-6">
                  {T("Common scenarios by vertical.", "Scenarios courants par verticale.")}
                </h2>
                <div className="space-y-5">
                  {[
                    {
                      verticalEn: "Dental clinic",
                      verticalFr: "Clinique dentaire",
                      callEn: "\"Hi, I have a toothache, can I come in today?\"",
                      callFr: "« Bonjour, j'ai mal aux dents, puis-je passer aujourd'hui? »",
                      handlingEn: "Receptionist checks today's slots, offers earliest emergency opening, books, sends SMS confirmation, flags as 'urgence dentaire' in dentist's calendar.",
                      handlingFr: "Receptionniste verifie les disponibilites du jour, propose la premiere ouverture d'urgence, reserve, envoie un SMS de confirmation, marque « urgence dentaire » dans le calendrier du dentiste.",
                    },
                    {
                      verticalEn: "Plumber (after-hours)",
                      verticalFr: "Plombier (apres heures)",
                      callEn: "\"My basement is flooding, what do I do?\"",
                      callFr: "« Mon sous-sol est inonde, qu'est-ce que je fais? »",
                      handlingEn: "Detects emergency keywords. Walks the caller through immediate water-shutoff steps in their language. Pages the on-call plumber's cell. Books a follow-up estimate slot for the next morning.",
                      handlingFr: "Detecte les mots-cles d'urgence. Guide l'appelant sur la fermeture d'eau immediate dans sa langue. Appelle le cellulaire du plombier de garde. Reserve un creneau d'estimation pour le matin suivant.",
                    },
                    {
                      verticalEn: "Restaurant (peak hours)",
                      verticalFr: "Restaurant (heures de pointe)",
                      callEn: "\"Table for 6 tonight, do you have anything?\"",
                      callFr: "« Table pour 6 ce soir, avez-vous quelque chose? »",
                      handlingEn: "Reads OpenTable / Reslice availability, confirms 7:30pm, sends SMS reservation link. Saves the host 4 minutes per call so they can focus on guests in front of them.",
                      handlingFr: "Lit la disponibilite OpenTable / Reslice, confirme 19 h 30, envoie un lien SMS de reservation. Sauve 4 minutes par appel a l'hote pour qu'il puisse se concentrer sur les clients devant lui.",
                    },
                    {
                      verticalEn: "Nail salon (lunch closure)",
                      verticalFr: "Onglerie (fermeture du midi)",
                      callEn: "\"Do you do gel-X same day?\"",
                      callFr: "« Faites-vous le gel-X jour meme? »",
                      handlingEn: "Knows the salon's services + which technicians do gel-X + their schedule. Books the appointment, captures the customer's preferred language for the future visit.",
                      handlingFr: "Connait les services du salon + quels techniciens font le gel-X + leur horaire. Reserve le rendez-vous, capture la langue preferee de la cliente pour la visite future.",
                    },
                  ].map((scenario, i) => (
                    <div key={i} className="grid sm:grid-cols-[160px_1fr] gap-4 sm:gap-6 pb-5 border-b border-border/30 last:border-0 last:pb-0">
                      <div className="text-xs font-mono uppercase tracking-[0.18em] text-primary pt-1">
                        {T(scenario.verticalEn, scenario.verticalFr)}
                      </div>
                      <div>
                        <p className="text-sm italic text-foreground/85 mb-2">
                          {T(scenario.callEn, scenario.callFr)}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          → {T(scenario.handlingEn, scenario.handlingFr)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* What it doesn't do */}
            <section className="mb-16">
              <div className="rounded-3xl border border-amber-500/30 bg-amber-500/5 backdrop-blur-md p-6 sm:p-8">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                  <h2 className="font-display text-xl sm:text-2xl">
                    {T("What it does NOT do.", "Ce qu'elle ne fait PAS.")}
                  </h2>
                </div>
                <ul className="space-y-3 text-sm text-foreground/85 ml-9">
                  <li>{T("Doesn't pretend to be human. Tells callers \"this is the AiLys voice assistant for [Business]\" at the start of every call.", "Ne pretend pas etre humaine. Dit aux appelants « ceci est l'assistante vocale AiLys pour [Entreprise] » au debut de chaque appel.")}</li>
                  <li>{T("Doesn't process payments or take credit-card numbers (sensitive data + Loi 25 risk).", "Ne traite pas les paiements ni ne prend les numeros de carte de credit (donnees sensibles + risque Loi 25).")}</li>
                  <li>{T("Doesn't make sales pitches or upsell. Strictly information + booking + lead capture.", "Ne fait pas de promotion ou d'upsell. Strictement information + reservation + capture de prospect.")}</li>
                  <li>{T("Doesn't replace your team. Replaces voicemail + missed calls.", "Ne remplace pas votre equipe. Remplace la boite vocale + les appels manques.")}</li>
                </ul>
              </div>
            </section>

            {/* CTA */}
            <section className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 backdrop-blur-md p-6 sm:p-10 text-center">
              <h2 className="font-display text-2xl sm:text-3xl mb-3">
                {T(
                  "Try it for 30 days, refund if it doesn't pay for itself.",
                  "Essayez 30 jours, remboursement si elle ne se rentabilise pas.",
                )}
              </h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
                {T(
                  "$200/month add-on (or bundled in Agency tier). 30-day satisfaction guarantee. We track every call captured + every appointment booked. If the receptionist doesn't generate at least $200 of attributable bookings or recovered leads in month 1, full refund + cancellation.",
                  "200 $/mois en add-on (ou inclus dans Agency). Garantie de satisfaction 30 jours. Nous suivons chaque appel capture + chaque rendez-vous reserve. Si la receptionniste ne genere pas au moins 200 $ de reservations attribuables ou de prospects recuperes au mois 1, remboursement complet + annulation.",
                )}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  asChild
                  size="lg"
                  className={`bg-gradient-to-r ${mood.accentGradient} text-background hover:opacity-90`}
                >
                  <Link to={isFr ? "/fr/book-call" : "/book-call"}>
                    {T("Demo on a strategy call", "Demo durant un appel strategique")}
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
