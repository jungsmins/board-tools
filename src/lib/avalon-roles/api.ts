import { ensureAnonymousSession } from '@/lib/supabase/auth';
import { supabase } from '@/lib/supabase/client';
import type {
  AvalonPlayerCount,
  AvalonRoleId,
  AvalonRoomState,
  AvalonRoomStatus,
} from '@/types/avalonRoles';

interface CreateAvalonRoomResponse {
  player_id: string;
  room_code: string;
  room_id: string;
}

interface JoinAvalonRoomResponse extends CreateAvalonRoomResponse {
  seat_number: number;
}

interface AvalonRoomPlayerResponse {
  id: string;
  is_host: boolean;
  nickname: string;
  seat_number: number;
}

interface AvalonRoomStateResponse {
  current_player_id: string;
  created_at?: string;
  host_user_id?: string;
  is_host: boolean;
  player_count: AvalonPlayerCount;
  players: AvalonRoomPlayerResponse[];
  room_code: string;
  room_id: string;
  selected_role_ids: AvalonRoleId[];
  status: AvalonRoomStatus;
}

interface AvalonVisiblePlayerResponse {
  id: string;
  nickname: string;
  seat_number: number;
}

interface GetMyAvalonRoleResponse {
  player_id: string;
  nickname: string;
  role_id: AvalonRoleId;
  visible_players: AvalonVisiblePlayerResponse[];
}

interface GetMyActiveAvalonRoomResponse {
  room_code: string;
}

export interface CreateAvalonRoomResult {
  playerId: string;
  roomCode: string;
  roomId: string;
}

export interface JoinAvalonRoomResult extends CreateAvalonRoomResult {
  seatNumber: number;
}

export interface StartAvalonGameResult {
  roomId: string;
  roomCode: string;
  status: string;
}

export interface GetMyAvalonRoleResult {
  playerId: string;
  nickname: string;
  roleId: AvalonRoleId;
  visiblePlayers: {
    id: string;
    nickname: string;
    seatNumber: number;
  }[];
}

export interface GetMyActiveAvalonRoomResult {
  roomCode: string;
}

function mapCreateAvalonRoomResult(
  data: CreateAvalonRoomResponse,
): CreateAvalonRoomResult {
  return {
    playerId: data.player_id,
    roomCode: data.room_code,
    roomId: data.room_id,
  };
}

function mapJoinAvalonRoomResult(
  data: JoinAvalonRoomResponse,
): JoinAvalonRoomResult {
  return {
    ...mapCreateAvalonRoomResult(data),
    seatNumber: data.seat_number,
  };
}

function mapGetMyAvalonRoleResult(
  data: GetMyAvalonRoleResponse,
): GetMyAvalonRoleResult {
  return {
    playerId: data.player_id,
    nickname: data.nickname,
    roleId: data.role_id,
    visiblePlayers: (data.visible_players ?? []).map((player) => ({
      id: player.id,
      nickname: player.nickname,
      seatNumber: player.seat_number,
    })),
  };
}

function mapGetMyActiveAvalonRoomResult(
  data: GetMyActiveAvalonRoomResponse,
): GetMyActiveAvalonRoomResult {
  return {
    roomCode: data.room_code,
  };
}

function mapAvalonRoomState(data: AvalonRoomStateResponse): AvalonRoomState {
  return {
    currentPlayerId: data.current_player_id,
    isHost: data.is_host,
    players: data.players.map((player) => ({
      id: player.id,
      isHost: player.is_host,
      nickname: player.nickname,
      seatNumber: player.seat_number,
    })),
    room: {
      id: data.room_id,
      code: data.room_code,
      hostUserId: data.host_user_id ?? '',
      status: data.status,
      playerCount: data.player_count,
      selectedRoleIds: data.selected_role_ids,
      createdAt: data.created_at ?? '',
    },
  };
}

async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}

export async function createAvalonRoom(
  playerCount: AvalonPlayerCount,
  selectedRoleIds: AvalonRoleId[],
  nickname: string,
): Promise<CreateAvalonRoomResult | null> {
  await ensureAnonymousSession();

  const { data, error } = await supabase.rpc('create_avalon_room', {
    p_player_count: playerCount,
    p_selected_role_ids: selectedRoleIds,
    p_nickname: nickname,
  });

  if (error) {
    throw error;
  }

  const result = data?.[0] as CreateAvalonRoomResponse | undefined;

  return result ? mapCreateAvalonRoomResult(result) : null;
}

export async function joinAvalonRoom(
  roomCode: string,
  nickname: string,
): Promise<JoinAvalonRoomResult | null> {
  await ensureAnonymousSession();

  const { data, error } = await supabase.rpc('join_avalon_room', {
    p_room_code: roomCode,
    p_nickname: nickname,
  });

  if (error) {
    throw error;
  }

  const result = data?.[0] as JoinAvalonRoomResponse | undefined;

  return result ? mapJoinAvalonRoomResult(result) : null;
}

export async function getAvalonRoomState(
  roomCode: string,
): Promise<AvalonRoomState | null> {
  const session = await getCurrentSession();

  if (!session) {
    return null;
  }

  const { data, error } = await supabase.rpc('get_avalon_room_state', {
    p_room_code: roomCode,
  });

  if (error) {
    throw error;
  }

  return mapAvalonRoomState(data as AvalonRoomStateResponse);
}

export async function startAvalonGame(
  roomCode: string,
): Promise<StartAvalonGameResult | null> {
  const session = await getCurrentSession();

  if (!session) {
    throw new Error('참가 기록을 찾을 수 없습니다.');
  }

  const { data, error } = await supabase.rpc('start_avalon_game', {
    p_room_code: roomCode,
  });

  if (error) {
    throw error;
  }

  return data as StartAvalonGameResult | null;
}

export async function getMyAvalonRole(
  roomCode: string,
): Promise<GetMyAvalonRoleResult | null> {
  const session = await getCurrentSession();

  if (!session) {
    return null;
  }

  const { data, error } = await supabase.rpc('get_my_avalon_role', {
    p_room_code: roomCode,
  });

  if (error) {
    throw error;
  }

  const result = data as GetMyAvalonRoleResponse | null;

  return result ? mapGetMyAvalonRoleResult(result) : null;
}

export async function getMyActiveAvalonRoom(): Promise<GetMyActiveAvalonRoomResult | null> {
  const session = await getCurrentSession();

  if (!session) {
    return null;
  }

  const { data, error } = await supabase.rpc('get_my_active_avalon_room');

  if (error) {
    throw error;
  }

  const result = data as GetMyActiveAvalonRoomResponse | null;

  return result ? mapGetMyActiveAvalonRoomResult(result) : null;
}
