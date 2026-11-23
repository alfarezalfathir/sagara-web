import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/PageHeader';
import { GalleryBrowser } from '@/components/sections/GalleryBrowser';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = { title: 'Gallery' };

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Gallery"
        description="Dokumentasi kompetisi, progres ROV, dan kegiatan tim."
      />

      <section className="bg-midwater py-16 sm:py-20">
        <Container>
          <GalleryBrowser />
        </Container>
      </section>
    </>
  );
}
