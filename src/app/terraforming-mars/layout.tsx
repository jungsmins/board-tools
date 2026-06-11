import { ReactNode } from 'react';

export const metadata = {
  title: '테라포밍마스 | 보드툴즈',
};

export default function CartographersLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
