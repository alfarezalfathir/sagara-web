# Sagara Itenas ROV Team

Website resmi tim ROV Institut Teknologi Nasional Bandung. Dibangun dengan Next.js, Tailwind CSS, Supabase, dan Three.js.

## Menjalankan di lokal

```bash
npm install
cp .env.example .env.local   # lalu isi URL dan anon key Supabase
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Perintah lain: `npm run lint` dan `npm run build`.

> Proyek ini memakai versi Next.js dengan perubahan API. Sebelum mengubah konvensi routing atau caching,
> baca panduan di `node_modules/next/dist/docs/` (lihat `AGENTS.md`). `next.config.ts` mengaktifkan
> `cacheComponents`, jadi data Supabase diambil di komponen client lewat hook di `src/hooks/`.

## Struktur folder

```
src/
├─ app/
│  ├─ (public)/        Halaman publik: home, about-us, rov, gallery, recruitment, contact
│  └─ admin/
│     ├─ login/        Halaman login admin
│     └─ (dashboard)/  Dashboard (ringkasan, gallery, site-content), dijaga login
├─ components/
│  ├─ layout/          Navbar, Footer
│  ├─ sections/        Bagian halaman (Hero, Highlights, GalleryGrid, StoryRow, ...)
│  ├─ admin/           AdminShell, GalleryForm, HeroForm, Field
│  ├─ three/           Viewer 3D ROV
│  └─ ui/              Button, Container, SectionHeading, ImagePlaceholder
├─ constants/          Info situs, menu navigasi, kategori galeri
├─ hooks/              useGalleryPosts, useHeroContent
├─ lib/                Client Supabase, query, helper
└─ types/              Tipe data
```

Penamaan: komponen `PascalCase.tsx`, hook `useXxx.ts`, folder dan route `kebab-case`.

## Setup Supabase

**Tabel** yang dipakai:

- `site_content`: `section_key`, `title`, `subtitle`, `description`, `image_url` (baris hero memakai `section_key = 'hero'`)
- `gallery_posts`: `id`, `title`, `category`, `caption`, `image_url`, `event_date`, `created_at`

**Storage**: buat bucket publik bernama `gallery` (atau ubah `STORAGE_BUCKET` di `src/constants/site.ts`).

**Keamanan (RLS)**: anon key bersifat publik, jadi yang menentukan siapa boleh menulis adalah policy di database. Contoh policy:

```sql
-- Publik boleh membaca, hanya user login yang boleh mengubah
alter table gallery_posts enable row level security;
create policy "Publik membaca galeri" on gallery_posts for select using (true);
create policy "Admin mengelola galeri" on gallery_posts for all to authenticated using (true) with check (true);

alter table site_content enable row level security;
create policy "Publik membaca konten" on site_content for select using (true);
create policy "Admin mengelola konten" on site_content for all to authenticated using (true) with check (true);

-- Storage bucket "gallery"
create policy "Admin mengunggah foto" on storage.objects for insert to authenticated with check (bucket_id = 'gallery');
create policy "Admin menghapus foto" on storage.objects for delete to authenticated using (bucket_id = 'gallery');
```

Policy `authenticated` berlaku untuk semua akun yang terdaftar. Matikan pendaftaran publik di Supabase (Authentication > Sign In / Providers) dan buat akun admin secara manual.

## Yang perlu diisi

- `recruitmentFormUrl` di `src/constants/site.ts`: link Google Form open recruitment.
- Teks dan foto placeholder di halaman About us (`src/app/(public)/about-us/page.tsx`).
