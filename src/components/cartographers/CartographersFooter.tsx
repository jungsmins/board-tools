import Link from 'next/link';
import Button from '../ui/Button';
import NextButton from './NextButton';

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
  return (
    <footer className='flex h-16 w-full items-center bg-[var(--color-cartographers-surface)] p-6 text-[var(--color-cartographers-ink)]'>
      <Link href='/'>홈</Link>
      <div className='flex flex-1 justify-center gap-10'>
        {onPrev && (
          <Button variant='primary' onClick={onPrev}>
            이전 카드
          </Button>
        )}
        <NextButton onNext={onNext} label={nextButtonLabel} />
        <Button variant='primary' onClick={onReset}>
          처음으로
        </Button>
      </div>
    </footer>
  );
}
