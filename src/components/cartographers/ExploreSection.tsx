import { DeckCard } from '@/types/cartographers';
import Image from 'next/image';
import NormalCardContent from './NormalCardContent';
import AmbushCardContent from './AmbushCardContent';
import RuinsCardContent from './RuinsCardContent';
import RiftLandsCardContent from './RiftLandsCardContent';

interface ExploreSectionProps {
  exploreCard: DeckCard;
}

export default function ExploreSection({ exploreCard }: ExploreSectionProps) {
  const { name, type, id } = exploreCard;
  const cardImageSrc = `/cartographers_images/explore/${id}.png`;

  return (
    <section className='relative w-full flex-[2] items-center justify-center overflow-hidden'>
      <Image
        alt={`${name} 이미지`}
        src={cardImageSrc}
        fill
        sizes='(min-width: 1024px) 66vw, 100vw'
        className='object-cover'
      />
      <div
        key={`${id}-content`}
        className='absolute flex h-full w-full flex-col gap-10 p-6 animate-card-content'
      >
        <div className='self-start rounded-lg bg-cartographers-overlay px-5 py-4 shadow-lg'>
          <div className='text-xl font-semibold text-white'>탐험</div>
          <div className='text-5xl font-bold text-white'>{name}</div>
        </div>
        {type === 'normal' && <NormalCardContent exploreCard={exploreCard} />}
        {type === 'ambush' && <AmbushCardContent exploreCard={exploreCard} />}
        {type === 'ruins' && <RuinsCardContent />}
        {type === 'rift_lands' && (
          <RiftLandsCardContent exploreCard={exploreCard} />
        )}
      </div>
    </section>
  );
}
