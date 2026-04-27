// Competitor overlay panel.
// Two-step pull:
//   1. /api/places-lookup → seed business place_id
//   2. /api/places-nearby → 3 nearest competitors with same primary type
//
// Renders side-by-side comparison: rating, reviews, distance, gap analysis.

import { useEffect, useState } from "react";
import { Loader2, Trophy, TrendingDown, ExternalLink, AlertCircle } from "lucide-react";
import type { PlacesResult } from "../../../functions/api/places-lookup";
import type { NearbyCompetitor } from "../../../functions/api/places-nearby";

interface Props {
  businessName: string;
  city: string;
  /** Optional: skip places-lookup and use this directly */
  seedPlaceId?: string;
  /** Optional: provide rating + count from parent so we can render gaps */
  yourRating?: number;
  yourReviewCount?: number;
}

export function CompetitorOverlay({
  businessName,
  city,
  seedPlaceId: seedFromProp,
  yourRating,
  yourReviewCount,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [seedRating, setSeedRating] = useState<number | undefined>(yourRating);
  const [seedReviewCount, setSeedReviewCount] = useState<number | undefined>(
    yourReviewCount,
  );
  const [competitors, setCompetitors] = useState<NearbyCompetitor[]>([]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let placeId = seedFromProp;
        // Step 1: lookup if no seed
        if (!placeId) {
          const lookupRes = await fetch("/api/places-lookup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: businessName, city }),
          });
          if (!lookupRes.ok) {
            if (!cancelled) {
              setLoading(false);
              setIsLive(false);
            }
            return;
          }
          const lookup = (await lookupRes.json()) as PlacesResult;
          if (!lookup.found || !lookup.placeId) {
            if (!cancelled) {
              setLoading(false);
              setIsLive(lookup.isLive);
            }
            return;
          }
          placeId = lookup.placeId;
          if (!cancelled) {
            setSeedRating(lookup.rating);
            setSeedReviewCount(lookup.userRatingCount);
          }
        }
        // Step 2: nearby
        const nearbyRes = await fetch("/api/places-nearby", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ placeId }),
        });
        if (cancelled) return;
        if (!nearbyRes.ok) {
          setLoading(false);
          return;
        }
        const nearby = (await nearbyRes.json()) as {
          competitors?: NearbyCompetitor[];
          isLive?: boolean;
        };
        if (cancelled) return;
        setCompetitors(nearby.competitors ?? []);
        setIsLive(Boolean(nearby.isLive));
      } catch {
        // network/dev-fallback path
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [businessName, city, seedFromProp]);

  if (loading) {
    return (
      <div className="rounded-xl border border-border/40 bg-card/30 backdrop-blur-md p-5 text-center">
        <Loader2 className="w-5 h-5 mx-auto mb-2 text-primary animate-spin" />
        <p className="text-xs text-muted-foreground">
          Pulling 3 nearest competitors from Google Maps...
        </p>
      </div>
    );
  }

  if (!isLive || competitors.length === 0) {
    return (
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.04] p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-display text-base mb-1">
              Competitor data needs Places API
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              In production, this card pulls 3 nearest competitors with the
              same primary category from Google Maps and shows rating,
              review-count, and distance gaps. Set{" "}
              <code className="text-primary">GOOGLE_PLACES_API_KEY</code> in
              Cloudflare Pages env vars to activate.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Compute gaps
  const competitorAvgRating =
    competitors.reduce((s, c) => s + (c.rating ?? 0), 0) / competitors.length;
  const competitorAvgReviews = Math.round(
    competitors.reduce((s, c) => s + (c.userRatingCount ?? 0), 0) /
      competitors.length,
  );

  const ratingGap = (seedRating ?? 0) - competitorAvgRating;
  const reviewGap = (seedReviewCount ?? 0) - competitorAvgReviews;

  return (
    <div className="rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-500/[0.05] via-transparent to-transparent backdrop-blur-md p-6">
      <div className="mb-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet-300 mb-1.5 inline-flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5" />
          Competitive overlay
        </div>
        <h4 className="font-display text-lg sm:text-xl leading-tight mb-1">
          3 nearest competitors in {city}
        </h4>
        <p className="text-xs text-muted-foreground">
          Same primary category, within 5km radius, ranked by rating × review
          count.
        </p>
      </div>

      {/* Gap summary */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <GapCard
          label="Rating gap"
          your={(seedRating ?? 0).toFixed(1)}
          theirs={competitorAvgRating.toFixed(1)}
          gap={ratingGap}
          unit=""
          format={(n) => n.toFixed(1)}
        />
        <GapCard
          label="Review count gap"
          your={String(seedReviewCount ?? 0)}
          theirs={String(competitorAvgReviews)}
          gap={reviewGap}
          unit=""
          format={(n) => Math.round(n).toString()}
        />
      </div>

      {/* Competitor list */}
      <div className="space-y-2">
        {competitors.map((c, i) => (
          <div
            key={c.placeId}
            className="rounded-lg border border-border/30 bg-background/30 p-3 flex items-center gap-3"
          >
            <span className="font-mono text-xs text-muted-foreground/60 tabular-nums">
              0{i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-foreground/95 truncate">
                {c.name}
              </div>
              {c.formattedAddress && (
                <div className="text-[10px] text-muted-foreground truncate">
                  {c.formattedAddress}
                </div>
              )}
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-sm font-display tabular-nums">
                {c.rating?.toFixed(1) ?? "—"}
                <span className="text-[10px] text-muted-foreground/70 ml-1">
                  / {c.userRatingCount ?? 0}
                </span>
              </div>
              {c.distanceMeters !== undefined && (
                <div className="text-[10px] font-mono text-muted-foreground">
                  {c.distanceMeters < 1000
                    ? `${c.distanceMeters} m`
                    : `${(c.distanceMeters / 1000).toFixed(1)} km`}
                </div>
              )}
            </div>
            {c.websiteUri && (
              <a
                href={c.websiteUri}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
                aria-label="Visit competitor website"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function GapCard({
  label,
  your,
  theirs,
  gap,
  format,
}: {
  label: string;
  your: string;
  theirs: string;
  gap: number;
  unit: string;
  format: (n: number) => string;
}) {
  const positive = gap >= 0;
  return (
    <div
      className={`rounded-lg border p-3 ${
        positive
          ? "border-emerald-500/30 bg-emerald-500/[0.05]"
          : "border-rose-500/30 bg-rose-500/[0.05]"
      }`}
    >
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-1.5">
        {label}
      </div>
      <div className="flex items-baseline justify-between gap-2 text-xs mb-1">
        <span className="text-muted-foreground">You: {your}</span>
        <span className="text-muted-foreground">Avg: {theirs}</span>
      </div>
      <div
        className={`text-sm font-display flex items-center gap-1 ${
          positive ? "text-emerald-300" : "text-rose-300"
        }`}
      >
        {!positive && <TrendingDown className="w-3.5 h-3.5" />}
        {positive ? "+" : ""}
        {format(gap)}
      </div>
    </div>
  );
}
