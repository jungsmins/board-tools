'use client';

import { ReactNode } from 'react';
import { useDeviceCategory } from '@/hooks/useDeviceCategory';
import UnsupportedDeviceNotice from './UnsupportedDeviceNotice';

type DeviceGuardProps = {
  toolTitle: string;
  supportedPlatforms: string[];
  children: ReactNode;
};

export default function DeviceGuard({
  toolTitle,
  supportedPlatforms,
  children,
}: DeviceGuardProps) {
  const category = useDeviceCategory();

  if (category === null) {
    return null;
  }

  if (!supportedPlatforms.includes(category)) {
    return (
      <UnsupportedDeviceNotice
        toolTitle={toolTitle}
        supportedPlatforms={supportedPlatforms}
      />
    );
  }

  return <>{children}</>;
}
