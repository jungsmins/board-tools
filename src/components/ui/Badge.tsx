import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type BadgeTone = 'neutral' | 'positive' | 'negative' | 'highlight';

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
} & HTMLAttributes<HTMLSpanElement>;

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'bg-[var(--color-avalon-tan,#e7dcc8)] text-ink',
  positive:
    'bg-[var(--color-avalon-good-bg,#eef8f2)] text-[var(--color-avalon-good-text,#237348)]',
  negative:
    'bg-[var(--color-avalon-evil-bg,#fff1ee)] text-[var(--color-avalon-evil-text,#8f3a2f)]',
  highlight:
    'bg-[var(--color-avalon-candidate-bg,#fff6db)] text-[var(--color-avalon-candidate-text,#7a5a12)]',
};

export default function Badge({
  children,
  tone = 'neutral',
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
