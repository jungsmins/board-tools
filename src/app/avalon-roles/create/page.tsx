import Link from 'next/link';

import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import {
  AVALON_DEFAULT_SELECTED_ROLE_IDS,
  AVALON_PLAYER_COUNTS,
  AVALON_ROLE_CONFIGS,
  AVALON_SELECTABLE_ROLE_IDS,
  AVALON_TEAM_COMPOSITION,
} from '@/constants/avalonRoles';
import type { AvalonRoleId } from '@/types/avalonRoles';

const defaultSelectedRoleIds =
  AVALON_DEFAULT_SELECTED_ROLE_IDS as readonly AvalonRoleId[];

const selectableGoodRoleIds = AVALON_SELECTABLE_ROLE_IDS.filter(
  (roleId) => AVALON_ROLE_CONFIGS[roleId].side === 'good',
);

const selectableEvilRoleIds = AVALON_SELECTABLE_ROLE_IDS.filter(
  (roleId) => AVALON_ROLE_CONFIGS[roleId].side === 'evil',
);

export default function AvalonRolesCreatePage() {
  return (
    <div className='min-h-dvh bg-canvas text-card-ink'>
      <Header />

      <main className='mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[760px] flex-col px-5 py-8 sm:px-8 lg:py-12'>
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
            <p className='mb-2 text-sm font-bold text-card-muted'>방장 설정</p>
            <h1 className='text-3xl font-bold text-title sm:text-4xl'>
              방 만들기
            </h1>
          </div>

          <form>
            <fieldset className='mb-8'>
              <legend className='mb-4 text-xl font-bold text-card-ink'>
                인원수
              </legend>
              <div className='grid grid-cols-3 gap-2 sm:grid-cols-6'>
                {AVALON_PLAYER_COUNTS.map((playerCount) => {
                  const composition = AVALON_TEAM_COMPOSITION[playerCount];

                  return (
                    <label key={playerCount} className='block'>
                      <input
                        className='peer sr-only'
                        defaultChecked={playerCount === 5}
                        name='playerCount'
                        type='radio'
                        value={playerCount}
                      />
                      <span className='flex min-h-20 flex-col items-center justify-center rounded-lg border border-chip-border bg-white px-3 py-3 text-center transition peer-checked:border-[#2d1508] peer-checked:bg-[#2d1508] peer-checked:text-white'>
                        <span className='text-lg font-bold'>
                          {playerCount}명
                        </span>
                        <span className='mt-1 text-xs opacity-75'>
                          선 {composition.good} · 악 {composition.evil}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className='mb-8 border-t border-rule pt-8'>
              <legend className='mb-4 text-xl font-bold text-card-ink'>
                선 역할
              </legend>
              <div className='grid gap-3 sm:grid-cols-2'>
                {selectableGoodRoleIds.map((roleId) => {
                  const role = AVALON_ROLE_CONFIGS[roleId];

                  return (
                    <label key={role.id} className='block'>
                      <input
                        className='peer sr-only'
                        defaultChecked={defaultSelectedRoleIds.includes(role.id)}
                        name='selectedRoleIds'
                        type='checkbox'
                        value={role.id}
                      />
                      <span className='flex min-h-28 flex-col rounded-lg border border-chip-border bg-white p-4 transition peer-checked:border-[#2f8f5b] peer-checked:bg-[#eef8f2]'>
                        <span className='text-base font-bold'>{role.name}</span>
                        <span className='mt-2 text-sm leading-6 text-card-muted'>
                          {role.description}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className='mb-8 border-t border-rule pt-8'>
              <legend className='mb-4 text-xl font-bold text-card-ink'>
                악 역할
              </legend>
              <div className='grid gap-3 sm:grid-cols-2'>
                {selectableEvilRoleIds.map((roleId) => {
                  const role = AVALON_ROLE_CONFIGS[roleId];

                  return (
                    <label key={role.id} className='block'>
                      <input
                        className='peer sr-only'
                        defaultChecked={defaultSelectedRoleIds.includes(role.id)}
                        name='selectedRoleIds'
                        type='checkbox'
                        value={role.id}
                      />
                      <span className='flex min-h-28 flex-col rounded-lg border border-chip-border bg-white p-4 transition peer-checked:border-[#8f3a2f] peer-checked:bg-[#fff1ee]'>
                        <span className='text-base font-bold'>{role.name}</span>
                        <span className='mt-2 text-sm leading-6 text-card-muted'>
                          {role.description}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <Link
              href='/avalon-roles/A3K7'
              className='flex h-14 w-full items-center justify-center rounded-lg bg-[#2d1508] px-5 text-base font-bold text-white shadow-md transition hover:bg-[#482616]'
            >
              방 생성하기
            </Link>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
