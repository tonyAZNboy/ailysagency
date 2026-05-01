// Audit PDF download modal (Phase B.4.3.b).
//
// Posts to /api/audit-pdf with a synthesized AuditPdfPayload.
// The endpoint validates server-side, renders a 10-page PDF, and emails
// a HMAC-signed download link valid 24h. Falls back to direct stream
// when R2/HMAC bindings are not yet wired (B.4.3 fallback path).
//
// Security: client-side validation is UX only. All trust lives on the server.

import { useState } from "react";
import { FileDown, Mail, Check, Loader2, AlertTriangle } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import {
  isValidEmail,
  type AuditPdfPayload,
  type AuditScoreBand,
} from "@/lib/pdfRequestSchema";

interface Props {
  businessName: string;
  city: string;
  vertical: string;
  scoreNumeric: number;
  websiteUrl?: string | null;
  gbpUrl?: string | null;
  auditRunId?: string;
  /** Pre-fill the email input. Used when the user already entered email on unlock. */
  prefilledEmail?: string;
  /** Auto-open the form (skip the closed CTA). Used post-unlock to surface PDF send immediately. */
  autoOpen?: boolean;
}

function bandFromScore(score: number): AuditScoreBand {
  if (score >= 85) return "leader";
  if (score >= 70) return "strong";
  if (score >= 50) return "developing";
  if (score >= 30) return "weak";
  return "critical";
}

function buildPayload(props: Props): AuditPdfPayload {
  return {
    scoreBand: bandFromScore(props.scoreNumeric),
    scoreNumeric: Math.max(0, Math.min(100, Math.round(props.scoreNumeric))),
    citationMatrix: [],
    gbpSignals: [],
    competitors: [],
    actionItems: [],
    auditRunId: props.auditRunId,
  };
}

type Status = "idle" | "submitting" | "ok" | "error";

export function AuditPdfDownload(props: Props) {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(props.autoOpen ?? false);
  const [email, setEmail] = useState(props.prefilledEmail ?? "");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const labels = t.audit.results.pdfDownload;
  const apiLang = ["en", "fr", "es", "zh", "ar", "ru"].includes(lang)
    ? lang
    : "en";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setErrorMsg(null);
    if (!isValidEmail(email)) {
      setStatus("error");
      setErrorMsg(labels.emailInvalid);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/audit-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          lang: apiLang,
          businessName: props.businessName,
          location: props.city || null,
          vertical: props.vertical || "other",
          websiteUrl: props.websiteUrl ?? null,
          gbpUrl: props.gbpUrl ?? null,
          honeypot,
          payload: buildPayload(props),
        }),
      });
      if (!res.ok) {
        let msg = labels.errorGeneric;
        try {
          const data = (await res.json()) as { error?: string };
          if (typeof data?.error === "string") msg = data.error;
        } catch {
          // body might be a PDF stream on success-fallback; ignore
        }
        if (res.status === 429) msg = labels.errorRateLimit;
        if (res.status === 503) msg = labels.errorDisabled;
        setStatus("error");
        setErrorMsg(msg);
        return;
      }
      setStatus("ok");
    } catch {
      setStatus("error");
      setErrorMsg(labels.errorNetwork);
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/40 bg-primary/5 hover:bg-primary/10 text-xs font-medium text-primary transition-colors"
        data-testid="audit-pdf-download-open"
      >
        <FileDown className="w-3.5 h-3.5" />
        {labels.openCta}
      </button>
    );
  }

  if (status === "ok") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-emerald-400/30 bg-emerald-500/5 backdrop-blur-md p-5"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400 mb-2 inline-flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5" />
          {labels.successBadge}
        </div>
        <p className="text-sm leading-relaxed text-emerald-100/90 max-w-prose">
          {labels.successBody.replace("{email}", email)}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md p-5 space-y-3"
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary inline-flex items-center gap-1.5">
        <FileDown className="w-3.5 h-3.5" />
        {labels.formBadge}
      </div>
      <h4 className="font-display text-base sm:text-lg leading-tight">
        {labels.formHeading}
      </h4>
      <p className="text-xs text-muted-foreground leading-relaxed max-w-prose">
        {labels.formSubheading}
      </p>
      {/* Honeypot, off-screen, no aria, no label, hidden from sighted users */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute left-[-9999px] w-px h-px opacity-0"
        aria-hidden="true"
      />
      <label className="block">
        <span className="sr-only">{labels.emailLabel}</span>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder={labels.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "submitting"}
            className="w-full pl-10 pr-3 py-3 rounded-full bg-background border border-border/40 focus:border-primary/60 focus:ring-2 focus:ring-primary/30 outline-none text-sm transition-colors min-h-[44px]"
            data-testid="audit-pdf-download-email"
          />
        </div>
      </label>
      {status === "error" && errorMsg && (
        <div className="flex items-start gap-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-400/30 rounded-lg px-3 py-2">
          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-none" />
          <span>{errorMsg}</span>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="submit"
          disabled={status === "submitting" || email.length === 0}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium transition-colors min-h-[44px]"
          data-testid="audit-pdf-download-submit"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              {labels.submitting}
            </>
          ) : (
            <>
              <FileDown className="w-3.5 h-3.5" />
              {labels.submitCta}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setStatus("idle");
            setErrorMsg(null);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-border/40 hover:border-primary/40 text-xs font-medium transition-colors min-h-[44px]"
        >
          {labels.cancel}
        </button>
      </div>
      <p className="text-[10px] text-muted-foreground/80 leading-relaxed">
        {labels.privacyNote}
      </p>
    </form>
  );
}
