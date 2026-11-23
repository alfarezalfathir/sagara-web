'use client';

import { useCallback, useEffect, useState } from 'react';
import { fetchGalleryPosts } from '@/lib/supabase/queries';
import type { GalleryPost } from '@/types/gallery';

export function useGalleryPosts(limit?: number) {
  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    fetchGalleryPosts(limit).then((data) => {
      if (!active) return;
      setPosts(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [limit, reloadKey]);

  const reload = useCallback(() => {
    setLoading(true);
    setReloadKey((key) => key + 1);
  }, []);

  return { posts, loading, reload };
}
