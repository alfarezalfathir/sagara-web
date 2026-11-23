import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const HIGHLIGHTS = [
  {
    title: 'Riset dan rekayasa wahana',
    body: 'Kami merancang sistem mekanik, elektrik, kontrol, dan navigasi wahana bawah air sebagai satu kesatuan.',
  },
  {
    title: 'Siap bertanding',
    body: 'Performa, manuver, dan misi wahana kami uji berulang kali sebelum turun ke kompetisi nasional seperti Kontes Kapal Indonesia.',
  },
  {
    title: 'Tempat belajar',
    body: 'Mahasiswa Itenas bisa bergabung lewat open recruitment dan belajar langsung membangun ROV bersama tim.',
  },
];

export function Highlights() {
  return (
    <section className="bg-shallows py-20 sm:py-28">
      <Container>
        <SectionHeading title="Dari rancangan sampai kompetisi" />
        <dl className="mt-12 divide-y divide-line border-y border-line">
          {HIGHLIGHTS.map((item) => (
            <div key={item.title} className="grid gap-3 py-8 md:grid-cols-12 md:gap-8">
              <dt className="font-display text-3xl font-bold italic text-foam md:col-span-5">
                {item.title}
              </dt>
              <dd className="leading-relaxed text-mist md:col-span-7">{item.body}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
