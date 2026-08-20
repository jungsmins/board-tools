import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('children을 렌더링 한다.', () => {
    render(<Card>내용</Card>);
    expect(screen.getByText('내용')).toBeInTheDocument();
  });

  it('기본 padding(md)과 배경/그림자 클래스를 적용한다.', () => {
    render(<Card>내용</Card>);
    expect(screen.getByText('내용')).toHaveClass(
      'p-5',
      'bg-surface-raised',
      'shadow-card',
    );
  });

  it('padding props에 따라 클래스가 바뀐다.', () => {
    render(<Card padding='sm'>작은 카드</Card>);
    expect(screen.getByText('작은 카드')).toHaveClass('p-3');
  });

  it('전달받은 className을 추가한다.', () => {
    render(<Card className='w-full'>넓은 카드</Card>);
    expect(screen.getByText('넓은 카드')).toHaveClass('w-full');
  });
});
