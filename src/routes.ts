export type ChapterPath =
  | '/'
  | '/great-hall'
  | '/map'
  | '/path'
  | '/credentials'
  | '/spellbook'
  | '/patronus-forest'
  | '/owl-post';

const chapterPaths = new Set<ChapterPath>([
  '/',
  '/great-hall',
  '/map',
  '/path',
  '/credentials',
  '/spellbook',
  '/patronus-forest',
  '/owl-post',
]);

export const getChapterPath = (pathname: string): ChapterPath => {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  if (chapterPaths.has(normalizedPath as ChapterPath)) {
    return normalizedPath as ChapterPath;
  }
  return '/';
};