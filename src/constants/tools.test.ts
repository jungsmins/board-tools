import { describe, expect, it } from 'vitest';
import { TOOLS } from './tools';

describe('TOOLS', () => {
  it('3개의 도구 데이터를 담고 있다.', () => {
    expect(TOOLS).toHaveLength(3);
  });

  it('각 항목이 href/title/subtitle/decription/platforms를 모두 갖는다.', () => {
    TOOLS.forEach((tool) => {
      expect(tool.href).toBeTruthy();
      expect(tool.title).toBeTruthy();
      expect(tool.subtitle).toBeTruthy();
      expect(tool.description).toBeTruthy();
      expect(tool.platforms.length).toBeGreaterThan(0);
    });
  });

  it('지도제작자들 데이터를 정확히 유지한다.', () => {
    const cartographers = TOOLS.find((tool) => tool.href === '/cartographers');
    expect(cartographers).toMatchObject({
      title: '지도제작자들',
      platforms: ['데스크탑'],
      image: '/image_A.png',
    });
  });
});
