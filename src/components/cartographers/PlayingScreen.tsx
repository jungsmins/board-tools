import { useEffect } from 'react';
import { useCartographersStore } from '@/stores/cartographers';
import { SEASON_CONFIG, SCORING_RULES } from '@/constants/cartographers';
import CartographersHeader from './CartographersHeader';
import ScoringSection from './ScoringSection';
import ExploreSection from './ExploreSection';

export default function PlayingScreen() {
  const { nextCard, currentTimePoints, currentSeason, selectedScoringRules } =
    useCartographersStore();

  const scoringRuleIds = Object.values(selectedScoringRules);
  const scoringRules = scoringRuleIds
    .map((id) => {
      return SCORING_RULES.find((rule) => rule.id === id);
    })
    .filter((rule) => rule !== undefined);

  const seasonConfig = SEASON_CONFIG.find(
    (season) => season.season === currentSeason,
  );

  useEffect(() => {
    nextCard();
  }, [nextCard]);

  if (!seasonConfig) {
    return null;
  }

  return (
    <div className='flex h-screen w-full flex-col'>
      <CartographersHeader
        seasonConfig={seasonConfig}
        currentTimePoints={currentTimePoints}
      />
      <main className='flex w-full flex-1'>
        <ExploreSection />
        <ScoringSection scoringRules={scoringRules} />
      </main>
      <footer className='flex h-16 w-full items-center bg-[var(--color-cartographers-surface)] p-6 text-[var(--color-cartographers-ink)]'>
        <button className='cursor-pointer rounded-lg py-2 px-4 hover:bg-black/5'>
          홈
        </button>
        <div className='flex flex-1 justify-center gap-10'>
          <button className='cursor-pointer rounded-lg py-2 px-4 hover:bg-black/5'>
            되돌리기
          </button>
          <button className='cursor-pointer rounded-lg py-2 px-4 hover:bg-black/5'>
            다음
          </button>
          <button className='cursor-pointer rounded-lg py-2 px-4 hover:bg-black/5'>
            게임 종료
          </button>
        </div>
        <button className='cursor-pointer rounded-lg py-2 px-4 hover:bg-black/5'>
          전체화면
        </button>
      </footer>
    </div>
  );
}
