import { motion } from 'framer-motion';
import { Heart, Lock, Star } from 'lucide-react';
import type { MenuItem } from '../data/menuData';

interface MenuCardProps {
  item: MenuItem;
  index: number;
  isSelected: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

const rotations = [-1.5, 1.2, -0.8, 1.8, -1.2, 0.8, -2, 1.5];

// Different tape colors for variety
const tapeColors = [
  'rgba(255, 182, 193, 0.7)',
  'rgba(255, 218, 185, 0.7)',
  'rgba(221, 182, 255, 0.65)',
  'rgba(182, 225, 255, 0.65)',
  'rgba(255, 228, 181, 0.7)',
  'rgba(200, 255, 200, 0.6)',
];

// Different tape rotations
const tapeRotations = [-5, 3, -2, 4, -3, 2];

export default function MenuCard({ item, index, isSelected, onToggle }: MenuCardProps) {
  const rotation = rotations[index % rotations.length];
  const isLocked = item.locked;
  const tapeColor = tapeColors[index % tapeColors.length];
  const tapeRotation = tapeRotations[index % tapeRotations.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={isLocked ? {} : { scale: 1.03, rotate: 0 }}
      className="relative"
    >
      {/* Washi tape decoration on top */}
      {!isLocked && (
        <div
          className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-20 w-16 h-5 rounded-sm"
          style={{
            background: tapeColor,
            transform: `translateX(-50%) rotate(${tapeRotation}deg)`,
            backdropFilter: 'blur(2px)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        />
      )}

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: isLocked ? 'rgba(240, 235, 238, 0.85)' : 'rgba(255, 255, 255, 0.9)',
          boxShadow: isSelected
            ? '0 6px 25px rgba(255, 105, 180, 0.35)'
            : '0 4px 20px rgba(255, 182, 193, 0.18)',
          border: isSelected
            ? '2px solid rgba(255, 105, 180, 0.5)'
            : `2px dashed ${isLocked ? 'rgba(200, 190, 195, 0.35)' : 'rgba(255, 182, 193, 0.35)'}`,
          transition: 'box-shadow 0.3s, border 0.3s',
        }}
      >
        {/* Image */}
        <div className="relative h-36 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className={`w-full h-full object-cover ${isLocked ? 'grayscale opacity-50' : ''}`}
            loading="lazy"
          />

          {/* Recommended badge */}
          {item.recommended && !isLocked && (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full pl-1.5 pr-2.5 py-1 shadow-sm">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-[10px] font-semibold text-amber-600">老板推荐</span>
            </div>
          )}

          {/* Lock overlay */}
          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
                <Lock className="w-4 h-4 text-pink-400" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3.5">
          <h4 className={`text-base font-semibold mb-0.5 ${isLocked ? 'text-pink-400/60' : 'text-pink-600'}`}>
            {item.name}
          </h4>
          {item.description && (
            <p className={`text-xs mb-2.5 ${isLocked ? 'text-pink-300/50' : 'text-pink-400/60'}`}>
              {item.description}
            </p>
          )}

          {isLocked ? (
            <div className="mt-2 py-2 rounded-xl text-xs text-center text-pink-400/60 bg-pink-50/50 border border-dashed border-pink-200/40">
              努力学习中...
            </div>
          ) : (
            <>
              {/* Price */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-pink-500">¥0</span>
                  <span className="text-xs text-pink-300 line-through">¥{item.fakePrice}</span>
                </div>
              </div>

              {/* Add button */}
              <motion.button
                onClick={onToggle}
                whileTap={{ scale: 0.9 }}
                className={`w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-md'
                    : 'bg-pink-50 text-pink-500 hover:bg-pink-100'
                }`}
                style={{
                  boxShadow: isSelected ? '0 3px 12px rgba(255, 105, 180, 0.3)' : undefined,
                }}
              >
                <Heart
                  className={`w-3.5 h-3.5 transition-all ${isSelected ? 'fill-white' : ''}`}
                />
                {isSelected ? '已加入!' : '想吃!'}
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Pin decoration for locked items */}
      {isLocked && (
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 z-20">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 shadow-md flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white/60" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
