import { ensureAnonymousSession } from '@/lib/supabase/auth';
import { supabase } from '@/lib/supabase/client';
import type {
  AvalonPlayerCount,
  AvalonRoleId,
  AvalonRoomState,
} from '@/types/avalonRoles';
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
): Promise<CreateAvalonRoomResult> {
  await ensureAnonymousSession();

  const res = await fetch(`/api/avalon-roles/rooms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerCount, selectedRoleIds, nickname }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? '방 생성에 실패했습니다.');
  }

  return await res.json();
}

export async function joinAvalonRoom(
  roomCode: string,
  nickname: string,
): Promise<JoinAvalonRoomResult> {
  const res = await fetch(`/api/avalon-roles/${roomCode}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nickname }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? '방 참가에 실패했습니다.');
  }

  return await res.json();
}

export async function getAvalonRoomState(
  roomCode: string,
): Promise<AvalonRoomState | null> {
  const res = await fetch(`/api/avalon-roles/${roomCode}/state`);

  if (!res.ok) {
    throw new Error('방 정보를 불러오지 못했습니다.');
  }

  const data: AvalonRoomState | null = await res.json();

  if (!data) {
    return null;
  }

  return data;
}

export async function startAvalonGame(
  roomCode: string,
): Promise<StartAvalonGameResult> {
  const res = await fetch(`/api/avalon-roles/${roomCode}/start`, {
    method: 'POST',
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? '게임 시작에 실패했습니다.');
  }

  return await res.json();
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
  const res = await fetch('/api/avalon-roles/active-room');

  if (!res.ok) {
    throw new Error('활성화 된 방 조회에 실패했습니다.');
  }

  const data: GetMyActiveAvalonRoomResult | null = await res.json();

  if (!data) {
    return null;
  }

  return data;
}

export async function leaveAvalonRoom(roomCode: string): Promise<void> {
  const res = await fetch(`/api/avalon-roles/${roomCode}/leave`, {
    method: 'POST',
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? '방 나가기에 실패했습니다.');
  }
}

export async function endAvalonRoom(roomCode: string): Promise<void> {
  const res = await fetch(`/api/avalon-roles/${roomCode}/end`, {
    method: 'POST',
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? '방 종료에 실패했습니다.');
  }
}
