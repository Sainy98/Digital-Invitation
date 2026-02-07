// components/Hero.tsx
'use client';

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Heart, Sparkles, Flower2, Bell, Crown, Music, Star, Gem } from "lucide-react";
import { karma, mangala } from "@/app/fonts";

export default function Hero({ show = false }) {
  const [isVisible, setIsVisible] = useState(false);

  // All hooks MUST be called unconditionally (before any early returns)
  useEffect(() => {
    if (show) {
      // Only run these if show is true
      window.scrollTo(0, 0);
      
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      // Reset when hidden
      setIsVisible(false);
    }
  }, [show]); // Add show to dependencies

  // NOW you can conditionally return
  if (!show) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 px-4">
        {/* Empty placeholder with same background */}
      </div>
    );
  }

  // Simple floating animation
  const floatingAnimation = {
    initial: { y: 10, opacity: 0 },
    animate: { 
      y: [0, -5, 0],
      opacity: 1,
      transition: {
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut" as const
        },
        opacity: { duration: 0.5 }
      }
    }
  };

  // Stagger children animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.section
       key={show ? "hero-visible" : "hero-hidden"}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -30 }}
  transition={{ duration: 0.6 }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 px-4"
      >
        {/* Subtle moving background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient overlay */}
          <motion.div 
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              repeatType: 'reverse' 
            }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-200/10 via-transparent to-amber-200/10"
            style={{ 
              backgroundSize: '200% 200%'
            }}
          />
          
          {/* Subtle floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -20, 0],
                x: [0, Math.sin(i) * 10, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
              className="absolute w-2 h-2 rounded-full bg-rose-300/30"
              style={{
                left: `${(i + 1) * 15}%`,
                top: `${(i % 4) * 25 + 10}%`,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="relative z-20 w-full max-w-4xl py-8"
        >
          {/* Top border reveal */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent mb-8 mx-auto"
          />

          {/* Main Card */}
          <motion.div
            variants={itemVariants}
            className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/40 p-6 md:p-12 overflow-hidden"
          >
            {/* Animated background pattern */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -right-20 -top-20 w-64 h-64 opacity-5"
            >
              <Heart className="w-full h-full text-rose-400" fill="currentColor" />
            </motion.div>

            {/* Corner decorations */}
            <motion.div
              animate={{ rotate: 180 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-3 -left-3 w-12 h-12 opacity-20"
            >
              <Flower2 className="w-full h-full text-rose-400" />
            </motion.div>
            <motion.div
              animate={{ rotate: -180 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-3 -right-3 w-12 h-12 opacity-20"
            >
              <Flower2 className="w-full h-full text-amber-400" />
            </motion.div>

            {/* Couple Images */}
            <motion.div 
              variants={containerVariants}
              className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-10"
            >
              {/* Groom */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <motion.div
                  animate={{ 
                    boxShadow: [
                      '0 0 0 0px rgba(245, 158, 11, 0)',
                      '0 0 0 10px rgba(245, 158, 11, 0.1)',
                      '0 0 0 0px rgba(245, 158, 11, 0)'
                    ]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: 0.5 
                  }}
                  className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-rose-100 to-amber-100"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Crown className="w-16 h-16 text-amber-500/50" />
                  </div>
                  <Image 
                    src="/groom.jpg" 
                    alt="Groom" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 128px, 160px"
                    priority
                  />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg"
                >
                  आदित्य
                </motion.div>
              </motion.div>

              {/* Central Heart */}
              <motion.div
                variants={itemVariants}
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  scale: { duration: 2, repeat: Infinity },
                  rotate: { duration: 4, repeat: Infinity }
                }}
                className="relative"
              >
                <Heart className="w-16 h-16 md:w-20 md:h-20 text-rose-500" fill="currentColor" />
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 bg-rose-500/20 rounded-full blur-md"
                />
              </motion.div>

              {/* Bride */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <motion.div
                  animate={{ 
                    boxShadow: [
                      '0 0 0 0px rgba(244, 63, 94, 0)',
                      '0 0 0 10px rgba(244, 63, 94, 0.1)',
                      '0 0 0 0px rgba(244, 63, 94, 0)'
                    ]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: 1 
                  }}
                  className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-pink-100 to-rose-100"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Gem className="w-16 h-16 text-rose-500/50" />
                  </div>
                  <Image 
                    src="/bride.jpg" 
                    alt="Bride" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 128px, 160px"
                    priority
                  />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg"
                >
                  प्रिया
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Wedding Title */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-8"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center justify-center gap-4 mb-4"
              >
                <Sparkles className="w-6 h-6 text-amber-500" />
                <div className="w-16 h-px bg-gradient-to-r from-rose-400 to-amber-400" />
                <Sparkles className="w-6 h-6 text-rose-500" />
              </motion.div>

              <h1 className={`text-4xl md:text-5xl font-bold mb-3 ${karma.className}`}>
                <motion.span
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity 
                  }}
                  className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 bg-clip-text text-transparent"
                  style={{ 
                    backgroundSize: '200% auto'
                  }}
                >
                  शुभ विवाह समारोह
                </motion.span>
              </h1>
              
              <motion.div
                variants={floatingAnimation}
                className={`text-lg text-gray-600 ${mangala.className}`}
              >
                दो दिलों का मिलन, दो परिवारों का संगम
              </motion.div>
            </motion.div>

            {/* Date & Venue */}
            <motion.div
              variants={containerVariants}
              className="bg-gradient-to-r from-rose-50/80 to-amber-50/80 rounded-2xl p-6 mb-8 backdrop-blur-sm border border-white/40"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white/90 rounded-xl p-5 text-center shadow-lg"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="flex items-center justify-center gap-3 mb-3"
                  >
                    <Star className="w-7 h-7 text-amber-500" fill="currentColor" />
                  </motion.div>
                  <h3 className={`text-xl font-semibold text-gray-800 mb-2 ${karma.className}`}>
                    शुभ मुहूर्त
                  </h3>
                  <p className={`text-2xl font-bold text-rose-700 ${mangala.className}`}>
                    24 दिसंबर 2026
                  </p>
                  <p className="text-gray-600">शाम 5:30 बजे</p>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white/90 rounded-xl p-5 text-center shadow-lg"
                >
                  <motion.div
                    variants={floatingAnimation}
                    className="flex items-center justify-center gap-3 mb-3"
                  >
                    <Flower2 className="w-7 h-7 text-rose-500" />
                  </motion.div>
                  <h3 className={`text-xl font-semibold text-gray-800 mb-2 ${karma.className}`}>
                    विवाह स्थल
                  </h3>
                  <p className={`text-2xl font-bold text-amber-700 ${mangala.className}`}>
                    उदयपुर, राजस्थान
                  </p>
                  <p className="text-gray-600">श्रीनाथजी मंदिर</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Welcome Message */}
            <motion.div
              variants={itemVariants}
              className="text-center"
            >
              <div className={`relative bg-white/90 rounded-2xl p-6 border border-white/40 shadow-lg overflow-hidden ${mangala.className}`}>
                {/* Animated border */}
                <motion.div
                  animate={{ 
                    x: ['-100%', '100%']
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent"
                />
                
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  प्रिय मित्रों एवं परिवारजनों,
                </p>
                <p className="text-xl text-rose-700 font-semibold leading-relaxed">
                  आप सभी को हमारे विवाह के पावन अवसर पर
                  <span className="block text-amber-600 mt-2">सादर आमंत्रित करते हैं।</span>
                </p>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center justify-center gap-3 mt-4"
                >
                  <Heart className="w-5 h-5 text-rose-500" fill="currentColor" />
                  <p className="text-amber-700 font-semibold">
                    आपकी उपस्थिति हमारी खुशी को दोगुना कर देगी
                  </p>
                  <Heart className="w-5 h-5 text-amber-500" fill="currentColor" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom border reveal */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-8 mx-auto"
          />
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}