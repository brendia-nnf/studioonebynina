'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui';
import { footerNavigation } from '@/data/navigation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-cream-100"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Content */}
          <div>
            <p className="contact-item text-label-lg uppercase tracking-[0.2em] text-gold-400 mb-4">
              Kontakt
            </p>
            <h2 className="contact-item font-serif text-display-md text-charcoal-800 mb-6">
              Posjetite nas
            </h2>
            <p className="contact-item text-body-lg text-charcoal-600 mb-8">
              Nalazimo se u srcu Zagreba, u ugodnom i luksuznom ambijentu
              stvorenom za vašu relaksaciju i njegu.
            </p>

            {/* Contact Info */}
            <div className="contact-item space-y-6 mb-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-400/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-gold-600"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-charcoal-800 mb-1">Adresa</p>
                  <p className="text-charcoal-600">{footerNavigation.contact.address}</p>
                  {footerNavigation.contact.addressNote && (
                    <p className="text-charcoal-400 text-body-sm mt-1">
                      {footerNavigation.contact.addressNote}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-400/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-gold-600"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-charcoal-800 mb-1">Telefon</p>
                  <a
                    href={`tel:${footerNavigation.contact.phone}`}
                    className="text-charcoal-600 hover:text-gold-400 transition-colors"
                  >
                    {footerNavigation.contact.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-400/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-gold-600"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-charcoal-800 mb-1">Email</p>
                  <a
                    href={`mailto:${footerNavigation.contact.email}`}
                    className="text-charcoal-600 hover:text-gold-400 transition-colors"
                  >
                    {footerNavigation.contact.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-400/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-gold-600"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-charcoal-800 mb-1">Radno vrijeme</p>
                  <ul className="text-charcoal-600 space-y-1">
                    {footerNavigation.contact.hours.map((hour) => (
                      <li key={hour.days} className="flex gap-4">
                        <span className="w-20">{hour.days}</span>
                        <span>{hour.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <Button href="tel:+385923177942" variant="primary" className="contact-item">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mr-2"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              Nazovite Nas
            </Button>
          </div>

          {/* Map */}
          <div className="contact-item">
            <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden bg-cream-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3219.1424937397564!2d16.100691176555213!3d45.81142881020363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47667936d466e785%3A0x63ced54bd6142c56!2sStudio%20One%20by%20Nina!5e1!3m2!1sen!2shr!4v1780139787295!5m2!1sen!2shr"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Studio One by Nina lokacija"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
