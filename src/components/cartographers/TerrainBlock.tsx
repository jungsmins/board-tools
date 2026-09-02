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
    <div
      className={`flex h-16 w-16 items-center justify-center rounded-lg ${TERRAIN_BG[terrain]}`}
    >
      <TerrainMark terrain={terrain} />
    </div>
  );
}
