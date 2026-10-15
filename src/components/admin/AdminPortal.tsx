import React, { useState, useEffect, useRef } from 'react';
import { PortfolioData, Project, Experience, Credential, SkillItem, LearningEntry, OwlPostMessage, Profile } from '../../types';
import { storage } from '../../services/storageService';
import { isSupabaseConfigured } from '../../lib/supabase';
import { audioFx } from '../../utils/audioFx';
import { ProjectFormModal } from './ProjectFormModal';
import { ExperienceFormModal } from './ExperienceFormModal';
import { CredentialFormModal } from './CredentialFormModal';
import { SkillFormModal } from './SkillFormModal';
import { LearningFormModal } from './LearningFormModal';
import {
  X,
  Lock,
  Unlock,
  KeyRound,
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Award,
  Compass,
  Inbox,
  User,
  Database,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  ExternalLink,
  Download,
  Upload,
  RefreshCw,
  LogOut,
  Mail,
  CheckCheck,
  Milestone
} from 'lucide-react';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab = 'overview' | 'projects' | 'experience' | 'credentials' | 'skills' | 'learning' | 'messages' | 'profile' | 'vault';

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(storage.isAdminLoggedIn());
  const [passcode, setPasscode] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Master Data
  const [data, setData] = useState<PortfolioData>(storage.getData());

  // CRUD Modals
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [expModalOpen, setExpModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  const [credModalOpen, setCredModalOpen] = useState(false);
  const [editingCred, setEditingCred] = useState<Credential | null>(null);

  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);

  const [learningModalOpen, setLearningModalOpen] = useState(false);
  const [editingLearning, setEditingLearning] = useState<LearningEntry | null>(null);

  // Profile form
  const [profileForm, setProfileForm] = useState<Profile>(data.profile);
  const [passcodeChange, setPasscodeChange] = useState('');
  const [profileSavedToast, setProfileSavedToast] = useState(false);

  // File import ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleDataChange = () => {
      const fresh = storage.getData();
      setData({ ...fresh });
      setProfileForm({ ...fresh.profile });
    };

    const handleAuthChange = (e: CustomEvent<boolean>) => {
      setIsAuthenticated(e.detail);
    };

    window.addEventListener('portfolio_data_changed', handleDataChange as EventListener);
    window.addEventListener('portfolio_auth_changed', handleAuthChange as EventListener);

    return () => {
      window.removeEventListener('portfolio_data_changed', handleDataChange as EventListener);
      window.removeEventListener('portfolio_auth_changed', handleAuthChange as EventListener);
    };
  }, []);

  if (!isOpen) return null;

  // --- Auth Handlers ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loggedIn = await storage.loginAdminWithSupabase(adminEmail, passcode);
    if (loggedIn) {
      audioFx.playAlohomora();
      setIsAuthenticated(true);
      setAuthError('');
      setPasscode('');
    } else {
      setAuthError('Incorrect spell incantation. (Hint: The default passcode is "alohomora")');
      audioFx.playIncendio();
    }
  };

  const handleLogout = () => {
    storage.logoutAdmin();
    setIsAuthenticated(false);
    audioFx.playPaperRustle();
    onClose();
  };

  // --- CRUD Handlers ---
  const handleSaveProject = (project: Project) => {
    storage.saveProject(project);
    audioFx.playLumos();
  };

  const handleDeleteProject = (id: string) => {
    storage.deleteProject(id);
    audioFx.playPaperRustle();
  };

  const handleSaveExp = (exp: Experience) => {
    storage.saveExperience(exp);
    audioFx.playLumos();
  };

  const handleDeleteExp = (id: string) => {
    storage.deleteExperience(id);
    audioFx.playPaperRustle();
  };

  const handleSaveCred = (cred: Credential) => {
    storage.saveCredential(cred);
    audioFx.playLumos();
  };

  const handleDeleteCred = (id: string) => {
    storage.deleteCredential(id);
    audioFx.playPaperRustle();
  };

  const handleSaveSkill = (skill: SkillItem) => {
    storage.saveSkill(skill);
    audioFx.playLumos();
  };

  const handleDeleteSkill = (id: string) => {
    storage.deleteSkill(id);
    audioFx.playPaperRustle();
  };

  const handleSaveLearning = (entry: LearningEntry) => {
    storage.saveLearningEntry(entry);
    audioFx.playLumos();
  };

  const handleDeleteLearning = (id: string) => {
    storage.deleteLearningEntry(id);
    audioFx.playPaperRustle();
  };

  const handleToggleMessageRead = (id: string) => {
    storage.toggleReadMessage(id);
    audioFx.playPaperRustle();
  };

  const handleDeleteMessage = (id: string) => {
    storage.deleteMessage(id);
    audioFx.playPaperRustle();
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    storage.updateProfile(profileForm);
    if (passcodeChange.trim().length >= 3) {
      storage.changeAdminPasscode(passcodeChange.trim());
      setPasscodeChange('');
    }
    audioFx.playAlohomora();
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 3500);
  };

  const handleExportJSON = () => {
    const jsonStr = storage.exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gm-mercullo-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    audioFx.playAlohomora();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (storage.importDataJSON(content)) {
        audioFx.playAlohomora();
        alert('✨ Spellbook records imported successfully!');
      } else {
        alert('Failed to parse spellbook JSON. Please verify file structure.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleResetDefaults = () => {
    if (confirm('Revert all portfolio data to original default projects and credentials?')) {
      storage.resetToDefaults();
      audioFx.playAlohomora();
    }
  };

  const unreadMessagesCount = data.messages.filter((m) => !m.read).length;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="admin-portal-title" className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      
      {/* Admin Chamber Container */}
      <div className="relative w-full max-w-6xl h-[94vh] bg-[#F4E9C8] dark:bg-[#111D2B] text-[#302B22] dark:text-[#F0E8D5] border-2 border-[#B49A62] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-[#D8C697] dark:border-[#34475A] flex items-center justify-between bg-[#E8D9AE] dark:bg-[#080F19]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#702C38] border-2 border-[#B49A62] text-[#F4E9C8] font-heading font-bold text-base flex items-center justify-center shadow">
              GM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="admin-portal-title" className="font-heading font-bold text-lg text-[#702C38] dark:text-[#C5A66A] tracking-wider">
                  THE ROOM OF REQUIREMENT CMS
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#702C38]/10 text-[#702C38] dark:text-[#8CCBFF] border border-[#702C38]/20">
                  ADMIN PORTAL
                </span>
              </div>
              <p className="text-xs font-sans text-[#75664B] dark:text-[#B7C1CC]">
                Full CRUD Management: Projects, Experience, Credentials, Skills & Owls
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-transparent border border-[#702C38]/40 hover:border-[#702C38] text-[#702C38] dark:text-[#F0E8D5] text-xs font-heading font-bold flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}

            <button
              onClick={onClose}
              aria-label="Close admin portal"
              className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-[#75664B] dark:text-[#B7C1CC]"
              title="Close Admin Chamber"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* ==================================================================== */
          /* UNATHENTICATED ALOHOMORA GATE                                        */
          /* ==================================================================== */
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-[#E8D9AE]/60 dark:bg-[#080F19] border-2 border-[#B49A62] rounded-3xl p-8 text-center shadow-lg space-y-6">
              
              <div className="w-16 h-16 mx-auto rounded-full bg-[#702C38] border-2 border-[#B49A62] flex items-center justify-center text-[#F4E9C8] shadow">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-heading text-[#702C38] dark:text-[#C5A66A] font-bold uppercase tracking-widest block mb-1">
                  Enchanted Passcode Ward
                </span>
                <h3 className="text-2xl font-heading font-bold">
                  Enter the Alohomora Incantation
                </h3>
                <p className="text-xs font-sans text-[#75664B] dark:text-[#B7C1CC] mt-2">
                  The Room of Requirement opens only to those who speak the secret password.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {isSupabaseConfigured && (
                  <input
                    type="email"
                    required
                    autoComplete="username"
                    placeholder="Admin email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F4E9C8] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] rounded-xl text-sm focus:outline-none focus:border-[#702C38] shadow-inner"
                  />
                )}
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#702C38] dark:text-[#C5A66A]" />
                  <input
                    type="password"
                    autoFocus
                    autoComplete="current-password"
                    placeholder={isSupabaseConfigured ? 'Enter your Supabase password...' : 'Enter local demo passcode...'}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#F4E9C8] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] rounded-xl text-sm font-mono text-center focus:outline-none focus:border-[#702C38] shadow-inner"
                  />
                </div>

                {authError && (
                  <p className="text-xs font-sans text-red-500 animate-shake">
                    {authError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#702C38] hover:bg-[#8A3645] text-[#F4E9C8] font-heading font-bold text-xs tracking-wider shadow flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Unlock className="w-4 h-4 text-[#B49A62]" />
                  <span>Alohomora! (Unlock Chamber)</span>
                </button>
              </form>

              {/* Helpful Hint Card */}
              <div className="p-3.5 rounded-xl bg-[#F4E9C8] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-left text-xs font-sans text-[#75664B] dark:text-[#B7C1CC] space-y-1">
                <div className="text-[#702C38] dark:text-[#C5A66A] font-heading font-bold text-[11px] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Passcode Note:
                </div>
                {isSupabaseConfigured ? (
                  <div className="text-[11px] italic">Authentication is managed by Supabase. Passwords are never stored in this browser.</div>
                ) : (
                  <>
                    <div>Local demo passcode: <code className="font-mono font-bold text-[#702C38] dark:text-[#8CCBFF] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">alohomora</code></div>
                    <div className="text-[11px] italic">Configure Supabase before deploying; local demo mode is not secure.</div>
                  </>
                )}
              </div>

            </div>
          </div>
        ) : (
          /* ==================================================================== */
          /* AUTHENTICATED ADMIN DASHBOARD                                        */
          /* ==================================================================== */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-[#E8D9AE] dark:bg-[#080F19] border-r border-[#D8C697] dark:border-[#34475A] p-4 flex md:flex-col justify-between overflow-x-auto md:overflow-y-auto shrink-0">
              <nav className="flex md:flex-col gap-1 min-w-max md:min-w-0">
                
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-heading font-semibold flex items-center gap-2.5 transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-[#702C38] text-[#F4E9C8] shadow'
                      : 'text-[#75664B] dark:text-[#B7C1CC] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-heading font-semibold flex items-center justify-between transition-colors ${
                    activeTab === 'projects'
                      ? 'bg-[#702C38] text-[#F4E9C8] shadow'
                      : 'text-[#75664B] dark:text-[#B7C1CC] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4" />
                    <span>The Great Hall (Projects)</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-black/10 dark:bg-white/10">
                    {data.projects.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('experience')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-heading font-semibold flex items-center justify-between transition-colors ${
                    activeTab === 'experience'
                      ? 'bg-[#702C38] text-[#F4E9C8] shadow'
                      : 'text-[#75664B] dark:text-[#B7C1CC] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4" />
                    <span>The Path (Experience)</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-black/10 dark:bg-white/10">
                    {data.experiences.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('credentials')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-heading font-semibold flex items-center justify-between transition-colors ${
                    activeTab === 'credentials'
                      ? 'bg-[#702C38] text-[#F4E9C8] shadow'
                      : 'text-[#75664B] dark:text-[#B7C1CC] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Award className="w-4 h-4" />
                    <span>Credentials</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-black/10 dark:bg-white/10">
                    {data.credentials.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('skills')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-heading font-semibold flex items-center justify-between transition-colors ${
                    activeTab === 'skills'
                      ? 'bg-[#702C38] text-[#F4E9C8] shadow'
                      : 'text-[#75664B] dark:text-[#B7C1CC] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4" />
                    <span>Spellbook of Skills</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-black/10 dark:bg-white/10">
                    {data.skills.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('learning')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-heading font-semibold flex items-center justify-between transition-colors ${
                    activeTab === 'learning'
                      ? 'bg-[#702C38] text-[#F4E9C8] shadow'
                      : 'text-[#75664B] dark:text-[#B7C1CC] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Milestone className="w-4 h-4" />
                    <span>Patronus Forest</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-black/10 dark:bg-white/10">
                    {data.learningEntries.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('messages')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-heading font-semibold flex items-center justify-between transition-colors ${
                    activeTab === 'messages'
                      ? 'bg-[#702C38] text-[#F4E9C8] shadow'
                      : 'text-[#75664B] dark:text-[#B7C1CC] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Inbox className="w-4 h-4" />
                    <span>Owl Post Inbox</span>
                  </span>
                  {unreadMessagesCount > 0 ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-red-600 text-white animate-pulse">
                      {unreadMessagesCount} unread
                    </span>
                  ) : (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-black/10 dark:bg-white/10">
                      {data.messages.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-heading font-semibold flex items-center gap-2.5 transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-[#702C38] text-[#F4E9C8] shadow'
                      : 'text-[#75664B] dark:text-[#B7C1CC] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Maker Identity</span>
                </button>

                <button
                  onClick={() => setActiveTab('vault')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-heading font-semibold flex items-center gap-2.5 transition-colors ${
                    activeTab === 'vault'
                      ? 'bg-[#702C38] text-[#F4E9C8] shadow'
                      : 'text-[#75664B] dark:text-[#B7C1CC] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  <span>Spellbook Vault</span>
                </button>

              </nav>

              <div className="hidden md:block pt-4 border-t border-[#D8C697] dark:border-[#34475A] text-[11px] font-sans text-[#75664B] dark:text-[#B7C1CC]">
                <div className="font-heading font-bold text-[#702C38] dark:text-[#C5A66A]">GM Mercullo CMS:</div>
                <div>Reactive LocalStorage Engine</div>
              </div>

            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F4E9C8]/40 dark:bg-[#111D2B]/40">
              
              {/* TAB: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-fadeIn">
                  
                  <div className="p-6 rounded-2xl bg-[#E8D9AE] dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-heading text-[#702C38] dark:text-[#C5A66A] font-bold uppercase tracking-wider">
                        Room of Requirement Active
                      </span>
                      <h3 className="text-2xl font-heading font-bold text-[#302B22] dark:text-[#F0E8D5]">
                        {data.profile.name}
                      </h3>
                      <p className="text-xs font-sans text-[#75664B] dark:text-[#B7C1CC] mt-1">
                        All portfolio records are online and ready for full CRUD editing.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingProject(null);
                        setProjectModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#702C38] hover:bg-[#8A3645] text-[#F4E9C8] font-heading font-bold text-xs flex items-center gap-1.5 shadow"
                    >
                      <Plus className="w-4 h-4 text-[#B49A62]" /> Add Project
                    </button>
                  </div>

                  {/* Summary Counters */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <div className="p-4 rounded-xl bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] text-center">
                      <div className="text-2xl font-heading font-bold text-[#702C38] dark:text-[#C5A66A]">{data.projects.length}</div>
                      <div className="text-xs text-[#75664B] dark:text-[#B7C1CC]">Projects</div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] text-center">
                      <div className="text-2xl font-heading font-bold text-[#526746] dark:text-[#8CCBFF]">{data.experiences.length}</div>
                      <div className="text-xs text-[#75664B] dark:text-[#B7C1CC]">Experience</div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] text-center">
                      <div className="text-2xl font-heading font-bold text-[#B49A62]">{data.credentials.length}</div>
                      <div className="text-xs text-[#75664B] dark:text-[#B7C1CC]">Credentials</div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] text-center">
                      <div className="text-2xl font-heading font-bold text-[#702C38] dark:text-[#8CCBFF]">{data.skills.length}</div>
                      <div className="text-xs text-[#75664B] dark:text-[#B7C1CC]">Skills</div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] text-center">
                      <div className="text-2xl font-heading font-bold text-[#526746] dark:text-[#C5A66A]">{data.learningEntries.length}</div>
                      <div className="text-xs text-[#75664B] dark:text-[#B7C1CC]">Growth Log</div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] text-center">
                      <div className="text-2xl font-heading font-bold text-red-500">{data.messages.length}</div>
                      <div className="text-xs text-[#75664B] dark:text-[#B7C1CC]">
                        {unreadMessagesCount > 0 ? `${unreadMessagesCount} unread` : 'Inquiries'}
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Cards */}
                  <div className="p-6 rounded-2xl bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] space-y-4">
                    <h4 className="font-heading text-sm font-bold text-[#702C38] dark:text-[#C5A66A] uppercase tracking-wider">
                      Quick Chapter Additions
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      <button
                        onClick={() => {
                          setEditingProject(null);
                          setProjectModalOpen(true);
                        }}
                        className="p-3 rounded-xl bg-[#F4E9C8] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] hover:border-[#702C38] text-left transition-colors"
                      >
                        <div className="font-heading font-bold text-sm text-[#302B22] dark:text-[#F0E8D5]">+ Add Project</div>
                        <div className="text-[11px] text-[#75664B] dark:text-[#B7C1CC]">Chapter 2: The Great Hall</div>
                      </button>

                      <button
                        onClick={() => {
                          setEditingCred(null);
                          setCredModalOpen(true);
                        }}
                        className="p-3 rounded-xl bg-[#F4E9C8] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] hover:border-[#702C38] text-left transition-colors"
                      >
                        <div className="font-heading font-bold text-sm text-[#302B22] dark:text-[#F0E8D5]">+ Add Credential</div>
                        <div className="text-[11px] text-[#75664B] dark:text-[#B7C1CC]">Chapter 5: Credentials</div>
                      </button>

                      <button
                        onClick={() => {
                          setEditingSkill(null);
                          setSkillModalOpen(true);
                        }}
                        className="p-3 rounded-xl bg-[#F4E9C8] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] hover:border-[#702C38] text-left transition-colors"
                      >
                        <div className="font-heading font-bold text-sm text-[#302B22] dark:text-[#F0E8D5]">+ Inscribe Skill</div>
                        <div className="text-[11px] text-[#75664B] dark:text-[#B7C1CC]">Chapter 6: Spellbook</div>
                      </button>

                      <button
                        onClick={() => {
                          setEditingLearning(null);
                          setLearningModalOpen(true);
                        }}
                        className="p-3 rounded-xl bg-[#F4E9C8] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] hover:border-[#702C38] text-left transition-colors"
                      >
                        <div className="font-heading font-bold text-sm text-[#302B22] dark:text-[#F0E8D5]">+ Add Growth Entry</div>
                        <div className="text-[11px] text-[#75664B] dark:text-[#B7C1CC]">Chapter 7: Patronus Forest</div>
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB: PROJECTS CRUD */}
              {activeTab === 'projects' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-[#D8C697] dark:border-[#34475A]">
                    <div>
                      <h3 className="font-heading font-bold text-xl">
                        The Great Hall Projects ({data.projects.length})
                      </h3>
                      <p className="text-xs text-[#75664B] dark:text-[#B7C1CC]">
                        Create, inspect, update, or remove applications.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingProject(null);
                        setProjectModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#702C38] hover:bg-[#8A3645] text-[#F4E9C8] font-heading font-bold text-xs flex items-center gap-1.5 shadow"
                    >
                      <Plus className="w-4 h-4 text-[#B49A62]" /> Add Project
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-4 rounded-xl bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={proj.imageUrl}
                            alt={proj.title}
                            className="w-14 h-14 object-cover rounded-lg border border-[#D8C697] dark:border-[#34475A]"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-heading font-bold text-base">{proj.title}</h4>
                              {proj.isFeatured && (
                                <span className="text-[10px] bg-[#702C38] text-[#F4E9C8] px-2 py-0.2 rounded font-heading font-bold">
                                  Flagship
                                </span>
                              )}
                              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10">
                                {proj.category}
                              </span>
                            </div>
                            <div className="text-xs text-[#75664B] dark:text-[#B7C1CC] line-clamp-1">
                              {proj.subtitle} — {proj.description}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => {
                              setEditingProject(proj);
                              setProjectModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#F4E9C8] dark:bg-[#111D2B] border border-[#B49A62] text-xs font-heading font-bold text-[#702C38] dark:text-[#C5A66A] flex items-center gap-1"
                          >
                            <Edit2 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete project "${proj.title}"?`)) {
                                handleDeleteProject(proj.id);
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#F4E9C8] dark:bg-[#111D2B] border border-red-500/40 text-xs font-heading font-bold text-red-500 flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: EXPERIENCE CRUD */}
              {activeTab === 'experience' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-[#D8C697] dark:border-[#34475A]">
                    <div>
                      <h3 className="font-heading font-bold text-xl">
                        The Path So Far ({data.experiences.length})
                      </h3>
                      <p className="text-xs text-[#75664B] dark:text-[#B7C1CC]">
                        Practical on-the-job training and milestone records.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingExp(null);
                        setExpModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#702C38] hover:bg-[#8A3645] text-[#F4E9C8] font-heading font-bold text-xs flex items-center gap-1.5 shadow"
                    >
                      <Plus className="w-4 h-4 text-[#B49A62]" /> Add Experience
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.experiences.map((exp) => (
                      <div
                        key={exp.id}
                        className="p-4 rounded-xl bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-heading font-bold text-base">{exp.position}</div>
                          <div className="text-xs text-[#702C38] dark:text-[#C5A66A] font-semibold">{exp.organization} • {exp.period}</div>
                          <div className="text-xs text-[#75664B] dark:text-[#B7C1CC] mt-1">{exp.responsibilities.join(' • ')}</div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => {
                              setEditingExp(exp);
                              setExpModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#F4E9C8] dark:bg-[#111D2B] border border-[#B49A62] text-xs font-heading font-bold text-[#702C38] dark:text-[#C5A66A] flex items-center gap-1"
                          >
                            <Edit2 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete "${exp.position}"?`)) {
                                handleDeleteExp(exp.id);
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#F4E9C8] dark:bg-[#111D2B] border border-red-500/40 text-xs font-heading font-bold text-red-500 flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: CREDENTIALS CRUD */}
              {activeTab === 'credentials' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-[#D8C697] dark:border-[#34475A]">
                    <div>
                      <h3 className="font-heading font-bold text-xl">
                        Credentials & Qualifications ({data.credentials.length})
                      </h3>
                      <p className="text-xs text-[#75664B] dark:text-[#B7C1CC]">
                        Certifications with live verification URL links.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingCred(null);
                        setCredModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#702C38] hover:bg-[#8A3645] text-[#F4E9C8] font-heading font-bold text-xs flex items-center gap-1.5 shadow"
                    >
                      <Plus className="w-4 h-4 text-[#B49A62]" /> Add Credential
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.credentials.map((cred) => (
                      <div
                        key={cred.id}
                        className="p-4 rounded-xl bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-heading font-bold text-base">{cred.name}</div>
                          <div className="text-xs text-[#702C38] dark:text-[#C5A66A]">{cred.issuingPlatform} • {cred.completionDate}</div>
                          <a href={cred.verificationUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-400 underline flex items-center gap-1 mt-1">
                            <span>Verification link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => {
                              setEditingCred(cred);
                              setCredModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#F4E9C8] dark:bg-[#111D2B] border border-[#B49A62] text-xs font-heading font-bold text-[#702C38] dark:text-[#C5A66A] flex items-center gap-1"
                          >
                            <Edit2 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove "${cred.name}"?`)) {
                                handleDeleteCred(cred.id);
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#F4E9C8] dark:bg-[#111D2B] border border-red-500/40 text-xs font-heading font-bold text-red-500 flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: SKILLS CRUD */}
              {activeTab === 'skills' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-[#D8C697] dark:border-[#34475A]">
                    <div>
                      <h3 className="font-heading font-bold text-xl">
                        The Spellbook of Skills ({data.skills.length})
                      </h3>
                      <p className="text-xs text-[#75664B] dark:text-[#B7C1CC]">
                        Real capabilities categorized into programming, networking, security, and tools.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingSkill(null);
                        setSkillModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#702C38] hover:bg-[#8A3645] text-[#F4E9C8] font-heading font-bold text-xs flex items-center gap-1.5 shadow"
                    >
                      <Plus className="w-4 h-4 text-[#B49A62]" /> Inscribe Skill
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {data.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="p-3.5 rounded-xl bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-heading font-bold text-sm truncate">{skill.name}</h4>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/10 uppercase">
                              {skill.category}
                            </span>
                          </div>
                          <div className="text-xs text-[#75664B] dark:text-[#B7C1CC] line-clamp-1 mt-0.5">
                            {skill.description}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              setEditingSkill(skill);
                              setSkillModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-[#F4E9C8] dark:bg-[#111D2B] border border-[#B49A62] text-[#702C38] dark:text-[#C5A66A]"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove "${skill.name}"?`)) {
                                handleDeleteSkill(skill.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-[#F4E9C8] dark:bg-[#111D2B] border border-red-500/40 text-red-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: LEARNING CRUD */}
              {activeTab === 'learning' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-[#D8C697] dark:border-[#34475A]">
                    <div>
                      <h3 className="font-heading font-bold text-xl">
                        The Patronus Forest ({data.learningEntries.length})
                      </h3>
                      <p className="text-xs text-[#75664B] dark:text-[#B7C1CC]">
                        Milestones, problems solved, and learning targets.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingLearning(null);
                        setLearningModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#702C38] hover:bg-[#8A3645] text-[#F4E9C8] font-heading font-bold text-xs flex items-center gap-1.5 shadow"
                    >
                      <Plus className="w-4 h-4 text-[#B49A62]" /> Add Entry
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.learningEntries.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#702C38] text-[#F4E9C8]">
                              {item.type}
                            </span>
                            <h4 className="font-heading font-bold text-base">{item.title}</h4>
                          </div>
                          <div className="text-xs text-[#75664B] dark:text-[#B7C1CC] mt-1">{item.description}</div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => {
                              setEditingLearning(item);
                              setLearningModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#F4E9C8] dark:bg-[#111D2B] border border-[#B49A62] text-xs font-heading font-bold text-[#702C38] dark:text-[#C5A66A] flex items-center gap-1"
                          >
                            <Edit2 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove "${item.title}"?`)) {
                                handleDeleteLearning(item.id);
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#F4E9C8] dark:bg-[#111D2B] border border-red-500/40 text-xs font-heading font-bold text-red-500 flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: OWL POST INBOX */}
              {activeTab === 'messages' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-[#D8C697] dark:border-[#34475A]">
                    <div>
                      <h3 className="font-heading font-bold text-xl">
                        Owl Post Received Letters ({data.messages.length})
                      </h3>
                      <p className="text-xs text-[#75664B] dark:text-[#B7C1CC]">
                        Messages dispatched by visitors from Chapter 8 Owl Post.
                      </p>
                    </div>
                  </div>

                  {data.messages.length === 0 ? (
                    <div className="text-center py-12 bg-[#E8D9AE]/40 dark:bg-[#080F19] rounded-2xl border border-[#D8C697] dark:border-[#34475A]">
                      <p className="font-heading text-lg font-bold">No letters received yet.</p>
                      <p className="text-xs text-[#75664B] dark:text-[#B7C1CC] mt-1">Inquiries submitted on the website will appear here.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {data.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-5 rounded-2xl border transition-all ${
                            msg.read
                              ? 'bg-[#E8D9AE]/40 dark:bg-[#080F19] border-[#D8C697] dark:border-[#34475A]'
                              : 'bg-[#F4E9C8] dark:bg-[#111D2B] border-2 border-[#702C38] dark:border-[#C5A66A] shadow'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#D8C697] dark:border-[#34475A]">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-heading font-bold text-base">{msg.senderName}</span>
                                {!msg.read && (
                                  <span className="text-[9px] uppercase font-bold bg-[#702C38] text-[#F4E9C8] px-2 py-0.5 rounded-full">
                                    New Letter
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-[#702C38] dark:text-[#8CCBFF]">{msg.senderEmail}</div>
                            </div>
                            <div className="text-xs text-[#75664B] dark:text-[#B7C1CC]">{msg.timestamp}</div>
                          </div>

                          <div className="py-3">
                            <div className="text-xs font-heading font-bold mb-1">Subject: {msg.subject}</div>
                            <p className="text-xs font-sans whitespace-pre-line leading-relaxed bg-[#E8D9AE]/40 dark:bg-[#080F19] p-3 rounded-xl border border-[#D8C697] dark:border-[#34475A]">
                              {msg.message}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-[#D8C697] dark:border-[#34475A]">
                            <a
                              href={`mailto:${msg.senderEmail}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                              className="px-3 py-1.5 rounded-lg bg-[#702C38] text-[#F4E9C8] text-xs font-heading font-bold flex items-center gap-1"
                            >
                              <Mail className="w-3.5 h-3.5 text-[#B49A62]" /> Reply via Email
                            </a>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleToggleMessageRead(msg.id)}
                                className="px-3 py-1.5 rounded-lg bg-[#E8D9AE] dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] text-xs font-heading font-semibold"
                              >
                                {msg.read ? 'Mark as Unread' : 'Mark as Read'}
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm('Delete this letter?')) {
                                    handleDeleteMessage(msg.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-[#E8D9AE] dark:bg-[#080F19] border border-red-500/40 text-red-500"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: PROFILE */}
              {activeTab === 'profile' && (
                <div className="space-y-6 animate-fadeIn max-w-2xl">
                  <div className="pb-3 border-b border-[#D8C697] dark:border-[#34475A]">
                    <h3 className="font-heading font-bold text-xl">Maker Identity Settings</h3>
                    <p className="text-xs text-[#75664B] dark:text-[#B7C1CC]">
                      Configure developer name, headline, bio, contact links, and Alohomora passcode.
                    </p>
                  </div>

                  {profileSavedToast && (
                    <div className="p-3 bg-emerald-900 text-emerald-100 rounded-xl text-xs font-heading font-bold flex items-center gap-2 animate-bounce">
                      <CheckCircle className="w-4 h-4 text-emerald-300" />
                      <span>Maker identity updated successfully!</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveProfile} className="space-y-4 font-sans text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                        Professional Headline *
                      </label>
                      <input
                        type="text"
                        required
                        value={profileForm.headline}
                        onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                        className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                        Core Introduction Quote *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={profileForm.introduction}
                        onChange={(e) => setProfileForm({ ...profileForm, introduction: e.target.value })}
                        className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38] leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                        Extended Background & Philosophy
                      </label>
                      <textarea
                        rows={3}
                        value={profileForm.extendedBio || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, extendedBio: e.target.value })}
                        className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38] leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                          GitHub Profile URL
                        </label>
                        <input
                          type="url"
                          value={profileForm.github}
                          onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                          className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38] font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                          LinkedIn Profile URL
                        </label>
                        <input
                          type="url"
                          value={profileForm.linkedin}
                          onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                          className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38] font-mono text-xs"
                        />
                      </div>
                    </div>

                    {/* Change Alohomora Passcode */}
                    <div className="p-4 rounded-xl bg-[#E8D9AE] dark:bg-[#080F19] border border-[#B49A62] space-y-2">
                      <div className="text-xs font-heading font-bold text-[#702C38] dark:text-[#C5A66A] uppercase tracking-wider flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-[#B49A62]" /> Change Alohomora Passcode
                      </div>
                      <p className="text-xs text-[#75664B] dark:text-[#B7C1CC]">
                        Leave blank to preserve current passcode (<code className="font-mono font-bold text-[#702C38] dark:text-[#8CCBFF]">{profileForm.adminPasscode}</code>).
                      </p>
                      <input
                        type="text"
                        placeholder="New secret incantation..."
                        value={passcodeChange}
                        onChange={(e) => setPasscodeChange(e.target.value)}
                        className="w-full px-3.5 py-2 bg-[#F4E9C8] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] rounded-xl text-xs font-mono"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-[#702C38] hover:bg-[#8A3645] text-[#F4E9C8] font-heading font-bold text-xs tracking-wider shadow"
                      >
                        Save Maker Identity
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB: VAULT */}
              {activeTab === 'vault' && (
                <div className="space-y-6 animate-fadeIn max-w-2xl">
                  <div className="pb-3 border-b border-[#D8C697] dark:border-[#34475A]">
                    <h3 className="font-heading font-bold text-xl">Spellbook Vault (Backup & Restore)</h3>
                    <p className="text-xs text-[#75664B] dark:text-[#B7C1CC]">
                      Download a JSON file of your entire portfolio or restore previous backups.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-heading font-bold text-sm">Export Spellbook Backup</h4>
                      <p className="text-xs text-[#75664B] dark:text-[#B7C1CC] mt-0.5">Download full snapshot of all chapters as a portable JSON file.</p>
                    </div>
                    <button
                      onClick={handleExportJSON}
                      className="px-4 py-2.5 rounded-xl bg-[#702C38] hover:bg-[#8A3645] text-[#F4E9C8] text-xs font-heading font-bold flex items-center gap-1.5 shadow whitespace-nowrap"
                    >
                      <Download className="w-4 h-4 text-[#B49A62]" /> Export Backup
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-heading font-bold text-sm">Restore from File</h4>
                      <p className="text-xs text-[#75664B] dark:text-[#B7C1CC] mt-0.5">Upload a previously exported JSON backup file.</p>
                    </div>
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept=".json"
                        onChange={handleImportJSON}
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2.5 rounded-xl bg-[#F4E9C8] dark:bg-[#111D2B] border border-[#B49A62] text-xs font-heading font-bold flex items-center gap-1.5 shadow whitespace-nowrap"
                      >
                        <Upload className="w-4 h-4 text-[#702C38] dark:text-[#C5A66A]" /> Import Backup
                      </button>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-red-500/30 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-red-500">Reset to Defaults</h4>
                      <p className="text-xs text-[#75664B] dark:text-[#B7C1CC] mt-0.5">Reverts all projects and skills to the original verified dataset.</p>
                    </div>
                    <button
                      onClick={handleResetDefaults}
                      className="px-4 py-2.5 rounded-xl bg-red-600 text-white text-xs font-heading font-bold flex items-center gap-1.5 shadow whitespace-nowrap"
                    >
                      <RefreshCw className="w-4 h-4" /> Reset Data
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* Child CRUD Modals */}
      <ProjectFormModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        onSave={handleSaveProject}
        initialProject={editingProject}
      />

      <ExperienceFormModal
        isOpen={expModalOpen}
        onClose={() => setExpModalOpen(false)}
        onSave={handleSaveExp}
        initialExperience={editingExp}
      />

      <CredentialFormModal
        isOpen={credModalOpen}
        onClose={() => setCredModalOpen(false)}
        onSave={handleSaveCred}
        initialCredential={editingCred}
      />

      <SkillFormModal
        isOpen={skillModalOpen}
        onClose={() => setSkillModalOpen(false)}
        onSave={handleSaveSkill}
        initialSkill={editingSkill}
      />

      <LearningFormModal
        isOpen={learningModalOpen}
        onClose={() => setLearningModalOpen(false)}
        onSave={handleSaveLearning}
        initialEntry={editingLearning}
      />

    </div>
  );
};
