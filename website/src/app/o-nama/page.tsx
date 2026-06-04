import { Metadata } from 'next';
import { AboutPageContent } from '@/components/pages/AboutPageContent';

export const metadata: Metadata = {
  title: 'O nama',
  description:
    'Upoznajte Nikolinu Kljaić i Studio One by Nina. Više od 15 godina iskustva u frizerstvu, specijalizirani za Brendia Pro® ekstenzije i luksuzne transformacije kose.',
  openGraph: {
    title: 'O nama | Studio One by Nina',
    description:
      'Upoznajte Nikolinu Kljaić i Studio One by Nina. Više od 15 godina iskustva u frizerstvu.',
    images: ['/images/o-nini.jpeg'],
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
