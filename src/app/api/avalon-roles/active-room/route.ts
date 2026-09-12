import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json(null);
  }

  const { data, error } = await supabase
    .from('avalon_players')
    .select('avalon_rooms!inner(code, status)')
    .eq('user_id', user.id)
    .in('avalon_rooms.status', ['waiting', 'playing'])
    .order('joined_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return Response.json(null);
  }

  const room = data.avalon_rooms as unknown as { code: string };
  return Response.json({ roomCode: room.code });
}
