import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';

interface HogwartsAcceptanceLetterProps {
  onOpenPortfolio: () => void;
  onSkip: () => void;
}

type OnboardingStep = 'front' | 'back' | 'opening' | 'letter';

export const HogwartsAcceptanceLetter: React.FC<HogwartsAcceptanceLetterProps> = ({
  onOpenPortfolio,
  onSkip,
}) => {
  const [step, setStep] = useState<OnboardingStep>('front');
  const [soundOn, setSoundOn] = useState(true);
  const [activePage, setActivePage] = useState<'letter' | 'equipment'>('letter');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(window.clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let frame = 0;
    let particles: Array<{ x: number; y: number; r: number; vx: number; vy: number; alpha: number; phase: number }> = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(55, Math.floor((width * height) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.9 + 0.5,
        vx: (Math.random() - 0.5) * 0.28,
        vy: -Math.random() * 0.35 - 0.08,
        alpha: Math.random() * 0.55 + 0.15,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const animate = () => {
      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        particle.x += particle.vx + Math.sin(particle.phase) * 0.12;
        particle.y += particle.vy;
        particle.phase += 0.015;
        if (particle.y < -10) {
          particle.y = height + 10;
          particle.x = Math.random() * width;
        }
        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        const opacity = particle.alpha * (0.65 + 0.35 * Math.sin(particle.phase * 1.5));
        context.beginPath();
        context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        context.fillStyle = `rgba(242, 205, 112, ${opacity.toFixed(3)})`;
        context.fill();
      }
      frame = window.requestAnimationFrame(animate);
    };

    resize();
    frame = window.requestAnimationFrame(animate);
    window.addEventListener('resize', resize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => () => {
    clearTimers();
    void audioRef.current?.close();
  }, []);

  const getAudio = () => {
    if (!soundOn) return null;
    if (!audioRef.current) audioRef.current = new AudioContext();
    if (audioRef.current.state === 'suspended') void audioRef.current.resume();
    return audioRef.current;
  };

  const playParchment = (duration = 0.32) => {
    const audio = getAudio();
    if (!audio) return;
    const length = Math.floor(audio.sampleRate * duration);
    const buffer = audio.createBuffer(1, length, audio.sampleRate);
    const samples = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      samples[i] = (Math.random() * 2 - 1) * Math.sin((i / length) * Math.PI) * 0.2;
    }
    const source = audio.createBufferSource();
    source.buffer = buffer;
    const filter = audio.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1400;
    filter.Q.value = 1.4;
    const gain = audio.createGain();
    gain.gain.setValueAtTime(0.2, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audio.currentTime + duration);
    source.connect(filter).connect(gain).connect(audio.destination);
    source.start();
  };

  const playWaxCrack = () => {
    const audio = getAudio();
    if (!audio) return;
    const now = audio.currentTime;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(220, now);
    oscillator.frequency.exponentialRampToValueAtTime(55, now + 0.14);
    gain.gain.setValueAtTime(0.32, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.16);
    playParchment(0.55);
  };

  const playChime = () => {
    const audio = getAudio();
    if (!audio) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
      const start = audio.currentTime + index * 0.09;
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.12, start + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0008, start + 1.1);
      oscillator.connect(gain).connect(audio.destination);
      oscillator.start(start);
      oscillator.stop(start + 1.15);
    });
  };

  const flipToBack = () => {
    if (step !== 'front') return;
    setStep('back');
    playParchment(0.35);
  };

  const breakSeal = () => {
    if (step !== 'back') return;
    setStep('opening');
    playWaxCrack();
    // Keep the crack, flap, rising letter, and full-page reveal in sequence.
    timersRef.current = [
      window.setTimeout(() => playParchment(0.45), 260),
      window.setTimeout(() => playParchment(0.35), 780),
      window.setTimeout(() => {
        setStep('letter');
        playChime();
      }, 1520),
    ];
  };

  const replayEnvelope = () => {
    clearTimers();
    setStep('front');
    setActivePage('letter');
    playParchment(0.3);
  };

  const enterGreatHall = () => {
    playChime();
    window.dispatchEvent(new CustomEvent('gm:enterGreatHall', { detail: { timestamp: Date.now() } }));
    onOpenPortfolio();
  };

  const handleEnvelopeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button')) return;
    if (step === 'front') flipToBack();
    else if (step === 'back') breakSeal();
  };

  const handleEnvelopeKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    if ((event.target as HTMLElement).closest('button')) return;
    event.preventDefault();
    if (step === 'front') flipToBack();
    else if (step === 'back') breakSeal();
  };

  return (
    <div className="owl-onboarding fixed inset-0 z-50 overflow-hidden text-[#F5EAD2]">
      <div className="owl-ambient-glow" aria-hidden="true" />
      <canvas ref={canvasRef} className="owl-dust-canvas" aria-hidden="true" />

      <button
        type="button"
        aria-label={soundOn ? 'Mute magical sound effects' : 'Enable magical sound effects'}
        onClick={() => setSoundOn((enabled) => !enabled)}
        className="owl-sound-toggle"
      >
        {soundOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
        <span className="hidden sm:inline">{soundOn ? 'Sound On' : 'Muted'}</span>
      </button>

      <header className={`owl-onboarding-header ${step === 'letter' ? 'is-dismissed' : ''}`}>
        <p>Owl Post Dispatch • Special Delivery</p>
        <h1>GM Mercullo</h1>
      </header>

      <main className={`owl-stage ${step === 'letter' ? 'is-dismissed' : ''}`}>
        <div className="owl-scene">
          <div
            className={`owl-envelope-wrapper ${step !== 'front' ? 'is-flipped' : ''} ${step === 'opening' || step === 'letter' ? 'is-opening' : ''} ${step === 'opening' || step === 'letter' ? 'flap-open letter-sliding' : ''}`}
            onClick={handleEnvelopeClick}
            onKeyDown={handleEnvelopeKeyDown}
            tabIndex={0}
            role="group"
            aria-label="Owl Post envelope. Turn it over, then break the wax seal to open the invitation."
          >
            <div className="owl-envelope-face owl-front parchment-surface">
              <div className="owl-postmark" aria-hidden="true"><span>OWL<br />POST</span></div>
              <div className="owl-address">
                <p className="emerald-calligraphy">Esteemed Visitor</p>
                <div className="emerald-serif">
                  <p>The Glowing Screen <i>by the</i> Desk,</p>
                  <p>Port 443, The Digital Realm,</p>
                  <p>Worldwide Web.</p>
                </div>
              </div>
            </div>

            <div className="owl-envelope-face owl-back">
              <div className="owl-envelope-pocket" />
              <div className="owl-letter-preview" aria-hidden="true">
                <svg className="owl-mini-crest" viewBox="0 0 120 120" fill="none">
                  <path d="M60 12 L94 24 V58 C94 82 78 98 60 108 C42 98 26 82 26 58 V24 L60 12Z" stroke="currentColor" strokeWidth="3.5" fill="rgba(180,150,95,0.18)" />
                  <path d="M60 12 V108 M26 56 H94" stroke="currentColor" strokeWidth="2" />
                  <rect x="47" y="43" width="26" height="26" rx="4" fill="#f4e8ca" stroke="currentColor" strokeWidth="2.5" />
                  <text x="60" y="62" textAnchor="middle" fontFamily="Cinzel, serif" fontWeight="800" fontSize="18" fill="currentColor">H</text>
                </svg>
                <div className="owl-preview-copy">
                  <p className="emerald-calligraphy">Dear Esteemed Visitor,</p>
                  <p className="typewriter-text">I am pleased to invite you to explore my portfolio of Software Development, Networking, and Cybersecurity...</p>
                </div>
              </div>

              <div className="owl-side-flaps" aria-hidden="true">
                <div className="owl-flap-left" />
                <div className="owl-flap-right" />
                <div className="owl-flap-bottom" />
              </div>
              <div className="owl-flap-top" aria-hidden="true">
                <div className="owl-flap-top-shape">
                  <svg className="owl-hogwarts-crest" viewBox="0 0 220 210" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M48 34 Q110 14 172 34 L164 50 Q110 32 56 50 Z" fill="#f5ebd4" stroke="#2c2218" strokeWidth="2.4" />
                    <path d="M48 34 L36 42 L46 53 L56 50 M172 34 L184 42 L174 53 L164 50" fill="#e5d5b3" stroke="#2c2218" strokeWidth="2" />
                    <text x="110" y="39" textAnchor="middle" fontFamily="Cinzel, serif" fontWeight="800" fontSize="13.5" letterSpacing="2.2" fill="#231a11">HOGWARTS</text>
                    <path d="M68 54 L110 46 L152 54 V108 C152 140 132 162 110 174 C88 162 68 140 68 108 V54 Z" fill="#efe2c4" stroke="#231a11" strokeWidth="3" />
                    <path d="M74 59 L110 52 L146 59 V107 C146 135 129 155 110 166 C91 155 74 135 74 107 V59 Z" stroke="#231a11" strokeWidth="1.3" />
                    <line x1="110" y1="52" x2="110" y2="166" stroke="#231a11" strokeWidth="2.2" /><line x1="74" y1="106" x2="146" y2="106" stroke="#231a11" strokeWidth="2.2" />
                    <path d="M84 72 C88 66 96 67 98 74 C100 80 95 86 99 92 L92 96 L87 89 L82 95 L79 88 C82 83 80 77 84 72Z" fill="#231a11" /><circle cx="91" cy="70" r="3.5" fill="#231a11" />
                    <path d="M124 68 C132 66 138 72 134 79 C130 84 121 83 122 90 C123 95 132 95 137 91" stroke="#231a11" strokeWidth="3.6" strokeLinecap="round" /><circle cx="123" cy="68" r="2.6" fill="#231a11" />
                    <path d="M81 124 C84 117 95 116 101 122 C104 126 102 135 96 139 L86 138 C81 134 79 129 81 124Z" fill="#231a11" /><path d="M128 116 L139 122 L133 128 L138 137 L127 134 L119 140 L121 129 L116 123Z" fill="#231a11" />
                    <rect x="95" y="90" width="30" height="32" rx="5" fill="#f7eed8" stroke="#231a11" strokeWidth="2.5" /><text x="110" y="113" textAnchor="middle" fontFamily="Cinzel, serif" fontWeight="900" fontSize="21" fill="#1e150d">H</text>
                    <path d="M44 152 Q110 194 176 152 L182 164 Q110 208 38 164 Z" fill="#f5ebd4" stroke="#231a11" strokeWidth="2" />
                    <text x="110" y="174" textAnchor="middle" fontFamily="Cinzel, serif" fontWeight="700" fontSize="7.3" letterSpacing="0.9" fill="#231a11">DRACO DORMIENS NUNQUAM TITILLANDUS</text>
                  </svg>
                </div>
              </div>

              <button
                type="button"
                aria-label="Break the crimson wax seal to open the letter"
                disabled={step !== 'back'}
                onClick={(event) => {
                  event.stopPropagation();
                  breakSeal();
                }}
                className={`owl-wax-seal ${step === 'opening' || step === 'letter' ? 'is-broken' : ''}`}
              >
                <svg viewBox="0 0 120 120" className="h-full w-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="waxBodyGrad" cx="38%" cy="32%" r="68%"><stop offset="0%" stopColor="#c9222c" /><stop offset="48%" stopColor="#961119" /><stop offset="85%" stopColor="#69080e" /><stop offset="100%" stopColor="#470408" /></radialGradient>
                    <radialGradient id="waxInnerRim" cx="65%" cy="70%" r="65%"><stop offset="0%" stopColor="#b81a24" /><stop offset="100%" stopColor="#5c060b" /></radialGradient>
                  </defs>
                  <path d="M60 6 C73 5 86 11 96 19 C106 27 115 39 114 53 C113 66 117 79 109 91 C101 103 88 112 74 114 C60 116 46 115 34 108 C21 101 10 90 8 76 C6 62 7 47 14 34 C21 21 33 12 46 8 C51 6 55 6 60 6Z" fill="url(#waxBodyGrad)" stroke="#470408" strokeWidth="1.5" />
                  <path d="M24 28 C34 16 50 11 66 13 C81 15 95 23 102 36" stroke="rgba(255,175,180,.38)" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="60" cy="60" r="37" fill="url(#waxInnerRim)" stroke="#4d0509" strokeWidth="2.5" /><circle cx="60" cy="60" r="33" fill="none" stroke="rgba(255,140,148,.24)" strokeWidth="1.2" />
                  <path d="M44 41 L60 36 L76 41 V63 C76 76 68 84 60 89 C52 84 44 76 44 63V41Z" fill="none" stroke="#450307" strokeWidth="2.2" />
                  <text x="60" y="70" textAnchor="middle" fontFamily="Cinzel, serif" fontWeight="900" fontSize="28" fill="#470408">H</text>
                </svg>
              </button>
            </div>

            <div className="owl-instructions">
              <div className="instruction-badge">{step === 'front' ? 'Click envelope to turn over' : step === 'back' ? 'Click the wax seal to break' : 'Breaking the seal…'}</div>
              <p>{step === 'front' ? 'Addressed to you via Owl Post' : step === 'back' ? 'Sealed with the Crest of Hogwarts' : 'Unfolding your invitation'}</p>
            </div>
            <button type="button" className="owl-skip-button" onClick={onSkip}>Skip Introduction</button>
          </div>
        </div>
      </main>

      {step === 'letter' && (
        <section className="full-letter-stage is-visible" aria-label="Hogwarts Acceptance Letter">
          <article className="letter-sheet parchment-aged-letter">
            <div className="letter-crest" aria-hidden="true">
              <svg viewBox="0 0 220 210" fill="none"><path d="M48 34 Q110 14 172 34 L164 50 Q110 32 56 50Z" fill="#efe2c4" stroke="#261c12" strokeWidth="2.4" /><text x="110" y="39" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="13" fontWeight="800" fill="#261c12">HOGWARTS</text><path d="M68 54 L110 46 L152 54 V108 C152 140 132 162 110 174 C88 162 68 140 68 108V54Z" fill="#eadbb9" stroke="#261c12" strokeWidth="3" /><line x1="110" y1="52" x2="110" y2="166" stroke="#261c12" strokeWidth="2" /><line x1="74" y1="106" x2="146" y2="106" stroke="#261c12" strokeWidth="2" /><rect x="95" y="90" width="30" height="32" rx="5" fill="#f5ebd4" stroke="#261c12" strokeWidth="2.5" /><text x="110" y="113" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="21" fontWeight="900" fill="#261c12">H</text><path d="M44 152 Q110 194 176 152L182 164Q110 208 38 164Z" fill="#efe2c4" stroke="#261c12" strokeWidth="2" /><text x="110" y="174" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="7" fill="#261c12">DRACO DORMIENS NUNQUAM TITILLANDUS</text></svg>
            </div>
            <div className="letter-address typewriter-text"><b>To:</b><div><p>Esteemed Visitor,</p><p>The Glowing Screen by the Desk,</p><p>Port 443, The Digital Realm,</p><p>Worldwide Web.</p></div></div>
            <h2 className="emerald-calligraphy letter-salutation">Dear Esteemed Visitor,</h2>
            {activePage === 'letter' ? (
              <div className="typewriter-text letter-body">
                <p>I am pleased to invite you to explore my portfolio of Software Development, Networking, and Cybersecurity.</p>
                <p>Visitors shall be granted full passage to inspect crafted applications, resilient network architectures, and security-hardened systems built with precision.</p>
                <p>Please ensure that utmost attention is given to the projects, technical spells, and engineering credentials archived within.</p>
                <p>I very much look forward to welcoming you into the Great Hall of my digital domain.</p>
              </div>
            ) : (
              <div className="typewriter-text letter-body">
                <p className="letter-section-heading">Visitors &amp; Tech Scouts will require:</p>
                <ul><li>One inquisitive mind, curious about software, networks, and security.</li><li>A browser to inspect the applications and a terminal for exploring code.</li><li>An appreciation for subnetting, OSI layers, and practical engineering.</li><li>A GitHub account to inspect source repositories and projects.</li></ul>
                <p>For inquiries, send an Owl Post to <a href="mailto:gmmercullo99@gmail.com">gmmercullo99@gmail.com</a>.</p>
              </div>
            )}
            <div className="letter-signoff">
              <p className="letter-motto">Draco Dormiens Nunquam Titillandus</p>
              <p className="typewriter-text">Sincerely,</p>
              <p className="emerald-calligraphy signature">GM Mercullo</p>
              <p className="typewriter-text signature-title">Software Developer • Network &amp; Security Engineer</p>
            </div>
            <div className="letter-actions">
              <div className="letter-page-tabs" aria-label="Letter pages">
                <button type="button" className={activePage === 'letter' ? 'active' : ''} onClick={() => setActivePage('letter')}>Acceptance Letter</button>
                <button type="button" className={activePage === 'equipment' ? 'active' : ''} onClick={() => setActivePage('equipment')}>Visitor’s Guide</button>
              </div>
              <button type="button" onClick={replayEnvelope} className="owl-replay-button">↺ Replay Envelope</button>
              <button type="button" onClick={enterGreatHall} className="owl-button"><span>Enter the Great Hall</span><ArrowRight className="h-4 w-4" /></button>
            </div>
            <footer className="letter-footer">Archives of Software, Networking &amp; Cybersecurity</footer>
          </article>
        </section>
      )}
    </div>
  );
};

export default HogwartsAcceptanceLetter;
