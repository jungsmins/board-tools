export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export type ScoringSlot = 'A' | 'B' | 'C' | 'D';

export interface SeasonConfig {
  season: Season;
  name: string;
  maxCost: number;
  scoringSlots: [ScoringSlot, ScoringSlot];
}

export type TerrainType = 'forest' | 'village' | 'farm' | 'water';

export type Shape = [number, number][];

export interface ShapeOption {
  shape: Shape;
  hasCoin: boolean;
}

export interface NormalExploreCard {
  type: 'normal';
  id: string;
  name: string;
  terrains: TerrainType[];
  shapes: ShapeOption[];
  cost: number;
}

export interface RuinsCard {
  type: 'ruins';
  id: string;
  name: string;
  cost: 0;
}

export interface RiftLandsCard {
  type: 'rift_lands';
  id: string;
  name: string;
  cost: 0;
  terrains: TerrainType[];
}

export type ExploreCard = NormalExploreCard | RuinsCard | RiftLandsCard;

export interface AmbushCard {
  type: 'ambush';
  id: string;
  name: string;
  direction: 'left' | 'right';
  shape: Shape;
}

export interface ScoringCard {
  id: string;
  slot: ScoringSlot;
  name: string;
  description: string;
}

export type GamePhase =
  | 'setup'
  | 'season_splash'
  | 'playing'
  | 'season_scoring'
  | 'game_end';

export interface CartographersSnapshot {
  gamePhase: GamePhase;
  currentSeason: Season;
  currentTimePoints: number;
  deck: string[];
  currentExploreCardId: string | null;
  timestamp: number;
}

export interface CartographersState {
  gamePhase: GamePhase;

  selectedScoringCards: Record<ScoringSlot, string>;

  currentSeason: Season;
  currentTimePoints: number;

  deck: string[];
  currentExploreCardId: string | null;

  history: CartographersSnapshot[];

  startGame: () => void;
  onSplashComplete: () => void;
  nextCard: () => void;
  endSeason: () => void;
  nextSeason: () => void;
  undo: () => void;
  resetGame: () => void;

  selectScoringCard: (slot: ScoringSlot, cardId: string) => void;
}
