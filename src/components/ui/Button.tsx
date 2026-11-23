import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'ghost';
type Size = 'md' | 'sm';

const base =
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-flare text-abyss hover:bg-flare-deep',
  ghost: 'border border-line text-foam hover:border-foam',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-3',
  sm: 'px-4 py-2',
};

export function buttonClasses(
  variant: Variant = 'primary',
  size: Size = 'md',
  className = '',
) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return <button className={buttonClasses(variant, size, className)} {...props} />;
}

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);

  if (/^https?:\/\//.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
