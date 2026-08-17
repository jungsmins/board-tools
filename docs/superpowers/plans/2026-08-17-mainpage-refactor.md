# 메인페이지 리팩토링 (전체 리팩토링 1라운드) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 메인페이지의 히어로 이미지를 제거하고 새 브랜드 팔레트(미플 파스텔 기반 틸 톤)로 게임 리스트를 애니메이션과 함께 바로 보여주며, 관련 공용 컴포넌트(Header/Footer/Button)와 데이터/유틸을 함께 정리한다.

**Architecture:** `globals.css`에 새 디자인 토큰을 추가하고, `Tool` 타입/상수를 분리한 뒤, `Button`/`Header`/`Footer`를 새 팔레트로 리디자인한다. 신규 `ToolListItem` 컴포넌트로 메인페이지 리스트를 구성하고, 마지막에 `page.tsx`를 새 구조로 교체한다. 각 컴포넌트는 Vitest + React Testing Library로 검증한다.

**Tech Stack:** Next.js 16.2.4 (App Router), React 19.2.4, TypeScript 5, Tailwind CSS 4, Vitest, React Testing Library, clsx

**Spec:** [docs/superpowers/specs/2026-08-17-mainpage-refactor-design.md](../specs/2026-08-17-mainpage-refactor-design.md)

## Global Constraints

- Path alias 사용: `@/*` → `./src/*` (tsconfig.json에 이미 설정됨)
- 기존 CSS 토큰(`gradient-*`, `canvas`, `chrome`, `card-*`, `chip-*`, `title`, `rule`)은 **삭제하지 않고 유지** — 지도제작자들/아발론 페이지가 아직 사용 중
- 새 브랜드 토큰 6개: `--color-brand-900`(#123f3a), `--color-brand-700`(#1c7c74), `--color-brand-400`(#5cb3a6), `--color-accent`(#f2b33d), `--color-surface`(#fffbf2), `--color-ink`(#241f1c)
- 게임별 커스텀 색상 오버라이드 패턴(`var(--color-cartographers-button-primary, ...)`)은 유지, fallback 값만 교체
- 테스트: Vitest + React Testing Library만 사용, E2E(Playwright 등) 도입 금지
- 커밋 메시지는 한글 `feat:`/`fix:`/`refactor:`/`test:`/`docs:` 컨벤션 사용, 본문 마지막에 `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>` 포함

---

## File Structure Overview

- **Create** `vitest.config.ts`, `vitest.setup.tsx` — 테스트 인프라
- **Modify** `package.json` — test 스크립트, devDependencies
- **Modify** `src/app/globals.css` — 브랜드 토큰 추가, `animate-pop-in` 키프레임 추가
- **Create** `src/types/tools.ts` — `Tool` 타입
- **Create** `src/constants/tools.ts` + `src/constants/tools.test.ts` — 도구 리스트 데이터
- **Modify** `src/components/ui/Button.tsx` + **Create** `src/components/ui/Button.test.tsx` — 브랜드 토큰 적용, clsx 도입
- **Modify** `src/components/shared/Header.tsx` + **Create** `src/components/shared/Header.test.tsx` — 다크 배경, 로고 알약 배경
- **Modify** `src/components/shared/Footer.tsx` + **Create** `src/components/shared/Footer.test.tsx` — 다크 배경
- **Create** `src/components/shared/ToolListItem.tsx` + `src/components/shared/ToolListItem.test.tsx` — 신규 리스트 아이템 컴포넌트
- **Modify** `src/app/page.tsx` + **Create** `src/app/page.test.tsx` — 히어로 제거, 새 구조 적용

---

### Task 1: 테스트 인프라 설치 (Vitest + React Testing Library)

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.tsx`
- Modify: `package.json` (scripts, devDependencies)
- Create: `src/components/shared/Header.test.tsx`

**Interfaces:**
- Produces: `npm run test` 커맨드, `next/image`를 `<img>`로 대체하는 전역 mock (모든 후속 컴포넌트 테스트가 의존)

- [ ] **Step 1: 필요한 패키지 설치**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom vite-tsconfig-paths
```

- [ ] **Step 2: vitest 설정 파일 작성**

`vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.tsx'],
  },
});
```

- [ ] **Step 3: 전역 setup 파일 작성 (jest-dom matcher + next/image mock)**

`vitest.setup.tsx`:
```tsx
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    ...rest
  }: {
    src: string | { src: string };
    alt: string;
    [key: string]: unknown;
  }) => {
    const resolvedSrc = typeof src === 'string' ? src : src.src;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={resolvedSrc} alt={alt} {...rest} />;
  },
}));
```

`next/image`의 정적 이미지 import(`import x from './img.png'`)는 Next 빌드 환경에서만 `{src, width, height}` 형태의 객체로 변환된다. Vitest(Vite) 환경에서는 문자열 URL로 들어오므로, 두 경우를 모두 처리하는 mock이 필요하다.

- [ ] **Step 4: package.json에 test 스크립트 추가**

`package.json`의 `scripts`에 추가:
```json
"test": "vitest run"
```

- [ ] **Step 5: 인프라 검증용 테스트 작성 (기존 Header 대상)**

`src/components/shared/Header.test.tsx`:
```tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('로고와 안내 텍스트를 렌더링한다', () => {
    render(<Header />);

    expect(screen.getAllByAltText('로고')).toHaveLength(2);
    expect(screen.getByText('게임 추천하기')).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: 테스트 실행해서 인프라가 동작하는지 확인**

Run: `npm run test`
Expected: PASS (Header는 아직 수정 전이지만, 로고 2개 + 안내 텍스트는 이미 존재하므로 통과해야 한다)

- [ ] **Step 7: 커밋**

```bash
git add vitest.config.ts vitest.setup.tsx package.json package-lock.json src/components/shared/Header.test.tsx
git commit -m "test: Vitest + React Testing Library 인프라 추가

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 2: 브랜드 디자인 토큰 및 애니메이션 유틸리티 추가

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: Tailwind 유틸리티 클래스 `bg-brand-900`, `bg-brand-700`, `bg-brand-400`, `text-accent`/`bg-accent`, `bg-surface`/`text-surface`, `text-ink`, 그리고 `animate-pop-in` 클래스 (Task 4~8이 사용)

- [ ] **Step 1: `@theme` 블록에 브랜드 토큰 추가**

`src/app/globals.css`의 `@theme` 블록에서 `--color-rule` 줄 다음, `/* Typography */` 앞에 추가:

```css
  /* brand (2026 리팩토링) */
  --color-brand-900: #123f3a;
  --color-brand-700: #1c7c74;
  --color-brand-400: #5cb3a6;
  --color-accent: #f2b33d;
  --color-surface: #fffbf2;
  --color-ink: #241f1c;
```

기존 `gradient-*`, `canvas`, `chrome`, `card-*`, `chip-*`, `title`, `rule` 토큰은 그대로 둔다 (Global Constraints 참고).

- [ ] **Step 2: 등장 애니메이션 키프레임 추가**

`src/app/globals.css`의 `@layer utilities` 블록 안, 기존 `.animate-card-content` 클래스 다음에 추가:

```css
  @keyframes pop-in {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-pop-in {
    animation: pop-in 0.5s ease both;
  }
```

- [ ] **Step 3: 빌드로 CSS 문법 검증**

Run: `npm run build`
Expected: 빌드 성공 (Tailwind `@theme`/`@layer` 문법 오류가 없어야 한다). 빌드가 끝나면 `.next` 디렉터리는 정리하지 않아도 된다 (gitignore 대상).

- [ ] **Step 4: 커밋**

```bash
git add src/app/globals.css
git commit -m "feat: 브랜드 디자인 토큰과 pop-in 애니메이션 유틸리티 추가

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 3: Tool 타입 및 TOOL 상수 분리

**Files:**
- Create: `src/types/tools.ts`
- Create: `src/constants/tools.ts`
- Test: `src/constants/tools.test.ts`

**Interfaces:**
- Produces: `Tool` 인터페이스 (`src/types/tools.ts`), `TOOLS: Tool[]` 상수 (`src/constants/tools.ts`) — Task 8(`page.tsx`)이 소비

- [ ] **Step 1: 실패하는 테스트 먼저 작성**

`src/constants/tools.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { TOOLS } from './tools';

describe('TOOLS', () => {
  it('세 가지 도구 데이터를 모두 포함한다', () => {
    expect(TOOLS).toHaveLength(3);
  });

  it('각 도구가 필수 필드를 모두 가진다', () => {
    TOOLS.forEach((tool) => {
      expect(tool.href).toBeTruthy();
      expect(tool.title).toBeTruthy();
      expect(tool.subtitle).toBeTruthy();
      expect(tool.description).toBeTruthy();
      expect(tool.platforms.length).toBeGreaterThan(0);
    });
  });

  it('아발론 도구 데이터가 기존 내용과 일치한다', () => {
    const avalon = TOOLS.find((tool) => tool.href === '/avalon-roles');
    expect(avalon?.title).toBe('아발론');
    expect(avalon?.subtitle).toBe('아발론 역할 배정');
    expect(avalon?.platforms).toEqual(['모바일']);
  });
});
```

- [ ] **Step 2: 테스트 실행해서 실패하는지 확인**

Run: `npm run test -- tools.test.ts`
Expected: FAIL (`./tools` 모듈을 찾을 수 없음)

- [ ] **Step 3: Tool 타입 작성**

`src/types/tools.ts`:
```ts
export type ToolPlatform = '데스크탑' | '모바일' | '태블릿';

export interface Tool {
  href: string;
  title: string;
  subtitle: string;
  description: string;
  platforms: ToolPlatform[];
}
```

- [ ] **Step 4: TOOLS 상수 작성 (기존 page.tsx의 TOOL_CARDS 데이터를 그대로 이전)**

`src/constants/tools.ts`:
```ts
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
    title: '아발론',
    subtitle: '아발론 역할 배정',
    description:
      '방을 만들고 참가자들에게 역할을 배정하는 아발론 보조 도구. 각자 휴대폰에서 본인 역할과 확인 가능한 대상을 볼 수 있습니다.',
    platforms: ['모바일'],
  },
];
```

- [ ] **Step 5: 테스트 실행해서 통과하는지 확인**

Run: `npm run test -- tools.test.ts`
Expected: PASS

- [ ] **Step 6: 커밋**

```bash
git add src/types/tools.ts src/constants/tools.ts src/constants/tools.test.ts
git commit -m "refactor: TOOL_CARDS를 타입이 있는 Tool 상수로 분리

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 4: clsx 도입 및 Button 브랜드 토큰 적용

**Files:**
- Modify: `src/components/ui/Button.tsx`
- Test: `src/components/ui/Button.test.tsx`

**Interfaces:**
- Consumes: `bg-brand-700`/`bg-brand-900` 유틸리티 클래스 (Task 2)
- Produces: 기존 `Button` 컴포넌트 시그니처는 변경 없음 (`variant`, `size`, `className` 등 props 동일)

- [ ] **Step 1: 실패하는 테스트 먼저 작성**

`src/components/ui/Button.test.tsx`:
```tsx
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('primary variant는 브랜드 토큰 배경을 사용한다', () => {
    render(<Button variant='primary'>확인</Button>);
    const button = screen.getByRole('button', { name: '확인' });
    expect(button.className).toContain('--color-brand-700');
  });

  it('클릭하면 onClick이 호출된다', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>클릭</Button>);
    fireEvent.click(screen.getByRole('button', { name: '클릭' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('전달된 className을 유지한다', () => {
    render(<Button className='custom-class'>버튼</Button>);
    expect(screen.getByRole('button', { name: '버튼' }).className).toContain(
      'custom-class',
    );
  });
});
```

- [ ] **Step 2: 테스트 실행해서 실패하는지 확인**

Run: `npm run test -- Button.test.tsx`
Expected: FAIL (첫 번째 테스트 — 현재 `primary` variant는 `--color-cartographers-button-primary`의 fallback으로 `#C0E8CC`를 하드코딩하고 있어 `--color-brand-700` 문자열을 포함하지 않음)

- [ ] **Step 3: clsx 설치**

```bash
npm install clsx
```

- [ ] **Step 4: Button.tsx를 브랜드 토큰 + clsx 기반으로 재작성**

`src/components/ui/Button.tsx`:
```tsx
import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-cartographers-button-primary,var(--color-brand-700))] text-white hover:bg-[var(--color-cartographers-button-primary-hover,var(--color-brand-900))]',
  secondary: 'bg-[#d1d5db] text-[#2d1508] hover:bg-[#c4c9d1]',
  ghost: 'bg-transparent text-ink hover:bg-black/5',
  danger: 'bg-[#e04830] text-white hover:bg-[#c93b26]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
};

export default function Button({
  children,
  onClick,
  variant = 'ghost',
  size = 'md',
  type = 'button',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        'cursor-pointer rounded-lg font-bold transition',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

`secondary`/`danger`는 브랜드 팔레트와 무관한 중립/경고 색상이라 스펙에 따라 값은 그대로 유지하고, 클래스 조합 방식만 `clsx`로 정리했다.

- [ ] **Step 5: 테스트 실행해서 통과하는지 확인**

Run: `npm run test -- Button.test.tsx`
Expected: PASS

- [ ] **Step 6: 커밋**

```bash
git add package.json package-lock.json src/components/ui/Button.tsx src/components/ui/Button.test.tsx
git commit -m "refactor: Button을 브랜드 토큰과 clsx 기반으로 재작성

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 5: Header 리디자인 (다크 배경 + 로고 알약 배경)

**Files:**
- Modify: `src/components/shared/Header.tsx`
- Modify: `src/components/shared/Header.test.tsx` (Task 1에서 생성한 파일에 테스트 추가)

**Interfaces:**
- Consumes: `bg-brand-900`, `bg-surface`, `text-accent` 유틸리티 클래스 (Task 2)
- Produces: `Header` 컴포넌트 시그니처 변경 없음 (props 없음)

- [ ] **Step 1: 실패하는 테스트 추가**

`src/components/shared/Header.test.tsx`의 `describe('Header', ...)` 블록 안에 다음 테스트를 추가한다 (기존 테스트는 그대로 둔다):

```tsx
  it('브랜드 다크 배경과 로고 알약 배경을 사용한다', () => {
    render(<Header />);

    const header = screen.getByText('게임 추천하기').closest('header');
    expect(header?.className).toContain('bg-brand-900');

    const logoLink = screen.getByRole('link');
    expect(logoLink.className).toContain('bg-surface');
    expect(logoLink.className).toContain('rounded-full');
  });
```

- [ ] **Step 2: 테스트 실행해서 실패하는지 확인**

Run: `npm run test -- Header.test.tsx`
Expected: FAIL (현재 Header는 `bg-chrome`을 사용하고 로고에 알약 배경이 없음)

- [ ] **Step 3: Header.tsx 재작성**

`src/components/shared/Header.tsx`:
```tsx
import Image from 'next/image';
import Link from 'next/link';
import logo_icon from '../../../public/logo_icon.png';
import logo_text from '../../../public/logo_text.png';

export default function Header() {
  return (
    <header className='flex h-16 w-full items-center justify-between bg-brand-900 p-6'>
      <Link
        href='/'
        className='flex items-center gap-2.5 rounded-full bg-surface px-4 py-1.5'
      >
        <Image src={logo_icon} alt='로고' width={28} height={28} />
        <Image src={logo_text} alt='로고' width={90} height={27} />
      </Link>
      <div className='font-display text-accent'>게임 추천하기</div>
    </header>
  );
}
```

기존의 4색 그라디언트 바(`after:` 의사요소)는 심플한 브랜드 방향과 맞지 않아 제거했다. 로고 이미지 자체(흰 배경 + 구 레인보우 컬러)는 바꾸지 않고, `bg-surface` 알약 컨테이너로 감싸 다크 헤더 위에서도 자연스럽게 보이도록 했다.

- [ ] **Step 4: 테스트 실행해서 통과하는지 확인**

Run: `npm run test -- Header.test.tsx`
Expected: PASS (두 테스트 모두)

- [ ] **Step 5: 커밋**

```bash
git add src/components/shared/Header.tsx src/components/shared/Header.test.tsx
git commit -m "feat: Header를 브랜드 다크 배경과 로고 알약 배경으로 리디자인

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 6: Footer 리디자인 (다크 배경)

**Files:**
- Modify: `src/components/shared/Footer.tsx`
- Test: `src/components/shared/Footer.test.tsx`

**Interfaces:**
- Consumes: `bg-brand-900`, `text-surface` 유틸리티 클래스 (Task 2)
- Produces: `Footer` 컴포넌트 시그니처 변경 없음

- [ ] **Step 1: 실패하는 테스트 먼저 작성**

`src/components/shared/Footer.test.tsx`:
```tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('브랜드 다크 배경 위에 서비스명을 렌더링한다', () => {
    render(<Footer />);

    const footer = screen.getByText('보드툴즈').closest('footer');
    expect(footer?.className).toContain('bg-brand-900');
    expect(screen.getByText('보드툴즈')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 테스트 실행해서 실패하는지 확인**

Run: `npm run test -- Footer.test.tsx`
Expected: FAIL (현재 Footer는 `bg-chrome`을 사용)

- [ ] **Step 3: Footer.tsx 재작성**

`src/components/shared/Footer.tsx`:
```tsx
export default function Footer() {
  return (
    <footer className='flex flex-col items-center justify-center bg-brand-900 py-12'>
      <p className='font-display text-xl text-surface'>보드툴즈</p>
    </footer>
  );
}
```

- [ ] **Step 4: 테스트 실행해서 통과하는지 확인**

Run: `npm run test -- Footer.test.tsx`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add src/components/shared/Footer.tsx src/components/shared/Footer.test.tsx
git commit -m "feat: Footer를 브랜드 다크 배경으로 리디자인

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 7: ToolListItem 컴포넌트 신규 작성

**Files:**
- Create: `src/components/shared/ToolListItem.tsx`
- Test: `src/components/shared/ToolListItem.test.tsx`

**Interfaces:**
- Consumes: `bg-brand-900`/`bg-brand-700`/`bg-brand-400`, `animate-pop-in` (Task 2)
- Produces:
  ```ts
  type ToolListItemTone = 'dark' | 'base' | 'light';

  interface ToolListItemProps {
    href: string;
    title: string;
    subtitle: string;
    description: string;
    platforms: string[];
    icon: ReactNode;
    tone: ToolListItemTone;
    animationDelayMs?: number;
  }
  ```
  Task 8(`page.tsx`)이 이 props로 소비한다.

- [ ] **Step 1: 실패하는 테스트 먼저 작성**

`src/components/shared/ToolListItem.test.tsx`:
```tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ToolListItem from './ToolListItem';

describe('ToolListItem', () => {
  const baseProps = {
    href: '/avalon-roles',
    title: '아발론',
    subtitle: '아발론 역할 배정',
    description: '방을 만들고 참가자들에게 역할을 배정하는 아발론 보조 도구.',
    platforms: ['모바일'],
    icon: '🛡️',
    tone: 'base' as const,
  };

  it('제목, 부제, 설명, 플랫폼을 모두 렌더링한다', () => {
    render(<ToolListItem {...baseProps} />);

    expect(screen.getByText('아발론')).toBeInTheDocument();
    expect(screen.getByText('아발론 역할 배정')).toBeInTheDocument();
    expect(
      screen.getByText(
        '방을 만들고 참가자들에게 역할을 배정하는 아발론 보조 도구.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('모바일')).toBeInTheDocument();
  });

  it('href로 이동하는 링크를 렌더링한다', () => {
    render(<ToolListItem {...baseProps} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/avalon-roles');
  });

  it('tone에 맞는 배경 클래스를 적용한다', () => {
    render(<ToolListItem {...baseProps} tone='dark' />);
    expect(screen.getByRole('link').className).toContain('bg-brand-900');
  });

  it('platforms가 여러 개면 모두 렌더링한다', () => {
    render(<ToolListItem {...baseProps} platforms={['모바일', '태블릿']} />);
    expect(screen.getByText('모바일')).toBeInTheDocument();
    expect(screen.getByText('태블릿')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 테스트 실행해서 실패하는지 확인**

Run: `npm run test -- ToolListItem.test.tsx`
Expected: FAIL (`./ToolListItem` 모듈을 찾을 수 없음)

- [ ] **Step 3: ToolListItem.tsx 작성**

`src/components/shared/ToolListItem.tsx`:
```tsx
import clsx from 'clsx';
import Link from 'next/link';
import type { ReactNode } from 'react';

type ToolListItemTone = 'dark' | 'base' | 'light';

const toneClasses: Record<ToolListItemTone, string> = {
  dark: 'bg-brand-900',
  base: 'bg-brand-700',
  light: 'bg-brand-400',
};

interface ToolListItemProps {
  href: string;
  title: string;
  subtitle: string;
  description: string;
  platforms: string[];
  icon: ReactNode;
  tone: ToolListItemTone;
  animationDelayMs?: number;
}

export default function ToolListItem({
  href,
  title,
  subtitle,
  description,
  platforms,
  icon,
  tone,
  animationDelayMs = 0,
}: ToolListItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'group relative flex items-center gap-3 overflow-hidden rounded-2xl p-2.5 text-white',
          'transition-transform duration-200 ease-out hover:translate-x-1.5 hover:shadow-lg',
          'animate-pop-in',
          toneClasses[tone],
        )}
        style={{ animationDelay: `${animationDelayMs}ms` }}
      >
        <span
          aria-hidden
          className='pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10 transition-transform duration-300 ease-out group-hover:scale-125'
        />
        <span
          aria-hidden
          className='flex h-[72px] w-[72px] flex-shrink-0 items-center justify-center rounded-[10px] bg-white/20 text-3xl transition-transform duration-200 ease-out group-hover:-rotate-6 group-hover:scale-105'
        >
          {icon}
        </span>
        <span className='z-10 flex-1 pr-1'>
          <span className='block text-base font-extrabold'>{title}</span>
          <span className='block text-[11px] italic opacity-80'>
            {subtitle}
          </span>
          <span className='mt-1 block text-[11.5px] leading-snug opacity-90'>
            {description}
          </span>
          <span className='mt-2 flex gap-1.5'>
            {platforms.map((platform) => (
              <span
                key={platform}
                className='rounded-full bg-white/20 px-2.5 py-0.5 text-[10px]'
              >
                {platform}
              </span>
            ))}
          </span>
        </span>
        <span className='z-10 pr-1 text-lg opacity-70 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:opacity-100'>
          →
        </span>
      </Link>
    </li>
  );
}
```

- [ ] **Step 4: 테스트 실행해서 통과하는지 확인**

Run: `npm run test -- ToolListItem.test.tsx`
Expected: PASS (4개 테스트 모두)

- [ ] **Step 5: 커밋**

```bash
git add src/components/shared/ToolListItem.tsx src/components/shared/ToolListItem.test.tsx
git commit -m "feat: 게임 리스트용 ToolListItem 컴포넌트 추가

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 8: 메인페이지 리팩토링 (히어로 제거, 새 구조 적용)

**Files:**
- Modify: `src/app/page.tsx`
- Test: `src/app/page.test.tsx`

**Interfaces:**
- Consumes: `TOOLS` (Task 3), `ToolListItem` props (Task 7), `Header`/`Footer` (Task 5, 6)

- [ ] **Step 1: 실패하는 테스트 먼저 작성**

`src/app/page.test.tsx`:
```tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home', () => {
  it('히어로 이미지 없이 도구함 타이틀을 렌더링한다', () => {
    render(<Home />);

    expect(screen.getByText('도구함')).toBeInTheDocument();
    expect(screen.queryByAltText('hero')).not.toBeInTheDocument();
  });

  it('세 가지 도구로 이동하는 링크를 모두 렌더링한다', () => {
    render(<Home />);

    expect(
      screen.getByRole('link', { name: /지도제작자들/ }),
    ).toHaveAttribute('href', '/cartographers');
    expect(
      screen.getByRole('link', { name: /테라포밍마스/ }),
    ).toHaveAttribute('href', '/terraforming-mars');
    expect(screen.getByRole('link', { name: /아발론/ })).toHaveAttribute(
      'href',
      '/avalon-roles',
    );
  });

  it('기존 도구 데이터(부제, 설명, 플랫폼)를 모두 표시한다', () => {
    render(<Home />);

    expect(screen.getByText('아발론 역할 배정')).toBeInTheDocument();
    expect(screen.getByText('데스크탑')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 테스트 실행해서 실패하는지 확인**

Run: `npm run test -- page.test.tsx`
Expected: FAIL (현재 페이지는 "도구함" 대신 히어로 이미지가 있고, `hero` alt 이미지가 존재함)

- [ ] **Step 3: page.tsx 재작성**

`src/app/page.tsx`:
```tsx
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import ToolListItem from '@/components/shared/ToolListItem';
import { TOOLS } from '@/constants/tools';

const TOOL_ICONS: Record<string, string> = {
  '/cartographers': '🗺️',
  '/terraforming-mars': '🚀',
  '/avalon-roles': '🛡️',
};

const TOOL_TONES = ['dark', 'base', 'light'] as const;

export default function Home() {
  return (
    <div className='h-full w-full bg-surface'>
      <Header />
      <section className='flex w-full flex-col items-center px-6 py-16'>
        <h2 className='mb-10 font-display text-4xl text-ink'>도구함</h2>
        <ul className='flex w-full max-w-2xl flex-col gap-3.5'>
          {TOOLS.map((tool, index) => (
            <ToolListItem
              key={tool.href}
              href={tool.href}
              title={tool.title}
              subtitle={tool.subtitle}
              description={tool.description}
              platforms={tool.platforms}
              icon={TOOL_ICONS[tool.href]}
              tone={TOOL_TONES[index % TOOL_TONES.length]}
              animationDelayMs={index * 100}
            />
          ))}
        </ul>
      </section>
      <Footer />
    </div>
  );
}
```

기존의 `next/image` 히어로 import(`hero`)와 `Image`/`Link` 개별 import는 더 이상 필요하지 않아 제거했다. `public/board_tools_main.png` 파일 자체는 지우지 않는다 (범위 밖).

- [ ] **Step 4: 테스트 실행해서 통과하는지 확인**

Run: `npm run test -- page.test.tsx`
Expected: PASS (3개 테스트 모두)

- [ ] **Step 5: 커밋**

```bash
git add src/app/page.tsx src/app/page.test.tsx
git commit -m "feat: 메인페이지 히어로 제거하고 도구 리스트를 바로 노출

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 9: 최종 검증

**Files:** 없음 (검증 전용)

- [ ] **Step 1: 린트 실행**

Run: `npm run lint`
Expected: 에러 없음. 경고가 있다면 이번 라운드에서 수정한 파일에 한해 고친다.

- [ ] **Step 2: 타입 체크 실행**

Run: `npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 3: 전체 테스트 스위트 실행**

Run: `npm run test`
Expected: 모든 테스트 PASS (Task 1, 3~8에서 작성한 테스트 전부)

- [ ] **Step 4: 개발 서버로 육안 확인**

Run: `npm run dev`

브라우저(`http://localhost:3000`)에서 아래를 확인한다:
- 히어로 이미지 없이 다크 틸 헤더 → "도구함" → 3개 게임 리스트(다크→베이스→라이트 톤) → 다크 푸터 순서로 보이는지
- 페이지 진입 시 리스트가 순서대로 팝업되며 등장하는지
- 각 아이템에 마우스를 올렸을 때 오른쪽으로 밀리며 그림자, 아이콘 회전, 화살표 이동이 동작하는지
- 로고가 헤더의 크림색 알약 배경 안에서 잘 보이는지
- 모바일 폭(375px 정도)에서 레이아웃이 깨지지 않는지

문제가 있으면 해당 컴포넌트로 돌아가 수정하고, 관련 테스트를 다시 실행해 통과를 확인한 뒤 재커밋한다.

- [ ] **Step 5: 최종 상태 커밋 (수정 사항이 있었던 경우에만)**

```bash
git add -A
git commit -m "fix: 최종 검증 중 발견된 문제 수정

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## 다음 라운드

메인페이지 라운드가 끝나면, 같은 방식(브레인스토밍 → 스펙 → 계획 → 구현)으로 **지도제작자들** 라운드를 진행한다. 그 라운드에서 지도제작자들 컴포넌트들이 옛 CSS 토큰(`card-*`, `chip-*` 등) 참조를 새 브랜드 토큰으로 옮기게 된다.
