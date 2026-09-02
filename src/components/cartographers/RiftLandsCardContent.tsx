import { RiftLandsCard } from '@/types/cartographers';
import TerrainBlock from './TerrainBlock';

export default function RiftLandsCardContent({
  exploreCard,
}: {
  exploreCard: RiftLandsCard;
}) {
  const { terrains } = exploreCard;

  return (
    <div className='relative flex flex-1 flex-col'>
      <div className='flex flex-1 items-center justify-evenly'>
        {terrains.map((terrain) => {
          return (
            <div key={terrain} className='flex justify-center px-5'>
              <TerrainBlock terrain={terrain} />
            </div>
          );
        })}
      </div>
      <div className='flex flex-1 items-center justify-center'>
        <div className='h-8 w-8 border border-cartographers-grid-border bg-cartographers-grid'></div>
      </div>
      <div className='pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/10' />
    </div>
  );
}
