'use client';

import { useCartographersStore } from '@/stores/cartographers';
import SetupScreen from '@/components/cartographers/SetupScreen';
import styles from './theme.module.css';

export default function CartographersPage() {
  const { currentSeason } = useCartographersStore();

  return (
    <div className={styles[currentSeason]}>
      <SetupScreen />
    </div>
  );
}
