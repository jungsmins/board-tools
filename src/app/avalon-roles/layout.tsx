import type { CSSProperties, ReactNode } from 'react';

export const metadata = {
  title: '레지스탕스아발론 | 보드툴즈',
};

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
