/**
 * Resolves a public asset path using Vite's BASE_URL.
 * When vite.config base = '/demo/', all assets resolve to /demo/filename.
 * Falls back gracefully for absolute URLs and data URIs.
 */
export const getAssetUrl = (path) => {
  if (!path) return '';
  // Already absolute (http, https, data:)
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  let cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Automatically strip leading 'public/' if passed
  if (cleanPath.startsWith('public/')) {
    cleanPath = cleanPath.slice(7);
  }
  // import.meta.env.BASE_URL is set by Vite from vite.config base (e.g. '/demo/')
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${cleanPath}`;
};

