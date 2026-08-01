'use client';

import { motion } from 'framer-motion';
import { Phone, AlertCircle, Clock, MapPin } from 'lucide-react';

export default function Emergency() {
  return (
    <section id="emergency" className="py-20 md:py-32 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3">
              <AlertCircle size={32} className="flex-shrink-0" />
              <h2 className="text-4xl md:text-5xl font-bold">Emergency Services</h2>
            </div>

            <p className="text-blue-100 text-lg leading-relaxed">
              Available 24/7 for medical emergencies. Our expert team is always ready to provide immediate medical assistance.
            </p>

            <div className="space-y-4">
              {[
                { icon: Phone, title: '24/7 Hotline', desc: 'Call anytime for emergency care' },
                { icon: Clock, title: 'Quick Response', desc: 'Average response time under 5 minutes' },
                { icon: MapPin, title: 'Ambulance Service', desc: 'Emergency ambulance available 24/7' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <Icon className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-blue-100 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right - Emergency Number */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center"
            >
              <p className="text-blue-100 font-semibold mb-4">Emergency Hotline</p>
              <div className="text-6xl md:text-7xl font-bold mb-4">
                911
              </div>
              <p className="text-2xl font-bold text-blue-100 mb-8">or</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-xl hover:bg-blue-50 transition-all smooth-shadow-lg"
              >
                Call Now
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
