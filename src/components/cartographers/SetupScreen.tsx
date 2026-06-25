import { useCartographersStore } from '@/stores/cartographers';
import Footer from '../shared/Footer';
import Header from '../shared/Header';
import Button from '../ui/Button';

export default function SetupScreen() {
  const { startGame } = useCartographersStore();

  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <div className='flex-1 flex flex-col items-center mt-20'>
        <div className='text-4xl font-bold mb-40'>지도제작자들</div>
        <Button onClick={startGame} variant='primary' size='lg'>
          시작하기
        </Button>
      </div>
      <Footer />
    </div>
  );
}
