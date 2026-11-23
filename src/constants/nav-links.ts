export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string; hint?: string }[];
}

export const NAV_LINKS: NavLink[] = [
  { label: 'About Us', href: '/about-us' },
  { label: 'ROV', href: '/rov' },
  {
    label: 'Activities',
    href: '/gallery',
    children: [
      { label: 'Gallery', href: '/gallery', hint: 'Dokumentasi & recap' },
      { label: 'Recruitment', href: '/recruitment', hint: 'Gabung bersama kami' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];
