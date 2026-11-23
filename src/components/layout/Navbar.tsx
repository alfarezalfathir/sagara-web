'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, type NavLink } from '@/constants/nav-links';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const matches = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const isActive = (link: NavLink) =>
    matches(link.href) || Boolean(link.children?.some((child) => matches(child.href)));

  const linkClass = (active: boolean) =>
    `border-b-2 py-1 text-sm font-medium transition-colors hover:text-foam ${
      active ? 'border-flare text-foam' : 'border-transparent text-foam/80'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-abyss/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-baseline gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-3xl font-extrabold italic leading-none text-foam">
            Sagara
          </span>
          <span className="hidden text-xs leading-tight text-mist sm:block">
            Itenas ROV Team
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.href} className="group relative">
                <Link href={link.href} className={linkClass(isActive(link))}>
                  {link.label}
                </Link>
                <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="w-56 rounded-md border border-line bg-midwater p-2">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block rounded px-3 py-2 hover:bg-shallows"
                        >
                          <span className="block text-sm font-medium text-foam">
                            {child.label}
                          </span>
                          {child.hint && (
                            <span className="block text-xs text-mist">{child.hint}</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link key={link.href} href={link.href} className={linkClass(isActive(link))}>
                {link.label}
              </Link>
            ),
          )}
          <ButtonLink href="/recruitment" size="sm">
            Gabung Sagara
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-foam hover:bg-shallows md:hidden"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navigasi seluler"
          className="border-t border-line bg-abyss md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.flatMap((link) => link.children ?? [link]).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-base font-medium ${
                  matches(item.href) ? 'bg-shallows text-foam' : 'text-foam/85'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
