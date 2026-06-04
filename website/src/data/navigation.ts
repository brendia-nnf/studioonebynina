export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    label: 'Početna',
    href: '/',
  },
  {
    label: 'O nama',
    href: '/o-nama',
  },
  {
    label: 'Usluge',
    href: '/usluge',
    children: [
      { label: 'Brendia Pro® Ekstenzije', href: '/usluge/brendia-pro-ekstenzije' },
      { label: 'Frizerske usluge', href: '/usluge/frizerske-usluge' },
      { label: 'Cocochoco Keratin', href: '/usluge/cocochoco-keratin' },
    ],
  },
  {
    label: 'Kontakt',
    href: '/kontakt',
  },
];

export const footerNavigation = {
  main: navigation,
  services: [
    { label: 'Brendia Pro® Ekstenzije', href: '/usluge/brendia-pro-ekstenzije' },
    { label: 'Frizerske usluge', href: '/usluge/frizerske-usluge' },
    { label: 'Cocochoco Keratin', href: '/usluge/cocochoco-keratin' },
  ],
  contact: {
    address: 'Ladislava Šabana 14, Zagreb',
    addressNote: 'U prolazu kod Konzuma',
    phone: '092 317 7942',
    email: 'info@studioonebynina.hr',
    hours: [
      { days: 'Pon - Pet', time: '09:00 - 20:00' },
      { days: 'Sub', time: 'Po dogovoru' },
      { days: 'Ned', time: 'Ne radimo' },
    ],
  },
  social: [
    { label: 'Instagram', href: 'https://instagram.com/studioonebynina', icon: 'instagram' },
    { label: 'Facebook', href: 'https://facebook.com/studioonebynina', icon: 'facebook' },
  ],
};
