'use client';

import { motion } from 'framer-motion';
import { Star, AlertCircle, Users, Zap } from 'lucide-react';
import { useAppointmentModal } from '@/hooks/use-appointment-modal';

export default function Hero() {
  const { openModal } = useAppointmentModal();
  const stats = [
    { icon: Star, label: '5.0 Rating', value: '5.0' },
    { icon: Users, label: 'Happy Patients', value: '73+' },
    { icon: AlertCircle, label: '24×7 Emergency', value: 'Always' },
    { icon: Zap, label: 'Ambulance', value: 'Available' },
  ];

  return (
    <section id="home" className="relative min-h-screen bg-white pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2.5 rounded-full"
            >
              <Star size={18} className="text-blue-600 fill-blue-600" />
              <span className="text-sm font-semibold text-blue-600">Trusted Healthcare Since 2024</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
            >
              Quality Healthcare for <span className="text-blue-600">Every Family</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 leading-relaxed max-w-md"
            >
              Providing compassionate, affordable, and advanced medical care with experienced doctors and modern facilities.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openModal}
                className="px-8 py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all smooth-shadow"
              >
                Book Appointment
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all"
              >
                Emergency 24×7
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative h-full flex items-center justify-center"
          >
            <div className="grid grid-cols-2 gap-4 w-full">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl p-6 smooth-shadow-lg border border-gray-100 hover:border-blue-200 transition"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
