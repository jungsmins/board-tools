import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  CartographersSnapshot,
  CartographersStore,
} from '@/types/cartographers';
import { selectedScoringCard, shuffleDeck } from '@/lib/cartographers';
import { EXPLORE_CARDS } from '@/constants/cartographers';

export const useCartographersStore = create<CartographersStore>()(
  persist(
    (set, get) => ({
      gamePhase: 'setup',
      selectedScoringCards: { A: '', B: '', C: '', D: '' },
      currentSeason: 'spring',
      currentTimePoints: 0,
      deck: [],
      currentExploreCardId: null,
      history: [],

      startGame: () =>
        set({
          gamePhase: 'season_splash',
          selectedScoringCards: selectedScoringCard(),
          currentSeason: 'spring',
          currentTimePoints: 0,
          deck: shuffleDeck(),
          currentExploreCardId: null,
          history: [],
        }),

      onSplashComplete: () => set({ gamePhase: 'playing' }),

      nextCard: () =>
        set((state) => {
          const snapshot: CartographersSnapshot = {
            gamePhase: 'setup',
            currentSeason: 'spring',
            currentTimePoints: 0,
            deck: [],
            currentExploreCardId: null,
            timestamp: 1,
          };
          const [nextCardId, ...remainingDeck] = state.deck;
          if (!nextCardId) return state;

          const card = EXPLORE_CARDS.find((c) => c.id === nextCardId);
          const timeCost = card?.cost ?? 0;

          return {
            currentExploreCardId: nextCardId,
            deck: remainingDeck,
            currentTimePoints: state.currentTimePoints + timeCost,
            history: [...state.history, snapshot],
          };
        }),
    }),
    {
      name: 'board-tools-cartographers',
    },
  ),
);
