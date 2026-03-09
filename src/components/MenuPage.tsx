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
      if (item.locked) return;
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
        background: 'linear-gradient(180deg, #FFF8FA 0%, #FFFAF5 50%, #FFF5F8 100%)',
      }}
    >
      {/* Heart burst overlay */}
      <HeartBurst particles={particles} />

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onClick={onBack}
        className="fixed top-4 left-4 z-[60] w-10 h-10 rounded-full flex items-center justify-center text-pink-500 hover:text-pink-600 transition-colors"
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 12px rgba(255, 182, 193, 0.2)',
        }}
      >
        <ArrowLeft className="w-5 h-5" />
      </motion.button>

      {/* Content */}
      <div className="relative px-5 pt-16 pb-28 max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-10"
        >
          {/* Simplified cooking illustration */}
          <svg className="mx-auto mb-5" width="160" height="80" viewBox="0 0 160 80" fill="none">
            {/* Steam */}
            <motion.path d="M55 28 Q57 18 53 8" stroke="#FFB6C1" strokeWidth="1.5" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0 }} />
            <motion.path d="M72 24 Q74 14 70 4" stroke="#FADADD" strokeWidth="1.5" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: [0, 0.4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.6 }} />
            <motion.path d="M88 26 Q90 16 86 6" stroke="#FFB6C1" strokeWidth="1.5" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }} />
            {/* Pan body */}
            <path d="M35 42 Q40 60 70 60 Q100 60 105 42" stroke="#FF91A4" strokeWidth="2" fill="rgba(255,218,221,0.25)" strokeLinecap="round" />
            {/* Pan handle */}
            <line x1="105" y1="44" x2="140" y2="38" stroke="#FF91A4" strokeWidth="2.5" strokeLinecap="round" />
            {/* Heart */}
            <motion.path d="M70 35 C70 31 65 28 65 32 C65 35 70 39 70 39 C70 39 75 35 75 32 C75 28 70 31 70 35Z"
              fill="#FF69B4" opacity="0.5"
              animate={{ y: [0, -2, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
          </svg>

          <h1 className="text-2xl font-semibold text-pink-600 mb-1.5">
            金涛的私人餐厅
          </h1>
          <p className="text-sm text-pink-400/60">
            只为你一人营业
          </p>

          {/* Subtle divider */}
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto mt-5" />
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 overflow-x-auto pb-4 mb-5 no-scrollbar"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-pink-500 text-white'
                  : 'bg-white/80 text-pink-400 hover:bg-pink-50'
              }`}
              style={{
                boxShadow: activeCategory === cat
                  ? '0 2px 10px rgba(255, 105, 180, 0.3)'
                  : '0 1px 4px rgba(255, 182, 193, 0.12)',
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
          <div className="text-center py-16">
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
