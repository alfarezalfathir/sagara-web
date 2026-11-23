interface ImagePlaceholderProps {
  label?: string;
  className?: string;
}

/** Penanda tempat foto sampai foto asli tersedia. */
export function ImagePlaceholder({
  label = 'Foto menyusul',
  className = 'aspect-[4/3]',
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`sonar-lines flex items-end rounded-md border border-line bg-gradient-to-b from-shallows to-midwater p-4 ${className}`}
    >
      <span className="text-sm text-mist">{label}</span>
    </div>
  );
}
