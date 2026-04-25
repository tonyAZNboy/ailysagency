import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, Rocket, Mail } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

type EmailProvider = "gmail" | "outlook" | "apple" | "custom";

export default function Signup() {
  const [name, setName] = useState("");
  const [businessProfile, setBusinessProfile] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [emailProvider, setEmailProvider] = useState<EmailProvider | null>(null);
  const [customEmail, setCustomEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLang();

  const s = t.signup;

  const providerSuffixes: Record<string, string> = {
    gmail: "@gmail.com",
    outlook: "@outlook.com",
    apple: "@icloud.com",
  };

  const finalEmail = emailProvider === "custom"
    ? customEmail
    : emailProvider && email
      ? `${email}${providerSuffixes[emailProvider] || ""}`
      : "";

  const handleProviderSelect = (provider: EmailProvider) => {
    setEmailProvider(provider);
    if (provider !== "custom") {
      setEmail("");
      setCustomEmail("");
    }
  };

  const isValidEmail = (e: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(e)) return false;
    const blocked = [
      "mailinator.com", "guerrillamail.com", "tempmail.com", "throwaway.email",
      "yopmail.com", "sharklasers.com", "trashmail.com", "fakeinbox.com",
      "10minutemail.com", "guerrillamailblock.com", "grr.la", "dispostable.com",
      "maildrop.cc", "mailnesia.com", "mintemail.com", "tempail.com",
      "mohmal.com", "burpcollaborator.net", "temp-mail.org", "emailondeck.com",
      "getnada.com", "inboxbear.com", "spamgourmet.com", "mytemp.email",
      "disposableemailaddresses.emailmiser.com", "jetable.org", "trash-mail.com",
      "guerrillamail.info", "guerrillamail.net", "guerrillamail.de",
      "mailcatch.com", "tmail.ws", "harakirimail.com", "mailexpire.com",
    ];
    const domain = e.split("@")[1]?.toLowerCase();
    if (!domain || blocked.includes(domain)) return false;
    const domainParts = domain.split(".");
    if (domainParts[0].length < 2) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = finalEmail.trim().toLowerCase();

    if (!name.trim() || !businessProfile.trim() || !city.trim() || !trimmedEmail) {
      toast({ title: s.errorMissingFields, description: s.errorMissingFieldsDesc, variant: "destructive" });
      return;
    }

    if (name.trim().length > 100 || businessProfile.trim().length > 150 || city.trim().length > 100) {
      toast({ title: s.errorTooLong, description: s.errorTooLongDesc, variant: "destructive" });
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      toast({ title: s.errorInvalidEmail, description: s.errorInvalidEmailDesc, variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      const { data: existingEmail } = await supabase
        .from("prelaunch_signups")
        .select("id")
        .eq("email", trimmedEmail)
        .maybeSingle();

      if (existingEmail) {
        toast({ title: s.alreadyRegistered, description: s.alreadyRegisteredDesc, variant: "default" });
        setLoading(false);
        return;
      }

      const trimmedProfile = businessProfile.trim();
      const { data: existingProfiles } = await supabase
        .from("prelaunch_signups")
        .select("id, source")
        .ilike("source", `%|${trimmedProfile}|%`);

      if (existingProfiles && existingProfiles.length > 0) {
        toast({ title: s.businessRegistered, description: s.businessRegisteredDesc, variant: "default" });
        setLoading(false);
        return;
      }

      const { error } = await supabase
        .from("prelaunch_signups")
        .insert([{
          email: trimmedEmail,
          name: name.trim(),
          source: `signup_page|${businessProfile.trim()}|${city.trim()}`,
        }]);

      if (error) throw error;

      setSubmitted(true);
      toast({ title: s.successTitle, description: s.successDesc });
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: s.errorGeneric,
        description: error.message?.includes("duplicate")
          ? s.errorDuplicate
          : s.errorTryLater,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>{s.successPageTitle}</title>
          <meta name="description" content={s.successPageDesc} />
        </Helmet>
        <main className="min-h-screen grid place-items-center bg-background text-foreground p-4">
          <Card className="w-full max-w-sm sm:max-w-md text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">{s.onTheList}</CardTitle>
              <CardDescription className="text-base mt-2">
                {s.willNotify} <strong>{finalEmail}</strong> {s.whenLive}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {s.thankYou} <strong>{name}</strong>! {s.excitedToHave} <strong>{businessProfile}</strong> ({city}) {s.onboard}
                </p>
              </div>
              <Link to="/">
                <Button variant="outline" className="w-full">
                  {s.backToHome}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  const providers = [
    { id: "gmail" as EmailProvider, label: "Google", icon: "G", suffix: "@gmail.com", colors: "border-red-300 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-950/20" },
    { id: "outlook" as EmailProvider, label: "Microsoft", icon: "M", suffix: "@outlook.com", colors: "border-blue-300 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20" },
    { id: "apple" as EmailProvider, label: "Apple", icon: "", suffix: "@icloud.com", colors: "border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-950/20" },
  ];

  return (
    <>
      <Helmet>
        <title>{s.pageTitle}</title>
        <meta name="description" content={s.pageDesc} />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : ""} />
      </Helmet>
      <main className="min-h-screen grid place-items-center bg-background text-foreground p-4">
        <Card className="w-full max-w-sm sm:max-w-md">
          <CardHeader>
            <Button variant="ghost" size="sm" className="w-fit -ml-2 mb-2" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              {s.back}
            </Button>
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-primary" />
              <CardTitle>{s.title}</CardTitle>
            </div>
            <CardDescription>{s.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-5 p-3 rounded-lg border border-primary/20 bg-primary/5">
              <p className="text-sm font-medium text-primary">🎉 {s.earlyBird}</p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">{s.fullName} <span className="text-destructive">*</span></Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={100}
                  autoComplete="name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="business">{s.businessName} <span className="text-destructive">*</span></Label>
                <Input
                  id="business"
                  type="text"
                  placeholder={s.businessPlaceholder}
                  value={businessProfile}
                  onChange={(e) => setBusinessProfile(e.target.value)}
                  required
                  maxLength={150}
                  autoComplete="organization"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">{s.city} <span className="text-destructive">*</span></Label>
                <Input
                  id="city"
                  type="text"
                  placeholder={s.cityPlaceholder}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  maxLength={100}
                  autoComplete="address-level2"
                />
              </div>

              {/* Email provider selection */}
              <div className="grid gap-2">
                <Label>{s.emailLabel} <span className="text-destructive">*</span></Label>
                <div className="grid grid-cols-2 gap-2">
                  {providers.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleProviderSelect(p.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                        emailProvider === p.id
                          ? "ring-2 ring-primary border-primary bg-primary/5"
                          : p.colors
                      }`}
                    >
                      <span className="text-base font-bold">{p.icon}</span>
                      <span>{p.label}</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleProviderSelect("custom")}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                      emailProvider === "custom"
                        ? "ring-2 ring-primary border-primary bg-primary/5"
                        : "border-muted-foreground/30 hover:border-muted-foreground/50 hover:bg-muted/50"
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>{s.otherEmail}</span>
                  </button>
                </div>

                {/* Email input for provider */}
                {emailProvider && emailProvider !== "custom" && (
                  <div className="flex items-center gap-0 mt-1">
                    <Input
                      type="text"
                      placeholder={s.usernamePlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value.replace(/[@\s]/g, ""))}
                      required
                      maxLength={100}
                      autoComplete="email"
                      className="rounded-r-none border-r-0"
                    />
                    <span className="inline-flex items-center px-3 h-9 bg-muted border border-l-0 border-input rounded-r-md text-sm text-muted-foreground whitespace-nowrap">
                      {providers.find(p => p.id === emailProvider)?.suffix}
                    </span>
                  </div>
                )}

                {/* Custom email input */}
                {emailProvider === "custom" && (
                  <Input
                    type="email"
                    placeholder={s.emailPlaceholder}
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    required
                    maxLength={255}
                    autoComplete="email"
                    className="mt-1"
                  />
                )}
              </div>

              <Button type="submit" disabled={loading || !emailProvider} className="w-full">
                {loading ? s.joining : s.joinButton}
              </Button>
            </form>

            <p className="mt-6 text-sm text-muted-foreground text-center">
              {s.alreadyHaveAccount}{" "}
              <Link to="/auth/login" className="underline underline-offset-4">{s.signIn}</Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
