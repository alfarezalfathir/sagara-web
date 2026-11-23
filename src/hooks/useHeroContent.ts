'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_HERO } from '@/constants/site';
import { fetchHeroContent } from '@/lib/supabase/queries';
import type { HeroContent } from '@/types/site-content';

export function useHeroContent() {
  const [hero, setHero] = useState<HeroContent>(DEFAULT_HERO);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchHeroContent().then((data) => {
      if (!active) return;
      setHero(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  return { hero, loading };
}
