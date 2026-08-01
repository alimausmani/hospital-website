'use client';

import { motion } from 'framer-motion';
import { ChevronDown, LayoutDashboard, LogOut, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type ProfileDropdownProps = {
  name: string;
  onLogout: () => void;
};

export default function ProfileDropdown({ name, onLogout }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initial = name.charAt(0).toUpperCase();

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen((state) => !state)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 hover:border-blue-200 transition"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
          {initial}
        </span>
        <span className="hidden md:block text-sm font-semibold text-gray-900 max-w-28 truncate">{name}</span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white shadow-lg p-1 z-50"
        >
          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <UserCircle2 className="h-4 w-4" />
            Profile
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </motion.div>
      ) : null}
    </div>
  );
}
