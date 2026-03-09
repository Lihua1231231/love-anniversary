import { motion } from 'framer-motion';
import { Heart, Lock } from 'lucide-react';
import type { MenuItem } from '../data/menuData';

interface MenuCardProps {
  item: MenuItem;
  index: number;
  isSelected: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

export default function MenuCard({ item, index, isSelected, onToggle }: MenuCardProps) {
  const isLocked = item.locked;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={isLocked ? {} : { y: -4 }}
      className="relative"
    >
      <div
        className="rounded-2xl overflow-hidden transition-shadow duration-300"
        style={{
          background: isLocked ? 'rgba(248, 244, 246, 0.9)' : '#fff',
          boxShadow: isSelected
            ? '0 8px 28px rgba(255, 105, 180, 0.22)'
            : '0 2px 12px rgba(255, 182, 193, 0.15)',
          border: isSelected
            ? '1.5px solid rgba(255, 105, 180, 0.35)'
            : '1px solid rgba(255, 182, 193, 0.15)',
        }}
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isLocked ? 'grayscale opacity-40 scale-100' : 'hover:scale-105'
            }`}
            loading="lazy"
          />

          {/* Recommended badge */}
          {item.recommended && !isLocked && (
            <div
              className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-full pl-2 pr-2.5 py-1"
              style={{
                background: 'rgba(255, 105, 180, 0.88)',
                backdropFilter: 'blur(4px)',
                boxShadow: '0 2px 8px rgba(255, 105, 180, 0.3)',
              }}
            >
              <Heart className="w-2.5 h-2.5 text-white fill-white" />
              <span className="text-[10px] font-medium text-white tracking-wide">推荐</span>
            </div>
          )}

          {/* Selected check */}
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255, 105, 180, 0.9)',
                boxShadow: '0 2px 8px rgba(255, 105, 180, 0.4)',
              }}
            >
              <Heart className="w-3 h-3 text-white fill-white" />
            </motion.div>
          )}

          {/* Lock overlay */}
          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-pink-50/30">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255, 240, 245, 0.9)',
                  boxShadow: '0 2px 10px rgba(255, 182, 193, 0.2)',
                }}
              >
                <Lock className="w-4 h-4 text-pink-400" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-3.5 py-3">
          <h4 className={`text-[15px] font-semibold leading-snug mb-0.5 ${isLocked ? 'text-pink-400/50' : 'text-pink-700'}`}>
            {item.name}
          </h4>
          {item.description && (
            <p className={`text-xs leading-relaxed mb-3 ${isLocked ? 'text-pink-300/40' : 'text-pink-400/55'}`}>
              {item.description}
            </p>
          )}

          {isLocked ? (
            <div className="py-2 rounded-xl text-xs text-center text-pink-400/50 bg-pink-50/60">
              努力学习中...
            </div>
          ) : (
            <>
              {/* Price */}
              <div className="flex items-baseline gap-1.5 mb-3">
                <span className="text-xl font-bold text-pink-500">¥0</span>
                <span className="text-[11px] text-pink-300/60 line-through">¥{item.fakePrice}</span>
              </div>

              {/* Add button */}
              <motion.button
                onClick={onToggle}
                whileTap={{ scale: 0.93 }}
                className={`w-full py-2.5 rounded-xl text-[13px] font-medium flex items-center justify-center gap-1.5 transition-all duration-200 ${
                  isSelected
                    ? 'text-white'
                    : 'bg-pink-50/80 text-pink-500 hover:bg-pink-100/80'
                }`}
                style={isSelected ? {
                  background: 'linear-gradient(135deg, #FF69B4, #FF91A4)',
                  boxShadow: '0 3px 10px rgba(255, 105, 180, 0.3)',
                } : undefined}
              >
                <Heart className={`w-3.5 h-3.5 ${isSelected ? 'fill-white' : ''}`} />
                {isSelected ? '已加入' : '想吃!'}
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
