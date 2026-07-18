'use client';

import {
  AVALON_PLAYER_COUNTS,
  AVALON_ROLE_CONFIGS,
  AVALON_SELECTABLE_ROLE_IDS,
} from '@/constants/avalonRoles';
import { getAvalonTeamComposition } from '@/lib/avalonRoles';
import { useAvalonRolesStore } from '@/stores/avalonRoles';
import type { AvalonPlayerCount, AvalonRoleId } from '@/types/avalonRoles';

const selectableGoodRoleIds = AVALON_SELECTABLE_ROLE_IDS.filter(
  (roleId) => AVALON_ROLE_CONFIGS[roleId].side === 'good',
);

const selectableEvilRoleIds = AVALON_SELECTABLE_ROLE_IDS.filter(
  (roleId) => AVALON_ROLE_CONFIGS[roleId].side === 'evil',
);

function isAvalonPlayerCount(value: number): value is AvalonPlayerCount {
  return (AVALON_PLAYER_COUNTS as readonly number[]).includes(value);
}

function getSelectedRoleCount(roleIds: AvalonRoleId[], side: 'good' | 'evil') {
  return roleIds.filter((roleId) => AVALON_ROLE_CONFIGS[roleId].side === side)
    .length;
}

export default function CreateRoomForm() {
  const {
    playerCount,
    selectedRoleIds,
    setPlayerCount,
    toggleRole,
    getValidation,
  } = useAvalonRolesStore();
  const composition = getAvalonTeamComposition(playerCount);
  const validation = getValidation();
  const selectedGoodCount = getSelectedRoleCount(selectedRoleIds, 'good');
  const selectedEvilCount = getSelectedRoleCount(selectedRoleIds, 'evil');

  const handlePlayerCountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nextPlayerCount = Number(event.target.value);

    if (isAvalonPlayerCount(nextPlayerCount)) {
      setPlayerCount(nextPlayerCount);
    }
  };

  return (
    <form>
      <fieldset className='mb-8'>
        <legend className='mb-4 text-xl font-bold text-card-ink'>
          인원수
        </legend>
        <div className='grid grid-cols-3 gap-2 sm:grid-cols-6'>
          {AVALON_PLAYER_COUNTS.map((count) => {
            const countComposition = getAvalonTeamComposition(count);

            return (
              <label key={count} className='block'>
                <input
                  checked={playerCount === count}
                  className='peer sr-only'
                  name='playerCount'
                  onChange={handlePlayerCountChange}
                  type='radio'
                  value={count}
                />
                <span className='flex min-h-20 flex-col items-center justify-center rounded-lg border border-chip-border bg-white px-3 py-3 text-center transition peer-checked:border-[#2d1508] peer-checked:bg-[#2d1508] peer-checked:text-white'>
                  <span className='text-lg font-bold'>{count}명</span>
                  <span className='mt-1 text-xs opacity-75'>
                    선 {countComposition.good} · 악 {countComposition.evil}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className='mb-8 border-t border-rule pt-8'>
        <div className='mb-4 flex items-end justify-between gap-3'>
          <legend className='text-xl font-bold text-card-ink'>선 역할</legend>
          <span className='text-sm font-bold text-card-muted'>
            {selectedGoodCount} / {composition.good}
          </span>
        </div>
        <div className='grid gap-3 sm:grid-cols-2'>
          {selectableGoodRoleIds.map((roleId) => {
            const role = AVALON_ROLE_CONFIGS[roleId];

            return (
              <label key={role.id} className='block'>
                <input
                  checked={selectedRoleIds.includes(role.id)}
                  className='peer sr-only'
                  name='selectedRoleIds'
                  onChange={() => toggleRole(role.id)}
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
        <div className='mb-4 flex items-end justify-between gap-3'>
          <legend className='text-xl font-bold text-card-ink'>악 역할</legend>
          <span className='text-sm font-bold text-card-muted'>
            {selectedEvilCount} / {composition.evil}
          </span>
        </div>
        <div className='grid gap-3 sm:grid-cols-2'>
          {selectableEvilRoleIds.map((roleId) => {
            const role = AVALON_ROLE_CONFIGS[roleId];

            return (
              <label key={role.id} className='block'>
                <input
                  checked={selectedRoleIds.includes(role.id)}
                  className='peer sr-only'
                  name='selectedRoleIds'
                  onChange={() => toggleRole(role.id)}
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

      {(validation.errors.length > 0 || validation.warnings.length > 0) && (
        <div className='mb-6 grid gap-2'>
          {validation.errors.map((error) => (
            <p
              key={error}
              className='rounded-lg border border-[#e2a7a1] bg-[#fff1ee] px-4 py-3 text-sm font-bold text-[#8f3a2f]'
            >
              {error}
            </p>
          ))}
          {validation.warnings.map((warning) => (
            <p
              key={warning}
              className='rounded-lg border border-[#ead18d] bg-[#fff9e8] px-4 py-3 text-sm font-bold text-[#765b13]'
            >
              {warning}
            </p>
          ))}
        </div>
      )}

      <button
        disabled={!validation.isValid}
        type='button'
        className='flex h-14 w-full items-center justify-center rounded-lg bg-[#2d1508] px-5 text-base font-bold text-white shadow-md transition hover:bg-[#482616] disabled:cursor-not-allowed disabled:bg-card-muted disabled:shadow-none'
      >
        방 생성하기
      </button>
    </form>
  );
}
