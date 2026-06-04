'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { navigation } from '@/data/navigation';
import { footerNavigation } from '@/data/navigation';
import { useScrollLock } from '@/hooks/useLenis';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { lock, unlock } = useScrollLock();

  useEffect(() => {
    if (!menuRef.current || !overlayRef.current || !contentRef.current) return;

    const tl = gsap.timeline({ paused: true });

    tl.set(menuRef.current, { display: 'block' })
      .to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
      .to(
        contentRef.current,
        {
          x: 0,
          duration: 0.5,
          ease: 'power3.out',
        },
        '-=0.2'
      )
      .to(
        '.mobile-nav-item',
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.3'
      );

    if (isOpen) {
      lock();
      tl.play();
    } else {
      tl.reverse().then(() => {
        unlock();
        if (menuRef.current) {
          gsap.set(menuRef.current, { display: 'none' });
        }
      });
    }

    return () => {
      tl.kill();
    };
  }, [isOpen, lock, unlock]);

  // Set initial states
  useEffect(() => {
    if (contentRef.current) {
      gsap.set(contentRef.current, { x: '100%' });
    }
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { opacity: 0 });
    }
    gsap.set('.mobile-nav-item', { opacity: 0, y: 20 });
  }, []);

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-[100] hidden"
      aria-hidden={!isOpen}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu Content */}
      <div
        ref={contentRef}
        className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-cream-100 shadow-2xl"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-cream-300">
            <span className="font-serif text-xl text-charcoal-800">Izbornik</span>
            <button
              onClick={onClose}
              className="p-2 text-charcoal-600 hover:text-charcoal-900 transition-colors"
              aria-label="Zatvori izbornik"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-8 px-6">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.href} className="mobile-nav-item">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-4 font-serif text-2xl text-charcoal-800 hover:text-gold-400 transition-colors border-b border-cream-200"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="pl-4 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href} className="mobile-nav-item">
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className="block py-2 font-sans text-base text-charcoal-500 hover:text-gold-400 transition-colors"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-6 bg-cream-200 mobile-nav-item">
            <div className="space-y-4">
              <div>
                <p className="text-label-md uppercase text-charcoal-400 mb-2">
                  Kontakt
                </p>
                <a
                  href={`tel:${footerNavigation.contact.phone}`}
                  className="block font-sans text-charcoal-800 hover:text-gold-400 transition-colors"
                >
                  {footerNavigation.contact.phone}
                </a>
                <a
                  href={`mailto:${footerNavigation.contact.email}`}
                  className="block font-sans text-charcoal-800 hover:text-gold-400 transition-colors"
                >
                  {footerNavigation.contact.email}
                </a>
              </div>

              <div className="flex gap-4">
                {footerNavigation.social.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal-600 hover:text-gold-400 transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon === 'instagram' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    )}
                    {social.icon === 'facebook' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
