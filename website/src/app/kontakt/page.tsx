import { Metadata } from 'next';
import { ContactPageContent } from '@/components/pages/ContactPageContent';

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Kontaktirajte Studio One by Nina frizerski salon u Zagrebu. Rezervirajte termin za keratin tretman, ekstenzije kose ili stiliziranje. Telefon: +385 92 317 7942',
  openGraph: {
    title: 'Kontakt | Studio One by Nina',
    description:
      'Kontaktirajte nas i rezervirajte termin u premium frizerskom salonu u Zagrebu.',
    images: ['/images/prostor-1.webp'],
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
