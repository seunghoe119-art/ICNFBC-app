import { useState, useEffect, useCallback } from "react";
import { Play, ExternalLink, Search, X, Edit } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface YoutubePost {
  id: number;
  title: string;
  description: string | null;
  youtube_id: string;
  youtube_url: string;
  created_at: string;
}

export default function BoardPage() {
  const { isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [allPosts, setAllPosts] = useState<YoutubePost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  
  const pageSize = 12;
  
  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return null;
    }
  };
  
  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  const { data: posts, isLoading, error, refetch } = useQuery({
    queryKey: ['/api/youtube-posts-board', debouncedQuery],
    queryFn: async () => {
      let query = supabase
        .from('youtube posts')
        .select('id, title, description, youtube_id, youtube_url, created_at');
      
      // Add search filter if query exists
      if (debouncedQuery.trim()) {
        query = query.or(`title.ilike.%${debouncedQuery.trim()}%,description.ilike.%${debouncedQuery.trim()}%`);
      }
      
      // Try ordering by created_at first
      query = query.order('created_at', { ascending: false, nullsFirst: false }).limit(pageSize);
      
      const { data, error } = await query;
      
      if (error) {
        // Fallback to ordering by id if created_at fails
        let fallbackQuery = supabase
          .from('youtube posts')
          .select('id, title, description, youtube_id, youtube_url, created_at');
        
        if (debouncedQuery.trim()) {
          fallbackQuery = fallbackQuery.or(`title.ilike.%${debouncedQuery.trim()}%,description.ilike.%${debouncedQuery.trim()}%`);
        }
        
        const { data: fallbackData, error: fallbackError } = await fallbackQuery
          .order('id', { ascending: false })
          .limit(pageSize);
        
        if (fallbackError) throw fallbackError;
        
        const result = fallbackData as YoutubePost[];
        setAllPosts(result);
        setHasMore(result.length === pageSize);
        return result;
      }
      
      const result = data as YoutubePost[];
      setAllPosts(result);
      setHasMore(result.length === pageSize);
      return result;
    }
  });
  
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    try {
      const lastPost = allPosts[allPosts.length - 1];
      let query = supabase
        .from('youtube posts')
        .select('id, title, description, youtube_id, youtube_url, created_at');
      
      // Add search filter if query exists
      if (debouncedQuery.trim()) {
        query = query.or(`title.ilike.%${debouncedQuery.trim()}%,description.ilike.%${debouncedQuery.trim()}%`);
      }
      
      // Pagination: get items after the last loaded item
      if (lastPost.created_at) {
        query = query
          .lt('created_at', lastPost.created_at)
          .order('created_at', { ascending: false, nullsFirst: false })
          .limit(pageSize);
      } else {
        // Fallback to id-based pagination
        query = query
          .lt('id', lastPost.id)
          .order('id', { ascending: false })
          .limit(pageSize);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      const newPosts = data as YoutubePost[];
      
      // Filter out any duplicates (by id)
      const existingIds = new Set(allPosts.map(p => p.id));
      const uniqueNewPosts = newPosts.filter(p => !existingIds.has(p.id));
      
      setAllPosts(prev => [...prev, ...uniqueNewPosts]);
      setHasMore(newPosts.length === pageSize);
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [allPosts, debouncedQuery, hasMore, loadingMore]);
  
  const clearSearch = () => {
    setSearchQuery('');
    setDebouncedQuery('');
  };
  
  // Reset to first page when search changes
  useEffect(() => {
    refetch();
  }, [debouncedQuery, refetch]);

  const renderVideoCard = (post: YoutubePost) => (
    <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative">
        <a
          href={post.youtube_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block aspect-video bg-gray-900 relative group cursor-pointer"
        >
          <img 
            src={`https://img.youtube.com/vi/${post.youtube_id}/hqdefault.jpg`}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-colors">
            <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <ExternalLink className="w-5 h-5 text-white opacity-80" />
          </div>
        </a>
        {isAdmin && (
          <Link href={`/admin/edit/${post.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 left-2 bg-white/90 hover:bg-white border-gray-200 shadow-sm"
              data-testid={`button-edit-${post.id}`}
            >
              <Edit className="w-3 h-3 mr-1" />
              Edit
            </Button>
          </Link>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg mb-2">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-3">
          {post.description || "New video coming soon."}
        </p>
        {post.created_at && (
          <p className="text-gray-400 text-xs mb-2">
            Posted on {formatDate(post.created_at)}
          </p>
        )}
        <div className="flex items-center text-red-600 text-sm font-medium">
          <Play className="w-4 h-4 mr-1" fill="currentColor" />
          YouTube에서 보기
        </div>
      </div>
    </div>
  );

  const renderSkeletonCard = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
      <div className="aspect-video bg-gray-200"></div>
      <div className="p-6">
        <div className="h-5 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-black mb-6">Video Board</h1>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            모든 영상을 한눈에
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
                data-testid="input-search"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  data-testid="button-clear-search"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            {debouncedQuery && (
              <p className="text-sm text-gray-600 mt-2">
                Searching for "{debouncedQuery}"
              </p>
            )}
          </div>
        </div>

        {error && (
          <div className="text-center mb-8">
            <p className="text-red-600">Failed to load videos.</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            // Loading state
            Array.from({ length: 12 }).map((_, index) => (
              <div key={`skeleton-${index}`}>
                {renderSkeletonCard()}
              </div>
            ))
          ) : allPosts.length > 0 ? (
            // Show actual data
            allPosts.map(renderVideoCard)
          ) : (
            // Empty state
            <div className="col-span-full text-center py-16">
              <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
                <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" />
                <h3 className="font-bold text-lg mb-2">
                  {debouncedQuery ? 'No videos found' : 'No videos yet'}
                </h3>
                <p className="text-gray-600">
                  {debouncedQuery 
                    ? `No results for "${debouncedQuery}"` 
                    : 'New videos coming soon.'
                  }
                </p>
                {debouncedQuery && (
                  <Button
                    variant="outline"
                    onClick={clearSearch}
                    className="mt-4"
                    data-testid="button-clear-search-empty"
                  >
                    Clear search
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Load More Button */}
        {!isLoading && allPosts.length > 0 && hasMore && (
          <div className="text-center mt-12">
            <Button
              onClick={loadMore}
              disabled={loadingMore}
              variant="outline"
              className="px-8 py-3"
              data-testid="button-load-more"
            >
              {loadingMore ? 'Loading...' : 'Load more'}
            </Button>
          </div>
        )}
        
        {/* Loading more indicator */}
        {loadingMore && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={`loading-more-${index}`}>
                {renderSkeletonCard()}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}