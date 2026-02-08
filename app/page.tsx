// app/page.tsx - SIMPLIFIED VERSION
'use client';

import { useState, useEffect } from 'react';
import MobileEnvelope from '@/components/MobileEnvelope';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import Events from '@/components/Events';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import MusicPlayer from '@/components/MusicPlayer';
import FamilyDetails from '@/components/FamilyDetails';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showContent, setShowContent] = useState(false);

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
      
      {/* Simple fade-in for all content */}
      <div className={`transition-all duration-1000 ${showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {showContent && (
          <>
            <Hero show={true} />
            <Countdown />
            <Events />
            <Gallery />
            <FamilyDetails />
            <Footer />
          </>
        )}
      </div>
    </div>
  );
}