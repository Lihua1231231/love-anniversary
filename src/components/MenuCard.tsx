import { motion } from 'framer-motion';
import { Heart, Lock } from 'lucide-react';
import type { MenuItem } from '../data/menuData';

interface MenuCardProps {
  item: MenuItem;
  index: number;
  isSelected: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

// Each card gets a slightly different rotation for the "sticker" effect
const rotations = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 1.8];

export default function MenuCard({ item, index, isSelected, onToggle }: MenuCardProps) {
  const rotation = rotations[index % rotations.length];
  const isLocked = item.locked;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={isLocked ? {} : { scale: 1.03, rotate: 0 }}
      className="relative"
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: isLocked ? 'rgba(240, 235, 238, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 4px 20px rgba(255, 182, 193, 0.2)',
          border: `2px dashed ${isLocked ? 'rgba(200, 190, 195, 0.4)' : 'rgba(255, 182, 193, 0.4)'}`,
        }}
      >
        {/* Image */}
        <div className="relative h-32 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className={`w-full h-full object-cover ${isLocked ? 'grayscale opacity-50' : ''}`}
            loading="lazy"
          />
          {/* Lock overlay */}
          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                <Lock className="w-4 h-4 text-pink-400" />
              </div>
            </div>
          )}
          {/* Tape decoration on top */}
          {!isLocked && (
            <div
              className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-4 rounded-sm opacity-60"
              style={{
                background: 'linear-gradient(135deg, #FADADD, #FFE4E9)',
                transform: 'translateX(-50%) rotate(-3deg)',
              }}
            />
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <h4 className={`text-base font-semibold mb-1 ${isLocked ? 'text-pink-400/60' : 'text-pink-600'}`}>
            {item.name}
          </h4>
          {item.description && (
            <p className={`text-xs mb-2 ${isLocked ? 'text-pink-300/50' : 'text-pink-400/70'}`}>
              {item.description}
            </p>
          )}

          {isLocked ? (
            /* Locked state */
            <div className="mt-2 py-2 rounded-xl text-xs text-center text-pink-400/60 bg-pink-50/50 border border-dashed border-pink-200/40">
              努力学习中...
            </div>
          ) : (
            <>
              {/* Price */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-pink-500">¥0</span>
                <span className="text-xs text-pink-300 line-through">¥{item.fakePrice}</span>
              </div>

              {/* Add button */}
              <motion.button
                onClick={onToggle}
                whileTap={{ scale: 0.9 }}
                className={`w-full py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 transition-colors ${
                  isSelected
                    ? 'bg-pink-500 text-white'
                    : 'bg-pink-50 text-pink-500 hover:bg-pink-100'
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${isSelected ? 'fill-white' : ''}`}
                />
                {isSelected ? '已加入!' : '想吃!'}
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Hand-drawn corner doodle */}
      {!isLocked && (
        <svg
          className="absolute -top-1 -right-1 w-6 h-6 text-pink-300/50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2l2 4 4 1-3 3 1 5-4-2-4 2 1-5-3-3 4-1z" />
        </svg>
      )}
    </motion.div>
  );
}
