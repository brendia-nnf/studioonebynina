'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Button } from '@/components/ui';
import { useScrollTo } from '@/hooks/useLenis';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollToSection } = useScrollTo();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Image scale animation
      tl.fromTo(
        imageRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: 'power3.out' }
      );

      // Content reveal
      tl.fromTo(
        '.hero-line',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1 },
        '-=1'
      );

      // CTA buttons
      tl.fromTo(
        '.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
        '-=0.5'
      );

      // Scroll indicator
      tl.fromTo(
        '.scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    scrollToSection('about', -80);
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src="/images/heroimg.jpeg"
          alt="Studio One by Nina - Premium Hair Salon"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/60 via-charcoal-900/40 to-charcoal-900/70" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 container mx-auto px-6 lg:px-12 text-center text-white"
      >
        <div className="max-w-4xl mx-auto">
          {/* Overline */}
          <div className="overflow-hidden mb-6">
            <p className="hero-line text-label-lg uppercase tracking-[0.2em] text-gold-400">
              Premium Frizerski Salon
            </p>
          </div>

          {/* Main Headline */}
          <div className="overflow-hidden mb-4 py-2">
            <h1 className="hero-line font-serif text-display-xl">
              Ljepota koja
            </h1>
          </div>
          <div className="overflow-hidden mb-8 py-2">
            <h1 className="hero-line font-serif text-display-xl italic">
              ostavlja dojam
            </h1>
          </div>

          {/* Description */}
          <div className="overflow-hidden mb-10">
            <p className="hero-line font-sans text-body-lg text-white/80 max-w-2xl mx-auto">
              Otkrijte umjetnost njege kose u našem ekskluzivnom salonu.
              Specijalizirani smo za Cocochoco keratin tretmane i Brendia Pro® ekstenzije.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="tel:+385923177942"
              variant="secondary"
              size="lg"
              className="hero-cta"
            >
              Nazovi za Termin
            </Button>
            <Button
              href="/usluge"
              variant="outline"
              size="lg"
              className="hero-cta border-white text-white hover:bg-white hover:text-charcoal-800"
            >
              Naše Usluge
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={handleScrollDown}
        className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
        aria-label="Pomakni dolje"
      >
        <span className="text-label-sm uppercase tracking-widest">Pomakni</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="animate-bounce"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>
    </section>
  );
}
