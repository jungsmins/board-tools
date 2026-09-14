'use client';

import { useState } from 'react';

import { AVALON_PLAYER_COUNTS } from '@/constants/avalonRoles';
import { startAvalonGame } from '@/lib/avalon-roles/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ErrorMessage from '@/components/ui/ErrorMessage';
import CopyRoomCodeButton from '@/components/avalon-roles/CopyRoomCodeButton';
import PlayerList from '@/components/avalon-roles/PlayerList';
import RoleCompositionSummary from '@/components/avalon-roles/RoleCompositionSummary';
import EndOrLeaveRoomButton from './EndOrLeaveRoomButton';
import type {
  AvalonPlayerCount,
  AvalonRoom,
  AvalonRoomPlayer,
} from '@/types/avalonRoles';

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
    <Card padding='lg'>
      <div className='mb-8'>
        <p className='mb-2 text-sm font-bold text-[var(--color-avalon-good-text)]'>
          대기방
        </p>
        <h1 className='text-3xl font-bold text-ink sm:text-4xl'>
          참가자를 기다리는 중
        </h1>
      </div>
      <Card padding='md' className='mb-8'>
        <div className='mb-3 flex items-center justify-between gap-3'>
          <p className='text-sm font-bold text-ink-muted'>방 코드</p>
          <CopyRoomCodeButton roomCode={code} />
        </div>
        <p className='text-center text-5xl font-black tracking-[0.22em] text-[var(--color-avalon-ink)] sm:text-6xl'>
          {code}
        </p>
      </Card>
      <section className='mb-8'>
        <div className='mb-4 flex items-end justify-between gap-4'>
          <div>
            <h2 className='text-xl font-bold text-ink'>참가자</h2>
            <p className='mt-1 text-sm text-ink-muted'>
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
        <Card
          padding='sm'
          className='mb-4 text-center text-sm font-bold text-ink-muted'
        >
          방장이 게임을 시작할 때까지 기다려 주세요.
        </Card>
      )}
      {errorMessage && <ErrorMessage className='mb-4'>{errorMessage}</ErrorMessage>}
      <Button
        disabled={!canStart || isLoading}
        variant='primary'
        size='lg'
        className='h-14 w-full disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none'
        onClick={handleStartGame}
      >
        {isLoading
          ? '게임 시작 중'
          : isFull
            ? '게임 시작'
            : `${neededPlayerCount}명 더 필요`}
      </Button>
      <EndOrLeaveRoomButton
        fullWidth
        isHost={isHost}
        roomCode={room.code}
        variant='danger'
        className='mt-3'
      />
    </Card>
  );
}
