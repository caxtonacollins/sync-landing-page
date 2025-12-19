'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { GeometricPatterns } from './GeometricPatterns';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
  scrollProgress: any;
}

function FeatureCard({ title, description, icon, index, scrollProgress }: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const x = useTransform(scrollProgress, (progress) => {
    const cardProgress = progress - index * 0.25;
    return cardProgress < 0 || cardProgress > 0.25 ? 0 : (cardProgress - 0.125) * 400;
  });

  const opacity = useTransform(scrollProgress, (progress) => {
    const cardProgress = progress - index * 0.25;
    if (cardProgress < 0 || cardProgress > 0.25) return 0.3;
    return 1;
  });

  const scale = useTransform(scrollProgress, (progress) => {
    const cardProgress = progress - index * 0.25;
    if (cardProgress < 0 || cardProgress > 0.25) return 0.9;
    const centerProgress = Math.abs(cardProgress - 0.125) / 0.125;
    return 1 - centerProgress * 0.1;
  });

  return (
    <motion.div
      ref={ref}
      style={{ x, opacity, scale }}
      className="flex-shrink-0 w-[85vw] sm:w-[420px] md:w-[520px] lg:w-[580px] h-auto min-h-[450px] md:min-h-[550px] lg:min-h-[600px] perspective-1000"
    >
      <motion.div
        className="relative w-full h-full bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 lg:p-12 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-500 shadow-2xl"
        whileHover={{ rotateY: 3, rotateX: 3, y: -8 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-7xl mb-6 md:mb-8"
        >
          {icon}
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight"
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-gray-400 text-lg md:text-xl lg:text-2xl leading-relaxed font-light"
        >
          {description}
        </motion.p>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10 overflow-hidden rounded-3xl">
          <motion.div
            className="absolute w-full h-full"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              backgroundImage: 'radial-gradient(circle, #00f0ff 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    const updateWidth = () => {
      if (scrollContainerRef.current) {
        setContainerWidth(scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -containerWidth]);

  const features = [
    {
      title: 'Instant Swaps',
      description: 'Seamlessly convert between fiat and cryptocurrency in real-time with zero friction. Our advanced liquidity pools ensure the best rates every time.',
      icon: '⚡',
    },
    {
      title: 'Bank-Grade Security',
      description: 'Multi-layer encryption and cold storage solutions protect your assets. Your funds are secured with institutional-grade infrastructure.',
      icon: '🔒',
    },
    {
      title: 'Global Access',
      description: 'Access your funds anywhere, anytime. Support for 150+ countries with instant settlement and 24/7 availability.',
      icon: '🌍',
    },
    {
      title: 'Smart Automation',
      description: 'AI-powered portfolio management and automated trading strategies. Set it and forget it with intelligent rebalancing.',
      icon: '🤖',
    },
  ];

  return (
    <section id="features" ref={containerRef} className="relative py-24 sm:py-32 md:py-40 lg:py-48 bg-black overflow-hidden">
      <GeometricPatterns />
      <div className="sticky top-0">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 mb-16 sm:mb-20 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight"
          >
            Built for the
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #00f0ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Future of Finance
            </span>
          </motion.h2>
        </div>

        <div className="overflow-x-hidden">
          <motion.div
            ref={scrollContainerRef}
            className="flex gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-6 sm:px-8 lg:px-12 xl:px-16"
            style={{ 
              x,
            }}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                index={index}
                scrollProgress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

