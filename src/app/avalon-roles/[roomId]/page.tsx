'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';

import { getAvalonRoomState } from '@/lib/avalon-roles/api';
import BackLink from '@/components/avalon-roles/BackLink';
import WaitingRoom from '@/components/avalon-roles/WaitingRoom';
import PlayingRoom from '@/components/avalon-roles/PlayingRoom';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import type { AvalonRoomState } from '@/types/avalonRoles';

type RoomPageStatus = 'loading' | 'error' | 'ready';

export default function AvalonRolesWaitingRoomPage() {
  const params = useParams<{ roomId: string }>();
  const [roomState, setRoomState] = useState<AvalonRoomState | null>(null);
  const [roomPageStatus, setRoomPageStatus] =
    useState<RoomPageStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const isMountedRef = useRef(true);

  const getRoomState = useCallback(async () => {
    setRoomPageStatus('loading');
    setErrorMessage('');

    try {
      const data = await getAvalonRoomState(params.roomId);

      if (!isMountedRef.current) return;

      if (!data) {
        setRoomState(null);
        setErrorMessage('이 브라우저의 참가 기록을 찾을 수 없습니다.');
        setRoomPageStatus('error');
        return;
      }

      setRoomState(data);
      setRoomPageStatus('ready');
    } catch (error) {
      if (!isMountedRef.current) return;

      setRoomState(null);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : '방 정보를 불러오지 못했습니다.',
      );
      setRoomPageStatus('error');
    }
  }, [params.roomId]);

  useEffect(() => {
    isMountedRef.current = true;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    getRoomState();

    return () => {
      isMountedRef.current = false;
    };
  }, [getRoomState]);

  return (
    <div className='min-h-dvh bg-canvas text-card-ink'>
      <Header />
      <main className='mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[680px] flex-col px-5 py-8 sm:px-8 lg:py-12'>
        <BackLink href='/avalon-roles' />

        {roomPageStatus === 'loading' && (
          <section className='rounded-lg border border-card-border bg-card p-5 text-center shadow-md sm:p-7'>
            <p className='text-sm font-bold text-card-muted'>
              방 정보를 불러오는 중입니다.
            </p>
          </section>
        )}

        {roomPageStatus === 'error' && (
          <section className='rounded-lg border border-[#e2a7a1] bg-[#fff1ee] p-5 text-center shadow-md sm:p-7'>
            <p className='text-sm font-bold text-[#8f3a2f]'>{errorMessage}</p>
          </section>
        )}

        {roomPageStatus === 'ready' && roomState?.room.status === 'waiting' && (
          <WaitingRoom
            isHost={roomState.isHost}
            players={roomState.players}
            room={roomState.room}
            onGameStarted={getRoomState}
          />
        )}

        {roomPageStatus === 'ready' && roomState?.room.status === 'playing' && (
          <PlayingRoom roomCode={roomState.room.code} />
        )}
      </main>
      <Footer />
    </div>
  );
}
