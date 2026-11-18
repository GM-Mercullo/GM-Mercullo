import { describe, expect, it } from 'vitest';
import { getChapterPath } from './routes';

describe('getChapterPath', () => {
  it('returns each supported chapter path', () => {
    expect(getChapterPath('/')).toBe('/');
    expect(getChapterPath('/great-hall')).toBe('/great-hall');
    expect(getChapterPath('/map')).toBe('/map');
    expect(getChapterPath('/path')).toBe('/path');
    expect(getChapterPath('/credentials')).toBe('/credentials');
    expect(getChapterPath('/spellbook')).toBe('/spellbook');
    expect(getChapterPath('/patronus-forest')).toBe('/patronus-forest');
    expect(getChapterPath('/owl-post')).toBe('/owl-post');
  });

  it('normalizes trailing slashes and falls back for unknown paths', () => {
    expect(getChapterPath('/great-hall/')).toBe('/great-hall');
    expect(getChapterPath('/not-a-chapter')).toBe('/');
  });
});