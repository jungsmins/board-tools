import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('기본값(ghost, md)으로 children을 렌더링한다.', () => {
    render(<Button>확인</Button>);
    const button = screen.getByRole('button', { name: '확인' });
    expect(button).toHaveClass('bg-transparent', 'px-4', 'py-2');
  });

  it('variant와 size에 맞는 클래스를 적용한다.', () => {
    render(
      <Button variant='primary' size='lg'>
        저장
      </Button>,
    );
    const button = screen.getByRole('button', { name: '저장' });
    expect(button.className).toContain('text-white');
    expect(button).toHaveClass('px-5', 'py-3');
  });

  it('클릭하면 onClick 핸들러가 호출된다.', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>클릭</Button>);
    const button = screen.getByRole('button', { name: '클릭' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('activ 상태 눌림 피드백 클래스를 포함한다.', () => {
    render(<Button>눌림</Button>);
    const button = screen.getByRole('button', { name: '눌림' });
    expect(button).toHaveClass('active:scale-[0.97]');
  });

  it('전달받은 className을 기존 클래스에 추가한다.', () => {
    render(<Button className='w-full'>넓게</Button>);
    const button = screen.getByRole('button', { name: '넓게' });
    expect(button).toHaveClass('w-full', 'cursor-pointer');
  });
});
