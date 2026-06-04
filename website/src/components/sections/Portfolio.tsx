'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BeforeAfter } from '@/components/ui';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const portfolioItems = [
  {
    id: '1',
    beforeImage: '/images/cocochoco-before.png',
    afterImage: '/images/cocochoco-after.jpg',
    title: 'Cocochoco Keratin',
    description: 'Od frizzy do svilenkaste glatkoće',
  },
  {
    id: '2',
    beforeImage: '/images/brendia-prije.jpg',
    afterImage: '/images/brendia-poslije.jpg',
    title: 'Brendia Pro® Ekstenzije',
    description: 'Volumen i dužina',
  },
  {
    id: '3',
    beforeImage: '/images/friz-prije.JPEG',
    afterImage: '/images/friz-poslije.jpg',
    title: 'Frizerske usluge',
    description: 'Profesionalno stiliziranje',
  },
];

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.portfolio-header',
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

      // Items stagger animation
      gsap.fromTo(
        '.portfolio-item',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.portfolio-grid',
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
        {/* Header */}
        <div className="portfolio-header text-center max-w-2xl mx-auto mb-16">
          <p className="text-label-lg uppercase tracking-[0.2em] text-gold-400 mb-4">
            Galerija
          </p>
          <h2 className="font-serif text-display-md text-charcoal-800 mb-6">
            Naše <span className="italic">Transformacije</span>
          </h2>
          <p className="text-body-lg text-charcoal-600">
            Pogledajte nevjerojatne rezultate koje postižemo za naše klijentice.
            Povucite slider da vidite razliku.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div key={item.id} className="portfolio-item">
              <BeforeAfter
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                className="mb-4"
              />
              <h3 className="font-serif text-heading-md text-charcoal-800">
                {item.title}
              </h3>
              <p className="text-body-md text-charcoal-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
