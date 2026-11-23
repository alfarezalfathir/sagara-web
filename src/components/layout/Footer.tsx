import Link from 'next/link';
import { NAV_LINKS } from '@/constants/nav-links';
import { SITE } from '@/constants/site';
import { Container } from '@/components/ui/Container';

const pages = NAV_LINKS.flatMap((link) => link.children ?? [link]);

const linkClass = 'text-mist transition-colors hover:text-foam';

export function Footer() {
  return (
    <footer className="border-t border-line bg-abyss">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="font-display text-6xl font-extrabold italic leading-none text-foam">
            Sagara
          </p>
          <p className="mt-4 max-w-sm leading-relaxed text-mist">
            {SITE.tagline} {SITE.institution}.
          </p>
        </div>

        <nav aria-label="Halaman" className="md:col-span-3">
          <h2 className="text-sm font-semibold text-foam">Halaman</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {pages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className={linkClass}>
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="text-sm font-semibold text-foam">Hubungi kami</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${SITE.email}`} className={linkClass}>
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Instagram @{SITE.instagram.handle}
              </a>
            </li>
            <li>
              <a
                href={SITE.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                TikTok @{SITE.tiktok.handle}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-5 text-sm text-mist">
          <p>
            {SITE.fullName}, {SITE.institution}
          </p>
          <Link href="/admin" className={linkClass}>
            Admin
          </Link>
        </Container>
      </div>
    </footer>
  );
}
