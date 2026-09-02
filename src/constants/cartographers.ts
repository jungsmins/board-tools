import spring from '../../public/cartographers_images/season/spring_splash.png';
import summer from '../../public/cartographers_images/season/summer_splash.png';
import autumn from '../../public/cartographers_images/season/autumn_splash.png';
import winter from '../../public/cartographers_images/season/winter_splash.png';
import springPlaying from '../../public/cartographers_images/season/spring_playing.png';
import summerPlaying from '../../public/cartographers_images/season/summer_playing.png';
import autumnPlaying from '../../public/cartographers_images/season/autumn_playing.png';
import winterPlaying from '../../public/cartographers_images/season/winter_playing.png';
import type {
  ExploreCard,
  AmbushCard,
  SeasonConfig,
  ScoringSlot,
  ScoringRule,
} from '@/types/cartographers';

export const SEASON_IMAGES = { spring, summer, autumn, winter };

export const SEASON_PLAYING_IMAGES = {
  spring: springPlaying,
  summer: summerPlaying,
  autumn: autumnPlaying,
  winter: winterPlaying,
};

export const SCORING_SLOT_BADGE_STYLES: Record<ScoringSlot, string> = {
  A: 'bg-cartographers-forest text-white',
  B: 'bg-cartographers-village text-white',
  C: 'bg-linear-to-r from-cartographers-water to-cartographers-farm text-white',
  D: 'bg-cartographers-grid text-white',
};

export const TERRAIN_BG: Record<string, string> = {
  forest: 'bg-cartographers-forest',
  farm: 'bg-cartographers-farm',
  village: 'bg-cartographers-village',
  water: 'bg-cartographers-water',
  monster: 'bg-cartographers-monster',
};

export const EXPLORE_CARDS: ExploreCard[] = [
  {
    type: 'normal',
    id: 'forgotten_forest',
    name: '잊혀진 숲',
    cost: 1,
    terrains: ['forest'],
    shapes: [
      {
        // ■ .
        // ■ ■
        // . ■
        shape: [
          [1, 0],
          [1, 1],
          [0, 1],
        ],
        hasCoin: false,
      },
      {
        // ■ .
        // . ■
        shape: [
          [1, 0],
          [0, 1],
        ],
        hasCoin: true,
      },
    ],
  },
  {
    type: 'normal',
    id: 'farmland',
    name: '농지',
    cost: 1,
    terrains: ['farm'],
    shapes: [
      {
        // . ■ .
        // ■ ■ ■
        // . ■ .
        shape: [
          [0, 1, 0],
          [1, 1, 1],
          [0, 1, 0],
        ],
        hasCoin: false,
      },
      {
        // ■
        // ■
        shape: [[1], [1]],
        hasCoin: true,
      },
    ],
  },
  {
    type: 'normal',
    id: 'great_river',
    name: '거대한 강',
    cost: 1,
    terrains: ['water'],
    shapes: [
      {
        // ■
        // ■
        // ■
        shape: [[1], [1], [1]],
        hasCoin: true,
      },
      {
        // . . ■
        // . ■ ■
        // ■ ■ .
        shape: [
          [0, 0, 1],
          [0, 1, 1],
          [1, 1, 0],
        ],
        hasCoin: false,
      },
    ],
  },
  {
    type: 'normal',
    id: 'hamlet',
    name: '작은 마을',
    cost: 1,
    terrains: ['village'],
    shapes: [
      {
        // ■ ■ ■
        // ■ ■ .
        shape: [
          [1, 1, 1],
          [1, 1, 0],
        ],
        hasCoin: false,
      },
      {
        // ■ .
        // ■ ■
        shape: [
          [1, 0],
          [1, 1],
        ],
        hasCoin: true,
      },
    ],
  },

  // 2 cost + 2 terrains -----------------------

  {
    type: 'normal',
    id: 'farm_and_village',
    name: '농장이 딸린 주택',
    cost: 2,
    terrains: ['farm', 'village'],
    shapes: [
      {
        // ■ .
        // ■ ■
        // ■ .
        shape: [
          [1, 0],
          [1, 1],
          [1, 0],
        ],
        hasCoin: false,
      },
    ],
  },
  {
    type: 'normal',
    id: 'hinterland_stream',
    name: '내륙의 개울',
    cost: 2,
    terrains: ['farm', 'water'],
    shapes: [
      {
        // ■ ■ ■
        // ■ . .
        // ■ . .
        shape: [
          [1, 1, 1],
          [1, 0, 0],
          [1, 0, 0],
        ],
        hasCoin: false,
      },
    ],
  },
  {
    type: 'normal',
    id: 'orchard',
    name: '과수원',
    cost: 2,
    terrains: ['forest', 'farm'],
    shapes: [
      {
        // ■ ■ ■
        // . . ■
        shape: [
          [1, 1, 1],
          [0, 0, 1],
        ],
        hasCoin: false,
      },
    ],
  },
  {
    type: 'normal',
    id: 'marshlands',
    name: '습지',
    cost: 2,
    terrains: ['forest', 'water'],
    shapes: [
      {
        // ■ . .
        // ■ ■ ■
        // ■ . .
        shape: [
          [1, 0, 0],
          [1, 1, 1],
          [1, 0, 0],
        ],
        hasCoin: false,
      },
    ],
  },
  {
    type: 'normal',
    id: 'treetop_house',
    name: '나무위의 집',
    cost: 2,
    terrains: ['forest', 'village'],
    shapes: [
      {
        // . . ■ ■
        // ■ ■ ■ .
        shape: [
          [0, 0, 1, 1],
          [1, 1, 1, 0],
        ],
        hasCoin: false,
      },
    ],
  },
  {
    type: 'normal',
    id: 'fishing_village',
    name: '어촌',
    cost: 2,
    terrains: ['village', 'water'],
    shapes: [
      {
        // ■ ■ ■ ■
        shape: [[1, 1, 1, 1]],
        hasCoin: false,
      },
    ],
  },

  // 특수 --------------------------------------

  {
    type: 'ruins',
    id: 'temple_ruins',
    name: '사원 유적',
    cost: 0,
  },
  {
    type: 'ruins',
    id: 'outpost_ruins',
    name: '전초기지 유적',
    cost: 0,
  },
  {
    type: 'rift_lands',
    id: 'rift_lands',
    name: '변화무쌍한 대지',
    cost: 0,
    terrains: ['forest', 'village', 'farm', 'water', 'monster'],
  },
];

export const AMBUSH_CARDS: AmbushCard[] = [
  {
    type: 'ambush',
    id: 'goblin_attack',
    name: '고블린 습격',
    direction: 'right',
    // ■ . .
    // . ■ .
    // . . ■
    shape: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
  },
  {
    type: 'ambush',
    id: 'bugbear_attack',
    name: '버그베어 습격',
    direction: 'left',
    // ■ . ■
    // ■ . ■
    shape: [
      [1, 0, 1],
      [1, 0, 1],
    ],
  },
  {
    type: 'ambush',
    id: 'ratman_attack',
    name: '랫맨 습격',
    direction: 'left',
    // ■ ■ ■
    shape: [[1, 1, 1]],
  },
  {
    type: 'ambush',
    id: 'insectoid_attack',
    name: '곤충인간 습격',
    direction: 'left',
    // . ■
    // ■ ■
    // ■ .
    shape: [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
  },
  {
    type: 'ambush',
    id: 'mind_infiltrator_attack',
    name: '정신침투자 습격',
    direction: 'right',
    // ■ .
    // ■ ■
    shape: [
      [1, 0],
      [1, 1],
    ],
  },
  {
    type: 'ambush',
    id: 'gnoll_attack',
    name: '놀 습격',
    direction: 'right',
    // ■ ■
    // ■ .
    // ■ ■
    shape: [
      [1, 1],
      [1, 0],
      [1, 1],
    ],
  },
];

export const SEASON_CONFIG: SeasonConfig[] = [
  {
    season: 'spring',
    name: '봄',
    maxTimePoints: 8,
    scoringSlots: ['A', 'B'],
  },
  {
    season: 'summer',
    name: '여름',
    maxTimePoints: 8,
    scoringSlots: ['B', 'C'],
  },
  {
    season: 'autumn',
    name: '가을',
    maxTimePoints: 7,
    scoringSlots: ['C', 'D'],
  },
  {
    season: 'winter',
    name: '겨울',
    maxTimePoints: 6,
    scoringSlots: ['D', 'A'],
  },
];

// 점수계산 --------------------------------------------------------------------

export const SCORING_RULES: ScoringRule[] = [
  // -- 슬롯 A : 숲 관련 --
  {
    id: 'sentinel_wood',
    slot: 'A',
    name: '감시하는 숲',
    description:
      '지도의 테두리에 인접한 숲 한 칸마다 명성 점수 1점을 얻습니다.',
  },
  {
    id: 'treetower',
    slot: 'A',
    name: '나무 탑',
    description:
      '주변 네 칸이 모두 지역 또는 테두리로 둘러싸인 숲 한 칸마다 명성 점수 1점을 얻습니다.',
  },
  {
    id: 'greenbough',
    slot: 'A',
    name: '어린 가지',
    description:
      '숲이 한 칸이라도 있는 가로줄이나 세로줄마다 명성 점수 1점을 얻습니다. 숲 한 칸이 가로줄과 세로줄 점수 계산에 중복으로 사용될 수 있습니다',
  },
  {
    id: 'stoneside_forest',
    slot: 'A',
    name: '돌나무 숲',
    description: '숲 그룹으로 연결된 산 한 칸마다 명성 점수 3점을 얻습니다.',
  },

  // -- 슬롯 B : 마을 --
  {
    id: 'wildholds',
    slot: 'B',
    name: '야인의 마을',
    description:
      '6칸 이상으로 이루어진 마을 그룹 1개당 명성 점수 6점을 얻습니다.',
  },
  {
    id: 'greengold_plains',
    slot: 'B',
    name: '초록빛 황금 평원',
    description:
      '3종류 이상의 다른 지역과 인접한 마을 그룹 1개당 명성 점수 3점을 얻습니다.',
  },
  {
    id: 'great_city',
    slot: 'B',
    name: '거대한 도시',
    description:
      '산과 인접하지 않은 가장 큰 마을 그룹의 마을 한 칸당 명성 점수 1점을 얻습니다.',
  },
  {
    id: 'shieldgate',
    slot: 'B',
    name: '전초 마을',
    description:
      '두 번째로 큰 마을 그룹의 마을 한 칸당 명성 점수 2점을 얻습니다.',
  },

  // ── 슬롯 C: 농지 & 물 ──
  {
    id: 'canal_lake',
    slot: 'C',
    name: '운하 호수',
    description:
      '농장과 인접한 강 한 칸당 명성 점수 1점을 얻습니다. 강과 인접한 농장 한 칸당 명성 점수 1점을 얻습니다.',
  },
  {
    id: 'the_golden_granary',
    slot: 'C',
    name: '황금빛 곡창지대',
    description:
      '폐허와 인접한 강 한 칸당 명성 점수 1점을 얻습니다. 폐허에 놓인 농장 한 칸당 명성 점수 3점을 얻습니다.',
  },
  {
    id: 'mages_valley',
    slot: 'C',
    name: '마법사의 계곡',
    description:
      '산에 인접한 강 한 칸당 명성 점수 2점을 얻습니다. 산에 인접한 농장 한 칸당 명성 점수 1점을 얻습니다.',
  },
  {
    id: 'shoreside_expanse',
    slot: 'C',
    name: '광활한 해안지대',
    description:
      '지도의 테두리나 강에 인접하지 않은 농장 그룹 하나당 명성 점수 3점을 얻습니다. 지도의 테두리나 농장에 인접하지 않은 강 그룹 하나당 명성 점수 3점을 얻습니다.',
  },

  // ── 슬롯 D: 배치 ──
  {
    id: 'borderlands',
    slot: 'D',
    name: '국경',
    description:
      '완전히 다 채워진 세로줄 1개당 명성 점수 6점을 얻습니다. 완전히 다 채워진 가로줄 1개당 명성 점수 6점을 얻습니다.',
  },
  {
    id: 'the_broken_road',
    slot: 'D',
    name: '부서진 길',
    description:
      '지도의 왼쪽과 아래쪽 테두리에 인접한 칸을 포함한 완전히 다 채워진 대각선 줄 1개당 명성 점수 3점을 얻습니다.',
  },
  {
    id: 'lost_barony',
    slot: 'D',
    name: '잃어버린 남작의 영지',
    description:
      '지도의 채워진 칸에서 만들 수 있는 가장 큰 정사각형을 찾아, 한 면에 인접한 칸 1개당 명성 점수 3점을 얻습니다.',
  },
  {
    id: 'the_cauldrons',
    slot: 'D',
    name: '가마솥',
    description:
      '주변 네 칸이 모두 지역 또는 테두리로 채워져 있는 빈칸 1개당 명성 점수 1점을 얻습니다.',
  },
];
