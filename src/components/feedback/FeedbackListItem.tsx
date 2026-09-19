import clsx from 'clsx';
import { FeedbackCategory } from '@/types/feedback';
import formatRelativeTime from '@/lib/formatRelativeTime';

type FeedbackListItemProps = {
  category: FeedbackCategory;
  nickname: string;
  createdAt: string;
  content: string;
};

const CATEGORY_LABEL: Record<FeedbackCategory, string> = {
  build: '게임 추천',
  fix: '건의/피드백',
};

const CATEGORY_BORDER_CLASSES: Record<FeedbackCategory, string> = {
  build: 'border-l-brand-400',
  fix: 'border-l-accent',
};

const CATEGORY_BADGE_CLASSES: Record<FeedbackCategory, string> = {
  build: 'bg-[var(--color-feedback-recommend-bg)] text-brand-400',
  fix: 'bg-[var(--color-feedback-suggestion-bg)] text-accent',
};

export default function FeedbackListItem({
  category,
  nickname,
  createdAt,
  content,
}: FeedbackListItemProps) {
  return (
    <li
      className={clsx(
        'rounded-md border-l-4 bg-feedback-surface p-4',
        CATEGORY_BORDER_CLASSES[category],
      )}
    >
      <div className='mb-2 flex items-center gap-2'>
        <span
          className={clsx(
            'rounded-full px-2 py-0.5 text-xs font-bold',
            CATEGORY_BADGE_CLASSES[category],
          )}
        >
          {CATEGORY_LABEL[category]}
        </span>
        <span className='text-sm font-bold text-feedback-text'>{nickname}</span>
        <span className='ml-auto text-xs text-feedback-text-muted'>
          {formatRelativeTime(createdAt)}
        </span>
      </div>
      <p className='text-sm leading-6 text-feedback-text'>{content}</p>
    </li>
  );
}
