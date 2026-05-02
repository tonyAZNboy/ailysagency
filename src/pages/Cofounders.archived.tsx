// Cofounders / Partners application page.
//
// Recruitment surface for partner candidates who bring access to a
// specific community (linguistic, vertical, or geographic) and want to
// help AiLys cover under-served niches. The form captures contact info,
// the community they bring, the communities they think we should
// prospect next, and motivation. Submitted to /api/cofounders-apply
// (Cloudflare Pages Function with Gov-grade validation).
//
// Routes:
//   /cofounders, /:lang/cofounders   (English-canonical)
//   /cofondateurs, /:lang/cofondateurs (French-Canadian)
//
// All copy goes through useLang() so 16 locales render natively.

import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { SEOHead } from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLang } from "@/i18n/LangContext";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  CheckCircle2,
  Send,
  Globe,
  Users,
  Briefcase,
  Sparkles,
  AlertCircle,
} from "lucide-react";

const INTEREST_TAGS: { value: string; iconKey: "globe" | "vertical" | "ops" }[] = [
  { value: "fr_canada", iconKey: "globe" },
  { value: "es_latam", iconKey: "globe" },
  { value: "zh_china", iconKey: "globe" },
  { value: "zh_taiwan", iconKey: "globe" },
  { value: "ar_mena", iconKey: "globe" },
  { value: "ru_eastern_europe", iconKey: "globe" },
  { value: "uk_ukraine", iconKey: "globe" },
  { value: "sr_balkans", iconKey: "globe" },
  { value: "pt_brazil", iconKey: "globe" },
  { value: "ja_japan", iconKey: "globe" },
  { value: "ko_korea", iconKey: "globe" },
  { value: "hi_india", iconKey: "globe" },
  { value: "vi_vietnam", iconKey: "globe" },
  { value: "tr_turkey", iconKey: "globe" },
  { value: "de_dach", iconKey: "globe" },
  { value: "it_italy", iconKey: "globe" },
  { value: "nl_benelux", iconKey: "globe" },
  { value: "vertical_dental", iconKey: "vertical" },
  { value: "vertical_legal", iconKey: "vertical" },
  { value: "vertical_restaurant", iconKey: "vertical" },
  { value: "vertical_realestate", iconKey: "vertical" },
  { value: "vertical_clinic", iconKey: "vertical" },
  { value: "vertical_contractor", iconKey: "vertical" },
  { value: "vertical_hotel", iconKey: "vertical" },
  { value: "operations_quebec", iconKey: "ops" },
  { value: "ops_growth_marketing", iconKey: "ops" },
  { value: "ops_engineering", iconKey: "ops" },
  { value: "ops_design", iconKey: "ops" },
  { value: "ops_sales", iconKey: "ops" },
];

export default function Cofounders() {
  const { t } = useLang();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [community, setCommunity] = useState("");
  const [interests, setInterests] = useState<Set<string>>(new Set());
  const [missingCommunities, setMissingCommunities] = useState("");
  const [motivation, setMotivation] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const validation = useMemo(() => {
    const errors: string[] = [];
    if (name.trim().length < 2) errors.push(t.cofounders.errorName);
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email.trim())) errors.push(t.cofounders.errorEmail);
    if (linkedin && !/^https?:\/\//i.test(linkedin)) errors.push(t.cofounders.errorLinkedin);
    return errors;
  }, [name, email, linkedin, t.cofounders]);

  const toggleInterest = (tag: string) =>
    setInterests((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });

  const submit = async () => {
    if (validation.length > 0 || honeypot.length > 0) return;
    setSubmitting(true);
    try {
      const resp = await fetch("/api/cofounders-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          linkedin: linkedin.trim() || undefined,
          community: community.trim() || undefined,
          interests: Array.from(interests),
          missingCommunities: missingCommunities.trim() || undefined,
          motivation: motivation.trim() || undefined,
          honeypot,
          lang: t.cofounders.lang,
          source: "cofounders",
        }),
      });
      if (!resp.ok) {
        const j = await resp.json().catch(() => ({}));
        toast({
          title: t.cofounders.toastErrorTitle,
          description: j.error ?? "",
          variant: "destructive",
        });
        return;
      }
      setSubmitted(true);
      toast({ title: t.cofounders.toastSuccessTitle });
    } catch (err) {
      toast({
        title: t.cofounders.toastErrorTitle,
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const groupedInterests = useMemo(() => {
    return {
      languages: INTEREST_TAGS.filter((t) => t.iconKey === "globe"),
      verticals: INTEREST_TAGS.filter((t) => t.iconKey === "vertical"),
      operations: INTEREST_TAGS.filter((t) => t.iconKey === "ops"),
    };
  }, []);

  return (
    <>
      <SEOHead
        title={t.cofounders.metaTitle}
        description={t.cofounders.metaDescription}
        canonicalUrl="https://www.ailysagency.ca/cofounders"
      />
      <NetworkBackground
        backgroundColor="#050505"
        nodeColor="#A78BFA"
        lineColor="#22D3EE"
        nodeCount={28}
        mobileNodeCount={16}
        connectionDistance={140}
        mouseInfluenceRadius={200}
        mouseInfluenceStrength={0.15}
      />
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="pt-24 pb-24">
          {/* Hero */}
          <section className="relative px-4 max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-400/30 bg-violet-500/[0.06] backdrop-blur-sm mb-6">
              <Sparkles className="w-3 h-3 text-violet-300" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet-200">
                {t.cofounders.eyebrow}
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-6">
              {t.cofounders.heading1}
              <br />
              <span className="italic bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
                {t.cofounders.heading2}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t.cofounders.subheading}
            </p>
          </section>

          {/* Value props */}
          <section className="px-4 max-w-5xl mx-auto mb-16">
            <div className="grid md:grid-cols-3 gap-4">
              <ValueProp
                icon={<Globe className="w-5 h-5 text-cyan-400" />}
                title={t.cofounders.value1Title}
                body={t.cofounders.value1Body}
              />
              <ValueProp
                icon={<Users className="w-5 h-5 text-violet-400" />}
                title={t.cofounders.value2Title}
                body={t.cofounders.value2Body}
              />
              <ValueProp
                icon={<Briefcase className="w-5 h-5 text-amber-400" />}
                title={t.cofounders.value3Title}
                body={t.cofounders.value3Body}
              />
            </div>
          </section>

          {/* Application form */}
          <section className="px-4 max-w-3xl mx-auto">
            {submitted ? (
              <Card className="border-emerald-500/40">
                <CardContent className="py-12 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h2 className="font-display text-3xl">{t.cofounders.successHeading}</h2>
                  <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
                    {t.cofounders.successBody}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{t.cofounders.formTitle}</CardTitle>
                  <CardDescription>{t.cofounders.formDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Honeypot — visually hidden, must stay empty */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="absolute opacity-0 pointer-events-none w-0 h-0"
                    aria-hidden
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="name">{t.cofounders.fieldName} *</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={200}
                        autoComplete="name"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email">{t.cofounders.fieldEmail} *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={254}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="phone">{t.cofounders.fieldPhone}</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        maxLength={50}
                        autoComplete="tel"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="linkedin">{t.cofounders.fieldLinkedin}</Label>
                      <Input
                        id="linkedin"
                        type="url"
                        placeholder="https://linkedin.com/in/..."
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        maxLength={500}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="community">{t.cofounders.fieldCommunity}</Label>
                    <Input
                      id="community"
                      placeholder={t.cofounders.fieldCommunityPlaceholder}
                      value={community}
                      onChange={(e) => setCommunity(e.target.value)}
                      maxLength={200}
                    />
                    <p className="text-[11px] text-muted-foreground">
                      {t.cofounders.fieldCommunityHelp}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label>{t.cofounders.interestsLabel}</Label>
                    <p className="text-[11px] text-muted-foreground -mt-2">
                      {t.cofounders.interestsHelp}
                    </p>

                    <InterestGroup
                      title={t.cofounders.interestsLanguagesTitle}
                      tags={groupedInterests.languages.map((tag) => tag.value)}
                      selected={interests}
                      onToggle={toggleInterest}
                      labels={t.cofounders.tagLabels as Record<string, string>}
                    />
                    <InterestGroup
                      title={t.cofounders.interestsVerticalsTitle}
                      tags={groupedInterests.verticals.map((tag) => tag.value)}
                      selected={interests}
                      onToggle={toggleInterest}
                      labels={t.cofounders.tagLabels as Record<string, string>}
                    />
                    <InterestGroup
                      title={t.cofounders.interestsOpsTitle}
                      tags={groupedInterests.operations.map((tag) => tag.value)}
                      selected={interests}
                      onToggle={toggleInterest}
                      labels={t.cofounders.tagLabels as Record<string, string>}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="missing">{t.cofounders.fieldMissing}</Label>
                    <Textarea
                      id="missing"
                      placeholder={t.cofounders.fieldMissingPlaceholder}
                      value={missingCommunities}
                      onChange={(e) => setMissingCommunities(e.target.value)}
                      maxLength={1500}
                      rows={4}
                    />
                    <p className="text-[11px] text-muted-foreground">
                      {t.cofounders.fieldMissingHelp}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="motivation">{t.cofounders.fieldMotivation}</Label>
                    <Textarea
                      id="motivation"
                      placeholder={t.cofounders.fieldMotivationPlaceholder}
                      value={motivation}
                      onChange={(e) => setMotivation(e.target.value)}
                      maxLength={1500}
                      rows={4}
                    />
                  </div>

                  {validation.length > 0 && (
                    <Alert variant="destructive">
                      <AlertCircle className="w-4 h-4" />
                      <AlertDescription>
                        <ul className="list-disc list-inside text-sm">
                          {validation.map((err) => (
                            <li key={err}>{err}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    onClick={submit}
                    disabled={submitting || validation.length > 0}
                    className="w-full"
                    size="lg"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> {t.cofounders.submitting}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" /> {t.cofounders.submit}
                      </>
                    )}
                  </Button>

                  <p className="text-[11px] text-muted-foreground text-center">
                    {t.cofounders.legal}
                  </p>
                </CardContent>
              </Card>
            )}
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

function ValueProp({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Card className="bg-card/40 backdrop-blur-md">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-3">
          {icon}
          <h3 className="font-semibold text-sm">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
      </CardContent>
    </Card>
  );
}

function InterestGroup({
  title,
  tags,
  selected,
  onToggle,
  labels,
}: {
  title: string;
  tags: string[];
  selected: Set<string>;
  onToggle: (tag: string) => void;
  labels: Record<string, string>;
}) {
  return (
    <div className="space-y-2">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isOn = selected.has(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onToggle(tag)}
              className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                isOn
                  ? "bg-primary/15 border-primary/60 text-primary"
                  : "bg-background/30 border-border/40 text-muted-foreground hover:border-border"
              }`}
            >
              {labels[tag] ?? tag}
              {isOn && <Badge variant="secondary" className="ml-2 text-[9px]">✓</Badge>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
