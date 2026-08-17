import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import { ImgHTMLAttributes } from 'react';

vi.mock('next/image', () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));
