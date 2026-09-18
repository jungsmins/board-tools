'use client';

import { useState } from 'react';
import { FeedbackCategory, FeedbackPost } from '@/types/feedback';
import { createFeedback } from '@/lib/feedback/api';
import { randomGenerateNickname } from '@/lib/feedback/feedback';

interface FeedbackComposerProps {
  onClose: () => void;
  addPosts: (post: FeedbackPost) => void;
}

export default function FeedbackComposer({
  onClose,
  addPosts,
}: FeedbackComposerProps) {
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<FeedbackCategory>('build');
  const [nickname] = useState(() => randomGenerateNickname());

  function handleChangeComposeValue(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setContent(event.target.value);
  }

  function handleSelectComposeCategory(feedbackCategory: FeedbackCategory) {
    setCategory(feedbackCategory);
  }

  async function handleSubmitCompose(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const feedbackPost = {
      category,
      nickname,
      content,
    };

    try {
      const post: FeedbackPost = await createFeedback(feedbackPost);
      onClose();
      addPosts(post);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
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
          aria-pressed={category === 'build'}
          className='flex-1 rounded-md border border-feedback-border px-3 py-2 text-sm font-bold text-feedback-text-muted cursor-pointer aria-pressed:text-brand-400 aria-pressed:border-brand-400 aria-pressed:bg-[var(--color-feedback-recommend-bg)]'
        >
          게임 추천
        </button>
        <button
          type='button'
          onClick={() => handleSelectComposeCategory('fix')}
          aria-pressed={category === 'fix'}
          className='flex-1 rounded-md border border-feedback-border px-3 py-2 text-sm font-bold text-feedback-text-muted cursor-pointer aria-pressed:text-accent aria-pressed:border-accent aria-pressed:bg-[var(--color-feedback-suggestion-bg)]'
        >
          건의/피드백
        </button>
      </div>
      <p className='mb-2 text-xs text-feedback-text-muted'>
        익명 닉네임{' '}
        <span className='font-bold text-feedback-text'>{nickname}</span>
        (으)로 등록돼요
      </p>
      <textarea
        rows={3}
        placeholder='내용을 입력하세요'
        value={content}
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
