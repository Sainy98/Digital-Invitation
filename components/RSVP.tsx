// components/RSVP.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '1',
    attending: 'yes',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('RSVP Submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', phone: '', guests: '1', attending: 'yes' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="rsvp" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            कृपया उपस्थिति की पुष्टि करें
          </h2>
        </div>

        {isSubmitted ? (
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-center p-8 bg-green-50 rounded-xl"
          >
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              धन्यवाद!
            </h3>
            <p className="text-gray-600">
              आपकी उपस्थिति की पुष्टि हो गई है।
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
            <div>
              <label className="block text-gray-700 mb-2">
                आपका पूरा नाम *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="अपना नाम दर्ज करें"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                मोबाइल नंबर *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="आपका मोबाइल नंबर"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                आगंतुकों की संख्या *
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'व्यक्ति' : 'लोग'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-3">
                क्या आप आ रहे हैं? *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === 'yes'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>हाँ, आ रहा हूँ</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === 'no'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>नहीं, नहीं आ सकता</span>
                </label>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              उपस्थिति की पुष्टि करें
            </motion.button>
          </form>
        )}
      </div>
    </section>
  );
};

export default RSVP;