import { supabase } from './client';
import { DEFAULT_HERO, STORAGE_BUCKET } from '@/constants/site';
import type { GalleryPost, GalleryPostInput } from '@/types/gallery';
import type { HeroContent } from '@/types/site-content';

/* ---------- Baca (publik) ---------- */

export async function fetchHeroContent(): Promise<HeroContent> {
  const { data } = await supabase
    .from('site_content')
    .select('title, subtitle, description, image_url')
    .eq('section_key', 'hero')
    .maybeSingle();

  return data ?? DEFAULT_HERO;
}

export async function fetchGalleryPosts(limit?: number): Promise<GalleryPost[]> {
  let query = supabase
    .from('gallery_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (limit) query = query.limit(limit);

  const { data } = await query;
  return data ?? [];
}

/* ---------- Tulis (admin, butuh login + RLS) ---------- */

export async function saveHeroContent(hero: HeroContent): Promise<void> {
  const { data: existing } = await supabase
    .from('site_content')
    .select('section_key')
    .eq('section_key', 'hero')
    .maybeSingle();

  const result = existing
    ? await supabase.from('site_content').update(hero).eq('section_key', 'hero')
    : await supabase.from('site_content').insert({ section_key: 'hero', ...hero });

  if (result.error) throw result.error;
}

export async function createGalleryPost(input: GalleryPostInput): Promise<void> {
  const { error } = await supabase.from('gallery_posts').insert(input);
  if (error) throw error;
}

export async function updateGalleryPost(
  id: string,
  input: Partial<GalleryPostInput>,
): Promise<void> {
  const { error } = await supabase.from('gallery_posts').update(input).eq('id', id);
  if (error) throw error;
}

export async function deleteGalleryPost(id: string): Promise<void> {
  const { error } = await supabase.from('gallery_posts').delete().eq('id', id);
  if (error) throw error;
}

export async function uploadGalleryImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const path = `${Date.now()}-${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;

  return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}
