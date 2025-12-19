'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: string;
  status: 'pending' | 'processing' | 'completed';
  timestamp: number;
}

export default function TransactionSimulator() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const newTransaction: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        from: ['USD', 'EUR', 'GBP'][Math.floor(Math.random() * 3)],
        to: ['BTC', 'ETH', 'USDC'][Math.floor(Math.random() * 3)],
        amount: (Math.random() * 10000 + 100).toFixed(2),
        status: 'pending',
        timestamp: Date.now(),
      };

      setTransactions((prev) => [newTransaction, ...prev.slice(0, 4)]);

      // Animate status changes
      setTimeout(() => {
        setTransactions((prev) =>
          prev.map((tx) =>
            tx.id === newTransaction.id ? { ...tx, status: 'processing' } : tx
          )
        );
      }, 1000);

      setTimeout(() => {
        setTransactions((prev) =>
          prev.map((tx) =>
            tx.id === newTransaction.id ? { ...tx, status: 'completed' } : tx
          )
        );
      }, 2000);
    }, 3000);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <section className="relative py-24 sm:py-32 md:py-40 lg:py-48 bg-gradient-to-b from-black to-slate-900 overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20 md:mb-24"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
            See It In
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #00f0ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Real-Time
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto px-6 leading-relaxed font-light">
            Watch live transactions flow through our network in real-time
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsActive(!isActive)}
            className="mb-10 sm:mb-12 px-8 sm:px-10 py-4 sm:py-5 bg-cyan-400 text-black font-semibold rounded-full text-base sm:text-lg hover:bg-cyan-300 transition-all duration-300 mx-auto block w-full sm:w-auto shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40"
            data-cursor="pointer"
          >
            {isActive ? 'Pause Simulation' : 'Start Simulation'}
          </motion.button>

          <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-cyan-400/20 shadow-2xl">
            <div className="space-y-4">
              <AnimatePresence>
                {transactions.map((tx, index) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-800/50 rounded-xl border border-cyan-400/10 hover:border-cyan-400/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-base sm:text-xl font-bold flex-shrink-0">
                        {tx.from}
                      </div>
                      <motion.div
                        animate={{ x: [0, 20, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          delay: index * 0.2,
                        }}
                        className="text-cyan-400 text-xl sm:text-2xl"
                      >
                        →
                      </motion.div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-base sm:text-xl font-bold flex-shrink-0">
                        {tx.to}
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-semibold text-base sm:text-lg truncate">
                          {tx.amount} {tx.from} → {tx.to}
                        </div>
                        <div className="text-gray-400 text-xs sm:text-sm">Transaction #{tx.id}</div>
                      </div>
                    </div>
                    <motion.div
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        tx.status === 'completed'
                          ? 'bg-green-500/20 text-green-400'
                          : tx.status === 'processing'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                      animate={{
                        scale: tx.status === 'processing' ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        repeat: tx.status === 'processing' ? Infinity : 0,
                        duration: 1,
                      }}
                    >
                      {tx.status === 'completed' && '✓ Completed'}
                      {tx.status === 'processing' && '⏳ Processing'}
                      {tx.status === 'pending' && '⏱ Pending'}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {transactions.length === 0 && (
                <div className="text-center text-gray-500 py-12">
                  Click "Start Simulation" to see live transactions
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

