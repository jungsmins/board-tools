import type { ScoringRule } from '@/types/cartographers';
import ScoringCard from './ScoringCard';

interface ScoringSectionProps {
  scoringRules: ScoringRule[];
  variant?: 'compact' | 'showcase';
}

export default function ScoringSection({
  scoringRules,
  variant = 'compact',
}: ScoringSectionProps) {
  const isShowcase = variant === 'showcase';

  return (
    <section
      className={`flex flex-1 flex-col bg-[var(--color-cartographers-panel)] ${isShowcase ? 'h-full p-8' : 'p-4'}`}
    >
      {!isShowcase && (
        <h2 className='mb-4 text-[var(--color-cartographers-ink)]'>칙령</h2>
      )}
      <ul
        className={`flex w-full gap-3 ${isShowcase ? 'min-h-0 flex-1 flex-row gap-8' : 'h-full flex-col'}`}
      >
        {scoringRules.map((scoringRule) => {
          return (
            <ScoringCard
              key={scoringRule.id}
              scoringRule={scoringRule}
              variant={variant}
            />
          );
        })}
      </ul>
    </section>
  );
}
