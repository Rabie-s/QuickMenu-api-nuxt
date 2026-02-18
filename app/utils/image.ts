/**
 * Formats an image URL to ensure it's a complete URL
 * If the URL is relative (starts with /), prepend the backend base URL
 */
export function formatImageUrl(url: string | null | undefined): string {
  if (!url) {
    return 'https://placehold.co/400x400/png'
  }

  // If already a full URL (http/https), return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  // If relative URL, prepend backend base URL and storage path
  const backendUrl = 'http://127.0.0.1:8000'

  // Check if URL already starts with storage/
  if (url.startsWith('storage/')) {
    return `${backendUrl}/${url}`
  }

  // Check if URL starts with /storage/
  if (url.startsWith('/storage/')) {
    return `${backendUrl}${url}`
  }

  // Otherwise, assume it's a path that needs storage/ prepended
  return `${backendUrl}/storage/${url.startsWith('/') ? url.slice(1) : url}`
}
