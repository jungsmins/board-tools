import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ConfirmDialog from './ConfirmDialog';

describe('ConfirmDialog', () => {
  it('title/description/confirmLabel을 렌더링한다.', () => {
    render(
      <ConfirmDialog
        title='정말 나가시겠어요?'
        description='진행 중인 게임이 종료됩니다.'
        confirmLabel='나가기'
        onCancel={vi.fn()}
        onConfirm={vi.fn()}
      />,
    );
    expect(screen.getByText('정말 나가시겠어요?')).toBeInTheDocument();
    expect(
      screen.getByText('진행 중인 게임이 종료됩니다.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '나가기' })).toBeInTheDocument();
  });

  it('showCancel이 false면 취소 버튼을 숨긴다.', () => {
    render(
      <ConfirmDialog
        title='제목'
        description='설명'
        confirmLabel='확인'
        showCancel={false}
        onCancel={vi.fn()}
        onConfirm={vi.fn()}
      />,
    );
    expect(
      screen.queryByRole('button', { name: '취소' }),
    ).not.toBeInTheDocument();
  });

  it('확인/취소 버튼 클릭 시 각각의 핸들러를 호출한다.', () => {
    const onCancel = vi.fn();
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        title='제목'
        description='설명'
        confirmLabel='확인'
        onCancel={onCancel}
        onConfirm={onConfirm}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '취소' }));
    fireEvent.click(screen.getByRole('button', { name: '확인' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
