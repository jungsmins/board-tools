import { useState } from 'react';
import { FeedbackCategory } from '@/app/feedback/page';

interface FeedbackComposerProps {
  onClose: () => void;
}

export default function FeedbackComposer({ onClose }: FeedbackComposerProps) {
  const [composeValue, setComposeValue] = useState<string>('');
  const [composeCategory, setComposeCategory] =
    useState<FeedbackCategory>('build');

  function handleChangeComposeValue(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setComposeValue(event.target.value);
  }

  function handleSelectComposeCategory(feedbackCategory: FeedbackCategory) {
    setComposeCategory(feedbackCategory);
  }

  async function handleSubmitCompose(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await fetch('', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        composeValue: composeValue,
        feedbackCategory: composeCategory,
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.message ?? '에러입니다.');
    }
  }

  return (
    <form
      onSubmit={handleSubmitCompose}
      className='rounded-md border border-feedback-border bg-feedback-surface p-4'
    >
      <div className='mb-3 flex gap-2'>
        <button
          type='button'
          onClick={() => handleSelectComposeCategory('build')}
          aria-pressed={composeCategory === 'build'}
          className='flex-1 rounded-md border border-feedback-border px-3 py-2 text-sm font-bold text-feedback-text-muted cursor-pointer aria-pressed:text-brand-400 aria-pressed:border-brand-400 aria-pressed:bg-[var(--color-feedback-recommend-bg)]'
        >
          게임 추천
        </button>
        <button
          type='button'
          onClick={() => handleSelectComposeCategory('fix')}
          aria-pressed={composeCategory === 'fix'}
          className='flex-1 rounded-md border border-feedback-border px-3 py-2 text-sm font-bold text-feedback-text-muted cursor-pointer aria-pressed:text-accent aria-pressed:border-accent aria-pressed:bg-[var(--color-feedback-suggestion-bg)]'
        >
          건의/피드백
        </button>
      </div>
      <p className='mb-2 text-xs text-feedback-text-muted'>
        익명 닉네임{' '}
        <span className='font-bold text-feedback-text'>느긋한 수달</span>
        (으)로 등록돼요
      </p>
      <textarea
        rows={3}
        placeholder='내용을 입력하세요'
        value={composeValue}
        onChange={handleChangeComposeValue}
        className='w-full rounded-md border border-feedback-border bg-feedback-bg px-3 py-2 text-sm text-feedback-text outline-none placeholder:text-feedback-text-muted focus:border-brand-400'
      />
      <div className='mt-3 flex justify-end gap-2'>
        <button
          type='button'
          onClick={onClose}
          className='rounded-md border border-feedback-border px-4 py-2 text-sm text-feedback-text-muted transition cursor-pointer hover:text-feedback-text'
        >
          취소
        </button>
        <button
          type='submit'
          className='rounded-md bg-brand-400 px-4 py-2 text-sm font-bold text-feedback-bg transition cursor-pointer hover:bg-brand-400/90'
        >
          등록
        </button>
      </div>
    </form>
  );
}
