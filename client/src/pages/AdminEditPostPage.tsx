import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, useParams } from 'wouter';
import { supabase } from '@/lib/supabaseClient';
import { extractYouTubeId, isValidYouTubeUrl, getYouTubeThumbnail, normalizeYouTubeUrl } from '@/lib/youtube';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface YoutubePost {
  id: number;
  title: string;
  description: string | null;
  youtube_id: string;
  youtube_url: string;
  created_at: string;
}

export default function AdminEditPostPage() {
  const [location, setLocation] = useLocation();
  const { id } = useParams();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeId, setYoutubeId] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [duplicateCheck, setDuplicateCheck] = useState(false);
  const [originalPost, setOriginalPost] = useState<YoutubePost | null>(null);
  
  const maxDescriptionLength = 200;

  // Handle access control
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        setLocation('/login');
        return;
      }
      if (!isAdmin) {
        return;
      }
    }
  }, [user, isAdmin, authLoading, setLocation]);

  // Load post data
  useEffect(() => {
    if (!id || !isAdmin || authLoading) return;
    
    const loadPost = async () => {
      try {
        const { data, error } = await supabase
          .from('youtube posts')
          .select('*')
          .eq('id', id)
          .limit(1);
        
        if (error) throw error;
        
        if (!data || data.length === 0) {
          toast({
            title: 'Error',
            description: 'Post not found.',
            variant: 'destructive',
          });
          setLocation('/board');
          return;
        }
        
        const post = data[0] as YoutubePost;
        setOriginalPost(post);
        setTitle(post.title);
        setYoutubeUrl(post.youtube_url);
        setDescription(post.description || '');
        setYoutubeId(post.youtube_id);
      } catch (error) {
        console.error('Error loading post:', error);
        toast({
          title: 'Error',
          description: 'Failed to load post.',
          variant: 'destructive',
        });
        setLocation('/board');
      } finally {
        setInitialLoading(false);
      }
    };
    
    loadPost();
  }, [id, isAdmin, authLoading, setLocation, toast]);

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
    if (videoId && originalPost) {
      // Check for duplicates (excluding current post)
      setDuplicateCheck(true);
      try {
        const { data, error } = await supabase
          .from('youtube posts')
          .select('youtube_id')
          .eq('youtube_id', videoId)
          .neq('id', originalPost.id)
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
    if (!originalPost) return;
    
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
        .update({
          title: trimmedTitle,
          description: trimmedDescription || null,
          youtube_url: normalizeYouTubeUrl(trimmedUrl),
          youtube_id: youtubeId,
        })
        .eq('id', originalPost.id);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update post. Please try again.',
          variant: 'destructive',
        });
        console.error('Update error:', error);
      } else {
        toast({
          title: 'Success',
          description: 'Post updated successfully!',
        });
        setLocation('/board');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update post. Please try again.',
        variant: 'destructive',
      });
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth or loading post
  if (authLoading || initialLoading) {
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
            <CardTitle className="text-2xl font-bold">Edit Post</CardTitle>
            <CardDescription>Update the YouTube video post</CardDescription>
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
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation('/board')}
                  disabled={loading}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}