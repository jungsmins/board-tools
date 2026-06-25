import { ReactNode } from 'react';
import styles from './theme.module.css';

export const metadata = {
  title: '지도제작자들 | 보드툴즈',
};

export default function CartographersLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className={styles.theme}>{children}</div>;
}
