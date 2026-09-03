import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Home from './page';
import { TOOLS } from '@/constants/tools';

describe('Home', () => {
  it('헤드라인을 렌더링한다.', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { name: '오늘은 어떤 게임을 즐겨볼까요?' }),
    ).toBeInTheDocument();
  });

  it('TOOLS 개수만큼 도구 링크를 렌더링한다.', () => {
    render(<Home />);
    const list = screen.getByRole('list');
    expect(within(list).getAllByRole('link')).toHaveLength(TOOLS.length);
  });

  it('각 도구의 title이 화면에 보인다.', () => {
    render(<Home />);
    TOOLS.forEach((tool) => {
      expect(screen.getByText(tool.title)).toBeInTheDocument();
    });
  });
});
