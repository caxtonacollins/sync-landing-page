'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { GeometricPatterns } from './GeometricPatterns';

function BlockchainNode({ position, index }: { position: [number, number, number]; index: number }) {
  return (
    <group position={position}>
      <Sphere args={[0.3, 32, 32]}>
        <meshStandardMaterial
          color={index % 2 === 0 ? '#00f0ff' : '#ffffff'}
          emissive={index % 2 === 0 ? '#00f0ff' : '#ffffff'}
          emissiveIntensity={0.5}
        />
      </Sphere>
      <pointLight position={[0, 0, 0]} intensity={1} color={index % 2 === 0 ? '#00f0ff' : '#ffffff'} />
    </group>
  );
}

function BlockchainNetwork() {
  const nodeCount = 8;
  const radius = 3;
  const nodes: [number, number, number][] = [];

  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2;
    nodes.push([
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * 0.5,
      Math.sin(angle) * radius * 0.3,
    ]);
  }

  return (
    <>
      {nodes.map((node, i) => (
        <BlockchainNode key={i} position={node} index={i} />
      ))}
      {nodes.map((node, i) => {
        const nextNode = nodes[(i + 1) % nodeCount];
        const points = [new THREE.Vector3(...node), new THREE.Vector3(...nextNode)];
        return (
          <Line
            key={`line-${i}`}
            points={points}
            color="#00f0ff"
            lineWidth={2}
            opacity={0.5}
          />
        );
      })}
    </>
  );
}

export default function BlockchainVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 sm:py-32 md:py-40 lg:py-48 bg-black overflow-hidden">
      <GeometricPatterns />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20 md:mb-24"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
            Powered by
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #00f0ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Blockchain Technology
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto px-6 leading-relaxed font-light">
            Decentralized, transparent, and secure. Every transaction is verified on-chain.
          </p>
        </motion.div>

        <div className="h-[450px] sm:h-[550px] md:h-[650px] lg:h-[700px] relative mb-16 sm:mb-20 md:mb-24">
          <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00f0ff" />
            <BlockchainNetwork />
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={1}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          {[
            { title: 'Decentralized', desc: 'No single point of failure' },
            { title: 'Transparent', desc: 'All transactions are public' },
            { title: 'Immutable', desc: 'Once recorded, cannot be altered' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 sm:p-8 lg:p-10 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 shadow-xl"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">{item.title}</h3>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

