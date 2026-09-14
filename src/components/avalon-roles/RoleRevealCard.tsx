'use client';

import { Sparkle } from 'lucide-react';

import Badge from '@/components/ui/Badge';
import type { AvalonRoleConfig } from '@/types/avalonRoles';

export type VisiblePlayerSignal = 'evil' | 'candidate';

export interface VisiblePlayerInfo {
  description: string;
  emptyMessage: string;
  signal: VisiblePlayerSignal;
  title: string;
}

interface RoleRevealCardProps {
  isFlipped: boolean;
  onToggle: () => void;
  role: AvalonRoleConfig;
  visiblePlayers: { id: string; nickname: string; seatNumber: number }[];
  visiblePlayerInfo: VisiblePlayerInfo | null;
}

const sideLabels = {
  good: '선',
  evil: '악',
} as const;

const visiblePlayerSignalLabels: Record<VisiblePlayerSignal, string> = {
  evil: '악',
  candidate: '후보',
};

export default function RoleRevealCard({
  isFlipped,
  onToggle,
  role,
  visiblePlayers,
  visiblePlayerInfo,
}: RoleRevealCardProps) {
  const sideTone = role.side === 'good' ? 'positive' : 'negative';

  return (
    <button
      aria-pressed={isFlipped}
      className='block w-full cursor-pointer [perspective:1400px]'
      onClick={onToggle}
      type='button'
    >
      <div
        className='relative aspect-[2/3] w-full transition-transform duration-500 ease-out [transform-style:preserve-3d] motion-reduce:duration-0'
        style={{ transform: isFlipped ? 'rotateY(180deg)' : undefined }}
      >
        {/* 뒷면 */}
        <div className='bg-grain absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-[var(--color-avalon-ink)] p-6 text-center shadow-modal [backface-visibility:hidden]'>
          <Sparkle className='h-12 w-12 text-white/70' strokeWidth={1.5} />
          <p className='text-lg font-black text-white'>아발론</p>
          <p className='text-sm font-bold text-white/70'>
            카드를 탭하면 역할이 공개됩니다.
          </p>
        </div>

        {/* 앞면 */}
        <div className='absolute inset-0 flex flex-col overflow-y-auto rounded-2xl bg-white p-6 text-left shadow-modal [backface-visibility:hidden] [transform:rotateY(180deg)]'>
          <div className='mb-4 flex items-center justify-between gap-3'>
            <p className='text-sm font-bold text-ink-muted'>배정된 역할</p>
            <Badge tone={sideTone}>{sideLabels[role.side]}</Badge>
          </div>
          <p className='mb-3 text-4xl font-black text-ink'>{role.name}</p>
          <p className='mb-5 text-sm font-bold leading-6 text-ink'>
            {role.description}
          </p>

          {visiblePlayerInfo && (
            <div className='mt-auto border-t border-ink/10 pt-4'>
              <div className='mb-2 flex items-start justify-between gap-3'>
                <p className='text-sm font-bold text-ink'>
                  {visiblePlayerInfo.title}
                </p>
                <Badge
                  tone={
                    visiblePlayerInfo.signal === 'evil'
                      ? 'negative'
                      : 'highlight'
                  }
                  className='shrink-0 text-xs'
                >
                  {visiblePlayerSignalLabels[visiblePlayerInfo.signal]}
                </Badge>
              </div>
              <p className='mb-3 text-xs font-bold leading-5 text-ink-muted'>
                {visiblePlayerInfo.description}
              </p>

              {visiblePlayers.length === 0 ? (
                <p className='rounded-lg bg-surface px-3 py-3 text-center text-xs font-bold text-ink-muted'>
                  {visiblePlayerInfo.emptyMessage}
                </p>
              ) : (
                <ul className='grid gap-1.5'>
                  {visiblePlayers.map((player) => (
                    <li
                      key={player.id}
                      className='flex items-center gap-2.5 rounded-lg bg-surface px-2.5 py-1.5'
                    >
                      <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-avalon-ink)] text-xs font-bold text-white'>
                        {player.seatNumber}
                      </span>
                      <span className='min-w-0 flex-1 truncate text-sm font-bold text-ink'>
                        {player.nickname}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
