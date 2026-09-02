import { AmbushCard } from '@/types/cartographers';
import TerrainBlock from './TerrainBlock';
import ShapeBlock from './ShapeBlock';
import DirectionArrow from './DirectionArrow';

export default function AmbushCardContent({
  exploreCard,
}: {
  exploreCard: AmbushCard;
}) {
  const { shape, direction } = exploreCard;

  return (
    <div className='relative flex flex-1 flex-col'>
      <div className='flex flex-1 items-center justify-evenly'>
        <TerrainBlock terrain='monster' />
      </div>
      <div className='flex flex-1 items-center justify-evenly'>
        <ShapeBlock
          shape={shape}
          direction={<DirectionArrow direction={direction} />}
        />
      </div>
      <div className='pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/10' />
    </div>
  );
}
