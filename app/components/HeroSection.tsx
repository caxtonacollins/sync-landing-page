'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  return (
    <Sphere args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#00f0ff"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.8}
      />
    </Sphere>
  );
}

function GradientBackground({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const { x, y } = mousePosition;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    ref.current.style.background = `
      radial-gradient(
        circle at ${50 + deltaX * 20}% ${50 + deltaY * 20}%,
        rgba(0, 240, 255, 0.15) 0%,
        rgba(15, 23, 42, 0.8) 40%,
        rgba(0, 0, 0, 1) 100%
      )
    `;
  }, [mousePosition]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 -z-10 transition-all duration-1000 ease-out"
      style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.15) 0%, rgba(15, 23, 42, 0.8) 40%, rgba(0, 0, 0, 1) 100%)',
      }}
    />
  );
}

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const words = ['Sync', 'Seamlessly', 'Between', 'Fiat', '&', 'Crypto'];
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-20"
    >
      <GradientBackground mousePosition={mousePosition} />
      
      {/* 3D Background Element - Hidden on mobile for performance */}
      <div className="hidden lg:block absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <AnimatedSphere />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-6 sm:px-8 lg:px-12 xl:px-16 w-full max-w-7xl mx-auto py-32"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 mb-12 sm:mb-16 md:mb-20"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white leading-[1.1] tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #00f0ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-400 max-w-3xl mx-auto mb-16 sm:mb-20 md:mb-24 px-6 leading-relaxed font-light"
        >
          Next-generation financial infrastructure bridging traditional and digital assets
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex gap-4 sm:gap-5 justify-center flex-wrap px-6"
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 sm:px-10 py-4 sm:py-5 bg-cyan-400 text-black font-semibold rounded-full text-base sm:text-lg hover:bg-cyan-300 transition-all duration-300 shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40 w-full sm:w-auto"
            data-cursor="pointer"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, y: -2, backgroundColor: 'rgba(0, 240, 255, 0.1)' }}
            whileTap={{ scale: 0.98 }}
            className="px-8 sm:px-10 py-4 sm:py-5 border-2 border-cyan-400/50 text-cyan-400 font-semibold rounded-full text-base sm:text-lg hover:border-cyan-400 transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
            data-cursor="pointer"
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 sm:bottom-16 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-1 h-3 bg-cyan-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

