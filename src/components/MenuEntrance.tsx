import { motion } from 'framer-motion';
import { UtensilsCrossed } from 'lucide-react';

export default function MenuEntrance({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="py-20 md:py-28 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-pink-50/30 to-cream" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="relative text-center"
      >
        <p className="text-pink-400 text-sm tracking-[0.2em] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          SURPRISE
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-pink-600 mb-8">
          最后还有一个小惊喜
        </h2>

        <motion.button
          onClick={onOpen}
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 4px 20px rgba(255, 105, 180, 0.3)',
              '0 8px 35px rgba(255, 105, 180, 0.5)',
              '0 4px 20px rgba(255, 105, 180, 0.3)',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #FF69B4, #FFB6C1)',
          }}
        >
          <UtensilsCrossed className="w-5 h-5 text-white" />
          <span className="text-white font-medium tracking-wider">点我看看</span>
        </motion.button>
      </motion.div>
    </section>
  );
}
