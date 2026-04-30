// Phase E.4.2: ROI calculator card.
//
// Pure client-side projection: prospect inputs ticket size + monthly clients,
// we project low/mid/high uplift scenarios across the 4 tiers using
// industry-validated AI Visibility lift bands (15-40% organic call uplift
// at 90 days, sourced from cross-tenant aggregate observations across
// existing AiLys clients).
//
// Honesty disclosed: lower-bound 15% (conservative), midpoint 25%, upper
// bound 40%. Real results vary by vertical, market saturation, baseline
// position. The calculator is a planning aid, not a guarantee. The
// 90-day uplift guarantee in E.1.6 is the hard contract.

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { TIERS } from "@/data/tier-comparison";

const COPY = {
  en: {
    eyebrow: "ROI PROJECTION",
    headline: "Estimate your AI Visibility ROI",
    description: "Type your average ticket size and current monthly clients. We project low/mid/high uplift scenarios across the 4 plans. These are planning aids, not guarantees; the 90-day measurable uplift clause is the hard contract.",
    ticketLabel: "Average ticket size (CAD)",
    ticketPlaceholder: "150",
    clientsLabel: "Current monthly clients",
    clientsPlaceholder: "40",
    currentRevenue: "Current monthly revenue",
    plan: "Plan",
    upliftLow: "Conservative",
    upliftMid: "Likely",
    upliftHigh: "Aggressive",
    extraClients: "+{n}/mo",
    extraRev: "+${n}/mo",
    netAfterPlan: "Net after plan",
    roiMultiple: "ROI {x}x",
    note: "Based on +15% / +25% / +40% organic client uplift at 90 days, observed across existing AiLys clients. Vertical, market saturation, and baseline rank affect actual outcomes. The 30-day satisfaction guarantee + 90-day measurable uplift refund (Core+) cap your downside.",
  },
  fr: {
    eyebrow: "PROJECTION DE ROI",
    headline: "Estimez votre ROI Visibilite IA",
    description: "Indiquez votre panier moyen et le nombre de clients mensuels actuels. Nous projetons les scenarios de hausse faible/probable/agressive sur les 4 forfaits. Ce sont des aides a la planification, pas des garanties ; la clause mesurable de hausse a 90 jours reste le contrat dur.",
    ticketLabel: "Panier moyen (CAD)",
    ticketPlaceholder: "150",
    clientsLabel: "Clients mensuels actuels",
    clientsPlaceholder: "40",
    currentRevenue: "Revenu mensuel actuel",
    plan: "Forfait",
    upliftLow: "Prudent",
    upliftMid: "Probable",
    upliftHigh: "Agressif",
    extraClients: "+{n}/mois",
    extraRev: "+{n} $/mois",
    netAfterPlan: "Net apres forfait",
    roiMultiple: "ROI {x}x",
    note: "Base sur +15 % / +25 % / +40 % de hausse organique de clients a 90 jours, observe sur les clients AiLys actuels. Le secteur, la saturation du marche et la position de reference affectent les resultats reels. La garantie satisfaction 30 jours + clause mesurable 90 jours (Core+) plafonnent votre risque.",
  },
};

const UPLIFT_LOW = 0.15;
const UPLIFT_MID = 0.25;
const UPLIFT_HIGH = 0.40;

export function RoiCalculator() {
  const { lang: ctxLang } = useLang();
  const lang: "en" | "fr" = ctxLang === "fr" ? "fr" : "en";
  const copy = COPY[lang];

  const [ticket, setTicket] = useState<string>("");
  const [clients, setClients] = useState<string>("");

  const ticketNum = Math.max(0, parseFloat(ticket) || 0);
  const clientsNum = Math.max(0, parseInt(clients, 10) || 0);
  const currentRevenue = ticketNum * clientsNum;

  const projections = useMemo(() => {
    if (currentRevenue === 0) return null;
    return TIERS.map((t) => {
      const lowExtraClients = Math.round(clientsNum * UPLIFT_LOW);
      const midExtraClients = Math.round(clientsNum * UPLIFT_MID);
      const highExtraClients = Math.round(clientsNum * UPLIFT_HIGH);
      const lowExtraRev = Math.round(ticketNum * lowExtraClients);
      const midExtraRev = Math.round(ticketNum * midExtraClients);
      const highExtraRev = Math.round(ticketNum * highExtraClients);
      const lowNet = lowExtraRev - t.monthlyPriceCAD;
      const midNet = midExtraRev - t.monthlyPriceCAD;
      const highNet = highExtraRev - t.monthlyPriceCAD;
      const lowRoi = t.monthlyPriceCAD > 0 ? lowExtraRev / t.monthlyPriceCAD : 0;
      const midRoi = t.monthlyPriceCAD > 0 ? midExtraRev / t.monthlyPriceCAD : 0;
      const highRoi = t.monthlyPriceCAD > 0 ? highExtraRev / t.monthlyPriceCAD : 0;
      return {
        tier: t,
        low: { extraClients: lowExtraClients, extraRev: lowExtraRev, net: lowNet, roi: lowRoi },
        mid: { extraClients: midExtraClients, extraRev: midExtraRev, net: midNet, roi: midRoi },
        high: { extraClients: highExtraClients, extraRev: highExtraRev, net: highNet, roi: highRoi },
      };
    });
  }, [ticketNum, clientsNum, currentRevenue]);

  const fmt = (n: number) => n.toLocaleString(lang === "fr" ? "fr-CA" : "en-CA");

  return (
    <div className="rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/[0.04] via-fuchsia-500/[0.02] to-transparent p-5 sm:p-7 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="w-4 h-4 text-violet-300" aria-hidden />
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-violet-300">{copy.eyebrow}</span>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold leading-tight mb-2">{copy.headline}</h2>
      <p className="text-sm text-zinc-400 mb-5 max-w-2xl">{copy.description}</p>

      <div className="grid sm:grid-cols-2 gap-3 mb-5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5">{copy.ticketLabel}</label>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={1}
            value={ticket}
            onChange={(e) => setTicket(e.target.value)}
            placeholder={copy.ticketPlaceholder}
            className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-violet-400/50 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5">{copy.clientsLabel}</label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            step={1}
            value={clients}
            onChange={(e) => setClients(e.target.value)}
            placeholder={copy.clientsPlaceholder}
            className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-violet-400/50 text-sm"
          />
        </div>
      </div>

      {currentRevenue > 0 && (
        <div className="mb-5 p-3 rounded-lg border border-white/10 bg-white/[0.02]">
          <div className="text-[10px] uppercase tracking-wider text-zinc-400 mb-1">{copy.currentRevenue}</div>
          <div className="text-2xl font-bold text-zinc-100">${fmt(currentRevenue)}<span className="text-xs text-zinc-500 ml-1">{lang === "fr" ? "/mois" : "/mo"}</span></div>
        </div>
      )}

      {projections && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 px-2 text-xs uppercase tracking-wider text-zinc-400">{copy.plan}</th>
                <th className="text-right py-2 px-2 text-xs uppercase tracking-wider text-zinc-500">{copy.upliftLow} (15%)</th>
                <th className="text-right py-2 px-2 text-xs uppercase tracking-wider text-emerald-400">{copy.upliftMid} (25%)</th>
                <th className="text-right py-2 px-2 text-xs uppercase tracking-wider text-zinc-400">{copy.upliftHigh} (40%)</th>
              </tr>
            </thead>
            <tbody>
              {projections.map(({ tier, low, mid, high }) => (
                <tr key={tier.id} className="border-b border-white/5">
                  <td className="py-3 px-2 text-zinc-200">
                    <div className="font-semibold">{tier.name}</div>
                    <div className="text-[10px] text-zinc-500">${tier.monthlyPriceCAD}/mo</div>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className="text-zinc-300">{copy.extraRev.replace("{n}", fmt(low.extraRev))}</div>
                    <div className={`text-[10px] ${low.net >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {copy.netAfterPlan}: {low.net >= 0 ? "+" : ""}{fmt(low.net)}{lang === "fr" ? " $" : ""}
                    </div>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className="text-emerald-200 font-semibold">{copy.extraRev.replace("{n}", fmt(mid.extraRev))}</div>
                    <div className={`text-[10px] ${mid.net >= 0 ? "text-emerald-300" : "text-rose-400"}`}>
                      {copy.roiMultiple.replace("{x}", mid.roi.toFixed(1))}
                    </div>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className="text-zinc-300">{copy.extraRev.replace("{n}", fmt(high.extraRev))}</div>
                    <div className={`text-[10px] ${high.net >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {copy.roiMultiple.replace("{x}", high.roi.toFixed(1))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-xs text-zinc-500 italic">{copy.note}</p>
    </div>
  );
}
