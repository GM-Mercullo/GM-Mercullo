import React, { useState } from 'react';
import { audioFx } from '../../utils/audioFx';
import { Sparkles, MailOpen, ArrowRight, BookOpen } from 'lucide-react';

interface InvitationScreenProps {
  onOpenPortfolio: () => void;
  onSkip: () => void;
}

export const InvitationScreen: React.FC<InvitationScreenProps> = ({
  onOpenPortfolio,
  onSkip,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [letterRevealed, setLetterRevealed] = useState(false);

  const handleOpenLetter = () => {
    audioFx.playPaperRustle();
    setIsOpening(true);

    setTimeout(() => {
      audioFx.playAlohomora();
      setLetterRevealed(true);
    }, 600);
  };

  const handleEnterMain = () => {
    audioFx.playLumos();
    onOpenPortfolio();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080F19]/95 backdrop-blur-md overflow-hidden animate-fadeIn">
      
      {/* Ambient Candlelight Warmth in the background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-amber-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] rounded-full bg-[#702C38]/20 blur-[100px] pointer-events-none" />

      {/* Floating subtle embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 rounded-full bg-amber-300 animate-flicker" />
        <div className="absolute top-1/3 right-1/5 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-amber-200 animate-flicker" />
      </div>

      <div className="relative max-w-xl w-full text-center">
        
        {/* Cinematic Headline */}
        <div className="mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111D2B] border border-[#34475A] text-[#C5A66A] text-xs font-heading tracking-widest uppercase shadow">
            <Sparkles className="w-3.5 h-3.5 text-[#B49A62]" /> Chapter 1 — The Invitation
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-semibold text-[#F0E8D5] tracking-tight">
            Every story begins with an invitation.
          </h1>
          <p className="text-sm font-sans text-[#B7C1CC] max-w-md mx-auto">
            You have arrived at the digital threshold of GM Mercullo’s developer journey.
          </p>
        </div>

        {/* The Envelope */}
        <div className="relative mx-auto w-full max-w-md">
          
          {!letterRevealed ? (
            /* Closed Envelope Card */
            <div 
              onClick={handleOpenLetter}
              className={`cursor-pointer group relative bg-[#E8D9AE] dark:bg-[#111D2B] border-2 border-[#B49A62] rounded-2xl p-8 sm:p-10 shadow-[0_12px_45px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_55px_rgba(180,154,98,0.3)] transition-all duration-500 transform hover:-translate-y-1 ${
                isOpening ? 'scale-95 opacity-80' : ''
              }`}
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(244, 233, 200, 0.4), transparent)'
              }}
            >
              {/* Envelope Flap Lines */}
              <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-[#D8C697]/60 dark:border-[#34475A]/60 pointer-events-none" />

              {/* Burgundy Wax Seal with GM Monogram */}
              <div className="relative z-10 flex flex-col items-center justify-center py-6">
                <div 
                  className="w-20 h-20 rounded-full bg-[#702C38] border-2 border-[#B49A62] shadow-[0_4px_20px_rgba(112,44,56,0.6)] flex items-center justify-center transform group-hover:scale-105 transition-transform"
                  title="Burgundy Wax Seal with GM Monogram"
                >
                  <div className="w-16 h-16 rounded-full border border-[#B49A62]/40 flex items-center justify-center text-[#F4E9C8] font-heading font-bold text-2xl tracking-wider select-none">
                    GM
                  </div>
                </div>

                <div className="mt-5 space-y-1">
                  <div className="font-heading font-bold text-lg text-[#302B22] dark:text-[#F0E8D5] tracking-wide">
                    To the Esteemed Visitor
                  </div>
                  <div className="text-xs font-decorative italic text-[#75664B] dark:text-[#B7C1CC]">
                    Software Engineering • Networking • Cybersecurity
                  </div>
                </div>
              </div>

              {/* Action Buttons inside closed envelope card */}
              <div className="mt-6 pt-4 border-t border-[#D8C697] dark:border-[#34475A] flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenLetter();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#702C38] hover:bg-[#8A3645] text-[#F4E9C8] font-heading font-bold text-sm tracking-wider shadow flex items-center justify-center gap-2 transition-all transform hover:scale-102"
                >
                  <MailOpen className="w-4 h-4" />
                  <span>Open Letter</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSkip();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-transparent hover:bg-black/10 dark:hover:bg-white/5 text-[#75664B] dark:text-[#B7C1CC] hover:text-[#302B22] dark:hover:text-white font-sans text-xs transition-colors"
                >
                  Skip Introduction
                </button>
              </div>

            </div>
          ) : (
            /* Unfolded Parchment Letter */
            <div 
              className="relative bg-[#F4E9C8] border-2 border-[#B49A62] rounded-2xl p-6 sm:p-8 text-left shadow-[0_16px_50px_rgba(0,0,0,0.7)] text-[#302B22] animate-seal-pop font-sans"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(232, 217, 174, 0.4), transparent)'
              }}
            >
              {/* Top Seal Stamp */}
              <div className="flex items-center justify-between pb-4 border-b border-[#D8C697] mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#702C38] border border-[#B49A62] text-[#F4E9C8] font-heading font-bold text-sm flex items-center justify-center">
                    GM
                  </div>
                  <div>
                    <div className="font-heading font-bold text-base text-[#702C38]">
                      GM Mercullo
                    </div>
                    <div className="text-[11px] text-[#75664B] uppercase tracking-wider">
                      Official Portfolio Invitation
                    </div>
                  </div>
                </div>

                <span className="text-xs font-decorative italic text-[#75664B]">
                  Anno Domini 2026
                </span>
              </div>

              {/* Letter Text */}
              <div className="space-y-3 text-sm leading-relaxed text-[#302B22]">
                <p className="font-heading text-lg font-semibold text-[#702C38]">
                  Greetings, and welcome to my portfolio.
                </p>
                <p>
                  I am a programmer in progress who believes the best way to learn is by building. I invite you to explore the projects, network engineering simulations, and cybersecurity fundamentals I have constructed.
                </p>
                <p className="text-xs italic text-[#75664B]">
                  "The magic establishes identity. Your work demonstrates your abilities."
                </p>
              </div>

              {/* Entry Button */}
              <div className="mt-6 pt-4 border-t border-[#D8C697] flex items-center justify-between">
                <span className="text-xs font-decorative italic text-[#75664B]">
                  Turn the page to Chapter 2: The Great Hall
                </span>

                <button
                  type="button"
                  onClick={handleEnterMain}
                  className="px-5 py-2.5 rounded-xl bg-[#702C38] hover:bg-[#8A3645] text-[#F4E9C8] font-heading font-bold text-sm shadow flex items-center gap-2 transition-all transform hover:scale-105"
                >
                  <span>Enter Portfolio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
