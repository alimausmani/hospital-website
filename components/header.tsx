'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X } from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:bg-opacity-90 transition">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary">HealthCare Plus</h1>
              <p className="text-xs text-muted-foreground">Hospital & Medical Center</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white">
              Call: +1 (800) 123-4567
            </Button>
            <Button className="bg-primary hover:bg-primary/90">Book Appointment</Button>
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
          <nav className="md:hidden pb-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition rounded"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 py-3 flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-full text-primary border-primary hover:bg-primary hover:text-white justify-center"
                >
                  Call: +1 (800) 123-4567
                </Button>
                <Button className="w-full bg-primary hover:bg-primary/90">Book Appointment</Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
