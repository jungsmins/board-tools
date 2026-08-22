import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import OverlayPanel from './OverlayPanel';

describe('OverlayPanel', () => {
  it('children을 렌더링한다.', () => {
    render(<OverlayPanel>내용</OverlayPanel>);
    expect(screen.getByText('내용')).toBeInTheDocument();
  });

  it('기본 오버레이/정렬 클래스를 적용한다.', () => {
    render(<OverlayPanel>내용</OverlayPanel>);
    expect(screen.getByText('내용')).toHaveClass(
      'bg-cartographers-overlay rounded-lg',
    );
  });

  it('전달받은 className을 함께 적용한다', () => {
    render(<OverlayPanel className='gap-10'>내용</OverlayPanel>);
    expect(screen.getByText('내용')).toHaveClass('gap-10');
  });
});
