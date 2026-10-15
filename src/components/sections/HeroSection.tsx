import React from 'react';
import { Profile } from '../../types';
import { audioFx } from '../../utils/audioFx';
import { Sparkles, ArrowDown, FileText, Code2, Shield, Network, Mail } from 'lucide-react';

interface HeroSectionProps {
  profile: Profile;
  onOpenResumeModal: () => void;
  onOpenAdmin: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onOpenResumeModal,
  onOpenAdmin,
}) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      
      {/* Soft Background Ambiance */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/10 dark:bg-amber-400/5 blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
        
        {/* Wax Seal Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#E8D9AE]/80 dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] shadow-sm mb-6">
          <div className="w-5 h-5 rounded-full bg-[#702C38] border border-[#B49A62] text-[#F4E9C8] font-heading font-bold text-[10px] flex items-center justify-center">
            GM
          </div>
          <span className="font-heading font-bold text-xs uppercase tracking-widest text-[#702C38] dark:text-[#C5A66A]">
            Enchanted Developer Portfolio
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#B49A62] animate-pulse" />
        </div>

        {/* Main Title & Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold text-[#302B22] dark:text-[#F0E8D5] tracking-tight leading-none mb-4">
          GM Mercullo
        </h1>

        <p className="text-lg sm:text-xl font-heading text-[#702C38] dark:text-[#8CCBFF] max-w-2xl mx-auto mb-6 font-medium">
          {profile.headline}
        </p>

        {/* Introduction */}
        <p className="text-base sm:text-lg font-sans text-[#75664B] dark:text-[#B7C1CC] max-w-2xl mx-auto leading-relaxed mb-8">
          "{profile.introduction}"
        </p>

        {/* Quick Discipline Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-10 text-left">
          <div className="p-3.5 rounded-xl bg-[#F4E9C8]/80 dark:bg-[#111D2B]/80 border border-[#D8C697] dark:border-[#34475A] flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#702C38]/10 text-[#702C38] dark:text-[#C5A66A]">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-heading font-bold text-sm text-[#302B22] dark:text-[#F0E8D5]">Software Engineering</div>
              <div className="text-xs text-[#75664B] dark:text-[#B7C1CC]">Python, React, JavaScript, C/C++</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F4E9C8]/80 dark:bg-[#111D2B]/80 border border-[#D8C697] dark:border-[#34475A] flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#526746]/10 text-[#526746] dark:text-[#8CCBFF]">
              <Network className="w-4 h-4" />
            </div>
            <div>
              <div className="font-heading font-bold text-sm text-[#302B22] dark:text-[#F0E8D5]">Network Engineering</div>
              <div className="text-xs text-[#75664B] dark:text-[#B7C1CC]">Subnetting, OSI 7-Layer, Wireshark</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F4E9C8]/80 dark:bg-[#111D2B]/80 border border-[#D8C697] dark:border-[#34475A] flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#B49A62]/10 text-[#B49A62] dark:text-[#C5A66A]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="font-heading font-bold text-sm text-[#302B22] dark:text-[#F0E8D5]">Cybersecurity</div>
              <div className="text-xs text-[#75664B] dark:text-[#B7C1CC]">Network Defense, Vulnerability Audit</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            onClick={() => audioFx.playPaperRustle()}
            className="px-6 py-3 rounded-xl bg-[#702C38] hover:bg-[#8A3645] text-[#F4E9C8] font-heading font-bold text-sm tracking-wider shadow flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-[#B49A62]" />
            <span>Enter The Great Hall</span>
          </a>

          <button
            onClick={onOpenResumeModal}
            className="px-5 py-3 rounded-xl bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-[#302B22] dark:text-[#F0E8D5] hover:border-[#B49A62] font-heading font-semibold text-sm flex items-center gap-2 transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4 text-[#702C38] dark:text-[#C5A66A]" />
            <span>Inspect Résumé</span>
          </button>

          <a
            href="#contact"
            onClick={() => audioFx.playPaperRustle()}
            className="px-5 py-3 rounded-xl bg-transparent border border-[#B49A62]/60 hover:border-[#B49A62] text-[#702C38] dark:text-[#C5A66A] font-heading font-semibold text-sm flex items-center gap-2 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Send Owl Post</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <a
            href="#projects"
            className="text-xs font-decorative italic text-[#75664B] dark:text-[#B7C1CC] hover:text-[#702C38] dark:hover:text-[#8CCBFF] flex flex-col items-center gap-1 transition-colors"
          >
            <span>Proceed to Chapter 2</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>

      </div>
    </section>
  );
};
