'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services, getServiceBySlug } from '@/data/services';
import { Button, BeforeAfter } from '@/components/ui';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!service) return;

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        '.service-hero-content',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
      );

      // Content animations
      gsap.fromTo(
        '.service-content-item',
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
    });

    return () => ctx.revert();
  }, [service]);

  if (!service) {
    notFound();
  }

  const otherServices = services.filter((s) => s.id !== service.id);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-charcoal-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="service-hero-content max-w-3xl">
            <Link
              href="/usluge"
              className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors mb-6"
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
              Sve usluge
            </Link>
            <h1 className="font-serif text-display-lg mb-6">{service.title}</h1>
            <p className="text-body-lg text-white/80 mb-8">
              {service.shortDescription}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-gold-400"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span className="text-white/80">{service.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-gold-400"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
                <span className="text-white/80">{service.priceRange}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="py-24 lg:py-32 bg-cream-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="service-content-item">
                <h2 className="font-serif text-display-sm text-charcoal-800 mb-6">
                  O tretmanu
                </h2>
                <p className="text-body-lg text-charcoal-600 mb-8">
                  {service.description}
                </p>
              </div>

              {/* Sub-services (for Frizerske usluge) */}
              {service.subServices && service.subServices.length > 0 && (
                <div className="service-content-item">
                  <h3 className="font-serif text-heading-lg text-charcoal-800 mb-6">
                    Naše usluge
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-12">
                    {service.subServices.map((subService, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gold-400/10 text-charcoal-700 rounded-full text-body-md"
                      >
                        {subService}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Founder info (for Brendia Pro) */}
              {service.founderInfo && (
                <div className="service-content-item">
                  <div className="bg-charcoal-900 text-white rounded-2xl p-8 mb-12">
                    <h3 className="font-serif text-heading-lg mb-4">
                      O Brendia Pro® tehnici
                    </h3>
                    <p className="text-body-lg text-white/80 mb-6">
                      {service.founderInfo}
                    </p>
                    {service.learnMoreUrl && (
                      <a
                        href={service.learnMoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gold-400 text-charcoal-900 rounded-full font-medium hover:bg-gold-300 transition-colors"
                      >
                        Saznaj više o Brendia Pro®
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="service-content-item">
                <h3 className="font-serif text-heading-lg text-charcoal-800 mb-6">
                  Što uključuje
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  {service.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 bg-white p-4 rounded-xl"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-gold-400 flex-shrink-0 mt-0.5"
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-body-md text-charcoal-600">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Before/After */}
              <div className="service-content-item">
                <h3 className="font-serif text-heading-lg text-charcoal-800 mb-6">
                  Rezultati
                </h3>
                <BeforeAfter
                  beforeImage={service.gallery[0]}
                  afterImage={service.gallery[1] || service.gallery[0]}
                  className="max-w-md"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="service-content-item sticky top-32 bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="font-serif text-heading-lg text-charcoal-800 mb-4">
                  Rezervirajte termin
                </h3>
                <p className="text-body-md text-charcoal-600 mb-6">
                  Kontaktirajte nas za rezervaciju ili dodatne informacije o
                  tretmanu.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold-400/20 flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-gold-600"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body-sm text-charcoal-400">Trajanje</p>
                      <p className="font-medium text-charcoal-800">
                        {service.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold-400/20 flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-gold-600"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body-sm text-charcoal-400">Cijena</p>
                      <p className="font-medium text-charcoal-800">
                        {service.priceRange}
                      </p>
                    </div>
                  </div>
                </div>

                <Button href="tel:+385923177942" variant="primary" className="w-full mb-4">
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
                  Nazovi za termin
                </Button>
                <Button
                  href="/kontakt"
                  variant="outline"
                  className="w-full"
                >
                  Pošalji upit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-label-lg uppercase tracking-[0.2em] text-gold-400 mb-4">
              Istražite još
            </p>
            <h2 className="font-serif text-display-md text-charcoal-800">
              Druge <span className="italic">usluge</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherServices.map((otherService) => (
              <Link
                key={otherService.id}
                href={`/usluge/${otherService.slug}`}
                className="group block"
              >
                <article className="bg-cream-100 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={otherService.image}
                      alt={otherService.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif text-heading-lg text-charcoal-800 group-hover:text-gold-500 transition-colors">
                        {otherService.title}
                      </h3>
                      <span className="text-label-md text-gold-400">
                        {otherService.priceRange}
                      </span>
                    </div>
                    <p className="text-body-md text-charcoal-500">
                      {otherService.shortDescription}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
