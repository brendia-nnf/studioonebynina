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
  metadataBase: new URL('https://studioonebynina.hr'),
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
    url: 'https://studioonebynina.hr',
    siteName: 'Studio One by Nina',
    title: 'Studio One by Nina | Premium Frizerski Salon Zagreb',
    description:
      'Premium frizerski salon u Zagrebu. Specijalizirani za Cocochoco keratin tretmane, Brendia Pro® ekstenzije i stiliziranje kose.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Studio One by Nina',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio One by Nina | Premium Frizerski Salon Zagreb',
    description:
      'Premium frizerski salon u Zagrebu. Specijalizirani za Cocochoco keratin tretmane, Brendia Pro® ekstenzije i stiliziranje kose.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" className={`${inter.variable} ${playfair.variable}`}>
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
