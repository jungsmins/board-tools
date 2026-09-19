import { FeedbackPostInput } from '@/types/feedback';

export async function getFeedback<T>(): Promise<T[]> {
  const res = await fetch('/api/feedback');

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? '글 목록를 가져오지 못했습니다.');
  }

  const data: T[] = await res.json();

  return data;
}

export async function createFeedback<T>(
  feedback: FeedbackPostInput,
): Promise<T> {
  const res = await fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? '글 작성에 실패 했습니다.');
  }

  const data: T = await res.json();

  return data;
}
