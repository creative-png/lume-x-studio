// Image resolver utility using import.meta.glob with eager loading
// Ensures any images added in src/assets/images will resolve properly in production builds.

const assetImages = import.meta.glob<{ default: string } | string>(
  '/src/assets/images/**/*.{jpg,jpeg,png,webp,avif,svg,gif,JPG,JPEG,PNG,WEBP,AVIF,SVG,GIF}',
  { eager: true }
);

export const FALLBACK_IMAGE_PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%231f1824"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23d9b8a3" font-family="serif" font-size="22" letter-spacing="2">LUMÉ STUDIO</text></svg>';

export function resolveImagePath(path?: string | null): string {
  if (!path || typeof path !== 'string' || path.trim() === '') {
    return FALLBACK_IMAGE_PLACEHOLDER;
  }

  const trimmed = path.trim();

  // If already external or data URI, return directly
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
    return trimmed;
  }

  // Normalize path with leading slash
  const normalized = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;

  // Direct lookup in glob map
  const directMatch = assetImages[normalized];
  if (directMatch) {
    return typeof directMatch === 'string' ? directMatch : directMatch.default;
  }

  // Lookup by filename/basename in case path was entered as "filename.jpg" or without full path
  const filename = normalized.split('/').pop();
  if (filename) {
    for (const [key, mod] of Object.entries(assetImages)) {
      if (key.endsWith(`/${filename}`)) {
        return typeof mod === 'string' ? mod : mod.default;
      }
    }
  }

  // Return the path itself or fallback placeholder
  return normalized || FALLBACK_IMAGE_PLACEHOLDER;
}
