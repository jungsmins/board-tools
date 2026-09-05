'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { joinAvalonRoom } from '@/lib/avalon-roles/api';

const ROOM_CODE_LENGTH = 4;
const NICKNAME_MAX_LENGTH = 12;

function normalizeRoomCode(value: string) {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, ROOM_CODE_LENGTH);
}

export default function JoinRoomForm() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [touchedFields, setTouchedFields] = useState({
    roomCode: false,
    nickname: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const roomCodeError =
    roomCode.length === ROOM_CODE_LENGTH ? '' : '방 코드는 4자리입니다.';
  const nicknameError = nickname.trim() ? '' : '닉네임을 입력해 주세요.';
  const canJoin = !roomCodeError && !nicknameError && !isSubmitting;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouchedFields({ roomCode: true, nickname: true });
    setSubmitError('');

    if (!canJoin) return;

    setIsSubmitting(true);

    try {
      const room = await joinAvalonRoom(roomCode, nickname.trim());

      if (!room?.roomCode) {
        throw new Error('방 참가 결과를 확인할 수 없습니다.');
      }

      router.push(`/avalon-roles/${room.roomCode}`);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : '방 참가 중 문제가 발생했습니다.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <p className='mb-5 text-xl font-bold text-ink'>방 참가하기</p>

      <label className='mb-5 block'>
        <span className='mb-2 block text-sm font-bold text-ink'>
          방 코드
        </span>
        <input
          aria-describedby='room-code-message'
          aria-invalid={Boolean(touchedFields.roomCode && roomCodeError)}
          autoCapitalize='characters'
          autoComplete='off'
          className='h-13 w-full rounded-lg border border-ink/10 bg-white px-4 text-center text-lg font-bold uppercase tracking-[0.2em] text-ink outline-none transition placeholder:tracking-normal placeholder:text-ink-muted focus:border-[#2d1508] focus:ring-2 focus:ring-[#2d1508]/15 aria-invalid:border-[#8f3a2f] aria-invalid:ring-2 aria-invalid:ring-[#8f3a2f]/15'
          inputMode='text'
          maxLength={ROOM_CODE_LENGTH}
          name='roomCode'
          onBlur={() =>
            setTouchedFields((current) => ({ ...current, roomCode: true }))
          }
          onChange={(event) => setRoomCode(normalizeRoomCode(event.target.value))}
          placeholder='A3K7'
          type='text'
          value={roomCode}
        />
        <span
          id='room-code-message'
          className={`mt-2 block text-sm font-bold ${
            touchedFields.roomCode && roomCodeError
              ? 'text-[#8f3a2f]'
              : 'text-ink-muted'
          }`}
        >
          {touchedFields.roomCode && roomCodeError
            ? roomCodeError
            : `${roomCode.length} / ${ROOM_CODE_LENGTH}`}
        </span>
      </label>

      <label className='mb-6 block'>
        <span className='mb-2 block text-sm font-bold text-ink'>
          닉네임
        </span>
        <input
          aria-describedby='nickname-message'
          aria-invalid={Boolean(touchedFields.nickname && nicknameError)}
          autoComplete='nickname'
          className='h-13 w-full rounded-lg border border-ink/10 bg-white px-4 text-base text-ink outline-none transition placeholder:text-ink-muted focus:border-[#2d1508] focus:ring-2 focus:ring-[#2d1508]/15 aria-invalid:border-[#8f3a2f] aria-invalid:ring-2 aria-invalid:ring-[#8f3a2f]/15'
          maxLength={NICKNAME_MAX_LENGTH}
          name='nickname'
          onBlur={() =>
            setTouchedFields((current) => ({ ...current, nickname: true }))
          }
          onChange={(event) =>
            setNickname(event.target.value.slice(0, NICKNAME_MAX_LENGTH))
          }
          placeholder='이름'
          type='text'
          value={nickname}
        />
        <span
          id='nickname-message'
          className={`mt-2 block text-sm font-bold ${
            touchedFields.nickname && nicknameError
              ? 'text-[#8f3a2f]'
              : 'text-ink-muted'
          }`}
        >
          {touchedFields.nickname && nicknameError
            ? nicknameError
            : `${nickname.length} / ${NICKNAME_MAX_LENGTH}`}
        </span>
      </label>

      {submitError && (
        <p className='mb-5 rounded-lg border border-[#e2a7a1] bg-[#fff1ee] px-4 py-3 text-sm font-bold text-[#8f3a2f]'>
          {submitError}
        </p>
      )}

      <button
        disabled={!canJoin}
        type='submit'
        className='flex h-13 w-full items-center justify-center rounded-lg bg-[#2f8f5b] px-5 text-base font-bold text-white shadow-md transition hover:bg-[#237348] focus-visible:ring-2 focus-visible:ring-[#2f8f5b]/30 disabled:cursor-not-allowed disabled:bg-ink-muted disabled:shadow-none'
      >
        {isSubmitting ? '참가 중' : '참가하기'}
      </button>
    </form>
  );
}
