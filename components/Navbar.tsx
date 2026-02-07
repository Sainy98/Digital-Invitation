// components/Navbar.tsx
'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'मुख पृष्ठ', href: '#home' },
    { label: 'समारोह', href: '#events' },
    { label: 'गैलरी', href: '#gallery' },
    { label: 'आरएसवीपी', href: '#rsvp' },
  ];

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-rose-600">
            शुभ विवाह
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-rose-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            {navItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-gray-700 hover:bg-rose-50 hover:text-rose-600"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;