import { useState } from 'react';
import type { ScoringRule, ScoringSlot } from '@/types/cartographers';
import ScoringCard from './ScoringCard';

interface ScoringSectionProps {
  scoringRules: ScoringRule[];
  seasonScoringSlots?: [ScoringSlot, ScoringSlot];
  variant?: 'compact' | 'showcase';
}

export default function ScoringSection({
  scoringRules,
  seasonScoringSlots,
  variant = 'compact',
}: ScoringSectionProps) {
  const isShowcase = variant === 'showcase';
  const [showSeasonOnly, setShowSeasonOnly] = useState(false);

  const isSeasonView = !isShowcase && showSeasonOnly && !!seasonScoringSlots;

  const displayedRules = isSeasonView
    ? scoringRules.filter((rule) => seasonScoringSlots.includes(rule.slot))
    : scoringRules;

  return (
    <section
      className={`flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl bg-black/60 ${isShowcase ? 'h-full' : ''}`}
    >
      <div className={`flex min-w-0 flex-1 flex-col ${isShowcase ? 'p-8' : 'p-4'}`}>
        {!isShowcase && seasonScoringSlots ? (
          <div className='mb-4 inline-flex w-fit gap-1 rounded-full border border-white/50 bg-white/10 p-1 text-sm font-bold shadow-sm'>
            <button
              type='button'
              onClick={() => setShowSeasonOnly(false)}
              className={`cursor-pointer rounded-full px-3 py-1 transition ${
                !showSeasonOnly
                  ? 'bg-brand-700 text-white'
                  : 'text-white'
              }`}
            >
              전체 칙령
            </button>
            <button
              type='button'
              onClick={() => setShowSeasonOnly(true)}
              className={`cursor-pointer rounded-full px-3 py-1 transition ${
                showSeasonOnly
                  ? 'bg-brand-700 text-white'
                  : 'text-white'
              }`}
            >
              이번 시즌
            </button>
          </div>
        ) : (
          !isShowcase && (
            <h2 className='mb-4 inline-flex w-fit rounded-full border border-white/50 bg-white/70 px-3 py-1 text-sm font-bold text-cartographers-ink shadow-sm'>
              칙령
            </h2>
          )
        )}
        <ul
          className={`w-full gap-3 ${
            isShowcase
              ? 'flex min-h-0 flex-1 flex-row gap-8'
              : isSeasonView
                ? 'grid h-full grid-cols-2'
                : 'flex h-full flex-col'
          }`}
        >
          {displayedRules.map((scoringRule) => {
            return (
              <ScoringCard
                key={scoringRule.id}
                scoringRule={scoringRule}
                variant={variant}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}
