'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Button from '../ui/Button';
import Input from '../ui/Input';
import Label from '../ui/Label';

import { joinAvalonRoom } from '@/lib/avalon-roles/api';
import ErrorMessage from '../ui/ErrorMessage';

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
  const [touched, setTouched] = useState({ code: false, nickname: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const roomCodeError =
    roomCode.length === ROOM_CODE_LENGTH ? '' : '코드는 4자리여야 합니다.';
  const NicknameError =
    nickname.trim().length >= 1 ? '' : '닉네임은 1자 이상이어야 합니다.';
  const visibleCodeError =
    touched.code || isSubmitted ? roomCodeError : undefined;
  const visibleNicknameError =
    touched.nickname || isSubmitted ? NicknameError : undefined;

  const handleBlurRoomCode = () => {
    setTouched({ ...touched, code: true });
  };

  const handleBlurNickname = () => {
    setTouched({ ...touched, nickname: true });
  };

  const handleChangeRoomCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCode(normalizeRoomCode(e.target.value));
  };

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitted(true);
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
    <form className='flex flex-col gap-4' noValidate onSubmit={handleSubmit}>
      <p className='mb-5 text-xl font-bold text-ink'>방 참가하기</p>
      <Label htmlFor='join-code' label='코드' />
      <Input
        id='join-code'
        type='text'
        value={roomCode}
        onChange={handleChangeRoomCode}
        onBlur={handleBlurRoomCode}
        maxLength={ROOM_CODE_LENGTH}
        placeholder='A3K7'
      />
      {visibleCodeError && <ErrorMessage>{visibleCodeError}</ErrorMessage>}
      <Label htmlFor='join-nickname' label='닉네임' />
      <Input
        id='join-nickname'
        type='text'
        value={nickname}
        onChange={handleChangeNickname}
        onBlur={handleBlurNickname}
        maxLength={NICKNAME_MAX_LENGTH}
        placeholder='이름'
      />
      {visibleNicknameError && (
        <ErrorMessage>{visibleNicknameError}</ErrorMessage>
      )}
      {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
      <Button
        type='submit'
        variant='primary'
        size='lg'
        className='w-full'
        disabled={isSubmitting}
      >
        {isSubmitting ? '참가중입니다.' : '참가하기'}
      </Button>
    </form>
  );
}
