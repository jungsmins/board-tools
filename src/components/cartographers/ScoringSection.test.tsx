import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScoringSection from './ScoringSection';
import type { ScoringRule } from '@/types/cartographers';

const scoringRules: ScoringRule[] = [
  { id: 'r1', slot: 'A', name: '감시하는 숲', description: '설명1' },
  { id: 'r2', slot: 'B', name: '야인의 마을', description: '설명2' },
];

describe('ScoringSection', () => {
  it('compact variant에서 "칙령" 라벨과 규칙 목록을 렌더링한다.', () => {
    render(<ScoringSection scoringRules={scoringRules} />);
    expect(screen.getByText('칙령')).toBeInTheDocument();
    expect(screen.getByText('감시하는 숲')).toBeInTheDocument();
    expect(screen.getByText('야인의 마을')).toBeInTheDocument();
  });

  it('showcase varian에서는 "칙령" 라벨을 숨긴다.', () => {
    render(<ScoringSection scoringRules={scoringRules} variant='showcase' />);
    expect(screen.queryByText('칙령')).not.toBeInTheDocument();
  });
});
