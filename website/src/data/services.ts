export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  duration: string;
  priceRange: string;
  image: string;
  gallery: string[];
  subServices?: string[];
  founderInfo?: string;
  learnMoreUrl?: string;
}

export const services: Service[] = [
  {
    id: 'extensions',
    slug: 'brendia-pro-ekstenzije',
    title: 'Brendia Pro® Ekstenzije',
    shortDescription: 'Premium ekstenzije za kosu s prirodnim izgledom i dugotrajnim rezultatima',
    description: 'Brendia Pro® ekstenzije predstavljaju vrhunac tehnologije produljenja kose. Koristimo isključivo 100% prirodnu ljudsku kosu najviše kvalitete, ručno obrađenu i pažljivo selektiranu. Naše ekstenzije pružaju volumen i dužinu koja se savršeno stapa s vašom prirodnom kosom.',
    features: [
      '100% prirodna ljudska kosa',
      'Nevidljive spojnice',
      'Trajnost do 12 mjeseci',
      'Mogu se stilizirati kao prirodna kosa',
      'Bezopasne za prirodnu kosu',
      'Širok izbor boja i tekstura',
    ],
    duration: '1-6 sati',
    priceRange: 'od 200€',
    image: '/images/brendia-poslije.jpg',
    gallery: [
      '/images/brendia-prije.jpg',
      '/images/brendia-poslije.jpg',
    ],
    founderInfo: 'Brendia Pro® tehniku razvila je Nikolina Kljaić, vlasnica Studio One by Nina. Saznajte više o Brendia Pro® tehnici i prijavite se na online edukaciju.',
    learnMoreUrl: 'https://www.brendiapro.hr',
  },
  {
    id: 'haircuts',
    slug: 'frizerske-usluge',
    title: 'Frizerske usluge',
    shortDescription: 'Personalizirani krojevi koji ističu vašu prirodnu ljepotu',
    description: 'Svaki kroj koji stvaramo je jedinstven kao i vi. Naši stručnjaci posvećuju vrijeme razumijevanju vaše strukture kose, oblika lica i životnog stila kako bi stvorili savršen look. Od klasičnih rezova do modernih trendova, garantiramo rezultat koji ćete voljeti.',
    features: [
      'Detaljna konzultacija',
      'Precizno šišanje',
      'Profesionalno stiliziranje',
      'Savjeti za kućno održavanje',
      'Prilagođeno vašem stilu života',
      'Premium proizvodi za njegu',
    ],
    subServices: [
      'Muško šišanje',
      'Žensko šišanje',
      'Feniranje',
      'Pramenovi',
      'Bojanje',
    ],
    duration: '1-5 sati',
    priceRange: 'od 20€',
    image: '/images/friz.png',
    gallery: [
      '/images/friz-prije.JPEG',
      '/images/friz-poslije.jpg',
    ],
  },
  {
    id: 'cocochoco',
    slug: 'cocochoco-keratin',
    title: 'Cocochoco Keratin',
    shortDescription: 'Profesionalni keratin tretman za svilenkasto glatku i zdravu kosu',
    description: 'Cocochoco keratin tretman je revolucionarna metoda koja transformira vašu kosu, čineći je izuzetno glatkom, sjajnom i lakom za održavanje. Naš premium keratin prodire duboko u strukturu kose, popravljajući oštećenja i stvarajući zaštitni sloj koji traje do 6 mjeseci.',
    features: [
      'Eliminira statički elektricitet i frizz',
      'Popravlja oštećenu i suhu kosu',
      'Smanjuje vrijeme sušenja za 50%',
      'Rezultati vidljivi odmah',
      'Traje 4-6 mjeseci',
      'Siguran za obojenu kosu',
    ],
    duration: '2-3 sata',
    priceRange: 'od 100€',
    image: '/images/cocochoco-after.jpg',
    gallery: [
      '/images/cocochoco-before.png',
      '/images/cocochoco-after.jpg',
    ],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find((service) => service.slug === slug);
};
