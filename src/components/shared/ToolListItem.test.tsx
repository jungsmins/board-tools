import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ToolListItem from './ToolListItem';
import type { Tool } from '@/types/tools';

const tool: Tool = {
  href: '/cartographers',
  title: '지도제작자들',
  subtitle: '지도제작자들 플레이어',
  description: '설명',
  platforms: ['데스크탑', '모바일'],
  image: '/image_A.png',
};

describe('ToolListItem', () => {
  it('title/subtitle/description을 렌더링한다.', () => {
    render(<ToolListItem tool={tool} index={0} />);
    expect(screen.getByText('지도제작자들')).toBeInTheDocument();
    expect(screen.getByText('지도제작자들 플레이어')).toBeInTheDocument();
    expect(screen.getByText('설명')).toBeInTheDocument();
  });

  it('description이 카드마다 다른 길이여도 항상 2줄 높이를 확보한다.', () => {
    render(<ToolListItem tool={tool} index={0} />);
    expect(screen.getByText('설명')).toHaveClass('line-clamp-2', 'min-h-10');
  });

  it('tool.image를 src로, tool.title을 alt로 갖는 이미지를 렌더링한다.', () => {
    render(<ToolListItem tool={tool} index={0} />);
    const image = screen.getByRole('img', { name: '지도제작자들' });
    expect(image).toHaveAttribute('src', '/image_A.png');
  });

  it('platforms 배열의 각 항목을 뱃지로 렌더링한다.', () => {
    render(<ToolListItem tool={tool} index={0} />);
    expect(screen.getByText('데스크탑')).toBeInTheDocument();
    expect(screen.getByText('모바일')).toBeInTheDocument();
  });

  it('tool.href로 연결되는 링크다.', () => {
    render(<ToolListItem tool={tool} index={0} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/cartographers');
  });

  it('index % 3에 따라 톤 클래스가 순환한다.', () => {
    const { rerender } = render(<ToolListItem tool={tool} index={0} />);
    expect(screen.getByRole('link')).toHaveClass('bg-brand-900');

    rerender(<ToolListItem tool={tool} index={1} />);
    expect(screen.getByRole('link')).toHaveClass('bg-brand-700');

    rerender(<ToolListItem tool={tool} index={3} />);
    expect(screen.getByRole('link')).toHaveClass('bg-brand-900');
  });
});
