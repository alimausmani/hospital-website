'use client';

import { motion } from 'framer-motion';
import { Stethoscope, Pill, Users, Microscope, Heart, Activity } from 'lucide-react';

export default function Services() {
  const services = [
    { icon: Stethoscope, title: 'General Consultation', description: 'Expert medical consultation and diagnosis' },
    { icon: Pill, title: 'Pharmacy Services', description: 'Comprehensive medicine availability' },
    { icon: Users, title: 'Specialized Care', description: 'Department-specific expert treatment' },
    { icon: Microscope, title: 'Lab Testing', description: 'Advanced diagnostic testing' },
    { icon: Heart, title: 'Emergency Services', description: '24/7 emergency medical care' },
    { icon: Activity, title: 'Follow-up Care', description: 'Post-treatment monitoring and support' },
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Services</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">Our Medical Services</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 smooth-shadow hover:smooth-shadow-lg transition-all border border-gray-100 group"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-4 group-hover:bg-blue-100 transition">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
