import { TERRAIN_BG } from '@/constants/cartographers';
import { TerrainType } from '@/types/cartographers';

import TerrainMark from './TerrainMark';

type TerrainBlockType = TerrainType | 'monster';

export default function TerrainBlock({
  terrain,
}: {
  terrain: TerrainBlockType;
}) {
  return (
    <div className='flex w-full items-center justify-center rounded-lg bg-cartographers-overlay'>
      <div
        className={`flex items-center justify-center h-16 w-16 rounded-lg ${TERRAIN_BG[terrain]}`}
      >
        <TerrainMark terrain={terrain} />
      </div>
    </div>
  );
}
