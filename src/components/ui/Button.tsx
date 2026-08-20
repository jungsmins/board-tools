import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-cartographers-button-primary,var(--color-brand-700))] text-white hover:bg-[var(--color-cartographers-button-primary-hover,var(--color-brand-900))]',
  secondary: 'bg-[#e7dcc8] text-ink hover:bg-[#dacbae]',
  ghost: 'bg-transparent text-ink hover:bg-black/5',
  danger: 'bg-danger text-white hover:bg-[#c93b26]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
};

export default function Button({
  children,
  onClick,
  variant = 'ghost',
  size = 'md',
  type = 'button',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        'cursor-pointer rounded-md font-bold transition active:scale-[0.97]',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
