import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  CartographersPersistedState,
  CartographersSnapshot,
  CartographersStore,
} from '@/types/cartographers';
import {
  getCardById,
  getCardCost,
  getNextSeason,
  selectScoringRules,
  shuffleDeck,
} from '@/lib/cartographers';

function createSnapshot(state: CartographersStore): CartographersSnapshot {
  return {
    gamePhase: state.gamePhase,
    currentSeason: state.currentSeason,
    currentTimePoints: state.currentTimePoints,
    deck: [...state.deck],
    currentExploreCardId: state.currentExploreCardId,
    timestamp: Date.now(),
  };
}

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
          const snapshot = createSnapshot(state);
          const [nextCardId, ...remainingDeck] = state.deck;
          if (!nextCardId) return state;

          const card = getCardById(nextCardId);
          if (!card) return state;

          const cost = getCardCost(card);

          const newTimePoints = state.currentTimePoints + cost;

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
        const next = getNextSeason(get().currentSeason);

        if (!next) {
          get().resetGame();
          return;
        }

        set({
          gamePhase: 'season_splash',
          currentSeason: next,
          currentTimePoints: 0,
          deck: shuffleDeck(),
          currentExploreCardId: null,
          history: [],
        });
      },

      prevCard: () =>
        set((state) => {
          if (state.history.length <= 1) return state;
          const prev = state.history[state.history.length - 1];
          return {
            ...prev,
            history: state.history.slice(0, -1),
          };
        }),

      resetGame: () =>
        set({
          gamePhase: 'setup',
          selectedScoringRules: { A: '', B: '', C: '', D: '' },
          currentSeason: 'spring',
          currentTimePoints: 0,
          deck: [],
          currentExploreCardId: null,
          history: [],
        }),
    }),
    {
      name: 'board-tools-cartographers',
      partialize: (state): CartographersPersistedState => ({
        gamePhase: state.gamePhase,
        selectedScoringRules: state.selectedScoringRules,
        currentSeason: state.currentSeason,
        currentTimePoints: state.currentTimePoints,
        deck: state.deck,
        currentExploreCardId: state.currentExploreCardId,
        history: state.history,
      }),
    },
  ),
);
