import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChefHat, Sparkles } from 'lucide-react';
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
          {/* Decorative icons */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-pink-300" />
            <ChefHat className="w-6 h-6 text-pink-400" />
            <Sparkles className="w-4 h-4 text-pink-300" />
          </div>

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
