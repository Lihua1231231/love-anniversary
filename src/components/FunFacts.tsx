import { motion } from 'framer-motion';
import {
  MessageCircle, Clock, Moon, Flame, Mic, Image, Calendar, Heart,
} from 'lucide-react';

const facts = [
  {
    icon: MessageCircle,
    value: '53,994',
    label: '条消息',
    description: '这是我们说过的所有话',
    color: '#FF69B4',
  },
  {
    icon: Calendar,
    value: '58',
    label: '天不间断',
    description: '从认识那天起，一天都没断过',
    color: '#FF91A4',
  },
  {
    icon: Flame,
    value: '2,184',
    label: '单日最高',
    description: '1月16日，聊到停不下来',
    color: '#E5558A',
  },
  {
    icon: Clock,
    value: '931',
    label: '条/天',
    description: '我们每天平均发的消息',
    color: '#FFB6C1',
  },
  {
    icon: Moon,
    value: '32.1%',
    label: '深夜消息',
    description: '三分之一的话都在凌晨说的',
    color: '#9B6B9E',
  },
  {
    icon: Mic,
    value: '~509',
    label: '分钟语音',
    description: '1698条语音消息，听你说话真好',
    color: '#FADADD',
  },
  {
    icon: Image,
    value: '6,018',
    label: '张图片/贴纸',
    description: '分享的每一个瞬间',
    color: '#F8E8EE',
  },
  {
    icon: Heart,
    value: '77',
    label: '次"喜欢你"',
    description: '每一次说出口都是认真的',
    color: '#D4AF37',
  },
];

export default function FunFacts() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/30 via-cream to-pink-50/20" />
      <div className="absolute top-20 -right-10 w-40 h-40 rounded-full bg-pink-200/15 blur-3xl" />

      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="relative text-center mb-12"
      >
        <p className="text-pink-400 text-sm tracking-[0.2em] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          FUN FACTS
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-pink-600">我们的数字密码</h2>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-4" />
      </motion.div>

      {/* Facts grid */}
      <div className="relative max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {facts.map((fact, index) => {
          const Icon = fact.icon;
          return (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="text-center rounded-2xl p-4 md:p-5"
              style={{
                background: 'rgba(255, 240, 245, 0.6)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 20px rgba(255, 182, 193, 0.12)',
                border: '1px solid rgba(255, 182, 193, 0.15)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: `${fact.color}18` }}
              >
                <Icon className="w-5 h-5" style={{ color: fact.color }} />
              </div>
              <motion.p
                className="text-2xl md:text-3xl font-bold text-pink-600 mb-0.5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 + 0.3 }}
              >
                {fact.value}
              </motion.p>
              <p className="text-xs font-medium text-pink-500 mb-1.5">{fact.label}</p>
              <p className="text-[11px] text-pink-400/60 leading-relaxed">{fact.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
