import type { HeroContent } from '@/types/site-content';

export const SITE = {
  name: 'SAGARA ITENAS',
  fullName: 'Sagara Itenas ROV Team',
  institution: 'Institut Teknologi Nasional Bandung',
  tagline: 'One Vision, One Journey.',
  description:
    'Tim riset dan pengembangan wahana bawah air (Remotely Operated Vehicle) Institut Teknologi Nasional Bandung.',
  email: 'Sagaraitenas@gmail.com',
  instagram: {
    handle: 'sagara_itenas',
    url: 'https://www.instagram.com/sagara_itenas/',
  },
  tiktok: {
    handle: 'sagaraitenas_team',
    url: 'https://www.tiktok.com/@sagaraitenas_team',
  },
  // TODO: isi dengan link Google Form open recruitment yang aktif.
  // Selama kosong, tombol pendaftaran diarahkan ke Instagram.
  recruitmentFormUrl: '',
} as const;

// TODO: pastikan nama bucket ini sama dengan bucket di Supabase Storage.
export const STORAGE_BUCKET = 'gallery';

export const DEFAULT_HERO: HeroContent = {
  title: 'EXPLORE DEEPER.',
  subtitle: 'SAGARA ITENAS ROV TEAM',
  description: SITE.description,
  image_url: null,
};
