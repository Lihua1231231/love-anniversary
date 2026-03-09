import { motion } from 'framer-motion';
import { Coffee, Heart, Cake } from 'lucide-react';
// Icons kept in data for potential future use

const milestones = [
  {
    date: '2026.01.08',
    title: '我们相遇的那天',
    description: '茫茫人海中，我遇见了你。从此，平凡的日子有了光。',
    icon: Coffee,
    color: '#FFB6C1',
  },
  {
    date: '2026.02.10',
    title: '你成为了我的女朋友',
    description: '鼓起勇气说出的那句话，换来了世界上最好的回答。',
    icon: Heart,
    color: '#FF69B4',
  },
  {
    date: '2026.03.10',
    title: '我们的第一个月',
    description: '一个月的时光，每一天都因为你而变得闪闪发光。',
    icon: Cake,
    color: '#D4AF37',
  },
];

export default function TimelineSection() {
  return (
    <section className="py-16 md:py-32 px-4 md:px-6 bg-cream relative overflow-hidden">
      {/* Decorative bg elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-pink-100/30 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-pink-200/20 blur-3xl" />

      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 md:mb-20"
      >
        <p className="text-pink-400 text-sm tracking-[0.2em] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          OUR STORY
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-pink-600">我们的故事</h2>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-4" />
      </motion.div>

      {/* Timeline */}
      <div className="max-w-2xl mx-auto relative">
        {/* Center line (desktop) / Left line (mobile) */}
        <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-pink-200 via-pink-300 to-gold md:-translate-x-1/2" />

        {milestones.map((milestone, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={milestone.date}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-center mb-16 md:mb-20 last:mb-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Content card */}
              <div className={`w-full pl-6 md:pl-0 md:w-5/12 ${isLeft ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                <div
                  className="inline-block rounded-2xl p-4 md:p-6 shadow-lg"
                  style={{
                    background: 'rgba(255, 240, 245, 0.7)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(255, 182, 193, 0.2)',
                  }}
                >
                  <p className="text-pink-400 text-sm tracking-wider mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    {milestone.date}
                  </p>
                  <h3 className="text-lg md:text-xl font-semibold text-pink-600 mb-2">{milestone.title}</h3>
                  <p className="text-pink-400/70 text-sm leading-relaxed">{milestone.description}</p>
                </div>
              </div>

              {/* Small dot on timeline */}
              <div className="absolute left-2 md:left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-pink-300 z-10" />

              {/* Empty space for other side (desktop only) */}
              <div className="hidden md:block w-5/12" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
