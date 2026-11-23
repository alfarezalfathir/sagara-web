import type { ReactNode } from 'react';

export const inputClass =
  'w-full rounded-md border border-line bg-abyss px-3 py-2.5 text-sm text-foam placeholder:text-mist/70 focus:border-flare [color-scheme:dark]';

interface FieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, hint, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-foam">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-mist">{hint}</p>}
    </div>
  );
}
