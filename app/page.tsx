// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import MobileEnvelope from '@/components/MobileEnvelope';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import Events from '@/components/Events';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import MusicPlayer from '@/components/MusicPlayer';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [revealStep, setRevealStep] = useState(0);

  useEffect(() => {
    if (showContent) {
      const steps = ['hero', 'countdown', 'events', 'gallery', 'rsvp'];
      const timer = setInterval(() => {
        setRevealStep(prev => {
          if (prev < steps.length - 1) return prev + 1;
          clearInterval(timer);
          return prev;
        });
      }, 500);

      return () => clearInterval(timer);
    }
  }, [showContent]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-amber-50">
      {/* Only show envelope initially */}
      <MobileEnvelope
        onOpen={() => {
          setShowContent(true);
          setIsPlaying(true);
        }}
      />
      
      <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      
      {/* Content revealed gradually */}
      <div className={`transition-all duration-500 ${showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Hero Section - PASS THE show PROP! */}
        <div className={`transition-all duration-500 delay-100 ${revealStep >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Hero show={showContent && revealStep >= 0} /> {/* ✅ This is the fix */}
        </div>
        
        {/* Countdown */}
        <div className={`transition-all duration-500 delay-200 ${revealStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Countdown />
        </div>
        
        {/* Events */}
        <div className={`transition-all duration-500 delay-300 ${revealStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Events />
        </div>
        
        {/* Gallery */}
        <div className={`transition-all duration-500 delay-400 ${revealStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Gallery />
        </div>
        
       
        {/* Footer */}
        <div className={`transition-all duration-500 delay-600 ${revealStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
}