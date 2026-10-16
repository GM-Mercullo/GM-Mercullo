export interface Profile {
  name: string;
  headline: string;
  introduction: string;
  extendedBio?: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  adminPasscode: string;
  avatarUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  mainFeatures: string[];
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl: string;
  mediaType?: 'image' | 'video';
  mediaAutoplay?: boolean;
  mediaLoop?: boolean;
  mediaPosterUrl?: string;
  isFeatured: boolean;
  category: 'networking' | 'software' | 'tool' | 'web';
  verifiedCapabilities?: string;
}

export interface Experience {
  id: string;
  position: string;
  organization: string;
  period: string;
  responsibilities: string[];
  notes?: string;
}

export interface Credential {
  id: string;
  name: string;
  issuingPlatform: string;
  completionDate: string;
  verificationUrl: string;
  skillsLearned: string[];
  description?: string;
}

export type SkillCategory = 'programming' | 'networking' | 'cybersecurity' | 'tools';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  practicalApplication?: string;
}

export type LearningType = 'milestone' | 'technology' | 'problem-solved' | 'improvement' | 'goal';

export interface LearningEntry {
  id: string;
  type: LearningType;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export interface OwlPostMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  experiences: Experience[];
  credentials: Credential[];
  skills: SkillItem[];
  learningEntries: LearningEntry[];
  messages: OwlPostMessage[];
}
