import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-pink-100 to-pink-200" />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #FF69B4 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Particle effect */}
      <ParticleBackground />

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-6">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto mb-6 md:mb-8"
        />

        {/* Small top text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-pink-400 text-sm tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Our First Month
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-3xl md:text-6xl lg:text-7xl font-semibold text-pink-600 mb-4 md:mb-6"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          致我们的第一个月
        </motion.h1>

        {/* Date subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center justify-center gap-2 md:gap-4 mb-6 md:mb-8"
        >
          <span className="w-12 h-px bg-pink-300" />
          <p
            className="text-sm md:text-xl text-pink-400 tracking-widest"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            2026.02.10 — 2026.03.10
          </p>
          <span className="w-12 h-px bg-pink-300" />
        </motion.div>

        {/* Romantic quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-pink-400/80 text-base md:text-lg italic max-w-md mx-auto"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          "遇见你，是所有美好的开始"
        </motion.p>

        {/* Decorative line bottom */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.6, ease: 'easeOut' }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto mt-8"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-pink-400 text-xs tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-pink-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
