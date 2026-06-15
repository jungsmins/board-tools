import { Dispatch, SetStateAction } from 'react';
import Footer from '../shared/Footer';
import Header from '../shared/Header';
import Button from '../ui/Button';

import { GamePhase } from '@/types/cartographers';

interface Props {
  onNextPhase: Dispatch<SetStateAction<GamePhase>>;
}

export default function SetupScreen({ onNextPhase }: Props) {
  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <div className='flex-1 flex flex-col items-center mt-20'>
        <div className='text-4xl font-bold mb-40'>지도제작자들</div>
        <Button
          onClick={() => {
            onNextPhase('season_splash');
          }}
          variant='primary'
          size='lg'
        >
          시작하기
        </Button>
      </div>
      <Footer />
    </div>
  );
}
