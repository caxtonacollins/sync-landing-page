'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative py-16 sm:py-20 md:py-24 bg-black border-t border-cyan-400/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 sm:gap-16 mb-12 sm:mb-16">
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Sync</h3>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-light max-w-sm">
              Next-generation financial infrastructure for the digital age.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 sm:mb-6 text-lg sm:text-xl">Product</h4>
            <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-400">
              <li><a href="#features" className="hover:text-cyan-400 transition-colors duration-300" data-cursor="pointer">Features</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300" data-cursor="pointer">Pricing</a></li>
              <li><a href="#security" className="hover:text-cyan-400 transition-colors duration-300" data-cursor="pointer">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 sm:mb-6 text-lg sm:text-xl">Company</h4>
            <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300" data-cursor="pointer">About</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300" data-cursor="pointer">Blog</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300" data-cursor="pointer">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 sm:mb-6 text-lg sm:text-xl">Support</h4>
            <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300" data-cursor="pointer">Help Center</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300" data-cursor="pointer">Contact</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300" data-cursor="pointer">Status</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cyan-400/10 pt-8 sm:pt-10 md:pt-12 text-center text-base sm:text-lg text-gray-500">
          <p>&copy; 2024 Sync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

