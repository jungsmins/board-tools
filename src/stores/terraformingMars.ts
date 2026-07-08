import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { INITIAL_TERRAFORMING_MARS_TR } from '@/constants/terraformingMars';
import {
  createInitialTerraformingMarsResources,
  getNextResourceAmount,
  getNextResourceProduction,
  getNextTR,
  produceResources,
} from '@/lib/terraformingMars';
import type {
  TerraformingMarsPersistedState,
  TerraformingMarsSnapshot,
  TerraformingMarsStore,
} from '@/types/terraformingMars';

const HISTORY_LIMIT = 30;

function createSnapshot(state: TerraformingMarsStore): TerraformingMarsSnapshot {
  return {
    resources: structuredClone(state.resources),
    tr: state.tr,
    timestamp: Date.now(),
  };
}

function appendSnapshot(
  history: TerraformingMarsSnapshot[],
  snapshot: TerraformingMarsSnapshot,
) {
  return [...history, snapshot].slice(-HISTORY_LIMIT);
}

export const useTerraformingMarsStore = create<TerraformingMarsStore>()(
  persist(
    (set) => ({
      resources: createInitialTerraformingMarsResources(),
      tr: INITIAL_TERRAFORMING_MARS_TR,
      history: [],

      adjustAmount: (type, delta) =>
        set((state) => {
          const resource = state.resources[type];

          return {
            resources: {
              ...state.resources,
              [type]: {
                ...resource,
                amount: getNextResourceAmount(resource.amount, delta),
              },
            },
            history: appendSnapshot(state.history, createSnapshot(state)),
          };
        }),

      adjustProduction: (type, delta) =>
        set((state) => {
          const resource = state.resources[type];

          return {
            resources: {
              ...state.resources,
              [type]: {
                ...resource,
                production: getNextResourceProduction(
                  type,
                  resource.production,
                  delta,
                ),
              },
            },
            history: appendSnapshot(state.history, createSnapshot(state)),
          };
        }),

      adjustTR: (delta) =>
        set((state) => ({
          tr: getNextTR(state.tr, delta),
          history: appendSnapshot(state.history, createSnapshot(state)),
        })),

      runProduction: () =>
        set((state) => ({
          resources: produceResources(state.resources, state.tr),
          history: appendSnapshot(state.history, createSnapshot(state)),
        })),

      undo: () =>
        set((state) => {
          const snapshot = state.history[state.history.length - 1];
          if (!snapshot) return state;

          return {
            resources: snapshot.resources,
            tr: snapshot.tr,
            history: state.history.slice(0, -1),
          };
        }),

      resetAll: () =>
        set({
          resources: createInitialTerraformingMarsResources(),
          tr: INITIAL_TERRAFORMING_MARS_TR,
          history: [],
        }),
    }),
    {
      name: 'board-tools-terraforming-mars',
      partialize: (state): TerraformingMarsPersistedState => ({
        resources: state.resources,
        tr: state.tr,
        history: state.history,
      }),
    },
  ),
);
