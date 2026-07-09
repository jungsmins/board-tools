export type TerraformingMarsResourceType =
  | 'megacredits'
  | 'steel'
  | 'titanium'
  | 'plants'
  | 'energy'
  | 'heat';

export interface TerraformingMarsResource {
  type: TerraformingMarsResourceType;
  name: string;
  amount: number;
  production: number;
}

export type TerraformingMarsResources = Record<
  TerraformingMarsResourceType,
  TerraformingMarsResource
>;

export interface TerraformingMarsStore {
  resources: TerraformingMarsResources;
  tr: number;
  generation: number;
  history: TerraformingMarsSnapshot[];

  adjustAmount: (type: TerraformingMarsResourceType, delta: number) => void;
  adjustProduction: (
    type: TerraformingMarsResourceType,
    delta: number,
  ) => void;
  adjustTR: (delta: number) => void;
  runProduction: () => void;
  undo: () => void;
  resetAll: () => void;
}

export interface TerraformingMarsPersistedState {
  resources: TerraformingMarsResources;
  tr: number;
  generation: number;
  history: TerraformingMarsSnapshot[];
}

export interface TerraformingMarsSnapshot {
  resources: TerraformingMarsResources;
  tr: number;
  generation: number;
  timestamp: number;
}
