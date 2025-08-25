/**
 * Extract YouTube video ID from various YouTube URL formats
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;

  // Remove leading/trailing whitespace
  url = url.trim();

  // Handle different YouTube URL formats
  const patterns = [
    // youtu.be/ID
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    // youtube.com/watch?v=ID
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    // youtube.com/shorts/ID
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    // youtube.com/embed/ID
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    // youtube.com/v/ID
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Validate if a string is a valid YouTube URL
 */
export function isValidYouTubeUrl(url: string): boolean {
  return extractYouTubeId(url) !== null;
}

/**
 * Get YouTube thumbnail URL from video ID
 */
export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}