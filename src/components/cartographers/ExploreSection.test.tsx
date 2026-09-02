import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ExploreSection from './ExploreSection';
import type { NormalExploreCard } from '@/types/cartographers';

const normalCard: NormalExploreCard = {
  type: 'normal',
  id: 'farmland',
  name: '농지',
  terrains: ['farm'],
  shapes: [{ shape: [[1]], hasCoin: false }],
  cost: 1,
};

describe('ExploreSection', () => {
  it('카드 이름과 배경 이미지를 렌더링한다.', () => {
    render(<ExploreSection exploreCard={normalCard} />);
    expect(screen.getByText('농지')).toBeInTheDocument();
    expect(screen.getByAltText('농지 이미지')).toHaveAttribute(
      'src',
      '/cartographers_images/explore/farmland.png',
    );
  });
});
