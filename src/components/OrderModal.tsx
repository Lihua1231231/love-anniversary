import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import type { MenuItem } from '../data/menuData';

interface OrderModalProps {
  isOpen: boolean;
  items: MenuItem[];
  onClose: () => void;
}

// Confetti particle component
function Confetti() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1.5 + Math.random() * 1,
    color: ['#FF69B4', '#FFB6C1', '#FADADD', '#D4AF37', '#F8E8EE'][i % 5],
    size: 4 + Math.random() * 6,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.x}%`,
            y: '-10%',
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: '110%',
            rotate: 360 + Math.random() * 360,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
          }}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}

export default function OrderModal({ isOpen, items, onClose }: OrderModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center px-6"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 20 }}
            className="relative w-full max-w-sm rounded-3xl p-6 overflow-hidden"
            style={{
              background: 'rgba(255, 245, 248, 0.98)',
              boxShadow: '0 20px 60px rgba(255, 105, 180, 0.3)',
              border: '2px solid rgba(255, 182, 193, 0.3)',
            }}
          >
            {/* Confetti animation */}
            <Confetti />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-400 hover:text-pink-600 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Heart icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{
                  background: 'linear-gradient(135deg, #FF69B4, #FFB6C1)',
                  boxShadow: '0 8px 25px rgba(255, 105, 180, 0.4)',
                }}
              >
                <Heart className="w-7 h-7 text-white fill-white" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-semibold text-pink-600 mb-2"
              >
                收到！马上给你做~
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-pink-400 mb-5"
              >
                你点了 {items.length} 道菜，请稍等哦
              </motion.p>

              {/* Ordered items */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/60 rounded-2xl p-4 max-h-40 overflow-y-auto"
              >
                <div className="space-y-2">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="flex items-center gap-2.5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <span className="text-sm text-pink-600 flex-1 text-left">
                        {item.name}
                      </span>
                      <span className="text-xs text-pink-400">¥0</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Total */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-4 flex items-center justify-between px-2"
              >
                <span className="text-sm text-pink-400">合计</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-pink-300 line-through">
                    ¥{items.reduce((sum, item) => sum + item.fakePrice, 0)}
                  </span>
                  <span className="text-lg font-bold text-pink-500">¥0</span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-xs text-pink-300 mt-3 italic"
              >
                "因为是你，所以免费~"
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
