// Real Google Places preview card.
// Shows ground-truth GBP data (rating, reviews, photos, categories, hours,
// attributes) pulled from /api/places-lookup. Falls back to a "not connected"
// state when GOOGLE_PLACES_API_KEY is not configured.

import { useEffect, useState } from "react";
import {
  Loader2,
  MapPin,
  Star,
  Camera,
  Clock,
  Globe,
  Phone,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { PlacesResult } from "../../../functions/api/places-lookup";

interface Props {
  businessName: string;
  city: string;
}

export function PlacesPreview({ businessName, city }: Props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PlacesResult | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/places-lookup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: businessName, city }),
        });
        if (cancelled) return;
        if (!res.ok) {
          setData(null);
          return;
        }
        setData((await res.json()) as PlacesResult);
      } catch {
        if (!cancelled) setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [businessName, city]);

  if (loading) {
    return (
      <div className="rounded-xl border border-border/40 bg-card/30 backdrop-blur-md p-5 text-center">
        <Loader2 className="w-5 h-5 mx-auto mb-2 text-primary animate-spin" />
        <p className="text-xs text-muted-foreground">Fetching live GBP data...</p>
      </div>
    );
  }

  if (!data || !data.found) {
    return (
      <div className="rounded-xl border border-border/40 bg-card/30 backdrop-blur-md p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-display text-base mb-1">
              {data?.isLive
                ? "Could not match your business in Google Places"
                : "Live Places API not connected in this environment"}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {data?.isLive
                ? "Try the exact business name as it appears on Google Maps."
                : "In production, this card pulls real-time rating, review count, photo count, categories, and attributes from Google Places API."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const attrEntries: Array<[string, boolean | undefined]> = data.hasAttributes
    ? [
        ["Wheelchair accessible", data.hasAttributes.wheelchairAccessibleEntrance],
        ["Delivery", data.hasAttributes.delivery],
        ["Takeout", data.hasAttributes.takeout],
        ["Dine-in", data.hasAttributes.dineIn],
        ["Reservations", data.hasAttributes.reservable],
        ["Vegetarian options", data.hasAttributes.servesVegetarianFood],
        ["Good for children", data.hasAttributes.goodForChildren],
        ["Credit cards", data.hasAttributes.paymentOptions?.acceptsCreditCards],
      ]
    : [];

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-transparent backdrop-blur-md p-5">
      <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400 mb-1.5 inline-flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />
            Live Google Places
          </div>
          <h4 className="font-display text-lg sm:text-xl leading-tight">
            {data.name}
          </h4>
          {data.formattedAddress && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {data.formattedAddress}
            </p>
          )}
        </div>
        {data.rating !== undefined && (
          <div className="text-right">
            <div className="inline-flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-display text-2xl tabular-nums">
                {data.rating.toFixed(1)}
              </span>
            </div>
            <div className="text-[10px] font-mono text-muted-foreground">
              {data.userRatingCount ?? 0} reviews
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <Stat
          icon={<Camera className="w-3.5 h-3.5" />}
          label="Photos"
          value={data.photoCount?.toString() ?? "0"}
        />
        <Stat
          icon={<Star className="w-3.5 h-3.5" />}
          label="Type"
          value={(data.primaryType ?? "—").replace(/_/g, " ")}
        />
        {data.regularOpeningHours?.openNow !== undefined && (
          <Stat
            icon={<Clock className="w-3.5 h-3.5" />}
            label="Status"
            value={data.regularOpeningHours.openNow ? "Open" : "Closed"}
          />
        )}
        {data.websiteUri && (
          <Stat
            icon={<Globe className="w-3.5 h-3.5" />}
            label="Website"
            value="Linked"
          />
        )}
      </div>

      {attrEntries.some(([, v]) => v !== undefined) && (
        <div className="pt-3 border-t border-border/30">
          <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-2">
            Attributes detected
          </div>
          <div className="flex flex-wrap gap-1.5">
            {attrEntries
              .filter(([, v]) => v !== undefined)
              .map(([label, v]) => (
                <span
                  key={label}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border ${
                    v
                      ? "border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-300"
                      : "border-rose-500/20 bg-rose-500/[0.05] text-rose-300/70"
                  }`}
                >
                  {v && <CheckCircle2 className="w-2.5 h-2.5" />}
                  {label}
                </span>
              ))}
          </div>
        </div>
      )}

      {data.internationalPhoneNumber && (
        <div className="mt-3 pt-3 border-t border-border/30 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Phone className="w-3 h-3" />
          {data.internationalPhoneNumber}
        </div>
      )}
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border/30 bg-background/30 p-2.5">
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-1 inline-flex items-center gap-1">
        {icon}
        {label}
      </div>
      <div className="text-sm font-medium text-foreground/90 truncate">{value}</div>
    </div>
  );
}
