'use client';

import { AVALON_ROLE_CONFIGS } from '@/constants/avalonRoles';
import type { AvalonRoleId, AvalonRoleSide } from '@/types/avalonRoles';

interface RoleOptionCardProps {
  checked: boolean;
  onChange: () => void;
  roleId: AvalonRoleId;
  side: AvalonRoleSide;
}

const sideStyles: Record<AvalonRoleSide, string> = {
  good:
    "after:border-[#2f8f5b]/50 peer-checked:border-[#2f8f5b] peer-checked:bg-[#eef8f2] peer-checked:after:bg-[#2f8f5b] peer-focus-visible:ring-[#2f8f5b]/25",
  evil:
    "after:border-[#8f3a2f]/50 peer-checked:border-[#8f3a2f] peer-checked:bg-[#fff1ee] peer-checked:after:bg-[#8f3a2f] peer-focus-visible:ring-[#8f3a2f]/25",
};

export default function RoleOptionCard({
  checked,
  onChange,
  roleId,
  side,
}: RoleOptionCardProps) {
  const role = AVALON_ROLE_CONFIGS[roleId];

  return (
    <label className='block'>
      <input
        checked={checked}
        className='peer sr-only'
        name='selectedRoleIds'
        onChange={onChange}
        type='checkbox'
        value={role.id}
      />
      <span
        className={`relative flex min-h-28 flex-col rounded-lg border border-chip-border bg-white p-4 pr-12 transition after:absolute after:right-4 after:top-4 after:h-5 after:w-5 after:rounded-full after:border after:bg-white after:content-[''] peer-focus-visible:ring-2 ${sideStyles[side]}`}
      >
        <span className='text-base font-bold'>{role.name}</span>
        <span className='mt-2 text-sm leading-6 text-card-muted'>
          {role.description}
        </span>
      </span>
    </label>
  );
}
