import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  it('children을 렌더링한다.', () => {
    render(<Modal>모달 내용</Modal>);
    expect(screen.getByText('모달 내용')).toBeInTheDocument();
  });

  it('화면 전체를 덮는 고정 오버레이를 렌더링한다.', () => {
    const { container } = render(<Modal>모달 내용</Modal>);
    expect(container.firstElementChild).toHaveClass(
      'fixed',
      'inset-0',
      'bg-black/45',
    );
  });

  it('전달받은 className을 추가한다.', () => {
    render(<Modal className='max-w-[400px]'>모달 내용</Modal>);
    expect(screen.getByText('모달 내용')).toHaveClass('max-w-[400px]');
  });
});
