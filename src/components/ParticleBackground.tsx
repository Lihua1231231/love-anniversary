import { useState, useEffect } from 'react';
import Particles from '@tsparticles/react';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ParticleBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: false,
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: { value: typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 30, density: { enable: true } },
          color: { value: ['#FFB6C1', '#FF69B4', '#FADADD', '#F8E8EE'] },
          shape: {
            type: 'emoji',
            options: {
              emoji: {
                value: ['💗', '💕', '🩷', '✨'],
              },
            },
          },
          opacity: {
            value: { min: 0.3, max: 0.7 },
            animation: { enable: true, speed: 0.5 },
          },
          size: {
            value: { min: 6, max: 16 },
            animation: { enable: true, speed: 2 },
          },
          move: {
            enable: true,
            speed: { min: 0.5, max: 1.5 },
            direction: 'bottom',
            outModes: { default: 'out', top: 'out', bottom: 'out' },
            drift: { min: -0.5, max: 0.5 },
          },
          rotate: {
            value: { min: 0, max: 360 },
            animation: { enable: true, speed: 3 },
          },
          wobble: {
            enable: true,
            distance: 15,
            speed: 3,
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-0"
    />
  );
}
