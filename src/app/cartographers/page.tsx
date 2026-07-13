'use client';

import SetupScreen from '@/components/cartographers/SetupScreen';
import SeasonSplash from '@/components/cartographers/SeasonSplash';
import PlayingScreen from '@/components/cartographers/PlayingScreen';
import ScoringScreen from '@/components/cartographers/ScoringScreen';
import { useCartographersStore } from '@/stores/cartographers';
import styles from './theme.module.css';

export default function CartographersPage() {
  const { gamePhase, currentSeason } = useCartographersStore();

  return (
    <div className={`${styles.theme} ${styles[currentSeason]}`}>
      {gamePhase === 'setup' && <SetupScreen />}
      {gamePhase === 'season_splash' && <SeasonSplash season={currentSeason} />}
      {gamePhase === 'playing' && <PlayingScreen />}
      {gamePhase === 'season_scoring' && <ScoringScreen />}
    </div>
  );
}
