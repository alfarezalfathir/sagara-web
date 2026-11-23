'use client';

import dynamic from 'next/dynamic';

// Three.js hanya jalan di browser, jadi dimuat tanpa SSR.
const RovViewer3D = dynamic(() => import('./RovViewer3D'), {
  ssr: false,
  loading: () => (
    <div className="flex h-72 items-center justify-center text-sm text-foam/80">
      Memuat model 3D…
    </div>
  ),
});

interface RovViewerProps {
  heightClass?: string;
}

export function RovViewer({ heightClass }: RovViewerProps) {
  return <RovViewer3D heightClass={heightClass} />;
}
