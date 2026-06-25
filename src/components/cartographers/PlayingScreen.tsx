import { useCartographersStore } from '@/stores/cartographers';
import { SEASON_CONFIG } from '@/constants/cartographers';
import { getScoringRuleById, getCardById } from '@/lib/cartographers';
import { ScoringRule } from '@/types/cartographers';
import CartographersHeader from './CartographersHeader';
import ScoringSection from './ScoringSection';
import ExploreSection from './ExploreSection';
import CartographersFooter from './CartographersFooter';
import Button from '../ui/Button';

export default function PlayingScreen() {
  const {
    nextCard,
    currentTimePoints,
    currentSeason,
    selectedScoringRules,
    currentExploreCardId,
    endSeason,
  } = useCartographersStore();
  const scoringRuleIds = Object.values(selectedScoringRules);
  const scoringRules = scoringRuleIds
    .map((id) => {
      return getScoringRuleById(id);
    })
    .filter((rule): rule is ScoringRule => rule !== null);
  const seasonConfig = SEASON_CONFIG.find(
    (season) => season.season === currentSeason,
  );
  const exploreCard = getCardById(currentExploreCardId);

  if (!seasonConfig) {
    return null;
  }

  if (!exploreCard) {
    return null;
  }

  const isSeasonEnd = currentTimePoints >= seasonConfig.maxTimePoints;
  const handleNext = isSeasonEnd ? endSeason : nextCard;

  return (
    <div className='flex h-screen w-full flex-col'>
      <CartographersHeader
        seasonConfig={seasonConfig}
        currentTimePoints={currentTimePoints}
      />
      <main className='flex w-full flex-1'>
        <ExploreSection exploreCard={exploreCard} />
        <ScoringSection scoringRules={scoringRules} />
      </main>
      <CartographersFooter onNext={handleNext} />
    </div>
  );
}
