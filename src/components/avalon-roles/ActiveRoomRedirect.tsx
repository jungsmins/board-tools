'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMyActiveAvalonRoom } from '@/lib/avalon-roles/api';

export default function ActiveRoomRedirect() {
  const router = useRouter();

  useEffect(() => {
    const getMyActiveRoom = async () => {
      const activeRoom = await getMyActiveAvalonRoom();

      if (!activeRoom) return;

      router.replace(`/avalon-roles/${activeRoom.roomCode}`);
    };

    getMyActiveRoom();
  }, [router]);

  return null;
}
