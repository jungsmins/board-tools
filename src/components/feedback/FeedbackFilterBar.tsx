import { FeedbackFilterCategory } from '@/types/feedback';

interface FeedbackFilterBarProps {
  filterCategory: FeedbackFilterCategory;
  onFilterChange: (value: FeedbackFilterCategory) => void;
}

export default function FeedbackFilterBar({
  filterCategory,
  onFilterChange,
}: FeedbackFilterBarProps) {
  return (
    <div className='flex flex-wrap gap-2'>
      <button
        type='button'
        onClick={() => onFilterChange('all')}
        aria-pressed={filterCategory === 'all'}
        className='rounded-full border border-brand-400/50 px-4 py-1.5 text-sm text-brand-400 cursor-pointer aria-pressed:text-feedback-bg aria-pressed:bg-brand-400 aria-pressed:font-bold'
      >
        전체
      </button>
      <button
        type='button'
        onClick={() => onFilterChange('build')}
        aria-pressed={filterCategory === 'build'}
        className='rounded-full border border-brand-400/50 px-4 py-1.5 text-sm text-brand-400 cursor-pointer aria-pressed:text-feedback-bg aria-pressed:bg-brand-400 aria-pressed:font-bold'
      >
        게임 추천
      </button>
      <button
        type='button'
        onClick={() => onFilterChange('fix')}
        aria-pressed={filterCategory === 'fix'}
        className='rounded-full border border-accent/50 px-4 py-1.5 text-sm text-accent cursor-pointer aria-pressed:text-feedback-bg aria-pressed:bg-accent aria-pressed:font-bold'
      >
        건의/피드백
      </button>
    </div>
  );
}
