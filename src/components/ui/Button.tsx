import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#C0E8CC] text-[#2d1508] hover:bg-[#abdcbc]',
  secondary: 'bg-white text-[#2d1508] hover:bg-[#f4f4f4]',
  ghost: 'bg-transparent text-[#2d1508] hover:bg-black/5',
  danger: 'bg-[#e04830] text-white hover:bg-[#c93b26]',
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
      className={`cursor-pointer rounded-lg transition ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
