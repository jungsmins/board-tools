import { useEffect } from 'react';
import Image from 'next/image';
import { Season } from '@/types/cartographers';
import spring_image from '../../../public/cartographers_images/season/spring.png';
import { useCartographersStore } from '@/stores/cartographers';

interface props {
  season: Season;
}

export default function SeasonSplash({ season }: props) {
  const { onSplashComplete } = useCartographersStore();

  useEffect(() => {
    setTimeout(() => {
      onSplashComplete();
    }, 3000);
  }, []);

  return (
    <div className='w-full h-screen'>
      {season === 'spring' && <Image fill alt='봄 이미지' src={spring_image} />}
    </div>
  );
}
