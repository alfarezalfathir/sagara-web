'use client';

import { useHeroContent } from '@/hooks/useHeroContent';
import { HeroForm } from '@/components/admin/HeroForm';

export default function AdminSiteContentPage() {
  const { hero, loading } = useHeroContent();

  return (
    <div>
      <h1 className="font-display text-5xl font-extrabold italic leading-none text-foam">
        Konten situs
      </h1>
      <p className="mt-3 max-w-xl text-mist">
        Ubah teks dan foto hero di halaman utama. Perubahan langsung tampil di situs setelah disimpan.
      </p>

      <div className="mt-10">
        {loading ? <p className="text-mist">Memuat konten…</p> : <HeroForm initial={hero} />}
      </div>
    </div>
  );
}
