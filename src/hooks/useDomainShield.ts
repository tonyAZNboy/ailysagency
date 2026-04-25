import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useTenants } from './useTenants';
import { useToast } from './use-toast';

export interface ShieldDomain {
  id: string;
  tenant_id: string;
  domain: string;
  is_active: boolean;
  protection_level: 'observe' | 'challenge' | 'block';
  threat_level: 'low' | 'medium' | 'high';
  last_scan_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ShieldEvent {
  id: string;
  shield_domain_id: string;
  event_type: 'bot_blocked' | 'fake_review_incoming' | 'fake_review_google' | 'clone_detected' | 'recon_attempt' | 'rate_limit' | 'ai_scan_performed' | 'basic_scan_performed';
  severity: 'info' | 'warning' | 'critical';
  details: Record<string, unknown> | null;
  source_ip: string | null;
  user_agent: string | null;
  action_taken: 'blocked' | 'challenged' | 'flagged' | 'observed' | 'dismissed' | null;
  review_id: string | null;
  customer_review_id: string | null;
  created_at: string;
}

export interface ShieldMetrics {
  id: string;
  shield_domain_id: string;
  date: string;
  bots_detected: number;
  bots_blocked: number;
  challenges_issued: number;
  fake_reviews_incoming: number;
  fake_reviews_google: number;
  clone_scans_run: number;
  clones_found: number;
  total_requests: number;
  protection_score: number;
}

export interface ShieldSummary {
  totalBotsBlocked: number;
  totalFakeReviewsPrevented: number;
  totalClonesDetected: number;
  overallThreatLevel: 'low' | 'medium' | 'high';
  protectionScore: number;
}

export function useDomainShield() {
  const { activeTenantId, tenants } = useTenants();
  const activeTenant = tenants.find(t => t.id === activeTenantId);
  const { toast } = useToast();
  const [domains, setDomains] = useState<ShieldDomain[]>([]);
  const [events, setEvents] = useState<ShieldEvent[]>([]);
  const [metrics, setMetrics] = useState<ShieldMetrics[]>([]);
  const [summary, setSummary] = useState<ShieldSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const fetchDomains = useCallback(async () => {
    if (!activeTenant?.id) return;

    try {
      const { data, error } = await supabase
        .from('shield_domains')
        .select('*')
        .eq('tenant_id', activeTenant.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDomains((data as ShieldDomain[]) || []);
    } catch (error) {
      console.error('Error fetching shield domains:', error);
    }
  }, [activeTenant?.id]);

  const fetchEvents = useCallback(async () => {
    if (!activeTenant?.id || domains.length === 0) {
      setEvents([]);
      return;
    }

    try {
      const domainIds = domains.map(d => d.id);
      const { data, error } = await supabase
        .from('shield_events')
        .select('*')
        .in('shield_domain_id', domainIds)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setEvents((data as ShieldEvent[]) || []);
    } catch (error) {
      console.error('Error fetching shield events:', error);
    }
  }, [activeTenant?.id, domains]);

  const fetchMetrics = useCallback(async () => {
    if (!activeTenant?.id || domains.length === 0) {
      setMetrics([]);
      setSummary(null);
      return;
    }

    try {
      const domainIds = domains.map(d => d.id);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data, error } = await supabase
        .from('shield_metrics')
        .select('*')
        .in('shield_domain_id', domainIds)
        .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
        .order('date', { ascending: false });

      if (error) throw error;
      
      const metricsData = (data as ShieldMetrics[]) || [];
      setMetrics(metricsData);

      // Calculate summary
      const totalBotsBlocked = metricsData.reduce((sum, m) => sum + (m.bots_blocked || 0), 0);
      const totalFakeReviewsPrevented = metricsData.reduce((sum, m) => sum + (m.fake_reviews_incoming || 0) + (m.fake_reviews_google || 0), 0);
      const totalClonesDetected = metricsData.reduce((sum, m) => sum + (m.clones_found || 0), 0);
      
      // Calculate overall threat level based on domains
      const threatLevels = domains.map(d => d.threat_level);
      const overallThreatLevel = threatLevels.includes('high') ? 'high' 
        : threatLevels.includes('medium') ? 'medium' 
        : 'low';

      // Average protection score
      const avgScore = metricsData.length > 0
        ? Math.round(metricsData.reduce((sum, m) => sum + (m.protection_score || 100), 0) / metricsData.length)
        : 100;

      setSummary({
        totalBotsBlocked,
        totalFakeReviewsPrevented,
        totalClonesDetected,
        overallThreatLevel,
        protectionScore: avgScore
      });
    } catch (error) {
      console.error('Error fetching shield metrics:', error);
    }
  }, [activeTenant?.id, domains]);

  const addDomain = useCallback(async (domain: string): Promise<boolean> => {
    if (!activeTenant?.id) {
      toast({ title: 'Error', description: 'No active tenant', variant: 'destructive' });
      return false;
    }

    setIsAdding(true);
    try {
      // Normalize domain
      const normalizedDomain = domain.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');

      const { error } = await supabase
        .from('shield_domains')
        .insert({
          tenant_id: activeTenant.id,
          domain: normalizedDomain,
          is_active: true,
          protection_level: 'block',
          threat_level: 'low'
        });

      if (error) {
        if (error.code === '23505') {
          toast({ title: 'Domain exists', description: 'This domain is already protected', variant: 'destructive' });
        } else {
          throw error;
        }
        return false;
      }

      toast({ title: 'Domain protected', description: `${normalizedDomain} is now under Domain Shield protection` });
      await fetchDomains();
      return true;
    } catch (error) {
      console.error('Error adding shield domain:', error);
      toast({ title: 'Error', description: 'Failed to add domain', variant: 'destructive' });
      return false;
    } finally {
      setIsAdding(false);
    }
  }, [activeTenant?.id, toast, fetchDomains]);

  const removeDomain = useCallback(async (domainId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('shield_domains')
        .delete()
        .eq('id', domainId);

      if (error) throw error;

      toast({ title: 'Domain removed', description: 'Domain protection has been disabled' });
      await fetchDomains();
      return true;
    } catch (error) {
      console.error('Error removing shield domain:', error);
      toast({ title: 'Error', description: 'Failed to remove domain', variant: 'destructive' });
      return false;
    }
  }, [toast, fetchDomains]);

  const toggleProtection = useCallback(async (domainId: string, isActive: boolean): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('shield_domains')
        .update({ is_active: isActive, updated_at: new Date().toISOString() })
        .eq('id', domainId);

      if (error) throw error;

      toast({ 
        title: isActive ? 'Protection enabled' : 'Protection paused', 
        description: isActive ? 'Domain Shield is now active' : 'Protection has been paused'
      });
      await fetchDomains();
      return true;
    } catch (error) {
      console.error('Error toggling protection:', error);
      toast({ title: 'Error', description: 'Failed to update protection', variant: 'destructive' });
      return false;
    }
  }, [toast, fetchDomains]);

  const setProtectionLevel = useCallback(async (domainId: string, level: 'observe' | 'challenge' | 'block'): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('shield_domains')
        .update({ protection_level: level, updated_at: new Date().toISOString() })
        .eq('id', domainId);

      if (error) throw error;

      toast({ title: 'Protection level updated', description: `Now set to ${level} mode` });
      await fetchDomains();
      return true;
    } catch (error) {
      console.error('Error setting protection level:', error);
      toast({ title: 'Error', description: 'Failed to update protection level', variant: 'destructive' });
      return false;
    }
  }, [toast, fetchDomains]);

  const dismissEvent = useCallback(async (eventId: string): Promise<boolean> => {
    try {
      // Persist dismiss via Edge Function (bypasses any RLS/no-row-updated edge cases)
      // and dismisses ALL events for the same review_id (prevents reappearing after scans).
      const { data, error } = await supabase.functions.invoke('shield-dismiss-review', {
        body: { eventId },
      });

      if (error) throw error;

      const payload = (data as { reviewId?: string; updatedCount?: number } | null) ?? null;
      const reviewId = payload?.reviewId;

      // Immediately update local state for all events tied to that review.
      if (reviewId) {
        setEvents(prev => prev.map(e => (e.review_id === reviewId ? { ...e, action_taken: 'dismissed' } : e)));
      } else {
        // Fallback: update the clicked event only.
        setEvents(prev => prev.map(e => (e.id === eventId ? { ...e, action_taken: 'dismissed' } : e)));
      }

      toast({ 
        title: 'Review dismissed', 
        description: 'This review has been marked as legitimate and removed from flagged list' 
      });
      return true;
    } catch (error) {
      console.error('Error dismissing event:', error);
      toast({ title: 'Error', description: 'Failed to dismiss review', variant: 'destructive' });
      return false;
    }
  }, [toast]);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    await fetchDomains();
    setIsLoading(false);
  }, [fetchDomains]);

  // Initial fetch
  useEffect(() => {
    if (activeTenant?.id) {
      setIsLoading(true);
      fetchDomains().finally(() => setIsLoading(false));
    }
  }, [activeTenant?.id, fetchDomains]);

  // Fetch events and metrics when domains change
  useEffect(() => {
    if (domains.length > 0) {
      fetchEvents();
      fetchMetrics();
    }
  }, [domains, fetchEvents, fetchMetrics]);

  return {
    domains,
    events,
    metrics,
    summary,
    isLoading,
    isAdding,
    addDomain,
    removeDomain,
    toggleProtection,
    setProtectionLevel,
    dismissEvent,
    refetch
  };
}
