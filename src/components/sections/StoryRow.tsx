import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

interface StoryRowProps {
  title: string;
  body: string;
  imageLabel?: string;
  reverse?: boolean;
  children?: ReactNode;
}

/** Baris cerita: teks dan foto berdampingan, bergantian kiri-kanan. */
export function StoryRow({
  title,
  body,
  imageLabel,
  reverse = false,
  children,
}: StoryRowProps) {
  return (
    <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <div className={reverse ? 'md:order-2' : ''}>
        <h2 className="font-display text-4xl font-bold italic leading-[0.95] text-foam sm:text-6xl">
          {title}
        </h2>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-mist">{body}</p>
        {children && <div className="mt-6">{children}</div>}
      </div>
      <ImagePlaceholder label={imageLabel} className="aspect-[4/3]" />
    </Container>
  );
}
