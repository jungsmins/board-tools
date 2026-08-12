import {
  AVALON_DEFAULT_SELECTED_ROLE_IDS,
  AVALON_ROLE_CONFIGS,
  AVALON_SELECTABLE_ROLE_IDS,
  AVALON_TEAM_COMPOSITION,
} from '@/constants/avalonRoles';
import type {
  AvalonPlayerCount,
  AvalonRoleId,
  AvalonRoleValidationResult,
  AvalonTeamComposition,
} from '@/types/avalonRoles';

export function getAvalonTeamComposition(
  playerCount: AvalonPlayerCount,
): AvalonTeamComposition {
  return AVALON_TEAM_COMPOSITION[playerCount];
}

export function createDefaultAvalonRoleSelection(): AvalonRoleId[] {
  return [...AVALON_DEFAULT_SELECTED_ROLE_IDS];
}

export function normalizeAvalonRoleSelection(
  roleIds: AvalonRoleId[],
): AvalonRoleId[] {
  return roleIds.filter(
    (roleId, index) =>
      (AVALON_SELECTABLE_ROLE_IDS as readonly AvalonRoleId[]).includes(
        roleId,
      ) &&
      roleIds.indexOf(roleId) === index,
  );
}

export function validateAvalonRoleSelection(
  playerCount: AvalonPlayerCount,
  roleIds: AvalonRoleId[],
): AvalonRoleValidationResult {
  const composition = getAvalonTeamComposition(playerCount);
  const selectedRoleIds = normalizeAvalonRoleSelection(roleIds);
  const errors: string[] = [];
  const warnings: string[] = [];
  const selectedGoodCount = selectedRoleIds.filter(
    (roleId) => AVALON_ROLE_CONFIGS[roleId].side === 'good',
  ).length;
  const selectedEvilCount = selectedRoleIds.filter(
    (roleId) => AVALON_ROLE_CONFIGS[roleId].side === 'evil',
  ).length;

  if (selectedGoodCount > composition.good) {
    errors.push(`선 역할이 너무 많습니다. 최대 ${composition.good}명입니다.`);
  }

  if (selectedEvilCount > composition.evil) {
    errors.push(`악 역할이 너무 많습니다. 최대 ${composition.evil}명입니다.`);
  }

  if (selectedRoleIds.includes('percival') && !selectedRoleIds.includes('merlin')) {
    errors.push('퍼시발은 멀린이 있어야 사용할 수 있습니다.');
  }

  if (selectedRoleIds.includes('morgana') && !selectedRoleIds.includes('percival')) {
    warnings.push('모르가나는 퍼시발이 있을 때 의미가 커집니다.');
  }

  if (selectedRoleIds.includes('merlin') && !selectedRoleIds.includes('assassin')) {
    warnings.push('일반적인 아발론 규칙에서는 멀린과 암살자를 함께 사용합니다.');
  }

  if (selectedRoleIds.includes('assassin') && !selectedRoleIds.includes('merlin')) {
    warnings.push('멀린이 없으면 암살자의 종료 단계 능력을 사용할 대상이 없습니다.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function buildAvalonRoleDeck(
  playerCount: AvalonPlayerCount,
  roleIds: AvalonRoleId[],
): AvalonRoleId[] {
  const selectedRoleIds = normalizeAvalonRoleSelection(roleIds);
  const validation = validateAvalonRoleSelection(playerCount, selectedRoleIds);

  if (!validation.isValid) {
    throw new Error(validation.errors.join(' '));
  }

  const composition = getAvalonTeamComposition(playerCount);
  const selectedGoodRoleIds = selectedRoleIds.filter(
    (roleId) => AVALON_ROLE_CONFIGS[roleId].side === 'good',
  );
  const selectedEvilRoleIds = selectedRoleIds.filter(
    (roleId) => AVALON_ROLE_CONFIGS[roleId].side === 'evil',
  );
  const loyalServantCount = composition.good - selectedGoodRoleIds.length;
  const minionCount = composition.evil - selectedEvilRoleIds.length;

  return [
    ...selectedGoodRoleIds,
    ...Array<AvalonRoleId>(loyalServantCount).fill('loyal_servant'),
    ...selectedEvilRoleIds,
    ...Array<AvalonRoleId>(minionCount).fill('minion'),
  ];
}

export function getAvalonRoleCounts(
  roleIds: AvalonRoleId[],
): Partial<Record<AvalonRoleId, number>> {
  return roleIds.reduce<Partial<Record<AvalonRoleId, number>>>(
    (counts, roleId) => ({
      ...counts,
      [roleId]: (counts[roleId] ?? 0) + 1,
    }),
    {},
  );
}
