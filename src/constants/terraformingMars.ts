import type {
  TerraformingMarsResourceType,
  TerraformingMarsResources,
} from '@/types/terraformingMars';

export const TERRAFORMING_MARS_RESOURCE_TYPES = [
  'megacredits',
  'steel',
  'titanium',
  'plants',
  'energy',
  'heat',
] as const satisfies readonly TerraformingMarsResourceType[];

export const INITIAL_TERRAFORMING_MARS_RESOURCES: TerraformingMarsResources = {
  megacredits: {
    type: 'megacredits',
    name: '메가크레딧',
    amount: 0,
    production: 0,
  },
  steel: {
    type: 'steel',
    name: '강철',
    amount: 0,
    production: 0,
  },
  titanium: {
    type: 'titanium',
    name: '티타늄',
    amount: 0,
    production: 0,
  },
  plants: {
    type: 'plants',
    name: '식물',
    amount: 0,
    production: 0,
  },
  energy: {
    type: 'energy',
    name: '에너지',
    amount: 0,
    production: 0,
  },
  heat: {
    type: 'heat',
    name: '열',
    amount: 0,
    production: 0,
  },
};

export const TERRAFORMING_MARS_PRODUCTION_MIN: Record<
  TerraformingMarsResourceType,
  number
> = {
  megacredits: -5,
  steel: 0,
  titanium: 0,
  plants: 0,
  energy: 0,
  heat: 0,
};
