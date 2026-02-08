// components/Events.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MapPin, Clock, Calendar, Sparkles, Music, Flower2, Palette, PartyPopper, Heart, Bell, TrendingUp, Star, ChevronDown } from 'lucide-react';
import { karma, mangala } from '@/app/fonts';


const events = [
  {
    id: 1,
    name: 'हल्दी समारोह',
    hindiName: 'हल्दी',
    date: '२२ दिसंबर २०२४',
    time: 'सुबह १०:०० बजे',
    venue: 'वर पक्ष का आवास',
    description: 'पारंपरिक हल्दी समारोह, सुख-समृद्धि और सौभाग्य के लिए',
    icon: Palette,
    color: 'from-yellow-400 to-amber-500',
    imageColor: 'bg-gradient-to-br from-yellow-100 to-amber-100',
    highlights: ['पारंपरिक अनुष्ठान', 'परिवार की भागीदारी', 'आशीर्वाद समारोह'],
    realDate: '2024-12-22',
    imageUrl: 'https://images.unsplash.com/photo-1698460895537-a418b64bcc54?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    name: 'मेंहदी समारोह',
    hindiName: 'मेंहदी',
    date: '२३ दिसंबर २०२४',
    time: 'दोपहर ३:०० बजे',
    venue: 'वधू पक्ष का आवास',
    description: 'सुंदर मेंहदी डिजाइनों से सजी हथेलियाँ, प्रेम और सौभाग्य का प्रतीक',
    icon: Flower2,
    color: 'from-emerald-400 to-green-500',
    imageColor: 'bg-gradient-to-br from-emerald-100 to-green-100',
    highlights: ['कलात्मक मेंहदी डिजाइन', 'स्त्रियों का समारोह', 'संगीत और नृत्य'],
    realDate: '2024-12-23',
    imageUrl: 'https://images.unsplash.com/photo-1583878544826-8f8c418033ed?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 3,
    name: 'संगीत रात',
    hindiName: 'संगीत',
    date: '२४ दिसंबर २०२४',
    time: 'शाम ७:०० बजे',
    venue: 'राजमहल लॉन',
    description: 'नृत्य और संगीत की रात, जहाँ हर धुन प्यार की कहानी कहती है',
    icon: Music,
    color: 'from-purple-400 to-pink-500',
    imageColor: 'bg-gradient-to-br from-purple-100 to-pink-100',
    highlights: ['लाइव संगीत', 'पारंपरिक नृत्य', 'मनोरंजन कार्यक्रम'],
    realDate: '2024-12-24',
    imageUrl: 'https://img.freepik.com/free-photo/photorealistic-wedding-venue-with-intricate-decor-ornaments_23-2151481480.jpg?t=st=1770456607~exp=1770460207~hmac=0d8054fb91a52d2601e2787f08f8ca69757ef5211bda7acb5cad99d91b5e7853&w=1480'
  },
  {
    id: 4,
    name: 'विवाह समारोह',
    hindiName: 'विवाह',
    date: '२५ दिसंबर २०२४',
    time: 'शाम ५:३० बजे',
    venue: 'श्रीनाथजी मंदिर',
    description: 'सात फेरों का पावन संस्कार, जीवन भर के लिए वचनबद्धता',
    icon: Sparkles,
    color: 'from-rose-500 to-red-500',
    imageColor: 'bg-gradient-to-br from-rose-100 to-red-100',
    highlights: ['मुख्य विवाह समारोह', 'सात फेरे', 'पंडित द्वारा अनुष्ठान'],
    realDate: '2024-12-25',
    imageUrl: 'https://img.freepik.com/free-photo/hands-indian-bride-groom-intertwined-together-making-authentic-wedding-ritual_8353-10047.jpg?t=st=1770456646~exp=1770460246~hmac=7ff2938e315666d897733ff9e76a327394a54f8f6c6da0a4c31f649cb0c47b57&w=1480'
  },
  {
    id: 5,
    name: 'रिसेप्शन',
    hindiName: 'स्वागत समारोह',
    date: '२६ दिसंबर २०२४',
    time: 'शाम ८:०० बजे',
    venue: 'उदयपुर पैलेस',
    description: 'दो परिवारों का मिलन, आनंद और उत्सव की रात',
    icon: PartyPopper,
    color: 'from-blue-400 to-cyan-500',
    imageColor: 'bg-gradient-to-br from-blue-100 to-cyan-100',
    highlights: ['विशेष भोज', 'गेस्ट इंटरेक्शन', 'फोटो सेशन'],
    realDate: '2024-12-26',
    imageUrl: 'https://img.freepik.com/free-photo/woman-beige-indian-dress-bends-feet-wedding-couple_8353-771.jpg?t=st=1770456751~exp=1770460351~hmac=3b26592b5ab6da0582261cfafc4e755e0560edf59efd71d516c4305625d9a3de&w=1480'
  }
];

const Events = () => {
  const [currentEvent, setCurrentEvent] = useState<number | null>(null);
  const [nextEvent, setNextEvent] = useState<number | null>(null);
  const [todaysEvents, setTodaysEvents] = useState<number[]>([]);

  useEffect(() => {
    // Calculate current and upcoming events
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let foundCurrent = false;
    let foundNext = false;
    const todays: number[] = [];

    events.forEach((event, index) => {
      const eventDate = new Date(event.realDate);
      eventDate.setHours(0, 0, 0, 0);
      
      if (eventDate.getTime() === today.getTime()) {
        todays.push(index);
        if (!foundCurrent) {
          setCurrentEvent(index);
          foundCurrent = true;
        }
      } else if (eventDate > today && !foundNext) {
        setNextEvent(index);
        foundNext = true;
      }
    });

    setTodaysEvents(todays);
  }, []);

  const getEventStatus = (eventIndex: number) => {
    if (todaysEvents.includes(eventIndex)) {
      return {
        text: 'आज का कार्यक्रम',
        icon: Bell,
        color: 'from-rose-500 to-pink-500',
        bgColor: 'bg-gradient-to-br from-rose-50 to-pink-50',
        borderColor: 'border-rose-200'
      };
    } else if (eventIndex === nextEvent) {
      return {
        text: 'अगला कार्यक्रम',
        icon: TrendingUp,
        color: 'from-amber-500 to-orange-500',
        bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
        borderColor: 'border-amber-200'
      };
    } else if (eventIndex === currentEvent) {
      return {
        text: 'चल रहा है',
        icon: Sparkles,
        color: 'from-emerald-500 to-green-500',
        bgColor: 'bg-gradient-to-br from-emerald-50 to-green-50',
        borderColor: 'border-emerald-200'
      };
    }
    return null;
  };

  return (
    <section id="events" className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-rose-50/30 via-white to-amber-50/30">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -30, 0],
              rotate: 360,
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute text-3xl"
            style={{
              left: `${(i + 1) * 18}%`,
              top: `${(i % 3) * 30}%`,
            }}
          >
            <Flower2 className="text-rose-200/40" />
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Calendar className="w-8 h-8 text-amber-500" />
            </motion.div>
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-800 ${karma.className}`}>
              <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 bg-clip-text text-transparent">
                शुभ समारोह कार्यक्रम
              </span>
            </h2>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="w-8 h-8 text-rose-500" />
            </motion.div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
            className={`text-xl text-gray-600 max-w-3xl mx-auto ${mangala.className}`}
          >
            हमारी खुशी के इन विशेष पलों में आपकी उपस्थिति हमारे लिए सम्मान की बात होगी
          </motion.p>
        </motion.div>

        {/* Today's Event Banner */}
        {(currentEvent !== null || todaysEvents.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-rose-500/10 to-amber-500/10 backdrop-blur-sm rounded-3xl p-6 border border-white/40 shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-amber-500 rounded-2xl flex items-center justify-center">
                    <Bell className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold text-gray-800 ${karma.className}`}>
                      {todaysEvents.length > 0 ? 'आज का विशेष कार्यक्रम' : 'अगला कार्यक्रम'}
                    </h3>
                    <p className={`text-gray-600 ${mangala.className}`}>
                      {todaysEvents.length > 0 
                        ? 'आज हमारे विवाह के इन खास समारोहों में शामिल हों'
                        : 'आने वाले समारोह की तैयारी करें'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {todaysEvents.length > 0 ? (
                      <>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-3 h-3 bg-rose-500 rounded-full"
                        />
                        <span className="font-semibold text-rose-600">
                          {todaysEvents.length} कार्यक्रम आज
                        </span>
                      </>
                    ) : nextEvent !== null && (
                      <>
                        <Clock className="w-5 h-5 text-amber-600" />
                        <span className="font-semibold text-amber-700">
                          {events[nextEvent].hindiName} जल्द ही
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Events Grid */}
   {/* Wedding Events Grid with Photos */}
<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
  {events.map((event, index) => {
    const status = getEventStatus(index);
    
    return (
      <div
        key={event.id}
        data-aos="fade-up"
        data-aos-delay={index * 100}
        data-aos-duration="600"
        data-aos-once="true"
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ 
            y: -10,
            transition: { duration: 0.3 }
          }}
          className="relative group"
        >
          {/* Status Badge with Wedding Ribbon */}
          {status && (
            <motion.div
              initial={{ opacity: 0, y: -20, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
              className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-30"
            >
              {/* Ribbon Effect */}
              <div className="relative">
                {/* Ribbon ends */}
                <div className="absolute -top-3 -left-2 w-4 h-6 bg-gradient-to-br from-rose-500 to-pink-500 rounded-tl-full rounded-bl-full"></div>
                <div className="absolute -top-3 -right-2 w-4 h-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-tr-full rounded-br-full"></div>
                
                {/* Status badge */}
                <div className={`px-4 py-2 rounded-full ${status.bgColor} border ${status.borderColor} shadow-xl backdrop-blur-sm flex items-center gap-2 relative z-10`}>
                  <status.icon className={`w-4 h-4 bg-gradient-to-br ${status.color} bg-clip-text text-transparent`} />
                  <span className={`text-sm font-semibold bg-gradient-to-br ${status.color} bg-clip-text text-transparent`}>
                    {status.text}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Wedding Invitation Card */}
          <div className={`relative h-full bg-gradient-to-br from-white via-rose-50/50 to-amber-50/50 rounded-3xl shadow-2xl overflow-hidden border-2 border-white/40 ${
            status ? 'pt-8' : 'pt-6'
          }`}>
            {/* Golden Border Top */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
            
            {/* Event Photo Header */}
            <div className="relative h-64 overflow-hidden group">
              {/* Photo Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent z-10"></div>
              
              {/* Floral Border */}
              <div className="absolute inset-0 border-4 border-transparent">
                <div className="absolute -top-4 -left-4 w-8 h-8">
                  <Flower2 className="w-full h-full text-white/40" />
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8">
                  <Flower2 className="w-full h-full text-white/40" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8">
                  <Flower2 className="w-full h-full text-white/40" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8">
                  <Flower2 className="w-full h-full text-white/40" />
                </div>
              </div>
              
              {/* Event Image */}
              <div className={`relative w-full h-full ${event.imageColor} flex items-center justify-center`}>
                {/* Placeholder for actual image */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Add your images: /events/{event-id}.jpg */}

                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <event.icon className="w-32 h-32 text-white" />
                  </div>
                  
                  {/* Mandala Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-48 h-48 border-2 border-white rounded-full"></div>
                      <div className="w-32 h-32 border-2 border-white rounded-full mt-8"></div>
                    </div>
                  </div>
                </div>
                
                {/* Photo Hover Effect */}
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${event.imageUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              </div>

              {/* Event Icon on Photo */}
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`absolute -bottom-6 left-6 w-20 h-20 rounded-2xl bg-gradient-to-br ${event.color} flex items-center justify-center shadow-2xl z-20 border-4 border-white`}
              >
                <event.icon className="w-10 h-10 text-white" />
                
                {/* Golden Ring Effect */}
                <div className="absolute -inset-2 border-2 border-amber-300/50 rounded-2xl animate-pulse"></div>
                
                {/* Sparkles */}
                {status && (
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 10, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="absolute -inset-3 border-2 border-white/30 rounded-2xl"
                  />
                )}
              </motion.div>

              {/* Event Name with Decorative Background */}
              <div className="absolute bottom-4 right-6 text-right z-20">
                <div className="relative">
                  {/* Text Background */}
                  <div className="absolute -inset-4 bg-black/30 backdrop-blur-sm rounded-xl -z-10"></div>
                  
                  {/* Hindi Name */}
                  <h3 className={`text-2xl md:text-3xl font-bold text-white ${karma.className} drop-shadow-lg`}>
                    {event.hindiName}
                  </h3>
                  
                  {/* English Name */}
                  <p className="text-amber-200 text-sm md:text-base font-medium drop-shadow">
                    {event.name}
                  </p>
                </div>
              </div>

              {/* Today's Event Indicator */}
              {todaysEvents.includes(index) && (
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute top-4 right-4 z-20"
                >
                  <div className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl">
                    <Clock className="w-4 h-4 text-white animate-pulse" />
                    <span className="text-xs font-bold text-white">LIVE TODAY</span>
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Event Details with Wedding Card Style */}
            <div className="p-6 pt-10 relative">
              {/* Decorative Corner Elements */}
              <div className="absolute top-3 left-3 opacity-20">
                <Heart className="w-4 h-4 text-rose-400" fill="currentColor" />
              </div>
              <div className="absolute top-3 right-3 opacity-20">
                <Heart className="w-4 h-4 text-amber-400" fill="currentColor" />
              </div>
              
              {/* Description */}
              <p className={`text-gray-700 mb-6 ${mangala.className} text-center leading-relaxed`}>
                {event.description}
              </p>
              
              {/* Wedding Details Grid */}
              <div className="space-y-4 mb-6">
                {/* Date Card */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-rose-50/80 to-white rounded-2xl border border-rose-100 shadow-sm"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">शुभ तारीख</div>
                    <div className="font-bold text-gray-800 text-lg">{event.date}</div>
                    {todaysEvents.includes(index) && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-1 mt-1"
                      >
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-xs text-amber-600 font-bold">आज का विशेष दिन!</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Time Card */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50/80 to-white rounded-2xl border border-amber-100 shadow-sm"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">मुहूर्त समय</div>
                    <div className="font-bold text-gray-800 text-lg">{event.time}</div>
                    {todaysEvents.includes(index) && (
                      <div className="text-xs text-rose-600 font-bold mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>शुभ समय पर पहुँचें</span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Venue Card */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50/80 to-white rounded-2xl border border-emerald-100 shadow-sm"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">पावन स्थल</div>
                    <div className="font-bold text-gray-800 text-lg leading-tight">{event.venue}</div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>Google Maps में देखें</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Wedding Rituals Highlights */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h4 className="font-bold text-gray-800 text-lg">विशेष रस्में एवं आकर्षण</h4>
                  <Sparkles className="w-5 h-5 text-rose-500" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {event.highlights.map((highlight, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 bg-gradient-to-r from-white to-gray-50 rounded-full text-sm font-medium text-gray-700 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {highlight}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Golden Button with Hover Effect */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 bg-gradient-to-r ${event.color} text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group`}
              >
                {/* Button Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Button Content */}
                <MapPin className="w-5 h-5" />
                <span className="text-base">
                  {todaysEvents.includes(index) ? 'आज का मार्गदर्शन प्राप्त करें' : 'स्थान का नक्शा देखें'}
                </span>
                <Sparkles className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Bottom Golden Border */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
        </motion.div>
      </div>
    );
  })}
</div>

{/* Wedding Journey Timeline - Mobile First */}
<div className="lg:hidden mt-16">
  <div className="relative px-4">
    {/* Section Header */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      className="text-center mb-12"
    >
      <div className="inline-flex items-center justify-center mb-4">
        <Sparkles className="w-6 h-6 text-amber-500 mr-2" />
        <h3 className={`text-2xl font-bold text-gray-800 ${karma.className}`}>
          <span className="bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
            विवाह यात्रा
          </span>
        </h3>
        <Sparkles className="w-6 h-6 text-rose-500 ml-2" />
      </div>
      <p className={`text-gray-600 ${mangala.className}`}>
        शादी के सभी रस्मों का सफर
      </p>
    </motion.div>

    {/* Timeline Track - Wedding Garland Style */}
    <div className="relative">
      {/* Garland line with marigold pattern */}
      <div className="absolute left-8 top-0 bottom-0 w-3">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-300 via-rose-300 to-orange-300 rounded-full shadow-lg"></div>
        {/* Marigold pattern */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#fbbf24_10px,#fbbf24_20px)] opacity-20 rounded-full"></div>
        
        {/* Flowing light effect */}
        <motion.div
          animate={{ 
            y: [0, '100%', 0],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 w-full h-32 bg-gradient-to-b from-transparent via-white/50 to-transparent rounded-full"
        />
      </div>

      {/* Diya at top */}
      <motion.div
        animate={{ 
          y: [0, -5, 0],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity 
        }}
        className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full shadow-lg flex items-center justify-center"
      >
        <div className="w-3 h-3 bg-gradient-to-b from-yellow-300 to-yellow-100 rounded-full"></div>
      </motion.div>

      {/* Timeline Events */}
      <div className="space-y-12 pl-16">
        {events.map((event, index) => {
          const isCurrent = todaysEvents.includes(index);
          const isPast = currentEvent !== null && index < currentEvent;
          const isNext = index === nextEvent;
          
          return (
            <div
              key={event.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-duration="600"
              className="relative"
            >
              {/* Timeline Node - Wedding Ring Style */}
              <div className="absolute -left-12 top-6 z-20">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="relative"
                >
                  {/* Outer Ring */}
                  <div className={`
                    w-14 h-14 rounded-full flex items-center justify-center
                    shadow-xl backdrop-blur-sm
                    ${isCurrent 
                      ? "bg-gradient-to-r from-rose-500 to-pink-500 border-4 border-white/80 animate-pulse" 
                      : isPast 
                        ? "bg-gradient-to-r from-emerald-400 to-green-400 border-4 border-white/80" 
                        : "bg-gradient-to-r from-amber-400 to-orange-400 border-4 border-white/80"
                    }
                  `}>
                    
                    {/* Inner Ring with Icon */}
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                      <event.icon className={`
                        w-5 h-5
                        ${isCurrent 
                          ? "text-rose-600" 
                          : isPast 
                            ? "text-emerald-600" 
                            : "text-amber-600"
                        }
                      `} />
                    </div>
                    
                    {/* Wedding Ring Sparkle */}
                    {isCurrent && (
                      <>
                        <motion.div
                          animate={{ 
                            scale: [1, 1.3, 1],
                            rotate: [0, 90, 180]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity 
                          }}
                          className="absolute -inset-1 rounded-full border-2 border-amber-300"
                        />
                        <motion.div
                          animate={{ scale: [0, 1, 0] }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity 
                          }}
                          className="absolute -inset-2 rounded-full border border-rose-300/50"
                        />
                      </>
                    )}
                  </div>
                  
                  {/* Event Number */}
                  <div className={`
                    absolute -top-2 -right-2
                    w-6 h-6 rounded-full flex items-center justify-center
                    text-xs font-bold text-white shadow-lg
                    ${isCurrent 
                      ? "bg-gradient-to-r from-rose-600 to-pink-600" 
                      : isPast 
                        ? "bg-gradient-to-r from-emerald-600 to-green-600" 
                        : "bg-gradient-to-r from-amber-600 to-orange-600"
                    }
                  `}>
                    {index + 1}
                  </div>
                </motion.div>
              </div>

              {/* Event Card - Wedding Card Style */}
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative overflow-hidden
                  p-5 rounded-3xl
                  backdrop-blur-sm
                  border-2 shadow-xl
                  transition-all duration-300
                  ${isCurrent 
                    ? "bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200 shadow-rose-200/50" 
                    : isPast 
                      ? "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-emerald-200/50" 
                      : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-amber-200/50"
                  }
                `}
              >
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 opacity-10">
                  <div className="w-24 h-24">
                    <Flower2 className="w-full h-full text-current" />
                  </div>
                </div>
                
                {/* Gold Border Top */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`
                    absolute top-0 left-0 h-1
                    ${isCurrent 
                      ? "bg-gradient-to-r from-rose-500 to-pink-500" 
                      : isPast 
                        ? "bg-gradient-to-r from-emerald-500 to-green-500" 
                        : "bg-gradient-to-r from-amber-500 to-orange-500"
                    }
                  `}
                />

                {/* Event Header */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`
                        text-xl font-bold mb-1 ${karma.className}
                        ${isCurrent 
                          ? "text-rose-800" 
                          : isPast 
                            ? "text-emerald-800" 
                            : "text-amber-800"
                        }
                      `}>
                        {event.hindiName}
                      </h3>
                      <p className="text-sm text-gray-600">{event.name}</p>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`
                      px-3 py-1 rounded-full text-xs font-semibold
                      shadow-lg backdrop-blur-sm
                      ${isCurrent 
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white animate-pulse" 
                        : isPast 
                          ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white" 
                          : "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                      }
                    `}>
                      {isCurrent ? "चल रहा है" : isPast ? "सम्पन्न" : "आने वाला"}
                    </div>
                  </div>
                  
                  {/* Date & Time */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-rose-500" />
                      <span className="text-sm font-medium text-gray-700">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-medium text-gray-700">{event.time}</span>
                    </div>
                  </div>
                  
                  {/* Venue */}
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-gray-600">{event.venue}</span>
                  </div>
                  
                  {/* Highlights */}
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">विशेष आकर्षण</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.highlights.slice(0, 2).map((highlight, idx) => (
                        <span 
                          key={idx}
                          className={`
                            px-3 py-1 rounded-full text-xs font-medium
                            ${isCurrent 
                              ? "bg-rose-100 text-rose-700" 
                              : isPast 
                                ? "bg-emerald-100 text-emerald-700" 
                                : "bg-amber-100 text-amber-700"
                            }
                          `}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Countdown for Next Event */}
                  {isNext && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200"
                    >
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-700">जल्द ही शुरू होगा</span>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Progress for Current Event */}
                  {isCurrent && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>समारोह प्रगति</span>
                        <span>50%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "50%" }}
                          transition={{ 
                            duration: 2,
                            ease: "easeOut",
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Connecting Garland */}
              {/* {index < events.length - 1 && (
                <div className={`
                  absolute left-8 top-24 h-12 w-0.5
                  ${isCurrent 
                    ? "bg-gradient-to-b from-rose-400 to-amber-400" 
                    : "bg-gradient-to-b from-gray-300 to-gray-400"
                  }
                `}></div>
              )} */}
            </div>
          );
        })}
      </div>
    </div>

    {/* Timeline Legend */}
    <div className="mt-12 p-5 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200">
      <h4 className={`text-center font-semibold text-gray-800 mb-4 ${karma.className}`}>
        समयरेखा सूचक
      </h4>
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-500"></div>
          <span className="text-xs text-gray-600 mt-1">सम्पन्न</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 animate-pulse"></div>
          <span className="text-xs text-gray-600 mt-1">चल रहा</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
          <span className="text-xs text-gray-600 mt-1">आने वाला</span>
        </div>
      </div>
    </div>
  </div>
</div>


{/* Event Timeline Summary */}
<motion.div
  className="mt-16"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  {/* OUTER BORDER HOLDER */}
  <div className="relative rounded-3xl p-[2px] overflow-hidden">

    {/* 🌟 MOVING BORDER */}
    <motion.div
      className="absolute inset-0"
      style={{
        background:
          'linear-gradient(90deg, transparent, #fbbf24, #fb7185, #fbbf24, transparent)',
        backgroundSize: '300% 100%',
        filter: 'drop-shadow(0 0 14px rgba(251,191,36,0.6))',
      }}
      animate={{
        backgroundPosition: ['0% 50%', '300% 50%'],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'linear',
      }}
    />

    {/* 🌸 CARD */}
    <div
      className="
        relative z-10
        rounded-3xl
        bg-gradient-to-br
        from-[#FFF8F1]
        via-[#FDECEC]
        to-[#FFF1F2]
        p-8
        shadow-xl
      "
      style={{
        boxShadow:
          '0 20px 45px rgba(251,191,36,0.15), 0 10px 20px rgba(251,113,133,0.12)',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

        {/* Today */}
        <div>
          <div className="text-4xl font-bold text-rose-700 mb-2">
            {todaysEvents.length}
          </div>
          <div className="text-sm text-rose-600">
            आज के कार्यक्रम
          </div>
          {todaysEvents.length > 0 && (
            <div className="mt-2 text-xs text-gray-600">
              {todaysEvents.map(idx => events[idx].hindiName).join(', ')}
            </div>
          )}
        </div>

        {/* Upcoming */}
        <div>
          <div className="text-4xl font-bold text-amber-700 mb-2">
            {nextEvent !== null
              ? events.filter((_, idx) => idx > nextEvent).length + 1
              : events.length}
          </div>
          <div className="text-sm text-amber-600">
            आने वाले कार्यक्रम
          </div>
          {nextEvent !== null && (
            <div className="mt-2 text-xs text-gray-600">
              अगला: {events[nextEvent].hindiName}
            </div>
          )}
        </div>

        {/* Total */}
        <div>
          <div className="text-4xl font-bold text-emerald-700 mb-2">
            {events.length}
          </div>
          <div className="text-sm text-emerald-600">
            कुल समारोह
          </div>
          <div className="mt-2 text-xs text-gray-600">
            ५ दिन का उत्सव
          </div>
        </div>

      </div>
    </div>
  </div>
</motion.div>

        
      </div>
    </section>
  );
};

export default Events;