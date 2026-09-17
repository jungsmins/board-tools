import { FeedbackFilterValue } from '@/app/feedback/page';

interface FeedbackFilterBarProps {
  feedbackFilterValue: FeedbackFilterValue;
  onFeedbackFilterChange: (value: FeedbackFilterValue) => void;
}

export default function FeedbackFilterBar({
  feedbackFilterValue,
  onFeedbackFilterChange,
}: FeedbackFilterBarProps) {
  return (
    <div className='flex flex-wrap gap-2'>
      <button
        type='button'
        onClick={() => onFeedbackFilterChange('all')}
        aria-pressed={feedbackFilterValue === 'all'}
        className='rounded-full border border-brand-400/50 px-4 py-1.5 text-sm text-brand-400 cursor-pointer aria-pressed:text-feedback-bg aria-pressed:bg-brand-400 aria-pressed:font-bold'
      >
        전체
      </button>
      <button
        type='button'
        onClick={() => onFeedbackFilterChange('build')}
        aria-pressed={feedbackFilterValue === 'build'}
        className='rounded-full border border-brand-400/50 px-4 py-1.5 text-sm text-brand-400 cursor-pointer aria-pressed:text-feedback-bg aria-pressed:bg-brand-400 aria-pressed:font-bold'
      >
        게임 추천
      </button>
      <button
        type='button'
        onClick={() => onFeedbackFilterChange('fix')}
        aria-pressed={feedbackFilterValue === 'fix'}
        className='rounded-full border border-accent/50 px-4 py-1.5 text-sm text-accent cursor-pointer aria-pressed:text-feedback-bg aria-pressed:bg-accent aria-pressed:font-bold'
      >
        건의/피드백
      </button>
    </div>
  );
}
