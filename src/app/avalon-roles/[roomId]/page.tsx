import BackLink from '@/components/avalon-roles/BackLink';
import RoleRevealCard from '@/components/avalon-roles/RoleRevealCard';
import WaitingRoom from '@/components/avalon-roles/WaitingRoom';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { getAvalonVisiblePlayers } from '@/lib/avalonRoles';
import {
  AVALON_MOCK_ASSIGNED_PLAYERS,
  AVALON_MOCK_CURRENT_PLAYER_ID,
  AVALON_MOCK_PLAYER_COUNT,
  AVALON_MOCK_ROOM_CODE,
  AVALON_MOCK_ROOM_STATUS,
  AVALON_MOCK_WAITING_PLAYERS,
} from '@/mocks/avalonRoles';

export default function AvalonRolesWaitingRoomPage() {
  const currentPlayer = AVALON_MOCK_ASSIGNED_PLAYERS.find(
    (player) => player.id === AVALON_MOCK_CURRENT_PLAYER_ID,
  );
  const visiblePlayers = getAvalonVisiblePlayers(
    AVALON_MOCK_CURRENT_PLAYER_ID,
    AVALON_MOCK_ASSIGNED_PLAYERS,
  );

  return (
    <div className='min-h-dvh bg-canvas text-card-ink'>
      <Header />

      <main className='mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[680px] flex-col px-5 py-8 sm:px-8 lg:py-12'>
        <BackLink href='/avalon-roles' />
        {AVALON_MOCK_ROOM_STATUS === 'waiting' && (
          <WaitingRoom
            playerCount={AVALON_MOCK_PLAYER_COUNT}
            players={AVALON_MOCK_WAITING_PLAYERS}
            roomCode={AVALON_MOCK_ROOM_CODE}
          />
        )}
        {AVALON_MOCK_ROOM_STATUS === 'playing' &&
          currentPlayer?.assignedRoleId && (
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
