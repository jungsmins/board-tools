import Image from 'next/image';
import { useCartographersStore } from '@/stores/cartographers';
import {
  getCardById,
  getScoringRulesByIds,
  getSeasonConfig,
} from '@/lib/cartographers';
import { SEASON_PLAYING_IMAGES } from '@/constants/cartographers';
import CartographersHeader from './CartographersHeader';
import ScoringSection from './ScoringSection';
import ExploreSection from './ExploreSection';
import CartographersFooter from './CartographersFooter';

export default function PlayingScreen() {
  const {
    nextCard,
    currentTimePoints,
    currentSeason,
    selectedScoringRules,
    currentExploreCardId,
    endSeason,
    resetGame,
    prevCard,
    history,
  } = useCartographersStore();
  const scoringRules = getScoringRulesByIds(
    Object.values(selectedScoringRules),
  );
  const seasonConfig = getSeasonConfig(currentSeason);
  const exploreCard = getCardById(currentExploreCardId);

  if (!exploreCard) {
    return null;
  }

  const isSeasonEnd = currentTimePoints >= seasonConfig.maxTimePoints;
  const handleNext = isSeasonEnd ? endSeason : nextCard;
  const nextButtonLabel = isSeasonEnd ? '계절 종료' : '다음 카드';

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
      <main className='flex w-full flex-1 gap-6'>
        <ExploreSection exploreCard={exploreCard} />
        <ScoringSection
          scoringRules={scoringRules}
          seasonScoringSlots={seasonConfig.scoringSlots}
        />
      </main>
      <CartographersFooter
        onNext={handleNext}
        nextButtonLabel={nextButtonLabel}
        onReset={resetGame}
        onPrev={history.length > 1 ? prevCard : undefined}
      />
    </div>
  );
}
