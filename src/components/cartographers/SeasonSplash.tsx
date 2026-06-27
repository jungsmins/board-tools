import { useEffect } from 'react';
import Image from 'next/image';
import { Season } from '@/types/cartographers';
import spring from '../../../public/cartographers_images/season/spring.png';
import summer from '../../../public/cartographers_images/season/summer.png';
import autumn from '../../../public/cartographers_images/season/autumn.png';
import winter from '../../../public/cartographers_images/season/winter.png';
import { useCartographersStore } from '@/stores/cartographers';

interface props {
  season: Season;
}

export default function SeasonSplash({ season }: props) {
  const { onSplashComplete } = useCartographersStore();
  const SEASON_IMAGES = { spring, summer, autumn, winter };

  useEffect(() => {
    const timer = setTimeout(() => {
      onSplashComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onSplashComplete]);

  return (
    <div className='w-full h-screen'>
      <Image fill alt='계절 이미지' src={SEASON_IMAGES[season]} />
    </div>
  );
}
