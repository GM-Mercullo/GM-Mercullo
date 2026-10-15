import React from 'react';
import { Profile } from '../../types';
import { Compass, FileText, ExternalLink, Sparkles, MapPin, Target, Cpu } from 'lucide-react';

interface AboutSectionProps {
  profile: Profile;
  onOpenResumeModal: () => void;
  isAdmin: boolean;
  onEditProfile: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  profile,
  onOpenResumeModal,
  isAdmin,
  onEditProfile,
}) => {
  return (
    <section id="about" className="py-24 relative z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-xs font-heading font-semibold text-[#702C38] dark:text-[#C5A66A] uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" /> Chapter 3 — The Map Behind the Maker
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#302B22] dark:text-[#F0E8D5]">
            Who I Am & How I Learn
          </h2>
          <p className="text-sm font-sans text-[#75664B] dark:text-[#B7C1CC] mt-2 max-w-lg mx-auto">
            A developer in progress focused on building practical, reliable systems across software development, network protocols, and security.
          </p>
        </div>

        {/* Cartographic Parchment Container */}
        <div 
          className="relative bg-[#F4E9C8] dark:bg-[#111D2B] border-2 border-[#B49A62] rounded-3xl p-6 sm:p-10 shadow-md overflow-hidden"
          style={{
            backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(232, 217, 174, 0.4), transparent)'
          }}
        >
          {/* Subtle Cartographic Runic Details */}
          <div className="absolute top-4 left-4 text-xs font-heading text-[#B49A62]/40 select-none hidden sm:block">
            LAT 14°35'N • LON 120°58'E — MERIDIAN LABS
          </div>
          <div className="absolute top-4 right-4 text-xs font-heading text-[#B49A62]/40 select-none hidden sm:block">
            CARTOGRAPHY OF SYSTEMS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Framed GM Monogram Column */}
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <div className="relative group">
                {/* Framed Wax Monogram Portrait */}
                <div className="w-48 h-48 rounded-2xl bg-[#E8D9AE] dark:bg-[#080F19] border-2 border-[#B49A62] p-3 shadow-inner flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-102 transition-transform">
                  
                  {/* Inner Cartographic Ring */}
                  <div className="w-36 h-36 rounded-full border border-dashed border-[#B49A62] flex items-center justify-center relative">
                    <div className="w-24 h-24 rounded-full bg-[#702C38] border-2 border-[#B49A62] shadow-[0_4px_15px_rgba(112,44,56,0.5)] flex items-center justify-center">
                      <span className="font-heading font-bold text-3xl text-[#F4E9C8] tracking-widest">
                        GM
                      </span>
                    </div>
                  </div>

                  <span className="mt-2 text-[10px] font-heading font-bold uppercase tracking-widest text-[#702C38] dark:text-[#C5A66A]">
                    MERCULLO
                  </span>
                </div>

                {/* Subtle compass rose pin */}
                <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#B49A62] flex items-center justify-center text-[#702C38] dark:text-[#C5A66A] shadow">
                  <Compass className="w-5 h-5 animate-spin-slow" />
                </div>
              </div>

              <div className="mt-5 text-center">
                <div className="font-heading font-bold text-lg text-[#302B22] dark:text-[#F0E8D5]">
                  {profile.name}
                </div>
                <div className="text-xs font-sans text-[#75664B] dark:text-[#B7C1CC]">
                  Software • Network • Security
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="md:col-span-7 space-y-4 text-left">
              <div>
                <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#702C38] dark:text-[#C5A66A]">
                  Professional Direction
                </span>
                <h3 className="text-2xl font-heading font-bold text-[#302B22] dark:text-[#F0E8D5] mt-1">
                  {profile.headline}
                </h3>
              </div>

              {/* Core Philosophy Quote */}
              <div className="p-4 rounded-xl bg-[#E8D9AE]/60 dark:bg-[#080F19]/80 border-l-4 border-[#702C38] dark:border-[#C5A66A] text-sm font-sans text-[#302B22] dark:text-[#F0E8D5] leading-relaxed">
                "{profile.introduction}"
              </div>

              {/* Extended Bio */}
              <p className="text-sm font-sans text-[#75664B] dark:text-[#B7C1CC] leading-relaxed">
                {profile.extendedBio || "My technical path connects software development, computer networking, and cybersecurity analysis. Rather than remaining in theory, I learn by building practical projects."}
              </p>

              {/* Principles Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-sans text-[#302B22] dark:text-[#F0E8D5]">
                  <Target className="w-4 h-4 text-[#526746] dark:text-[#8CCBFF]" />
                  <span>Build to Understand Systems</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-[#302B22] dark:text-[#F0E8D5]">
                  <Cpu className="w-4 h-4 text-[#702C38] dark:text-[#C5A66A]" />
                  <span>Verified Implementations</span>
                </div>
              </div>

              {/* Actions & Conventional Résumé Link */}
              <div className="pt-4 border-t border-[#D8C697] dark:border-[#34475A] flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenResumeModal}
                  className="px-5 py-2.5 rounded-xl bg-[#702C38] hover:bg-[#8A3645] text-[#F4E9C8] font-heading font-bold text-xs tracking-wider shadow flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#B49A62]" />
                  <span>Open Professional Résumé</span>
                </button>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#E8D9AE] dark:bg-[#080F19] border border-[#B49A62] text-[#302B22] dark:text-[#F0E8D5] hover:border-[#702C38] text-xs font-heading font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore GitHub Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {isAdmin && (
                  <button
                    onClick={onEditProfile}
                    className="px-3 py-2.5 rounded-xl bg-transparent border border-dashed border-[#B49A62] text-xs font-sans text-[#75664B] dark:text-[#B7C1CC] hover:text-[#302B22] dark:hover:text-white"
                  >
                    Edit Bio
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
