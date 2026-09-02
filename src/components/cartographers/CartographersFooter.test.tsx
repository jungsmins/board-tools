import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import CartographersFooter from './CartographersFooter';

describe('CartographersFooter', () => {
  it('다음 버튼 클릭 시 onNext를 호출한다.', () => {
    const onNext = vi.fn();
    render(
      <CartographersFooter
        onNext={onNext}
        nextButtonLabel='다음 카드'
        onReset={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '다음 카드' }));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('onPrev가 없으면 이전 카드 버튼을 숨긴다.', () => {
    render(
      <CartographersFooter
        onNext={vi.fn()}
        nextButtonLabel='다음 카드'
        onReset={vi.fn()}
      />,
    );
    expect(
      screen.queryByRole('button', { name: '이전 카드' }),
    ).not.toBeInTheDocument();
  });

  it('처음으로 클릭 시 확인 다이얼로그를 띄우고, 확인하면 onReset을 호출한다.', () => {
    const onReset = vi.fn();
    render(
      <CartographersFooter
        onNext={vi.fn()}
        nextButtonLabel='다음 카드'
        onReset={onReset}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '처음으로' }));
    expect(screen.getByText('초기화할까요?')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '초기화' }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
