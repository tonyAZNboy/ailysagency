import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTenants } from "./useTenants";
import { usePricing } from "./usePricing";
import { useToast } from "./use-toast";

export interface SentimentData {
  id: string;
  review_id: string;
  overall_sentiment: string;
  sentiment_score: number;
  emotional_tone: string[];
  topic_clusters: string[];
  keywords: string[];
  analyzed_at: string;
}

export interface SentimentStats {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
  positivePct: number;
  neutralPct: number;
  negativePct: number;
  avgScore: number;
  emotionFrequency: Record<string, number>;
  topicFrequency: Record<string, number>;
  topPraisedTopics: { topic: string; count: number }[];
  topComplaintTopics: { topic: string; count: number }[];
}

function computeStats(data: SentimentData[]): SentimentStats {
  const total = data.length;
  if (total === 0) {
    return {
      total: 0, positive: 0, neutral: 0, negative: 0,
      positivePct: 0, neutralPct: 0, negativePct: 0, avgScore: 0,
      emotionFrequency: {}, topicFrequency: {},
      topPraisedTopics: [], topComplaintTopics: [],
    };
  }

  const positive = data.filter(d => d.overall_sentiment === "positive").length;
  const neutral = data.filter(d => d.overall_sentiment === "neutral").length;
  const negative = data.filter(d => d.overall_sentiment === "negative").length;
  const avgScore = data.reduce((sum, d) => sum + (d.sentiment_score || 0), 0) / total;

  const emotionFrequency: Record<string, number> = {};
  const topicByPolarity: Record<string, { positive: number; negative: number }> = {};

  data.forEach(d => {
    (d.emotional_tone || []).forEach(e => {
      emotionFrequency[e] = (emotionFrequency[e] || 0) + 1;
    });
    (d.topic_clusters || []).forEach(t => {
      if (!topicByPolarity[t]) topicByPolarity[t] = { positive: 0, negative: 0 };
      if (d.overall_sentiment === "positive") topicByPolarity[t].positive++;
      if (d.overall_sentiment === "negative") topicByPolarity[t].negative++;
    });
  });

  const topicFrequency: Record<string, number> = {};
  Object.keys(topicByPolarity).forEach(t => {
    topicFrequency[t] = topicByPolarity[t].positive + topicByPolarity[t].negative;
  });

  const topPraisedTopics = Object.entries(topicByPolarity)
    .map(([topic, counts]) => ({ topic, count: counts.positive }))
    .filter(t => t.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const topComplaintTopics = Object.entries(topicByPolarity)
    .map(([topic, counts]) => ({ topic, count: counts.negative }))
    .filter(t => t.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    total, positive, neutral, negative,
    positivePct: Math.round((positive / total) * 100),
    neutralPct: Math.round((neutral / total) * 100),
    negativePct: Math.round((negative / total) * 100),
    avgScore: Math.round(avgScore * 100) / 100,
    emotionFrequency,
    topicFrequency,
    topPraisedTopics,
    topComplaintTopics,
  };
}

export function useSentimentIntelligence() {
  const { activeTenantId } = useTenants();
  const { subscription } = usePricing();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const tier = subscription?.tier;
  const hasAccess = tier === "pro" || tier === "max";

  const { data: rawData, isLoading } = useQuery({
    queryKey: ["sentiment-intelligence", activeTenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("review_sentiment")
        .select("*")
        .eq("tenant_id", activeTenantId!)
        .order("analyzed_at", { ascending: false });
      if (error) throw error;
      return (data || []) as SentimentData[];
    },
    enabled: !!activeTenantId && hasAccess,
    staleTime: 120_000,
  });

  const stats = computeStats(rawData || []);

  const analyzeMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("analyze-sentiment", {
        body: { tenantId: activeTenantId },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast({ title: "Analysis Complete", description: data.message });
      queryClient.invalidateQueries({ queryKey: ["sentiment-intelligence", activeTenantId] });
    },
    onError: (error) => {
      toast({ title: "Analysis Failed", description: error.message, variant: "destructive" });
    },
  });

  return {
    stats,
    rawData: rawData || [],
    isLoading,
    hasAccess,
    tier,
    runAnalysis: analyzeMutation.mutate,
    isAnalyzing: analyzeMutation.isPending,
  };
}
