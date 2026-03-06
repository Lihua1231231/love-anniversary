import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { weeklyCounts } from '../data/mockData';

function CurveTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl px-4 py-3 text-sm" style={{
        background: 'rgba(255, 240, 245, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 15px rgba(255, 182, 193, 0.3)',
        border: '1px solid rgba(255, 182, 193, 0.3)',
      }}>
        <p className="text-pink-600 font-semibold">{label}</p>
        <p className="text-pink-400">{payload[0].value.toLocaleString()} 条消息</p>
      </div>
    );
  }
  return null;
}

export default function LoveCurve() {
  const milestones = weeklyCounts.filter((w) => w.label);

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-pink-50/20 to-cream" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="relative text-center mb-12"
      >
        <p className="text-pink-400 text-sm tracking-[0.2em] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          LOVE CURVE
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-pink-600">恋爱升温曲线</h2>
        <p className="text-pink-400/60 text-sm mt-3 max-w-md mx-auto">
          从相遇到现在，每一周的消息量见证了我们感情的变化
        </p>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-4" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="relative max-w-3xl mx-auto"
      >
        <div
          className="rounded-2xl p-4 md:p-8"
          style={{
            background: 'rgba(255, 240, 245, 0.6)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(255, 182, 193, 0.15)',
            border: '1px solid rgba(255, 182, 193, 0.2)',
          }}
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={weeklyCounts} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="loveFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF69B4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#FFB6C1" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="week"
                tick={{ fill: '#FF91A4', fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: '#FADADD' }}
              />
              <YAxis
                tick={{ fill: '#FF91A4', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CurveTooltip />} />
              {milestones.map((m) => (
                <ReferenceLine
                  key={m.week}
                  x={m.week}
                  stroke="#E5558A"
                  strokeDasharray="4 4"
                  strokeOpacity={0.5}
                />
              ))}
              <Area
                type="monotone"
                dataKey="count"
                stroke="#FF69B4"
                strokeWidth={3}
                fill="url(#loveFill)"
                dot={{ r: 4, fill: '#FF69B4', stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: '#E5558A', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Milestone labels */}
          <div className="flex justify-between mt-4 px-2">
            {milestones.map((m) => (
              <div key={m.week} className="text-center">
                <div className="w-2 h-2 rounded-full bg-pink-400 mx-auto mb-1" />
                <p className="text-xs text-pink-500 font-medium">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Insight */}
          <p className="text-center text-pink-400/60 text-xs mt-6 italic">
            第2周消息量爆发 12,479 条 — 那是我们疯狂了解彼此的时候
          </p>
        </div>
      </motion.div>
    </section>
  );
}
