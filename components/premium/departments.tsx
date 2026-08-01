'use client';

import { motion } from 'framer-motion';
import { Heart, Bone, Brain, Baby, Leaf, Eye, Activity, AlertCircle, Microscope, Radio, Dumbbell, HeartHandshake } from 'lucide-react';

export default function Departments() {
  const departments = [
    { icon: Heart, name: 'Cardiology', description: 'Heart and cardiovascular care' },
    { icon: Bone, name: 'Orthopaedics', description: 'Bone and joint treatments' },
    { icon: Brain, name: 'Neurology', description: 'Neurological disorders' },
    { icon: Baby, name: 'Paediatrics', description: 'Child and infant care' },
    { icon: Leaf, name: 'Dermatology', description: 'Skin care and treatment' },
    { icon: Eye, name: 'Ophthalmology', description: 'Eye health and vision' },
    { icon: Activity, name: 'General Surgery', description: 'Surgical procedures' },
    { icon: AlertCircle, name: 'Emergency', description: 'Emergency medical care' },
    { icon: Microscope, name: 'Laboratory', description: 'Diagnostic testing' },
    { icon: Radio, name: 'Radiology', description: 'Imaging services' },
    { icon: Dumbbell, name: 'Physiotherapy', description: 'Rehabilitation services' },
    { icon: HeartHandshake, name: 'Maternity', description: 'Obstetrics and gynecology' },
  ];

  return (
    <section id="departments" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Our Departments</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Comprehensive Medical Services
          </h2>
        </motion.div>

        {/* Departments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-2xl p-6 smooth-shadow hover:smooth-shadow-lg transition-all border border-gray-100 hover:border-blue-200 group cursor-pointer"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-4 group-hover:bg-blue-100 transition">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{dept.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{dept.description}</p>
                <motion.button
                  whileHover={{ x: 4 }}
                  className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition flex items-center gap-1"
                >
                  Learn More →
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
