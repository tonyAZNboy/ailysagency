import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTenants } from './useTenants';
import { useSuperAdmin } from './useSuperAdmin';
import { subDays, format, parseISO, eachDayOfInterval } from 'date-fns';

export interface AIEngineStats {
  totalMessages: number;
  landingMessages: number;
  inAppMessages: number;
  escalations: number;
  ctasShown: number;
  ctasClicked: number;
  uniqueSessions: number;
  intentBreakdown: Record<string, number>;
  sentimentBreakdown: Record<string, number>;
  dailyActivity: { date: string; messages: number; escalations: number }[];
  upgradeTiers: { low: number; medium: number; high: number };
  conversionRate: number;
  avgConfidence: number;
}

async function fetchAIEngineAnalytics(tenantId: string | null, isGlobal: boolean): Promise<AIEngineStats> {
  const last30Days = subDays(new Date(), 30);
  const since = last30Days.toISOString();

  let query = supabase
    .from('ai_engine_events')
    .select('*')
    .gte('created_at', since)
    .order('created_at', { ascending: false });

  if (!isGlobal && tenantId) {
    query = query.eq('tenant_id', tenantId);
  }

  const { data: events } = await query;
  const rows = events || [];

  const messages = rows.filter(e => e.event_type === 'ai_message');
  const escalations = rows.filter(e => e.event_type === 'escalation_flagged');
  const ctasShown = rows.filter(e => e.event_type === 'upgrade_cta_shown');
  const ctasClicked = rows.filter(e => e.event_type === 'upgrade_cta_clicked');

  const intentBreakdown: Record<string, number> = {};
  const sentimentBreakdown: Record<string, number> = {};
  const sessionSet = new Set<string>();
  let totalConfidence = 0;
  let confidenceCount = 0;

  messages.forEach(m => {
    const data = m.event_data as { intent?: string; sentiment?: string; confidence?: number } | null;
    if (data?.intent) intentBreakdown[data.intent] = (intentBreakdown[data.intent] || 0) + 1;
    if (data?.sentiment) sentimentBreakdown[data.sentiment] = (sentimentBreakdown[data.sentiment] || 0) + 1;
    if (m.visitor_session_id) sessionSet.add(m.visitor_session_id);
    if (data?.confidence) { totalConfidence += data.confidence; confidenceCount++; }
  });

  // Daily activity
  const days = eachDayOfInterval({ start: last30Days, end: new Date() });
  const dailyActivity = days.map(day => {
    const dateStr = format(day, 'yyyy-MM-dd');
    return {
      date: format(day, 'MMM d'),
      messages: messages.filter(m => format(parseISO(m.created_at), 'yyyy-MM-dd') === dateStr).length,
      escalations: escalations.filter(e => format(parseISO(e.created_at), 'yyyy-MM-dd') === dateStr).length,
    };
  });

  // Upgrade tiers from tenant_upgrade_scores
  let tierQuery = supabase.from('tenant_upgrade_scores' as never).select('tier');
  if (!isGlobal && tenantId) {
    tierQuery = tierQuery.eq('tenant_id', tenantId);
  }
  const { data: tierData } = await tierQuery;
  const tiers = { low: 0, medium: 0, high: 0 };
  (tierData || []).forEach((t: { tier?: string }) => {
    if (t.tier === 'low') tiers.low++;
    else if (t.tier === 'medium') tiers.medium++;
    else if (t.tier === 'high') tiers.high++;
  });

  return {
    totalMessages: messages.length,
    landingMessages: messages.filter(m => m.mode === 'landing').length,
    inAppMessages: messages.filter(m => m.mode === 'in_app').length,
    escalations: escalations.length,
    ctasShown: ctasShown.length,
    ctasClicked: ctasClicked.length,
    uniqueSessions: sessionSet.size,
    intentBreakdown,
    sentimentBreakdown,
    dailyActivity,
    upgradeTiers: tiers,
    conversionRate: ctasShown.length > 0 ? (ctasClicked.length / ctasShown.length) * 100 : 0,
    avgConfidence: confidenceCount > 0 ? totalConfidence / confidenceCount : 0,
  };
}

export function useAIEngineAnalytics() {
  const { activeTenantId } = useTenants();
  const { isSuperAdmin } = useSuperAdmin();

  const { data, isLoading } = useQuery({
    queryKey: ['ai-engine-analytics', activeTenantId, isSuperAdmin],
    queryFn: () => fetchAIEngineAnalytics(activeTenantId ?? null, !!isSuperAdmin),
    enabled: !!activeTenantId || !!isSuperAdmin,
    staleTime: 60_000,
  });

  return { data: data ?? null, isLoading, isSuperAdmin };
}
