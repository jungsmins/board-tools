'use client';

import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FeedbackFilterBar from '@/components/feedback/FeedbackFilterBar';
import FeedbackComposeTrigger from '@/components/feedback/FeedbackComposeTrigger';
import FeedbackComposer from '@/components/feedback/FeedbackComposer';
import FeedbackListItem from '@/components/feedback/FeedbackListItem';
import React, { useState } from 'react';

const SAMPLE_POSTS: {
  id: number;
  category: FeedbackCategory;
  nickname: string;
  time: string;
  body: string;
}[] = [
  {
    id: 3,
    category: 'fix',
    nickname: '신나는 여우',
    time: '방금 전',
    body: '협력 보드게임 중에 2인용으로 할만한 것도 추천해주세요!',
  },
  {
    id: 2,
    category: 'fix',
    nickname: '조용한 펭귄',
    time: '10분 전',
    body: '모바일에서 배지 텍스트가 살짝 잘려 보여요.',
  },
  {
    id: 1,
    category: 'build',
    nickname: '용감한 수달',
    time: '1시간 전',
    body: '아발론 말고 코드네임 같은 팀전 게임도 다뤄주시면 좋겠어요.',
  },
];

export type FeedbackCategory = 'fix' | 'build';

export type FeedbackFilterValue = FeedbackCategory | 'all';

export default function FeedbackPage() {
  const [feedbackFilterValue, setFeedbackFilterValue] =
    useState<FeedbackFilterValue>('all');
  const [isComposerOpen, setIsComposerOpen] = useState<boolean>(false);

  function handleFeedbackFilterChange(value: FeedbackFilterValue) {
    setFeedbackFilterValue(value);
  }

  return (
    <div className='flex h-full w-full flex-1 flex-col bg-feedback-bg'>
      <Header />
      <section className='flex flex-1 flex-col items-center px-6 py-16'>
        <div className='mb-8 flex flex-col items-center gap-2 text-center'>
          <span className='text-sm font-bold tracking-[0.2em] text-accent'>
            PLAYER FEEDBACK
          </span>
          <div className='mt-1 h-px w-9 bg-feedback-border' />
        </div>
        <div className='flex w-full max-w-2xl flex-col gap-4'>
          <FeedbackFilterBar
            feedbackFilterValue={feedbackFilterValue}
            onFeedbackFilterChange={handleFeedbackFilterChange}
          />
          {isComposerOpen ? (
            <FeedbackComposer onClose={() => setIsComposerOpen(false)} />
          ) : (
            <FeedbackComposeTrigger onOpen={() => setIsComposerOpen(true)} />
          )}
          <ul className='flex flex-col gap-3'>
            {SAMPLE_POSTS.map((post) => (
              <FeedbackListItem key={post.id} {...post} />
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </div>
  );
}
