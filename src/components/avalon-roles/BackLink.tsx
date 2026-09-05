import Link from 'next/link';

interface BackLinkProps {
  href: string;
  label?: string;
}

export default function BackLink({ href, label = '이전으로' }: BackLinkProps) {
  return (
    <Link
      href={href}
      className='mb-6 flex w-fit items-center gap-1.5 text-sm font-semibold text-ink-muted underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-[#2d1508]/20'
    >
      <svg
        aria-hidden='true'
        className='h-4 w-4'
        fill='none'
        viewBox='0 0 24 24'
      >
        <path
          d='M15 18L9 12L15 6'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
        />
      </svg>
      {label}
    </Link>
  );
}
