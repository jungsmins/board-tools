import type {
  TerraformingMarsSpecialActionId,
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

export const INITIAL_TERRAFORMING_MARS_TR = 20;
export const INITIAL_TERRAFORMING_MARS_GENERATION = 1;

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

export type TerraformingMarsSpecialAction = {
  id: TerraformingMarsSpecialActionId;
  name: string;
  cost: {
    type: TerraformingMarsResourceType;
    amount: number;
  };
  productionDelta?: {
    type: TerraformingMarsResourceType;
    amount: number;
  };
  guide?: string;
};

export const TERRAFORMING_MARS_SPECIAL_ACTIONS: readonly TerraformingMarsSpecialAction[] =
  [
    {
      id: 'power-plant',
      name: '발전소',
      cost: { type: 'megacredits', amount: 11 },
      productionDelta: { type: 'energy', amount: 1 },
    },
    {
      id: 'asteroid',
      name: '소행성',
      cost: { type: 'megacredits', amount: 14 },
      guide: '온도를 1단계 상승시키세요.',
    },
    {
      id: 'aquifer',
      name: '대수층',
      cost: { type: 'megacredits', amount: 18 },
      guide: '해양 타일을 배치하세요.',
    },
    {
      id: 'greenery',
      name: '녹지',
      cost: { type: 'megacredits', amount: 23 },
      guide: '녹지 타일을 배치하세요.',
    },
    {
      id: 'city',
      name: '도시',
      cost: { type: 'megacredits', amount: 25 },
      productionDelta: { type: 'megacredits', amount: 1 },
      guide: '도시 타일을 배치하세요.',
    },
    {
      id: 'use-plants',
      name: '식물 사용',
      cost: { type: 'plants', amount: 8 },
      guide: '녹지 타일을 배치하세요.',
    },
    {
      id: 'use-heat',
      name: '열 사용',
      cost: { type: 'heat', amount: 8 },
      guide: '온도를 1단계 상승시키세요.',
    },
  ];
