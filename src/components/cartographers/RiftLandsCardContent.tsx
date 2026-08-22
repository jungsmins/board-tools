import { RiftLandsCard } from '@/types/cartographers';
import TerrainBlock from './TerrainBlock';
import OverlayPanel from './OverlayPanel';

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
        <OverlayPanel className='gap-10'>
          <div className='h-10 w-10 border border-cartographers-grid-border bg-cartographers-grid'></div>
        </OverlayPanel>
      </div>
    </>
  );
}
