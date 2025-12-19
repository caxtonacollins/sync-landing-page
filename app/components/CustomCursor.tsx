'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only show custom cursor on desktop
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 768 && window.matchMedia('(pointer: fine)').matches);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    if (!isDesktop) return;

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseEnter = (e: Event) => {
      setIsHovering(true);
    };
    
    const handleMouseLeave = (e: Event) => {
      setIsHovering(false);
    };

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor="pointer"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('resize', checkDesktop);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-cyan-400/40 pointer-events-none z-[9999]"
        style={{
          boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
        }}
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[9999]"
        style={{
          boxShadow: '0 0 10px rgba(0, 240, 255, 0.8)',
        }}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30,
        }}
      />
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 w-12 h-12 rounded-full border-2 border-cyan-400/60 pointer-events-none z-[9999]"
          style={{
            boxShadow: '0 0 30px rgba(0, 240, 255, 0.4)',
          }}
          animate={{
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: [1, 1.2, 1],
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            repeat: Infinity,
            duration: 2,
          }}
        />
      )}
    </>
  );
}

