import { motion } from 'framer-motion';
import { nicknameData } from '../data/mockData';

const cardColors = [
  'rgba(255, 182, 193, 0.15)',
  'rgba(255, 218, 221, 0.2)',
  'rgba(248, 232, 238, 0.25)',
  'rgba(255, 145, 164, 0.12)',
  'rgba(212, 175, 55, 0.1)',
  'rgba(229, 85, 138, 0.1)',
];

export default function NicknameWall() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/20 via-cream to-pink-50/30" />
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-pink-200/15 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="relative text-center mb-12"
      >
        <p className="text-pink-400 text-sm tracking-[0.2em] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          PET NAMES
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-pink-600">专属昵称档案</h2>
        <p className="text-pink-400/60 text-sm mt-3 max-w-md mx-auto">
          我们给彼此起的每一个名字，都是爱的证据
        </p>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-4" />
      </motion.div>

      <div className="relative max-w-3xl mx-auto flex flex-wrap justify-center gap-3 md:gap-4">
        {nicknameData.map((nick, index) => {
          const size = Math.max(0.85, Math.min(1.3, nick.count / 40));
          return (
            <motion.div
              key={nick.name}
              initial={{ opacity: 0, scale: 0, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.5, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="relative rounded-2xl px-4 py-3 md:px-5 md:py-3.5 cursor-default"
              style={{
                background: cardColors[index % cardColors.length],
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 182, 193, 0.2)',
                boxShadow: '0 4px 16px rgba(255, 182, 193, 0.1)',
                transform: `scale(${size})`,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{nick.emoji}</span>
                <span className="text-pink-600 font-semibold text-sm md:text-base">{nick.name}</span>
              </div>
              <p className="text-pink-400/60 text-xs mt-1 text-center">{nick.count} 次</p>
            </motion.div>
          );
        })}
      </div>

      {/* Fun insight */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="relative text-center text-pink-400/50 text-xs mt-8 italic max-w-md mx-auto"
      >
        "公主" 出现了42次，你就是我的公主呀 👑
      </motion.p>
    </section>
  );
}
