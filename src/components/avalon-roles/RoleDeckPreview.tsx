import Badge from '@/components/ui/Badge';
import ErrorMessage from '@/components/ui/ErrorMessage';
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
    <section className='mb-8 border-t border-ink/10 pt-8'>
      <div className='mb-4 flex items-end justify-between gap-3'>
        <div>
          <h2 className='text-xl font-bold text-ink'>최종 역할 구성</h2>
          <p className='mt-1 text-sm text-ink-muted'>
            부족한 인원은 일반 역할로 자동 채워집니다.
          </p>
        </div>
        <span className='rounded-full bg-surface px-3 py-1 text-sm font-bold text-ink'>
          {roleDeck.length} / {playerCount}
        </span>
      </div>

      {isValid ? (
        <div className='flex flex-wrap gap-2'>
          {previewRoleIds.map((roleId) => {
            const role = AVALON_ROLE_CONFIGS[roleId];
            const count = roleCounts[roleId] ?? 0;

            return (
              <Badge
                key={roleId}
                tone={role.side === 'good' ? 'positive' : 'negative'}
                className='px-3 py-1.5 text-sm font-bold'
              >
                {role.name}
                {count > 1 && ` x${count}`}
              </Badge>
            );
          })}
        </div>
      ) : (
        <ErrorMessage>역할 구성을 고치면 미리보기가 표시됩니다.</ErrorMessage>
      )}
    </section>
  );
}
