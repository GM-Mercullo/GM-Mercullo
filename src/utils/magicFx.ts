import confetti from 'canvas-confetti';

export const LIBRARY_SPARK_COLORS = ['#702C38', '#B49A62', '#F4E9C8', '#526746', '#8CCBFF', '#E8D9AE'];

export function triggerLibrarySparks(origin?: { x: number; y: number }) {
  confetti({
    particleCount: 35,
    spread: 55,
    origin: origin || { y: 0.7 },
    colors: LIBRARY_SPARK_COLORS,
    ticks: 160,
    gravity: 0.85,
    decay: 0.94,
    startVelocity: 24,
    shapes: ['circle', 'star'],
    scalar: 0.85
  });
}

export function triggerGrandCelebration() {
  const count = 180;
  const defaults = {
    origin: { y: 0.7 },
    colors: LIBRARY_SPARK_COLORS
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 50,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
