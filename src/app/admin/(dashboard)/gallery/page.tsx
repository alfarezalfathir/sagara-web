'use client';

import { useState } from 'react';
import { deleteGalleryPost } from '@/lib/supabase/queries';
import { getErrorMessage } from '@/lib/errors';
import { formatDate } from '@/lib/format-date';
import { useGalleryPosts } from '@/hooks/useGalleryPosts';
import { Button } from '@/components/ui/Button';
import { GalleryForm } from '@/components/admin/GalleryForm';
import type { GalleryPost } from '@/types/gallery';

export default function AdminGalleryPage() {
  const { posts, loading, reload } = useGalleryPosts();
  const [editing, setEditing] = useState<GalleryPost | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);

  function handleSaved() {
    setEditing(null);
    setFormKey((key) => key + 1);
    setMessage({ type: 'ok', text: 'Foto tersimpan.' });
    reload();
  }

  async function handleDelete(post: GalleryPost) {
    if (!window.confirm(`Hapus "${post.title}"? Foto akan hilang dari galeri.`)) return;

    try {
      await deleteGalleryPost(post.id);
      if (editing?.id === post.id) setEditing(null);
      setMessage({ type: 'ok', text: 'Foto dihapus.' });
      reload();
    } catch (err) {
      setMessage({
        type: 'error',
        text: `Foto belum terhapus. Detail: ${getErrorMessage(err, 'tidak diketahui')}`,
      });
    }
  }

  return (
    <div>
      <h1 className="font-display text-5xl font-extrabold italic leading-none text-foam">
        Galeri
      </h1>

      {message && (
        <p
          role={message.type === 'error' ? 'alert' : 'status'}
          className={`mt-6 text-sm ${message.type === 'error' ? 'text-flare' : 'text-foam'}`}
        >
          {message.text}
        </p>
      )}

      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        <section className="lg:col-span-5">
          <h2 className="mb-5 text-lg font-semibold text-foam">
            {editing ? 'Edit foto' : 'Tambah foto'}
          </h2>
          <GalleryForm
            key={editing?.id ?? `new-${formKey}`}
            initial={editing}
            onSaved={handleSaved}
            onCancel={editing ? () => setEditing(null) : undefined}
          />
        </section>

        <section className="lg:col-span-7">
          <h2 className="mb-5 text-lg font-semibold text-foam">Semua foto</h2>

          {loading ? (
            <p className="text-mist">Memuat galeri…</p>
          ) : posts.length === 0 ? (
            <p className="text-mist">Belum ada foto. Tambahkan foto pertama lewat form.</p>
          ) : (
            <ul className="divide-y divide-line border-y border-line">
              {posts.map((post) => (
                <li key={post.id} className="flex items-center gap-4 py-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image_url}
                    alt=""
                    className="h-16 w-16 shrink-0 rounded-md border border-line object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foam">{post.title}</p>
                    <p className="text-xs text-mist">
                      {post.category}
                      {post.event_date ? `, ${formatDate(post.event_date)}` : ''}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setEditing(post)}>
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(post)}>
                      Hapus
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
