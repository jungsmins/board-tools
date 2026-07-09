import type { TerraformingMarsResourceType } from '@/types/terraformingMars';

type ResourceIconProps = {
  type: TerraformingMarsResourceType;
};

const ICON_CLASS =
  'h-6 w-6 shrink-0 landscape:h-6 landscape:w-6 lg:h-11 lg:w-11 lg:landscape:h-9 lg:landscape:w-9 xl:h-12 xl:w-12';

export default function ResourceIcon({ type }: ResourceIconProps) {
  switch (type) {
    case 'megacredits':
      return (
        <svg viewBox='0 0 48 48' aria-hidden='true' className={ICON_CLASS}>
          <rect
            x='7'
            y='7'
            width='34'
            height='34'
            rx='4'
            fill='#f4b739'
            stroke='#8b4a12'
            strokeWidth='3'
          />
          <text
            x='24'
            y='30'
            fill='#9c5515'
            fontSize='18'
            fontWeight='900'
            textAnchor='middle'
          >
            C
          </text>
        </svg>
      );
    case 'steel':
      return (
        <svg viewBox='0 0 48 48' aria-hidden='true' className={ICON_CLASS}>
          <rect
            x='8'
            y='8'
            width='32'
            height='32'
            rx='4'
            fill='#9a775c'
            stroke='#4d3423'
            strokeWidth='3'
          />
          <path
            d='M15 16h18M17 16v16M31 16v16M15 32h18'
            stroke='#3f2b20'
            strokeLinecap='round'
            strokeWidth='4'
          />
        </svg>
      );
    case 'titanium':
      return (
        <svg viewBox='0 0 48 48' aria-hidden='true' className={ICON_CLASS}>
          <rect
            x='8'
            y='8'
            width='32'
            height='32'
            rx='4'
            fill='#6d7782'
            stroke='#303942'
            strokeWidth='3'
          />
          <path
            d='m24 13 4 8 9 1-6.5 6 1.5 9-8-4.5-8 4.5 1.5-9-6.5-6 9-1z'
            fill='#ffe35a'
            stroke='#3b4148'
            strokeLinejoin='round'
            strokeWidth='2'
          />
        </svg>
      );
    case 'plants':
      return (
        <svg viewBox='0 0 48 48' aria-hidden='true' className={ICON_CLASS}>
          <rect
            x='7'
            y='7'
            width='34'
            height='34'
            rx='4'
            fill='#72bd48'
            stroke='#245b24'
            strokeWidth='3'
          />
          <path
            d='M15 31c14-1 19-10 20-18-10 1-18 5-20 18Z'
            fill='#1e7d3a'
          />
          <path
            d='M16 31c5-5 10-8 17-11'
            stroke='#e4f7c7'
            strokeLinecap='round'
            strokeWidth='3'
          />
        </svg>
      );
    case 'energy':
      return (
        <svg viewBox='0 0 48 48' aria-hidden='true' className={ICON_CLASS}>
          <rect
            x='7'
            y='7'
            width='34'
            height='34'
            rx='4'
            fill='#7d2b8f'
            stroke='#3f1650'
            strokeWidth='3'
          />
          <path
            d='M29 11 15 27h9l-4 10 13-16h-8z'
            fill='#fff4e7'
            stroke='#fff4e7'
            strokeLinejoin='round'
            strokeWidth='2'
          />
        </svg>
      );
    case 'heat':
      return (
        <svg viewBox='0 0 48 48' aria-hidden='true' className={ICON_CLASS}>
          <rect
            x='7'
            y='7'
            width='34'
            height='34'
            rx='4'
            fill='#d94a30'
            stroke='#782114'
            strokeWidth='3'
          />
          <path
            d='M16 35c-2-6 3-9 3-15 3 3 4 6 3 10 4-4 3-10 8-16 6 8 6 15 2 20-4 4-11 5-16 1Z'
            fill='#ffd74d'
          />
        </svg>
      );
  }
}
