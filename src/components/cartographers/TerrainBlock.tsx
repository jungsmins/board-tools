import { TERRAIN_BG } from '@/constants/cartographers';
import { TerrainType } from '@/types/cartographers';

type TerrainBlockType = TerrainType | 'monster';

export default function TerrainBlock({
  terrain,
}: {
  terrain: TerrainBlockType;
}) {
  return (
    <div className='flex w-full items-center justify-center rounded-lg bg-[var(--color-cartographers-overlay)]'>
      <div className={`h-16 w-16 rounded-lg ${TERRAIN_BG[terrain]}`}></div>
    </div>
  );
}
