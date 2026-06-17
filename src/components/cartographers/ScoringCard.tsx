import type { ScoringRule } from '@/types/cartographers';
import { SCORING_SLOT_BADGE_STYLES } from '@/constants/cartographers';

type ScoringCardProps = {
  scoringRule: ScoringRule;
};

export default function ScoringCard({ scoringRule }: ScoringCardProps) {
  return (
    <li className='flex w-full flex-1 rounded-lg bg-[var(--color-cartographers-card)] p-4 shadow'>
      <div
        className={`mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm font-bold ${SCORING_SLOT_BADGE_STYLES[scoringRule.slot]}`}
      >
        {scoringRule.slot}
      </div>
      <div>
        <div className='text-lg font-bold text-[var(--color-cartographers-ink)]'>
          {scoringRule.name}
        </div>
        <p className='text-[var(--color-cartographers-muted)]'>
          {scoringRule.description}
        </p>
      </div>
    </li>
  );
}
