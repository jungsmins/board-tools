import { RiftLandsCard } from '@/types/cartographers';
import TerrainBlock from './TerrainBlock';

export default function RiftLandsCardContent({
  exploreCard,
}: {
  exploreCard: RiftLandsCard;
}) {
  const { terrains } = exploreCard;

  return (
    <>
      <div className='flex flex-1 gap-10'>
        {terrains.map((terrain) => {
          return <TerrainBlock key={terrain} terrain={terrain} />;
        })}
      </div>
      <div className='flex flex-1 gap-10'>
        <div className='flex w-full items-center justify-center rounded-lg bg-[var(--color-cartographers-overlay)] gap-10'>
          <div className='h-10 w-10 border border-[var(--color-cartographers-grid-border)] bg-[var(--color-cartographers-grid)]'></div>
        </div>
      </div>
    </>
  );
}
