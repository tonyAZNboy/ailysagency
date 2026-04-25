import { useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTenants } from './useTenants';
import { useToast } from '@/components/ui/use-toast';
import type { Json } from '@/integrations/supabase/types';

export interface ScheduledPost {
  id: string;
  tenant_id: string;
  user_id: string;
  title: string | null;
  content: string;
  content_type: string;
  media_url: string | null;
  platforms: string[];
  status: string;
  scheduled_for: string | null;
  published_at: string | null;
  hashtags: string[] | null;
  metadata: Json;
  created_at: string;
  updated_at: string;
}

export interface CreatePostData {
  title?: string;
  content: string;
  content_type: string;
  media_url?: string;
  platforms: string[];
  status: string;
  scheduled_for?: string;
  hashtags?: string[];
  metadata?: Json;
}

const SELECTED_COLUMNS = 'id, tenant_id, user_id, title, content, content_type, media_url, platforms, status, scheduled_for, published_at, hashtags, metadata, created_at, updated_at';

const scheduledPostsQueryKey = (tenantId: string | null) => ['scheduled-posts', tenantId];

const CACHE_KEY_PREFIX = 'sp_cache_';

function getCachedPosts(tenantId: string | null): ScheduledPost[] | undefined {
  if (!tenantId) return undefined;
  try {
    const raw = localStorage.getItem(CACHE_KEY_PREFIX + tenantId);
    if (!raw) return undefined;
    return JSON.parse(raw) as ScheduledPost[];
  } catch {
    return undefined;
  }
}

function setCachedPosts(tenantId: string | null, posts: ScheduledPost[]) {
  if (!tenantId) return;
  try {
    localStorage.setItem(CACHE_KEY_PREFIX + tenantId, JSON.stringify(posts));
  } catch {
    // quota exceeded — ignore
  }
}

async function fetchPostsForTenant(tenantId: string): Promise<ScheduledPost[]> {
  const { data, error } = await supabase
    .from('scheduled_posts')
    .select(SELECTED_COLUMNS)
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) throw error;
  const results = (data as ScheduledPost[]) || [];
  setCachedPosts(tenantId, results);
  return results;
}

/** Eagerly prefetch posts as soon as tenant ID is available (call in AppLayout) */
export function usePrefetchScheduledPosts() {
  const { activeTenantId } = useTenants();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!activeTenantId) return;
    // Only prefetch if not already cached
    const existing = queryClient.getQueryData(scheduledPostsQueryKey(activeTenantId));
    if (existing) return;
    queryClient.prefetchQuery({
      queryKey: scheduledPostsQueryKey(activeTenantId),
      queryFn: () => fetchPostsForTenant(activeTenantId),
      staleTime: 30_000,
    });
  }, [activeTenantId, queryClient]);
}

export const useScheduledPosts = () => {
  const { activeTenantId } = useTenants();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: posts = [],
    isLoading,
    error: queryError,
    refetch: fetchPosts,
  } = useQuery({
    queryKey: scheduledPostsQueryKey(activeTenantId),
    queryFn: () => fetchPostsForTenant(activeTenantId!),
    enabled: !!activeTenantId,
    staleTime: 30_000,
    // Show cached posts instantly while fresh data loads
    placeholderData: () => getCachedPosts(activeTenantId),
    retry: 1,
    retryDelay: 500,
  });

  const error = queryError ? (queryError as Error).message : null;

  const createMutation = useMutation({
    mutationFn: async (postData: CreatePostData) => {
      if (!activeTenantId) throw new Error('No active tenant selected');

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('scheduled_posts')
        .insert({
          tenant_id: activeTenantId,
          user_id: user.id,
          ...postData,
        })
        .select(SELECTED_COLUMNS)
        .single();

      if (error) throw error;
      return data as ScheduledPost;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: scheduledPostsQueryKey(activeTenantId) });
      toast({
        title: 'Success',
        description: variables.status === 'scheduled'
          ? 'Post scheduled successfully'
          : 'Post saved as draft',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to create post',
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<CreatePostData> }) => {
      const { data, error } = await supabase
        .from('scheduled_posts')
        .update(updates)
        .eq('id', id)
        .select(SELECTED_COLUMNS)
        .single();

      if (error) throw error;
      return data as ScheduledPost;
    },
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: scheduledPostsQueryKey(activeTenantId) });
      const previous = queryClient.getQueryData<ScheduledPost[]>(scheduledPostsQueryKey(activeTenantId));
      queryClient.setQueryData<ScheduledPost[]>(scheduledPostsQueryKey(activeTenantId), (old) =>
        (old || []).map((p) => (p.id === id ? { ...p, ...updates } as ScheduledPost : p))
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(scheduledPostsQueryKey(activeTenantId), context.previous);
      }
      toast({ title: 'Error', description: 'Failed to update post', variant: 'destructive' });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: scheduledPostsQueryKey(activeTenantId) });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('scheduled_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: scheduledPostsQueryKey(activeTenantId) });
      const previous = queryClient.getQueryData<ScheduledPost[]>(scheduledPostsQueryKey(activeTenantId));
      queryClient.setQueryData<ScheduledPost[]>(scheduledPostsQueryKey(activeTenantId), (old) =>
        (old || []).filter((p) => p.id !== id)
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(scheduledPostsQueryKey(activeTenantId), context.previous);
      }
      toast({ title: 'Error', description: 'Failed to delete post', variant: 'destructive' });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: scheduledPostsQueryKey(activeTenantId) });
    },
  });

  const createPost = useCallback(
    async (postData: CreatePostData) => {
      try {
        return await createMutation.mutateAsync(postData);
      } catch {
        return null;
      }
    },
    [createMutation]
  );

  const updatePost = useCallback(
    async (id: string, updates: Partial<CreatePostData>) => {
      try {
        return await updateMutation.mutateAsync({ id, updates });
      } catch {
        return null;
      }
    },
    [updateMutation]
  );

  const deletePost = useCallback(
    async (id: string) => {
      try {
        await deleteMutation.mutateAsync(id);
        return true;
      } catch {
        return false;
      }
    },
    [deleteMutation]
  );

  return {
    posts,
    isLoading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };
};
