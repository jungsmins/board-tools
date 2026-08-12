export type AvalonRoleSide = 'good' | 'evil';

export type AvalonRoleId =
  | 'loyal_servant'
  | 'merlin'
  | 'percival'
  | 'minion'
  | 'assassin'
  | 'mordred'
  | 'morgana'
  | 'oberon';

export type AvalonPlayerCount = 5 | 6 | 7 | 8 | 9 | 10;

export type AvalonRoomStatus = 'waiting' | 'playing' | 'ended';

export interface AvalonRoleConfig {
  id: AvalonRoleId;
  name: string;
  side: AvalonRoleSide;
  isGeneric: boolean;
  isSelectable: boolean;
  description: string;
}

export interface AvalonTeamComposition {
  good: number;
  evil: number;
}

export interface AvalonRoleValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface AvalonRoom {
  id: string;
  code: string;
  hostUserId: string;
  status: AvalonRoomStatus;
  playerCount: AvalonPlayerCount;
  selectedRoleIds: AvalonRoleId[];
  createdAt: string;
}

export interface AvalonRoomPlayer {
  id: string;
  isHost: boolean;
  nickname: string;
  seatNumber: number;
}

export interface AvalonRoomState {
  currentPlayerId: string;
  isHost: boolean;
  players: AvalonRoomPlayer[];
  room: AvalonRoom;
}
