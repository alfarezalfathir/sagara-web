import type { ReactNode } from 'react';

interface SectionHeadingProps {
  title: string;
  description?: ReactNode;
  className?: string;
}

export function SectionHeading({
  title,
  description,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <h2 className="font-display text-4xl font-bold italic leading-[0.95] tracking-tight text-foam sm:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-mist">
          {description}
        </p>
      )}
    </div>
  );
}
