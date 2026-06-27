import type { ReactNode } from 'react';

import { TerrainType } from '@/types/cartographers';

type TerrainMarkType = TerrainType | 'monster';

const TERRAIN_MARKS: Record<
  TerrainMarkType,
  { viewBox: string; paths: ReactNode }
> = {
  forest: {
    viewBox: '0 0 48 48',
    paths: (
      <>
        <circle
          cx='24'
          cy='17'
          r='12'
          stroke='currentColor'
          strokeWidth='3'
          fill='none'
        />
        <line
          x1='24'
          y1='29'
          x2='24'
          y2='44'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinecap='round'
        />
      </>
    ),
  },

  village: {
    viewBox: '0 0 48 48',
    paths: (
      <>
        <path
          d='M24 3L41 20H7L24 3Z'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinejoin='round'
          fill='none'
        />
        <rect
          x='10'
          y='20'
          width='28'
          height='25'
          rx='1'
          stroke='currentColor'
          strokeWidth='3'
          fill='none'
        />
      </>
    ),
  },

  farm: {
    viewBox: '0 0 48 48',
    paths: (
      <>
        <line
          x1='2'
          y1='20'
          x2='28'
          y2='46'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinecap='round'
        />
        <line
          x1='2'
          y1='2'
          x2='46'
          y2='46'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinecap='round'
        />
        <line
          x1='20'
          y1='2'
          x2='46'
          y2='28'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinecap='round'
        />
      </>
    ),
  },

  water: {
    viewBox: '0 0 48 48',
    paths: (
      <>
        <path
          d='M4 12 Q13 4 22 12 Q31 20 40 12'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinecap='round'
          fill='none'
        />
        <path
          d='M4 24 Q13 16 22 24 Q31 32 40 24'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinecap='round'
          fill='none'
        />
        <path
          d='M4 36 Q13 28 22 36 Q31 44 40 36'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinecap='round'
          fill='none'
        />
      </>
    ),
  },

  monster: {
    viewBox: '0 0 48 48',
    paths: (
      <>
        <path
          d='M11,21 L7,5 L17,15 M37,21 L41,5 L31,15'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinejoin='round'
          strokeLinecap='round'
          fill='none'
        />
        <circle
          cx='24'
          cy='28'
          r='15'
          stroke='currentColor'
          strokeWidth='3'
          fill='none'
        />
        <line
          x1='16'
          y1='24'
          x2='21'
          y2='28'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinecap='round'
        />
        <line
          x1='32'
          y1='24'
          x2='27'
          y2='28'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinecap='round'
        />
      </>
    ),
  },
};

export default function TerrainMark({ terrain }: { terrain: TerrainMarkType }) {
  const { viewBox, paths } = TERRAIN_MARKS[terrain];
  return (
    <svg viewBox={viewBox} className='h-10 w-10 text-white'>
      {paths}
    </svg>
  );
}
