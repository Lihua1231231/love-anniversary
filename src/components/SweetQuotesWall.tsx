import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { mockChatData } from '../data/mockData';

export default function SweetQuotesWall() {
  const quotes = mockChatData.sweetQuotes;

  return (
    <section className="py-16 md:py-32 px-4 md:px-6 bg-cream relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-pink-100/40 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-pink-200/20 blur-3xl" />

      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 md:mb-16"
      >
        <p className="text-pink-400 text-sm tracking-[0.2em] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          SWEET MOMENTS
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-pink-600">甜蜜瞬间</h2>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-4" />
      </motion.div>

      {/* Cards grid - masonry-like layout */}
      <div className="max-w-5xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {quotes.map((quote, index) => {
          const fromLeft = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <div
                className="rounded-2xl p-4 md:p-6 transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-default group"
                style={{
                  background: 'rgba(255, 240, 245, 0.6)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px rgba(255, 182, 193, 0.15)',
                  border: '1px solid rgba(255, 182, 193, 0.2)',
                }}
              >
                {/* Context label */}
                {quote.context && (
                  <div className="flex items-center gap-2 mb-4">
                    <Quote className="w-3.5 h-3.5 text-pink-300" />
                    <span className="text-xs text-pink-400 tracking-wider">{quote.context}</span>
                  </div>
                )}

                {/* Messages */}
                <div className="space-y-2.5">
                  {quote.messages.map((msg, msgIndex) => (
                    <div
                      key={msgIndex}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[78%] text-[13px] leading-[1.7] ${
                          msg.sender === 'me'
                            ? 'bg-gradient-to-br from-pink-400 to-pink-500 text-white rounded-[18px] rounded-br-[4px] px-4 py-2.5'
                            : 'bg-white text-pink-700 rounded-[18px] rounded-bl-[4px] px-4 py-2.5'
                        }`}
                        style={{
                          boxShadow: msg.sender === 'me'
                            ? '0 2px 10px rgba(255, 105, 180, 0.25)'
                            : '0 1px 6px rgba(0, 0, 0, 0.06)',
                        }}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative heart */}
                <div className="flex justify-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                    <path
                      d="M8 14s-5.5-3.5-7-7C-0.5 3.5 1.5 0 4.5 0 6 0 7.5 1 8 2.5 8.5 1 10 0 11.5 0c3 0 5 3.5 3.5 7-1.5 3.5-7 7-7 7z"
                      fill="#FFB6C1"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
