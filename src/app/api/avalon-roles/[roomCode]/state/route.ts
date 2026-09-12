import { createClient } from '@/lib/supabase/server';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ roomCode: string }> },
) {
  const { roomCode } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json(null);
  }

  const { data: room, error: roomError } = await supabase
    .from('avalon_rooms')
    .select(
      'id, code, host_user_id, status, player_count, selected_role_ids, created_at',
    )
    .eq('code', roomCode.toUpperCase())
    .maybeSingle();

  if (roomError) {
    return Response.json({ error: roomError.message }, { status: 500 });
  }

  if (!room) {
    return Response.json(null);
  }

  const { data: players, error: playersError } = await supabase
    .from('avalon_players')
    .select('id, nickname, seat_number, is_host, user_id')
    .eq('room_id', room.id)
    .order('seat_number');

  if (playersError) {
    return Response.json({ error: playersError.message }, { status: 500 });
  }

  const me = players.find((player) => player.user_id === user.id);

  if (!me) {
    return Response.json(null);
  }

  return Response.json({
    currentPlayerId: me.id,
    isHost: me.is_host,
    players: players.map((p) => ({
      id: p.id,
      nickname: p.nickname,
      seatNumber: p.seat_number,
      isHost: p.is_host,
    })),
    room: {
      id: room.id,
      code: room.code,
      hostUserId: room.host_user_id,
      status: room.status,
      playerCount: room.player_count,
      selectedRoleIds: room.selected_role_ids,
      createdAt: room.created_at,
    },
  });
}
