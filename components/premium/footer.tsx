'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Hospital Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/wadivarhe-logo.png"
                  alt="WADIVARHE"
                  width={40}
                  height={40}
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold">WADIVARHE</h3>
            </div>
            <p className="text-gray-400 text-sm">Multi-Speciality Hospital - Quality Healthcare for Every Family</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-blue-400 font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['Home', 'About', 'Services', 'Departments', 'Doctors'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Departments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-blue-400 font-bold mb-4">Departments</h4>
            <ul className="space-y-2 text-sm">
              {['Emergency', 'Cardiology', 'Neurology', 'Orthopedics'].map((dept) => (
                <li key={dept}>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    {dept}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-blue-400 font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Emergency: +1 (911) 000-0911</li>
              <li>General: +1 (555) 123-4567</li>
              <li>Email: info@wadivarhe.com</li>
              <li>123 Medical Avenue, Healthcare City</li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2024 WADIVARHE Multi-Speciality Hospital. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Follow Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
