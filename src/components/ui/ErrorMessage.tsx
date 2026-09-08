import clsx from 'clsx';

type ErrorMessageProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ErrorMessage({
  children,
  className = '',
}: ErrorMessageProps) {
  return (
    <p
      className={clsx(
        'rounded-lg border border-[#e2a7a1] bg-[#fff1ee] px-4 py-3 text-sm font-bold text-[#8f3a2f]',
        className,
      )}
    >
      {children}
    </p>
  );
}
