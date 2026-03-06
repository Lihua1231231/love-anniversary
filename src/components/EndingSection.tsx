import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const TOGETHER_DATE = new Date(2026, 1, 10); // Feb 10, 2026

function useElapsedTime() {
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function update() {
      const now = new Date();
      const diff = now.getTime() - TOGETHER_DATE.getTime();
      if (diff < 0) {
        setElapsed({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setElapsed({ days, hours, minutes, seconds });
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return elapsed;
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-3xl font-bold text-pink-600"
        style={{
          background: 'rgba(255, 240, 245, 0.7)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(255, 182, 193, 0.2)',
          border: '1px solid rgba(255, 182, 193, 0.3)',
        }}
      >
        <motion.span
          key={value}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </div>
      <span className="text-xs text-pink-400 mt-2 tracking-wider">{label}</span>
    </div>
  );
}

export default function EndingSection() {
  const elapsed = useElapsedTime();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-pink-50 to-pink-100" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-200/15 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pink-100/20 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Decorative heart */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #FF69B4, #FFB6C1)',
              boxShadow: '0 8px 30px rgba(255, 105, 180, 0.4)',
            }}
          >
            <Heart className="w-7 h-7 text-white fill-white" />
          </motion.div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mb-8" />
          <h2
            className="text-2xl md:text-4xl font-semibold text-pink-600 mb-4 leading-relaxed"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            未来的每一天
          </h2>
          <h2
            className="text-2xl md:text-4xl font-semibold text-pink-600 mb-8 leading-relaxed"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            都想和你一起走
          </h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mb-12" />
        </motion.div>

        {/* Timer label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-pink-400 text-xs md:text-sm tracking-[0.15em] md:tracking-[0.2em] mb-4 md:mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          WE HAVE BEEN TOGETHER FOR
        </motion.p>

        {/* Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center justify-center gap-1.5 md:gap-5"
        >
          <TimeBlock value={elapsed.days} label="天" />
          <span className="text-pink-300 text-base md:text-xl font-light mt-[-20px]">:</span>
          <TimeBlock value={elapsed.hours} label="时" />
          <span className="text-pink-300 text-base md:text-xl font-light mt-[-20px]">:</span>
          <TimeBlock value={elapsed.minutes} label="分" />
          <span className="text-pink-300 text-base md:text-xl font-light mt-[-20px]">:</span>
          <TimeBlock value={elapsed.seconds} label="秒" />
        </motion.div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="text-pink-400/60 text-sm mt-10 md:mt-16 italic"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          "The best thing to hold onto in life is each other."
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.3 }}
          className="text-pink-300/50 text-xs mt-8 tracking-widest"
        >
          Made with love, for you.
        </motion.p>
      </div>
    </section>
  );
}
