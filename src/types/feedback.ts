export type FeedbackCategory = 'fix' | 'build';

export type FeedbackPost = {
  id: string;
  nickname: string;
  category: FeedbackCategory;
  content: string;
  createdAt: string;
};

export type FeedbackPostInput = Omit<FeedbackPost, 'id' | 'createdAt'>;

export type FeedbackFilterCategory = FeedbackCategory | 'all';
