'use client';

import { Check } from 'lucide-react';
import clsx from 'clsx';

import { AVALON_ROLE_CONFIGS } from '@/constants/avalonRoles';
import type { AvalonRoleId, AvalonRoleSide } from '@/types/avalonRoles';

interface RoleOptionCardProps {
  checked: boolean;
  onChange: () => void;
  roleId: AvalonRoleId;
  side: AvalonRoleSide;
}

const sideStyles: Record<
  AvalonRoleSide,
  { card: string; indicatorChecked: string; indicatorUnchecked: string }
> = {
  good: {
    card: 'peer-checked:border-[var(--color-avalon-good)] peer-checked:bg-[var(--color-avalon-good-bg)] peer-focus-visible:ring-[var(--color-avalon-good)]/25',
    indicatorChecked:
      'border-[var(--color-avalon-good)] bg-[var(--color-avalon-good)] text-white',
    indicatorUnchecked: 'border-[var(--color-avalon-good)]/50 bg-white',
  },
  evil: {
    card: 'peer-checked:border-[var(--color-avalon-evil)] peer-checked:bg-[var(--color-avalon-evil-bg)] peer-focus-visible:ring-[var(--color-avalon-evil)]/25',
    indicatorChecked:
      'border-[var(--color-avalon-evil)] bg-[var(--color-avalon-evil)] text-white',
    indicatorUnchecked: 'border-[var(--color-avalon-evil)]/50 bg-white',
  },
};

export default function RoleOptionCard({
  checked,
  onChange,
  roleId,
  side,
}: RoleOptionCardProps) {
  const role = AVALON_ROLE_CONFIGS[roleId];
  const styles = sideStyles[side];

  return (
    <label className='relative block cursor-pointer'>
      <input
        checked={checked}
        className='peer sr-only'
        name='selectedRoleIds'
        onChange={onChange}
        type='checkbox'
        value={role.id}
      />
      <span
        className={clsx(
          'flex min-h-28 flex-col rounded-lg border border-ink/10 bg-white p-4 pr-12 transition peer-focus-visible:ring-2',
          styles.card,
        )}
      >
        <span className='text-base font-bold'>{role.name}</span>
        <span className='mt-2 text-sm leading-6 text-ink-muted'>
          {role.description}
        </span>
      </span>
      <span
        className={clsx(
          'absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border transition',
          checked ? styles.indicatorChecked : styles.indicatorUnchecked,
        )}
      >
        {checked && <Check className='h-3.5 w-3.5' strokeWidth={3} />}
      </span>
    </label>
  );
}
