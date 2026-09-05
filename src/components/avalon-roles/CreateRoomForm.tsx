'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  AVALON_PLAYER_COUNTS,
  AVALON_ROLE_CONFIGS,
  AVALON_SELECTABLE_ROLE_IDS,
} from '@/constants/avalonRoles';
import { createAvalonRoom } from '@/lib/avalon-roles/api';
import {
  createDefaultAvalonRoleSelection,
  getAvalonTeamComposition,
  normalizeAvalonRoleSelection,
  validateAvalonRoleSelection,
} from '@/lib/avalon-roles/avalonRoles';
import RoleDeckPreview from '@/components/avalon-roles/RoleDeckPreview';
import RoleOptionCard from '@/components/avalon-roles/RoleOptionCard';
import type { AvalonPlayerCount, AvalonRoleId } from '@/types/avalonRoles';

const NICKNAME_MAX_LENGTH = 12;

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
  const router = useRouter();
  const [playerCount, setPlayerCount] = useState<AvalonPlayerCount>(5);
  const [selectedRoleIds, setSelectedRoleIds] = useState<AvalonRoleId[]>(() =>
    createDefaultAvalonRoleSelection(),
  );
  const [nickname, setNickname] = useState('');
  const [isNicknameTouched, setIsNicknameTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const composition = getAvalonTeamComposition(playerCount);
  const validation = validateAvalonRoleSelection(playerCount, selectedRoleIds);
  const selectedGoodCount = getSelectedRoleCount(selectedRoleIds, 'good');
  const selectedEvilCount = getSelectedRoleCount(selectedRoleIds, 'evil');
  const nicknameError = nickname.trim() ? '' : '닉네임을 입력해 주세요.';
  const canCreate = validation.isValid && !nicknameError && !isSubmitting;

  const handlePlayerCountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nextPlayerCount = Number(event.target.value);

    if (isAvalonPlayerCount(nextPlayerCount)) {
      setPlayerCount(nextPlayerCount);
    }
  };

  const toggleRole = (roleId: AvalonRoleId) => {
    if (
      !(AVALON_SELECTABLE_ROLE_IDS as readonly AvalonRoleId[]).includes(roleId)
    ) {
      return;
    }

    setSelectedRoleIds((currentRoleIds) => {
      const isSelected = currentRoleIds.includes(roleId);
      const nextRoleIds = isSelected
        ? currentRoleIds.filter((currentRoleId) => currentRoleId !== roleId)
        : [...currentRoleIds, roleId];

      return normalizeAvalonRoleSelection(nextRoleIds);
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsNicknameTouched(true);
    setSubmitError('');

    if (!canCreate) return;

    setIsSubmitting(true);

    try {
      const room = await createAvalonRoom(
        playerCount,
        selectedRoleIds,
        nickname.trim(),
      );

      if (!room?.roomCode) {
        throw new Error('방 생성 결과를 확인할 수 없습니다.');
      }

      router.push(`/avalon-roles/${room.roomCode}`);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : '방 생성 중 문제가 발생했습니다.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <label className='mb-8 block'>
        <span className='mb-2 block text-sm font-bold text-ink'>
          방장 닉네임
        </span>
        <input
          aria-describedby='host-nickname-message'
          aria-invalid={Boolean(isNicknameTouched && nicknameError)}
          autoComplete='nickname'
          className='h-13 w-full rounded-lg border border-ink/10 bg-white px-4 text-base text-ink outline-none transition placeholder:text-ink-muted focus:border-[#2d1508] focus:ring-2 focus:ring-[#2d1508]/15 aria-invalid:border-[#8f3a2f] aria-invalid:ring-2 aria-invalid:ring-[#8f3a2f]/15'
          maxLength={NICKNAME_MAX_LENGTH}
          name='hostNickname'
          onBlur={() => setIsNicknameTouched(true)}
          onChange={(event) =>
            setNickname(event.target.value.slice(0, NICKNAME_MAX_LENGTH))
          }
          placeholder='이름'
          type='text'
          value={nickname}
        />
        <span
          id='host-nickname-message'
          className={`mt-2 block text-sm font-bold ${
            isNicknameTouched && nicknameError
              ? 'text-[#8f3a2f]'
              : 'text-ink-muted'
          }`}
        >
          {isNicknameTouched && nicknameError
            ? nicknameError
            : `${nickname.length} / ${NICKNAME_MAX_LENGTH}`}
        </span>
      </label>

      <fieldset className='mb-8'>
        <legend className='mb-4 text-xl font-bold text-ink'>인원수</legend>
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
                <span className='flex min-h-20 flex-col items-center justify-center rounded-lg border border-ink/10 bg-white px-3 py-3 text-center transition peer-checked:border-[#2d1508] peer-checked:bg-[#2d1508] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#2d1508]/25'>
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

      <fieldset className='mb-8 border-t border-ink/10 pt-8'>
        <div className='mb-4 flex items-end justify-between gap-3'>
          <legend className='text-xl font-bold text-ink'>선 역할</legend>
          <span className='rounded-full bg-[#eef8f2] px-3 py-1 text-sm font-bold text-[#237348]'>
            {selectedGoodCount} / {composition.good}
          </span>
        </div>
        <div className='grid gap-3 sm:grid-cols-2'>
          {selectableGoodRoleIds.map((roleId) => {
            return (
              <RoleOptionCard
                key={roleId}
                checked={selectedRoleIds.includes(roleId)}
                onChange={() => toggleRole(roleId)}
                roleId={roleId}
                side='good'
              />
            );
          })}
        </div>
      </fieldset>

      <fieldset className='mb-8 border-t border-ink/10 pt-8'>
        <div className='mb-4 flex items-end justify-between gap-3'>
          <legend className='text-xl font-bold text-ink'>악 역할</legend>
          <span className='rounded-full bg-[#fff1ee] px-3 py-1 text-sm font-bold text-[#8f3a2f]'>
            {selectedEvilCount} / {composition.evil}
          </span>
        </div>
        <div className='grid gap-3 sm:grid-cols-2'>
          {selectableEvilRoleIds.map((roleId) => {
            return (
              <RoleOptionCard
                key={roleId}
                checked={selectedRoleIds.includes(roleId)}
                onChange={() => toggleRole(roleId)}
                roleId={roleId}
                side='evil'
              />
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

      <RoleDeckPreview
        isValid={validation.isValid}
        playerCount={playerCount}
        selectedRoleIds={selectedRoleIds}
      />

      {submitError && (
        <p className='mb-6 rounded-lg border border-[#e2a7a1] bg-[#fff1ee] px-4 py-3 text-sm font-bold text-[#8f3a2f]'>
          {submitError}
        </p>
      )}

      <button
        disabled={!canCreate}
        type='submit'
        className='flex h-14 w-full items-center justify-center rounded-lg bg-[#2d1508] px-5 text-base font-bold text-white shadow-md transition hover:bg-[#482616] focus-visible:ring-2 focus-visible:ring-[#2d1508]/30 disabled:cursor-not-allowed disabled:bg-ink-muted disabled:shadow-none'
      >
        {isSubmitting ? '방 생성 중' : '방 생성하기'}
      </button>
    </form>
  );
}
