import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface DomainMetric {
  id: string;
  domain_verification_id: string;
  recorded_at: string;
  ttfb_ms: number | null;
  cache_hit_rate: number | null;
  requests_total: number;
  requests_cached: number;
  ai_crawler_visits: number;
  ai_crawler_sources: Record<string, number>;
  bandwidth_bytes: number;
  created_at: string;
}

export interface AggregatedMetrics {
  avgTtfb: number;
  avgCacheHitRate: number;
  totalRequests: number;
  totalCached: number;
  totalAiCrawlerVisits: number;
  totalBandwidth: number;
  aiCrawlersBySource: Record<string, number>;
  trend: {
    date: string;
    ttfb: number | null;
    cacheHitRate: number | null;
    requests: number;
    aiVisits: number;
  }[];
}

type TimeRange = '24h' | '7d' | '30d' | '90d';

export function useDomainMetrics(domainVerificationId: string | null, timeRange: TimeRange = '7d') {
  const [metrics, setMetrics] = useState<DomainMetric[]>([]);
  const [aggregated, setAggregated] = useState<AggregatedMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getTimeRangeDate = useCallback((range: TimeRange): Date => {
    const now = new Date();
    switch (range) {
      case '24h':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case '30d':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      case '90d':
        return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
  }, []);

  const fetchMetrics = useCallback(async () => {
    if (!domainVerificationId) {
      setMetrics([]);
      setAggregated(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const startDate = getTimeRangeDate(timeRange);

      const { data, error } = await supabase
        .from('domain_metrics')
        .select('*')
        .eq('domain_verification_id', domainVerificationId)
        .gte('recorded_at', startDate.toISOString())
        .order('recorded_at', { ascending: true });

      if (error) throw error;

      const metricsData = (data || []) as DomainMetric[];
      setMetrics(metricsData);

      // Calculate aggregated metrics
      if (metricsData.length > 0) {
        const totalRequests = metricsData.reduce((sum, m) => sum + m.requests_total, 0);
        const totalCached = metricsData.reduce((sum, m) => sum + m.requests_cached, 0);
        const totalAiCrawlerVisits = metricsData.reduce((sum, m) => sum + m.ai_crawler_visits, 0);
        const totalBandwidth = metricsData.reduce((sum, m) => sum + m.bandwidth_bytes, 0);

        // Calculate weighted average TTFB
        const ttfbSum = metricsData.reduce((sum, m) => {
          if (m.ttfb_ms !== null) {
            return sum + (m.ttfb_ms * m.requests_total);
          }
          return sum;
        }, 0);
        const avgTtfb = totalRequests > 0 ? Math.round(ttfbSum / totalRequests) : 0;

        // Calculate overall cache hit rate
        const avgCacheHitRate = totalRequests > 0 
          ? parseFloat(((totalCached / totalRequests) * 100).toFixed(2))
          : 0;

        // Aggregate AI crawler sources
        const aiCrawlersBySource: Record<string, number> = {};
        metricsData.forEach(m => {
          if (m.ai_crawler_sources) {
            Object.entries(m.ai_crawler_sources).forEach(([source, count]) => {
              aiCrawlersBySource[source] = (aiCrawlersBySource[source] || 0) + count;
            });
          }
        });

        // Build trend data (group by day for 7d+, by hour for 24h)
        const groupByDay = timeRange !== '24h';
        const trendMap = new Map<string, { 
          ttfbSum: number; 
          ttfbCount: number;
          cacheHitSum: number;
          cacheHitCount: number;
          requests: number;
          aiVisits: number;
        }>();

        metricsData.forEach(m => {
          const date = new Date(m.recorded_at);
          const key = groupByDay 
            ? date.toISOString().split('T')[0]
            : date.toISOString().slice(0, 13) + ':00';

          const existing = trendMap.get(key) || {
            ttfbSum: 0,
            ttfbCount: 0,
            cacheHitSum: 0,
            cacheHitCount: 0,
            requests: 0,
            aiVisits: 0
          };

          if (m.ttfb_ms !== null) {
            existing.ttfbSum += m.ttfb_ms * m.requests_total;
            existing.ttfbCount += m.requests_total;
          }
          if (m.cache_hit_rate !== null) {
            existing.cacheHitSum += m.cache_hit_rate * m.requests_total;
            existing.cacheHitCount += m.requests_total;
          }
          existing.requests += m.requests_total;
          existing.aiVisits += m.ai_crawler_visits;

          trendMap.set(key, existing);
        });

        const trend = Array.from(trendMap.entries()).map(([date, data]) => ({
          date,
          ttfb: data.ttfbCount > 0 ? Math.round(data.ttfbSum / data.ttfbCount) : null,
          cacheHitRate: data.cacheHitCount > 0 
            ? parseFloat((data.cacheHitSum / data.cacheHitCount).toFixed(2))
            : null,
          requests: data.requests,
          aiVisits: data.aiVisits
        }));

        setAggregated({
          avgTtfb,
          avgCacheHitRate,
          totalRequests,
          totalCached,
          totalAiCrawlerVisits,
          totalBandwidth,
          aiCrawlersBySource,
          trend
        });
      } else {
        setAggregated(null);
      }
    } catch (error) {
      console.error('Error fetching domain metrics:', error);
    } finally {
      setIsLoading(false);
    }
  }, [domainVerificationId, timeRange, getTimeRangeDate]);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return {
    metrics,
    aggregated,
    isLoading,
    refetch: fetchMetrics
  };
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function formatTtfb(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}
