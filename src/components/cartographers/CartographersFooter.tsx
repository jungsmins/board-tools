import Link from 'next/link';
import Button from '../ui/Button';

interface CartographersFooterProps {
  onNext: () => void;
  nextButtonLabel: string;
  onReset: () => void;
  onPrev?: () => void;
}

export default function CartographersFooter({
  onNext,
  nextButtonLabel,
  onReset,
  onPrev,
}: CartographersFooterProps) {
  const handleReset = () => {
    if (window.confirm('현재 진행 상황을 초기화할까요?')) {
      onReset();
    }
  };

  return (
    <footer className='flex h-16 w-full items-center bg-[var(--color-cartographers-surface)] p-6 text-[var(--color-cartographers-ink)]'>
      <Link href='/'>홈</Link>
      <div className='flex flex-1 justify-center gap-10'>
        {onPrev && (
          <Button variant='primary' onClick={onPrev}>
            이전 카드
          </Button>
        )}
        <Button variant='primary' onClick={onNext}>
          {nextButtonLabel}
        </Button>
        <Button variant='danger' onClick={handleReset}>
          처음으로
        </Button>
      </div>
    </footer>
  );
}
