'use client';

import HeroSection from './components/HeroSection';
import HorizontalScroll from './components/HorizontalScroll';
import TransactionSimulator from './components/TransactionSimulator';
import BlockchainVisualization from './components/BlockchainVisualization';
import SecurityDiagram from './components/SecurityDiagram';
import ProcessFlow from './components/ProcessFlow';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import CustomScrollbar from './components/CustomScrollbar';
import SoundEffects from './components/SoundEffects';
import Navigation from './components/Navigation';

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navigation />
      <CustomCursor />
      <CustomScrollbar />
      <SoundEffects />
      <HeroSection />
      <HorizontalScroll />
      <TransactionSimulator />
      <BlockchainVisualization />
      <SecurityDiagram />
      <ProcessFlow />
      <Footer />
    </main>
  );
}
