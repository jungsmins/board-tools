# 메인페이지 리팩토링 설계 (전체 리팩토링 1라운드)

## 배경 및 목표

board-tools의 세 가지 도구(지도제작자들, 테라포밍마스, 아발론)는 기능적으로 완성되어, 이제 프로젝트 전체를 디자인/기능 양 측면에서 리팩토링한다. 메인페이지부터 시작해 순서대로 진행하며, 각 라운드는 브레인스토밍 → 스펙 → 구현 계획 → 구현 사이클을 거친다.

이 문서는 **1라운드: 메인페이지**의 스펙이다.

### 전체 로드맵 (참고용)

1. **메인페이지** ← 이 문서의 범위
2. 지도제작자들
3. 테라포밍마스
4. 아발론

2~4라운드는 1라운드에서 확정하는 디자인 토큰과 공용 컴포넌트를 그대로 이어받아 각 도구 페이지에 적용하는 방식으로 진행한다. 각 라운드는 별도의 스펙 문서를 갖는다.

### 이번 라운드의 두 축

- **디자인 리팩토링**: 완전히 새로운 브랜드 컬러 팔레트를 만들고, 심플하되 보드게임 테마가 느껴지는 톤으로 메인페이지를 재구성한다. 하위 게임 페이지들도 이 팔레트를 공유한다.
- **기능적 리팩토링**: 인라인 데이터/마크업을 타입이 있는 구조로 분리하고, 반복되는 클래스 조합 로직을 공용 유틸리티로 정리하며, 테스트 프레임워크를 도입한다.

## 디자인 토큰

`src/app/globals.css`의 `@theme` 블록을 아래 팔레트로 교체한다. 기존 `gradient-*`, `canvas`, `chrome`, `card-*`, `chip-*`, `title`, `rule` 토큰은 제거하고 이 팔레트로 대체한다.

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-brand-900` | `#123F3A` (다크 틸) | Header/Footer 배경, 리스트 1번째 타일 |
| `--color-brand-700` | `#1C7C74` (미플 틸, 베이스) | 주요 버튼, 리스트 2번째 타일 |
| `--color-brand-400` | `#5CB3A6` (라이트 틸) | hover 강조, 리스트 3번째 타일 |
| `--color-accent` | `#F2B33D` (머스타드) | 배지/아이콘 강조, CTA 포인트 |
| `--color-surface` | `#FFFBF2` (웜 크림) | 페이지 배경 |
| `--color-ink` | `#241F1C` | 밝은 배경 위 본문 텍스트 |

`--font-display: 'Noto Serif KR', Georgia, serif`는 유지한다.

**게임별 커스텀 색상**(예: `--color-cartographers-button-primary`)은 각 게임 라운드에서 다루며, 이번 라운드에서는 건드리지 않는다. 단, 공용 컴포넌트(`Button` 등)의 fallback 값은 브랜드 토큰으로 정리한다.

## 공용 컴포넌트 변경

### Header ([src/components/shared/Header.tsx](../../../src/components/shared/Header.tsx))
- 배경을 `bg-chrome`(흰색) → `bg-brand-900`로 변경
- 4색 그라디언트 바(`after:` 의사요소) 제거 — 심플한 브랜드 방향과 맞지 않음
- 우측 텍스트("게임 추천하기")는 `--color-accent`(머스타드) 색상으로 변경해 포인트를 줌
- **로고 처리**: `logo_icon.png`/`logo_text.png`는 흰색/크림 배경이 이미지에 포함되어 있고 텍스트 로고는 구 레인보우 컬러라, 어두운 헤더 위에 그대로 올리면 흰 박스처럼 튀어 보인다. 로고 이미지는 교체하지 않고, **로고 뒤에 `--color-surface` 배경의 알약형(pill) 컨테이너**(`rounded-full`, 좌우 패딩)를 두어 로고가 그 안에 자연스럽게 놓이도록 한다.

### Footer ([src/components/shared/Footer.tsx](../../../src/components/shared/Footer.tsx))
- 배경을 `bg-brand-900`로 통일, 그라디언트 바 제거

### Button ([src/components/ui/Button.tsx](../../../src/components/ui/Button.tsx))
- `variantClasses`의 하드코딩된 hex(`#C0E8CC`, `#e04830`, `#d1d5db` 등)를 브랜드 토큰 기반으로 재정의
  - `primary`: `--color-brand-700` / hover `--color-brand-900`
  - `secondary`: 중립 톤 (연한 회갈색 계열, 브랜드 surface와 대비)
  - `ghost`: 투명 배경 + `--color-ink` 텍스트
  - `danger`: 기존 레드 계열 유지 (경고 색상은 브랜드와 무관하게 유지)
- 게임별 오버라이드 패턴(`var(--color-cartographers-button-primary, ...)`)은 유지하되 fallback 값만 브랜드 토큰으로 교체

### 신규: ToolListItem ([src/components/shared/ToolListItem.tsx](../../../src/components/shared/ToolListItem.tsx))
메인페이지의 도구 카드 마크업을 인라인에서 분리한 공용 컴포넌트.

- **레이아웃**: 세로로 쌓이는 풀폭 row. 왼쪽에 72px 정사각 이미지 박스(패딩 10px), 오른쪽에 제목/부제/설명/플랫폼 태그, 우측 끝에 화살표
- **배경**: 3개 아이템까지는 브랜드 톤 그라데이션을 순서대로 적용(`brand-900` → `brand-700` → `brand-400`). 아이템이 늘어날 경우의 색상 순환 규칙은 구현 시 `index % 3` 또는 고정 3색 반복으로 정한다
- **이미지 박스**: 현재는 이모지/플레이스홀더, 추후 실제 게임 표지 이미지가 `object-fit: cover`로 들어갈 자리
- **애니메이션**:
  - 진입: 아래에서 위로 페이드인 + slide-up, 각 아이템 순서대로 stagger (`nth-child` 또는 `animation-delay`)
  - hover: `translateX(6px)` + box-shadow 확대, 이미지 박스 `scale(1.06) rotate(-4deg)`, 우측 화살표 `translateX(4px)`
  - 우측 상단 반투명 원형 하이라이트가 hover 시 확대 (`scale(1.25)`)
- **Props**: `href`, `title`, `subtitle`, `description`, `platforms: string[]`, `icon`(임시, 추후 image로 교체), `tone: 'dark' | 'base' | 'light'` 또는 `index` 기반 자동 톤 선택

## 메인페이지 구조 변경 ([src/app/page.tsx](../../../src/app/page.tsx))

- 상단 히어로 이미지(`board_tools_main.png` + 오버레이 타이틀) **제거**
- `Header` 바로 아래에 "도구함" 타이틀 + `ToolListItem` 목록을 배치해 게임 리스트를 바로 보여주는 구조로 변경
- 기존 `TOOL_CARDS` 인라인 배열의 데이터(제목, 부제, 설명, 플랫폼)는 **모두 유지**하여 새 컴포넌트에 그대로 전달

## 기능적 리팩토링

- **타입/상수 분리**: `TOOL_CARDS`를 `src/app/page.tsx`에서 `src/constants/tools.ts`로 이동하고, `src/types/tools.ts`(또는 기존 `types` 폴더 컨벤션에 맞춰)에 `Tool` 인터페이스를 정의한다.
  ```ts
  interface Tool {
    href: string;
    title: string;
    subtitle: string;
    description: string;
    platforms: string[];
  }
  ```
- **공용 클래스 조합 유틸 도입**: `clsx` 패키지를 의존성에 추가한다. `Button.tsx`의 `` `...`.trim() `` 패턴, `Header`/`Footer`의 멀티라인 템플릿 리터럴 클래스 조합을 `clsx(...)` 호출로 정리한다. 이 유틸은 이후 모든 라운드에서 공용으로 사용한다.
- **애니메이션 유틸**: `globals.css`의 기존 `@layer utilities` 패턴(`animate-season-image`와 동일한 방식)을 따라 `animate-pop-in`(또는 유사 이름)의 keyframe 유틸리티 클래스를 추가한다.

## 테스트 프레임워크 도입

이번 라운드에서 유닛/컴포넌트 테스트 인프라를 신규 도입한다.

- **도구**: `Vitest` + `@testing-library/react` (+ `jsdom` 환경)
- **범위**: 이번 라운드에서 만드는/수정하는 컴포넌트에 대한 기본 렌더링·인터랙션 테스트
  - `ToolListItem`: props에 따라 title/subtitle/description/platforms가 올바르게 렌더링되는지
  - `Button`: variant/size별 클래스가 적용되는지, 클릭 핸들러가 호출되는지
- **E2E(Playwright 등)는 이번 라운드 범위 밖**으로 명시적으로 제외. 필요 시 이후 라운드에서 별도 논의
- `package.json`에 `test` 스크립트 추가 (`vitest run`) 및 필요한 설정 파일(`vitest.config.ts`) 추가

## 검증 방식

- **디자인**: `npm run dev`로 개발 서버를 띄워 브라우저에서 직접 확인 (라이트/모바일 뷰 포함)
- **타입/린트**: `npm run lint`, `npx tsc --noEmit`
- **테스트**: `npm run test` (신규 도입되는 Vitest 스위트)

## 범위 밖 (Out of Scope)

- 지도제작자들 / 테라포밍마스 / 아발론 페이지 자체의 리팩토링 (2~4라운드에서 별도 진행)
- 실제 게임 표지 이미지 에셋 제작/교체 (자리만 마련)
- E2E 테스트 도입
- Supabase 관련 로직 변경 (아발론 라운드에서 다룸)

## 성공 기준

- 메인페이지가 히어로 이미지 없이 게임 리스트만으로 시작하며, 진입 애니메이션과 hover 인터랙션이 동작한다
- Header/Footer/Button이 새 브랜드 팔레트를 사용하고, 하드코딩된 hex 값이 공용 컴포넌트에서 제거된다
- `TOOL_CARDS`가 타입이 있는 상수로 분리되고, 기존 데이터 손실이 없다
- `clsx` 기반 클래스 조합 유틸이 공용 컴포넌트에 적용된다
- Vitest 기반 테스트가 `npm run test`로 통과한다
- `npm run lint`, `npx tsc --noEmit`이 에러 없이 통과한다
