import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';

export function RecruitmentBanner() {
  return (
    <section className="bg-abyss py-24 sm:py-32">
      <Container>
        <h2 className="max-w-3xl font-display text-6xl font-extrabold italic leading-[0.9] tracking-tight text-foam sm:text-8xl">
          Ready to go beyond?
        </h2>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">
          Open recruitment Sagara terbuka untuk kamu yang ingin belajar membangun wahana
          bawah air bersama tim.
        </p>
        <div className="mt-8">
          <ButtonLink href="/recruitment">Lihat info pendaftaran</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
