import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type BadgeProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

export default function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full bg-[#e7dcc8] px-2 py-1 text-sm text-ink',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
