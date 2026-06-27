export default function DirectionArrow({
  direction,
}: {
  direction: 'left' | 'right';
}) {
  const isLeft = direction === 'left';

  return (
    <svg
      viewBox='0 0 120 32'
      aria-label={isLeft ? '왼쪽 방향' : '오른쪽 방향'}
      className={`mt-4 h-8 w-30 text-white ${isLeft ? 'rotate-180' : ''}`}
      role='img'
    >
      <path
        d='M8 16H106'
        stroke='currentColor'
        strokeWidth='5'
        strokeLinecap='round'
      />
      <path
        d='M92 4L108 16L92 28'
        fill='none'
        stroke='currentColor'
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
