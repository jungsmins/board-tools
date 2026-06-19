import { NormalExploreCard } from '@/types/cartographers';
import TerrainBlock from './TerrainBlock';
import ShapeBlock from './ShapeBlock';
import CoinImage from './CoinImage';

interface NomalCardContentProps {
  exploreCard: NormalExploreCard;
}

export default function NormalCardContent({
  exploreCard,
}: NomalCardContentProps) {
  const { shapes, terrains } = exploreCard;

  return (
    <>
      <div className='flex flex-1 gap-10'>
        {terrains.map((terrain) => {
          return <TerrainBlock key={terrain} terrain={terrain} />;
        })}
      </div>
      <div className='flex flex-1 gap-10'>
        {shapes.map(({ shape, hasCoin }, i) => {
          return (
            <ShapeBlock key={i} shape={shape} coin={hasCoin && <CoinImage />} />
          );
        })}
      </div>
    </>
  );
}
