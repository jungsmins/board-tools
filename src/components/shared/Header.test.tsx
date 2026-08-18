import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('로고 링크가 홈으로 연결된다.', () => {
    render(<Header />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  it('브랜드 다크 배경을 적용한고 "게임 추천하기" 텍스트를 렌더링한다.', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toHaveClass('bg-brand-900');
    expect(screen.getByText('게임 추천하기')).toBeInTheDocument();
  });
});
