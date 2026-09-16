import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { ImgHTMLAttributes } from 'react';

afterEach(() => {
  cleanup();
});

type MockImageProps = ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean };

vi.mock('next/image', () => ({
  default: ({ fill, ...props }: MockImageProps) => {
    void fill;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));
