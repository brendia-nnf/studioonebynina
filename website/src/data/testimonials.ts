export interface Testimonial {
  id: string;
  name: string;
  text: string;
  service: string;
  rating: number;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Valerija Sertić',
    text: 'Toplo preporučujem! Radila sam balayage i ispao je odlično, bez ikakve greške! 4 sata sam provela u salonu ali je odrađeno profesionalno! Svaki detalj je pažen, npr. djelatnica salona mi je predložila farbanje ispod i kod ušiju jer kada vežem rep da nema razlike u boji. Boja, valovi sve je ispalo izvrsno!',
    service: 'Frizerske usluge',
    rating: 5,
  },
  {
    id: '2',
    name: 'Martina Kapusta',
    text: 'Prezadovoljna sam uslugom i savjetima. Hvala na predivno napravljenoj frizuri. Kao i zahvala na strpljenju. Žena predivno radi, velikog znanja i iskustva. Uglavnom, sve pohvale! Vraćam se ponovno.',
    service: 'Frizerske usluge',
    rating: 5,
  },
  {
    id: '3',
    name: 'Barbi Lovrin',
    text: 'Sve pohvale za Ninu i cijeli salon, moja kosa se je nevjerojatno oporavila nošenjem ekstenzija koje Nina radi vrhunski. Kosa nije oštećena, zdrava je i napokon raste! Kvaliteta kose je odlična! Sve preporuke!',
    service: 'Brendia Pro® Ekstenzije',
    rating: 5,
  },
  {
    id: '4',
    name: 'Antonija Mandic',
    text: 'Radila sam pramenove, šišanje i fen frizuru – i moram reći da sam prezadovoljna! Cure u salonu su toliko simpatične, drage i stručne da te odmah opuste čim uđeš. Sve su odradile vrhunski, nježno i profesionalno, a kosa mi je ispala bolje nego što sam očekivala. Zaista se vidi da vole svoj posao. Svaka preporuka, vraćam se sigurno!',
    service: 'Frizerske usluge',
    rating: 5,
  },
  {
    id: '5',
    name: 'Doria',
    text: 'Moja topla preporuka za sve plavuše! Ja sam oduševljena svojom kosom i plavim pramenovima! Imam stvarno tamni korijen kose, ali cure su to bez problema izvukle po mojim željama. O pohvalama mogu do sutra... ljubazne, stručne, precizne, paze na detalje i donose vedru energiju u salon. Ja sam izašla s ogromnim osmjehom na licu i sigurno se vraćam!',
    service: 'Frizerske usluge',
    rating: 5,
  },
  {
    id: '6',
    name: 'Latica Horvatin',
    text: 'Nina je stručnjak u svojoj profesiji, kao i djelatnice - kojoj god se dam u ruke znam da ću izaći iz salona s osmjehom na licu. Ekstenzije od prirodne kose su prelijepe, mekane, nevidljive u kosi! Prezadovoljna sam što u mom kvartu postoji frizer tog nivoa, a i da je dalje isplatilo bi se voziti.',
    service: 'Brendia Pro® Ekstenzije',
    rating: 5,
  },
];
