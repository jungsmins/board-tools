'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import { endAvalonRoom, leaveAvalonRoom } from '@/lib/avalon-roles/api';
import Button from '@/components/ui/Button';
import ErrorMessage from '@/components/ui/ErrorMessage';
import ConfirmDialog from '@/components/shared/ConfirmDialog';

interface EndOrLeaveRoomButtonProps {
  className?: string;
  fullWidth?: boolean;
  isHost: boolean;
  roomCode: string;
  variant?: 'secondary' | 'danger';
}

export default function EndOrLeaveRoomButton({
  className,
  fullWidth = false,
  isHost,
  roomCode,
  variant = 'secondary',
}: EndOrLeaveRoomButtonProps) {
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleConfirm = async () => {
    setIsConfirmOpen(false);
    setIsLoading(true);
    setErrorMessage('');

    try {
      if (isHost) {
        await endAvalonRoom(roomCode);
      } else {
        await leaveAvalonRoom(roomCode);
      }

      router.push('/avalon-roles');
    } catch {
      setErrorMessage(
        isHost
          ? '종료할 수 없습니다. 다시 시도해 주세요.'
          : '나갈 수 없습니다. 다시 시도해 주세요.',
      );
      setIsLoading(false);
    }
  };

  return (
    <div className={clsx(fullWidth && 'w-full', className)}>
      <Button
        disabled={isLoading}
        variant={variant}
        size='lg'
        className={clsx(
          'h-14 disabled:cursor-not-allowed disabled:opacity-60',
          fullWidth && 'w-full',
        )}
        onClick={() => setIsConfirmOpen(true)}
      >
        {isLoading ? '처리 중' : isHost ? '게임 종료' : '방 나가기'}
      </Button>
      {errorMessage && <ErrorMessage className='mt-2'>{errorMessage}</ErrorMessage>}
      {isConfirmOpen && (
        <ConfirmDialog
          title={isHost ? '게임을 종료할까요?' : '방에서 나갈까요?'}
          description={
            isHost
              ? '방장이 나가면 방이 사라지고, 참가 중인 모두가 게임에서 나가게 됩니다.'
              : '나가면 다시 방 코드를 입력해야 돌아올 수 있습니다.'
          }
          confirmLabel={isHost ? '게임 종료' : '나가기'}
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
