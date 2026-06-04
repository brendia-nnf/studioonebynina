'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      gsap.to(imageRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Content animation
      gsap.fromTo(
        contentRef.current?.querySelectorAll('.animate-item') || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
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
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-cream-100 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div ref={imageRef} className="relative">
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="/images/studioonesalon.png"
                  alt="Studio One by Nina salon"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold-400/20 rounded-full -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-gold-400/30 rounded-full -z-10" />

              {/* Experience badge */}
              <div className="absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-2xl shadow-xl p-5">
                <p className="font-serif text-display-sm text-charcoal-800">15+</p>
                <p className="text-label-md uppercase tracking-wider text-charcoal-500">
                  godina iskustva
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="order-1 lg:order-2">
            <p className="animate-item text-label-lg uppercase tracking-[0.2em] text-gold-400 mb-4">
              O nama
            </p>
            <h2 className="animate-item font-serif text-display-md text-charcoal-800 mb-6">
              Dobrodošli u
              <span className="italic"> Studio One</span>
            </h2>
            <div className="animate-item space-y-4 text-body-lg text-charcoal-600 mb-8">
              <p>
                Studio One by Nina je više od frizerskog salona - to je prostor
                posvećen umjetnosti njege kose i vašem osobnom blagostanju.
              </p>
              <p>
                S više od 15 godina iskustva, naš tim stručnjaka posvećen je
                pružanju personaliziranih usluga koje ističu vašu prirodnu
                ljepotu. Specijalizirani smo za transformativne tretmane poput
                Cocochoco keratina i Brendia Pro® ekstenzija.
              </p>
            </div>
            <div className="animate-item flex flex-wrap gap-6 mb-8">
              <div>
                <p className="font-serif text-heading-lg text-charcoal-800">500+</p>
                <p className="text-body-sm text-charcoal-500">Zadovoljnih klijentica</p>
              </div>
              <div className="w-px bg-charcoal-200" />
              <div>
                <p className="font-serif text-heading-lg text-charcoal-800">100%</p>
                <p className="text-body-sm text-charcoal-500">Premium proizvodi</p>
              </div>
              <div className="w-px bg-charcoal-200" />
              <div>
                <p className="font-serif text-heading-lg text-charcoal-800">5.0</p>
                <p className="text-body-sm text-charcoal-500">Ocjena na Google</p>
              </div>
            </div>
            <Button href="/o-nama" variant="primary" className="animate-item">
              Saznaj Više
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
