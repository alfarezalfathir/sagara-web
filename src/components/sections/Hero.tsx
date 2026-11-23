'use client';

import type { CSSProperties } from 'react';
import { useHeroContent } from '@/hooks/useHeroContent';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { RovViewer } from '@/components/three/RovViewer';

const BUBBLES = [
  { x: '6%', size: '10px', delay: '0s', dur: '13s' },
  { x: '18%', size: '16px', delay: '4s', dur: '16s' },
  { x: '34%', size: '8px', delay: '7s', dur: '12s' },
  { x: '52%', size: '14px', delay: '2s', dur: '15s' },
  { x: '68%', size: '9px', delay: '9s', dur: '13s' },
  { x: '82%', size: '18px', delay: '5s', dur: '17s' },
  { x: '93%', size: '11px', delay: '1s', dur: '14s' },
];

export function Hero() {
  const { hero } = useHeroContent();

  return (
    <section className="relative overflow-hidden bg-surface">
      {hero.image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={hero.image_url}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
      )}
      <div className="light-rays pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {BUBBLES.map((bubble) => (
          <span
            key={bubble.x}
            className="bubble"
            style={
              {
                '--x': bubble.x,
                '--size': bubble.size,
                '--delay': bubble.delay,
                '--dur': bubble.dur,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <Container className="relative grid items-center gap-10 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-6">
          {hero.subtitle && (
            <p className="text-sm font-semibold text-foam/80">{hero.subtitle}</p>
          )}
          <h1 className="mt-3 font-display text-6xl font-extrabold italic leading-[0.88] tracking-tight text-foam sm:text-8xl">
            {hero.title}
          </h1>
          {hero.description && (
            <p className="mt-6 max-w-md text-lg leading-relaxed text-foam/85">
              {hero.description}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/gallery">Lihat dokumentasi</ButtonLink>
            <ButtonLink href="/recruitment" variant="ghost">
              Gabung Sagara
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-6">
          <RovViewer heightClass="h-80 sm:h-[460px]" />
        </div>
      </Container>
    </section>
  );
}
