import { useCartographersStore } from '@/stores/cartographers';
import Button from '../ui/Button';
import GamePrepScreen from '../shared/GamePrepScreen';
import { getToolByHref } from '@/lib/tools';

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
    </GamePrepScreen>
  );
}
