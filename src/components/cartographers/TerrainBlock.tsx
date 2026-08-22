import { TERRAIN_BG } from '@/constants/cartographers';
import { TerrainType } from '@/types/cartographers';

import OverlayPanel from './OverlayPanel';
import TerrainMark from './TerrainMark';

type TerrainBlockType = TerrainType | 'monster';

export default function TerrainBlock({
  terrain,
}: {
  terrain: TerrainBlockType;
}) {
  return (
    <OverlayPanel>
      <div
        className={`flex items-center justify-center h-16 w-16 rounded-lg ${TERRAIN_BG[terrain]}`}
      >
        <TerrainMark terrain={terrain} />
      </div>
    </OverlayPanel>
  );
}
