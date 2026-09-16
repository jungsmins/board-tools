import { DeckCard } from '@/types/cartographers';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCartographersStore } from '@/stores/cartographers';
import { prefetchImage } from '@/lib/prefetchImage';
import NormalCardContent from './NormalCardContent';
import AmbushCardContent from './AmbushCardContent';
import RuinsCardContent from './RuinsCardContent';
import RiftLandsCardContent from './RiftLandsCardContent';

interface ExploreSectionProps {
  exploreCard: DeckCard;
}

interface ImageLayer {
  id: string;
  name: string;
  src: string;
}

export default function ExploreSection({ exploreCard }: ExploreSectionProps) {
  const { name, type, id } = exploreCard;
  const cardImageSrc = `/cartographers_images/explore/${id}.jpg`;
  const [prevId, setPrevId] = useState(id);
  const [imageLayers, setImageLayers] = useState<ImageLayer[]>([
    { id, name, src: cardImageSrc },
  ]);

  if (id !== prevId) {
    setPrevId(id);
    setImageLayers((layers) => [
      ...layers.slice(-1),
      { id, name, src: cardImageSrc },
    ]);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setImageLayers((layers) => layers.slice(-1));
    }, 320);

    return () => clearTimeout(timer);
  }, [id]);

  const nextCardId = useCartographersStore((s) => s.deck[0]);

  useEffect(() => {
    if (!nextCardId) return;

    prefetchImage(`/cartographers_images/explore/${nextCardId}.jpg`);
  }, [nextCardId]);

  return (
    <section className='flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl'>
      <div className='relative flex-1 overflow-hidden'>
        {imageLayers.map((layer, index) => (
          <Image
            key={layer.id}
            alt={`${layer.name} 이미지`}
            src={layer.src}
            fill
            sizes='(min-width: 1024px) 33vw, 100vw'
            unoptimized
            className={`absolute inset-0 object-cover ${
              index === imageLayers.length - 1 && imageLayers.length > 1
                ? 'animate-card-image'
                : ''
            }`}
          />
        ))}
        <div className='absolute top-4 left-4 rounded-lg bg-cartographers-overlay px-3 py-2 shadow-lg'>
          <div className='text-xs font-semibold text-white'>탐험</div>
          <div className='text-2xl font-bold text-white'>{name}</div>
        </div>
      </div>
      <div className='flex flex-1 flex-col gap-6 border-t border-white/10 bg-black/80 p-6'>
        <div
          key={`${id}-content`}
          className='animate-card-content flex flex-1 flex-col gap-6'
        >
          {type === 'normal' && <NormalCardContent exploreCard={exploreCard} />}
          {type === 'ambush' && <AmbushCardContent exploreCard={exploreCard} />}
          {type === 'ruins' && <RuinsCardContent />}
          {type === 'rift_lands' && (
            <RiftLandsCardContent exploreCard={exploreCard} />
          )}
        </div>
      </div>
    </section>
  );
}
