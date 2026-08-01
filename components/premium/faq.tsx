'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [open, setOpen] = useState(0);

  const faqs = [
    {
      question: 'What are your operating hours?',
      answer: 'Emergency services are available 24/7. OPD services run from 9:00 AM to 9:00 PM. ICU and inpatient services operate around the clock.',
    },
    {
      question: 'Do you accept insurance?',
      answer: 'Yes, we accept all major health insurance policies. Our billing team can assist you with insurance claims and documentation.',
    },
    {
      question: 'How can I book an appointment?',
      answer: 'You can book appointments through our website, mobile app, or by calling our helpline. Online booking is available 24/7.',
    },
    {
      question: 'What is your emergency response time?',
      answer: 'Our emergency response time is typically under 5 minutes from the time of call. We have ambulances stationed at strategic locations.',
    },
    {
      question: 'Do you provide home delivery of medicines?',
      answer: 'Yes, we offer pharmacy home delivery service. Prescribed medicines can be delivered to your home within 24 hours.',
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">Frequently Asked Questions</h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden smooth-shadow hover:smooth-shadow-lg transition-all border border-gray-200"
            >
              <button
                onClick={() => setOpen(open === index ? -1 : index)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-bold text-gray-900 text-left">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: open === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-blue-600 flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5 border-t border-gray-200"
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
