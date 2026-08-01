'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-96 md:h-full rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-blue-300">
                <p className="text-6xl">🏥</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">About Hospital</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
                Dedicated to Your <span className="text-blue-600">Health & Wellness</span>
              </h2>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              WADIVARHE Multi-Speciality Hospital is committed to providing exceptional healthcare services with a patient-centric approach. Our state-of-the-art facilities and expert medical team ensure the highest quality of care.
            </p>

            <p className="text-gray-600 leading-relaxed">
              With over a decade of experience, we have established ourselves as a trusted healthcare provider in the region, serving thousands of patients with compassion and excellence.
            </p>

            <ul className="space-y-3 pt-4">
              {[
                'Expert team of experienced doctors',
                'Advanced medical technology',
                'Patient-centered care approach',
                'Affordable and transparent pricing',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
