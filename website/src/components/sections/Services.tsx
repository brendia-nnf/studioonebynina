'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '@/data/services';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.services-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
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
      className="py-24 lg:py-32 bg-white"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="services-header text-center max-w-2xl mx-auto mb-16">
          <p className="text-label-lg uppercase tracking-[0.2em] text-gold-400 mb-4">
            Usluge
          </p>
          <h2 className="font-serif text-display-md text-charcoal-800 mb-6">
            Naše <span className="italic">Premium</span> Usluge
          </h2>
          <p className="text-body-lg text-charcoal-600">
            Otkrijte našu paletu ekskluzivnih tretmana dizajniranih da
            transformiraju i njeguju vašu kosu.
          </p>
        </div>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/usluge/${service.slug}`}
              className="service-card group block h-full"
            >
              <article className="bg-cream-100 rounded-3xl overflow-hidden transition-all duration-500 ease-smooth hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-64 overflow-hidden flex-shrink-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Hover overlay content */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-charcoal-800 px-4 py-2 rounded-full text-label-md uppercase tracking-wider">
                      Saznaj više
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-serif text-heading-lg text-charcoal-800 group-hover:text-gold-500 transition-colors">
                      {service.title}
                    </h3>
                    <span className="text-label-md text-gold-400 whitespace-nowrap">
                      {service.priceRange}
                    </span>
                  </div>
                  <p className="text-body-md text-charcoal-500 mb-4">
                    {service.shortDescription}
                  </p>
                  <div className="flex items-center gap-2 text-label-sm text-charcoal-400">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    {service.duration}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
