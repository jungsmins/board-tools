import clsx from 'clsx';

type ErrorMessageTone = 'error' | 'warning';

type ErrorMessageProps = {
  children: React.ReactNode;
  className?: string;
  tone?: ErrorMessageTone;
};

const toneClasses: Record<ErrorMessageTone, string> = {
  error:
    'border-[var(--color-avalon-danger-border,#e2a7a1)] bg-[var(--color-avalon-evil-bg,#fff1ee)] text-[var(--color-avalon-evil-text,#8f3a2f)]',
  warning:
    'border-[var(--color-avalon-warning-border,#ead18d)] bg-[var(--color-avalon-warning-bg,#fff9e8)] text-[var(--color-avalon-warning-text,#765b13)]',
};

export default function ErrorMessage({
  children,
  className = '',
  tone = 'error',
}: ErrorMessageProps) {
  return (
    <p
      className={clsx(
        'rounded-lg border px-4 py-3 text-sm font-bold',
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </p>
  );
}
