import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenants } from "./useTenants";
import { useToast } from "./use-toast";

export interface DomainVerification {
  id: string;
  tenant_id: string;
  domain: string;
  verification_token: string;
  verification_method: string;
  verified_at: string | null;
  status: string;
  last_checked_at: string | null;
  dns_instructions: {
    record_type: string;
    host: string;
    value: string;
    providers?: Record<string, any>;
  };
  is_primary: boolean;
  verification_attempts: number;
  next_check_at: string | null;
  notification_sent: boolean;
  speed_boost_enabled: boolean;
  cache_ttl_seconds: number;
  created_at: string;
  updated_at: string;
}

interface DomainLimits {
  limit: number;
  current: number;
  canAdd: boolean;
}

export function useDomainVerifications() {
  const { activeTenantId } = useTenants();
  const { toast } = useToast();
  const [domains, setDomains] = useState<DomainVerification[]>([]);
  const [limits, setLimits] = useState<DomainLimits>({ limit: 0, current: 0, canAdd: false });
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isVerifying, setIsVerifying] = useState<string | null>(null);

  const fetchDomains = useCallback(async () => {
    if (!activeTenantId) return;

    try {
      const { data, error } = await supabase
        .from('domain_verifications')
        .select('*')
        .eq('tenant_id', activeTenantId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDomains((data || []) as DomainVerification[]);
    } catch (error) {
      console.error('Error fetching domains:', error);
    } finally {
      setIsLoading(false);
    }
  }, [activeTenantId]);

  const fetchLimits = useCallback(async () => {
    if (!activeTenantId) return;

    try {
      const session = await supabase.auth.getSession();
      const response = await fetch(
        `https://qucxhksrpqunlyjjvuae.supabase.co/functions/v1/domain-resolver/get-limits`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.data.session?.access_token}`,
          },
          body: JSON.stringify({ tenant_id: activeTenantId }),
        }
      );

      if (response.ok) {
        const limitsData = await response.json();
        setLimits(limitsData);
      }
    } catch (error) {
      console.error('Error fetching limits:', error);
    }
  }, [activeTenantId]);

  useEffect(() => {
    fetchDomains();
    fetchLimits();
  }, [fetchDomains, fetchLimits]);

  const addDomain = async (domain: string, testMode = false): Promise<boolean> => {
    if (!activeTenantId) return false;

    setIsAdding(true);
    try {
      const response = await fetch(
        `https://qucxhksrpqunlyjjvuae.supabase.co/functions/v1/domain-resolver/add-domain`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
          body: JSON.stringify({ 
            domain, 
            tenant_id: activeTenantId,
            test_mode: testMode 
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add domain');
      }

      toast({
        title: testMode ? "Domain Added (Test Mode)" : "Domain Added",
        description: testMode 
          ? `${domain} has been auto-verified in test mode.`
          : `Please add the DNS TXT record to verify ${domain}.`,
      });

      await fetchDomains();
      await fetchLimits();
      return true;
    } catch (error: any) {
      toast({
        title: "Error Adding Domain",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsAdding(false);
    }
  };

  const verifyDomain = async (domainId: string, testMode = false): Promise<boolean> => {
    setIsVerifying(domainId);
    try {
      const response = await fetch(
        `https://qucxhksrpqunlyjjvuae.supabase.co/functions/v1/domain-resolver/verify-domain`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
          body: JSON.stringify({ domain_id: domainId, test_mode: testMode }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify domain');
      }

      if (data.verified) {
        toast({
          title: "Domain Verified!",
          description: "Your domain has been verified and Speed Boost is now active.",
        });
      } else {
        toast({
          title: "Verification Pending",
          description: "DNS record not found yet. Please ensure the TXT record is correctly configured.",
          variant: "destructive",
        });
      }

      await fetchDomains();
      return data.verified;
    } catch (error: any) {
      toast({
        title: "Verification Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsVerifying(null);
    }
  };

  const removeDomain = async (domainId: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://qucxhksrpqunlyjjvuae.supabase.co/functions/v1/domain-resolver/remove-domain`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
          body: JSON.stringify({ domain_id: domainId }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to remove domain');
      }

      toast({
        title: "Domain Removed",
        description: "The domain has been removed from Speed Boost.",
      });

      await fetchDomains();
      await fetchLimits();
      return true;
    } catch (error: any) {
      toast({
        title: "Error Removing Domain",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const purgeCache = async (domainId: string, tags?: string[]): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://qucxhksrpqunlyjjvuae.supabase.co/functions/v1/cache-purge`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
          body: JSON.stringify({ domain_id: domainId, tags }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to purge cache');
      }

      toast({
        title: "Cache Purged",
        description: `Cleared ${data.purge?.keys_purged?.length || 0} cache keys.`,
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Cache Purge Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const toggleSpeedBoost = async (domainId: string, enabled: boolean): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('domain_verifications')
        .update({ speed_boost_enabled: enabled })
        .eq('id', domainId);

      if (error) throw error;

      toast({
        title: enabled ? "Speed Boost Enabled" : "Speed Boost Disabled",
        description: enabled 
          ? "TTFB optimization is now active for this domain."
          : "TTFB optimization has been paused for this domain.",
      });

      await fetchDomains();
      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    domains,
    limits,
    isLoading,
    isAdding,
    isVerifying,
    addDomain,
    verifyDomain,
    removeDomain,
    purgeCache,
    toggleSpeedBoost,
    refetch: fetchDomains,
  };
}
