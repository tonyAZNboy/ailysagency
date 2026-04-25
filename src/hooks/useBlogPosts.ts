import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featured_image_url: string | null;
  featured_image_alt: string | null;
  meta_description: string | null;
  meta_keywords: string[] | null;
  author: string;
  status: string;
  published_at: string | null;
  scheduled_for: string | null;
  read_time_minutes: number;
  schema_markup: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface BlogScheduleItem {
  id: string;
  topic: string;
  category: string;
  scheduled_for: string;
  generated: boolean;
  post_id: string | null;
  created_at: string;
}

const CATEGORY_DISPLAY: Record<string, string> = {
  'review-growth': 'Review Growth',
  'fake-review-detection': 'Fake Review Detection',
  'ai-seo': 'AI & SEO',
  'reputation-management': 'Reputation Management',
  'social-media': 'Social Media',
  'business-growth': 'Business Growth',
  'seo-tips': 'SEO Tips',
};

export function getCategoryDisplay(category: string): string {
  return CATEGORY_DISPLAY[category] || category;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'review-growth': 'bg-green-500/10 text-green-500 border-green-500/20',
    'fake-review-detection': 'bg-red-500/10 text-red-500 border-red-500/20',
    'ai-seo': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'reputation-management': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    'social-media': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
    'business-growth': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'seo-tips': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  };
  return colors[category] || 'bg-muted text-muted-foreground';
}

export function useBlogPosts(options?: {
  category?: string;
  limit?: number;
  page?: number;
  lang?: string;
  sortOrder?: 'newest' | 'oldest';
  fetchAll?: boolean;
}) {
  const { category, limit = 12, page = 1, lang, sortOrder = 'newest', fetchAll = false } = options || {};
  const offset = (page - 1) * limit;

  return useQuery({
    queryKey: ['blog-posts', category, limit, page, lang, sortOrder, fetchAll],
    queryFn: async () => {
      let query = supabase
        .from('blog_posts')
        .select('*', { count: 'exact' })
        .eq('status', 'published')
        .order('published_at', { ascending: sortOrder === 'oldest' });

      if (!fetchAll) {
        query = query.range(offset, offset + limit - 1);
      }

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      let posts = (data || []) as BlogPost[];

      // If non-English, fetch translations and overlay title/excerpt/meta
      if (lang && lang !== 'en' && posts.length > 0) {
        const postIds = posts.map((p) => p.id);
        const { data: translations } = await supabase
          .from('blog_post_translations')
          .select('post_id, title, excerpt, meta_description, meta_keywords, featured_image_alt, schema_markup')
          .in('post_id', postIds)
          .eq('lang', lang);

        if (translations && translations.length > 0) {
          const trMap = new Map(translations.map((t) => [t.post_id, t]));
          posts = posts.map((p) => {
            const tr = trMap.get(p.id);
            if (!tr) return p;
            return {
              ...p,
              title: tr.title ?? p.title,
              excerpt: tr.excerpt ?? p.excerpt,
              meta_description: tr.meta_description ?? p.meta_description,
              meta_keywords: tr.meta_keywords ?? p.meta_keywords,
              featured_image_alt: tr.featured_image_alt ?? p.featured_image_alt,
              schema_markup: (tr.schema_markup as Record<string, unknown>) ?? p.schema_markup,
            };
          });
        }
      }

      return {
        posts,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      };
    },
  });
}

export function useBlogPost(slug: string, lang?: string) {
  return useQuery({
    queryKey: ['blog-post', slug, lang],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      const post = data as BlogPost;

      // If non-English, try to fetch translation
      if (lang && lang !== 'en') {
        const { data: tr } = await supabase
          .from('blog_post_translations')
          .select('title, excerpt, content, meta_description, meta_keywords, featured_image_alt, schema_markup')
          .eq('post_id', post.id)
          .eq('lang', lang)
          .maybeSingle();

        if (tr) {
          return {
            ...post,
            title: tr.title,
            excerpt: tr.excerpt,
            content: tr.content,
            meta_description: tr.meta_description ?? post.meta_description,
            meta_keywords: tr.meta_keywords ?? post.meta_keywords,
            featured_image_alt: tr.featured_image_alt ?? post.featured_image_alt,
            schema_markup: (tr.schema_markup as Record<string, unknown>) ?? post.schema_markup,
          };
        }
      }
      return post;
    },
    enabled: !!slug,
  });
}

export function useLatestBlogPosts(limit = 3, lang?: string) {
  return useQuery({
    queryKey: ['latest-blog-posts', limit, lang],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, slug, title, excerpt, category, featured_image_url, featured_image_alt, published_at, read_time_minutes')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      const posts = (data || []) as Partial<BlogPost>[];

      // If non-English, fetch translations and overlay title/excerpt
      if (lang && lang !== 'en' && posts.length > 0) {
        const postIds = posts.map((p) => p.id).filter(Boolean) as string[];
        const { data: translations } = await supabase
          .from('blog_post_translations')
          .select('post_id, title, excerpt')
          .in('post_id', postIds)
          .eq('lang', lang);

        if (translations && translations.length > 0) {
          const trMap = new Map(translations.map((t) => [t.post_id, t]));
          return posts.map((p) => {
            const tr = p.id ? trMap.get(p.id) : null;
            return tr ? { ...p, title: tr.title, excerpt: tr.excerpt } : p;
          });
        }
      }

      return posts;
    },
  });
}

export function useRelatedPosts(currentSlug: string, category: string, limit = 3, lang?: string) {
  return useQuery({
    queryKey: ['related-posts', currentSlug, category, lang],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, slug, title, excerpt, category, featured_image_url, read_time_minutes')
        .eq('status', 'published')
        .eq('category', category)
        .neq('slug', currentSlug)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      const posts = (data || []) as Partial<BlogPost>[];

      if (lang && lang !== 'en' && posts.length > 0) {
        const postIds = posts.map((p) => p.id).filter(Boolean) as string[];
        const { data: translations } = await supabase
          .from('blog_post_translations')
          .select('post_id, title, excerpt')
          .in('post_id', postIds)
          .eq('lang', lang);

        if (translations && translations.length > 0) {
          const trMap = new Map(translations.map((t) => [t.post_id, t]));
          return posts.map((p) => {
            const tr = p.id ? trMap.get(p.id) : null;
            return tr ? { ...p, title: tr.title, excerpt: tr.excerpt } : p;
          });
        }
      }

      return posts;
    },
    enabled: !!currentSlug && !!category,
  });
}

export function useBeginnerPosts(lang?: string) {
  return useQuery({
    queryKey: ['beginner-posts', lang],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, slug, title, excerpt, category, tags, featured_image_url, featured_image_alt, published_at, read_time_minutes')
        .eq('status', 'published')
        .contains('tags', ['beginner'])
        .order('published_at', { ascending: true });

      if (error) throw error;
      let posts = (data || []) as Partial<BlogPost>[];

      if (lang && lang !== 'en' && posts.length > 0) {
        const postIds = posts.map((p) => p.id).filter(Boolean) as string[];
        const { data: translations } = await supabase
          .from('blog_post_translations')
          .select('post_id, title, excerpt')
          .in('post_id', postIds)
          .eq('lang', lang);

        if (translations && translations.length > 0) {
          const trMap = new Map(translations.map((t) => [t.post_id, t]));
          posts = posts.map((p) => {
            const tr = p.id ? trMap.get(p.id) : null;
            return tr ? { ...p, title: tr.title, excerpt: tr.excerpt } : p;
          });
        }
      }
      return posts;
    },
  });
}

// Admin hooks for super admin dashboard
export function useBlogSchedule() {
  return useQuery({
    queryKey: ['blog-schedule'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_generation_schedule')
        .select('*')
        .order('scheduled_for', { ascending: true });

      if (error) throw error;
      return (data || []) as BlogScheduleItem[];
    },
  });
}

export function useBlogStats() {
  return useQuery({
    queryKey: ['blog-stats'],
    queryFn: async () => {
      const [publishedResult, scheduledResult, pendingResult] = await Promise.all([
        supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'published'),
        supabase
          .from('blog_generation_schedule')
          .select('*', { count: 'exact', head: true })
          .eq('generated', true),
        supabase
          .from('blog_generation_schedule')
          .select('*', { count: 'exact', head: true })
          .eq('generated', false),
      ]);

      return {
        published: publishedResult.count || 0,
        scheduled: scheduledResult.count || 0,
        pending: pendingResult.count || 0,
      };
    },
  });
}
