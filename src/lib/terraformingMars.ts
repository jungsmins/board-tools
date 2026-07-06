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
