import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Membership = {
  tenant_id: string;
  role: "owner" | "admin" | "member";
};

export type Tenant = {
  id: string;
  name: string;
  industry?: string | null;
};

const ACTIVE_TENANT_KEY = "activeTenantId";

export function useTenants() {
  const queryClient = useQueryClient();
  const [activeTenantId, setActiveTenantIdState] = useState<string | null>(
    () => localStorage.getItem(ACTIVE_TENANT_KEY)
  );

  const membershipsQuery = useQuery({
    queryKey: ["memberships"],
    queryFn: async (): Promise<Membership[]> => {
      const { data, error } = await supabase
        .from("user_memberships")
        .select("tenant_id, role");
      if (error) throw error;
      return (data as unknown as Membership[]) || [];
    },
    staleTime: 60_000,
  });

  const tenantsQuery = useQuery({
    queryKey: ["tenants"],
    queryFn: async (): Promise<Tenant[]> => {
      const { data, error } = await supabase
        .from("tenants")
        .select("id, name, industry")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data as unknown as Tenant[]) || [];
    },
    staleTime: 60_000,
  });

  const roleByTenant = useMemo(() => {
    const map = new Map<string, Membership["role"]>();
    (membershipsQuery.data || []).forEach((m) => map.set(m.tenant_id, m.role));
    return map;
  }, [membershipsQuery.data]);

  const isOwnerOrAdmin = useMemo(() => {
    if (!activeTenantId) return false;
    const role = roleByTenant.get(activeTenantId);
    return role === "owner" || role === "admin";
  }, [activeTenantId, roleByTenant]);

  // Ensure active tenant is valid — must exist in BOTH tenants list AND memberships
  useEffect(() => {
    const tenants = tenantsQuery.data || [];
    const memberships = membershipsQuery.data || [];
    if (!tenants.length || !memberships.length) return;

    const memberTenantIds = new Set(memberships.map((m) => m.tenant_id));
    const isValid =
      activeTenantId &&
      tenants.find((t) => t.id === activeTenantId) &&
      memberTenantIds.has(activeTenantId);

    if (!isValid) {
      // Pick the first tenant the user is a member of
      const firstValid = tenants.find((t) => memberTenantIds.has(t.id));
      const newId = firstValid?.id || null;
      setActiveTenantIdState(newId);
      if (newId) {
        localStorage.setItem(ACTIVE_TENANT_KEY, newId);
      } else {
        localStorage.removeItem(ACTIVE_TENANT_KEY);
      }
    }
  }, [tenantsQuery.data, membershipsQuery.data, activeTenantId]);

  const setActiveTenantId = (id: string) => {
    setActiveTenantIdState(id);
    localStorage.setItem(ACTIVE_TENANT_KEY, id);
    // Optionally refetch context-bound queries
    queryClient.invalidateQueries({ queryKey: ["memberships"] });
  };

  return {
    tenants: tenantsQuery.data || [],
    memberships: membershipsQuery.data || [],
    roleByTenant,
    activeTenantId,
    setActiveTenantId,
    isOwnerOrAdmin,
    isLoading: tenantsQuery.isLoading || membershipsQuery.isLoading,
    isError: tenantsQuery.isError || membershipsQuery.isError,
  };
}
