import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  CartographersSnapshot,
  CartographersStore,
} from '@/types/cartographers';
import {
  getNextSeason,
  selectScoringRules,
  shuffleDeck,
} from '@/lib/cartographers';
import { EXPLORE_CARDS, SEASON_CONFIG } from '@/constants/cartographers';

export const useCartographersStore = create<CartographersStore>()(
  persist(
    (set, get) => ({
      gamePhase: 'setup',
      selectedScoringRules: { A: '', B: '', C: '', D: '' },
      currentSeason: 'spring',
      currentTimePoints: 0,
      deck: [],
      currentExploreCardId: null,
      history: [],

      startGame: () =>
        set({
          gamePhase: 'season_splash',
          selectedScoringRules: selectScoringRules(),
          currentSeason: 'spring',
          currentTimePoints: 0,
          deck: shuffleDeck(),
          currentExploreCardId: null,
          history: [],
        }),

      onSplashComplete: () => {
        get().nextCard();
        set({ gamePhase: 'playing' });
      },

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
          const cost = card?.cost ?? 0;

          const seasonConfig = SEASON_CONFIG.find(
            (s) => s.season === state.currentSeason,
          );
          const maxTimePoints = seasonConfig?.maxTimePoints ?? 0;

          const newTimePoints = Math.min(
            state.currentTimePoints + cost,
            maxTimePoints,
          );

          return {
            currentExploreCardId: nextCardId,
            deck: remainingDeck,
            currentTimePoints: newTimePoints,
            history: [...state.history, snapshot],
          };
        }),

      endSeason: () => {
        set({ gamePhase: 'season_scoring' });
      },

      nextSeason: () => {
        set((state) => {
          const next = getNextSeason(state.currentSeason);

          if (next) {
            return {
              gamePhase: 'season_splash',
              currentSeason: next,
              currentTimePoints: 0,
              deck: shuffleDeck(),
              currentExploreCardId: null,
            };
          }

          return {
            gamePhase: 'game_end',
          };
        });
      },

      resetGame: () => {},
    }),
    {
      name: 'board-tools-cartographers',
    },
  ),
);
