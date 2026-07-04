type ResourceType =
  | 'megacredits'
  | 'steel'
  | 'titanium'
  | 'plants'
  | 'energy'
  | 'heat';

interface Resource {
  type: ResourceType;
  amount: number;
  production: number;
}

export const PRODUCTION_MIN: Record<ResourceType, number> = {
  megacredits: -5,
  steel: 0,
  titanium: 0,
  plants: 0,
  energy: 0,
  heat: 0,
};

export interface TerraformingMarsState {
  resources: Record<ResourceType, Resource>;
  tr: number;
  generation: number;
  history: Snapshot[];

  adjustAmount: (type: ResourceType, delta: number) => void;
  adjustProduction: (type: ResourceType, delta: number) => void;
  adjustTR: (delta: number) => void;
  runProduction: () => void;
  undo: () => void;
  resetAll: () => void;
}

interface Snapshot {
  resources: Record<ResourceType, Resource>;
  tr: number;
  generation: number;
  timestamp: number;
}
