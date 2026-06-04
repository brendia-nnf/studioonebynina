import { Metadata } from 'next';
import { ServicesPageContent } from '@/components/pages/ServicesPageContent';

export const metadata: Metadata = {
  title: 'Usluge',
  description:
    'Premium frizerske usluge u Zagrebu: Cocochoco keratin tretman, Brendia Pro® ekstenzije kose, tehnika šivanja kose i stiliziranje. Otkrijte sve naše usluge.',
  openGraph: {
    title: 'Usluge | Studio One by Nina',
    description:
      'Premium frizerske usluge: keratin tretmani, ekstenzije kose i stiliziranje u Zagrebu.',
    images: ['/images/NINA-24.jpg'],
  },
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
