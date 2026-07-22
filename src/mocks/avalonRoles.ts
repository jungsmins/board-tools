import type {
  AvalonPlayer,
  AvalonPlayerCount,
  AvalonRoomStatus,
  AvalonWaitingPlayer,
} from '@/types/avalonRoles';

export const AVALON_MOCK_ROOM_CODE = 'A3K7';
export const AVALON_MOCK_PLAYER_COUNT: AvalonPlayerCount = 5;
export const AVALON_MOCK_ROOM_STATUS: AvalonRoomStatus = 'playing';
export const AVALON_MOCK_CURRENT_PLAYER_ID = 'host';

export const AVALON_MOCK_WAITING_PLAYERS: AvalonWaitingPlayer[] = [
  { id: 'host', nickname: '방장', isHost: true },
  { id: 'player-1', nickname: '민수', isHost: false },
  { id: 'player-2', nickname: '지은', isHost: false },
];

export const AVALON_MOCK_ASSIGNED_PLAYERS: AvalonPlayer[] = [
  {
    id: 'host',
    roomId: AVALON_MOCK_ROOM_CODE,
    nickname: '방장',
    assignedRoleId: 'merlin',
    visiblePlayerIds: ['player-1', 'player-2'],
    joinedAt: '',
  },
  {
    id: 'player-1',
    roomId: AVALON_MOCK_ROOM_CODE,
    nickname: '민수',
    assignedRoleId: 'assassin',
    visiblePlayerIds: ['player-2'],
    joinedAt: '',
  },
  {
    id: 'player-2',
    roomId: AVALON_MOCK_ROOM_CODE,
    nickname: '지은',
    assignedRoleId: 'minion',
    visiblePlayerIds: ['player-1'],
    joinedAt: '',
  },
];
