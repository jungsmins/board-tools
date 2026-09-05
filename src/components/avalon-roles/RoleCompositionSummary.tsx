import { AVALON_ROLE_CONFIGS } from '@/constants/avalonRoles';
import {
  buildAvalonRoleDeck,
  getAvalonRoleCounts,
} from '@/lib/avalon-roles/avalonRoles';
import type {
  AvalonPlayerCount,
  AvalonRoleId,
  AvalonRoleSide,
} from '@/types/avalonRoles';

interface RoleCompositionSummaryProps {
  playerCount: AvalonPlayerCount;
  selectedRoleIds: AvalonRoleId[];
}

const sideLabels: Record<AvalonRoleSide, string> = {
  good: '선',
  evil: '악',
};

const sideStyles: Record<
  AvalonRoleSide,
  {
    badge: string;
    count: string;
    item: string;
  }
> = {
  good: {
    badge: 'bg-[#eef8f2] text-[#237348]',
    count: 'text-[#237348]',
    item: 'border-[#b9dec8] bg-[#f8fcfa]',
  },
  evil: {
    badge: 'bg-[#fff1ee] text-[#8f3a2f]',
    count: 'text-[#8f3a2f]',
    item: 'border-[#e9c0bb] bg-[#fffafa]',
  },
};

export default function RoleCompositionSummary({
  playerCount,
  selectedRoleIds,
}: RoleCompositionSummaryProps) {
  const roleDeck = buildAvalonRoleDeck(playerCount, selectedRoleIds);
  const roleCounts = getAvalonRoleCounts(roleDeck);
  const roleIds = Object.keys(roleCounts) as AvalonRoleId[];
  const rolesBySide = {
    good: roleIds.filter((roleId) => AVALON_ROLE_CONFIGS[roleId].side === 'good'),
    evil: roleIds.filter((roleId) => AVALON_ROLE_CONFIGS[roleId].side === 'evil'),
  };

  return (
    <section className='mb-8 border-t border-ink/10 pt-8'>
      <div className='mb-4 flex items-end justify-between gap-3'>
        <div>
          <h2 className='text-xl font-bold text-ink'>이번 판 역할</h2>
          <p className='mt-1 text-sm text-ink-muted'>
            공개된 역할 구성입니다.
          </p>
        </div>
        <span className='rounded-full bg-surface px-3 py-1 text-sm font-bold text-ink'>
          {roleDeck.length} / {playerCount}
        </span>
      </div>

      <div className='grid gap-3 sm:grid-cols-2'>
        {(['good', 'evil'] as const).map((side) => {
          const styles = sideStyles[side];
          const sideRoleIds = rolesBySide[side];
          const sideCount = sideRoleIds.reduce(
            (count, roleId) => count + (roleCounts[roleId] ?? 0),
            0,
          );

          return (
            <section key={side} className='rounded-lg border border-ink/10 bg-white p-4 shadow-sm'>
              <div className='mb-3 flex items-center justify-between gap-3'>
                <span className={`rounded-full px-3 py-1 text-sm font-bold ${styles.badge}`}>
                  {sideLabels[side]} 진영
                </span>
                <span className={`text-sm font-bold ${styles.count}`}>
                  {sideCount}명
                </span>
              </div>

              <ul className='grid gap-2'>
                {sideRoleIds.map((roleId) => {
                  const role = AVALON_ROLE_CONFIGS[roleId];
                  const count = roleCounts[roleId] ?? 0;

                  return (
                    <li
                      key={roleId}
                      className={`flex min-h-12 items-center justify-between gap-3 rounded-lg border px-3 py-2 ${styles.item}`}
                    >
                      <span className='text-sm font-bold text-ink'>
                        {role.name}
                      </span>
                      <span className='shrink-0 text-sm font-black text-ink'>
                        x{count}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}
