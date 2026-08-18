import type { Tool } from '@/types/tools';

export const TOOLS: Tool[] = [
  {
    href: '/cartographers',
    title: '지도제작자들',
    subtitle: '지도제작자들 플레이어',
    description:
      '게임 진행을 도와주는 점수 계산 및 지도 제작 보조 도구. 라운드별 점수를 기록하고 진행 상황을 한눈에 확인하세요.',
    platforms: ['데스크탑'],
  },
  {
    href: '/terraforming-mars',
    title: '테라포밍마스',
    subtitle: '테라포밍마스 자원 트래킹',
    description:
      '테라포밍마스 자원을 추가하고 사용할 수 있는 보조 도구. 테라포밍마스의 자원을 간편하게 관리하세요.',
    platforms: ['모바일', '태블릿'],
  },
  {
    href: '/avalon-roles',
    title: '레지스탕스 아발론',
    subtitle: '아발론 역할 배정기',
    description:
      '방을 만들고 참가자들에게 역할을 배정하는 아발론 보조 도구. 각자 휴대폰에서 본인의 역할과 확인 가능한 대상을 볼 수 있습니다.',
    platforms: ['모바일'],
  },
];
