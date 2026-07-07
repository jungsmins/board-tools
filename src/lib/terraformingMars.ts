import {
  INITIAL_TERRAFORMING_MARS_RESOURCES,
  TERRAFORMING_MARS_PRODUCTION_MIN,
} from '@/constants/terraformingMars';
import type {
  TerraformingMarsResourceType,
  TerraformingMarsResources,
} from '@/types/terraformingMars';

export function createInitialTerraformingMarsResources(): TerraformingMarsResources {
  return structuredClone(INITIAL_TERRAFORMING_MARS_RESOURCES);
}

export function getNextResourceAmount(currentAmount: number, delta: number) {
  return Math.max(0, currentAmount + delta);
}

export function getNextTR(currentTR: number, delta: number) {
  return Math.max(0, currentTR + delta);
}

export function getNextResourceProduction(
  type: TerraformingMarsResourceType,
  currentProduction: number,
  delta: number,
) {
  return Math.max(
    TERRAFORMING_MARS_PRODUCTION_MIN[type],
    currentProduction + delta,
  );
}

export function produceResources(
  resources: TerraformingMarsResources,
  tr: number,
): TerraformingMarsResources {
  return {
    megacredits: {
      ...resources.megacredits,
      amount: getNextResourceAmount(
        resources.megacredits.amount,
        resources.megacredits.production + tr,
      ),
    },
    steel: {
      ...resources.steel,
      amount: resources.steel.amount + resources.steel.production,
    },
    titanium: {
      ...resources.titanium,
      amount: resources.titanium.amount + resources.titanium.production,
    },
    plants: {
      ...resources.plants,
      amount: resources.plants.amount + resources.plants.production,
    },
    energy: {
      ...resources.energy,
      amount: resources.energy.production,
    },
    heat: {
      ...resources.heat,
      amount:
        resources.heat.amount +
        resources.energy.amount +
        resources.heat.production,
    },
  };
}
