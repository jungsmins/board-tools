import type { ScoringRule } from '@/types/cartographers';
import { SCORING_SLOT_BADGE_STYLES } from '@/constants/cartographers';

type ScoringCardProps = {
  scoringRule: ScoringRule;
  variant?: 'compact' | 'showcase';
};

export default function ScoringCard({
  scoringRule,
  variant = 'compact',
}: ScoringCardProps) {
  const isShowcase = variant === 'showcase';

  return (
    <li
      className={`flex w-full flex-1 rounded-lg bg-cartographers-card shadow ${isShowcase ? 'items-start gap-8 p-10' : 'p-4'}`}
    >
      <div
        className={`flex shrink-0 items-center justify-center rounded-sm font-bold ${isShowcase ? 'h-20 w-20 text-5xl' : 'mr-2 h-8 w-8'} ${SCORING_SLOT_BADGE_STYLES[scoringRule.slot]}`}
      >
        {scoringRule.slot}
      </div>
      <div>
        <div
          className={`font-bold text-cartographers-ink ${isShowcase ? 'mb-6 text-5xl' : 'text-lg'}`}
        >
          {scoringRule.name}
        </div>
        <p
          className={`text-cartographers-muted ${isShowcase ? 'text-3xl leading-relaxed' : ''}`}
        >
          {scoringRule.description}
        </p>
      </div>
    </li>
  );
}
