import {
  Hero,
  AboutTeaser,
  Services,
  Portfolio,
  Testimonials,
  CTABanner,
  ContactPreview,
} from '@/components/sections';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <Services />
      <Portfolio />
      <Testimonials />
      <CTABanner />
      <ContactPreview />
    </>
  );
}
