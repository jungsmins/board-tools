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

  const { data: room } = await supabase
    .from('avalon_rooms')
    .select('id')
    .eq('code', roomCode.toUpperCase())
    .maybeSingle();

  if (!room) {
    return Response.json({ error: '방을 찾을 수 없습니다.' }, { status: 404 });
  }

  const { data, error } = await supabase
    .from('avalon_players')
    .delete()
    .eq('room_id', room.id)
    .eq('user_id', user.id)
    .select('id')
    .maybeSingle();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return Response.json(
      { error: '나갈 수 없습니다. (방장이거나 이미 시작된 방)' },
      { status: 403 },
    );
  }

  return Response.json({ ok: true });
}
