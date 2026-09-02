import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScoringCard from './ScoringCard';
import type { ScoringRule } from '@/types/cartographers';

const scoringRule: ScoringRule = {
  id: 'test-rule',
  slot: 'A',
  name: '감시하는 숲',
  description: '설명 텍스트',
};

describe('ScoringCard', () => {
  it('슬롯/이름/설명을 렌더링한다.', () => {
    render(<ScoringCard scoringRule={scoringRule} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('감시하는 숲')).toBeInTheDocument();
    expect(screen.getByText('설명 텍스트')).toBeInTheDocument();
  });

  it('variant가 showcase면 더 큰 텍스트 클래스를 적용한다.', () => {
    render(<ScoringCard scoringRule={scoringRule} variant='showcase' />);
    expect(screen.getByText('감시하는 숲')).toHaveClass('text-5xl');
  });
});
