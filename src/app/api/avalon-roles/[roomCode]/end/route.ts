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

  const { data, error } = await supabase
    .from('avalon_rooms')
    .update({ status: 'ended' })
    .eq('host_user_id', user.id)
    .eq('code', roomCode.toUpperCase())
    .select('id')
    .maybeSingle();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return Response.json(
      { error: '방을 종료할 권한이 없습니다.' },
      { status: 403 },
    );
  }

  return Response.json({ ok: true });
}
