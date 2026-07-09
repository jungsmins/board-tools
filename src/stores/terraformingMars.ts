import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  INITIAL_TERRAFORMING_MARS_GENERATION,
  INITIAL_TERRAFORMING_MARS_TR,
} from '@/constants/terraformingMars';
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
    generation: state.generation,
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
      generation: INITIAL_TERRAFORMING_MARS_GENERATION,
      history: [],

      adjustAmount: (type, delta) =>
        set((state) => {
          const resource = state.resources[type];
          const nextAmount = getNextResourceAmount(resource.amount, delta);

          if (nextAmount === resource.amount) return state;

          return {
            resources: {
              ...state.resources,
              [type]: {
                ...resource,
                amount: nextAmount,
              },
            },
            history: appendSnapshot(state.history, createSnapshot(state)),
          };
        }),

      adjustProduction: (type, delta) =>
        set((state) => {
          const resource = state.resources[type];
          const nextProduction = getNextResourceProduction(
            type,
            resource.production,
            delta,
          );

          if (nextProduction === resource.production) return state;

          return {
            resources: {
              ...state.resources,
              [type]: {
                ...resource,
                production: nextProduction,
              },
            },
            history: appendSnapshot(state.history, createSnapshot(state)),
          };
        }),

      adjustTR: (delta) =>
        set((state) => {
          const nextTR = getNextTR(state.tr, delta);

          if (nextTR === state.tr) return state;

          return {
            tr: nextTR,
            history: appendSnapshot(state.history, createSnapshot(state)),
          };
        }),

      runProduction: () =>
        set((state) => ({
          resources: produceResources(state.resources, state.tr),
          generation: state.generation + 1,
          history: appendSnapshot(state.history, createSnapshot(state)),
        })),

      undo: () =>
        set((state) => {
          const snapshot = state.history[state.history.length - 1];
          if (!snapshot) return state;

          return {
            resources: snapshot.resources,
            tr: snapshot.tr,
            generation: snapshot.generation,
            history: state.history.slice(0, -1),
          };
        }),

      resetAll: () =>
        set({
          resources: createInitialTerraformingMarsResources(),
          tr: INITIAL_TERRAFORMING_MARS_TR,
          generation: INITIAL_TERRAFORMING_MARS_GENERATION,
          history: [],
        }),
    }),
    {
      name: 'board-tools-terraforming-mars',
      partialize: (state): TerraformingMarsPersistedState => ({
        resources: state.resources,
        tr: state.tr,
        generation: state.generation,
        history: state.history,
      }),
    },
  ),
);
