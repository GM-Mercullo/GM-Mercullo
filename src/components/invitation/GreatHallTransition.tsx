import React, { useCallback, useEffect, useRef, useState } from 'react';
import './GreatHallTransition.css';

interface GreatHallTransitionProps {
  onDissolveComplete: () => void;
  onComplete: () => void;
}

const LETTER_FADE_MS = 400;
const VIDEO_FADE_MS = 700;
const BYPASS_FADE_MS = 400;
const REVEAL_AT_SECONDS = 8.6;

export const GreatHallTransition: React.FC<GreatHallTransitionProps> = ({
  onDissolveComplete,
  onComplete,
}) => {
  const [reducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [isFading, setIsFading] = useState(false);
  const [fadeDuration, setFadeDuration] = useState(VIDEO_FADE_MS);
  const completed = useRef(false);
  const completionTimer = useRef<number | null>(null);
  const skipButton = useRef<HTMLButtonElement | null>(null);

  const finish = useCallback(
    (duration: number) => {
      if (completed.current) return;
      completed.current = true;
      setFadeDuration(duration);
      setIsFading(true);
      if (completionTimer.current !== null) {
        window.clearTimeout(completionTimer.current);
      }
      completionTimer.current = window.setTimeout(onComplete, duration);
    },
    [onComplete],
  );

  useEffect(() => {
    skipButton.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finish(BYPASS_FADE_MS);
    };
    window.addEventListener('keydown', handleKeyDown);

    const dissolveTimer = window.setTimeout(
      onDissolveComplete,
      LETTER_FADE_MS,
    );

    if (reducedMotion) {
      setFadeDuration(BYPASS_FADE_MS);
      setIsFading(true);
      completionTimer.current = window.setTimeout(
        onComplete,
        BYPASS_FADE_MS,
      );
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(dissolveTimer);
      if (completionTimer.current !== null) {
        window.clearTimeout(completionTimer.current);
      }
    };
  }, [finish, onComplete, onDissolveComplete, reducedMotion]);

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    if (event.currentTarget.currentTime >= REVEAL_AT_SECONDS) {
      finish(VIDEO_FADE_MS);
    }
  };

  const handleVideoError = () => {
    console.error(
      'Unable to load the Great Hall transition video at /great-hall-transition.mp4; bypassing the video.',
    );
    finish(BYPASS_FADE_MS);
  };

  return (
    <div
      className={`great-hall-transition${isFading ? ' is-fading' : ''}`}
      style={{ transitionDuration: `${fadeDuration}ms` }}
      role="dialog"
      aria-modal="true"
      aria-label="Great Hall transition"
    >
      {!reducedMotion && (
        <video
          className="great-hall-transition-video"
          src="/great-hall-transition.mp4"
          autoPlay
          muted
          playsInline
          aria-hidden="true"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => finish(VIDEO_FADE_MS)}
          onError={handleVideoError}
        />
      )}
      <button
        ref={skipButton}
        type="button"
        className="great-hall-transition-skip"
        onClick={() => finish(BYPASS_FADE_MS)}
      >
        Skip
      </button>
    </div>
  );
};
