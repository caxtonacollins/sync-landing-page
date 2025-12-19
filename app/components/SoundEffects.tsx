'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SoundEffects() {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (isMuted) return;

    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playSound = (frequency: number, duration: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    };

    // Play sound on button clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        playSound(800, 0.1);
      }
    };

    // Play sound on hover for interactive elements
    const handleHover = () => {
      playSound(600, 0.05);
    };

    const interactiveElements = document.querySelectorAll('a, button, [data-cursor="pointer"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHover);
    });

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHover);
      });
      audioContext.close();
    };
  }, [isMuted]);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2 }}
      onClick={() => setIsMuted(!isMuted)}
      className="fixed bottom-6 left-6 z-[9999] w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-lg border border-cyan-400/20 hover:border-cyan-400/50 flex items-center justify-center text-white transition-colors"
      data-cursor="pointer"
      aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
    >
      {isMuted ? '🔇' : '🔊'}
    </motion.button>
  );
}

