import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { SITE } from '@/constants/site';

export const metadata: Metadata = { title: 'Recruitment' };

const TRAITS = [
  {
    title: 'Rasa ingin tahu',
    body: 'Ingin tahu cara kerja wahana bawah air dan mau mencoba hal baru.',
  },
  {
    title: 'Mau belajar',
    body: 'Tidak perlu sudah ahli. Kami belajar dan berkembang bersama.',
  },
  {
    title: 'Komitmen pada tim',
    body: 'Siap meluangkan waktu untuk tim dan target kompetisi.',
  },
];

export default function RecruitmentPage() {
  const hasForm = SITE.recruitmentFormUrl !== '';
  const ctaHref = hasForm ? SITE.recruitmentFormUrl : SITE.instagram.url;
  const ctaLabel = hasForm ? 'Daftar sekarang' : 'Lihat info di Instagram';

  return (
    <>
      <PageHeader
        title="Open recruitment"
        description="Sagara ITENAS mengajak mahasiswa Itenas angkatan 2024 dan 2025 untuk bergabung."
      />

      <section className="bg-shallows py-20 sm:py-28">
        <Container>
          <SectionHeading title="Yang kami cari" />
          <dl className="mt-12 divide-y divide-line border-y border-line">
            {TRAITS.map((trait) => (
              <div key={trait.title} className="grid gap-3 py-8 md:grid-cols-12 md:gap-8">
                <dt className="font-display text-3xl font-bold italic text-foam md:col-span-5">
                  {trait.title}
                </dt>
                <dd className="leading-relaxed text-mist md:col-span-7">{trait.body}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12">
            <ButtonLink href={ctaHref}>{ctaLabel}</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
