import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const feedbackPost = data.map((d) => {
    return {
      id: d.id,
      category: d.category,
      nickname: d.nickname,
      content: d.content,
      createdAt: d.created_at,
    };
  });

  return Response.json(feedbackPost);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const payload = await req.json().catch(() => null);
  const nickname = payload?.nickname;
  const content = payload?.content;
  const category = payload?.category;

  const { data, error } = await supabase
    .from('feedback')
    .insert({
      nickname,
      content,
      category,
    })
    .select('id, category, nickname, content, created_at')
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  const feedbackPost = {
    id: data.id,
    category: data.category,
    nickname: data.nickname,
    content: data.content,
    createdAt: data.created_at,
  };

  return Response.json(feedbackPost);
}
