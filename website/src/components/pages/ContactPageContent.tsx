'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Input, Textarea, Button } from '@/components/ui';
import { footerNavigation } from '@/data/navigation';
import { services } from '@/data/services';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const contactSchema = z.object({
  name: z.string().min(2, 'Ime mora imati najmanje 2 znaka'),
  email: z.string().email('Unesite valjanu email adresu'),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Poruka mora imati najmanje 10 znakova'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactPageContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-hero-content',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo(
        '.contact-form-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form data:', data);
      setSubmitSuccess(true);
      reset();
    } catch {
      setSubmitError('Došlo je do greške. Molimo pokušajte ponovno.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            alt="Kontaktirajte nas"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="contact-hero-content max-w-3xl">
            <p className="text-label-lg uppercase tracking-[0.2em] text-gold-400 mb-4">
              Kontakt
            </p>
            <h1 className="font-serif text-display-lg mb-6">
              Javite nam se
            </h1>
            <p className="text-body-lg text-white/80">
              Imate pitanja ili želite rezervirati termin? Kontaktirajte nas i
              rado ćemo vam pomoći.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={formRef} className="py-24 lg:py-32 bg-cream-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div className="contact-form-item">
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg">
                <h2 className="font-serif text-display-sm text-charcoal-800 mb-2">
                  Pošaljite upit
                </h2>
                <p className="text-body-md text-charcoal-500 mb-8">
                  Ispunite obrazac i javit ćemo vam se u najkraćem roku.
                </p>

                {submitSuccess ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                    <svg
                      className="w-12 h-12 mx-auto mb-4 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="font-serif text-heading-lg text-charcoal-800 mb-2">
                      Hvala vam!
                    </h3>
                    <p className="text-body-md text-charcoal-600 mb-6">
                      Vaša poruka je uspješno poslana. Javit ćemo vam se uskoro.
                    </p>
                    <Button
                      onClick={() => setSubmitSuccess(false)}
                      variant="outline"
                    >
                      Pošalji novu poruku
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Input
                      label="Ime i prezime"
                      {...register('name')}
                      error={errors.name?.message}
                    />

                    <Input
                      label="Email adresa"
                      type="email"
                      {...register('email')}
                      error={errors.email?.message}
                    />

                    <Input
                      label="Telefon (opcionalno)"
                      type="tel"
                      {...register('phone')}
                      error={errors.phone?.message}
                    />

                    <div className="relative">
                      <select
                        {...register('service')}
                        className="w-full px-4 py-4 bg-transparent border-b-2 border-charcoal-200 font-sans text-body-md text-charcoal-800 transition-all duration-300 focus:outline-none focus:border-gold-400 appearance-none cursor-pointer"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Odaberite uslugu (opcionalno)
                        </option>
                        {services.map((service) => (
                          <option key={service.id} value={service.title}>
                            {service.title}
                          </option>
                        ))}
                        <option value="Drugo">Drugo</option>
                      </select>
                      <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400 pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>

                    <Textarea
                      label="Vaša poruka"
                      {...register('message')}
                      error={errors.message?.message}
                    />

                    {submitError && (
                      <p className="text-red-500 text-body-sm">{submitError}</p>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Slanje...' : 'Pošalji poruku'}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="contact-form-item">
                <h2 className="font-serif text-display-sm text-charcoal-800 mb-6">
                  Kontakt informacije
                </h2>
              </div>

              {/* Address */}
              <div className="contact-form-item flex items-start gap-4 bg-white rounded-2xl p-6">
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
                  <p className="text-charcoal-600">
                    {footerNavigation.contact.address}
                  </p>
                  {footerNavigation.contact.addressNote && (
                    <p className="text-charcoal-400 text-body-sm mt-1">
                      {footerNavigation.contact.addressNote}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="contact-form-item flex items-start gap-4 bg-white rounded-2xl p-6">
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
              <div className="contact-form-item flex items-start gap-4 bg-white rounded-2xl p-6">
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
              <div className="contact-form-item flex items-start gap-4 bg-white rounded-2xl p-6">
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
                  <p className="font-medium text-charcoal-800 mb-2">
                    Radno vrijeme
                  </p>
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

              {/* Social */}
              <div className="contact-form-item">
                <p className="font-medium text-charcoal-800 mb-4">
                  Pratite nas
                </p>
                <div className="flex gap-4">
                  {footerNavigation.social.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-charcoal-600 hover:bg-gold-400 hover:text-white transition-all"
                      aria-label={social.label}
                    >
                      {social.icon === 'instagram' && (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      )}
                      {social.icon === 'facebook' && (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[500px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3219.1424937397564!2d16.100691176555213!3d45.81142881020363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47667936d466e785%3A0x63ced54bd6142c56!2sStudio%20One%20by%20Nina!5e1!3m2!1sen!2shr!4v1780139787295!5m2!1sen!2shr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Studio One by Nina lokacija"
        />
      </section>
    </>
  );
}
