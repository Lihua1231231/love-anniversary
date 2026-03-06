import { motion } from 'framer-motion';
import { Trophy, Moon, Zap, Clock, Heart, Calendar } from 'lucide-react';
import { chatRecords } from '../data/mockData';

const records = [
  {
    icon: Calendar,
    title: '最长聊天日',
    value: chatRecords.longestChatDay.date,
    detail: chatRecords.longestChatDay.description,
    color: '#FF69B4',
    bgColor: 'rgba(255, 105, 180, 0.08)',
  },
  {
    icon: Zap,
    title: '最密集10分钟',
    value: `${chatRecords.densestWindow.count} 条`,
    detail: `${chatRecords.densestWindow.time} — 打字速度拉满`,
    color: '#E5558A',
    bgColor: 'rgba(229, 85, 138, 0.08)',
  },
  {
    icon: Moon,
    title: '最晚熬夜',
    value: chatRecords.latestNight.time,
    detail: `${chatRecords.latestNight.date} — "${chatRecords.latestNight.content}"`,
    color: '#9B6B9E',
    bgColor: 'rgba(155, 107, 158, 0.08)',
  },
  {
    icon: Clock,
    title: '平均回复速度',
    value: `${chatRecords.avgReplyTime} 秒`,
    detail: '秒回认证！消息从不过夜',
    color: '#FFB6C1',
    bgColor: 'rgba(255, 182, 193, 0.1)',
  },
  {
    icon: Trophy,
    title: '最长单条消息',
    value: `${chatRecords.longestMessage.length} 字`,
    detail: `${chatRecords.longestMessage.date} — 有好多话想对你说`,
    color: '#D4AF37',
    bgColor: 'rgba(212, 175, 55, 0.08)',
  },
];

const sweetWords = Object.entries(chatRecords.sweetWordsTotal);

export default function ChatRecords() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/20 via-cream to-pink-50/20" />
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-pink-200/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="relative text-center mb-12"
      >
        <p className="text-pink-400 text-sm tracking-[0.2em] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          CHAT RECORDS
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-pink-600">聊天之最</h2>
        <p className="text-pink-400/60 text-sm mt-3 max-w-md mx-auto">
          那些藏在数据里的小小极致
        </p>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-4" />
      </motion.div>

      {/* Record cards */}
      <div className="relative max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {records.map((record, index) => {
          const Icon = record.icon;
          return (
            <motion.div
              key={record.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl p-5 md:p-6"
              style={{
                background: 'rgba(255, 240, 245, 0.6)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 20px rgba(255, 182, 193, 0.12)',
                border: '1px solid rgba(255, 182, 193, 0.15)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: record.bgColor }}
                >
                  <Icon className="w-5 h-5" style={{ color: record.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-pink-400/60 mb-1">{record.title}</p>
                  <p className="text-xl md:text-2xl font-bold text-pink-600 mb-1">{record.value}</p>
                  <p className="text-xs text-pink-400/70 leading-relaxed">{record.detail}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sweet words bar chart */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="relative max-w-2xl mx-auto"
      >
        <div
          className="rounded-2xl p-5 md:p-8"
          style={{
            background: 'rgba(255, 240, 245, 0.6)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(255, 182, 193, 0.15)',
            border: '1px solid rgba(255, 182, 193, 0.2)',
          }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-4 h-4 text-pink-400" />
            <h3 className="text-lg font-semibold text-pink-600">甜蜜词频统计</h3>
          </div>

          <div className="space-y-3">
            {sweetWords.map(([word, count], index) => {
              const maxCount = sweetWords[0][1] as number;
              const width = ((count as number) / maxCount) * 100;
              return (
                <motion.div
                  key={word}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-14 text-right text-sm text-pink-500 font-medium shrink-0">{word}</span>
                  <div className="flex-1 h-6 rounded-full bg-pink-50/80 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${width}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.05 + 0.3 }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, #FFB6C1, #FF69B4)`,
                        opacity: 0.6 + (width / 100) * 0.4,
                      }}
                    />
                  </div>
                  <span className="text-xs text-pink-400/70 w-10 shrink-0">{count}次</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
