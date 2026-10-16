import { describe, expect, it } from 'vitest';
import { getProjectImageUrl, getProjectVideoUrl, isDirectVideoUrl } from './imageUrls';

describe('getProjectImageUrl', () => {
  it('converts a Google Drive file share URL', () => {
    expect(getProjectImageUrl('https://drive.google.com/file/d/file-id-123/view?usp=sharing'))
      .toBe('https://drive.google.com/thumbnail?id=file-id-123&sz=w1600');
  });

  it('converts Google Drive open links', () => {
    expect(getProjectImageUrl('https://drive.google.com/open?id=file-id-123'))
      .toBe('https://drive.google.com/thumbnail?id=file-id-123&sz=w1600');
  });

  it('leaves other image URLs unchanged', () => {
    const imageUrl = 'https://images.unsplash.com/photo.jpg';
    expect(getProjectImageUrl(imageUrl)).toBe(imageUrl);
  });

  it('creates a Google Drive preview URL for videos', () => {
    expect(getProjectVideoUrl('https://drive.google.com/file/d/video-id-123/view?usp=sharing'))
      .toBe('https://drive.google.com/file/d/video-id-123/preview');
  });

  it('recognizes direct video files', () => {
    expect(isDirectVideoUrl('https://cdn.example.com/demo.mp4?download=1')).toBe(true);
    expect(isDirectVideoUrl('https://cdn.example.com/demo.jpg')).toBe(false);
  });
});
