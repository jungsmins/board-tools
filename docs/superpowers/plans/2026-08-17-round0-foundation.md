# 라운드 0 (재단) Implementation Plan

> **실행 방식 안내:** 이 계획은 에이전트가 아니라 **사용자가 직접 손으로 구현**하기 위한 체크리스트입니다. 각 Task는 "실패하는 테스트 작성 → 실패 확인 → 최소 구현 → 통과 확인 → 커밋" 순서를 기본으로 하되, 순수 설정/리팩토링 성격의 Task는 그 취지를 Task 설명에 별도로 표시했습니다. Task 하나 = 커밋 하나가 기본 단위입니다.

**Goal:** 프로젝트 전체 리팩토링 로드맵의 "재단" 라운드를 완료해, 디자인 토큰·테스트 인프라·UI 프리미티브 킷(Button/Card/Badge/Modal)·공용 셸(Header/Footer)·메인페이지를 이후 모든 게임 라운드가 그대로 가져다 쓸 수 있는 상태로 만든다.

**Architecture:** Tailwind v4의 `@theme` 블록에 브랜드 디자인 토큰(컬러/라운드/그림자)을 정의하고, `src/components/ui/`에 게임 로직을 모르는 순수 프리미티브를 신설한다. 기존 `Button`과 `ConfirmDialog`는 이 프리미티브와 토큰을 쓰도록 리팩토링하고, 메인페이지는 프리미티브를 조합한 `ToolListItem`으로 재구성한다.

**Tech Stack:** Next.js 16.2.4 (App Router), React 19.2.4, Tailwind CSS v4, TypeScript, Vitest + React Testing Library(jsdom), `clsx`.

**Spec:** [docs/superpowers/specs/2026-08-17-project-refactor-roadmap-design.md](../specs/2026-08-17-project-refactor-roadmap-design.md)

## Global Constraints

- 기존 옛 토큰(`gradient-*`, `canvas`, `chrome`, `card-*`, `chip-*`, `title`, `rule`)은 이번 라운드에서 삭제하지 않는다 (라운드 4에서 일괄 정리).
- 클래스 조합은 전부 `clsx`를 사용한다. 템플릿 리터럴로 클래스를 이어붙이지 않는다.
- 커스텀 표시 폰트(온글잎긍정, `public/fonts/Ongleaf-Geungjeong.ttf`)는 이번 라운드에서 제거하고 시스템 기본 sans-serif로 통일한다. 최종 display 폰트는 추후 별도 라운드에서 결정한다.
- `src/components/ui/`에는 게임을 모르는 순수 프리미티브만 둔다. 게임 로직이 있는 조합 컴포넌트는 넣지 않는다.
- 각 Task는 `npm run lint`, `npx tsc --noEmit`, `npm run test`가 모두 통과해야 커밋한다.
- 이 문서의 Task 1~13은 스펙의 청크와 다음과 같이 대응한다: Task 1~2 = 청크 0-1, Task 3 = 청크 0-2, Task 4~8 = 청크 0-3, Task 9~10 = 청크 0-4, Task 11~13 = 청크 0-5.

---

## Task 1: 테스트 인프라 + `clsx` 도입

**Files:**
- Modify: `package.json`
- Create: `vitest.config.mts`
- Create: `vitest.setup.tsx`
- Create: `src/lib/clsx.smoke.test.ts`

**Interfaces:**
- Produces: `npm run test` 커맨드, `vitest.setup.tsx`의 `next/image` mock(이후 Header 테스트인 Task 9가 사용)

이 Task는 순수 설정 작업이라 "실패하는 프로덕션 테스트"가 없습니다. 대신 설정이 끝난 뒤 파이프라인 자체가 동작하는지 확인하는 스모크 테스트로 마무리합니다.

- [ ] **Step 1: 의존성 설치**

```bash
npm install clsx
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom vite-tsconfig-paths
```

- [ ] **Step 2: `vitest.config.mts` 생성**

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

- [ ] **Step 3: `vitest.setup.tsx` 생성**

`next/image`는 내부적으로 이미지 최적화 로직을 갖고 있어 jsdom에서 그대로 렌더링하면 불필요한 경고가 발생합니다. 테스트에서는 평범한 `<img>`로 대체합니다 (Task 9의 `Header` 테스트에서 필요).

```tsx
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import type { ImgHTMLAttributes } from 'react';

vi.mock('next/image', () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));
```

- [ ] **Step 4: `package.json`에 `test` 스크립트 추가**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest run"
  }
}
```

- [ ] **Step 5: 파이프라인 확인용 스모크 테스트 작성**

```ts
// src/lib/clsx.smoke.test.ts
import { describe, expect, it } from 'vitest';
import clsx from 'clsx';

describe('clsx (vitest 파이프라인 확인용)', () => {
  it('조건부 클래스를 공백으로 합친다', () => {
    const isActive = true;
    const isDisabled = false;
    expect(clsx('base', isActive && 'active', isDisabled && 'disabled')).toBe(
      'base active'
    );
  });
});
```

- [ ] **Step 6: 테스트 실행해서 통과 확인**

Run: `npm run test`
Expected: PASS (1 test)

- [ ] **Step 7: 커밋**

```bash
git add package.json package-lock.json vitest.config.mts vitest.setup.tsx src/lib/clsx.smoke.test.ts
git commit -m "test: Vitest + React Testing Library 인프라 추가, clsx 도입"
```

---

## Task 2: 커스텀 폰트 제거

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css:24-25` (Typography 블록)
- Delete: `public/fonts/Ongleaf-Geungjeong.ttf`

**Interfaces:**
- Produces: `--font-sans` 토큰 (이후 모든 Task가 사용), `--font-display`는 당분간 `--font-sans`와 동일한 값

이 Task도 순수 설정 변경이라 실패하는 테스트를 먼저 쓰지 않습니다. 대신 `tsc`로 타입 오류가 없는지, 브라우저에서 텍스트가 여전히 보이는지로 검증합니다.

- [ ] **Step 1: `globals.css`의 Typography 토큰 교체**

기존:
```css
  /* Typography */
  --font-display: 'Noto Serif KR', Georgia, serif;
```

변경 후:
```css
  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo',
    'Malgun Gothic', 'Segoe UI', sans-serif;
  --font-display: var(--font-sans);
```

- [ ] **Step 2: `layout.tsx`에서 로컬 폰트 제거**

```tsx
import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'BoardTools',
  description: '보드게임을 편하게, 보드툴즈',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className='h-full antialiased'>
      <body className='flex min-h-full flex-col font-sans'>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: 폰트 파일 삭제**

```bash
git rm public/fonts/Ongleaf-Geungjeong.ttf
rmdir public/fonts 2>/dev/null || true
```

- [ ] **Step 4: 타입 체크 및 lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 에러 없음 (더 이상 존재하지 않는 `next/font/local` import를 참조하는 곳이 없어야 함)

- [ ] **Step 5: 브라우저 육안 확인**

Run: `npm run dev` → `http://localhost:3000` 접속 → "도구함", "게임 추천하기" 등 `font-display` 클래스가 걸린 텍스트가 시스템 기본 sans-serif로 보이는지 확인 (이전처럼 손글씨체가 아니어야 함)

- [ ] **Step 6: 커밋**

```bash
git add -A
git commit -m "chore: 커스텀 표시 폰트 제거, 시스템 기본 sans-serif로 통일"
```

---

## Task 3: 브랜드 디자인 토큰 + 유틸리티

**Files:**
- Modify: `src/app/globals.css` (`@theme` 블록, `@layer utilities` 블록)

**Interfaces:**
- Produces: `--color-brand-900/700/400`, `--color-accent`, `--color-surface`, `--color-surface-raised`, `--color-ink`, `--color-ink-muted`, `--color-danger`, `--radius-sm/md/full`, `--shadow-card/modal`, `.animate-pop-in`, `.bg-grain`, `.divider-dotted` — Task 4 이후 모든 Task가 이 토큰/유틸리티를 사용

순수 CSS 토큰 추가라 별도 유닛 테스트가 없습니다. `tsc`/`lint`와 브라우저 확인으로 검증합니다.

- [ ] **Step 1: 브랜드 컬러 토큰 추가**

`@theme` 블록의 `/* bg, border, text */` 섹션 뒤, `/* Typography */` 섹션 앞에 추가:

```css
  /* brand */
  --color-brand-900: #123f3a;
  --color-brand-700: #1c7c74;
  --color-brand-400: #5cb3a6;
  --color-accent: #f2b33d;
  --color-surface: #fffbf2;
  --color-surface-raised: #ffffff;
  --color-ink: #241f1c;
  --color-ink-muted: #7a6555;
  --color-danger: #e04830;

  /* radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --radius-full: 9999px;

  /* shadow */
  --shadow-card: 0 2px 8px rgb(18 63 58 / 12%);
  --shadow-modal: 0 12px 32px rgb(18 63 58 / 28%);
```

> `--radius-*`/`--shadow-*` 키를 `@theme`에 선언하면 Tailwind가 자동으로 `rounded-md`, `shadow-card` 같은 유틸리티 클래스를 생성합니다. 별도 CSS 클래스를 손으로 만들 필요가 없습니다. `tabular-nums`도 Tailwind 내장 유틸리티(`font-variant-numeric`)라 새로 정의하지 않고 라운드 1~2에서 숫자 요소에 바로 `tabular-nums` 클래스를 적용하면 됩니다.

- [ ] **Step 2: 애니메이션/텍스처 유틸리티 추가**

`@layer utilities` 블록의 기존 `.animate-card-content` 뒤에 추가:

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
    animation: pop-in 420ms ease-out both;
  }

  .bg-grain {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
    background-repeat: repeat;
  }

  .divider-dotted {
    height: 1px;
    background-image: linear-gradient(
      to right,
      var(--color-ink-muted) 50%,
      transparent 0
    );
    background-position: top;
    background-size: 6px 1px;
    background-repeat: repeat-x;
  }
```

- [ ] **Step 3: 타입/린트 확인**

Run: `npx tsc --noEmit && npm run lint`
Expected: 에러 없음

- [ ] **Step 4: 커밋**

```bash
git add src/app/globals.css
git commit -m "feat: 브랜드 디자인 토큰과 pop-in/grain/dotted 유틸리티 추가"
```

---

## Task 4: `Button` 프리미티브 재작성

**Files:**
- Modify: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Button.test.tsx`

**Interfaces:**
- Consumes: `--color-brand-700/900`, `--color-danger` (Task 3)
- Produces: `<Button variant={'primary'|'secondary'|'ghost'|'danger'} size={'sm'|'md'|'lg'} />` — Task 8(ConfirmDialog)이 사용

- [ ] **Step 1: 실패하는 테스트 작성**

```tsx
// src/components/ui/Button.test.tsx
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('기본값(ghost, md)으로 children을 렌더링한다', () => {
    render(<Button>확인</Button>);
    const button = screen.getByRole('button', { name: '확인' });
    expect(button).toHaveClass('bg-transparent', 'px-4', 'py-2');
  });

  it('variant/size prop에 맞는 클래스를 적용한다', () => {
    render(
      <Button variant='primary' size='lg'>
        저장
      </Button>
    );
    const button = screen.getByRole('button', { name: '저장' });
    expect(button.className).toContain('text-white');
    expect(button).toHaveClass('px-5', 'py-3');
  });

  it('클릭하면 onClick 핸들러가 호출된다', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>클릭</Button>);
    fireEvent.click(screen.getByRole('button', { name: '클릭' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('active 상태 눌림 피드백 클래스를 포함한다', () => {
    render(<Button>눌림</Button>);
    expect(screen.getByRole('button', { name: '눌림' })).toHaveClass(
      'active:scale-[0.97]'
    );
  });

  it('전달받은 className을 기존 클래스와 함께 적용한다', () => {
    render(<Button className='w-full'>넓게</Button>);
    expect(screen.getByRole('button', { name: '넓게' })).toHaveClass(
      'w-full',
      'cursor-pointer'
    );
  });
});
```

- [ ] **Step 2: 테스트 실행해서 실패 확인**

Run: `npm run test -- Button.test.tsx`
Expected: FAIL — `active 상태 눌림 피드백 클래스를 포함한다` 테스트가 실패 (현재 `Button.tsx`에 `active:scale-[0.97]` 클래스가 없음)

- [ ] **Step 3: `Button.tsx` 재작성**

```tsx
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

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
  secondary: 'bg-[#e7dcc8] text-ink hover:bg-[#dacbae]',
  ghost: 'bg-transparent text-ink hover:bg-black/5',
  danger: 'bg-danger text-white hover:bg-[#c93b26]',
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
        'cursor-pointer rounded-md font-bold transition active:scale-[0.97]',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 4: 테스트 재실행해서 통과 확인**

Run: `npm run test -- Button.test.tsx`
Expected: PASS (5 tests)

- [ ] **Step 5: 커밋**

```bash
git add src/components/ui/Button.tsx src/components/ui/Button.test.tsx
git commit -m "refactor: Button을 브랜드 토큰과 clsx 기반으로 재작성"
```

---

## Task 5: `Card` 프리미티브 신설

**Files:**
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Card.test.tsx`

**Interfaces:**
- Consumes: `--color-surface-raised`, `--shadow-card`, `--radius-md` (Task 3)
- Produces: `<Card padding={'sm'|'md'|'lg'} />` — 라운드 1~3에서 스코어/자원 카드에 사용 예정 (이번 라운드에서는 프리미티브만 준비하고 실제 화면 적용은 하지 않음)

- [ ] **Step 1: 실패하는 테스트 작성**

```tsx
// src/components/ui/Card.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('children을 렌더링한다', () => {
    render(<Card>내용</Card>);
    expect(screen.getByText('내용')).toBeInTheDocument();
  });

  it('기본 padding(md)과 배경/그림자 클래스를 적용한다', () => {
    render(<Card>내용</Card>);
    expect(screen.getByText('내용')).toHaveClass(
      'p-5',
      'bg-surface-raised',
      'shadow-card'
    );
  });

  it('padding prop에 따라 클래스가 바뀐다', () => {
    render(<Card padding='sm'>작은 카드</Card>);
    expect(screen.getByText('작은 카드')).toHaveClass('p-3');
  });

  it('전달받은 className을 함께 적용한다', () => {
    render(<Card className='w-full'>넓은 카드</Card>);
    expect(screen.getByText('넓은 카드')).toHaveClass('w-full');
  });
});
```

- [ ] **Step 2: 테스트 실행해서 실패 확인**

Run: `npm run test -- Card.test.tsx`
Expected: FAIL — `Cannot find module './Card'`

- [ ] **Step 3: `Card.tsx` 구현**

```tsx
import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type CardPadding = 'sm' | 'md' | 'lg';

type CardProps = {
  children: ReactNode;
  padding?: CardPadding;
} & HTMLAttributes<HTMLDivElement>;

const paddingClasses: Record<CardPadding, string> = {
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
};

export default function Card({
  children,
  padding = 'md',
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-md bg-surface-raised shadow-card',
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: 테스트 재실행해서 통과 확인**

Run: `npm run test -- Card.test.tsx`
Expected: PASS (4 tests)

- [ ] **Step 5: 커밋**

```bash
git add src/components/ui/Card.tsx src/components/ui/Card.test.tsx
git commit -m "feat: Card 프리미티브 추가"
```

---

## Task 6: `Badge` 프리미티브 신설

**Files:**
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Badge.test.tsx`

**Interfaces:**
- Produces: `<Badge>{children}</Badge>` — Task 12(`ToolListItem`)가 플랫폼 태그에 사용

- [ ] **Step 1: 실패하는 테스트 작성**

```tsx
// src/components/ui/Badge.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge', () => {
  it('children을 렌더링한다', () => {
    render(<Badge>모바일</Badge>);
    expect(screen.getByText('모바일')).toBeInTheDocument();
  });

  it('기본 배경/텍스트/모양 클래스를 적용한다', () => {
    render(<Badge>모바일</Badge>);
    expect(screen.getByText('모바일')).toHaveClass(
      'bg-[#e7dcc8]',
      'text-ink',
      'rounded-full'
    );
  });

  it('전달받은 className을 함께 적용한다', () => {
    render(<Badge className='ml-2'>태블릿</Badge>);
    expect(screen.getByText('태블릿')).toHaveClass('ml-2');
  });
});
```

- [ ] **Step 2: 테스트 실행해서 실패 확인**

Run: `npm run test -- Badge.test.tsx`
Expected: FAIL — `Cannot find module './Badge'`

- [ ] **Step 3: `Badge.tsx` 구현**

```tsx
import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type BadgeProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

export default function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full bg-[#e7dcc8] px-2 py-1 text-sm text-ink',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 4: 테스트 재실행해서 통과 확인**

Run: `npm run test -- Badge.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: 커밋**

```bash
git add src/components/ui/Badge.tsx src/components/ui/Badge.test.tsx
git commit -m "feat: Badge 프리미티브 추가"
```

---

## Task 7: `Modal` 프리미티브 신설

**Files:**
- Create: `src/components/ui/Modal.tsx`
- Create: `src/components/ui/Modal.test.tsx`

**Interfaces:**
- Consumes: `--color-surface-raised`, `--shadow-modal`, `--radius-md` (Task 3)
- Produces: `<Modal className?>{children}</Modal>` — Task 8(`ConfirmDialog`)가 사용

- [ ] **Step 1: 실패하는 테스트 작성**

```tsx
// src/components/ui/Modal.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  it('children을 렌더링한다', () => {
    render(<Modal>모달 내용</Modal>);
    expect(screen.getByText('모달 내용')).toBeInTheDocument();
  });

  it('화면 전체를 덮는 고정 오버레이를 렌더링한다', () => {
    const { container } = render(<Modal>내용</Modal>);
    expect(container.firstElementChild).toHaveClass(
      'fixed',
      'inset-0',
      'bg-black/45'
    );
  });

  it('전달받은 className을 내부 패널에 적용한다', () => {
    render(<Modal className='max-w-[400px]'>내용</Modal>);
    expect(screen.getByText('내용')).toHaveClass('max-w-[400px]');
  });
});
```

- [ ] **Step 2: 테스트 실행해서 실패 확인**

Run: `npm run test -- Modal.test.tsx`
Expected: FAIL — `Cannot find module './Modal'`

- [ ] **Step 3: `Modal.tsx` 구현**

```tsx
import type { ReactNode } from 'react';
import clsx from 'clsx';

type ModalProps = {
  children: ReactNode;
  className?: string;
};

export default function Modal({ children, className }: ModalProps) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4'>
      <section
        className={clsx(
          'w-full max-w-[320px] rounded-md bg-surface-raised p-5 shadow-modal',
          className
        )}
      >
        {children}
      </section>
    </div>
  );
}
```

- [ ] **Step 4: 테스트 재실행해서 통과 확인**

Run: `npm run test -- Modal.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: 커밋**

```bash
git add src/components/ui/Modal.tsx src/components/ui/Modal.test.tsx
git commit -m "feat: Modal 프리미티브 추가"
```

---

## Task 8: `ConfirmDialog`가 `Button`/`Modal`을 재사용하도록 리팩토링

**Files:**
- Modify: `src/components/shared/ConfirmDialog.tsx`
- Create: `src/components/shared/ConfirmDialog.test.tsx`

**Interfaces:**
- Consumes: `Button` (Task 4), `Modal` (Task 7)

이 Task는 동작을 바꾸지 않는 순수 리팩토링입니다. 먼저 지금 동작을 고정하는 테스트를 작성해 **현재 구현에 대해 통과**시킨 뒤, 내부 구현만 `Button`/`Modal` 조합으로 교체하고 다시 통과하는지 확인합니다.

- [ ] **Step 1: 현재 동작을 고정하는 테스트 작성**

```tsx
// src/components/shared/ConfirmDialog.test.tsx
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ConfirmDialog from './ConfirmDialog';

describe('ConfirmDialog', () => {
  it('title/description/confirmLabel을 렌더링한다', () => {
    render(
      <ConfirmDialog
        title='정말 나가시겠어요?'
        description='진행 중인 게임이 종료됩니다.'
        confirmLabel='나가기'
        onCancel={vi.fn()}
        onConfirm={vi.fn()}
      />
    );
    expect(screen.getByText('정말 나가시겠어요?')).toBeInTheDocument();
    expect(
      screen.getByText('진행 중인 게임이 종료됩니다.')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '나가기' })
    ).toBeInTheDocument();
  });

  it('showCancel이 false면 취소 버튼을 숨긴다', () => {
    render(
      <ConfirmDialog
        title='제목'
        description='설명'
        confirmLabel='확인'
        showCancel={false}
        onCancel={vi.fn()}
        onConfirm={vi.fn()}
      />
    );
    expect(
      screen.queryByRole('button', { name: '취소' })
    ).not.toBeInTheDocument();
  });

  it('확인/취소 버튼 클릭 시 각각의 핸들러를 호출한다', () => {
    const onCancel = vi.fn();
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        title='제목'
        description='설명'
        confirmLabel='확인'
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: '취소' }));
    fireEvent.click(screen.getByRole('button', { name: '확인' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 2: 테스트 실행해서 (리팩토링 전) 통과 확인**

Run: `npm run test -- ConfirmDialog.test.tsx`
Expected: PASS (3 tests) — 아직 리팩토링 전이므로 기존 구현 그대로 통과해야 함. 이 통과가 "현재 동작의 기준선"입니다.

- [ ] **Step 3: `ConfirmDialog.tsx`가 `Button`/`Modal`을 쓰도록 재작성**

```tsx
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

type ConfirmDialogProps = {
  title: string;
  description: string;
  confirmLabel: string;
  showCancel?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({
  title,
  description,
  confirmLabel,
  showCancel = true,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Modal>
      <h2 className='mb-2 text-xl font-bold text-ink'>{title}</h2>
      <p className='mb-5 text-sm font-bold text-ink-muted'>{description}</p>
      <div className={showCancel ? 'grid grid-cols-2 gap-2' : 'grid gap-2'}>
        {showCancel && (
          <Button variant='secondary' size='lg' onClick={onCancel}>
            취소
          </Button>
        )}
        <Button variant='primary' size='lg' onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
```

- [ ] **Step 4: 테스트 재실행해서 (리팩토링 후에도) 통과 확인**

Run: `npm run test -- ConfirmDialog.test.tsx`
Expected: PASS (3 tests) — 리팩토링 전후로 동일하게 통과해야 회귀가 없다는 뜻입니다.

- [ ] **Step 5: 커밋**

```bash
git add src/components/shared/ConfirmDialog.tsx src/components/shared/ConfirmDialog.test.tsx
git commit -m "refactor: ConfirmDialog가 Button/Modal 프리미티브를 재사용하도록 변경"
```

---

## Task 9: `Header` 리디자인

**Files:**
- Modify: `src/components/shared/Header.tsx`
- Create: `src/components/shared/Header.test.tsx`

**Interfaces:**
- Consumes: `--color-brand-900`, `--color-surface`, `--color-accent` (Task 3), `next/image` mock (Task 1)

- [ ] **Step 1: 실패하는 테스트 작성**

```tsx
// src/components/shared/Header.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('로고 링크가 홈으로 연결된다', () => {
    render(<Header />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  it('브랜드 다크 배경을 적용한다', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toHaveClass('bg-brand-900');
  });

  it('그라디언트 바 없이 "게임 추천하기" 텍스트를 렌더링한다', () => {
    render(<Header />);
    expect(screen.getByText('게임 추천하기')).toBeInTheDocument();
    expect(screen.getByRole('banner').className).not.toContain(
      'gradient'
    );
  });
});
```

- [ ] **Step 2: 테스트 실행해서 실패 확인**

Run: `npm run test -- Header.test.tsx`
Expected: FAIL — `bg-brand-900` 클래스가 아직 없음(현재는 `bg-chrome`)

- [ ] **Step 3: `Header.tsx` 재작성**

```tsx
import Image from 'next/image';
import Link from 'next/link';
import logo_icon from '../../../public/logo_icon.png';
import logo_text from '../../../public/logo_text.png';

export default function Header() {
  return (
    <header className='flex h-16 w-full items-center justify-between bg-brand-900 px-6'>
      <Link
        href='/'
        className='flex items-center gap-2.5 rounded-full bg-surface px-4 py-1.5'
      >
        <Image src={logo_icon} alt='로고' width={30} height={30} />
        <Image src={logo_text} alt='로고' width={96} height={28} />
      </Link>
      <div className='font-display text-accent'>게임 추천하기</div>
    </header>
  );
}
```

- [ ] **Step 4: 테스트 재실행해서 통과 확인**

Run: `npm run test -- Header.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: 커밋**

```bash
git add src/components/shared/Header.tsx src/components/shared/Header.test.tsx
git commit -m "feat: Header를 브랜드 다크 배경과 로고 알약 배경으로 리디자인"
```

---

## Task 10: `Footer` 리디자인

**Files:**
- Modify: `src/components/shared/Footer.tsx`
- Create: `src/components/shared/Footer.test.tsx`

**Interfaces:**
- Consumes: `--color-brand-900`, `--color-surface` (Task 3)

- [ ] **Step 1: 실패하는 테스트 작성**

```tsx
// src/components/shared/Footer.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('브랜드 다크 배경과 "보드툴즈" 텍스트를 렌더링한다', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toHaveClass('bg-brand-900');
    expect(screen.getByText('보드툴즈')).toBeInTheDocument();
  });

  it('그라디언트 바를 포함하지 않는다', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo').className).not.toContain(
      'gradient'
    );
  });
});
```

- [ ] **Step 2: 테스트 실행해서 실패 확인**

Run: `npm run test -- Footer.test.tsx`
Expected: FAIL — `bg-brand-900` 클래스가 아직 없음(현재는 `bg-chrome`)

- [ ] **Step 3: `Footer.tsx` 재작성**

```tsx
export default function Footer() {
  return (
    <footer className='flex flex-col items-center justify-center bg-brand-900 py-12'>
      <p className='text-xl text-surface'>보드툴즈</p>
    </footer>
  );
}
```

- [ ] **Step 4: 테스트 재실행해서 통과 확인**

Run: `npm run test -- Footer.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: 커밋**

```bash
git add src/components/shared/Footer.tsx src/components/shared/Footer.test.tsx
git commit -m "feat: Footer를 브랜드 다크 배경으로 리디자인"
```

---

## Task 11: `tools` 상수/타입 분리

**Files:**
- Create: `src/types/tools.ts`
- Create: `src/constants/tools.ts`
- Create: `src/constants/tools.test.ts`

**Interfaces:**
- Produces: `interface Tool`, `const TOOLS: Tool[]` — Task 12(`ToolListItem`), Task 13(`page.tsx`)이 사용

- [ ] **Step 1: 실패하는 테스트 작성**

```ts
// src/constants/tools.test.ts
import { describe, expect, it } from 'vitest';
import { TOOLS } from './tools';

describe('TOOLS', () => {
  it('3개의 도구 데이터를 담고 있다', () => {
    expect(TOOLS).toHaveLength(3);
  });

  it('각 항목이 href/title/subtitle/description/platforms를 모두 갖는다', () => {
    TOOLS.forEach((tool) => {
      expect(tool.href).toBeTruthy();
      expect(tool.title).toBeTruthy();
      expect(tool.subtitle).toBeTruthy();
      expect(tool.description).toBeTruthy();
      expect(tool.platforms.length).toBeGreaterThan(0);
    });
  });

  it('지도제작자들 데이터를 정확히 유지한다', () => {
    const cartographers = TOOLS.find(
      (tool) => tool.href === '/cartographers'
    );
    expect(cartographers).toMatchObject({
      title: '지도제작자들',
      platforms: ['데스크탑'],
    });
  });
});
```

- [ ] **Step 2: 테스트 실행해서 실패 확인**

Run: `npm run test -- tools.test.ts`
Expected: FAIL — `Cannot find module './tools'`

- [ ] **Step 3: `src/types/tools.ts` 작성**

```ts
export interface Tool {
  href: string;
  title: string;
  subtitle: string;
  description: string;
  platforms: string[];
}
```

- [ ] **Step 4: `src/constants/tools.ts` 작성**

`src/app/page.tsx`의 기존 `TOOL_CARDS` 배열에서 `imageLabel` 필드를 제외한 데이터를 그대로 옮깁니다 (이미지 자리는 Task 12의 `ToolListItem`이 아이콘으로 대체).

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

- [ ] **Step 5: 테스트 재실행해서 통과 확인**

Run: `npm run test -- tools.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 6: 커밋**

```bash
git add src/types/tools.ts src/constants/tools.ts src/constants/tools.test.ts
git commit -m "refactor: TOOL_CARDS를 타입이 있는 Tool 상수로 분리"
```

---

## Task 12: `ToolListItem` 컴포넌트 신설

**Files:**
- Create: `src/components/icons/GamePieceIcon.tsx`
- Create: `src/components/shared/ToolListItem.tsx`
- Create: `src/components/shared/ToolListItem.test.tsx`

**Interfaces:**
- Consumes: `Tool` 타입(Task 11), `Badge`(Task 6), `--color-brand-900/700/400`·`.animate-pop-in`(Task 3)
- Produces: `<ToolListItem tool={Tool} index={number} />` — Task 13(`page.tsx`)이 사용

- [ ] **Step 1: 아이콘 placeholder 컴포넌트 작성**

실제 게임 표지 이미지가 들어오기 전까지 쓸 임시 아이콘입니다. 이 컴포넌트 자체는 별도 테스트 없이 `ToolListItem` 테스트로 간접 검증합니다.

```tsx
// src/components/icons/GamePieceIcon.tsx
import type { SVGProps } from 'react';

export default function GamePieceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 24 24' fill='none' aria-hidden='true' {...props}>
      <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='1.5' />
      <path
        d='M8 12h8M12 8v8'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
}
```

- [ ] **Step 2: 실패하는 테스트 작성**

```tsx
// src/components/shared/ToolListItem.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ToolListItem from './ToolListItem';
import type { Tool } from '@/types/tools';

const tool: Tool = {
  href: '/cartographers',
  title: '지도제작자들',
  subtitle: '지도제작자들 플레이어',
  description: '설명',
  platforms: ['데스크탑', '모바일'],
};

describe('ToolListItem', () => {
  it('title/subtitle/description을 렌더링한다', () => {
    render(<ToolListItem tool={tool} index={0} />);
    expect(screen.getByText('지도제작자들')).toBeInTheDocument();
    expect(screen.getByText('지도제작자들 플레이어')).toBeInTheDocument();
    expect(screen.getByText('설명')).toBeInTheDocument();
  });

  it('platforms 배열의 각 항목을 뱃지로 렌더링한다', () => {
    render(<ToolListItem tool={tool} index={0} />);
    expect(screen.getByText('데스크탑')).toBeInTheDocument();
    expect(screen.getByText('모바일')).toBeInTheDocument();
  });

  it('tool.href로 연결되는 링크다', () => {
    render(<ToolListItem tool={tool} index={0} />);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/cartographers'
    );
  });

  it('index % 3에 따라 톤 클래스가 순환한다', () => {
    const { rerender } = render(<ToolListItem tool={tool} index={0} />);
    expect(screen.getByRole('link')).toHaveClass('bg-brand-900');

    rerender(<ToolListItem tool={tool} index={1} />);
    expect(screen.getByRole('link')).toHaveClass('bg-brand-700');

    rerender(<ToolListItem tool={tool} index={3} />);
    expect(screen.getByRole('link')).toHaveClass('bg-brand-900');
  });
});
```

- [ ] **Step 3: 테스트 실행해서 실패 확인**

Run: `npm run test -- ToolListItem.test.tsx`
Expected: FAIL — `Cannot find module './ToolListItem'`

- [ ] **Step 4: `ToolListItem.tsx` 구현**

```tsx
import Link from 'next/link';
import clsx from 'clsx';
import type { Tool } from '@/types/tools';
import Badge from '@/components/ui/Badge';
import GamePieceIcon from '@/components/icons/GamePieceIcon';

type ToolListItemProps = {
  tool: Tool;
  index: number;
};

const TONE_CLASSES = ['bg-brand-900', 'bg-brand-700', 'bg-brand-400'];

export default function ToolListItem({ tool, index }: ToolListItemProps) {
  const tone = TONE_CLASSES[index % TONE_CLASSES.length];

  return (
    <Link
      href={tool.href}
      style={{ animationDelay: `${index * 80}ms` }}
      className={clsx(
        'group flex w-full items-center gap-5 overflow-hidden rounded-md p-5 text-white shadow-card transition',
        'hover:translate-x-1.5 hover:shadow-modal',
        'animate-pop-in',
        tone
      )}
    >
      <div className='flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-md bg-black/10 p-2.5 transition group-hover:rotate-[-4deg] group-hover:scale-[1.06]'>
        <GamePieceIcon className='h-full w-full' />
      </div>
      <div className='flex flex-1 flex-col gap-1'>
        <p className='text-2xl font-bold'>{tool.title}</p>
        <p className='text-sm italic opacity-80'>{tool.subtitle}</p>
        <p className='text-sm opacity-90'>{tool.description}</p>
        <div className='mt-2 flex items-center gap-2'>
          {tool.platforms.map((platform) => (
            <Badge key={platform}>{platform}</Badge>
          ))}
        </div>
      </div>
      <span className='shrink-0 text-2xl transition group-hover:translate-x-1'>
        →
      </span>
    </Link>
  );
}
```

- [ ] **Step 5: 테스트 재실행해서 통과 확인**

Run: `npm run test -- ToolListItem.test.tsx`
Expected: PASS (4 tests)

- [ ] **Step 6: 커밋**

```bash
git add src/components/icons/GamePieceIcon.tsx src/components/shared/ToolListItem.tsx src/components/shared/ToolListItem.test.tsx
git commit -m "feat: 게임 리스트용 ToolListItem 컴포넌트 추가"
```

---

## Task 13: 메인페이지(`page.tsx`) 재구성

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/app/page.test.tsx`

**Interfaces:**
- Consumes: `Header`(기존), `Footer`(Task 10), `ToolListItem`(Task 12), `TOOLS`(Task 11), `--color-surface`·`.bg-grain`(Task 3)

- [ ] **Step 1: 실패하는 테스트 작성**

```tsx
// src/app/page.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Home from './page';

describe('Home', () => {
  it('"도구함" 제목을 렌더링한다', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { name: '도구함' })
    ).toBeInTheDocument();
  });

  it('TOOLS 개수만큼 도구 링크를 렌더링한다', () => {
    render(<Home />);
    const list = screen.getByRole('list');
    expect(within(list).getAllByRole('link')).toHaveLength(3);
  });

  it('각 도구의 title이 화면에 보인다', () => {
    render(<Home />);
    expect(screen.getByText('지도제작자들')).toBeInTheDocument();
    expect(screen.getByText('테라포밍마스')).toBeInTheDocument();
    expect(screen.getByText('아발론')).toBeInTheDocument();
  });

  it('히어로 이미지를 렌더링하지 않는다', () => {
    render(<Home />);
    expect(screen.queryByAltText('hero')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 테스트 실행해서 실패 확인**

Run: `npm run test -- page.test.tsx`
Expected: FAIL — `getByRole('heading', { name: '도구함' })` 실패(현재는 `<div>`로 렌더링됨), 히어로 이미지가 여전히 존재해 4번째 테스트도 실패

- [ ] **Step 3: `page.tsx` 재작성**

```tsx
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import ToolListItem from '@/components/shared/ToolListItem';
import { TOOLS } from '@/constants/tools';

export default function Home() {
  return (
    <div className='flex h-full w-full flex-1 flex-col bg-surface bg-grain'>
      <Header />
      <section className='flex flex-1 flex-col items-center px-6 py-16'>
        <h1 className='mb-12 font-display text-4xl text-ink'>도구함</h1>
        <ul className='flex w-full max-w-3xl flex-col gap-4'>
          {TOOLS.map((tool, index) => (
            <li key={tool.href}>
              <ToolListItem tool={tool} index={index} />
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </div>
  );
}
```

> 히어로 이미지(`public/board_tools_main.png`)는 더 이상 import하지 않지만, 파일 자체는 지우지 않습니다 — 다른 곳에서 재사용할 가능성이 있어 이번 라운드에서는 굳이 삭제하지 않습니다.

- [ ] **Step 4: 테스트 재실행해서 통과 확인**

Run: `npm run test -- page.test.tsx`
Expected: PASS (4 tests)

- [ ] **Step 5: 전체 검증**

Run: `npm run lint && npx tsc --noEmit && npm run test`
Expected: 모두 에러 없이 통과

Run: `npm run dev` → 브라우저에서 라이트/모바일 뷰 모두 확인 — 히어로 이미지 없이 리스트가 바로 보이는지, 진입 애니메이션과 hover 인터랙션이 동작하는지, 짧은 화면에서도 Footer가 바닥에 붙는지 확인

- [ ] **Step 6: 커밋**

```bash
git add src/app/page.tsx src/app/page.test.tsx
git commit -m "feat: 메인페이지 히어로 제거하고 도구 리스트를 바로 노출"
```

---

## 라운드 0 완료 체크리스트

- [ ] `npm run lint` 통과
- [ ] `npx tsc --noEmit` 통과
- [ ] `npm run test` 전체 통과
- [ ] 메인페이지가 히어로 이미지 없이 게임 리스트로 시작
- [ ] Header/Footer/Button이 브랜드 팔레트 사용, 하드코딩 hex 없음(Button의 `secondary`/`danger` hover 등 토큰화하지 않은 소수의 값은 의도적으로 남겨둠 — 라운드 1~3에서 반복 사용되면 그때 토큰으로 승격)
- [ ] `Card`/`Badge`/`Modal` 프리미티브 존재, `ConfirmDialog`가 `Button`/`Modal` 재사용
- [ ] `TOOLS`가 타입 있는 상수로 분리
- [ ] 커스텀 폰트 제거, 시스템 기본 sans-serif로 통일

라운드 0이 끝나면, 이 계획과 같은 방식으로 **라운드 1(지도제작자들)** 계획을 그때 가서 새로 작성합니다.
