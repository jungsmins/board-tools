'use client';

import { useState } from 'react';

import { AVALON_ROLE_CONFIGS } from '@/constants/avalonRoles';
import type { AvalonRoleId, AvalonRoleSide } from '@/types/avalonRoles';
import VisiblePlayersList from '@/components/avalon-roles/VisiblePlayersList';

interface VisiblePlayer {
  id: string;
  nickname: string;
}

interface RoleRevealCardProps {
  roleId: AvalonRoleId;
  visiblePlayers: VisiblePlayer[];
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

export default function RoleRevealCard({
  roleId,
  visiblePlayers,
}: RoleRevealCardProps) {
  const [isHidden, setIsHidden] = useState(false);
  const role = AVALON_ROLE_CONFIGS[roleId];
  const styles = sideStyles[role.side];

  return (
    <section className='rounded-lg border border-card-border bg-card p-5 shadow-md sm:p-7'>
      <div className='mb-8'>
        <p className='mb-2 text-sm font-bold text-[#2f8f5b]'>역할 확인</p>
        <h1 className='text-3xl font-bold text-title sm:text-4xl'>
          내 역할
        </h1>
      </div>

      <div
        className={`mb-8 rounded-lg border p-5 shadow-sm ${
          isHidden ? 'border-chip-border bg-white' : styles.panel
        }`}
      >
        {isHidden ? (
          <div className='flex min-h-40 flex-col items-center justify-center text-center'>
            <p className='mb-2 text-3xl font-black text-title'>역할 가림</p>
            <p className='text-sm font-bold text-card-muted'>
              다시 확인하기 전까지 역할 정보가 보이지 않습니다.
            </p>
          </div>
        ) : (
          <>
            <div className='mb-4 flex items-center justify-between gap-3'>
              <p className='text-sm font-bold text-card-muted'>배정된 역할</p>
              <span
                className={`rounded-full px-3 py-1 text-sm font-bold ${styles.badge}`}
              >
                {sideLabels[role.side]}
              </span>
            </div>
            <p className='mb-4 text-4xl font-black text-title sm:text-5xl'>
              {role.name}
            </p>
            <p className='text-sm leading-6 text-card-ink'>
              {role.description}
            </p>
          </>
        )}
      </div>

      {!isHidden && (
        <section className='mb-8'>
          <div className='mb-4'>
            <h2 className='text-xl font-bold text-card-ink'>
              확인 가능한 대상
            </h2>
            <p className='mt-1 text-sm text-card-muted'>
              역할 능력으로 확인되는 참가자입니다.
            </p>
          </div>
          <VisiblePlayersList players={visiblePlayers} />
        </section>
      )}

      <button
        type='button'
        className='flex h-14 w-full items-center justify-center rounded-lg bg-[#2d1508] px-5 text-base font-bold text-white shadow-md transition hover:bg-[#482616] focus-visible:ring-2 focus-visible:ring-[#2d1508]/30'
        onClick={() => setIsHidden((current) => !current)}
      >
        {isHidden ? '다시 확인하기' : '역할 가리기'}
      </button>
    </section>
  );
}
