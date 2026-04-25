import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTenants } from './useTenants';
import { startOfMonth, endOfMonth, subMonths, format, parseISO, eachDayOfInterval, subDays } from 'date-fns';

interface PostStats {
  total: number;
  published: number;
  scheduled: number;
  drafts: number;
  byPlatform: Record<string, number>;
  byContentType: Record<string, number>;
  byDay: Record<string, number>;
  topHashtags: { tag: string; count: number }[];
}

interface ReviewStats {
  total: number;
  replied: number;
  averageRating: number;
  bySentiment: Record<string, number>;
  byRating: Record<number, number>;
}

export interface RecentReview {
  id: string;
  customerName: string;
  comment: string | null;
  rating: number;
  createdAt: string;
  platform?: string;
  locationId?: string;
}

export interface AnalyticsData {
  posts: PostStats;
  reviews: ReviewStats;
  recentReviews: RecentReview[];
  platformAccounts: { platform: string; accountName: string; postsCount: number }[];
  trends: {
    postsThisMonth: number;
    postsLastMonth: number;
    reviewsThisMonth: number;
    reviewsLastMonth: number;
  };
  dailyActivity: { date: string; posts: number; reviews: number }[];
}

async function fetchAnalyticsData(tenantId: string): Promise<AnalyticsData> {
  const now = new Date();
  const thisMonthStart = startOfMonth(now);
  const thisMonthEnd = endOfMonth(now);
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));
  const last30Days = subDays(now, 30);

  // Fetch all data in parallel with selective columns
  const [postsResult, reviewsResult, platformsResult, recentReviewsResult] = await Promise.all([
    supabase
      .from('scheduled_posts')
      .select('id, status, platforms, content_type, scheduled_for, hashtags, created_at')
      .eq('tenant_id', tenantId),
    supabase
      .from('reviews')
      .select('id, rating, sentiment, replied, created_at')
      .eq('tenant_id', tenantId),
    supabase
      .from('platform_accounts')
      .select('id, platform, account_name')
      .eq('tenant_id', tenantId)
      .eq('is_active', true),
    supabase
      .from('customer_reviews')
      .select('id, customer_name, comment, rating, created_at, location_id')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .limit(10)
  ]);

  const posts = postsResult.data || [];
  const reviews = reviewsResult.data || [];
  const platforms = platformsResult.data || [];
  const recentCustomerReviews = recentReviewsResult.data || [];

  // Process posts stats
  const postsByPlatform: Record<string, number> = {};
  const postsByContentType: Record<string, number> = {};
  const postsByDay: Record<string, number> = {};
  const hashtagCounts: Record<string, number> = {};

  posts.forEach(post => {
    (post.platforms || []).forEach((p: string) => {
      postsByPlatform[p] = (postsByPlatform[p] || 0) + 1;
    });
    const type = post.content_type || 'text';
    postsByContentType[type] = (postsByContentType[type] || 0) + 1;
    if (post.scheduled_for) {
      const dayName = format(parseISO(post.scheduled_for), 'EEEE');
      postsByDay[dayName] = (postsByDay[dayName] || 0) + 1;
    }
    (post.hashtags || []).forEach((tag: string) => {
      hashtagCounts[tag] = (hashtagCounts[tag] || 0) + 1;
    });
  });

  const topHashtags = Object.entries(hashtagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Process reviews stats
  const reviewsBySentiment: Record<string, number> = {};
  const reviewsByRating: Record<number, number> = {};
  let totalRating = 0;
  let ratedCount = 0;

  reviews.forEach(review => {
    const sentiment = review.sentiment || 'neutral';
    reviewsBySentiment[sentiment] = (reviewsBySentiment[sentiment] || 0) + 1;
    if (review.rating) {
      reviewsByRating[review.rating] = (reviewsByRating[review.rating] || 0) + 1;
      totalRating += review.rating;
      ratedCount++;
    }
  });

  // Calculate trends
  const postsThisMonth = posts.filter(p => {
    const date = p.created_at ? parseISO(p.created_at) : null;
    return date && date >= thisMonthStart && date <= thisMonthEnd;
  }).length;

  const postsLastMonth = posts.filter(p => {
    const date = p.created_at ? parseISO(p.created_at) : null;
    return date && date >= lastMonthStart && date <= lastMonthEnd;
  }).length;

  const reviewsThisMonth = reviews.filter(r => {
    const date = r.created_at ? parseISO(r.created_at) : null;
    return date && date >= thisMonthStart && date <= thisMonthEnd;
  }).length;

  const reviewsLastMonth = reviews.filter(r => {
    const date = r.created_at ? parseISO(r.created_at) : null;
    return date && date >= lastMonthStart && date <= lastMonthEnd;
  }).length;

  // Daily activity for last 30 days
  const days = eachDayOfInterval({ start: last30Days, end: now });
  const dailyActivity = days.map(day => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const postsOnDay = posts.filter(p => {
      const date = p.created_at ? format(parseISO(p.created_at), 'yyyy-MM-dd') : null;
      return date === dateStr;
    }).length;
    const reviewsOnDay = reviews.filter(r => {
      const date = r.created_at ? format(parseISO(r.created_at), 'yyyy-MM-dd') : null;
      return date === dateStr;
    }).length;
    return { date: format(day, 'MMM d'), posts: postsOnDay, reviews: reviewsOnDay };
  });

  const platformAccounts = platforms.map(p => ({
    platform: p.platform,
    accountName: p.account_name || p.platform,
    postsCount: posts.filter(post => (post.platforms || []).includes(p.platform)).length
  }));

  return {
    posts: {
      total: posts.length,
      published: posts.filter(p => p.status === 'published').length,
      scheduled: posts.filter(p => p.status === 'scheduled').length,
      drafts: posts.filter(p => p.status === 'draft').length,
      byPlatform: postsByPlatform,
      byContentType: postsByContentType,
      byDay: postsByDay,
      topHashtags
    },
    reviews: {
      total: reviews.length,
      replied: reviews.filter(r => r.replied).length,
      averageRating: ratedCount > 0 ? totalRating / ratedCount : 0,
      bySentiment: reviewsBySentiment,
      byRating: reviewsByRating
    },
    recentReviews: recentCustomerReviews.map(r => ({
      id: r.id,
      customerName: r.customer_name || 'Anonymous',
      comment: r.comment,
      rating: r.rating,
      createdAt: r.created_at,
      locationId: r.location_id,
    })),
    platformAccounts,
    trends: {
      postsThisMonth,
      postsLastMonth,
      reviewsThisMonth,
      reviewsLastMonth
    },
    dailyActivity
  };
}

export function useAnalytics() {
  const { activeTenantId } = useTenants();

  const { data, isLoading } = useQuery({
    queryKey: ['analytics', activeTenantId],
    queryFn: () => fetchAnalyticsData(activeTenantId!),
    enabled: !!activeTenantId,
    staleTime: 60_000, // 1 minute cache
  });

  return { data: data ?? null, isLoading };
}
