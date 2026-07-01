import { useCartographersStore } from '@/stores/cartographers';
import CartographersFooter from './CartographersFooter';
import CartographersHeader from './CartographersHeader';
import {
  getSeasonConfig,
  getSeasonScoringRules,
} from '@/lib/cartographers';
import ScoringSection from './ScoringSection';

export default function ScoringScreen() {
  const {
    currentSeason,
    currentTimePoints,
    selectedScoringRules,
    nextSeason,
    resetGame,
  } = useCartographersStore();

  const seasonConfig = getSeasonConfig(currentSeason);
  const currentSeasonScoringRules = getSeasonScoringRules(
    selectedScoringRules,
    seasonConfig,
  );

  const nextButtonLabel =
    currentSeason === 'winter' ? '게임 종료' : '다음 계절';

  return (
    <div className='w-full h-screen flex flex-col'>
      <CartographersHeader
        seasonConfig={seasonConfig}
        currentTimePoints={currentTimePoints}
      />
      <main className='flex min-h-0 flex-1'>
        <ScoringSection
          scoringRules={currentSeasonScoringRules}
          variant='showcase'
        />
      </main>
      <CartographersFooter
        onNext={nextSeason}
        nextButtonLabel={nextButtonLabel}
        onReset={resetGame}
      />
    </div>
  );
}
