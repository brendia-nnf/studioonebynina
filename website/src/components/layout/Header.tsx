'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navigation } from '@/data/navigation';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-smooth',
          isScrolled
            ? 'bg-cream-100/95 backdrop-blur-md shadow-sm py-4'
            : 'bg-transparent py-6'
        )}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 group"
            >
              <Image
                src="/images/logo.png"
                alt="Studio One by Nina"
                width={180}
                height={50}
                className={cn(
                  'h-10 w-auto transition-all duration-300 group-hover:scale-105',
                  isScrolled ? '' : 'brightness-0 invert'
                )}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <li key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      'relative font-sans text-sm uppercase tracking-widest transition-colors duration-300',
                      isScrolled
                        ? 'text-charcoal-600 hover:text-charcoal-900'
                        : 'text-white/80 hover:text-white'
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full',
                        isScrolled ? 'bg-gold-400' : 'bg-white'
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <a
                href="tel:+385923177942"
                className={cn(
                  'hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300',
                  isScrolled
                    ? 'bg-charcoal-800 text-white hover:bg-charcoal-700'
                    : 'bg-white text-charcoal-800 hover:bg-cream-100'
                )}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                Nazovi
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={cn(
                  'lg:hidden relative z-10 p-2 transition-colors duration-300',
                  isScrolled ? 'text-charcoal-800' : 'text-white'
                )}
                aria-label="Otvori izbornik"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
