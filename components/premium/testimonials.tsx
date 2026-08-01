'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Rajesh Sharma',
      role: 'Patient',
      text: 'The facility is very clean, well organized, and the staff is incredibly helpful. I felt very comfortable during my treatment.',
      rating: 5,
    },
    {
      name: 'Priya Desai',
      role: 'Patient',
      text: 'I highly recommend this hospital for anyone in need of quality medical care. The doctors are knowledgeable and caring.',
      rating: 5,
    },
    {
      name: 'Amit Verma',
      role: 'Patient',
      text: 'I really appreciate all the doctors and nursing staff for their commitment and professionalism. Excellent service!',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">What Patients Say</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 smooth-shadow hover:smooth-shadow-lg transition-all border border-blue-100 relative"
            >
              <Quote className="w-8 h-8 text-blue-200 mb-4" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-gray-700 font-medium mb-6">"{testimonial.text}"</p>

              <div>
                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
