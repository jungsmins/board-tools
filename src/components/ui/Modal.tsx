import type { ReactNode } from 'react';
import { useEffect } from 'react';
import clsx from 'clsx';

type ModalProps = {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
};

export default function Modal({ children, className, onClose }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      onClick={(e) => (e.target === e.currentTarget ? onClose?.() : null)}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 overflow-hidden'
    >
      <section
        className={clsx(
          'w-full max-w-[320] rounded-md bg-surface-raised p-5 shadow-modal',
          className,
        )}
      >
        {children}
      </section>
    </div>
  );
}
