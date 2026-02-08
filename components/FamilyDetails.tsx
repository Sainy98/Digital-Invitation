// components/FamilyDetails.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Heart, Crown, Shield, Sword, Flower2, Star, 
  Sparkles, Home, Music
} from 'lucide-react';
import { karma, mangala, greatVibes } from '@/app/fonts';

interface FamilyMember {
  id: number;
  name: string;
  relation: string;
  role: string;
  blessings: string;
  image?: string;
}

interface FamilyGroup {
  title: string;
  description: string;
  members: FamilyMember[];
  color: string;
  icon: React.ReactNode;
}

// ✅ Custom Flower Confetti Component
const FlowerConfetti = ({ show, onComplete }: { show: boolean; onComplete: () => void }) => {
  const [flowers, setFlowers] = useState<Array<{ id: number; x: number; y: number; rotation: number; size: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      const newFlowers = [];
      const container = containerRef.current;
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();
      
      // Create 50 flowers in random positions
      for (let i = 0; i < 50; i++) {
        newFlowers.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          rotation: Math.random() * 360,
          size: 8 + Math.random() * 12
        });
      }
      
      setFlowers(newFlowers);

      // Hide after 3 seconds
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setFlowers([]);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      style={{ 
        top: '0px', // Fixed to viewport
        left: '0px',
        width: '100vw',
        height: '100vh'
      }}
    >
      {flowers.map((flower) => (
        <motion.div
          key={flower.id}
          className="absolute"
          style={{
            left: `${flower.x}px`,
            top: `${flower.y}px`,
            width: `${flower.size}px`,
            height: `${flower.size}px`,
            transform: `rotate(${flower.rotation}deg)`,
          }}
          animate={{
            y: [0, window.innerHeight],
            opacity: [1, 0],
            rotate: [flower.rotation, flower.rotation + 360]
          }}
          transition={{
            duration: 2 + Math.random(),
            ease: "easeIn"
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-amber-400 to-rose-500 rounded-full"></div>
        </motion.div>
      ))}
    </div>
  );
};

// ✅ EASY TO UPDATE - Just modify these arrays
const brideFamilyMembers: FamilyMember[] = [
  {
    id: 1,
    name: "श्री रणवीर सिंह राठौड़",
    relation: "पिता",
    role: "कुलपति",
    blessings: "सदा सुखी रहो, गौरव से जियो",
    image: "https://images.unsplash.com/photo-1706185651641-70fde5591275?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    name: "श्रीमती रजनी सिंह राठौड़",
    relation: "माता",
    role: "कुलवधू",
    blessings: "सासु माँ का आशीर्वाद सदा साथ रहे",
    image: "https://img.freepik.com/free-photo/indian-woman-portrait-temple_53876-13366.jpg?t=st=1770536449~exp=1770540049~hmac=a6471730992de3a98b20ffe0160bb2491aace64d9f6a72282c2e2407e710de59&w=1480"
  },
  {
    id: 3,
    name: "वीर विक्रम सिंह",
    relation: "बड़े भैया",
    role: "अनुज संरक्षक",
    blessings: "भाई का साया सदा तुम्हारे साथ रहे",
    image: "https://i.pinimg.com/1200x/bb/e5/71/bbe57197a1546107324754f18460ccde.jpg"
  },
  {
    id: 4,
    name: "कुंवर अर्जुन सिंह",
    relation: "छोटे भैया",
    role: "सहायक",
    blessings: "खुशियाँ तुम्हारे कदम चूमें",
    image: "https://images.unsplash.com/photo-1736452560705-be261e8e5171?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 5,
    name: "बालिका आराध्या",
    relation: "बहन",
    role: "सहचरी",
    blessings: "दीदी का प्यार हमेशा साथ रहे",
    image: "https://img.freepik.com/free-photo/celebration-deity-navratri_23-2151220070.jpg?t=st=1770536374~exp=1770539974~hmac=31d2405256fd8f6ccbc31ab80a8631a624b80c91219665005d69457a6e0c2816&w=1480"
  }
];

const groomFamilyMembers: FamilyMember[] = [
  {
    id: 6,
    name: "श्री महेंद्र सिंह सिसोदिया",
    relation: "पिता",
    role: "कुलगुरु",
    blessings: "वंश की मर्यादा सदा कायम रखो",
    image: "https://i.pinimg.com/736x/81/a5/48/81a54842ebd3cbc95a02f8c1c2e14847.jpg"
  },
  {
    id: 7,
    name: "श्रीमती योएशवरी  सिंह सिसोदिया",
    relation: "माता",
    role: "कुलदेवी",
    blessings: "माँ का आशीर्वाद तुम्हारे सिर पर सदा बना रहे",
    image: "https://i.pinimg.com/1200x/a0/5b/18/a05b1869da73856dad13d74dc659e0b2.jpg"
  },
  {
    id: 8,
    name: "वीर युवराज सिंह",
    relation: "बड़े भैया",
    role: "मार्गदर्शक",
    blessings: "सफलता तुम्हारे कदम चूमे",
    image: "https://i.pinimg.com/736x/fb/6a/a3/fb6aa393f2376030012677b93773383a.jpg"
  },
  {
    id: 9,
    name: "कुंवर हर्षवर्धन सिंह",
    relation: "छोटे भैया",
    role: "उत्साहवर्धक",
    blessings: "जीवन में सदा आगे बढ़ते रहो",
    image: "https://i.pinimg.com/736x/4d/40/8a/4d408a58c7ba354a71df40ab0401db5c.jpg"
  },
  {
    id: 10,
    name: "बालक भानुप्रताप",
    relation: "भतीजा",
    role: "कुलदीपक",
    blessings: "चाचा का नाम रोशन करो",
    image: "https://i.pinimg.com/736x/f0/70/ce/f070ce870271973b92087310c957b822.jpg"
  }
];

const eldersMembers: FamilyMember[] = [
  {
    id: 11,
    name: "ठाकुर रणजीत सिंह जी",
    relation: "दादा जी",
    role: "परिवार के स्तंभ",
    blessings: "वंश की परंपरा निभाओ, नाम रोशन करो",
    image: "https://i.pinimg.com/736x/7b/ad/22/7bad228092e1638086e45475d6c74d10.jpg"
  },
  {
    id: 12,
    name: "श्रीमती राजकुमारी देवी जी",
    relation: "दादी जी",
    role: "संस्कारधारी",
    blessings: "सुहागिन बनकर घर को सजाओ",
    image: "https://i.pinimg.com/1200x/77/8c/10/778c10744278641bf197c0234075ffd7.jpg"
  },
  {
    id: 13,
    name: "कुंवर प्रताप सिंह जी",
    relation: "ताऊ जी",
    role: "मार्गदर्शक",
    blessings: "परिवार की लाज रखो",
    image: "https://i.pinimg.com/736x/29/47/ef/2947ef11c833726e701d859e21b070be.jpg"
  },
  {
    id: 14,
    name: "बालक कुशाग्र",
    relation: "भांजा",
    role: "कुल का भविष्य",
    blessings: "मामा की तरह वीर बनो",
    image: "https://i.pinimg.com/736x/f4/c8/c2/f4c8c2598ca602593e23f96aa880a497.jpg"
  },
  {
    id: 15,
    name: "बालिका कनिष्का",
    relation: "भांजी",
    role: "घर की लक्ष्मी",
    blessings: "बुआ की तरह गुणवती बनो",
    image: "https://i.pinimg.com/736x/e1/54/2b/e1542b595a9fbbe6eb527d550dab607b.jpg"
  }
];

const FamilyDetails = () => {
  const [activeGroup, setActiveGroup] = useState<number>(0);
  const [showFlowerConfetti, setShowFlowerConfetti] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const familyGroups = [
    {
      title: "वधू परिवार",
      description: "कन्या का परिवार",
      members: brideFamilyMembers,
      color: "from-rose-50 to-pink-50",
      icon: <Flower2 className="w-5 h-5" />
    },
    {
      title: "वर परिवार",
      description: "दूल्हे का परिवार",
      members: groomFamilyMembers,
      color: "from-amber-50 to-yellow-50",
      icon: <Sword className="w-5 h-5" />
    },
    {
      title: "आशीर्वादी",
      description: "बुजुर्गों का आशीर्वाद",
      members: eldersMembers,
      color: "from-emerald-50 to-teal-50",
      icon: <Crown className="w-5 h-5" />
    }
  ];

  const handleConfetti = () => {
    setShowFlowerConfetti(true);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Custom Flower Confetti */}
      <FlowerConfetti 
        show={showFlowerConfetti} 
        onComplete={() => setShowFlowerConfetti(false)} 
      />

      {/* Simple Section */}
      <section ref={sectionRef} className="py-8 px-4 bg-gradient-to-b from-amber-50 to-rose-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <Home className="w-7 h-7 text-amber-600" />
              <h1 className={`text-3xl md:text-4xl font-bold ${greatVibes.className} bg-gradient-to-r from-amber-700 via-yellow-600 to-rose-700 bg-clip-text text-transparent`}>
                परिवार परिचय
              </h1>
              <Users className="w-7 h-7 text-rose-600" />
            </div>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
              <p className={`text-amber-800 text-sm md:text-base ${mangala.className}`}>
                वंश वृक्ष - गौरव और परंपरा
              </p>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-rose-500 to-transparent"></div>
            </div>

            <p className={`text-gray-700 max-w-2xl mx-auto text-sm ${karma.className}`}>
              राजपूत परंपरा के अनुरूप, परिवार के सभी सदस्यों का परिचय
            </p>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide mb-8 pb-2">
            {familyGroups.map((group, index) => (
              <button
                key={group.title}
                onClick={() => setActiveGroup(index)}
                className={`flex-shrink-0 mx-2 px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-3 ${
                  activeGroup === index 
                    ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg' 
                    : `bg-gradient-to-r ${group.color} text-amber-900 shadow-md hover:shadow-lg`
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-full ${
                    activeGroup === index ? 'bg-white/20' : 'bg-white/50'
                  }`}>
                    {group.icon}
                  </div>
                  <div className="text-left">
                    <div className={`font-bold text-sm ${mangala.className}`}>
                      {group.title}
                    </div>
                    <div className={`text-xs ${activeGroup === index ? 'text-white/90' : 'text-amber-700'}`}>
                      {group.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Family Members */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {familyGroups[activeGroup].members.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-amber-200/50 hover:shadow-xl transition-shadow"
                >
                  {/* Member Image/Icon */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-200 to-rose-200 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
                        {member.image ? (
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Users className="w-8 h-8 text-amber-700" />
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full p-1">
                        {member.relation === 'पिता' || member.relation === 'माता' ? (
                          <Heart className="w-3 h-3" fill="white" />
                        ) : member.relation.includes('भैया') ? (
                          <Sword className="w-3 h-3" />
                        ) : member.relation.includes('दादा') || member.relation.includes('दादी') ? (
                          <Crown className="w-3 h-3" />
                        ) : (
                          <Star className="w-3 h-3" fill="currentColor" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold text-amber-900 text-lg mb-1 ${mangala.className}`}>
                        {member.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-rose-100 rounded-full text-xs font-semibold text-amber-800">
                          {member.relation}
                        </span>
                        <span className="px-3 py-1 bg-gradient-to-r from-rose-100 to-amber-100 rounded-full text-xs font-semibold text-rose-800">
                          {member.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Blessings */}
                  <div className="mt-4 pt-4 border-t border-amber-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-rose-500" fill="currentColor" />
                      <span className={`text-sm font-semibold text-amber-800 ${karma.className}`}>
                        आशीर्वाद
                      </span>
                    </div>
                    <p className={`text-amber-900/90 text-sm leading-relaxed ${mangala.className}`}>
                      "{member.blessings}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Ashirwad Button */}
          <div className="text-center mb-12">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleConfetti}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-medium rounded-full shadow-lg flex items-center justify-center gap-3 mx-auto hover:shadow-xl transition-all duration-300 active:scale-95"
            >
              <Sparkles className="w-5 h-5" />
              <span className={`text-lg ${mangala.className}`}>
                आशीर्वाद दें
              </span>
              <Sparkles className="w-5 h-5" />
            </motion.button>
            <p className={`text-amber-600 mt-3 text-sm ${karma.className}`}>
              फूलों की वर्षा के साथ आशीर्वाद भेजें
            </p>
          </div>

          {/* Closing Message */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-4 mb-6">
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
              <Music className="w-8 h-8 text-rose-600" />
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-rose-500 to-transparent"></div>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <p className={`text-amber-800 text-lg mb-4 ${karma.className}`}>
                "परिवार के प्रत्येक सदस्य का आशीर्वाद और समर्थन इस पावन बंधन की नींव है।"
              </p>
              
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500/10 to-rose-500/10 rounded-full border border-amber-200/50">
                <Shield className="w-5 h-5 text-amber-600" />
                <span className={`text-amber-800 font-semibold ${mangala.className}`}>
                  राजपूत परंपरा - गौरव और सम्मान
                </span>
                <Shield className="w-5 h-5 text-rose-600" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default FamilyDetails;