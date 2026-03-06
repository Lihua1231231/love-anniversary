import { motion } from 'framer-motion';
import { weeklyHeatmap, weekDayLabels } from '../data/mockData';

const maxVal = Math.max(...weeklyHeatmap.flat());

function getColor(value: number): string {
  if (value === 0) return 'rgba(255, 240, 245, 0.4)';
  const intensity = value / maxVal;
  if (intensity < 0.15) return 'rgba(255, 218, 221, 0.6)';
  if (intensity < 0.3) return 'rgba(255, 182, 193, 0.7)';
  if (intensity < 0.5) return 'rgba(255, 145, 164, 0.8)';
  if (intensity < 0.7) return 'rgba(255, 105, 180, 0.85)';
  return 'rgba(229, 85, 138, 0.9)';
}

export default function WeeklyHeatmap() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-pink-50/20 to-cream" />
      <div className="absolute bottom-20 -right-10 w-40 h-40 rounded-full bg-pink-200/15 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="relative text-center mb-12"
      >
        <p className="text-pink-400 text-sm tracking-[0.2em] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          WEEKLY RHYTHM
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-pink-600">每周聊天热力图</h2>
        <p className="text-pink-400/60 text-sm mt-3 max-w-md mx-auto">
          颜色越深 = 聊得越多，看看我们最活跃的时刻
        </p>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-4" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl mx-auto"
      >
        <div
          className="rounded-2xl p-4 md:p-8 overflow-x-auto"
          style={{
            background: 'rgba(255, 240, 245, 0.6)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(255, 182, 193, 0.15)',
            border: '1px solid rgba(255, 182, 193, 0.2)',
          }}
        >
          {/* Hour labels */}
          <div className="flex items-center mb-1">
            <div className="w-8 md:w-12 shrink-0" />
            <div className="flex-1 grid gap-px" style={{ gridTemplateColumns: 'repeat(24, 1fr)' }}>
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="text-center">
                  <span className="text-[8px] md:text-[10px] text-pink-400/50">
                    {i % 3 === 0 ? `${i}` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Heatmap rows */}
          {weeklyHeatmap.map((row, dayIndex) => (
            <motion.div
              key={dayIndex}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: dayIndex * 0.05 }}
              className="flex items-center mb-px"
            >
              <div className="w-8 md:w-12 shrink-0 text-right pr-2">
                <span className="text-[10px] md:text-xs text-pink-500 font-medium">
                  {weekDayLabels[dayIndex]}
                </span>
              </div>
              <div className="flex-1 grid gap-px" style={{ gridTemplateColumns: 'repeat(24, 1fr)' }}>
                {row.map((value, hourIndex) => (
                  <div
                    key={hourIndex}
                    className="aspect-square rounded-sm md:rounded transition-transform hover:scale-150 hover:z-10 relative group"
                    style={{ backgroundColor: getColor(value) }}
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-20 pointer-events-none">
                      <div className="bg-white/95 rounded-lg px-2 py-1 shadow-lg text-[10px] text-pink-600 whitespace-nowrap">
                        {weekDayLabels[dayIndex]} {hourIndex}:00 — {value}条
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Legend */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="text-[10px] text-pink-400/60">少</span>
            {['rgba(255,240,245,0.4)', 'rgba(255,218,221,0.6)', 'rgba(255,182,193,0.7)', 'rgba(255,145,164,0.8)', 'rgba(255,105,180,0.85)', 'rgba(229,85,138,0.9)'].map((c, i) => (
              <div key={i} className="w-3 h-3 md:w-4 md:h-4 rounded-sm" style={{ backgroundColor: c }} />
            ))}
            <span className="text-[10px] text-pink-400/60">多</span>
          </div>

          {/* Insight */}
          <p className="text-center text-pink-400/50 text-xs mt-4 italic">
            周日深夜是我们的聊天巅峰 — 1,141条消息在23:00
          </p>
        </div>
      </motion.div>
    </section>
  );
}
