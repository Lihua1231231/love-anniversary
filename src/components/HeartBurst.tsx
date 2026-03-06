import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const colors = ['#FF69B4', '#FFB6C1', '#FF91A4', '#FADADD', '#E5558A'];

let particleId = 0;

export function useHeartBurst() {
  const [particles, setParticles] = useState<HeartParticle[]>([]);

  const burst = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newParticles: HeartParticle[] = Array.from({ length: 5 }, () => ({
      id: particleId++,
      x: centerX + (Math.random() - 0.5) * 20,
      y: centerY,
      size: 10 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
    }, 1000);
  }, []);

  return { particles, burst };
}

export default function HeartBurst({ particles }: { particles: HeartParticle[] }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              x: p.x,
              y: p.y,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              x: p.x + (Math.random() - 0.5) * 80,
              y: p.y - 60 - Math.random() * 60,
              scale: 1,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute"
            style={{ fontSize: p.size }}
          >
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 16 14"
              fill="none"
            >
              <path
                d="M8 14s-5.5-3.5-7-7C-0.5 3.5 1.5 0 4.5 0 6 0 7.5 1 8 2.5 8.5 1 10 0 11.5 0c3 0 5 3.5 3.5 7-1.5 3.5-7 7-7 7z"
                fill={p.color}
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
