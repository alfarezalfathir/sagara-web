'use client';

import { useGalleryPosts } from '@/hooks/useGalleryPosts';
import { GalleryGrid } from './GalleryGrid';

export function GalleryBrowser() {
  const { posts, loading } = useGalleryPosts();

  return <GalleryGrid posts={posts} loading={loading} showFilters />;
}
