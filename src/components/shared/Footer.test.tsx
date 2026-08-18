import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('브랜드 다크 배경과 "보드툴즈" 텍스트를 렌더링한다.', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toHaveClass('bg-brand-900');
    expect(screen.getByText('보드툴즈')).toBeInTheDocument();
  });
});
