'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { saveHeroContent, uploadGalleryImage } from '@/lib/supabase/queries';
import { getErrorMessage } from '@/lib/errors';
import { Button } from '@/components/ui/Button';
import type { HeroContent } from '@/types/site-content';
import { Field, inputClass } from './Field';

export function HeroForm({ initial }: { initial: HeroContent }) {
  const [title, setTitle] = useState(initial.title);
  const [subtitle, setSubtitle] = useState(initial.subtitle ?? '');
  const [description, setDescription] = useState(initial.description ?? '');
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);

  const localPreview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  const imagePreview = localPreview ?? initial.image_url;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    setSaving(true);

    try {
      const imageUrl = file ? await uploadGalleryImage(file) : initial.image_url;
      await saveHeroContent({
        title: title.trim(),
        subtitle: subtitle.trim() || null,
        description: description.trim() || null,
        image_url: imageUrl,
      });
      setMessage({ type: 'ok', text: 'Konten hero tersimpan.' });
    } catch (err) {
      setMessage({
        type: 'error',
        text: `Konten belum tersimpan. Detail: ${getErrorMessage(err, 'tidak diketahui')}`,
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Judul" htmlFor="hero-title">
          <input
            id="hero-title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Nama tim" htmlFor="hero-subtitle" hint="Tampil kecil di atas judul.">
          <input
            id="hero-subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Deskripsi" htmlFor="hero-description">
          <textarea
            id="hero-description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field
          label="Foto latar"
          htmlFor="hero-file"
          hint="Opsional. Foto tampil samar di belakang hero."
        >
          <input
            id="hero-file"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-mist file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-shallows file:px-4 file:py-2 file:text-sm file:font-semibold file:text-foam hover:file:bg-surface"
          />
        </Field>

        {message && (
          <p
            role={message.type === 'error' ? 'alert' : 'status'}
            className={`text-sm ${message.type === 'error' ? 'text-flare' : 'text-foam'}`}
          >
            {message.text}
          </p>
        )}

        <Button type="submit" disabled={saving}>
          {saving ? 'Menyimpan…' : 'Simpan perubahan'}
        </Button>
      </form>

      <div>
        <p className="mb-3 text-sm font-medium text-foam">Pratinjau</p>
        <div className="relative overflow-hidden rounded-md bg-surface p-8">
          {imagePreview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imagePreview}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-25"
            />
          )}
          <div className="light-rays pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative">
            {subtitle && <p className="text-sm font-semibold text-foam/80">{subtitle}</p>}
            <p className="mt-2 font-display text-5xl font-extrabold italic leading-[0.9] text-foam">
              {title || 'Judul hero'}
            </p>
            {description && (
              <p className="mt-4 max-w-sm leading-relaxed text-foam/85">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
