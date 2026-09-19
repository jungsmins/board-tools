import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export default function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={clsx(
        'h-12 w-full rounded-lg border border-ink/10 bg-white px-4 text-ink outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/15 placeholder:text-ink-muted',
        className,
      )}
      {...props}
    />
  );
}
