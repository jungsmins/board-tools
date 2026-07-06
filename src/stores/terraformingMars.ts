import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  createInitialTerraformingMarsResources,
  getNextResourceAmount,
  getNextResourceProduction,
} from '@/lib/terraformingMars';
import type {
  TerraformingMarsPersistedState,
  TerraformingMarsStore,
} from '@/types/terraformingMars';

export const useTerraformingMarsStore = create<TerraformingMarsStore>()(
  persist(
    (set) => ({
      resources: createInitialTerraformingMarsResources(),

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

      resetAll: () =>
        set({
          resources: createInitialTerraformingMarsResources(),
        }),
    }),
    {
      name: 'board-tools-terraforming-mars',
      partialize: (state): TerraformingMarsPersistedState => ({
        resources: state.resources,
      }),
    },
  ),
);
