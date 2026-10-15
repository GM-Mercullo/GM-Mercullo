import React, { useState, useEffect } from 'react';
import { storage } from '../../services/storageService';
import { audioFx } from '../../utils/audioFx';
import {
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Wand2,
  KeyRound,
  Menu,
  X,
  Mail,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  currentTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenAdmin: () => void;
  onReopenInvitation: () => void;
  wandEnabled: boolean;
  onToggleWand: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  onToggleTheme,
  onOpenAdmin,
  onReopenInvitation,
  wandEnabled,
  onToggleWand,
}) => {
  const [soundOn, setSoundOn] = useState(audioFx.isEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkUnread = () => {
      const messages = storage.getMessages();
      setUnreadCount(messages.filter((m) => !m.read).length);
    };

    checkUnread();
    window.addEventListener('portfolio_data_changed', checkUnread);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('portfolio_data_changed', checkUnread);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggleSound = () => {
    const newState = audioFx.toggleSound();
    setSoundOn(newState);
  };

  const navChapters = [
    { name: 'The Great Hall', href: '#projects' },
    { name: 'The Map', href: '#about' },
    { name: 'The Path', href: '#experience' },
    { name: 'Credentials', href: '#credentials' },
    { name: 'Spellbook', href: '#skills' },
    { name: 'Patronus Forest', href: '#learning' },
    { name: 'Owl Post', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F4E9C8]/90 dark:bg-[#080F19]/90 backdrop-blur-md border-b border-[#D8C697] dark:border-[#34475A] shadow-md py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with Wax Seal GM Monogram */}
          <a
            href="#hero"
            onClick={() => audioFx.playPaperRustle()}
            className="group flex items-center gap-3 select-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#702C38] border-2 border-[#B49A62] flex items-center justify-center text-[#F4E9C8] font-heading font-bold text-base shadow-[0_2px_10px_rgba(112,44,56,0.4)] group-hover:scale-105 transition-transform">
              GM
            </div>
            <div>
              <span className="font-heading font-bold text-lg text-[#302B22] dark:text-[#F0E8D5] tracking-wide block leading-tight">
                GM Mercullo
              </span>
              <span className="text-[11px] font-sans text-[#75664B] dark:text-[#B7C1CC]">
                Developer • Network • Security
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navChapters.map((ch) => (
              <a
                key={ch.name}
                href={ch.href}
                onClick={() => audioFx.playPaperRustle()}
                className="px-2.5 py-1.5 rounded-lg text-xs font-sans font-medium text-[#75664B] dark:text-[#B7C1CC] hover:text-[#702C38] dark:hover:text-[#8CCBFF] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                {ch.name}
              </a>
            ))}
          </nav>

          {/* Magical Utilities & Admin Door */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Replay Invitation */}
            <button
              onClick={onReopenInvitation}
              title="View Chapter 1: The Invitation"
              className="px-2.5 py-1.5 rounded-lg bg-[#E8D9AE]/60 dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-xs font-heading font-semibold text-[#302B22] dark:text-[#F0E8D5] hover:border-[#B49A62] flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#702C38] dark:text-[#C5A66A]" />
              <span>Invitation</span>
            </button>

            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={onToggleTheme}
              title={currentTheme === 'dark' ? "Switch to Light Theme (The Enchanted Library)" : "Switch to Dark Theme (The Midnight Library)"}
              className="p-2 rounded-lg bg-[#E8D9AE]/60 dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-[#75664B] dark:text-[#B7C1CC] hover:text-[#302B22] dark:hover:text-white transition-colors"
            >
              {currentTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-[#702C38]" />
              )}
            </button>

            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              title={soundOn ? "Mute Arcane Audio" : "Unmute Arcane Audio"}
              className="p-2 rounded-lg bg-[#E8D9AE]/60 dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-[#75664B] dark:text-[#B7C1CC] hover:text-[#302B22] dark:hover:text-white transition-colors"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-[#B49A62]" /> : <VolumeX className="w-4 h-4 text-red-400" />}
            </button>

            {/* Wand Sparks Toggle */}
            <button
              onClick={onToggleWand}
              title={wandEnabled ? "Deactivate Wand Sparks" : "Activate Wand Sparks"}
              className={`p-2 rounded-lg border transition-colors ${
                wandEnabled
                  ? 'bg-[#702C38]/10 dark:bg-[#111D2B] border-[#B49A62] text-[#B49A62]'
                  : 'bg-[#E8D9AE]/60 dark:bg-[#111D2B] border-[#D8C697] dark:border-[#34475A] text-[#75664B] dark:text-[#B7C1CC]'
              }`}
            >
              <Wand2 className="w-4 h-4" />
            </button>

            {/* Secret Alohomora Admin Door */}
            <button
              onClick={onOpenAdmin}
              title="Alohomora CMS: Manage Projects, Credentials, Skills & Owls"
              className="relative px-3.5 py-1.5 rounded-lg bg-[#702C38] hover:bg-[#8A3645] border border-[#B49A62] text-[#F4E9C8] text-xs font-heading font-bold tracking-wide flex items-center gap-1.5 shadow-[0_2px_10px_rgba(112,44,56,0.3)] transition-all transform hover:-translate-y-0.5"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#B49A62]" />
              <span>Admin Room</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white font-sans text-[10px] font-bold flex items-center justify-center animate-bounce shadow">
                  {unreadCount}
                </span>
              )}
            </button>

          </div>

          {/* Mobile Actions */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg bg-[#702C38] border border-[#B49A62] text-[#F4E9C8] relative"
              title="Admin Chamber"
            >
              <KeyRound className="w-4 h-4 text-[#B49A62]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-[#302B22] dark:text-[#F0E8D5]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#F4E9C8]/98 dark:bg-[#080F19]/98 border-b border-[#D8C697] dark:border-[#34475A] px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {navChapters.map((ch) => (
              <a
                key={ch.name}
                href={ch.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  audioFx.playPaperRustle();
                }}
                className="px-3 py-2 rounded-lg text-sm font-sans text-[#302B22] dark:text-[#F0E8D5] hover:bg-black/5 dark:hover:bg-white/5"
              >
                {ch.name}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#D8C697] dark:border-[#34475A] flex items-center justify-between">
            <button
              onClick={onReopenInvitation}
              className="px-3 py-1.5 text-xs font-heading rounded-lg bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-[#302B22] dark:text-[#F0E8D5] flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#702C38] dark:text-[#C5A66A]" />
              Invitation
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onToggleTheme}
                className="p-2 rounded-lg bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A]"
              >
                {currentTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#702C38]" />}
              </button>
              <button
                onClick={handleToggleSound}
                className="p-2 rounded-lg bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A]"
              >
                {soundOn ? <Volume2 className="w-4 h-4 text-[#B49A62]" /> : <VolumeX className="w-4 h-4 text-red-400" />}
              </button>
              <button
                onClick={onToggleWand}
                className="p-2 rounded-lg bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A]"
              >
                <Wand2 className="w-4 h-4 text-[#B49A62]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
