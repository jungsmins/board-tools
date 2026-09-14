'use client';

import { useState } from 'react';
import { Check, Copy, X } from 'lucide-react';

interface CopyRoomCodeButtonProps {
  roomCode: string;
}

type CopyState = 'idle' | 'copied' | 'failed';

const stateConfig: Record<CopyState, { Icon: typeof Copy; label: string }> = {
  idle: { Icon: Copy, label: '복사' },
  copied: { Icon: Check, label: '복사됨' },
  failed: { Icon: X, label: '실패' },
};

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

  const { Icon, label } = stateConfig[copyState];

  return (
    <button
      type='button'
      className='flex items-center gap-1.5 rounded-md border border-ink/10 px-3 py-1.5 text-sm font-bold text-ink transition hover:bg-surface focus-visible:ring-2 focus-visible:ring-[var(--color-avalon-ink)]/20'
      onClick={handleCopy}
    >
      <Icon className='h-4 w-4' />
      {label}
    </button>
  );
}
