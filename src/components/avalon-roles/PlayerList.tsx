import type { AvalonWaitingPlayer } from '@/types/avalonRoles';

interface PlayerListProps {
  emptyMessage?: string;
  players: AvalonWaitingPlayer[];
}

export default function PlayerList({
  emptyMessage = '아직 참가자가 없습니다.',
  players,
}: PlayerListProps) {
  if (players.length === 0) {
    return (
      <div className='rounded-lg border border-chip-border bg-white px-4 py-5 text-center text-sm font-bold text-card-muted shadow-sm'>
        {emptyMessage}
      </div>
    );
  }

  return (
    <ul className='grid gap-2'>
      {players.map((player, index) => (
        <li
          key={player.id}
          className='flex min-h-14 items-center justify-between rounded-lg border border-chip-border bg-white px-4 shadow-sm'
        >
          <div className='flex items-center gap-3'>
            <span className='flex h-8 w-8 items-center justify-center rounded-full bg-[#2d1508] text-sm font-bold text-white'>
              {index + 1}
            </span>
            <span className='font-bold text-card-ink'>{player.nickname}</span>
          </div>
          {player.isHost && (
            <span className='rounded-full bg-[#eef8f2] px-3 py-1 text-xs font-bold text-[#237348]'>
              방장
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
