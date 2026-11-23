'use client';

import { GALLERY_CATEGORIES } from '@/constants/categories';
import { useGalleryPosts } from '@/hooks/useGalleryPosts';
import { useHeroContent } from '@/hooks/useHeroContent';
import { ButtonLink } from '@/components/ui/Button';

export default function AdminOverviewPage() {
  const { posts, loading } = useGalleryPosts();
  const { hero } = useHeroContent();

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-5xl font-extrabold italic leading-none text-foam">
        Ringkasan
      </h1>

      <section className="mt-10">
        <h2 className="text-sm font-semibold text-foam">Foto di galeri</h2>
        <p className="mt-2 font-display text-6xl font-extrabold italic text-foam">
          {loading ? '…' : posts.length}
        </p>
        <dl className="mt-6 divide-y divide-line border-y border-line">
          {GALLERY_CATEGORIES.map((category) => (
            <div key={category} className="flex justify-between py-3 text-sm">
              <dt className="text-mist">{category}</dt>
              <dd className="font-semibold text-foam">
                {loading ? '…' : posts.filter((post) => post.category === category).length}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold text-foam">Judul hero saat ini</h2>
        <p className="mt-2 text-mist">{hero.title}</p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/admin/gallery">Tambah foto</ButtonLink>
        <ButtonLink href="/admin/site-content" variant="ghost">
          Edit konten situs
        </ButtonLink>
      </div>
    </div>
  );
}
