import type { ReactNode } from 'react';
import clsx from 'clsx';

type OverlayPanelProps = {
  children: ReactNode;
  className?: string;
};

export default function OverlayPanel({
  children,
  className,
}: OverlayPanelProps) {
  return (
    <div
      className={clsx(
        'flex w-full items-center justify-center rounded-lg bg-cartographers-overlay',
        className,
      )}
    >
      {children}
    </div>
  );
}
