'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '@/data/services';
import { Button } from '@/components/ui';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        '.services-hero-content',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
      );

      // Service cards stagger
      gsap.fromTo(
        '.service-large-card',
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-charcoal-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/NINA-24.jpg"
            alt="Naše usluge"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="services-hero-content max-w-3xl">
            <p className="text-label-lg uppercase tracking-[0.2em] text-gold-400 mb-4">
              Usluge
            </p>
            <h1 className="font-serif text-display-lg mb-6">
              Naše <span className="italic">premium</span> usluge
            </h1>
            <p className="text-body-lg text-white/80">
              Otkrijte našu paletu ekskluzivnih tretmana dizajniranih da
              transformiraju i njeguju vašu kosu.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section ref={servicesRef} className="py-24 lg:py-32 bg-cream-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="space-y-16 lg:space-y-24">
            {services.map((service, index) => (
              <article
                key={service.id}
                className="service-large-card"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <Link href={`/usluge/${service.slug}`} className="block group">
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </Link>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-label-lg uppercase tracking-[0.2em] text-gold-400">
                        {service.priceRange}
                      </span>
                      <span className="w-12 h-px bg-charcoal-200" />
                      <span className="text-label-md text-charcoal-400">
                        {service.duration}
                      </span>
                    </div>
                    <h2 className="font-serif text-display-sm text-charcoal-800 mb-4">
                      {service.title}
                    </h2>
                    <p className="text-body-lg text-charcoal-600 mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {service.features.slice(0, 4).map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-body-md text-charcoal-600"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-gold-400 flex-shrink-0"
                          >
                            <path
                              d="M20 6L9 17l-5-5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button href={`/usluge/${service.slug}`} variant="primary">
                      Saznaj Više
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-charcoal-900 text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-display-md mb-6">
            Niste sigurni koji tretman vam treba?
          </h2>
          <p className="text-body-lg text-white/70 mb-10 max-w-xl mx-auto">
            Zakažite besplatnu konzultaciju i naš tim će vam pomoći odabrati
            savršen tretman za vašu kosu.
          </p>
          <Button href="tel:+385923177942" variant="secondary" size="lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mr-2"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            Nazovi za Konzultaciju
          </Button>
        </div>
      </section>
    </>
  );
}
