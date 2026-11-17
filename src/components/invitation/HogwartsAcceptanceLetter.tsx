import React, { useState } from 'react';
import { ArrowRight, BookOpen, MailOpen, Sparkles, Volume2, VolumeX, X } from 'lucide-react';

interface HogwartsAcceptanceLetterProps {
  onOpenPortfolio: () => void;
  onSkip: () => void;
}

export const HogwartsAcceptanceLetter: React.FC<HogwartsAcceptanceLetterProps> = ({
  onOpenPortfolio,
  onSkip,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [sealBroken, setSealBroken] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [activePage, setActivePage] = useState<'letter' | 'equipment'>('letter');

  const handleFlipEnvelope = () => {
    if (!isFlipped && !sealBroken) {
      setIsFlipped(true);
    }
  };

  const handleBreakSeal = () => {
    if (sealBroken) return;
    setSealBroken(true);
    setTimeout(() => {
      setLetterVisible(true);
    }, 600);
  };

  const handleReplay = () => {
    setIsFlipped(false);
    setSealBroken(false);
    setLetterVisible(false);
    setActivePage('letter');
  };

  const handleEnterPortfolio = () => {
    onOpenPortfolio();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#090B12]/90 backdrop-blur-sm text-[#F5EAD2]">
      <div className="owl-ambient-glow" />
      <div className="owl-dust-layer" />

      <button
        type="button"
        aria-label="Toggle magical sound"
        onClick={() => setSoundOn((prev) => !prev)}
        className="fixed right-4 top-4 z-[60] inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-[#0a0d13]/80 px-3 py-2 text-[10px] uppercase tracking-[0.28em] text-amber-200 shadow-lg transition hover:border-amber-300/60"
        style={{ fontFamily: 'Cinzel, serif' }}
      >
        {soundOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
        <span className="hidden sm:inline">{soundOn ? 'Sound On' : 'Muted'}</span>
      </button>

      {!letterVisible && (
        <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8">
          <header className="mb-5 text-center">
            <p className="mb-2 text-[10px] uppercase tracking-[0.34em] text-amber-300/75" style={{ fontFamily: 'Cinzel, serif' }}>
              Owl Post Dispatch • Special Delivery
            </p>
            <h1 className="text-2xl font-black tracking-[0.08em] text-amber-100 sm:text-3xl" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
              GM Mercullo
            </h1>
          </header>

          <div className="owl-scene">
            <div
              role="button"
              tabIndex={0}
              onClick={handleFlipEnvelope}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleFlipEnvelope();
                }
              }}
              className={`owl-envelope-wrapper ${isFlipped ? 'is-flipped' : ''} ${sealBroken ? 'seal-broken' : ''}`}
              aria-label="Hogwarts-style acceptance envelope"
            >
              <div className="owl-envelope-face owl-front parchment-surface">
                <div className="absolute right-4 top-4 flex flex-col items-center opacity-60 sm:right-6 sm:top-6">
                  <div className="flex h-12 w-12 rotate-12 items-center justify-center rounded-full border border-emerald-900/50 bg-[#f5eed8]/40 sm:h-14 sm:w-14">
                    <span className="text-[9px] font-bold leading-tight text-emerald-950" style={{ fontFamily: 'Cinzel, serif' }}>
                      OWL
                      <br />
                      POST
                    </span>
                  </div>
                </div>

                <div className="relative z-10 mx-auto w-full max-w-[86%] pl-2 sm:pl-6">
                  <p className="emerald-calligraphy text-[2.2rem] leading-none sm:text-[3rem]">Esteemed Visitor</p>
                  <div className="emerald-serif mt-2 space-y-1 pl-3 text-base sm:text-[1.35rem]">
                    <p>The Glowing Screen by the Desk,</p>
                    <p>Port 443, The Digital Realm,</p>
                    <p className="tracking-wide">Worldwide Web.</p>
                  </div>
                </div>
              </div>

              <div className="owl-envelope-face owl-back">
                <div className="owl-envelope-pocket" />

                <div className="owl-letter-preview">
                  <svg className="mb-2 h-9 w-9 text-stone-800/80 sm:h-11 sm:w-11" viewBox="0 0 120 120" fill="none">
                    <path d="M60 12 L94 24 V58 C94 82 78 98 60 108 C42 98 26 82 26 58 V24 L60 12Z" stroke="currentColor" strokeWidth="3.5" fill="rgba(180,150,95,0.18)" />
                    <path d="M60 12 V108 M26 56 H94" stroke="currentColor" strokeWidth="2" />
                    <rect x="47" y="43" width="26" height="26" rx="4" fill="#f4e8ca" stroke="currentColor" strokeWidth="2.5" />
                    <text x="60" y="62" textAnchor="middle" fontFamily="Cinzel, serif" fontWeight="800" fontSize="18" fill="currentColor">
                      H
                    </text>
                  </svg>

                  <div className="w-full px-2 text-left">
                    <p className="emerald-calligraphy text-xl leading-none sm:text-2xl">Dear Esteemed Visitor,</p>
                    <p className="typewriter-text mt-2 text-[10px] opacity-80 sm:text-[11px]">
                      I am pleased to invite you to explore my portfolio of Software Development, Networking, and Cybersecurity...
                    </p>
                  </div>
                </div>

                <div className="owl-side-flaps">
                  <div className="owl-flap-left" />
                  <div className="owl-flap-right" />
                  <div className="owl-flap-bottom" />
                </div>

                <div className="owl-flap-top">
                  <div className="owl-flap-top-shape">
                    <svg className="h-20 w-20 text-stone-900/90 sm:h-28 sm:w-28" viewBox="0 0 220 210" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M48 34 Q110 14 172 34 L164 50 Q110 32 56 50 Z" fill="#f5ebd4" stroke="#2c2218" strokeWidth="2.4" />
                      <path d="M48 34 L36 42 L46 53 L56 50" fill="#e5d5b3" stroke="#2c2218" strokeWidth="2" />
                      <path d="M172 34 L184 42 L174 53 L164 50" fill="#e5d5b3" stroke="#2c2218" strokeWidth="2" />
                      <text x="110" y="39" textAnchor="middle" fontFamily="Cinzel, serif" fontWeight="800" fontSize="13.5" letterSpacing="2.2" fill="#231a11">
                        HOGWARTS
                      </text>
                      <path d="M68 54 L110 46 L152 54 V108 C152 140 132 162 110 174 C88 162 68 140 68 108 V54 Z" fill="#efe2c4" stroke="#231a11" strokeWidth="3" />
                      <path d="M74 59 L110 52 L146 59 V107 C146 135 129 155 110 166 C91 155 74 135 74 107 V59 Z" stroke="#231a11" strokeWidth="1.3" />
                      <line x1="110" y1="52" x2="110" y2="166" stroke="#231a11" strokeWidth="2.2" />
                      <line x1="74" y1="106" x2="146" y2="106" stroke="#231a11" strokeWidth="2.2" />
                      <path d="M84 72 C88 66 96 67 98 74 C100 80 95 86 99 92 L92 96 L87 89 L82 95 L79 88 C82 83 80 77 84 72 Z" fill="#231a11" />
                      <circle cx="91" cy="70" r="3.5" fill="#231a11" />
                      <path d="M124 68 C132 66 138 72 134 79 C130 84 121 83 122 90 C123 95 132 95 137 91" stroke="#231a11" strokeWidth="3.6" strokeLinecap="round" fill="none" />
                      <circle cx="123" cy="68" r="2.6" fill="#231a11" />
                      <path d="M81 124 C84 117 95 116 101 122 C104 126 102 135 96 139 L86 138 C81 134 79 129 81 124 Z" fill="#231a11" />
                      <path d="M128 116 L139 122 L133 128 L138 137 L127 134 L119 140 L121 129 L116 123 Z" fill="#231a11" />
                      <rect x="95" y="90" width="30" height="32" rx="5" fill="#f7eed8" stroke="#231a11" strokeWidth="2.5" />
                      <text x="110" y="113" textAnchor="middle" fontFamily="Cinzel, serif" fontWeight="900" fontSize="21" fill="#1e150d">
                        H
                      </text>
                      <path d="M44 152 Q110 194 176 152 L182 164 Q110 208 38 164 Z" fill="#f5ebd4" stroke="#231a11" strokeWidth="2" />
                      <path id="motto-arc" d="M46 162 Q110 201 174 162" fill="none" />
                      <text fontFamily="Cinzel, serif" fontWeight="700" fontSize="7.3" letterSpacing="0.9" fill="#231a11">
                        <textPath href="#motto-arc" startOffset="50%" textAnchor="middle">
                          DRACO DORMIENS NUNQUAM TITILLANDUS
                        </textPath>
                      </text>
                    </svg>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Break the wax seal"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleBreakSeal();
                  }}
                  className={`owl-wax-seal ${sealBroken ? 'is-broken' : ''}`}
                >
                  <svg viewBox="0 0 120 120" className="h-full w-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="waxBodyGrad" cx="38%" cy="32%" r="68%">
                        <stop offset="0%" stopColor="#c9222c" />
                        <stop offset="48%" stopColor="#961119" />
                        <stop offset="85%" stopColor="#69080e" />
                        <stop offset="100%" stopColor="#470408" />
                      </radialGradient>
                      <radialGradient id="waxInnerRim" cx="65%" cy="70%" r="65%">
                        <stop offset="0%" stopColor="#b81a24" />
                        <stop offset="100%" stopColor="#5c060b" />
                      </radialGradient>
                    </defs>
                    <path d="M60 6 C73 5 86 11 96 19 C106 27 115 39 114 53 C113 66 117 79 109 91 C101 103 88 112 74 114 C60 116 46 115 34 108 C21 101 10 90 8 76 C6 62 7 47 14 34 C21 21 33 12 46 8 C51 6 55 6 60 6 Z" fill="url(#waxBodyGrad)" stroke="#470408" strokeWidth="1.5" />
                    <path d="M24 28 C34 16 50 11 66 13 C81 15 95 23 102 36" stroke="rgba(255, 175, 180, 0.38)" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <circle cx="60" cy="60" r="37" fill="url(#waxInnerRim)" stroke="#4d0509" strokeWidth="2.5" />
                    <circle cx="60" cy="60" r="33" fill="none" stroke="rgba(255, 140, 148, 0.24)" strokeWidth="1.2" />
                    <path d="M44 41 L60 36 L76 41 V63 C76 76 68 84 60 89 C52 84 44 76 44 63 V41 Z" fill="none" stroke="#450307" strokeWidth="2.2" />
                    <text x="60" y="70" textAnchor="middle" fontFamily="Cinzel, serif" fontWeight="900" fontSize="28" fill="#470408" style={{ filter: 'drop-shadow(0px 1px 0px rgba(255,130,138,0.35))' }}>
                      H
                    </text>
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-2 text-center">
              <div className="instruction-badge" style={{ fontFamily: 'Cinzel, serif' }}>
                {isFlipped ? 'Click the wax seal to break' : 'Click envelope to turn over'}
              </div>
              <p className="text-xs uppercase tracking-[0.22em] text-amber-200/55">Addressed to you via Owl Post</p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={onSkip}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-zinc-200 transition hover:border-amber-300/40 hover:text-white"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Skip Introduction
              </button>
            </div>
          </div>
        </main>
      )}

      {letterVisible && !sealBroken && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm" />
      )}

      {letterVisible && (
        <section className="full-letter-stage is-visible" aria-label="Hogwarts Acceptance Letter">
          <article className="letter-sheet parchment-aged-letter text-stone-900">
            <div className="mb-6 flex flex-col items-center">
              <svg className="h-20 w-20 text-stone-900/90 sm:h-24 sm:w-24" viewBox="0 0 220 210" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M48 34 Q110 14 172 34 L164 50 Q110 32 56 50 Z" fill="#efe2c4" stroke="#261c12" strokeWidth="2.4" />
                <path d="M48 34 L36 42 L46 53 L56 50" fill="#dfd0af" stroke="#261c12" strokeWidth="2" />
                <path d="M172 34 L184 42 L174 53 L164 50" fill="#dfd0af" stroke="#261c12" strokeWidth="2" />
                <text x="110" y="39" textAnchor="middle" fontFamily="Cinzel, serif" fontWeight="800" fontSize="13.5" letterSpacing="2.2" fill="#261c12">
                  HOGWARTS
                </text>
                <path d="M68 54 L110 46 L152 54 V108 C152 140 132 162 110 174 C88 162 68 140 68 108 V54 Z" fill="#eadbb9" stroke="#261c12" strokeWidth="3" />
                <path d="M74 59 L110 52 L146 59 V107 C146 135 129 155 110 166 C91 155 74 135 74 107 V59 Z" stroke="#261c12" strokeWidth="1.3" />
                <line x1="110" y1="52" x2="110" y2="166" stroke="#261c12" strokeWidth="2.2" />
                <line x1="74" y1="106" x2="146" y2="106" stroke="#261c12" strokeWidth="2.2" />
                <path d="M84 72 C88 66 96 67 98 74 C100 80 95 86 99 92 L92 96 L87 89 L82 95 L79 88 C82 83 80 77 84 72 Z" fill="#261c12" />
                <circle cx="91" cy="70" r="3.5" fill="#261c12" />
                <path d="M124 68 C132 66 138 72 134 79 C130 84 121 83 122 90 C123 95 132 95 137 91" stroke="#261c12" strokeWidth="3.6" strokeLinecap="round" fill="none" />
                <circle cx="123" cy="68" r="2.6" fill="#261c12" />
                <path d="M81 124 C84 117 95 116 101 122 C104 126 102 135 96 139 L86 138 C81 134 79 129 81 124 Z" fill="#261c12" />
                <path d="M128 116 L139 122 L133 128 L138 137 L127 134 L119 140 L121 129 L116 123 Z" fill="#261c12" />
                <rect x="95" y="90" width="30" height="32" rx="5" fill="#f5ebd4" stroke="#261c12" strokeWidth="2.5" />
                <text x="110" y="113" textAnchor="middle" fontFamily="Cinzel, serif" fontWeight="900" fontSize="21" fill="#261c12">
                  H
                </text>
                <path d="M44 152 Q110 194 176 152 L182 164 Q110 208 38 164 Z" fill="#efe2c4" stroke="#261c12" strokeWidth="2" />
                <path d="M46 162 Q110 201 174 162" fill="none" id="letter-motto-arc" />
                <text fontFamily="Cinzel, serif" fontWeight="700" fontSize="7.3" letterSpacing="0.9" fill="#261c12">
                  <textPath href="#letter-motto-arc" startOffset="50%" textAnchor="middle">
                    DRACO DORMIENS NUNQUAM TITILLANDUS
                  </textPath>
                </text>
              </svg>
            </div>

            <div className="mb-5 flex gap-3 text-xs text-stone-800/90 sm:text-sm" style={{ fontFamily: 'Special Elite, monospace' }}>
              <span className="font-bold">To:</span>
              <div>
                <p>Esteemed Visitor,</p>
                <p>The Glowing Screen by the Desk,</p>
                <p>Port 443, The Digital Realm,</p>
                <p>Worldwide Web.</p>
              </div>
            </div>

            <h2 className="emerald-calligraphy mb-4 text-3xl sm:text-[2.7rem]">Dear Esteemed Visitor,</h2>

            <div className="typewriter-text space-y-4 text-[13px] sm:text-[15px]">
              <p>I am pleased to invite you to explore my portfolio of Software Development, Networking, and Cybersecurity.</p>
              <p>Visitors shall be granted full passage to inspect crafted applications, resilient network architectures, and security-hardened systems built with precision.</p>
              <p>Please ensure that utmost attention is given to the projects, technical spells, and engineering credentials archived within.</p>
              <p>I very much look forward to welcoming you into the Great Hall of my digital domain.</p>
            </div>

            <div className="mt-8 border-t border-amber-900/25 pt-4">
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone-800/80" style={{ fontFamily: 'Cinzel, serif' }}>
                Draco Dormiens Nunquam Titillandus
              </p>

              <div className="flex flex-col items-start gap-1">
                <p className="typewriter-text text-[11px] sm:text-[12px] text-stone-800">Sincerely,</p>
                <p className="emerald-calligraphy text-4xl leading-none text-stone-900 sm:text-5xl">GM Mercullo</p>
                <p className="typewriter-text text-[11px] font-bold text-stone-900 sm:text-[12px]">
                  Software Developer • Network & Security Engineer
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-amber-900/25 pt-5 sm:flex-row">
              <button
                type="button"
                onClick={handleReplay}
                className="text-[10px] uppercase tracking-[0.18em] text-stone-700 transition hover:text-stone-950 underline underline-offset-4"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                ↺ Replay Envelope
              </button>

              <button
                type="button"
                onClick={handleEnterPortfolio}
                className="owl-button w-full sm:w-auto"
              >
                <span>Enter the Great Hall</span>
                <ArrowRight className="h-4 w-4 text-amber-200" />
              </button>
            </div>
          </article>
        </section>
      )}

      {letterVisible && (
        <div className="absolute inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:hidden">
          <button
            type="button"
            onClick={handleEnterPortfolio}
            className="owl-button w-full"
          >
            <span>Enter the Great Hall</span>
            <ArrowRight className="h-4 w-4 text-amber-200" />
          </button>
        </div>
      )}
    </div>
  );
};

export default HogwartsAcceptanceLetter;


"""""""""""""""""""""""""""""""""" file planned 

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""" empower 

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""  """""""""""""""""""""""""""""""""""" habitación 

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""" """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""




""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""




""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""" মাত






""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""







"























"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""





















"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""






















































n






















"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""