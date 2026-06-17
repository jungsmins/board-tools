import type { ScoringRule } from '@/types/cartographers';
import ScoringCard from './ScoringCard';

interface ScoringSectionProps {
  scoringRules: ScoringRule[];
}

export default function ScoringSection({ scoringRules }: ScoringSectionProps) {
  return (
    <section className='flex flex-1 flex-col bg-[var(--color-cartographers-panel)] p-4'>
      <h2 className='mb-4 text-[var(--color-cartographers-ink)]'>칙령</h2>
      <ul className='flex h-full w-full flex-col gap-3'>
        {scoringRules.map((scoringRule) => {
          return <ScoringCard key={scoringRule.id} scoringRule={scoringRule} />;
        })}
      </ul>
    </section>
  );
}
