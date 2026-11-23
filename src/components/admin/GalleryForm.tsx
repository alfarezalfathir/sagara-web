'use client';

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { GALLERY_CATEGORIES } from '@/constants/categories';
import {
  createGalleryPost,
  updateGalleryPost,
  uploadGalleryImage,
} from '@/lib/supabase/queries';
import { getErrorMessage } from '@/lib/errors';
import { Button } from '@/components/ui/Button';
import type { GalleryPost } from '@/types/gallery';
import { Field, inputClass } from './Field';

interface GalleryFormProps {
  initial?: GalleryPost | null;
  onSaved: () => void;
  onCancel?: () => void;
}

export function GalleryForm({ initial = null, onSaved, onCancel }: GalleryFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [category, setCategory] = useState<string>(initial?.category ?? GALLERY_CATEGORIES[0]);
  const [caption, setCaption] = useState(initial?.caption ?? '');
  const [eventDate, setEventDate] = useState(initial?.event_date?.slice(0, 10) ?? '');
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const localPreview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  const preview = localPreview ?? initial?.image_url ?? null;

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files?.[0] ?? null);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');

    if (!initial && !file) {
      setError('Pilih foto yang akan diunggah.');
      return;
    }

    setSaving(true);
    try {
      const imageUrl = file ? await uploadGalleryImage(file) : (initial?.image_url ?? '');
      const payload = {
        title: title.trim(),
        category,
        caption: caption.trim() || null,
        image_url: imageUrl,
        event_date: eventDate,
      };

      if (initial) {
        await updateGalleryPost(initial.id, payload);
      } else {
        await createGalleryPost(payload);
      }
      onSaved();
    } catch (err) {
      setError(
        `Foto belum tersimpan. Detail: ${getErrorMessage(err, 'tidak diketahui')}`,
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Judul" htmlFor="gallery-title">
        <input
          id="gallery-title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Kategori" htmlFor="gallery-category">
          <select
            id="gallery-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          >
            {GALLERY_CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Tanggal kegiatan" htmlFor="gallery-date">
          <input
            id="gallery-date"
            type="date"
            required
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Keterangan" htmlFor="gallery-caption" hint="Opsional.">
        <textarea
          id="gallery-caption"
          rows={3}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field
        label="Foto"
        htmlFor="gallery-file"
        hint={initial ? 'Kosongkan jika tidak ingin mengganti foto.' : 'Format JPG, PNG, atau WebP.'}
      >
        <input
          id="gallery-file"
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="block w-full text-sm text-mist file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-shallows file:px-4 file:py-2 file:text-sm file:font-semibold file:text-foam hover:file:bg-surface"
        />
      </Field>

      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Pratinjau foto"
          className="max-h-64 rounded-md border border-line object-contain"
        />
      )}

      {error && (
        <p role="alert" className="text-sm text-flare">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? 'Menyimpan…' : initial ? 'Simpan perubahan' : 'Tambah foto'}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel} disabled={saving}>
            Batal
          </Button>
        )}
      </div>
    </form>
  );
}
