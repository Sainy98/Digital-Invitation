// components/Countdown.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Heart } from 'lucide-react';
import { karma, mangala } from '@/app/fonts';

const Countdown = () => {
  const weddingDate = new Date('2026-05-10T17:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <motion.div 
      className="text-center relative"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Floating animation container */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="relative"
      >
        {/* Glow effect behind number */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/30 to-amber-500/30 blur-xl rounded-lg"></div>
        
        {/* Main number card */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-rose-500 to-amber-500 rounded-xl flex items-center justify-center shadow-2xl">
          {/* Inner shine effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent"></div>
          
          <span className="text-3xl md:text-4xl font-bold text-white relative z-10">
            {value.toString().padStart(2, '0')}
          </span>
          
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-white rounded-full"></div>
        </div>
        
        {/* Floating sparkles */}
        {value % 2 === 0 && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </motion.div>
        )}
      </motion.div>
      
      {/* Label with custom font */}
      <div className="mt-3">
        <div className={`text-lg font-semibold text-rose-700 ${karma.className}`}>
          {label}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {label === 'दिन' ? 'दिनों में' : 
           label === 'घंटे' ? 'घंटों में' : 
           label === 'मिनट' ? 'मिनटों में' : 'सेकंडों में'}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating marigold flowers */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl text-amber-400/30"
            animate={{
              y: [0, -100, 0],
              x: Math.sin(i) * 50,
              rotate: 360
            }}
            transition={{
              repeat: Infinity,
              duration: 8 + i * 2,
              delay: i * 0.5
            }}
            style={{
              left: `${(i + 1) * 12}%`,
              top: `${20 + (i % 3) * 20}%`
            }}
          >
            🌼
          </motion.div>
        ))}
        
        {/* Glowing orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-rose-400/10 to-amber-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ repeat: Infinity, duration: 5, delay: 1 }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${karma.className}`}>
            <span className="bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
              विवाह की उलटी गिनती
            </span>
          </h2>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-500 to-transparent"></div>
            <Heart className="w-6 h-6 text-rose-500 animate-pulse" fill="currentColor" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          </motion.div>
          
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto ${mangala.className}`}>
            हमारे विशेष दिन की प्रतीक्षा में हर पल एक नया उत्साह लेकर आता है
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Timer background */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
            {/* Decorative border */}
            <div className="absolute inset-4 border-2 border-rose-200/30 rounded-2xl"></div>
            
            {/* Time units grid */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
              {Object.entries(timeLeft).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <TimeUnit 
                    value={value}
                    label={
                      key === 'days' ? 'दिन' :
                      key === 'hours' ? 'घंटे' :
                      key === 'minutes' ? 'मिनट' :
                      'सेकंड'
                    }
                  />
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-12">
              <div className="relative h-3 bg-gradient-to-r from-rose-100 to-amber-100 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500"
                  initial={{ width: '0%' }}
                  animate={{ width: `${100 - (timeLeft.days / 365) * 100}%` }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
                {/* Moving dots */}
                <motion.div
                  className="absolute top-0 w-3 h-3 bg-white rounded-full shadow-lg"
                  animate={{ left: ['0%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
              </div>
              
              <div className={`flex justify-between mt-3 text-sm ${mangala.className}`}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <span className="text-gray-600">मिलन</span>
                </div>
                <div className="text-rose-600 font-semibold">
                  {Math.round(100 - (timeLeft.days / 365) * 100)}% तैयार
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">विवाह</span>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                </div>
              </div>
            </div>

            {/* Celebration message */}
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className={`inline-block px-8 py-4 bg-gradient-to-r from-rose-500/10 to-amber-500/10 backdrop-blur-sm rounded-2xl border border-white/20 ${mangala.className}`}>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent"
                >
                  {timeLeft.days > 30 ? "शादी शुरू होने में अभी थोड़ा समय है!" :
                   timeLeft.days > 7 ? "शादी शुरू होने में बस कुछ ही दिन!" :
                   timeLeft.days > 1 ? "कल है शादी! तैयार हो जाइए!" :
                   "आज है दिन! मुबारक हो!"}
                </motion.div>
                
                {timeLeft.days < 7 && (
                  <motion.p 
                    className="mt-2 text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    🎉 उत्सव शुरू होने वाला है! 🎉
                  </motion.p>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom decorative elements */}
        <motion.div 
          className="flex justify-center gap-6 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {['🌸', '🪔', '🎊', '💝', '🎉'].map((icon, index) => (
            <motion.div
              key={index}
              className="text-3xl"
              animate={{ 
                y: [0, -15, 0],
                rotate: index % 2 === 0 ? [0, 10, 0] : [0, -10, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                delay: index * 0.2
              }}
            >
              {icon}
            </motion.div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.div 
          className={`mt-12 text-center ${mangala.className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="inline-flex items-center gap-4">
            <div className="w-12 h-px bg-gradient-to-r from-rose-400 to-transparent"></div>
            <p className="text-gray-600 italic text-lg">
              "प्रेम की यह यात्रा अब अपने चरम पर पहुँचने वाली है"
            </p>
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Countdown;