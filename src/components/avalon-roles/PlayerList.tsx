import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import type { AvalonRoomPlayer } from '@/types/avalonRoles';

interface PlayerListProps {
  emptyMessage?: string;
  players: AvalonRoomPlayer[];
}

export default function PlayerList({
  emptyMessage = '아직 참가자가 없습니다.',
  players,
}: PlayerListProps) {
  if (players.length === 0) {
    return (
      <Card padding='sm' className='text-center text-sm font-bold text-ink-muted'>
        {emptyMessage}
      </Card>
    );
  }

  return (
    <ul className='grid gap-2'>
      {players.map((player) => (
        <li key={player.id}>
          <Card
            padding='sm'
            className='flex min-h-14 items-center justify-between'
          >
            <div className='flex items-center gap-3'>
              <span className='flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-avalon-ink)] text-sm font-bold text-white'>
                {player.seatNumber}
              </span>
              <span className='font-bold text-ink'>{player.nickname}</span>
            </div>
            {player.isHost && <Badge tone='positive'>방장</Badge>}
          </Card>
        </li>
      ))}
    </ul>
  );
}
