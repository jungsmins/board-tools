import { AVALON_PLAYER_COUNTS } from '@/constants/avalonRoles';
import CopyRoomCodeButton from '@/components/avalon-roles/CopyRoomCodeButton';
import PlayerList from '@/components/avalon-roles/PlayerList';
import RoleCompositionSummary from '@/components/avalon-roles/RoleCompositionSummary';
import { startAvalonGame } from '@/lib/avalon-roles/api';
import type {
  AvalonPlayerCount,
  AvalonRoom,
  AvalonRoomPlayer,
} from '@/types/avalonRoles';
import { useState } from 'react';

interface WaitingRoomProps {
  isHost?: boolean;
  players: AvalonRoomPlayer[];
  room: AvalonRoom;
  onGameStarted: () => void;
}

function isAvalonPlayerCount(value: number): value is AvalonPlayerCount {
  return (AVALON_PLAYER_COUNTS as readonly number[]).includes(value);
}

export default function WaitingRoom({
  isHost = true,
  players,
  room,
  onGameStarted,
}: WaitingRoomProps) {
  const { code, playerCount, selectedRoleIds } = room;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isFull = players.length >= playerCount;
  const neededPlayerCount = Math.max(0, playerCount - players.length);
  const canStart = isHost && isFull;

  const handleStartGame = async () => {
    setIsLoading(true);

    try {
      await startAvalonGame(code);

      onGameStarted();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage('게임을 시작할 수 없습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

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
          <CopyRoomCodeButton roomCode={code} />
        </div>
        <p className='text-center text-5xl font-black tracking-[0.22em] text-[#2d1508] sm:text-6xl'>
          {code}
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
        </div>
        <PlayerList players={players} />
      </section>

      {selectedRoleIds.length > 0 && isAvalonPlayerCount(playerCount) && (
        <RoleCompositionSummary
          playerCount={playerCount}
          selectedRoleIds={selectedRoleIds}
        />
      )}

      {!isHost && (
        <p className='mb-4 rounded-lg border border-chip-border bg-white px-4 py-3 text-center text-sm font-bold text-card-muted shadow-sm'>
          방장이 게임을 시작할 때까지 기다려 주세요.
        </p>
      )}

      {errorMessage && (
        <p className='mb-4 rounded-lg border border-[#e2a7a1] bg-[#fff1ee] px-4 py-3 text-sm font-bold text-[#8f3a2f]'>
          {errorMessage}
        </p>
      )}

      <button
        disabled={!canStart || isLoading}
        type='button'
        className='flex h-14 w-full items-center justify-center rounded-lg bg-[#2d1508] px-5 text-base font-bold text-white shadow-md transition hover:bg-[#482616] focus-visible:ring-2 focus-visible:ring-[#2d1508]/30 disabled:cursor-not-allowed disabled:bg-card-muted disabled:shadow-none'
        onClick={handleStartGame}
      >
        {isLoading
          ? '게임 시작 중'
          : isFull
            ? '게임 시작'
            : `${neededPlayerCount}명 더 필요`}
      </button>
    </section>
  );
}
