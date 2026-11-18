import React, { useEffect, useRef, useState } from 'react';
import { audioFx } from '../../utils/audioFx';
import { triggerLibrarySparks } from '../../utils/magicFx';
import './HogwartsAcceptanceLetter.css';

interface HogwartsAcceptanceLetterProps {
  onOpenPortfolio: () => void;
  onSkip: () => void;
  playIntroVideo: boolean;
}

type InvitationStep = 'front' | 'back' | 'opening' | 'letter';

export const HogwartsAcceptanceLetter: React.FC<
  HogwartsAcceptanceLetterProps
> = ({ onOpenPortfolio, onSkip, playIntroVideo }) => {
  const [step, setStep] = useState<InvitationStep>('front');
  const [isEnvelopeVisible, setIsEnvelopeVisible] = useState(!playIntroVideo);
  const [isExiting, setIsExiting] = useState(false);
  const openingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const introVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(
    () => () => {
      if (openingTimeout.current) clearTimeout(openingTimeout.current);
      if (exitTimeout.current) clearTimeout(exitTimeout.current);
    },
    [],
  );

  const turnEnvelope = () => {
    if (step !== 'front') return;
    audioFx.playPaperRustle();
    setStep('back');
  };

  const revealEnvelope = () => {
    introVideoRef.current?.pause();
    setIsEnvelopeVisible(true);
  };

  const handleIntroVideoError = () => {
    console.error(
      'Unable to load the Owl Post intro video at /Intro-letter.mp4.',
    );
    revealEnvelope();
  };

  const breakSeal = () => {
    if (step !== 'back') return;
    audioFx.playWaxSealCrack();
    triggerLibrarySparks({ x: 0.5, y: 0.5 });
    setStep('opening');
    openingTimeout.current = setTimeout(() => setStep('letter'), 1520);
  };

  const replayEnvelope = () => {
    if (openingTimeout.current) clearTimeout(openingTimeout.current);
    audioFx.playPaperRustle();
    setStep('front');
  };

  const enterPortfolio = () => {
    if (isExiting) return;
    audioFx.playAlohomora();
    setIsExiting(true);
    onOpenPortfolio();
  };

  const skipInvitation = () => {
    if (isExiting) return;
    setIsExiting(true);
    exitTimeout.current = setTimeout(onSkip, 400);
  };

  const isLetterVisible = step === 'letter';

  return (
    <div
      className={`invitation-shell${playIntroVideo ? ' has-intro-video' : ''}${isExiting ? ' is-exiting' : ''}`}
    >
      {playIntroVideo && (
        <>
          <video
            ref={introVideoRef}
            className="intro-video"
            src="/Intro-letter.mp4"
            autoPlay
            muted
            playsInline
            aria-hidden="true"
            onEnded={revealEnvelope}
            onError={handleIntroVideoError}
          />
          <div
            className={`invitation-vignette${isEnvelopeVisible ? ' is-visible' : ''}`}
            aria-hidden="true"
          />
          {!isEnvelopeVisible && (
            <button
              type="button"
              className="intro-skip-button"
              onClick={revealEnvelope}
            >
              Skip Intro
            </button>
          )}
        </>
      )}

      <div
        className={`invitation-content${isEnvelopeVisible ? ' is-visible' : ' is-video-intro'}`}
        aria-hidden={!isEnvelopeVisible}
        inert={!isEnvelopeVisible}
      >
        <div className="invitation-ambient-glow" aria-hidden="true" />
        <div className="invitation-dust" aria-hidden="true">
          {Array.from({ length: 28 }, (_, index) => (
            <span
              key={index}
              style={{
                left: `${(index * 37) % 100}%`,
                top: `${(index * 53) % 100}%`,
                animationDelay: `-${(index % 9) * 0.7}s`,
                animationDuration: `${6 + (index % 5)}s`,
              }}
            />
          ))}
        </div>

        <header className="invitation-header">
          <h1>GM Mercullo</h1>
        </header>

        <main className="invitation-scene">
          <div
            className={`owl-envelope${step !== 'front' ? ' is-flipped' : ''}${step === 'opening' ? ' is-opening flap-open letter-sliding' : ''}`}
            aria-label="Owl Post invitation envelope"
          >
            <button
              type="button"
              className="owl-envelope-face owl-envelope-front parchment-surface"
              onClick={turnEnvelope}
              aria-label="Turn over the invitation envelope"
              tabIndex={step === 'front' ? 0 : -1}
            >
              <span className="envelope-address">
                <span className="emerald-calligraphy">Esteemed Visitor</span>
                <span className="emerald-serif">
                  The Glowing Screen <i>by the</i> Desk,
                </span>
                <span className="emerald-serif">
                  Port 443, The Digital Realm,
                </span>
                <span className="emerald-serif">Worldwide Web.</span>
              </span>
            </button>

            <div className="owl-envelope-face owl-envelope-back">
              <div className="envelope-pocket" />
              <div className="rising-letter-preview" aria-hidden="true">
                <Crest className="preview-crest" />
                <div>
                  <p className="emerald-calligraphy">Dear Esteemed Visitor,</p>
                  <p className="typewriter-text">
                    I am pleased to invite you to explore my portfolio of
                    Software Development, Networking, and Cybersecurity...
                  </p>
                </div>
              </div>
              <div className="envelope-side-flaps" aria-hidden="true">
                <span className="flap-left" />
                <span className="flap-right" />
                <span className="flap-bottom" />
              </div>
              <div className="envelope-top-flap" aria-hidden="true">
                <div className="envelope-top-shape">
                  <Crest className="envelope-crest" />
                </div>
              </div>
              <button
                type="button"
                className={`wax-seal${step === 'opening' ? ' is-broken' : ''}`}
                onClick={breakSeal}
                disabled={step !== 'back'}
                aria-label="Break the crimson wax seal to open the letter"
              >
                <WaxSeal />
              </button>
            </div>
          </div>

          <div className="invitation-prompt" aria-live="polite">
            <p className="invitation-prompt-pill">
              {step === 'front' && 'Click envelope to turn over'}
              {step === 'back' && 'Click the wax seal to break'}
              {step === 'opening' && 'Unfolding your invitation…'}
              {step === 'letter' && 'Your invitation has been opened'}
            </p>
            {step !== 'letter' && (
              <p>
                {step === 'front' && 'Addressed to you via Owl Post'}
                {step === 'back' && 'Sealed with the Crest of Hogwarts'}
                {step === 'opening' && 'A letter is being prepared for you'}
              </p>
            )}
          </div>

          <button
            type="button"
            className="invitation-skip"
            onClick={skipInvitation}
          >
            Skip introduction and go straight to the Great Hall{' '}
            <span aria-hidden="true">→</span>
          </button>
        </main>

        <section
          className={`full-letter-stage${isLetterVisible ? ' is-visible' : ''}`}
          aria-label="Hogwarts Acceptance Letter"
          aria-hidden={!isLetterVisible}
        >
          <article className="letter-sheet parchment-aged-letter">
            <div className="letter-crest">
              <Crest />
            </div>

            <div className="letter-address typewriter-text">
              <strong>To:</strong>
              <div>
                <p>Esteemed Visitor,</p>
                <p>The Glowing Screen by the Desk,</p>
                <p>Port 443, The Digital Realm,</p>
                <p>Worldwide Web.</p>
              </div>
            </div>

            <h2 className="letter-salutation emerald-calligraphy">
              Dear Esteemed Visitor,
            </h2>

            <div className="letter-body typewriter-text">
              <p>
                I am pleased to invite you to explore my portfolio of Software
                Development, Networking, and Cybersecurity.
              </p>
              <p>
                Visitors shall be granted full passage to inspect crafted
                applications, resilient network architectures, and
                security-minded systems built with precision.
              </p>
              <p>
                Please give your attention to the projects, technical skills,
                and engineering credentials archived within.
              </p>
              <p>
                I look forward to welcoming you into the Great Hall of my
                digital domain.
              </p>
            </div>

            <div className="letter-signature">
              <p className="typewriter-text">
                Draco Dormiens Nunquam Titillandus
              </p>
              <p className="typewriter-text">Sincerely,</p>
              <p className="signature-name emerald-calligraphy">GM Mercullo</p>
              <p className="typewriter-text">
                Software Developer <span>•</span> Network &amp; Security
                Engineer
              </p>
            </div>

            <div className="letter-actions">
              <button
                type="button"
                className="great-hall-button"
                onClick={enterPortfolio}
              >
                Accept the Invitation
              </button>
              <button
                type="button"
                className="replay-envelope-button"
                onClick={replayEnvelope}
              >
                <span aria-hidden="true">↻</span> Replay the Envelope
              </button>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

const Crest: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 120 132"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M22 18 Q60 5 98 18 L93 28 Q60 18 27 28 Z"
      fill="#efe2c4"
      stroke="currentColor"
      strokeWidth="2"
    />
    <text
      x="60"
      y="21"
      textAnchor="middle"
      fill="currentColor"
      fontFamily="Cinzel, serif"
      fontSize="7"
      fontWeight="800"
      letterSpacing="1.2"
    >
      HOGWARTS
    </text>
    <path
      d="M34 30 60 25 86 30 V70 C86 91 73 104 60 112 47 104 34 91 34 70 Z"
      fill="#efe2c4"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <path d="M60 27 V107 M35 68 H85" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M42 42c8-8 15 1 8 9l-7 5-4-7zM69 43c11-5 12 6 2 9s-4 12 7 9M41 78c8-6 15 0 14 8l-9 5-7-5zM72 77l10 5-8 5 4 9-10-4-7 5 2-10-5-5z"
      fill="currentColor"
    />
    <rect
      x="51"
      y="58"
      width="18"
      height="21"
      rx="2"
      fill="#f7eed8"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <text
      x="60"
      y="74"
      textAnchor="middle"
      fill="currentColor"
      fontFamily="Cinzel, serif"
      fontSize="15"
      fontWeight="900"
    >
      H
    </text>
    <path
      d="M23 97 Q60 126 97 97 L101 106 Q60 137 19 106 Z"
      fill="#efe2c4"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const WaxSeal: React.FC = () => (
  <svg viewBox="0 0 120 120" className="wax-seal-art" aria-hidden="true">
    <defs>
      <radialGradient id="invitation-wax-body" cx="38%" cy="32%" r="68%">
        <stop offset="0%" stopColor="#c9222c" />
        <stop offset="48%" stopColor="#961119" />
        <stop offset="85%" stopColor="#69080e" />
        <stop offset="100%" stopColor="#470408" />
      </radialGradient>
      <radialGradient id="invitation-wax-rim" cx="65%" cy="70%" r="65%">
        <stop offset="0%" stopColor="#b81a24" />
        <stop offset="100%" stopColor="#5c060b" />
      </radialGradient>
    </defs>
    <path
      d="M60 6C73 5 86 11 96 19c10 8 19 20 18 34-1 13 3 26-5 38s-21 21-35 23-28 1-40-6S11 90 9 76 8 47 15 34 34 12 47 8c5-2 9-2 13-2Z"
      fill="url(#invitation-wax-body)"
      stroke="#470408"
      strokeWidth="1.5"
    />
    <path
      d="M24 28c10-12 26-17 42-15s29 10 36 23"
      stroke="rgba(255,175,180,.38)"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle
      cx="60"
      cy="60"
      r="37"
      fill="url(#invitation-wax-rim)"
      stroke="#4d0509"
      strokeWidth="2.5"
    />
    <circle
      cx="60"
      cy="60"
      r="33"
      fill="none"
      stroke="rgba(255,140,148,.24)"
      strokeWidth="1.2"
    />
    <path
      d="M44 41 60 36l16 5v22c0 13-8 21-16 26-8-5-16-13-16-26Z"
      fill="none"
      stroke="#450307"
      strokeWidth="2.2"
    />
    <text
      x="60"
      y="70"
      textAnchor="middle"
      fill="#470408"
      fontFamily="Cinzel, serif"
      fontSize="28"
      fontWeight="900"
    >
      H
    </text>
  </svg>
);
