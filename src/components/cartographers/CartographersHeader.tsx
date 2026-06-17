import { SeasonConfig } from '@/types/cartographers';
import { SCORING_SLOT_BADGE_STYLES } from '@/constants/cartographers';

interface CartographersHeaderProps {
  seasonConfig: SeasonConfig;
  currentTimePoints: number;
}

export default function CartographersHeader({
  seasonConfig,
  currentTimePoints,
}: CartographersHeaderProps) {
  const { name, maxTimePoints, scoringSlots } = seasonConfig;
  const timePointsProgress = (currentTimePoints / maxTimePoints) * 100;

  return (
    <header className='flex h-16 w-full items-center gap-10 bg-[var(--color-cartographers-surface)] px-6'>
      <div className='flex items-center justify-center gap-4 rounded-full bg-[var(--color-cartographers-panel)] px-4 py-2'>
        <div className='font-bold text-[var(--color-cartographers-ink)]'>
          {name}
        </div>
        <div
          className={`rounded-full px-2 font-bold ${SCORING_SLOT_BADGE_STYLES[scoringSlots[0]]}`}
        >
          {scoringSlots[0]}
        </div>
        <div
          className={`rounded-full px-2 font-bold ${SCORING_SLOT_BADGE_STYLES[scoringSlots[1]]}`}
        >
          {scoringSlots[1]}
        </div>
      </div>
      <div className='h-5 flex-1 overflow-hidden rounded-lg bg-white/60'>
        <div
          className='h-full bg-[var(--color-cartographers-panel)]'
          style={{ width: `${timePointsProgress}%` }}
        ></div>
      </div>
      <div className='flex items-center justify-center gap-4 rounded-full bg-[var(--color-cartographers-panel)] px-4 py-2 font-bold text-[var(--color-cartographers-ink)]'>
        {currentTimePoints} / {maxTimePoints}
      </div>
    </header>
  );
}