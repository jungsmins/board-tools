import { NormalExploreCard } from '@/types/cartographers';
import TerrainBlock from './TerrainBlock';
import ShapeBlock from './ShapeBlock';
import CoinImage from './CoinImage';

interface NormalCardContentProps {
  exploreCard: NormalExploreCard;
}

export default function NormalCardContent({
  exploreCard,
}: NormalCardContentProps) {
  const { shapes, terrains } = exploreCard;

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
      <div className='relative flex flex-1 items-center'>
        {shapes.map(({ shape, hasCoin }, i) => {
          return (
            <div key={i} className='flex flex-1 justify-center px-5'>
              <ShapeBlock
                shape={shape}
                hasCoin={hasCoin}
                coin={hasCoin ? <CoinImage /> : undefined}
              />
            </div>
          );
        })}
        {shapes.length > 1 && (
          <div className='pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/15' />
        )}
      </div>
      <div className='pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/10' />
    </div>
  );
}
