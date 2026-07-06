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

  adjustAmount: (type: TerraformingMarsResourceType, delta: number) => void;
  adjustProduction: (
    type: TerraformingMarsResourceType,
    delta: number,
  ) => void;
  resetAll: () => void;
}

export interface TerraformingMarsPersistedState {
  resources: TerraformingMarsResources;
}
