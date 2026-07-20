import BackLink from '@/components/avalon-roles/BackLink';
import RoleRevealCard from '@/components/avalon-roles/RoleRevealCard';
import WaitingRoom from '@/components/avalon-roles/WaitingRoom';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { getAvalonVisiblePlayers } from '@/lib/avalonRoles';
import type { AvalonPlayer, AvalonRoomStatus } from '@/types/avalonRoles';

const waitingPlayers = [
  { id: 'host', nickname: '방장', isHost: true },
  { id: 'player-1', nickname: '민수', isHost: false },
  { id: 'player-2', nickname: '지은', isHost: false },
];

const roomCode = 'A3K7';
const playerCount = 5;
const roomStatus: AvalonRoomStatus = 'playing';
const currentPlayerId = 'host';
const assignedPlayers: AvalonPlayer[] = [
  {
    id: 'host',
    roomId: roomCode,
    nickname: '방장',
    assignedRoleId: 'merlin',
    visiblePlayerIds: ['player-1', 'player-2'],
    joinedAt: '',
  },
  {
    id: 'player-1',
    roomId: roomCode,
    nickname: '민수',
    assignedRoleId: 'assassin',
    visiblePlayerIds: ['player-2'],
    joinedAt: '',
  },
  {
    id: 'player-2',
    roomId: roomCode,
    nickname: '지은',
    assignedRoleId: 'minion',
    visiblePlayerIds: ['player-1'],
    joinedAt: '',
  },
];

export default function AvalonRolesWaitingRoomPage() {
  const currentPlayer = assignedPlayers.find(
    (player) => player.id === currentPlayerId,
  );
  const visiblePlayers = getAvalonVisiblePlayers(
    currentPlayerId,
    assignedPlayers,
  );

  return (
    <div className='min-h-dvh bg-canvas text-card-ink'>
      <Header />

      <main className='mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[680px] flex-col px-5 py-8 sm:px-8 lg:py-12'>
        <BackLink href='/avalon-roles' />
        {roomStatus === 'waiting' && (
          <WaitingRoom
            playerCount={playerCount}
            players={waitingPlayers}
            roomCode={roomCode}
          />
        )}
        {roomStatus === 'playing' && currentPlayer?.assignedRoleId && (
          <RoleRevealCard
            roleId={currentPlayer.assignedRoleId}
            visiblePlayers={visiblePlayers}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
