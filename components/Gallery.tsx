// components/Gallery.tsx
'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { karma, mangala } from '@/app/fonts';
import { Heart, Users, Flower2, Sparkles, ChevronLeft, ChevronRight, X, Maximize2, Download, Share2, ZoomIn } from 'lucide-react';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const categories = [
    { id: 'all', name: 'सभी यादें', icon: <Sparkles className="w-4 h-4" />, color: 'from-rose-500 to-amber-500' },
    { id: 'couple', name: 'जोड़ी के पल', icon: <Heart className="w-4 h-4" />, color: 'from-rose-500 to-pink-500' },
    { id: 'prewedding', name: 'शादी की तैयारी', icon: <Flower2 className="w-4 h-4" />, color: 'from-amber-500 to-orange-500' },
    { id: 'family', name: 'परिवार का प्यार', icon: <Users className="w-4 h-4" />, color: 'from-emerald-500 to-teal-500' },
  ];

  const galleryData = [
    {
      id: 1,
      category: "couple",
      title: "पहली मुलाकात",
      description: "अमर प्यार की शुरुआत",
      src: "https://img.freepik.com/free-photo/stylish-indian-hindu-couple-posed-street_627829-2096.jpg",
      date: "15 दिसंबर 2024"
    },
    {
      id: 2,
      category: "couple",
      title: "सगाई समारोह",
      description: "वादों का दिन, प्यार का बंधन",
      src: "https://i.pinimg.com/1200x/99/e3/98/99e3983501461059b1defe223c445130.jpg",
      date: "18 दिसंबर 2024"
    },
    {
      id: 3,
      category: "prewedding",
      title: "मेहंदी रात",
      description: "हाथों की खूबसूरती, प्यार की निशानी",
      src: "https://i.pinimg.com/736x/25/ca/d9/25cad9ff0c16f66151e9749b35fc6d05.jpg",
      date: "21 दिसंबर 2024"
    },
    {
      id: 4,
      category: "family",
      title: "परिवार का आशीर्वाद",
      description: "खुशियों का साथ, आशीष का प्यार",
      src: "https://i.pinimg.com/1200x/fc/11/f8/fc11f8601e4d3255dce70b97a14ec124.jpg",
      date: "22 दिसंबर 2024"
    },
    {
      id: 5,
      category: "family",
      title: "हल्दी समारोह",
      description: "पीली खुशबू, पीली उम्मीदें",
      src: "https://i.pinimg.com/736x/1b/d4/ef/1bd4efa8e098d1c71b4db7e8671774e4.jpg",
      date: "22 दिसंबर 2024"
    },
    {
      id: 6,
      category: "prewedding",
      title: "सगाई की तैयारी",
      description: "हर पल एक याद, हर सजावट एक कहानी",
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "17 दिसंबर 2024"
    },
    {
      id: 7,
      category: "couple",
      title: "रोमांटिक शाम",
      description: "सूरज की अलविदा किरणों में",
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "20 दिसंबर 2024"
    },
    {
      id: 8,
      category: "family",
      title: "संयुक्त परिवार",
      description: "सबका प्यार, सबका आशीर्वाद",
      src: "https://plus.unsplash.com/premium_photo-1682090840373-b06b5237ae74?q=80&w=1170&auto=format&fit=crop",
      date: "23 दिसंबर 2024"
    }
  ];

  const [images, setImages] = useState(galleryData);
  const filteredImages = images.filter(img =>
    selectedCategory === 'all' || img.category === selectedCategory
  );

  const handleNextImage = useCallback(() => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
      const nextIndex = (currentIndex + 1) % filteredImages.length;
      setSelectedImage(filteredImages[nextIndex].id);
    }
  }, [selectedImage, filteredImages]);

  const handlePrevImage = useCallback(() => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
      const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
      setSelectedImage(filteredImages[prevIndex].id);
    }
  }, [selectedImage, filteredImages]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedImage !== null) {
      if (e.key === 'Escape') {
        setSelectedImage(null);
        setIsFullscreen(false);
      }
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'f') setIsFullscreen(!isFullscreen);
    }
  }, [selectedImage, handleNextImage, handlePrevImage, isFullscreen]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Handle mobile gestures
  useEffect(() => {
    if (!selectedImage) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      
      const handleTouchEnd = (e: TouchEvent) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = touchX - endX;
        const diffY = touchY - endY;
        
        // Horizontal swipe (next/prev)
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
          if (diffX > 0) handleNextImage();
          else handlePrevImage();
        }
        
        window.removeEventListener('touchend', handleTouchEnd);
      };
      
      window.addEventListener('touchend', handleTouchEnd);
    };
    
    window.addEventListener('touchstart', handleTouchStart);
    return () => window.removeEventListener('touchstart', handleTouchStart);
  }, [selectedImage, handleNextImage, handlePrevImage]);

  return (
    <section
      id="gallery"
      className="relative py-16 md:py-20 px-4 md:px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fffaf0 0%, #fff5f5 100%)',
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 opacity-5">
          <Flower2 className="w-32 h-32 md:w-24 md:h-24 text-rose-300" />
        </div>
        <div className="absolute bottom-10 right-5 opacity-5">
          <Heart className="w-32 h-32 md:w-24 md:h-24 text-amber-300" />
        </div>
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
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
            }}
            className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-rose-300/30"
            style={{
              left: `${(i * 12 + 5)}%`,
              top: `${(i % 4) * 25 + 10}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center justify-center mb-4 md:mb-6">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-rose-400 mr-2 md:mr-3" />
            <div className="w-6 md:w-8 h-[2px] bg-gradient-to-r from-rose-400 to-amber-400" />
            <div className={`${mangala.className} mx-3 md:mx-4 text-rose-600 text-xs md:text-sm tracking-widest`}>
              हमारी यादें
            </div>
            <div className="w-6 md:w-8 h-[2px] bg-gradient-to-l from-rose-400 to-amber-400" />
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-amber-400 ml-2 md:ml-3" />
          </div>

          <h2 className={`${karma.className} text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6`}>
            <span className="bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
              यादों का संसार
            </span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-lg px-4">
            हर तस्वीर एक कहानी कहती है, हर पल एक याद बन जाता है
          </p>
        </motion.div>

        {/* Category Filter - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-2"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-1 md:gap-2 transition-all duration-300 text-sm md:text-base ${selectedCategory === category.id
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                : 'bg-white text-gray-700 hover:bg-rose-50 border border-rose-100'
                }`}
            >
              <motion.div
                animate={selectedCategory === category.id ? { rotate: 360 } : {}}
                transition={{ duration: 0.5 }}
              >
                {category.icon}
              </motion.div>
              <span className={`${mangala.className} font-medium whitespace-nowrap`}>
                {category.name}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid - Mobile Optimized */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setHoveredImage(image.id)}
                onHoverEnd={() => setHoveredImage(null)}
                onClick={() => setSelectedImage(image.id)}
                className="relative aspect-square cursor-pointer group touch-manipulation"
              >
                {/* Wedding Frame Container */}
                <div className="relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden border-2 border-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                  {/* Golden Frame Corners */}
                  <div className="absolute top-0 left-0 w-4 h-4 md:w-6 md:h-6 border-t-2 border-l-2 border-amber-400 z-10"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 md:w-6 md:h-6 border-t-2 border-r-2 border-amber-400 z-10"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 md:w-6 md:h-6 border-b-2 border-l-2 border-amber-400 z-10"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 md:w-6 md:h-6 border-b-2 border-r-2 border-amber-400 z-10"></div>

                  {/* Image Container */}
                  <div className="relative w-full h-full">
                    {/* Loading Skeleton */}
<div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 to-black/40 animate-pulse"></div>
                    
                    {/* Actual Image */}
                    <img
                      src={image.src}
                      alt={image.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-4">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className={`text-white font-bold text-sm md:text-base mb-1 ${karma.className} drop-shadow-lg`}>
                          {image.title}
                        </h3>
                        <p className="text-white/90 text-xs md:text-sm line-clamp-2 drop-shadow">
                          {image.description}
                        </p>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs backdrop-blur-sm ${image.category === 'couple' ? 'bg-rose-600/90 text-white' :
                      image.category === 'prewedding' ? 'bg-amber-600/90 text-white' :
                        'bg-emerald-600/90 text-white'
                      } ${mangala.className}`}>
                      {categories.find(c => c.id === image.category)?.name}
                    </div>

                    {/* Zoom Icon on Hover */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: hoveredImage === image.id ? 1 : 0, scale: hoveredImage === image.id ? 1 : 0 }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <ZoomIn className="w-8 h-8 text-white/80 drop-shadow-2xl" />
                    </motion.div>
                  </div>
                </div>

                {/* Floating Sparkles */}
                {hoveredImage === image.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-1 -right-1 z-10"
                  >
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-400 fill-current" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Lightbox Modal - Mobile Optimized */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedImage(null);
                setIsFullscreen(false);
              }}
              className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/95 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`relative ${isFullscreen ? 'w-full h-full' : 'max-w-4xl w-full max-h-[90vh]'} bg-gradient-to-br from-white to-rose-50 rounded-xl md:rounded-3xl overflow-hidden shadow-2xl`}
              >
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setSelectedImage(null);
                    setIsFullscreen(false);
                  }}
                  className="absolute top-3 md:top-4 right-3 md:right-4 z-50 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                </motion.button>

                {/* Fullscreen Toggle */}
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="absolute top-3 md:top-4 right-12 md:right-16 z-50 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <Maximize2 className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                </motion.button>

                {filteredImages.find(img => img.id === selectedImage) && (
                  <div className="h-full flex flex-col">
                    {/* Image Container */}
                    <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden">
                      <motion.div
                        key={selectedImage}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full h-full flex items-center justify-center"
                      >
                        <img
                          src={filteredImages.find(img => img.id === selectedImage)!.src}
                          alt={filteredImages.find(img => img.id === selectedImage)!.title}
                          className="max-w-full max-h-full object-contain rounded-lg md:rounded-xl shadow-2xl"
                        />
                        
                        {/* Swipe Instructions for Mobile */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center md:hidden">
                          <div className="bg-black/50 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full flex items-center gap-2">
                            <ChevronLeft className="w-3 h-3" />
                            <span>Swipe to navigate</span>
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Info Panel */}
                    <div className="border-t border-gray-200 bg-white/90 backdrop-blur-sm p-4 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${filteredImages.find(img => img.id === selectedImage)!.category === 'couple' ? 'bg-rose-100 text-rose-700' :
                              filteredImages.find(img => img.id === selectedImage)!.category === 'prewedding' ? 'bg-amber-100 text-amber-700' :
                                'bg-emerald-100 text-emerald-700'
                              } ${mangala.className}`}>
                              {categories.find(c => c.id === filteredImages.find(img => img.id === selectedImage)!.category)?.name}
                            </div>
                            <span className="text-xs text-gray-500">
                              {filteredImages.find(img => img.id === selectedImage)!.date}
                            </span>
                          </div>
                          <h3 className={`text-xl md:text-3xl font-bold text-gray-800 mb-2 ${karma.className}`}>
                            {filteredImages.find(img => img.id === selectedImage)!.title}
                          </h3>
                          <p className={`text-gray-600 text-sm md:text-lg leading-relaxed ${mangala.className}`}>
                            {filteredImages.find(img => img.id === selectedImage)!.description}
                          </p>
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center justify-between md:justify-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-gray-200">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handlePrevImage}
                            className="flex items-center gap-2 px-4 py-2 md:px-3 md:py-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            <ChevronLeft className="w-5 h-5" />
                            <span className="text-sm font-medium md:hidden">पिछली</span>
                          </motion.button>

                          <div className={`${mangala.className} text-gray-500 text-sm md:text-base`}>
                            <span className="font-bold text-rose-600">
                              {filteredImages.findIndex(img => img.id === selectedImage) + 1}
                            </span>
                            <span className="mx-2">/</span>
                            <span>{filteredImages.length}</span>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleNextImage}
                            className="flex items-center gap-2 px-4 py-2 md:px-3 md:py-3 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition-colors"
                          >
                            <span className="text-sm font-medium md:hidden">अगली</span>
                            <ChevronRight className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Touch Navigation for Mobile */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-auto">
                  <button
                    onClick={handlePrevImage}
                    className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-auto">
                  <button
                    onClick={handleNextImage}
                    className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className={`${mangala.className} text-gray-600 mb-4 md:mb-6 text-sm md:text-base`}>
            और भी खूबसूरत पल जुड़ेंगे इस अलबम में...
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 md:px-8 py-3 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-200 hover:shadow-rose-300 transition-all duration-300 text-sm md:text-base"
          >
            <span className={`${karma.className} font-bold`}>
              सभी तस्वीरें देखें
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;