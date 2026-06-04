'use client';

import Link from 'next/link';
import Image from 'next/image';
import { footerNavigation } from '@/data/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo.png"
                alt="Studio One by Nina"
                width={160}
                height={45}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-charcoal-300 font-sans text-body-md max-w-xs">
              Specijalizirani za frizerske usluge i ekstenzije kose.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-heading-sm mb-6">Navigacija</h4>
            <ul className="space-y-3">
              {footerNavigation.main.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-charcoal-300 hover:text-gold-400 transition-colors font-sans text-body-md"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-heading-sm mb-6">Usluge</h4>
            <ul className="space-y-3">
              {footerNavigation.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-charcoal-300 hover:text-gold-400 transition-colors font-sans text-body-md"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-heading-sm mb-6">Kontakt</h4>
            <address className="not-italic space-y-3 text-charcoal-300 font-sans text-body-md">
              <p>
                {footerNavigation.contact.address}
                {footerNavigation.contact.addressNote && (
                  <span className="block text-charcoal-400 text-body-sm mt-1">
                    {footerNavigation.contact.addressNote}
                  </span>
                )}
              </p>
              <p>
                <a
                  href={`tel:${footerNavigation.contact.phone}`}
                  className="hover:text-gold-400 transition-colors"
                >
                  {footerNavigation.contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${footerNavigation.contact.email}`}
                  className="hover:text-gold-400 transition-colors"
                >
                  {footerNavigation.contact.email}
                </a>
              </p>
            </address>

            {/* Working Hours */}
            <div className="mt-6">
              <h5 className="text-label-md uppercase tracking-wider text-charcoal-400 mb-3">
                Radno vrijeme
              </h5>
              <ul className="space-y-1 text-charcoal-300 font-sans text-body-sm">
                {footerNavigation.contact.hours.map((hour) => (
                  <li key={hour.days} className="flex justify-between">
                    <span>{hour.days}</span>
                    <span>{hour.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-700">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-charcoal-400 font-sans text-body-sm">
              &copy; {currentYear} Studio One by Nina. Sva prava pridržana.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {footerNavigation.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal-400 hover:text-gold-400 transition-colors"
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
    </footer>
  );
}
