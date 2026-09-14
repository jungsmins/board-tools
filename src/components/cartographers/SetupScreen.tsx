import { useCartographersStore } from '@/stores/cartographers';
import Button from '../ui/Button';
import GamePrepScreen from '../shared/GamePrepScreen';
import { getToolByHref } from '@/lib/tools';
import Image from 'next/image';
import {
  SEASON_IMAGES,
  SEASON_PLAYING_IMAGES,
} from '@/constants/cartographers';

const tool = getToolByHref('/cartographers');

export default function SetupScreen() {
  const startGame = useCartographersStore((s) => s.startGame);

  return (
    <GamePrepScreen tool={tool}>
      <Button
        onClick={startGame}
        variant='primary'
        size='lg'
        className='w-full'
      >
        시작하기
      </Button>

      <div
        className='pointer-events-none fixed inset-0 -z-50 opacity-0'
        aria-hidden
      >
        <Image src={SEASON_IMAGES.spring} alt='' fill sizes='100vw' priority />
        <Image
          src={SEASON_PLAYING_IMAGES.spring}
          alt=''
          fill
          sizes='100vw'
          priority
        />
      </div>
    </GamePrepScreen>
  );
}
