'use client';

import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { AVALON_ROLE_CONFIGS } from '@/constants/avalonRoles';
import { getMyAvalonRole } from '@/lib/avalon-roles/api';
import type { GetMyAvalonRoleResult } from '@/lib/avalon-roles/api';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EndOrLeaveRoomButton from './EndOrLeaveRoomButton';
import RoleRevealCard from './RoleRevealCard';
import type { VisiblePlayerInfo } from './RoleRevealCard';

interface PlayingRoomProps {
  roomCode: string;
  isHost: boolean;
}

function getVisiblePlayerInfo(
  roleId: GetMyAvalonRoleResult['roleId'],
): VisiblePlayerInfo | null {
  if (roleId === 'percival') {
    return {
      description: '멀린 또는 모르가나입니다. 둘은 구분할 수 없습니다.',
      emptyMessage: '확인할 후보가 없습니다.',
      signal: 'candidate',
      title: '확인 가능한 후보',
    };
  }

  if (roleId === 'merlin') {
    return {
      description: '모드레드를 제외한 악의 진영입니다.',
      emptyMessage: '멀린에게 보이는 악이 없습니다.',
      signal: 'evil',
      title: '확인 가능한 악',
    };
  }

  if (
    roleId === 'minion' ||
    roleId === 'assassin' ||
    roleId === 'mordred' ||
    roleId === 'morgana'
  ) {
    return {
      description: '오베론을 제외한 같은 악의 진영입니다.',
      emptyMessage: '확인할 같은 악이 없습니다.',
      signal: 'evil',
      title: '확인 가능한 악',
    };
  }

  return null;
}

export default function PlayingRoom({ roomCode, isHost }: PlayingRoomProps) {
  const [myRole, setMyRole] = useState<GetMyAvalonRoleResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    const getMyRole = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const data = await getMyAvalonRole(roomCode);

        if (!isMountedRef.current) return;

        if (!data) {
          setMyRole(null);
          setErrorMessage('내 역할 정보를 찾을 수 없습니다.');
          return;
        }

        setMyRole(data);
      } catch (error) {
        if (!isMountedRef.current) return;

        setMyRole(null);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : '내 역할을 불러오지 못했습니다.',
        );
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    };

    getMyRole();

    return () => {
      isMountedRef.current = false;
    };
  }, [roomCode]);

  const role = myRole ? AVALON_ROLE_CONFIGS[myRole.roleId] : null;
  const visiblePlayerInfo = myRole ? getVisiblePlayerInfo(myRole.roleId) : null;

  return (
    <div className='flex flex-1 flex-col'>
      <div
        className={clsx(
          'flex flex-1 items-center justify-center px-5 py-8',
          isHost && 'pb-28',
        )}
      >
        {errorMessage ? (
          <ErrorMessage className='px-4 py-5'>{errorMessage}</ErrorMessage>
        ) : isLoading || !myRole || !role ? (
          <p className='text-sm font-bold text-ink-muted'>
            역할 정보를 불러오는 중입니다.
          </p>
        ) : (
          <div className='w-full max-w-[300px]'>
            <RoleRevealCard
              isFlipped={isFlipped}
              onToggle={() => setIsFlipped((current) => !current)}
              role={role}
              visiblePlayerInfo={visiblePlayerInfo}
              visiblePlayers={myRole.visiblePlayers}
            />
          </div>
        )}
      </div>

      {isHost && (
        <div className='fixed inset-x-0 bottom-0 z-10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]'>
          <EndOrLeaveRoomButton
            fullWidth
            isHost={isHost}
            roomCode={roomCode}
            variant='danger'
          />
        </div>
      )}
    </div>
  );
}
