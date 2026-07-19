import BackLink from '@/components/avalon-roles/BackLink';
import WaitingRoom from '@/components/avalon-roles/WaitingRoom';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

const waitingPlayers = [
  { id: 'host', nickname: '방장', isHost: true },
  { id: 'player-1', nickname: '민수', isHost: false },
  { id: 'player-2', nickname: '지은', isHost: false },
];

const roomCode = 'A3K7';
const playerCount = 5;

export default function AvalonRolesWaitingRoomPage() {
  return (
    <div className='min-h-dvh bg-canvas text-card-ink'>
      <Header />

      <main className='mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[680px] flex-col px-5 py-8 sm:px-8 lg:py-12'>
        <BackLink href='/avalon-roles' />
        <WaitingRoom
          playerCount={playerCount}
          players={waitingPlayers}
          roomCode={roomCode}
        />
      </main>

      <Footer />
    </div>
  );
}
