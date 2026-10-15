import React from 'react';
import { Profile } from '../../types';
import { audioFx } from '../../utils/audioFx';
import { KeyRound, Mail, Code2, Globe, ExternalLink } from 'lucide-react';

interface FooterProps {
  profile: Profile;
  onOpenAdmin: () => void;
  onReopenInvitation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  profile,
  onOpenAdmin,
  onReopenInvitation,
}) => {
  return (
    <footer className="relative border-t border-[#D8C697] dark:border-[#34475A] bg-[#E8D9AE]/80 dark:bg-[#080F19] pt-14 pb-12 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#D8C697] dark:border-[#34475A]">
          
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#702C38] border border-[#B49A62] text-[#F4E9C8] font-heading font-bold text-sm flex items-center justify-center">
                GM
              </div>
              <span className="font-heading font-bold text-xl text-[#302B22] dark:text-[#F0E8D5] tracking-wide">
                GM Mercullo
              </span>
            </div>
            <p className="text-xs font-decorative italic text-[#75664B] dark:text-[#B7C1CC] mt-1 max-w-sm">
              "The magic establishes your identity. Your work demonstrates your abilities."
            </p>
          </div>

          {/* Social & Contact Direct Links */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="px-3 py-1.5 rounded-lg bg-[#F4E9C8] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] hover:border-[#702C38] dark:hover:border-[#C5A66A] text-xs font-sans text-[#302B22] dark:text-[#F0E8D5] flex items-center gap-1.5 transition-colors shadow-sm"
              title="Send Direct Email"
            >
              <Mail className="w-3.5 h-3.5 text-[#702C38] dark:text-[#C5A66A]" />
              <span>Email</span>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#F4E9C8] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] hover:border-[#702C38] dark:hover:border-[#C5A66A] text-xs font-sans text-[#302B22] dark:text-[#F0E8D5] flex items-center gap-1.5 transition-colors shadow-sm"
              title="GitHub Repositories"
            >
              <Code2 className="w-3.5 h-3.5 text-[#702C38] dark:text-[#C5A66A]" />
              <span>GitHub</span>
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#F4E9C8] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] hover:border-[#702C38] dark:hover:border-[#C5A66A] text-xs font-sans text-[#302B22] dark:text-[#F0E8D5] flex items-center gap-1.5 transition-colors shadow-sm"
              title="LinkedIn Network"
            >
              <Globe className="w-3.5 h-3.5 text-[#702C38] dark:text-[#C5A66A]" />
              <span>LinkedIn</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar with Secret Alohomora Door */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-[#75664B] dark:text-[#B7C1CC] gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} GM Mercullo —</span>
            <button
              onClick={onReopenInvitation}
              className="hover:text-[#702C38] dark:hover:text-[#C5A66A] underline font-heading"
            >
              The Invitation
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                audioFx.playAlohomora();
                onOpenAdmin();
              }}
              className="hover:text-[#702C38] dark:hover:text-[#C5A66A] flex items-center gap-1.5 font-heading text-xs font-bold transition-colors"
              title="Open Admin CMS"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#B49A62]" />
              <span>Alohomora CMS</span>
            </button>
            <span>•</span>
            <span className="font-decorative italic">
              Every story begins with an invitation.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
