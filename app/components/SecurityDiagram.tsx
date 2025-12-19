'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface SecurityLayer {
  name: string;
  description: string;
  icon: string;
  delay: number;
}

export default function SecurityDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const layers: SecurityLayer[] = [
    { name: 'Multi-Factor Authentication', description: 'Biometric and hardware key support', icon: '🔐', delay: 0 },
    { name: 'End-to-End Encryption', description: 'AES-256 encryption for all data', icon: '🔒', delay: 0.1 },
    { name: 'Cold Storage', description: '95% of funds stored offline', icon: '❄️', delay: 0.2 },
    { name: 'Smart Contract Audits', description: 'Regular third-party security reviews', icon: '✅', delay: 0.3 },
  ];

  return (
    <section id="security" className="relative py-24 sm:py-32 md:py-40 lg:py-48 bg-gradient-to-b from-slate-900 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20 md:mb-24"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
            Security
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #00f0ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              First Approach
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto px-6 leading-relaxed font-light">
            Multiple layers of protection keep your assets safe
          </p>
        </motion.div>

        <div ref={ref} className="relative max-w-5xl mx-auto min-h-[600px] md:min-h-[500px]">
          {/* Central core */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center z-10 shadow-2xl shadow-cyan-400/50"
          >
            <span className="text-3xl sm:text-4xl">🛡️</span>
          </motion.div>

          {/* Security layers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {layers.map((layer, index) => {
              const angle = (index / layers.length) * Math.PI * 2;
              const radius = 200;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          scale: 1,
                          x: !isMobile ? x : 0,
                          y: !isMobile ? y : 0,
                        }
                      : {}
                  }
                  transition={{
                    delay: layer.delay + 0.6,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  className="relative md:absolute md:top-1/2 md:left-1/2 bg-slate-900/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-cyan-400/20 hover:border-cyan-400/50 transition-all hover:scale-105"
                  style={
                    !isMobile
                      ? {
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        }
                      : {}
                  }
                >
                  {/* Connection line */}
                  {!isMobile && (
                    <svg
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
                      style={{ width: '100%', height: '100%' }}
                    >
                      <motion.line
                        x1="50%"
                        y1="50%"
                        x2={`calc(50% + ${x}px)`}
                        y2={`calc(50% + ${y}px)`}
                        stroke="#00f0ff"
                        strokeWidth="2"
                        strokeOpacity="0.3"
                        initial={{ pathLength: 0 }}
                        animate={isInView ? { pathLength: 1 } : {}}
                        transition={{ delay: layer.delay + 0.8, duration: 0.5 }}
                      />
                    </svg>
                  )}

                  <div className="relative z-10">
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{layer.icon}</div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{layer.name}</h3>
                    <p className="text-sm sm:text-base text-gray-400">{layer.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

