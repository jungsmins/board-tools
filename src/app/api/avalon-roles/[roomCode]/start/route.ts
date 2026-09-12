import { createClient } from '@/lib/supabase/server';

const SLOTS: Record<number, { good: number; evil: number }> = {
  5: { good: 3, evil: 2 },
  6: { good: 4, evil: 2 },
  7: { good: 4, evil: 3 },
  8: { good: 5, evil: 3 },
  9: { good: 6, evil: 3 },
  10: { good: 6, evil: 4 },
};
const GOOD_ROLES = ['merlin', 'percival'];
const EVIL_ROLES = ['assassin', 'mordred', 'morgana', 'oberon'];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

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
    return Response.json({ error: '로그인이 필요합니다' }, { status: 401 });
  }

  const { data: room } = await supabase
    .from('avalon_rooms')
    .select('id, status, player_count, selected_role_ids, host_user_id')
    .eq('code', roomCode.toUpperCase())
    .maybeSingle();

  if (!room) {
    return Response.json({ error: '존재하지 않는 방입니다.' }, { status: 404 });
  }

  if (room.host_user_id !== user.id) {
    return Response.json(
      { error: '게임은 방장만 시작할 수 있습니다.' },
      { status: 403 },
    );
  }

  if (room.status !== 'waiting') {
    return Response.json(
      { error: '이미 시작되었거나 종료된 방입니다.' },
      { status: 409 },
    );
  }

  const { count } = await supabase
    .from('avalon_players')
    .select('id', { count: 'exact', head: true })
    .eq('room_id', room.id);

  if ((count ?? 0) !== room.player_count) {
    return Response.json(
      { error: '설정한 인원이 모두 참가해야 시작할 수 있습니다.' },
      { status: 409 },
    );
  }

  const slots = SLOTS[room.player_count];
  const selectedGood = room.selected_role_ids.filter((r: string) =>
    GOOD_ROLES.includes(r),
  );
  const selectedEvil = room.selected_role_ids.filter((r: string) =>
    EVIL_ROLES.includes(r),
  );

  if (selectedGood.length > slots.good || selectedEvil.length > slots.evil) {
    return Response.json(
      { error: '역할 구성이 인원수와 맞지 않습니다.' },
      { status: 400 },
    );
  }

  const deck = shuffle([
    ...room.selected_role_ids,
    ...Array(slots.good - selectedGood.length).fill('loyal_servant'),
    ...Array(slots.evil - selectedEvil.length).fill('minion'),
  ]);

  const { data: players } = await supabase
    .from('avalon_players')
    .select('id')
    .eq('room_id', room.id)
    .order('seat_number');

  if (!players || players.length !== deck.length) {
    return Response.json(
      { error: '역할 배정 인원이 맞지 않습니다.' },
      { status: 500 },
    );
  }

  const { data: flipped, error: flipError } = await supabase
    .from('avalon_rooms')
    .update({ status: 'playing', started_at: new Date().toISOString() })
    .eq('id', room.id)
    .eq('status', 'waiting')
    .select('id')
    .maybeSingle();

  if (flipError) {
    return Response.json({ error: flipError.message }, { status: 500 });
  }

  if (!flipped) {
    return Response.json({ error: '이미 시작된 방입니다.' }, { status: 409 });
  }

  for (let i = 0; i < players.length; i++) {
    const { error } = await supabase
      .from('avalon_players')
      .update({ assigned_role_id: deck[i] })
      .eq('id', players[i].id);

    if (error) {
      return Response.json(
        {
          error:
            '역할 배정 중 문제가 발생했습니다. 방을 종료하고 다시 만들어 주세요.',
        },
        { status: 500 },
      );
    }
  }

  return Response.json({
    roomId: room.id,
    roomCode: roomCode.toUpperCase(),
    status: 'playing',
  });
}
