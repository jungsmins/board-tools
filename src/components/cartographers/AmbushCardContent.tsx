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
    <>
      <div className='flex flex-1 gap-10'>
        <TerrainBlock terrain='monster' />
      </div>
      <div className='flex flex-1 gap-10'>
        <ShapeBlock
          shape={shape}
          direction={<DirectionArrow direction={direction} />}
        />
      </div>
    </>
  );
}
