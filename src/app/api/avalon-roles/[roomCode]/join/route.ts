import { createClient } from '@/lib/supabase/server';

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ roomCode: string }> },
) {
  const { roomCode } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  const body = await _req.json().catch(() => null);
  const nickname = body?.nickname?.trim();

  if (!nickname || nickname.length > 12) {
    return Response.json(
      { error: '닉네임은 1 ~ 12자입니다.' },
      { status: 400 },
    );
  }

  const { data: room } = await supabase
    .from('avalon_rooms')
    .select('id, status, player_count')
    .eq('code', roomCode.toUpperCase())
    .maybeSingle();

  if (!room) {
    return Response.json({ error: '존재하지 않는 방입니다.' }, { status: 404 });
  }

  if (room.status !== 'waiting') {
    return Response.json(
      { error: '이미 시작되었거나 종료된 방입니다.' },
      { status: 409 },
    );
  }

  const { data: existing } = await supabase
    .from('avalon_players')
    .select('id, seat_number')
    .eq('room_id', room.id)
    .eq('user_id', user.id)
    .maybeSingle();

  if (existing) {
    return Response.json({
      roomId: room.id,
      roomCode: roomCode.toUpperCase(),
      playerId: existing.id,
      seatNumber: existing.seat_number,
    });
  }

  for (let attempt = 0; attempt < 5; attempt++) {
    const { count } = await supabase
      .from('avalon_players')
      .select('id', { count: 'exact', head: true })
      .eq('room_id', room.id);

    if ((count ?? 0) >= room.player_count) {
      return Response.json({ error: '방이 가득 찼습니다.' }, { status: 409 });
    }

    const seat = (count ?? 0) + 1;

    const { data, error } = await supabase
      .from('avalon_players')
      .insert({
        room_id: room.id,
        user_id: user.id,
        nickname,
        seat_number: seat,
        is_host: false,
      })
      .select('id')
      .single();

    if (!error) {
      return Response.json({
        roomId: room.id,
        roomCode: roomCode.toUpperCase(),
        playerId: data.id,
        seatNumber: seat,
      });
    }

    if (error.code === '23505') {
      continue;
    }

    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(
    { error: '자리 배정에 실패했습니다. 다시 시도해 주세요.' },
    { status: 409 },
  );
}
