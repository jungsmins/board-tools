'use client';

import { useState } from 'react';

interface CopyRoomCodeButtonProps {
  roomCode: string;
}

type CopyState = 'idle' | 'copied' | 'failed';

export default function CopyRoomCodeButton({
  roomCode,
}: CopyRoomCodeButtonProps) {
  const [copyState, setCopyState] = useState<CopyState>('idle');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 1600);
    } catch {
      setCopyState('failed');
      window.setTimeout(() => setCopyState('idle'), 1600);
    }
  };

  const label =
    copyState === 'copied' ? '복사됨' : copyState === 'failed' ? '실패' : '복사';

  return (
    <button
      type='button'
      className='rounded-lg border border-ink/10 px-3 py-1.5 text-sm font-bold text-ink transition hover:bg-surface focus-visible:ring-2 focus-visible:ring-[#2d1508]/20'
      onClick={handleCopy}
    >
      {label}
    </button>
  );
}
