import PlayerList from '@/components/avalon-roles/PlayerList';

interface WaitingPlayer {
  id: string;
  isHost: boolean;
  nickname: string;
}

interface WaitingRoomProps {
  playerCount: number;
  players: WaitingPlayer[];
  roomCode: string;
}

export default function WaitingRoom({
  playerCount,
  players,
  roomCode,
}: WaitingRoomProps) {
  return (
    <section className='rounded-lg border border-card-border bg-card p-5 shadow-md sm:p-7'>
      <div className='mb-8'>
        <p className='mb-2 text-sm font-bold text-[#2f8f5b]'>대기방</p>
        <h1 className='text-3xl font-bold text-title sm:text-4xl'>
          참가자를 기다리는 중
        </h1>
      </div>

      <div className='mb-8 rounded-lg border border-chip-border bg-white p-5 shadow-sm'>
        <div className='mb-3 flex items-center justify-between gap-3'>
          <p className='text-sm font-bold text-card-muted'>방 코드</p>
          <button
            type='button'
            className='rounded-lg border border-chip-border px-3 py-1.5 text-sm font-bold text-card-ink transition hover:bg-chip focus-visible:ring-2 focus-visible:ring-[#2d1508]/20'
          >
            복사
          </button>
        </div>
        <p className='text-center text-5xl font-black tracking-[0.22em] text-[#2d1508] sm:text-6xl'>
          {roomCode}
        </p>
      </div>

      <section className='mb-8'>
        <div className='mb-4 flex items-end justify-between gap-4'>
          <div>
            <h2 className='text-xl font-bold text-card-ink'>참가자</h2>
            <p className='mt-1 text-sm text-card-muted'>
              {players.length} / {playerCount}명
            </p>
          </div>
          <span className='rounded-full border border-[#ead18d] bg-[#fff9e8] px-3 py-1 text-sm font-bold text-[#765b13]'>
            대기 중
          </span>
        </div>

        <PlayerList players={players} />
      </section>

      <button
        type='button'
        className='flex h-14 w-full items-center justify-center rounded-lg bg-[#2d1508] px-5 text-base font-bold text-white shadow-md transition hover:bg-[#482616] focus-visible:ring-2 focus-visible:ring-[#2d1508]/30'
      >
        게임 시작
      </button>
    </section>
  );
}
