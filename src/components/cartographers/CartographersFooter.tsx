import { useState } from 'react';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
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
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const handleReset = () => {
    setIsResetDialogOpen(true);
  };

  return (
    <>
      <footer className='flex h-20 w-full items-center rounded-2xl bg-black/60 p-6 text-white'>
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

      {isResetDialogOpen && (
        <ConfirmDialog
          title='초기화할까요?'
          description='현재 진행 상황이 모두 처음 상태로 돌아갑니다.'
          confirmLabel='초기화'
          onCancel={() => setIsResetDialogOpen(false)}
          onConfirm={() => {
            onReset();
            setIsResetDialogOpen(false);
          }}
        />
      )}
    </>
  );
}
