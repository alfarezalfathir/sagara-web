import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/PageHeader';
import { StoryRow } from '@/components/sections/StoryRow';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = { title: 'About us' };

// TODO: ganti teks dan foto placeholder di halaman ini dengan sejarah tim yang asli.
export default function AboutUsPage() {
  return (
    <>
      <PageHeader
        title="About us"
        description="Kami membangun wahana bawah air untuk kompetisi, riset, dan belajar."
      />

      <section className="bg-shallows py-20 sm:py-28">
        <StoryRow
          title="Siapa kami"
          body="Sagara Itenas adalah tim riset dan pengembangan ROV di Institut Teknologi Nasional Bandung. Anggotanya mahasiswa lintas bidang yang merancang, merakit, dan menguji wahana bawah air bersama-sama."
          imageLabel="Foto tim menyusul"
        />
      </section>

      <section className="bg-midwater py-20 sm:py-28">
        <StoryRow
          reverse
          title="Kontes Kapal Indonesia 2026"
          body="Tahun ini perjalanan kami membawa Sagara ke Kontes Kapal Indonesia di Bengkalis, Riau. Rangkuman tiga harinya ada di galeri."
          imageLabel="Foto KKI 2026 menyusul"
        >
          <ButtonLink href="/gallery" variant="ghost">
            Lihat rangkuman KKI 2026
          </ButtonLink>
        </StoryRow>
      </section>

      <section className="bg-abyss py-24 sm:py-32">
        <Container>
          <p className="font-display text-6xl font-extrabold italic leading-[0.9] tracking-tight text-foam sm:text-8xl">
            One Vision,
            <br />
            One Journey.
          </p>
        </Container>
      </section>

      <section className="bg-abyss pb-24 sm:pb-32">
        <StoryRow
          title="Tempat kami bekerja"
          body="Ruang kerja tim tempat wahana dirakit dan diuji sebelum kompetisi."
          imageLabel="Foto ruang kerja menyusul"
        />
      </section>
    </>
  );
}
