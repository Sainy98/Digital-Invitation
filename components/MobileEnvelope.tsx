// components/MobileEnvelope.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Heart, MapPin, Calendar, Clock, Sparkles, Bell, Music, Flower2, Star } from 'lucide-react';
import { karma, mangala, greatVibes } from '@/app/fonts';

interface MobileEnvelopeProps {
  onOpen: () => void;
}

const MobileEnvelope = ({ onOpen }: MobileEnvelopeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // Audio refs for button sounds
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const openSoundRef = useRef<HTMLAudioElement | null>(null);
  const acceptSoundRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      clickSoundRef.current = new Audio('/sounds/click.mp3');
      openSoundRef.current = new Audio('/sounds/open.mp3');
      acceptSoundRef.current = new Audio('/sounds/accept.mp3');
      
      // Set volume
      [clickSoundRef.current, openSoundRef.current, acceptSoundRef.current].forEach(audio => {
        if (audio) {
          audio.volume = 0.3;
          audio.preload = 'auto';
        }
      });
    }
  }, []);

  // Disable body scrolling when envelope is open
  useEffect(() => {
    if (step > 0) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [step]);

  // Initialize only on client side
  useEffect(() => {
    setMounted(true);
    
    // Auto-show envelope after 1 second
    const timer = setTimeout(() => {
      setIsOpen(true);
      setStep(1);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const playSound = (sound: 'click' | 'open' | 'accept') => {
    try {
      const audio = sound === 'click' ? clickSoundRef.current :
                   sound === 'open' ? openSoundRef.current :
                   acceptSoundRef.current;
      
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Audio play failed:', e));
      }
    } catch (error) {
      console.log('Audio error:', error);
    }
  };

  const openInvitation = () => {
    playSound('open');
    setStep(2);
    setShowInvitation(true);
  };

  const acceptInvitation = () => {
    playSound('accept');
    setShowInvitation(false);
    setIsOpen(false);
    setStep(0);
    onOpen();
  };

  // Don't render until mounted
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Floating Envelope Button - Only when closed */}
      {step === 0 && (
        <motion.button
          onClick={() => {
            playSound('click');
            setIsOpen(true);
            setStep(1);
          }}
          initial={{ scale: 0, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.5 
          }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-4 z-50 w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full shadow-2xl flex items-center justify-center touch-manipulation"
          style={{ 
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <Mail className="w-6 h-6 text-white" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-600 rounded-full border-2 border-white"
          />
        </motion.button>
      )}

      {/* Envelope Modal */}
      <AnimatePresence>
        {step === 1 && (
          <div 
            className="fixed inset-0 z-[9999] flex items-end justify-center p-4 overscroll-contain"
            style={{ 
              overscrollBehavior: 'contain'
            }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-b from-yellow-900/30 to-amber-900/40 backdrop-blur-sm"
            />
            
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute"
                  style={{
                    left: `${(i * 12.5) % 100}%`,
                    top: `${(i * 15) % 100}%`,
                  }}
                >
                  <Star className="w-4 h-4 text-yellow-400/20" />
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ 
                type: 'spring',
                stiffness: 120,
                damping: 25,
                mass: 0.8
              }}
              className="relative w-full max-w-md mb-6 z-10"
            >
              {/* Envelope Card */}
              <div 
                className="relative bg-gradient-to-br from-yellow-50 via-amber-50/95 to-yellow-50/95 rounded-3xl shadow-3xl border-2 border-yellow-100/50 overflow-hidden max-h-[85vh]"
              >
                {/* Gold Border */}
                <div className="absolute inset-0 rounded-3xl border-4 border-yellow-400/20 pointer-events-none"></div>
                
                {/* Scrollable content */}
                <div 
                  className="overflow-y-auto max-h-[85vh] overscroll-contain px-6 py-8"
                  style={{ 
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  {/* Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="inline-flex items-center justify-center mb-4 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full p-2"
                    >
                      <Heart className="w-8 h-8 text-white" fill="currentColor" />
                    </motion.div>
                    <h2 className={`text-2xl font-bold text-yellow-900 mb-2 ${karma.className}`}>
                      आपका आमंत्रण आ गया है
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-8 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                      <p className="text-amber-700 text-sm">
                        विशेष रूप से आपके लिए
                      </p>
                      <div className="w-8 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                    </div>
                  </div>

                  {/* Envelope Visual */}
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative mb-10"
                  >
                    {/* Envelope body */}
                    <div className="relative bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-100 rounded-2xl p-6 border-2 border-yellow-200 shadow-xl">
                      {/* Decorative corners */}
                      <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-yellow-400 rounded-tl-lg"></div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-amber-400 rounded-tr-lg"></div>
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-yellow-400 rounded-bl-lg"></div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-amber-400 rounded-br-lg"></div>

                      {/* Envelope flap */}
                      <motion.div
                        animate={{ y: [-3, 3, -3] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                      >
                        <div className="w-36 h-8 bg-gradient-to-br from-yellow-200 via-amber-200 to-yellow-200 rounded-t-2xl shadow-lg"></div>
                      </motion.div>

                      {/* Address Window */}
                      <div className="relative mt-10">
                        <div className="bg-gradient-to-br from-white to-amber-50/95 backdrop-blur-sm rounded-xl p-4 border-2 border-yellow-300/50 shadow-inner">
                          <div className="text-center">
                            <div className={`text-lg font-bold text-amber-800 mb-2 ${karma.className}`}>
                              प्रिय अतिथि
                            </div>
                            <div className="text-amber-700 text-sm">
                              आपके नाम विशेष आमंत्रण
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute top-4 right-4 opacity-40">
                        <Flower2 className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div className="absolute bottom-4 left-4 opacity-40">
                        <Flower2 className="w-6 h-6 text-amber-500" />
                      </div>
                    </div>

                    {/* Gold Seal */}
                    <motion.div
                      whileTap={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                      className="absolute -right-4 -top-4 w-16 h-16 cursor-pointer"
                      onClick={openInvitation}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full shadow-2xl flex items-center justify-center">
                        <Heart className="w-8 h-8 text-white" fill="currentColor" />
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="absolute -inset-2 border-2 border-yellow-400/50 rounded-full"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Instructions */}
                  <div className="text-center mb-8">
                    <motion.div
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-amber-700 font-semibold text-sm flex items-center justify-center gap-2"
                    >
                      <Star className="w-4 h-4" />
                      मुहर पर टैप करके आमंत्रण खोलें
                      <Star className="w-4 h-4" />
                    </motion.div>
                  </div>

                  {/* Main Action Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        playSound('click');
                        openInvitation();
                      }}
                      className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-3 touch-manipulation active:scale-95 transition-transform relative overflow-hidden group"
                      style={{ 
                        WebkitTapHighlightColor: 'transparent',
                      }}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      
                      <Mail className="w-5 h-5" />
                      <span className="text-base">आमंत्रण खोलें</span>
                      <Sparkles className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Invitation Card Modal */}
      <AnimatePresence>
        {step === 2 && (
          <div 
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 overscroll-contain"
            style={{ 
              overscrollBehavior: 'contain'
            }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-b from-yellow-900/40 to-amber-900/50 backdrop-blur-md"
            />
            
            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -30, 0],
                    rotate: [0, 180],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute"
                  style={{
                    left: `${(i * 8) % 100}%`,
                    top: `${(i * 10) % 100}%`,
                  }}
                >
                  <Flower2 className="w-6 h-6 text-yellow-400/30" />
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 150,
                damping: 20,
                mass: 0.8
              }}
              className="relative w-full max-w-md z-10"
            >
              {/* Invitation Card */}
              <div 
                className="relative bg-gradient-to-br from-yellow-50 via-amber-50/98 to-yellow-50/98 rounded-3xl shadow-3xl border-2 border-yellow-100/60 overflow-hidden max-h-[90vh]"
              >
                {/* Gold Frame */}
                <div className="absolute inset-0 rounded-3xl border-8 border-yellow-400/10 pointer-events-none"></div>
                
                {/* Scrollable content */}
                <div 
                  className="overflow-y-auto max-h-[90vh] overscroll-contain"
                  style={{ 
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                

                  {/* Invitation Content */}
                  <div className="p-6 pt-2">
                    {/* Header */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-center mb-8"
                    >
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-10 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full p-2">
                          <Heart className="w-8 h-8 text-white" fill="currentColor" />
                        </div>
                        <div className="w-10 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                      </div>
                      
                      <h1 className={`text-2xl font-bold mb-2 ${karma.className}`}>
                        <span className="bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                          शुभ विवाह आमंत्रण
                        </span>
                      </h1>
                      
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <Bell className="w-4 h-4 text-yellow-600" />
                        <p className={`text-amber-800 text-sm ${mangala.className}`}>
                          आदित्य & प्रिया
                        </p>
                        <Music className="w-4 h-4 text-yellow-600" />
                      </div>
                    </motion.div>

                    {/* Couple Names */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, type: "spring" }}
                      className="text-center mb-10"
                    >
                      <div className="space-y-2">
                        <div className={`text-3xl font-bold text-amber-900 ${greatVibes.className}`}>
                          Aditya
                        </div>
                        
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                          className="text-yellow-500"
                        >
                          <Heart className="w-6 h-6 mx-auto" fill="currentColor" />
                        </motion.div>
                        
                        <div className={`text-3xl font-bold text-amber-900 ${greatVibes.className}`}>
                          Priya
                        </div>
                      </div>
                    </motion.div>

                    {/* Wedding Details Card */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="bg-gradient-to-r from-yellow-100/90 to-amber-100/90 rounded-2xl p-5 mb-8 border border-yellow-200/50 shadow-sm relative overflow-hidden"
                    >
                      {/* Pattern overlay */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `radial-gradient(circle at 25% 25%, yellow 2px, transparent 2px)`,
                          backgroundSize: '30px 30px'
                        }}></div>
                      </div>
                      
                      <div className="space-y-4 relative z-10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-lg flex items-center justify-center shadow-sm">
                              <Calendar className="w-5 h-5 text-amber-800" />
                            </div>
                            <div>
                              <div className="text-xs text-amber-700">तारीख</div>
                              <div className={`font-bold text-amber-900 text-sm ${mangala.className}`}>
                                21 दिसंबर 2026
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-200 to-amber-300 rounded-lg flex items-center justify-center shadow-sm">
                              <Clock className="w-5 h-5 text-amber-800" />
                            </div>
                            <div>
                              <div className="text-xs text-amber-700">समय</div>
                              <div className={`font-bold text-amber-900 text-sm ${mangala.className}`}>
                                शाम 5:30 बजे
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-lg flex items-center justify-center shadow-sm">
                              <MapPin className="w-5 h-5 text-amber-800" />
                            </div>
                            <div>
                              <div className="text-xs text-amber-700">स्थान</div>
                              <div className={`font-bold text-amber-900 text-sm text-right ${mangala.className}`}>
                                उदयपुर, राजस्थान
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Welcome Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="text-center mb-10"
                    >
                      <div className={`bg-gradient-to-br from-white to-amber-50/90 backdrop-blur-sm rounded-2xl p-5 border border-yellow-100/40 ${mangala.className}`}>
                        <p className="text-amber-800 mb-3 text-sm">
                          प्रिय मित्रों एवं परिवारजनों,
                        </p>
                        <p className="text-base text-amber-900 font-semibold leading-relaxed">
                          आप सभी को हमारे विवाह के पावन अवसर पर सादर आमंत्रित करते हैं।
                        </p>
                      </div>
                    </motion.div>

                    {/* Additional Info */}
                    <div className="space-y-4 mb-12">
                      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                          <h3 className="font-semibold text-amber-800 text-sm">विशेष निवेदन</h3>
                        </div>
                        <p className="text-amber-700 text-sm">
                          कृपया समय पर पहुँचकर हमारे इन पावन पलों में शामिल हों।
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border border-yellow-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-amber-500" fill="currentColor" />
                          <h3 className="font-semibold text-amber-800 text-sm">संपर्क सूत्र</h3>
                        </div>
                        <p className="text-amber-700 text-sm">
                          रणवीर सिंह राठौड़ : +91 98765 43210<br/>
                          महेश सिंह राठौड़ : +91 98765 43212
                        </p>
                      </div>
                    </div>

                    {/* Accept Button */}
                    <div className="sticky bottom-0 bg-gradient-to-t from-yellow-50 via-yellow-50/95 to-transparent pt-4 pb-3">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                      >
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={acceptInvitation}
                          className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-3 touch-manipulation active:scale-95 transition-transform relative overflow-hidden group"
                          style={{ 
                            WebkitTapHighlightColor: 'transparent',
                          }}
                        >
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                          
                          <Sparkles className="w-5 h-5" />
                          <span className="text-base">आमंत्रण स्वीकार करें</span>
                          <Sparkles className="w-5 h-5" />
                        </motion.button>
                        
                        <p className="text-center text-amber-600 text-xs mt-2">
                          विवाह विवरण देखने के लिए
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Decorative Borders */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400"></div>
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400"></div>
                
                {/* Corner Decorations */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-yellow-400/50 rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-400/50 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-yellow-400/50 rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-400/50 rounded-br-lg"></div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileEnvelope;