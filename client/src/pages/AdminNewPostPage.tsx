import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { supabase } from '@/lib/supabaseClient';
import { extractYouTubeId, isValidYouTubeUrl, getYouTubeThumbnail, normalizeYouTubeUrl } from '@/lib/youtube';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  publishedDate: string;
  isPosted?: boolean;
}

export default function AdminNewPostPage() {
  const [location, setLocation] = useLocation();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeId, setYoutubeId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [duplicateCheck, setDuplicateCheck] = useState(false);
  
  // YouTube RSS feed state
  const [latestVideos, setLatestVideos] = useState<YouTubeVideo[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<Set<string>>(new Set());
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [postedVideoIds, setPostedVideoIds] = useState<Set<string>>(new Set());
  const [bulkPosting, setBulkPosting] = useState(false);
  
  const maxDescriptionLength = 200;
  const channelId = 'UCmssI78LT4basChHbjgQTsg';

  // Handle access control
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        setLocation('/login');
        return;
      }
      if (!isAdmin) {
        // Show 403 style message for non-admin users
        return;
      }
    }
  }, [user, isAdmin, authLoading, setLocation]);

  // Fetch posted video IDs from database
  const fetchPostedVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('youtube posts')
        .select('youtube_id');
      
      if (error) throw error;
      
      const postedIds = new Set(data?.map(item => item.youtube_id) || []);
      setPostedVideoIds(postedIds);
    } catch (error) {
      console.error('Error fetching posted videos:', error);
    }
  };

  // Parse YouTube RSS feed
  const parseYouTubeRSS = async () => {
    setLoadingVideos(true);
    try {
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
      
      // Use a CORS proxy to fetch the RSS feed
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) throw new Error('Failed to fetch RSS feed');
      
      const data = await response.json();
      const xmlText = data.contents;
      
      // Parse XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const entries = xmlDoc.querySelectorAll('entry');
      
      const videos: YouTubeVideo[] = [];
      
      for (let i = 0; i < Math.min(entries.length, 6); i++) {
        const entry = entries[i];
        const videoId = entry.querySelector('yt\\:videoId, videoId')?.textContent;
        const title = entry.querySelector('title')?.textContent;
        const published = entry.querySelector('published')?.textContent;
        
        if (videoId && title && published) {
          videos.push({
            id: videoId,
            title: title,
            url: `https://www.youtube.com/watch?v=${videoId}`,
            thumbnail: getYouTubeThumbnail(videoId),
            publishedDate: new Date(published).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }),
            isPosted: postedVideoIds.has(videoId)
          });
        }
      }
      
      setLatestVideos(videos);
    } catch (error) {
      console.error('Error parsing RSS feed:', error);
      toast({
        title: 'Error',
        description: 'Failed to load latest videos from YouTube.',
        variant: 'destructive',
      });
    } finally {
      setLoadingVideos(false);
    }
  };

  // Load videos on component mount
  useEffect(() => {
    if (isAdmin && !authLoading) {
      fetchPostedVideos().then(() => {
        parseYouTubeRSS();
      });
    }
  }, [isAdmin, authLoading]);

  // Handle video selection
  const handleVideoSelect = (videoId: string, checked: boolean) => {
    const newSelected = new Set(selectedVideos);
    
    if (checked) {
      newSelected.add(videoId);
      
      // Auto-fill form with first selected video
      if (newSelected.size === 1) {
        const video = latestVideos.find(v => v.id === videoId);
        if (video) {
          setTitle(video.title);
          setYoutubeUrl(video.url);
          handleYoutubeUrlChange(video.url);
        }
      }
    } else {
      newSelected.delete(videoId);
      
      // Clear form if no videos selected
      if (newSelected.size === 0) {
        setTitle('');
        setYoutubeUrl('');
        setYoutubeId('');
        setDescription('');
      }
    }
    
    setSelectedVideos(newSelected);
  };

  // Handle bulk posting
  const handleBulkPost = async () => {
    if (selectedVideos.size === 0) return;
    
    setBulkPosting(true);
    const selectedVideosList = latestVideos.filter(v => selectedVideos.has(v.id) && !v.isPosted);
    
    try {
      const insertData = selectedVideosList.map(video => ({
        title: video.title,
        description: null,
        youtube_url: video.url,
        youtube_id: video.id,
      }));
      
      const { error } = await supabase
        .from('youtube posts')
        .insert(insertData);
      
      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to post some videos. Please try again.',
          variant: 'destructive',
        });
        console.error('Bulk insert error:', error);
      } else {
        toast({
          title: 'Success',
          description: `Successfully posted ${selectedVideosList.length} video(s)!`,
        });
        
        // Mark videos as posted
        const newPostedIds = new Set(postedVideoIds);
        selectedVideosList.forEach(video => newPostedIds.add(video.id));
        setPostedVideoIds(newPostedIds);
        
        // Update latest videos list
        setLatestVideos(prev => prev.map(video => ({
          ...video,
          isPosted: newPostedIds.has(video.id)
        })));
        
        // Clear selections
        setSelectedVideos(new Set());
        setTitle('');
        setYoutubeUrl('');
        setYoutubeId('');
        setDescription('');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to post videos. Please try again.',
        variant: 'destructive',
      });
      console.error('Bulk post error:', error);
    } finally {
      setBulkPosting(false);
    }
  };

  // Handle YouTube URL changes
  const handleYoutubeUrlChange = (url: string) => {
    setYoutubeUrl(url);
    setErrors({ ...errors, youtubeUrl: '', duplicate: '' });
    
    const videoId = extractYouTubeId(url.trim());
    setYoutubeId(videoId || '');
  };

  // Auto-extract and normalize on blur
  const handleYoutubeUrlBlur = async () => {
    const trimmedUrl = youtubeUrl.trim();
    if (!trimmedUrl) return;
    
    if (!isValidYouTubeUrl(trimmedUrl)) {
      setErrors({ ...errors, youtubeUrl: 'Invalid YouTube link' });
      return;
    }
    
    // Normalize URL
    const normalizedUrl = normalizeYouTubeUrl(trimmedUrl);
    setYoutubeUrl(normalizedUrl);
    
    const videoId = extractYouTubeId(normalizedUrl);
    if (videoId) {
      // Check for duplicates
      setDuplicateCheck(true);
      try {
        const { data, error } = await supabase
          .from('youtube posts')
          .select('youtube_id')
          .eq('youtube_id', videoId)
          .limit(1);
        
        if (error) {
          console.error('Error checking duplicates:', error);
        } else if (data && data.length > 0) {
          setErrors({ ...errors, duplicate: 'This video is already posted.' });
        }
      } catch (error) {
        console.error('Error checking duplicates:', error);
      } finally {
        setDuplicateCheck(false);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    
    const trimmedTitle = title.trim();
    const trimmedUrl = youtubeUrl.trim();
    const trimmedDescription = description.trim();
    
    if (!trimmedTitle) {
      newErrors.title = 'Title is required';
    }
    
    if (!trimmedUrl) {
      newErrors.youtubeUrl = 'YouTube URL is required';
    } else if (!isValidYouTubeUrl(trimmedUrl)) {
      newErrors.youtubeUrl = 'Invalid YouTube link';
    }
    
    if (trimmedDescription.length > maxDescriptionLength) {
      newErrors.description = `Description must be ${maxDescriptionLength} characters or less`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('youtube posts')
        .insert({
          title: trimmedTitle,
          description: trimmedDescription || null,
          youtube_url: normalizeYouTubeUrl(trimmedUrl),
          youtube_id: youtubeId,
        });

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to create post. Please try again.',
          variant: 'destructive',
        });
        console.error('Insert error:', error);
      } else {
        toast({
          title: 'Success',
          description: 'Post created successfully!',
        });
        setLocation('/');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create post. Please try again.',
        variant: 'destructive',
      });
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show 403 for non-admin users
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-600">Access Denied</CardTitle>
            <CardDescription>You need admin privileges to access this page.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => setLocation('/')} data-testid="button-home">
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Create New Post</CardTitle>
            <CardDescription>Add a new YouTube video to the site</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setErrors({ ...errors, title: '' });
                  }}
                  disabled={loading}
                  required
                  data-testid="input-title"
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <Label htmlFor="youtubeUrl">YouTube URL</Label>
                <Input
                  id="youtubeUrl"
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => handleYoutubeUrlChange(e.target.value)}
                  onBlur={handleYoutubeUrlBlur}
                  placeholder="https://youtu.be/... or https://youtube.com/watch?v=..."
                  disabled={loading}
                  required
                  data-testid="input-youtube-url"
                />
                {errors.youtubeUrl && (
                  <p className="text-red-600 text-sm mt-1">{errors.youtubeUrl}</p>
                )}
                {duplicateCheck && (
                  <p className="text-blue-600 text-sm mt-1">Checking for duplicates...</p>
                )}
                {errors.duplicate && (
                  <p className="text-orange-600 text-sm mt-1">{errors.duplicate}</p>
                )}
              </div>

              {youtubeId && (
                <div>
                  <Label>Thumbnail Preview</Label>
                  <div className="mt-2 aspect-video max-w-sm bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={getYouTubeThumbnail(youtubeId)}
                      alt="YouTube thumbnail"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      data-testid="img-thumbnail-preview"
                    />
                  </div>
                </div>
              )}

              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="description">Description (optional)</Label>
                  <span className={`text-sm ${
                    description.length > maxDescriptionLength 
                      ? 'text-red-600' 
                      : description.length > maxDescriptionLength * 0.8 
                        ? 'text-orange-600' 
                        : 'text-gray-500'
                  }`}>
                    {description.length}/{maxDescriptionLength}
                  </span>
                </div>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setErrors({ ...errors, description: '' });
                  }}
                  placeholder="Short description of the video..."
                  disabled={loading}
                  rows={3}
                  // maxLength={maxDescriptionLength + 50} // Allow some buffer for user experience
                  data-testid="textarea-description"
                />
                {errors.description && (
                  <p className="text-red-600 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={loading || !title.trim() || !youtubeUrl.trim() || !youtubeId || description.length > maxDescriptionLength}
                  data-testid="button-submit"
                >
                  {loading ? 'Creating...' : 'Create Post'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation('/')}
                  disabled={loading}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Latest YouTube Videos Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Latest YouTube Videos</CardTitle>
            <CardDescription>
              Select videos from your channel to post quickly
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingVideos ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading latest videos...</p>
              </div>
            ) : (
              <>
                <div className="grid gap-4 mb-6">
                  {latestVideos.map((video) => (
                    <div
                      key={video.id}
                      className={`flex items-center space-x-4 p-4 border rounded-lg ${
                        video.isPosted ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {!video.isPosted && (
                          <Checkbox
                            id={`video-${video.id}`}
                            checked={selectedVideos.has(video.id)}
                            onCheckedChange={(checked) => 
                              handleVideoSelect(video.id, checked as boolean)
                            }
                            disabled={bulkPosting}
                            data-testid={`checkbox-video-${video.id}`}
                          />
                        )}
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-20 h-15 object-cover rounded"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium text-sm leading-tight ${
                          video.isPosted ? 'text-gray-500' : 'text-gray-900'
                        }`}>
                          {video.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Published: {video.publishedDate}
                        </p>
                      </div>
                      {video.isPosted && (
                        <Badge variant="secondary" className="ml-2">
                          Posted
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                
                {selectedVideos.size > 0 && (
                  <div className="border-t pt-4">
                    <Button
                      onClick={handleBulkPost}
                      disabled={bulkPosting || selectedVideos.size === 0}
                      className="w-full"
                      data-testid="button-bulk-post"
                    >
                      {bulkPosting 
                        ? 'Posting...' 
                        : `Post Selected (${selectedVideos.size})`
                      }
                    </Button>
                  </div>
                )}
                
                {latestVideos.length === 0 && !loadingVideos && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No recent videos found.</p>
                    <Button
                      variant="outline"
                      onClick={parseYouTubeRSS}
                      className="mt-2"
                      data-testid="button-refresh-videos"
                    >
                      Refresh
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}