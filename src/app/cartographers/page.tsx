'use client';

import SetupScreen from '@/components/cartographers/SetupScreen';
import SeasonSplash from '@/components/cartographers/SeasonSplash';
import PlayingScreen from '@/components/cartographers/PlayingScreen';
import ScoringScreen from '@/components/cartographers/ScoringScreen';
import { useCartographersStore } from '@/stores/cartographers';

export default function CartographersPage() {
  const { gamePhase, currentSeason } = useCartographersStore();

  return (
    <>
      {gamePhase === 'setup' && <SetupScreen />}
      {gamePhase === 'season_splash' && <SeasonSplash season={currentSeason} />}
      {gamePhase === 'playing' && <PlayingScreen />}
      {gamePhase === 'season_scoring' && <ScoringScreen />}
    </>
  );
}
