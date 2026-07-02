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
    <footer className='flex h-20 w-full items-center bg-[var(--color-cartographers-surface)] p-6 text-[var(--color-cartographers-ink)]'>
      <Link href='/'>홈</Link>
      <div className='grid flex-1 grid-cols-3 items-center'>
        <div className='justify-self-end'>
          {onPrev && (
            <Button variant='secondary' size='lg' onClick={onPrev}>
              이전 카드
            </Button>
          )}
        </div>
        <div className='justify-self-center'>
          <Button variant='primary' size='lg' onClick={onNext}>
            {nextButtonLabel}
          </Button>
        </div>
        <div className='justify-self-start'>
          <Button variant='danger' size='lg' onClick={handleReset}>
            처음으로
          </Button>
        </div>
      </div>
    </footer>
  );
}
