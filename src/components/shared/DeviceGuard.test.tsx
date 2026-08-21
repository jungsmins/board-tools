import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import DeviceGuard from './DeviceGuard';

function setViewportWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  window.dispatchEvent(new Event('resize'));
}

describe('DeviceGuard', () => {
  it('지원하는 디바이스면 children을 렌더링한다.', () => {
    setViewportWidth(1280);
    render(
      <DeviceGuard toolTitle='지도제작자들' supportedPlatforms={['데스크탑']}>
        <div>게임 화면</div>
      </DeviceGuard>,
    );
    expect(screen.getByText('게임 화면')).toBeInTheDocument();
  });

  it('지원하지 않는 디바이스면 안내 화면을 보여주고 children은 숨긴다.', () => {
    setViewportWidth(375);
    render(
      <DeviceGuard toolTitle='지도제작자들' supportedPlatforms={['데스크탑']}>
        <div>게임 화면</div>
      </DeviceGuard>,
    );
    expect(
      screen.getByRole('link', { name: '홈으로 돌아가기' }),
    ).toBeInTheDocument();
  });
});
