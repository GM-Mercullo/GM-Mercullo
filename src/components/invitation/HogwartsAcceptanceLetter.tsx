import React, { useState } from 'react';
import { audioFx } from '../../utils/audioFx';
import { triggerLibrarySparks } from '../../utils/magicFx';
import { Sparkles, MailOpen, ArrowRight, BookOpen, Scroll, CheckCircle2, X } from 'lucide-react';

interface HogwartsAcceptanceLetterProps {
  onOpenPortfolio: () => void;
  onSkip: () => void;
}

export const HogwartsAcceptanceLetter: React.FC<HogwartsAcceptanceLetterProps> = ({
  onOpenPortfolio,
  onSkip,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [activePage, setActivePage] = useState<'letter' | 'equipment'>('letter');

  const handleBreakSeal = () => {
    audioFx.playWaxSealCrack();
    triggerLibrarySparks({ x: 0.5, y: 0.5 });
    setIsOpened(true);
  };

  const handleEnterPortfolio = () => {
    audioFx.playAlohomora();
    onOpenPortfolio();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn select-none">
      
      {/* Background Magical Atmosphere */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-amber-600/15 blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full bg-[#702C38]/20 blur-[110px]" />
      </div>

      <div className="relative w-full max-w-2xl my-auto text-center z-10">
        
        {/* Top Banner Tag */}
        <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111D2B]/90 border border-[#34475A] text-[#C5A66A] text-xs font-heading tracking-widest uppercase shadow">
          <Sparkles className="w-3.5 h-3.5 text-[#B49A62]" /> Chapter 1 — The Hogwarts Acceptance Letter
        </div>

        {!isOpened ? (
          /* ==================================================================== */
          /* THE ENVELOPE (CLOSED WITH BURGUNDY WAX SEAL)                         */
          /* ==================================================================== */
          <div className="space-y-4">
            
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[#F0E8D5] tracking-tight">
              An Owl Has Delivered a Letter For You.
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[#B7C1CC] max-w-md mx-auto">
              Delivered via screech owl directly to your display from the digital archives of GM Mercullo.
            </p>

            {/* The Physical Envelope */}
            <div 
              onClick={handleBreakSeal}
              className="cursor-pointer group relative mx-auto w-full max-w-lg bg-[#E8D9AE] border-2 border-[#B49A62] rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_25px_70px_rgba(180,154,98,0.35)] transition-all duration-300 transform hover:-translate-y-1.5 overflow-hidden"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 50% 20%, rgba(244, 233, 200, 0.7) 0%, rgba(216, 198, 151, 0.9) 100%)
                `,
              }}
            >
              {/* Postal Cancellation Postmark Stamp */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 border-2 border-dashed border-[#702C38]/40 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center text-[9px] sm:text-[10px] font-heading text-[#702C38]/60 transform rotate-12 select-none pointer-events-none">
                <span className="font-bold">OWL POST</span>
                <span>HOGSMEADE</span>
                <span className="text-[8px]">EXPRESS</span>
              </div>

              {/* Envelope Flap Crease Overlay */}
              <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-[#B49A62]/40 pointer-events-none" />

              {/* Front Address in Authentic Emerald Green Ink Calligraphy */}
              <div className="text-left font-heading text-[#114522] space-y-1 sm:space-y-1.5 my-6 sm:my-8 pl-4 sm:pl-8 border-l-2 border-[#114522]/30">
                <div className="text-lg sm:text-xl font-bold tracking-wide italic">
                  To: Esteemed Visitor & Tech Scout
                </div>
                <div className="text-sm sm:text-base">
                  The Desk by the Window
                </div>
                <div className="text-sm sm:text-base">
                  The Enchanted Library & Systems Citadel
                </div>
                <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#702C38]">
                  Diagon Alley / The Digital Realm
                </div>
              </div>

              {/* Burgundy Wax Seal with GM Monogram */}
              <div className="relative z-10 flex flex-col items-center justify-center pt-2">
                <div 
                  className="w-20 h-20 rounded-full bg-[#702C38] border-2 border-[#B49A62] shadow-[0_4px_25px_rgba(112,44,56,0.7)] flex items-center justify-center transform group-hover:scale-110 transition-transform relative"
                  title="Click to Break Wax Seal"
                >
                  <div className="w-16 h-16 rounded-full border border-[#B49A62]/60 flex flex-col items-center justify-center text-[#F4E9C8] font-heading font-bold select-none">
                    <span className="text-xl tracking-wider leading-none">GM</span>
                    <span className="text-[8px] uppercase tracking-widest text-[#B49A62] mt-0.5">HOGWARTS</span>
                  </div>
                  {/* Subtle seal shine */}
                  <div className="absolute top-1 left-2 w-4 h-2 rounded-full bg-white/20 blur-[0.5px]" />
                </div>

                <div className="mt-4 font-heading font-bold text-sm text-[#702C38] tracking-wide flex items-center gap-1.5 animate-pulse">
                  <MailOpen className="w-4 h-4" />
                  <span>Click Seal to Break & Unfold Acceptance Letter</span>
                </div>
              </div>

            </div>

            {/* Quick Skip Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onSkip}
                className="text-xs font-sans text-[#B7C1CC] hover:text-white underline transition-colors"
              >
                Skip Introduction and Go Straight to The Great Hall →
              </button>
            </div>

          </div>
        ) : (
          /* ==================================================================== */
          /* THE UNFOLDED HOGWARTS ACCEPTANCE LETTER                              */
          /* ==================================================================== */
          <div className="relative bg-[#F7EED4] text-[#11381E] border-2 border-[#B49A62] rounded-3xl p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] text-left font-serif animate-seal-pop max-h-[85vh] flex flex-col overflow-hidden">
            
            {/* Top Close Button */}
            <button
              onClick={onSkip}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/10 text-[#75664B] transition-colors"
              title="Close Letter"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letter Pages Navigation Tabs */}
            <div className="flex items-center gap-2 pb-3 border-b border-[#D8C697] mb-4 print:hidden">
              <button
                onClick={() => {
                  audioFx.playPaperRustle();
                  setActivePage('letter');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold flex items-center gap-1.5 transition-colors ${
                  activePage === 'letter'
                    ? 'bg-[#702C38] text-[#F4E9C8] shadow'
                    : 'bg-[#E8D9AE] text-[#302B22] hover:bg-[#D8C697]'
                }`}
              >
                <Scroll className="w-3.5 h-3.5" />
                <span>Page 1: Official Acceptance Letter</span>
              </button>

              <button
                onClick={() => {
                  audioFx.playPaperRustle();
                  setActivePage('equipment');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold flex items-center gap-1.5 transition-colors ${
                  activePage === 'equipment'
                    ? 'bg-[#702C38] text-[#F4E9C8] shadow'
                    : 'bg-[#E8D9AE] text-[#302B22] hover:bg-[#D8C697]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Page 2: Equipment & Requirements</span>
              </button>
            </div>

            {/* Scrollable Parchment Content */}
            <div className="overflow-y-auto pr-2 space-y-5 text-sm sm:text-base leading-relaxed">
              
              {activePage === 'letter' ? (
                /* PAGE 1: THE LETTER */
                <div className="space-y-4">
                  {/* Hogwarts School Header */}
                  <div className="text-center pb-4 border-b border-[#D8C697] space-y-1">
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#702C38] border border-[#B49A62] text-[#F4E9C8] font-heading font-bold text-lg flex items-center justify-center shadow">
                      GM
                    </div>
                    <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#702C38] tracking-widest uppercase">
                      Hogwarts School of Codecraft & Wizardry
                    </h2>
                    <div className="text-xs font-heading font-semibold text-[#526746]">
                      (The Digital Engineering Archives of GM Mercullo)
                    </div>
                    <div className="text-[11px] font-sans text-[#75664B] italic">
                      Headmaster: Albus Dumbledore &middot; Order of Merlin, First Class &middot; Supreme Mugwump
                    </div>
                  </div>

                  {/* Letter Salutation & Body in Emerald Green Ink */}
                  <div className="space-y-3 font-heading text-[#114522] text-sm sm:text-base">
                    <p className="font-bold text-base sm:text-lg">
                      Dear Esteemed Visitor,
                    </p>

                    <p>
                      We are pleased to inform you that you have been granted an official invitation to explore the enchanted developer portfolio and technical citadel of <strong>GM Mercullo</strong>.
                    </p>

                    <p>
                      Enclosed within these chapters you will find a full account of software artifacts, verified packet-level educational networking tools (such as <em>NetworkLabApp</em>), media synchronizers, Android ecosystem utilities, and verified cybersecurity credentials.
                    </p>

                    <p>
                      Term begins immediately upon entering the Great Hall. We await your inspection by no later than today.
                    </p>
                  </div>

                  {/* Signatures */}
                  <div className="pt-4 border-t border-[#D8C697] flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 font-heading">
                    <div>
                      <div className="text-xs text-[#75664B] uppercase tracking-wider">
                        Yours Sincerely,
                      </div>
                      <div className="text-lg font-bold text-[#702C38] italic font-decorative mt-1">
                        Minerva McGonagall
                      </div>
                      <div className="text-xs text-[#526746]">
                        Deputy Headmistress & Keeper of Arcane Keys
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <div className="text-xs text-[#75664B] uppercase tracking-wider">
                        Countersigned in Living Ink:
                      </div>
                      <div className="text-lg font-bold text-[#114522] font-decorative mt-1">
                        GM Mercullo
                      </div>
                      <div className="text-xs text-[#75664B]">
                        Aspiring Software Developer &middot; Network Engineer &middot; Cybersecurity Analyst
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* PAGE 2: EQUIPMENT & REQUIREMENTS LIST */
                <div className="space-y-4">
                  <div className="text-center pb-3 border-b border-[#D8C697]">
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-[#702C38] tracking-wide uppercase">
                      Hogwarts School of Codecraft & Wizardry
                    </h3>
                    <div className="text-xs font-heading font-semibold text-[#526746]">
                      UNIFORM & EQUIPMENT LIST (GM MERCULLO CHAPTER)
                    </div>
                  </div>

                  <div className="space-y-3 font-heading text-[#114522] text-sm">
                    <p className="font-bold text-sm uppercase tracking-wider text-[#702C38]">
                      Visitors & Tech Scouts will require:
                    </p>
                    
                    <ul className="space-y-2 pl-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#526746] shrink-0 mt-0.5" />
                        <span><strong>1. One (1) Inquisitive Mind:</strong> Curiosity for how software, networking protocols, and security systems operate under the hood.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#526746] shrink-0 mt-0.5" />
                        <span><strong>2. One (1) Standard Terminal Shell:</strong> Bash, Zsh, or any modern web browser to inspect running applications.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#526746] shrink-0 mt-0.5" />
                        <span><strong>3. One (1) Appreciation for Low-Level Logic:</strong> Subnetting calculations (CIDR/VLSM), OSI 7-Layer encapsulation, and socket pipelines.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#526746] shrink-0 mt-0.5" />
                        <span><strong>4. One (1) Verified GitHub Account:</strong> To inspect source repositories, clone codebases, or submit pull requests.</span>
                      </li>
                    </ul>

                    <div className="p-3 rounded-xl bg-[#E8D9AE] border border-[#B49A62] text-xs font-sans text-[#302B22]">
                      <span className="font-heading font-bold text-[#702C38] block mb-0.5">Note on Permitted Companions:</span>
                      Visitors may also bring an Owl (<a href="mailto:gmmercullo99@gmail.com" className="underline font-semibold">gmmercullo99@gmail.com</a>), a LinkedIn endorsement, or an inquiry for collaboration.
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-[#D8C697] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-xs font-decorative italic text-[#75664B] hidden sm:inline">
                "Platform 9¾ awaits your departure."
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={onSkip}
                  className="px-4 py-2 rounded-xl bg-transparent border border-[#B49A62] hover:bg-black/5 text-[#302B22] font-heading font-semibold text-xs transition-colors"
                >
                  Close Letter
                </button>

                <button
                  type="button"
                  onClick={handleEnterPortfolio}
                  className="px-6 py-2.5 rounded-xl bg-[#702C38] hover:bg-[#8A3645] text-[#F4E9C8] font-heading font-bold text-xs tracking-wider shadow flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                >
                  <span>Step Onto Platform 9¾ (Enter Portfolio)</span>
                  <ArrowRight className="w-4 h-4 text-[#B49A62]" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
