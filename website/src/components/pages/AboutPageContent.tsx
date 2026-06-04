'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const values = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: 'Izvrsnost',
    description: 'Posvećeni smo pružanju vrhunske kvalitete u svakom tretmanu.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: 'Strast',
    description: 'Volimo ono što radimo i to se vidi u svakom rezultatu.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Personalizacija',
    description: 'Svaka klijentica je jedinstvena i zaslužuje personaliziran pristup.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
    title: 'Edukacija',
    description: 'Kontinuirano usavršavanje i praćenje najnovijih trendova.',
  },
];

const galleryImages = [
  '/images/prostor-1.webp',
  '/images/prostor-2.webp',
  '/images/prostor-3.webp',
  '/images/prostor-4.png',
  '/images/prostor-5.png',
  '/images/prostor-6.png',
];

export function AboutPageContent() {
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-hero-content',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo(
        '.story-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.value-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.gallery-item',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: galleryRef.current,
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
            src="/images/prostor-1.webp"
            alt="Studio One by Nina"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="about-hero-content max-w-3xl">
            <p className="text-label-lg uppercase tracking-[0.2em] text-gold-400 mb-4">
              O nama
            </p>
            <h1 className="font-serif text-display-lg mb-6">
              Naša <span className="italic">priča</span>
            </h1>
            <p className="text-body-lg text-white/80">
              Više od 15 godina posvećeni smo umjetnosti njege kose i stvaranju
              prostora gdje se svaka žena osjeća posebno i lijepo.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="py-24 lg:py-32 bg-cream-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="story-content relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="/images/o-nini.jpeg"
                  alt="Nikolina Kljaić - vlasnica Studio One by Nina"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold-400/20 rounded-full -z-10" />
            </div>

            {/* Content */}
            <div>
              <h2 className="story-content font-serif text-display-md text-charcoal-800 mb-6">
                Upoznajte <span className="italic">Nikolinu</span>
              </h2>
              <div className="story-content space-y-4 text-body-lg text-charcoal-600 mb-8">
                <p>
                  Nikolina Kljaić je stručnjakinja za luksuzne ekstenzije kose i
                  osnivačica Brendia Pro® tehnike, poznata po stvaranju
                  sofisticiranih, besprijekornih transformacija kose i premium
                  edukacijskih iskustava.
                </p>
                <p>
                  Kroz godine praktičnog iskustva i naprednih tehnika, razvila je
                  vlastiti pristup fokusiran na preciznost, personalizaciju i
                  luksuzne rezultate.
                </p>
                <p>
                  Danas, Brendia Pro® edukacija osmišljena je kako bi pomogla
                  frizerima da unaprijede svoje vještine, samopouzdanje i
                  poslovanje na novu razinu.
                </p>
              </div>

              {/* Quote */}
              <div className="story-content bg-cream-200 rounded-2xl p-6 mb-8 border-l-4 border-gold-400">
                <p className="text-body-lg text-charcoal-700 italic">
                  &ldquo;Edukacija nije samo tehnika, već transformacija.&rdquo;
                </p>
                <p className="text-body-sm text-charcoal-500 mt-2">— Nikolina</p>
              </div>

              {/* Specializations */}
              <div className="story-content mb-8">
                <p className="text-label-md uppercase tracking-wider text-charcoal-400 mb-4">
                  Specijalizacije
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gold-400/10 text-charcoal-700 rounded-full text-body-sm">
                    Sewing Method
                  </span>
                  <span className="px-4 py-2 bg-gold-400/10 text-charcoal-700 rounded-full text-body-sm">
                    Luxury Color Blending
                  </span>
                  <span className="px-4 py-2 bg-gold-400/10 text-charcoal-700 rounded-full text-body-sm">
                    Seamless Transformations
                  </span>
                  <span className="px-4 py-2 bg-gold-400/10 text-charcoal-700 rounded-full text-body-sm">
                    Customized Luxury Results
                  </span>
                </div>
              </div>

              <div className="story-content flex flex-wrap gap-8">
                <div>
                  <p className="font-serif text-display-sm text-charcoal-800">15+</p>
                  <p className="text-body-sm text-charcoal-500">Godina iskustva</p>
                </div>
                <div>
                  <p className="font-serif text-display-sm text-charcoal-800">500+</p>
                  <p className="text-body-sm text-charcoal-500">Zadovoljnih klijentica</p>
                </div>
                <div>
                  <p className="font-serif text-display-sm text-charcoal-800">50+</p>
                  <p className="text-body-sm text-charcoal-500">Certifikata</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-label-lg uppercase tracking-[0.2em] text-gold-400 mb-4">
              Naše vrijednosti
            </p>
            <h2 className="font-serif text-display-md text-charcoal-800">
              Što nas <span className="italic">vodi</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card text-center p-8 bg-cream-100 rounded-3xl"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-400/20 flex items-center justify-center text-gold-600">
                  {value.icon}
                </div>
                <h3 className="font-serif text-heading-lg text-charcoal-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-body-md text-charcoal-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section ref={galleryRef} className="py-24 lg:py-32 bg-cream-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-label-lg uppercase tracking-[0.2em] text-gold-400 mb-4">
              Galerija
            </p>
            <h2 className="font-serif text-display-md text-charcoal-800">
              Naš <span className="italic">prostor</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="gallery-item relative aspect-square rounded-2xl overflow-hidden group"
              >
                <Image
                  src={image}
                  alt={`Studio One galerija ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/20 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-charcoal-900 text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-display-md mb-6">
            Spremni za <span className="italic">transformaciju</span>?
          </h2>
          <p className="text-body-lg text-white/70 mb-10 max-w-xl mx-auto">
            Rezervirajte svoj termin i doživite razliku koju donosi
            personalizirana njega kose.
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
            Nazovi za Termin
          </Button>
        </div>
      </section>
    </>
  );
}
