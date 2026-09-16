'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import clsx from 'clsx';

import { getAvalonRoomState } from '@/lib/avalon-roles/api';
import { supabase } from '@/lib/supabase/client';
import BackLink from '@/components/avalon-roles/BackLink';
import PlayingRoom from '@/components/avalon-roles/PlayingRoom';
import WaitingRoom from '@/components/avalon-roles/WaitingRoom';
import Card from '@/components/ui/Card';
import ErrorMessage from '@/components/ui/ErrorMessage';
import type { AvalonRoomState } from '@/types/avalonRoles';

type RoomPageStatus = 'loading' | 'error' | 'ready';

export default function AvalonRolesWaitingRoomPage() {
  const params = useParams<{ roomCode: string }>();
  const router = useRouter();
  const [roomState, setRoomState] = useState<AvalonRoomState | null>(null);
  const [roomPageStatus, setRoomPageStatus] =
    useState<RoomPageStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const isMountedRef = useRef(false);
  const roomDbId = roomState?.room.id;

  const getRoomState = useCallback(
    async (options?: { showLoading?: boolean }) => {
      if (options?.showLoading ?? true) {
        setRoomPageStatus('loading');
      }
      setErrorMessage('');

      try {
        const data = await getAvalonRoomState(params.roomCode);

        if (!isMountedRef.current) return;

        if (!data) {
          setRoomState(null);
          setErrorMessage('이 브라우저의 참가 기록을 찾을 수 없습니다.');
          setRoomPageStatus('error');
          return;
        }

        if (data.room.status === 'ended') {
          router.replace('/avalon-roles');
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
    },
    [params.roomCode, router],
  );

  useEffect(() => {
    isMountedRef.current = true;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    getRoomState({ showLoading: true });

    return () => {
      isMountedRef.current = false;
    };
  }, [getRoomState]);

  useEffect(() => {
    if (roomPageStatus !== 'ready' || !roomDbId) return;

    const channel = supabase
      .channel(`avalon-room:${roomDbId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'avalon_players',
          filter: `room_id=eq.${roomDbId}`,
          select: ['id', 'room_id'],
        },
        () => {
          getRoomState({ showLoading: false });
        },
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'avalon_players',
          select: ['id'],
        },
        () => {
          getRoomState({ showLoading: false });
        },
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'avalon_rooms',
          filter: `id=eq.${roomDbId}`,
          select: ['id', 'status'],
        },
        () => {
          getRoomState({ showLoading: false });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomPageStatus, roomDbId, getRoomState, router]);

  const isWaitingRoom =
    roomPageStatus === 'ready' && roomState?.room.status === 'waiting';

  return (
    <div
      className={clsx(
        'min-h-dvh text-ink',
        isWaitingRoom ? 'bg-brand-400' : 'bg-canvas',
      )}
    >
      <main className='mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[680px] flex-col px-5 py-8 sm:px-8 lg:py-12'>
        {(roomPageStatus === 'loading' || roomPageStatus === 'error') && (
          <BackLink href='/avalon-roles' />
        )}

        {roomPageStatus === 'loading' && (
          <Card padding='lg' className='text-center'>
            <p className='text-sm font-bold text-ink-muted'>
              방 정보를 불러오는 중입니다.
            </p>
          </Card>
        )}

        {roomPageStatus === 'error' && (
          <ErrorMessage className='p-5 text-center sm:p-7'>
            {errorMessage}
          </ErrorMessage>
        )}

        {isWaitingRoom && roomState && (
          <WaitingRoom
            isHost={roomState.isHost}
            players={roomState.players}
            room={roomState.room}
            onGameStarted={getRoomState}
          />
        )}

        {roomPageStatus === 'ready' && roomState?.room.status === 'playing' && (
          <PlayingRoom
            roomCode={roomState.room.code}
            isHost={roomState.isHost}
          />
        )}
      </main>
    </div>
  );
}
