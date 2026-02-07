// components/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import { Globe, PhoneCall } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-rose-900 to-rose-950 text-white py-16 px-4 overflow-hidden">

      {/* Soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 opacity-15 blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto text-center">

        {/* Wedding Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-4"
        >
          शुभ विवाह – आदित्य एवं प्रिया
        </motion.h3>

        {/* Blessing Line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-rose-200 mb-10 italic"
        >
          "आपका वैवाहिक जीवन सुख, शांति एवं प्रेम से परिपूर्ण रहे"
        </motion.p>

        {/* Advertisement Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-12 shadow-xl"
        >
          <div className="flex justify-center mb-4">
            <Globe className="w-8 h-8 text-amber-300" />
          </div>

          <h4 className="text-xl font-semibold text-amber-300 mb-3">
            क्या आप भी ऐसी डिजिटल विवाह वेबसाइट बनवाना चाहते हैं?
          </h4>

          <p className="text-rose-100 text-sm leading-relaxed mb-6">
            केवल ₹1399 में मोबाइल एवं लैपटॉप के लिए उपयुक्त,
            आकर्षक डिज़ाइन वाली डिजिटल शादी कार्ड वेबसाइट।
            व्हाट्सएप पर आसानी से साझा करने की सुविधा।
          </p>

          <motion.a
            href="https://forms.gle/ukRfBtCQicDTEL6K9"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold px-8 py-3 rounded-full shadow-lg"
          >
            <PhoneCall className="w-5 h-5" />
            संपर्क करने के लिए यहाँ क्लिक करें
          </motion.a>
        </motion.div>

        {/* Footer Bottom */}
        <div className="text-rose-300 text-sm">
          © 2026 शुभ विवाह | सर्वाधिकार सुरक्षित
        </div>

      </div>
    </footer>
  );
};

export default Footer;
