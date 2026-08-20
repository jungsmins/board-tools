'use client';

import { useCartographersStore } from '@/stores/cartographers';
import SeasonSplash from '@/components/cartographers/SeasonSplash';
import PlayingScreen from '@/components/cartographers/PlayingScreen';
import ScoringScreen from '@/components/cartographers/ScoringScreen';
import styles from '../theme.module.css';

export default function CartographersPlayPage() {
  const { gamePhase, currentSeason } = useCartographersStore();

  return (
    <div className={styles[currentSeason]}>
      {gamePhase === 'season_splash' && <SeasonSplash season={currentSeason} />}
      {gamePhase === 'playing' && <PlayingScreen />}
      {gamePhase === 'season_scoring' && <ScoringScreen />}
    </div>
  );
}
