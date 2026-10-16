const GOOGLE_DRIVE_FILE_PATTERNS = [
  /drive\.google\.com\/file\/d\/([^/]+)/i,
  /drive\.google\.com\/open\?id=([^&]+)/i,
  /drive\.google\.com\/uc\?(?:[^#]*&)?id=([^&]+)/i,
];


function getGoogleDriveFileId(url: string): string | null {
  for (const pattern of GOOGLE_DRIVE_FILE_PATTERNS) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

/**
 * Converts a public Google Drive file link into an embeddable image URL.
 * Non-Drive URLs are returned unchanged.
 */
export function getProjectImageUrl(imageUrl: string): string {
  const fileId = getGoogleDriveFileId(imageUrl);
  return fileId
    ? `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w1600`
    : imageUrl;
}

export function getProjectVideoUrl(videoUrl: string): string {
  const fileId = getGoogleDriveFileId(videoUrl);
  return fileId
    ? `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/preview`
    : videoUrl;
}

export function isDirectVideoUrl(url: string): boolean {
  return /\.(mp4|webm|ogg)(?:$|[?#])/i.test(url);
}
