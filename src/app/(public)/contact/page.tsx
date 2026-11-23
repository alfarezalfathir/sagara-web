import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/PageHeader';
import { Container } from '@/components/ui/Container';
import { SITE } from '@/constants/site';

export const metadata: Metadata = { title: 'Contact' };

const CONTACTS = [
  {
    label: 'Email',
    text: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    label: 'Instagram',
    text: `@${SITE.instagram.handle}`,
    href: SITE.instagram.url,
  },
  {
    label: 'TikTok',
    text: `@${SITE.tiktok.handle}`,
    href: SITE.tiktok.url,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="Hubungi kami untuk kolaborasi, sponsor, atau pertanyaan seputar tim."
      />

      <section className="bg-shallows py-20 sm:py-28">
        <Container>
          <dl className="divide-y divide-line border-y border-line">
            {CONTACTS.map((contact) => (
              <div key={contact.label} className="grid gap-2 py-8 md:grid-cols-12 md:items-baseline md:gap-8">
                <dt className="text-mist md:col-span-3">{contact.label}</dt>
                <dd className="md:col-span-9">
                  <a
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="font-display text-3xl font-bold italic text-foam transition-colors hover:text-flare sm:text-5xl"
                  >
                    {contact.text}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}
