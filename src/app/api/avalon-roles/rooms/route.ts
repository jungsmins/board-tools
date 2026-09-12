import { createClient } from '@/lib/supabase/server';

function randomCode(): string {
  const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from(
    { length: 4 },
    () => A[Math.floor(Math.random() * A.length)],
  ).join('');
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const playerCount = body?.playerCount;
  const selectedRoleIds = body?.selectedRoleIds;
  const nickname = body?.nickname?.trim();

  if (typeof playerCount !== 'number' || playerCount < 5 || playerCount > 10) {
    return Response.json(
      { error: '인원수는 5명 이상 10명 이하만 가능합니다.' },
      { status: 400 },
    );
  }

  if (!Array.isArray(selectedRoleIds)) {
    return Response.json({ error: '역할 구성이 필요합니다.' }, { status: 400 });
  }

  if (!nickname || nickname.length > 12) {
    return Response.json(
      { error: '닉네임은 1 ~ 12자여야 합니다.' },
      { status: 400 },
    );
  }

  for (let attempt = 0; attempt < 5; attempt++) {
    const code = randomCode();
    const { data: room, error: roomError } = await supabase
      .from('avalon_rooms')
      .insert({
        code,
        host_user_id: user.id,
        player_count: playerCount,
        selected_role_ids: selectedRoleIds,
      })
      .select('id')
      .single();

    if (roomError?.code === '23505') {
      continue;
    }

    if (roomError) {
      return Response.json({ error: roomError.message }, { status: 500 });
    }

    const { data: player, error: playerError } = await supabase
      .from('avalon_players')
      .insert({
        room_id: room.id,
        user_id: user.id,
        nickname,
        seat_number: 1,
        is_host: true,
      })
      .select('id')
      .single();

    if (playerError) {
      return Response.json({ error: playerError.message }, { status: 500 });
    }

    return Response.json({
      roomId: room.id,
      roomCode: code,
      playerId: player.id,
    });
  }

  return Response.json(
    { error: '방 코드 생성에 실패했습니다. 다시 시도해 주세요.' },
    { status: 500 },
  );
}
