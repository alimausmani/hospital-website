'use client';

import { motion } from 'framer-motion';
import { Wifi, Bed, Coffee, Accessibility, DollarSign, ShieldCheck } from 'lucide-react';

export default function Facilities() {
  const facilities = [
    { icon: Wifi, title: 'Modern ICU', description: 'State-of-the-art intensive care unit' },
    { icon: Bed, title: 'Comfortable Rooms', description: 'Well-appointed patient rooms' },
    { icon: Coffee, title: 'Cafeteria', description: 'Healthy food options available' },
    { icon: Accessibility, title: 'Accessibility', description: 'Complete wheelchair accessibility' },
    { icon: DollarSign, title: 'Insurance', description: 'All major insurance accepted' },
    { icon: ShieldCheck, title: 'Safety Standards', description: 'International safety protocols' },
  ];

  return (
    <section id="facilities" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Facilities</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">World-Class Facilities</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 smooth-shadow hover:smooth-shadow-lg transition-all border border-gray-100 group"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-4 group-hover:bg-blue-100 transition">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{facility.title}</h3>
                <p className="text-gray-600 text-sm">{facility.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
