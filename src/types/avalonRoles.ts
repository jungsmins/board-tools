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

export interface AvalonRoleAssignment {
  playerId: string;
  roleId: AvalonRoleId;
}

export interface AvalonRoom {
  id: string;
  code: string;
  hostId: string;
  status: AvalonRoomStatus;
  playerCount: AvalonPlayerCount;
  selectedRoleIds: AvalonRoleId[];
  createdAt: string;
}

export interface AvalonPlayer {
  id: string;
  roomId: string;
  nickname: string;
  assignedRoleId: AvalonRoleId | null;
  visiblePlayerIds: string[];
  joinedAt: string;
}

export interface AvalonWaitingPlayer {
  id: string;
  isHost: boolean;
  nickname: string;
}

export type AvalonVisiblePlayer = Pick<AvalonPlayer, 'id' | 'nickname'>;

export interface AvalonRolesDraft {
  playerCount: AvalonPlayerCount;
  selectedRoleIds: AvalonRoleId[];
}

export interface AvalonRolesStore extends AvalonRolesDraft {
  currentRoomId: string | null;
  currentPlayerId: string | null;
  hostId: string | null;
  room: AvalonRoom | null;
  players: AvalonPlayer[];

  setPlayerCount: (playerCount: AvalonPlayerCount) => void;
  setSelectedRoleIds: (roleIds: AvalonRoleId[]) => void;
  toggleRole: (roleId: AvalonRoleId) => void;
  resetDraft: () => void;
  getValidation: () => AvalonRoleValidationResult;

  setSession: (session: {
    roomId: string | null;
    playerId: string | null;
    hostId?: string | null;
  }) => void;
  clearSession: () => void;
  setRoom: (room: AvalonRoom | null) => void;
  setPlayers: (players: AvalonPlayer[]) => void;
  upsertPlayer: (player: AvalonPlayer) => void;
  removePlayer: (playerId: string) => void;
  resetRemoteState: () => void;
}
