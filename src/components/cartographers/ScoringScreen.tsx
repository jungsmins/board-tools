import Image from 'next/image';
import { useCartographersStore } from '@/stores/cartographers';
import CartographersFooter from './CartographersFooter';
import CartographersHeader from './CartographersHeader';
import {
  getSeasonConfig,
  getSeasonScoringRules,
} from '@/lib/cartographers';
import { SEASON_PLAYING_IMAGES } from '@/constants/cartographers';
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
    <div className='relative flex h-screen w-full flex-col gap-4 overflow-hidden py-4 px-12'>
      <Image
        src={SEASON_PLAYING_IMAGES[currentSeason]}
        alt=''
        fill
        sizes='100vw'
        className='object-cover -z-10'
      />
      <CartographersHeader
        seasonConfig={seasonConfig}
        currentTimePoints={currentTimePoints}
      />
      <main className='flex min-h-0 w-full flex-1'>
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
