'use client';

import { useGalleryPosts } from '@/hooks/useGalleryPosts';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { GalleryGrid } from './GalleryGrid';

export function RecentGallery() {
  const { posts, loading } = useGalleryPosts(6);

  return (
    <section className="bg-midwater py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            title="Dokumentasi terbaru"
            description="Rangkuman kompetisi, progres ROV, dan kegiatan tim."
          />
          <ButtonLink href="/gallery" variant="ghost">
            Lihat semua foto
          </ButtonLink>
        </div>
        <div className="mt-12">
          <GalleryGrid posts={posts} loading={loading} />
        </div>
      </Container>
    </section>
  );
}
