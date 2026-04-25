import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTenants } from "./useTenants";
import { usePricing } from "./usePricing";

export interface ReputationSnapshot {
  id: string;
  snapshot_date: string;
  total_reviews: number;
  average_rating: number;
  review_velocity: number;
  response_rate: number;
  sentiment_positive_pct: number;
  sentiment_neutral_pct: number;
  sentiment_negative_pct: number;
  top_topics: { topic: string; count: number }[];
  top_emotions: { emotion: string; count: number }[];
}

export function useHistoricalTrends() {
  const { activeTenantId } = useTenants();
  const { subscription } = usePricing();

  const tier = subscription?.tier;
  const hasAccess = tier === "pro" || tier === "max";

  const { data: snapshots, isLoading } = useQuery({
    queryKey: ["reputation-snapshots", activeTenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reputation_snapshots")
        .select("*")
        .eq("tenant_id", activeTenantId!)
        .is("location_id", null)
        .order("snapshot_date", { ascending: true });
      if (error) throw error;
      return (data || []) as unknown as ReputationSnapshot[];
    },
    enabled: !!activeTenantId && hasAccess,
    staleTime: 300_000,
  });

  return {
    snapshots: snapshots || [],
    isLoading,
    hasAccess,
    tier,
  };
}
