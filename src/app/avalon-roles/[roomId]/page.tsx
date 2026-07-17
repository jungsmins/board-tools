import Link from 'next/link';

import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

const waitingPlayers = [
  { id: 'host', nickname: '방장', isHost: true },
  { id: 'player-1', nickname: '민수', isHost: false },
  { id: 'player-2', nickname: '지은', isHost: false },
];

const roomCode = 'A3K7';
const playerCount = 5;

export default function AvalonRolesWaitingRoomPage() {
  return (
    <div className='min-h-dvh bg-canvas text-card-ink'>
      <Header />

      <main className='mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[680px] flex-col px-5 py-8 sm:px-8 lg:py-12'>
        <Link
          href='/avalon-roles'
          className='mb-6 flex w-fit items-center gap-1.5 text-sm font-semibold text-card-muted underline-offset-4 hover:underline'
        >
          <svg
            aria-hidden='true'
            className='h-4 w-4'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              d='M15 18L9 12L15 6'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
            />
          </svg>
          이전으로
        </Link>

        <section className='rounded-lg border border-card-border bg-card p-6 shadow-md sm:p-8'>
          <div className='mb-8'>
            <p className='mb-2 text-sm font-bold text-card-muted'>대기방</p>
            <h1 className='text-3xl font-bold text-title sm:text-4xl'>
              참가자를 기다리는 중
            </h1>
          </div>

          <div className='mb-8 rounded-lg border border-chip-border bg-white p-5'>
            <div className='mb-3 flex items-center justify-between gap-3'>
              <p className='text-sm font-bold text-card-muted'>방 코드</p>
              <button
                type='button'
                className='rounded-lg border border-chip-border px-3 py-1.5 text-sm font-bold text-card-ink transition hover:bg-chip'
              >
                복사
              </button>
            </div>
            <p className='text-center text-5xl font-black tracking-[0.22em] text-title sm:text-6xl'>
              {roomCode}
            </p>
          </div>

          <section className='mb-8'>
            <div className='mb-4 flex items-end justify-between gap-4'>
              <div>
                <h2 className='text-xl font-bold text-card-ink'>참가자</h2>
                <p className='mt-1 text-sm text-card-muted'>
                  {waitingPlayers.length} / {playerCount}명
                </p>
              </div>
              <span className='rounded-full border border-chip-border bg-chip px-3 py-1 text-sm font-bold text-card-ink'>
                대기 중
              </span>
            </div>

            <ul className='grid gap-2'>
              {waitingPlayers.map((player, index) => (
                <li
                  key={player.id}
                  className='flex min-h-14 items-center justify-between rounded-lg border border-chip-border bg-white px-4'
                >
                  <div className='flex items-center gap-3'>
                    <span className='flex h-8 w-8 items-center justify-center rounded-full bg-[#2d1508] text-sm font-bold text-white'>
                      {index + 1}
                    </span>
                    <span className='font-bold text-card-ink'>
                      {player.nickname}
                    </span>
                  </div>
                  {player.isHost && (
                    <span className='rounded-full bg-[#eef8f2] px-3 py-1 text-xs font-bold text-[#237348]'>
                      방장
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <button
            type='button'
            className='flex h-14 w-full items-center justify-center rounded-lg bg-[#2d1508] px-5 text-base font-bold text-white shadow-md transition hover:bg-[#482616]'
          >
            게임 시작
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
