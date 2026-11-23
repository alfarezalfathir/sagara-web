import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';

interface PageHeaderProps {
  title: string;
  description?: ReactNode;
}

/** Pembuka halaman dalam: lapisan permukaan air dengan sinar cahaya. */
export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="light-rays pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative py-20 sm:py-28">
        <h1 className="font-display text-6xl font-extrabold italic leading-[0.9] tracking-tight text-foam sm:text-8xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foam/85">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
