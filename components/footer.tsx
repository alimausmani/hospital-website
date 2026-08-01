import Link from 'next/link';
import { Heart, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">HealthCare Plus</h3>
                <p className="text-sm text-white/70">Your Health, Our Priority</p>
              </div>
            </div>
            <p className="text-sm text-white/70 mb-4">
              Leading multi-specialty hospital providing comprehensive healthcare services with cutting-edge technology.
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition"
                title="Facebook"
              >
                <span className="text-sm font-bold">f</span>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition"
                title="Twitter"
              >
                <span className="text-sm font-bold">𝕏</span>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition"
                title="LinkedIn"
              >
                <span className="text-sm font-bold">in</span>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition"
                title="Instagram"
              >
                <span className="text-sm font-bold">📷</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="#" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Departments
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Doctors
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Emergency Care
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Surgery
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Diagnostics
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Consultations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Pharmacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="flex-shrink-0 mt-0.5 text-white/70" />
                <span className="text-white/70">
                  123 Healthcare Boulevard<br />
                  Medical City, MC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-white/70" />
                <span className="text-white/70">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-white/70" />
                <span className="text-white/70">info@healthcareplus.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom Footer */}
        <div className="pt-8 grid md:grid-cols-3 gap-4 items-center text-sm text-white/70">
          <p>© {currentYear} HealthCare Plus Hospital. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <Link href="#" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition">
              Sitemap
            </Link>
          </div>
          <p className="text-right">Made with care for your health</p>
        </div>
      </div>
    </footer>
  );
}
