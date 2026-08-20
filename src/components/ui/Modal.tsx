import type { ReactNode } from 'react';
import clsx from 'clsx';

type ModalProps = {
  children: ReactNode;
  className?: string;
};

export default function Modal({ children, className }: ModalProps) {
  return (
    <div className='fixed inset-0 z-50 flex itmes-center jutify-center bg-black/45 p-4'>
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
