import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar,
} from 'recharts';
import { MessageSquare, Smile, Image, Mic, Video } from 'lucide-react';
import { dailyCounts, hourDistribution, messageTypeData, wordCloudData, totalMessages, peakHour } from '../data/mockData';

const typeIcons: Record<string, React.ElementType> = {
  '文字': MessageSquare,
  '表情': Smile,
  '图片/贴纸': Image,
  '语音': Mic,
  '视频': Video,
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

function SectionTitle({ en, zh }: { en: string; zh: string }) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="text-center mb-10 md:mb-16"
    >
      <p className="text-pink-400 text-sm tracking-[0.2em] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
        {en}
      </p>
      <h2 className="text-3xl md:text-4xl font-semibold text-pink-600">{zh}</h2>
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-4" />
    </motion.div>
  );
}

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-4 md:p-8 ${className}`}
      style={{
        background: 'rgba(255, 240, 245, 0.6)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px rgba(255, 182, 193, 0.15)',
        border: '1px solid rgba(255, 182, 193, 0.2)',
      }}
    >
      {children}
    </div>
  );
}

// Custom tooltip for area chart
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl px-4 py-3 text-sm" style={{
        background: 'rgba(255, 240, 245, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 15px rgba(255, 182, 193, 0.3)',
        border: '1px solid rgba(255, 182, 193, 0.3)',
      }}>
        <p className="text-pink-600 font-semibold">{label}</p>
        <p className="text-pink-400">{payload[0].value} 条消息</p>
      </div>
    );
  }
  return null;
}

// 1. Daily message trend
function DailyTrend() {
  // Show every 7th label to avoid crowding
  const tickIndices = dailyCounts.map((_, i) => i).filter(i => i % 7 === 0);

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <GlassCard>
        <h3 className="text-xl font-semibold text-pink-600 mb-2">每日消息量</h3>
        <p className="text-pink-400/70 text-sm mb-6">从相遇到现在，我们的聊天频率一路上升</p>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={dailyCounts}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF69B4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FF69B4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#FADADD" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#FF91A4', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: '#FADADD' }}
              ticks={tickIndices.map(i => dailyCounts[i].date)}
            />
            <YAxis
              tick={{ fill: '#FF91A4', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: '#FADADD' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#FF69B4"
              strokeWidth={2}
              fill="url(#colorCount)"
              dot={false}
              activeDot={{ r: 5, fill: '#FF69B4', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>
    </motion.div>
  );
}

// 2. Word Cloud (CSS-based heart layout)
function WordCloud() {
  const colors = ['#FF69B4', '#FFB6C1', '#FF91A4', '#E5558A', '#D4AF37', '#FADADD'];
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <GlassCard>
        <h3 className="text-xl font-semibold text-pink-600 mb-2">我们最爱说的话</h3>
        <p className="text-pink-400/70 text-sm mb-6">那些反复出现在对话里的词语</p>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 py-4 min-h-[180px] md:min-h-[250px]">
          {wordCloudData.map((word, i) => {
            const size = Math.max(14, Math.min(42, 14 + (word.value / wordCloudData[0].value) * 28));
            const color = colors[i % colors.length];
            return (
              <motion.span
                key={word.text}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.2 }}
                className="inline-block cursor-default transition-transform"
                style={{
                  fontSize: `${size}px`,
                  color,
                  fontWeight: size > 24 ? 600 : 400,
                  opacity: 0.6 + Math.min(word.value / 7406, 1) * 0.4,
                }}
              >
                {word.text}
              </motion.span>
            );
          })}
        </div>
      </GlassCard>
    </motion.div>
  );
}

// 3. Hour distribution
function HourChart() {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <GlassCard>
        <h3 className="text-xl font-semibold text-pink-600 mb-2">聊天时段分布</h3>
        <p className="text-pink-400/70 text-sm mb-6">
          我们最爱在 <span className="text-pink-500 font-semibold">深夜{peakHour}:00</span> 聊天 (夜猫子认证!)
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={hourDistribution}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF69B4" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#FFB6C1" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#FADADD" vertical={false} />
            <XAxis
              dataKey="hour"
              tick={{ fill: '#FF91A4', fontSize: 10 }}
              tickLine={false}
              axisLine={{ stroke: '#FADADD' }}
              tickFormatter={(h: number) => `${h}时`}
              interval={1}
            />
            <YAxis hide />
            <Tooltip
              formatter={(value) => [`${value} 条`, '消息数']}
              contentStyle={{
                background: 'rgba(255, 240, 245, 0.95)',
                border: '1px solid rgba(255, 182, 193, 0.3)',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(255, 182, 193, 0.3)',
              }}
              labelFormatter={(h) => `${h}:00`}
            />
            <Bar dataKey="count" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </motion.div>
  );
}

// 4. Message type pie chart
function MessageTypePie() {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <GlassCard>
        <h3 className="text-xl font-semibold text-pink-600 mb-2">消息类型</h3>
        <p className="text-pink-400/70 text-sm mb-6">我们用各种方式表达着爱意</p>
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={messageTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="85%"
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {messageTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl md:text-2xl font-bold text-pink-600">{totalMessages.toLocaleString()}</span>
              <span className="text-xs text-pink-400">条消息</span>
            </div>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {messageTypeData.map((entry) => {
              const Icon = typeIcons[entry.name];
              return (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${entry.color}30` }}
                  >
                    <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: entry.color }} />
                  </div>
                  <span className="text-xs md:text-sm text-pink-500">{entry.name}</span>
                  <span className="text-xs md:text-sm text-pink-400/70">{entry.value.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function ChatVisualization({ onOpenMenu }: { onOpenMenu?: () => void }) {
  return (
    <section className="py-16 md:py-32 px-4 md:px-6 relative overflow-hidden bg-gradient-to-b from-cream via-pink-50/30 to-cream">
      {/* Decorative blurs */}
      <div className="absolute top-40 -left-20 w-60 h-60 rounded-full bg-pink-200/20 blur-3xl" />
      <div className="absolute bottom-40 -right-20 w-60 h-60 rounded-full bg-pink-100/30 blur-3xl" />

      <SectionTitle en="CHAT ANALYTICS" zh="我们的聊天密码" />

      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        <DailyTrend />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <WordCloud />
          <HourChart />
        </div>
        <MessageTypePie />
      </div>

      {/* Menu entrance */}
      {onOpenMenu && (
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="text-center mt-16"
        >
          <p className="text-pink-400/70 text-sm mb-4 italic">还有一个小惊喜...</p>
          <motion.button
            onClick={onOpenMenu}
            animate={{
              scale: [1, 1.15, 1],
              boxShadow: [
                '0 4px 20px rgba(255, 105, 180, 0.3)',
                '0 8px 30px rgba(255, 105, 180, 0.5)',
                '0 4px 20px rgba(255, 105, 180, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-full cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #FF69B4, #FFB6C1)',
            }}
          >
            <svg width="24" height="22" viewBox="0 0 16 14" fill="none">
              <path
                d="M8 14s-5.5-3.5-7-7C-0.5 3.5 1.5 0 4.5 0 6 0 7.5 1 8 2.5 8.5 1 10 0 11.5 0c3 0 5 3.5 3.5 7-1.5 3.5-7 7-7 7z"
                fill="white"
              />
            </svg>
          </motion.button>
          <p className="text-pink-300 text-xs mt-3 tracking-wider">点我看看</p>
        </motion.div>
      )}
    </section>
  );
}
