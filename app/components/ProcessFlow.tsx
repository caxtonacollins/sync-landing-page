'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const steps = [
  { title: 'Connect', description: 'Link your wallet or bank account', icon: '🔗' },
  { title: 'Select', description: 'Choose your assets and amounts', icon: '📊' },
  { title: 'Swap', description: 'Execute the transaction instantly', icon: '⚡' },
  { title: 'Complete', description: 'Receive your assets in seconds', icon: '✅' },
];

export default function ProcessFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-200px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="how-it-works" ref={ref} className="relative py-24 sm:py-32 md:py-40 lg:py-48 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20 md:mb-24"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
            Simple
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #00f0ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Four Steps
            </span>
          </h2>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Progress line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-800 transform -translate-y-1/2">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 relative">
            {steps.map((step, index) => {
              const stepProgress = useTransform(
                scrollYProgress,
                [index / steps.length, (index + 1) / steps.length],
                [0, 1]
              );

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10"
                >
                  <motion.div
                    className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-8 sm:p-10 lg:p-12 border border-cyan-400/20 hover:border-cyan-400/50 transition-all text-center relative shadow-xl"
                    whileHover={{ scale: 1.02, y: -8 }}
                  >
                    <motion.div
                      className="text-6xl sm:text-7xl mb-6 sm:mb-8"
                      animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
                      transition={{ delay: index * 0.2 + 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {step.icon}
                    </motion.div>
                    <motion.h3
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6"
                      style={{
                        opacity: stepProgress,
                      }}
                    >
                      {step.title}
                    </motion.h3>
                    <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-light">{step.description}</p>

                    {/* Step number */}
                    <motion.div
                      className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 w-12 h-12 sm:w-14 sm:h-14 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold text-xl sm:text-2xl shadow-lg"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.3, type: 'spring', stiffness: 200 }}
                    >
                      {index + 1}
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

