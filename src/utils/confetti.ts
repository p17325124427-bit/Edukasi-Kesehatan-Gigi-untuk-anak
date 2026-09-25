import confetti from 'canvas-confetti';

export function fireVictoryConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
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
    startVelocity: 55,
    colors: ['#38bdf8', '#fbbf24', '#34d399', '#f43f5e']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#60a5fa', '#f59e0b', '#10b981']
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
    startVelocity: 45
  });
}

export function fireStarBurst(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 40,
    angle: 90,
    spread: 70,
    origin: { x, y },
    colors: ['#facc15', '#38bdf8', '#fb7185', '#4ade80'],
    shapes: ['star', 'circle'],
    scalar: 1.1,
    ticks: 150
  });
}
