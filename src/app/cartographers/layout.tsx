import { ReactNode } from 'react';
import styles from './theme.module.css';
import DeviceGuard from '@/components/shared/DeviceGuard';
import { getToolByHref } from '@/lib/tools';

export const metadata = {
  title: '지도제작자들 | 보드툴즈',
};

const cartographersTool = getToolByHref('/cartographers');

export default function CartographersLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DeviceGuard
      toolTitle={cartographersTool.title}
      supportedPlatforms={cartographersTool.platforms}
    >
      <div className={styles.theme}>{children}</div>
    </DeviceGuard>
  );
}
