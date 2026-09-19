import { Pencil } from 'lucide-react';

interface FeedbackComposerTriggerProps {
  onOpen: () => void;
}

export default function FeedbackComposeTrigger({
  onOpen,
}: FeedbackComposerTriggerProps) {
  return (
    <button
      type='button'
      onClick={onOpen}
      className='flex items-center justify-center gap-2 w-full rounded-md border border-dashed border-feedback-border bg-feedback-surface px-4 py-3 text-sm text-feedback-text-muted transition cursor-pointer hover:border-brand-400/60 hover:text-feedback-text'
    >
      <Pencil size={15} />새 글 남기기
    </button>
  );
}
