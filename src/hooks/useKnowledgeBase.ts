import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTenants } from "./useTenants";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";

export type KnowledgeDoc = {
  id: string;
  tenant_id: string;
  title: string;
  content: string;
  doc_type: string;
  source_url: string | null;
  file_path: string | null;
  file_name: string | null;
  metadata: Json | null;
  is_active: boolean;
  last_synced_at: string | null;
  created_at: string;
  updated_at: string;
};

export function useKnowledgeBase() {
  const { activeTenantId } = useTenants();
  const queryClient = useQueryClient();

  const documentsQuery = useQuery({
    queryKey: ["knowledge-docs", activeTenantId],
    queryFn: async (): Promise<KnowledgeDoc[]> => {
      if (!activeTenantId) return [];
      
      const { data, error } = await supabase
        .from("widget_knowledge_docs")
        .select("*")
        .eq("tenant_id", activeTenantId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data as unknown as KnowledgeDoc[]) || [];
    },
    enabled: !!activeTenantId,
  });

  const addDocument = useMutation({
    mutationFn: async (doc: {
      title: string;
      content: string;
      docType: string;
      sourceUrl?: string;
      filePath?: string;
      fileName?: string;
    }) => {
      if (!activeTenantId) throw new Error("No active tenant");

      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.access_token) throw new Error("Not authenticated");

      const response = await supabase.functions.invoke("process-knowledge-doc", {
        body: {
          tenantId: activeTenantId,
          ...doc,
        },
      });

      if (response.error) throw response.error;
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["knowledge-docs", activeTenantId] });
      toast.success("Document added to knowledge base");
    },
    onError: (error) => {
      console.error("Add document error:", error);
      toast.error("Failed to add document");
    },
  });

  const updateDocument = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: { is_active?: boolean; title?: string; content?: string } }) => {
      const { error } = await supabase
        .from("widget_knowledge_docs")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["knowledge-docs", activeTenantId] });
      toast.success("Document updated");
    },
    onError: (error) => {
      console.error("Update document error:", error);
      toast.error("Failed to update document");
    },
  });

  const deleteDocument = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("widget_knowledge_docs")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["knowledge-docs", activeTenantId] });
      toast.success("Document deleted");
    },
    onError: (error) => {
      console.error("Delete document error:", error);
      toast.error("Failed to delete document");
    },
  });

  const syncKnowledge = useMutation({
    mutationFn: async ({ syncType, urls }: { syncType: string; urls?: string[] }) => {
      if (!activeTenantId) throw new Error("No active tenant");

      const response = await supabase.functions.invoke("sync-business-knowledge", {
        body: {
          tenantId: activeTenantId,
          syncType,
          urls,
        },
      });

      if (response.error) throw response.error;
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["knowledge-docs", activeTenantId] });
      const successCount = data?.results?.filter((r: any) => r.success).length || 0;
      toast.success(`Synced ${successCount} sources`);
    },
    onError: (error) => {
      console.error("Sync knowledge error:", error);
      toast.error("Failed to sync knowledge");
    },
  });

  return {
    documents: documentsQuery.data || [],
    isLoading: documentsQuery.isLoading,
    addDocument,
    updateDocument,
    deleteDocument,
    syncKnowledge,
  };
}
