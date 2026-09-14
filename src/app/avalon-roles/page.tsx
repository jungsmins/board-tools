'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import GamePrepScreen from '@/components/shared/GamePrepScreen';
import JoinRoomModal from '@/components/avalon-roles/JoinRoomModal';
import { getToolByHref } from '@/lib/tools';

const tool = getToolByHref('/avalon-roles');

export default function AvalonRolesPage() {
  const [isJoinRoomModalOpen, setIsJoinRoomModalOpen] =
    useState<boolean>(false);

  function handleModalOpen() {
    setIsJoinRoomModalOpen(true);
  }

  function handleModalClose() {
    setIsJoinRoomModalOpen(false);
  }

  return (
    <>
      <GamePrepScreen tool={tool}>
        <Link href='/avalon-roles/create' className='flex-1'>
          <Button variant='primary' size='lg' className='w-full'>
            방 만들기
          </Button>
        </Link>
        <div className='flex-1'>
          <Button
            onClick={handleModalOpen}
            variant='brand'
            size='lg'
            className='w-full'
          >
            참가하기
          </Button>
        </div>
      </GamePrepScreen>
      {isJoinRoomModalOpen && <JoinRoomModal onClose={handleModalClose} />}
    </>
  );
}
