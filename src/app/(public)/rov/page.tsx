import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/PageHeader';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { RovViewer } from '@/components/three/RovViewer';

export const metadata: Metadata = { title: 'ROV' };

export default function RovPage() {
  return (
    <>
      <PageHeader
        title="ROV"
        description="Putar dan perbesar model wahana kami, lalu pilih satu bagian untuk melihat fungsinya."
      />

      <section className="bg-shallows py-16 sm:py-20">
        <Container>
          <RovViewer heightClass="h-[420px] sm:h-[560px]" />
          <div className="mt-10">
            <ButtonLink href="/gallery" variant="ghost">
              Lihat progres ROV
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
