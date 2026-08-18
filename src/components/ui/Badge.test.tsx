import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge', () => {
  it('children을 렌더링한다.', () => {
    render(<Badge>모바일</Badge>);
    expect(screen.getByText('모바일')).toBeInTheDocument();
  });

  it('기본 배경/텍스트/모양 클래스를 적용한다.', () => {
    render(<Badge>모바일</Badge>);
    expect(screen.getByText('모바일')).toHaveClass(
      'bg-[#e7dcc8]',
      'text-ink',
      'rounded-full',
    );
  });

  it('전달받은 className을 추가한다.', () => {
    render(<Badge className='ml-2'>태블릿</Badge>);
    expect(screen.getByText('태블릿')).toHaveClass('ml-2');
  });
});
