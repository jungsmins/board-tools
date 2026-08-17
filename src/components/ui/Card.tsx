import { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type CardPadding = 'sm' | 'md' | 'lg';

type CardProps = {
  children: ReactNode;
  padding?: CardPadding;
} & HTMLAttributes<HTMLDivElement>;

const paddingClasses: Record<CardPadding, string> = {
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
};

export default function Card({
  children,
  padding = 'md',
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-md bg-surface-raised shadow-card',
        paddingClasses[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
