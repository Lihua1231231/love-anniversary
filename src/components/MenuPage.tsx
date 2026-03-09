import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { menuItems, categories } from '../data/menuData';
import type { MenuItem } from '../data/menuData';
import MenuCard from './MenuCard';
import WishlistBar from './WishlistBar';
import OrderModal from './OrderModal';
import HeartBurst, { useHeartBurst } from './HeartBurst';

interface MenuPageProps {
  onBack: () => void;
}

export default function MenuPage({ onBack }: MenuPageProps) {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [wishlist, setWishlist] = useState<MenuItem[]>([]);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const { particles, burst } = useHeartBurst();

  const filteredItems =
    activeCategory === '全部'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const toggleItem = useCallback(
    (item: MenuItem, e: React.MouseEvent) => {
      if (item.locked) return; // Can't select locked items
      setWishlist((prev) => {
        const exists = prev.find((i) => i.id === item.id);
        if (exists) return prev.filter((i) => i.id !== item.id);
        burst(e);
        return [...prev, item];
      });
    },
    [burst],
  );

  const removeItem = useCallback((id: string) => {
    setWishlist((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const handleOrder = useCallback(() => {
    setOrderModalOpen(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{
        background: 'linear-gradient(180deg, #FFF5F8 0%, #FFFAF5 30%, #FFF0F5 100%)',
      }}
    >
      {/* Heart burst overlay */}
      <HeartBurst particles={particles} />

      {/* Notebook-style background lines */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 23px, #FF69B4 23px, #FF69B4 24px)',
        }}
      />

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onClick={onBack}
        className="fixed top-4 left-4 z-[60] w-10 h-10 rounded-full flex items-center justify-center text-pink-500 hover:text-pink-600 transition-colors"
        style={{
          background: 'rgba(255, 240, 245, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 10px rgba(255, 182, 193, 0.3)',
        }}
      >
        <ArrowLeft className="w-5 h-5" />
      </motion.button>

      {/* Content */}
      <div className="relative px-4 pt-16 pb-28 max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          {/* Cooking scene illustration */}
          <svg className="mx-auto mb-4" width="200" height="100" viewBox="0 0 200 100" fill="none">
            {/* Steam lines */}
            <motion.path d="M70 35 Q72 25 68 15" stroke="#FFB6C1" strokeWidth="1.5" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }} />
            <motion.path d="M85 30 Q87 20 83 10" stroke="#FADADD" strokeWidth="1.5" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
            <motion.path d="M100 33 Q102 23 98 13" stroke="#FFB6C1" strokeWidth="1.5" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
            {/* Pan */}
            <ellipse cx="85" cy="55" rx="35" ry="12" fill="#FF91A4" opacity="0.15" />
            <path d="M50 50 Q55 70 85 70 Q115 70 120 50" stroke="#FF69B4" strokeWidth="2.5" fill="rgba(255,182,193,0.2)" strokeLinecap="round" />
            <line x1="120" y1="52" x2="155" y2="45" stroke="#FF69B4" strokeWidth="3" strokeLinecap="round" />
            {/* Heart above pan */}
            <motion.path d="M85 42 C85 38 80 35 80 39 C80 42 85 46 85 46 C85 46 90 42 90 39 C90 35 85 38 85 42Z"
              fill="#FF69B4" opacity="0.6"
              animate={{ y: [0, -3, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }} />
            {/* Sparkles */}
            <circle cx="60" cy="38" r="1.5" fill="#D4AF37" opacity="0.5" />
            <circle cx="110" cy="35" r="1.5" fill="#D4AF37" opacity="0.5" />
            <circle cx="140" cy="42" r="1" fill="#FFB6C1" opacity="0.4" />
            {/* Plate left */}
            <ellipse cx="25" cy="75" rx="18" ry="7" fill="rgba(255,182,193,0.15)" stroke="#FFB6C1" strokeWidth="1" />
            {/* Plate right */}
            <ellipse cx="160" cy="78" rx="15" ry="6" fill="rgba(255,182,193,0.15)" stroke="#FFB6C1" strokeWidth="1" />
          </svg>

          <h1 className="text-2xl font-semibold text-pink-600 mb-1">
            金涛的私人餐厅
          </h1>
          <p className="text-sm text-pink-400/70 italic">
            "只为你一人营业"
          </p>

          {/* Hand-drawn underline */}
          <svg className="mx-auto mt-3" width="120" height="8" viewBox="0 0 120 8">
            <path
              d="M2 5 Q30 2 60 5 Q90 8 118 4"
              stroke="#FFB6C1"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Category tabs - sticker style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'bg-white/70 text-pink-400 hover:bg-pink-50'
              }`}
              style={{
                boxShadow:
                  activeCategory === cat
                    ? '0 3px 12px rgba(255, 105, 180, 0.3)'
                    : '0 2px 8px rgba(255, 182, 193, 0.1)',
                border: activeCategory === cat ? 'none' : '1.5px dashed rgba(255, 182, 193, 0.4)',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Menu grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map((item, index) => (
            <MenuCard
              key={item.id}
              item={item}
              index={index}
              isSelected={wishlist.some((i) => i.id === item.id)}
              onToggle={(e) => toggleItem(item, e)}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-pink-300 text-sm">这个分类还没有菜品哦~</p>
          </div>
        )}
      </div>

      {/* Wishlist bar */}
      <WishlistBar items={wishlist} onRemove={removeItem} onOrder={handleOrder} />

      {/* Order modal */}
      <OrderModal
        isOpen={orderModalOpen}
        items={wishlist}
        onClose={() => setOrderModalOpen(false)}
      />
    </motion.div>
  );
}
