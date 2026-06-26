import { useCartographersStore } from '@/stores/cartographers';
import CartographersFooter from './CartographersFooter';
import CartographersHeader from './CartographersHeader';
import { SEASON_CONFIG } from '@/constants/cartographers';
import { getScoringRuleById } from '@/lib/cartographers';
import { ScoringRule } from '@/types/cartographers';
import ScoringSection from './ScoringSection';

export default function ScoringScreen() {
  const {
    currentSeason,
    currentTimePoints,
    selectedScoringRules,
    nextSeason,
    resetGame,
  } = useCartographersStore();

  const seasonConfig = SEASON_CONFIG.find(
    (season) => season.season === currentSeason,
  );
  const scoringRuleIds = Object.values(selectedScoringRules);
  const currentSeasonScoringRules = scoringRuleIds
    .map((id) => {
      return getScoringRuleById(id);
    })
    .filter(
      (rule) =>
        rule?.slot === seasonConfig?.scoringSlots[0] ||
        rule?.slot === seasonConfig?.scoringSlots[1],
    )
    .filter((rule): rule is ScoringRule => rule !== null);

  if (!seasonConfig) return null;

  const nextButtonLabel =
    currentSeason === 'winter' ? '게임 종료' : '다음 계절';

  return (
    <div className='w-full h-screen flex flex-col'>
      <CartographersHeader
        seasonConfig={seasonConfig}
        currentTimePoints={currentTimePoints}
      />
      <main className='flex-1'>
        <ScoringSection scoringRules={currentSeasonScoringRules} />
      </main>
      <CartographersFooter
        onNext={nextSeason}
        nextButtonLabel={nextButtonLabel}
        onReset={resetGame}
      />
    </div>
  );
}
