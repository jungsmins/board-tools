'use client';

import SetupScreen from '@/components/cartographers/SetupScreen';
import SeasonSplash from '@/components/cartographers/SeasonSplash';
import PlayingScreen from '@/components/cartographers/PlayingScreen';
import ScoringScreen from '@/components/cartographers/ScoringScreen';
import { useCartographersStore } from '@/stores/cartographers';
import styles from './theme.module.css';
import { GamePhase } from '@/types/cartographers';
import { ReactNode } from 'react';

export default function CartographersPage() {
  const { gamePhase, currentSeason } = useCartographersStore();

  const screens: Record<GamePhase, ReactNode> = {
    setup: <SetupScreen />,
    season_splash: <SeasonSplash season={currentSeason} />,
    playing: <PlayingScreen />,
    season_scoring: <ScoringScreen />,
  };

  return (
    <div className={`${styles.theme} ${styles[currentSeason]}`}>
      {screens[gamePhase]}
    </div>
  );
}
