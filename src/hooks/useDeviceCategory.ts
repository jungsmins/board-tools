'use client';

import { useEffect, useState } from 'react';

export type DeviceCategory = '모바일' | '태블릿' | '데스크탑';

function resolveDeviceCategory(width: number): DeviceCategory {
  if (width < 768) return '모바일';
  if (width < 1024) return '태블릿';
  return '데스크탑';
}

export function useDeviceCategory(): DeviceCategory | null {
  const [category, setCategory] = useState<DeviceCategory | null>(null);

  useEffect(() => {
    const update = () => {
      setCategory(resolveDeviceCategory(window.innerWidth));
    };

    update();

    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, []);

  return category;
}
