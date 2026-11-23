'use client';

import { useState } from 'react';
import { ALL_CATEGORY, GALLERY_FILTERS } from '@/constants/categories';
import { formatDate } from '@/lib/format-date';
import type { GalleryPost } from '@/types/gallery';

interface GalleryGridProps {
  posts: GalleryPost[];
  loading: boolean;
  showFilters?: boolean;
}

export function GalleryGrid({ posts, loading, showFilters = false }: GalleryGridProps) {
  const [category, setCategory] = useState<string>(ALL_CATEGORY);

  const visible =
    category === ALL_CATEGORY ? posts : posts.filter((post) => post.category === category);

  return (
    <div>
      {showFilters && (
        <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2">
          {GALLERY_FILTERS.map((filter) => {
            const active = filter === category;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(filter)}
                className={`cursor-pointer border-b-2 py-1 text-sm font-medium transition-colors hover:text-foam ${
                  active ? 'border-flare text-foam' : 'border-transparent text-mist'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      )}

      {loading ? (
        <p className="py-16 text-mist">Memuat galeri…</p>
      ) : visible.length === 0 ? (
        <p className="py-16 text-mist">
          {category === ALL_CATEGORY
            ? 'Belum ada foto di galeri.'
            : `Belum ada foto di kategori ${category}.`}
        </p>
      ) : (
        <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {visible.map((post) => (
            <li key={post.id} className="mb-10 break-inside-avoid">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image_url}
                alt={post.title}
                loading="lazy"
                className="w-full rounded-md border border-line"
              />
              <div className="mt-3 flex flex-wrap items-baseline gap-x-3 text-xs text-mist">
                <span className="font-semibold text-foam/90">{post.category}</span>
                <span>{formatDate(post.event_date)}</span>
              </div>
              <h3 className="mt-1 text-lg font-semibold leading-snug text-foam">
                {post.title}
              </h3>
              {post.caption && (
                <p className="mt-1 text-sm leading-relaxed text-mist">{post.caption}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
