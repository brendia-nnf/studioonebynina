'use client';

import { useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '@/data/testimonials';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-content',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="testimonials-content text-center max-w-2xl mx-auto mb-16">
          <p className="text-label-lg uppercase tracking-[0.2em] text-gold-400 mb-4">
            Recenzije
          </p>
          <h2 className="font-serif text-display-md text-charcoal-800 mb-6">
            Što kažu naše <span className="italic">klijentice</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="testimonials-content relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3"
                >
                  <article className="bg-cream-100 rounded-3xl p-8 h-full">
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-gold-400"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="font-sans text-body-lg text-charcoal-700 mb-6">
                      &ldquo;{testimonial.text}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gold-400/20 flex items-center justify-center">
                        <span className="font-serif text-gold-600 text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-charcoal-800">
                          {testimonial.name}
                        </p>
                        <p className="text-body-sm text-charcoal-500">
                          {testimonial.service}
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border-2 border-charcoal-200 flex items-center justify-center text-charcoal-600 hover:border-gold-400 hover:text-gold-400 transition-colors"
              aria-label="Prethodna recenzija"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border-2 border-charcoal-200 flex items-center justify-center text-charcoal-600 hover:border-gold-400 hover:text-gold-400 transition-colors"
              aria-label="Sljedeća recenzija"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
