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
  TerraformingMarsStore,
} from '@/types/terraformingMars';

export const useTerraformingMarsStore = create<TerraformingMarsStore>()(
  persist(
    (set) => ({
      resources: createInitialTerraformingMarsResources(),
      tr: INITIAL_TERRAFORMING_MARS_TR,

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
          };
        }),

      adjustTR: (delta) =>
        set((state) => ({
          tr: getNextTR(state.tr, delta),
        })),

      runProduction: () =>
        set((state) => ({
          resources: produceResources(state.resources, state.tr),
        })),

      resetAll: () =>
        set({
          resources: createInitialTerraformingMarsResources(),
          tr: INITIAL_TERRAFORMING_MARS_TR,
        }),
    }),
    {
      name: 'board-tools-terraforming-mars',
      partialize: (state): TerraformingMarsPersistedState => ({
        resources: state.resources,
        tr: state.tr,
      }),
    },
  ),
);
