import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import ChatVisualization from './components/ChatVisualization';
import LoveCurve from './components/LoveCurve';
import FunFacts from './components/FunFacts';
import WeeklyHeatmap from './components/WeeklyHeatmap';
import NicknameWall from './components/NicknameWall';
import ChatRecords from './components/ChatRecords';
import SweetQuotesWall from './components/SweetQuotesWall';
import MenuEntrance from './components/MenuEntrance';
import EndingSection from './components/EndingSection';
import MenuPage from './components/MenuPage';

const isCaidanDomain = window.location.hostname.startsWith('caidan');

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // 子域名 caidan.xiangjintao.top → 直接显示菜单页
  if (isCaidanDomain) {
    return <MenuPage onBack={() => window.location.href = 'https://luoluo.xiangjintao.top'} />;
  }

  return (
    <>
      <main>
        <HeroSection />
        <TimelineSection />
        <ChatVisualization />
        <LoveCurve />
        <FunFacts />
        <WeeklyHeatmap />
        <NicknameWall />
        <ChatRecords />
        <SweetQuotesWall />
        <MenuEntrance onOpen={() => setMenuOpen(true)} />
        <EndingSection />
      </main>

      <AnimatePresence>
        {menuOpen && <MenuPage onBack={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
