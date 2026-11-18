import React, { useState, useEffect, useCallback } from 'react';
import {
  PortfolioData,
  Project,
  Experience,
  Credential,
  SkillItem,
  LearningEntry,
} from './types';
import { storage } from './services/storageService';
import { supabase } from './lib/supabase';

// Magical Atmosphere Components
import { WandCursor } from './components/magic/WandCursor';

// Invitation & Common
import { HogwartsAcceptanceLetter } from './components/invitation/HogwartsAcceptanceLetter';
import { GreatHallTransition } from './components/invitation/GreatHallTransition';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ResumeModal } from './components/common/ResumeModal';

// Portfolio Chapters
import { HeroSection } from './components/sections/HeroSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { CredentialsSection } from './components/sections/CredentialsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { LearningSection } from './components/sections/LearningSection';
import { OwlPostSection } from './components/sections/OwlPostSection';

// Admin CMS & Quick Modals
import { AdminPortal } from './components/admin/AdminPortal';
import { ProjectFormModal } from './components/admin/ProjectFormModal';
import { ExperienceFormModal } from './components/admin/ExperienceFormModal';
import { CredentialFormModal } from './components/admin/CredentialFormModal';
import { SkillFormModal } from './components/admin/SkillFormModal';
import { LearningFormModal } from './components/admin/LearningFormModal';
import { getChapterPath, type ChapterPath } from './routes';

const hasEnteredOwlPost = () =>
  sessionStorage.getItem('owl_post_entered') === 'true' ||
  sessionStorage.getItem('gm_invitation_seen') === 'true';

export const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(storage.getData());
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(
    storage.getThemePreference(),
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(storage.isAdminLoggedIn());
  const [wandEnabled, setWandEnabled] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<ChapterPath>(() =>
    getChapterPath(window.location.pathname),
  );

  // Invitation screen state
  const [showInvitation, setShowInvitation] = useState<boolean>(() => {
    return !hasEnteredOwlPost();
  });
  const [playIntroVideo, setPlayIntroVideo] = useState<boolean>(
    () => !hasEnteredOwlPost(),
  );
  const [showGreatHallTransition, setShowGreatHallTransition] = useState(false);

  // Modal triggers
  const [adminOpen, setAdminOpen] = useState<boolean>(false);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);

  // Quick inline CRUD modals
  const [quickProjectModal, setQuickProjectModal] = useState<{
    open: boolean;
    project?: Project | null;
  }>({ open: false });
  const [quickExpModal, setQuickExpModal] = useState<{
    open: boolean;
    exp?: Experience | null;
  }>({ open: false });
  const [quickCredModal, setQuickCredModal] = useState<{
    open: boolean;
    cred?: Credential | null;
  }>({ open: false });
  const [quickSkillModal, setQuickSkillModal] = useState<{
    open: boolean;
    skill?: SkillItem | null;
  }>({ open: false });
  const [quickLearningModal, setQuickLearningModal] = useState<{
    open: boolean;
    entry?: LearningEntry | null;
  }>({ open: false });

  // Sync theme to HTML root on mount & updates
  useEffect(() => {
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentTheme]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getChapterPath(window.location.pathname));
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    void storage.hydrateFromSupabase();
    if (supabase) {
      void supabase.auth.getSession().then(({ data: { session } }) => {
        setIsAdmin(Boolean(session));
      });
    }
  }, []);

  useEffect(() => {
    const handleDataChange = () => {
      setData({ ...storage.getData() });
    };

    const handleAuthChange = (e: CustomEvent<boolean>) => {
      setIsAdmin(e.detail);
    };

    const handleThemeChange = (e: CustomEvent<'light' | 'dark'>) => {
      setCurrentTheme(e.detail);
    };

    window.addEventListener(
      'portfolio_data_changed',
      handleDataChange as EventListener,
    );
    window.addEventListener(
      'portfolio_auth_changed',
      handleAuthChange as EventListener,
    );
    window.addEventListener(
      'portfolio_theme_changed',
      handleThemeChange as EventListener,
    );

    const authSubscription = supabase?.auth.onAuthStateChange(
      (_event, session) => {
        setIsAdmin(Boolean(session));
      },
    );

    return () => {
      window.removeEventListener(
        'portfolio_data_changed',
        handleDataChange as EventListener,
      );
      window.removeEventListener(
        'portfolio_auth_changed',
        handleAuthChange as EventListener,
      );
      window.removeEventListener(
        'portfolio_theme_changed',
        handleThemeChange as EventListener,
      );
      authSubscription?.data.subscription.unsubscribe();
    };
  }, []);

  const handleToggleTheme = () => {
    const next = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(next);
    storage.setThemePreference(next);
  };

  const handleNavigate = useCallback((path: ChapterPath) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    setCurrentPage(path);
    window.scrollTo(0, 0);
  }, []);

  const handleDismissInvitation = useCallback(() => {
    setShowInvitation(false);
    setPlayIntroVideo(false);
    sessionStorage.setItem('owl_post_entered', 'true');
    sessionStorage.setItem('gm_invitation_seen', 'true');
  }, []);

  const handleBeginGreatHallTransition = useCallback(() => {
    setShowGreatHallTransition(true);
  }, []);

  const handleInvitationDissolveComplete = useCallback(() => {
    setShowInvitation(false);
  }, []);

  const handleGreatHallTransitionComplete = useCallback(() => {
    setShowInvitation(false);
    setShowGreatHallTransition(false);
    setPlayIntroVideo(false);
    sessionStorage.setItem('owl_post_entered', 'true');
    sessionStorage.setItem('gm_invitation_seen', 'true');
  }, []);

  const handleReopenInvitation = useCallback(() => {
    setPlayIntroVideo(true);
    setShowInvitation(true);
  }, []);

  return (
    <div className="site-theme-background min-h-screen bg-[#F4E9C8] dark:bg-[#080F19] text-[#302B22] dark:text-[#F0E8D5] font-sans antialiased selection:bg-amber-800/30 selection:text-amber-950 dark:selection:bg-amber-400/30 dark:selection:text-amber-200 transition-colors duration-500 overflow-x-hidden">
      {/* Hogwarts Acceptance Letter */}
      {showInvitation && (
        <HogwartsAcceptanceLetter
          onOpenPortfolio={handleBeginGreatHallTransition}
          onSkip={handleDismissInvitation}
          playIntroVideo={playIntroVideo}
        />
      )}

      {/* Interactive Wand Spark Cursor */}
      <WandCursor house="gryffindor" enabled={wandEnabled} />

      {/* Top Header Navigation */}
      <Navbar
        currentTheme={currentTheme}
        onNavigate={handleNavigate}
        onToggleTheme={handleToggleTheme}
        onReopenInvitation={handleReopenInvitation}
        wandEnabled={wandEnabled}
        onToggleWand={() => setWandEnabled(!wandEnabled)}
      />

      {currentPage === '/' && (
        <HeroSection
          profile={data.profile}
          onOpenResumeModal={() => setResumeOpen(true)}
          onOpenAdmin={() => setAdminOpen(true)}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === '/great-hall' && (
        <ProjectsSection
          projects={data.projects}
          isAdmin={isAdmin}
          onOpenCreateModal={() =>
            setQuickProjectModal({ open: true, project: null })
          }
          onEditProject={(project) =>
            setQuickProjectModal({ open: true, project })
          }
          onDeleteProject={(id) => storage.deleteProject(id)}
        />
      )}

      {currentPage === '/map' && (
        <AboutSection
          profile={data.profile}
          onOpenResumeModal={() => setResumeOpen(true)}
          isAdmin={isAdmin}
          onEditProfile={() => setAdminOpen(true)}
        />
      )}

      {currentPage === '/path' && (
        <ExperienceSection
          experiences={data.experiences}
          isAdmin={isAdmin}
          onOpenCreateModal={() => setQuickExpModal({ open: true, exp: null })}
          onEditExperience={(exp) => setQuickExpModal({ open: true, exp })}
          onDeleteExperience={(id) => storage.deleteExperience(id)}
        />
      )}

      {currentPage === '/credentials' && (
        <CredentialsSection
          credentials={data.credentials}
          isAdmin={isAdmin}
          onOpenCreateModal={() =>
            setQuickCredModal({ open: true, cred: null })
          }
          onEditCredential={(cred) => setQuickCredModal({ open: true, cred })}
          onDeleteCredential={(id) => storage.deleteCredential(id)}
        />
      )}

      {currentPage === '/spellbook' && (
        <SkillsSection
          skills={data.skills}
          isAdmin={isAdmin}
          onOpenCreateModal={() =>
            setQuickSkillModal({ open: true, skill: null })
          }
          onEditSkill={(skill) => setQuickSkillModal({ open: true, skill })}
          onDeleteSkill={(id) => storage.deleteSkill(id)}
        />
      )}

      {currentPage === '/patronus-forest' && (
        <LearningSection
          learningEntries={data.learningEntries}
          isAdmin={isAdmin}
          onOpenCreateModal={() =>
            setQuickLearningModal({ open: true, entry: null })
          }
          onEditEntry={(entry) => setQuickLearningModal({ open: true, entry })}
          onDeleteEntry={(id) => storage.deleteLearningEntry(id)}
        />
      )}

      {currentPage === '/owl-post' && <OwlPostSection />}

      {/* Footer */}
      <Footer
        profile={data.profile}
        onOpenAdmin={() => setAdminOpen(true)}
        onReopenInvitation={handleReopenInvitation}
      />

      {/* Professional Résumé Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        profile={data.profile}
        experiences={data.experiences}
        credentials={data.credentials}
        projects={data.projects}
        skills={data.skills}
      />

      {/* The Room of Requirement Admin Chamber (Full CRUD CMS) */}
      <AdminPortal isOpen={adminOpen} onClose={() => setAdminOpen(false)} />

      {/* Inline Quick CRUD Modals */}
      <ProjectFormModal
        isOpen={quickProjectModal.open}
        onClose={() => setQuickProjectModal({ open: false })}
        onSave={(project) => storage.saveProject(project)}
        initialProject={quickProjectModal.project}
      />

      <ExperienceFormModal
        isOpen={quickExpModal.open}
        onClose={() => setQuickExpModal({ open: false })}
        onSave={(exp) => storage.saveExperience(exp)}
        initialExperience={quickExpModal.exp}
      />

      <CredentialFormModal
        isOpen={quickCredModal.open}
        onClose={() => setQuickCredModal({ open: false })}
        onSave={(cred) => storage.saveCredential(cred)}
        initialCredential={quickCredModal.cred}
      />

      <SkillFormModal
        isOpen={quickSkillModal.open}
        onClose={() => setQuickSkillModal({ open: false })}
        onSave={(skill) => storage.saveSkill(skill)}
        initialSkill={quickSkillModal.skill}
      />

      <LearningFormModal
        isOpen={quickLearningModal.open}
        onClose={() => setQuickLearningModal({ open: false })}
        onSave={(entry) => storage.saveLearningEntry(entry)}
        initialEntry={quickLearningModal.entry}
      />

      {showGreatHallTransition && (
        <GreatHallTransition
          onDissolveComplete={handleInvitationDissolveComplete}
          onComplete={handleGreatHallTransitionComplete}
        />
      )}
    </div>
  );
};

export default App;
