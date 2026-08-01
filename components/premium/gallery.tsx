'use client';

import { motion } from 'framer-motion';

export default function Gallery() {
  const images = Array(6).fill(null);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Gallery</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">Hospital Gallery</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50 smooth-shadow hover:smooth-shadow-lg transition-all cursor-pointer group"
            >
              <div className="absolute inset-0 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
                🏥
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
