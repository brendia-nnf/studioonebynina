import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Header, Footer, SmoothScroll } from '@/components/layout';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.studioonebynina.hr'),
  title: {
    default: 'Studio One by Nina | Premium Frizerski Salon Zagreb',
    template: '%s | Studio One by Nina',
  },
  description:
    'Premium frizerski salon u Zagrebu. Specijalizirani za Cocochoco keratin tretmane, Brendia Pro® ekstenzije i stiliziranje kose. Rezervirajte termin danas.',
  keywords: [
    'frizerski salon',
    'Zagreb',
    'keratin tretman',
    'Cocochoco',
    'ekstenzije kose',
    'Brendia Pro',
    'šišanje',
    'stiliziranje',
    'premium salon',
  ],
  authors: [{ name: 'Studio One by Nina' }],
  creator: 'Studio One by Nina',
  openGraph: {
    type: 'website',
    locale: 'hr_HR',
    url: 'https://www.studioonebynina.hr',
    siteName: 'Studio One by Nina',
    title: 'Studio One by Nina | Premium Frizerski Salon Zagreb',
    description:
      'Premium frizerski salon u Zagrebu. Specijalizirani za Cocochoco keratin tretmane, Brendia Pro® ekstenzije i stiliziranje kose.',
    images: [
      {
        url: '/images/heroimg.jpeg',
        width: 1200,
        height: 630,
        alt: 'Studio One by Nina - Premium Frizerski Salon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio One by Nina | Premium Frizerski Salon Zagreb',
    description:
      'Premium frizerski salon u Zagrebu. Specijalizirani za Cocochoco keratin tretmane, Brendia Pro® ekstenzije i stiliziranje kose.',
    images: ['/images/heroimg.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HairSalon',
  name: 'Studio One by Nina',
  image: 'https://www.studioonebynina.hr/images/heroimg.jpeg',
  '@id': 'https://www.studioonebynina.hr',
  url: 'https://www.studioonebynina.hr',
  telephone: '+385923177942',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ilica 89',
    addressLocality: 'Zagreb',
    postalCode: '10000',
    addressCountry: 'HR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.81143,
    longitude: 16.10069,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '15:00',
    },
  ],
  priceRange: '€€€',
  servesCuisine: 'Hair Salon',
  description:
    'Premium frizerski salon u Zagrebu. Specijalizirani za Cocochoco keratin tretmane, Brendia Pro® ekstenzije i stiliziranje kose.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-cream-100 text-charcoal-800 font-sans antialiased">
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
