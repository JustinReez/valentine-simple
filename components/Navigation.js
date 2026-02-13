'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Messages', path: '/messages', icon: '💌' },
    { name: 'Claw Game', path: '/game', icon: '🎮' },
    { name: 'Confession', path: '/confess', icon: '💕' },
  ];

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-3 bg-white/10 backdrop-blur-md rounded-full border border-rose-300/30 hover:bg-white/20 transition-all duration-300 lg:hidden"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`block h-0.5 bg-rose-100 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block h-0.5 bg-rose-100 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.5 bg-rose-100 transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:z-40 lg:flex lg:justify-center lg:p-6">
        <div className="bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-rose-300/30 shadow-2xl">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-rose-500 text-white shadow-lg scale-105'
                      : 'text-rose-100 hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Navigation Drawer */}
      <nav
        className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] z-40 bg-gradient-to-br from-rose-950 via-pink-900 to-red-950 p-8 transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="self-end mb-8 p-2 text-rose-100 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Mobile Menu Items */}
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-rose-500 text-white shadow-lg scale-105'
                      : 'text-rose-100 hover:bg-white/20 hover:scale-105 active:scale-95'
                  }`}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="mt-auto pt-8 border-t border-rose-300/30">
            <p className="text-rose-200 text-center text-sm">
              Made with 💕 for someone special
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}