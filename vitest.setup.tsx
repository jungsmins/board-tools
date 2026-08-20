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
    // fill은 next/image 전용 boolean prop이라 DOM <img>에 그대로 넘기면 경고가 남 — 제거하고 스프레드
    void fill;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));
