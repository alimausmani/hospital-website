'use client';

import { motion } from 'framer-motion';
import { Star, Mail } from 'lucide-react';

export default function Doctors() {
  const doctors = [
    {
      name: 'Dr. Rajesh Kumar',
      specialty: 'Cardiologist',
      experience: '15+ years',
      image: '👨‍⚕️',
      rating: 4.9,
      reviews: 287,
    },
    {
      name: 'Dr. Priya Sharma',
      specialty: 'Neurologist',
      experience: '12+ years',
      image: '👩‍⚕️',
      rating: 4.8,
      reviews: 245,
    },
    {
      name: 'Dr. Amit Patel',
      specialty: 'Orthopedic Surgeon',
      experience: '18+ years',
      image: '👨‍⚕️',
      rating: 4.9,
      reviews: 312,
    },
    {
      name: 'Dr. Neha Gupta',
      specialty: 'Pediatrician',
      experience: '10+ years',
      image: '👩‍⚕️',
      rating: 4.8,
      reviews: 198,
    },
    {
      name: 'Dr. Vikram Singh',
      specialty: 'General Surgeon',
      experience: '20+ years',
      image: '👨‍⚕️',
      rating: 5.0,
      reviews: 425,
    },
    {
      name: 'Dr. Anjali Desai',
      specialty: 'Dermatologist',
      experience: '11+ years',
      image: '👩‍⚕️',
      rating: 4.7,
      reviews: 156,
    },
  ];

  return (
    <section id="doctors" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Our Team</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Expert Doctors
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Experienced physicians dedicated to your health and well-being
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl overflow-hidden smooth-shadow hover:smooth-shadow-lg transition-all group"
            >
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-6xl overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {doctor.image}
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
                <p className="text-blue-600 font-semibold text-sm mt-1">{doctor.specialty}</p>
                <p className="text-gray-600 text-xs mt-1 font-medium">{doctor.experience}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-4 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-gray-900">{doctor.rating}</span>
                  <span className="text-xs text-gray-600">({doctor.reviews})</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-blue-600 border border-blue-200 rounded-lg font-semibold text-sm hover:bg-blue-50 transition"
                  >
                    <Mail size={16} />
                    <span className="hidden sm:inline">Email</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition"
                  >
                    Book
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all"
          >
            View All Doctors
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
