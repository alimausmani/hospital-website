'use client';

import { motion } from 'framer-motion';
import { Stethoscope, Zap, Clock, DollarSign, Microscope, Sparkles, Heart, Ambulance } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    { icon: Stethoscope, title: 'Experienced Doctors', description: 'Expert physicians with years of specialized training' },
    { icon: Zap, title: 'Modern Equipment', description: 'Latest medical technology and diagnostics' },
    { icon: Clock, title: '24/7 Emergency', description: 'Round-the-clock emergency medical services' },
    { icon: DollarSign, title: 'Affordable Care', description: 'Quality healthcare at reasonable rates' },
    { icon: Microscope, title: 'Advanced Diagnostics', description: 'Comprehensive diagnostic facilities' },
    { icon: Sparkles, title: 'Clean Environment', description: 'Hygienic and sterile medical facilities' },
    { icon: Heart, title: 'Patient-Centered Care', description: 'Compassionate treatment for every patient' },
    { icon: Ambulance, title: 'Emergency Ambulance', description: 'Quick response ambulance service 24/7' },
  ];

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Excellence in Every Aspect
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            We are committed to providing world-class healthcare services with a personal touch
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 smooth-shadow hover:smooth-shadow-lg transition-all group"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-blue-50 rounded-lg mb-4 group-hover:bg-blue-100 transition">
                  <Icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
