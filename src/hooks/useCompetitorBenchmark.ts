import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTenants } from "./useTenants";
import { usePricing } from "./usePricing";
import { useToast } from "./use-toast";
import { useState } from "react";

export interface CompetitorProfile {
  id: string;
  name: string;
  google_place_id: string | null;
  address: string | null;
  city: string | null;
  industry: string | null;
  review_count: number;
  average_rating: number;
  review_velocity_30d: number;
  has_response_presence: boolean;
  last_scanned_at: string | null;
  is_active: boolean;
}

export interface CompetitorSearchResult {
  google_place_id: string;
  name: string;
  address: string;
  rating: number;
  review_count: number;
  type: string;
}

export function useCompetitorBenchmark() {
  const { activeTenantId } = useTenants();
  const { subscription } = usePricing();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchResults, setSearchResults] = useState<CompetitorSearchResult[]>([]);
  const [gapAnalysis, setGapAnalysis] = useState<string | null>(null);

  const tier = subscription?.tier;
  const hasAccess = tier === "pro" || tier === "max";

  const { data: competitors, isLoading } = useQuery({
    queryKey: ["competitors", activeTenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("competitor_profiles")
        .select("*")
        .eq("tenant_id", activeTenantId!)
        .eq("is_active", true)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data || []) as CompetitorProfile[];
    },
    enabled: !!activeTenantId && hasAccess,
    staleTime: 120_000,
  });

  const searchMutation = useMutation({
    mutationFn: async ({ query, city, industry }: { query: string; city?: string; industry?: string }) => {
      const { data, error } = await supabase.functions.invoke("competitor-scan", {
        body: { tenantId: activeTenantId, action: "search", searchQuery: query, city, industry },
      });
      if (error) throw error;
      return data.results as CompetitorSearchResult[];
    },
    onSuccess: (results) => setSearchResults(results),
    onError: (error) => toast({ title: "Search Failed", description: error.message, variant: "destructive" }),
  });

  const addMutation = useMutation({
    mutationFn: async (competitor: CompetitorSearchResult) => {
      const { data, error } = await supabase.functions.invoke("competitor-scan", {
        body: {
          tenantId: activeTenantId,
          action: "add",
          name: competitor.name,
          google_place_id: competitor.google_place_id,
          address: competitor.address,
          rating: competitor.rating,
          review_count: competitor.review_count,
        },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({ title: "Competitor Added" });
      queryClient.invalidateQueries({ queryKey: ["competitors", activeTenantId] });
      setSearchResults([]);
    },
    onError: (error) => toast({ title: "Failed to Add", description: error.message, variant: "destructive" }),
  });

  const scanMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("competitor-scan", {
        body: { tenantId: activeTenantId, action: "scan" },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast({ title: "Scan Complete", description: data.message });
      queryClient.invalidateQueries({ queryKey: ["competitors", activeTenantId] });
    },
    onError: (error) => toast({ title: "Scan Failed", description: error.message, variant: "destructive" }),
  });

  const removeMutation = useMutation({
    mutationFn: async (competitorId: string) => {
      const { data, error } = await supabase.functions.invoke("competitor-scan", {
        body: { tenantId: activeTenantId, action: "remove", competitorId },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({ title: "Competitor Removed" });
      queryClient.invalidateQueries({ queryKey: ["competitors", activeTenantId] });
    },
  });

  const gapMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("competitor-scan", {
        body: { tenantId: activeTenantId, action: "gap-analysis" },
      });
      if (error) throw error;
      return data.analysis as string;
    },
    onSuccess: (analysis) => setGapAnalysis(analysis),
    onError: (error) => toast({ title: "Analysis Failed", description: error.message, variant: "destructive" }),
  });

  return {
    competitors: competitors || [],
    isLoading,
    hasAccess,
    searchResults,
    gapAnalysis,
    searchCompetitors: searchMutation.mutate,
    isSearching: searchMutation.isPending,
    addCompetitor: addMutation.mutate,
    isAdding: addMutation.isPending,
    scanCompetitors: scanMutation.mutate,
    isScanning: scanMutation.isPending,
    removeCompetitor: removeMutation.mutate,
    runGapAnalysis: gapMutation.mutate,
    isAnalyzingGap: gapMutation.isPending,
  };
}
