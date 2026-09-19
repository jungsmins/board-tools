'use client';

import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FeedbackFilterBar from '@/components/feedback/FeedbackFilterBar';
import FeedbackComposeTrigger from '@/components/feedback/FeedbackComposeTrigger';
import FeedbackComposer from '@/components/feedback/FeedbackComposer';
import FeedbackEmpty from '@/components/feedback/FeedbackEmpty';
import FeedbackListItem from '@/components/feedback/FeedbackListItem';
import { useEffect, useState } from 'react';
import { FeedbackFilterCategory, FeedbackPost } from '@/types/feedback';
import { getFeedback } from '@/lib/feedback/api';

export default function FeedbackPage() {
  const [filterCategory, setFilterCategory] =
    useState<FeedbackFilterCategory>('all');
  const [isComposerOpen, setIsComposerOpen] = useState<boolean>(false);
  const [posts, setPosts] = useState<FeedbackPost[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const filteredPosts = (posts ?? []).filter((post) => {
    if (filterCategory === 'all') {
      return post;
    }
    return filterCategory === post.category;
  });

  let listContent;

  if (loadError) {
    listContent = <FeedbackEmpty>{loadError}</FeedbackEmpty>;
  } else if (posts === null) {
    listContent = <FeedbackEmpty>...불러오는중</FeedbackEmpty>;
  } else if (filteredPosts.length === 0) {
    listContent = <FeedbackEmpty>아직 작성된 글이 없습니다.</FeedbackEmpty>;
  } else {
    listContent = (
      <ul className='flex flex-col gap-3'>
        {filteredPosts.map((post) => (
          <FeedbackListItem key={post.id} {...post} />
        ))}
      </ul>
    );
  }

  function handleFilterChange(category: FeedbackFilterCategory) {
    setFilterCategory(category);
  }

  function addPosts(post: FeedbackPost) {
    const newPosts = [post, ...(posts ?? [])];

    setPosts(newPosts);
  }

  useEffect(() => {
    (async () => {
      try {
        const feedbackPost: FeedbackPost[] = await getFeedback();

        setPosts(feedbackPost);
      } catch (error) {
        if (error instanceof Error) {
          setLoadError(error.message);
        }
      }
    })();
  }, []);

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
            filterCategory={filterCategory}
            onFilterChange={handleFilterChange}
          />
          {isComposerOpen ? (
            <FeedbackComposer
              onClose={() => setIsComposerOpen(false)}
              addPosts={addPosts}
            />
          ) : (
            <FeedbackComposeTrigger onOpen={() => setIsComposerOpen(true)} />
          )}
          {listContent}
        </div>
      </section>
      <Footer />
    </div>
  );
}
