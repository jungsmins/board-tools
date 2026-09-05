'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { endAvalonRoom, leaveAvalonRoom } from '@/lib/avalon-roles/api';

interface EndOrLeaveRoomButtonProps {
  isHost: boolean;
  roomCode: string;
}

export default function EndOrLeaveRoomButton({
  isHost,
  roomCode,
}: EndOrLeaveRoomButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = async () => {
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
    <div>
      <button
        disabled={isLoading}
        type='button'
        className='flex h-14 items-center justify-center rounded-lg bg-[#2d1508] px-5 text-base font-bold text-white shadow-md transition hover:bg-[#482616] focus-visible:ring-2 focus-visible:ring-[#2d1508]/30 disabled:cursor-not-allowed disabled:bg-ink-muted disabled:shadow-none'
        onClick={handleClick}
      >
        {isLoading ? '처리 중' : isHost ? '게임 종료' : '방 나가기'}
      </button>
      {errorMessage && (
        <p className='mt-2 rounded-lg border border-[#e2a7a1] bg-[#fff1ee] px-4 py-3 text-sm font-bold text-[#8f3a2f]'>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
