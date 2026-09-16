import { useEffect } from 'react';
import Image from 'next/image';
import { Season } from '@/types/cartographers';
import { SEASON_IMAGES } from '@/constants/cartographers';
import { useCartographersStore } from '@/stores/cartographers';
import { prefetchImage } from '@/lib/prefetchImage';

interface SeasonSplashProps {
  season: Season;
}

const SEASON_LABELS: Record<Season, { ko: string; en: string }> = {
  spring: { ko: '봄', en: 'Spring' },
  summer: { ko: '여름', en: 'Summer' },
  autumn: { ko: '가을', en: 'Autumn' },
  winter: { ko: '겨울', en: 'Winter' },
};

export default function SeasonSplash({ season }: SeasonSplashProps) {
  const onSplashComplete = useCartographersStore((s) => s.onSplashComplete);
  const label = SEASON_LABELS[season];

  useEffect(() => {
    const timer = setTimeout(() => {
      onSplashComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onSplashComplete]);

  const firstCardId = useCartographersStore((s) => s.deck[0]);

  useEffect(() => {
    if (!firstCardId) return;

    prefetchImage(`/cartographers_images/explore/${firstCardId}.jpg`);
  }, [firstCardId]);

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      <Image
        fill
        alt={`${label.ko} 계절 이미지`}
        src={SEASON_IMAGES[season]}
        sizes='100vw'
        className='object-cover animate-season-image'
        priority
        unoptimized
      />
      <div className='absolute inset-x-0 top-16 flex justify-center'>
        <div className='animate-season-title text-center text-white drop-shadow-[0_4px_16px_rgb(0_0_0_/_60%)]'>
          <div className='font-display text-7xl font-bold'>{label.ko}</div>
          <div className='mt-2 text-4xl font-semibold'>{label.en}</div>
        </div>
      </div>
    </div>
  );
}
