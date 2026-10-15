import { PortfolioData, Project, Experience, Credential, SkillItem, LearningEntry, OwlPostMessage, Profile } from '../types';
import { initialPortfolioData } from '../data/initialData';
import { parsePortfolioData } from '../lib/validation';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const STORAGE_KEY = 'gm_mercullo_portfolio_data_v2';
const AUTH_KEY = 'gm_mercullo_admin_auth';
const THEME_KEY = 'gm_mercullo_theme_preference';

class StorageService {
  private data: PortfolioData;

  constructor() {
    this.data = this.loadFromStorage();
  }

  public isLocalDemoMode(): boolean {
    return !isSupabaseConfigured;
  }

  private loadFromStorage(): PortfolioData {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = parsePortfolioData(JSON.parse(stored));
        if (!parsed) {
          console.warn('Stored portfolio data is invalid; using defaults.');
          return JSON.parse(JSON.stringify(initialPortfolioData));
        }
        return {
          profile: { ...initialPortfolioData.profile, ...parsed.profile },
          projects: Array.isArray(parsed.projects) ? parsed.projects : initialPortfolioData.projects,
          experiences: Array.isArray(parsed.experiences) ? parsed.experiences : initialPortfolioData.experiences,
          credentials: Array.isArray(parsed.credentials) ? parsed.credentials : initialPortfolioData.credentials,
          skills: Array.isArray(parsed.skills) ? parsed.skills : initialPortfolioData.skills,
          learningEntries: Array.isArray(parsed.learningEntries) ? parsed.learningEntries : initialPortfolioData.learningEntries,
          messages: Array.isArray(parsed.messages) ? parsed.messages : initialPortfolioData.messages,
        };
      }
    } catch (e) {
      console.error("Failed to load portfolio data from storage, using defaults", e);
    }
    return JSON.parse(JSON.stringify(initialPortfolioData));
  }

  private persistAndNotify() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      if (supabase) {
        const { adminPasscode: _adminPasscode, ...publicProfile } = this.data.profile;
        const remoteData = { ...this.data, profile: publicProfile };
        void supabase.from('portfolio_data').upsert({ id: true, data: remoteData }).then(({ error }) => {
          if (error) console.error('Failed to sync portfolio data with Supabase', error);
        });
      }
      window.dispatchEvent(new CustomEvent('portfolio_data_changed', { detail: this.data }));
    } catch (e) {
      console.error("Failed to persist portfolio data", e);
    }
  }

  // --- Portfolio Data ---
  public getData(): PortfolioData {
    return this.data;
  }

  public async hydrateFromSupabase(): Promise<boolean> {
    if (!supabase) return false;
    const { data, error } = await supabase
      .from('portfolio_data')
      .select('data')
      .eq('id', true)
      .maybeSingle();
    if (error) {
      console.error('Failed to load portfolio data from Supabase', error);
      return false;
    }
    const remote = parsePortfolioData(data?.data);
    if (!remote) return false;
    this.data = { ...remote, profile: { ...initialPortfolioData.profile, ...remote.profile } };
    window.dispatchEvent(new CustomEvent('portfolio_data_changed', { detail: this.data }));
    return true;
  }

  // --- Theme (Light / Dark) ---
  public getThemePreference(): 'light' | 'dark' {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    // Default to system preference
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'dark'; // Atmospheric default
  }

  public setThemePreference(theme: 'light' | 'dark') {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.dispatchEvent(new CustomEvent('portfolio_theme_changed', { detail: theme }));
  }

  // --- Profile CRUD ---
  public getProfile(): Profile {
    return this.data.profile;
  }

  public updateProfile(updates: Partial<Profile>): Profile {
    this.data.profile = { ...this.data.profile, ...updates };
    this.persistAndNotify();
    return this.data.profile;
  }

  // --- Projects CRUD ---
  public getProjects(): Project[] {
    return this.data.projects;
  }

  public saveProject(project: Project): Project {
    const existingIndex = this.data.projects.findIndex(p => p.id === project.id);
    if (existingIndex >= 0) {
      this.data.projects[existingIndex] = project;
    } else {
      if (!project.id) {
        project.id = 'proj-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
      }
      this.data.projects.unshift(project);
    }
    this.persistAndNotify();
    return project;
  }

  public deleteProject(id: string): boolean {
    const beforeCount = this.data.projects.length;
    this.data.projects = this.data.projects.filter(p => p.id !== id);
    if (this.data.projects.length !== beforeCount) {
      this.persistAndNotify();
      return true;
    }
    return false;
  }

  // --- Experiences CRUD ---
  public getExperiences(): Experience[] {
    return this.data.experiences;
  }

  public saveExperience(exp: Experience): Experience {
    const existingIndex = this.data.experiences.findIndex(e => e.id === exp.id);
    if (existingIndex >= 0) {
      this.data.experiences[existingIndex] = exp;
    } else {
      if (!exp.id) {
        exp.id = 'exp-' + Date.now().toString(36);
      }
      this.data.experiences.push(exp);
    }
    this.persistAndNotify();
    return exp;
  }

  public deleteExperience(id: string): boolean {
    const before = this.data.experiences.length;
    this.data.experiences = this.data.experiences.filter(e => e.id !== id);
    if (this.data.experiences.length !== before) {
      this.persistAndNotify();
      return true;
    }
    return false;
  }

  // --- Credentials CRUD ---
  public getCredentials(): Credential[] {
    return this.data.credentials;
  }

  public saveCredential(cred: Credential): Credential {
    const existingIndex = this.data.credentials.findIndex(c => c.id === cred.id);
    if (existingIndex >= 0) {
      this.data.credentials[existingIndex] = cred;
    } else {
      if (!cred.id) {
        cred.id = 'cred-' + Date.now().toString(36);
      }
      this.data.credentials.push(cred);
    }
    this.persistAndNotify();
    return cred;
  }

  public deleteCredential(id: string): boolean {
    const before = this.data.credentials.length;
    this.data.credentials = this.data.credentials.filter(c => c.id !== id);
    if (this.data.credentials.length !== before) {
      this.persistAndNotify();
      return true;
    }
    return false;
  }

  // --- Skills CRUD ---
  public getSkills(): SkillItem[] {
    return this.data.skills;
  }

  public saveSkill(skill: SkillItem): SkillItem {
    const existingIndex = this.data.skills.findIndex(s => s.id === skill.id);
    if (existingIndex >= 0) {
      this.data.skills[existingIndex] = skill;
    } else {
      if (!skill.id) {
        skill.id = 'skill-' + Date.now().toString(36);
      }
      this.data.skills.push(skill);
    }
    this.persistAndNotify();
    return skill;
  }

  public deleteSkill(id: string): boolean {
    const before = this.data.skills.length;
    this.data.skills = this.data.skills.filter(s => s.id !== id);
    if (this.data.skills.length !== before) {
      this.persistAndNotify();
      return true;
    }
    return false;
  }

  // --- Learning / Patronus Forest CRUD ---
  public getLearningEntries(): LearningEntry[] {
    return this.data.learningEntries;
  }

  public saveLearningEntry(entry: LearningEntry): LearningEntry {
    const existingIndex = this.data.learningEntries.findIndex(l => l.id === entry.id);
    if (existingIndex >= 0) {
      this.data.learningEntries[existingIndex] = entry;
    } else {
      if (!entry.id) {
        entry.id = 'learn-' + Date.now().toString(36);
      }
      this.data.learningEntries.unshift(entry);
    }
    this.persistAndNotify();
    return entry;
  }

  public deleteLearningEntry(id: string): boolean {
    const before = this.data.learningEntries.length;
    this.data.learningEntries = this.data.learningEntries.filter(l => l.id !== id);
    if (this.data.learningEntries.length !== before) {
      this.persistAndNotify();
      return true;
    }
    return false;
  }

  // --- Owl Post / Messages CRUD ---
  public getMessages(): OwlPostMessage[] {
    return this.data.messages;
  }

  public addMessage(newMsg: Omit<OwlPostMessage, 'id' | 'timestamp' | 'read'>): OwlPostMessage {
    const now = new Date();
    const timeStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' at ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const message: OwlPostMessage = {
      ...newMsg,
      id: 'owl-' + Date.now().toString(36),
      timestamp: timeStr,
      read: false
    };
    
    this.data.messages.unshift(message);
    this.persistAndNotify();
    return message;
  }

  public async submitMessage(
    newMsg: Omit<OwlPostMessage, 'id' | 'timestamp' | 'read'>,
  ): Promise<void> {
    if (supabase) {
      const { error } = await supabase.from('owl_post_messages').insert({
        sender_name: newMsg.senderName,
        sender_email: newMsg.senderEmail,
        subject: newMsg.subject,
        message: newMsg.message,
      });
      if (error) throw new Error(`Unable to dispatch owl post: ${error.message}`);
      return;
    }
    this.addMessage(newMsg);
  }

  public toggleReadMessage(id: string): boolean {
    const msg = this.data.messages.find(m => m.id === id);
    if (msg) {
      msg.read = !msg.read;
      this.persistAndNotify();
      return true;
    }
    return false;
  }

  public deleteMessage(id: string): boolean {
    const before = this.data.messages.length;
    this.data.messages = this.data.messages.filter(m => m.id !== id);
    if (this.data.messages.length !== before) {
      this.persistAndNotify();
      return true;
    }
    return false;
  }

  // --- Auth / Passcode ---
  public verifyPasscode(passcode: string): boolean {
    return passcode.trim().toLowerCase() === this.data.profile.adminPasscode.toLowerCase();
  }

  public isAdminLoggedIn(): boolean {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  }

  public loginAdmin(passcode: string): boolean {
    if (this.verifyPasscode(passcode)) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      window.dispatchEvent(new CustomEvent('portfolio_auth_changed', { detail: true }));
      return true;
    }
    return false;
  }

  public async loginAdminWithSupabase(email: string, password: string): Promise<boolean> {
    if (!supabase) return this.loginAdmin(password);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) return false;
    window.dispatchEvent(new CustomEvent('portfolio_auth_changed', { detail: true }));
    return true;
  }

  public logoutAdmin(): void {
    sessionStorage.removeItem(AUTH_KEY);
    if (supabase) {
      void supabase.auth.signOut();
    }
    window.dispatchEvent(new CustomEvent('portfolio_auth_changed', { detail: false }));
  }

  public changeAdminPasscode(newPasscode: string): boolean {
    if (!newPasscode || newPasscode.trim().length < 3) return false;
    this.data.profile.adminPasscode = newPasscode.trim();
    this.persistAndNotify();
    return true;
  }

  // --- Backup & Restore ---
  public exportDataJSON(): string {
    return JSON.stringify(this.data, null, 2);
  }

  public importDataJSON(jsonStr: string): boolean {
    try {
      const parsed = parsePortfolioData(JSON.parse(jsonStr));
      if (parsed) {
        this.data = {
          profile: { ...initialPortfolioData.profile, ...parsed.profile },
          projects: parsed.projects,
          experiences: parsed.experiences,
          credentials: parsed.credentials,
          skills: parsed.skills,
          learningEntries: parsed.learningEntries,
          messages: parsed.messages,
        };
        this.persistAndNotify();
        return true;
      }
    } catch (e) {
      console.error("Invalid JSON spellbook import", e);
    }
    return false;
  }

  public resetToDefaults(): void {
    this.data = JSON.parse(JSON.stringify(initialPortfolioData));
    this.persistAndNotify();
  }
}

export const storage = new StorageService();
