'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import {
  Anchor,
  Compass,
  Waves,
  ArrowDownRight,
  ShieldCheck,
} from 'lucide-react';

const RovViewer3D = dynamic(() => import('@/components/RovViewer3D'), {
  ssr: false,
  loading: () => (
    <div className="h-64 rounded-2xl border border-cyan-400/20 bg-[#06131F]/80 flex items-center justify-center text-xs text-slate-400">
      Memuatkan 3D ROV...
    </div>
  ),
});

interface HeroContent {
  title: string;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
}

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string | null;
  image_url: string;
  event_date: string;
}

const CATEGORIES = [
  'Semua',
  'KKI 2026',
  'Progres ROV',
  'Open Recruitment',
  'Kegiatan Tim',
];

export default function HomePage() {
  const [hero, setHero] = useState<HeroContent>({
    title: 'EXPLORE DEEPER.',
    subtitle: 'SAGARA ITENAS ROV TEAM',
    description:
      'Tim riset dan pengembangan wahana bawah air (Remotely Operated Vehicle) Institut Teknologi Nasional Bandung.',
    image_url: null,
  });
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [depthMeters, setDepthMeters] = useState(0);

  useEffect(() => {
    const fetchPublicData = async () => {
      const { data: heroData } = await supabase
        .from('site_content')
        .select('title, subtitle, description, image_url')
        .eq('section_key', 'hero')
        .single();

      if (heroData) {
        setHero(heroData);
      }

      const { data: galleryData } = await supabase
        .from('gallery_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (galleryData) {
        setGallery(galleryData);
      }
    };

    fetchPublicData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setDepthMeters(0);
        return;
      }
      const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      setDepthMeters(Math.round(progress * 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredGallery =
    selectedCategory === 'Semua'
      ? gallery
      : gallery.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06131F] via-[#091D31] to-[#040C14] text-slate-100 relative overflow-x-clip">
      {/* Ambient Deep-Sea Glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute top-1/2 right-10 h-80 w-80 rounded-full bg-[#FF5A1F]/10 blur-[140px]" />
      </div>

      {/* Depth Meter Indicator (Fixed Right) */}
      <aside
        aria-label="Depth Meter"
        className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-2 rounded-2xl border border-cyan-400/20 bg-[#06131F]/80 backdrop-blur-md px-3 py-4 text-xs"
      >
        <Waves className="w-4 h-4 text-cyan-300" />
        <span className="text-[10px] uppercase tracking-widest text-slate-400">
          Depth
        </span>
        <span className="font-mono font-bold text-[#FF5A1F] text-sm">
          {depthMeters}m
        </span>
        <div className="w-1.5 h-24 rounded-full bg-slate-800 overflow-hidden relative mt-1">
          <div
            className="w-full bg-gradient-to-b from-cyan-400 to-[#FF5A1F] transition-all duration-150"
            style={{ height: `${Math.max(depthMeters, 8)}%` }}
          />
        </div>
      </aside>

      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-cyan-400/15 bg-[#06131F]/75 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-wide">
            <span className="w-8 h-8 rounded-lg bg-[#FF5A1F] flex items-center justify-center text-white shadow-lg shadow-[#FF5A1F]/25">
              <Anchor className="w-4 h-4" />
            </span>
            <div>
              <span className="text-sm block leading-none text-white">SAGARA</span>
              <span className="text-[10px] tracking-widest text-cyan-300/80">
                ITENAS ROV TEAM
              </span>
            </div>
          </Link>

          <nav className="hidden sm:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#about" className="hover:text-[#FF5A1F] transition">
              Tentang Tim
            </a>
            <a href="#rov-3d" className="hover:text-[#FF5A1F] transition">
              3D ROV
            </a>
            <a href="#gallery" className="hover:text-[#FF5A1F] transition">
              Galeri &amp; Recap
            </a>
          </nav>

          <Link
            href="/admin"
            className="rounded-xl border border-cyan-400/25 bg-[#0B2239]/80 hover:border-[#FF5A1F] px-3.5 py-2 text-xs font-semibold text-slate-200 transition"
          >
            Admin Portal
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-5"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FF5A1F]/35 bg-[#FF5A1F]/15 px-3.5 py-1 text-xs font-bold tracking-wider text-[#FF5A1F]">
                <Compass className="w-3.5 h-3.5" />
                {hero.subtitle || 'SAGARA ITENAS ROV TEAM'}
              </div>

              <h1 className="text-4xl sm:text-6xl font-black italic tracking-tight text-white leading-[1.03]">
                {hero.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                {hero.description}
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#gallery"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FF5A1F] hover:bg-[#e44b14] text-white font-bold text-xs sm:text-sm px-5 py-3 shadow-lg shadow-[#FF5A1F]/25 transition"
                >
                  Lihat Dokumentasi
                  <ArrowDownRight className="w-4 h-4" />
                </a>
                <a
                  href="#rov-3d"
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/25 bg-[#0B2239]/70 hover:bg-[#0B2239] text-cyan-100 font-semibold text-xs sm:text-sm px-5 py-3 backdrop-blur-sm transition"
                >
                  Eksplorasi Wahana 3D
                </a>
              </div>
            </motion.div>

            {/* 3D ROV Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              id="rov-3d"
              className="lg:col-span-5"
            >
              <div className="rounded-3xl border border-cyan-400/20 bg-[#0B2239]/65 backdrop-blur-md p-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="font-mono text-cyan-300">
                    UNIT // UNDERWATER ROV
                  </span>
                  <span className="rounded-full bg-[#FF5A1F]/20 text-[#FF5A1F] border border-[#FF5A1F]/30 px-2.5 py-0.5 text-[10px] font-bold">
                    3D INTERACTIVE
                  </span>
                </div>

                <RovViewer3D />

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-[#06131F]/70 border border-slate-800 p-2.5">
                    <div className="text-xs font-extrabold text-white">ROV</div>
                    <div className="text-[10px] text-slate-400">Wahana Utama</div>
                  </div>
                  <div className="rounded-xl bg-[#06131F]/70 border border-slate-800 p-2.5">
                    <div className="text-xs font-extrabold text-[#FF5A1F]">KKI</div>
                    <div className="text-[10px] text-slate-400">Kompetisi</div>
                  </div>
                  <div className="rounded-xl bg-[#06131F]/70 border border-slate-800 p-2.5">
                    <div className="text-xs font-extrabold text-cyan-300">ITENAS</div>
                    <div className="text-[10px] text-slate-400">Bandung</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Strip */}
        <section
          id="about"
          className="border-y border-cyan-400/15 bg-[#0B2239]/40 backdrop-blur-sm py-12"
        >
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-cyan-400/15 bg-[#06131F]/65 p-5">
              <ShieldCheck className="w-5 h-5 text-[#FF5A1F] mb-2.5" />
              <h2 className="text-sm font-bold text-white">Riset &amp; Rekayasa Wahana</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Pengembangan sistem mekanik, elektrik, kontrol, dan navigasi wahana bawah air secara terintegrasi.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-400/15 bg-[#06131F]/65 p-5">
              <Waves className="w-5 h-5 text-cyan-300 mb-2.5" />
              <h2 className="text-sm font-bold text-white">Kesiapan Kompetisi</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Pengujian performa, manuver, dan misi wahana untuk ajang kompetisi nasional seperti Kontes Kapal Indonesia.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-400/15 bg-[#06131F]/65 p-5">
              <Anchor className="w-5 h-5 text-[#FF5A1F] mb-2.5" />
              <h2 className="text-sm font-bold text-white">Konten Dinamis Berbasis CMS</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Dokumentasi kegiatan, progres tim, dan pengumuman terbaru dapat diperbarui langsung oleh admin.
              </p>
            </div>
          </div>
        </section>

        {/* Dynamic Gallery Section */}
        <section id="gallery" className="max-w-6xl mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold tracking-wider text-[#FF5A1F] uppercase">
                Dokumentasi &amp; Progres
              </span>
              <h2 className="text-2xl sm:text-3xl font-black italic text-white mt-1">
                GALERI TIM SAGARA
              </h2>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                      active
                        ? 'bg-[#FF5A1F] text-white'
                        : 'bg-[#0B2239]/80 text-slate-300 border border-cyan-400/15 hover:border-cyan-400/40'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {filteredGallery.length === 0 ? (
            <div className="rounded-2xl border border-cyan-400/15 bg-[#0B2239]/50 p-10 text-center">
              <p className="text-sm text-slate-300 font-semibold">
                Belum ada foto untuk kategori &ldquo;{selectedCategory}&rdquo;.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Upload foto lewat halaman{' '}
                <Link href="/admin" className="text-[#FF5A1F] underline">
                  Admin Portal
                </Link>{' '}
                untuk menampilkannya di sini.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item) => (
                <article
                  key={item.id}
                  className="group rounded-2xl border border-cyan-400/15 bg-[#0B2239]/65 backdrop-blur-sm overflow-hidden hover:border-[#FF5A1F]/50 transition"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#06131F]">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className="inline-block rounded-md bg-[#FF5A1F]/15 text-[#FF5A1F] text-[10px] font-bold px-2.5 py-0.5 mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    {item.caption && (
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-400/15 bg-[#040C14] py-8 text-center text-xs text-slate-400 relative z-10">
        <p className="font-semibold text-slate-200">
          SAGARA ITENAS ROV TEAM — Institut Teknologi Nasional Bandung
        </p>
        <p className="mt-1">Dynamic Team Portfolio • Next.js &amp; Supabase</p>
      </footer>
    </div>
  );
}