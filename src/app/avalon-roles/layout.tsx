import type { CSSProperties, ReactNode } from 'react';

// 아발론 화면 전용 색 스코프.
// ui/Button의 primary 변형은 --color-avalon-button-primary(-hover)가
// 정의되어 있으면 그 색을, 없으면 사이트 기본 브랜드 색을 사용한다.
// (cartographers가 --color-cartographers-button-primary로 같은 방식을 쓴다.)
const avalonTheme = {
  '--color-avalon-button-primary': 'var(--color-avalon-ink)',
  '--color-avalon-button-primary-hover': 'var(--color-avalon-ink-hover)',
} as CSSProperties;

export default function AvalonRolesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div style={avalonTheme}>{children}</div>;
}
