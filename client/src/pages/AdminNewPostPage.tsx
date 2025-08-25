import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { supabase } from '@/lib/supabaseClient';
import { extractYouTubeId, isValidYouTubeUrl, getYouTubeThumbnail } from '@/lib/youtube';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

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

  // Handle YouTube URL changes
  const handleYoutubeUrlChange = (url: string) => {
    setYoutubeUrl(url);
    setErrors({ ...errors, youtubeUrl: '' });
    
    const videoId = extractYouTubeId(url);
    setYoutubeId(videoId || '');
  };

  // Auto-extract on blur
  const handleYoutubeUrlBlur = () => {
    if (youtubeUrl && !isValidYouTubeUrl(youtubeUrl)) {
      setErrors({ ...errors, youtubeUrl: 'Invalid YouTube link' });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!youtubeUrl.trim()) {
      newErrors.youtubeUrl = 'YouTube URL is required';
    } else if (!isValidYouTubeUrl(youtubeUrl)) {
      newErrors.youtubeUrl = 'Invalid YouTube link';
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
          title: title.trim(),
          description: description.trim() || null,
          youtube_url: youtubeUrl.trim(),
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
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description of the video..."
                  disabled={loading}
                  rows={3}
                  data-testid="textarea-description"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={loading || !title.trim() || !youtubeUrl.trim() || !youtubeId}
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
      </div>
    </div>
  );
}