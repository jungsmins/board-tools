'use client';

import { useEffect, useRef, useState } from 'react';

import { AVALON_ROLE_CONFIGS } from '@/constants/avalonRoles';
import { getMyAvalonRole } from '@/lib/avalon-roles/api';
import type { GetMyAvalonRoleResult } from '@/lib/avalon-roles/api';
import type { AvalonRoleSide } from '@/types/avalonRoles';

interface PlayingRoomProps {
  roomCode: string;
}

const sideLabels: Record<AvalonRoleSide, string> = {
  good: '선',
  evil: '악',
};

const sideStyles: Record<
  AvalonRoleSide,
  {
    badge: string;
    panel: string;
  }
> = {
  good: {
    badge: 'bg-[#eef8f2] text-[#237348]',
    panel: 'border-[#2f8f5b] bg-[#eef8f2]',
  },
  evil: {
    badge: 'bg-[#fff1ee] text-[#8f3a2f]',
    panel: 'border-[#8f3a2f] bg-[#fff1ee]',
  },
};

type VisiblePlayerSignal = 'evil' | 'candidate';

const visiblePlayerSignalStyles: Record<
  VisiblePlayerSignal,
  {
    badge: string;
    item: string;
    label: string;
  }
> = {
  evil: {
    badge: 'bg-[#fff1ee] text-[#8f3a2f]',
    item: 'border-[#e2a7a1] bg-[#fff7f5]',
    label: '악',
  },
  candidate: {
    badge: 'bg-[#fff6db] text-[#7a5a12]',
    item: 'border-[#e7cc73] bg-[#fffaf0]',
    label: '후보',
  },
};

function getVisiblePlayerSignal(roleId: GetMyAvalonRoleResult['roleId']) {
  if (roleId === 'percival') {
    return {
      description: '멀린 또는 모르가나입니다. 둘은 구분할 수 없습니다.',
      emptyMessage: '확인할 후보가 없습니다.',
      signal: 'candidate' as const,
      title: '확인 가능한 후보',
    };
  }

  if (roleId === 'merlin') {
    return {
      description: '모드레드를 제외한 악의 진영입니다.',
      emptyMessage: '멀린에게 보이는 악이 없습니다.',
      signal: 'evil' as const,
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
      signal: 'evil' as const,
      title: '확인 가능한 악',
    };
  }

  return null;
}

export default function PlayingRoom({ roomCode }: PlayingRoomProps) {
  const [myRole, setMyRole] = useState<GetMyAvalonRoleResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isHidden, setIsHidden] = useState(true);
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
  const styles = role ? sideStyles[role.side] : null;
  const visiblePlayerSignal = myRole
    ? getVisiblePlayerSignal(myRole.roleId)
    : null;
  const visiblePlayerStyles = visiblePlayerSignal
    ? visiblePlayerSignalStyles[visiblePlayerSignal.signal]
    : null;

  return (
    <section className='rounded-lg border border-card-border bg-card p-5 shadow-md sm:p-7'>
      <div className='mb-8'>
        <p className='mb-2 text-sm font-bold text-[#2f8f5b]'>게임 진행</p>
        <h1 className='text-3xl font-bold text-title sm:text-4xl'>
          게임 진행 중
        </h1>
      </div>

      <section>
        <div className='mb-4'>
          <h2 className='text-xl font-bold text-card-ink'>내 역할</h2>
          <p className='mt-1 text-sm text-card-muted'>
            다른 사람이 화면을 보지 않도록 확인 후 다시 가려 주세요.
          </p>
        </div>

        {errorMessage ? (
          <div className='rounded-lg border border-[#e2a7a1] bg-[#fff1ee] px-4 py-5 text-sm font-bold text-[#8f3a2f] shadow-sm'>
            {errorMessage}
          </div>
        ) : isLoading || !myRole || !role || !styles ? (
          <div className='flex min-h-40 items-center justify-center rounded-lg border border-chip-border bg-white shadow-sm'>
            <p className='text-sm font-bold text-card-muted'>
              역할 정보를 불러오는 중입니다.
            </p>
          </div>
        ) : (
          <>
            <div
              className={`mb-4 rounded-lg border p-6 shadow-sm sm:p-8 ${
                isHidden ? 'border-chip-border bg-white' : styles.panel
              }`}
            >
              {isHidden ? (
                <div className='flex min-h-72 flex-col items-center justify-center text-center'>
                  <p className='mb-3 text-4xl font-black text-title sm:text-5xl'>
                    역할 가림
                  </p>
                  <p className='max-w-sm text-sm font-bold leading-6 text-card-muted'>
                    역할 확인하기를 누르면 배정된 역할과 확인 가능한 대상이 표시됩니다.
                  </p>
                </div>
              ) : (
                <div className='flex min-h-72 flex-col justify-center'>
                  <div className='mb-6 flex items-center justify-between gap-3'>
                    <p className='text-sm font-bold text-card-muted'>
                      배정된 역할
                    </p>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-bold ${styles.badge}`}
                    >
                      {sideLabels[role.side]}
                    </span>
                  </div>
                  <p className='mb-5 text-5xl font-black text-title sm:text-6xl'>
                    {role.name}
                  </p>
                  <p className='text-base font-bold leading-7 text-card-ink'>
                    {role.description}
                  </p>
                </div>
              )}
            </div>

            {!isHidden && visiblePlayerSignal && visiblePlayerStyles && (
              <section className='mb-4 rounded-lg border border-chip-border bg-white p-4 shadow-sm'>
                <div className='mb-3 flex items-start justify-between gap-3'>
                  <div>
                    <p className='text-sm font-bold text-card-ink'>
                      {visiblePlayerSignal.title}
                    </p>
                    <p className='mt-1 text-xs font-bold leading-5 text-card-muted'>
                      {visiblePlayerSignal.description}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${visiblePlayerStyles.badge}`}
                  >
                    {visiblePlayerStyles.label}
                  </span>
                </div>

                {myRole.visiblePlayers.length === 0 ? (
                  <div className='rounded-lg bg-chip px-4 py-4 text-center text-sm font-bold text-card-muted'>
                    {visiblePlayerSignal.emptyMessage}
                  </div>
                ) : (
                  <ul className='grid gap-2'>
                    {myRole.visiblePlayers.map((player) => (
                      <li
                        key={player.id}
                        className={`flex min-h-12 items-center gap-3 rounded-lg border px-3 ${visiblePlayerStyles.item}`}
                      >
                        <span className='flex h-8 w-8 items-center justify-center rounded-full bg-[#2d1508] text-sm font-bold text-white'>
                          {player.seatNumber}
                        </span>
                        <span className='min-w-0 flex-1 font-bold text-card-ink'>
                          {player.nickname}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-bold ${visiblePlayerStyles.badge}`}
                        >
                          {visiblePlayerStyles.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            <button
              type='button'
              className='flex h-14 w-full items-center justify-center rounded-lg bg-[#2d1508] px-5 text-base font-bold text-white shadow-md transition hover:bg-[#482616] focus-visible:ring-2 focus-visible:ring-[#2d1508]/30'
              onClick={() => setIsHidden((current) => !current)}
            >
              {isHidden ? '역할 확인하기' : '역할 가리기'}
            </button>
          </>
        )}
      </section>
    </section>
  );
}
