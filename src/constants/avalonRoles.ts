import type {
  AvalonPlayerCount,
  AvalonRoleConfig,
  AvalonRoleId,
  AvalonTeamComposition,
} from '@/types/avalonRoles';

export const AVALON_PLAYER_COUNTS = [
  5,
  6,
  7,
  8,
  9,
  10,
] as const satisfies readonly AvalonPlayerCount[];

export const AVALON_ROLE_IDS = [
  'loyal_servant',
  'merlin',
  'percival',
  'minion',
  'assassin',
  'mordred',
  'morgana',
  'oberon',
] as const satisfies readonly AvalonRoleId[];

export const AVALON_GOOD_ROLE_IDS = [
  'loyal_servant',
  'merlin',
  'percival',
] as const satisfies readonly AvalonRoleId[];

export const AVALON_EVIL_ROLE_IDS = [
  'minion',
  'assassin',
  'mordred',
  'morgana',
  'oberon',
] as const satisfies readonly AvalonRoleId[];

export const AVALON_SELECTABLE_ROLE_IDS = [
  'merlin',
  'percival',
  'assassin',
  'mordred',
  'morgana',
  'oberon',
] as const satisfies readonly AvalonRoleId[];

export const AVALON_DEFAULT_SELECTED_ROLE_IDS = [
  'merlin',
  'assassin',
] as const satisfies readonly AvalonRoleId[];

export const AVALON_ROLE_CONFIGS: Record<AvalonRoleId, AvalonRoleConfig> = {
  loyal_servant: {
    id: 'loyal_servant',
    name: '충성스러운 신하',
    side: 'good',
    isGeneric: true,
    isSelectable: false,
    description: '특별히 보이는 대상은 없습니다.',
  },
  merlin: {
    id: 'merlin',
    name: '멀린',
    side: 'good',
    isGeneric: false,
    isSelectable: true,
    description: '모드레드를 제외한 악의 진영을 압니다.',
  },
  percival: {
    id: 'percival',
    name: '퍼시발',
    side: 'good',
    isGeneric: false,
    isSelectable: true,
    description: '멀린과 모르가나 후보를 봅니다. 둘을 구분할 수 없습니다.',
  },
  minion: {
    id: 'minion',
    name: '모드레드의 하수인',
    side: 'evil',
    isGeneric: true,
    isSelectable: false,
    description: '오베론을 제외한 악의 진영끼리 서로 압니다.',
  },
  assassin: {
    id: 'assassin',
    name: '암살자',
    side: 'evil',
    isGeneric: false,
    isSelectable: true,
    description:
      '오베론을 제외한 악의 진영끼리 서로 알고, 게임 종료 시 멀린 암살을 시도합니다.',
  },
  mordred: {
    id: 'mordred',
    name: '모드레드',
    side: 'evil',
    isGeneric: false,
    isSelectable: true,
    description:
      '오베론을 제외한 악의 진영끼리 서로 알고, 멀린에게 보이지 않습니다.',
  },
  morgana: {
    id: 'morgana',
    name: '모르가나',
    side: 'evil',
    isGeneric: false,
    isSelectable: true,
    description:
      '오베론을 제외한 악의 진영끼리 서로 알고, 퍼시발에게 멀린 후보로 보입니다.',
  },
  oberon: {
    id: 'oberon',
    name: '오베론',
    side: 'evil',
    isGeneric: false,
    isSelectable: true,
    description: '다른 악과 서로 보이지 않습니다.',
  },
};

export const AVALON_TEAM_COMPOSITION: Record<
  AvalonPlayerCount,
  AvalonTeamComposition
> = {
  5: {
    good: 3,
    evil: 2,
  },
  6: {
    good: 4,
    evil: 2,
  },
  7: {
    good: 4,
    evil: 3,
  },
  8: {
    good: 5,
    evil: 3,
  },
  9: {
    good: 6,
    evil: 3,
  },
  10: {
    good: 6,
    evil: 4,
  },
};
