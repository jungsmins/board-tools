import { SeasonConfig } from '@/types/cartographers';

interface CartographersHeaderProps {
  seasonConfig: SeasonConfig;
  currentTimePoints: number;
}

export default function CartographersHeader({
  seasonConfig,
  currentTimePoints,
}: CartographersHeaderProps) {
  const { name, maxTimePoints } = seasonConfig;
  const displayedTimePoints = Math.min(currentTimePoints, maxTimePoints);
  const timePointsProgress = (displayedTimePoints / maxTimePoints) * 100;

  return (
    <header className='relative flex h-16 w-full items-center justify-between overflow-hidden rounded-2xl bg-black/60 px-6'>
      <div
        className='absolute inset-y-0 left-0 bg-brand-700 transition-[width] duration-700 ease-out'
        style={{ width: `${timePointsProgress}%` }}
      ></div>
      <span className='relative rounded-full bg-black/40 px-4 py-2 text-lg font-bold text-white'>
        {name}
      </span>
      <span className='relative rounded-full bg-black/40 px-4 py-2 text-lg font-bold text-white'>
        {currentTimePoints} / {maxTimePoints}
      </span>
    </header>
  );
}
