import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronUp, ChevronDown, X, Send } from 'lucide-react';
import type { MenuItem } from '../data/menuData';

interface WishlistBarProps {
  items: MenuItem[];
  onRemove: (id: string) => void;
  onOrder: () => void;
}

export default function WishlistBar({ items, onRemove, onOrder }: WishlistBarProps) {
  const [expanded, setExpanded] = useState(false);

  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      {/* Expanded list */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pt-4 pb-2 max-h-60 overflow-y-auto"
              style={{
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(255, 182, 193, 0.2)',
              }}
            >
              <p className="text-xs text-pink-400/60 mb-3 tracking-wider">
                心愿清单
              </p>
              <div className="space-y-2">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center justify-between bg-pink-50/50 rounded-xl px-3 py-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-9 h-9 rounded-lg object-cover"
                      />
                      <span className="text-sm text-pink-700">{item.name}</span>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-pink-300 hover:text-pink-500 hover:bg-pink-100/50 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom bar */}
      <div
        className="px-5 py-3.5 flex items-center justify-between"
        style={{
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 182, 193, 0.15)',
          boxShadow: '0 -4px 20px rgba(255, 182, 193, 0.1)',
        }}
      >
        {/* Left: toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-pink-500"
        >
          <div className="relative">
            <Heart className="w-6 h-6 fill-pink-500" />
            <motion.span
              key={items.length}
              initial={{ scale: 1.4 }}
              animate={{ scale: 1 }}
              className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-pink-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold"
            >
              {items.length}
            </motion.span>
          </div>
          <span className="text-sm font-medium">心愿清单</span>
          {expanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronUp className="w-4 h-4" />
          )}
        </button>

        {/* Right: order button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onOrder}
          className="flex items-center gap-1.5 text-white px-5 py-2.5 rounded-full text-sm font-medium"
          style={{
            background: 'linear-gradient(135deg, #FF69B4, #FF91A4)',
            boxShadow: '0 3px 12px rgba(255, 105, 180, 0.35)',
          }}
        >
          <Send className="w-3.5 h-3.5" />
          下单
        </motion.button>
      </div>
    </motion.div>
  );
}
