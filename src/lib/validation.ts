import { z } from 'zod';
import { PortfolioData } from '../types';

const urlSchema = z.string().url().refine((value) => {
  try {
    return ['http:', 'https:', 'mailto:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}, 'Use a valid http, https, or mailto URL.');

export const contactMessageSchema = z.object({
  senderName: z.string().trim().min(2, 'Please enter your name.').max(100),
  senderEmail: z.string().trim().email('Please enter a valid email address.').max(254),
  subject: z.string().trim().max(160).default('Inquiry from GM Mercullo Portfolio'),
  message: z.string().trim().min(10, 'Please write at least 10 characters.').max(5000),
});

export const profileSchema = z.object({
  name: z.string().trim().min(1).max(100),
  headline: z.string().trim().min(1).max(200),
  introduction: z.string().trim().min(1).max(1000),
  extendedBio: z.string().max(3000).optional(),
  email: z.string().email().max(254),
  github: urlSchema,
  linkedin: urlSchema,
  resumeUrl: z.string().max(500),
  adminPasscode: z.string().optional(),
  avatarUrl: urlSchema.optional(),
});

export const portfolioDataSchema = z.object({
  profile: profileSchema,
  projects: z.array(z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    mainFeatures: z.array(z.string()),
    technologies: z.array(z.string()),
    githubUrl: urlSchema,
    demoUrl: z.string().optional(),
    imageUrl: z.string(),
    isFeatured: z.boolean(),
    category: z.enum(['networking', 'software', 'tool', 'web']),
    verifiedCapabilities: z.string().optional(),
  })),
  experiences: z.array(z.unknown()),
  credentials: z.array(z.unknown()),
  skills: z.array(z.unknown()),
  learningEntries: z.array(z.unknown()),
  messages: z.array(z.unknown()),
});

export function parsePortfolioData(value: unknown): PortfolioData | null {
  const result = portfolioDataSchema.safeParse(value);
  return result.success ? result.data as PortfolioData : null;
}
