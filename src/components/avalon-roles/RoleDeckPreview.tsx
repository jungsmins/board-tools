import { AVALON_ROLE_CONFIGS } from '@/constants/avalonRoles';
import {
  buildAvalonRoleDeck,
  getAvalonRoleCounts,
} from '@/lib/avalon-roles/avalonRoles';
import type { AvalonPlayerCount, AvalonRoleId } from '@/types/avalonRoles';

interface RoleDeckPreviewProps {
  isValid: boolean;
  playerCount: AvalonPlayerCount;
  selectedRoleIds: AvalonRoleId[];
}

export default function RoleDeckPreview({
  isValid,
  playerCount,
  selectedRoleIds,
}: RoleDeckPreviewProps) {
  const roleDeck = isValid
    ? buildAvalonRoleDeck(playerCount, selectedRoleIds)
    : [];
  const roleCounts = getAvalonRoleCounts(roleDeck);
  const previewRoleIds = Object.keys(roleCounts) as AvalonRoleId[];

  return (
    <section className='mb-8 border-t border-rule pt-8'>
      <div className='mb-4 flex items-end justify-between gap-3'>
        <div>
          <h2 className='text-xl font-bold text-card-ink'>최종 역할 구성</h2>
          <p className='mt-1 text-sm text-card-muted'>
            부족한 인원은 일반 역할로 자동 채워집니다.
          </p>
        </div>
        <span className='rounded-full bg-chip px-3 py-1 text-sm font-bold text-card-ink'>
          {roleDeck.length} / {playerCount}
        </span>
      </div>

      {isValid ? (
        <div className='flex flex-wrap gap-2'>
          {previewRoleIds.map((roleId) => {
            const role = AVALON_ROLE_CONFIGS[roleId];
            const count = roleCounts[roleId] ?? 0;
            const className =
              role.side === 'good'
                ? 'border-[#2f8f5b] bg-[#eef8f2] text-[#237348]'
                : 'border-[#8f3a2f] bg-[#fff1ee] text-[#8f3a2f]';

            return (
              <span
                key={roleId}
                className={`rounded-full border px-3 py-1.5 text-sm font-bold ${className}`}
              >
                {role.name}
                {count > 1 && ` x${count}`}
              </span>
            );
          })}
        </div>
      ) : (
        <div className='rounded-lg border border-[#e2a7a1] bg-[#fff1ee] px-4 py-4 text-sm font-bold text-[#8f3a2f]'>
          역할 구성을 고치면 미리보기가 표시됩니다.
        </div>
      )}
    </section>
  );
}
