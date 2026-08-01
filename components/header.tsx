'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X, Phone } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Departments', href: '#departments' },
    { label: 'Doctors', href: '#doctors' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Top Info Bar */}
      <div className="bg-primary text-white py-3 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span className="font-medium">Emergency: +1 (555) 123-4567</span>
          </div>
          <span className="hidden sm:inline">Available 24/7</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-primary p-2 rounded-xl group-hover:shadow-lg transition">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-primary">HealthCare Plus</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Premium Medical Care</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button 
                variant="outline" 
                className="text-primary border-primary hover:bg-primary hover:text-white"
              >
                Sign In
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <nav className="md:hidden pb-4 border-t border-border pt-4">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary hover:text-primary transition rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="px-4 py-4 flex flex-col gap-2 border-t border-border mt-2">
                  <Button
                    variant="outline"
                    className="w-full text-primary border-primary hover:bg-primary hover:text-white"
                  >
                    Sign In
                  </Button>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    Book Appointment
                  </Button>
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
