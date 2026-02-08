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

const FlowerConfetti = ({ show, onComplete }: { show: boolean; onComplete: () => void }) => {
  const [flowers, setFlowers] = useState<Array<{ id: number; x: number; y: number; rotation: number; size: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      const newFlowers = [];
      const container = containerRef.current;
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();

      for (let i = 0; i < 50; i++) {
        newFlowers.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          rotation: Math.random() * 360,
          size: 10 + Math.random() * 16
        });
      }

      setFlowers(newFlowers);

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
      style={{ width: '100vw', height: '100vh' }}
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
          transition={{ duration: 2 + Math.random(), ease: "easeIn" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-amber-400 to-rose-500 rounded-full"></div>
        </motion.div>
      ))}
    </div>
  );
};

// -------- DATA --------

const brideFamilyMembers: FamilyMember[] = [
  {
    id: 1,
    name: "श्री रणवीर सिंह राठौड़",
    relation: "पिता",
    role: "कुलपति",
    blessings: "सदा सुखी रहो, गौरव से जियो",
    image: "https://images.unsplash.com/photo-1706185651641-70fde5591275?q=80&w=880&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "श्रीमती रजनी सिंह राठौड़",
    relation: "माता",
    role: "कुलवधू",
    blessings: "सासु माँ का आशीर्वाद सदा साथ रहे",
    image: "https://img.freepik.com/free-photo/indian-woman-portrait-temple_53876-13366.jpg"
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
    image: "https://images.unsplash.com/photo-1736452560705-be261e8e5171?q=80&w=1170&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "बालिका आराध्या",
    relation: "बहन",
    role: "सहचरी",
    blessings: "दीदी का प्यार हमेशा साथ रहे",
    image: "https://img.freepik.com/free-photo/celebration-deity-navratri_23-2151220070.jpg"
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
    name: "श्रीमती योएशवरी सिंह सिसोदिया",
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
    image: "https://i.pinimg.com/736x/1d/7a/86/1d7a86423ee393abac32b2b3d99e68f1.jpg"
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
    image: "https://i.pinimg.com/1200x/06/8f/ea/068fea755aac802498776fe7d73ce9d2.jpg"
  },
  {
    id: 15,
    name: "बालिका कनिष्का",
    relation: "भांजी",
    role: "घर की लक्ष्मी",
    blessings: "बुआ की तरह गुणवती बनो",
    image: "https://i.pinimg.com/1200x/67/1d/05/671d05378d3c47b12273f56d9fa21615.jpg"
  }
];

// -------- COMPONENT --------

const FamilyDetails = () => {
  const [activeGroup, setActiveGroup] = useState<number>(0);
  const [showFlowerConfetti, setShowFlowerConfetti] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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

  if (!mounted) return null;

  return (
    <>
      <FlowerConfetti show={showFlowerConfetti} onComplete={() => setShowFlowerConfetti(false)} />

      <section className="py-10 px-4 bg-gradient-to-b from-amber-50 to-rose-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            <Music className="w-6 h-6 text-rose-500" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent"></div>
          </div>
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <Home className="w-7 h-7 text-amber-600" />
              <h1 className={`text-3xl md:text-4xl font-bold ${greatVibes.className} bg-gradient-to-r from-amber-700 via-yellow-600 to-rose-700 bg-clip-text text-transparent`}>
                परिवार परिचय
              </h1>
              <Users className="w-7 h-7 text-rose-600" />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide mb-10 pb-2">
            {familyGroups.map((group, index) => (
              <button
                key={group.title}
                onClick={() => setActiveGroup(index)}
                className={`flex-shrink-0 mx-2 px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-3 ${activeGroup === index
                    ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg'
                    : `bg-gradient-to-r ${group.color} text-amber-900 shadow-md`
                  }`}
              >
                {group.icon}
                <span className={`font-bold text-sm ${mangala.className}`}>
                  {group.title}
                </span>
              </button>
            ))}
          </div>

          {/* MEMBERS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {familyGroups[activeGroup].members.map((member) => (

              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                 transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative bg-white/95 backdrop-blur rounded-3xl p-7 shadow-xl border border-amber-300/40 hover:shadow-2xl transition-all"
              >


                {/* BIG PHOTO TOP */}
                <div className="flex flex-col items-center text-center">

                  <div className="relative mb-5">
                    <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-[5px] border-amber-300 shadow-xl bg-gradient-to-br from-amber-200 to-rose-200">

                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Users className="w-16 h-16 text-amber-700 m-auto" />
                      )}
                    </div>

                    {/* Relation Icon Badge */}
                    <div className="absolute -bottom-2 right-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full p-2 shadow">
                      {member.relation === 'पिता' || member.relation === 'माता' ? (
                        <Heart className="w-4 h-4" fill="white" />
                      ) : member.relation.includes('भैया') ? (
                        <Sword className="w-4 h-4" />
                      ) : member.relation.includes('दादा') || member.relation.includes('दादी') ? (
                        <Crown className="w-4 h-4" />
                      ) : (
                        <Star className="w-4 h-4" fill="currentColor" />
                      )}
                    </div>
                  </div>

                  {/* NAME */}
                  <h3 className={`font-bold text-xl text-amber-900 mb-2 ${mangala.className}`}>
                    {member.name}
                  </h3>

                  {/* TAGS */}
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <span className="px-4 py-1 bg-amber-100 rounded-full text-xs font-semibold text-amber-800">
                      {member.relation}
                    </span>
                    <span className="px-4 py-1 bg-rose-100 rounded-full text-xs font-semibold text-rose-800">
                      {member.role}
                    </span>
                  </div>

                </div>

                {/* BLESSINGS */}
                <div className="border-t border-amber-100 pt-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
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

          {/* CONFETTI BUTTON */}
          <div className="text-center mt-14">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFlowerConfetti(true)}
              className="px-10 py-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full shadow-lg flex items-center gap-3 mx-auto hover:shadow-xl"
            >
              <Sparkles className="w-5 h-5" />
              <span className={`text-lg ${mangala.className}`}>
                आशीर्वाद दें
              </span>
              <Sparkles className="w-5 h-5" />
            </motion.button>
          </div>
          <p className={`mt-4 text-center text-amber-700 text-sm ${karma.className}`}>
            परिवार के प्रेम और आशीर्वाद से यह पावन बंधन और भी मजबूत बने
          </p>


        </div>
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
