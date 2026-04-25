import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenants } from "./useTenants";
import { useToast } from "./use-toast";

export interface Campaign {
  id: string;
  tenant_id: string;
  name: string;
  description: string | null;
  start_date: string;
  end_date: string;
  status: 'draft' | 'active' | 'live_draw' | 'closed';
  winner_count: number;
  total_entries_snapshot: number | null;
  random_seed: string | null;
  require_email: boolean;
  prize_description: string | null;
  prize_value: number | null;
  draw_datetime: string | null;
  claim_deadline: string | null;
  excluded_persons: string | null;
  jurisdiction: string | null;
  skill_testing_answer: string | null;
  created_at: string;
  updated_at: string;
}

export interface CampaignEntry {
  id: string;
  campaign_id: string;
  tenant_id: string;
  customer_email: string;
  customer_name: string | null;
  source: 'review' | 'direct' | 'bonus';
  ip_address: string | null;
  is_valid: boolean;
  created_at: string;
}

export interface CampaignWinner {
  id: string;
  campaign_id: string;
  tenant_id: string;
  entry_id: string;
  customer_email: string;
  customer_name: string | null;
  position: number;
  selected_at: string;
  claimed_at: string | null;
  claim_status: 'pending' | 'claimed' | 'expired';
}

export interface CampaignUsage {
  id: string;
  tenant_id: string;
  billing_cycle_start: string;
  billing_cycle_end: string;
  entries_used: number;
  entries_included: number;
  overage_blocks: number;
  overage_amount: number;
}

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [usage, setUsage] = useState<CampaignUsage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { activeTenantId } = useTenants();
  const { toast } = useToast();

  const fetchCampaigns = useCallback(async () => {
    if (!activeTenantId) return;
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('tenant_id', activeTenantId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setCampaigns((data as Campaign[]) || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  }, [activeTenantId]);

  const fetchUsage = useCallback(async () => {
    if (!activeTenantId) return;
    try {
      const now = new Date();
      const cycleStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('tenant_campaign_usage')
        .select('*')
        .eq('tenant_id', activeTenantId)
        .eq('billing_cycle_start', cycleStart)
        .maybeSingle();
      if (error) throw error;
      setUsage(data as CampaignUsage | null);
    } catch (error) {
      console.error('Error fetching usage:', error);
    }
  }, [activeTenantId]);

  const createCampaign = async (campaign: {
    name: string;
    description?: string;
    start_date: string;
    end_date: string;
    winner_count: number;
    require_email: boolean;
    require_google_review?: boolean;
    prize_description?: string;
    prize_value?: number;
    draw_datetime?: string;
    claim_deadline?: string;
    excluded_persons?: string;
    location_ids?: string[];
    jurisdiction?: string;
  }) => {
    if (!activeTenantId) return null;
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          tenant_id: activeTenantId,
          ...campaign,
        })
        .select()
        .single();
      if (error) throw error;
      toast({ title: "Campaign Created!", description: `"${campaign.name}" is ready as a draft.` });
      await fetchCampaigns();
      return data;
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({ title: "Error", description: "Failed to create campaign", variant: "destructive" });
      return null;
    }
  };

  const updateCampaign = async (id: string, updates: Partial<Campaign>) => {
    try {
      const { error } = await supabase.from('campaigns').update(updates).eq('id', id);
      if (error) throw error;
      toast({ title: "Campaign Updated" });
      await fetchCampaigns();
    } catch (error) {
      console.error('Error updating campaign:', error);
      toast({ title: "Error", description: "Failed to update campaign", variant: "destructive" });
    }
  };

  const activateCampaign = async (id: string) => {
    await updateCampaign(id, { status: 'active' });
  };

  const closeCampaign = async (id: string) => {
    await updateCampaign(id, { status: 'closed' });
  };

  const deleteCampaign = async (id: string) => {
    try {
      // Delete winners, entries, then campaign
      await supabase.from('campaign_winners').delete().eq('campaign_id', id);
      await supabase.from('campaign_entries').delete().eq('campaign_id', id);
      const { error } = await supabase.from('campaigns').delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Campaign Deleted" });
      await fetchCampaigns();
    } catch (error) {
      console.error('Error deleting campaign:', error);
      toast({ title: "Error", description: "Failed to delete campaign", variant: "destructive" });
    }
  };

  const fetchEntries = async (campaignId: string): Promise<CampaignEntry[]> => {
    try {
      const { data, error } = await supabase
        .from('campaign_entries')
        .select('*')
        .eq('campaign_id', campaignId)
        .eq('is_valid', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data as CampaignEntry[]) || [];
    } catch (error) {
      console.error('Error fetching entries:', error);
      return [];
    }
  };

  const fetchWinners = async (campaignId: string): Promise<CampaignWinner[]> => {
    try {
      const { data, error } = await supabase
        .from('campaign_winners')
        .select('*')
        .eq('campaign_id', campaignId)
        .order('position', { ascending: true });
      if (error) throw error;
      return (data as CampaignWinner[]) || [];
    } catch (error) {
      console.error('Error fetching winners:', error);
      return [];
    }
  };

  const startLiveDraw = async (campaignId: string) => {
    try {
      // Snapshot entries and lock campaign
      const entries = await fetchEntries(campaignId);
      const seed = crypto.randomUUID();
      await supabase
        .from('campaigns')
        .update({
          status: 'live_draw',
          total_entries_snapshot: entries.length,
          random_seed: seed,
        })
        .eq('id', campaignId);
      await fetchCampaigns();
      return { entries, seed };
    } catch (error) {
      console.error('Error starting draw:', error);
      toast({ title: "Error", description: "Failed to start live draw", variant: "destructive" });
      return null;
    }
  };

  const saveWinners = async (campaignId: string, winners: { entry: CampaignEntry; position: number }[]) => {
    if (!activeTenantId) return;
    try {
      const rows = winners.map(w => ({
        campaign_id: campaignId,
        tenant_id: activeTenantId,
        entry_id: w.entry.id,
        customer_email: w.entry.customer_email,
        customer_name: w.entry.customer_name,
        position: w.position,
      }));
      const { error } = await supabase.from('campaign_winners').insert(rows);
      if (error) throw error;
      await updateCampaign(campaignId, { status: 'closed' });
      toast({ title: "Winners Saved!", description: `${winners.length} winner(s) selected and recorded.` });
    } catch (error) {
      console.error('Error saving winners:', error);
      toast({ title: "Error", description: "Failed to save winners", variant: "destructive" });
    }
  };

  useEffect(() => {
    if (activeTenantId) {
      setIsLoading(true);
      Promise.all([fetchCampaigns(), fetchUsage()]).finally(() => setIsLoading(false));
    }
  }, [activeTenantId, fetchCampaigns, fetchUsage]);

  const usagePercent = usage ? Math.round((usage.entries_used / usage.entries_included) * 100) : 0;

  return {
    campaigns,
    usage,
    usagePercent,
    isLoading,
    createCampaign,
    updateCampaign,
    activateCampaign,
    closeCampaign,
    deleteCampaign,
    fetchEntries,
    fetchWinners,
    startLiveDraw,
    saveWinners,
    refetch: () => Promise.all([fetchCampaigns(), fetchUsage()]),
  };
}
