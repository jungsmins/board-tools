interface VisiblePlayer {
  id: string;
  nickname: string;
}

interface VisiblePlayersListProps {
  players: VisiblePlayer[];
}

export default function VisiblePlayersList({
  players,
}: VisiblePlayersListProps) {
  if (players.length === 0) {
    return (
      <div className='rounded-lg border border-chip-border bg-white px-4 py-5 text-center text-sm font-bold text-card-muted shadow-sm'>
        확인할 대상이 없습니다.
      </div>
    );
  }

  return (
    <ul className='grid gap-2'>
      {players.map((player, index) => (
        <li
          key={player.id}
          className='flex min-h-14 items-center gap-3 rounded-lg border border-chip-border bg-white px-4 shadow-sm'
        >
          <span className='flex h-8 w-8 items-center justify-center rounded-full bg-[#2d1508] text-sm font-bold text-white'>
            {index + 1}
          </span>
          <span className='font-bold text-card-ink'>{player.nickname}</span>
        </li>
      ))}
    </ul>
  );
}
